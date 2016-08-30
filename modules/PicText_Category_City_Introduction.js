'use strict';

angular.module('app.city_list', [])
    .controller('CityListController', ['$scope', 'ActivityManager', 'COMMON_KEYS','MenuService', function ($scope, ActivityManager, COMMON_KEYS,MenuService) {
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
        });
        $scope.city = [];
        var childDataStr = activity.getChild();
        var childData = JSON.parse(childDataStr);
        var thisData = childData.Content;
        thisData.forEach(function(val,idx,arr){
            var city = {
                index:idx,
                name:val.name,
                acticityId:val.name_eng
            };
            $scope.city.push(city);
        });
        $scope.selectedIndex = 0;

        //$scope.city = [
        //    {index: 0, name: '东方明珠电视塔', activityId: 'wake_up'},
        //    {index: 1, name: '上海环球金融中心', activityId: 'wash'},
        //    {index: 2, name: '外滩', activityId: 'package'},
        //    {index: 3, name: '豫园', activityId: 'car'},
        //    {index: 4, name: '人民广场', activityId: 'pick_up'},
        //    {index: 5, name: '南京路步行街', activityId: 'meeting'},
        //    {index: 6, name: '南京路步行街', activityId: 'meeting'},
        //    {index: 7, name: '南京路步行街', activityId: 'meeting'},
        //    {index: 8, name: '南京路步行街', activityId: 'meeting'},
        //    {index: 9, name: '南京路步行街', activityId: 'meeting'},
        //    {index: 10, name: '南京路步行街', activityId: 'meeting'},
        //];

        activity.onKeyDown(function (keyCode) {
            switch (keyCode) {
                case COMMON_KEYS.KEY_MENU:
                    ActivityManager.startActivity('menu');
                    break;
                case COMMON_KEYS.KEY_ENTER:
                    //ActivityManager.go($scope.services[$scope.selectedIndex].activityId, 4);
                    var dataStr = JSON.stringify(thisData[$scope.selectedIndex]);
                    ActivityManager.go($scope.city[$scope.selectedIndex].acticityId, 4 ,'city_detail',dataStr);
                    break;
                case COMMON_KEYS.KEY_UP:
                    if($scope.selectedIndex>0) {
                        $scope.selectedIndex -= 1;
                    }
                    break;
                case COMMON_KEYS.KEY_DOWN:
                    if($scope.selectedIndex<$scope.city.length-1) {
                        $scope.selectedIndex += 1;
                    }
                    break;
                case COMMON_KEYS.KEY_BACK:
                    activity.finish();
                    break;
            }
            if ($scope.selectedIndex > 6) {
                $scope.listTopStyle2 = (6 - $scope.selectedIndex) * 69;
            } else if ($scope.listTopStyle2 !== 0) {
                $scope.listTopStyle2 = 0;
            }
        });
    }]);