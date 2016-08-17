'use strict';

angular.module('app.food', [])
    .controller('FoodController', ['$scope', 'ActivityManager','ResourceManager', 'COMMON_KEYS','MenuService','$http', function ($scope, ActivityManager,ResourceManager, COMMON_KEYS,MenuService,$http) {
        var activity = ActivityManager.getActiveActivity();
        activity.initialize($scope);
        var type = activity.getType();
        console.log(type);
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
        var i18nText = ResourceManager.getLocale();
        var lang = i18nText.lang;

        $scope.listRightStyle = 0;
        $scope.pieces = 1;
        $scope.foods = [];
        $scope.order = [];
        $scope.total = 0;
        $scope.position = 'right';
        var mealID = 0;
        var mealUrl;
        var LEVEL = 1;
        //var mealID = ResourceManager.getMeal().id;
        //根据上一级中选择的mealID请求对应数据
        var baseUrl = "http://192.168.30.75/nativevod/now";

        $http.get("http://192.168.30.75/nativevod/now/Main/json/MainMenu_4.json").success(function (data) {
            mealUrl = data.Content[4].Second.Content[mealID].Json_URL;
            $http.get(baseUrl+mealUrl).success(function (data1) {
                data1.Content.forEach(function(val,idx,arr){
                    var meal = {};
                        if(lang == "en-US") {
                            meal = {
                                name: val.name_eng,
                                introduce:val.introduce_eng,
                                img:val.picurl_abs_path,
                                price:val.category_dollor,
                                id:val.id
                            }
                        }else{
                            meal = {
                                name: val.name,
                                introduce:val.introduce,
                                img:val.picurl_abs_path,
                                price:val.category_yuan,
                                id:val.id
                            }
                        }
                    $scope.foods.push(meal);
                })
                $scope.selectIndex = 0;
                $scope.food = $scope.foods[$scope.selectIndex];
                setPiece($scope.selectIndex);
            });
        });


        var cart = ResourceManager.getCart();
        cart.forEach(function(item,index,array){
            if(item.name){
                $scope.total+=item.num;
                $scope.order[index] = item.num;
            }
        });
        function confirm(id,num){
            $scope.order[id] = num;
            var foodName = $scope.foods[$scope.selectIndex].name;
            var price = $scope.foods[$scope.selectIndex].price;
            addToCart(id,foodName,num,price);
            sumOrder();
            console.log(cart);
        }

        function addToCart(id,f,n,p){
            ResourceManager.addToCart(id,f,n,p);
        }

        function sumOrder(){
            var sum = 0;
            $scope.order.forEach(function(item,index,array){
                sum += item;
            });
            $scope.total = sum;
        }

        function setPiece(num){
            var id = $scope.foods[num].id;
            if($scope.order[id]){
                $scope.pieces = $scope.order[id];
            }else{
                $scope.pieces = 1;
            }
        }

        activity.onKeyDown(function (keyCode) {
            switch (keyCode) {
                case COMMON_KEYS.KEY_MENU:
                    ActivityManager.startActivity('menu');
                    break;
                case COMMON_KEYS.KEY_BACK:
                    activity.finish();
                    break;
                case COMMON_KEYS.KEY_LEFT:
                    if(LEVEL==1) {
                        if ($scope.selectIndex > 0) {
                            $scope.selectIndex -= 1;
                            $scope.food = $scope.foods[$scope.selectIndex];
                            setPiece($scope.selectIndex);
                        }
                    }else if(LEVEL==2){
                        $scope.position = 'left';
                        //border左动画
                    }
                    break;
                case COMMON_KEYS.KEY_RIGHT:
                    if(LEVEL==1) {
                        if ($scope.selectIndex < $scope.foods.length - 1) {
                            $scope.selectIndex += 1;
                            $scope.food = $scope.foods[$scope.selectIndex];
                            setPiece($scope.selectIndex);
                        }
                    }else if(LEVEL==2){
                        $scope.position = 'right';
                    }
                    break;
                case COMMON_KEYS.KEY_ENTER:
                    if(LEVEL==3) {
                        var foodID = $scope.foods[$scope.selectIndex].id;
                        if ($scope.pieces != 0) {
                            confirm(foodID, $scope.pieces)
                        }
                    }else if(LEVEL==2){
                        if($scope.position=='left' && $scope.pieces>1){
                            $scope.pieces-=1;
                        }else if($scope.position=='right'){
                            $scope.pieces+=1;
                        }
                    }
                    break;
                case COMMON_KEYS.KEY_UP:
                    if(LEVEL>1){
                        LEVEL-=1;
                    }
                    break;
                case COMMON_KEYS.KEY_DOWN:
                    if(LEVEL<3){
                        LEVEL+=1;
                    }
                    break;
            }
            if ($scope.selectIndex > 3) {
                $scope.listRightStyle = (3 - $scope.selectIndex) * 285;
            } else if ($scope.listRightStyle !== 0) {
                $scope.listRightStyle = 0;
            }
        });
    }]);