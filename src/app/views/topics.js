App.Views.Topics = Backbone.View.extend({

    template: _.template($('#topics-template').html()),

    events: {
        'keypress #new-topic': 'addOnEnter',
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
    },

    addOnEnter: function(e) {

        var ENTER_KEY = 13,
            ESC_KEY = 27;

        var word = this.$('#new-topic').val().trim();

        if (event.which !== ENTER_KEY || !word) {
            return;
        }

        this.collection.add({word: word});
        this.$('#new-topic').val('');
    }
});