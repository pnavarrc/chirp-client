// Topic Model
// -----------
App.Models.Topic = Backbone.Model.extend({

    idAttribute: 'word',

    initialize: function() {

    },

    defaults: function() {
        return {
            word: '',
            color: '#555',
            tweets: []
        };
    }
});