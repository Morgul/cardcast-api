//----------------------------------------------------------------------------------------------------------------------
// Custom Error objects
//
// @module errors.js
//----------------------------------------------------------------------------------------------------------------------

function NotImplementedError(api) {
    this.name = "NotImplementedError";
    this.message = api + " not implemented.";
}
NotImplementedError.prototype = Error.prototype;

function NotFoundError(url) {
    this.name = "NotFoundError";
    this.message = url + " not found.";
}
NotFoundError.prototype = Error.prototype;

function ResponseError(request, error) {
    this.name = "ResponseError";
    this.request = request;
    this.inner = error;
    this.message = "Error calling api endpoint. Returned status code " + request.statusCode + ". Error: \n" + error.stack;
}
ResponseError.prototype = Error.prototype;

function TimeoutError() {
    this.name = "TimeoutError";
    this.message = "A timeout occurred contacting the api.";
}
TimeoutError.prototype = Error.prototype;

function PaginationError(message) {
    this.name = "PaginationError";
    this.message = message;
}
PaginationError.prototype = Error.prototype;

//----------------------------------------------------------------------------------------------------------------------

module.exports = {
    NotImplementedError: NotImplementedError,
    NotFoundError: NotFoundError,
    ResponseError: ResponseError,
    PaginationError: PaginationError,
    TimeoutError: TimeoutError
}; // end exports

//----------------------------------------------------------------------------------------------------------------------