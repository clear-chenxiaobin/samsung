'use strict';

angular.module('app.room', [])
    .controller('RoomController', ['$scope', 'ActivityManager', 'COMMON_KEYS','ResourceManager','$http', function ($scope, ActivityManager, COMMON_KEYS,ResourceManager, $http) {
        var activity = ActivityManager.getActiveActivity();
        activity.initialize($scope);

        var input = document.getElementById('room');
        input.focus();
        $scope.number = '';
        changeRoomNum();

        function setRoomNum(){
            var roomNum = document.getElementById('room').value;
            if(roomNum !=''){
                window.localStorage.room = roomNum;
                activity.finish();
                ActivityManager.startActivity('welcome','welcome');
            }else{
                alert('不能为空');
            }
        };
        function changeRoomNum(){
            var roomNumber = parseInt($scope.number);
            document.getElementById('room').value = roomNumber;
        }
        $scope.number = '';
        activity.onKeyDown(function (keyCode) {
            switch (keyCode) {
                case COMMON_KEYS.KEY_BACK:
                    activity.finish();
                    break;
                case COMMON_KEYS.KEY_UP:

                    break;
                case COMMON_KEYS.KEY_DOWN:

                    break;
                case COMMON_KEYS.KEY_ENTER:
                    setRoomNum();
                    break;
                case COMMON_KEYS.KEY_RIGHT:
                    break;
                case COMMON_KEYS.KEY_0:
                    $scope.number += '0';
                    changeRoomNum();
                    break;
                case COMMON_KEYS.KEY_1:
                    $scope.number += '1';
                    changeRoomNum();
                    break;
                case COMMON_KEYS.KEY_2:
                    $scope.number += '2';
                    changeRoomNum();
                    break;
                case COMMON_KEYS.KEY_3:
                    $scope.number += '3';
                    changeRoomNum();
                    break;
                case COMMON_KEYS.KEY_4:
                    $scope.number += '4';
                    changeRoomNum();
                    break;
                case COMMON_KEYS.KEY_5:
                    $scope.number += '5';
                    changeRoomNum();
                    break;
                case COMMON_KEYS.KEY_6:
                    $scope.number += '6';
                    changeRoomNum();
                    break;
                case COMMON_KEYS.KEY_7:
                    $scope.number += '7';
                    changeRoomNum();
                    break;
                case COMMON_KEYS.KEY_8:
                    $scope.number += '8';
                    changeRoomNum();
                    break;
                case COMMON_KEYS.KEY_9:
                    $scope.number += '9';
                    changeRoomNum();
                    break;
            }
        });

    }]);