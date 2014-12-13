//----------------------------------------------------------------------------------------------------------------------
// Some classes that represents the cards.
//
// @module card.js
//----------------------------------------------------------------------------------------------------------------------

function Card(data)
{
    this.id = data.id;
    this.created = new Date(data.created_at);
    this.text = data.text;
} // end Card

Card.prototype.toJSON = function()
{
    return {
        id: this.id,
        created: this.created,
        text: this.text
    }
}; // end toJSON

//----------------------------------------------------------------------------------------------------------------------

function CallCard(data)
{
    Card.call(this, data);
} // end CallCard

CallCard.prototype = {
    get displayText()
    {
        return this.text.join("_");
    },
    get numResponses()
    {
        return this.text.length - 1;
    }
}; // end prototype

CallCard.prototype.toJSON = function()
{
    return {
        id: this.id,
        created: this.created,
        text: this.text,
        numResponses: this.numResponses
    }
}; // end toJSON

//----------------------------------------------------------------------------------------------------------------------

function ResponseCard(data)
{
    Card.call(this, data);

    this.text = this.text[0];
} // end ResponseCard

ResponseCard.prototype = {
    get displayText()
    {
        return this.text.charAt(0).toUpperCase() + this.text.slice(1)
    }
}; // end prototype

//----------------------------------------------------------------------------------------------------------------------

module.exports = {
    Call: CallCard,
    Response: ResponseCard
};

//----------------------------------------------------------------------------------------------------------------------