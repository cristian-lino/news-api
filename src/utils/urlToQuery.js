const urlToQuery = (URL) => {
    var url = require('url');
    var url_parts = url.parse(URL, true);
    var query = url_parts.query;

    return query
}

module.exports = {urlToQuery}