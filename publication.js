const mongoose = require("mongoose");
const publicationSchema = mongoose.Schema({
    id: Number,
      name: String,
      books: [String],
});
const PublicationModel = mongoose.model(publicationSchema);
module.exports = PublicationModel;