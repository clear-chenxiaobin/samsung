'use strict';

angular.module('app.live', [])
    .directive('repeatFinish', ['ActivityManager', function (ActivityManager) {
        return {
            link: function (scope, element, attr) {
                if (scope.$last == true) {
                    scope.$eval(attr.repeatFinish);
                    scope.$last = false;
                }
            }
        }
    }])
    .controller('LiveController', ['$scope', 'ActivityManager', 'COMMON_KEYS', 'LiveService', function ($scope, ActivityManager, COMMON_KEYS, LiveService) {
        var activity = ActivityManager.getActiveActivity();
        var channels = [];
        var LISTTOP;
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
            $scope.logoUrl = "assets/images/icon_logo_tv.png";
            $scope.name = languageData.live.name;


        })

        bindChannels();
        $scope.liveFinish = function () {
            $scope.selectedIndex = 0;
            LISTTOP = -480;
            $scope.listStyleTop = LISTTOP + "px";
        }

        activity.onKeyDown(function (keyCode) {
            var tempIndex = $scope.selectedIndex;
            switch (keyCode) {
                case COMMON_KEYS.KEY_UP:
                    tempIndex -= 1;
                    if (tempIndex < 0) {
                        $scope.listStyleTop = (LISTTOP - ($scope.channels.length - 1) * 80) + "px";
                        tempIndex = $scope.channels.length - 1;
                    } else {
                        $scope.listStyleTop = (LISTTOP - tempIndex * 80) + "px";
                    }
                    //cutVideo();
                    break;
                case COMMON_KEYS.KEY_DOWN:
                    tempIndex += 1;
                    if (tempIndex > $scope.channels.length - 1) {
                        $scope.listStyleTop = LISTTOP + "px";
                        tempIndex = 0;
                    } else {
                        $scope.listStyleTop = (LISTTOP - tempIndex * 80) + "px";
                    }
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
            //for (var i = 0; i < 10; i++) {
            //    channels.push(
            //        {
            //            index: i,
            //            icon: 'assets/images/live_icon_5.png',
            //            name: 'CCTV5',
            //            //stream: chaData[i].stream
            //        });
            //}
            channels = [
                {index: 0, icon: 'assets/images/live_icon_5.png', name: 'CCTV1',},
                {index: 0, icon: 'assets/images/live_icon_5.png', name: 'CCTV2',},
                {index: 0, icon: 'assets/images/live_icon_5.png', name: 'CCTV3',},
                {index: 0, icon: 'assets/images/live_icon_5.png', name: 'CCTV4',},
                {index: 0, icon: 'assets/images/live_icon_5.png', name: 'CCTV5',},
                {index: 0, icon: 'assets/images/live_icon_5.png', name: 'CCTV6',},
                {index: 0, icon: 'assets/images/live_icon_5.png', name: 'CCTV7',},
                {index: 0, icon: 'assets/images/live_icon_5.png', name: 'CCTV8',},
                {index: 0, icon: 'assets/images/live_icon_5.png', name: 'CCTV9',},
                {index: 0, icon: 'assets/images/live_icon_5.png', name: 'CCTV10',},

            ]
            $scope.channels = channels;
        }
    }])
    .service('LiveService', ['ResourceManager', function (ResourceManager) {
        this.getLanguage = function () {
            return ResourceManager.getLocale();
        }
    }]);
;