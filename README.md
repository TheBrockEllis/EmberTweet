EmberTweet
==========

Basic Tweet reader built with Ember.js

==========

This little app was built while going through the ["Flame on! A beginner's guide to Ember.js"](http://www.adobe.com/devnet/html5/articles/flame-on-a-beginners-guide-to-emberjs.html). I found the walkthrough to be very easy to follow and laid out some of the basics of Ember in good way. Unfortunately, it was written with an outdated version of Ember. During this project, I found myself Googling quite a bit trying to figure out why exactly something wasn't working.  Here is a quick list off the top of my head:

- Twitter changed their API. Had to register an application and set up a proxy on a server
- Ember changed the way Arraycontrollers are setup. They must be "extended" and then "created"
- When adding an action to a form element, the methods need to be in the "actions" hash
- When trying to programatically call the aforementioned methods, you need to call .send("function") instead of just .function()

I hope to write a blog post about this tutorial soon so I can outline all of the edits that needed to be made. Please create an issue for any n00b mistakes I may have made.

I kind of like this Ember thing...I think I'll stick with it.


