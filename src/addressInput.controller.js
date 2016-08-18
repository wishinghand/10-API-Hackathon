(function() {
    'use strict';

    angular
        .module('app')
        .controller('addressInputCtrl', addressInputCtrl);

    // addressInputCtrl.$inject = [];

    /* @ngInject */
    function addressInputCtrl() {
        var vm = this;
        vm.title = 'addressInputCtrl';
    }
})();