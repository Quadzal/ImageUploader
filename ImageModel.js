const mongoose = require("mongoose");

const ImageSchema = new mongoose.Schema({
    src:String,
    url_code:String
});


const ImageModel = mongoose.model("Image", ImageSchema);

module.exports = ImageModel;