'use strict';

angular.module('app.live', [])
    .controller('LiveController', ['$scope', 'ActivityManager', 'COMMON_KEYS', function ($scope, ActivityManager, COMMON_KEYS) {
        var activity = ActivityManager.getActiveActivity();

    }]);