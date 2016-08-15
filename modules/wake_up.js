'use strict';

angular.module('app.wake_up', [])
    .controller('WakeUpController', ['$scope', 'ResourceManager', 'ActivityManager', 'COMMON_KEYS','BtnService', function ($scope, ResourceManager, ActivityManager, COMMON_KEYS,BtnService) {
        var activity = ActivityManager.getActiveActivity();
        activity.initialize($scope);
        $scope.selected = true;
        $scope.onSubmit = true;


        function borderAnimate(key){
            var border = document.getElementsByClassName('btn_border')[0];
            switch (key) {
                case 0:
                    border.style.width = '130px';
                    break;
                case 1:
                    activity.removeClass(border,'timeAgain');
                    activity.addClass(border,'submitAgain');
                    break;
                case 2:
                    activity.removeClass(border,'submitAgain');
                    activity.addClass(border,'timeAgain');
                    break;
            }
        }

        activity.onKeyDown(function (keyCode) {
            switch (keyCode) {
                case COMMON_KEYS.KEY_LEFT:
                    if($scope.selected){
                        $scope.onSubmit = false;
                        borderAnimate(2);
                    }
                    break;
                case COMMON_KEYS.KEY_RIGHT:
                    if($scope.selected){
                        $scope.onSubmit = true;
                        borderAnimate(1);
                    }
                    break;
                case COMMON_KEYS.KEY_MENU:
                    ActivityManager.startActivity('menu');
                    break;
                case COMMON_KEYS.KEY_ENTER:
                    if($scope.selected) {
                        if ($scope.onSubmit) {
                            BtnService.clickBtn('submit-btn');
                            borderAnimate(0);
                        }else{
                            BtnService.clickBtn('time-btn');
                        }
                    }else{
                        BtnService.clickBtn('clock-btn');
                    }
                    //选择时间后修改的值
                    //$scope.selected = !$scope.selected;
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
}])
.service('BtnService', ['ActivityManager', function (ActivityManager) {
    this.clickBtn = function (btn) {
        var target = $("."+btn)[0];
        //注释掉的为边框点击动画，因与边框位移、缩放动画冲突
        //var target1 = document.getElementsByClassName('btn_border')[0];
        ActivityManager.getActiveActivity().removeClass(target,'click_amt');
        ActivityManager.getActiveActivity().addClass(target,'click_amt');

        //ActivityManager.getActiveActivity().removeClass(target1,'click_amt');
        //ActivityManager.getActiveActivity().addClass(target1,'click_amt');

        setTimeout(function () {
            ActivityManager.getActiveActivity().removeClass(target,'click_amt');
            //ActivityManager.getActiveActivity().removeClass(target1,'click_amt');
        }, 1000);
    }
}]);
