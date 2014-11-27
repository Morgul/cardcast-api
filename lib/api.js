//----------------------------------------------------------------------------------------------------------------------
// Low level API calls
//
// @module api.js
//----------------------------------------------------------------------------------------------------------------------

var url = require('url');
var https = require('https');

var _ = require('lodash');
var Promise = require('bluebird');

var PaginatedResult = require('./paginated');
var errors = require('./errors');

//----------------------------------------------------------------------------------------------------------------------

/**
 * Builds a new url from an existing url and a set of query parameters.
 *
 * @param {string} baseUrl - The existing url we want to add query parameters to.
 * @param {object} params - An object of the query parameters to be added.
 * @returns {string} Returns the new url as a string.
 */
function buildURL(baseUrl, params)
{
    // Remove undefined values
    params = _.transform(params, function(result, value, key)
    {
        if(value !== undefined)
        {
            result[key] = value;
        } // end if
    });

    // Parse the base url, and then merge our query parameters into the object
    var parsed = url.parse(baseUrl, true);
    parsed.query = _.merge(parsed.query || {}, params);

    // Return a newly formatted url
    return url.format(parsed);
} // end buildURL

/**
 *
 * @param endpoint
 * @param [timeout]
 * @returns {Promise}
 */
function makeAPICall(endpoint, timeout)
{
    timeout = timeout || 2000;

    return new Promise(function(resolve, reject)
    {
        var buffer = new Buffer("");
        var complete = false;

        // Set a timeout, in case the API isn't responding
        setTimeout(function()
        {
            if(!complete)
            {
                reject(new errors.TimeoutError());
            } // end if
        }, timeout);

        // Make the API call
        var response = https.get(endpoint, function(response)
        {
            complete = true;

            // Listen for errors
            response.on('error', function(error)
            {
                reject(new errors.ResponseError(response, error))
            });

            // Handle response
            if(response.statusCode == 404)
            {
                reject(new errors.NotFoundError(endpoint));
            }
            else
            {
                // We have to handle streaming data responses. We use a buffer, since it's more memory efficient than
                // converting each piece to a string and working with those string fragments.
                response.on('data', function(data)
                {
                    buffer = Buffer.concat([buffer, data], buffer.length + data.length);
                });

                // Once the response has finished, we attempt to parse the JSON response
                response.on('end', function()
                {
                    var data = JSON.parse(buffer.toString());

                    // Attempt to determine if this is a paginated result, or a regular response
                    if(data.results)
                    {
                        resolve(new PaginatedResult(data.results, url));
                    }
                    else
                    {
                        resolve(data);
                    } // end if
                });
            } // end if
        });
    });
} // end makeAPICall

//----------------------------------------------------------------------------------------------------------------------

module.exports = {
    makeAPICall: makeAPICall,
    buildURL: buildURL
}; // end exports

//----------------------------------------------------------------------------------------------------------------------