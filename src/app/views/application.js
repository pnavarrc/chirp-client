// Application View
App.Views.Application = Backbone.View.extend({

    el: $('#application-container'),

    template: _.template($('#application-template').html()),

    render: function() {
        this.$el.html(this.template());
        return this;
    }
});