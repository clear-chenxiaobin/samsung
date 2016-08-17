'use strict';

angular.module('app.menu', [])
    .directive('repeatFinish', ['ActivityManager', function (ActivityManager) {
        return {
            link: function (scope, element, attr) {
                if (scope.$last == true) {
                    scope.$eval(attr.repeatFinish);
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
                    icon: '',
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

        function getIcon(name) {
            switch (type) {
                case 'Live':
                    return 'data:image/svg+xml;charset=utf-8, <svg width="285px" height="173px" viewBox="0 0 285 505" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">'
                        + '<g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">'
                        + '<g id="Group-49">'
                        + '<text id="直播电视" font-family="PingFangSC-Regular, PingFang SC" font-size="24" font-weight="normal" fill="#FFFFFF">'
                        + '<tspan x="95" y="169">直播电视</tspan>'
                        + '</text>'
                        + '<g id="直播电视" transform="translate(85.000000, 21.000000)">'
                        + '<use id="Rectangle-108" stroke="#FFFFFF" mask="url(#mask-2)" stroke-width="9.30751224" xlink:href="#path-1"></use>'
                        + '<rect id="Rectangle-103" fill="#FFFFFF" x="26.0892388" y="84.9115044" width="61.8687664" height="4.46902655" rx="2.23451327"></rect>'
                        + '</g>'
                        + '</g>'
                        + '</g>'
                        + '</svg>';
                    break;
                case 'Movie':
                    return 'data:image/svg+xml;charset=utf-8, <svg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' version='1.1' id='Capa_1' x='0px' y='0px' fill='red' viewBox='-83 -179 284 505' style='enable-background:new 0 0 100 100;' xml:space='preserve'> <!-- Generator: Sketch 39.1 (31720) - http://www.bohemiancoding.com/sketch --> <title>movie</title> <desc>Created with Sketch.</desc> <defs></defs><g id='Group' fill='#FFFFFF'> <path d='M55.159787,41.7109145 C62.1468809,41.7109145 67.832021,36.0305717 67.832021,29.048752 C67.832021,22.0667733 62.1468809,16.3864307 55.159787,16.3864307 C48.1726931,16.3864307 42.488189,22.0667734 42.488189,29.048752 C42.488189,36.0304129 48.1726931,41.7109145 55.159787,41.7109145 L55.159787,41.7109145 L55.159787,41.7109145 Z M55.1597841,22.3451327 C58.8594443,22.3451327 61.8687664,25.3520332 61.8687664,29.0490733 C61.8687664,32.7453121 58.8594443,35.7522124 55.1597841,35.7522124 C51.4606052,35.7522124 48.4514436,32.745312 48.4514436,29.0490733 C48.4514436,25.3520332 51.4606052,22.3451327 55.1597841,22.3451327 L55.1597841,22.3451327 L55.1597841,22.3451327 Z M67.832021,81.9318357 C67.832021,74.9499172 62.147374,69.2699115 55.160105,69.2699115 C48.1728358,69.2699115 42.488189,74.9499172 42.488189,81.9318357 C42.488189,88.9135954 48.1728359,94.5943953 55.160105,94.5943953 C62.147374,94.5943953 67.832021,88.9135954 67.832021,81.9318357 L67.832021,81.9318357 L67.832021,81.9318357 Z M48.4514436,81.931913 C48.4514436,78.2355139 51.4606053,75.2286136 55.1597841,75.2286136 C58.8594443,75.2286136 61.8687664,78.2356742 61.8687664,81.931913 C61.8687664,85.6281517 58.8594443,88.6356932 55.1597841,88.6356932 C51.4606052,88.6356932 48.4514436,85.6281519 48.4514436,81.931913 L48.4514436,81.931913 L48.4514436,81.931913 Z M81.2495823,67.780236 C88.23672,67.780236 93.9212598,62.0999289 93.9212598,55.1179941 C93.9212598,48.1360592 88.2367198,42.4557522 81.2495823,42.4557522 C74.2618088,42.4557522 68.5774278,48.1354239 68.5774278,55.1179941 C68.5775867,62.1000878 74.2619677,67.780236 81.2495823,67.780236 L81.2495823,67.780236 L81.2495823,67.780236 Z M81.2495844,48.4144543 C84.9486473,48.4144543 87.9580052,51.4213547 87.9580052,55.1182345 C87.9580052,58.8144734 84.9484868,61.8215339 81.2495844,61.8215339 C77.5500405,61.8215339 74.5406824,58.8144733 74.5406824,55.1182345 C74.5406824,51.4213547 77.5500404,48.4144543 81.2495844,48.4144543 L81.2495844,48.4144543 L81.2495844,48.4144543 Z M29.0708661,43.20059 C22.0835969,43.20059 16.3989501,48.8808777 16.3989501,55.8625936 C16.3989501,62.8441507 22.0835971,68.5250737 29.0708661,68.5250737 C36.0579764,68.5250737 41.7427822,62.8441507 41.7427822,55.8625936 C41.7427823,48.8807189 36.0579764,43.20059 29.0708661,43.20059 L29.0708661,43.20059 L29.0708661,43.20059 Z M29.0704651,62.5663717 C25.3714907,62.5663717 22.3622047,59.559347 22.3622047,55.8626716 C22.3622047,52.1663167 25.3714909,49.159292 29.0704651,49.159292 C32.7694395,49.159292 35.7795276,52.1663167 35.7795276,55.8626716 C35.7795276,59.5595074 32.7694395,62.5663717 29.0704651,62.5663717 L29.0704651,62.5663717 L29.0704651,62.5663717 Z M106.285918,104.258266 L80.1717974,104.258266 C85.3329879,101.635155 90.0268738,98.2270663 94.1642567,94.0925265 C99.2291444,89.0316632 103.206286,83.1373924 105.984381,76.5734615 C108.86162,69.7766876 110.32021,62.5579255 110.32021,55.1179941 C110.32021,47.6786936 108.86162,40.460247 105.984381,33.6626844 C103.206286,27.0990691 99.2291444,21.2046406 94.1642567,16.1436194 C89.0995267,11.0825983 83.2007526,7.10912394 76.6319647,4.33299253 C69.8298402,1.45779233 62.6057207,0 55.1601051,0 C47.7151209,0 40.4910014,1.45779249 33.6888769,4.33299253 C27.1196154,7.10912394 21.2211571,11.082756 16.1557955,16.1436194 C11.0910655,21.2051137 7.11439759,27.0989112 4.336303,33.6626844 C1.45859046,40.460247 2.27373675e-13,47.6786936 2.27373675e-13,55.1179941 C2.27373675e-13,62.5579255 1.45859046,69.7766878 4.336303,76.5734615 C7.11455542,83.1372345 11.0910655,89.031663 16.1557955,94.0925265 C21.2211569,99.1535476 27.1196154,103.127653 33.6888769,105.903469 C40.4908436,108.778511 47.7151209,110.235988 55.1601051,110.235988 C55.4433295,110.235988 55.7257647,110.233149 56.0085157,110.229205 C56.072928,110.233149 56.1381295,110.235988 56.2038049,110.235988 L106.285761,110.235988 C107.938062,110.235988 109.276826,108.898245 109.276826,107.247364 C109.276984,105.596798 107.937588,104.258266 106.285918,104.258266 L106.285918,104.258266 L106.285918,104.258266 Z M20.3725061,89.8789003 C15.8533377,85.3628737 12.3054732,80.1051178 9.82762206,74.2519268 C7.2632222,68.1931032 5.96325459,61.7553666 5.96325459,55.1176785 C5.96325459,48.4801483 7.26306431,42.0424116 9.82762206,35.9835879 C12.3054732,30.1302392 15.8533377,24.8726411 20.3725061,20.3570879 C24.8916745,15.8415348 30.1531399,12.2967 36.011128,9.82090229 C42.0744324,7.25767531 48.5172559,5.95870206 55.1598681,5.95870206 C61.8026381,5.95870206 68.2453036,7.25767515 74.308766,9.82090229 C80.1665962,12.2967 85.4286935,15.8413768 89.9477038,20.3570879 C94.4665563,24.8726411 98.0141051,30.1300814 100.491956,35.9835879 C103.056514,42.0425693 104.356955,48.4803061 104.356955,55.1176785 C104.356955,61.7555243 103.056672,68.1932611 100.491956,74.2519268 C98.014263,80.1052756 94.4667144,85.3635049 89.9477038,89.8789003 C85.4280618,94.3942957 80.1664383,97.9392882 74.308766,100.415086 C68.2451457,102.977682 61.8024801,104.277286 55.1598681,104.277286 C48.5172561,104.277286 42.0744325,102.97784 36.011128,100.415086 C30.1531399,97.9392882 24.8916745,94.3942957 20.3725061,89.8789003 L20.3725061,89.8789003 L20.3725061,89.8789003 Z' id='Shape'></path><path d='M13.0234751,149.287634 L18.9274751,149.287634 L18.9274751,152.887634 L13.0234751,152.887634 L13.0234751,149.287634 Z M18.9274751,154.495634 L18.9274751,157.711634 C18.9274751,159.799634 19.8874751,160.855634 21.8554751,160.855634 L28.0234751,160.855634 C29.1514751,160.855634 29.9194751,160.639634 30.3514751,160.231634 C30.7834751,159.799634 31.0474751,158.551634 31.1914751,156.511634 L29.5594751,155.959634 C29.4634751,157.591634 29.2954751,158.527634 29.0554751,158.815634 C28.7674751,159.079634 28.3354751,159.223634 27.7354751,159.223634 L22.2634751,159.223634 C21.2074751,159.223634 20.6794751,158.623634 20.6794751,157.447634 L20.6794751,154.495634 L28.4554751,154.495634 L28.4554751,142.543634 L20.6794751,142.543634 L20.6794751,139.255634 L18.9274751,139.255634 L18.9274751,142.543634 L11.2954751,142.543634 L11.2954751,156.535634 L13.0234751,156.535634 L13.0234751,154.495634 L18.9274751,154.495634 Z M20.6794751,152.887634 L20.6794751,149.287634 L26.7514751,149.287634 L26.7514751,152.887634 L20.6794751,152.887634 Z M26.7514751,147.703634 L20.6794751,147.703634 L20.6794751,144.175634 L26.7514751,144.175634 L26.7514751,147.703634 Z M18.9274751,144.175634 L18.9274751,147.703634 L13.0234751,147.703634 L13.0234751,144.175634 L18.9274751,144.175634 Z M34.6474751,140.023634 L34.6474751,146.503634 L38.6554751,146.503634 L39.0154751,147.991634 L33.3274751,147.991634 L33.3274751,149.359634 L46.1434751,149.359634 L46.1434751,147.991634 L40.6234751,147.991634 L40.2874751,146.503634 L44.9674751,146.503634 L44.9674751,140.023634 L34.6474751,140.023634 Z M43.3834751,145.327634 L36.2074751,145.327634 L36.2074751,143.863634 L43.3834751,143.863634 L43.3834751,145.327634 Z M36.2074751,142.759634 L36.2074751,141.223634 L43.3834751,141.223634 L43.3834751,142.759634 L36.2074751,142.759634 Z M34.8634751,150.727634 L34.8634751,155.359634 L38.9914751,155.359634 L38.9914751,158.935634 C38.9914751,159.367634 38.7754751,159.583634 38.3674751,159.583634 C37.8874751,159.583634 37.3594751,159.535634 36.8314751,159.487634 L37.1674751,160.999634 L38.8954751,160.999634 C40.0474751,160.999634 40.6474751,160.423634 40.6474751,159.295634 L40.6474751,155.359634 L44.7994751,155.359634 L44.7994751,150.727634 L34.8634751,150.727634 Z M43.2154751,154.135634 L36.4474751,154.135634 L36.4474751,151.951634 L43.2154751,151.951634 L43.2154751,154.135634 Z M35.4394751,156.151634 C34.7914751,157.639634 34.0234751,158.911634 33.1594751,159.967634 L34.3834751,160.855634 C35.2954751,159.703634 36.0634751,158.335634 36.7354751,156.799634 L35.4394751,156.151634 Z M43.3354751,156.199634 L42.1354751,156.943634 C42.9994751,158.191634 43.6714751,159.343634 44.1754751,160.375634 L45.3994751,159.511634 C44.9194751,158.551634 44.2234751,157.447634 43.3354751,156.199634 L43.3354751,156.199634 Z M53.0074751,139.447634 C51.2314751,141.271634 48.9754751,142.759634 46.2394751,143.863634 L46.9594751,145.351634 C49.7914751,144.103634 52.1674751,142.519634 54.0634751,140.647634 L53.0074751,139.447634 Z M53.6074751,145.759634 C51.8074751,147.919634 49.5274751,149.647634 46.7434751,150.943634 L47.4634751,152.431634 C50.3434751,150.991634 52.7434751,149.167634 54.6634751,146.959634 L53.6074751,145.759634 Z M53.9434751,151.831634 C52.0954751,155.431634 49.3354751,158.023634 45.6874751,159.607634 L46.3834751,161.167634 C50.3194751,159.487634 53.2714751,156.703634 55.2874751,152.839634 L53.9434751,151.831634 Z M66.9514751,139.255634 L66.9514751,146.263634 L60.4234751,146.263634 L60.4234751,153.967634 L76.3114751,153.967634 L76.3114751,146.263634 L68.6554751,146.263634 L68.6554751,143.215634 L77.9674751,143.215634 L77.9674751,141.583634 L68.6554751,141.583634 L68.6554751,139.255634 L66.9514751,139.255634 Z M74.5834751,152.359634 L62.1514751,152.359634 L62.1514751,147.895634 L74.5834751,147.895634 L74.5834751,152.359634 Z M60.3754751,155.023634 C59.5114751,156.991634 58.4794751,158.695634 57.2794751,160.111634 L58.6954751,161.143634 C59.8954751,159.607634 60.9274751,157.807634 61.8394751,155.719634 L60.3754751,155.023634 Z M65.6074751,155.719634 L63.9994751,156.055634 C64.4554751,157.567634 64.8394751,159.295634 65.1754751,161.263634 L66.9034751,160.879634 C66.5194751,159.031634 66.0874751,157.303634 65.6074751,155.719634 L65.6074751,155.719634 Z M70.6234751,155.479634 L68.9914751,155.815634 C69.7114751,157.375634 70.3114751,159.175634 70.7914751,161.215634 L72.4954751,160.831634 C71.9674751,158.911634 71.3434751,157.111634 70.6234751,155.479634 L70.6234751,155.479634 Z M75.5434751,154.999634 L74.1514751,155.887634 C75.6154751,157.855634 76.7674751,159.631634 77.6074751,161.263634 L79.0474751,160.255634 C78.2314751,158.767634 77.0794751,157.015634 75.5434751,154.999634 L75.5434751,154.999634 Z M94.8874751,152.527634 L94.8874751,154.927634 L91.2874751,154.927634 L91.2874751,152.527634 L94.8874751,152.527634 Z M94.8874751,156.295634 L94.8874751,158.599634 L91.2874751,158.599634 L91.2874751,156.295634 L94.8874751,156.295634 Z M96.3754751,158.599634 L96.3754751,156.295634 L99.9274751,156.295634 L99.9274751,158.599634 L96.3754751,158.599634 Z M99.9274751,160.063634 L99.9274751,161.239634 L101.511475,161.239634 L101.511475,151.111634 L90.1594751,151.111634 C92.1034751,149.959634 93.5674751,148.543634 94.5754751,146.911634 L94.8394751,146.911634 L94.8394751,150.343634 L96.3994751,150.343634 L96.3994751,146.911634 L96.6874751,146.911634 C98.1994751,148.927634 100.191475,150.511634 102.687475,151.711634 L103.455475,150.271634 C101.079475,149.311634 99.2554751,148.207634 97.9834751,146.911634 L102.711475,146.911634 L102.711475,145.375634 L99.7594751,145.375634 C100.263475,144.607634 100.719475,143.719634 101.127475,142.759634 L99.6394751,142.231634 C99.2314751,143.335634 98.7514751,144.391634 98.2234751,145.375634 L96.3994751,145.375634 L96.3994751,141.751634 C98.6554751,141.535634 100.647475,141.199634 102.375475,140.743634 L101.583475,139.351634 C98.1754751,140.167634 93.9034751,140.599634 88.7674751,140.623634 L89.2714751,142.063634 C91.2394751,142.063634 93.1114751,141.991634 94.8394751,141.895634 L94.8394751,145.375634 L92.9194751,145.375634 C92.5834751,144.367634 92.1994751,143.479634 91.7914751,142.759634 L90.3514751,143.311634 C90.7594751,143.935634 91.1194751,144.631634 91.4554751,145.375634 L88.7194751,145.375634 L88.7194751,146.911634 L93.3034751,146.911634 C92.1514751,148.327634 90.3754751,149.503634 87.9754751,150.439634 L87.9754751,149.143634 C87.3274751,149.503634 86.6794751,149.863634 86.0074751,150.199634 L86.0074751,145.447634 L88.0954751,145.447634 L88.0954751,143.815634 L86.0074751,143.815634 L86.0074751,139.279634 L84.2794751,139.279634 L84.2794751,143.815634 L81.4954751,143.815634 L81.4954751,145.447634 L84.2794751,145.447634 L84.2794751,150.967634 C83.2474751,151.375634 82.1914751,151.735634 81.0874751,152.023634 L81.5194751,153.727634 C82.4314751,153.391634 83.3674751,153.055634 84.2794751,152.671634 L84.2794751,158.551634 C84.2794751,159.151634 83.9674751,159.463634 83.3674751,159.463634 C82.7914751,159.463634 82.1914751,159.415634 81.5674751,159.343634 L81.9274751,160.999634 L83.9674751,160.999634 C85.3114751,160.999634 86.0074751,160.327634 86.0074751,159.007634 L86.0074751,151.879634 C86.6794751,151.543634 87.3274751,151.207634 87.9754751,150.847634 L87.9754751,150.535634 L88.7914751,151.855634 C89.0794751,151.711634 89.3914751,151.543634 89.7034751,151.375634 L89.7034751,161.239634 L91.2874751,161.239634 L91.2874751,160.063634 L99.9274751,160.063634 Z M96.3754751,154.927634 L96.3754751,152.527634 L99.9274751,152.527634 L99.9274751,154.927634 L96.3754751,154.927634 Z' id='电影点播'></path></g></svg>';
                    break;
                case 'Music':
                    return 'data:image/svg+xml;charset=utf-8, <svg width="284px" height="172px" viewBox="0 0 284 505" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">'
                        + '<g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">'
                        + '<g id="Group-51" transform="translate(87.000000, 7.000000)">'
                        + '<g id="Group-13" transform="translate(0.212598, 0.609145)">'
                        + '<g id="Group-35" transform="translate(32.797900, 137.050147)" font-size="22.3622047" font-family="PingFangSC-Regular, PingFang SC" fill="#FFFFFF" font-weight="normal">'
                        + '<text id="音乐">'
                        + '<tspan x="0" y="24">音乐</tspan>'
                        + '</text>'
                        + '</g>'
                        + '<g id="Group-48">'
                        + '<use id="Oval-6" stroke="#FFFFFF" mask="url(#mask-2)" stroke-width="10.4356955" xlink:href="#path-1"></use>'
                        + '<use id="Oval-6" stroke="#FFFFFF" mask="url(#mask-4)" stroke-width="10.4356955" xlink:href="#path-3"></use>'
                        + '<use id="Oval-6" stroke="#FFFFFF" mask="url(#mask-6)" stroke-width="4.47244094" xlink:href="#path-5"></use>'
                        + '<rect id="Rectangle-10" fill="#979797" transform="translate(73.013545, 24.621963) rotate(30.000000) translate(-73.013545, -24.621963) " x="71.8954344" y="10.5222038" width="2.23622047" height="28.1995192" rx="1.11811024"></rect>'
                        + '<g id="Group-47" transform="translate(64.850394, 11.172566)" fill="#FFFFFF">'
                        + '<rect id="Rectangle-10" transform="translate(8.163151, 13.449397) rotate(30.000000) translate(-8.163151, -13.449397) " x="7.04504072" y="-0.650362605" width="2.23622047" height="28.1995192" rx="1.11811024"></rect>'
                        + '<rect id="Rectangle-10" transform="translate(20.984859, 26.143415) rotate(60.000000) translate(-20.984859, -26.143415) " x="19.8667484" y="12.0436556" width="2.23622047" height="28.1995192" rx="1.11811024"></rect>'
                        + '</g>'
                        + '<g id="Group-47" transform="translate(28.486611, 81.905816) scale(1, -1) rotate(-90.000000) translate(-28.486611, -81.905816) translate(11.342254, 64.774548)" fill="#FFFFFF">'
                        + '<rect id="Rectangle-10" transform="translate(8.163151, 13.449397) rotate(30.000000) translate(-8.163151, -13.449397) " x="7.04504072" y="-0.650362605" width="2.23622047" height="28.1995192" rx="1.11811024"></rect>'
                        + '<rect id="Rectangle-10" transform="translate(20.984859, 26.143415) rotate(60.000000) translate(-20.984859, -26.143415) " x="19.8667484" y="12.0436556" width="2.23622047" height="28.1995192" rx="1.11811024"></rect>'
                        + '</g>'
                        + '</g>'
                        + '</g>'
                        + '</g>'
                        + '</g>'
                        + '</svg>';
                    break;
                case 'Service':
                    return 'data:image/svg+xml;charset=utf-8, <svg width="284px" height="172px" viewBox="0 0 284 505" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">'
                        + '<g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">'
                        + '<g id="Group-52">'
                        + '<g id="Group-18" transform="translate(87.000000, 9.000000)">'
                        + '<text id="酒店服务" font-family="PingFangSC-Regular, PingFang SC" font-size="24" font-weight="normal" fill="#FFFFFF">'
                        + '<tspan x="10" y="160">酒店服务</tspan>'
                        + '</text>'
                        + '<g id="Group-26">'
                        + '<g id="Group-5">'
                        + '<circle id="Oval-4" fill="#FFFFFF" cx="50" cy="103" r="2"></circle>'
                        + '<circle id="Oval-4-Copy" fill="#FFFFFF" cx="61" cy="103" r="2"></circle>'
                        + '<circle id="Oval-4-Copy-2" fill="#FFFFFF" cx="61" cy="111" r="2"></circle>'
                        + '<circle id="Oval-4-Copy-3" fill="#FFFFFF" cx="50" cy="111" r="2"></circle>'
                        + '<circle id="Oval-2" fill="#FFFFFF" cx="46" cy="47" r="2"></circle>'
                        + '<circle id="Oval-2-Copy" fill="#FFFFFF" cx="65" cy="47" r="2"></circle>'
                        + '<rect id="Rectangle-8" fill="#FFFFFF" x="40" y="45" width="10" height="2" rx="1"></rect>'
                        + '<rect id="Rectangle-8-Copy" fill="#FFFFFF" x="59" y="45" width="10" height="2" rx="1"></rect>'
                        + '<use id="Rectangle-7" stroke="#FFFFFF" mask="url(#mask-2)" stroke-width="10.0028558" xlink:href="#path-1"></use>'
                        + '<use id="Oval-2" stroke="#FFFFFF" mask="url(#mask-4)" stroke-width="10.0028558" xlink:href="#path-3"></use>'
                        + '<path d="M83,35 C84.8811671,35 87.9999998,36.7335773 88,37.5 C88.0000001,38.7074114 87.9999998,47.1919986 88,47.5 C88.0000001,48.7826639 85.4327576,50.0000012 83,50" id="Path-3" stroke="#FFFFFF" stroke-width="5.00142789" stroke-linecap="round" stroke-linejoin="round"></path>'
                        + '<path d="M22,35 C23.8811671,35 26.9999998,36.7335773 27,37.5 C27.0000001,38.7074114 26.9999998,47.1919986 27,47.5 C27.0000001,48.7826639 24.4327576,50.0000012 22,50" id="Path-3" stroke="#FFFFFF" stroke-width="5.00142789" stroke-linecap="round" stroke-linejoin="round" transform="translate(24.500000, 42.500000) scale(-1, 1) translate(-24.500000, -42.500000) "></path>'
                        + '<path d="M49,66 C49,66 51.1276507,70 55.3121296,70 C59.4966086,70 62,66.2069912 62,66.2069912" id="Path-5" stroke="#FFFFFF" stroke-width="2.39198725" stroke-linecap="round" stroke-linejoin="round"></path>'
                        + '<path d="M0,112 C2.57696179e-16,110.393119 0.610809356,105.254969 5.29470218,99.4973577 C9.978595,93.7397463 31.6016245,95.3973144 34.039778,95.4300094 C36.4779315,95.4627045 39.312333,91.6310526 41.6643031,91.0479115 C44.0162732,90.4647704 50.7539354,95.3973142 55,95.3973145" id="Path-6" stroke="#FFFFFF" stroke-width="5.00142789" stroke-linecap="round" stroke-linejoin="round"></path>'
                        + '<path d="M55,112 C55,110.393119 55.6108094,105.254969 60.2947022,99.4973577 C64.978595,93.7397463 86.6016245,95.3973144 89.039778,95.4300094 C91.4779315,95.4627045 94.312333,91.6310526 96.6643031,91.0479115 C99.0162732,90.4647704 105.753935,95.3973142 110,95.3973145" id="Path-6" stroke="#FFFFFF" stroke-width="5.00142789" stroke-linecap="round" stroke-linejoin="round" transform="translate(82.500000, 101.500000) scale(-1, 1) translate(-82.500000, -101.500000) "></path>'
                        + '</g>'
                        + '</g>'
                        + '</g>'
                        + '</g>'
                        + '</g>'
                        + '</svg>';
                    break;
                case 'Intro':
                    return 'data:image/svg+xml;charset=utf-8, <svg width="284px" height="172px" viewBox="0 0 284 505" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">'
                        + '<g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">'
                        + '<g id="Group-53" transform="translate(0.000000, -1.000000)">'
                        + '<g id="Group-22" transform="translate(94.666667, 0.160767)">'
                        + '<g id="Group-10" transform="translate(2.981627, 144.733038)" font-size="24" font-family="PingFangSC-Regular, PingFang SC" fill="#FFFFFF" font-weight="normal">'
                        + '<text id="城市介绍">'
                        + '<tspan x="0" y="25">城市介绍</tspan>'
                        + '</text>'
                        + '</g>'
                        + '<g id="Group-27">'
                        + '<g id="Group-21">'
                        + '<g id="Group-20" transform="translate(11.834056, 0.000000)">'
                        + '<rect id="Rectangle-106" fill="#FFFFFF" x="0" y="50.079878" width="7.39628477" height="7.36468795" rx="2.2110944"></rect>'
                        + '<rect id="Rectangle-106-Copy-2" fill="#FFFFFF" x="0" y="64.8092539" width="7.39628477" height="7.36468795" rx="2.2110944"></rect>'
                        + '<rect id="Rectangle-106-Copy-4" fill="#FFFFFF" x="0" y="79.5386298" width="7.39628477" height="7.36468795" rx="2.2110944"></rect>'
                        + '<rect id="Rectangle-106-Copy-6" fill="#FFFFFF" x="0" y="94.2680057" width="7.39628477" height="7.36468795" rx="2.2110944"></rect>'
                        + '<rect id="Rectangle-106-Copy-8" fill="#FFFFFF" x="0" y="108.997382" width="7.39628477" height="7.36468795" rx="2.2110944"></rect>'
                        + '<rect id="Rectangle-106-Copy" fill="#FFFFFF" x="12.5736841" y="50.079878" width="7.39628477" height="7.36468795" rx="2.2110944"></rect>'
                        + '<rect id="Rectangle-106-Copy-13" fill="#FFFFFF" x="65.8269344" y="64.8092539" width="7.39628477" height="7.36468795" rx="2.2110944"></rect>'
                        + '<rect id="Rectangle-106-Copy-10" fill="#FFFFFF" x="40.6795662" y="81.0115674" width="7.39628477" height="7.36468795" rx="2.2110944"></rect>'
                        + '<rect id="Rectangle-106-Copy-3" fill="#FFFFFF" x="12.5736841" y="64.8092539" width="7.39628477" height="7.36468795" rx="2.2110944"></rect>'
                        + '<rect id="Rectangle-106-Copy-14" fill="#FFFFFF" x="65.8269344" y="79.5386298" width="7.39628477" height="7.36468795" rx="2.2110944"></rect>'
                        + '<rect id="Rectangle-106-Copy-11" fill="#FFFFFF" x="40.6795662" y="95.7409433" width="7.39628477" height="7.36468795" rx="2.2110944"></rect>'
                        + '<rect id="Rectangle-106-Copy-5" fill="#FFFFFF" x="12.5736841" y="79.5386298" width="7.39628477" height="7.36468795" rx="2.2110944"></rect>'
                        + '<rect id="Rectangle-106-Copy-15" fill="#FFFFFF" x="65.8269344" y="94.2680057" width="7.39628477" height="7.36468795" rx="2.2110944"></rect>'
                        + '<rect id="Rectangle-106-Copy-12" fill="#FFFFFF" x="40.6795662" y="110.470319" width="7.39628477" height="7.36468795" rx="2.2110944"></rect>'
                        + '<rect id="Rectangle-106-Copy-7" fill="#FFFFFF" x="12.5736841" y="94.2680057" width="7.39628477" height="7.36468795" rx="2.2110944"></rect>'
                        + '<rect id="Rectangle-106-Copy-16" fill="#FFFFFF" x="65.8269344" y="108.997382" width="7.39628477" height="7.36468795" rx="2.2110944"></rect>'
                        + '<rect id="Rectangle-106-Copy-9" fill="#FFFFFF" x="12.5736841" y="108.997382" width="7.39628477" height="7.36468795" rx="2.2110944"></rect>'
                        + '<use id="Rectangle-104" stroke="#FFFFFF" mask="url(#mask-2)" stroke-width="8.8443776" xlink:href="#path-1"></use>'
                        + '<rect id="Rectangle-105" fill="#FFFFFF" x="65.8269344" y="44.9245965" width="14.7925695" height="8.83762553"></rect>'
                        + '<use id="Rectangle-103" stroke="#FFFFFF" mask="url(#mask-4)" stroke-width="8.8443776" xlink:href="#path-3"></use>'
                        + '<rect id="Rectangle-102" fill="#FFFFFF" x="8.13591324" y="0" width="4.43777086" height="25.7764078" rx="2.21888543"></rect>'
                        + '</g>'
                        + '<use id="Rectangle-100" stroke="#FFFFFF" mask="url(#mask-6)" stroke-width="8.8443776" xlink:href="#path-5"></use>'
                        + '<use id="Rectangle-101" stroke="#FFFFFF" mask="url(#mask-8)" stroke-width="8.8443776" xlink:href="#path-7"></use>'
                        + '</g>'
                        + '</g>'
                        + '</g>'
                        + '</g>'
                        + '</g>'
                        + '</svg>';
                    break;
                case 'Room Service':
                    return 'data:image/svg+xml;charset=utf-8, <svg width="285px" height="173px" viewBox="0 0 285 505" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">'
                        + '<g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">'
                        + '<g id="Group-49">'
                        + '<text id="直播电视" font-family="PingFangSC-Regular, PingFang SC" font-size="24" font-weight="normal" fill="#FFFFFF">'
                        + '<tspan x="95" y="169">直播电视</tspan>'
                        + '</text>'
                        + '<g id="直播电视" transform="translate(85.000000, 21.000000)">'
                        + '<use id="Rectangle-108" stroke="#FFFFFF" mask="url(#mask-2)" stroke-width="9.30751224" xlink:href="#path-1"></use>'
                        + '<rect id="Rectangle-103" fill="#FFFFFF" x="26.0892388" y="84.9115044" width="61.8687664" height="4.46902655" rx="2.23451327"></rect>'
                        + '</g>'
                        + '</g>'
                        + '</g>'
                        + '</svg>';
                    break;
                case 'Live':
                    return 'data:image/svg+xml;charset=utf-8, <svg width="285px" height="173px" viewBox="0 0 285 505" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">'
                        + '<g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">'
                        + '<g id="Group-49">'
                        + '<text id="直播电视" font-family="PingFangSC-Regular, PingFang SC" font-size="24" font-weight="normal" fill="#FFFFFF">'
                        + '<tspan x="95" y="169">直播电视</tspan>'
                        + '</text>'
                        + '<g id="直播电视" transform="translate(85.000000, 21.000000)">'
                        + '<use id="Rectangle-108" stroke="#FFFFFF" mask="url(#mask-2)" stroke-width="9.30751224" xlink:href="#path-1"></use>'
                        + '<rect id="Rectangle-103" fill="#FFFFFF" x="26.0892388" y="84.9115044" width="61.8687664" height="4.46902655" rx="2.23451327"></rect>'
                        + '</g>'
                        + '</g>'
                        + '</g>'
                        + '</svg>';
                    break;
                case 'Live':
                    return 'data:image/svg+xml;charset=utf-8, <svg width="285px" height="173px" viewBox="0 0 285 505" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">'
                        + '<g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">'
                        + '<g id="Group-49">'
                        + '<text id="直播电视" font-family="PingFangSC-Regular, PingFang SC" font-size="24" font-weight="normal" fill="#FFFFFF">'
                        + '<tspan x="95" y="169">直播电视</tspan>'
                        + '</text>'
                        + '<g id="直播电视" transform="translate(85.000000, 21.000000)">'
                        + '<use id="Rectangle-108" stroke="#FFFFFF" mask="url(#mask-2)" stroke-width="9.30751224" xlink:href="#path-1"></use>'
                        + '<rect id="Rectangle-103" fill="#FFFFFF" x="26.0892388" y="84.9115044" width="61.8687664" height="4.46902655" rx="2.23451327"></rect>'
                        + '</g>'
                        + '</g>'
                        + '</g>'
                        + '</svg>';
                    break;
            }
        }
    }])
    .service('MenuService', ['ResourceManager', function (ResourceManager) {
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