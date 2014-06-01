App.Views.TopicsMap = Backbone.View.extend({

    chart: charts.map()
        .feature(function(d) { return d.coordinates; })
        .color(function(d) { return d.color; }),

    initialize: function (options) {

        this.chart.geojson(options.geojson);

        this.listenTo(this.collection, 'change:items', this.render);
    },

    render: function () {

        var data = [];

        this.collection.toJSON().forEach(function(topic) {
            topic.tweets.map(function(t) { t.color = topic.color; });
            data = data.concat(topic.tweets);
        });

        var div = d3.select(this.el),
            width  = parseInt(div.style('width'),  10);

        this.chart
            .width(width)
            .height(width / 2)
            .scale(width / (2 * Math.PI));

        div.data([data]).call(this.chart);

        return this;
    }
});