'use strict';

angular.module('app.welcome', [])
    .controller('WelcomeController', ['$scope', 'ResourceManager', 'ActivityManager', 'COMMON_KEYS', function ($scope, ResourceManager, ActivityManager, COMMON_KEYS) {
        var activity = ActivityManager.getActiveActivity();
        activity.initialize($scope);
        activity.isMenu(true);
        activity.loadI18NResource(function (res) {
            var i18nText;
            if(ResourceManager.getLocale()){
                i18nText  = ResourceManager.getLocale();
            }else{
                $scope.language = 'zh-CN';
                ResourceManager.setLocale($scope.language);
                i18nText = ResourceManager.getLocale();
            }
            $scope.guestNameText = i18nText.index.guestName;
            $scope.welcomeText = i18nText.welcome.welcome_text;
            $scope.guestName = i18nText.welcome.name;
            $scope.roomNumber = i18nText.index.roomNumber + window.localStorage.room;
            $scope.press1 = i18nText.welcome.press1;
            $scope.press2 = i18nText.welcome.press2;
        });
        var languages = ['zh-CN', 'en-US'],
            languageIndex = 0;

        activity.onKeyDown(function (keyCode) {
            switch (keyCode) {
                case COMMON_KEYS.KEY_LEFT:
                case COMMON_KEYS.KEY_RIGHT:
                    languageIndex ^= 1;
                    $scope.language = languages[languageIndex];
                    ResourceManager.setLocale($scope.language);
                    break;
                case COMMON_KEYS.KEY_MENU:
                    ActivityManager.startActivity('menu');
                    break;
                case COMMON_KEYS.KEY_ENTER:
                    ActivityManager.startActivity('menu');
                    break;
                case COMMON_KEYS.KEY_UP:
                    activity.finish();
                    ActivityManager.startActivity('movie');
                    break;
                case COMMON_KEYS.KEY_DOWN:
                    ActivityManager.showLoading();
                    break;
            }
        });
    }]);
