'use strict';

angular.module('app.menu', [])
    .directive('repeatFinish', ['ActivityManager', function (ActivityManager) {
        return {
            link: function (scope, element, attr) {
                //监听渲染是否完成
                if (scope.$last == true) {
                    //console.log('ng-repeat执行完毕');
                    ActivityManager.getActiveActivity().animate(0, 'menu-item-list', 'animation');
                }
            }
        }
    }])
    .controller('MenuController', ['$scope', 'ActivityManager', 'COMMON_KEYS', function ($scope, ActivityManager, COMMON_KEYS) {
        var activity = ActivityManager.getActiveActivity();
        activity.initialize($scope);
        menuBind();

        activity.loadI18NResource(function (res) {

        })

        function menuBind() {
            //var treeView = ResourceManager.getConfigurations().viewTree();
            $scope.menuItems = [];
            //for (var i = 0; i < treeView.length; i++) {
            //    //var menuName = ResourceManager.getI18NResource().getString(treeView[i].nameKey);
            //    $scope.menuItems.push({
            //        name: menuName,
            //        icon: treeView[i].icon,
            //        activityId: getActivityId(treeView[i].type)
            //    });
            //}
            $scope.menuItems = [
                {index: 0, name: '电影点播', pic: 'assets/images/movie_normal.png'},
                {index: 1, name: '电视直播', pic: 'assets/images/tv_normal.png'},
                {index: 2, name: '电影点播', pic: 'assets/images/service_normal.png'},
                {index: 3, name: '电影点播', pic: 'assets/images/cityintro_normal.png'},
                {index: 4, name: '电影点播', pic: 'assets/images/foodservice_normal.png'},
            ]
            $scope.selectedMenuItemIndex = 0;
            $scope.$emit("menu.created", true);
        }

        activity.onKeyDown(function (keyCode) {
            switch (keyCode) {
                case COMMON_KEYS.KEY_LEFT:
                    if ($scope.selectedMenuItemIndex > 0) {
                        $scope.selectedMenuItemIndex--;
                        activity.remove($scope.selectedMenuItemIndex + 1, 'menu-item-list', 'animation');
                        activity.animate($scope.selectedMenuItemIndex, 'menu-item-list', 'animation');
                    }
                    break;
                case COMMON_KEYS.KEY_RIGHT:
                    if ($scope.selectedMenuItemIndex < $scope.menuItems.length - 1) {
                        $scope.selectedMenuItemIndex++;
                        activity.remove($scope.selectedMenuItemIndex - 1, 'menu-item-list', 'animation');
                        activity.animate($scope.selectedMenuItemIndex, 'menu-item-list', 'animation');
                        if ($scope.selectedMenuItemIndex > 4) {

                        }
                    }
                    break;
                case COMMON_KEYS.KEY_ENTER:
                    ActivityManager.go($scope.menuItems[$scope.selectedMenuItemIndex].activityId, 2);
                    activity.isMenu(false);
                    $scope.$emit('activity.created');
                    break;
                case COMMON_KEYS.KEY_BACK:
                    activity.finish();
                    break;
            }
        });
    }]);