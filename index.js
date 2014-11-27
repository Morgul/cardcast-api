//----------------------------------------------------------------------------------------------------------------------
// Main entrypoint for the CardCast API.
//
// @module index.js
//----------------------------------------------------------------------------------------------------------------------

var _ = require('lodash');
var Promise = require('bluebird');

var api = require('./lib/api');
var deck = require('./lib/deck');
var errors = require('./lib/errors');

//----------------------------------------------------------------------------------------------------------------------

function CardCastAPI(hostname)
{
    this.hostname = hostname || 'https://api.cardcastgame.com';
} // end CardCastAPI()

CardCastAPI.prototype = {
    get apiURL() {
        return this.hostname + '/v1'
    }
}; // end prototype

CardCastAPI.prototype.search = function(query)
{
    var url = api.buildURL(this.apiURL + '/decks', { search: query });

    return api.makeAPICall(url);
}; // end search

CardCastAPI.prototype.deck = function(deckCode)
{
    // Not sure if it's required, but it's more formal
    deckCode = deckCode.toUpperCase();

    var url = this.apiURL + '/decks/' + deckCode;

    return api.makeAPICall(url)
        .then(function(summary)
        {
            return deck.buildDeck(url, summary);
        });
}; // end deck

//----------------------------------------------------------------------------------------------------------------------

module.exports = {
    CardCastAPI: CardCastAPI,
    errors: errors
}; // end exports

//----------------------------------------------------------------------------------------------------------------------