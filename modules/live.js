'use strict';

angular.module('app.menu', [])
    .controller('MenuController', ['$scope', 'ActivityManager', 'COMMON_KEYS', 'MenuService', function ($scope, ActivityManager, COMMON_KEYS, MenuService) {
        var activity = ActivityManager.getActiveActivity();
    }]);