'use strict';

angular.module('app.menu', [])
    .controller('MenuController', ['$scope', 'ActivityManager', 'COMMON_KEYS', function ($scope, ActivityManager, COMMON_KEYS) {
        var activity = ActivityManager.getActiveActivity();

        //activity.loadI18NResource(function (res) {
            menuBind();
        //})

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
                {name: '电影点播', pic: 'assets/images/movie_normal.png'},
                {name: '电视直播', pic: 'assets/images/tv_normal.png'},
                {name: '电影点播', pic: 'assets/images/service_normal.png'},
                {name: '电影点播', pic: 'assets/images/cityintro_normal.png'},
                {name: '电影点播', pic: 'assets/images/foodservice_normal.png'},
            ]
            $scope.selectedMenuItemIndex = 0;
        }

        //activity.animate(0,'menu-item-list','animation');

        $scope.$on('menu.keydown', function (ev, key) {
            switch (key) {
                case COMMON_KEYS.KEY_LEFT:
                    if ($scope.selectedMenuItemIndex > 0) {
                        $scope.selectedMenuItemIndex--;
                        activity.remove($scope.selectedMenuItemIndex+1,'menu-item-list','animation');
                        activity.animate($scope.selectedMenuItemIndex,'menu-item-list','animation');
                    }
                    break;
                case COMMON_KEYS.KEY_RIGHT:
                    if ($scope.selectedMenuItemIndex < $scope.menuItems.length - 1) {
                        $scope.selectedMenuItemIndex++;
                        activity.remove($scope.selectedMenuItemIndex-1,'menu-item-list','animation');
                        activity.animate($scope.selectedMenuItemIndex,'menu-item-list','animation');
                    }
                    break;
                case COMMON_KEYS.KEY_ENTER:
                    ActivityManager.go($scope.menuItems[$scope.selectedMenuItemIndex].activityId, 2);
                    activity.isMenu(false);
                    $scope.$emit('activity.created');
                    break;
            }
        });
    }]);