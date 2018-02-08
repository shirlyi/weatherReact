var mongoose = require('mongoose');

var commentSchema = new mongoose.Schema({
    name: String,
    txt: String
});

var citySchema = new mongoose.Schema({
    name: String,
    comments: [commentSchema]
}, { usePushEach: true });

var City = mongoose.model('city', citySchema);

module.exports = City;




// var commentSchema = new mongoose.Schema({
//     name: String,
//     txt: String
// });

// var cityDataSchema = new mongoose.Schema({
//     name: String,
//     icon: String,
//     feelslike_c: Number,
//     text: String,
//     comments: [commentSchema]
// }, { usePushEach: true });

// var CityData = mongoose.model('cityData', cityDataSchema)

// module.exports = CityData

