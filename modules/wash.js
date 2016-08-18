'use strict';

angular.module('app.wash', [])
    .controller('WashController', ['$scope', 'ResourceManager', 'ActivityManager', 'COMMON_KEYS','BtnService', function ($scope, ResourceManager, ActivityManager, COMMON_KEYS,BtnService) {
        var activity = ActivityManager.getActiveActivity();
        activity.initialize($scope);
        var type = activity.getID();
        console.log(type);
        $scope.now = true;
        $scope.selected = false;
        $scope.onSubmit = true;
        $scope.time = false;
        var timeCount = 0;
        var timeNow;

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
                case 3:
                    activity.removeClass(border,'moveUp');
                    activity.addClass(border,'moveDown');
                    break;
                case 4:
                    activity.removeClass(border,'moveDown');
                    activity.addClass(border,'moveUp');
                    break;
                case 5:
                    activity.removeClass(border,'moveUp');
                    activity.addClass(border,'submitAgain');
                    break;
            }
        }
        function setWashTime(tt){
            var format = 'MM/dd/HH/mm';
            if(tt){
                var t1 = timeToDate(tt,'yyyy/MM/dd HH:mm:ss');
                var t = new Date(t1);
                $scope.year = timeToDate(tt,'yyyy');
            }else {
                var t = new Date();
                $scope.year = t.getFullYear();
            }
                timeNow = dateToTime(t);
                var tf = function (i) {
                    return (i < 10 ? '0' : '') + i
                };
                var time = format.replace(/yyyy|MM|dd|HH|mm|ss/g, function (a) {
                    switch (a) {
                        case 'yyyy':
                            //return tf(t.getFullYear());
                            break;
                        case 'MM':
                            return tf(t.getMonth() + 1);
                            break;
                        case 'mm':
                            return tf(t.getMinutes());
                            break;
                        case 'dd':
                            return tf(t.getDate());
                            break;
                        case 'HH':
                            return tf(t.getHours());
                            break;
                        case 'ss':
                            return tf(t.getSeconds());
                            break;
                    }
                });
                var timeArray = time.split('/');
                $scope.timeStr = $scope.year +'年'+ timeArray[0] + '月' + timeArray[1] + '日' + ' ' + timeArray[2] + ':' + timeArray[3];
                $scope.month = timeArray[0];
                $scope.day = timeArray[1];
                $scope.hour = timeArray[2];
                $scope.minute = timeArray[3];
        }
        var dateToTime = function(date){
            var time = (new Date(date)).getTime();
            return time;
        };
        var timeToDate = function(time,format){
            var t = new Date(time);
            var tf = function(i){return (i < 10 ? '0' : '') + i};
            return format.replace(/yyyy|MM|dd|HH|mm|ss/g, function(a){
                switch(a){
                    case 'yyyy':
                        return tf(t.getFullYear());
                        break;
                    case 'MM':
                        return tf(t.getMonth() + 1);
                        break;
                    case 'mm':
                        return tf(t.getMinutes());
                        break;
                    case 'dd':
                        return tf(t.getDate());
                        break;
                    case 'HH':
                        return tf(t.getHours());
                        break;
                    case 'ss':
                        return tf(t.getSeconds());
                        break;
                }
            })
        };
        function changeTime(type){
            var result;
            var now = new Date();
            var nowTime = dateToTime(now);
            switch (type) {
                case 'monthAdd':
                    switch ($scope.month){
                        case '01':
                        case '03':
                        case '05':
                        case '07':
                        case '08':
                        case '10':
                        case '12':
                            timeNow+=2678400000;
                            break;
                        case '04':
                        case '06':
                        case '09':
                        case '11':
                            timeNow+=2592000000;
                            break;
                        case '02':
                            if(($scope.year%4 == 0) && ($scope.year % 100 != 0 || $scope.year % 400 == 0)){
                                timeNow+=2505600000;
                            }else{
                                timeNow+=2419200000;
                            }
                            break;
                    }

                    result = timeNow;
                    break;
                case 'monthSub':
                    switch ($scope.month){
                        case '02':
                        case '04':
                        case '05':
                        case '08':
                        case '09':
                        case '11':
                        case '01':
                            timeNow-=2678400000;
                            break;
                        case '05':
                        case '07':
                        case '10':
                        case '12':
                            timeNow-=2592000000;
                            break;
                        case '03':
                            if(($scope.year%4 == 0) && ($scope.year % 100 != 0 || $scope.year % 400 == 0)){
                                timeNow-=2505600000;
                            }else{
                                timeNow-=2419200000;
                            }
                            break;
                    }
                    if(timeNow<nowTime){
                        result = nowTime;
                        timeNow = nowTime
                    }else {
                        result = timeNow;
                    }
                    break;
                case 'dayAdd':
                    timeNow+=86400000;
                    result = timeNow;
                    break;
                case 'daySub':
                    timeNow-=86400000;
                    if(timeNow<nowTime){
                        result = nowTime;
                    }else {
                        result = timeNow;
                    }
                    break;
                case 'hourAdd':
                    timeNow+=3600000;
                    result = timeNow;
                    break;
                case 'hourSub':
                    timeNow-=3600000;
                    if(timeNow<nowTime){
                        result = nowTime;
                    }else {
                        result = timeNow;
                    }
                    break;
                case 'minuteAdd':
                    timeNow+=60000;
                    result = timeNow;
                    break;
                case 'minuteSub':
                    timeNow-=60000;
                    if(timeNow<nowTime){
                        result = nowTime;
                    }else {
                        result = timeNow;
                    }
                    break;
            }
            $scope.setTime = result;
            setWashTime(result);
        }
        function move(num){
            var btn = document.getElementById('time_border');
            activity.transform(btn,"translateX("+(num*130)+"px)")
        }
        activity.onKeyDown(function (keyCode) {
            switch (keyCode) {
                case COMMON_KEYS.KEY_LEFT:
                    if($scope.time){
                        //选择时间界面的操作
                        if(timeCount>0){
                            timeCount-=1;
                            move(timeCount);
                        }
                    }else {
                        if ($scope.selected) {
                            $scope.onSubmit = false;
                            borderAnimate(2);
                        }
                    }
                    break;
                case COMMON_KEYS.KEY_RIGHT:
                    if($scope.time){
                        //选择时间界面的操作
                        if(timeCount<3){
                            timeCount+=1;
                            move(timeCount);
                        }
                    }else {
                        if ($scope.selected) {
                            $scope.onSubmit = true;
                            borderAnimate(1);
                        }
                    }
                    break;
                case COMMON_KEYS.KEY_MENU:
                    ActivityManager.startActivity('menu');
                    break;
                case COMMON_KEYS.KEY_ENTER:
                    if($scope.time){
                        //选择时间界面的操作
                        $('.close-reveal-modal').click();
                        $scope.time = false;
                        setWashTime($scope.setTime);
                        $scope.selected = true;
                        borderAnimate(5);
                        $scope.onSubmit = true;
                    }else {
                        if ($scope.selected) {
                            if ($scope.onSubmit) {
                                BtnService.clickBtn('submit-btn');
                                borderAnimate(0);
                                alert($scope.timeStr);
                            } else {
                                BtnService.clickBtn('time-btn');
                                setTimeout(function () {
                                    $('.time-btn').click();
                                    $scope.time = true;
                                }, 1000);
                            }
                        } else if ($scope.now) {
                            BtnService.clickBtn('clock-btn');
                            setWashTime();
                            $scope.selected = true;
                            borderAnimate(1);
                        } else {
                            BtnService.clickBtn('other-time-btn');
                            setWashTime();
                            setTimeout(function () {
                                $('.other-time-btn').click();
                                $scope.time = true;
                            }, 1000);
                        }
                    }
                    //选择时间后修改的值
                    //$scope.selected = !$scope.selected;
                    break;
                case COMMON_KEYS.KEY_UP:
                    if($scope.time){
                        //选择时间界面的操作
                        switch (timeCount){
                            case 0:
                                changeTime('monthAdd');
                                break;
                            case 1:
                                changeTime('dayAdd');
                                break;
                            case 2:
                                changeTime('hourAdd');
                                break;
                            case 3:
                                changeTime('minuteAdd');
                                break;
                        }
                    }else if(!$scope.selected){
                        $scope.now = true;
                        borderAnimate(3);
                    }
                    break;
                case COMMON_KEYS.KEY_DOWN:
                    if($scope.time){
                        //选择时间界面的操作
                        switch (timeCount){
                            case 0:
                                changeTime('monthSub')
                                break;
                            case 1:
                                changeTime('daySub')
                                break;
                            case 2:
                                changeTime('hourSub')
                                break;
                            case 3:
                                changeTime('minuteSub')
                                break;
                        }
                    }else if(!$scope.selected){
                        $scope.now = false;
                        borderAnimate(4);
                    }
                    break;
                case COMMON_KEYS.KEY_BACK:
                    if($scope.time){
                        //选择时间界面的操作
                        $('.close-reveal-modal').click();
                        $scope.time = false;
                        setWashTime();
                    }else {
                        activity.finish();
                    }
                    break;
            }
        });
    }])