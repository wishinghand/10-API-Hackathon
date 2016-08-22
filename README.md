# Project 10: What's Around Me?
## Make an API based website using Angular
### Technologies used:

- HTML
- CSS
    + SASS
    + Bulma.io
- Javascript
    + Angular
- API
    + Google Places API
- Gulp

In order to run you'll have to clone the repo then run `npm install` in your command line. You'll also have to create a `src/secrets` folder, as the one we've made is in our .gitignore file. Inside of this folder make a file called `keys.value.js` and paste this boilerplate in it:

```
(function() {
    'use strict';

    angular
        .module('app')
        .value('APIkey', {googlePlaces: 'yourAPIKeyHere'});
})();
```
Replace the value in `googlePlaces` with an API key you get from Google. You'll need to create a Google Developer's Account in order to do that.