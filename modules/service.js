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
        $scope.serviceFinish = function(){
            chose(0);
        }

        $scope.selectedIndex = 0;

        $scope.services = [
            {index: 0, name: '叫醒', pic: 'assets/images/service1.png', activityId: 'wake_up'},
            {index: 1, name: '洗衣', pic: 'assets/images/service2.png', activityId: 'wash'},
            {index: 2, name: '行李寄存', pic: 'assets/images/service3.png', activityId: 'package'},
            {index: 3, name: '租车', pic: 'assets/images/service4.png', activityId: 'car'},
            {index: 4, name: '接机', pic: 'assets/images/service5.png', activityId: 'pick_up'},
            {index: 5, name: '会议室', pic: 'assets/images/service6.png', activityId: 'meeting'},
        ];

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
                    $scope.selectedIndex-=1;
                    chose($scope.selectedIndex);
                    break;
                case COMMON_KEYS.KEY_RIGHT:
                    $scope.selectedIndex+=1;
                    chose($scope.selectedIndex);
                    break;
                case COMMON_KEYS.KEY_MENU:
                    ActivityManager.startActivity('menu');
                    break;
                case COMMON_KEYS.KEY_ENTER:
                    ActivityManager.startActivity('menu');
                    break;
                case COMMON_KEYS.KEY_UP:
                    break;
                case COMMON_KEYS.KEY_DOWN:
                    break;
                case COMMON_KEYS.KEY_BACK:
                    activity.finish();
                    break;
            }
        });
    }]);