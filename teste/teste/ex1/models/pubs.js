const mongoose = require ('mongoose')

var filmeSchema = new mongoose.Schema({
    type: String,
    id: String,
    authors: [String],
    editors: [String],
    title: String,
    chapter: String,
    pages: String,
    volume: String,
    publisher: String,
    booktitle: String,
    journal: String,
    issn: String,
    year: String,
    address: String,
    month: String,
    isbn: String,
    doi: String
})

module.exports = mongoose.model('pubs', filmeSchema);