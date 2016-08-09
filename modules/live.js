'use strict';

angular.module('app.live', [])
    .controller('LiveController', ['$scope', 'ActivityManager', 'COMMON_KEYS', 'LiveService', function ($scope, ActivityManager, COMMON_KEYS, LiveService) {
        var activity = ActivityManager.getActiveActivity();
        activity.initialize($scope);
        ActivityManager.showLoading();
        ActivityManager.hideLoading(500);
        activity.loadI18NResource(function (res) {
            var languageData = LiveService.getLanguage();
            $scope.left = languageData.toolbar.left;
            $scope.select = {
                icon: 'assets/images/icon_toolbar_select.png',
                right: languageData.toolbar.select_Live
            };
            $scope.ok = {
                icon: 'assets/images/icon_toolbar_ok.png',
                right: languageData.toolbar.play
            };
            $scope.menu = {
                icon: 'assets/images/icon_toolbar_menu.png',
                right: languageData.toolbar.menu
            };
            $scope.menuFinish = function () {
                ActivityManager.getActiveActivity().animate(0, 'menu-item-list', 'menu-animation');
            }
            $scope.selectedItemIndex = 0;
            $scope.logoUrl = "assets/images/icon_logo_tv.png";
            $scope.name = languageData.live.name;
        })

        activity.onKeyDown(function (keyCode) {
            var tempIndex = $scope.selectedIndex;
            switch (keyCode) {
                case COMMON_KEYS.KEY_UP:
                    tempIndex += 1;
                    //cutVideo();
                    break;
                case COMMON_KEYS.KEY_DOWN:
                    tempIndex -= 1;
                    //cutVideo();
                    break;
                case COMMON_KEYS.KEY_ENTER:
                    activity.show();
                    break;
                case COMMON_KEYS.KEY_BACK:
                    //LiveService.stopPlay();
                    //document.getElementsByTagName("body")[0].setAttribute("style", "background-image:(url:../assets/images/bg_window.jpg)");
                    activity.finish();
                    break;
            }
            $scope.selectedIndex = tempIndex;
        })

        function bindChannels() {
            $scope.liveItems = [];
        }

    }])
    .service('LiveService', ['ResourceManager', function (ResourceManager) {
        this.getLanguage = function () {
            return ResourceManager.getLocale();
        }
    }]);;