'use strict';

angular.module('app.service', [])
    .controller('ServiceController', ['$scope', 'ActivityManager', 'COMMON_KEYS','MenuService', function ($scope, ActivityManager, COMMON_KEYS,MenuService) {
        var activity = ActivityManager.getActiveActivity();

        activity.initialize($scope);

        activity.loadI18NResource(function (res) {
            var toolvarData = MenuService.getLanguage().toolbar;
            $scope.select = {
                left: toolvarData.left,
                icon: 'assets/images/icon_toolbar_select.png',
                right: toolvarData.selsct
            };
            $scope.ok = {
                left: toolvarData.left,
                icon: 'assets/images/icon_toolbar_ok.png',
                right: toolvarData.ok
            };
            $scope.menu = {
                left: toolvarData.left,
                icon: 'assets/images/icon_toolbar_menu.png',
                right: toolvarData.menu
            };
        })

        $scope.services = {
            []
        }
    }]);