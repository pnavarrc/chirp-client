// GeoJSON Points
// --------------
charts.geoPoints = function() {
    'use strict';

    // Attributes
    var me = {
        width:  200,
        height: 100,
        margin: {top: 0, right: 0, bottom: 0, left: 0},
        radius: function(d) { return 2; },
        feature: function(d) { return d.feature; },
        color: function(d, i) { return '#000'; }
    };

    function chart(selection) {
        selection.each(function(data) {

            var parent = d3.select(this),
                gchart = parent.selectAll('g.geopoints').data([data]);

            var width  = me.width - me.margin.left - me.margin.right,
                height = me.height - me.margin.top - me.margin.bottom;

            gchart.enter().append('g')
                .attr('class', 'geopoints')
                .attr('transform', 'translate(' + [me.margin.left, me.margin.top] + ')');

            var projection = d3.geo.equirectangular()
                .scale(width / (2 * Math.PI))
                .translate([width / 2, height / 2]);

            var path = d3.geo.path()
                .pointRadius(me.radius)
                .projection(projection);

            var initialPath = d3.geo.path()
                .pointRadius(15)
                .projection(projection);

            var points = gchart.selectAll('path.geopoint').data(data);

            points.enter().append('path')
                .attr('class', 'geopoint')
                .attr('d', function(d) {
                    return initialPath(me.feature(d));
                })
                .attr('fill', me.color)
                .attr('fill-opacity', 0.25);

            points.transition().duration(400)
                .attr('d', function(d) {
                    return path(me.feature(d));
                })
                .attr('fill-opacity', 0.75)
                .attr('fill', me.color);

        });
    }

    // Accessor methods
    function createAccessor(attr) {
        return function(value) {
            if (!arguments.length) { return me[attr]; }
            me[attr] = value;
            return chart;
        }
    }

    for (var attr in me) {
        if ((!chart[attr]) && (me.hasOwnProperty(attr))) {
            chart[attr] = createAccessor(attr);
        }
    }

    return chart;
};