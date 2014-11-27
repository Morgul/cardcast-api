//----------------------------------------------------------------------------------------------------------------------
// Represents a paginated result
//
// @module paginated.js
//----------------------------------------------------------------------------------------------------------------------

var Promise = require('bluebird');

var api = require('./api');
var errors = require('./errors');

//----------------------------------------------------------------------------------------------------------------------

function PaginatedResult(results, url)
{
    this._results = results;
    this.url = url;
} // end PaginatedResult

PaginatedResult.prototype = {
    get offset()
    {
        return this._results.offset || 0;
    },

    get count()
    {
        return this._results.count || 0;
    },

    get data()
    {
        return this._results.data || [];
    },

    get hasNext()
    {
        return this.offset + this.data.length < this.count;
    }
}; // end prototype

/**
 * Gets the next page of results.
 *
 * @returns {Promise} Returns a promise that resolves to a new PaginatedResult for the next page of results.
 */
PaginatedResult.prototype.next = function()
{
    if(this.url && this.hasNext)
    {
        var params = { offset: this.offset + this.data.length };
        var url = api.buildURL(this.url, params);

        // We assume that we just need to make the same url call, but changing offset.
        return api.makeAPICall(url);
    }
    else if(!this.hasNext)
    {
        return Promise.reject( new errors.PaginationError("Result doesn't have any more pages."));
    }
    else
    {
        return Promise.reject( new errors.PaginationError("No url defined."));
    } // end if
}; // end next

PaginatedResult.prototype.toJSON = function()
{
    return {
        offset: this.offset,
        count: this.count,
        data: this.data
    }
}; // end toJSON

//----------------------------------------------------------------------------------------------------------------------

module.exports = PaginatedResult;

//----------------------------------------------------------------------------------------------------------------------