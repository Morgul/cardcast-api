//----------------------------------------------------------------------------------------------------------------------
// Brief description for test.js module.
//
// @module test.js
//----------------------------------------------------------------------------------------------------------------------

var CardcastAPI = require('./../index.js').CardcastAPI;

//----------------------------------------------------------------------------------------------------------------------

var api = new CardcastAPI();

console.log('------------------------');
console.log('Searching for decks named "biscuit"...\n');

api.search("biscuit")
    .then(function(results)
    {
        console.log('  # of decks:', results.data.length);
        console.log('------------------------');
    })
    .then(function()
    {
        console.log('Retrieving a deck...\n');
        api.deck('NJ3HX')
            .then(function(deck)
            {
                deck.populatedPromise.then(function()
                {
                    console.log('  name:', deck.name);
                    console.log('  # of calls:', deck.calls.length);
                    console.log('  # of responses:', deck.responses.length);
                    console.log('------------------------');
                });
            });
    });
//----------------------------------------------------------------------------------------------------------------------