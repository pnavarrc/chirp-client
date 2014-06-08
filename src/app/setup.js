
// var app = {},
//     socket;

// $(function() {

//     app.topics = new App.Collections.Topics();

//     app.topicsForm = new App.Views.Topics({
//         el: '#topics-form',
//         collection: app.topics
//     });

//     socket = io.connect('http://localhost:9720');

//     app.topicsForm.render();

//     app.topics.on('add', function(item) {
//         socket.emit('add', item.toJSON());
//     });

//     socket.on('tweet', function(tweet) {
//         app.topics.addTweet(tweet);
//     });

//     socket.on('connect', function() {
//         console.log('connected with ID', socket.id);
//     });

//     app.barchart = new App.Views.TopicsBarchart({
//         el: $('#topics-barchart'),
//         collection: app.topics
//     });


//     d3.json('dist/data/countries.json', function(error, geodata) {

//         if (error) { return error; }

//         var geojson = topojson.feature(geodata, geodata.objects.countries);

//         app.map = new App.Views.TopicsMap({
//             el: $('#topics-map'),
//             collection: app.topics,
//             geojson: geojson
//         });

//         app.map.render();

//     });

// });

// Create the Application View
var app = {};



$(function() {

    // Render the application
    app.applicationView = new App.Views.Application();
    app.applicationView.render();

    app.topicList = new App.Collections.Topics({
        socket: io.connect('http://localhost:9720')
    });

    app.topicsInputView = new App.Views.Topics({
        collection: app.topicList
    });

    app.topicsInputView.render();

});