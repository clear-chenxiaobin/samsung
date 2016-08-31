'use strict';

angular.module('app.music', [])
    .controller('MusicController', ['$scope', 'ActivityManager', 'COMMON_KEYS', 'MusicService', function ($scope, ActivityManager, COMMON_KEYS, MusicService) {
        var activity = ActivityManager.getActiveActivity();
        activity.initialize($scope);

        var music = [];
        var stream,
            musicData,
            listHide = false;

        //ActivityManager.showLoading();
        //ActivityManager.hideLoading(500);

        activity.loadI18NResource(function (res) {
            var languageData = MusicService.getLanguage();
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
            $scope.name = languageData.music.title;
        })

        if (MusicService.getMusics().length == 0) {
            MusicService.getPlayUrl().success(function (data) {
                MusicService.initialize().success(function (data) {
                    console.log(MusicService.getMusics());
                    bindMusic();
                })
            })
        } else {
            bindMusic();
        }

        activity.onKeyDown(function (keyCode) {
            var tempIndex = $scope.selectedItemIndex;
            if (listHide) {
                switch (keyCode) {
                    case COMMON_KEYS.KEY_LEFT:
                        if (tempIndex > 0) {
                            tempIndex -= 1;
                        }
                        break;
                    case COMMON_KEYS.KEY_RIGHT:
                        if (tempIndex < $scope.musicItems.length - 1) {
                            tempIndex += 1;
                        }
                        break;
                    case COMMON_KEYS.KEY_ENTER:
                        break;
                    case COMMON_KEYS.KEY_BACK:
                        backList();
                        break;
                }
                $scope.selectedItemIndex = tempIndex;
                return;
            }
            switch (keyCode) {
                case COMMON_KEYS.KEY_UP:
                    if (tempIndex > 0) {
                        tempIndex -= 1;
                    }
                    break;
                case COMMON_KEYS.KEY_DOWN:
                    if (tempIndex < $scope.musicItems.length - 1) {
                        tempIndex += 1;
                    }
                    break;
                case COMMON_KEYS.KEY_ENTER:
                    initPlayer();
                    break;
                case COMMON_KEYS.KEY_BACK:
                    activity.hide();
                    break;
            }
            $scope.selectedItemIndex = tempIndex;
        })

        function bindMusic() {
            musicData = MusicService.getMusics();
            for (var i = 0; i < musicData.length; i++) {
                music.push({
                    name: musicData[i].name,
                    pic: musicData[i].pic,
                    stream: musicData[i].stream
                });
            }
            $scope.musicItems = music;
            $scope.selectedItemIndex = 0;
            $(".music-item-container .music-player").hide();
        }

        function initPlayer() {
            $(".music-item-container .music-list-container").hide();
            $(".music-item-container .music-player").show();
            listHide = true;
        }

        function backList() {
            $(".music-item-container .music-list-container").show();
            $(".music-item-container .music-player").hide();
            listHide = false;
        }
    }])
    .service('MusicService', ['$q', '$http', 'ResourceManager', function ($q, $http, ResourceManager) {
        var configUrl,
            conUrl = ResourceManager.getConfigurations().serverUrl(),
            jsonUrl,
            music = [];

        this.getLanguage = function () {
            return ResourceManager.getLocale();
        }

        this.initialize = function () {
            var deferred = $q.defer();

            // cached configurations
            if (jsonUrl === configUrl) {
                deferred.resolve();
                return deferred.promise;
            }
            return $http.get(jsonUrl).success(function (configJSON) {
                configUrl = jsonUrl;
                configJSON.Content.forEach(function (el, idx, arr) {
                    music.push({
                        name: el.Name,
                        pic: conUrl + el.Picurl,
                        stream: conUrl + el.PlayURL
                    });
                });
            });
        };

        this.getPlayUrl = function () {
            return $http.get(conUrl + '/Main/json/MainMenu_4.json').success(function (menuJSON) {
                menuJSON.Content.forEach(function (el, idx, arr) {
                    if (el.Type == 'Music') {
                        jsonUrl = conUrl + el.Json_URL;
                        return;
                    }
                })
            })
        }

        this.getMusics = function () {
            return music;
        };
    }]);