App.Views.TopicsBarchart = Backbone.View.extend({

    chart: charts.barChart()
        .label(function(d) { return d.word; })
        .value(function(d) { return d.count; })
        .color(function(d) { return d.color; }),

    events: {},

    initialize: function () {

        this.listenTo(this.collection, 'change:items', this.render);
        this.listenTo(this.collection, 'add', this.render);
    },

    render: function () {

        var data = this.collection.toJSON();

        data.forEach(function(item) {
            item.count = item.tweets.length;
        });

        // Adjust the chart width
        var div = d3.select(this.el),
            width  = parseInt(div.style('width'), 10),
            height = parseInt(div.style('height'), 10);

        this.chart.width(width).height(height);

        d3.select(this.el).data([data]).call(this.chart);
        return this;
    }
});