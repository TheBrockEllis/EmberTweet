/*****************************************************************************
* Application
****************************************************************************/
App = Ember.Application.create();

/*****************************************************************************
* Models
****************************************************************************/
App.Tweet = Ember.Object.extend({
    avatar: null,
    screen_name: null,
    text: null,
    date: null
});

/*****************************************************************************
* Views
****************************************************************************/
App.SearchTextField = Ember.TextField.extend({
    insertNewline: function() {
        App.tweetsController.send("loadTweets");
    }
});


/*****************************************************************************
* Contollers
****************************************************************************/
App.tweetsController = Ember.ArrayController.extend({
    content: [],
    username: '',
    actions : {
        loadTweets: function() {
            var me = this;
            var username = me.get("username");
            //alert("Hello " + username);
            if(username){
                var url = "statuses/user_timeline.json";
                url += "?count=1&screen_name=%@".fmt(username);

                //push username to recent user array

                /*****
                 * The following no longer works due to recent Ember updates
                 * App.recentUsersController.addUser(username);
                *****/

                //Send a request for the addUser method in the actions hash with username as param
                App.recentUsersController.send('addUser', username);

                //load tweets from  da Twitterz
                $.getJSON("http://www.sharproot.com/twitterproxy.php?key=thebrockellis&callback=?&url="+encodeURIComponent(url), function(data){
                    //alert(data);
                    me.set('content', []);
                    $(data).each(function(index, value){
                        var twit = App.Tweet.create({
                            avatar: value.user.profile_image_url,
                            screen_name: value.user.screen_name,
                            text: value.text,
                            date: value.created_at
                        });
                        me.pushObject(twit);
                    });
                });
            }
        }
    }
}).create({});

//changed from .create({ to .extend({
App.recentUsersController = Ember.ArrayController.extend({
    content: [],
    actions: {
        addUser: function(name) {
            //console.log(name);
            if( this.contains(name) ) this.removeObject(name);
            this.pushObject(name);
        },
        removeUser: function(name) {
            console.log(name);
            this.removeObject(name);
        },
        searchAgain: function(name) {
            App.tweetsController.set('username', name);
            App.tweetsController.send("loadTweets");
        }
    },
    reverse: function(){
        return this.get("content").toArray().reverse();
    }.property('@each')

}).create({});
