'use strict';

angular.module('app.menu', [])
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
    .controller('MenuController', ['$scope', 'ActivityManager', 'COMMON_KEYS', 'MenuService', function ($scope, ActivityManager, COMMON_KEYS, MenuService) {
        var activity = ActivityManager.getActiveActivity();
        var moveCount = 0,
            currentSelect = 0;

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
            $scope.menuFinish = function () {
                ActivityManager.getActiveActivity().animate(0, 'menu-item-list', 'menu-animation');
            }
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
                {index: 0, name: '电视直播', pic: 'assets/images/menu_tv.png', activityId: 'live'},
                {index: 1, name: '电影点播', pic: 'assets/images/menu_movie.png', activityId: 'movie'},
                {index: 2, name: '酒店服务', pic: 'assets/images/menu_service.png', activityId: 'service'},
                {index: 3, name: '电影点播', pic: 'assets/images/menu_cityinfo.png', activityId: 'movie'},
                {index: 4, name: '城市介绍', pic: 'assets/images/menu_roomfood.png', activityId: 'movie'},
                {index: 5, name: '客房送餐', pic: 'assets/images/menu_restaraunt.png', activityId: 'movie'},
                {index: 6, name: '客房送餐', pic: 'assets/images/menu_restaraunt.png', activityId: 'movie'}
            ]
            $scope.selectedMenuItemIndex = 0;
            $scope.menuStyleLeft = '78px';
            $scope.menuStyleWidth = 310 + $scope.menuItems.length * 280 + 100 + 'px';

        }

        activity.onKeyDown(function (keyCode) {
            switch (keyCode) {
                case COMMON_KEYS.KEY_LEFT:
                    if ($scope.selectedMenuItemIndex > 0) {
                        $scope.selectedMenuItemIndex--;
                        activity.remove($scope.selectedMenuItemIndex + 1, 'menu-item-list', 'menu-animation');
                        activity.animate($scope.selectedMenuItemIndex, 'menu-item-list', 'menu-animation');
                        if (currentSelect == 0 && moveCount > 0) {
                            moveCount--;
                            $scope.menuStyleLeft = (78 - moveCount * 280) + 'px';
                        } else if (currentSelect > 0) currentSelect--;
                    }
                    break;
                case COMMON_KEYS.KEY_RIGHT:
                    if ($scope.selectedMenuItemIndex < $scope.menuItems.length - 1) {
                        $scope.selectedMenuItemIndex++;
                        activity.remove($scope.selectedMenuItemIndex - 1, 'menu-item-list', 'menu-animation');
                        activity.animate($scope.selectedMenuItemIndex, 'menu-item-list', 'menu-animation');
                        if (currentSelect == 3) {
                            moveCount++;
                            $scope.menuStyleLeft = (78 - moveCount * 280) + 'px';
                        } else if (currentSelect < 3) currentSelect++;
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