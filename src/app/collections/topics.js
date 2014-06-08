// Topics Collection
App.Collections.Topics = Backbone.Collection.extend({

    // The collection model
    model: App.Models.Topic,

    // Collection Initialization
    initialize: function(options) {

        this.options = options || {};

        // Set the topic color when added
        this.on('add', function(model) {
            model.set('color', App.Colors[this.length - 1]);
        });

        this.on('add', function(topic) {
            console.log(topic);
        });

        this.listenTo(this.options.socket, 'tweet', function() {
            console.log('Tweet')
        });
    },

    addTweet: function(tweet) {

        // Gets the corresponding model instance.
        var topic = this.get(tweet.word);

        // If the model instance is found, push the tweet to the tweets array.
        if (topic) {
            topic.get('tweets').push(tweet);

            // Notifies that a tweet was added to a topic instance.
            this.trigger('change:tweets');
        }
    }
});