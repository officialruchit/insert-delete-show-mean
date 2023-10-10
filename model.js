const mongoose = require("mongoose");
const data = mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  pass: {
    type: String,
    require: true,
  },
});
const dataa = mongoose.model("data", data);
module.exports = dataa;
