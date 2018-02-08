// var express = require('express');
// // var path = require('path');
// var app = express();
// var bodyParser = require('body-parser');
// var mongoose = require('mongoose'); 

// app.use(bodyParser.urlencoded({ extended: true }));   //add this line
// app.use(bodyParser.json());  //add this line

// var app = express();
// app.listen(3001);

var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/weatherDB', function () {
  console.log("CONNECTED !")
});
var app = express();
app.use(express.static('public'));
app.use(express.static('node_modules'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.listen(3001);


var City = require('./models/wheather');


app.get('/citiesdb', function (req, res) { //get the data from db all of it 
  City.find(function (error, data) {
    if (error) throw error;
    res.send(data);
  })
})

app.post('/savecity', function (req, res) {
  console.log(req.body)
  var newCity = new City(req.body)
  newCity.save(function (err, data) {
    if (err) throw err
    res.send(data)
  })
});

app.delete('/deletecity/:cityId', function (req, res) {
  City.findByIdAndRemove(req.params.cityId, function (err, data) {
    if (err) throw err;
    res.send();
  })
})

app.post('/savecity/:cityId/comment', function (req, res) {
  City.findById(req.params.cityId, function (err, data) {
    if (err) throw err;
    data.comments.push(req.body);
    data.save(function (err, data) {
      if (err) throw err;
      res.send(data)
    });
  })
})

app.delete('/city/:cityId/deletecomment/:commentId', function (req, res) {
  City.findById(req.params.cityId, function (err, data) {
    console.log(data);
    if (err) throw err;
    for(var i=0;i<data.comments.length;i++){
      if(data.comments[i]._id==req.params.commentId){
        data.comments.splice(i,1);
        data.save((err)=>{
          if (err) throw err;
          console.log('the comment removed');})
      }
    }
    res.send();
  })
})


  // app.post('/savecity',function(req, res) {
  //   console.log(req.body);
  //   console.log(req.body);
  //   var newcity = new City(req.body);// understand how to get the name pass an object with name and comment array
  //   newcity.save(function (err, data) {
  //     if (err) throw err;
  //     else res.send(data);
  //   })
  // })
// var london =new City({
//     name: "berlin",
// })
// london.comments.push({name: "hi shirly", txt: "world"});
// london.save(function(err, data) {
//   if (err) {
//     console.error(err);
//   } else {
//     console.error(data);
//   }
// })