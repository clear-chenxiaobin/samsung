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
            $scope.left = toolvarData.left;
            $scope.select = {
                icon: 'assets/images/icon_toolbar_select.png',
                right: toolvarData.selsct
            };
            $scope.ok = {
                icon: 'assets/images/icon_toolbar_ok.png',
                right: toolvarData.ok
            };
            $scope.menu = {
                icon: 'assets/images/icon_toolbar_menu.png',
                right: toolvarData.menu
            };

            $scope.logo = MenuService.getLogo();
            $scope.menuFinish = function () {
                ActivityManager.getActiveActivity().animate(0, 'menu-item-list', 'menu-animation');
            }
        })

        function menuBind() {
            var treeView = MenuService.getMenu();
            $scope.menuItems = [];
            for (var i = 0; i < treeView.length; i++) {
                $scope.menuItems.push({
                    pic: treeView[i].pic,
                    type: treeView[i].type,
                    activityId: getActivityId(treeView[i].type)
                });
            }
            $scope.selectedMenuItemIndex = 0;
            $scope.menuStyleLeft = '78px';
            $scope.menuStyleWidth = 310 + $scope.menuItems.length * 280 + 100 + 'px';

        }

        function getActivityId(type) {
            switch (type) {
                case 'Live':
                    return 'live';
                    break;
                case 'Movie_Category':
                    return 'movie';
                    break;
                case 'Music':
                    return 'music';
                    break;
                case 'Billing_blue':
                    return 'bill';
                    break;
                case 'Weather':
                    return 'weather';
                    break;
                case 'SecondMenu':
                    return 'service';
                    break;
            }
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
    //    this.initialize =function () {
    //        var treeView = ResourceManager.getConfigurations().viewTree();
    //    }

        this.getMenu = function () {
            return ResourceManager.getConfigurations().viewTree();
        }

        this.getLogo = function () {
            return ResourceManager.getConfigurations().logoUrl();
        }

        this.getLanguage = function () {
            return ResourceManager.getLocale();
        }
    }]);