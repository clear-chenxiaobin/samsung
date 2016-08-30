'use strict';

angular.module('app.weather', [])
    .controller('WeatherController', ['$scope', 'ActivityManager','ResourceManager', 'COMMON_KEYS','MenuService','$http', function ($scope, ActivityManager,ResourceManager, COMMON_KEYS,MenuService,$http) {
        var activity = ActivityManager.getActiveActivity();
        activity.initialize($scope);
        var ID = activity.getID();
        console.log(ID);
        var data = ResourceManager.getService();
        $scope.serviceName = data.name;
        $scope.iconUrl = data.icon;
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
        });
        var i18nText = ResourceManager.getLocale();
        var lang = i18nText.lang;

        $scope.outside = false;
        $scope.citys = [];
        $scope.selectedIndex = 0;
        $scope.typeIn = [];
        $scope.typeOut = [];
        var cityIn = [],
            cityOut = [];


        $http.get("http://192.168.18.212:8080/api/restful/weather/all").success(function (data) {
            if(lang == "en-US"){
                $scope.cityIn = data.Content[0].NameEng;
                $scope.cityOut = data.Content[1].NameEng;
                data.Content.forEach(function(valall,idxall,arrall){
                    arrall[0].forEach(function(val,idx,arr){
                        var city = {
                            name:val.CityNameEng,
                            temp_today:val.Temperature_Today,
                            temp_tomorrow:val.Temperature_Tomorrday,
                            temp_third:val.Temperature_Thirdday,
                            weather_today:val.WeatherEng_Today,
                            weather_tomorrow:val.WeatherEng_tomorrow,
                            weather_third:val.WeatherEng_Thirdday,
                            icon_today:val.WeatherIconURL_Today,
                            icon_tomorrow:val.WeatherIconURL_tomorrow,
                            icon_third:val.WeatherIconURL_Thirdday
                        };
                        $scope.typeIn.push(city);
                    });
                    arrall[1].forEach(function(val,idx,arr){
                        var city = {
                            name:val.CityNameEng,
                            temp_today:val.Temperature_Today,
                            temp_tomorrow:val.Temperature_Tomorrday,
                            temp_third:val.Temperature_Thirdday,
                            weather_today:val.WeatherEng_Today,
                            weather_tomorrow:val.WeatherEng_tomorrow,
                            weather_third:val.WeatherEng_Thirdday,
                            icon_today:val.WeatherIconURL_Today,
                            icon_tomorrow:val.WeatherIconURL_tomorrow,
                            icon_third:val.WeatherIconURL_Thirdday
                        };
                        $scope.typeOut.push(city);
                    });
                });
            }else{
                $scope.cityIn = data.Content[0].Name;
                $scope.cityOut = data.Content[1].Name;
                data.Content.forEach(function(valall,idxall,arrall){
                    arrall[0].forEach(function(val,idx,arr){
                        var city = {
                            name:val.CityName,
                            temp_today:val.Temperature_Today,
                            temp_tomorrow:val.Temperature_Tomorrday,
                            temp_third:val.Temperature_Thirdday,
                            weather_today:val.Weather_Today,
                            weather_tomorrow:val.Weather_tomorrow,
                            weather_third:val.Weather_Thirdday,
                            icon_today:val.WeatherIconURL_Today,
                            icon_tomorrow:val.WeatherIconURL_tomorrow,
                            icon_third:val.WeatherIconURL_Thirdday
                        };
                        $scope.typeIn.push(city);
                    });
                    arrall[1].forEach(function(val,idx,arr){
                        var city = {
                            name:val.CityName,
                            temp_today:val.Temperature_Today,
                            temp_tomorrow:val.Temperature_Tomorrday,
                            temp_third:val.Temperature_Thirdday,
                            weather_today:val.Weather_Today,
                            weather_tomorrow:val.Weather_tomorrow,
                            weather_third:val.Weather_Thirdday,
                            icon_today:val.WeatherIconURL_Today,
                            icon_tomorrow:val.WeatherIconURL_tomorrow,
                            icon_third:val.WeatherIconURL_Thirdday
                        };
                        $scope.typeOut.push(city);
                    });
                });
            }
            changeType();
        });

        function changeType(){
            $scope.selectedIndex = 0;
            if($scope.outside == true){
                $scope.citys = $scope.typeOut;
            }else{
                $scope.citys = $scope.typeIn;
            }
            choseCity($scope.selectedIndex);
        }

        function choseCity(num){
            $scope.city = {
                temp_today:$scope.citys[num].temp_today,
                temp_tomorrow:$scope.citys[num].temp_tomorrow,
                temp_third:$scope.citys[num].temp_third,
                weather_today:$scope.citys[num].weather_today,
                weather_tomorrow:$scope.citys[num].weather_tomorrow,
                weather_third:$scope.citys[num].weather_third,
                icon_today:$scope.citys[num].icon_today,
                icon_tomorrow:$scope.citys[num].icon_tomorrow,
                icon_third:$scope.citys[num].icon_third
            }
        }


        activity.onKeyDown(function (keyCode) {
            switch (keyCode) {
                case COMMON_KEYS.KEY_MENU:
                    ActivityManager.startActivity('menu');
                    break;
                case COMMON_KEYS.KEY_BACK:
                    activity.finish();
                    break;
                case COMMON_KEYS.KEY_LEFT:
                    $scope.outside = false;
                    break;
                case COMMON_KEYS.KEY_RIGHT:
                    $scope.outside = true;
                    break;
                case COMMON_KEYS.KEY_ENTER:

                    break;
                case COMMON_KEYS.KEY_UP:
                    if(LEVEL>1){
                        LEVEL-=1;
                    }
                    break;
                case COMMON_KEYS.KEY_DOWN:
                    $scope.selectedIndex+=1;
                    break;
            }
            if ($scope.selectIndex > 3) {
                $scope.listRightStyle = (3 - $scope.selectIndex) * 285;
            } else if ($scope.listRightStyle !== 0) {
                $scope.listRightStyle = 0;
            }
        });
    }]);