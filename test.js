//----------------------------------------------------------------------------------------------------------------------
// Brief description for test.js module.
//
// @module test.js
//----------------------------------------------------------------------------------------------------------------------

var CardCastAPI = require('./index.js').CardCastAPI;

//----------------------------------------------------------------------------------------------------------------------

var api = new CardCastAPI();

/*
api.search("biscuit")
    .then(function(results)
    {
        return results.hasNext ? results.next() : results;
    })
    .then(function(results)
    {
        console.log('decks:', results.data.length);
    });
*/

api.deck('NJ3HX')
    .then(function(deck)
    {
        deck.populatedPromise.then(function()
        {
            console.log('name:', deck.name);
            console.log('calls:', deck.calls);
        });
    });
//----------------------------------------------------------------------------------------------------------------------