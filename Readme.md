# Unofficial Cardcast API

This is an unofficial API for searching/retrieving decks from [cardcastgame.com](cardcastgame.com).

**Disclaimer**: This library is not associated with Cardcast, but they are aware of it's existence. If you use this
library, you should contact them to make sure they are okay with how you intend to use it.

## Usage

This api is promise based, and is basically just a thing wrapper around rest calls. Start by creating an instance of
the api library:

```javascript
var CardcastAPI = require('cardcast-api');

var api = new CardcastAPI();
```

Easy, right?

### `api.search()`

* `search` - Text to search by. (This is equivalent to what you put in the search box on the website.)
* Returns a `PaginatedResult` object, containing a list of matching deck summaries.

This is just a simple wrapper around the search on the website. It's just useful enough to get play codes, if you have
an idea of what the name of the deck is.

If you want to get a complete list, simply don't pass in anything for `search`.

### `api.deck()`

* `playCode` - The play code of the deck you're looking to retrieve.
* Returns a `Deck` object.

This retrieves a deck and then populates the `Deck` object. This object is basically a convenience wrapper that also
wraps all cards in `Card` objects, which should eventually support things like formatting.

### Example

If you want to see a complete example, check out [/example/test.js](https://github.com/Morgul/cardcast-api/blob/master/example/test.js)

## Status

The api is complete working, but as you can see I'm very light on documentation. I need to document the various objects
that get returned, and then focus on improving the `Card` object.

Please, keep in mind, this is a project that has had minimal effort. I'm more than willing to keep going with this, but
it is not even remotely my primary focus. OTOH, the api is simple, and should be relatively robust and easy to maintain.
Feel free to file bugs, or make improvements.
