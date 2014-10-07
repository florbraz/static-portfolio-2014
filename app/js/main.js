var App = App || {};

$(function() {

});

// functions that needs to be resized should be in resize.js
$(window).on("load focus", function(evt) {
    App.Resize.Smart(evt);
    App.Resize.Force(evt);
});

// use smartresize if the function that's triggered on resize is too heavy to be triggered a lot of times
$(window).smartresize(function() {
    App.Resize.Smart(evt);
});

$(window).resize(function() {
    App.Resize.Force(evt);
});