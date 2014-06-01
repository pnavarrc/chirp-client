
var app = {},
    socket;

$(function() {

    app.topics = new App.Collections.Topics();

    app.topicsForm = new App.Views.Topics({
        el: '#topics-form',
        collection: app.topics
    });

    socket = io.connect('http://localhost:9720');

    app.topicsForm.render();

    app.topics.on('add', function(item) {
        socket.emit('add', item.toJSON());
    });

    socket.on('tweet', function(tweet) {
        app.topics.addTweet(tweet);
    });

    app.barchart = new App.Views.TopicsBarchart({
        el: $('#topics-barchart'),
        collection: app.topics
    });


    d3.json('dist/data/land.json', function(error, geodata) {

        if (error) { return error; }

        var geojson = topojson.feature(geodata, geodata.objects.ne_50m_land);

        app.map = new App.Views.TopicsMap({
            el: $('#topics-map'),
            collection: app.topics,
            geojson: geojson
        });

        app.map.render();

    });

});