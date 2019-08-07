const express = require('express');
const cors = require('cors');
const fileUpload = require("express-fileupload");
const shortid = require("shortid");
const app = express();
const mongoose = require("mongoose");
const ImageModel = require("./ImageModel");
const history = require("connect-history-api-fallback");
const fs = require("fs");
app.use(history({
    rewrites:[
        {from:"\/i/", to:"/"},
        {from:"\/delete/", to:"/"}
    ],
}));

app.use(fileUpload());
app.use(cors());
app.use(express.static(__dirname));

app.get("/", (req, res) => {
    res.sendFile("index.html");
})

app.post("/api/upload/image", async (req, res) => {
    if(req.files){
        let image = req.files.image
        let image_type = image.mimetype.split("/");

        if(image_type[0] == "image"){

            let image_url_code = shortid.generate() + "." + image_type[1]
            let image_src = __dirname + "/uploads/" + image_url_code

            await image.mv(image_src);
            
            let new_image = new ImageModel({
                src:"/uploads/"+image.name,
                url_code:image_url_code
            })
            
            new_image.save();
            return res.json(new_image)
        }
        return res.status(301).json({"error":"error"});
    }
});
app.get("/api/image/:url_code", async (req, res) => {
    return res.json(await ImageModel.findOne({url_code:req.params.url_code}).exec());
})

app.get("/api/delete/:image_code", async (req, res) => {
    await ImageModel.deleteOne({url_code:req.params.image_code});
    fs.unlinkSync(__dirname + "/uploads/" + req.params.image_code);
    return res.json({"success":"success"});
})

app.listen(8000, () => {
    mongoose.connect("mongodb://esatbey:esat3535@ds261521.mlab.com:61521/esat35", {useNewUrlParser:true});
});
