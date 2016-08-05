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
    .controller('MenuController', ['$scope', 'ActivityManager', 'COMMON_KEYS', 'MenuService', function ($scope, ActivityManager, COMMON_KEYS, MenuService) {
        var activity = ActivityManager.getActiveActivity();
        activity.initialize($scope);
        ActivityManager.showLoading();
        ActivityManager.hideLoading(500);

        activity.loadI18NResource(function (res) {
            menuBind();
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
                {index: 0, name: '电影点播', pic: 'assets/images/movie_normal.png', activityId: 'movie'},
                {index: 1, name: '电视直播', pic: 'assets/images/tv_normal.png', activityId: 'movie'},
                {index: 2, name: '电影点播', pic: 'assets/images/service_normal.png', activityId: 'movie'},
                {index: 3, name: '电影点播', pic: 'assets/images/cityintro_normal.png', activityId: 'movie'},
                {index: 4, name: '电影点播', pic: 'assets/images/foodservice_normal.png', activityId: 'movie'},
                {index: 5, name: '电影点播', pic: 'assets/images/foodservice_normal.png', activityId: 'movie'},
                {index: 6, name: '电影点播', pic: 'assets/images/foodservice_normal.png', activityId: 'movie'}
            ]
            $scope.selectedMenuItemIndex = 0;
            $scope.menuStyleLeft = '68px';
            $scope.menuStyleWidth = 310 + $scope.menuItems.length * 280 + 100 + 'px';

        }

        activity.onKeyDown(function (keyCode) {
            switch (keyCode) {
                case COMMON_KEYS.KEY_LEFT:
                    if ($scope.selectedMenuItemIndex > 0) {
                        $scope.selectedMenuItemIndex--;
                        activity.remove($scope.selectedMenuItemIndex + 1, 'menu-item-list', 'animation');
                        activity.animate($scope.selectedMenuItemIndex, 'menu-item-list', 'animation');
                        if ($scope.selectedMenuItemIndex < $scope.menuItems.length - 4) {
                            $scope.menuStyleLeft = (68 - $scope.selectedMenuItemIndex * 280) + 'px';
                        }
                    }
                    break;
                case COMMON_KEYS.KEY_RIGHT:
                    if ($scope.selectedMenuItemIndex < $scope.menuItems.length - 1) {
                        $scope.selectedMenuItemIndex++;
                        activity.remove($scope.selectedMenuItemIndex - 1, 'menu-item-list', 'animation');
                        activity.animate($scope.selectedMenuItemIndex, 'menu-item-list', 'animation');
                        if ($scope.selectedMenuItemIndex > 3) {
                            $scope.menuStyleLeft = (68 - ($scope.selectedMenuItemIndex - 3) * 280) + 'px';
                        }
                    }
                    break;
                case COMMON_KEYS.KEY_ENTER:
                    ActivityManager.go($scope.menuItems[$scope.selectedMenuItemIndex].activityId, 2);
                    activity.isMenu(false);
                    break;
                case COMMON_KEYS.KEY_BACK:
                    activity.finish();
                    break;
            }
        });
    }])
    .service('MenuService', ['ResourceManager', function (ResourceManager) {
        this.getMenu = function () {
            return ResourceManager.getI18NResource();
        }

        this.getLanguage = function () {
            return ResourceManager.getLocale();
        }
    }]);