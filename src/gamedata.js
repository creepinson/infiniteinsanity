let mongoose = require('mongoose');

let userSchema = new mongoose.Schema({
  username: String,
  email: String,
  assets: Array
});

let uModel = mongoose.model('User', userSchema)l

function createUser(username, email){
  let user = new uModel({
     username: username,
     email: mail,
     assets: []
  });
  user.save(function (err) {
    if (err){
      console.log(err)
      return;
    }
    // saved!
  });

}

function addAsset(asset, userEmail){
  let u = await uModel.findOne({ email: userEmail });
  if(u){
    var na = u.assets;
    na.push(asset);
    uModel.updateOne({ email: userEmail }, { assets: na }, function(err, res) {
      // Updated at most one doc, `res.modifiedCount` contains the number
      // of docs that MongoDB updated
    });
  }
}

module.exports = { User: uModel, addAsset, createUser };
