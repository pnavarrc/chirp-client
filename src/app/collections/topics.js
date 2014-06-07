// Topics Collection
// -----------------
App.Collections.Topics = Backbone.Collection.extend({

    // Color for each topic
    colors: [
        '#00aaff',  // light blue
        '#ffd900',  // yellow
        '#df00ff',  // pink
        '#e52d72',  // cherry
        '#7ee500',  // green
    ],

    //
    model: App.Models.Topic,

    // Collection Initialization
    initialize: function() {

        // Set the topic color when added
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