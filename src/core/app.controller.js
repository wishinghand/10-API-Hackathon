(function() {
    'use strict';

    angular
        .module('app')
        .controller('appCtrl', appCtrl);

    appCtrl.$inject = ['GoogleAPIFactory'];

    /* @ngInject */
    function appCtrl(GoogleAPIFactory) {
        var vm = this;
        vm.title = 'appCtrl';

        vm.init = GoogleAPIFactory.initMap();
    }
})();