'use strict';

angular.module('app.movie',[])
    .directive('repeatFinish', ['ActivityManager', function (ActivityManager) {
        return {
            link: function (scope, element, attr) {
                //监听渲染是否完成
                if (scope.$last == true) {
                    //console.log('ng-repeat执行完毕');
                    ActivityManager.getActiveActivity().rotateDown(-1);
                    ActivityManager.getActiveActivity().rotateUp(0);
                    ActivityManager.getActiveActivity().movieAnimate(0,'type0','choseMovie')
                }
            }
        }
    }])
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
        $scope.typeIndex = 0;
        $scope.movieIndex = 0;
        $scope.movie = [
            {
                type:'动作',
                list:[
                    {
                        name:'火星救援',
                        img:'assets/images/movie1.png',
                        bgimg:'assets/images/banner1.png'
                    },
                    {
                        name:'侏罗纪世界',
                        img:'assets/images/movie2.png',
                        bgimg:'assets/images/banner2.png'
                    },
                    {
                        name:'海底总动员1',
                        img:'assets/images/movie3.png',
                        bgimg:'assets/images/banner3.png'
                    }
                ]
            },
            {
                type:'科幻',
                list:[
                    {
                        name:'海底总动员1',
                        img:'assets/images/movie3.png',
                        bgimg:'assets/images/banner3.png'
                    },
                    {
                        name:'海底总动员1',
                        img:'assets/images/movie3.png',
                        bgimg:'assets/images/banner3.png'
                    },
                    {
                        name:'侏罗纪世界',
                        img:'assets/images/movie2.png',
                        bgimg:'assets/images/banner2.png'
                    },
                    {
                        name:'火星救援',
                        img:'assets/images/movie1.png',
                        bgimg:'assets/images/banner1.png'
                    }
                ]
            },
            {
                type:'爱情',
                list:[
                    {
                        name:'火星救援',
                        img:'assets/images/movie1.png',
                        bgimg:'assets/images/banner1.png'
                    },
                    {
                        name:'侏罗纪世界',
                        img:'assets/images/movie2.png',
                        bgimg:'assets/images/banner2.png'
                    },
                    {
                        name:'侏罗纪世界',
                        img:'assets/images/movie2.png',
                        bgimg:'assets/images/banner2.png'
                    },
                    {
                        name:'海底总动员1',
                        img:'assets/images/movie3.png',
                        bgimg:'assets/images/banner3.png'
                    },
                    {
                        name:'海底总动员1',
                        img:'assets/images/movie3.png',
                        bgimg:'assets/images/banner3.png'
                    }
                ]
            }
        ]

        var typeID = 0;
        var movieID = 1;
        ActivityManager.showLoading();
        choseMovie(movieID);
        ActivityManager.hideLoading(500);
        function changeMovieType(typeID){
            $scope.movieList = $scope.movie[typeID].list;

        }
        function choseMovie(movieID){
            var movieDetail = document.getElementById('movie-detail-container');
            //movieDetail.style.backgroundImage = "";
            var imageURL = 'assets/images/banner'+ movieID + '.png';
            var URLStr = 'url('+ imageURL+')';
            movieDetail.style.backgroundImage = URLStr;
        }

        function rotateUp(num){
            if(num == 0) {
                var number = num;
                var target = document.getElementById('type' + number).children;
                for(var i=0;i<target.length;i++){
                    activity.transform(target[i].children[0],"rotateX(0deg)");
                    activity.removeClass(target[i].children[0], 'opacityReduce');
                    activity.addClass(target[i].children[0], 'opacityAdd');
                    target[i].children[0].style.top = '33.3px';
                }
            }else{
                var number = num;
                var target = document.getElementById('type' + number).children;
                for(var i=0;i<target.length;i++){
                    activity.transform(target[i].children[0],"rotateX(0deg)");
                    activity.removeClass(target[i].children[0], 'opacityReduce');
                    activity.removeClass(target[i].children[0], 'choseMovie');
                    activity.addClass(target[i].children[0], 'opacityAdd');
                    target[i].children[0].style.top = '33.3px';
                }
                var number1 = num - 1;
                var target1 = document.getElementById('type'+ number1).children;
                for(var i=0;i<target1.length;i++) {
                    activity.transform(target1[i].children[0], "rotateX(90deg)");
                    activity.removeClass(target1[i].children[0], 'opacityAdd');
                    activity.removeClass(target1[i].children[0], 'choseMovie');
                    activity.addClass(target1[i].children[0], 'opacityReduce');
                    target1[i].children[0].style.top = '-145px';
                }
            }
        }


        function rotateDown(num){
            if(num==-1){
                var target = document.getElementsByClassName('rotate_img');
                for(var i=0;i<target.length;i++){
                    activity.transform(target[i],"rotateX(-90deg)");
                    activity.addClass(target[i], 'opacityReduce');
                    target[i].style.top = '145px';
                }
            }else{
                var number1 = num+1;
                var target1 = document.getElementById('type'+ number1).children;
                for(var i=0;i<target1.length;i++) {
                    activity.transform(target1[i].children[0], "rotateX(-90deg)");
                    activity.removeClass(target1[i].children[0], 'opacityAdd');
                    activity.removeClass(target1[i].children[0], 'choseMovie');
                    activity.addClass(target1[i].children[0], 'opacityReduce');
                    target1[i].children[0].style.top = '145px';
                }
                var number = num;
                var target = document.getElementById('type' + number).children;
                for(var i=0;i<target.length;i++){
                    activity.transform(target[i].children[0],"rotateX(0deg)");
                    activity.removeClass(target[i].children[0], 'opacityReduce');
                    activity.removeClass(target[i].children[0], 'choseMovie');
                    activity.addClass(target[i].children[0], 'opacityAdd');
                    target[i].children[0].style.top = '33.3px';
                }
            }
        }


        activity.onKeyDown(function (keyCode) {
            switch (keyCode) {
                case COMMON_KEYS.KEY_LEFT:
                    $scope.movieIndex-=1;
                    //choseMovie(movieID);
                    activity.movieAnimate($scope.movieIndex,'type'+$scope.typeIndex,'choseMovie');
                    activity.removeAnimate($scope.movieIndex+1,'type'+$scope.typeIndex,'choseMovie')
                    break;
                case COMMON_KEYS.KEY_RIGHT:
                    //TODO:加入movieType的length判断
                    $scope.movieIndex+=1;
                    //choseMovie(movieID);
                    activity.movieAnimate($scope.movieIndex,'type'+$scope.typeIndex,'choseMovie');
                    activity.removeAnimate($scope.movieIndex-1,'type'+$scope.typeIndex,'choseMovie')
                    break;
                case COMMON_KEYS.KEY_MENU:
                    ActivityManager.startActivity('menu');
                    break;
                case COMMON_KEYS.KEY_ENTER:
                    ActivityManager.startActivity('menu');
                    break;
                case COMMON_KEYS.KEY_UP:
                    if ($scope.typeIndex < $scope.movie.length-1) {
                        $scope.typeIndex++;
                    }
                    rotateUp($scope.typeIndex);
                    $scope.movieIndex = 0;
                    activity.movieAnimate($scope.movieIndex,'type'+$scope.typeIndex,'choseMovie');
                    break;
                case COMMON_KEYS.KEY_DOWN:
                    if ($scope.typeIndex > 0) {
                        $scope.typeIndex--;
                    }
                    rotateDown($scope.typeIndex);
                    $scope.movieIndex = 0;
                    activity.movieAnimate($scope.movieIndex,'type'+$scope.typeIndex,'choseMovie');
                    break;
            }
        });
    }])

