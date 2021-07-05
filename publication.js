const mongoose = require("mongoose");
const publicationSchema = mongoose.Schema({
    id: Number,
      name: String,
      books: [String],
});
// create a book model
const PublicationModel = mongoose.model(publicationSchema);
module.exports = PublicationModel;