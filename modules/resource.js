/**
* Created by 83471 on 2016/8/2.
*/
'use strict';

angular.module('app.resource', [])
    .service('ResourceManager', ['$rootScope', 'SERVER_URL', 'MESSAGE_URL', 'en-US-String','zh-CN-String', function ($rootScope, SERVER_URL, MESSAGE_URL, en_US_String,zh_CN_String) {

        var locale         = 'zh-CN',
            i18nResource,
            configurations,
            picTextDetail,
            cityIndex,
            meal,
            cart = [],
            langString;

        this.initialize = function () {
            i18nResource = {};
            i18nResource['zh-CN'] = {};
            i18nResource['en-US'] = {};
            i18nResource['zh-CN'].language         = 'zh-CN';
            i18nResource['en-US'].language         = 'en-US';
        };

        this.setLocale = function (_locale) {
            locale = _locale;
            if(locale=="zh-CN"){
                langString = zh_CN_String;
            }else{
                langString = en_US_String;
            }
            $rootScope.$broadcast('locale.change', _locale);
            //console.log(locale);
        };

        this.getLocale = function () {
            return langString;
        };

        this.getI18NResource = function () {
            // keep i18n resource be a snapshot
            var resource = i18nResource[locale];
            return {
                getString: function (resourceKey) {
                    return resource[resourceKey];
                }
            };
        };

        this.addI18NResource = function (strs) {
            Object.keys(strs['zh-CN']).forEach(function (key) {
                i18nResource['zh-CN'][key] = strs['zh-CN'][key];
            });
            Object.keys(strs['en-US']).forEach(function (key) {
                i18nResource['en-US'][key] = strs['en-US'][key];
            });
        };

        this.setPicTextDetail = function (title, detail) {
            picTextDetail = {
                title : title,
                detail : detail
            };
        }

        this.getPicTextDetail = function () {
            return picTextDetail;
        }

        this.setCity = function(city){
            cityIndex = {
                cityName:city
            };
        }

        this.getCity = function(){
            return cityIndex;
        }

        this.setMeal = function(id){
            meal = {
                id:id
            };
        }

        this.getMeal = function(){
            return meal;
        }

        this.addToCart = function(id,f,n,p){
            cart[id] = {
                name : f ,
                num : n ,
                price : p
            }
        }

        this.getCart = function(){
            return cart;
        }

        this.resetCart = function(){
            cart = [];
        }

        this.getConfigurations = function () {
            return {
                mainConfigUrl: function () {
                    return SERVER_URL + '/main.json';
                },
                serverUrl: function () {
                    return SERVER_URL;
                },
                logoUrl: function () {
                    return configurations.logoUrl;
                },
                languages: function () {
                    return configurations.languages;
                },
                viewTree: function () {
                    return configurations.viewTree;
                },
                billUrl: function() {
                    return SERVER_URL + '/billing.json';
                },
                messageUrl: function() {
                    return MESSAGE_URL;
                },
            };
        };

    }])
    .constant('SERVER_URL', 'http://172.17.173.100/nativevod/now')
    .constant('MESSAGE_URL', 'http://192.168.17.101:8000/backend/GetMessage');

