'use strict';

angular.module('app.service', [])
    .directive('repeatFinish', ['ActivityManager', function (ActivityManager) {
        return {
            link: function(scope,element,attr){
                if(scope.$last == true){
                    scope.$eval( attr.repeatFinish );
                    scope.$last = false;
                }
            }
        }
    }])
    .controller('ServiceController', ['$scope','$http', 'ActivityManager', 'COMMON_KEYS','ResourceManager','MenuService', function ($scope,$http, ActivityManager, COMMON_KEYS,ResourceManager,MenuService) {
        var activity = ActivityManager.getActiveActivity();
        activity.initialize($scope);
        var i18nText = ResourceManager.getLocale();
        var lang = i18nText.lang;
        var activityID = activity.getID();
        var childDataStr = activity.getChild();
        var childData = JSON.parse(childDataStr);
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
        $scope.serviceFinish = function(){
            chose(0);
        };

        $scope.selectedIndex = 0;
        $scope.services=[];

        switch (activityID){
            case 'service':
                $scope.menuIndex = 3;
                break;
            case 'intro':
                $scope.menuIndex = 4;
                break;
            case'roomService':
                $scope.menuIndex = 5;
                break;
            case 'reservation':
                $scope.menuIndex = 6;
                break;
        }

            childData.forEach(function (val, idx, arr) {
                var service = {};
                service = {
                    index:idx,
                    pic:val.pic,
                    type:val.type,
                    activityId:val.nameEng,
                    config:val.config
                };
                //if (lang == "en-US") {
                //    service = {
                //        index: idx,
                //        name: val.NameEng,
                //        pic: val.Icon_URL_abs_path,
                //        activityId: val.NameEng
                //    }
                //} else {
                //    service = {
                //        index: idx,
                //        name: val.Name,
                //        pic: val.Icon_URL_abs_path,
                //        activityId: val.NameEng
                //    }
                //}
                $scope.services.push(service);
            });
        //$scope.services = [
        //    {index: 0, name: '叫醒', pic: 'assets/images/service1.png', activityId: 'wake_up'},
        //    {index: 1, name: '洗衣', pic: 'assets/images/service2.png', activityId: 'wash'},
        //    {index: 2, name: '行李寄存', pic: 'assets/images/service3.png', activityId: 'package'},
        //    {index: 3, name: '租车', pic: 'assets/images/service4.png', activityId: 'car'},
        //    {index: 4, name: '接机', pic: 'assets/images/service5.png', activityId: 'pick_up'},
        //    {index: 5, name: '会议室', pic: 'assets/images/service6.png', activityId: 'meeting'},
        //];

        function chose(index){
            var target = document.getElementsByClassName('service_item');
            //var target1 = target[index];
            //activity.transform(target1,"rotateX(45deg)");
            for(var i=0;i<target.length;i++){
                activity.removeClass(target[i], 'service_item_select');
            }
            activity.addClass(target[index], 'service_item_select');
        }

        activity.onKeyDown(function (keyCode) {
            switch (keyCode) {
                case COMMON_KEYS.KEY_LEFT:
                    if($scope.selectedIndex>0) {
                        $scope.selectedIndex -= 1;
                        chose($scope.selectedIndex);
                    }
                    break;
                case COMMON_KEYS.KEY_RIGHT:
                    if($scope.selectedIndex<$scope.services.length-1) {
                        $scope.selectedIndex += 1;
                        chose($scope.selectedIndex);
                    }
                    break;
                case COMMON_KEYS.KEY_MENU:
                    ActivityManager.startActivity('menu');
                    break;
                case COMMON_KEYS.KEY_ENTER:
                    $http.get($scope.services[$scope.selectedIndex].config).success(function (data) {
                        var dataStr = JSON.stringify(data);
                        ActivityManager.go($scope.services[$scope.selectedIndex].activityId, 3 ,$scope.services[$scope.selectedIndex].type,dataStr);
                    });
                    break;
                case COMMON_KEYS.KEY_UP:
                    if($scope.selectedIndex>2) {
                        $scope.selectedIndex -= 3;
                        chose($scope.selectedIndex);
                    }
                    break;
                case COMMON_KEYS.KEY_DOWN:
                    if($scope.selectedIndex<$scope.services.length-3) {
                        $scope.selectedIndex += 3;
                        chose($scope.selectedIndex);
                    }
                    break;
                case COMMON_KEYS.KEY_BACK:
                    activity.finish();
                    break;
            }
        });
    }]);