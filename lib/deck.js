//----------------------------------------------------------------------------------------------------------------------
// A class that represents a deck
//
// @module deck.js
//----------------------------------------------------------------------------------------------------------------------

var api = require('./api');

var Promise = require('bluebird');

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
            self.calls = results.calls || [];
            self.responses = results.responses || [];
        });
}; // end _populateCards

//----------------------------------------------------------------------------------------------------------------------

module.exports = {
    buildDeck: function(baseURL, summary)
    {
        return new Deck(baseURL, summary);
    }
};

//----------------------------------------------------------------------------------------------------------------------