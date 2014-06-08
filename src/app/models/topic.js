// Topic Model
App.Models.Topic = Backbone.Model.extend({

    // The `word` attribute will identify uniquely our topic
    idAttribute: 'word',

    // Default model values
    defaults: function() {
        return {
            word:   'topic',
            color:  '#555',
            tweets: []
        };
    }
});