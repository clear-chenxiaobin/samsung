'use strict';

angular.module('app.menu', [])
    .controller('LiveController', ['$scope', 'ActivityManager', 'COMMON_KEYS', function ($scope, ActivityManager, COMMON_KEYS) {
        var activity = ActivityManager.getActiveActivity();

    }]);