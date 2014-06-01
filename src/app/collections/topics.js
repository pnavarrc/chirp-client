App.Collections.Topics = Backbone.Collection.extend({

    colors: [
        '#00aaff',  // light blue
        '#8cff00',  // green
        '#ffd900',  // yellow
        '#df00ff',  // pink
        '#e52d72'   // cherry
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