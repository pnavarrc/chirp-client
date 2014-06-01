App.Views.Topics = Backbone.View.extend({

    template: _.template($('#topics-template').html()),

    events: {
        'click a': 'addTopic',
    },

    initialize: function (options) {
        // this.listenTo(this.collection, 'add', this.render);
    },

    render: function () {
        this.$el.html(this.template(this.collection.toJSON()));
        return this;
    },

    addTopic: function(event) {

        var newTopic = this.$('#new-topic').val().trim();

        // Limit to 5 topics
        if (this.collection.length < 5) {

            // Extract only one word
            newTopic = newTopic.split(' ').pop();

            this.collection.add({word: newTopic, color: '#babdb6'});
            this.$('#new-topic').val('');
        }
    }
});