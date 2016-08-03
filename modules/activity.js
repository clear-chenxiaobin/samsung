/**
 * Created by 83471 on 2016/8/2.
 */
'use strict';

angular.module('app.activity', ['app.resource'])
    .service('ActivityManager',['ResourceManager', function (ResourceManager) {
        var activityStack = [];

        function Activity(id) {
            this.templateUrl = 'partials/' + id + '.html';
            this._hide = false;
            this._isMenu = false;
        }

        Activity.prototype.finish = function () {
            activityStack.pop();
        };

        Activity.prototype.initialize = function (scope) {
            this._scope = scope;
        };

        Activity.prototype.hide = function () {
            this._hide = true;
        };

        Activity.prototype.show = function () {
            this._hide = false;
        };

        Activity.prototype.isHide = function () {
            return this._hide;
        };


        Activity.prototype.keyUp = function (keyCode) {
            typeof(this._keyUp_callback_) === 'function' && this._keyUp_callback_(keyCode);
        };

        Activity.prototype.keyDown = function (keyCode) {
            typeof(this._keyDown_callback_) === 'function' && this._keyDown_callback_(keyCode);
        };

        Activity.prototype.onKeyUp = function (callback) {
            this._keyUp_callback_ = callback;
        };

        Activity.prototype.onKeyDown = function (callback) {
            this._keyDown_callback_ = callback;
        };

        Activity.prototype.isMenu = function (bool) {
            if (typeof bool !== 'boolean') {
                return this._isMenu;
            } else {
                this._isMenu = bool;
            }
        };

        Activity.prototype.loadI18NResource = function (callback) {
            callback(ResourceManager.getI18NResource());
            this._scope.$on('locale.change', function (ev, keyCode) {
                callback(ResourceManager.getI18NResource());
            });
        };

        Activity.prototype.animate = function (num,sel,className){
            var target = document.getElementById(sel).children[num].children[0];
            if(this.hasClass(target,className)){
                this.remove(num);
            }
            this.addClass(target, className);
        }

        Activity.prototype.remove = function (num,sel,className){
            var target = document.getElementById(sel).children[num].children[0];
            this.removeClass(target,className);
        }

        Activity.prototype.hasClass = function (obj, cls) {
            return obj.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
        }

        Activity.prototype.addClass = function (obj, cls) {
            if (!this.hasClass(obj, cls)) {
                obj.className += " " + cls;
            }
        }

        Activity.prototype.removeClass = function (obj, cls) {
            if (this.hasClass(obj, cls)) {
                var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
                obj.className = obj.className.replace(reg, ' ');
            }
        }

        Activity.prototype.transform = function(element, value, key) {
            key = key || "Transform";
            ["Moz", "O", "Ms", "Webkit", ""].forEach(function(prefix) {
                element.style[prefix + key] = value;
            });
            return element;
        }

        this.go = function (id, stackIndex) {
            var nPops = activityStack.length - stackIndex;
            for (var i = 0; i < nPops; i++) {
                activityStack.pop();
            }
            this.startActivity(id);
        };

        this.startActivity = function (id) {
            var activity = new Activity(id);
            activityStack.push(activity);
        };

        this.getActiveActivity = function () {
            return activityStack[activityStack.length - 1];
        };

        this.getActivityStack = function () {
            return activityStack;
        };

    }]);
