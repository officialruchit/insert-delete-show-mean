const express = require("express");
const app = express();
//model
const mongoose = require("mongoose");
const model = require("./model");
//connection
const url =
  "mongodb+srv://testing:test@atlascluster.ij20tlj.mongodb.net/da?retryWrites=true&w=majority";

mongoose
  .connect(url, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("connect");
  })
  .catch((err) => {
    console.log("err");
  });
//body parser
const bodyparser = require("body-parser");
app.use(bodyparser.urlencoded({ extended: false }));
//jdon
app.use(express.json());

//static file
app.use(express.static(__dirname));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "index.html");
});

//show all data
app.get("/show", async (req, res) => {
  const data = await model.find();
  res.json(data);
});

app.post("/data", async (req, res) => {
  const { name, pass } = req.body;
  const data = new model({
    name,
    pass,
  });
  await data.save();
  res.json(await model.find());
});

//delete
app.delete('/data/:id',async(req,res)=>{
    try{
    await model.findByIdAndRemove(req.params.id)
    res.json(await model.find())
    }catch(err){
    console.log("err")
    }
    })

    //byid

    app.get('/show/:id',async(req,res)=>{
try{
const hh=await model.findById(req.params.id)
res.json(hh)
}catch(err){
console.log("err")
}
    })















app.listen(4444, () => {
  console.log("done");
});

