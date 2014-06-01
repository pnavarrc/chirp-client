App.Collections.Topics = Backbone.Collection.extend({

    colors: [
        '#556270',  // slate
        '#4ECDC4',  // light blue
        '#C7F464',  // lemmon
        '#FF6B6B',  // pink
        '#C44D58'   // red
    ],


    model: App.Models.Topic,

    initialize: function() {
        this.on('add', function(model) {
            model.set('color', this.colors[this.length - 1]);
        });
    },

    addTweet: function(tweet) {

        var topic = this.get(tweet.word);

        if (topic) {
            topic.get('tweets').push(tweet);
            this.trigger('change:items');
        }
    }
});