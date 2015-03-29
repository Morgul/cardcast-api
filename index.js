//----------------------------------------------------------------------------------------------------------------------
// Main entrypoint for the Cardcast API.
//
// @module index.js
//----------------------------------------------------------------------------------------------------------------------

var _ = require('lodash');
var Promise = require('bluebird');

var api = require('./lib/api');
var deck = require('./lib/deck');
var cards = require('./lib/cards');
var errors = require('./lib/errors');

//----------------------------------------------------------------------------------------------------------------------

function CardcastAPI(options)
{
   this.options = _.defaults({}, options, {
        hostname: 'https://api.cardcastgame.com',
        timeout: 2000
    });
} // end CardcastAPI()

CardcastAPI.prototype = {
    get apiURL() {
        return this.options.hostname + '/v1'
    }
}; // end prototype

CardcastAPI.prototype.search = function(query, offset)
{
    var url = api.buildURL(this.apiURL + '/decks', { search: query, offset: offset });

    return api.makeAPICall(url, this.options.timeout);
}; // end search

CardcastAPI.prototype.deck = function(playCode)
{
    // Not sure if it's required, but it's more formal
    playCode = playCode.toUpperCase();

    var url = this.apiURL + '/decks/' + playCode;

    return api.makeAPICall(url, this.options.timeout)
        .then(function(summary)
        {
            return deck.buildDeck(url, summary);
        });
}; // end deck

//----------------------------------------------------------------------------------------------------------------------

module.exports = {
    CardcastAPI: CardcastAPI,
    cards: cards,
	deck: deck,
    errors: errors
}; // end exports

//----------------------------------------------------------------------------------------------------------------------
