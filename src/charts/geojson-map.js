// GeoJSON Map
// -----------
charts.geoJsonMap = function() {
    'use strict';

    // Attributes
    var me = {
        width:  200,
        height: 100,
        margin: {top: 5, right: 5, bottom: 5, left: 5}
    };

    function chart(selection) {
        selection.each(function(data) {

            var parent = d3.select(this),
                gmap = parent.selectAll('g.map').data([data]);

            var width  = me.width - me.margin.left - me.margin.right,
                height = me.height - me.margin.top - me.margin.bottom;

            gmap.enter().append('g')
                .attr('class', 'map')
                .attr('transform', 'translate(' + [me.margin.left, me.margin.top] + ')');

            var projection = d3.geo.equirectangular()
                .scale(width / (2 * Math.PI))
                .translate([width / 2, height / 2]);

            var path = d3.geo.path()
                .projection(projection);

            var features = gmap.selectAll('path.feature').data([data]);

            features.enter().append('path')
                .attr('class', 'feature');

            features
                .attr('d', path);
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