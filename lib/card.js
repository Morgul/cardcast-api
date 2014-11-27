//----------------------------------------------------------------------------------------------------------------------
// A class that represents a card.
//
// @module card.js
//----------------------------------------------------------------------------------------------------------------------

function Card(data)
{
    this.id = data.id;
    this.created = new Date(data.created_at);
    this._text = data.text;
} // end Card

Card.prototype = {
    get text()
    {
        return this._text.join("_");
    }
}; // end prototype

Card.prototype.toJSON = function()
{
    return {
        id: this.id,
        created: this.created,
        text: this.text
    }
}; // end toJSON

//----------------------------------------------------------------------------------------------------------------------

module.exports = Card;

//----------------------------------------------------------------------------------------------------------------------