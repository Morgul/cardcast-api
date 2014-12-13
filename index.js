//----------------------------------------------------------------------------------------------------------------------
// Main entrypoint for the Cardcast API.
//
// @module index.js
//----------------------------------------------------------------------------------------------------------------------

var _ = require('lodash');
var Promise = require('bluebird');

var api = require('./lib/api');
var deck = require('./lib/deck');
var errors = require('./lib/errors');

//----------------------------------------------------------------------------------------------------------------------

function CardcastAPI(hostname)
{
    this.hostname = hostname || 'https://api.cardcastgame.com';
} // end CardcastAPI()

CardcastAPI.prototype = {
    get apiURL() {
        return this.hostname + '/v1'
    }
}; // end prototype

CardcastAPI.prototype.search = function(query, offset)
{
    var url = api.buildURL(this.apiURL + '/decks', { search: query, offset: offset });

    return api.makeAPICall(url);
}; // end search

CardcastAPI.prototype.deck = function(playCode)
{
    // Not sure if it's required, but it's more formal
    playCode = playCode.toUpperCase();

    var url = this.apiURL + '/decks/' + playCode;

    return api.makeAPICall(url)
        .then(function(summary)
        {
            return deck.buildDeck(url, summary);
        });
}; // end deck

//----------------------------------------------------------------------------------------------------------------------

module.exports = {
    CardcastAPI: CardcastAPI,
    errors: errors
}; // end exports

//----------------------------------------------------------------------------------------------------------------------