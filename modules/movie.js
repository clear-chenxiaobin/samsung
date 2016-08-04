'use strict';

angular.module('app.movie',[])
    .controller('MovieController',['$scope', 'ResourceManager', 'ActivityManager', 'COMMON_KEYS', function ($scope, ResourceManager, ActivityManager, COMMON_KEYS) {
        var activity = ActivityManager.getActiveActivity();
        activity.initialize($scope);
        activity.isMenu(true);
        activity.loadI18NResource(function () {
            var i18nText = ResourceManager.getLocale();
            //$scope.guestNameText = i18nText.index.guestName;
            //$scope.welcomeText = i18nText.welcome.welcome_text;
            //$scope.guestName = i18nText.welcome.name;
            //$scope.roomNumber = i18nText.index.roomNumber + window.localStorage.room;
            //$scope.press1 = i18nText.welcome.press1;
            //$scope.press2 = i18nText.welcome.press2;
        });
        $scope.movie = [
            {
                type:'动作',
                img:'',
                bgImg:''
            }
        ]
        var movieID = 1;
        ActivityManager.showLoading();
        choseMovie(movieID);
        ActivityManager.hideLoading(2000);
        function changeMovieType(typeID){

        }
        function choseMovie(movieID){
            var movieDetail = document.getElementById('movie-detail-container');
            //movieDetail.style.backgroundImage = "";
            var imageURL = 'assets/images/banner'+ movieID + '.png';
            var URLStr = 'url('+ imageURL+')';
            movieDetail.style.backgroundImage = URLStr;
        }

        activity.onKeyDown(function (keyCode) {
            switch (keyCode) {
                case COMMON_KEYS.KEY_LEFT:
                    if(movieID>1) {
                        movieID -= 1;
                        choseMovie(movieID);
                    }
                    break;
                case COMMON_KEYS.KEY_RIGHT:
                    //TODO:加入movieType的length判断
                    movieID+=1;
                    choseMovie(movieID);
                    break;
                case COMMON_KEYS.KEY_MENU:
                    ActivityManager.startActivity('menu');
                    break;
                case COMMON_KEYS.KEY_ENTER:
                    ActivityManager.startActivity('menu');
                    break;
                case COMMON_KEYS.KEY_UP:
                    ActivityManager.hideLoading(3000);
                    break;
                case COMMON_KEYS.KEY_DOWN:
                    ActivityManager.showLoading();
                    break;
            }
        });
    }])

