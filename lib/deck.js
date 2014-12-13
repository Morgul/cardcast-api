//----------------------------------------------------------------------------------------------------------------------
// A class that represents a deck
//
// @module deck.js
//----------------------------------------------------------------------------------------------------------------------

var _ = require('lodash');
var Promise = require('bluebird');

var api = require('./api');
var cards = require('./cards');

//----------------------------------------------------------------------------------------------------------------------

function Deck(baseURL, summary)
{
    this.baseURL = baseURL;
    this.calls = [];
    this.responses = [];

    // Populate from the summary object
    this.name = summary.name;
    this.code = summary.code;
    this.description = summary.description;
    this.category = summary.category;
    this.listed = !summary.unlisted;
    this.created = new Date(summary.created_at);
    this.updated = new Date(summary.updated_at);
    this.rating = summary.rating;
    this.author = summary.author.username;

    // Populate the cards for this deck
    this.populatedPromise = this._populateCards();
} // end Deck

Deck.prototype._populateCards = function()
{
    var self = this;
    return api.makeAPICall(this.baseURL + '/cards')
        .then(function(results)
        {
            // Build a list of call cards
            self.calls = _.reduce(results.calls || [], function(result, cardData)
            {
                result.push(new cards.Call(cardData));
                return result;
            }, []);

            // Build a list of response cards
            self.responses = _.reduce(results.responses || [], function(result, cardData)
            {
                result.push(new cards.Response(cardData));
                return result;
            }, []);

            // Return ourselves, so everything resolves correctly.
            return self;
        });
}; // end _populateCards

//----------------------------------------------------------------------------------------------------------------------

module.exports = {
    buildDeck: function(baseURL, summary)
    {
        var deck = new Deck(baseURL, summary);
        return deck.populatedPromise;
    }
};

//----------------------------------------------------------------------------------------------------------------------