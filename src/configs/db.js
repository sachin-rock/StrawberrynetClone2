const mongoose = require("mongoose");

mongoose

const connect = async () => {
    return mongoose.connect("mongodb://127.0.0.1:27017/u4c4project");
  };

  module.exports = connect