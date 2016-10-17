# What's Around Me?

> Prompt: Make an API based website using Angular

## Technologies used

- HTML
- CSS
    + SASS
    + Bulma.io
- Javascript
    + Angular
    + Gulp
- API
    + Google Places API

## How to Run
Clone the repo, `cd` into the directory and run:
```
npm install
```

You'll also have to create a `src/secrets` folder, as the one we've made is in our .gitignore file. Inside of this folder make a file called `keys.value.js` and paste this boilerplate in it:

```
(function() {
    'use strict';

    angular
        .module('app')
        .value('APIkey', {googlePlaces: 'yourAPIKeyHere'});
})();
```
Replace the value in `googlePlaces` with an API key you get from Google. You'll need to create a Google Developer's Account in order to do that.

Once that's done, run 
```
gulp serve
```

## Screenshots
![Web interface of a Google Maps based store finder](http://i.imgur.com/7aa0mEY.png)
---
![Web interface of a Google Maps based store finder with the options exposed](http://i.imgur.com/QcwEghe.png)
---
![Web interface of a Google Maps based store finder showing results](http://i.imgur.com/LfXefj8.png)
