//= require ../lib/_raphael
//= require ../lib/_numeral

var hmcharts =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_RESULT__ = function (require) {
	    var util = __webpack_require__(1);
	    var chart = {
	        create: __webpack_require__(2).create
	    };
	    var hmchartsComponents = {
	        series: __webpack_require__(7),
	        pie: __webpack_require__(20),
	        stackBar: __webpack_require__(21),
	        radar: __webpack_require__(22),
	        bubble: __webpack_require__(24),
	        flow: __webpack_require__(25),
	        heatMap: __webpack_require__(26),
	        maps: {
	            china: __webpack_require__(29),
	            world: __webpack_require__(31)
	        }
	        // util: {
	        //     format: require('./src/util/format')
	        // }
	    };
	    return util.extend(chart, hmchartsComponents);
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * @file hm-charts
	 * @author wumingdan(wumingdan@baidu.com)
	 */

	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function() {

	    var Util = {
	        noop: function () {},
	        extend: function(target, source) {
	            for (var p in source) {
	                if (source.hasOwnProperty(p)) {
	                    var src = source[p];

	                    if (typeof src == 'object' && !Util.isArray(src)) {
	                        target[p] = Util.extend(target[p] || {}, source[p]);
	                    } else {
	                        target[p] = source[p];
	                    }
	                }
	            }

	            return target;
	        },
	        isArray: Array.isArray || function(source) {
	            return source != null && typeof source == "object" && source.constructor == Array;
	        },
	        isFunction: function(source) {
	            return '[object Function]' == Object.prototype.toString.call(source);
	        },
	        isObject: function(source) {
	            return 'function' == typeof source || !! (source && 'object' == typeof source);
	        },
	        isPlainObject: function(source) {
	            return Util.isObject(source) && !Util.isFunction(source);
	        },
	        isNumber: function (source) {
	            return '[object Number]' == Object.prototype.toString.call(source) && isFinite(source);
	        },
	        isUrl: function(source) {
	            return /^((https|http|ftp|rtsp|mms)?:\/\/)?(([\w-]+\.)+[a-z]{2,6}|((25[0-5]|2[0-4]\d|1\d{2}|[1-9]\d|\d)\.){3}(25[0-5]|2[0-4]\d|1\d{2}|[1-9]\d|\d))(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/i.test(source);
	        },
	        cloneObject: function(source) {
	            var result = source,
	                i, len;
	            if (!source || source instanceof Number || source instanceof String || source instanceof Boolean) {
	                return result;
	            } else if (Util.isArray(source)) {
	                result = [];
	                var resultLen = 0;
	                for (i = 0, len = source.length; i < len; i++) {
	                    result[resultLen++] = Util.cloneObject(source[i]);
	                }
	            } else if (Util.isPlainObject(source)) {
	                result = {};
	                for (i in source) {
	                    if (source.hasOwnProperty(i)) {
	                        result[i] = Util.cloneObject(source[i]);
	                    }
	                }
	            }
	            return result;
	        },
	        isLowerThanIE8: !+'\v1',
	        format: function(source, opts) {
	            source = String(source);

	            var data = Array.prototype.slice.call(arguments, 1),
	                toString = Object.prototype.toString;

	            if (data.length) {
	                data = data.length == 1 ? /* ie 下 Object.prototype.toString.call(null) == '[object Object]' */
	                    (opts !== null && (/\[object Array\]|\[object Object\]/.test(toString.call(opts))) ? opts : data) : data;
	                return source.replace(/(#|!)\{(.+?)(?:\s*,\s*(\d+?))*?\}/g, function(match, type, key, length) {
	                    var replacer = data[key];
	                    // chrome 下 typeof /a/ == 'function'
	                    if ('[object Function]' == toString.call(replacer)) {
	                        replacer = replacer(key);
	                    }
	                    //html encode
	                    if (type == "!") {
	                        replacer = Util.encodeHTML(replacer);
	                    }
	                    return ('undefined' == typeof replacer ? '' : replacer);
	                });
	            }
	            return source;
	        },
	        truncat: function(str, length) {
	            if (str === null) return str;
	            var cn = 1;
	            if (/[^\x00-\xff]/.test(str)) {
	                length = Math.floor(2 * length / 3);
	                cn = 2;
	            }
	            if (str.length > length) {
	                return str.substr(0, length - 2 / cn) + "...";
	            } else {
	                return str;
	            }
	        },
	        encodeHtml: function(html) {
	            return String(html).replace(/['"<>& ]/g, function(all) {
	                return "&" + htmlEncodeDict[all] + ";";
	            });
	        },
	        rad: function(deg) {
	            return deg % 360 * Math.PI / 180;
	        },
	        unSelectable: function(element) {
	            // for IE/Chrome/Safari this code will work
	            if (typeof element.onselectstart != "undefined") {
	                element.onselectstart = function() {
	                    return false;
	                };
	            }
	            // for Firefox, there's no selectstart event in FF
	            else if (typeof element.style.MozUserSelect != "undefined") {
	                element.style.MozUserSelect = "none";
	            }
	        },
	        uniqueIdMap: {},
	        getUniqueId: function(len) {
	            var getRandomChar = function () {
	                var charMap = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
	                var charMapLen = charMap.length;
	                return charMap.charAt(Math.floor(Math.random() * charMapLen));
	            };

	            var l = len || 8;
	            var uid = '';
	            while (l--) {
	                uid += getRandomChar();
	            }
	            if (!Util.uniqueIdMap[uid]) {
	                Util.uniqueIdMap[uid] = 1;
	                return uid;
	            } else {
	                return getUniqueId(l);
	            }

	        },
	        dom: {
	            nextElementNode: function(element){
	                for (var node = element.nextSibling; node; node = node.nextSibling) {
	                    if (node.nodeType == 1) {
	                        return node;
	                    }
	                }
	            },
	            show: function(element){
	                element.style.display = '';

	                return element;
	            },
	            hide: function(element){
	                element.style.display = 'none';

	                return element;
	            },
	            toggle: function(element){
	                element.style.display = element.style.display == 'none' ? '' : 'none';

	                return element;
	            },
	            contains: function(container, contained){
	                return container.contains
	                    ? container != contained && container.contains(contained)
	                    : !!(container.compareDocumentPosition(contained) & 16);
	            },
	            setOpacity: function (element, opacity) {
	                if (Util.isLowerThanIE8) {
	                    var style = element.style;

	                    style.filter = (style.filter || '').replace(/alpha\([^\)]*\)/gi, '')
	                        + (opacity == 1 ? '' : 'alpha(opacity=' + opacity * 100 + ')');
	                    style.zoom = 1;
	                }
	                else {
	                    element.style.opacity = opacity;
	                }
	            }
	        },
	        event: {
	            on: function(element, type, listener){
	                if (element.addEventListener) {
	                    element.addEventListener(type, listener, false);
	                } else if (element.attachEvent) {
	                    element.attachEvent('on' + type, function (evt) {
	                    listener.call(element, evt);
	                });
	                }
	            },
	            preventDefault: function (event) {
	               if (event.preventDefault) {
	                   event.preventDefault();
	               } else {
	                   event.returnValue = false;
	               }
	            },
	            stopPropagation: function(event){
	                if (event.stopPropagation) {
	                    event.stopPropagation();
	                } else {
	                    event.cancelBubble = true;
	                }
	            },
	            getPageX: function(event){
	                var result = event.pageX;
	                var doc = document;

	                if (!result && result !== 0){
	                    result = (event.clientX || 0)
	                        + (doc.documentElement.scrollLeft || doc.body.scrollLeft);
	                }

	                return result;
	            },
	            getPageY: function(event){
	                var result = event.pageY;
	                var doc = document;

	                if (!result && result !== 0){
	                    result = (event.clientY || 0)
	                        + (doc.documentElement.scrollTop || doc.body.scrollTop);
	                }

	                return result;
	            }
	        },
	        bind: function(fn, scope){
	            var exArgs = arguments.length > 2 ? [].slice.call(arguments, 2) : null;
	                return function () {   
	                    args = (exArgs) ? exArgs.concat([].slice.call(arguments, 0)) : arguments;
	                    
	                    return fn.apply(scope || fn, args);
	                };
	        },

	        color: {
	            lightenDarkenColor: function (col, amt) {
	                var usePound = false;

	                if (col[0] == "#") {
	                    col = col.slice(1);
	                    usePound = true;
	                }
	 
	                var num = parseInt(col, 16);
	 
	                var r = (num >> 16) + amt;
	 
	                if (r > 255) {
	                    r = 255;
	                }
	                else if (r < 0)  {
	                    r = 0;
	                }
	 
	                var b = ((num >> 8) & 0x00FF) + amt;
	 
	                if (b > 255) {
	                    b = 255;
	                }
	                else if (b < 0) {
	                    b = 0;
	                }
	 
	                var g = (num & 0x0000FF) + amt;
	 
	                if (g > 255) {
	                    g = 255;
	                }
	                else if (g < 0) {
	                    g = 0;
	                }
	 
	                return (usePound ? '#' : '') + (g | (b << 8) | (r << 16)).toString(16);
	            },

	            lighten: function (col, amt) {
	                if (amt <= 0) {
	                    return col;
	                }
	                return Util.color.lightenDarkenColor(col, amt);
	            },

	            darken: function (col, amt) {
	                if (amt >= 0) {
	                    return col;
	                }
	                return Util.color.lightenDarkenColor(col, amt);
	            }
	        },

	        /**
	         * 以下为绘图辅助，可以抽取一个新的模块
	         */
	        forceCrispEdges: function (num) {
	            return Math.floor(num) + 0.5;
	        },

	        convertPathAttr: function (opts) {
	            opts = Util.cloneObject(opts);

	            var dasharray;

	            if (opts.type == 'dashed') {
	                dasharray = ['- '];
	            }
	            else if (opts.type == 'dotted') {
	                dasharray = ['. '];
	            }

	            var attribute = {
	                stroke: opts.color,
	                'stroke-width': opts.width,
	                'stroke-dasharray': dasharray,
	                fill: opts.background
	            };
	            opts.width = null;

	            attribute = Util.extend(opts, attribute);
	            attribute = Util.clearNullAttrs(attribute);

	            return attribute;
	        },

	        convertTextAttr: function (opts) {
	            opts = Util.cloneObject(opts);
	            var anchor = 'middle';
	            if (opts.align === 'left') {
	                anchor = 'start';
	            }
	            else if (opts.align == 'right') {
	                anchor = 'end';
	            }

	            var attribute = {
	                'fill': opts.color,
	                'font-size': opts.fontSize || 12,
	                'font-family': opts.fontFamily,
	                'font-weight': opts.fontWeight,
	                'text-anchor': anchor,
	                'font-style': opts.fontStyle
	            };

	            //if (T.browser.ie < 9) {
	            //    attribute['font-size'] += 1;
	            //}

	            attribute = Util.extend(opts, attribute);
	            attribute = Util.clearNullAttrs(attribute);

	            return attribute;
	        },

	        convertAreaAttr: function (opts) {
	            opts = Util.cloneObject(opts);

	            var attribute = {
	                color: opts.borderColor,
	                width: opts.borderWidth,
	                type: opts.borderType,
	                background: opts.background || opts.color || opts.backgroundColor
	            };

	            attribute = Util.convertPathAttr(attribute);

	            attribute = Util.extend(attribute, {
	                r: opts.radius
	            });

	            opts.borderColor = null;
	            opts.borderWidth = null;
	            opts.borderType = null;
	            opts.color = null;
	            opts.background = null;
	            opts.backgroundColor = null;
	            opts.radius = null;

	            attribute = Util.extend(opts, attribute);
	            attribute = Util.clearNullAttrs(attribute);

	            return attribute;
	        },

	        clearNullAttrs: function (target) {
	            for (var key in target) {
	                if (target.hasOwnProperty(key) && (target[key] == null || target[key] === undefined)) {
	                    delete target[key];
	                }
	            }
	            return target;
	        },

	        getBoundingClientRect: function (element) {
	            var ele = element[0];

	            var type = Object.prototype.toString.call(ele);

	            var boundingRect = {
	                width: 0, height: 0,
	                left: 0, right: 0
	            };

	            if (type.toUpperCase().indexOf('SVG') !== -1) {
	                var rect = element.getBBox();
	                boundingRect.width = rect.x2 - rect.x;
	                boundingRect.height = rect.y2 - rect.y;
	                boundingRect.left = rect.x;
	                boundingRect.top = rect.y;
	            }
	            else {
	                boundingRect.width = ele.offsetWidth;
	                boundingRect.height = ele.offsetHeight;
	                boundingRect.left = ele.offsetLeft;
	                boundingRect.top = ele.offsetTop;
	            }

	            return boundingRect;
	        },

	        fixUnitSuffix: function (value, suffix) {
	            if (value == null) {
	                throw new Error('cannot call fixUnitSuffix with null');
	            }

	            value = value.toString().indexOf(suffix) === -1
	                ? value + suffix
	                : value;

	            return value;
	        },

	        fixUnitSuffixWithPX: function (value) {
	            return Util.fixUnitSuffix(value, 'px');
	        },

	        getSeriesTypeDetail: function (series) {
	            var detail = {
	                line: 0,
	                bar: 0
	            };

	            for (var i = 0; i < series.length; i++) {
	                if (detail[series[i].type] !== undefined) {
	                    detail[series[i].type]++;
	                }
	            }

	            return detail;
	        },

	        getReverseDirection: function (dir) {
	            var result;

	            switch (dir) {
	                case 'bottom':
	                    result = 'top';
	                    break;
	                case 'top':
	                    result = 'bottom';
	                    break;
	                case 'left':
	                    result = 'right';
	                    break;
	                case 'right':
	                    result = 'left';
	                    break;
	                default:
	            }

	            return result;
	        },

	        isHorizontal: function (position) {
	            return /bottom|top/i.test(position);
	        }
	    };

	    return Util;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * @file hm-charts
	 * @author wumingdan(wumingdan@baidu.com)
	 * @contributor luodongyang(luodongyang@baidu.com)
	 */

	!(__WEBPACK_AMD_DEFINE_RESULT__ = function (require) {

	    var Raphael = __webpack_require__(3);
	    var Util = __webpack_require__(1);

	    var ChartBase = __webpack_require__(4);

	    var Chart = {
	        create: function (prop, data, settings) {
	            settings = settings || {};

	            var f = function () { };

	            var propObject = Util.extend(Util.cloneObject(ChartBase), prop)

	            f.prototype = propObject;

	            var chart = new f();

	            var originalSettings = Util.cloneObject(chart.defaults);
	            settings.containerId = settings.containerId === undefined ? data.containerId : settings.containerId;
	            var opts = Util.extend(originalSettings, settings);

	            chart._data = data;
	            chart.opts = opts;

	            var container = chart.container = document.getElementById(opts.containerId);

	            if (container) {
	                // 1. 清空容器
	                container.innerHTML = '';

	                // 2. 设置样式
	                container.style.position = 'relative';
	                container.style.fontFamily
	                    = opts.fontFamily || 'Microsoft Yahei, Helvetica, STHeitiSC-Light, Arial, sans-serif';

	                // 4. 初始化 svg/vml 容器
	                var width = opts.width || '100%';
	                var height = opts.height || '100%';

	                chart.paper = new Raphael(opts.containerId, width, height);
	                // 3. 初始化 html 容器
	                var html = document.createElement('div');
	                html.className = 'hm-charts-html';
	                chart.htmlPaper = html;
	                container.appendChild(html);

	                // 5. 更新 width & height
	                opts.width = container.offsetWidth || container.clientWidth;
	                opts.height = container.offsetHeight || container.clientHeight;

	                // 通用方法
	                chart.init();
	            }

	            if (data) {
	                chart.setData(data);
	            }

	            return chart;
	        },

	        createComponent: function (prop, settings) {
	            var f = function () { };
	            f.prototype = prop;

	            var component = new f();

	            var originalSettings = Util.cloneObject(component.defaults);
	            var opts = Util.extend(originalSettings, settings);

	            component.opts = opts;

	            Util.isFunction(component.init) && component.init();

	            return component;
	        }
	    };

	    return Chart;
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = Raphael;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * @file hm-charts
	 * @author wumingdan(wumingdan@baidu.com), luodongyang(luodongyang@baidu.com)
	 */

	!(__WEBPACK_AMD_DEFINE_RESULT__ = function (require) {

	    var Raphael = __webpack_require__(3);
	    var Util = __webpack_require__(1);

	    var Hint = __webpack_require__(5);

	    var ChartBase = {

	        /**
	         * 给图形绑定事件
	         */
	        init: function () {
	            // 初始化 chart 的运行时上下文
	            var runtimeContext = this.runtimeContext = this.runtimeContext || {};
	            runtimeContext.resizePid = null;
	            runtimeContext.lastResizeEventTime = null;
	            runtimeContext.isLoading = false;

	            this.bindEvents();
	        },

	        setData: function (data) {
	            if (data && data.series && data.series.length
	                || data.items && data.items.length) {
	                var me = this;

	                this.showLoading();

	                // 子类必须提供初始化 render 接口，否则无法完整初始化
	                setTimeout(function () {
	                    me.render(data);
	                    me.hideLoading();
	                }, 0);
	            }
	            else {
	                this.showNoData();
	            }
	        },

	        isVML: Raphael.vml,

	        createHint: function (prop, settings) {
	            var f = function () { };
	            f.prototype = prop;

	            var component = new f();

	            var originalSettings = Util.cloneObject(component.defaults);
	            var opts = Util.extend(originalSettings, settings);

	            component.opts = opts;

	            Util.isFunction(component.init) && component.init();

	            return component;
	        },

	        showHint: function (html, hintKey) {
	            var setting = {
	                content: html || 'loading...'
	            };

	            var hintKey = hintKey || 'loading';
	            if (!this[hintKey]) {
	                this[hintKey] = ChartBase.createHint(Hint, setting);
	                this[hintKey].render(this.htmlPaper);
	                this[hintKey].show();
	            }
	            else {
	                this[hintKey].update(setting);
	            }

	            // 如果隐藏的 hint 是 loading，则修改 isLoading 的状态
	            if (hintKey === 'loading') {
	                this.runtimeContext.isLoading = true;
	            }
	        },

	        hideHint: function (hintKey) {
	            var hintKey = hintKey || 'loading';
	            this[hintKey] && this[hintKey].hide();

	            // 如果隐藏的 hint 是 loading，则修改 isLoading 的状态
	            if (hintKey === 'loading') {
	                this.runtimeContext.isLoading = false;
	            }
	        },

	        showLoading: function (html) {
	            if (!this.runtimeContext.isLoading) {
	                if (html === undefined) {
	                    var loadingGif = '<img style="vertical-align:bottom;margin-right:5px" src="data:image/gif;base64,R0lGODlhFgAWAPcAAAAAAAEBAQICAgMDAwQEBAUFBQYGBgcHBwgICAkJCQoKCgsLCwwMDA0NDQ4ODg8PDxAQEBERERISEhMTExQUFBUVFRYWFhcXFxgYGBkZGRoaGhsbGxwcHB0dHR4eHh8fHyAgICEhISIiIiMjIyQkJCUlJSYmJicnJygoKCkpKSoqKisrKywsLC0tLS4uLi8vLzAwMDExMTIyMjMzMzQ0NDU1NTY2Njc3Nzg4ODk5OTo6Ojs7Ozw8PD09PT4+Pj8/P0BAQEFBQUJCQkNDQ0REREVFRUZGRkdHR0hISElJSUpKSktLS0xMTE1NTU5OTk9PT1BQUFFRUVJSUlNTU1RUVFVVVVZWVldXV1hYWFlZWVpaWltbW1xcXF1dXV5eXl9fX2BgYGFhYWJiYmNjY2RkZGVlZWZmZmdnZ2hoaGlpaWpqamtra2xsbG1tbW5ubm9vb3BwcHFxcXJycnNzc3R0dHV1dXZ2dnd3d3h4eHl5eXp6ent7e3x8fH19fX5+fn9/f4CAgIGBgYKCgoODg4SEhIWFhYaGhoeHh4iIiImJiYqKiouLi4yMjI2NjY6Ojo+Pj5CQkJGRkZKSkpOTk5SUlJWVlZaWlpeXl5iYmJmZmZqampubm5ycnJ2dnZ6enp+fn6CgoKGhoaKioqOjo6SkpKWlpaampqenp6ioqKmpqaqqqqurq6ysrK2tra6urq+vr7CwsLGxsbKysrOzs7S0tLW1tba2tre3t7i4uLm5ubq6uru7u7y8vL29vb6+vr+/v8DAwMHBwcLCwsPDw8TExMXFxcbGxsfHx8jIyMnJycrKysvLy8zMzM3Nzc7Ozs/Pz9DQ0NHR0dLS0tPT09TU1NXV1dbW1tfX19jY2NnZ2dra2tvb29zc3N3d3d7e3t/f3+Hh4ebm5uvr6/Dw8PX19fn5+fz8/P39/f7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v///////////////////////yH/C05FVFNDQVBFMi4wAwEAAAAh+QQJBAD8ACwAAAAAFgAWAAAIygD5CRxIsKDBgwgTJqxWTaHBc+cEvnolcBo3h/zMmYvHT5UqfuJiJcMYTyM/WrT47Yo1LmG5chHPmeMXLhy5WNP4jXsGzmA5cuTK8eM4cFy5a7lyXTtoDmjEguNyGWuZcOZBqgbJiRNnFKE4ZMCIfSOolavQg1/Djj141iBWtjXbFj3m7G3RmuPOySVn7tuxY2sJjhMnVJw3c+OMPgvHjxw2xgjLeWO8bRs/as/IYQznTag1a42fecM4WCA2bALDicNIcCvr17AxBgQAIfkECQQA/AAsAAAAABYAFgCHAAAAAQEBAgICAwMDBAQEBQUFBgYGBwcHCAgICQkJCgoKCwsLDAwMDQ0NDg4ODw8PEBAQEREREhISExMTFBQUFRUVFhYWFxcXGBgYGRkZGhoaGxsbHBwcHR0dHh4eHx8fICAgISEhIiIiIyMjJCQkJSUlJiYmJycnKCgoKSkpKioqKysrLCwsLS0tLi4uLy8vMDAwMTExMjIyMzMzNDQ0NTU1NjY2Nzc3ODg4OTk5Ojo6Ozs7PDw8PT09Pj4+Pz8/QEBAQUFBQkJCQ0NDRERERUVFRkZGR0dHSEhISUlJSkpKS0tLTExMTU1NTk5OT09PUFBQUVFRUlJSU1NTVFRUVVVVVlZWV1dXWFhYWVlZWlpaW1tbXFxcXV1dXl5eX19fYGBgYWFhYmJiY2NjZGRkZWVlZmZmZ2dnaGhoaWlpampqa2trbGxsbW1tbm5ub29vcHBwcXFxcnJyc3NzdHR0dXV1dnZ2d3d3eHh4eXl5enp6e3t7fHx8fX19fn5+f39/gICAgYGBgoKCg4ODhISEhYWFhoaGh4eHiIiIiYmJioqKi4uLjIyMjY2Njo6Oj4+PkJCQkZGRkpKSk5OTlJSUlZWVlpaWl5eXmJiYmZmZmpqam5ubnJycnZ2dnp6en5+foKCgoaGhoqKio6OjpKSkpaWlpqamp6enqKioqampqqqqq6urrKysra2trq6ur6+vsLCwsbGxsrKys7OztLS0tbW1tra2t7e3uLi4ubm5urq6u7u7vLy8vb29vr6+v7+/wMDAwcHBwsLCw8PDxMTExcXFxsbGx8fHyMjIycnJysrKy8vLzMzMzc3Nzs7Oz8/P0NDQ0dHR0tLS09PT1NTU1dXV1tbW19fX2NjY2dnZ2tra29vb3Nzc3d3d3t7e39/f4eHh5ubm6+vr8PDw9fX1+fn5/Pz8/f39/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+////////////////////////CMIA+QkcSLCgwYMIEypcaNBcOYHx4gmMpo1hOXLn+EXkJ66VMYbxyD3ceKvVuIQXzfG7KJEfuVbR+I1b5s0guXHjyGkkOK5cNVq0qh00h1NlwXG0golTaNTg0oPkxIUT9/CguGK8gnUjGHVqVafEeAHbevDrUYXlwoEzK3DcMGUnnYIDJ84hV3Pdhg0jy5Mqx2zlcJZTBs5ltXAJyWUrfA0bP2jKdC4Ml02nNGkylW1jOO4pNWoCwSFmODDcaNKoUysMCAAh+QQJBAD8ACwAAAAAFgAWAIcAAAABAQECAgIDAwMEBAQFBQUGBgYHBwcICAgJCQkKCgoLCwsMDAwNDQ0ODg4PDw8QEBARERESEhITExMUFBQVFRUWFhYXFxcYGBgZGRkaGhobGxscHBwdHR0eHh4fHx8gICAhISEiIiIjIyMkJCQlJSUmJiYnJycoKCgpKSkqKiorKyssLCwtLS0uLi4vLy8wMDAxMTEyMjIzMzM0NDQ1NTU2NjY3Nzc4ODg5OTk6Ojo7Ozs8PDw9PT0+Pj4/Pz9AQEBBQUFCQkJDQ0NERERFRUVGRkZHR0dISEhJSUlKSkpLS0tMTExNTU1OTk5PT09QUFBRUVFSUlJTU1NUVFRVVVVWVlZXV1dYWFhZWVlaWlpbW1tcXFxdXV1eXl5fX19gYGBhYWFiYmJjY2NkZGRlZWVmZmZnZ2doaGhpaWlqampra2tsbGxtbW1ubm5vb29wcHBxcXFycnJzc3N0dHR1dXV2dnZ3d3d4eHh5eXl6enp7e3t8fHx9fX1+fn5/f3+AgICBgYGCgoKDg4OEhISFhYWGhoaHh4eIiIiJiYmKioqLi4uMjIyNjY2Ojo6Pj4+QkJCRkZGSkpKTk5OUlJSVlZWWlpaXl5eYmJiZmZmampqbm5ucnJydnZ2enp6fn5+goKChoaGioqKjo6OkpKSlpaWmpqanp6eoqKipqamqqqqrq6usrKytra2urq6vr6+wsLCxsbGysrKzs7O0tLS1tbW2tra3t7e4uLi5ubm6urq7u7u8vLy9vb2+vr6/v7/AwMDBwcHCwsLDw8PExMTFxcXGxsbHx8fIyMjJycnKysrLy8vMzMzNzc3Ozs7Pz8/Q0NDR0dHS0tLT09PU1NTV1dXW1tbX19fY2NjZ2dna2trb29vc3Nzd3d3e3t7f39/h4eHm5ubr6+vw8PD19fX5+fn8/Pz9/f3+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7///////////////////////8IwwD5CRxIsKDBgwgTJjRnTqHBcuUEQhTYLJtDfuTGNZwoDtWwi+bGkeM3cRaqcQkzbhwX79w5cqia8RuXjJtBcuLEkYvXcOC4ctJgwZJ2sNw4cT0JjoP1S5zCiAedHhwXDly4kVGB3dq1TWnVqwjFaeXV9SBWgyhTguMGVakvY2kLiuPGDWlbjOa2+fJV1mvEcNWM/jT2DaM0cCmrdeM3bRo/ZsbOJgRXbWQzmeOMXbsoLpxAaNAEfvN8cWA40qVTq1YYEAAh+QQJBAD8ACwAAAAAFgAWAIcAAAABAQECAgIDAwMEBAQFBQUGBgYHBwcICAgJCQkKCgoLCwsMDAwNDQ0ODg4PDw8QEBARERESEhITExMUFBQVFRUWFhYXFxcYGBgZGRkaGhobGxscHBwdHR0eHh4fHx8gICAhISEiIiIjIyMkJCQlJSUmJiYnJycoKCgpKSkqKiorKyssLCwtLS0uLi4vLy8wMDAxMTEyMjIzMzM0NDQ1NTU2NjY3Nzc4ODg5OTk6Ojo7Ozs8PDw9PT0+Pj4/Pz9AQEBBQUFCQkJDQ0NERERFRUVGRkZHR0dISEhJSUlKSkpLS0tMTExNTU1OTk5PT09QUFBRUVFSUlJTU1NUVFRVVVVWVlZXV1dYWFhZWVlaWlpbW1tcXFxdXV1eXl5fX19gYGBhYWFiYmJjY2NkZGRlZWVmZmZnZ2doaGhpaWlqampra2tsbGxtbW1ubm5vb29wcHBxcXFycnJzc3N0dHR1dXV2dnZ3d3d4eHh5eXl6enp7e3t8fHx9fX1+fn5/f3+AgICBgYGCgoKDg4OEhISFhYWGhoaHh4eIiIiJiYmKioqLi4uMjIyNjY2Ojo6Pj4+QkJCRkZGSkpKTk5OUlJSVlZWWlpaXl5eYmJiZmZmampqbm5ucnJydnZ2enp6fn5+goKChoaGioqKjo6OkpKSlpaWmpqanp6eoqKipqamqqqqrq6usrKytra2urq6vr6+wsLCxsbGysrKzs7O0tLS1tbW2tra3t7e4uLi5ubm6urq7u7u8vLy9vb2+vr6/v7/AwMDBwcHCwsLDw8PExMTFxcXGxsbHx8fIyMjJycnKysrLy8vMzMzNzc3Ozs7Pz8/Q0NDR0dHS0tLT09PU1NTV1dXW1tbX19fY2NjZ2dna2trb29vc3Nzd3d3e3t7f39/h4eHm5ubr6+vw8PD19fX5+fn8/Pz9/f3+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7///////////////////////8IxAD5CRxIsKDBgwgTJixXTqHBcuQEkovI71w8h/zIjTOXMWI8c+cwmhs3riM/c+YuItTYUOM5lB9DjiumzeC4cOHGfSR48dmqVc8OlhMXrmHBcat0iVNo1ODSg+PAfQNH0WA4XrNuZSMYdWrVglezbj34latCct2wNR04Tpewkk6xYRNn7is5c9h06cLmtCi/cNDKkSwnrBu/cc/AJSQHjS80aPySCSt70Bu0iMmSHRZGDSNRgcyYCewWDiNBcIpNq17tMCAAIfkECQQA/AAsAAAAABYAFgCHAAAAAQEBAgICAwMDBAQEBQUFBgYGBwcHCAgICQkJCgoKCwsLDAwMDQ0NDg4ODw8PEBAQEREREhISExMTFBQUFRUVFhYWFxcXGBgYGRkZGhoaGxsbHBwcHR0dHh4eHx8fICAgISEhIiIiIyMjJCQkJSUlJiYmJycnKCgoKSkpKioqKysrLCwsLS0tLi4uLy8vMDAwMTExMjIyMzMzNDQ0NTU1NjY2Nzc3ODg4OTk5Ojo6Ozs7PDw8PT09Pj4+Pz8/QEBAQUFBQkJCQ0NDRERERUVFRkZGR0dHSEhISUlJSkpKS0tLTExMTU1NTk5OT09PUFBQUVFRUlJSU1NTVFRUVVVVVlZWV1dXWFhYWVlZWlpaW1tbXFxcXV1dXl5eX19fYGBgYWFhYmJiY2NjZGRkZWVlZmZmZ2dnaGhoaWlpampqa2trbGxsbW1tbm5ub29vcHBwcXFxcnJyc3NzdHR0dXV1dnZ2d3d3eHh4eXl5enp6e3t7fHx8fX19fn5+f39/gICAgYGBgoKCg4ODhISEhYWFhoaGh4eHiIiIiYmJioqKi4uLjIyMjY2Njo6Oj4+PkJCQkZGRkpKSk5OTlJSUlZWVlpaWl5eXmJiYmZmZmpqam5ubnJycnZ2dnp6en5+foKCgoaGhoqKio6OjpKSkpaWlpqamp6enqKioqampqqqqq6urrKysra2trq6ur6+vsLCwsbGxsrKys7OztLS0tbW1tra2t7e3uLi4ubm5urq6u7u7vLy8vb29vr6+v7+/wMDAwcHBwsLCw8PDxMTExcXFxsbGx8fHyMjIycnJysrKy8vLzMzMzc3Nzs7Oz8/P0NDQ0dHR0tLS09PT1NTU1dXV1tbW19fX2NjY2dnZ2tra29vb3Nzc3d3d3t7e39/f4eHh5ubm6+vr8PDw9fX1+fn5/Pz8/f39/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+////////////////////////CLcA+QkcSLCgwYMIEyYsV06hQXLkBI4bJ9CcOYf8xolrOJHfOYYYy4kTxw8iP4bxEmpsSE6cOZTlLqoEB27cR4LxUiosFw5cQ4wHfwIVKI6btm8RD4bD5WrWNYJFtXlLanBp06cHqRYkmZActmlaidr6xbVguGnTwpnTOs5cNVu2qhkUBy4iOGYiN/bKlrHZN5XMrPFbxoxfsV4UHXJjRpEYsYy9omHsKfDYMYHZwA0VSHOz588GAwIAIfkECQQA/AAsAAAAABYAFgCHAAAAAQEBAgICAwMDBAQEBQUFBgYGBwcHCAgICQkJCgoKCwsLDAwMDQ0NDg4ODw8PEBAQEREREhISExMTFBQUFRUVFhYWFxcXGBgYGRkZGhoaGxsbHBwcHR0dHh4eHx8fICAgISEhIiIiIyMjJCQkJSUlJiYmJycnKCgoKSkpKioqKysrLCwsLS0tLi4uLy8vMDAwMTExMjIyMzMzNDQ0NTU1NjY2Nzc3ODg4OTk5Ojo6Ozs7PDw8PT09Pj4+Pz8/QEBAQUFBQkJCQ0NDRERERUVFRkZGR0dHSEhISUlJSkpKS0tLTExMTU1NTk5OT09PUFBQUVFRUlJSU1NTVFRUVVVVVlZWV1dXWFhYWVlZWlpaW1tbXFxcXV1dXl5eX19fYGBgYWFhYmJiY2NjZGRkZWVlZmZmZ2dnaGhoaWlpampqa2trbGxsbW1tbm5ub29vcHBwcXFxcnJyc3NzdHR0dXV1dnZ2d3d3eHh4eXl5enp6e3t7fHx8fX19fn5+f39/gICAgYGBgoKCg4ODhISEhYWFhoaGh4eHiIiIiYmJioqKi4uLjIyMjY2Njo6Oj4+PkJCQkZGRkpKSk5OTlJSUlZWVlpaWl5eXmJiYmZmZmpqam5ubnJycnZ2dnp6en5+foKCgoaGhoqKio6OjpKSkpaWlpqamp6enqKioqampqqqqq6urrKysra2trq6ur6+vsLCwsbGxsrKys7OztLS0tbW1tra2t7e3uLi4ubm5urq6u7u7vLy8vb29vr6+v7+/wMDAwcHBwsLCw8PDxMTExcXFxsbGx8fHyMjIycnJysrKy8vLzMzMzc3Nzs7Oz8/P0NDQ0dHR0tLS09PT1NTU1dXV1tbW19fX2NjY2dnZ2tra29vb3Nzc3d3d3t7e39/f4eHh5ubm6+vr8PDw9fX1+fn5/Pz8/f39/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+////////////////////////CMYA+QkcSLCgwYMIEyYkR06hQXLjBIoTJ7BcOYf8xIW7OJGfOXIXHZYLR3FcRIbnEo4Td3FcOHMWz4HkF89cyoLivHkTdy6kwHPxzpmzebAcOG8+B9Y0F09hUoJND4rLZm1bxIPhaKl6VY2gOGxVrxrMurXrwYZSFZKr9gyt11i7KI599uylW37jyk2LFWvaWG8Nvx0rN5Fcrmt4k3FTeSwaP2TI+AXLJTYhtmMRgQHDm8sZxnDfBBIjJvAaOIwEv4VGzbq1w4AAIfkECQQA/AAsAAAAABYAFgCHAAAAAQEBAgICAwMDBAQEBQUFBgYGBwcHCAgICQkJCgoKCwsLDAwMDQ0NDg4ODw8PEBAQEREREhISExMTFBQUFRUVFhYWFxcXGBgYGRkZGhoaGxsbHBwcHR0dHh4eHx8fICAgISEhIiIiIyMjJCQkJSUlJiYmJycnKCgoKSkpKioqKysrLCwsLS0tLi4uLy8vMDAwMTExMjIyMzMzNDQ0NTU1NjY2Nzc3ODg4OTk5Ojo6Ozs7PDw8PT09Pj4+Pz8/QEBAQUFBQkJCQ0NDRERERUVFRkZGR0dHSEhISUlJSkpKS0tLTExMTU1NTk5OT09PUFBQUVFRUlJSU1NTVFRUVVVVVlZWV1dXWFhYWVlZWlpaW1tbXFxcXV1dXl5eX19fYGBgYWFhYmJiY2NjZGRkZWVlZmZmZ2dnaGhoaWlpampqa2trbGxsbW1tbm5ub29vcHBwcXFxcnJyc3NzdHR0dXV1dnZ2d3d3eHh4eXl5enp6e3t7fHx8fX19fn5+f39/gICAgYGBgoKCg4ODhISEhYWFhoaGh4eHiIiIiYmJioqKi4uLjIyMjY2Njo6Oj4+PkJCQkZGRkpKSk5OTlJSUlZWVlpaWl5eXmJiYmZmZmpqam5ubnJycnZ2dnp6en5+foKCgoaGhoqKio6OjpKSkpaWlpqamp6enqKioqampqqqqq6urrKysra2trq6ur6+vsLCwsbGxsrKys7OztLS0tbW1tra2t7e3uLi4ubm5urq6u7u7vLy8vb29vr6+v7+/wMDAwcHBwsLCw8PDxMTExcXFxsbGx8fHyMjIycnJysrKy8vLzMzMzc3Nzs7Oz8/P0NDQ0dHR0tLS09PT1NTU1dXV1tbW19fX2NjY2dnZ2tra29vb3Nzc3d3d3t7e39/f4eHh5ubm6+vr8PDw9fX1+fn5/Pz8/f39/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+////////////////////////CMgA+QkcSLCgwYMIEyYkR06hwXHiBIqLyI9cOYf8xIG7GC4cP3PjGjosB87jRH7jxplLOC7cRY3mypU7F5JfvHIrC4rLlk3cuYsDzf1kCLQgOW/Zig6MZ/GcQpEGnR4MV00atnEJ42ktGI6atGtYEWqNxxIhRYTjoimDOlBcq1tnCYJTpgycObbjykVr1SqawXDbGnYbVm4iOVrVUBrTxnKYM37EivHrRSuswmrDsPLilZHWMozhugkEBkxgNW8YCXYTnbq1a4cBAQAh+QQJBAD8ACwAAAAAFgAWAIcAAAABAQECAgIDAwMEBAQFBQUGBgYHBwcICAgJCQkKCgoLCwsMDAwNDQ0ODg4PDw8QEBARERESEhITExMUFBQVFRUWFhYXFxcYGBgZGRkaGhobGxscHBwdHR0eHh4fHx8gICAhISEiIiIjIyMkJCQlJSUmJiYnJycoKCgpKSkqKiorKyssLCwtLS0uLi4vLy8wMDAxMTEyMjIzMzM0NDQ1NTU2NjY3Nzc4ODg5OTk6Ojo7Ozs8PDw9PT0+Pj4/Pz9AQEBBQUFCQkJDQ0NERERFRUVGRkZHR0dISEhJSUlKSkpLS0tMTExNTU1OTk5PT09QUFBRUVFSUlJTU1NUVFRVVVVWVlZXV1dYWFhZWVlaWlpbW1tcXFxdXV1eXl5fX19gYGBhYWFiYmJjY2NkZGRlZWVmZmZnZ2doaGhpaWlqampra2tsbGxtbW1ubm5vb29wcHBxcXFycnJzc3N0dHR1dXV2dnZ3d3d4eHh5eXl6enp7e3t8fHx9fX1+fn5/f3+AgICBgYGCgoKDg4OEhISFhYWGhoaHh4eIiIiJiYmKioqLi4uMjIyNjY2Ojo6Pj4+QkJCRkZGSkpKTk5OUlJSVlZWWlpaXl5eYmJiZmZmampqbm5ucnJydnZ2enp6fn5+goKChoaGioqKjo6OkpKSlpaWmpqanp6eoqKipqamqqqqrq6usrKytra2urq6vr6+wsLCxsbGysrKzs7O0tLS1tbW2tra3t7e4uLi5ubm6urq7u7u8vLy9vb2+vr6/v7/AwMDBwcHCwsLDw8PExMTFxcXGxsbHx8fIyMjJycnKysrLy8vMzMzNzc3Ozs7Pz8/Q0NDR0dHS0tLT09PU1NTV1dXW1tbX19fY2NjZ2dna2trb29vc3Nzd3d3e3t7f39/h4eHm5ubr6+vw8PD19fX5+fn8/Pz9/f3+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7///////////////////////8IyAD5CRxIsKDBgwgTJhw3TqHBceIEhgsnkBw5h/zCcbsIDhy/cuIaOizHzeNEfhDNJRQHrhw/cdzKWTwn7qI5ci4LhqtWLdy5nALNxSvHEChBctqqGQ06jpzKhBcPPjUYDlqzaSIN/ixXbmpGq1gRbu2KMGvBiAubGYtKUByqWWgLfjNm7NtNguPKNUOFqplBcNcubvNFTlxNWNJQDsu20JcyfsCA8csFyyxCab4a3rr1EhYyjOC2CeTFS6A0bhgJbhOdurVrhwEBACH5BAkEAPwALAAAAAAWABYAhwAAAAEBAQICAgMDAwQEBAUFBQYGBgcHBwgICAkJCQoKCgsLCwwMDA0NDQ4ODg8PDxAQEBERERISEhMTExQUFBUVFRYWFhcXFxgYGBkZGRoaGhsbGxwcHB0dHR4eHh8fHyAgICEhISIiIiMjIyQkJCUlJSYmJicnJygoKCkpKSoqKisrKywsLC0tLS4uLi8vLzAwMDExMTIyMjMzMzQ0NDU1NTY2Njc3Nzg4ODk5OTo6Ojs7Ozw8PD09PT4+Pj8/P0BAQEFBQUJCQkNDQ0REREVFRUZGRkdHR0hISElJSUpKSktLS0xMTE1NTU5OTk9PT1BQUFFRUVJSUlNTU1RUVFVVVVZWVldXV1hYWFlZWVpaWltbW1xcXF1dXV5eXl9fX2BgYGFhYWJiYmNjY2RkZGVlZWZmZmdnZ2hoaGlpaWpqamtra2xsbG1tbW5ubm9vb3BwcHFxcXJycnNzc3R0dHV1dXZ2dnd3d3h4eHl5eXp6ent7e3x8fH19fX5+fn9/f4CAgIGBgYKCgoODg4SEhIWFhYaGhoeHh4iIiImJiYqKiouLi4yMjI2NjY6Ojo+Pj5CQkJGRkZKSkpOTk5SUlJWVlZaWlpeXl5iYmJmZmZqampubm5ycnJ2dnZ6enp+fn6CgoKGhoaKioqOjo6SkpKWlpaampqenp6ioqKmpqaqqqqurq6ysrK2tra6urq+vr7CwsLGxsbKysrOzs7S0tLW1tba2tre3t7i4uLm5ubq6uru7u7y8vL29vb6+vr+/v8DAwMHBwcLCwsPDw8TExMXFxcbGxsfHx8jIyMnJycrKysvLy8zMzM3Nzc7Ozs/Pz9DQ0NHR0dLS0tPT09TU1NXV1dbW1tfX19jY2NnZ2dra2tvb29zc3N3d3d7e3t/f3+Hh4ebm5uvr6/Dw8PX19fn5+fz8/P39/f7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v///////////////////////wjMAPkJHEiwoMGDCBMmHDdOocFx4gSCAydwHDmH/MJhu/jtG79y4Ro6LIfN40R+4sKVSyju20Vx2MqRI2cuJD9z5FYWDAcNWjhzOgWWi0eO4UWD5KxBO0rQHENzCpkWhHoQHLNk0EQaxDkzKD+rWLVOnZkToViC8RSOUyZMqsB45sylNdhNmLBu5cSOK3cu7jmD4KhdxKaLXLhw5FY94xfv3NyD43QZ48eLF79aq84efKar4axZKFcVwwgOm8BbtwQ+04aRYLZsrWPLxhgQACH5BAkEAPwALAAAAAAWABYAhwAAAAEBAQICAgMDAwQEBAUFBQYGBgcHBwgICAkJCQoKCgsLCwwMDA0NDQ4ODg8PDxAQEBERERISEhMTExQUFBUVFRYWFhcXFxgYGBkZGRoaGhsbGxwcHB0dHR4eHh8fHyAgICEhISIiIiMjIyQkJCUlJSYmJicnJygoKCkpKSoqKisrKywsLC0tLS4uLi8vLzAwMDExMTIyMjMzMzQ0NDU1NTY2Njc3Nzg4ODk5OTo6Ojs7Ozw8PD09PT4+Pj8/P0BAQEFBQUJCQkNDQ0REREVFRUZGRkdHR0hISElJSUpKSktLS0xMTE1NTU5OTk9PT1BQUFFRUVJSUlNTU1RUVFVVVVZWVldXV1hYWFlZWVpaWltbW1xcXF1dXV5eXl9fX2BgYGFhYWJiYmNjY2RkZGVlZWZmZmdnZ2hoaGlpaWpqamtra2xsbG1tbW5ubm9vb3BwcHFxcXJycnNzc3R0dHV1dXZ2dnd3d3h4eHl5eXp6ent7e3x8fH19fX5+fn9/f4CAgIGBgYKCgoODg4SEhIWFhYaGhoeHh4iIiImJiYqKiouLi4yMjI2NjY6Ojo+Pj5CQkJGRkZKSkpOTk5SUlJWVlZaWlpeXl5iYmJmZmZqampubm5ycnJ2dnZ6enp+fn6CgoKGhoaKioqOjo6SkpKWlpaampqenp6ioqKmpqaqqqqurq6ysrK2tra6urq+vr7CwsLGxsbKysrOzs7S0tLW1tba2tre3t7i4uLm5ubq6uru7u7y8vL29vb6+vr+/v8DAwMHBwcLCwsPDw8TExMXFxcbGxsfHx8jIyMnJycrKysvLy8zMzM3Nzc7Ozs/Pz9DQ0NHR0dLS0tPT09TU1NXV1dbW1tfX19jY2NnZ2dra2tvb29zc3N3d3d7e3t/f3+Hh4ebm5uvr6/Dw8PX19fn5+fz8/P39/f7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v///////////////////////wjAAPkJHEiwoMGDCBMmFCdOoUFx4QRy4yZw3DiH/MBNI8dPmzZ+5cA1dEhu2jZ+3rzxCweuXMJw3DiGm1aOHDlz4C6WG8exIDhmzMCZ6ymw3DlyDIkSHCeNmdKiDF0mvHhQqkFwyIgxG2mwpkWrGY8RW8a1oNdxYJciPKdwXLFeVAmeK2f0YLZevbLtNGiOrjmD3aJdrGaLXLiIA+OV+4tQnK1h/HDhwkiwma2GrlxRHvitmsBZszYbvHZNtOnTBgMCACH5BAkEAPwALAAAAAAWABYAhwAAAAEBAQICAgMDAwQEBAUFBQYGBgcHBwgICAkJCQoKCgsLCwwMDA0NDQ4ODg8PDxAQEBERERISEhMTExQUFBUVFRYWFhcXFxgYGBkZGRoaGhsbGxwcHB0dHR4eHh8fHyAgICEhISIiIiMjIyQkJCUlJSYmJicnJygoKCkpKSoqKisrKywsLC0tLS4uLi8vLzAwMDExMTIyMjMzMzQ0NDU1NTY2Njc3Nzg4ODk5OTo6Ojs7Ozw8PD09PT4+Pj8/P0BAQEFBQUJCQkNDQ0REREVFRUZGRkdHR0hISElJSUpKSktLS0xMTE1NTU5OTk9PT1BQUFFRUVJSUlNTU1RUVFVVVVZWVldXV1hYWFlZWVpaWltbW1xcXF1dXV5eXl9fX2BgYGFhYWJiYmNjY2RkZGVlZWZmZmdnZ2hoaGlpaWpqamtra2xsbG1tbW5ubm9vb3BwcHFxcXJycnNzc3R0dHV1dXZ2dnd3d3h4eHl5eXp6ent7e3x8fH19fX5+fn9/f4CAgIGBgYKCgoODg4SEhIWFhYaGhoeHh4iIiImJiYqKiouLi4yMjI2NjY6Ojo+Pj5CQkJGRkZKSkpOTk5SUlJWVlZaWlpeXl5iYmJmZmZqampubm5ycnJ2dnZ6enp+fn6CgoKGhoaKioqOjo6SkpKWlpaampqenp6ioqKmpqaqqqqurq6ysrK2tra6urq+vr7CwsLGxsbKysrOzs7S0tLW1tba2tre3t7i4uLm5ubq6uru7u7y8vL29vb6+vr+/v8DAwMHBwcLCwsPDw8TExMXFxcbGxsfHx8jIyMnJycrKysvLy8zMzM3Nzc7Ozs/Pz9DQ0NHR0dLS0tPT09TU1NXV1dbW1tfX19jY2NnZ2dra2tvb29zc3N3d3d7e3t/f3+Hh4ebm5uvr6/Dw8PX19fn5+fz8/P39/f7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v///////////////////////wjOAPkJHEiwoMGDCBMmFCdOoUFx4QRiyyZQ3DiH/Lw9I8fPmjV+5bxFdEjuGTZ+27bxA+etXMJw2TiGe1Zu3Dhz3hqWE8ex4Ldjx8CZ6ymw3Llx4cJdNDjO2TGiA8uFE+cy4VKDVQ1+IwYMWcODNRlC3dr1K9ZxYhFeLWhO4ThhudYKHEqurcFruXJdq0kwHkhy5LIO5Obs4rRY5JLyM3eO37lygguKiwWMHy1ai835dZgsVkNVqvjFM2dXIbdpAl+9EniuMcaB1aq9nk0bY0AAIfkECQQA/AAsAAAAABYAFgCHAAAAAQEBAgICAwMDBAQEBQUFBgYGBwcHCAgICQkJCgoKCwsLDAwMDQ0NDg4ODw8PEBAQEREREhISExMTFBQUFRUVFhYWFxcXGBgYGRkZGhoaGxsbHBwcHR0dHh4eHx8fICAgISEhIiIiIyMjJCQkJSUlJiYmJycnKCgoKSkpKioqKysrLCwsLS0tLi4uLy8vMDAwMTExMjIyMzMzNDQ0NTU1NjY2Nzc3ODg4OTk5Ojo6Ozs7PDw8PT09Pj4+Pz8/QEBAQUFBQkJCQ0NDRERERUVFRkZGR0dHSEhISUlJSkpKS0tLTExMTU1NTk5OT09PUFBQUVFRUlJSU1NTVFRUVVVVVlZWV1dXWFhYWVlZWlpaW1tbXFxcXV1dXl5eX19fYGBgYWFhYmJiY2NjZGRkZWVlZmZmZ2dnaGhoaWlpampqa2trbGxsbW1tbm5ub29vcHBwcXFxcnJyc3NzdHR0dXV1dnZ2d3d3eHh4eXl5enp6e3t7fHx8fX19fn5+f39/gICAgYGBgoKCg4ODhISEhYWFhoaGh4eHiIiIiYmJioqKi4uLjIyMjY2Njo6Oj4+PkJCQkZGRkpKSk5OTlJSUlZWVlpaWl5eXmJiYmZmZmpqam5ubnJycnZ2dnp6en5+foKCgoaGhoqKio6OjpKSkpaWlpqamp6enqKioqampqqqqq6urrKysra2trq6ur6+vsLCwsbGxsrKys7OztLS0tbW1tra2t7e3uLi4ubm5urq6u7u7vLy8vb29vr6+v7+/wMDAwcHBwsLCw8PDxMTExcXFxsbGx8fHyMjIycnJysrKy8vLzMzMzc3Nzs7Oz8/P0NDQ0dHR0tLS09PT1NTU1dXV1tbW19fX2NjY2dnZ2tra29vb3Nzc3d3d3t7e39/f4eHh5ubm6+vr8PDw9fX1+fn5/Pz8/f39/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+////////////////////////CMMA+QkcSLCgwYMIEyYMF06hwXDgBFKrJlDcOIf8tim7KE0aP3LZGjokp4wav2vX+HnLVm6hNXL8wCkrN25cuWzi+JWzaLDbsGHezMEcWM6cOHDgchoct2zYUILlwIVrmfDiQao9g/EqptTgznDinvLrBowXsa4Fv4ZFiJagOYXifNGy6rbmW4PVaNGqRpNgvI81xQrMtuxitFZD45FrKRSrQXGtePGL97ccub8OjbXKSZnfucUYtUUT2FnnXYyoU6teHRAAIfkECQQA/AAsAAAAABYAFgCHAAAAAQEBAgICAwMDBAQEBQUFBgYGBwcHCAgICQkJCgoKCwsLDAwMDQ0NDg4ODw8PEBAQEREREhISExMTFBQUFRUVFhYWFxcXGBgYGRkZGhoaGxsbHBwcHR0dHh4eHx8fICAgISEhIiIiIyMjJCQkJSUlJiYmJycnKCgoKSkpKioqKysrLCwsLS0tLi4uLy8vMDAwMTExMjIyMzMzNDQ0NTU1NjY2Nzc3ODg4OTk5Ojo6Ozs7PDw8PT09Pj4+Pz8/QEBAQUFBQkJCQ0NDRERERUVFRkZGR0dHSEhISUlJSkpKS0tLTExMTU1NTk5OT09PUFBQUVFRUlJSU1NTVFRUVVVVVlZWV1dXWFhYWVlZWlpaW1tbXFxcXV1dXl5eX19fYGBgYWFhYmJiY2NjZGRkZWVlZmZmZ2dnaGhoaWlpampqa2trbGxsbW1tbm5ub29vcHBwcXFxcnJyc3NzdHR0dXV1dnZ2d3d3eHh4eXl5enp6e3t7fHx8fX19fn5+f39/gICAgYGBgoKCg4ODhISEhYWFhoaGh4eHiIiIiYmJioqKi4uLjIyMjY2Njo6Oj4+PkJCQkZGRkpKSk5OTlJSUlZWVlpaWl5eXmJiYmZmZmpqam5ubnJycnZ2dnp6en5+foKCgoaGhoqKio6OjpKSkpaWlpqamp6enqKioqampqqqqq6urrKysra2trq6ur6+vsLCwsbGxsrKys7OztLS0tbW1tra2t7e3uLi4ubm5urq6u7u7vLy8vb29vr6+v7+/wMDAwcHBwsLCw8PDxMTExcXFxsbGx8fHyMjIycnJysrKy8vLzMzMzc3Nzs7Oz8/P0NDQ0dHR0tLS09PT1NTU1dXV1tbW19fX2NjY2dnZ2tra29vb3Nzc3d3d3t7e39/f4eHh5ubm6+vr8PDw9fX1+fn5/Pz8/f39/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+////////////////////////CMYA+QkcSLCgwYMIEyYMF06hwXDfBEKDJjCcOIf8rhkbx69ZM37kqoHDSM4YxWnT+GmrVi4hOGnk+H0zVm7cuHLVGpYLx7HgNl++tJmLObCcOXHcuF00OM6YL6IEy3EDB/VgT4NVCW7bdQvYUqzhwPHUyqvr14Lkwo49eDaqQnG6YF0tKu7mQWmwYEmrSdBcPHLixGXNiIxjM1Tkzp2LZ9fcuMEDxaHCxa9cS3LjzGEchuqiZX6OIRfM9rFyS9MY+2pOzbq1w4AAIfkECQQA/AAsAAAAABYAFgCHAAAAAQEBAgICAwMDBAQEBQUFBgYGBwcHCAgICQkJCgoKCwsLDAwMDQ0NDg4ODw8PEBAQEREREhISExMTFBQUFRUVFhYWFxcXGBgYGRkZGhoaGxsbHBwcHR0dHh4eHx8fICAgISEhIiIiIyMjJCQkJSUlJiYmJycnKCgoKSkpKioqKysrLCwsLS0tLi4uLy8vMDAwMTExMjIyMzMzNDQ0NTU1NjY2Nzc3ODg4OTk5Ojo6Ozs7PDw8PT09Pj4+Pz8/QEBAQUFBQkJCQ0NDRERERUVFRkZGR0dHSEhISUlJSkpKS0tLTExMTU1NTk5OT09PUFBQUVFRUlJSU1NTVFRUVVVVVlZWV1dXWFhYWVlZWlpaW1tbXFxcXV1dXl5eX19fYGBgYWFhYmJiY2NjZGRkZWVlZmZmZ2dnaGhoaWlpampqa2trbGxsbW1tbm5ub29vcHBwcXFxcnJyc3NzdHR0dXV1dnZ2d3d3eHh4eXl5enp6e3t7fHx8fX19fn5+f39/gICAgYGBgoKCg4ODhISEhYWFhoaGh4eHiIiIiYmJioqKi4uLjIyMjY2Njo6Oj4+PkJCQkZGRkpKSk5OTlJSUlZWVlpaWl5eXmJiYmZmZmpqam5ubnJycnZ2dnp6en5+foKCgoaGhoqKio6OjpKSkpaWlpqamp6enqKioqampqqqqq6urrKysra2trq6ur6+vsLCwsbGxsrKys7OztLS0tbW1tra2t7e3uLi4ubm5urq6u7u7vLy8vb29vr6+v7+/wMDAwcHBwsLCw8PDxMTExcXFxsbGx8fHyMjIycnJysrKy8vLzMzMzc3Nzs7Oz8/P0NDQ0dHR0tLS09PT1NTU1dXV1tbW19fX2NjY2dnZ2tra29vb3Nzc3d3d3t7e39/f4eHh5ubm6+vr8PDw9fX1+fn5/Pz8/f39/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+////////////////////////CMYA+QkcSLCgwYMIEyYEB06hwXDcBDJjJjCcOIf8qAkbxy9ZMn7koHnDSE6YM37QoPGzBo3cQmgcuwkrN25cOWjh+JULx7EgNl26sJlzOZCcOXHYsF00OG6Yrp4Ey2H7RhQh1IJVC2a7NYtXzoPkwH0Dd3Vr168Gw469SnCpwXIKxdlaxVanRbgGn61a9YxfPILm4o0Lx9NgtWIczwU2Z+7cOJc0sxaM1xiky5rmMCr+S86luccY450T2Jk0XowCy51Gzbp1woAAIfkECQQA/AAsAAAAABYAFgCHAAAAAQEBAgICAwMDBAQEBQUFBgYGBwcHCAgICQkJCgoKCwsLDAwMDQ0NDg4ODw8PEBAQEREREhISExMTFBQUFRUVFhYWFxcXGBgYGRkZGhoaGxsbHBwcHR0dHh4eHx8fICAgISEhIiIiIyMjJCQkJSUlJiYmJycnKCgoKSkpKioqKysrLCwsLS0tLi4uLy8vMDAwMTExMjIyMzMzNDQ0NTU1NjY2Nzc3ODg4OTk5Ojo6Ozs7PDw8PT09Pj4+Pz8/QEBAQUFBQkJCQ0NDRERERUVFRkZGR0dHSEhISUlJSkpKS0tLTExMTU1NTk5OT09PUFBQUVFRUlJSU1NTVFRUVVVVVlZWV1dXWFhYWVlZWlpaW1tbXFxcXV1dXl5eX19fYGBgYWFhYmJiY2NjZGRkZWVlZmZmZ2dnaGhoaWlpampqa2trbGxsbW1tbm5ub29vcHBwcXFxcnJyc3NzdHR0dXV1dnZ2d3d3eHh4eXl5enp6e3t7fHx8fX19fn5+f39/gICAgYGBgoKCg4ODhISEhYWFhoaGh4eHiIiIiYmJioqKi4uLjIyMjY2Njo6Oj4+PkJCQkZGRkpKSk5OTlJSUlZWVlpaWl5eXmJiYmZmZmpqam5ubnJycnZ2dnp6en5+foKCgoaGhoqKio6OjpKSkpaWlpqamp6enqKioqampqqqqq6urrKysra2trq6ur6+vsLCwsbGxsrKys7OztLS0tbW1tra2t7e3uLi4ubm5urq6u7u7vLy8vb29vr6+v7+/wMDAwcHBwsLCw8PDxMTExcXFxsbGx8fHyMjIycnJysrKy8vLzMzMzc3Nzs7Oz8/P0NDQ0dHR0tLS09PT1NTU1dXV1tbW19fX2NjY2dnZ2tra29vb3Nzc3d3d3t7e39/f4eHh5ubm6+vr8PDw9fX1+fn5/Pz8/f39/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+////////////////////////CLwA+QkcSLCgwYMIEyYEB06hQXDaBB5DJhBcOIf8ovUax48YMX7jmHHDOK5XMn7LlvGTxoxcwm/NOGbrVU6cuHLMGpIDJ85gNVu2rJnjOJCcuXDTpl00KO6XLaIEyU3b5jJhz4NVDV6b5QrXUoPkvmnjdlXg1q5fC5LzNrYsRoHl3h4sZzGuwnjxCJY7N44h1IPmysUrV86cOJc1/xY8R5gfOZc27SokfA4kx8QYzZkTOI7oY7lwJYMeTXpgQAAh+QQJBAD8ACwAAAAAFgAWAIcAAAABAQECAgIDAwMEBAQFBQUGBgYHBwcICAgJCQkKCgoLCwsMDAwNDQ0ODg4PDw8QEBARERESEhITExMUFBQVFRUWFhYXFxcYGBgZGRkaGhobGxscHBwdHR0eHh4fHx8gICAhISEiIiIjIyMkJCQlJSUmJiYnJycoKCgpKSkqKiorKyssLCwtLS0uLi4vLy8wMDAxMTEyMjIzMzM0NDQ1NTU2NjY3Nzc4ODg5OTk6Ojo7Ozs8PDw9PT0+Pj4/Pz9AQEBBQUFCQkJDQ0NERERFRUVGRkZHR0dISEhJSUlKSkpLS0tMTExNTU1OTk5PT09QUFBRUVFSUlJTU1NUVFRVVVVWVlZXV1dYWFhZWVlaWlpbW1tcXFxdXV1eXl5fX19gYGBhYWFiYmJjY2NkZGRlZWVmZmZnZ2doaGhpaWlqampra2tsbGxtbW1ubm5vb29wcHBxcXFycnJzc3N0dHR1dXV2dnZ3d3d4eHh5eXl6enp7e3t8fHx9fX1+fn5/f3+AgICBgYGCgoKDg4OEhISFhYWGhoaHh4eIiIiJiYmKioqLi4uMjIyNjY2Ojo6Pj4+QkJCRkZGSkpKTk5OUlJSVlZWWlpaXl5eYmJiZmZmampqbm5ucnJydnZ2enp6fn5+goKChoaGioqKjo6OkpKSlpaWmpqanp6eoqKipqamqqqqrq6usrKytra2urq6vr6+wsLCxsbGysrKzs7O0tLS1tbW2tra3t7e4uLi5ubm6urq7u7u8vLy9vb2+vr6/v7/AwMDBwcHCwsLDw8PExMTFxcXGxsbHx8fIyMjJycnKysrLy8vMzMzNzc3Ozs7Pz8/Q0NDR0dHS0tLT09PU1NTV1dXW1tbX19fY2NjZ2dna2trb29vc3Nzd3d3e3t7f39/h4eHm5ubr6+vw8PD19fX5+fn8/Pz9/f3+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7///////////////////////8IyQD5CRxIsKDBgwgTJvz2TaFBcNgEEiMm8Fs4h/yc5RrHDxgwfuOORXQ4LpcxfsiQZTxGLiE3ZRyv5SInTly5Yw3JeRNncFqsWNPKcRxIzly4Z88uGhS3K9ZQguSeYWuZkOdBqgarvVJFS6nBcdusZbMqUCtXrwXBWsNGtmA8hOUUxjNn7m3Bct7AxTV4ju65eOcIljsnzttOvnX5lSN3rlw5oxzLhXtq0By5luM4hgu3V+Fic/xqKg7XFu5e0SCxYuR3ebXr1xgDAgAh+QQJBAD8ACwAAAAAFgAWAIcAAAABAQECAgIDAwMEBAQFBQUGBgYHBwcICAgJCQkKCgoLCwsMDAwNDQ0ODg4PDw8QEBARERESEhITExMUFBQVFRUWFhYXFxcYGBgZGRkaGhobGxscHBwdHR0eHh4fHx8gICAhISEiIiIjIyMkJCQlJSUmJiYnJycoKCgpKSkqKiorKyssLCwtLS0uLi4vLy8wMDAxMTEyMjIzMzM0NDQ1NTU2NjY3Nzc4ODg5OTk6Ojo7Ozs8PDw9PT0+Pj4/Pz9AQEBBQUFCQkJDQ0NERERFRUVGRkZHR0dISEhJSUlKSkpLS0tMTExNTU1OTk5PT09QUFBRUVFSUlJTU1NUVFRVVVVWVlZXV1dYWFhZWVlaWlpbW1tcXFxdXV1eXl5fX19gYGBhYWFiYmJjY2NkZGRlZWVmZmZnZ2doaGhpaWlqampra2tsbGxtbW1ubm5vb29wcHBxcXFycnJzc3N0dHR1dXV2dnZ3d3d4eHh5eXl6enp7e3t8fHx9fX1+fn5/f3+AgICBgYGCgoKDg4OEhISFhYWGhoaHh4eIiIiJiYmKioqLi4uMjIyNjY2Ojo6Pj4+QkJCRkZGSkpKTk5OUlJSVlZWWlpaXl5eYmJiZmZmampqbm5ucnJydnZ2enp6fn5+goKChoaGioqKjo6OkpKSlpaWmpqanp6eoqKipqamqqqqrq6usrKytra2urq6vr6+wsLCxsbGysrKzs7O0tLS1tbW2tra3t7e4uLi5ubm6urq7u7u8vLy9vb2+vr6/v7/AwMDBwcHCwsLDw8PExMTFxcXGxsbHx8fIyMjJycnKysrLy8vMzMzNzc3Ozs7Pz8/Q0NDR0dHS0tLT09PU1NTV1dXW1tbX19fY2NjZ2dna2trb29vc3Nzd3d3e3t7f39/h4eHm5ubr6+vw8PD19fX5+fn8/Pz9/f3+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7///////////////////////8IxgD5CRxIsKDBgwgTJuzWTaFBb9QEAgsmsFs4h/yW0RLHjxcvfuOGVcM4jpYwfsSIZRxGLqG2Y+P4VaNFTpy4csMaktN2sWC0Vq2ilYs5kJw5cMqUgTso7lYrogTJKaMGlSnCqgXjaU04Dpu0aj0Hao3H9Zo0amELnkPYMuG5cuTIFiSXzVvbgnDJlTtnjuBecdmycSxorhxZcuPeljvKsVw4rATNjYtpkx84cOUwIu4b7mI5cIMVwhVYmZ84yArJ3cXIujXGgAAh+QQJBAD8ACwAAAAAFgAWAIcAAAABAQECAgIDAwMEBAQFBQUGBgYHBwcICAgJCQkKCgoLCwsMDAwNDQ0ODg4PDw8QEBARERESEhITExMUFBQVFRUWFhYXFxcYGBgZGRkaGhobGxscHBwdHR0eHh4fHx8gICAhISEiIiIjIyMkJCQlJSUmJiYnJycoKCgpKSkqKiorKyssLCwtLS0uLi4vLy8wMDAxMTEyMjIzMzM0NDQ1NTU2NjY3Nzc4ODg5OTk6Ojo7Ozs8PDw9PT0+Pj4/Pz9AQEBBQUFCQkJDQ0NERERFRUVGRkZHR0dISEhJSUlKSkpLS0tMTExNTU1OTk5PT09QUFBRUVFSUlJTU1NUVFRVVVVWVlZXV1dYWFhZWVlaWlpbW1tcXFxdXV1eXl5fX19gYGBhYWFiYmJjY2NkZGRlZWVmZmZnZ2doaGhpaWlqampra2tsbGxtbW1ubm5vb29wcHBxcXFycnJzc3N0dHR1dXV2dnZ3d3d4eHh5eXl6enp7e3t8fHx9fX1+fn5/f3+AgICBgYGCgoKDg4OEhISFhYWGhoaHh4eIiIiJiYmKioqLi4uMjIyNjY2Ojo6Pj4+QkJCRkZGSkpKTk5OUlJSVlZWWlpaXl5eYmJiZmZmampqbm5ucnJydnZ2enp6fn5+goKChoaGioqKjo6OkpKSlpaWmpqanp6eoqKipqamqqqqrq6usrKytra2urq6vr6+wsLCxsbGysrKzs7O0tLS1tbW2tra3t7e4uLi5ubm6urq7u7u8vLy9vb2+vr6/v7/AwMDBwcHCwsLDw8PExMTFxcXGxsbHx8fIyMjJycnKysrLy8vMzMzNzc3Ozs7Pz8/Q0NDR0dHS0tLT09PU1NTV1dXW1tbX19fY2NjZ2dna2trb29vc3Nzd3d3e3t7f39/h4eHm5ubr6+vw8PD19fX5+fn8/Pz9/f3+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7///////////////////////8IyAD5CRxIsKDBgwgTJty2TaFBbtME8tolcBs4h/yQwRLH79YtfuN8ScM4DpYvfsCA8TPmi1zCbMPG8ZMGi5w4ceR8NSSHLZzBZqhQOSsncyA5c9+MGft2UNwsVEUJkjMWLWpThFYJmivH9RzWac2g+Ry4tevXsGMNmkPoMqE5cuPWFiRXTVvbgkTHlYsnV2C5c+GqVUs7sNxRfjbPkSNXjhvHcuA4IiwnTmY4n+C4lSMpbjO4i+S4EWbb9rLAyhgJjsuaurXrgwEBACH5BAkEAPwALAAAAAAWABYAhwAAAAEBAQICAgMDAwQEBAUFBQYGBgcHBwgICAkJCQoKCgsLCwwMDA0NDQ4ODg8PDxAQEBERERISEhMTExQUFBUVFRYWFhcXFxgYGBkZGRoaGhsbGxwcHB0dHR4eHh8fHyAgICEhISIiIiMjIyQkJCUlJSYmJicnJygoKCkpKSoqKisrKywsLC0tLS4uLi8vLzAwMDExMTIyMjMzMzQ0NDU1NTY2Njc3Nzg4ODk5OTo6Ojs7Ozw8PD09PT4+Pj8/P0BAQEFBQUJCQkNDQ0REREVFRUZGRkdHR0hISElJSUpKSktLS0xMTE1NTU5OTk9PT1BQUFFRUVJSUlNTU1RUVFVVVVZWVldXV1hYWFlZWVpaWltbW1xcXF1dXV5eXl9fX2BgYGFhYWJiYmNjY2RkZGVlZWZmZmdnZ2hoaGlpaWpqamtra2xsbG1tbW5ubm9vb3BwcHFxcXJycnNzc3R0dHV1dXZ2dnd3d3h4eHl5eXp6ent7e3x8fH19fX5+fn9/f4CAgIGBgYKCgoODg4SEhIWFhYaGhoeHh4iIiImJiYqKiouLi4yMjI2NjY6Ojo+Pj5CQkJGRkZKSkpOTk5SUlJWVlZaWlpeXl5iYmJmZmZqampubm5ycnJ2dnZ6enp+fn6CgoKGhoaKioqOjo6SkpKWlpaampqenp6ioqKmpqaqqqqurq6ysrK2tra6urq+vr7CwsLGxsbKysrOzs7S0tLW1tba2tre3t7i4uLm5ubq6uru7u7y8vL29vb6+vr+/v8DAwMHBwcLCwsPDw8TExMXFxcbGxsfHx8jIyMnJycrKysvLy8zMzM3Nzc7Ozs/Pz9DQ0NHR0dLS0tPT09TU1NXV1dbW1tfX19jY2NnZ2dra2tvb29zc3N3d3d7e3t/f3+Hh4ebm5uvr6/Dw8PX19fn5+fz8/P39/f7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v///////////////////////wjJAPkJHEiwoMGDCBMmzJZNoUFtzwTeuiUQGziH/IqtEsdv1ix+43RFdDhu1S5+vHjxG6ZrXMJ45+Lxe7aKXLhw5HRh40euWjiD58yZO1fO5cBx5boJE9btYDyhMguSE9bMKMKoBq0WLEeuqzmE46AlY3ZxIFevYMWSRfj1IDmF5saNa0uQHLRqbw2Sk0suXjmC5cyFgwbtp1RyX8eFM9e1HDaO5LxxRFguHEdwF7lh+0sy3N9v33hiM6xwr0DMAsVpxSgXo+vXsAMCACH5BAkEAPwALAAAAAAWABYAhwAAAAEBAQICAgMDAwQEBAUFBQYGBgcHBwgICAkJCQoKCgsLCwwMDA0NDQ4ODg8PDxAQEBERERISEhMTExQUFBUVFRYWFhcXFxgYGBkZGRoaGhsbGxwcHB0dHR4eHh8fHyAgICEhISIiIiMjIyQkJCUlJSYmJicnJygoKCkpKSoqKisrKywsLC0tLS4uLi8vLzAwMDExMTIyMjMzMzQ0NDU1NTY2Njc3Nzg4ODk5OTo6Ojs7Ozw8PD09PT4+Pj8/P0BAQEFBQUJCQkNDQ0REREVFRUZGRkdHR0hISElJSUpKSktLS0xMTE1NTU5OTk9PT1BQUFFRUVJSUlNTU1RUVFVVVVZWVldXV1hYWFlZWVpaWltbW1xcXF1dXV5eXl9fX2BgYGFhYWJiYmNjY2RkZGVlZWZmZmdnZ2hoaGlpaWpqamtra2xsbG1tbW5ubm9vb3BwcHFxcXJycnNzc3R0dHV1dXZ2dnd3d3h4eHl5eXp6ent7e3x8fH19fX5+fn9/f4CAgIGBgYKCgoODg4SEhIWFhYaGhoeHh4iIiImJiYqKiouLi4yMjI2NjY6Ojo+Pj5CQkJGRkZKSkpOTk5SUlJWVlZaWlpeXl5iYmJmZmZqampubm5ycnJ2dnZ6enp+fn6CgoKGhoaKioqOjo6SkpKWlpaampqenp6ioqKmpqaqqqqurq6ysrK2tra6urq+vr7CwsLGxsbKysrOzs7S0tLW1tba2tre3t7i4uLm5ubq6uru7u7y8vL29vb6+vr+/v8DAwMHBwcLCwsPDw8TExMXFxcbGxsfHx8jIyMnJycrKysvLy8zMzM3Nzc7Ozs/Pz9DQ0NHR0dLS0tPT09TU1NXV1dbW1tfX19jY2NnZ2dra2tvb29zc3N3d3d7e3t/f3+Hh4ebm5uvr6/Dw8PX19fn5+fz8/P39/f7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v///////////////////////wi6APkJHEiwoMGDCBMmvHZNocJZswRW++awoCtX/MTZalaRIC5c/H7ZGpfQXLl4BMOFI2erGr9x0cAZNFnOnMFx5bL16pXt4LlyJ2/2UkYy4TmERQ2WGzeOXDmE4pgRQyZz4NKmTw+KW0bsWFWlSBWWEycuK8FxzKQlJUiOLLmfbM2BY8bs60ByOF+CM0fO6bRw/MhxA4ywHDjA3ihim0auojhwT7VpCzzNLtKi3LgJDCeu40CynkOLThgQADsAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=" />';
	                    html = loadingGif + '<span>数据正在加载中...</span>';
	                }

	                this.showHint(html);
	            }
	        },

	        hideLoading: function () {
	            this.hideHint();
	        },

	        showNoData: function () {
	            this.showHint('暂无数据', 'noData');
	        },

	        clearPaper: function () {
	            if (this.paper && this.htmlPaper) {
	                this.paper.clear();

	                this.htmlPaper.innerHTML = '';
	                this.loading = undefined;
	                this.tooltip = undefined;
	            }
	        },

	        bindEvents: function () {
	            this.bindResizeEvent();
	        },

	        /**
	         * 给图形绑定缩放事件
	         */
	        bindResizeEvent: function () {
	            var me = this;
	            var opts = this.opts;
	            var runtimeContext = this.runtimeContext;
	            Util.event.on(window, 'resize', function () {
	                setTimeout(function () {
	                    runtimeContext.lastResizeEventTime = new Date().getTime();

	                    var currentWidth = me.container.offsetWidth || me.container.clientWidth;
	                    // 如果容器的实际宽度发生了变化并且没有启动 resize 事件监视，则启动 resize 事件监视
	                    if (opts.width !== currentWidth && runtimeContext.resizePid === null) {
	                        me.surveillanceResizeEvents();
	                    }
	                    opts.width = currentWidth;
	                }, 0);
	            });

	        },

	        /**
	         * 监视 resize 事件，如果当前检测时间点距离上次 resize 事件已经过去 500ms 以上，
	         * 则执行图形重绘（或者缩放）。真正的重绘延迟为 500ms ~ 600ms。
	         */
	        surveillanceResizeEvents: function () {
	            var me = this;
	            var runtimeContext = this.runtimeContext;
	            (function detect() {
	                var now = new Date().getTime();
	                if (now - runtimeContext.lastResizeEventTime > 150) {
	                    runtimeContext.resizePid = null;
	                    me.handleResize();
	                }
	                else {
	                    runtimeContext.resizePid = setTimeout(detect, 75);
	                }
	            })();
	        },

	        /**
	         * 缩放图形组件，只有在当前图形没有处于loading状态才会执行真正的重绘或缩放操作。
	         */
	        handleResize: function () {
	            if (!this.runtimeContext.isLoading) {
	                // 重绘图形
	                this.clearPaper();
	                this.paper.setSize(this.opts.width, this.opts.height);
	                this.render();
	            }
	        }
	    };

	    return ChartBase;
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * @file hm-charts
	 * @author wumingdan(wumingdan@baidu.com)
	 */

	// the reason of not using a loading gif
	// JS will freeze the UI and the image won't animate
	// It is possible to leverage the work to a WebWorker as to don't freeze the UI in future

	!(__WEBPACK_AMD_DEFINE_RESULT__ = function (require) {

	    var Util = __webpack_require__(1);

	    var ClassManager = __webpack_require__(6);

	    var Hint = {
	        defaults: {
	            style: {
	                backgroundColor: '#fff',
	                opacity: '0.8',
	                left: '0',
	                top: '0',
	                width: '100%',
	                height: '100%',
	                textAlign: 'center',
	                zIndex: 9999,
	                font: '12px/1.4 Microsoft Yahei, Helvetica, STHeitiSC-Light, Arial, sans-serif'
	            },
	            content: 'loading...'
	        },

	        _hint: null,

	        init: function () {
	        },

	        render: function(htmlPaper) {
	            this.paper = htmlPaper;

	            this.create();

	            this.show();
	        },

	        create: function () {
	            var opts = this.opts;

	            // 1. 创建容器
	            var element = document.createElement('div');
	            ClassManager.addHtmlClass(element, 'hm-charts-hint');
	            this.paper.appendChild(element);

	            // 2. 创建内容容器
	            var contentElement = document.createElement('div');

	            ClassManager.addHtmlClass(contentElement, 'hm-charts-hint-content');
	            contentElement.style.cssText = 'position:absolute;top:48%;left:48%';

	            element.appendChild(contentElement);

	            // 3. 创建文字内容
	            var hintText = document.createElement('span');
	            ClassManager.addHtmlClass(hintText, 'hm-charts-hint-text');
	            hintText.style.cssText = 'vertical-align:top;margin-left:5px;line-height:24px';

	            contentElement.appendChild(hintText);

	            this._hint = element;
	            this._hintContext = hintText;

	            // 更新样式或者文案内容
	            this._update(element, opts);

	            this.hide();
	        },

	        update: function (settings) {
	            this.show();

	            var me = this;

	            // to make the css animation work
	            // ui update first(show), then execute the following code
	            setTimeout(function () {
	                me._update(me._hint, settings);
	            }, 0);
	        },

	        show: function () {
	            this._hint.style.display = '';
	        },

	        hide: function () {
	            this._hint.style.display = 'none';
	        },

	        _update: function (element, settings) {
	            this.opts = Util.extend(this.defaults, settings);
	            var style = this.opts.style;

	            element.style.cssText = 'position:absolute'
	                + ';font:' + style.font
	                + ';left:' + Util.fixUnitSuffixWithPX(style.left)
	                + ';top:' + Util.fixUnitSuffixWithPX(style.top)
	                + ';width:' + style.width
	                + ';height:' + style.height
	                + ';text-align:' + style.textAlign
	                + ';background-color:' + style.backgroundColor
	                + ';z-index:' + style.zIndex
	                + ';opacity:' + style.opacity
	                + ';box-shadow:0 0 5px #999'
	                + ';transition:all .4s';

	            this._hintContext.innerHTML = this.opts.content;

	            return element;
	        }
	    };

	    return Hint;
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * @file hm-charts
	 * @author wumingdan(wumingdan@baidu.com)
	 */

	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function() {

	    /**
	     * 后续将所有 inline 的样式抽取为 class，用户使用时对默认样式不满意则自行覆盖
	     */
	    var ClassManager = {
	        addHtmlClass: function (element, classNamePrefix, index) {
	            var className = [classNamePrefix];

	            if (index !== undefined) {
	                className.push(classNamePrefix + '-' + index);
	            }

	            element.className = className.join(' ');

	            return element;
	        },

	        addClass: function (element, classNamePrefix, index) {
	            var className = [classNamePrefix];

	            if (index !== undefined) {
	                className.push(classNamePrefix + '-' + index);
	            }

	            element.attr('class', className.join(' '));

	            return element;
	        },

	        addGridLineClass: function (line, index) {
	            return ClassManager.addClass(element, 'hm-grid', index);
	        },

	        addSerieClass: function (element, index, serieIndex) {
	            var prefix = serieIndex === undefined ? 'hm-series' : 'hm-series-' + serieIndex;

	            return ClassManager.addClass(element, prefix, index);
	        },

	        addSerieBarClass: function (element, index, serieIndex) {
	            var prefix = serieIndex === undefined ? 'hm-series-bar' : 'hm-series-bar-' + serieIndex;

	            return ClassManager.addClass(element, 'hm-series-bar', index);
	        },

	        addSerieAreaClass: function (element, index) {
	            return ClassManager.addClass(element, 'hm-series-are', index);
	        },

	        addSerieTickClass: function (element, index) {
	            return ClassManager.addClass(element, 'hm-series-dot', index);
	        }
	    };

	    return ClassManager;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * @file 柱/线图
	 * @author wumingdan(wumingdan@baidu.com)
	 * @contributor luodongyang(luodongyang@baidu.com)
	 */

	!(__WEBPACK_AMD_DEFINE_RESULT__ = function (require) {

	    var Chart = __webpack_require__(2);
	    var Util = __webpack_require__(1);
	    var Axis = __webpack_require__(8);
	    var Grid = __webpack_require__(14);
	    var Tooltip = __webpack_require__(15);
	    var Legend = __webpack_require__(16);
	    var dataAdapter = __webpack_require__(17);
	    var ClassManager = __webpack_require__(6);

	    var Format = __webpack_require__(12);
	    var Holiday = __webpack_require__(18);
	    var Animate = __webpack_require__(19);
	    var Resources = __webpack_require__(10);

	    var Raphael = __webpack_require__(3);

	    var Bar = {
	        defaults: {
	            __name: 'bar',
	            dataAdapter: 'convertGridData',
	            // isArea: true,
	            animate: {
	                enabled: true,
	                dur: 1200,
	                easing: 'linear'
	            },
	            // 线条颜色
	            color: Resources.colorInfo.colors,
	            itemStyle: {
	                normal: {
	                    lineStyle: {
	                        width: 2
	                    },
	                    dotStyle: {
	                        borderColor: '#fff', borderWidth: 2, radius: 2.5, hasHollow: true
	                    }
	                },
	                emphasis: {
	                    dotStyle: {
	                        borderColor: '#aaa', borderWidth: 1, radius: 3, hasHollow: true
	                    }
	                }
	            },
	            tooltip: {
	                show: true,
	                formatter: function (lines, series, categoryLabels, index) {
	                    var html = [];

	                    // 类目，目前只有一条类目轴，所以直接取第一根线的内容
	                    var category = categoryLabels[index];

	                    if (lines.length > 0 && lines[0].category && lines[0].category[index]) {
	                        category = lines[0].category[index];
	                    }

	                    html.push('<p style="margin: 3px;font-weight: 600;">' + category + '</p>');

	                    for (var i = 0; i < series.length; i++) {
	                        if (!lines[i].isHidden) {
	                            var serie = series[i];

	                            var value = Format.format(serie.data[index], serie.dataType);
	                            var color = lines[i] && lines[i].color || '#000';

	                            if (serie.tooltip && serie.tooltip.valueSuffix) {
	                                value = value + serie.tooltip.valueSuffix;
	                            }

	                            html.push(
	                                '<p style="margin: 5px 3px"><span style="color:'
	                                + color + ';">'
	                                + serie.name
	                                + ': </span>'
	                                + value
	                                + '</p>'
	                            );
	                        }
	                    }

	                    return html.join('');
	                }
	            }
	        },

	        lines: [],

	        bars: [],

	        legends: [],

	        categoryLabels: [],

	        axisLayoutInfo: null,

	        barIndex: 0,

	        render: function (data) {
	            this.clearPaper();

	            if (data !== undefined) {
	                this._data = data;
	                this.initContext();
	            }

	            this.convertData();

	            this.draw();
	        },

	        draw: function () {
	            var st1 = +new Date();

	            // 坐标系
	            this._axis = Chart.createComponent(Axis, Util.cloneObject(this.opts));
	            this._axis.render(this.paper);

	            var st2 = +new Date();
	            console.log('axis:', st2 - st1);

	            this.axisLayoutInfo = this._axis.getAxisLayout();
	            this.categoryLabels = this._axis.getCategoryLabels();

	            // 网格
	            this.drawGrid();

	            var st3 = +new Date();
	            console.log('grid:', st3 - st2);

	            // 线条
	            this.drawLine();

	            var st4 = +new Date();
	            console.log('line:', st4 - st3);

	            // 图例
	            this.drawLegend();

	            var st5 = +new Date();
	            console.log('legend:', st5 - st4);
	        },

	        initContext: function () {
	            this.legends = [];

	            this.lines = [];
	            this.bars = [];

	            this.categoryLabels = [];
	        },

	        drawLine: function () {
	            this.clearSeries();
	            var series = this.opts.series;

	            for (var i = 0; i < series.length; i++) {

	                this.lines[i] = {
	                    isHidden: series[i].isHidden === undefined ? false : series[i].isHidden
	                };
	                this.legends[i] = {};

	                this.processSingleLine(series[i], i);
	            }

	            // 所有元素绘制完毕之后做必要的元素位置调整
	            this.reviseCanvas();
	        },

	        clearSeries: function () {
	            var series = this.opts.series;
	            var lines = this.lines;

	            this.barIndex = 0;

	            for (var i = 0; i < series.length; i++) {
	                var line = lines[i];

	                if (line) {
	                    // 柱
	                    line.barsSt && line.barsSt.remove();

	                    // 线
	                    line.path && line.path.remove();

	                    // 点
	                    line.pointsSt && line.pointsSt.remove();

	                    // area
	                    line.areaPath && line.areaPath.remove();

	                    // hover 效果
	                    line.linesGlow && line.linesGlow.remove();
	                }

	                // 分组
	                if (this['serieGroup' + i]) {
	                    this['serieGroup' + i].remove();
	                }
	            }
	        },

	        processSingleLine: function (lineInfo, seriesIndex) {
	            // 当前线条颜色信息
	            this.lines[seriesIndex].color = this.opts.color[seriesIndex % this.opts.color.length];
	            this.lines[seriesIndex].isArea = lineInfo.isArea;

	            // 当前线条 legend 信息
	            this.legends[seriesIndex].type = lineInfo.legendIcon || lineInfo.type;
	            this.legends[seriesIndex].color = this.lines[seriesIndex].color;
	            this.legends[seriesIndex].name = lineInfo.name;
	            this.legends[seriesIndex].isHidden = lineInfo.isHidden;

	            if (!lineInfo.isHidden) {
	                this['serieGroup' + seriesIndex] = this.paper.group('hm-serie hm-serie-' + seriesIndex);

	                var linePoints = [];

	                var position = 'left';

	                if (lineInfo.yAxis === 2) {
	                    position = 'right';
	                }
	                if (lineInfo.xAxis === 1) {
	                    position = 'bottom';
	                }
	                else if (lineInfo.xAxis === 2) {
	                    position = 'top';
	                }

	                var data = lineInfo.data;

	                var axisLayoutInfo = this.axisLayoutInfo;

	                var axisDataInfo = this._axis['_v_axis'] && this._axis['_v_axis'].getAxisValueInfo(position) || {};

	                var max = axisDataInfo.max;
	                var min = axisDataInfo.min;

	                // 参考坐标点，例如左值轴的参考轴是底或顶横轴
	                var tickPoints = this.getReferenceAxisPoint(position);

	                if (max !== undefined && min !== undefined && axisLayoutInfo) {
	                    var dataGap = max - min;

	                    var categoryLength = tickPoints.length || data.length;

	                    for (var i = 0; i < categoryLength; i++) {
	                        var pointData = +data[i];

	                        if (isNaN(pointData)) {
	                            break;
	                            // throw Error(this.opts.__name, ': Axis value is NaN');
	                        }

	                        var point = {
	                            x: 0,
	                            y: 0
	                        };

	                        var avaliableSpace = 0;
	                        var dataSpace = 0;
	                        switch (position) {
	                            case 'top':
	                                avaliableSpace = axisLayoutInfo.width;
	                                dataSpace = avaliableSpace / dataGap * pointData;

	                                point = this.calcHorizontalLinePoint(axisLayoutInfo, dataSpace, tickPoints[i]);
	                                break;
	                            case 'right':
	                                avaliableSpace = axisLayoutInfo.height;
	                                dataSpace = avaliableSpace / dataGap * pointData;

	                                point = this.calcVerticalLinePoint(axisLayoutInfo, dataSpace, tickPoints[i]);
	                                break;
	                            case 'bottom':
	                                avaliableSpace = axisLayoutInfo.width;
	                                dataSpace = avaliableSpace / dataGap * pointData;

	                                point = this.calcHorizontalLinePoint(axisLayoutInfo, dataSpace, tickPoints[i]);
	                                break;
	                            case 'left':
	                                avaliableSpace = axisLayoutInfo.height;
	                                dataSpace = avaliableSpace / dataGap * pointData;

	                                point = this.calcVerticalLinePoint(axisLayoutInfo, dataSpace, tickPoints[i]);
	                                break;
	                            default:
	                        }

	                        linePoints.push({
	                            x: point.x,
	                            y: point.y,
	                            category: tickPoints[i].label
	                        });
	                    }
	                }

	                switch (lineInfo.type) {
	                    case 'line':
	                        this.drawSerieToLine(linePoints, seriesIndex);
	                        break;
	                    case 'bar':
	                        this.drawSerieToBar(linePoints, seriesIndex);
	                        break;
	                    default:
	                        this.drawSerieToLine(linePoints, seriesIndex);
	                        break;
	                }
	            }
	        },

	        drawSerieToBar: function (linePoints, lineIndex) {
	            this.lines[lineIndex].type = 'bar';
	            this.lines[lineIndex].category = [];
	            this.lines[lineIndex].bars = [];
	            this.lines[lineIndex].barsSt = this.paper.set();

	            var barRealStyle = Util.convertPathAttr({
	                background: this.lines[lineIndex].color,
	                width: 0
	            });

	            var rectCount = this.getDisplayBarCount();

	            var rectPath;

	            var rectStartX;
	            var rectStartY;
	            var dot;

	            var barWidth = this.calcBarWidth(rectCount, linePoints);

	            for (var i = 0; i < linePoints.length; i++) {
	                dot = linePoints[i];

	                rectInfo = this.getBarRectInfo(dot, barWidth);

	                var bar;

	                if (!this.isAnitamtionEnaled()) {
	                    bar = this.paper
	                        .rect(rectInfo.x, rectInfo.y, rectInfo.width, rectInfo.height)
	                        .attr(barRealStyle);
	                }
	                else {
	                    rectInfo.style = barRealStyle;

	                    bar = Animate.rectGlow(
	                        this.paper, rectInfo,
	                        Util.getReverseDirection(this.axisLayoutInfo.categoryAxis),
	                        this.opts.animate.dur, '<>'
	                    );
	                }

	                this.lines[lineIndex].bars.push(bar);
	                this.lines[lineIndex].barsSt.push(bar);

	                ClassManager.addSerieBarClass(bar, i, lineIndex);
	                this['serieGroup' + lineIndex].push(bar);

	                this.lines[lineIndex].category.push(dot.category);
	            }

	            this.barIndex++;
	        },

	        drawSerieToLine: function (linePoints, lineIndex) {
	            this.lines[lineIndex].type = 'line';
	            this.lines[lineIndex].category = [];
	            this.lines[lineIndex].isHoliday = [];
	            this.lines[lineIndex].points = [];
	            this.lines[lineIndex].pointsSt = this.paper.set();
	            this.lines[lineIndex].path = null;
	            this.lines[lineIndex].areaPath = null;

	            var linePath = [];

	            var dot;

	            for (var i = 0; i < linePoints.length; i++) {
	                dot = linePoints[i];

	                linePath = linePath.concat([dot.x, dot.y]);

	                var isHoliday = Holiday.isHoliday(dot.category);

	                this.lines[lineIndex].category.push(
	                    isHoliday ? dot.category + '（' + isHoliday + '）' : dot.category
	                );
	                this.lines[lineIndex].isHoliday.push(isHoliday);
	            }

	            this.drawTrendLine(linePath, lineIndex);
	            this.drawTrendLineTick(linePath, lineIndex);
	        },

	        getBarRectInfo: function (dot, barWidth) {
	            if (/bottom|top/.test(this.axisLayoutInfo.categoryAxis)) {
	                return this.getVerticalBarRectInfo(dot, barWidth);
	            }
	            else {
	                return this.getHorizontalBarRectInfo(dot, barWidth);
	            }
	        },

	        getVerticalBarRectInfo: function (dot, barWidth) {
	            var totalBarCount = this.getDisplayBarCount();
	            var currentBarIndex = this.barIndex;
	            var referenceHeight = this.axisLayoutInfo.height + this.axisLayoutInfo.margin[0];

	            // 第一个 bar 的 x 计算公式如下
	            // bar0.x = dot.x - (count / 2) * barWidth - (count - 1) / 8 * barWidth
	            // 第 N 个 bar 的 x 则为 bar.x = bar0.x + (1 + 1/4) * barWidth * (N - 1)
	            var startX = dot.x - (totalBarCount / 2) * barWidth - ((totalBarCount - 1) / 8 * barWidth);

	            var currentX = startX + 5 / 4 * barWidth * currentBarIndex;

	            var result = {
	                x: currentX,
	                y: 0,
	                width: barWidth,
	                height: 0
	            };

	            if (this.axisLayoutInfo.categoryAxis === 'bottom') {
	                result.y = dot.y;
	                result.height = referenceHeight - dot.y;
	            }
	            else if (this.axisLayoutInfo.categoryAxis === 'top') {
	                result.y = this.axisLayoutInfo.margin[0] + 1;
	                result.height = dot.y - result.y;
	            }

	            return result;
	        },

	        getHorizontalBarRectInfo: function (dot, barWidth) {
	            var totalBarCount = this.getDisplayBarCount();
	            var currentBarIndex = this.barIndex;
	            var referenceWidth = this.axisLayoutInfo.width + this.axisLayoutInfo.margin[3];

	            var startY = dot.y - (totalBarCount / 2) * barWidth - ((totalBarCount - 1) / 8 * barWidth);

	            var currentY = startY + 5 / 4 * barWidth * currentBarIndex;

	            var result = {
	                x: 0,
	                y: currentY,
	                height: barWidth,
	                width: 0
	            };

	            if (this.axisLayoutInfo.categoryAxis === 'left') {
	                result.x = this.axisLayoutInfo.margin[3] + 1;
	                result.width = dot.x - result.x;
	            }
	            else if (this.axisLayoutInfo.categoryAxis === 'right') {
	                result.x = dot.x;
	                result.width = referenceWidth -  dot.x - 1;
	            }

	            return result;
	        },

	        calcBarWidth: function (rectCount, linePoints) {
	            if (/bottom|top/.test(this.axisLayoutInfo.categoryAxis)) {
	                return this.calcVerticalBarWidth(rectCount, linePoints);
	            }
	            else {
	                return this.calcHorizontalBarWidth(rectCount, linePoints);
	            }
	        },

	        calcHorizontalBarWidth: function (rectCount, linePoints) {
	            // 兼容只有一个 category 的情况 - TODO
	            var barWidth;

	            var width = linePoints[1].y - linePoints[0].y;

	            barWidth = width / (5 * rectCount / 3 + 1/3);

	            return barWidth;
	        },

	        calcVerticalBarWidth: function (rectCount, linePoints) {
	            // 兼容只有一个 category 的情况 - TODO
	            var barWidth;

	            // 默认 bar 之间的间隔是 bar 宽度的 1/4
	            // 假设 category 的宽度是 width，bar 的个数是 x，则符合以下公式
	            // width = x * barWidth + (x + 1) * barWidth / 4
	            // barWidth = width / (5 * x / 4 + 1/4)
	            // 20160119：间隔调整为 1/3

	            var width = linePoints[1].x - linePoints[0].x;

	            barWidth = width / (5 * rectCount / 3 + 1/3);

	            return barWidth;
	        },

	        calcHorizontalLinePoint: function (axisLayoutInfo, dataSpace, referencePoint) {
	            var point = {x: 0, y: referencePoint.y};

	            if (axisLayoutInfo.categoryAxis === 'left') {
	                point.x = axisLayoutInfo.x + dataSpace;
	            }
	            else if (axisLayoutInfo.categoryAxis === 'right') {
	                point.x = axisLayoutInfo.x + axisLayoutInfo.width - dataSpace;
	            }

	            return point;
	        },

	        calcVerticalLinePoint: function (axisLayoutInfo, dataSpace, referencePoint) {
	            var point = {x: referencePoint.x, y: 0};

	            if (axisLayoutInfo.categoryAxis === 'bottom') {
	                point.y = axisLayoutInfo.y + axisLayoutInfo.height - dataSpace;
	            }
	            else if (axisLayoutInfo.categoryAxis === 'top') {
	                point.y = axisLayoutInfo.y + dataSpace;
	            }

	            return point;
	        },

	        /**
	         * 绘制直线上的点
	         */
	        drawTrendLineTick: function (linePath, lineIndex) {
	            var line = this.lines[lineIndex];
	            var holidayInfo = line.isHoliday;
	            var color = line.color;

	            var itemStyles = this.opts.itemStyle;
	            var dotStyle = Util.cloneObject(itemStyles.normal.dotStyle);
	            var emphasisStyle = Util.cloneObject(itemStyles.emphasis.dotStyle);

	            dotStyle.background = color;

	            if (dotStyle.hasHollow) {
	                dotStyle.borderColor = color;
	                dotStyle.background = '#fff';
	            }

	            if (emphasisStyle.hasHollow) {
	                emphasisStyle.borderColor = '#fff';
	                emphasisStyle.background = color;
	            }

	            var dotRealStyle = Util.convertAreaAttr(dotStyle);
	            var emphasisRealStyle = Util.convertAreaAttr(emphasisStyle);

	            if (this.isAnitamtionEnaled()) {
	                // 如果开启动画效果则将点的起始半径置为 0
	                delete dotRealStyle.r;
	                delete emphasisRealStyle.r;
	            }

	            var dotAnimateDur = this.opts.animate.dur;
	            var dotAnimateEasing = this.opts.animate.easing;

	            for (var i = 0; i < linePath.length; i+=2) {
	                var isEmphasisStyle = holidayInfo[i / 2];
	                var realStyle = isEmphasisStyle ? emphasisRealStyle : dotRealStyle;

	                var dotElement = this.paper.circle(linePath[i], linePath[i + 1], 0).attr(realStyle);

	                if (this.isAnitamtionEnaled()) {
	                    dotElement.animate({
	                        r: isEmphasisStyle ? emphasisStyle.radius : dotStyle.radius
	                    }, dotAnimateDur * 1.5, dotAnimateEasing);
	                }

	                this.lines[lineIndex].points.push(dotElement);
	                this.lines[lineIndex].pointsSt.push(dotElement);

	                ClassManager.addSerieTickClass(dotElement, i / 2);
	                this['serieGroup' + lineIndex].push(dotElement);
	            }
	        },

	        /**
	         * 绘制直线
	         */
	        drawTrendLine: function (linePath, lineIndex) {
	            var color = this.lines[lineIndex].color;
	            var isArea = this.lines[lineIndex].isArea;
	            var itemStyles = this.opts.itemStyle;

	            var lineStyle = itemStyles.normal.lineStyle;
	            lineStyle.color = color;

	            var lineRealStyle = Util.convertPathAttr(lineStyle);

	            if (!this.isAnitamtionEnaled()) {
	                var line = this.paper.path('M' + linePath.join()).attr(lineRealStyle);
	                this.lines[lineIndex].path = line;
	            }
	            else {
	                //// 预留另外一种动画方式
	                //var start = this.paper.path('M' + linePath[0] + ',' + linePath[1]);

	                //lineRealStyle && start.attr(lineRealStyle);

	                //var anim = Raphael.animation(
	                //    { path: 'M' + linePath.join() },
	                //    this.opts.animate.dur, this.opts.animate.easing
	                //);

	                //start.animate(anim);
	                //this.lines[lineIndex].path = start;

	                var path = 'M' + linePath.join();

	                // 目前只有 chrome 下动画流畅度符合预期
	                var line = Animate.progressivelyDrawLine(this.paper, path, lineRealStyle, this.opts.animate.dur);

	                this.lines[lineIndex].path = line;
	            }

	            // serie class
	            ClassManager.addSerieClass(this.lines[lineIndex].path, lineIndex);
	            this['serieGroup' + lineIndex].push(this.lines[lineIndex].path);

	            // 是否是面积图
	            if (isArea) {
	                var areaStart;
	                var areaEnd;

	                // 获取填充路径
	                // 暂时只支持了 bottom 和 left，后续可以全部支持并提取函数
	                if (this.axisLayoutInfo.categoryAxis === 'bottom') {
	                    var startX = linePath[0];
	                    var endX = linePath[linePath.length - 2];

	                    var chartY = this.axisLayoutInfo.y + this.axisLayoutInfo.height;

	                    areaStart = 'M,' + [startX, chartY].join() + ',';
	                    areaEnd = ',' + [endX, chartY, 'z'].join();
	                }
	                else if (this.axisLayoutInfo.categoryAxis === 'left') {
	                    var chartX = this.axisLayoutInfo.x;

	                    var startY = linePath[1];
	                    var endY = linePath[linePath.length - 1];

	                    areaStart = 'M,' + [chartX, startY].join() + ',';
	                    areaEnd = ',' + [chartX, endY, 'z'].join();
	                }

	                var areaElement = this.paper.path(areaStart + linePath.join() + areaEnd);

	                areaElement.attr(
	                    Util.convertPathAttr({
	                        background: color,
	                        opacity: .1,
	                        color: 'none'
	                    })
	                );

	                // serie area class
	                ClassManager.addSerieAreaClass(areaElement, lineIndex);
	                this['serieGroup' + lineIndex].push(areaElement);

	                this.lines[lineIndex].areaPath = areaElement;
	            }
	        },

	        getReferenceAxisPoint: function (position) {
	            var tickPoints = this._axis['_c_axis'] && this._axis['_c_axis'].getTickPoints();

	            var categoryAxis = this.axisLayoutInfo.categoryAxis;
	            var isCategoryHorizontal = /bottom|top/.test(categoryAxis);

	            var refAxisPoints = Util.cloneObject(tickPoints[categoryAxis]);

	            // 如有柱
	            if (this.opts.hasBarSeries) {
	                for (var i = 0; i < refAxisPoints.length - 1; i++) {
	                    if (isCategoryHorizontal) {
	                        refAxisPoints[i].x = (refAxisPoints[i].x + refAxisPoints[i + 1].x) / 2;
	                    }
	                    else {
	                        refAxisPoints[i].y = (refAxisPoints[i].y + refAxisPoints[i + 1].y) / 2;
	                    }
	                }

	                refAxisPoints.pop();
	            }

	            return refAxisPoints;
	        },

	        drawGrid: function () {
	            var vAxis = this._axis['_v_axis'] && this._axis['_v_axis'].tickPoints || {};
	            var cAxis = this._axis['_c_axis'] && this._axis['_c_axis'].tickPoints || {};

	            var gridOpts = {
	                grid: Util.extend(Util.extend({
	                    points: {
	                        'top': cAxis.top || vAxis.top,
	                        'right': cAxis.right || vAxis.right,
	                        'bottom': cAxis.bottom || vAxis.bottom,
	                        'left': cAxis.left || vAxis.left
	                    }
	                }, this.axisLayoutInfo), this.opts.grid)
	            };

	            if (this.opts.tooltip) {
	                gridOpts.tooltip = Util.extend({
	                    show: true,
	                    callbacks: {
	                        highlight: Util.bind(this.highLightTooltip, this),
	                        unhighlight: Util.bind(this.unhighLightTooltip, this)
	                    }
	                }, this.opts.tooltip);

	                gridOpts._data = this._data;
	                gridOpts.hasBarSeries = this.opts.hasBarSeries;
	            }

	            this._grid = Chart.createComponent(Grid, gridOpts);

	            this._grid.render(this.paper);
	        },

	        /**
	         * 部分需要调整前后的图层
	         */
	        reviseCanvas: function () {
	            // 柱和线同时存在时将线条置顶
	            var seriesTypeDetail = this.opts.seriesTypeDetail;
	            if (seriesTypeDetail && seriesTypeDetail.line > 0 && seriesTypeDetail.bar > 0) {
	                for (var i = 0; i < this.lines.length; i++) {
	                    if (this.lines[i].type === 'line') {
	                        this.lines[i].path.toFront();
	                        this.lines[i].pointsSt.toFront();
	                    }
	                }
	            }

	            // tooltip 所需 mask 需要在最前面
	            if (this.opts.tooltip.show) {
	                this._grid && this._grid.updateMask('toFront');
	            }
	        },

	        drawLegend: function () {
	            if (this.opts.legend !== undefined) {
	                var settings = Util.extend(
	                    { legend: this.opts.legend },
	                    {
	                        legend: {
	                            data: this.legends,
	                            callbacks: {
	                                highlight: Util.bind(this.highLightSerie, this),
	                                unhighlight: Util.bind(this.unHighLightSerie, this),
	                                select: Util.bind(this.selectSerie, this),
	                                unselect: Util.bind(this.unselectSerie, this)
	                            }
	                        },
	                        axisLayoutInfo: this.axisLayoutInfo
	                    }
	                );

	                this._legend = Chart.createComponent(Legend, settings);
	                this._legend.render(this.htmlPaper);
	            }
	        },

	        highLightTooltip: function (index, eventPoint) {
	            var lines = this.lines;
	            var line;
	            var point;
	            var color;

	            var glowAttr = {
	                opacity: 0.3,
	                width: 5
	            };

	            // 高亮点
	            for (var i = 0; i < lines.length; i++) {
	                line = lines[i];

	                if (!Util.isPlainObject(line) && !line.isHidden) {
	                    point = (line.points && line.points[index]) || (line.bars && line.bars[index]);

	                    glowAttr.color = line.color;

	                    line['linePointGlow'] = point.glow(glowAttr);
	                }
	            }

	            this.showTooltip(index, eventPoint);
	        },

	        unhighLightTooltip: function (index) {
	            var lines = this.lines;
	            var line;

	            for (var i = 0; i < lines.length; i++) {
	                line = lines[i];

	                line['linePointGlow'] && line['linePointGlow'].remove();
	            }

	            this.hideTooltip(index);
	        },

	        showTooltip: function (index, eventPoint) {
	            var opts = this.opts;
	            var lines = this.lines;

	            var content = opts.tooltip.formatter(lines, this._data.series, this.categoryLabels, index);

	            var lineBoundingRect = Util.getBoundingClientRect(this._grid.getActiveItemLine());

	            var tipSettings = {
	                content: content,
	                style: Util.extend({
	                    padding: [5, 10, 5, 10]
	                }, opts.tooltip.style),
	                eventInfo: {
	                    point: eventPoint,
	                    left: lineBoundingRect.left,
	                    top: lineBoundingRect.top
	                },
	                axisLayoutInfo: this.axisLayoutInfo
	            };

	            if (!this.tooltip) {
	                this.tooltip = Chart.createComponent(Tooltip, tipSettings);
	                this.tooltip.render(this.htmlPaper);
	                this.tooltip.show();
	            }
	            else {
	                this.tooltip.update(tipSettings);
	            }
	        },

	        hideTooltip: function (index) {
	            this.tooltip && this.tooltip.hide();
	        },

	        highLightSerie: function (index) {
	            var lineInfo = this.lines[index];

	            if (this.isAnitamtionEnaled()) {
	                var glowAttr = {
	                    color: lineInfo.color,
	                    opacity: 0.3,
	                    width: 5
	                };

	                if (lineInfo.type === 'line') {
	                    if (lineInfo.isArea) {
	                        glowAttr.fill = true;
	                        lineInfo['linesGlow'] = lineInfo.areaPath.glow(glowAttr);
	                    }
	                    else {
	                        lineInfo['linesGlow'] = lineInfo.path.glow(glowAttr);
	                    }
	                }
	                else {
	                    lineInfo['linesGlow'] = lineInfo.barsSt.glow(glowAttr);
	                }

	            }

	        },

	        unHighLightSerie: function (index) {
	            var lineInfo = this.lines[index];
	            lineInfo['linesGlow'] && lineInfo['linesGlow'].remove();
	        },

	        selectSerie: function (index) {
	            this.opts.series[index].isHidden = false;

	            this.drawLine();
	        },

	        unselectSerie: function (index) {
	            this.opts.series[index].isHidden = true;

	            this.drawLine();
	        },

	        convertData: function () {
	            var opts = this.opts;

	            if (opts.dataAdapter
	                && Util.isFunction(dataAdapter[opts.dataAdapter])) {
	                this.opts = Util.extend(opts, dataAdapter[opts.dataAdapter](this._data));
	            }

	            var seriesTypeDetail = Util.getSeriesTypeDetail(opts.series);

	            this.opts.hasBarSeries = seriesTypeDetail.bar > 0;
	            this.opts.seriesTypeDetail = seriesTypeDetail;
	        },

	        getDisplayBarCount: function () {
	            var count = this.opts.seriesTypeDetail.bar;
	            var series = this.opts.series;

	            for (var i = 0; i < series.length; i++) {
	                if (series[i].type === 'bar' && series[i].isHidden) {
	                    count--;
	                }
	            }

	            return count;
	        },

	        isAnitamtionEnaled: function () {
	            return this.opts.animate.enabled && !Chart.isVML;
	        }

	    };

	    return Bar;

	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * @file hm-charts
	 * @author wumingdan(wumingdan@baidu.com)
	 */

	!(__WEBPACK_AMD_DEFINE_RESULT__ = function (require) {

	    var Chart = __webpack_require__(2);
	    var Util = __webpack_require__(1);

	    var AxisCategory = __webpack_require__(9);
	    var AxisValue = __webpack_require__(11);

	    var Resource = __webpack_require__(10);

	    var Axis = {
	        defaults: {
	            xAxis: [{
	                // 坐标轴类型，横轴默认为类目型'category'，纵轴默认为数值型'value'
	                type: 'category',
	                position: 'bottom',
	                boundaryGap: false,
	                axisLine: {
	                    show: true,
	                    style: {
	                        width: 1,
	                        color: '#dedede'
	                    }
	                },
	                data: [],
	                axisLabel: {
	                    show: true,
	                    // auto: 自动隐藏显示不下的
	                    // 0：全部显示
	                    interval: 'auto',
	                    // 标签旋转度数，负值为顺时针，可选为：-90 ~ 90
	                    rotate: 0,
	                    // 坐标轴文本标签与坐标轴的间距，默认为2
	                    margin: 10,
	                    maxLength: 20
	                }
	            }],
	            yAxis: [{
	                type: 'value',
	                position: 'left',
	                axisLine: {
	                    show: true,
	                    style: {
	                        width: 1,
	                        color: '#e6e9ed'
	                    }
	                },
	                split: 5
	            }],
	            textStyle: {
	                color: '#787a7d',
	                align: 'center',      // 对齐方式，可选为：'left' ¦ 'right' ¦ 'center'
	                fontFamily: Resource.fontInfo.family,
	                fontSize: Resource.fontInfo.fontSizeSmall,
	                fontStyle: 'normal',  // 样式，可选为：'normal' ¦ 'italic'
	                fontWeight: 'normal'  // 粗细，可选为：'normal' ¦ 'bold' 
	            },
	            lineStyle: {
	                color: '#ddd',
	                width: 1, 
	                type: 'solid'         // 线条样式，可选为：'solid' ¦ 'dotted' ¦ 'dashed'
	            },
	            canvasLayout: {
	                orign: {x: 0, y: 0},
	                margin: [70, 90, 70, 90],
	                width: 0,
	                height: 0
	            }
	        },

	        categoryAxis: 'bottom',

	        render: function (paper) {
	            var opts = this.opts;

	            this.paper = paper;

	            this.calculatePaper();

	            this.convertData();
	            
	            this.processAxis();
	        },

	        // 计算 paper 长宽和起始坐标
	        // 默认将坐标轴布满画布，如遇到需自定义位置的 case 再修改为配置项
	        calculatePaper: function () {
	            var canvas = this.paper.canvas;

	            this.opts.canvasLayout.width = this.opts.width;
	            this.opts.canvasLayout.height = this.opts.height;
	        },

	        convertData: function () {
	            var opts = this.opts;

	            this.opts.xAxis = this.mergeAxisSettings(opts.xAxis);
	            this.opts.yAxis = this.mergeAxisSettings(opts.yAxis);

	            // 获取 category 是哪条轴
	            if (this.opts.xAxis && this.opts.xAxis[0] && this.opts.xAxis[0].type === 'category') {
	                this.categoryAxis = this.opts.xAxis[0].position;
	            }
	            else if (this.opts.yAxis && this.opts.yAxis[0] && this.opts.yAxis[0].type === 'category') {
	                this.categoryAxis = this.opts.yAxis[0].position;
	            }
	            else {
	                this.categoryAxis = 'bottom';
	            }
	        },

	        mergeAxisSettings: function (axisData) {
	            var opts = this.opts;

	            var result = [];

	            var categoryTpl = this.defaults.xAxis[0];
	            var valueTpl = this.defaults.yAxis[0];

	            for (var i = 0; i < axisData.length; i++) {
	                var template = Util.cloneObject(axisData[i].type === 'category' ? categoryTpl : valueTpl);

	                for (var j in axisData[i]) {
	                    if (axisData[i].hasOwnProperty(j)) {
	                        template[j] = axisData[i][j];
	                    }
	                }

	                result.push(template);
	            }

	            return result;
	        },

	        processAxis: function () {
	            var opts = this.opts;

	            this.drawAxis(opts.xAxis, 'horizontal');
	            this.drawAxis(opts.yAxis, 'vertical');
	        },

	        drawAxis: function (axis, type) {
	            var opts = this.opts;
	            var axisName = type === 'horizontal' ? 'xAxis' : 'yAxis';

	            if (axis.length > 0) {
	                var axisOpts = {
	                    categoryAxis: this.categoryAxis,
	                    textStyle: opts.textStyle,
	                    lineStyle: opts.lineStyle,
	                    canvasLayout: opts.canvasLayout
	                };

	                axisOpts[axisName] = axis;

	                if (axis[0].type === 'value' || axis[0].type === 'hidden-value') {
	                    this['_v_axis'] = Chart.createComponent(AxisValue, axisOpts);
	                    this['_v_axis'].render(this.paper);
	                }
	                else {
	                    // x 轴默认为 category
	                    axisOpts.hasBarSeries = opts.hasBarSeries;
	                    this['_c_axis'] = Chart.createComponent(AxisCategory, axisOpts);
	                    this['_c_axis'].render(this.paper);
	                }
	            }
	        },

	        getAxisLayout: function () {
	            var axisCanvasLayout = this.opts.canvasLayout;

	            return {
	                x: axisCanvasLayout.orign.x + axisCanvasLayout.margin[3],
	                y: axisCanvasLayout.orign.y + axisCanvasLayout.margin[0],
	                width: axisCanvasLayout.width - axisCanvasLayout.margin[1] - axisCanvasLayout.margin[3],
	                height: axisCanvasLayout.height - axisCanvasLayout.margin[0] -  axisCanvasLayout.margin[2],
	                margin: axisCanvasLayout.margin,
	                categoryAxis: this.categoryAxis
	            };
	        },

	        getCategoryLabels: function () {
	            var result = [];
	            result = this['_c_axis'] && this['_c_axis'].getCategoryLabels();

	            return result;
	        }
	    };

	    return Axis;
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));



/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * @file hm-charts
	 * @author wumingdan(wumingdan@baidu.com)
	 * @contributor luodongyang(luodongyang@baidu.com)
	 */

	!(__WEBPACK_AMD_DEFINE_RESULT__ = function (require) {

	    var Util = __webpack_require__(1);

	    var Resource = __webpack_require__(10);

	    var AxisCategory = {
	        defaults: {
	            __name: 'AxisCategory',
	            paper: null,
	            defaultAxisCategoryInterval: 10,
	            // 坐标轴类型，横轴默认为类目型'category'，纵轴默认为数值型'value'
	            type: 'category',
	            position: 'bottom',
	            boundaryGap: false,
	            axisTick: {
	                show: true,
	                interval: 0,
	                inside: false,
	                // onGap: null,
	                length: 4,
	                lineStyle: {
	                    color: '#dedede',
	                    width: 1
	                }
	            },
	            axisLine: {
	                show: true,
	                style: {
	                    width: 1,
	                    color: '#dedede'
	                }
	            },
	            axisLabel: {
	                show: true,
	                // auto: 自动隐藏显示不下的
	                // 0：全部显示
	                interval: 'auto',
	                // 标签旋转度数，负值为顺时针，可选为：-90 ~ 90
	                rotate: 0,
	                // 坐标轴文本标签与坐标轴的间距，默认为2
	                margin: 10,
	                textStyle: {
	                    color: '#5b5d61',
	                    align: 'center',      // 对齐方式，可选为：'left' ¦ 'right' ¦ 'center'
	                    fontFamily: Resource.fontInfo.family,
	                    fontSize: Resource.fontInfo.fontSizeSmall,
	                    fontStyle: 'normal',  // 样式，可选为：'normal' ¦ 'italic'
	                    fontWeight: 'normal'  // 粗细，可选为：'normal' ¦ 'bold' 
	                }
	            },
	            splitLine: {
	                color: '#ddd',
	                width: 1, 
	                type: 'solid'         // 线条样式，可选为：'solid' ¦ 'dotted' ¦ 'dashed'
	            },
	            canvasLayout: {
	                orign: {x: 0, y: 0},
	                margin: [30, 19, 64, 90],
	                width: 0,
	                height: 0
	            }
	        },

	        tickPoints: {},

	        categoryLabels: [],

	        // 暂且只支持 tick 与 label 同时显示，后续可单独支持 label 的单独显示，但这种场景不多 - TODO
	        labelPoints: [],

	        init: function () {

	        },

	        render: function (paper) {
	            this.paper = paper;

	            this.axisGroup = this.paper.group('hm-axis hm-category-axis');
	            this.axisLabelGroup = this.paper.group('hm-axis-labels hm-category-axis-labels');

	            var opts = this.opts;
	            var xAxis = opts.xAxis;
	            var yAxis = opts.yAxis;

	            xAxis && this.processAxis(xAxis, 'horizontal');

	            yAxis && this.processAxis(yAxis, 'vertical');
	        },

	        processAxis: function (axis, type) {
	            var count = axis.length;

	            var isHorizontal = type === 'horizontal' ? true : false;

	            var drawSingleAxis = isHorizontal ? 'drawSingleXAxis' : 'drawSingleYAxis';
	            var drawTwoAxis =  isHorizontal ? 'drawTwoXAxis' : 'drawTwoYAxis';

	            if (count === 1) {
	                this[drawSingleAxis](axis);
	            }
	            else if (count === 2) {
	                this[drawTwoAxis](axis);
	            }
	            else {
	                throw Error(this.opts.__name, ': can only support 1 or 2 axis');
	            }
	        },

	        drawSingleXAxis: function (xAxis) {
	            // 设置默认值
	            xAxis[0].position = xAxis[0].position || 'bottom';
	            // axisLine
	            this.drawAxisLine(xAxis[0]);
	            // axisTick
	            this.drawAxisTick(xAxis[0]);
	            // axisLabel
	            this.drawAxisLabel(xAxis[0]);
	        },

	        drawTwoXAxis: function (xAxis) {
	            // 设置默认值
	            xAxis[0].position = xAxis[0].position || 'bottom';
	            xAxis[1].position = xAxis[1].position || 'top';

	            this.drawAxisLine(xAxis[0]);
	            this.drawAxisTick(xAxis[0]);
	            this.drawAxisLabel(xAxis[0]);

	            this.drawAxisLine(xAxis[1]);
	            this.drawAxisTick(xAxis[1]);
	            this.drawAxisLabel(xAxis[1]);
	        },

	        drawSingleYAxis: function (yAxis) {
	            // 设置默认值
	            yAxis[0].position = yAxis[0].position || 'left';

	            // axisLine
	            this.drawAxisLine(yAxis[0]);

	            // axisTick
	            this.drawAxisTick(yAxis[0]);

	            // axisLabel
	            this.drawAxisLabel(yAxis[0]);
	        },

	        drawTwoYAxis: function (yAxis) {
	            // 设置默认值
	            yAxis[0].position = yAxis[0].position || 'left';
	            yAxis[1].position = yAxis[1].position || 'right';

	            this.drawAxisLine(yAxis[0]);
	            this.drawAxisTick(yAxis[0]);
	            this.drawAxisLabel(yAxis[0]);

	            this.drawAxisLine(yAxis[1]);
	            this.drawAxisTick(yAxis[1]);
	            this.drawAxisLabel(yAxis[1]);
	        },

	        // 绘制横轴
	        drawAxisLine: function (axis) {
	            var position = axis.position;

	            // 1. 填充简便形式的 axisLine 设置
	            if (axis.axisLine === false) {
	                axis.axisLine = {
	                    show: false
	                };
	            }

	            var axisLineSetting = Util.extend(this.opts.axisLine, axis.axisLine || {});

	            if (axisLineSetting.show) {
	                var orign = this.getStartPoint(axis);

	                // 横轴长度
	                var path = ['M', orign.x, orign.y];

	                var lineLength = this.getLineLength(Util.isHorizontal(axis.position));

	                if (/bottom|top/.test(position)) {
	                    path.push('h');
	                    path.push(lineLength);
	                }
	                else if (/left|right/.test(position)) {
	                    path.push('v');
	                    path.push(lineLength);
	                }

	                var axisLine = this.paper.path(path).attr(Util.convertPathAttr(axisLineSetting.style));

	                this.axisGroup.push(axisLine);
	            }
	        },

	        drawAxisTick: function (axis) {
	            var position = axis.position;

	            // 1. 填充简便形式的 axisTick 设置
	            if (axis.axisTick === false) {
	                axis.axisTick = {
	                    show: false
	                };
	            }

	            // 2. merge tick settings
	            var axisTickSetting = Util.extend(this.opts.axisTick, axis.axisTick || {});

	            // 3. get tick points 目前需要无条件重算以支持缩放效果和不同数目的数据
	            // if (!this.tickPoints[axis.position] || this.tickPoints[axis.position].length === 0) {
	                this.tickPoints[axis.position] = this.calcPoints(axis, axisTickSetting);
	            // }

	            // 4. 如果要展示则进行绘制
	            if (axisTickSetting.show) {
	                var path = [];
	                var tick;
	                var isInside = axisTickSetting.inside;
	                var tickLength = axisTickSetting.length;
	                var tickLineStyle = Util.convertPathAttr(axisTickSetting.lineStyle);

	                var tickCommand;
	                var tickMovement;

	                switch (position) {
	                    case 'top':
	                        tickCommand = 'v';
	                        tickMovement = isInside ? tickLength : -tickLength;
	                        break;
	                    case 'right':
	                        tickCommand = 'h';
	                        tickMovement = isInside ? -tickLength : tickLength;
	                        break;
	                    case 'bottom':
	                        tickCommand = 'v';
	                        tickMovement = isInside ? -tickLength : tickLength;
	                        break;
	                    case 'left':
	                        tickCommand = 'h';
	                        tickMovement = isInside ? tickLength : -tickLength;
	                        break;
	                    default:
	                }

	                for (var i = 0, tickLen = this.tickPoints[axis.position].length; i < tickLen; i++) {
	                    // 类目轴只有 lable 是会根据宽度缩略显示，tick 不会缩略，tick 本身已被合并为一个不会影响性能
	                    // if (this.isShowTickOrLabel(i, tickLen)) {
	                    tick = this.tickPoints[axis.position][i];

	                    path = path.concat(['M', tick.x, tick.y, tickCommand, tickMovement]);
	                    // }
	                }

	                var axisTick = this.paper.path(path).attr(tickLineStyle);

	                this.axisGroup.push(axisTick);
	            }
	        },

	        drawAxisLabel: function (axis) {
	            // 重新初始化 categoryLabels ，避免重绘时重复 push
	            this.categoryLabels = [];
	            var defaultAxisLabelSetting = Util.cloneObject(this.opts.axisLabel);
	            var axisLabelSetting = Util.extend(defaultAxisLabelSetting, axis.axisLabel || {});
	            if (axisLabelSetting.show) {
	                var position = axis.position;
	                var tick;
	                var text;

	                var labelOffsetX = 0;
	                var labelOffsetY = 0;
	                var labelTextAlign = axisLabelSetting.textStyle.align;

	                switch (position) {
	                    case 'top':
	                        labelOffsetY = -axisLabelSetting.margin;
	                        break;
	                    case 'right':
	                        labelTextAlign = 'left';
	                        labelOffsetX = axisLabelSetting.margin;
	                        break;
	                    case 'bottom':
	                        labelOffsetY = axisLabelSetting.margin;
	                        break;
	                    case 'left':
	                        labelTextAlign = 'right';
	                        labelOffsetX = -axisLabelSetting.margin;
	                        break;
	                    default:
	                }

	                axisLabelSetting.textStyle.align = labelTextAlign;
	                var tickLabelStyle = Util.convertTextAttr(axisLabelSetting.textStyle);

	                var textX;
	                var textY;

	                for (var i = 0, tickLen = this.tickPoints[axis.position].length; i < tickLen; i++) {
	                    tick = this.tickPoints[axis.position][i];

	                    if (this.opts.hasBarSeries) {
	                        if (i === this.tickPoints[axis.position].length - 1) {
	                            break;
	                        }
	                        var nextTick = this.tickPoints[axis.position][i + 1];

	                        textX = (tick.x + nextTick.x) / 2 + labelOffsetX;
	                        textY = (tick.y + nextTick.y) / 2 + labelOffsetY;
	                    }
	                    else {
	                        textX = tick.x + labelOffsetX;
	                        textY = tick.y + labelOffsetY;
	                    }

	                    this.categoryLabels.push(tick.label);

	                    if (this.isShowTickOrLabel(i, tickLen)) {
	                        var displayedLabel = tick.label.length > 10 ? tick.label.substring(0, 10) + '...' : tick.label;

	                        tickLabelStyle.title = tick.label;

	                        text = this.paper.text(textX, textY, displayedLabel).attr(tickLabelStyle);

	                        this.axisLabelGroup.push(text);

	                        if (axisLabelSetting.rotate !== 0) {
	                            var h = text.getBBox().width / 2;
	                            text.transform(['t,-6,0r', axisLabelSetting.rotate, 't', h, 0].join());
	                        }
	                    }
	                }
	            }
	        },

	        isShowTickOrLabel: function (index, total) {
	            var canvasWidth = this.opts.canvasLayout.width;
	            var miniWidth = 100;

	            var canDisplayCount = Math.floor(canvasWidth / miniWidth);

	            // TODO 优化，多余固定计算等
	            if (canDisplayCount >= total) {
	                return true;
	            }
	            else {
	                var gap = Math.ceil(total / canDisplayCount);

	                if (index % gap == 0) {
	                    return true;
	                }
	            }

	            return false;
	        },

	        calcPoints: function (axis, settings) {
	            var results = [];

	            var opts = this.opts;
	            var canvasLayout = this.opts.canvasLayout;

	            var itemsCount = axis.data.length;

	            var intervalInfo = this.calcInterval(axis, settings);

	            var isHorizontal = Util.isHorizontal(axis.position);

	            // 由 axis.position 计算得出
	            var width = this.getLineLength(isHorizontal);

	            if (Util.isNumber(intervalInfo.interval)) {
	                var orign = this.getStartPoint(axis);

	                var x;
	                var y;

	                // 只有一个 tick 点
	                if (intervalInfo.interval === 1) {
	                    x = isHorizontal ? orign.x + width / 2 : orign.x;
	                    y = isHorizontal ? orign.y : orign.y + width / 2;

	                    results.push({
	                        x: Util.forceCrispEdges(x),
	                        y: Util.forceCrispEdges(y),
	                        label: axis.data[0]
	                    });
	                    return results;
	                }

	                // 每 2 个 tick 之间的距离
	                var gap = width / (intervalInfo.interval - 1);

	                for (var i = 0; i < intervalInfo.interval; i++) {
	                    x = isHorizontal ? orign.x + gap * i : orign.x;
	                    y = isHorizontal ? orign.y : orign.y + gap * i;

	                    results.push({
	                        x: Util.forceCrispEdges(x),
	                        y: Util.forceCrispEdges(y),
	                        label: axis.data[intervalInfo.dataInterval * i]
	                    });
	                }
	            }

	            return results;
	        },

	        // TODO - 完善的自适应宽度机制需要实现，而不是定死为 10
	        calcInterval: function (axis, settings) {
	            var interval;
	            var dataInterval;

	            var itemsCount = axis.data.length;
	            var hasBarSeries = this.opts.hasBarSeries;

	            var adjustInterval = function (interval) {
	                interval = hasBarSeries ? interval + 1 : interval;
	                return interval;
	            };

	            if (settings.interval === 'auto') {
	                // 简单处理
	                interval = adjustInterval(this.defaults.defaultAxisCategoryInterval);
	            }
	            else if (settings.interval === 0) {
	                // 设置为 0 则表示每一个数据项都展示
	                interval = adjustInterval(itemsCount);
	            }
	            else if (Util.isNumber(settings.interval) && settings.interval > 1) {
	                interval = adjustInterval(settings.interval);
	            }

	            // 数据间隔
	            dataInterval = Math.ceil(itemsCount / interval);;

	            return {
	                interval: interval,
	                dataInterval: dataInterval
	            };
	        },

	        getStartPoint: function (axis) {
	            var canvasLayout = this.opts.canvasLayout;

	            var position = axis.position;

	            // 1. 计算起点 x 的值
	            // bottom & top & left
	            var startX = canvasLayout.orign.x + canvasLayout.margin[3];

	            if (position === 'right') {
	                startX = canvasLayout.orign.x + canvasLayout.width - canvasLayout.margin[1];
	            }

	            // 2. 计算起点 y 的值
	            var startY;

	            if (position === 'bottom') {
	                // 默认下方横轴的起始 y 坐标为原坐标 y 加上高度减去底部 margin
	                startY = canvasLayout.orign.y + canvasLayout.height - canvasLayout.margin[2];
	            }
	            else if (/top|left|right/.test(position)) {
	                startY = canvasLayout.orign.y + canvasLayout.margin[0];
	            }

	            // 奇数保障线条宽度正确
	            startX = Util.forceCrispEdges(startX);
	            startY = Util.forceCrispEdges(startY);

	            return {
	                x: startX,
	                y: startY
	            }
	        },

	        getLineLength: function (isHorizontal) {
	            var opts = this.opts;
	            var canvasLayout = this.opts.canvasLayout;

	            var width;

	            if (isHorizontal) {
	                width = canvasLayout.width - canvasLayout.margin[3] - canvasLayout.margin[1];
	            }
	            else {
	                width = canvasLayout.height - canvasLayout.margin[0] - canvasLayout.margin[2];
	            }

	            return width;
	        },

	        getCategoryLabels: function () {
	            return this.categoryLabels;
	        },

	        getTickPoints: function () {
	            return this.tickPoints;
	        },

	        getTickPointsLength: function () {
	            for (var i in this.tickPoints) {
	                return this.tickPoints[i].length;
	            }
	        }
	    };

	    return AxisCategory;
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));



/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * @file hm-charts
	 * @author wumingdan(wumingdan@baidu.com)
	 */

	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function(require) {

	    var Resources = {
	        colorInfo: {
	            // 线，柱，堆积图颜色配置
	            colors: ['#4fa8f9', '#6ec71e', '#f56e6a', '#fc8b40', '#818af8', '#31c9d7', '#f35e7a','#ab7aee', '#14d68b', '#edb00d'],

	            // 地图颜色配置
	            mapColors: ['#1556a1', '#136bd4', '#6c98d5', '#9fccff', '#dcecff'],

	            // 饼图颜色配置
	            pieColors: ['#2DA8E3', '#BCEC6D', '#EA498A', '#FF524F', '#EAE96B', '#75CF48', '#FCBC2A', '#FD5F34', '#7ECAEF', '#999999'],

	            // 雷达图颜色配置
	            radarColors: ['#2DA8E3', '#EA498A', '#FF524F', '#BCEC6D', '#EAE96B', '#75CF48', '#FCBC2A', '#FD5F34', '#7ECAEF', '#999999']
	        },

	        fontInfo: {
	            family: 'Microsoft Yahei, Helvetica, STHeitiSC-Light, Arial, sans-serif',
	            fontSizeSmall: 12,
	            fontSizeMiddle: 14,
	            fontSizeLarge: 16
	        }
	    };

	    return Resources;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * @file hm-charts
	 * @author wumingdan(wumingdan@baidu.com)
	 */

	!(__WEBPACK_AMD_DEFINE_RESULT__ = function (require) {

	    var Util = __webpack_require__(1);

	    var Format = __webpack_require__(12);
	    var Resource = __webpack_require__(10);

	    var AxisValue = {
	        defaults: {
	            __name: 'AxisValue',
	            paper: null,
	            defaultAxisValueSplitNumber: 6,
	            // 坐标轴类型，横轴默认为类目型 category，纵轴默认为数值型 value
	            type: 'value',
	            position: 'left',
	            boundaryGap: false,
	            axisTick: {
	                show: true,
	                interval: 'auto',
	                inside: false,
	                // onGap: null,
	                length: 5,
	                lineStyle: {
	                    color: '#dedede',
	                    width: 1
	                }
	            },
	            axisLine: {
	                show: true,
	                style: {
	                    width: 1,
	                    color: '#dedede'
	                }
	            },
	            axisLabel: {
	                format: '{value}',
	                show: true,
	                // auto: 自动隐藏显示不下的
	                // 0：全部显示
	                interval: 'auto',
	                // 标签旋转度数，负值为顺时针，可选为：-90 ~ 90
	                rotate: 0,
	                // 坐标轴文本标签与坐标轴的间距，默认为 2
	                margin: 10,
	                maxLength: 20,
	                shareSuffix: false,
	                textStyle: {
	                    color: '#787a7d',
	                    align: 'center',      // 对齐方式，可选为：'left' ¦ 'right' ¦ 'center'
	                    fontFamily: Resource.fontInfo.family,
	                    fontSize: Resource.fontInfo.fontSizeSmall,
	                    fontStyle: 'normal',  // 样式，可选为：'normal' ¦ 'italic'
	                    fontWeight: 'normal'  // 粗细，可选为：'normal' ¦ 'bold' 
	                }
	            },
	            splitLine: {
	                color: '#ddd',
	                width: 1, 
	                type: 'solid'         // 线条样式，可选为：'solid' ¦ 'dotted' ¦ 'dashed'
	            },
	            canvasLayout: {
	                orign: {x: 0, y: 0},
	                margin: [30, 19, 64, 90],
	                width: 0,
	                height: 0
	            }
	        },

	        // 坐标轴 tick 信息
	        tickPoints: {},

	        // 暂且只支持 tick 与 label 同时显示，后续可单独支持 label 的单独显示，但这种场景不多 - TODO
	        labelPoints: [],

	        // 坐标轴值信息
	        pointValueInfo: {},

	        init: function () {
	            this.tickPoints = {};
	            this.labelPoints = [];
	            this.pointValueInfo = {};
	        },

	        render: function (paper) {
	            this.paper = paper;

	            this.axisGroup = this.paper.group('hm-axis hm-value-axis');
	            this.axisLabelGroup = this.paper.group('hm-axis-labels hm-value-axis-labels');

	            var opts = this.opts;

	            var xAxis = opts.xAxis;
	            var yAxis = opts.yAxis;

	            xAxis && this.processAxis(xAxis, 'horizontal');

	            yAxis && this.processAxis(yAxis, 'vertical');
	        },

	        processAxis: function (axis, type) {
	            var count = axis.length;

	            var isHorizontal = type === 'horizontal' ? true : false;

	            var drawSingleAxis = isHorizontal ? 'drawSingleXAxis' : 'drawSingleYAxis';
	            var drawTwoAxis =  isHorizontal ? 'drawTwoXAxis' : 'drawTwoYAxis';

	            if (count === 1) {
	                this[drawSingleAxis](axis);
	            }
	            else if (count === 2) {
	                this[drawTwoAxis](axis);
	            }
	            else {
	                throw Error(this.opts.__name, ': can only support 1 or 2 axis');
	            }
	        },

	        drawSingleXAxis: function (xAxis) {
	            // 设置默认值
	            xAxis[0].position = xAxis[0].position || 'bottom';

	            // axisLine
	            this.drawAxisLine(xAxis[0]);

	            // axisTick
	            this.drawAxisTick(xAxis[0]);

	            // axisLabel
	            this.drawAxisLabel(xAxis[0]);
	        },

	        drawTwoXAxis: function (xAxis) {
	            // 设置默认值
	            xAxis[0].position = xAxis[0].position || 'bottom';
	            xAxis[1].position = xAxis[1].position || 'top';

	            this.drawAxisLine(xAxis[0]);
	            this.drawAxisTick(xAxis[0]);
	            this.drawAxisLabel(xAxis[0]);

	            this.drawAxisLine(xAxis[1]);
	            this.drawAxisTick(xAxis[1]);
	            this.drawAxisLabel(xAxis[1]);
	        },

	        drawSingleYAxis: function (yAxis) {
	            // 设置默认值
	            yAxis[0].position = yAxis[0].position || 'left';

	            // axisLine
	            this.drawAxisLine(yAxis[0]);

	            // axisTick
	            this.drawAxisTick(yAxis[0]);

	            // axisLabel
	            this.drawAxisLabel(yAxis[0]);
	        },

	        drawTwoYAxis: function (yAxis) {
	            this.drawAxisLine(yAxis[0]);
	            this.drawAxisTick(yAxis[0]);
	            this.drawAxisLabel(yAxis[0]);

	            this.drawAxisLine(yAxis[1]);
	            this.drawAxisTick(yAxis[1]);
	            this.drawAxisLabel(yAxis[1]);
	        },

	        // 绘制横轴
	        drawAxisLine: function (axis) {
	            var position = axis.position;

	            // 1. 填充简便形式的 axisLine 设置
	            if (axis.axisLine === false) {
	                axis.axisLine = {
	                    show: false
	                };
	            }

	            var axisLineSetting = Util.extend(this.opts.axisLine, axis.axisLine || {});

	            if (axisLineSetting && axisLineSetting.show) {
	                var orign = this.getStartPoint(axis);

	                // 横轴长度
	                var path = ['M', orign.x, orign.y];

	                var lineLength = this.getLineLength(Util.isHorizontal(axis.position));

	                if (/bottom|top/.test(position)) {
	                    path.push('h');
	                    path.push(lineLength);
	                }
	                else if (/left|right/.test(position)) {
	                    path.push('v');
	                    path.push(lineLength);
	                }

	                var axisLine = this.paper.path(path).attr(Util.convertPathAttr(axisLineSetting.style));

	                this.axisGroup.push(axisLine);
	            }
	        },

	        drawAxisTick: function (axis) {
	            var position = axis.position;

	            // 1. 填充简便形式的 axisTick 设置
	            if (axis.axisTick === false) {
	                axis.axisTick = {
	                    show: false
	                };
	            }

	            // 2. merge tick settings
	            var axisTickSetting = Util.extend(this.opts.axisTick, axis.axisTick || {});

	            // 3. get tick points
	            if (!this.tickPoints[axis.position] || this.tickPoints[axis.position].length === 0) {
	                this.tickPoints[axis.position] = this.calcPoints(axis, axisTickSetting);
	            }

	            // 4. 如果要展示则进行绘制
	            if (axisTickSetting.show) {
	                var path = [];
	                var tick;
	                var isInside = axisTickSetting.inside;
	                var tickLength = axisTickSetting.length;
	                var tickLineStyle = Util.convertPathAttr(axisTickSetting.lineStyle);

	                var tickCommand;
	                var tickMovement;

	                switch (position) {
	                    case 'top':
	                        tickCommand = 'v';
	                        tickMovement = isInside ? tickLength : -tickLength;
	                        break;
	                    case 'right':
	                        tickCommand = 'h';
	                        tickMovement = isInside ? -tickLength : tickLength;
	                        break;
	                    case 'bottom':
	                        tickCommand = 'v';
	                        tickMovement = isInside ? -tickLength : tickLength;
	                        break;
	                    case 'left':
	                        tickCommand = 'h';
	                        tickMovement = isInside ? tickLength : -tickLength;
	                        break;
	                    default:
	                }

	                for (var i = 0; i < this.tickPoints[axis.position].length; i++) {
	                    tick = this.tickPoints[axis.position][i];

	                    path = path.concat(['M', tick.x, tick.y, tickCommand, tickMovement]);
	                }

	                var axisTick = this.paper.path(path).attr(tickLineStyle);

	                this.axisGroup.push(axisTick);
	            }
	        },

	        drawAxisLabel: function (axis) {
	            var axisLabelSetting = Util.extend(Util.cloneObject(this.opts.axisLabel), axis.axisLabel || {});
	            if (axisLabelSetting.show) {
	                var position = axis.position;

	                var tick;
	                var path;
	                var text;

	                var labelOffsetX = 0;
	                var labelOffsetY = 0;
	                var labelTextAlign = axisLabelSetting.align;
	                var tickLabelStyle = axisLabelSetting.textStyle;

	                switch (position) {
	                    case 'top':
	                        labelOffsetY = -axisLabelSetting.margin;
	                        break;
	                    case 'right':
	                        labelTextAlign = 'left';
	                        labelOffsetX = axisLabelSetting.margin;
	                        break;
	                    case 'bottom':
	                        labelOffsetY = axisLabelSetting.margin;
	                        break;
	                    case 'left':
	                        labelTextAlign = 'right';
	                        labelOffsetX = -axisLabelSetting.margin;
	                        break;
	                    default:
	                }

	                var isSharedSuffix = axisLabelSetting.shareSuffix;
	                var label;

	                for (var i = 0; i < this.tickPoints[axis.position].length; i++) {
	                    tick = this.tickPoints[axis.position][i];

	                    if (!isSharedSuffix) {
	                        label = axisLabelSetting.format.replace(
	                            '{value}',
	                            Format.format(tick.label, axisLabelSetting.dataType)
	                        );
	                    }
	                    else {
	                        if (i === 0) {
	                            var labelValue = Format.format(tick.label, axisLabelSetting.dataType);

	                            label = axisLabelSetting.format.replace('{value}',
	                                axisLabelSetting.format !== '{value}' ? labelValue + ' /' : labelValue
	                            );
	                        }
	                        else {
	                            label = Format.format(tick.label, axisLabelSetting.dataType);
	                        }
	                    }

	                    text = this.paper
	                        .text(tick.x + labelOffsetX, tick.y + labelOffsetY, label)
	                        .attr(Util.convertTextAttr(Util.extend(tickLabelStyle, {'align': labelTextAlign})));

	                    this.axisLabelGroup.push(text);

	                    if (axisLabelSetting.rotate !== 0) {
	                        var h = text.getBBox().width / 2;
	                        text.transform(['t,-6,0r', axisLabelSetting.rotate, 't', h, 0].join());
	                    }
	                }
	            }
	        },

	        calcPoints: function (axis, settings) {
	            var results = [];

	            var opts = this.opts;
	            var canvasLayout = this.opts.canvasLayout;

	            var itemsCount = 0;

	            // 定义了坐标轴但是没有任何数据指向这跟坐标轴
	            if (axis.data ===  undefined) {
	                axis.data = this.generateDefaultAxisData();
	            }

	            for (var d = 0; d < axis.data.length; d++) {
	                itemsCount = itemsCount < axis.data[d].length ? axis.data[d].length : itemsCount;
	            }

	            var interval = this.defaults.defaultAxisValueSplitNumber;

	            var isHorizontal = Util.isHorizontal(axis.position);

	            // 由 axis.position 计算得出
	            var width = this.getLineLength(isHorizontal);

	            var orign = this.getStartPoint(axis);

	            var x;
	            var y;

	            // 每 2 个 tick 之间的距离
	            var gap = width / (interval - 1);
	            var tickLabels = this.getAxisValueTickLabel(axis);

	            for (var i = 0; i < interval; i++) {
	                x = isHorizontal ? orign.x + gap * i : orign.x;
	                y = isHorizontal ? orign.y : orign.y + gap * i;

	                results.push({
	                    x: Util.forceCrispEdges(x),
	                    y: Util.forceCrispEdges(y),
	                    label: tickLabels[i]
	                });
	            }

	            return results;
	        },

	        getAxisValueTickLabel: function (axis) {
	            var position = axis.position;
	            var data = axis.data;

	            var maxNumber = -Infinity;
	            var minNumber = 0;  // 由于统计的业务都是 0 开始的，目前只支持 0 和负值自适应

	            var dataItem;

	            for (var j = 0; j < data.length; j++) {
	                var serieData = data[j];

	                for (var i = 0, dataLength = serieData.length; i < dataLength; i++) {
	                    dataItem = +serieData[i];
	                    maxNumber = maxNumber < dataItem ? dataItem : maxNumber;

	                    // 暂强制为 0
	                    // minNumber = minNumber > dataItem ? dataItem : minNumber;
	                }

	                // 如果 maxNumber 为 0 ，则改为 5
	                if(maxNumber === 0) {
	                    maxNumber = 5;
	                }
	            }

	            var valueAxisSplitNumber = this.defaults.defaultAxisValueSplitNumber;

	            var gap = Math.ceil(maxNumber / (valueAxisSplitNumber -1));

	            var pointValueInfo = this.getAxisValueTickPoints(valueAxisSplitNumber, minNumber, gap);

	            // 记录当前方向轴的值信息
	            this.pointValueInfo[position] = {
	                max: pointValueInfo.max,
	                min: pointValueInfo.min
	            };

	            return pointValueInfo.points;
	        },

	        getAxisValueTickPoints: function (valueAxisSplitNumber, minNumber, gap) {
	            var categoryAxis = this.opts.categoryAxis;

	            var pointValuesInfo = {
	                points: [],
	                max: undefined,
	                min: minNumber
	            };

	            if (/top|left/.test(categoryAxis)) {
	                for (var j = 0; j < valueAxisSplitNumber; j++) {
	                    pointValuesInfo.points.push(minNumber + j * gap);
	                }

	                pointValuesInfo.max = pointValuesInfo.points[pointValuesInfo.points.length - 1];
	            }
	            else {
	                // bottom or right
	                for (var j = valueAxisSplitNumber - 1; j >= 0; j--) {
	                    pointValuesInfo.points.push(minNumber + j * gap);
	                }

	                pointValuesInfo.max = pointValuesInfo.points[0];
	            }

	            return pointValuesInfo;
	        },

	        getAxisValueInfo: function (position) {
	            return this.pointValueInfo[position];
	        },

	        getStartPoint: function (axis) {
	            var canvasLayout = this.opts.canvasLayout;

	            var position = axis.position;

	            // 1. 计算起点 x 的值
	            // bottom & top & left
	            var startX = canvasLayout.orign.x + canvasLayout.margin[3];

	            if (position === 'right') {
	                startX = canvasLayout.orign.x + canvasLayout.width - canvasLayout.margin[1];
	            }

	            // 2. 计算起点 y 的值
	            var startY;

	            if (position === 'bottom') {
	                // 默认下方横轴的起始 y 坐标为原坐标 y 加上高度减去底部 margin
	                startY = canvasLayout.orign.y + canvasLayout.height - canvasLayout.margin[2];
	            }
	            else if (/top|left|right/.test(position)) {
	                startY = canvasLayout.orign.y + canvasLayout.margin[0];
	            }

	            // 奇数保障线条宽度正确
	            startX = Util.forceCrispEdges(startX);
	            startY = Util.forceCrispEdges(startY);

	            return {
	                x: startX,
	                y: startY
	            }
	        },

	        getLineLength: function (isHorizontal) {
	            var opts = this.opts;
	            var canvasLayout = this.opts.canvasLayout;

	            var width;

	            if (isHorizontal) {
	                width = canvasLayout.width - canvasLayout.margin[3] - canvasLayout.margin[1];
	            }
	            else {
	                width = canvasLayout.height - canvasLayout.margin[0] - canvasLayout.margin[2];
	            }

	            return width;
	        },

	        generateDefaultAxisData: function () {
	            var result = [];

	            for (var i = 0; i < this.defaults.defaultAxisValueSplitNumber; i++) {
	                result.push(i)
	            }

	            return [result];
	        }
	    };

	    return AxisValue;
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));



/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * @file hm-charts
	 * @author wumingdan(wumingdan@baidu.com)
	 */

	!(__WEBPACK_AMD_DEFINE_RESULT__ = function(require) {

	    var numeral = __webpack_require__(13);

	    var Format = {
	        format: function (text, type) {
	            var result;

	            switch (type) {
	                case 'number':
	                    result = Format.number(text);
	                    break;
	                case 'ratio':
	                    result = Format.ratio(text);
	                    break;
	                case 'time':
	                    result = Format.time(text);
	                    break;
	                default:
	                    result = Format.number(text);
	            }

	            return result;
	        },

	        number: function (text, formatter) {
	            var textNumeral = numeral(text);

	            if (formatter !== undefined) {
	                return textNumeral.format(formatter);
	            }

	            var textNumber = textNumeral._value;

	            var textInfo = String(textNumber).split('.');

	            // 整数部分
	            var integer = +textInfo[0];

	            // 小数部分
	            var decimal = textInfo[1];
	            var decimalLength = textInfo[1] !== undefined ? textInfo[1].length : 0;

	            // 默认 formatter
	            formatter = '0,0';

	            var result = numeral(integer).format(formatter);

	            if (decimalLength !== 0) {
	                result = result + '.' + decimal;
	            }

	            return result;
	        },

	        ratio: function (text) {
	            if (text == null) {
	                return '';
	            }
	            if (text == '--') {
	                return text;
	            }
	            if (isNaN(parseFloat(text))) {
	                return text;
	            }

	            return Format.number(text) + '%';
	        },

	        time: function (second, type) {
	            var dd;
	            var hh;
	            var mm;
	            var ss;
	            var result;

	            if (second == '--') {
	                return second;
	            }

	            if (type === 2) {
	                // 时间的另一种表示法： 22'11"
	                mm = second / 60 | 0;
	                ss = Math.round(second) - mm * 60;
	                var ret = '';
	                if (mm) {
	                    ret += mm + '&#039;';
	                }
	                ret += ss + '&quot;';
	                return ret;
	            }

	            // 先处理天
	            dd = second / (24 * 3600) | 0;
	            second = Math.round(second) - dd * 24 * 3600;

	            // 接着是小时
	            hh = second / 3600 | 0;
	            second = Math.round(second) - hh * 3600;

	            // 之后是分
	            mm = second / 60 | 0;

	            // 最后是秒
	            ss = Math.round(second) - mm * 60;

	            if (Math.round(dd) < 10) {
	                dd = dd > 0 ? '0' + dd : '';
	            }
	            if (Math.round(hh) < 10) {
	                hh = '0' + hh;
	            }
	            if (Math.round(mm) < 10) {
	                mm = '0' + mm;
	            }
	            if (Math.round(ss) < 10) {
	                ss = '0' + ss;
	            }
	            if (dd) {
	                result = dd + ' ' + hh + ':' + mm + ':' + ss;
	            } else {
	                result = hh + ':' + mm + ':' + ss;
	            }

	            return result;
	        }
	    };

	    return Format;
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 13 */
/***/ function(module, exports) {

	module.exports = numeral;

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * @file hm-charts
	 * @author wumingdan(wumingdan@baidu.com)
	 */

	!(__WEBPACK_AMD_DEFINE_RESULT__ = function (require) {

	    var Chart = __webpack_require__(2);

	    var Tooltip = __webpack_require__(15);

	    var ClassManager = __webpack_require__(6);

	    var Util = __webpack_require__(1);

	    var Raphael = __webpack_require__(3);

	    var Grid = {
	        defaults: {
	            __name: 'Grid',
	            paper: null,
	            grid: {
	                x: null,
	                y: null,
	                width: null,
	                height: null,
	                isShowGridLies: {
	                    horizontal: true,
	                    vertical: false
	                },
	                border: [0, 0, 0, 0],
	                margin: [30, 19, 64, 100],
	                points: {
	                },
	                fill: '#fff',
	                style: {
	                    normal: {
	                        width: 1,
	                        color: '#f0f0f0'
	                    },
	                    emphasis: {
	                        color: '#e1e2e4',       // #197fcb
	                        width: 1,
	                        opacity: 1
	                    },
	                    invisible: {
	                        width: 0,
	                        opacity: 0
	                    }
	                },
	                gridRectStyle: {
	                    normal: {
	                        width: 0,
	                        opacity: 0,
	                        background: '#eee'
	                    },
	                    emphasis: {
	                        opacity: 0.6
	                    }
	                }
	            },
	            tooltip: {
	                show: false,
	                callbacks: {
	                    highlight: Util.noop,
	                    unhighlight: Util.noop
	                },
	                formatter: function (category, series, index) {
	                    var html = [];

	                    // 类目
	                    html.push('<p style="margin: 3px">' + category + '</p>');

	                    for (var i = 0; i < series.length; i++) {
	                        var serie = series[i];

	                        var value = serie.data[index];

	                        if (serie.tooltip && serie.tooltip.valueSuffix) {
	                            value = value + serie.tooltip.valueSuffix;
	                        }

	                        html.push(
	                            '<p style="margin: 5px 3px"><span style="font-weight: 600">'
	                            + serie.name
	                            + '</span>: '
	                            + value
	                            + '</p>'
	                        );
	                    }

	                    return html.join('');
	                }
	            }
	        },

	        gridLines: {},

	        gridRects: {},

	        eventPoint: {
	            x: 0, y: 0
	        },

	        activeItemIndex: undefined,

	        activeItemLine: undefined,

	        render: function(paper) {
	            this.paper = paper;
	            this.gridGroup = this.paper.group('hm-grid').toBack();

	            this.fillGrid();

	            this.getAxisPoints();

	            if (this.opts.tooltip.show) {
	                this.drawTooltip();
	            }
	        },

	        init: function () {
	        },

	        fillGrid: function () {
	            var gridOpts = this.opts.grid;

	            if (this.opts.hasBarSeries) {
	                this.drawGridRect(gridOpts.points);
	            }

	            if (gridOpts.fill && !/#fff|#ffffff/i.test(gridOpts.fill)) {
	                var gridWidth = gridOpts.width - 2;
	                var gridHeight = gridOpts.height - 2;

	                // 移动到 grid 起点
	                var path = [
	                    'M', gridOpts.x + 1, gridOpts.y + 1,
	                    'h', gridWidth,
	                    'v', gridHeight,
	                    'h', -gridWidth,
	                    'v', -gridHeight
	                ];

	                var gridFill = this.paper.path(path).attr({
	                    'fill': gridOpts.fill,
	                    'stroke-width': 0
	                });

	                this.gridGroup.push(gridFill);
	            }
	        },

	        getAxisPoints: function () {
	            var pointInfo = this.opts.grid.points;

	            if (pointInfo.left) {
	                this.drawGridLine('left', pointInfo.left);
	            }
	            else {
	                this.drawGridLine('right', pointInfo.right);
	            }

	            if (pointInfo.bottom) {
	                this.drawGridLine('bottom', pointInfo.bottom);
	            }
	            else {
	                this.drawGridLine('top', pointInfo.top);
	            }
	        },

	        drawGridRect: function (points) {
	            this.gridRects = {rect: null, data: []};

	            var gridOpts = this.opts.grid;

	            var xPoints = points['bottom'] || points['top'];
	            var xPointsPosition = points['bottom'] ? 'bottom' : 'top';

	            var yPoints = points['left'] || points['right'];
	            var yPointsPosition = points['left'] ? 'left' : 'right';

	            var width;
	            var height;
	            var categoryPoints;

	            var isHorizontal = Util.isHorizontal(gridOpts.categoryAxis);

	            if (isHorizontal) {
	                // category 是横轴
	                height = gridOpts.height;
	                categoryPoints = xPoints;
	            }
	            else {
	                // category 是纵轴
	                width = gridOpts.width;
	                categoryPoints = yPoints;
	            }

	            var rects = [];
	            var startX;
	            var startY;

	            for (var i = 1; i < categoryPoints.length; i++) {
	                var prev = categoryPoints[i - 1];
	                var current = categoryPoints[i];
	                var gridRect;
	                var gridRectHeight;

	                if (isHorizontal) {
	                    startX = prev.x + 1;
	                    startY = prev.y + 1;
	                    width = Math.abs(current.x - prev.x);

	                    // 如果 category 是底部横轴则需要修正起始点的 y 值，顶部横轴则不需要
	                    if (gridOpts.categoryAxis === 'bottom') {
	                        startY = startY - height + 1;
	                    }

	                    gridRectHeight = height - 3;
	                }
	                else {
	                    startX = prev.x + 1;
	                    startY = prev.y + 1;

	                    height = Math.abs(current.y - prev.y);

	                    // 如果 category 是右部纵轴则需要修正起始点的 x 值，左部纵轴则不需要
	                    if (gridOpts.categoryAxis === 'right') {
	                        startX = startX - width + 1;
	                    }

	                    gridRectHeight = height;
	                }

	                gridRectPath = ['M', startX, startY, 'l', width, 0, 'l', 0, gridRectHeight, 'l', -width, 0, 'l', 'z'];

	                this.gridRects.data.push(gridRectPath);
	            }
	        },

	        drawGridLine: function (type, points) {
	            var opts = this.opts;
	            var gridOpts = opts.grid;
	            var gridLineSetting = gridOpts.isShowGridLies;
	            var gridLineStyle = Util.convertPathAttr(gridOpts.style.normal);
	            var invisibleStyle = Util.convertPathAttr(gridOpts.style.invisible);

	            this.gridLines[type] = {
	                line: null,
	                data: []
	            };

	            var width;
	            var command;
	            var i = 0;
	            var pointLength = points.length;

	            var drawLine = function () {
	                if (width !== undefined && command !== undefined) {

	                    var path = [];
	                    var lineElement;

	                    for (i; i < pointLength; i++) {
	                        var line = [
	                            'M', Util.forceCrispEdges(points[i].x), Util.forceCrispEdges(points[i].y), command, width
	                        ];

	                        // 叠加到总的网格路径上
	                        path = path.concat(line);

	                        lineElement = {
	                            'path': line,
	                            'axisType': 'normal'
	                        };

	                        this.gridLines[type].data[i] = lineElement;
	                    }

	                    if (/left|right/.test(type) && gridLineSetting.horizontal
	                        || /bottom|top/.test(type) && gridLineSetting.vertical) {
	                        var mergedLines = this.paper.path(path).attr(gridLineStyle);
	                        this.gridGroup.push(mergedLines);
	                    }

	                    // 初始化 hover 时互动的线条
	                    if (type === gridOpts.categoryAxis) {
	                        var initInteractElement = this.drawInteractLine(['M', 0, 0]);
	                        if (this.opts.hasBarSeries) {
	                            var gridRectNormalStyle = Util.convertPathAttr(gridOpts.gridRectStyle.normal);
	                            this.gridRects.rect = initInteractElement.attr(gridRectNormalStyle);
	                        }
	                        else {
	                            this.gridLines[type].line = initInteractElement;
	                        }
	                    }
	                }
	            };

	            switch (type) {
	                case 'top':
	                    width = gridOpts.height;
	                    command = 'v';
	                    if (!gridOpts.border[1]) {
	                        this.addInvisibleLineInfo(type, points, pointLength - 1, command, width);
	                        pointLength--;
	                    }
	                    if (!gridOpts.border[3]) {
	                        this.addInvisibleLineInfo(type, points, 0, command, width);
	                        i++;
	                    }
	                    break;
	                case 'right':
	                    width = -gridOpts.width;
	                    command = 'h';
	                    if (!gridOpts.border[2]) {
	                        this.addInvisibleLineInfo(type, points, pointLength - 1, command, width);
	                        pointLength--;
	                    }
	                    if (!gridOpts.border[0]) {
	                        this.addInvisibleLineInfo(type, points, 0, command, width);
	                        i++;
	                    }
	                    break;
	                case 'bottom':
	                    width = -gridOpts.height;
	                    command = 'v';
	                    if (!gridOpts.border[1]) {
	                        this.addInvisibleLineInfo(type, points, pointLength - 1, command, width);
	                        pointLength--;
	                    }
	                    if (!gridOpts.border[3]) {
	                        this.addInvisibleLineInfo(type, points, 0, command, width);
	                        i++;
	                    }
	                    break;
	                case 'left':
	                    width = gridOpts.width;
	                    command = 'h';
	                    if (!gridOpts.border[2]) {
	                        this.addInvisibleLineInfo(type, points, pointLength - 1, command, width);
	                        pointLength--;
	                    }
	                    if (!gridOpts.border[0]) {
	                        this.addInvisibleLineInfo(type, points, 0, command, width);
	                        i++;
	                    }
	                    break;
	                default:
	            }

	            drawLine.call(this);
	        },

	        drawInteractLine: function (path) {
	            var invisibleStyle = Util.convertPathAttr(this.opts.grid.style.invisible);

	            var interactLine = this.paper.path(path).attr(invisibleStyle);

	            ClassManager.addClass(interactLine, 'hm-grid-interact');

	            this.gridGroup.push(interactLine);

	            return interactLine;
	        },

	        addInvisibleLineInfo: function (type, points, i, command, width) {
	            var path = ['M', points[i].x, points[i].y, command, width];

	            this.gridLines[type].data[i] = {
	                'path': path,
	                'axisType': 'invisible'
	            };
	        },

	        getGridLines: function (position) {
	            return this.gridLines[position];
	        },

	        drawTooltip: function () {
	            var gridOpts = this.opts.grid;

	            var gridMaskGroup = this.paper.group('hm-grid-mask');

	            var gridMask = this.paper
	                .rect(gridOpts.x + 1, gridOpts.y + 1, gridOpts.width - 2, gridOpts.height - 2)
	                .attr(Util.convertAreaAttr({borderColor: 'none', background: '#fff', opacity: 0}));

	            gridMaskGroup.push(gridMask)

	            this.mask = gridMaskGroup;

	            var categoryAxis = gridOpts.categoryAxis;
	            var categoryRectInfo = this.getCategoryRectInfo(categoryAxis);

	            var tipRectWidth = /bottom|top/.test(categoryAxis) ? gridOpts.width : gridOpts.height;

	            var rectWidth = tipRectWidth / categoryRectInfo.count;

	            var me = this;
	            var emphasisStyle = Util.convertPathAttr(gridOpts.style.emphasis);

	            gridMask.mousemove(function (event) {
	                var index;
	                var floorFix = me.opts.hasBarSeries ? 0 : 0.5;

	                var x = Raphael.vml ? event.x : event.layerX;
	                var y = Raphael.vml ? event.y : event.layerY;

	                // category 轴是 x 轴
	                if (/bottom|top/.test(categoryAxis)) {
	                    index = Math.floor((x - gridOpts.x) / rectWidth + floorFix);
	                }
	                else {
	                    // category 轴是 y 轴
	                    index = Math.floor((y - gridOpts.y) / rectWidth + floorFix);
	                }

	                // 当前需要高亮的项不变则直接返回
	                if (index === me.activeItemIndex) {
	                    return;
	                }
	                else {
	                    // 重置原高亮项
	                    me.unhighlightTooltip(categoryRectInfo);
	                }

	                // 如果超出了 category 的边界
	                if (index > categoryRectInfo.count || index < 0) {
	                    return;
	                }

	                me.eventPoint.x = x;
	                me.eventPoint.y = y;
	                me.activeItemIndex = index;

	                me.highlightTooltip(categoryRectInfo, emphasisStyle);
	            });

	            gridMask.mouseout(function () {
	                me.unhighlightTooltip(categoryRectInfo);
	                me.activeItemIndex = undefined;
	                me.activeItemLine = undefined;
	                me.eventPoint.x = 0;
	                me.eventPoint.y = 0;
	            });
	        },

	        highlightTooltip: function (categoryRectInfo, style) {
	            var index = this.activeItemIndex;

	            if (!this.opts.hasBarSeries) {
	                this.highlightLine(categoryRectInfo, index, style);
	            }
	            else {
	                this.highlightRect(categoryRectInfo, index, style);
	            }

	            // 最后调用上层回调
	            this.opts.tooltip.callbacks['highlight'](index, this.eventPoint);
	        },

	        highlightLine: function (categoryRectInfo, index, style) {
	            var interactLine = categoryRectInfo.lineInfo.line;

	            this.activeItemLine = interactLine;

	            // 获取需要被高亮线条的 path 信息
	            style.path = categoryRectInfo.lineInfo.data[index].path;

	            // 高亮该线条
	            interactLine.attr(style).show();
	        },

	        highlightRect: function (categoryRectInfo, index, style) {
	            var rects = this.gridRects;

	            var interactLine = rects.rect;
	            this.activeItemLine = interactLine;

	            // 目前为 bottom 是 category 的情况
	            if (index < rects.data.length) {
	                var path = rects.data[index];

	                var gridRectEmphasisStyle = Util.convertPathAttr(this.opts.grid.gridRectStyle.emphasis);
	                gridRectEmphasisStyle.path = path;

	                interactLine.attr(gridRectEmphasisStyle).show();
	            }
	        },

	        unhighlightTooltip: function (categoryRectInfo) {
	            var index = this.activeItemIndex;

	            if (index !== undefined) {
	                if (!this.opts.hasBarSeries) {
	                    this.unhighlightLine(categoryRectInfo, index);
	                }
	                else {
	                    this.unhighlightRect(categoryRectInfo, index);
	                }

	                // 最后调用上层回调
	                this.opts.tooltip.callbacks['unhighlight'](index, this.eventPoint);
	            }
	        },

	        unhighlightLine: function (categoryRectInfo, index) {
	            var element = categoryRectInfo.lineInfo.line;

	            element.hide();
	        },

	        unhighlightRect: function (categoryRectInfo, index) {
	            var rects = this.gridRects;

	            if (index < rects.data.length) {
	                rects.rect.hide();
	            }
	        },

	        /**
	         * 获取类目方块个数，数值应该是类目名数 - 1
	         */
	        getCategoryRectInfo: function (dir) {
	            var gridOpts = this.opts.grid;

	            var result = {
	                lineInfo: null,
	                count: 0
	            };

	            result.lineInfo = this.getGridLines(dir);
	            result.count = gridOpts.points[dir].length - 1;

	            return result;
	        },

	        updateMask: function (fn) {
	            this.mask[fn] && this.mask[fn]();
	        },

	        getActiveItemLine: function () {
	            return this.activeItemLine;
	        },

	        onGridHover: function () {
	            
	        },

	        update: function (settings) {
	        },

	        show: function () {
	        },

	        hide: function () {
	        },

	        _update: function (element, settings) {
	        }
	    };

	    return Grid;
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * @file hm-charts
	 * @author wumingdan(wumingdan@baidu.com)
	 * @contributor luodongyang(luodongyang@baidu.com)
	 */

	!(__WEBPACK_AMD_DEFINE_RESULT__ = function (require) {

	    var Util = __webpack_require__(1);

	    var ClassManager = __webpack_require__(6);

	    var ToolTip = {
	        defaults: {
	            style: {
	                backgroundColor: '#fff',
	                opacity: '0.8',
	                borderStyle: 'solid',
	                borderWidth: 1,
	                borderColor: '#00acec',
	                borderRadius: '4px',
	                left: '0px',
	                top: '0px',
	                width: '180px',
	                padding: [10, 8, 10, 8],
	                font: '12px/1.4 Microsoft Yahei, Helvetica, STHeitiSC-Light, Arial, sans-serif'
	            },
	            content: 'this is a tip'
	        },

	        _tip: null,

	        init: function () {
	            //this.render();
	        },

	        render: function(htmlPaper) {
	            this.paper = htmlPaper;

	            this.create();

	            this.show();
	        },

	        create: function () {
	            var opts = this.opts;

	            var tip = document.createElement('div');

	            ClassManager.addHtmlClass(tip, 'hm-charts-tooltip');

	            var me = this;

	            /**
	             * IE 11 - fix point-events
	             */
	            Util.event.on(tip, 'mouseover', function (event) {
	                me.show();
	            });

	            Util.event.on(tip, 'mouseout', function (event) {
	                me.hide();
	            });
	            /**
	             * IE 11 - fix point-events end
	             */

	            this._update(tip, opts);

	            this.paper.appendChild(tip);

	            this._tip = tip;

	            this.hide();
	        },

	        update: function (settings) {
	            this.show();

	            var me = this;

	            // to make the css animation work
	            // ui update first, then execute the following code
	            setTimeout(function () {
	                me._update(me._tip, settings);
	            }, 0);
	        },

	        show: function () {
	            if (Util.isLowerThanIE8) {
	                this._tip.style.display = '';
	            }
	            else {
	                this._tip.style.opacity = this.opts.style.opacity;
	            }
	        },

	        hide: function () {
	            if (Util.isLowerThanIE8) {
	                this._tip.style.display = 'none';
	            }
	            else {
	                this._tip.style.opacity = 0;
	            }
	        },

	        /**
	         * 暂时 tip 只支持偏移 5px
	         */
	        getTooltipPosition: function () {
	            var position = {
	                left: 0,
	                top: 0
	            };

	            var opts = this.opts;

	            var axisLayout = opts.axisLayoutInfo;

	            if (!axisLayout) {
	                return {
	                    left: opts.style.left,
	                    top: opts.style.top
	                }
	            }

	            // 如果图形的 category 是 x 轴
	            if (/bottom|top/.test(axisLayout.categoryAxis)) {
	                var tipWidth = parseInt(opts.style.width, 10)           // 宽度本身
	                    + parseInt(opts.style.borderWidth, 10) * 2          // border 宽度
	                    + opts.style.padding[1] + opts.style.padding[3];    // padding-left/padding-right

	                // top 默认为 grid 下方 40px 位置处
	                position.top = opts.eventInfo.point ? opts.eventInfo.point.y - 20 : opts.eventInfo.top - 20;
	                position.left = opts.eventInfo.left + tipWidth > (axisLayout.width + axisLayout.margin[3])
	                    ? opts.eventInfo.left - tipWidth -5
	                    : opts.eventInfo.left + 3;
	            }
	            // 图形的 category 是 y 轴
	            else {
	                position.top = opts.eventInfo.top - 20;
	                position.left = opts.eventInfo.point ? opts.eventInfo.point.x + 20 : opts.eventInfo.left + 20;
	            }

	            return position;
	        },

	        _update: function (element, settings) {
	            this.opts = Util.extend(this.defaults, settings);
	            var style = this.opts.style;

	            // 获取 tip 的 left/top
	            var position = this.getTooltipPosition();

	            element.style.cssText = 'position:absolute'
	                + ';font:' + style.font
	                + ';left:' + Util.fixUnitSuffixWithPX(position.left)
	                + ';top:' + Util.fixUnitSuffixWithPX(position.top)
	                + ';width:' + Util.fixUnitSuffixWithPX(style.width)
	                + ';border-width:' + Util.fixUnitSuffixWithPX(style.borderWidth)
	                + ';border-style:' + style.borderStyle
	                + ';border-color:' + style.borderColor
	                + ';border-radius:' + style.borderRadius
	                + ';padding-top:' + Util.fixUnitSuffixWithPX(style.padding[0])
	                + ';padding-right:' + Util.fixUnitSuffixWithPX(style.padding[1])
	                + ';padding-bottom:' + Util.fixUnitSuffixWithPX(style.padding[2])
	                + ';padding-left:' + Util.fixUnitSuffixWithPX(style.padding[3])
	                + ';background-color:' + style.backgroundColor
	                + ';opacity:' + style.opacity
	                + ';box-shadow:0 0 5px #999'
	                + ';transition:all .4s'
	                + ';pointer-events:none';

	            element.innerHTML = this.opts.content;

	            return element;
	        }
	    };

	    return ToolTip;
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * @file hm-charts
	 * @author wumingdan(wumingdan@baidu.com)
	 */

	!(__WEBPACK_AMD_DEFINE_RESULT__ = function (require) {

	    var Util = __webpack_require__(1);

	    var Legend = {
	        __name: 'legend',
	        defaults: {
	            legend: {
	                data: [],
	                type: 'line',
	                floating: true,
	                backgroundColor: '#fff',
	                opacity: '0.9',
	                borderStyle: 'solid',
	                borderWidth: '1px',
	                borderColor: '#fff',
	                borderRadius: '4px',
	                x: null,
	                y: null,
	                position: 'top-left',
	                padding: '5px 0px',
	                font: '13px/1.4 Microsoft Yahei, Helvetica, STHeitiSC-Light, Arial, sans-serif;',
	                callbacks: {
	                    highlight: Util.noop,
	                    unhighlight: Util.noop,
	                    select: Util.noop,
	                    unselect: Util.noop
	                }
	            }
	        },

	        iconMap: {
	            'line': '— ',
	            'square': '■ ',
	            'circle': '● ',
	            'defaults': '— '
	        },

	        _legend: null,

	        init: function () {
	        },

	        render: function(htmlPaper) {
	            this.paper = htmlPaper;

	            this.create();

	            this.bindEvents();
	        },

	        create: function () {
	            var opts = this.opts;

	            var legend = document.createElement('div');

	            this.initContainer();

	            this._update(legend, opts);

	            this.paper.appendChild(legend);

	            this._legend = legend;
	        },

	        update: function (settings) {
	            var me = this;

	            // to make the css animation work
	            // ui update first, then execute the following code
	            setTimeout(function () {
	                me._update(me._legend, settings);
	            }, 0);
	        },

	        bindEvents: function () {
	            var legends = this._legend.childNodes;
	            var me = this;

	            for (var i = 0; i < legends.length; i++) {
	                this.initHoverEvent(legends[i], i);

	                this.initClickEvent(legends[i], i);
	            }
	        },

	        initHoverEvent: function (ele, index) {
	            var me = this;
	            var callbacks = this.opts.legend.callbacks;

	            Util.event.on(ele, 'mouseover', function () {
	                Util.dom.setOpacity(this, 1);

	                // 只有在当前 serie 展示的时候促发回调
	                if (!this.className) {
	                    callbacks['highlight'](index);
	                }

	            });
	            Util.event.on(ele, 'mouseout', function () {
	                var className = this.className;

	                if (!className) {
	                    Util.dom.setOpacity(this, me.opts.legend.opacity);
	                    callbacks['unhighlight'](index);
	                }
	                else {
	                    Util.dom.setOpacity(this, 0.4);
	                }

	            });
	        },

	        initClickEvent: function (ele, index) {
	            var me = this;
	            var callbacks = this.opts.legend.callbacks;

	            Util.event.on(ele, 'click', (function (i) {
	                return function () {
	                    if (callbacks['unselect'] !== Util.noop || callbacks['select'] !== Util.noop) {
	                        // 获取当前点击元素 className
	                        var elementData = this.className;
	                        if (!elementData) {
	                            // 当前是显示，点击为不显示
	                            this.className = 'hm-html-legend-unselected';
	                            Util.dom.setOpacity(this, 0.4);
	                            callbacks['unselect'](index);
	                        }
	                        else {
	                            // 当前为不显示，点击为显示
	                            this.className = '';
	                            Util.dom.setOpacity(this, me.opts.legend.opacity);
	                            callbacks['select'](index);
	                        }
	                    }
	                };
	            })(index));
	        },

	        show: function () {
	            this._legend.style.display = '';
	        },

	        hide: function () {
	            this._legend.style.display = 'none';
	        },

	        initContainer: function () {
	            var opts = this.opts;

	            if (opts.axisLayoutInfo === undefined) {
	                opts.axisLayoutInfo = {};

	                opts.axisLayoutInfo.width = (this.paper.offsetWidth || this.paper.clientWidth) * 0.85;
	                opts.axisLayoutInfo.height = (this.paper.offsetHeight || this.paper.clientHeight) * 0.85;
	                opts.axisLayoutInfo.margin = [5, 5, 5, 5];
	            }
	        },

	        _update: function (element, settings) {
	            var opts = Util.extend(this.defaults, settings);

	            var axisLayoutInfo = opts.axisLayoutInfo;

	            element.style.cssText = 'position:absolute'
	                + ';width:' + opts.axisLayoutInfo.width + 'px'
	                + ';font:' + opts.legend.font
	                + ';left:' + axisLayoutInfo.margin[3] + 'px'
	                + ';top:10px'
	                + ';padding:' + opts.legend.padding
	                + ';background-color:' + opts.legend.backgroundColor + ';';

	            var textAlign = this.getLegendAlign(opts);
	            element.style.textAlign = textAlign;

	            element.innerHTML = this._buildLegendContent(opts.legend.data);

	            return element;
	        },

	        getLegendAlign: function (opts) {
	            if (opts.legend.align) {
	                return opts.legend.align;
	            }

	            var result = 'left';

	            switch (opts.legend.position) {
	                case 'top-left':
	                    result = 'left';
	                    break;
	                case 'top-center':
	                    result = 'center';
	                    break;
	                case 'top-right':
	                    result = 'right';
	                    break;
	                default:
	                    throw new Error(this.__name, ': unsupported alignment');
	                    break;
	            }

	            return result;
	        },

	        _buildLegendContent: function (legends) {
	            var html = [];
	            var legend;

	            var iconMap = this.iconMap;

	            for (var i = 0; i < legends.length; i++) {
	                legend = legends[i];

	                var shape;

	                switch (legend.type) {
	                    case 'bar':
	                        shape = iconMap.square;
	                        break;
	                    case 'stack-bar':
	                        shape = iconMap.square;
	                        break;
	                    case 'area':
	                        shape = iconMap.square;
	                        break;
	                    case 'circle':
	                        shape = iconMap.circle;
	                        break;
	                    case 'square':
	                        shape = iconMap.square;
	                        break;
	                    case 'line':
	                        shape = iconMap.line;
	                        break;
	                    default:
	                        shape = iconMap.defaults;
	                }

	                if (legend.isHidden) {
	                    html.push(
	                        '<span style="display:inline-block;margin-right:10px;opacity:0.4" class="hm-html-legend-unselected">'
	                    );
	                }
	                else {
	                    html.push(
	                        '<span style="display:inline-block;margin-right:10px;opacity:'
	                        + this.opts.legend.opacity + '">'
	                    );
	                }

	                html.push('<label style="color:' + legend.color + ';">' + shape + '</label>');
	                html.push('<label style="cursor:pointer">' + legend.name + '</label>');
	                html.push('</span>');
	            }

	            return html.join('');
	        }
	    };

	    return Legend;
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * @file hm-charts
	 * @author wumingdan(wumingdan@baidu.com)
	 */

	!(__WEBPACK_AMD_DEFINE_RESULT__ = function (require) {

	    var Util = __webpack_require__(1);

	    var DataAdapter = {
	        _format: function (num) {
	            String(num).replace(/./g, function(c, i, a) {
	                return i && c !== "." && ((a.length - i) % 3 === 0) ? ',' + c : c;
	            });
	        },

	        formatNumber: function (num) {
	            if (num == null) {
	                return '';
	            }
	            if (num == '--') {
	                return num;
	            }
	            if (isNaN(parseFloat(num))) {
	                return num;
	            }

	            return DataAdapter._format(num);
	        },

	        formatRatio: function (num) {
	             if (num == null) {
	                return '';
	            }
	            if (num == '--') {
	                return num;
	            }
	            if (isNaN(parseFloat(num))) {
	                return num;
	            }
	            return DataAdapter._format(num) + '%';
	        },

	        formatTime: function (second, type) {
	            var dd, hh, mm, ss, result;
	            if (second == '--') {
	                return second;
	            }

	            if (type == 2) {
	                // 时间的另一种表示法： 22'11"
	                mm = second / 60 | 0;
	                ss = Math.round(second) - mm * 60;
	                var ret = "";
	                if (mm) {
	                    ret += mm + "&#039;";
	                }
	                ret += ss + "&quot;";
	                return ret;
	            }

	            // 先处理天
	            dd = second / (24 * 3600) | 0;
	            second = Math.round(second) - dd * 24 * 3600;
	            // 接着是小时
	            hh = second / 3600 | 0;
	            second = Math.round(second) - hh * 3600;
	            // 之后是分
	            mm = second / 60 | 0;
	            // 最后是秒
	            ss = Math.round(second) - mm * 60;

	            if (Math.round(dd) < 10) {
	                dd = dd > 0 ? '0' + dd : '';
	            }
	            if (Math.round(hh) < 10) {
	                hh = '0' + hh;
	            }
	            if (Math.round(mm) < 10) {
	                mm = '0' + mm;
	            }
	            if (Math.round(ss) < 10) {
	                ss = '0' + ss;
	            }
	            if (dd) {
	                result = dd + ' ' + hh + ':' + mm + ':' + ss;
	            } else {
	                result = hh + ':' + mm + ':' + ss;
	            }
	            return result;
	        },

	        getFormatter: function (type) {
	            switch (type) {
	                case "number": return DataAdapter.formatNumber;
	                case "ratio": return DataAdapter.formatRatio;
	                case 'time': return DataAdapter.formatTime;
	                case 'time2':
	                    return function (text) {
	                        return DataAdapter.formatTime(text, 2);
	                    };
	            }

	            return function (text) {
	                if (text == null) {
	                    return '';
	                }
	                return text;
	            };
	        },

	        getUnits: function (fields) {
	            var units = [1];

	            // 暂不支持多单位
	            // TODO 支持 homes 的多单位

	            return units;
	        },

	        convertGridData: function (data, options) {
	            var yAxis = data.yAxis;
	            var xAxis = data.xAxis;

	            for (var i = 0; i < data.series.length; i++) {
	                var serie = data.series[i];

	                // 确定此条 series 属于 x 还是 y
	                if (serie.yAxis !== undefined) {
	                    var serieYAxis = (serie.yAxis - 1) || 0;

	                    if (yAxis[serieYAxis] !== undefined) {
	                        if (yAxis[serieYAxis].data === undefined) {
	                            yAxis[serieYAxis].data = [];
	                        }
	                        yAxis[serieYAxis].data.push(serie.data);
	                    }
	                }
	                else if (serie.xAxis !== undefined) {
	                    var serieXAxis = (serie.xAxis - 1) || 0;

	                    if (xAxis[serieXAxis] !== undefined) {
	                        if (xAxis[serieXAxis].data === undefined) {
	                            xAxis[serieXAxis].data = [];
	                        }
	                        xAxis[serieXAxis].data.push(serie.data);
	                    }
	                }
	            }

	            return data;

	            //if (units && units.length > 1) {
	            //    if (data.yAxis[0].type != 'category') {
	            //        data.yAxis[1] = Util.cloneObject(options.yAxis[0]);
	            //        data.yAxis[1].position = 'right';
	            //        data.grid.right = options.grid.left;
	            //    }
	            //    if (data.xAxis[0].type != 'category') {
	            //        data.xAxis[1] = Util.cloneObject(options.xAxis[0]);
	            //        data.xAxis[1].position = 'top';
	            //    }
	            //}


	        },

	        convertPolarData: function (data, options) {
	            var yAxis = data.yAxis;
	            var xAxis = data.xAxis;

	            for (var i = 0; i < data.series.length; i++) {
	                var serie = data.series[i];

	                if (yAxis.data === undefined) {
	                    yAxis.data = [];
	                }

	                yAxis.data.push(serie.data);
	            }

	            return data;

	            //if (units && units.length > 1) {
	            //    if (data.yAxis[0].type != 'category') {
	            //        data.yAxis[1] = Util.cloneObject(options.yAxis[0]);
	            //        data.yAxis[1].position = 'right';
	            //        data.grid.right = options.grid.left;
	            //    }
	            //    if (data.xAxis[0].type != 'category') {
	            //        data.xAxis[1] = Util.cloneObject(options.xAxis[0]);
	            //        data.xAxis[1].position = 'top';
	            //    }
	            //}


	        }

	    };

	    return DataAdapter;
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * @file hm-charts
	 * @author wumingdan(wumingdan@baidu.com)
	 */

	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function(require) {

	    var Holiday = {
	        weekdays: ['星期日','星期一','星期二','星期三', '星期四','星期五','星期六'],

	        holidays: {
	            '元旦节': /(^2011\/01\/0[1-3]$)|(^2012\/01\/0[1-3]$)|(^2013\/01\/0[1-3]$)|(^2014\/01\/01$)|(^201[5-6]\/01\/0[1-3]$)/,
	            '春节': /(^2011\/02\/0[2-8]$)|(^2012\/01\/2[2-8]$)|(^2013\/02\/(09|1[0-5])$)|(^2014\/((01\/31)|(02\/0[1-6]))$)|(^2015\/(02\/(1[8-9]|2[0-4]))$)|(^2016\/(02\/(0[7-9]|1[0-3]))$)/,
	            '情人节': /02\/14$/,
	            '愚人节': /04\/01$/,
	            '清明节': /(^2011\/04\/0[3-5]$)|(^2012\/04\/0[2-4]$)|(^2013\/04\/0[4-6]$)|(^2014\/04\/0[5-7]$)|(^2015\/04\/0[4-6]$)|(^2016\/04\/0[2-4]$)/,
	            '劳动节': /(^2011\/(04\/30|05\/0[12])$)|(^201[2-3]\/(04\/(29|30)|05\/01)$)|(^201[4-5]\/05\/0[1-3]$)|(^2016\/(04\/30|05\/0[1-2])$)/,
	            '儿童节': /06\/01$/,
	            '端午节': /(^2011\/06\/0[4-6]$)|(^2012\/06\/2[2-4]$)|(^2013\/06\/1[0-2]$)|(^2014\/((05\/31)|(06\/0[1-2]))$)|(^2015\/06\/2[0-2]$)|(^2016\/06\/(09|1[0-1])$)/,
	            '建军节': /08\/01$/,
	            '中秋节': /(^2011\/09\/1[0-2]$)|(^2012\/09\/30$)|(^2013\/09\/(19|2[0-1])$)|(^2014\/09\/0[6-8]$)|(^2015\/09\/2[6-7]$)|(^2016\/09\/1[5-7]$)/,
	            '国庆节': /10\/0[1-7]$/,
	            '圣诞节': /12\/25$/
	        },

	        isHoliday: function (datestr) {
	            if (typeof datestr != 'string') {
	                return null;
	            }

	            // 验证日期格式是否正确
	            if (!datestr.match(/^(\d{4})[\/|-](0[1-9]|1[0-2])[\/|-](\d{2})$/)) {
	                return null;
	            }

	            datestr = datestr.replace(/-/g, '/');

	            var holidays = Holiday.holidays;
	            var weekdays = Holiday.weekdays;

	            var d = new Date(Date.parse(datestr));
	            var result;

	            // 判断是否是节日
	            for (var name in holidays) {
	                var holidayReg = holidays[name];

	                if (datestr.match(holidayReg)) {
	                    result = name;
	                }
	            }

	            // 判断是否是周末
	            if (!result && (d.getDay() == 0 || d.getDay() == 6)) {
	                result = weekdays[d.getDay()];
	            }

	            return result;
	        }
	    };

	    return Holiday;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * @file hm-charts
	 * @author wumingdan(wumingdan@baidu.com)
	 */

	!(__WEBPACK_AMD_DEFINE_RESULT__ = function (require) {
	    var Util = __webpack_require__(1);

	    var Animate = {
	        requestAnimationFrame: window.requestAnimationFrame || (function() {
	            var timeLast = 0;

	            return window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function(callback) {
	                var timeCurrent = (new Date()).getTime();
	                var timeDelta;

	                /* Dynamically set the delay on a per-tick basis to more closely match 60fps. */
	                /* Technique by Erik Moller. MIT license: https://gist.github.com/paulirish/1579671. */
	                timeDelta = Math.max(0, 16 - (timeCurrent - timeLast));
	                timeLast = timeCurrent + timeDelta;

	                return setTimeout(function() {
	                    callback(timeCurrent + timeDelta);
	                }, timeDelta);
	            };
	        })(),

	        animate: function (element, prop, ms, fn, cb) {
	            return element.stop().animate(prop, ms, fn, cb);
	        },

	        progressivelyDrawLine: function (paper, path, attr, ms, cb) {
	            // 完整 path 先设置为`不可见`
	            var fullPath = paper.path(path).attr({
	                stroke: 'none', fill: 'none'
	            });

	            // 分段 path
	            var stepPath = paper.path(fullPath.getSubpath(0, 1)).attr(attr);

	            // 总长度
	            var fullLength = fullPath.getTotalLength();

	            var st = new Date().getTime();

	            var result = stepPath;

	            var step = function () {
	                var elapsedTime = new Date().getTime() - st;
	                var stepLength = elapsedTime / ms * fullLength;
	                var subPath = fullPath.getSubpath(0, stepLength);

	                stepPath.attr({path: subPath});

	                if (elapsedTime >= ms) {
	                    if (cb != undefined) cb();
	                    fullPath.remove();
	                }
	                else {
	                    Animate.requestAnimationFrame.call(window, step);
	                }
	            };

	            Animate.requestAnimationFrame.call(window, step);

	            return result;
	        },

	        /**
	         * dir 为该矩形所在的类目轴，即配置 type 为 category 轴的 position 相反值
	         * 例如 position 为 bottom 则此处 dir 为 top，也就是动画展现的方向
	         */
	        rectGlow: function (paper, rectInfo, dir, ms, fn, cb) {
	            var rect;
	            var prop;

	            switch (dir) {
	                case 'top':
	                    rect = paper
	                        .rect(rectInfo.x, rectInfo.y + rectInfo.height, rectInfo.width, 0)
	                        .attr(rectInfo.style);

	                    prop = {
	                        y: rectInfo.y,
	                        height: rectInfo.height
	                    };
	                    break;
	                case 'right':
	                    rect = paper
	                        .rect(rectInfo.x, rectInfo.y, 0, rectInfo.height)
	                        .attr(rectInfo.style);

	                    prop = {
	                        width: rectInfo.width
	                    };
	                    break;
	                case 'left':
	                    rect = paper
	                        .rect(rectInfo.x + rectInfo.width, rectInfo.y, 0, rectInfo.height)
	                        .attr(rectInfo.style);

	                    prop = {
	                        x: rectInfo.x,
	                        width: rectInfo.width
	                    };
	                    break;
	                case 'bottom':
	                    rect = paper
	                        .rect(rectInfo.x, rectInfo.y, rectInfo.width, 0)
	                        .attr(rectInfo.style);

	                    prop = {
	                        height: rectInfo.height
	                    };
	                    break;
	                default:
	            }

	            return Animate.animate(rect, prop, ms, fn, cb);
	        },

	        detach: function (element, angle, ms, fn, cb, pad) {
	            var rad = Util.rad(angle);

	            pad = pad || 5;

	            var translate = 't' + pad * Math.cos(rad) + ',' + pad * Math.sin(rad);

	            var prop = { transform: translate };

	            return Animate.animate(element, prop, ms, fn, cb);
	        },



	        pointList: function (paper, points, lineStyle, ms) {
	            //var start = paper.path('M' + points[0] + ',' + points[1]);

	            //lineStyle && start.attr(lineStyle);

	            //var anim = Raphael.animation({ points: 'M' + points.join() },
	            //    ms,
	            //    "<>",
	            //    (function (seriesEls, index) {
	            //        return function(){
	            //            for (var m = 0; m < seriesEls[index].length; m++) {
	            //                seriesEls[index][m][0].attr({ opacity: 1 });
	            //            }
	            //        }
	            //    })(seriesEls, index)
	            //);

	            //pathEl = start.animate(anim);
	        }
	    }

	    return Animate;
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));




/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * @file 饼状图
	 * @author wumingdan(wumingdan@baidu.com)
	 */

	!(__WEBPACK_AMD_DEFINE_RESULT__ = function (require) {

	    var Chart = __webpack_require__(2);
	    var Util = __webpack_require__(1);
	    var Format = __webpack_require__(12);
	    var Animate = __webpack_require__(19);
	    var Legend = __webpack_require__(16);
	    var Tooltip = __webpack_require__(15);

	    var Resources = __webpack_require__(10);
	    var ClassManager = __webpack_require__(6);

	    var Pie = {
	        defaults: {
	            __name: 'pie',
	            style: {
	                colors: Resources.colorInfo.pieColors,
	                defaultColor: '#e6e6e6',
	                pieAttr: {
	                    'stroke': 'none',
	                    'shape-rendering': 'crispEdges',
	                    'stroke-width': 0
	                },
	                donutAttr: {
	                     'stroke': "#fff",
	                    'stroke-width': 2,
	                    'shape-rendering': 'crispEdges',
	                    'fill': '#fff'
	                }
	            },
	            radius: 130,
	            cx: 0,
	            cy: 0,
	            plotOptions: {
	                pie: {
	                    //allowPointSelect: true,
	                    cursor: 'default',
	                    dataLabels: {
	                        enabled: true,
	                        showType: 'name',   // data or value
	                        showLabelNumber: 3,
	                        color: '#000',
	                        connectorColor: '#f00',
	                        style: {
	                            'font-size': '12px'
	                        }
	                    },
	                    indexLabes: {
	                        enabled: false,
	                        style: {
	                            'stroke':  'none',
	                            'fill': '#fff',
	                            'font-size': 21
	                        },
	                        'padding': 112
	                    },
	                    margin: [50, 50, 50, 50],
	                    animate: {
	                        dur: 500,
	                        fn: '>'
	                    }
	                }
	            },
	            tooltip: true
	        },

	        sectors: [],

	        donutSectors: [],

	        indexLabels: [],

	        sectorLabels: [],

	        legends: [],

	        sectorsStatus: 0,

	        render: function (data) {
	            this.initContext();

	            if (data !== undefined) {
	                this._data = data;
	            }

	            this.opts = Util.extend(this.opts, this._data);

	            // 设置默认值，比如用户将半径设置为 0
	            this.opts.radius = this.opts.radius || 100;
	            var isDonut = this.isDonut();;
	            var outerRadius = isDonut ? this.opts.radius[0] : this.opts.radius;

	            this.opts.cx = this.opts.cx || outerRadius * 1.2 + this.opts.plotOptions.pie.margin[3];
	            this.opts.cy = this.opts.cy || outerRadius * 1.1 + this.opts.plotOptions.pie.margin[0];

	            // 转化数据
	            var data = this.convertData();

	            // 绘制图形
	            this.draw(data);
	        },

	        initContext: function () {
	            this.clearPaper();

	            this.sectors = [];
	            this.donutSectors = [];
	            this.indexLabels = [];
	            this.sectorLabels = [];
	            this.legends = [];
	            this.sectorsStatus = 0;
	        },

	        draw: function (data) {
	            this.data = data;

	            this.drawPie(data);

	            // draw labels
	            if (this.opts.plotOptions.pie.dataLabels.enabled) {
	                this.drawPieLabels(data);
	            }

	            // legend
	            if (this.opts.plotOptions.pie.showInLegend) {
	                this.drawPieLegend(data);
	            }
	        },

	        drawPie: function (series) {
	            this.serieGroup = this.paper.group('hm-series-group');

	            this.sectorsStatus = 0;

	            var piePlotOpts = this.opts.plotOptions.pie;
	            var serie = series[0];

	            var angle = 270;
	            var total = serie.total;

	            var cx = this.opts.cx;
	            var cy = this.opts.cy;

	            var primitiveRadius = this.opts.radius;

	            // 是否是甜甜圈
	            var isDonut = this.isDonut();
	            var radius = isDonut ? primitiveRadius[0] : primitiveRadius;
	            var backRadius = (isDonut ? primitiveRadius[1] : 0) || 0;

	            // 是否显示扇形序号
	            var isShowSectorIndex = piePlotOpts.indexLabes.enabled;

	            var pieAttr = this.opts.style.pieAttr;
	            var donutAttr = this.opts.style.donutAttr;
	            piePlotOpts.cursor && (pieAttr.cursor = piePlotOpts.cursor);

	            var me = this;

	            var items = serie.data;

	            for (var i = 0; i < items.length; i++) {
	                this.legends[i] = {};
	                var pie = items[i];

	                var fill = this.getFillColor(i);

	                pieAttr.fill = fill;
	                this.legends[i].type = 'bar';
	                this.legends[i].name = pie.name;
	                this.legends[i].color = fill;

	                pie.percentage = (pie.value / total * 100).toFixed(2) + '%';

	                var anglePlus = (pie.value / total) * 360;
	                var popAngle = angle + (anglePlus / 2);

	                var sector = undefined;
	                var backSector = undefined;
	                var indexLabel = undefined;

	                if (anglePlus > 0) {
	                    // 0 < anglePlus < 360, sectors
	                    // animation enabled
	                    if (anglePlus < 360 && this.isAnitamtionEnaled()) {
	                        var animateOpts = this.opts.plotOptions.pie.animate;

	                        // 主扇形
	                        sector = this.drawSector(cx, cy, 1, angle, angle + anglePlus).attr(pieAttr);

	                        // 甜甜圈时背景扇形
	                        isDonut && (backSector = this.drawSector(cx, cy, 1, angle, angle + anglePlus).attr(donutAttr));

	                        // 主扇形动画
	                        Animate.animate(
	                            sector,
	                            {piePath: [cx, cy, radius, angle, angle + anglePlus]},
	                            animateOpts.dur,
	                            animateOpts.fn,
	                            (function(sector, index){
	                                return function(){
	                                    me.showSectorLabel.call(me, index);

	                                    me.bindHoverHighlight(sector, index);
	                                    if (me.indexLabels[index]) {
	                                        me.indexLabels[index].attr({opacity: 1});
	                                        me.bindHoverHighlight(me.indexLabels[index], index);
	                                    }

	                                    sector.data('drawReady', 1);
	                                };
	                            }(sector, i))
	                        );

	                        // 甜甜圈扇形动画
	                        isDonut && Animate.animate(
	                            backSector,
	                            {piePath: [cx, cy, backRadius, angle, angle + anglePlus]},
	                            animateOpts.dur,
	                            animateOpts.fn
	                        );

	                        // 显示扇形序号文字
	                        if (isShowSectorIndex && anglePlus > 14) {
	                            indexLabel = this.drawSectorIndex(i, Raphael.rad(angle + anglePlus / 2), true);
	                        }
	                    }
	                    else{
	                        // anglePlus 为 360 时只有一条数据占比为 100%，绘制圆形
	                        if (anglePlus === 360) {
	                            sector = this.paper.circle(cx, cy, radius);
	                            isDonut && (backSector = this.paper.circle(cx, cy, backRadius).attr(donutAttr));
	                            isShowSectorIndex && (indexLabel = this.drawSectorIndex(i, Raphael.rad(180)));
	                        }
	                        // 此处 anglePlus 为 0 - 360 之间，但是无动画的扇形绘制
	                        else {
	                            sector = this.drawSector(cx, cy, radius, angle, angle + anglePlus);
	                            isDonut && (backSector = this.drawSector(cx, cy, backRadius, angle, angle + anglePlus)
	                                .attr(donutAttr));
	                            if (isShowSectorIndex && anglePlus > 14) {
	                                indexLabel = this.drawSectorIndex(i, Raphael.rad(angle + anglePlus / 2));
	                            }
	                        }

	                        sector.attr(pieAttr);
	                        sector.data('drawReady', 1);

	                        me.bindHoverHighlight(sector, i);
	                        indexLabel && me.bindHoverHighlight(indexLabel, i);
	                    }
	                }

	                // 保存扇区相关信息
	                sector.data('data', {
	                    fill: fill, pieData: pie,
	                    angle: {
	                        start: angle,
	                        end: angle + anglePlus,
	                        popAngle: popAngle
	                    }, name: serie.name
	                });

	                // 添加对应 class
	                ClassManager.addSerieClass(sector, i);
	                this.sectors.push(sector);
	                this.serieGroup.push(sector);

	                if (isDonut && backSector) {
	                    ClassManager.addClass(backSector, 'hm-back-serie', i);
	                    this.donutSectors.push(backSector);
	                    this.serieGroup.push(backSector);
	                }

	                if (isShowSectorIndex && indexLabel) {
	                    ClassManager.addClass(indexLabel, 'hm-serie-label', i);
	                    this.indexLabels.push(indexLabel);
	                    this.serieGroup.push(indexLabel);
	                }

	                angle += anglePlus;
	            }
	        },

	        bindHoverHighlight: function (element, index) {
	            element.hover(
	                this.highLight.call(this, index),
	                this.unHighLight.call(this, index)
	            );
	        },

	        drawSectorIndex: function (index, angle, isHide) {
	            var indexLabelOpts = this.opts.plotOptions.pie.indexLabes;
	            var radius = this.opts.radius;
	            var indexLabel;

	            if (indexLabelOpts.enabled) {
	                var indexPadding = indexLabelOpts['padding'] || ((this.isDonut() ? radius[0] : radius) / 2);

	                var indexAttr = indexLabelOpts.style;

	                var indexX = this.opts.cx + indexPadding * Math.cos(angle);
	                var indexY = this.opts.cy + indexPadding * Math.sin(angle);

	                indexLabel = this.paper.text(indexX, indexY, index + 1).attr(indexAttr);

	                if (isHide) {
	                    indexLabel.attr({opacity: 0});
	                }
	            }

	            return indexLabel;
	        },

	        drawSector: function (cx, cy, radius, angle, angleTo) {
	            var sector = this.paper.path().attr({
	                piePath: [cx, cy, radius, angle, angleTo]
	            });

	            return sector;
	        },

	        drawPieLabels: function (data) {
	            this.serieLabelGroup = this.paper.group('hm-data-labels');

	            var serie = data[0];
	            var sectors = this.sectors;

	            var dataLabelSettings = this.opts.plotOptions.pie.dataLabels;

	            var showNumber = this.getLabelAndLegendNumber(serie);
	            var labelColor = dataLabelSettings.color;
	            var labelConnectorColor = dataLabelSettings.connectorColor;
	            var showType = dataLabelSettings.showType === undefined ? 'name' : dataLabelSettings.showType;

	            var cx = this.opts.cx;
	            var cy = this.opts.cy;
	            var radius = this.isDonut() ? this.opts.radius[0] : this.opts.radius;

	            // label 从圆弧中间点往外的长度
	            var labelDelta = 15;
	            // 当扇区角度都偏小且在一起时需要做纵轴坐标的调整
	            var yAdjustment = 0;

	            // label 在圆弧中间的起点坐标
	            var startX;
	            var startY;

	            // label 转弯时的坐标
	            var endX;
	            var endY;

	            // label 转弯后偏移方向，主要区别是正和负
	            var finalX;

	            // 文字的坐标和对其
	            var textX;
	            var textY;
	            var textAnchor;

	            for (var i = 0; i < showNumber; i++) {
	                var sector = sectors[i];

	                var sectorInfo = sector.data('data');
	                var sectorColor = sectorInfo.fill || dataLabelSettings.connectorColor;

	                var sectorAngleInfo = sectorInfo.angle;
	                var sectorMiddleAngle = (sectorAngleInfo.end - sectorAngleInfo.start) / 2 + sectorAngleInfo.start;
	                var cosRad = Math.cos(Raphael.rad(sectorMiddleAngle));
	                var sinRad = Math.sin(Raphael.rad(sectorMiddleAngle));

	                // 计算当前起点信息
	                startX = cx + radius * cosRad;
	                startY = cy + radius * sinRad;

	                // 计算当前扇区是否角度过小需要调整 label y 方向的坐标
	                if (sectorAngleInfo.end - sectorAngleInfo.start < 10) {
	                    yAdjustment += 15;
	                }
	                else {
	                    // 重置当前调整高度
	                    yAdjustment = 0;
	                }

	                // 计算 label 转弯时坐标值
	                endX = labelDelta * cosRad;
	                endY = labelDelta * sinRad;

	                // 初步的文字坐标信息
	                textX = startX + endX;
	                textY = startY + endY;

	                // 更具圆弧所在象限，决定 label 横向是向左还是向右
	                if (sectorMiddleAngle >= 0 && sectorMiddleAngle <= 90
	                    || sectorMiddleAngle >= 270 && sectorMiddleAngle <= 360) {
	                    // 第一和第四象限
	                    finalX = labelDelta;
	                    textX += labelDelta + 2;
	                    textAnchor = 'start';
	                    endY = endY + yAdjustment;
	                    textY = textY + yAdjustment;
	                }
	                else {
	                    // 第二和第三象限
	                    finalX = -labelDelta;
	                    textX -= labelDelta + 2;
	                    textAnchor = 'end';
	                    endY = endY - yAdjustment;
	                    textY = textY - yAdjustment;
	                }

	                var sectorLabelSt = this.paper.set();

	                var sectorLabelLine = this.paper.path(['M', startX, startY, 'l', endX, endY, 'l', finalX, 0])
	                    .attr({'stroke': sectorColor});

	                var sectorLabelTextContent = sectorInfo.pieData[showType] || sectorInfo.pieData.name;

	                var sectorLabelText = this.paper
	                    .text(textX, textY, sectorLabelTextContent)
	                    .attr(dataLabelSettings.style)
	                    .attr({'text-anchor': textAnchor, 'fill': sectorColor, 'title': sectorLabelTextContent});

	                sectorLabelSt.push(sectorLabelLine);

	                sectorLabelSt.push(sectorLabelText);

	                this.isAnitamtionEnaled() && sectorLabelSt.attr('opacity', 0);

	                this.sectorLabels.push(sectorLabelSt);

	                this.serieLabelGroup.push(sectorLabelLine);
	                this.serieLabelGroup.push(sectorLabelText);
	            }
	        },

	        drawPieLegend: function (data) {
	            var serie = data[0];

	            var showNumber = this.getLabelAndLegendNumber(serie);

	            var settings = Util.extend(
	                { legend: this.opts.legend },
	                {
	                    legend: {
	                        data: this.legends,
	                        callbacks: {
	                            highlight: Util.bind(this.highlightSector, this),
	                            unhighlight: Util.bind(this.unHighLightSector, this)
	                            // 以下2个交互待实现
	                            //select: Util.bind(this.selectSerie, this),
	                            //unselect: Util.bind(this.unselectSerie, this)
	                        }
	                    },
	                    axisLayoutInfo: this.axisLayoutInfo
	                }
	            );

	            this._legend = Chart.createComponent(Legend, settings);
	            this._legend.render(this.htmlPaper);
	        },

	        getLabelAndLegendNumber: function (serie) {
	            var dataLabelSettings = this.opts.plotOptions.pie.dataLabels;

	            return dataLabelSettings.showLabelNumber > serie.data.length
	                ? serie.data.length : dataLabelSettings.showLabelNumber;
	        },

	        highlightSector: function (index) {
	            var sector = this.sectors[index];
	            var donutSector = this.donutSectors[index];
	            var indexLabel = this.indexLabels[index];

	            if (sector.data('drawReady') === 1) {
	                var shapeData = sector.data('data');

	                // handle tip
	                if (this.opts.tooltip) {
	                    this._showTooltip.call(this, sector, shapeData);
	                }

	                // handle sctor animation
	                var angle = shapeData.angle.popAngle;

	                sector && Animate.detach(sector, angle, 300);
	                donutSector && Animate.detach(donutSector, angle, 300);
	                indexLabel && Animate.detach(indexLabel, angle, 300);
	            }
	        },

	        unHighLightSector: function (index) {
	            var sector = this.sectors[index];
	            var donutSector = this.donutSectors[index];
	            var indexLabel = this.indexLabels[index];

	            if (sector.data('drawReady') === 1) {
	                this.tooltip && this.tooltip.hide();

	                sector && Animate.animate(sector, {'transform': ''}, 300);
	                donutSector && Animate.animate(donutSector, {'transform': ''}, 300);
	                indexLabel && Animate.animate(indexLabel, {'transform': ''}, 300);
	            }
	        },

	        highLight: function (index) {

	            var me = this;

	            return function () {
	                me.highlightSector(index);
	            };
	        },

	        unHighLight: function (index) {
	            var me = this;

	            return function () {
	                me.unHighLightSector(index);
	            };
	        },

	        _showTooltip: function (sector, shapeData) {
	            var pieName = shapeData.name;

	            var sectorName = shapeData.pieData.name;
	            var indicator = sectorName
	                + ': '
	                + Format.number(shapeData.pieData.value)
	                + '（'
	                + shapeData.pieData.percentage
	                + '）';

	            var content = pieName
	                + '<br>' + indicator;

	            var container = this.container;
	            var bbox = sector.getBBox();
	            var left = (bbox.x + bbox.x2) / 2 + container.offsetLeft;
	            var top = (bbox.y + bbox.y2) / 2 + container.offsetTop;

	            var tipSettings = {
	                content: content,
	                style: {
	                    borderColor: shapeData.fill,
	                    left: left,
	                    top: top
	                }
	            };

	            if (!this.tooltip) {
	                this.tooltip = Chart.createComponent(Tooltip, tipSettings);
	                this.tooltip.render(this.htmlPaper);
	                this.tooltip.show();
	            }
	            else {
	                this.tooltip.update(tipSettings);
	            }
	        },

	        showSectorLabel: function (index) {
	            this.sectorLabels[index] && this.sectorLabels[index].animate({
	                'opacity': 1
	            }, 500);
	        },

	        convertData: function () {
	            var results = [];

	            var series = this._data.series;

	            if (!Util.isArray(series)) {
	                throw new Error(this.opts.__name, ': series is incorrect');
	            }

	            var serie;
	            for (var i = 0; i < series.length; i++) {
	                var serieInfo = {};
	                serie = series[i];

	                if (serie.type === this.opts.__name) {
	                    serieInfo.name = serie.name;
	                    serieInfo.type = serie.type;
	                    serieInfo.total = 0;
	                    serieInfo.data = [];

	                    var data = serie.data;

	                    for (var j = 0; j < data.length; j++) {
	                        serieInfo.total += data[j].value;

	                        serieInfo.data.push({
	                            name: data[j].name,
	                            value: data[j].value
	                        });
	                    }
	                }

	                results.push(serieInfo);
	            }

	            return results;
	        },

	        getFillColor: function (index) {
	            var colors = this.opts.style.colors;

	            if (!colors[index]) {
	                return this.opts.style.defaultColor;
	            }

	            return colors[index];
	        },

	        isAnitamtionEnaled: function () {
	            return this.opts.plotOptions.pie.animate && !Chart.isVML;
	        },

	        isDonut: function () {
	            return Util.isArray(this.opts.radius);
	        }
	    };

	    return Pie;

	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * @file 堆积图
	 * @author wumingdan(wumingdan@baidu.com)
	 */

	!(__WEBPACK_AMD_DEFINE_RESULT__ = function (require) {

	    var Chart = __webpack_require__(2);
	    var Util = __webpack_require__(1);
	    var Format = __webpack_require__(12);
	    var Axis = __webpack_require__(8);
	    var Grid = __webpack_require__(14);
	    var Tooltip = __webpack_require__(15);
	    var Legend = __webpack_require__(16);
	    var dataAdapter = __webpack_require__(17);

	    var Animate = __webpack_require__(19);

	    var Raphael = __webpack_require__(3);

	    var StackBar = {
	        defaults: {
	            __name: 'stack-bar',
	            dataAdapter: 'convertGridData',
	            animate: {
	                enabled: true,
	                dur: 500,
	                easing: '>'
	            },
	            hasBarSeries: true,
	            // 线条颜色
	            color: ['#00acec', '#75cf48', '#fcbc2a', '#516e95', '#2ba362','#e9a840','#bbb','#9457e6', '#a8c656'],
	            itemStyle: {
	                normal: {
	                    lineStyle: {
	                        width: 2
	                    },
	                    dotStyle: {
	                        borderColor: '#fff', borderWidth: 2, radius: 4, hasHollow: true
	                    }
	                },
	                emphasis: {
	                    dotStyle: {
	                        borderColor: '#aaa', borderWidth: 1, radius: 4, hasHollow: false
	                    }
	                }
	            },
	            tooltip: {
	                show: true,
	                formatter: function (stacks, index, categoryList) {
	                    var html = [];

	                    // 类目，目前只有一条类目轴，所以直接取第一根线的内容
	                    var category = categoryList && categoryList[index];
	                    html.push('<p style="margin: 3px;font-weight: 600;">' + category + '</p>');

	                    for (var stackName in stacks) {
	                        if (stacks.hasOwnProperty(stackName)) {
	                            var stack = stacks[stackName];

	                            for (var i = 0; i < stack.length; i++) {
	                                var stackBar = stack[i];

	                                var color = stackBar.color;
	                                var name = stackName !== 'auto' ? stackName + ' - ' + stackBar.name : stackBar.name;

	                                var value = Format.number(stackBar.data) + stackBar.suffix;

	                                html.push(
	                                    '<p style="margin: 5px 3px"><span style="color:'
	                                    + color + ';">'
	                                    + name
	                                    + ': </span>'
	                                    + value
	                                    + '</p>'
	                                );
	                            }
	                        }
	                    }

	                    return html.join('');
	                }
	            }
	        },

	        lines: [],

	        categoryLabels: [],

	        legends: [],

	        stackCount: 0,

	        /**
	         * 堆积信息，结构比较复杂，具体如下
	         * | Array  | Object    | Array  | Object                                                                    |
	         * |        |           | stack1 | [属于stack1的serie1中category1信息, 属于stack1的serie2中category1信息, ...] |
	         * |        | category1 |  ····· |
	         * |        |           | stackN | [属于stackN的serie1中category1信息, 属于stackN的serie2中category1信息, ...] |
	         * |        | ········· | ······ |
	         * |        |           | stack1 | [属于stack1的serie1中category2信息, 属于stack1的serie2中category2信息, ...] |
	         * | stacks | category2 | ······ |
	         * |        |           | stackN | [属于stackN的serie1中category2信息, 属于stackN的serie2中category2信息, ...] |
	         * |        | ········· | ······ |
	         * |        |           | stack1 | [属于stack1的serie1中category3信息, 属于stack1的serie2中category3信息, ...] |
	         * |        | category3 | ······ |
	         * |        |           | stackN | [属于stackN的serie1中category3信息, 属于stackN的serie2中category3信息, ...] |
	         */
	        stacks: [],

	        axisLayoutInfo: null,

	        stackIndex: 0,

	        render: function (data) {
	            if (data !== undefined) {
	                this._data = data;
	            }

	            this.convertDataToOptions();

	            this.draw();

	            // 图例
	            this.drawLegend();
	        },

	        clearPaper: function () {
	            this.hideTooltip();
	            this.paper.clear();
	        },

	        initContext: function () {
	            this.clearPaper();

	            this.stacks = [];

	            this.stackIndex = 0;

	            this.legends = [];

	            this.lines = [];

	            this.serieGroups = [];
	        },

	        draw: function () {
	            this.convertStackBarData();

	            this.initContext();

	            // 坐标系
	            this._axis = Chart.createComponent(Axis, Util.cloneObject(this.opts));
	            this._axis.render(this.paper);

	            this.axisLayoutInfo = this._axis.getAxisLayout();
	            this.categoryLabels = this._axis.getCategoryLabels();

	            // 网格
	            this.drawGrid();

	            // 数据部分
	            this.drawSeries();
	        },

	        drawSeries: function () {
	            var stacksData = this.stacksData;
	            var linePoints = [];

	            this.stackIndex = 0;

	            for (var stackName in stacksData) {
	                if (stacksData.hasOwnProperty(stackName)) {
	                    this.processSingleStack(stackName, stacksData[stackName], this.stackIndex);
	                    this.stackIndex++;
	                }
	            }

	            // 所有元素绘制完毕之后做必要的元素位置调整
	            this.reviseCanvas();
	        },

	        /**
	         * 处理同一种堆积类型
	         */
	        processSingleStack: function (stackName, stackInfo, stackIndex) {
	            // 堆积图目前并不支持多 value 轴 - 参见 hightcharts
	            // 所以此处目前默认是找出类目轴之后确定 value 轴
	            var axisLayoutInfo = this.axisLayoutInfo;
	            var categoryAxis = axisLayoutInfo.categoryAxis;
	            var position = Util.isHorizontal(categoryAxis) ? 'left' : 'bottom';

	            // 首先获取值轴的数据信息
	            var axisDataInfo = this._axis['_v_axis'] && this._axis['_v_axis'].getAxisValueInfo(position) || {};
	            var max = axisDataInfo.max || 5;
	            var min = axisDataInfo.min || 0;

	            // 再获取值周的 tick 点信息
	            var tickPoints = this.getReferenceAxisPoint(position);

	            if (max !== undefined && min !== undefined && axisLayoutInfo) {

	                // 循环 category 轴上 tick 点而不是直接循环各个 stack 可以降低代码逻辑复杂性
	                for (var i = 0; i < tickPoints.length; i++) {
	                    // 初始化类目上堆积信息
	                    if (this.stacks[i] === undefined) {
	                        // 当前类目上此堆积的信息
	                        this.stacks[i] = {};
	                    }

	                    if (!this.stacks[i].hasOwnProperty(stackName)) {
	                        // 当前类目当前堆积上堆积柱的信息
	                        this.stacks[i][stackName] = [];
	                    }

	                    // 首先获取当前堆积类型的 category 坐标信息
	                    var currentPoint = undefined;
	                    var prevPoint = undefined;

	                    // 处理当前类目下需要展示的所有堆积信息
	                    // 遍历堆积类型
	                    for (var j = 0; j < stackInfo.length; j++) {
	                        var data = stackInfo[j].data[i];
	                        if (isNaN(data)) {
	                            throw Error(this.opts.__name, ': Axis value is NaN');
	                        }

	                        currentPoint = this.getStackBarPoint(tickPoints[i], axisDataInfo, data, position, prevPoint);

	                        var stackBar = {
	                            name: stackInfo[j].name,
	                            color: stackInfo[j].color,
	                            suffix: stackInfo[j].tooltip && stackInfo[j].tooltip.valueSuffix || '',
	                            globalSeriesIndex: stackInfo[j].globalSeriesIndex,
	                            data: data,
	                            prevPoint: prevPoint,
	                            currentPoint: currentPoint
	                        };

	                        var bar = this.drawStackBar(stackBar, tickPoints);

	                        stackBar.bar = bar;
	                        this.stacks[i][stackName].push(stackBar);
	                        prevPoint = currentPoint;

	                    }
	                }
	            }
	        },

	        drawStackBar: function (stackBar, tickPoints) {
	            var color = stackBar.color;

	            var rectPath;

	            var rectStartX;
	            var rectStartY;

	            var barWidth = this.calcBarWidth(this.stackCount, tickPoints);

	            var rectInfo = this.getBarRectInfo(stackBar.currentPoint, barWidth, stackBar.prevPoint);

	            var bar;

	            var barRealStyle = Util.convertPathAttr({
	                background: color,
	                width: 0
	            });

	            if (!this.isAnitamtionEnaled()) {
	                bar = this.paper
	                    .rect(rectInfo.x, rectInfo.y, rectInfo.width, rectInfo.height)
	                    .attr(barRealStyle);
	            }
	            else {
	                rectInfo.style = barRealStyle;

	                bar = Animate.rectGlow(
	                    this.paper, rectInfo,
	                    Util.getReverseDirection(this.axisLayoutInfo.categoryAxis),
	                    this.opts.animate.dur, this.opts.animate.easing
	                );
	            }

	            this.getStackSerieGroup(stackBar.globalSeriesIndex).push(bar);

	            return bar;
	        },

	        getStackSerieGroup: function (index) {
	            this.serieGroups = this.serieGroups || [];

	            if (this.serieGroups['serieGroup' + index] === undefined) {
	                this.serieGroups['serieGroup' + index] = this.paper.group('hm-series hm-series-' + index);
	            }

	            return this.serieGroups['serieGroup' + index];
	        },

	        getStackBarPoint: function (tickPoint, axisValueInfo, pointData, position, prevPoint) {
	            var max = axisValueInfo.max;
	            var min = axisValueInfo.min;
	            var axisLayoutInfo = this.axisLayoutInfo;

	            var point = {
	                x: 0,
	                y: 0
	            }
	            var avaliableSpace = 0;

	            switch (position) {
	                case 'top':
	                    avaliableSpace = axisLayoutInfo.width;
	                    point.x = prevPoint !== undefined
	                        ? prevPoint.x + avaliableSpace / (max - min) * pointData
	                        : axisLayoutInfo.x + avaliableSpace / (max - min) * pointData;
	                    point.y = tickPoint.y;
	                    break;
	                case 'right':
	                    avaliableSpace = axisLayoutInfo.height;
	                    point.x = tickPoint.x;
	                    point.y = prevPoint !== undefined
	                        ? prevPoint.y - avaliableSpace / (max - min) * pointData
	                        : axisLayoutInfo.y + axisLayoutInfo.height - avaliableSpace / (max - min) * pointData;
	                    break;
	                case 'bottom':
	                    avaliableSpace = axisLayoutInfo.width;
	                    point.x = prevPoint !== undefined
	                        ? prevPoint.x + avaliableSpace / (max - min) * pointData
	                        : axisLayoutInfo.x + avaliableSpace / (max - min) * pointData;
	                    point.y = tickPoint.y;
	                    break;
	                case 'left':
	                    avaliableSpace = axisLayoutInfo.height;
	                    point.x = tickPoint.x;
	                    point.y = prevPoint !== undefined
	                        ? prevPoint.y - avaliableSpace / (max - min) * pointData
	                        : axisLayoutInfo.y + axisLayoutInfo.height - avaliableSpace / (max - min) * pointData;
	                    break;
	                default:
	            }

	            return point;
	        },

	        groupStacks: function (series) {
	            var stacks = {};
	            this.stackCount = 0;

	            for (var i = 0; i < series.length; i++) {
	                series[i].color = this.opts.color[i % this.opts.color.length];
	                series[i].globalSeriesIndex = i;

	                var stackType = series[i].stack || 'auto';

	                if (series[i].isHidden !== true) {
	                    if (!stacks.hasOwnProperty(stackType)) {
	                        stacks[stackType] = [];
	                        this.stackCount++;
	                    }

	                    stacks[stackType].push(series[i]);
	                }
	            }

	            return stacks;
	        },

	        getBarRectInfo: function (dot, barWidth, prevPoint) {
	            if (/bottom|top/.test(this.axisLayoutInfo.categoryAxis)) {
	                return this.getVerticalBarRectInfo(dot, barWidth, prevPoint);
	            }
	            else {
	                return this.getHorizontalBarRectInfo(dot, barWidth, prevPoint);
	            }
	        },

	        getVerticalBarRectInfo: function (dot, barWidth, prevPoint) {
	            var totalBarCount = this.stackCount;
	            var currentBarIndex = this.stackIndex;
	            var referenceHeight = this.axisLayoutInfo.height + this.axisLayoutInfo.margin[0];

	            if (prevPoint !== undefined && !isNaN(prevPoint.y)) {
	                referenceHeight = prevPoint.y;
	            }

	            // 第一个 bar 的 x 计算公式如下
	            // bar0.x = dot.x - (count / 2) * barWidth - (count - 1) / 8 * barWidth
	            // 第 N 个 bar 的 x 则为 bar.x = bar0.x + (1 + 1/4) * barWidth * (N - 1)
	            var startX = dot.x - (totalBarCount / 2) * barWidth - ((totalBarCount - 1) / 8 * barWidth);

	            var currentX = startX + 5 / 4 * barWidth * currentBarIndex;

	            return {
	                x: currentX,
	                y: dot.y,
	                width: barWidth,
	                height: referenceHeight - dot.y
	            };
	        },

	        getHorizontalBarRectInfo: function (dot, barWidth, prevPoint) {
	            var totalBarCount = this.stackCount;
	            var currentBarIndex = this.stackIndex;

	            var rectWidth = dot.x - this.axisLayoutInfo.margin[3] - 1;

	            if (prevPoint !== undefined && !isNaN(prevPoint.x)) {
	                rectWidth = dot.x - prevPoint.x;
	            }

	            var startY = dot.y - (totalBarCount / 2) * barWidth - ((totalBarCount - 1) / 8 * barWidth);

	            var currentY = startY + 5 / 4 * barWidth * currentBarIndex;

	            return {
	                x: dot.x,
	                y: currentY,
	                height: barWidth,
	                width: rectWidth
	            };
	        },

	        calcBarWidth: function (rectCount, linePoints) {
	            if (/bottom|top/.test(this.axisLayoutInfo.categoryAxis)) {
	                return this.calcVerticalBarWidth(rectCount, linePoints);
	            }
	            else {
	                return this.calcHorizontalBarWidth(rectCount, linePoints);
	            }
	        },

	        calcHorizontalBarWidth: function (rectCount, linePoints) {
	            // 兼容只有一个 category 的情况 - TODO
	            var barWidth;

	            var width = linePoints[1].y - linePoints[0].y;

	            barWidth = width / (5 * rectCount / 3 + 1/3);

	            return barWidth;
	        },

	        calcVerticalBarWidth: function (rectCount, linePoints) {
	            // 兼容只有一个 category 的情况 - TODO
	            var barWidth;

	            // 默认 bar 之间的间隔是 bar 宽度的 1/4
	            // 假设 category 的宽度是 width，bar 的个数是 x，则符合以下公式
	            // width = x * barWidth + (x + 1) * barWidth / 4
	            // barWidth = width / (5 * x / 4 + 1/4)
	            // 20160119：间隔调整为 1/3

	            var width = linePoints[1].x - linePoints[0].x;

	            barWidth = width / (5 * rectCount / 3 + 1/3);

	            return barWidth;
	        },

	        getReferenceAxisPoint: function (position) {
	            var tickPoints = this._axis['_c_axis'] && this._axis['_c_axis'].getTickPoints();

	            var categoryAxis = this.axisLayoutInfo.categoryAxis;
	            var isCategoryHorizontal = /bottom|top/.test(categoryAxis);

	            var refAxisPoints = Util.cloneObject(tickPoints[categoryAxis]);

	            for (var i = 0; i < refAxisPoints.length - 1; i++) {
	                if (isCategoryHorizontal) {
	                    refAxisPoints[i].x = (refAxisPoints[i].x + refAxisPoints[i + 1].x) / 2;
	                }
	                else {
	                    refAxisPoints[i].y = (refAxisPoints[i].y + refAxisPoints[i + 1].y) / 2;
	                }
	            }

	            refAxisPoints.pop();

	            return refAxisPoints;
	        },

	        drawGrid: function () {
	            var vAxis = this._axis['_v_axis'] && this._axis['_v_axis'].tickPoints || {};
	            var cAxis = this._axis['_c_axis'] && this._axis['_c_axis'].tickPoints || {};

	            var gridOpts = {
	                hasBarSeries: true,     // 默认按照柱状图的网格
	                grid: Util.extend(Util.extend({
	                    points: {
	                        'top': cAxis.top || vAxis.top,
	                        'right': cAxis.right || vAxis.right,
	                        'bottom': cAxis.bottom || vAxis.bottom,
	                        'left': cAxis.left || vAxis.left
	                    }
	                }, this.axisLayoutInfo), this.opts.grid)
	            };

	            if (this.opts.tooltip) {
	                gridOpts.tooltip = Util.extend({
	                    show: true,
	                    callbacks: {
	                        highlight: Util.bind(this.highLightTooltip, this),
	                        unhighlight: Util.bind(this.unhighLightTooltip, this)
	                    }
	                }, this.opts.tooltip);

	                gridOpts._data = this._data;
	            }

	            this._grid = Chart.createComponent(Grid, gridOpts);

	            this._grid.render(this.paper);
	        },

	        /**
	         * 部分需要调整前后的图层
	         */
	        reviseCanvas: function () {
	            // 柱和线同时存在时将线条置顶
	            var seriesTypeDetail = this.opts.seriesTypeDetail;
	            if (seriesTypeDetail && seriesTypeDetail.line > 0 && seriesTypeDetail.bar > 0) {
	                for (var i = 0; i < this.lines.length; i++) {
	                    if (this.lines[i].type === 'line') {
	                        this.lines[i].path.toFront();
	                        this.lines[i].pointsSt.toFront();
	                    }
	                }
	            }

	            // tooltip 所需 mask 需要在最前面
	            if (this.opts.tooltip.show) {
	                this._grid && this._grid.updateMask('toFront');
	            }
	        },

	        drawLegend: function () {
	            if (this.opts.legend !== undefined) {

	                for (var i = 0; i < this.opts.series.length; i++) {
	                    var serie = this.opts.series[i];

	                    this.legends.push({
	                        name: serie.name,
	                        color: serie.color,
	                        type: serie.type,
	                        isHidden: serie.isHidden
	                    });
	                }

	                var settings = Util.extend(
	                    { legend: this.opts.legend },
	                    {
	                        legend: {
	                            data: this.legends,
	                            callbacks: {
	                                highlight: Util.bind(this.highLightSerie, this),
	                                unhighlight: Util.bind(this.unHighLightSerie, this),
	                                select: Util.bind(this.selectSerie, this),
	                                unselect: Util.bind(this.unselectSerie, this)
	                            }
	                        },
	                        axisLayoutInfo: this.axisLayoutInfo
	                    }
	                );

	                this._legend = Chart.createComponent(Legend, settings);
	                this._legend.render(this.htmlPaper);
	            }
	        },

	        /* tooltip 交互函数 */

	        highLightTooltip: function (index, eventPoint) {
	            var stacks = this.stacks[index];

	            var glowAttr = {
	                opacity: 0.3,
	                width: 3
	            };

	            // 高亮所有类型的堆积
	            for (var stackName in stacks) {
	                if (stacks.hasOwnProperty(stackName)) {
	                    var stack = stacks[stackName];

	                    for (var i = 0; i < stack.length; i++) {
	                        var stackBar = stack[i];

	                        if (!stackBar.isHidden) {
	                            glowAttr.color = stackBar.color;
	                            stackBar['stackBarGlow'] = stackBar.bar.glow(glowAttr);
	                        }
	                    }
	                }
	            }

	            this.showTooltip(index, eventPoint);
	        },

	        unhighLightTooltip: function (index) {
	            var stacks = this.stacks[index];

	            for (var stackName in stacks) {
	                if (stacks.hasOwnProperty(stackName)) {
	                    var stack = stacks[stackName];

	                    for (var i = 0; i < stack.length; i++) {
	                        stack[i]['stackBarGlow'] && stack[i]['stackBarGlow'].remove();
	                    }
	                }
	            }

	            this.hideTooltip(index);
	        },

	        showTooltip: function (index, eventPoint) {
	            var opts = this.opts;
	            var stacks = this.stacks[index];

	            var content = opts.tooltip.formatter(stacks, index, this.categoryLabels);

	            var lineBoundingRect = Util.getBoundingClientRect(this._grid.getActiveItemLine());

	            var tipSettings = {
	                content: content,
	                style: {
	                    padding: [5, 10, 5, 10]
	                },
	                eventInfo: {
	                    point: eventPoint,
	                    left: lineBoundingRect.left,
	                    top: lineBoundingRect.top
	                },
	                axisLayoutInfo: this.axisLayoutInfo
	            };

	            if (!this.tooltip) {
	                this.tooltip = Chart.createComponent(Tooltip, tipSettings);
	                this.tooltip.render(this.htmlPaper);
	                this.tooltip.show();
	            }
	            else {
	                this.tooltip.update(tipSettings);
	            }
	        },

	        hideTooltip: function (index) {
	            this.tooltip && this.tooltip.hide();
	        },

	        /* end tooltip 交互函数 */

	        /* legend 交互函数 */
	        highLightSerie: function (index) {
	            this.changeStackBarOpacity(index, 0.8);
	        },

	        unHighLightSerie: function (index) {
	            this.changeStackBarOpacity(index, 1);
	        },

	        changeStackBarOpacity: function (serieIndex, opacity) {
	            var stacks = this.stacks;

	            for (var i = 0; i < stacks.length; i++) {
	                var stack = stacks[i];

	                for (var stackName in stack) {
	                    if (stack.hasOwnProperty(stackName)) {
	                        var singleStack = stack[stackName];

	                        for (var j = 0; j < singleStack.length; j++) {
	                            if (singleStack[j].globalSeriesIndex === serieIndex) {
	                                singleStack[j].bar.attr({'opacity': opacity});
	                                break;
	                            }
	                        }
	                    }

	                    // 此处还可以 break 一下，但往往 stack 种类比较少，所以为了代码清晰暂时不处理了吧
	                }
	            }
	        },

	        selectSerie: function (index) {
	            this.opts.series[index].isHidden = false;

	            this.draw();
	        },

	        unselectSerie: function (index) {
	            this.opts.series[index].isHidden = true;

	            this.draw();
	        },

	        toggleStackSerie: function (serieIndex, isHidden) {
	            var stacks = this.stacks;

	            for (var i = 0; i < stacks.length; i++) {
	                var stack = stacks[i];

	                for (var stackName in stack) {
	                    if (stack.hasOwnProperty(stackName)) {
	                        var singleStack = stack[stackName];

	                        for (var j = 0; j < singleStack.length; j++) {
	                            if (singleStack[j].globalSeriesIndex === serieIndex) {
	                                singleStack[j].isHidden = isHidden;
	                                break;
	                            }
	                        }
	                    }

	                    // 此处还可以 break 一下，但往往 stack 种类比较少，所以为了代码清晰暂时不处理了吧
	                }
	            }
	        },

	        /* end legend 交互函数 */

	        convertDataToOptions: function () {
	            var opts = this.opts;

	            if (opts.dataAdapter
	                && Util.isFunction(dataAdapter[opts.dataAdapter])) {
	                this.opts = Util.extend(opts, dataAdapter[opts.dataAdapter](this._data));
	            }

	            // 保存原始的 value 数组
	            if (this.opts.xAxis && this.opts.xAxis[0] && this.opts.xAxis[0].type === 'value') {
	                this.originalValueAxis = Util.cloneObject(this.opts.xAxis[0].data);
	            }
	            else if (this.opts.yAxis && this.opts.yAxis[0] && this.opts.yAxis[0].type === 'value') {
	                this.originalValueAxis = Util.cloneObject(this.opts.yAxis[0].data);
	            }
	        },

	        convertStackBarData: function () {
	            var opts = this.opts;

	            // 获取堆积分组信息
	            var stacks = this.groupStacks(opts.series);
	            this.stacksData = stacks;

	            // 添加虚假 series 信息（按分组求和的虚假 serie，以便绘制正确的坐标轴）
	            var additionalVirtualSeries = [];
	            for (var name in stacks) {

	                var virtualSerie = [];

	                if (stacks.hasOwnProperty(name)) {
	                    for (var i = 0; i < stacks[name].length; i++) {
	                        var serie = stacks[name][i];

	                        for (var j = 0; j < serie.data.length; j++) {
	                            if (virtualSerie[j] === undefined) {
	                                virtualSerie[j] = serie.data[j];
	                            }
	                            else {
	                                virtualSerie[j] += serie.data[j];
	                            }
	                        }
	                    }
	                }

	                additionalVirtualSeries.push(virtualSerie);
	            }

	            // 由于堆积图目前只支持单横轴或单纵轴，所以直接取数组第一项
	            if (this.opts.xAxis && this.opts.xAxis[0] && this.opts.xAxis[0].type === 'value') {
	                this.opts.xAxis[0].data = (Util.cloneObject(this.originalValueAxis)).concat(additionalVirtualSeries);
	            }
	            else if (this.opts.yAxis && this.opts.yAxis[0] && this.opts.yAxis[0].type === 'value') {
	                this.opts.yAxis[0].data = (Util.cloneObject(this.originalValueAxis)).concat(additionalVirtualSeries);
	            }
	        },

	        isAnitamtionEnaled: function () {
	            return this.opts.animate.enabled && !Chart.isVML;
	        }

	    };

	    return StackBar;

	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * @file 雷达图
	 * @author wumingdan(wumingdan@baidu.com)
	 */

	!(__WEBPACK_AMD_DEFINE_RESULT__ = function (require) {

	    var Chart = __webpack_require__(2);
	    var Util = __webpack_require__(1);
	    var Format = __webpack_require__(12);
	    var Animate = __webpack_require__(19);
	    var Legend = __webpack_require__(16);
	    var Tooltip = __webpack_require__(15);
	    var dataAdapter = __webpack_require__(17);

	    var Polar = __webpack_require__(23);
	    var Resources = __webpack_require__(10);

	    var Radar = {
	        defaults: {
	            __name: 'radar',
	            dataAdapter: 'convertPolarData',
	            style: {
	                colors: Resources.colorInfo.radarColors,
	                defaultColor: '#e6e6e6'
	            },
	            radius: 150,
	            cx: 0,
	            cy: 0,
	            plotOptions: {
	                radar: {
	                    //allowPointSelect: true,
	                    cursor: 'default',
	                    dataLabels: {
	                        enabled: true,
	                        showLabelNumber: 3,
	                        color: '#000',
	                        connectorColor: '#f00'
	                    },
	                    margin: [50, 50, 50, 50],
	                    animate: {
	                        dur: 500,
	                        fn: 'linear'
	                    },
	                    style: {
	                        lineStyle: {
	                            width: 2
	                        },
	                        dotStyle: {
	                            borderColor: '#fff', borderWidth: 2, radius: 3
	                        },
	                        area: {
	                            'fill-opacity': 0.2
	                        },
	                        bar: {
	                            'fill-opacity': 0.9,
	                            'stroke-width': 0
	                        }
	                    }
	                }
	            },
	            tooltip: {
	                show: true,
	                style: {},
	                callbacks: {
	                    highlight: Util.noop,
	                    unhighlight: Util.noop
	                },
	                formatter: function (series, categoryInfo, index) {
	                    var html = [];

	                    // 类目，目前只有一条类目轴，所以直接取第一根线的内容
	                    var category = categoryInfo[index].name;
	                    html.push('<p style="margin: 3px;font-weight: 600;">' + category + '</p>');

	                    for (var i = 0; i < series.length; i++) {
	                        var serie = series[i];

	                        if (!serie.isHidden) {
	                            var value = serie.tickData[index];
	                            var color = serie.color || '#000';

	                            if (serie.tooltip && serie.tooltip.valueSuffix) {
	                                value = Format.number(value) + serie.tooltip.valueSuffix;
	                            }

	                            html.push(
	                                '<p style="margin: 5px 3px"><span style="color:'
	                                + color + ';">'
	                                + serie.name
	                                + ': </span>'
	                                + value
	                                + '</p>'
	                            );
	                        }
	                    }

	                    return html.join('');
	                }
	            }
	        },

	        series: [],

	        categoryInfo: [],

	        axisLayoutInfo: {},

	        legends: [],

	        isStack: false,

	        seriesDrawingIndex: 0,

	        render: function (data) {
	            if (data !== undefined) {
	                this._data = data;
	            }

	            this.opts = Util.extend(this.opts, this._data);

	            this.convertDataToOptions();

	            this.draw();

	            // 图例
	            this.drawLegend();
	        },

	        initContext: function () {
	            this.paper.clear();

	            this.series = [];

	            this.seriesDrawingIndex = 0;

	            this.categoryInfo = [];

	            this.axisLayoutInfo = {};
	        },

	        draw: function () {
	            this.initContext();

	            this.convertData();

	            this.initPloar();

	            // 绘制线条
	            this.drawSeries();
	        },

	        initPloar: function () {
	            var radarOpts = this.opts.plotOptions.radar;

	            var polarOpts = Util.extend(
	                Util.cloneObject(this.opts),
	                {
	                    axisLayout: {
	                        radius: radarOpts.radius,
	                        margin: radarOpts.margin
	                    },
	                    tooltip: Util.extend(
	                        this.opts.tooltip,
	                        {
	                            callbacks: {
	                                highlight: Util.bind(this.highlightValueAxis, this),
	                                unhighlight: Util.bind(this.unhighlightValueAxis, this)
	                            }
	                        }
	                    ),
	                    isStack: this.isStack
	                }
	            );
	            this._polar = Chart.createComponent(Polar, polarOpts);
	            this._polar.render(this.paper);

	            this.axisLayoutInfo = this._polar.getAxisLayout();
	        },

	        drawSeries: function () {
	            var series = this.opts.series;

	            this.categoryInfo = this._polar && this._polar.getCategoryInfo();

	            this.seriesDrawingIndex = 0;

	            var rawSeries = this._rawSeries;

	            var typeList = ['Bar', 'Line', 'Area'];

	            for (var i = 0; i < typeList.length; i++) {
	                var type = typeList[i].toLowerCase();

	                if (rawSeries[type] !== undefined) {
	                    this['draw' + typeList[i] + 'Series'] && this['draw' + typeList[i] + 'Series'](rawSeries[type]);
	                }
	            }

	            // 所有元素绘制完毕之后做必要的元素位置调整
	            this.reviseCanvas();
	        },

	        addSerieLegend: function (serie, index) {
	            var legendItem = {
	                name: serie.name,
	                color: serie.color,
	                type: serie.type
	            };

	            if (index !== undefined) {
	                this.legends[index] = legendItem;
	            }
	            else {
	                this.legends.push();
	            }
	        },

	        drawBarSeries: function (series) {
	            var tmpSeries = Util.cloneObject(series);

	            var lastDataRecorder;

	            // 预处理堆积数据
	            for (var i = 0; i < tmpSeries.length; i++) {
	                var serie = series[i];
	                var color = this.getFillColor(this.seriesDrawingIndex);

	                serie.color = color;

	                var tmpSerie = tmpSeries[i];
	                tmpSerie.color = color;
	                tmpSerie.globalSerieIndex = this.seriesDrawingIndex;
	                tmpSerie.rawData = Util.cloneObject(tmpSerie.data);

	                if (lastDataRecorder === undefined) {
	                    lastDataRecorder = new Array(tmpSerie.data.length);
	                }

	                if (tmpSerie.isHidden !== true) {
	                    for (var j = 0; j < tmpSerie.data.length; j++){
	                        lastDataRecorder[j] = lastDataRecorder[j] === undefined
	                            ? tmpSerie.data[j] : lastDataRecorder[j] + tmpSerie.data[j];

	                        tmpSerie.data[j] = lastDataRecorder[j];
	                    }
	                }

	                this.seriesDrawingIndex++;
	            }

	            for (var i = tmpSeries.length - 1; i >= 0; i--) {
	                var tmpSerie = tmpSeries[i];

	                if (tmpSerie.isHidden !== true) {
	                    this.drawSeriesToBar(tmpSerie.globalSerieIndex, tmpSerie);
	                }

	                // 这里有一个问题：legeng 中 bar 的显示顺序会和用户数据相反，因为我们为了显示效果倒序绘制的 bar
	                // 问题本身比较小，所以暂时先无视这个问题
	                this.addSerieLegend(tmpSerie, tmpSerie.globalSerieIndex);
	            }
	        },

	        drawAreaSeries: function (series) {
	            for (var i = 0; i < series.length; i++) {
	                var serie = series[i];

	                var color = this.getFillColor(this.seriesDrawingIndex);
	                serie.color = color;

	                this.drawSeriesToArea(this.seriesDrawingIndex, serie);

	                this.addSerieLegend(serie, this.seriesDrawingIndex);
	                this.seriesDrawingIndex++;
	            }
	        },

	        drawLineSeries: function (series) {
	            for (var i = 0; i < series.length; i++) {
	                var serie = series[i];

	                var color = this.getFillColor(this.seriesDrawingIndex);
	                serie.color = color;

	                this.drawSeriesToLine(this.seriesDrawingIndex, serie);

	                this.addSerieLegend(serie, this.seriesDrawingIndex);
	                this.seriesDrawingIndex++;
	            }
	        },

	        drawSeriesToLine: function (serieIndex, serie) {
	            var radarOpts = this.opts.plotOptions.radar;

	            var color = serie.color;

	            var dotStyle = Util.convertAreaAttr(radarOpts.style.dotStyle);
	            var lineStyle = Util.convertPathAttr(radarOpts.style.lineStyle);

	            dotStyle.stroke = color;
	            dotStyle.fill = color;

	            if (this.isAnitamtionEnaled()) {
	                dotStyle.r = 0;
	            }

	            lineStyle.stroke = color;

	            var cx = this.axisLayoutInfo.orign.x;
	            var cy = this.axisLayoutInfo.orign.y;

	            var seriePoints = [];
	            var startPoints = [];

	            var ticks = [];
	            var tickData = [];
	            var ticksSt = this.paper.set();

	            for (var i = 0; i < this.categoryInfo.length; i++) {
	                var pointData = serie.data[i];

	                if (pointData !== undefined) {
	                    var point = this.getSeriePoint(i, pointData);

	                    seriePoints = seriePoints.concat([point.x, point.y]);
	                    startPoints = startPoints.concat([cx, cy]);

	                    var circle = this.paper.circle(point.x, point.y, 0).attr(dotStyle);

	                    ticks.push(circle);
	                    tickData.push(pointData);
	                    ticksSt.push(circle);
	                }
	            }

	            var line;
	            if (this.isAnitamtionEnaled()) {
	                line = this.paper.path('M' + startPoints.join() + 'z').attr(lineStyle);
	                var anim = Raphael.animation(
	                    {path: 'M' + seriePoints.join() + 'z'},
	                    this.opts.plotOptions.radar.animate.dur,
	                    this.opts.plotOptions.radar.animate.fn,
	                    function () {
	                        line.data('drawReady', 1);
	                        ticksSt.attr({r: radarOpts.style.dotStyle.radius});
	                    }
	                );

	                line.animate(anim);
	            }
	            else {
	                line = this.paper.path('M' + seriePoints.join() + 'z').attr(lineStyle);
	                line.data('drawReady', 1);
	            }

	            this.series.push({
	                type: serie.type,
	                name: serie.name,
	                line: line,
	                color: color,
	                ticksSt: ticksSt,
	                ticks: ticks,
	                tickData: tickData,
	                tooltip: serie.tooltip
	            });
	        },

	        drawSeriesToBar: function (serieIndex, serie) {
	            var radarOpts = this.opts.plotOptions.radar;

	            var angleDelta = this.isStack ? 1/6 : 0;

	            var color = serie.color;

	            var barAttr = radarOpts.style.bar;
	            barAttr.fill = color;

	            var cx = this.axisLayoutInfo.orign.x;
	            var cy = this.axisLayoutInfo.orign.y;
	            var radius = this.axisLayoutInfo.radius;

	            var categoryLength = this.categoryInfo.length;

	            var sectors = [];
	            var sectorsSt = this.paper.set();
	            var tickData = [];

	            for (var i = 0; i < categoryLength; i++) {
	                var category = this.categoryInfo[i];
	                var categoryAxisValue = category.axisValue;

	                var nextCategoryIndex = i === categoryLength - 1 ? 0 : i + 1;
	                var nextCategory = this.categoryInfo[nextCategoryIndex];

	                var pointData = serie.data[i];
	                tickData.push(serie.rawData[i]);

	                var serieSector;
	                var sectorRadius = radius * pointData / categoryAxisValue;

	                var anglePlus = nextCategory.angle - category.angle;
	                anglePlus = anglePlus < 0 ? anglePlus + 360 : anglePlus;
	                var startAngle = category.angle + anglePlus * angleDelta
	                var endAngle = nextCategory.angle - anglePlus * angleDelta;

	                if (this.isAnitamtionEnaled()) {
	                    serieSector = this.drawSector(
	                        cx, cy, 1,
	                        category.angle, nextCategory.angle
	                    ).attr(barAttr);

	                    var animateOpts = this.opts.plotOptions.radar.animate;


	                    Animate.animate(
	                        serieSector,
	                        {piePath: [cx, cy, sectorRadius, startAngle, endAngle]},
	                        animateOpts.dur,
	                        animateOpts.fn,
	                        (function (serieSector) {
	                            serieSector.data('drawReady', 1);
	                        })(serieSector)
	                    );
	                }
	                else {
	                    serieSector = this.drawSector(
	                        cx, cy, sectorRadius,
	                        startAngle, endAngle
	                    ).attr(barAttr);
	                    serieSector.data('drawReady', 1);
	                }

	                sectors.push(serieSector);
	                sectorsSt.push(serieSector);
	            }

	            this.series.push({
	                type: serie.type,
	                name: serie.name,
	                sectors: sectors,
	                sectorsSt: sectorsSt,
	                color: color,
	                tickData: tickData,
	                tooltip: serie.tooltip
	            });
	        },

	        drawSeriesToArea: function (serieIndex, serie) {
	            this.drawSeriesToLine(serieIndex, serie);

	            var line = this.series[serieIndex] && this.series[serieIndex].line;
	            var color = serie.color;

	            if (line) {
	                var areaAttr = this.opts.plotOptions.radar.style.area;
	                areaAttr.fill = color;

	                line.attr(areaAttr);
	            }
	        },

	        drawSector: function (cx, cy, radius, angle, angleTo) {
	            var sector = this.paper.path().attr({
	                piePath: [cx, cy, radius, angle, angleTo]
	            });

	            return sector;
	        },

	        /**
	         * 高亮一条数据
	         */
	        highlightSerie: function (index) {
	            var serie = this.series[index];

	            this.highlightTicks(serie);
	        },

	        unhighlightSerie: function (index) {
	            var serie = this.series[index];

	            this.unhighlightTicks(serie);
	        },

	        /**
	         * 选择展示一条 serie
	         */
	        selectSerie: function (index) {
	            if (!this.isStack) {
	                var serie = this.series[index];

	                if (serie) {
	                    serie.line && serie.line.show();
	                    serie.sectorsSt && serie.sectorsSt.show();
	                    serie.ticksSt && serie.ticksSt.show();

	                    serie.isHidden = false;
	                }
	            }
	            else {
	                this.opts.series[index].isHidden = false;
	                this.draw();
	            }
	        },

	        unselectSerie: function (index) {
	            // 如果是 stack 则必须重新计算和绘制
	            if (!this.isStack) {
	                var serie = this.series[index];

	                if (serie) {
	                    serie['pointGlow'] && serie['pointGlow'].remove();
	                    serie.line && serie.line.hide();
	                    serie.ticksSt && serie.ticksSt.hide();
	                    serie.sectorsSt && serie.sectorsSt.hide();
	                    serie.pointGlow && serie.pointGlow.remove();

	                    serie.isHidden = true;
	                }
	            }
	            else {
	                this.opts.series[index].isHidden = true;
	                this.draw();
	            }
	        },

	        /**
	         * 高亮 y 轴上所有 tick 点
	         */
	        highlightValueAxis: function (index, eventPoint) {
	            var series = this.series;

	            for (var i = 0; i < series.length; i++) {
	                var serie = series[i];

	                this.highlightTicks(serie, index);
	            }

	            this.showTooltip(index, eventPoint);
	        },

	        unhighlightValueAxis: function (index) {
	            var series = this.series;

	            for (var i = 0; i < series.length; i++) {
	                var serie = series[i];

	                this.unhighlightTicks(serie, index);
	            }

	            this.hideTooltip(index);
	        },

	        highlightTicks: function (serie, index) {

	            if (serie && serie.isHidden !== true
	                && ((serie.line && serie.line.data('drawReady') === 1)
	                    || (serie.sectors && serie.sectors[0].data('drawReady') === 1)
	                )) {
	                var glowAttr = {
	                    color: serie.color
	                };

	                var barGlowAttr = Util.cloneObject(this.opts.plotOptions.radar.style.bar);
	                barGlowAttr.fill = serie.color;
	                barGlowAttr['fill-opacity'] = 0.6;

	                this.resetBarSerieStyle(serie);

	                serie['pointGlow'] && serie['pointGlow'].remove();

	                if (Util.isNumber(+index)) {
	                    index = +index;
	                    if (serie.sectors) {
	                        serie.sectors[index] && serie.sectors[index].attr(barGlowAttr);
	                    }
	                    else {
	                        serie['pointGlow'] = serie.ticks[index] && serie.ticks[index].glow(glowAttr);
	                    }
	                }
	                else {
	                    if (serie.sectorsSt) {
	                        serie.sectorsSt && serie.sectorsSt.attr(barGlowAttr);
	                    }
	                    else {
	                        serie['pointGlow'] = serie.ticksSt && serie.ticksSt.glow(glowAttr);
	                    }
	                }
	            }
	        },

	        unhighlightTicks: function (serie, index) {
	            if (serie) {
	                serie['pointGlow'] && serie['pointGlow'].remove();

	                this.resetBarSerieStyle(serie);
	            }
	        },

	        resetBarSerieStyle: function (serie) {
	            if (serie.sectorsSt) {
	                var barAttr = this.opts.plotOptions.radar.style.bar;
	                barAttr.fill = serie.color;

	                serie.sectorsSt.attr(barAttr);
	            }
	        },

	        showTooltip: function (index, eventPoint) {
	            var opts = this.opts;
	            var series = this.series;
	            var categoryInfo = this.categoryInfo;

	            var content = opts.tooltip.formatter(series, categoryInfo, index);

	            var lineBoundingRect = Util.getBoundingClientRect(this._polar.getActiveItemLine());

	            var tipSettings = {
	                content: content,
	                style: Util.extend({
	                    padding: [5, 10, 5, 10],
	                    width: 'auto'
	                }, opts.tooltip.style),
	                eventInfo: {
	                    point: eventPoint,
	                    left: lineBoundingRect.left,
	                    top: lineBoundingRect.top
	                },
	                axisLayoutInfo: this.axisLayoutInfo
	            };

	            if (!this.tooltip) {
	                this.tooltip = Chart.createComponent(Tooltip, tipSettings);
	                this.tooltip.render(this.htmlPaper);
	                this.tooltip.show();
	            }
	            else {
	                this.tooltip.update(tipSettings);
	            }
	        },

	        hideTooltip: function (index) {
	            this.tooltip && this.tooltip.hide();
	        },

	        showSerieTicks: function (ticksSt) {
	            var radius =  this.opts.plotOptions.radar.style.dotStyle.radius;

	            ticksSt.attr({r: radius});
	        },

	        getSeriePoint: function (index, data) {
	            var category = this.categoryInfo[index];

	            var axisLayout = this.axisLayoutInfo;

	            var pointPercentage = data / category.axisValue;

	            var result = {
	                x: 0,
	                y: 0
	            };

	            var cx = axisLayout.orign.x;
	            var cy = axisLayout.orign.y;

	            result.x = Util.forceCrispEdges(cx + (category.point.x - cx) * pointPercentage);
	            result.y = Util.forceCrispEdges(cy + (category.point.y - cy) * pointPercentage);

	            return result;
	        },

	        getSerieBarPoint: function (basePoint, data, axisValue) {
	            var axisLayout = this.axisLayoutInfo;

	            var pointPercentage = data / axisValue;

	            var result = {
	                x: 0,
	                y: 0
	            };

	            var cx = axisLayout.orign.x;
	            var cy = axisLayout.orign.y;

	            result.x = Util.forceCrispEdges(cx + (basePoint.x - cx) * pointPercentage);
	            result.y = Util.forceCrispEdges(cy + (basePoint.y - cy) * pointPercentage);

	            return result;
	        },

	        drawLegend: function () {
	            if (this.opts.legend !== undefined) {
	                var settings = Util.extend(
	                    {legend: this.opts.legend},
	                    {
	                        legend: {
	                            data: this.legends,
	                            callbacks: {
	                                highlight: Util.bind(this.highlightSerie, this),
	                                unhighlight: Util.bind(this.unhighlightSerie, this),
	                                select: Util.bind(this.selectSerie, this),
	                                unselect: Util.bind(this.unselectSerie, this)
	                            }
	                        },
	                        axisLayoutInfo: this.axisLayoutInfo
	                    }
	                );

	                this._legend = Chart.createComponent(Legend, settings);
	                this._legend.render(this.htmlPaper);
	            }
	        },

	        convertDataToOptions: function () {
	            var opts = this.opts;

	            if (opts.dataAdapter
	                && Util.isFunction(dataAdapter[opts.dataAdapter])) {
	                this.opts = Util.extend(opts, dataAdapter[opts.dataAdapter](this._data));
	            }

	            this.originalValueAxis = Util.cloneObject(this.opts.yAxis.data);

	        },

	        convertData: function () {
	            this._rawSeries = {};

	            // 对数据类型分组，以便自动切换展示策略
	            // bar 类型大于一个时 bar 统一展示为堆积图
	            if (Util.isArray(this.opts.series)) {
	                for (var i = 0; i < this.opts.series.length; i++) {
	                    var serie = this.opts.series[i];
	                    var type = serie.type || 'line';

	                    if (this._rawSeries[type] === undefined) {
	                        this._rawSeries[type] = [];
	                    }

	                    this._rawSeries[type].push(serie);
	                }
	            }

	            this.opts.yAxis.data = Util.cloneObject(this.originalValueAxis);

	            // 如果 bar 类型的数据大于 1，则需要添加虚拟 serie 给 polar 以便其正确计算堆积最大值
	            if (Util.isArray(this._rawSeries.bar) && this._rawSeries.bar.length > 1) {
	                var virtualSerie = [];

	                for (var i = 0; i < this._rawSeries.bar.length; i++) {
	                    var bar = this._rawSeries.bar[i];

	                    for (var j = 0; j < bar.data.length; j++) {
	                        if (virtualSerie[j] === undefined) {
	                            virtualSerie[j] = bar.data[j];
	                        }
	                        else {
	                            virtualSerie[j] += bar.data[j];
	                        }
	                    }
	                }

	                this.opts.yAxis.data.push(virtualSerie);

	            }

	            this.isStack = this._rawSeries
	                && this._rawSeries.line === undefined && this._rawSeries.area === undefined
	                && this._rawSeries.bar !== undefined;
	        },

	        /**
	         * 部分需要调整前后的图层
	         */
	        reviseCanvas: function () {
	            // tooltip 所需 mask 需要在最前面
	            if (this.opts.tooltip.show) {
	                this._polar && this._polar.updateMask('toFront');
	            }
	        },

	        isAnitamtionEnaled: function () {
	            return this.opts.plotOptions.radar.animate && !Chart.isVML;
	        },

	        getFillColor: function (index) {
	            var colors = this.opts.style.colors;

	            if (!colors[index]) {
	                return this.opts.style.defaultColor;
	            }

	            return colors[index];
	        }
	    };

	    return Radar;

	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * @file hm-charts
	 * @author wumingdan(wumingdan@baidu.com)
	 */

	!(__WEBPACK_AMD_DEFINE_RESULT__ = function (require) {

	    var Chart = __webpack_require__(2);
	    var Util = __webpack_require__(1);

	    var Raphael = __webpack_require__(3);

	    var Ploar = {
	        defaults: {
	            xAxis: {
	                data: null,
	                defaultData: ['0', '45', '90', '135', '180', '225', '270', '315'],
	                orignAngle: 270,
	                labels: {
	                    format: '{value}',
	                    style: {
	                        'color': '#606060',
	                        'fontFamily': 'Microsoft Yahei, Helvetica, STHeitiSC-Light, Arial, sans-serif',
	                        'fontSize': 12,
	                        'fontStyle': 'normal',  // 样式，可选为：'normal' ¦ 'italic'
	                        'fontWeight': 'normal'  // 粗细，可选为：'normal' ¦ 'bold' 
	                    }
	                }
	            },
	            yAxis: {
	                labels: {
	                    format: '{value}%',
	                    style: {
	                        'color': '#606060',
	                        'fontFamily': 'Microsoft Yahei, Helvetica, STHeitiSC-Light, Arial, sans-serif',
	                        'fontSize': 12,
	                        'fontStyle': 'normal',  // 样式，可选为：'normal' ¦ 'italic'
	                        'fontWeight': 'normal'  // 粗细，可选为：'normal' ¦ 'bold' 
	                    }
	                },
	                style: {
	                    color: '#dfdfdf',
	                    width: 1,
	                    type: 'solid'
	                }
	            },
	            grid: {
	                type: '',   // 默认是圆
	                split: 5,
	                style: {
	                    color: '#dfdfdf',
	                    width: 1,
	                    'shape-rendering': 'crispEdges',
	                    type: 'solid'
	                }
	            },
	            axisLayout: {
	                orign: {x: 0, y: 0},
	                radius: 150,
	                margin: [70, 90, 70, 90]
	            },

	            tooltip: {
	                show: false,
	                callbacks: {
	                    highlight: Util.noop,
	                    unhighlight: Util.noop
	                },
	                formatter: function () {
	                }
	            }
	        },

	        mask: null,

	        categoryInfo: [],

	        valueAxisLines: [],

	        render: function (paper) {
	            this.initContext()

	            var opts = this.opts;
	            this.paper = paper;

	            var axisLayout = opts.axisLayout;

	            axisLayout.orign.x = axisLayout.radius * 1.2 + axisLayout.margin[3];
	            axisLayout.orign.y = axisLayout.radius * 1.1 + axisLayout.margin[0];

	            this.drawXAxis();

	            this.drawYAxis();

	            this.drawGrid();
	        },

	        initContext: function () {
	            this.categoryInfo = [];
	            this.valueAxisLines = [];
	        },

	        drawXAxis: function () {
	            var opts = this.opts;

	            var xAxis = opts.xAxis;
	            var axisLayout = opts.axisLayout;

	            var data = xAxis.data || xAxis.defaultData;
	            var categoryLength = data.length;

	            var cx = axisLayout.orign.x;
	            var cy = axisLayout.orign.y;
	            var radius = axisLayout.radius;

	            var angleGap = 360 / categoryLength;
	            var orignAngle = xAxis.orignAngle;

	            var tickLabelStyle = Util.convertTextAttr(xAxis.labels.style);
	            var tickLabelFormat = xAxis.labels.format;

	            for (var i = 0; i < categoryLength; i++) {
	                var angle = (orignAngle + i * angleGap) % 360;
	                var name = tickLabelFormat.replace('{value}', data[i]);

	                var tick = {
	                    name: name,
	                    angle: angle,
	                    point: this.getTickPoint(cx, cy, radius, angle)
	                };

	                // 绘制类目
	                var tickLabelPoint = this.getTickPoint(cx, cy, radius + 15, angle);
	                var tickLabel = this.paper.text(tickLabelPoint.x, tickLabelPoint.y, name).attr(tickLabelStyle);

	                // 根据位置调整文字对齐方式
	                if (angle >= 0 && angle < 90 || angle > 270 && angle <= 360) {
	                    tickLabel.attr({'text-anchor': 'start'});
	                }
	                else if (angle > 90 && angle < 270) {
	                    tickLabel.attr({'text-anchor': 'end'});
	                }

	                tick.tickLabel = tickLabel;

	                this.categoryInfo.push(tick);
	            }
	        },

	        getTickPoint: function (cx, cy, radius, angle) {
	            var point = {
	                x: 0,
	                y: 0
	            };

	            point.x = cx + radius * Math.cos(Raphael.rad(angle));
	            point.y = cy + radius * Math.sin(Raphael.rad(angle));

	            return point;
	        },

	        drawYAxis: function () {
	            var axisLayout = this.opts.axisLayout;
	            var cx = Util.forceCrispEdges(axisLayout.orign.x);
	            var cy = Util.forceCrispEdges(axisLayout.orign.y);
	            var radius = axisLayout.radius;

	            var yAxisLineStyle = Util.convertPathAttr(this.opts.yAxis.style);

	            for (var i = 0; i < this.categoryInfo.length; i++) {
	                this.categoryInfo[i]['axisValue'] = this.getCategoryAxisValue(i);

	                var x = Util.forceCrispEdges(this.categoryInfo[i].point.x);
	                var y = Util.forceCrispEdges(this.categoryInfo[i].point.y);

	                this.valueAxisLines.push(this.paper.path(['M', cx, cy, 'L', x, y]).attr(yAxisLineStyle));
	            }
	        },

	        getCategoryAxisValue: function (index) {
	            var data = this.opts.yAxis.data;

	            var minNum = 0;
	            var maxNum = -Infinity;

	            for (var i = 0; i < data.length; i++) {
	                if (data[i][index] > maxNum) {
	                    maxNum = data[i][index];
	                }
	            }

	            var split = this.opts.grid.split;

	            return Math.ceil(maxNum / (split)) * (split + 1);
	        },

	        drawGrid: function () {
	            var gridOpts = this.opts.grid;

	            var gridType = gridOpts.type;
	            var splitNumber = gridOpts.split;

	            var axisLayout = this.opts.axisLayout;
	            var cx = axisLayout.orign.x;
	            var cy = axisLayout.orign.y;
	            var radius = axisLayout.radius;

	            var radiusStep = radius / splitNumber;

	            if (gridType === 'polygon') {
	                this.drawGridPolygon();
	            }
	            else {
	                this.drawGridCircle();
	            }

	            this.initGridMask();
	        },

	        drawGridPolygon: function () {
	            var gridOpts = this.opts.grid;
	            var splitNumber = gridOpts.split;

	            var axisLayout = this.opts.axisLayout;
	            var cx = axisLayout.orign.x;
	            var cy = axisLayout.orign.y;

	            var categoryInfo = this.categoryInfo;

	            var gridStyle = Util.convertPathAttr(gridOpts.style);

	            for (var i = 0; i < splitNumber; i++) {
	                var pointPercentage = (i + 1) / splitNumber;

	                var points = [];

	                for (var j = 0; j < categoryInfo.length; j++) {
	                    var x = Util.forceCrispEdges(cx + (categoryInfo[j].point.x - cx) * pointPercentage);
	                    var y = Util.forceCrispEdges(cy + (categoryInfo[j].point.y - cy) * pointPercentage);

	                    points = points.concat([x, y]);
	                }

	                this.paper.path('M' + points.join() + 'z').attr(gridStyle);
	            }
	        },

	        drawGridCircle: function () {
	            var gridOpts = this.opts.grid;
	            var splitNumber = gridOpts.split;

	            var axisLayout = this.opts.axisLayout;
	            var cx = axisLayout.orign.x;
	            var cy = axisLayout.orign.y;

	            var radiusStep = axisLayout.radius / splitNumber;

	            var gridStyle = Util.convertPathAttr(gridOpts.style);

	            for (var i = 0; i < splitNumber; i++) {
	                var r = (i + 1) * radiusStep;

	                // 绘制网格
	                this.paper.circle(cx, cy, r).attr(gridStyle);
	            }
	        },

	        initGridMask: function () {
	            var me = this;

	            var axisLayout = this.opts.axisLayout;
	            var cx = axisLayout.orign.x;
	            var cy = axisLayout.orign.y;
	            var radius = axisLayout.radius;

	            var splitAngle = 360 / this.categoryInfo.length;
	            var adjuestAngle = 360 - this.opts.xAxis.orignAngle;

	            this.mask = this.paper.circle(cx, cy, radius)
	                .attr(Util.convertAreaAttr({borderColor: 'none', background: '#fff', opacity: 0.3}))
	                .toFront();

	            this.mask.mousemove(function (event) {
	                var index;
	                var floorFix = me.opts.isStack ? 0 : 0.5;

	                var x = Raphael.vml ? event.x : event.layerX;
	                var y = Raphael.vml ? event.y : event.layerY;

	                // 计算活动坐标对圆心的角度
	                var angle = Raphael.angle(x, y, cx, cy);

	                index = Math.ceil((angle + adjuestAngle) % 360 / splitAngle + floorFix) - 1;

	                index = index < 0 ? 0 : index;

	                me.highlightTooltip(index, {x: x, y: y});
	            });

	            this.mask.mouseout(function () {
	                me.unhighlightTooltip();
	            });
	        },

	        highlightTooltip: function (index, eventPoint) {
	            index = index >= this.categoryInfo.length ? 0 : index;

	            if (this.activeItemIndex !== index) {
	                this.activeItemIndex = index;

	                this.activeItemLine = this.valueAxisLines[index];

	                var callbacks = this.opts.tooltip.callbacks;

	                if (callbacks['highlight'] !== Util.noop) {
	                    callbacks['highlight'](index, eventPoint);
	                }
	            }
	        },

	        unhighlightTooltip: function () {
	            var index = this.activeItemIndex;

	            if (index !== undefined) {
	                var callbacks = this.opts.tooltip.callbacks;

	                if (callbacks['unhighlight'] !== Util.noop) {
	                    callbacks['unhighlight'](index);
	                }

	                this.activeItemIndex = undefined;
	                this.activeItemLine = undefined;
	            }
	        },

	        updateMask: function (fn) {
	            this.mask[fn] && this.mask[fn]();
	        },

	        getActiveItemLine: function () {
	            return this.activeItemLine;
	        },

	        getCategoryInfo: function () {
	            return this.categoryInfo;
	        },

	        getAxisLayout: function () {
	            return this.opts.axisLayout;
	        }

	    };

	    return Ploar;
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));



/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * @file 气泡图
	 * @author wumingdan(wumingdan@baidu.com)
	 */

	!(__WEBPACK_AMD_DEFINE_RESULT__ = function (require) {

	    var Chart = __webpack_require__(2);
	    var Util = __webpack_require__(1);
	    var Format = __webpack_require__(12);
	    var Animate = __webpack_require__(19);
	    var Legend = __webpack_require__(16);
	    var Tooltip = __webpack_require__(15);

	    var SimpleBubble = {
	        defaults: {
	            __name: 'simple-bubble',
	            style: {
	                colors: ['#48bef4', '#e3563a', '#19aa5f', '#a8c656', '#514e95', '#e25693', '#e9a840', '#5b7d9d', '#9457e6', '#14c1d0'],
	                defaultColor: '#e6e6e6',
	                attr: {
	                    'stroke': 'none'
	                }
	            },
	            plotOptions: {
	                simpleBubble: {
	                    cursor: 'default',
	                    dataLabels: {
	                        enabled: true,
	                        showLabelNumber: 10,
	                        style: {
	                            color: '#fff',
	                            fontSize: '12px',
	                            fontFamily: 'Microsoft Yahei, Helvetica, STHeitiSC-Light, Arial, sans-serif'
	                        }
	                    },
	                    margin: [50, 50, 50, 50],
	                    animate: {
	                        enabled: true,
	                        dur: 500,
	                        easing: '<>'
	                    },
	                    minRadius: 5
	                }
	            },
	            tooltip: {
	                show: true,
	                formatter: function (bubble) {
	                    var html = [];

	                    html.push('<p style="margin: 3px;font-weight: 600;">' + bubble.name + '</p>');

	                    html.push(
	                        '<p style="margin: 5px 3px"><span style="color:'
	                        + bubble.color + ';">'
	                        + bubble.data.name
	                        + ': </span>'
	                        + Format.number(bubble.data.value) + bubble.data.suffix
	                        + '</p>'
	                    );

	                    html.push(
	                        '<p style="margin: 5px 3px"><span style="color:'
	                        + bubble.color + ';">'
	                        + '占比: </span>'
	                        + bubble.data.percentage + '%'
	                        + '</p>'
	                    );

	                    return html.join('');
	                }
	            }
	        },

	        bubbles: [],

	        legends: [],

	        render: function (data) {
	            this.initContext();

	            if (data !== undefined) {
	                this._data = data;
	            }

	            this.opts = Util.extend(this.opts, this._data);

	            // 转化数据
	            // [data: [{name, value}, ...], name: '访问次数', total: 'sum value', type: 'simple-bubble']
	            var friendlyData = this.convertData();

	            // 绘制图形
	            this.draw(friendlyData);
	        },

	        initContext: function () {
	            this.clearPaper();

	            this.bubbles = [];
	            this.legends = [];
	        },

	        draw: function (data) {
	            this.data = data;
	            var bubbleOpts = this.opts.plotOptions.simpleBubble;

	            this.drawBubble(data);

	            // draw labels
	            if (bubbleOpts.dataLabels.enabled) {
	                this.drawBubbleLabels(data);
	            }

	            if (!bubbleOpts.animate.enabled) {
	                for (var i = 0; i < this.bubbles.length; i++) {
	                    this.initBubbleEvents(this.bubbles[i]);
	                }
	            }
	        },

	        drawBubble: function (bubbles) {
	            var bubblePlotOpts = this.opts.plotOptions.simpleBubble;

	            var canvas = this.paper.canvas;

	            var canvasWidth = this.opts.width;
	            var canvasHeight = this.opts.height;

	            var maxRadius = (canvasWidth < canvasHeight ? canvasWidth : canvasHeight) / 2;
	            var totalData = bubbles.total;

	            var bubbleAttr = this.opts.style.attr;
	            bubblePlotOpts.cursor && (bubbleAttr.cursor = bubblePlotOpts.cursor);

	            for (var i = 0; i < bubbles.data.length; i++) {
	                var bubbleInfo = bubbles.data[i];
	                var percentage = bubbleInfo.value / totalData;

	                bubbleInfo.suffix = bubbles.tooltip && bubbles.tooltip.valueSuffix || '';
	                bubbleInfo.percentage = (percentage * 100).toFixed(2);

	                var bubbleRadius = percentage * maxRadius;
	                bubbleRadius = bubbleRadius < bubblePlotOpts.minRadius ? bubblePlotOpts.minRadius : bubbleRadius;
	                var bubbleColor = this.getFillColor(i);

	                bubbleAttr.fill = bubbleColor;

	                var bubblePoint = this.getRandomPoint(canvasWidth, canvasHeight, bubbleRadius);

	                var bubble = {
	                    name: bubbles.name,
	                    data: bubbleInfo,
	                    point: bubblePoint,
	                    radius: bubbleRadius,
	                    color: bubbleColor,
	                    element: undefined
	                };

	                bubble.element = this.drawBubbleCircle(bubble, bubbleAttr);

	                this.bubbles.push(bubble);
	            }
	        },

	        drawBubbleCircle: function (bubble, attr) {
	            if (!this.isAnitamtionEnaled()) {
	                var bubbleElement = this.paper.circle(bubble.point.x, bubble.point.y, bubble.radius).attr(attr);
	                bubble.element = bubbleElement;
	                this.initBubbleEvents(bubble);

	                return bubbleElement;
	            }
	            else {
	                var me = this;
	                var animateOpts = this.opts.plotOptions.simpleBubble.animate;

	                var bubbleElement = this.paper.circle(bubble.point.x, bubble.point.y, 0).attr(attr);
	                bubble.element = bubbleElement;

	                bubbleElement.animate(
	                    {r: bubble.radius},
	                    animateOpts.dur,
	                    animateOpts.easing,
	                    function () {
	                        me.initBubbleEvents(bubble);
	                    }
	                );

	                return bubbleElement;
	            }
	        },

	        getRandomPoint: function (width, height, radius) {
	            var availableWidth = width - radius * 2;
	            var availableHeight = height - radius * 2;

	            var x = Math.random() * availableWidth + radius;
	            var y = Math.random() * availableHeight + radius;

	            if (this.isPointUnavailable(x, y, radius)) {
	                return this.getRandomPoint(width, height, radius);
	            }

	            return {
	                x: x,
	                y: y
	            };
	        },

	        isPointUnavailable: function (x, y, r) {
	            var currentBubbles = this.bubbles;

	            var available = false;

	            for (var i = 0; i < currentBubbles.length; i++) {
	                var bubble = currentBubbles[i];

	                var isCollision = this.collisionDetect(
	                    bubble.radius * 2,
	                    bubble.radius * 2,
	                    r,
	                    x - bubble.point.x,
	                    y - bubble.point.y
	                );

	                if (isCollision) {
	                    available = true;
	                    break;
	                }
	            }

	            return available;
	        },

	        collisionDetect: function (w, h, r, rx, ry) {
	            var dx = Math.min(rx, w * 0.5);
	            var dx1 = Math.max(dx, -w * 0.5);
	            var dy = Math.min(ry, h * 0.5);
	            var dy1 = Math.max(dy, -h * 0.5);
	            return (dx1 - rx) * (dx1 - rx) + (dy1 - ry) * (dy1 - ry) <= r * r;
	        },

	        drawBubbleLabels: function (data) {
	            var bubbles = this.bubbles;

	            var dataLabelOpts = this.opts.plotOptions.simpleBubble.dataLabels;

	            var dataLabelStyle = Util.convertTextAttr(dataLabelOpts.style);

	            for (var i = 0; i < bubbles.length; i++) {
	                var bubble = bubbles[i];

	                var point = bubble.point;
	                var raduis = bubble.radius;

	                var text = bubble.data.name;

	                if (raduis > 10) {
	                    bubble['labelElement'] = this.paper.text(point.x, point.y, text.substring(0, raduis / 4.5))
	                        .attr(dataLabelStyle).attr({'title': text});
	                }
	            }
	        },

	        initBubbleEvents: function (bubble) {
	            var me = this;

	            var bubbleElement = bubble.element;
	            var bubbleLabelElement = bubble.labelElement;

	            bubbleElement.hover(
	                function (event) {
	                    me.highLightBubble(bubble);
	                }, function (event) {
	                    me.unHighLightBubble(bubble);
	                }
	            );

	            if (bubbleLabelElement) {
	                bubbleLabelElement.hover(
	                    function (event) {
	                        me.highLightBubble(bubble);
	                    }, function (event) {
	                        me.unHighLightBubble(bubble);
	                    }
	                );
	            }
	        },

	        highLightBubble: function (bubble) {
	            var bubbleElement = bubble.element;

	            bubbleElement.attr({'opacity': 0.8});

	            this.showBubbleTip(bubble);
	        },

	        unHighLightBubble: function (bubble) {
	            var bubbleElement = bubble.element;

	            bubbleElement.attr({'opacity': 1});

	            this.hideBubbleTip(bubble);
	        },

	        showBubbleTip: function (bubble) {
	            var opts = this.opts;

	            var content = opts.tooltip.formatter(bubble);

	            var tipSettings = {
	                content: content,
	                style: {
	                    left: bubble.point.x,
	                    top: bubble.point.y,
	                    width: '150px',
	                    padding: [10, 10, 10, 10]
	                }
	            };

	            if (!this.tooltip) {
	                this.tooltip = Chart.createComponent(Tooltip, tipSettings);
	                this.tooltip.render(this.htmlPaper);
	                this.tooltip.show();
	            }
	            else {
	                this.tooltip.update(tipSettings);
	            }
	        },

	        hideBubbleTip: function (bubble) {
	            this.tooltip && this.tooltip.hide();
	        },

	        convertData: function () {
	            var results = [];

	            var series = this._data.series;

	            if (!Util.isArray(series)) {
	                throw new Error(this.opts.__name, ': series is incorrect');
	            }

	            var serie;
	            for (var i = 0; i < series.length; i++) {
	                var serieInfo = {};
	                serie = series[i];

	                if (serie.type === this.opts.__name) {
	                    serieInfo.name = serie.name;
	                    serieInfo.type = serie.type;
	                    serieInfo.tooltip = serie.tooltip || {};
	                    serieInfo.total = 0;
	                    serieInfo.data = [];

	                    var data = serie.data;

	                    for (var j = 0; j < data.length; j++) {
	                        serieInfo.total += data[j].value;

	                        serieInfo.data.push({
	                            name: data[j].name,
	                            value: data[j].value
	                        });
	                    }
	                }

	                results.push(serieInfo);
	            }

	            return results[0];
	        },

	        getFillColor: function (index) {
	            var colors = this.opts.style.colors;

	            if (!colors[index]) {
	                return this.opts.style.defaultColor;
	            }

	            return colors[index];
	        },

	        isAnitamtionEnaled: function () {
	            return this.opts.plotOptions.simpleBubble.animate.enabled && !Chart.isVML;
	        }
	    };

	    return SimpleBubble;

	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * @file 流图
	 * @author wumingdan(wumingdan@baidu.com)
	 */

	!(__WEBPACK_AMD_DEFINE_RESULT__ = function(require) {

	    var Chart = __webpack_require__(2);
	    var Util = __webpack_require__(1);
	    var Tooltip = __webpack_require__(15);


	    var Flow = {
	        defaults: {
	            maxPageNumberPerFlow: 5,
	            flow: {
	                pipelineWidth: 3,
	                pipelineOffset: 3,
	                monitorPipelineWidth: 10,
	                monitorPipelineHeight: 18,
	                bezierWidth: 110,
	                color: {
	                    bezierColor: {
	                        highlight: "#ffefd7",
	                        common: "#daecff"
	                    },
	                    pipelineColor: {
	                        highlight: "#eccb9a",
	                        common: "#89b7e8"
	                    }
	                },
	                minOffset: 8
	            },
	            rect: {
	                monitorPage: {
	                    width: 188,
	                    height: 85
	                },
	                width: 175,
	                height: 56,
	                tipHeight: 56,
	                defaultColor: "#eee",
	                color: ["#bdd8f3", "#c3dcf4", "#cae0f5", "#d1e4f7", "#d7e8f8", "#deebf9", "#e5effa", "#ebf3fb", "#eef5fc", "#f2f7fd", "#f5f7f7"],
	                marginBottom: 10,
	                rectUrlTemplate: '<a href="#{0}" target="_blank"><span title="#{0}" style="color:#216cc7;display:inline-block;margin:8px;width:159px;word-wrap:break-word">#{1}</span></a>',
	                rectNoneUrlTemplate: '<span title="#{0}" style="color:#216cc7;display:inline-block;margin:8px;width:159px;word-wrap:break-word">#{1}</span>',
	                monitorPageTemplate: '\
	                    <div class="monitor-page-url" title="#{0}" style="height:25px;word-wrap:break-word;padding:0 8px 5px;margin:5px 0 8px;border-bottom:1px solid #72a4e7">\
	                        <a target="_blank" href="#{0}" style="text-decoration:none;color:#fff">#{1}</a>\
	                    </div>#{2}',
	                monitorPageDetailItem: '\
	                    <div class="monitor-page-pv" style="text-align:center;margin-bottom:10px">\
	                        <span class="mp-pv-desc">#{0}</span><span class="mp-pv-no" style="color:#1969c5;margin-left:10px">#{1}</span>\
	                    </div>'
	            },
	            noDataSettings: {
	                rectColor: "#eef5fc",
	                pipeColor: "#f2f3f3",
	                bigPipeHeight: 12,
	                bigPipeWidth: 110,
	                pipeWidth: 3,
	                pipeHeight: 20,
	                rectHeight: 70,
	                rectWidth: 175,
	                message: '<div class="cf-no-data-message" style="color:#7c7c7c;padding:8px 10px;font-size:14px;line-height:15px">暂无数据，若数据有延迟则请耐心等待数据生成。</div>'
	            },
	            others: {
	                label: '其它',
	                template: '\
	                    <div class="cf-exit-others" style="font-size:16px;font-weight:blod;text-align:center;line-height:56px">\
	                        <div><span class="cf-others-name">#{0}</span></div>\
	                    </div>'
	            },
	            highLightItems: ['离开网站', '跳出']
	        },
	        /**
	         * 绘制矩形
	         * @private
	         */
	        _rect: function(x, y, width, height, style) {
	            var styles = {
	                width: width + 'px',
	                height: height + 'px',
	                left: x + 'px',
	                top: y + 'px',
	                position: "absolute"
	            };

	            var rect = document.createElement("div");

	            var settings = Util.extend(styles, style);

	            for (var i in settings) {
	                rect.style[i] = settings[i];
	            }

	            this._html.appendChild(rect);

	            return rect;
	        },
	        _rectRaphael: function(x, y, width, height, options) {
	            var path = ['M', x, y, 'h', width, 'v', height, 'h', -width, 'z'];

	            return this.paper.path(path).attr(options);
	        },
	        /**
	         * 组建上下游流向贝塞尔曲线
	         * 曲线类型为： ease (0.25, 0.1; 0.25, 1.0) (0-1)
	         * (x1, y1) to (x2, y2)
	         * p1 => ((x2 - x1) / 4 + x1, y1)
	         * p2 => ((x2 - x1) / 4 + x1, (y1 - y2) / 10 + y2)
	         * 反向则倒置p1，p2
	         * @private
	         */
	        _bezierFlow: function(start, end, percentage, options) {
	            // 最小宽度
	            var minOffset = this.opts.flow.minOffset;

	            var x1 = start.x;
	            var y1 = start.y;
	            var x2 = end.x;
	            var y2 = end.y;
	            var x3;
	            var y3;

	            // 第一条贝塞尔曲线控制点信息
	            var b1 = {
	                c1: {
	                    x: 0,
	                    y: 0
	                },
	                c2: {
	                    x: 0,
	                    y: 0
	                }
	            };

	            // 第二条贝塞尔曲线控制点信息
	            var b2 = {
	                c1: {
	                    x: 0,
	                    y: 0
	                },
	                c2: {
	                    x: 0,
	                    y: 0
	                }
	            };

	            var offset = (minOffset + percentage / 100 * (this.opts.rect.height - minOffset)) / 2;

	            x3 = x1;
	            y3 = y1 + offset;
	            y1 = y1 - offset;

	            // p1 => ((x2 - x1) / 4 + x1, y1)
	            b1.c1.x = (x2 - x1) / 4 + x1;
	            b1.c1.y = y1;

	            // p2 => ((x2 - x1) / 4 + x1, (y1 - y2) / 10 + y2)
	            b1.c2.x = (x2 - x1) / 4 + x1;
	            b1.c2.y = (y1 - y2) / 10 + y2;

	            // p1 => ((x2 - x1) / 4 + x1, y1)
	            b2.c1.x = (x2 - x3) / 4 + x3;
	            b2.c1.y = (y3 - y2) / 10 + y2;

	            // p2 => ((x2 - x1) / 4 + x1, (y1 - y2) / 10 + y2)
	            b2.c2.x = (x2 - x3) / 4 + x3;
	            b2.c2.y = y3;

	            var path = [
	                'M', x1, y1,
	                'C', b1.c1.x, b1.c1.y, b1.c2.x, b1.c2.y, x2, y2 - 2,
	                'v', 4,
	                "C", b2.c1.x, b2.c1.y, b2.c2.x, b2.c2.y, x3, y3
	            ];

	            return this.paper.path(path).attr(options);
	        },
	        /**
	         * 绘制贝塞尔曲线和流出小矩形管道
	         * @private
	         */
	        _processBezierCurve: function(start, end, percentage, isHighlight, rtl) {
	            var flowConf = this.opts.flow;
	            var rectConf = this.opts.rect;

	            var minOffset = flowConf.minOffset;
	            var offset = (minOffset + percentage / 100 * (rectConf.height - minOffset)) / 2;

	            var pipelineOffset = 
	                (offset + flowConf.pipelineOffset) > rectConf.height / 2
	                    ? rectConf.height / 2
	                    : offset + flowConf.pipelineOffset;

	            var pipelineRectX = start.x;
	            var pipelineRectY = start.y - pipelineOffset;

	            var pipeColor = isHighlight 
	                ? flowConf.color.pipelineColor.highlight
	                : flowConf.color.pipelineColor.common;

	            var bezierColor = isHighlight
	                ? flowConf.color.bezierColor.highlight
	                : flowConf.color.bezierColor.common;

	            // 绘制流出小矩形
	            var pipe = this._rectRaphael(
	                pipelineRectX, pipelineRectY,
	                flowConf.pipelineWidth, 2 * pipelineOffset, {
	                    "fill": pipeColor,
	                    "stroke": "none"
	                }
	            );

	            // 贝塞尔曲线
	            rtl && (start.x = start.x + flowConf.pipelineWidth);

	            var bezier = this._bezierFlow(start, end, percentage, {
	                "fill": bezierColor,
	                "stroke-width": 0
	            });

	            return {
	                pipe: pipe,
	                bezier: bezier
	            };
	        },
	        render: function() {
	            this.convertData();

	            this._initMonitorPagePosition();

	            // html容器会用来存放矩形以及页面名称等
	            // 在性能上特别是vml时，使用html会比矢量图有明显的优势
	            this._initHtmlContainer();

	            this.draw();
	        },
	        _initMonitorPagePosition: function() {
	            var upPages = this._data.up.items;
	            var downPages = this._data.down.items;

	            // 初始化实际会显示的页面数（上下游取大者），绘制监视页面时需要计算位置所用
	            var pageNumbers = upPages.length >= downPages.length ? upPages.length : downPages.length;

	            // 上下游同时无数据时位置校正（不要太贴近容器顶）
	            pageNumbers = pageNumbers === 0 ? 2 : pageNumbers;

	            var maxPageNumberPerFlow = this.opts.maxPageNumberPerFlow;

	            this._actualMaxPageNumber = pageNumbers >= maxPageNumberPerFlow
	                ? maxPageNumberPerFlow + 1 : pageNumbers;

	            var rectConf = this.opts.rect;
	            var flowConf = this.opts.flow;

	            // 初始化监视页面（包括管道）的初始位置
	            !this._monitorPagePosition && (this._monitorPagePosition = {});

	            this._monitorPagePosition.x =
	                rectConf.width + flowConf.pipelineWidth + flowConf.bezierWidth;

	            this._monitorPagePosition.y = 
	                (
	                    this._actualMaxPageNumber * rectConf.height
	                    + (this._actualMaxPageNumber - 1) * rectConf.marginBottom
	                ) / 2;
	        },
	        _initHtmlContainer: function() {
	            this._html = document.createElement('div');

	            this.container.appendChild(this._html);

	            Util.unSelectable(this.container);
	            this.container.style['position'] = 'relative';
	            this._html.style['font-size'] = '12px';
	        },
	        draw: function() {
	            // 上游页面
	            this._processUpPages();

	            this._processMonitorPages();

	            this._processDownPages();
	        },
	        _processPages: function(pages, level) {
	            var data = pages.items;
	            var total = pages.total;
	            var fields = pages.fields;

	            var dataCount = data.length;
	            var othersPercentage = 100;

	            var flowConf = this.opts.flow;
	            var rectConf = this.opts.rect;

	            var displayedPageNumber = dataCount > this.opts.maxPageNumberPerFlow
	                ? this.opts.maxPageNumberPerFlow + 1 : dataCount;

	            var startX = level == 0 ? 0 
	                : this._monitorPagePosition.x
	                    + (rectConf.monitorPage.width + 2 * flowConf.monitorPipelineWidth)
	                    + flowConf.bezierWidth
	                    + (level - 1) * (2 * flowConf.pipelineWidth + rectConf.width + flowConf.bezierWidth);

	            var startY = this._monitorPagePosition.y
	                - (displayedPageNumber * (rectConf.height + rectConf.marginBottom) - rectConf.marginBottom) / 2;

	            // 如果没有数据直接绘制出无数据
	            if (dataCount === 0) {
	                // TODO: y - 5 应该是重写后哪里计算错误了
	                this._processNoDataRect(startX, startY - 5, level);
	                return;
	            }

	            for (var i = 0; i < dataCount; i++) {
	                var x = startX;
	                var y = startY + i * (rectConf.height + rectConf.marginBottom);

	                var rect;
	                var urlText;

	                var bezierStart = {
	                    y: y + rectConf.height / 2
	                };

	                var bezierEnd = {
	                    y: this._monitorPagePosition.y
	                };

	                bezierStart.x = level == 0 ? x + rectConf.width : x;
	                bezierEnd.x = level == 0 ? this._monitorPagePosition.x : x - flowConf.bezierWidth;

	                var bezierPercentrage = data[i][1] / total * 100;

	                if (i <= this.opts.maxPageNumberPerFlow) {
	                    var currentRectColor = rectConf.color[i] ? rectConf.color[i] : rectConf.defaultColor;

	                    var rectX = level == 0 ? x : x + flowConf.pipelineWidth;
	                    var rectY = y;

	                    // 长方形容器
	                    rect = this._rect(
	                        rectX, rectY,
	                        rectConf.width, rectConf.height, {
	                            "background-color": currentRectColor
	                        }
	                    );

	                    // 前10条上游记录
	                    if (i < this.opts.maxPageNumberPerFlow) {
	                        var name = data[i][0];

	                        // url文字
	                        var textTemplate = Util.isUrl(name)
	                            ? rectConf.rectUrlTemplate : rectConf.rectNoneUrlTemplate;

	                        urlText = Util.format(
	                            textTemplate,
	                            name, this._formateDisplayedText(name)
	                        );

	                        rect.innerHTML = urlText;

	                        var fieldData = [];

	                        if (fields.length > 1) {
	                            for (var j = 1; j < fields.length; j++) {
	                                fieldData.push(fields[j], data[i][j]);
	                            }
	                        }

	                        rect.setAttribute('data', fieldData);

	                        // 贝塞尔曲线
	                        var isHighlight = this.opts.highLightItems.indexOf(name) != -1 ? true : false;

	                        this._processBezierCurve(
	                            bezierStart, bezierEnd, bezierPercentrage, isHighlight, (level == 0)
	                        );

	                        // 减去此条记录的占比，减完前10条剩下就是<<其它>>的占比
	                        othersPercentage -= bezierPercentrage;
	                    }
	                    // 多余10条，显示<<其它>>
	                    else {
	                        // 其它
	                        var otherConf = this.opts.others;

	                        var label = otherConf.label;

	                        urlText = Util.format(otherConf.template, label);
	                        rect.innerHTML = urlText;

	                        // 贝塞尔曲线
	                        var isHighlight = 
	                            this.opts.highLightItems.indexOf(label) != -1
	                            ? true : false;

	                        this._processBezierCurve(
	                            bezierStart, bezierEnd,
	                            othersPercentage, isHighlight, (level == 0)
	                        );

	                        rect.setAttribute('data',
	                            [
	                                label,
	                                (othersPercentage).toFixed(2) + '%'
	                            ]
	                        );
	                    }  

	                    Util.event.on(rect, 'mouseover',
	                        Util.bind(this.highLight, this, rect)
	                    );
	                    Util.event.on(rect, 'mouseout',
	                        Util.bind(this.unhighLight, this, rect)
	                    );
	                }
	            }

	        },
	        _processUpPages: function() {
	            var data = this._data.up;
	            var level = 0;

	            this._processPages(data, level);
	        },
	        _processMonitorPages: function() {
	            var data = this._data.monitor;

	            var rectConf = this.opts.rect;
	            var flowConf = this.opts.flow;

	            var items = data.items;
	            var fields = data.fields;

	            var pipeInX = this._monitorPagePosition.x;
	            var pipeInY = this._monitorPagePosition.y - flowConf.monitorPipelineHeight / 2;

	            var pipeOutX = pipeInX + flowConf.monitorPipelineWidth + rectConf.monitorPage.width;
	            var pipeOutY = pipeInY;

	            var monitorX = pipeInX + flowConf.monitorPipelineWidth;
	            var monitorY = this._monitorPagePosition.y - rectConf.monitorPage.height / 2;

	            // 绘制流入小矩形
	            var pipeIn = this._rectRaphael(
	                pipeInX, pipeInY,
	                flowConf.monitorPipelineWidth, flowConf.monitorPipelineHeight, {
	                    "fill": "#89b7e8",
	                    "stroke": "none"
	                }
	            );

	            // 绘制监控页面矩形
	            var monitor = this._rect(
	                monitorX, monitorY,
	                rectConf.monitorPage.width, rectConf.monitorPage.height, {
	                    'background-color': '#9fccff',
	                    'box-shadow': '1px 3px 5px #d0e3ef',
	                    'color': '#fff',
	                    'background': 'radial-gradient(circle, #b6d8ff, #9fccff)'
	                }
	            );

	            var indicatorInfo = [];

	            if (fields.length > 1) {
	                for (var i = 1; i < fields.length; i++) {
	                    indicatorInfo.push(Util.format(
	                        rectConf.monitorPageDetailItem,
	                        fields[i], items[i]
	                    ));
	                }
	            }

	            monitor.innerHTML = Util.format(
	                rectConf.monitorPageTemplate,
	                items[0],
	                Util.truncat(items[0], 50),
	                indicatorInfo.join('')
	            );

	            // 绘制流出小矩形
	            var pipeOut = this._rectRaphael(
	                pipeOutX, pipeOutY,
	                flowConf.monitorPipelineWidth, flowConf.monitorPipelineHeight, {
	                    "fill": "#89b7e8",
	                    "stroke": "none"
	                }
	            );
	        },
	        _processDownPages: function() {
	            var data = this._data.down;
	            var level = 1;

	            this._processPages(data, level);
	        },
	        _processNoDataRect: function(x, y, level) {
	            var noDataConf = this.opts.noDataSettings,
	                rtl = level != 0 ? true : false,
	                rectX = rtl ? x + noDataConf.pipeWidth : x,
	                rectY = y - noDataConf.rectHeight / 2,
	                pipeInX = rtl ? x : x + noDataConf.rectWidth,
	                pipeInY = y - noDataConf.pipeHeight / 2,
	                rectWhichShouldBeABezierX = rtl ? x - noDataConf.bigPipeWidth : x + noDataConf.rectWidth + noDataConf.pipeWidth,
	                rectWhichShouldBeABezierY = y - noDataConf.bigPipeHeight / 2;

	            // 原贝塞尔曲线位置的管道
	            var rectWhichShouldBeABezier = this._rect(
	                rectWhichShouldBeABezierX, rectWhichShouldBeABezierY,
	                noDataConf.bigPipeWidth, noDataConf.bigPipeHeight, {
	                    "background-color": noDataConf.rectColor
	                });

	            // 流入小管道
	            var pipeIn = this._rect(
	                pipeInX, pipeInY,
	                noDataConf.pipeWidth, noDataConf.pipeHeight, {
	                    "background-color": noDataConf.rectColor
	                });

	            // 无数据色块
	            var rect = this._rect(
	                rectX, rectY,
	                noDataConf.rectWidth, noDataConf.rectHeight, {
	                    "background-color": noDataConf.rectColor
	                });

	            rect.innerHTML = noDataConf.message;
	        },
	        highLight: function(target, event) {
	            var x = Util.event.getPageX(event);
	            var y = Util.event.getPageY(event);

	            this._showTooltip.call(this, target, x, y);
	        },
	        unhighLight: function(target, event) {
	            this._tooltip && this._tooltip.hide();
	        },
	        _showTooltip: function (target, x, y) {
	            var displayData = target.getAttribute('data').split(',');

	            var content = [];

	            // data: [指标名称，指标值，指标名称，指标值...]
	            for (var i = 0; i < displayData.length; i += 2) {
	                content.push(
	                    displayData[i] + ': ' + displayData[i + 1] + '<br />'
	                );
	            }

	            var tipSettings = {
	                content: content.join(''),
	                style: {
	                    padding: '13px 12px',
	                    left: x,
	                    top: y
	                }
	            };

	            if (!this._tooltip) {
	                this._tooltip = Chart.createComponent(Tooltip, tipSettings);
	                this._tooltip.render(this.htmlPaper);
	                this._tooltip.show();
	            }
	            else {
	                this._tooltip.update(tipSettings);
	            }
	        },
	        convertData: function() {
	            var data = this._data;

	            for (var i in data) {
	                var fields = data[i].fields;
	                var items = data[i].items;

	                var indicatorSum = 0;

	                for (var j = 0; j < items.length; j++) {
	                    indicatorSum += items[j][1];
	                }

	                data[i].total = indicatorSum;
	            }
	        },
	        /**
	         * 色块只显示2行的长度 - 45个字符
	         * @private
	         */
	        _formateDisplayedText: function(text) {
	            return Util.truncat(text, 45);
	        },
	        /**
	         * 具体指标数字截取
	         * @private
	         */
	        _formateDisplayedIndicator: function(text) {
	            return Util.truncat(text, 12);
	        },
	    };

	    return Flow;

	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * @file 热力图
	 * @author wumingdan(wumingdan@baidu.com)
	 */

	!(__WEBPACK_AMD_DEFINE_RESULT__ = function (require) {
	    var Chart = __webpack_require__(2);
	    var Util = __webpack_require__(1);
	    var Filter = __webpack_require__(27);


	    // just support IE9+, chrome, firefox, safari and the browsers support svf
	    // because the performance issue blocks vml from rocking and roll
	    var HeatMap = {
	        defaults: {
	            heat: {
	                radius: [12, 40],    // [min circle, max circle]
	                colors: ['#f00', '#ff8e4b', '#e1d802', '#c7ff4b', '#016EAB']
	            },
	            align: 'center'
	        },
	        render: function () {
	            this.convertData();

	            this.draw();
	        },
	        setDataSet: function (data) {

	        },
	        draw: function () {
	            var points = this._data.points;

	            for (var i = points.length - 1; i >= 0; i--) {
	                var point = points[i];

	                if (point.length < 3 || point[2] <= 0) {
	                    continue;
	                }

	                var x = point[0];
	                var y = point[1];
	                var count = point[2];

	                var fillColor = this.getFillColor(count);
	                var radius = this.getHeatPointRadius(count);

	                this.drawPoint(x, y, radius, fillColor);
	            }

	            this.drawPointBlur();
	        },
	        drawPoint: function (x, y, radius, color) {
	            // 实体圆
	            var point = this.paper
	                .circle(x, y, radius)
	                .attr({
	                    fill: color, stroke: 'none'
	                });

	            !this.points && (this.points = []);
	            this.points.push(point);
	        },
	        drawPointBlur: function(){
	            if (this.points) {
	                // apply with the same filter
	                // this can save 200ms/8000(points)
	                Filter.blur(this.paper, this.points);
	            }
	        },

	        highLight: function (sector) {
	            throw 'Not implemented.';
	        },
	        unHighLight: function (sector) {
	            throw 'Not implemented.';
	        },
	        convertData: function () {
	            var data = this._data;
	            var points = data.points;

	            var align = this.opts.align;

	            var width = this.container.offsetWidth;
	            var height = this.container.offsetHeight;

	            this.minCount = Number.MAX_VALUE;
	            this.maxCount = 0;

	            for (var i = 0; i < points.length; i++) {
	                // [x, y, count]
	                var point = points[i];

	                // jump over incorrect items
	                if (point.length < 3) {
	                    continue;
	                }

	                var x = point[0];
	                var count = point[2];

	                count > this.maxCount && (this.maxCount = count);
	                count < this.minCount && (this.minCount = count);

	                switch (align) {
	                    case 'center':
	                        var middleX = width / 2;
	                        point[0] += middleX;
	                        break;
	                    case 'right':
	                        point[0] = width - x;
	                        break;
	                }
	            }
	        },
	        getFillColor: function (count) {
	            var minCount = this.minCount;
	            var maxCount = this.maxCount;

	            if (!count || count < minCount || count > maxCount) {
	                return false;
	            }

	            var colors = this.opts.heat.colors;
	            var colorTypes = colors.length;

	            // 给padding + 0.1，使下边界进入上一个区间
	            // 比如max是100，min是0
	            // 80，60，40，20，0这几个点的颜色分别取colors[0], colors[1], ..., colors[4]
	            var padding = (maxCount - minCount) / colorTypes + 0.1;

	            return colors[(maxCount - count) / padding | 0];
	        },
	        getHeatPointRadius: function (count) {
	            var minCount = this.minCount;
	            var maxCount = this.maxCount;

	            var maxRadius = this.opts.heat.radius[1];
	            var minRadius = this.opts.heat.radius[0];
	            var differ = maxRadius - minRadius;

	            // TODO，检查出发分母为0的情况
	            var padding = differ / (maxCount - minCount);

	            return minRadius + padding * (count - minCount);
	        }
	    };

	    return HeatMap;

	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * @file hm-charts
	 * @author wumingdan(wumingdan@baidu.com)
	 */

	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1), __webpack_require__(28)], __WEBPACK_AMD_DEFINE_RESULT__ = function(Util, Raphael) {

	    var Filter = {
	        ns: 'http://www.w3.org/2000/svg',
	        blur: function(paper, elements, stdDeviation, attributes) {
	            if (!elements) {
	                return false;
	            }

	            stdDeviation = stdDeviation || 3;
	            attributes = attributes || {};

	            attributes.stdDeviation = stdDeviation;
	    
	            var filterId = Filter.addFilter(paper, "feGaussianBlur", attributes);

	            if (!Util.isArray(elements)) {
	                elements = [elements];
	            }

	            for (var i = 0; i < elements.length; i++) {
	                elements[i].node.setAttribute('filter', 'url(#' + filterId + ')');
	            }
	        },
	        addFilter: function(paper, type, attributes, children) {
	            attributes = attributes || {};

	            var uniqueId = 'filter-' + Util.getUniqueId();

	            var filter = Filter.filter(uniqueId, type, attributes);

	            paper.defs.appendChild(filter);

	            return uniqueId;
	        },
	        filter: function(id, type, attributes) {
	            // filter element
	            var filter = document.createElementNS(Filter.ns, "filter");

	            filter.setAttribute("id", id);
	            filter.setAttribute("x", "-25%");
	            filter.setAttribute("y", "-25%");
	            filter.setAttribute("width", "150%");
	            filter.setAttribute("height", "150%");

	            // effect element
	            var effect = Filter.effect(type, attributes);
	            filter.appendChild(effect);

	            return filter;
	        },
	        effect: function(type, attributes) {
	            var effect = document.createElementNS(Filter.ns, type);

	            for (var key in attributes) {
	                effect.setAttribute(key, attributes[key]);
	            }

	            return effect;
	        }
	    }

	    return Filter;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;//define(function (require) {

	// ┌────────────────────────────────────────────────────────────────────┐ \\
	// │ Raphaël 2.1.0 - JavaScript Vector Library                          │ \\
	// ├────────────────────────────────────────────────────────────────────┤ \\
	// │ Copyright © 2008-2012 Dmitry Baranovskiy (http://raphaeljs.com)    │ \\
	// │ Copyright © 2008-2012 Sencha Labs (http://sencha.com)              │ \\
	// ├────────────────────────────────────────────────────────────────────┤ \\
	// │ Licensed under the MIT (http://raphaeljs.com/license.html) license.│ \\
	// └────────────────────────────────────────────────────────────────────┘ \\
	// ┌──────────────────────────────────────────────────────────────────────────────────────┐ \\
	// │ Eve 0.3.4 - JavaScript Events Library                                                │ \\
	// ├──────────────────────────────────────────────────────────────────────────────────────┤ \\
	// │ Copyright (c) 2008-2011 Dmitry Baranovskiy (http://dmitry.baranovskiy.com/)          │ \\
	// │ Licensed under the MIT (http://www.opensource.org/licenses/mit-license.php) license. │ \\
	// └──────────────────────────────────────────────────────────────────────────────────────┘ \\
	(function (glob) {
	    var version = "0.3.4",
	        has = "hasOwnProperty",
	        separator = /[\.\/]/,
	        wildcard = "*",
	        fun = function () { },
	        numsort = function (a, b) {
	            return a - b;
	        },
	        current_event,
		stop,
		events = { n: {} };

	    glob.eve = function (name, scope) {
	        var e = events,
	            oldstop = stop,
	            args = Array.prototype.slice.call(arguments, 2),
	            listeners = eve.listeners(name),
	            z = 0,
	            f = false,
	            l, indexed = [],
	            queue = {},
	            out = [],
	            ce = current_event,
	            errors = [];
	        current_event = name;
	        stop = 0;
	        for (var i = 0, ii = listeners.length; i < ii; i++)
	            if ("zIndex" in listeners[i]) {
	                indexed.push(listeners[i].zIndex);
	                if (listeners[i].zIndex < 0) {
	                    queue[listeners[i].zIndex] = listeners[i];
	                }
	            }
	        indexed.sort(numsort);
	        while (indexed[z] < 0) {
	            l = queue[indexed[z++]];
	            out.push(l.apply(scope, args));
	            if (stop) {
	                stop = oldstop;
	                return out;
	            }
	        }
	        for (i = 0; i < ii; i++) {
	            l = listeners[i];
	            if ("zIndex" in l) {
	                if (l.zIndex == indexed[z]) {
	                    out.push(l.apply(scope, args));
	                    if (stop) {
	                        break;
	                    }
	                    do {
	                        z++;
	                        l = queue[indexed[z]];
	                        l && out.push(l.apply(scope, args));
	                        if (stop) {
	                            break;
	                        }
	                    } while (l)
	                } else {
	                    queue[l.zIndex] = l;
	                }
	            } else {
	                out.push(l.apply(scope, args));
	                if (stop) {
	                    break;
	                }
	            }
	        }
	        stop = oldstop;
	        current_event = ce;
	        return out.length ? out : null;
	    };

	    eve.listeners = function (name) {
	        var names = name.split(separator),
	            e = events,
	            item, items, k, i, ii, j, jj, nes, es = [e],
	            out = [];
	        for (i = 0, ii = names.length; i < ii; i++) {
	            nes = [];
	            for (j = 0, jj = es.length; j < jj; j++) {
	                e = es[j].n;
	                items = [e[names[i]], e[wildcard]];
	                k = 2;
	                while (k--) {
	                    item = items[k];
	                    if (item) {
	                        nes.push(item);
	                        out = out.concat(item.f || []);
	                    }
	                }
	            }
	            es = nes;
	        }
	        return out;
	    };


	    eve.on = function (name, f) {
	        var names = name.split(separator),
	            e = events;
	        for (var i = 0, ii = names.length; i < ii; i++) {
	            e = e.n;
	            !e[names[i]] && (e[names[i]] = {
	                n: {}
	            });
	            e = e[names[i]];
	        }
	        e.f = e.f || [];
	        for (i = 0, ii = e.f.length; i < ii; i++)
	            if (e.f[i] == f) {
	                return fun;
	            }
	        e.f.push(f);
	        return function (zIndex) {
	            if (+zIndex == +zIndex) {
	                f.zIndex = +zIndex;
	            }
	        };
	    };

	    eve.stop = function () {
	        stop = 1;
	    };

	    eve.nt = function (subname) {
	        if (subname) {
	            return new RegExp("(?:\\.|\\/|^)" + subname + "(?:\\.|\\/|$)").test(current_event);
	        }
	        return current_event;
	    };


	    eve.off = eve.unbind = function (name, f) {
	        var names = name.split(separator),
	            e, key, splice, i, ii, j, jj, cur = [events];
	        for (i = 0, ii = names.length; i < ii; i++) {
	            for (j = 0; j < cur.length; j += splice.length - 2) {
	                splice = [j, 1];
	                e = cur[j].n;
	                if (names[i] != wildcard) {
	                    if (e[names[i]]) {
	                        splice.push(e[names[i]]);
	                    }
	                } else {
	                    for (key in e)
	                        if (e[has](key)) {
	                            splice.push(e[key]);
	                        }
	                }
	                cur.splice.apply(cur, splice);
	            }
	        }
	        for (i = 0, ii = cur.length; i < ii; i++) {
	            e = cur[i];
	            while (e.n) {
	                if (f) {
	                    if (e.f) {
	                        for (j = 0, jj = e.f.length; j < jj; j++)
	                            if (e.f[j] == f) {
	                                e.f.splice(j, 1);
	                                break;
	                            } !e.f.length && delete e.f;
	                    }
	                    for (key in e.n)
	                        if (e.n[has](key) && e.n[key].f) {
	                            var funcs = e.n[key].f;
	                            for (j = 0, jj = funcs.length; j < jj; j++)
	                                if (funcs[j] == f) {
	                                    funcs.splice(j, 1);
	                                    break;
	                                } !funcs.length && delete e.n[key].f;
	                        }
	                } else {
	                    delete e.f;
	                    for (key in e.n)
	                        if (e.n[has](key) && e.n[key].f) {
	                            delete e.n[key].f;
	                        }
	                }
	                e = e.n;
	            }
	        }
	    };

	    eve.once = function (name, f) {
	        var f2 = function () {
	            var res = f.apply(this, arguments);
	            eve.unbind(name, f2);
	            return res;
	        };
	        return eve.on(name, f2);
	    };

	    eve.version = version;
	    eve.toString = function () {
	        return "You are running Eve " + version;
	    };
	    (typeof module != "undefined" && module.exports) ? (module.exports = eve) : ( true ? (!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function () {
	        return eve;
	    }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__))) : (glob.eve = eve));
	})(this);


	// ┌─────────────────────────────────────────────────────────────────────┐ \\
	// │ "Raphaël 2.1.0" - JavaScript Vector Library                         │ \\
	// ├─────────────────────────────────────────────────────────────────────┤ \\
	// │ Copyright (c) 2008-2011 Dmitry Baranovskiy (http://raphaeljs.com)   │ \\
	// │ Copyright (c) 2008-2011 Sencha Labs (http://sencha.com)             │ \\
	// │ Licensed under the MIT (http://raphaeljs.com/license.html) license. │ \\
	// └─────────────────────────────────────────────────────────────────────┘ \\
	(function () {

	    function R(first) {
	        if (R.is(first, "function")) {
	            return loaded ? first() : eve.on("raphael.DOMload", first);
	        } else if (R.is(first, array)) {
	            return R._engine.create[apply](R, first.splice(0, 3 + R.is(first[0], nu))).add(first);
	        } else {
	            var args = Array.prototype.slice.call(arguments, 0);
	            if (R.is(args[args.length - 1], "function")) {
	                var f = args.pop();
	                return loaded ? f.call(R._engine.create[apply](R, args)) : eve.on("raphael.DOMload", function () {
	                    f.call(R._engine.create[apply](R, args));
	                });
	            } else {
	                return R._engine.create[apply](R, arguments);
	            }
	        }
	    }
	    R.version = "2.1.0";
	    R.eve = eve;
	    var loaded, separator = /[, ]+/,
	        elements = {
	            circle: 1,
	            rect: 1,
	            path: 1,
	            ellipse: 1,
	            text: 1,
	            image: 1
	        },
	        formatrg = /\{(\d+)\}/g,
	        proto = "prototype",
	        has = "hasOwnProperty",
	        g = {
	            doc: document,
	            win: window
	        },
	        oldRaphael = {
	            was: Object.prototype[has].call(g.win, "Raphael"),
	            is: g.win.Raphael
	        },
	        Paper = function () {

	            // [wumingdan] custom attributes
	            this.ca = this.customAttributes = {
	                piePath: function (x, y, r, a1, a2) {
	                    var flag = (a2 - a1) > 180,
	                        clr = (a2 - a1) / 360;
	                    a1 = (a1 % 360) * Math.PI / 180;
	                    a2 = (a2 % 360) * Math.PI / 180;
	                    return {
	                        path: [
	                            ["M", x, y],
	                            ["l", r * Math.cos(a1), r * Math.sin(a1)],
	                            ["A", r, r, 0, +flag, 1, x + r * Math.cos(a2), y + r * Math.sin(a2)],
	                            ["z"]
	                        ]
	                    };
	                },

	                'class': function (clazz) {
	                    if (!R.svg) {
	                        this.node && (this.node.className = this.node.className + ' ' + clazz);
	                    }
	                }
	            };
	        },
	        paperproto, appendChild = "appendChild",
	        apply = "apply",
	        concat = "concat",
	        supportsTouch = "createTouch" in g.doc,
	        E = "",
	        S = " ",
	        Str = String,
	        split = "split",
	        events = "click dblclick mousedown mousemove mouseout mouseover mouseup touchstart touchmove touchend touchcancel"[split](S),
	        touchMap = {
	            mousedown: "touchstart",
	            mousemove: "touchmove",
	            mouseup: "touchend"
	        },
	        lowerCase = Str.prototype.toLowerCase,
	        math = Math,
	        mmax = math.max,
	        mmin = math.min,
	        abs = math.abs,
	        pow = math.pow,
	        PI = math.PI,
	        nu = "number",
	        string = "string",
	        array = "array",
	        toString = "toString",
	        fillString = "fill",
	        objectToString = Object.prototype.toString,
	        paper = {},
	        push = "push",
	        ISURL = R._ISURL = /^url\(['"]?([^\)]+?)['"]?\)$/i,
	        colourRegExp = /^\s*((#[a-f\d]{6})|(#[a-f\d]{3})|rgba?\(\s*([\d\.]+%?\s*,\s*[\d\.]+%?\s*,\s*[\d\.]+%?(?:\s*,\s*[\d\.]+%?)?)\s*\)|hsba?\(\s*([\d\.]+(?:deg|\xb0|%)?\s*,\s*[\d\.]+%?\s*,\s*[\d\.]+(?:%?\s*,\s*[\d\.]+)?)%?\s*\)|hsla?\(\s*([\d\.]+(?:deg|\xb0|%)?\s*,\s*[\d\.]+%?\s*,\s*[\d\.]+(?:%?\s*,\s*[\d\.]+)?)%?\s*\))\s*$/i,
	        isnan = {
	            "NaN": 1,
	            "Infinity": 1,
	            "-Infinity": 1
	        },
	        bezierrg = /^(?:cubic-)?bezier\(([^,]+),([^,]+),([^,]+),([^\)]+)\)/,
	        round = math.round,
	        setAttribute = "setAttribute",
	        toFloat = parseFloat,
	        toInt = parseInt,
	        upperCase = Str.prototype.toUpperCase,
	        availableAttrs = R._availableAttrs = {
	            "arrow-end": "none",
	            "arrow-start": "none",
	            blur: 0,
	            "clip-rect": "0 0 1e9 1e9",
	            cursor: "default",
	            cx: 0,
	            cy: 0,
	            fill: "#fff",
	            "fill-opacity": 1,
	            font: '10px Arial',
	            "font-family": 'Arial',
	            "font-size": "10",
	            "font-style": "normal",
	            "font-weight": 400,
	            gradient: 0,
	            height: 0,
	            href: "http://raphaeljs.com/",
	            "letter-spacing": 0,
	            opacity: 1,
	            path: "M0,0",
	            r: 0,
	            rx: 0,
	            ry: 0,
	            src: "",
	            stroke: "#000",
	            "stroke-dasharray": "",
	            "stroke-linecap": "butt",
	            "stroke-linejoin": "butt",
	            "stroke-miterlimit": 0,
	            "stroke-opacity": 1,
	            "stroke-width": 1,
	            target: "_blank",
	            "text-anchor": "middle",
	            title: "Raphael",
	            transform: "",
	            width: 0,
	            x: 0,
	            y: 0,
	            'class': ''     // [wumingdan] support class as element attr
	        },
	        availableAnimAttrs = R._availableAnimAttrs = {
	            blur: nu,
	            "clip-rect": "csv",
	            cx: nu,
	            cy: nu,
	            fill: "colour",
	            "fill-opacity": nu,
	            "font-size": nu,
	            height: nu,
	            opacity: nu,
	            path: "path",
	            r: nu,
	            rx: nu,
	            ry: nu,
	            stroke: "colour",
	            "stroke-opacity": nu,
	            "stroke-width": nu,
	            transform: "transform",
	            width: nu,
	            x: nu,
	            y: nu
	        },
	        whitespace = /[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]/g,
	        commaSpaces = /[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*,[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*/,
	        hsrg = {
	            hs: 1,
	            rg: 1
	        },
	        p2s = /,?([achlmqrstvxz]),?/gi,
	        pathCommand = /([achlmrqstvz])[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029,]*((-?\d*\.?\d*(?:e[\-+]?\d+)?[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*,?[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*)+)/ig,
	        tCommand = /([rstm])[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029,]*((-?\d*\.?\d*(?:e[\-+]?\d+)?[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*,?[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*)+)/ig,
	        pathValues = /(-?\d*\.?\d*(?:e[\-+]?\d+)?)[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*,?[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*/ig,
	        radial_gradient = R._radial_gradient = /^r(?:\(([^,]+?)[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*,[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*([^\)]+?)\))?/,
	        eldata = {},
	        sortByKey = function (a, b) {
	            return a.key - b.key;
	        },
	        sortByNumber = function (a, b) {
	            return toFloat(a) - toFloat(b);
	        },
	        fun = function () { },
	        pipe = function (x) {
	            return x;
	        },
	        rectPath = R._rectPath = function (x, y, w, h, r) {
	            if (r) {
	                return [
	                    ["M", x + r, y],
	                    ["l", w - r * 2, 0],
	                    ["a", r, r, 0, 0, 1, r, r],
	                    ["l", 0, h - r * 2],
	                    ["a", r, r, 0, 0, 1, -r, r],
	                    ["l", r * 2 - w, 0],
	                    ["a", r, r, 0, 0, 1, -r, -r],
	                    ["l", 0, r * 2 - h],
	                    ["a", r, r, 0, 0, 1, r, -r],
	                    ["z"]
	                ];
	            }
	            return [
	                ["M", x, y],
	                ["l", w, 0],
	                ["l", 0, h],
	                ["l", -w, 0],
	                ["z"]
	            ];
	        },
	        ellipsePath = function (x, y, rx, ry) {
	            if (ry == null) {
	                ry = rx;
	            }
	            return [
	                ["M", x, y],
	                ["m", 0, -ry],
	                ["a", rx, ry, 0, 1, 1, 0, 2 * ry],
	                ["a", rx, ry, 0, 1, 1, 0, -2 * ry],
	                ["z"]
	            ];
	        },
	        getPath = R._getPath = {
	            path: function (el) {
	                return el.attr("path");
	            },
	            circle: function (el) {
	                var a = el.attrs;
	                return ellipsePath(a.cx, a.cy, a.r);
	            },
	            ellipse: function (el) {
	                var a = el.attrs;
	                return ellipsePath(a.cx, a.cy, a.rx, a.ry);
	            },
	            rect: function (el) {
	                var a = el.attrs;
	                return rectPath(a.x, a.y, a.width, a.height, a.r);
	            },
	            image: function (el) {
	                var a = el.attrs;
	                return rectPath(a.x, a.y, a.width, a.height);
	            },
	            text: function (el) {
	                var bbox = el._getBBox();
	                return rectPath(bbox.x, bbox.y, bbox.width, bbox.height);
	            }
	        },

	        mapPath = R.mapPath = function (path, matrix) {
	            if (!matrix) {
	                return path;
	            }
	            var x, y, i, j, ii, jj, pathi;
	            path = path2curve(path);
	            for (i = 0, ii = path.length; i < ii; i++) {
	                pathi = path[i];
	                for (j = 1, jj = pathi.length; j < jj; j += 2) {
	                    x = matrix.x(pathi[j], pathi[j + 1]);
	                    y = matrix.y(pathi[j], pathi[j + 1]);
	                    pathi[j] = x;
	                    pathi[j + 1] = y;
	                }
	            }
	            return path;
	        };

	    R._g = g;

	    R.type = (g.win.SVGAngle || g.doc.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#BasicStructure", "1.1") ? "SVG" : "VML");
	    if (R.type == "VML") {
	        var d = g.doc.createElement("div"),
	            b;
	        d.innerHTML = '<v:shape adj="1"/>';
	        b = d.firstChild;
	        b.style.behavior = "url(#default#VML)";
	        if (!(b && typeof b.adj == "object")) {
	            return (R.type = E);
	        }
	        d = null;
	    }


	    R.svg = !(R.vml = R.type == "VML");
	    R._Paper = Paper;

	    R.fn = paperproto = Paper.prototype = R.prototype;
	    R._id = 0;
	    R._oid = 0;

	    R.is = function (o, type) {
	        type = lowerCase.call(type);
	        if (type == "finite") {
	            return !isnan[has](+o);
	        }
	        if (type == "array") {
	            return o instanceof Array;
	        }
	        return (type == "null" && o === null) || (type == typeof o && o !== null) || (type == "object" && o === Object(o)) || (type == "array" && Array.isArray && Array.isArray(o)) || objectToString.call(o).slice(8, -1).toLowerCase() == type;
	    };

	    function clone(obj) {
	        if (Object(obj) !== obj) {
	            return obj;
	        }
	        var res = new obj.constructor;
	        for (var key in obj)
	            if (obj[has](key)) {
	                res[key] = clone(obj[key]);
	            }
	        return res;
	    }


	    R.angle = function (x1, y1, x2, y2, x3, y3) {
	        if (x3 == null) {
	            var x = x1 - x2,
	                y = y1 - y2;
	            if (!x && !y) {
	                return 0;
	            }
	            return (180 + math.atan2(-y, -x) * 180 / PI + 360) % 360;
	        } else {
	            return R.angle(x1, y1, x3, y3) - R.angle(x2, y2, x3, y3);
	        }
	    };

	    R.rad = function (deg) {
	        return deg % 360 * PI / 180;
	    };

	    R.deg = function (rad) {
	        return rad * 180 / PI % 360;
	    };

	    R.snapTo = function (values, value, tolerance) {
	        tolerance = R.is(tolerance, "finite") ? tolerance : 10;
	        if (R.is(values, array)) {
	            var i = values.length;
	            while (i--)
	                if (abs(values[i] - value) <= tolerance) {
	                    return values[i];
	                }
	        } else {
	            values = +values;
	            var rem = value % values;
	            if (rem < tolerance) {
	                return value - rem;
	            }
	            if (rem > values - tolerance) {
	                return value - rem + values;
	            }
	        }
	        return value;
	    };


	    var createUUID = R.createUUID = (function (uuidRegEx, uuidReplacer) {
	        return function () {
	            return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(uuidRegEx, uuidReplacer).toUpperCase();
	        };
	    })(/[xy]/g, function (c) {
	        var r = math.random() * 16 | 0,
	            v = c == "x" ? r : (r & 3 | 8);
	        return v.toString(16);
	    });


	    R.setWindow = function (newwin) {
	        eve("raphael.setWindow", R, g.win, newwin);
	        g.win = newwin;
	        g.doc = g.win.document;
	        if (R._engine.initWin) {
	            R._engine.initWin(g.win);
	        }
	    };
	    var toHex = function (color) {
	        if (R.vml) {
	            // http://dean.edwards.name/weblog/2009/10/convert-any-colour-value-to-hex-in-msie/
	            var trim = /^\s+|\s+$/g;
	            var bod;
	            try {
	                var docum = new ActiveXObject("htmlfile");
	                docum.write("<body>");
	                docum.close();
	                bod = docum.body;
	            } catch (e) {
	                bod = createPopup().document.body;
	            }
	            var range = bod.createTextRange();
	            toHex = cacher(function (color) {
	                try {
	                    bod.style.color = Str(color).replace(trim, E);
	                    var value = range.queryCommandValue("ForeColor");
	                    value = ((value & 255) << 16) | (value & 65280) | ((value & 16711680) >>> 16);
	                    return "#" + ("000000" + value.toString(16)).slice(-6);
	                } catch (e) {
	                    return "none";
	                }
	            });
	        } else {
	            var i = g.doc.createElement("i");
	            i.title = "Rapha\xebl Colour Picker";
	            i.style.display = "none";
	            g.doc.body.appendChild(i);
	            toHex = cacher(function (color) {
	                i.style.color = color;
	                return g.doc.defaultView.getComputedStyle(i, E).getPropertyValue("color");
	            });
	        }
	        return toHex(color);
	    },
	        hsbtoString = function () {
	            return "hsb(" + [this.h, this.s, this.b] + ")";
	        },
	        hsltoString = function () {
	            return "hsl(" + [this.h, this.s, this.l] + ")";
	        },
	        rgbtoString = function () {
	            return this.hex;
	        },
	        prepareRGB = function (r, g, b) {
	            if (g == null && R.is(r, "object") && "r" in r && "g" in r && "b" in r) {
	                b = r.b;
	                g = r.g;
	                r = r.r;
	            }
	            if (g == null && R.is(r, string)) {
	                var clr = R.getRGB(r);
	                r = clr.r;
	                g = clr.g;
	                b = clr.b;
	            }
	            if (r > 1 || g > 1 || b > 1) {
	                r /= 255;
	                g /= 255;
	                b /= 255;
	            }

	            return [r, g, b];
	        },
	        packageRGB = function (r, g, b, o) {
	            r *= 255;
	            g *= 255;
	            b *= 255;
	            var rgb = {
	                r: r,
	                g: g,
	                b: b,
	                hex: R.rgb(r, g, b),
	                toString: rgbtoString
	            };
	            R.is(o, "finite") && (rgb.opacity = o);
	            return rgb;
	        };


	    R.color = function (clr) {
	        var rgb;
	        if (R.is(clr, "object") && "h" in clr && "s" in clr && "b" in clr) {
	            rgb = R.hsb2rgb(clr);
	            clr.r = rgb.r;
	            clr.g = rgb.g;
	            clr.b = rgb.b;
	            clr.hex = rgb.hex;
	        } else if (R.is(clr, "object") && "h" in clr && "s" in clr && "l" in clr) {
	            rgb = R.hsl2rgb(clr);
	            clr.r = rgb.r;
	            clr.g = rgb.g;
	            clr.b = rgb.b;
	            clr.hex = rgb.hex;
	        } else {
	            if (R.is(clr, "string")) {
	                clr = R.getRGB(clr);
	            }
	            if (R.is(clr, "object") && "r" in clr && "g" in clr && "b" in clr) {
	                rgb = R.rgb2hsl(clr);
	                clr.h = rgb.h;
	                clr.s = rgb.s;
	                clr.l = rgb.l;
	                rgb = R.rgb2hsb(clr);
	                clr.v = rgb.b;
	            } else {
	                clr = {
	                    hex: "none"
	                };
	                clr.r = clr.g = clr.b = clr.h = clr.s = clr.v = clr.l = -1;
	            }
	        }
	        clr.toString = rgbtoString;
	        return clr;
	    };

	    R.hsb2rgb = function (h, s, v, o) {
	        if (this.is(h, "object") && "h" in h && "s" in h && "b" in h) {
	            v = h.b;
	            s = h.s;
	            h = h.h;
	            o = h.o;
	        }
	        h *= 360;
	        var R, G, B, X, C;
	        h = (h % 360) / 60;
	        C = v * s;
	        X = C * (1 - abs(h % 2 - 1));
	        R = G = B = v - C;

	        h = ~~h;
	        R += [C, X, 0, 0, X, C][h];
	        G += [X, C, C, X, 0, 0][h];
	        B += [0, 0, X, C, C, X][h];
	        return packageRGB(R, G, B, o);
	    };

	    R.hsl2rgb = function (h, s, l, o) {
	        if (this.is(h, "object") && "h" in h && "s" in h && "l" in h) {
	            l = h.l;
	            s = h.s;
	            h = h.h;
	        }
	        if (h > 1 || s > 1 || l > 1) {
	            h /= 360;
	            s /= 100;
	            l /= 100;
	        }
	        h *= 360;
	        var R, G, B, X, C;
	        h = (h % 360) / 60;
	        C = 2 * s * (l < .5 ? l : 1 - l);
	        X = C * (1 - abs(h % 2 - 1));
	        R = G = B = l - C / 2;

	        h = ~~h;
	        R += [C, X, 0, 0, X, C][h];
	        G += [X, C, C, X, 0, 0][h];
	        B += [0, 0, X, C, C, X][h];
	        return packageRGB(R, G, B, o);
	    };

	    R.rgb2hsb = function (r, g, b) {
	        b = prepareRGB(r, g, b);
	        r = b[0];
	        g = b[1];
	        b = b[2];

	        var H, S, V, C;
	        V = mmax(r, g, b);
	        C = V - mmin(r, g, b);
	        H = (C == 0 ? null : V == r ? (g - b) / C : V == g ? (b - r) / C + 2 : (r - g) / C + 4);
	        H = ((H + 360) % 6) * 60 / 360;
	        S = C == 0 ? 0 : C / V;
	        return {
	            h: H,
	            s: S,
	            b: V,
	            toString: hsbtoString
	        };
	    };

	    R.rgb2hsl = function (r, g, b) {
	        b = prepareRGB(r, g, b);
	        r = b[0];
	        g = b[1];
	        b = b[2];

	        var H, S, L, M, m, C;
	        M = mmax(r, g, b);
	        m = mmin(r, g, b);
	        C = M - m;
	        H = (C == 0 ? null : M == r ? (g - b) / C : M == g ? (b - r) / C + 2 : (r - g) / C + 4);
	        H = ((H + 360) % 6) * 60 / 360;
	        L = (M + m) / 2;
	        S = (C == 0 ? 0 : L < .5 ? C / (2 * L) : C / (2 - 2 * L));
	        return {
	            h: H,
	            s: S,
	            l: L,
	            toString: hsltoString
	        };
	    };
	    R._path2string = function () {
	        return this.join(",").replace(p2s, "$1");
	    };

	    function repush(array, item) {
	        for (var i = 0, ii = array.length; i < ii; i++)
	            if (array[i] === item) {
	                return array.push(array.splice(i, 1)[0]);
	            }
	    }

	    function cacher(f, scope, postprocessor) {
	        function newf() {
	            var arg = Array.prototype.slice.call(arguments, 0),
	                args = arg.join("\u2400"),
	                cache = newf.cache = newf.cache || {},
	                count = newf.count = newf.count || [];
	            if (cache[has](args)) {
	                repush(count, args);
	                return postprocessor ? postprocessor(cache[args]) : cache[args];
	            }
	            count.length >= 1e3 && delete cache[count.shift()];
	            count.push(args);
	            cache[args] = f[apply](scope, arg);
	            return postprocessor ? postprocessor(cache[args]) : cache[args];
	        }
	        return newf;
	    }

	    var preload = R._preload = function (src, f) {
	        var img = g.doc.createElement("img");
	        img.style.cssText = "position:absolute;left:-9999em;top:-9999em";
	        img.onload = function () {
	            f.call(this);
	            this.onload = null;
	            g.doc.body.removeChild(this);
	        };
	        img.onerror = function () {
	            g.doc.body.removeChild(this);
	        };
	        g.doc.body.appendChild(img);
	        img.src = src;
	    };

	    function clrToString() {
	        return this.hex;
	    }


	    R.getRGB = cacher(function (colour) {
	        if (!colour || !!((colour = Str(colour)).indexOf("-") + 1)) {
	            return {
	                r: -1,
	                g: -1,
	                b: -1,
	                hex: "none",
	                error: 1,
	                toString: clrToString
	            };
	        }
	        if (colour == "none") {
	            return {
	                r: -1,
	                g: -1,
	                b: -1,
	                hex: "none",
	                toString: clrToString
	            };
	        } !(hsrg[has](colour.toLowerCase().substring(0, 2)) || colour.charAt() == "#") && (colour = toHex(colour));
	        var res, red, green, blue, opacity, t, values, rgb = colour.match(colourRegExp);
	        if (rgb) {
	            if (rgb[2]) {
	                blue = toInt(rgb[2].substring(5), 16);
	                green = toInt(rgb[2].substring(3, 5), 16);
	                red = toInt(rgb[2].substring(1, 3), 16);
	            }
	            if (rgb[3]) {
	                blue = toInt((t = rgb[3].charAt(3)) + t, 16);
	                green = toInt((t = rgb[3].charAt(2)) + t, 16);
	                red = toInt((t = rgb[3].charAt(1)) + t, 16);
	            }
	            if (rgb[4]) {
	                values = rgb[4][split](commaSpaces);
	                red = toFloat(values[0]);
	                values[0].slice(-1) == "%" && (red *= 2.55);
	                green = toFloat(values[1]);
	                values[1].slice(-1) == "%" && (green *= 2.55);
	                blue = toFloat(values[2]);
	                values[2].slice(-1) == "%" && (blue *= 2.55);
	                rgb[1].toLowerCase().slice(0, 4) == "rgba" && (opacity = toFloat(values[3]));
	                values[3] && values[3].slice(-1) == "%" && (opacity /= 100);
	            }
	            if (rgb[5]) {
	                values = rgb[5][split](commaSpaces);
	                red = toFloat(values[0]);
	                values[0].slice(-1) == "%" && (red *= 2.55);
	                green = toFloat(values[1]);
	                values[1].slice(-1) == "%" && (green *= 2.55);
	                blue = toFloat(values[2]);
	                values[2].slice(-1) == "%" && (blue *= 2.55);
	                (values[0].slice(-3) == "deg" || values[0].slice(-1) == "\xb0") && (red /= 360);
	                rgb[1].toLowerCase().slice(0, 4) == "hsba" && (opacity = toFloat(values[3]));
	                values[3] && values[3].slice(-1) == "%" && (opacity /= 100);
	                return R.hsb2rgb(red, green, blue, opacity);
	            }
	            if (rgb[6]) {
	                values = rgb[6][split](commaSpaces);
	                red = toFloat(values[0]);
	                values[0].slice(-1) == "%" && (red *= 2.55);
	                green = toFloat(values[1]);
	                values[1].slice(-1) == "%" && (green *= 2.55);
	                blue = toFloat(values[2]);
	                values[2].slice(-1) == "%" && (blue *= 2.55);
	                (values[0].slice(-3) == "deg" || values[0].slice(-1) == "\xb0") && (red /= 360);
	                rgb[1].toLowerCase().slice(0, 4) == "hsla" && (opacity = toFloat(values[3]));
	                values[3] && values[3].slice(-1) == "%" && (opacity /= 100);
	                return R.hsl2rgb(red, green, blue, opacity);
	            }
	            rgb = {
	                r: red,
	                g: green,
	                b: blue,
	                toString: clrToString
	            };
	            rgb.hex = "#" + (16777216 | blue | (green << 8) | (red << 16)).toString(16).slice(1);
	            R.is(opacity, "finite") && (rgb.opacity = opacity);
	            return rgb;
	        }
	        return {
	            r: -1,
	            g: -1,
	            b: -1,
	            hex: "none",
	            error: 1,
	            toString: clrToString
	        };
	    }, R);

	    R.hsb = cacher(function (h, s, b) {
	        return R.hsb2rgb(h, s, b).hex;
	    });

	    R.hsl = cacher(function (h, s, l) {
	        return R.hsl2rgb(h, s, l).hex;
	    });

	    R.rgb = cacher(function (r, g, b) {
	        return "#" + (16777216 | b | (g << 8) | (r << 16)).toString(16).slice(1);
	    });

	    R.getColor = function (value) {
	        var start = this.getColor.start = this.getColor.start || {
	            h: 0,
	            s: 1,
	            b: value || .75
	        },
	            rgb = this.hsb2rgb(start.h, start.s, start.b);
	        start.h += .075;
	        if (start.h > 1) {
	            start.h = 0;
	            start.s -= .2;
	            start.s <= 0 && (this.getColor.start = {
	                h: 0,
	                s: 1,
	                b: start.b
	            });
	        }
	        return rgb.hex;
	    };

	    R.getColor.reset = function () {
	        delete this.start;
	    };

	    // http://schepers.cc/getting-to-the-point

	    function catmullRom2bezier(crp, z) {
	        var d = [];
	        for (var i = 0, iLen = crp.length; iLen - 2 * !z > i; i += 2) {
	            var p = [{
	                x: +crp[i - 2],
	                y: +crp[i - 1]
	            }, {
	                x: +crp[i],
	                y: +crp[i + 1]
	            }, {
	                x: +crp[i + 2],
	                y: +crp[i + 3]
	            }, {
	                x: +crp[i + 4],
	                y: +crp[i + 5]
	            }];
	            if (z) {
	                if (!i) {
	                    p[0] = {
	                        x: +crp[iLen - 2],
	                        y: +crp[iLen - 1]
	                    };
	                } else if (iLen - 4 == i) {
	                    p[3] = {
	                        x: +crp[0],
	                        y: +crp[1]
	                    };
	                } else if (iLen - 2 == i) {
	                    p[2] = {
	                        x: +crp[0],
	                        y: +crp[1]
	                    };
	                    p[3] = {
	                        x: +crp[2],
	                        y: +crp[3]
	                    };
	                }
	            } else {
	                if (iLen - 4 == i) {
	                    p[3] = p[2];
	                } else if (!i) {
	                    p[0] = {
	                        x: +crp[i],
	                        y: +crp[i + 1]
	                    };
	                }
	            }
	            d.push(["C", (-p[0].x + 6 * p[1].x + p[2].x) / 6, (-p[0].y + 6 * p[1].y + p[2].y) / 6, (p[1].x + 6 * p[2].x - p[3].x) / 6, (p[1].y + 6 * p[2].y - p[3].y) / 6, p[2].x, p[2].y]);
	        }

	        return d;
	    }

	    R.parsePathString = function (pathString) {
	        if (!pathString) {
	            return null;
	        }
	        var pth = paths(pathString);
	        if (pth.arr) {
	            return pathClone(pth.arr);
	        }

	        var paramCounts = {
	            a: 7,
	            c: 6,
	            h: 1,
	            l: 2,
	            m: 2,
	            r: 4,
	            q: 4,
	            s: 4,
	            t: 2,
	            v: 1,
	            z: 0
	        },
	            data = [];
	        if (R.is(pathString, array) && R.is(pathString[0], array)) { // rough assumption
	            data = pathClone(pathString);
	        }
	        if (!data.length) {
	            Str(pathString).replace(pathCommand, function (a, b, c) {
	                var params = [],
	                    name = b.toLowerCase();
	                c.replace(pathValues, function (a, b) {
	                    b && params.push(+b);
	                });
	                if (name == "m" && params.length > 2) {
	                    data.push([b][concat](params.splice(0, 2)));
	                    name = "l";
	                    b = b == "m" ? "l" : "L";
	                }
	                if (name == "r") {
	                    data.push([b][concat](params));
	                } else
	                    while (params.length >= paramCounts[name]) {
	                        data.push([b][concat](params.splice(0, paramCounts[name])));
	                        if (!paramCounts[name]) {
	                            break;
	                        }
	                    }
	            });
	        }
	        data.toString = R._path2string;
	        pth.arr = pathClone(data);
	        return data;
	    };

	    R.parseTransformString = cacher(function (TString) {
	        if (!TString) {
	            return null;
	        }
	        var paramCounts = {
	            r: 3,
	            s: 4,
	            t: 2,
	            m: 6
	        },
	            data = [];
	        if (R.is(TString, array) && R.is(TString[0], array)) { // rough assumption
	            data = pathClone(TString);
	        }
	        if (!data.length) {
	            Str(TString).replace(tCommand, function (a, b, c) {
	                var params = [],
	                    name = lowerCase.call(b);
	                c.replace(pathValues, function (a, b) {
	                    b && params.push(+b);
	                });
	                data.push([b][concat](params));
	            });
	        }
	        data.toString = R._path2string;
	        return data;
	    });
	    // PATHS
	    var paths = function (ps) {
	        var p = paths.ps = paths.ps || {};
	        if (p[ps]) {
	            p[ps].sleep = 100;
	        } else {
	            p[ps] = {
	                sleep: 100
	            };
	        }
	        setTimeout(function () {
	            for (var key in p)
	                if (p[has](key) && key != ps) {
	                    p[key].sleep--;
	                    !p[key].sleep && delete p[key];
	                }
	        });
	        return p[ps];
	    };

	    R.findDotsAtSegment = function (p1x, p1y, c1x, c1y, c2x, c2y, p2x, p2y, t) {
	        var t1 = 1 - t,
	            t13 = pow(t1, 3),
	            t12 = pow(t1, 2),
	            t2 = t * t,
	            t3 = t2 * t,
	            x = t13 * p1x + t12 * 3 * t * c1x + t1 * 3 * t * t * c2x + t3 * p2x,
	            y = t13 * p1y + t12 * 3 * t * c1y + t1 * 3 * t * t * c2y + t3 * p2y,
	            mx = p1x + 2 * t * (c1x - p1x) + t2 * (c2x - 2 * c1x + p1x),
	            my = p1y + 2 * t * (c1y - p1y) + t2 * (c2y - 2 * c1y + p1y),
	            nx = c1x + 2 * t * (c2x - c1x) + t2 * (p2x - 2 * c2x + c1x),
	            ny = c1y + 2 * t * (c2y - c1y) + t2 * (p2y - 2 * c2y + c1y),
	            ax = t1 * p1x + t * c1x,
	            ay = t1 * p1y + t * c1y,
	            cx = t1 * c2x + t * p2x,
	            cy = t1 * c2y + t * p2y,
	            alpha = (90 - math.atan2(mx - nx, my - ny) * 180 / PI);
	        (mx > nx || my < ny) && (alpha += 180);
	        return {
	            x: x,
	            y: y,
	            m: {
	                x: mx,
	                y: my
	            },
	            n: {
	                x: nx,
	                y: ny
	            },
	            start: {
	                x: ax,
	                y: ay
	            },
	            end: {
	                x: cx,
	                y: cy
	            },
	            alpha: alpha
	        };
	    };

	    R.bezierBBox = function (p1x, p1y, c1x, c1y, c2x, c2y, p2x, p2y) {
	        if (!R.is(p1x, "array")) {
	            p1x = [p1x, p1y, c1x, c1y, c2x, c2y, p2x, p2y];
	        }
	        var bbox = curveDim.apply(null, p1x);
	        return {
	            x: bbox.min.x,
	            y: bbox.min.y,
	            x2: bbox.max.x,
	            y2: bbox.max.y,
	            width: bbox.max.x - bbox.min.x,
	            height: bbox.max.y - bbox.min.y
	        };
	    };

	    R.isPointInsideBBox = function (bbox, x, y) {
	        return x >= bbox.x && x <= bbox.x2 && y >= bbox.y && y <= bbox.y2;
	    };

	    R.isBBoxIntersect = function (bbox1, bbox2) {
	        var i = R.isPointInsideBBox;
	        return i(bbox2, bbox1.x, bbox1.y) || i(bbox2, bbox1.x2, bbox1.y) || i(bbox2, bbox1.x, bbox1.y2) || i(bbox2, bbox1.x2, bbox1.y2) || i(bbox1, bbox2.x, bbox2.y) || i(bbox1, bbox2.x2, bbox2.y) || i(bbox1, bbox2.x, bbox2.y2) || i(bbox1, bbox2.x2, bbox2.y2) || (bbox1.x < bbox2.x2 && bbox1.x > bbox2.x || bbox2.x < bbox1.x2 && bbox2.x > bbox1.x) && (bbox1.y < bbox2.y2 && bbox1.y > bbox2.y || bbox2.y < bbox1.y2 && bbox2.y > bbox1.y);
	    };

	    function base3(t, p1, p2, p3, p4) {
	        var t1 = -3 * p1 + 9 * p2 - 9 * p3 + 3 * p4,
	            t2 = t * t1 + 6 * p1 - 12 * p2 + 6 * p3;
	        return t * t2 - 3 * p1 + 3 * p2;
	    }

	    function bezlen(x1, y1, x2, y2, x3, y3, x4, y4, z) {
	        if (z == null) {
	            z = 1;
	        }
	        z = z > 1 ? 1 : z < 0 ? 0 : z;
	        var z2 = z / 2,
	            n = 12,
	            Tvalues = [-0.1252, 0.1252, -0.3678, 0.3678, -0.5873, 0.5873, -0.7699, 0.7699, -0.9041, 0.9041, -0.9816, 0.9816],
	            Cvalues = [0.2491, 0.2491, 0.2335, 0.2335, 0.2032, 0.2032, 0.1601, 0.1601, 0.1069, 0.1069, 0.0472, 0.0472],
	            sum = 0;
	        for (var i = 0; i < n; i++) {
	            var ct = z2 * Tvalues[i] + z2,
	                xbase = base3(ct, x1, x2, x3, x4),
	                ybase = base3(ct, y1, y2, y3, y4),
	                comb = xbase * xbase + ybase * ybase;
	            sum += Cvalues[i] * math.sqrt(comb);
	        }
	        return z2 * sum;
	    }

	    function getTatLen(x1, y1, x2, y2, x3, y3, x4, y4, ll) {
	        if (ll < 0 || bezlen(x1, y1, x2, y2, x3, y3, x4, y4) < ll) {
	            return;
	        }
	        var t = 1,
	            step = t / 2,
	            t2 = t - step,
	            l, e = .01;
	        l = bezlen(x1, y1, x2, y2, x3, y3, x4, y4, t2);
	        while (abs(l - ll) > e) {
	            step /= 2;
	            t2 += (l < ll ? 1 : -1) * step;
	            l = bezlen(x1, y1, x2, y2, x3, y3, x4, y4, t2);
	        }
	        return t2;
	    }

	    function intersect(x1, y1, x2, y2, x3, y3, x4, y4) {
	        if (
	            mmax(x1, x2) < mmin(x3, x4) || mmin(x1, x2) > mmax(x3, x4) || mmax(y1, y2) < mmin(y3, y4) || mmin(y1, y2) > mmax(y3, y4)) {
	            return;
	        }
	        var nx = (x1 * y2 - y1 * x2) * (x3 - x4) - (x1 - x2) * (x3 * y4 - y3 * x4),
	            ny = (x1 * y2 - y1 * x2) * (y3 - y4) - (y1 - y2) * (x3 * y4 - y3 * x4),
	            denominator = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);

	        if (!denominator) {
	            return;
	        }
	        var px = nx / denominator,
	            py = ny / denominator,
	            px2 = +px.toFixed(2),
	            py2 = +py.toFixed(2);
	        if (
	            px2 < +mmin(x1, x2).toFixed(2) || px2 > +mmax(x1, x2).toFixed(2) || px2 < +mmin(x3, x4).toFixed(2) || px2 > +mmax(x3, x4).toFixed(2) || py2 < +mmin(y1, y2).toFixed(2) || py2 > +mmax(y1, y2).toFixed(2) || py2 < +mmin(y3, y4).toFixed(2) || py2 > +mmax(y3, y4).toFixed(2)) {
	            return;
	        }
	        return {
	            x: px,
	            y: py
	        };
	    }

	    function inter(bez1, bez2) {
	        return interHelper(bez1, bez2);
	    }

	    function interCount(bez1, bez2) {
	        return interHelper(bez1, bez2, 1);
	    }

	    function interHelper(bez1, bez2, justCount) {
	        var bbox1 = R.bezierBBox(bez1),
	            bbox2 = R.bezierBBox(bez2);
	        if (!R.isBBoxIntersect(bbox1, bbox2)) {
	            return justCount ? 0 : [];
	        }
	        var l1 = bezlen.apply(0, bez1),
	            l2 = bezlen.apply(0, bez2),
	            n1 = ~~(l1 / 5),
	            n2 = ~~(l2 / 5),
	            dots1 = [],
	            dots2 = [],
	            xy = {},
	            res = justCount ? 0 : [];
	        for (var i = 0; i < n1 + 1; i++) {
	            var p = R.findDotsAtSegment.apply(R, bez1.concat(i / n1));
	            dots1.push({
	                x: p.x,
	                y: p.y,
	                t: i / n1
	            });
	        }
	        for (i = 0; i < n2 + 1; i++) {
	            p = R.findDotsAtSegment.apply(R, bez2.concat(i / n2));
	            dots2.push({
	                x: p.x,
	                y: p.y,
	                t: i / n2
	            });
	        }
	        for (i = 0; i < n1; i++) {
	            for (var j = 0; j < n2; j++) {
	                var di = dots1[i],
	                    di1 = dots1[i + 1],
	                    dj = dots2[j],
	                    dj1 = dots2[j + 1],
	                    ci = abs(di1.x - di.x) < .001 ? "y" : "x",
	                    cj = abs(dj1.x - dj.x) < .001 ? "y" : "x",
	                    is = intersect(di.x, di.y, di1.x, di1.y, dj.x, dj.y, dj1.x, dj1.y);
	                if (is) {
	                    if (xy[is.x.toFixed(4)] == is.y.toFixed(4)) {
	                        continue;
	                    }
	                    xy[is.x.toFixed(4)] = is.y.toFixed(4);
	                    var t1 = di.t + abs((is[ci] - di[ci]) / (di1[ci] - di[ci])) * (di1.t - di.t),
	                        t2 = dj.t + abs((is[cj] - dj[cj]) / (dj1[cj] - dj[cj])) * (dj1.t - dj.t);
	                    if (t1 >= 0 && t1 <= 1 && t2 >= 0 && t2 <= 1) {
	                        if (justCount) {
	                            res++;
	                        } else {
	                            res.push({
	                                x: is.x,
	                                y: is.y,
	                                t1: t1,
	                                t2: t2
	                            });
	                        }
	                    }
	                }
	            }
	        }
	        return res;
	    }

	    R.pathIntersection = function (path1, path2) {
	        return interPathHelper(path1, path2);
	    };
	    R.pathIntersectionNumber = function (path1, path2) {
	        return interPathHelper(path1, path2, 1);
	    };

	    function interPathHelper(path1, path2, justCount) {
	        path1 = R._path2curve(path1);
	        path2 = R._path2curve(path2);
	        var x1, y1, x2, y2, x1m, y1m, x2m, y2m, bez1, bez2, res = justCount ? 0 : [];
	        for (var i = 0, ii = path1.length; i < ii; i++) {
	            var pi = path1[i];
	            if (pi[0] == "M") {
	                x1 = x1m = pi[1];
	                y1 = y1m = pi[2];
	            } else {
	                if (pi[0] == "C") {
	                    bez1 = [x1, y1].concat(pi.slice(1));
	                    x1 = bez1[6];
	                    y1 = bez1[7];
	                } else {
	                    bez1 = [x1, y1, x1, y1, x1m, y1m, x1m, y1m];
	                    x1 = x1m;
	                    y1 = y1m;
	                }
	                for (var j = 0, jj = path2.length; j < jj; j++) {
	                    var pj = path2[j];
	                    if (pj[0] == "M") {
	                        x2 = x2m = pj[1];
	                        y2 = y2m = pj[2];
	                    } else {
	                        if (pj[0] == "C") {
	                            bez2 = [x2, y2].concat(pj.slice(1));
	                            x2 = bez2[6];
	                            y2 = bez2[7];
	                        } else {
	                            bez2 = [x2, y2, x2, y2, x2m, y2m, x2m, y2m];
	                            x2 = x2m;
	                            y2 = y2m;
	                        }
	                        var intr = interHelper(bez1, bez2, justCount);
	                        if (justCount) {
	                            res += intr;
	                        } else {
	                            for (var k = 0, kk = intr.length; k < kk; k++) {
	                                intr[k].segment1 = i;
	                                intr[k].segment2 = j;
	                                intr[k].bez1 = bez1;
	                                intr[k].bez2 = bez2;
	                            }
	                            res = res.concat(intr);
	                        }
	                    }
	                }
	            }
	        }
	        return res;
	    }

	    R.isPointInsidePath = function (path, x, y) {
	        var bbox = R.pathBBox(path);
	        return R.isPointInsideBBox(bbox, x, y) && interPathHelper(path, [
	            ["M", x, y],
	            ["H", bbox.x2 + 10]
	        ], 1) % 2 == 1;
	    };
	    R._removedFactory = function (methodname) {
	        return function () {
	            eve("raphael.log", null, "Rapha\xebl: you are calling to method \u201c" + methodname + "\u201d of removed object", methodname);
	        };
	    };

	    var pathDimensions = R.pathBBox = function (path) {
	        var pth = paths(path);
	        if (pth.bbox) {
	            return clone(pth.bbox); //updated by zhangxin fix issue 543 [https://github.com/DmitryBaranovskiy/raphael/issues/543]
	        }
	        if (!path) {
	            return {
	                x: 0,
	                y: 0,
	                width: 0,
	                height: 0,
	                x2: 0,
	                y2: 0
	            };
	        }
	        path = path2curve(path);
	        var x = 0,
	            y = 0,
	            X = [],
	            Y = [],
	            p;
	        for (var i = 0, ii = path.length; i < ii; i++) {
	            p = path[i];
	            if (p[0] == "M") {
	                x = p[1];
	                y = p[2];
	                X.push(x);
	                Y.push(y);
	            } else {
	                var dim = curveDim(x, y, p[1], p[2], p[3], p[4], p[5], p[6]);
	                X = X[concat](dim.min.x, dim.max.x);
	                Y = Y[concat](dim.min.y, dim.max.y);
	                x = p[5];
	                y = p[6];
	            }
	        }
	        var xmin = mmin[apply](0, X),
	            ymin = mmin[apply](0, Y),
	            xmax = mmax[apply](0, X),
	            ymax = mmax[apply](0, Y),
	            bb = {
	                x: xmin,
	                y: ymin,
	                x2: xmax,
	                y2: ymax,
	                width: xmax - xmin,
	                height: ymax - ymin
	            };
	        pth.bbox = clone(bb);
	        return bb;
	    },
	        pathClone = function (pathArray) {
	            var res = clone(pathArray);
	            res.toString = R._path2string;
	            return res;
	        },
	        pathToRelative = R._pathToRelative = function (pathArray) {
	            var pth = paths(pathArray);
	            if (pth.rel) {
	                return pathClone(pth.rel);
	            }
	            if (!R.is(pathArray, array) || !R.is(pathArray && pathArray[0], array)) { // rough assumption
	                pathArray = R.parsePathString(pathArray);
	            }
	            var res = [],
	                x = 0,
	                y = 0,
	                mx = 0,
	                my = 0,
	                start = 0;
	            if (pathArray[0][0] == "M") {
	                x = pathArray[0][1];
	                y = pathArray[0][2];
	                mx = x;
	                my = y;
	                start++;
	                res.push(["M", x, y]);
	            }
	            for (var i = start, ii = pathArray.length; i < ii; i++) {
	                var r = res[i] = [],
	                    pa = pathArray[i];
	                if (pa[0] != lowerCase.call(pa[0])) {
	                    r[0] = lowerCase.call(pa[0]);
	                    switch (r[0]) {
	                        case "a":
	                            r[1] = pa[1];
	                            r[2] = pa[2];
	                            r[3] = pa[3];
	                            r[4] = pa[4];
	                            r[5] = pa[5];
	                            r[6] = +(pa[6] - x).toFixed(3);
	                            r[7] = +(pa[7] - y).toFixed(3);
	                            break;
	                        case "v":
	                            r[1] = +(pa[1] - y).toFixed(3);
	                            break;
	                        case "m":
	                            mx = pa[1];
	                            my = pa[2];
	                        default:
	                            for (var j = 1, jj = pa.length; j < jj; j++) {
	                                r[j] = +(pa[j] - ((j % 2) ? x : y)).toFixed(3);
	                            }
	                    }
	                } else {
	                    r = res[i] = [];
	                    if (pa[0] == "m") {
	                        mx = pa[1] + x;
	                        my = pa[2] + y;
	                    }
	                    for (var k = 0, kk = pa.length; k < kk; k++) {
	                        res[i][k] = pa[k];
	                    }
	                }
	                var len = res[i].length;
	                switch (res[i][0]) {
	                    case "z":
	                        x = mx;
	                        y = my;
	                        break;
	                    case "h":
	                        x += +res[i][len - 1];
	                        break;
	                    case "v":
	                        y += +res[i][len - 1];
	                        break;
	                    default:
	                        x += +res[i][len - 2];
	                        y += +res[i][len - 1];
	                }
	            }
	            res.toString = R._path2string;
	            pth.rel = pathClone(res);
	            return res;
	        },
	        pathToAbsolute = R._pathToAbsolute = function (pathArray) {
	            var pth = paths(pathArray);
	            if (pth.abs) {
	                return pathClone(pth.abs);
	            }
	            if (!R.is(pathArray, array) || !R.is(pathArray && pathArray[0], array)) { // rough assumption
	                pathArray = R.parsePathString(pathArray);
	            }
	            if (!pathArray || !pathArray.length) {
	                return [
	                    ["M", 0, 0]
	                ];
	            }
	            var res = [],
	                x = 0,
	                y = 0,
	                mx = 0,
	                my = 0,
	                start = 0;
	            if (pathArray[0][0] == "M") {
	                x = +pathArray[0][1];
	                y = +pathArray[0][2];
	                mx = x;
	                my = y;
	                start++;
	                res[0] = ["M", x, y];
	            }
	            var crz = pathArray.length == 3 && pathArray[0][0] == "M" && pathArray[1][0].toUpperCase() == "R" && pathArray[2][0].toUpperCase() == "Z";
	            for (var r, pa, i = start, ii = pathArray.length; i < ii; i++) {
	                res.push(r = []);
	                pa = pathArray[i];
	                if (pa[0] != upperCase.call(pa[0])) {
	                    r[0] = upperCase.call(pa[0]);
	                    switch (r[0]) {
	                        case "A":
	                            r[1] = pa[1];
	                            r[2] = pa[2];
	                            r[3] = pa[3];
	                            r[4] = pa[4];
	                            r[5] = pa[5];
	                            r[6] = +(pa[6] + x);
	                            r[7] = +(pa[7] + y);
	                            break;
	                        case "V":
	                            r[1] = +pa[1] + y;
	                            break;
	                        case "H":
	                            r[1] = +pa[1] + x;
	                            break;
	                        case "R":
	                            var dots = [x, y][concat](pa.slice(1));
	                            for (var j = 2, jj = dots.length; j < jj; j++) {
	                                dots[j] = +dots[j] + x;
	                                dots[++j] = +dots[j] + y;
	                            }
	                            res.pop();
	                            res = res[concat](catmullRom2bezier(dots, crz));
	                            break;
	                        case "M":
	                            mx = +pa[1] + x;
	                            my = +pa[2] + y;
	                        default:
	                            for (j = 1, jj = pa.length; j < jj; j++) {
	                                r[j] = +pa[j] + ((j % 2) ? x : y);
	                            }
	                    }
	                } else if (pa[0] == "R") {
	                    dots = [x, y][concat](pa.slice(1));
	                    res.pop();
	                    res = res[concat](catmullRom2bezier(dots, crz));
	                    r = ["R"][concat](pa.slice(-2));
	                } else {
	                    for (var k = 0, kk = pa.length; k < kk; k++) {
	                        r[k] = pa[k];
	                    }
	                }
	                switch (r[0]) {
	                    case "Z":
	                        x = mx;
	                        y = my;
	                        break;
	                    case "H":
	                        x = r[1];
	                        break;
	                    case "V":
	                        y = r[1];
	                        break;
	                    case "M":
	                        mx = r[r.length - 2];
	                        my = r[r.length - 1];
	                    default:
	                        x = r[r.length - 2];
	                        y = r[r.length - 1];
	                }
	            }
	            res.toString = R._path2string;
	            pth.abs = pathClone(res);
	            return res;
	        },
	        l2c = function (x1, y1, x2, y2) {
	            return [x1, y1, x2, y2, x2, y2];
	        },
	        q2c = function (x1, y1, ax, ay, x2, y2) {
	            var _13 = 1 / 3,
	                _23 = 2 / 3;
	            return [
	                _13 * x1 + _23 * ax, _13 * y1 + _23 * ay, _13 * x2 + _23 * ax, _13 * y2 + _23 * ay, x2, y2
	            ];
	        },
	        a2c = function (x1, y1, rx, ry, angle, large_arc_flag, sweep_flag, x2, y2, recursive) {
	            // for more information of where this math came from visit:
	            // http://www.w3.org/TR/SVG11/implnote.html#ArcImplementationNotes
	            var _120 = PI * 120 / 180,
	                rad = PI / 180 * (+angle || 0),
	                res = [],
	                xy, rotate = cacher(function (x, y, rad) {
	                    var X = x * math.cos(rad) - y * math.sin(rad),
	                        Y = x * math.sin(rad) + y * math.cos(rad);
	                    return {
	                        x: X,
	                        y: Y
	                    };
	                });
	            if (!recursive) {
	                xy = rotate(x1, y1, -rad);
	                x1 = xy.x;
	                y1 = xy.y;
	                xy = rotate(x2, y2, -rad);
	                x2 = xy.x;
	                y2 = xy.y;
	                var cos = math.cos(PI / 180 * angle),
	                    sin = math.sin(PI / 180 * angle),
	                    x = (x1 - x2) / 2,
	                    y = (y1 - y2) / 2;
	                var h = (x * x) / (rx * rx) + (y * y) / (ry * ry);
	                if (h > 1) {
	                    h = math.sqrt(h);
	                    rx = h * rx;
	                    ry = h * ry;
	                }
	                var rx2 = rx * rx,
	                    ry2 = ry * ry,
	                    k = (large_arc_flag == sweep_flag ? -1 : 1) * math.sqrt(abs((rx2 * ry2 - rx2 * y * y - ry2 * x * x) / (rx2 * y * y + ry2 * x * x))),
	                    cx = k * rx * y / ry + (x1 + x2) / 2,
	                    cy = k * -ry * x / rx + (y1 + y2) / 2,
	                    f1 = math.asin(((y1 - cy) / ry).toFixed(9)),
	                    f2 = math.asin(((y2 - cy) / ry).toFixed(9));

	                f1 = x1 < cx ? PI - f1 : f1;
	                f2 = x2 < cx ? PI - f2 : f2;
	                f1 < 0 && (f1 = PI * 2 + f1);
	                f2 < 0 && (f2 = PI * 2 + f2);
	                if (sweep_flag && f1 > f2) {
	                    f1 = f1 - PI * 2;
	                }
	                if (!sweep_flag && f2 > f1) {
	                    f2 = f2 - PI * 2;
	                }
	            } else {
	                f1 = recursive[0];
	                f2 = recursive[1];
	                cx = recursive[2];
	                cy = recursive[3];
	            }
	            var df = f2 - f1;
	            if (abs(df) > _120) {
	                var f2old = f2,
	                    x2old = x2,
	                    y2old = y2;
	                f2 = f1 + _120 * (sweep_flag && f2 > f1 ? 1 : -1);
	                x2 = cx + rx * math.cos(f2);
	                y2 = cy + ry * math.sin(f2);
	                res = a2c(x2, y2, rx, ry, angle, 0, sweep_flag, x2old, y2old, [f2, f2old, cx, cy]);
	            }
	            df = f2 - f1;
	            var c1 = math.cos(f1),
	                s1 = math.sin(f1),
	                c2 = math.cos(f2),
	                s2 = math.sin(f2),
	                t = math.tan(df / 4),
	                hx = 4 / 3 * rx * t,
	                hy = 4 / 3 * ry * t,
	                m1 = [x1, y1],
	                m2 = [x1 + hx * s1, y1 - hy * c1],
	                m3 = [x2 + hx * s2, y2 - hy * c2],
	                m4 = [x2, y2];
	            m2[0] = 2 * m1[0] - m2[0];
	            m2[1] = 2 * m1[1] - m2[1];
	            if (recursive) {
	                return [m2, m3, m4][concat](res);
	            } else {
	                res = [m2, m3, m4][concat](res).join()[split](",");
	                var newres = [];
	                for (var i = 0, ii = res.length; i < ii; i++) {
	                    newres[i] = i % 2 ? rotate(res[i - 1], res[i], rad).y : rotate(res[i], res[i + 1], rad).x;
	                }
	                return newres;
	            }
	        },
	        findDotAtSegment = function (p1x, p1y, c1x, c1y, c2x, c2y, p2x, p2y, t) {
	            var t1 = 1 - t;
	            return {
	                x: pow(t1, 3) * p1x + pow(t1, 2) * 3 * t * c1x + t1 * 3 * t * t * c2x + pow(t, 3) * p2x,
	                y: pow(t1, 3) * p1y + pow(t1, 2) * 3 * t * c1y + t1 * 3 * t * t * c2y + pow(t, 3) * p2y
	            };
	        },
	        curveDim = cacher(function (p1x, p1y, c1x, c1y, c2x, c2y, p2x, p2y) {
	            var a = (c2x - 2 * c1x + p1x) - (p2x - 2 * c2x + c1x),
	                b = 2 * (c1x - p1x) - 2 * (c2x - c1x),
	                c = p1x - c1x,
	                t1 = (-b + math.sqrt(b * b - 4 * a * c)) / 2 / a,
	                t2 = (-b - math.sqrt(b * b - 4 * a * c)) / 2 / a,
	                y = [p1y, p2y],
	                x = [p1x, p2x],
	                dot;
	            abs(t1) > "1e12" && (t1 = .5);
	            abs(t2) > "1e12" && (t2 = .5);
	            if (t1 > 0 && t1 < 1) {
	                dot = findDotAtSegment(p1x, p1y, c1x, c1y, c2x, c2y, p2x, p2y, t1);
	                x.push(dot.x);
	                y.push(dot.y);
	            }
	            if (t2 > 0 && t2 < 1) {
	                dot = findDotAtSegment(p1x, p1y, c1x, c1y, c2x, c2y, p2x, p2y, t2);
	                x.push(dot.x);
	                y.push(dot.y);
	            }
	            a = (c2y - 2 * c1y + p1y) - (p2y - 2 * c2y + c1y);
	            b = 2 * (c1y - p1y) - 2 * (c2y - c1y);
	            c = p1y - c1y;
	            t1 = (-b + math.sqrt(b * b - 4 * a * c)) / 2 / a;
	            t2 = (-b - math.sqrt(b * b - 4 * a * c)) / 2 / a;
	            abs(t1) > "1e12" && (t1 = .5);
	            abs(t2) > "1e12" && (t2 = .5);
	            if (t1 > 0 && t1 < 1) {
	                dot = findDotAtSegment(p1x, p1y, c1x, c1y, c2x, c2y, p2x, p2y, t1);
	                x.push(dot.x);
	                y.push(dot.y);
	            }
	            if (t2 > 0 && t2 < 1) {
	                dot = findDotAtSegment(p1x, p1y, c1x, c1y, c2x, c2y, p2x, p2y, t2);
	                x.push(dot.x);
	                y.push(dot.y);
	            }
	            return {
	                min: {
	                    x: mmin[apply](0, x),
	                    y: mmin[apply](0, y)
	                },
	                max: {
	                    x: mmax[apply](0, x),
	                    y: mmax[apply](0, y)
	                }
	            };
	        }),
	        path2curve = R._path2curve = cacher(function (path, path2) {
	            var pth = !path2 && paths(path);
	            if (!path2 && pth.curve) {
	                return pathClone(pth.curve);
	            }
	            var p = pathToAbsolute(path),
	                p2 = path2 && pathToAbsolute(path2),
	                attrs = {
	                    x: 0,
	                    y: 0,
	                    bx: 0,
	                    by: 0,
	                    X: 0,
	                    Y: 0,
	                    qx: null,
	                    qy: null
	                },
	                attrs2 = {
	                    x: 0,
	                    y: 0,
	                    bx: 0,
	                    by: 0,
	                    X: 0,
	                    Y: 0,
	                    qx: null,
	                    qy: null
	                },
	                processPath = function (path, d) {
	                    var nx, ny;
	                    if (!path) {
	                        return ["C", d.x, d.y, d.x, d.y, d.x, d.y];
	                    } !(path[0] in {
	                        T: 1,
	                        Q: 1
	                    }) && (d.qx = d.qy = null);
	                    switch (path[0]) {
	                        case "M":
	                            d.X = path[1];
	                            d.Y = path[2];
	                            break;
	                        case "A":
	                            path = ["C"][concat](a2c[apply](0, [d.x, d.y][concat](path.slice(1))));
	                            break;
	                        case "S":
	                            nx = d.x + (d.x - (d.bx || d.x));
	                            ny = d.y + (d.y - (d.by || d.y));
	                            path = ["C", nx, ny][concat](path.slice(1));
	                            break;
	                        case "T":
	                            d.qx = d.x + (d.x - (d.qx || d.x));
	                            d.qy = d.y + (d.y - (d.qy || d.y));
	                            path = ["C"][concat](q2c(d.x, d.y, d.qx, d.qy, path[1], path[2]));
	                            break;
	                        case "Q":
	                            d.qx = path[1];
	                            d.qy = path[2];
	                            path = ["C"][concat](q2c(d.x, d.y, path[1], path[2], path[3], path[4]));
	                            break;
	                        case "L":
	                            path = ["C"][concat](l2c(d.x, d.y, path[1], path[2]));
	                            break;
	                        case "H":
	                            path = ["C"][concat](l2c(d.x, d.y, path[1], d.y));
	                            break;
	                        case "V":
	                            path = ["C"][concat](l2c(d.x, d.y, d.x, path[1]));
	                            break;
	                        case "Z":
	                            path = ["C"][concat](l2c(d.x, d.y, d.X, d.Y));
	                            break;
	                    }
	                    return path;
	                },
	                fixArc = function (pp, i) {
	                    if (pp[i].length > 7) {
	                        pp[i].shift();
	                        var pi = pp[i];
	                        while (pi.length) {
	                            pp.splice(i++, 0, ["C"][concat](pi.splice(0, 6)));
	                        }
	                        pp.splice(i, 1);
	                        ii = mmax(p.length, p2 && p2.length || 0);
	                    }
	                },
	                fixM = function (path1, path2, a1, a2, i) {
	                    if (path1 && path2 && path1[i][0] == "M" && path2[i][0] != "M") {
	                        path2.splice(i, 0, ["M", a2.x, a2.y]);
	                        a1.bx = 0;
	                        a1.by = 0;
	                        a1.x = path1[i][1];
	                        a1.y = path1[i][2];
	                        ii = mmax(p.length, p2 && p2.length || 0);
	                    }
	                };
	            for (var i = 0, ii = mmax(p.length, p2 && p2.length || 0) ; i < ii; i++) {
	                p[i] = processPath(p[i], attrs);
	                fixArc(p, i);
	                p2 && (p2[i] = processPath(p2[i], attrs2));
	                p2 && fixArc(p2, i);
	                fixM(p, p2, attrs, attrs2, i);
	                fixM(p2, p, attrs2, attrs, i);
	                var seg = p[i],
	                    seg2 = p2 && p2[i],
	                    seglen = seg.length,
	                    seg2len = p2 && seg2.length;
	                attrs.x = seg[seglen - 2];
	                attrs.y = seg[seglen - 1];
	                attrs.bx = toFloat(seg[seglen - 4]) || attrs.x;
	                attrs.by = toFloat(seg[seglen - 3]) || attrs.y;
	                attrs2.bx = p2 && (toFloat(seg2[seg2len - 4]) || attrs2.x);
	                attrs2.by = p2 && (toFloat(seg2[seg2len - 3]) || attrs2.y);
	                attrs2.x = p2 && seg2[seg2len - 2];
	                attrs2.y = p2 && seg2[seg2len - 1];
	            }
	            if (!p2) {
	                pth.curve = pathClone(p);
	            }
	            return p2 ? [p, p2] : p;
	        }, null, pathClone),
	        parseDots = R._parseDots = cacher(function (gradient) {
	            var dots = [];
	            for (var i = 0, ii = gradient.length; i < ii; i++) {
	                var dot = {},
	                    par = gradient[i].match(/^([^:]*):?([\d\.]*)/);
	                dot.color = R.getRGB(par[1]);
	                if (dot.color.error) {
	                    return null;
	                }
	                dot.color = dot.color.hex;
	                par[2] && (dot.offset = par[2] + "%");
	                dots.push(dot);
	            }
	            for (i = 1, ii = dots.length - 1; i < ii; i++) {
	                if (!dots[i].offset) {
	                    var start = toFloat(dots[i - 1].offset || 0),
	                        end = 0;
	                    for (var j = i + 1; j < ii; j++) {
	                        if (dots[j].offset) {
	                            end = dots[j].offset;
	                            break;
	                        }
	                    }
	                    if (!end) {
	                        end = 100;
	                        j = ii;
	                    }
	                    end = toFloat(end);
	                    var d = (end - start) / (j - i + 1);
	                    for (; i < j; i++) {
	                        start += d;
	                        dots[i].offset = start + "%";
	                    }
	                }
	            }
	            return dots;
	        }),
	        tear = R._tear = function (el, paper) {
	            el == paper.top && (paper.top = el.prev);
	            el == paper.bottom && (paper.bottom = el.next);
	            el.next && (el.next.prev = el.prev);
	            el.prev && (el.prev.next = el.next);
	        },
	        tofront = R._tofront = function (el, paper) {
	            if (paper.top === el) {
	                return;
	            }
	            tear(el, paper);
	            el.next = null;
	            el.prev = paper.top;
	            paper.top.next = el;
	            paper.top = el;
	        },
	        toback = R._toback = function (el, paper) {
	            if (paper.bottom === el) {
	                return;
	            }
	            tear(el, paper);
	            el.next = paper.bottom;
	            el.prev = null;
	            paper.bottom.prev = el;
	            paper.bottom = el;
	        },
	        insertafter = R._insertafter = function (el, el2, paper) {
	            tear(el, paper);
	            el2 == paper.top && (paper.top = el);
	            el2.next && (el2.next.prev = el);
	            el.next = el2.next;
	            el.prev = el2;
	            el2.next = el;
	        },
	        insertbefore = R._insertbefore = function (el, el2, paper) {
	            tear(el, paper);
	            el2 == paper.bottom && (paper.bottom = el);
	            el2.prev && (el2.prev.next = el);
	            el.prev = el2.prev;
	            el2.prev = el;
	            el.next = el2;
	        },

	        toMatrix = R.toMatrix = function (path, transform) {
	            var bb = pathDimensions(path),
	                el = {
	                    _: {
	                        transform: E
	                    },
	                    getBBox: function () {
	                        return bb;
	                    }
	                };
	            extractTransform(el, transform);
	            return el.matrix;
	        },

	        transformPath = R.transformPath = function (path, transform) {
	            return mapPath(path, toMatrix(path, transform));
	        },
	        extractTransform = R._extractTransform = function (el, tstr) {
	            if (tstr == null) {
	                return el._.transform;
	            }
	            tstr = Str(tstr).replace(/\.{3}|\u2026/g, el._.transform || E);
	            var tdata = R.parseTransformString(tstr),
	                deg = 0,
	                dx = 0,
	                dy = 0,
	                sx = 1,
	                sy = 1,
	                _ = el._,
	                m = new Matrix;
	            _.transform = tdata || [];
	            if (tdata) {
	                for (var i = 0, ii = tdata.length; i < ii; i++) {
	                    var t = tdata[i],
	                        tlen = t.length,
	                        command = Str(t[0]).toLowerCase(),
	                        absolute = t[0] != command,
	                        inver = absolute ? m.invert() : 0,
	                        x1, y1, x2, y2, bb;
	                    if (command == "t" && tlen == 3) {
	                        if (absolute) {
	                            x1 = inver.x(0, 0);
	                            y1 = inver.y(0, 0);
	                            x2 = inver.x(t[1], t[2]);
	                            y2 = inver.y(t[1], t[2]);
	                            m.translate(x2 - x1, y2 - y1);
	                        } else {
	                            m.translate(t[1], t[2]);
	                        }
	                    } else if (command == "r") {
	                        if (tlen == 2) {
	                            bb = bb || el.getBBox(1);
	                            m.rotate(t[1], bb.x + bb.width / 2, bb.y + bb.height / 2);
	                            deg += t[1];
	                        } else if (tlen == 4) {
	                            if (absolute) {
	                                x2 = inver.x(t[2], t[3]);
	                                y2 = inver.y(t[2], t[3]);
	                                m.rotate(t[1], x2, y2);
	                            } else {
	                                m.rotate(t[1], t[2], t[3]);
	                            }
	                            deg += t[1];
	                        }
	                    } else if (command == "s") {
	                        if (tlen == 2 || tlen == 3) {
	                            bb = bb || el.getBBox(1);
	                            m.scale(t[1], t[tlen - 1], bb.x + bb.width / 2, bb.y + bb.height / 2);
	                            sx *= t[1];
	                            sy *= t[tlen - 1];
	                        } else if (tlen == 5) {
	                            if (absolute) {
	                                x2 = inver.x(t[3], t[4]);
	                                y2 = inver.y(t[3], t[4]);
	                                m.scale(t[1], t[2], x2, y2);
	                            } else {
	                                m.scale(t[1], t[2], t[3], t[4]);
	                            }
	                            sx *= t[1];
	                            sy *= t[2];
	                        }
	                    } else if (command == "m" && tlen == 7) {
	                        m.add(t[1], t[2], t[3], t[4], t[5], t[6]);
	                    }
	                    _.dirtyT = 1;
	                    el.matrix = m;
	                }
	            }


	            el.matrix = m;

	            _.sx = sx;
	            _.sy = sy;
	            _.deg = deg;
	            _.dx = dx = m.e;
	            _.dy = dy = m.f;

	            if (sx == 1 && sy == 1 && !deg && _.bbox) {
	                _.bbox.x += +dx;
	                _.bbox.y += +dy;
	            } else {
	                _.dirtyT = 1;
	            }
	        },
	        getEmpty = function (item) {
	            var l = item[0];
	            switch (l.toLowerCase()) {
	                case "t":
	                    return [l, 0, 0];
	                case "m":
	                    return [l, 1, 0, 0, 1, 0, 0];
	                case "r":
	                    if (item.length == 4) {
	                        return [l, 0, item[2], item[3]];
	                    } else {
	                        return [l, 0];
	                    }
	                case "s":
	                    if (item.length == 5) {
	                        return [l, 1, 1, item[3], item[4]];
	                    } else if (item.length == 3) {
	                        return [l, 1, 1];
	                    } else {
	                        return [l, 1];
	                    }
	            }
	        },
	        equaliseTransform = R._equaliseTransform = function (t1, t2) {
	            t2 = Str(t2).replace(/\.{3}|\u2026/g, t1);
	            t1 = R.parseTransformString(t1) || [];
	            t2 = R.parseTransformString(t2) || [];
	            var maxlength = mmax(t1.length, t2.length),
	                from = [],
	                to = [],
	                i = 0,
	                j, jj, tt1, tt2;
	            for (; i < maxlength; i++) {
	                tt1 = t1[i] || getEmpty(t2[i]);
	                tt2 = t2[i] || getEmpty(tt1);
	                if ((tt1[0] != tt2[0]) || (tt1[0].toLowerCase() == "r" && (tt1[2] != tt2[2] || tt1[3] != tt2[3])) || (tt1[0].toLowerCase() == "s" && (tt1[3] != tt2[3] || tt1[4] != tt2[4]))) {
	                    return;
	                }
	                from[i] = [];
	                to[i] = [];
	                for (j = 0, jj = mmax(tt1.length, tt2.length) ; j < jj; j++) {
	                    j in tt1 && (from[i][j] = tt1[j]);
	                    j in tt2 && (to[i][j] = tt2[j]);
	                }
	            }
	            return {
	                from: from,
	                to: to
	            };
	        };
	    R._getContainer = function (x, y, w, h) {
	        var container;
	        container = h == null && !R.is(x, "object") ? g.doc.getElementById(x) : x;
	        if (container == null) {
	            return;
	        }
	        if (container.tagName) {
	            if (y == null) {
	                return {
	                    container: container,
	                    width: container.style.pixelWidth || container.offsetWidth,
	                    height: container.style.pixelHeight || container.offsetHeight
	                };
	            } else {
	                return {
	                    container: container,
	                    width: y,
	                    height: w
	                };
	            }
	        }
	        return {
	            container: 1,
	            x: x,
	            y: y,
	            width: w,
	            height: h
	        };
	    };

	    R.pathToRelative = pathToRelative;
	    R._engine = {};

	    R.path2curve = path2curve;

	    R.matrix = function (a, b, c, d, e, f) {
	        return new Matrix(a, b, c, d, e, f);
	    };

	    function Matrix(a, b, c, d, e, f) {
	        if (a != null) {
	            this.a = +a;
	            this.b = +b;
	            this.c = +c;
	            this.d = +d;
	            this.e = +e;
	            this.f = +f;
	        } else {
	            this.a = 1;
	            this.b = 0;
	            this.c = 0;
	            this.d = 1;
	            this.e = 0;
	            this.f = 0;
	        }
	    } (function (matrixproto) {

	        matrixproto.add = function (a, b, c, d, e, f) {
	            var out = [
	                    [],
	                    [],
	                    []
	            ],
	                m = [
	                    [this.a, this.c, this.e],
	                    [this.b, this.d, this.f],
	                    [0, 0, 1]
	                ],
	                matrix = [
	                    [a, c, e],
	                    [b, d, f],
	                    [0, 0, 1]
	                ],
	                x, y, z, res;

	            if (a && a instanceof Matrix) {
	                matrix = [
	                    [a.a, a.c, a.e],
	                    [a.b, a.d, a.f],
	                    [0, 0, 1]
	                ];
	            }

	            for (x = 0; x < 3; x++) {
	                for (y = 0; y < 3; y++) {
	                    res = 0;
	                    for (z = 0; z < 3; z++) {
	                        res += m[x][z] * matrix[z][y];
	                    }
	                    out[x][y] = res;
	                }
	            }
	            this.a = out[0][0];
	            this.b = out[1][0];
	            this.c = out[0][1];
	            this.d = out[1][1];
	            this.e = out[0][2];
	            this.f = out[1][2];
	        };

	        matrixproto.invert = function () {
	            var me = this,
	                x = me.a * me.d - me.b * me.c;
	            return new Matrix(me.d / x, -me.b / x, -me.c / x, me.a / x, (me.c * me.f - me.d * me.e) / x, (me.b * me.e - me.a * me.f) / x);
	        };

	        matrixproto.clone = function () {
	            return new Matrix(this.a, this.b, this.c, this.d, this.e, this.f);
	        };

	        matrixproto.translate = function (x, y) {
	            this.add(1, 0, 0, 1, x, y);
	        };

	        matrixproto.scale = function (x, y, cx, cy) {
	            y == null && (y = x);
	            (cx || cy) && this.add(1, 0, 0, 1, cx, cy);
	            this.add(x, 0, 0, y, 0, 0);
	            (cx || cy) && this.add(1, 0, 0, 1, -cx, -cy);
	        };

	        matrixproto.rotate = function (a, x, y) {
	            a = R.rad(a);
	            x = x || 0;
	            y = y || 0;
	            var cos = +math.cos(a).toFixed(9),
	                sin = +math.sin(a).toFixed(9);
	            this.add(cos, sin, -sin, cos, x, y);
	            this.add(1, 0, 0, 1, -x, -y);
	        };

	        matrixproto.x = function (x, y) {
	            return x * this.a + y * this.c + this.e;
	        };

	        matrixproto.y = function (x, y) {
	            return x * this.b + y * this.d + this.f;
	        };
	        matrixproto.get = function (i) {
	            return +this[Str.fromCharCode(97 + i)].toFixed(4);
	        };
	        matrixproto.toString = function () {
	            return R.svg ? "matrix(" + [this.get(0), this.get(1), this.get(2), this.get(3), this.get(4), this.get(5)].join() + ")" : [this.get(0), this.get(2), this.get(1), this.get(3), 0, 0].join();
	        };
	        matrixproto.toFilter = function () {
	            return "progid:DXImageTransform.Microsoft.Matrix(M11=" + this.get(0) + ", M12=" + this.get(2) + ", M21=" + this.get(1) + ", M22=" + this.get(3) + ", Dx=" + this.get(4) + ", Dy=" + this.get(5) + ", sizingmethod='auto expand')";
	        };
	        matrixproto.offset = function () {
	            return [this.e.toFixed(4), this.f.toFixed(4)];
	        };

	        function norm(a) {
	            return a[0] * a[0] + a[1] * a[1];
	        }

	        function normalize(a) {
	            var mag = math.sqrt(norm(a));
	            a[0] && (a[0] /= mag);
	            a[1] && (a[1] /= mag);
	        }

	        matrixproto.split = function () {
	            var out = {};
	            // translation
	            out.dx = this.e;
	            out.dy = this.f;

	            // scale and shear
	            var row = [
	                [this.a, this.c],
	                [this.b, this.d]
	            ];
	            out.scalex = math.sqrt(norm(row[0]));
	            normalize(row[0]);

	            out.shear = row[0][0] * row[1][0] + row[0][1] * row[1][1];
	            row[1] = [row[1][0] - row[0][0] * out.shear, row[1][1] - row[0][1] * out.shear];

	            out.scaley = math.sqrt(norm(row[1]));
	            normalize(row[1]);
	            out.shear /= out.scaley;

	            // rotation
	            var sin = -row[0][1],
	                cos = row[1][1];
	            if (cos < 0) {
	                out.rotate = R.deg(math.acos(cos));
	                if (sin < 0) {
	                    out.rotate = 360 - out.rotate;
	                }
	            } else {
	                out.rotate = R.deg(math.asin(sin));
	            }

	            out.isSimple = !+out.shear.toFixed(9) && (out.scalex.toFixed(9) == out.scaley.toFixed(9) || !out.rotate);
	            out.isSuperSimple = !+out.shear.toFixed(9) && out.scalex.toFixed(9) == out.scaley.toFixed(9) && !out.rotate;
	            out.noRotation = !+out.shear.toFixed(9) && !out.rotate;
	            return out;
	        };

	        matrixproto.toTransformString = function (shorter) {
	            var s = shorter || this[split]();
	            if (s.isSimple) {
	                s.scalex = +s.scalex.toFixed(4);
	                s.scaley = +s.scaley.toFixed(4);
	                s.rotate = +s.rotate.toFixed(4);
	                return (s.dx || s.dy ? "t" + [s.dx, s.dy] : E) + (s.scalex != 1 || s.scaley != 1 ? "s" + [s.scalex, s.scaley, 0, 0] : E) + (s.rotate ? "r" + [s.rotate, 0, 0] : E);
	            } else {
	                return "m" + [this.get(0), this.get(1), this.get(2), this.get(3), this.get(4), this.get(5)];
	            }
	        };
	    })(Matrix.prototype);

	    // WebKit rendering bug workaround method
	    var version = navigator.userAgent.match(/Version\/(.*?)\s/) || navigator.userAgent.match(/Chrome\/(\d+)/);
	    if ((navigator.vendor == "Apple Computer, Inc.") && (version && version[1] < 4 || navigator.platform.slice(0, 2) == "iP") || (navigator.vendor == "Google Inc." && version && version[1] < 8)) {

	        paperproto.safari = function () {
	            var rect = this.rect(-99, -99, this.width + 99, this.height + 99).attr({
	                stroke: "none"
	            });
	            setTimeout(function () {
	                rect.remove();
	            });
	        };
	    } else {
	        paperproto.safari = fun;
	    }

	    var preventDefault = function () {
	        this.returnValue = false;
	    },
	        preventTouch = function () {
	            return this.originalEvent.preventDefault();
	        },
	        stopPropagation = function () {
	            this.cancelBubble = true;
	        },
	        stopTouch = function () {
	            return this.originalEvent.stopPropagation();
	        },
	        addEvent = (function () {
	            if (g.doc.addEventListener) {
	                return function (obj, type, fn, element) {
	                    var realName = supportsTouch && touchMap[type] ? touchMap[type] : type,
	                        f = function (e) {
	                            var scrollY = g.doc.documentElement.scrollTop || g.doc.body.scrollTop,
	                                scrollX = g.doc.documentElement.scrollLeft || g.doc.body.scrollLeft,
	                                x = e.clientX + scrollX,
	                                y = e.clientY + scrollY;
	                            if (supportsTouch && touchMap[has](type)) {
	                                for (var i = 0, ii = e.targetTouches && e.targetTouches.length; i < ii; i++) {
	                                    if (e.targetTouches[i].target == obj) {
	                                        var olde = e;
	                                        e = e.targetTouches[i];
	                                        e.originalEvent = olde;
	                                        e.preventDefault = preventTouch;
	                                        e.stopPropagation = stopTouch;
	                                        break;
	                                    }
	                                }
	                            }
	                            return fn.call(element, e, x, y);
	                        };
	                    obj.addEventListener(realName, f, false);
	                    return function () {
	                        obj.removeEventListener(realName, f, false);
	                        return true;
	                    };
	                };
	            } else if (g.doc.attachEvent) {
	                return function (obj, type, fn, element) {
	                    var f = function (e) {
	                        e = e || g.win.event;
	                        var scrollY = g.doc.documentElement.scrollTop || g.doc.body.scrollTop,
	                            scrollX = g.doc.documentElement.scrollLeft || g.doc.body.scrollLeft,
	                            x = e.clientX + scrollX,
	                            y = e.clientY + scrollY;
	                        e.preventDefault = e.preventDefault || preventDefault;
	                        e.stopPropagation = e.stopPropagation || stopPropagation;
	                        return fn.call(element, e, x, y);
	                    };
	                    obj.attachEvent("on" + type, f);
	                    var detacher = function () {
	                        obj.detachEvent("on" + type, f);
	                        return true;
	                    };
	                    return detacher;
	                };
	            }
	        })(),
	        drag = [],
	        dragMove = function (e) {
	            var x = e.clientX,
	                y = e.clientY,
	                scrollY = g.doc.documentElement.scrollTop || g.doc.body.scrollTop,
	                scrollX = g.doc.documentElement.scrollLeft || g.doc.body.scrollLeft,
	                dragi, j = drag.length;
	            while (j--) {
	                dragi = drag[j];
	                if (supportsTouch) {
	                    var i = e.touches.length,
	                        touch;
	                    while (i--) {
	                        touch = e.touches[i];
	                        if (touch.identifier == dragi.el._drag.id) {
	                            x = touch.clientX;
	                            y = touch.clientY;
	                            (e.originalEvent ? e.originalEvent : e).preventDefault();
	                            break;
	                        }
	                    }
	                } else {
	                    e.preventDefault();
	                }
	                var node = dragi.el.node,
	                    o, next = node.nextSibling,
	                    parent = node.parentNode,
	                    display = node.style.display;
	                g.win.opera && parent.removeChild(node);
	                node.style.display = "none";
	                o = dragi.el.paper.getElementByPoint(x, y);
	                node.style.display = display;
	                g.win.opera && (next ? parent.insertBefore(node, next) : parent.appendChild(node));
	                o && eve("raphael.drag.over." + dragi.el.id, dragi.el, o);
	                x += scrollX;
	                y += scrollY;
	                eve("raphael.drag.move." + dragi.el.id, dragi.move_scope || dragi.el, x - dragi.el._drag.x, y - dragi.el._drag.y, x, y, e);
	            }
	        },
	        dragUp = function (e) {
	            R.unmousemove(dragMove).unmouseup(dragUp);
	            var i = drag.length,
	                dragi;
	            while (i--) {
	                dragi = drag[i];
	                dragi.el._drag = {};
	                eve("raphael.drag.end." + dragi.el.id, dragi.end_scope || dragi.start_scope || dragi.move_scope || dragi.el, e);
	            }
	            drag = [];
	        },

	        elproto = R.el = {};



	    for (var i = events.length; i--;) {
	        (function (eventName) {
	            R[eventName] = elproto[eventName] = function (fn, scope) {
	                if (R.is(fn, "function")) {
	                    this.events = this.events || [];
	                    this.events.push({
	                        name: eventName,
	                        f: fn,
	                        unbind: addEvent(this.shape || this.node || g.doc, eventName, fn, scope || this)
	                    });
	                }
	                return this;
	            };
	            R["un" + eventName] = elproto["un" + eventName] = function (fn) {
	                var events = this.events || [],
	                    l = events.length;
	                while (l--)
	                    if (events[l].name == eventName && events[l].f == fn) {
	                        events[l].unbind();
	                        events.splice(l, 1);
	                        !events.length && delete this.events;
	                        return this;
	                    }
	                return this;
	            };
	        })(events[i]);
	    }


	    elproto.data = function (key, value) {
	        var data = eldata[this.id] = eldata[this.id] || {};
	        if (arguments.length == 1) {
	            if (R.is(key, "object")) {
	                for (var i in key)
	                    if (key[has](i)) {
	                        this.data(i, key[i]);
	                    }
	                return this;
	            }
	            eve("raphael.data.get." + this.id, this, data[key], key);
	            return data[key];
	        }
	        data[key] = value;
	        eve("raphael.data.set." + this.id, this, value, key);
	        return this;
	    };

	    elproto.removeData = function (key) {
	        if (key == null) {
	            eldata[this.id] = {};
	        } else {
	            eldata[this.id] && delete eldata[this.id][key];
	        }
	        return this;
	    };

	    elproto.hover = function (f_in, f_out, scope_in, scope_out) {
	        return this.mouseover(f_in, scope_in).mouseout(f_out, scope_out || scope_in);
	    };

	    elproto.unhover = function (f_in, f_out) {
	        return this.unmouseover(f_in).unmouseout(f_out);
	    };
	    var draggable = [];

	    elproto.drag = function (onmove, onstart, onend, move_scope, start_scope, end_scope) {
	        function start(e) {
	            (e.originalEvent || e).preventDefault();
	            var scrollY = g.doc.documentElement.scrollTop || g.doc.body.scrollTop,
	                scrollX = g.doc.documentElement.scrollLeft || g.doc.body.scrollLeft;
	            this._drag.x = e.clientX + scrollX;
	            this._drag.y = e.clientY + scrollY;
	            this._drag.id = e.identifier;
	            !drag.length && R.mousemove(dragMove).mouseup(dragUp);
	            drag.push({
	                el: this,
	                move_scope: move_scope,
	                start_scope: start_scope,
	                end_scope: end_scope
	            });
	            onstart && eve.on("raphael.drag.start." + this.id, onstart);
	            onmove && eve.on("raphael.drag.move." + this.id, onmove);
	            onend && eve.on("raphael.drag.end." + this.id, onend);
	            eve("raphael.drag.start." + this.id, start_scope || move_scope || this, e.clientX + scrollX, e.clientY + scrollY, e);
	        }
	        this._drag = {};
	        draggable.push({
	            el: this,
	            start: start
	        });
	        this.mousedown(start);
	        return this;
	    };

	    elproto.onDragOver = function (f) {
	        f ? eve.on("raphael.drag.over." + this.id, f) : eve.unbind("raphael.drag.over." + this.id);
	    };

	    elproto.undrag = function () {
	        var i = draggable.length;
	        while (i--)
	            if (draggable[i].el == this) {
	                this.unmousedown(draggable[i].start);
	                draggable.splice(i, 1);
	                eve.unbind("raphael.drag.*." + this.id);
	            } !draggable.length && R.unmousemove(dragMove).unmouseup(dragUp);
	    };

	    paperproto.circle = function (x, y, r) {
	        var out = R._engine.circle(this, x || 0, y || 0, r || 0);
	        this.__set__ && this.__set__.push(out);
	        return out;
	    };

	    paperproto.rect = function (x, y, w, h, r) {
	        var out = R._engine.rect(this, x || 0, y || 0, w || 0, h || 0, r || 0);
	        this.__set__ && this.__set__.push(out);
	        return out;
	    };

	    paperproto.ellipse = function (x, y, rx, ry) {
	        var out = R._engine.ellipse(this, x || 0, y || 0, rx || 0, ry || 0);
	        this.__set__ && this.__set__.push(out);
	        return out;
	    };

	    // [wumingdan] support group
	    paperproto.group = function (clazz) {
	        var out = R._engine.group(this);

	        if (clazz !== undefined) {
	            if (R.svg) {
	                out.attr('class', clazz);
	            }
	            else {
	                out.node.className = clazz;
	            }
	        }

	        this.__set__ && this.__set__.push(out);
	        return out;
	    };

	    paperproto.path = function (pathString) {
	        pathString && !R.is(pathString, string) && !R.is(pathString[0], array) && (pathString += E);
	        var out = R._engine.path(R.format[apply](R, arguments), this);
	        this.__set__ && this.__set__.push(out);
	        return out;
	    };

	    paperproto.image = function (src, x, y, w, h) {
	        var out = R._engine.image(this, src || "about:blank", x || 0, y || 0, w || 0, h || 0);
	        this.__set__ && this.__set__.push(out);
	        return out;
	    };

	    paperproto.text = function (x, y, text) {
	        var out = R._engine.text(this, x || 0, y || 0, Str(text));
	        this.__set__ && this.__set__.push(out);
	        return out;
	    };

	    paperproto.set = function (itemsArray) {
	        !R.is(itemsArray, "array") && (itemsArray = Array.prototype.splice.call(arguments, 0, arguments.length));
	        var out = new Set(itemsArray);
	        this.__set__ && this.__set__.push(out);
	        return out;
	    };

	    paperproto.setStart = function (set) {
	        this.__set__ = set || this.set();
	    };

	    paperproto.setFinish = function (set) {
	        var out = this.__set__;
	        delete this.__set__;
	        return out;
	    };

	    paperproto.setSize = function (width, height) {
	        return R._engine.setSize.call(this, width, height);
	    };

	    paperproto.setViewBox = function (x, y, w, h, fit) {
	        return R._engine.setViewBox.call(this, x, y, w, h, fit);
	    };


	    paperproto.top = paperproto.bottom = null;

	    paperproto.raphael = R;
	    var getOffset = function (elem) {
	        var box = elem.getBoundingClientRect(),
	            doc = elem.ownerDocument,
	            body = doc.body,
	            docElem = doc.documentElement,
	            clientTop = docElem.clientTop || body.clientTop || 0,
	            clientLeft = docElem.clientLeft || body.clientLeft || 0,
	            top = box.top + (g.win.pageYOffset || docElem.scrollTop || body.scrollTop) - clientTop,
	            left = box.left + (g.win.pageXOffset || docElem.scrollLeft || body.scrollLeft) - clientLeft;
	        return {
	            y: top,
	            x: left
	        };
	    };

	    paperproto.getElementByPoint = function (x, y) {
	        var paper = this,
	            svg = paper.canvas,
	            target = g.doc.elementFromPoint(x, y);
	        if (g.win.opera && target.tagName == "svg") {
	            var so = getOffset(svg),
	                sr = svg.createSVGRect();
	            sr.x = x - so.x;
	            sr.y = y - so.y;
	            sr.width = sr.height = 1;
	            var hits = svg.getIntersectionList(sr, null);
	            if (hits.length) {
	                target = hits[hits.length - 1];
	            }
	        }
	        if (!target) {
	            return null;
	        }
	        while (target.parentNode && target != svg.parentNode && !target.raphael) {
	            target = target.parentNode;
	        }
	        target == paper.canvas.parentNode && (target = svg);
	        target = target && target.raphael ? paper.getById(target.raphaelid) : null;
	        return target;
	    };

	    paperproto.getById = function (id) {
	        var bot = this.bottom;
	        while (bot) {
	            if (bot.id == id) {
	                return bot;
	            }
	            bot = bot.next;
	        }
	        return null;
	    };

	    paperproto.forEach = function (callback, thisArg) {
	        var bot = this.bottom;
	        while (bot) {
	            if (callback.call(thisArg, bot) === false) {
	                return this;
	            }
	            bot = bot.next;
	        }
	        return this;
	    };

	    paperproto.getElementsByPoint = function (x, y) {
	        var set = this.set();
	        this.forEach(function (el) {
	            if (el.isPointInside(x, y)) {
	                set.push(el);
	            }
	        });
	        return set;
	    };

	    function x_y() {
	        return this.x + S + this.y;
	    }

	    function x_y_w_h() {
	        return this.x + S + this.y + S + this.width + " \xd7 " + this.height;
	    }

	    elproto.isPointInside = function (x, y) {
	        var rp = this.realPath = this.realPath || getPath[this.type](this);
	        return R.isPointInsidePath(rp, x, y);
	    };

	    elproto.getBBox = function (isWithoutTransform) {
	        if (this.removed) {
	            return {};
	        }
	        var _ = this._;
	        if (isWithoutTransform) {
	            if (_.dirty || !_.bboxwt) {
	                this.realPath = getPath[this.type](this);
	                _.bboxwt = pathDimensions(this.realPath);
	                _.bboxwt.toString = x_y_w_h;
	                _.dirty = 0;
	            }
	            return _.bboxwt;
	        }
	        if (_.dirty || _.dirtyT || !_.bbox) {
	            if (_.dirty || !this.realPath) {
	                _.bboxwt = 0;
	                this.realPath = getPath[this.type](this);
	            }
	            _.bbox = pathDimensions(mapPath(this.realPath, this.matrix));
	            _.bbox.toString = x_y_w_h;
	            _.dirty = _.dirtyT = 0;
	        }
	        return _.bbox;
	    };

	    elproto.clone = function () {
	        if (this.removed) {
	            return null;
	        }
	        var out = this.paper[this.type]().attr(this.attr());
	        this.__set__ && this.__set__.push(out);
	        return out;
	    };

	    elproto.glow = function (glow) {
	        if (this.type == "text") {
	            return null;
	        }
	        glow = glow || {};
	        var s = {
	            width: (glow.width || 10) + (+this.attr("stroke-width") || 1),
	            fill: glow.fill || false,
	            opacity: glow.opacity || .5,
	            offsetx: glow.offsetx || 0,
	            offsety: glow.offsety || 0,
	            color: glow.color || "#000"
	        },
	            c = s.width / 2,
	            r = this.paper,
	            out = r.set(),
	            path = this.realPath || getPath[this.type](this);
	        path = this.matrix ? mapPath(path, this.matrix) : path;
	        for (var i = 1; i < c + 1; i++) {
	            out.push(r.path(path).attr({
	                stroke: s.color,
	                fill: s.fill ? s.color : "none",
	                "stroke-linejoin": "round",
	                "stroke-linecap": "round",
	                "stroke-width": +(s.width / c * i).toFixed(3),
	                opacity: +(s.opacity / c).toFixed(3)
	            }));
	        }
	        return out.insertBefore(this).translate(s.offsetx, s.offsety);
	    };
	    var curveslengths = {},
	        getPointAtSegmentLength = function (p1x, p1y, c1x, c1y, c2x, c2y, p2x, p2y, length) {
	            if (length == null) {
	                return bezlen(p1x, p1y, c1x, c1y, c2x, c2y, p2x, p2y);
	            } else {
	                return R.findDotsAtSegment(p1x, p1y, c1x, c1y, c2x, c2y, p2x, p2y, getTatLen(p1x, p1y, c1x, c1y, c2x, c2y, p2x, p2y, length));
	            }
	        },
	        getLengthFactory = function (istotal, subpath) {
	            return function (path, length, onlystart) {
	                path = path2curve(path);
	                var x, y, p, l, sp = "",
	                    subpaths = {},
	                    point, len = 0;
	                for (var i = 0, ii = path.length; i < ii; i++) {
	                    p = path[i];
	                    if (p[0] == "M") {
	                        x = +p[1];
	                        y = +p[2];
	                    } else {
	                        l = getPointAtSegmentLength(x, y, p[1], p[2], p[3], p[4], p[5], p[6]);
	                        if (len + l > length) {
	                            if (subpath && !subpaths.start) {
	                                point = getPointAtSegmentLength(x, y, p[1], p[2], p[3], p[4], p[5], p[6], length - len);
	                                sp += ["C" + point.start.x, point.start.y, point.m.x, point.m.y, point.x, point.y];
	                                if (onlystart) {
	                                    return sp;
	                                }
	                                subpaths.start = sp;
	                                sp = ["M" + point.x, point.y + "C" + point.n.x, point.n.y, point.end.x, point.end.y, p[5], p[6]].join();
	                                len += l;
	                                x = +p[5];
	                                y = +p[6];
	                                continue;
	                            }
	                            if (!istotal && !subpath) {
	                                point = getPointAtSegmentLength(x, y, p[1], p[2], p[3], p[4], p[5], p[6], length - len);
	                                return {
	                                    x: point.x,
	                                    y: point.y,
	                                    alpha: point.alpha
	                                };
	                            }
	                        }
	                        len += l;
	                        x = +p[5];
	                        y = +p[6];
	                    }
	                    sp += p.shift() + p;
	                }
	                subpaths.end = sp;
	                point = istotal ? len : subpath ? subpaths : R.findDotsAtSegment(x, y, p[0], p[1], p[2], p[3], p[4], p[5], 1);
	                point.alpha && (point = {
	                    x: point.x,
	                    y: point.y,
	                    alpha: point.alpha
	                });
	                return point;
	            };
	        };
	    var getTotalLength = getLengthFactory(1),
	        getPointAtLength = getLengthFactory(),
	        getSubpathsAtLength = getLengthFactory(0, 1);

	    R.getTotalLength = getTotalLength;

	    R.getPointAtLength = getPointAtLength;

	    R.getSubpath = function (path, from, to) {
	        if (this.getTotalLength(path) - to < 1e-6) {
	            return getSubpathsAtLength(path, from).end;
	        }
	        var a = getSubpathsAtLength(path, to, 1);
	        return from ? getSubpathsAtLength(a, from).end : a;
	    };

	    elproto.getTotalLength = function () {
	        if (this.type != "path") {
	            return;
	        }
	        if (this.node.getTotalLength) {
	            return this.node.getTotalLength();
	        }
	        return getTotalLength(this.attrs.path);
	    };

	    elproto.getPointAtLength = function (length) {
	        if (this.type != "path") {
	            return;
	        }
	        return getPointAtLength(this.attrs.path, length);
	    };

	    elproto.getSubpath = function (from, to) {
	        if (this.type != "path") {
	            return;
	        }
	        return R.getSubpath(this.attrs.path, from, to);
	    };

	    var ef = R.easing_formulas = {
	        linear: function (n) {
	            return n;
	        },
	        "<": function (n) {
	            return pow(n, 1.7);
	        },
	        ">": function (n) {
	            return pow(n, .48);
	        },
	        "<>": function (n) {
	            var q = .48 - n / 1.04,
	                Q = math.sqrt(.1734 + q * q),
	                x = Q - q,
	                X = pow(abs(x), 1 / 3) * (x < 0 ? -1 : 1),
	                y = -Q - q,
	                Y = pow(abs(y), 1 / 3) * (y < 0 ? -1 : 1),
	                t = X + Y + .5;
	            return (1 - t) * 3 * t * t + t * t * t;
	        },
	        backIn: function (n) {
	            var s = 1.70158;
	            return n * n * ((s + 1) * n - s);
	        },
	        backOut: function (n) {
	            n = n - 1;
	            var s = 1.70158;
	            return n * n * ((s + 1) * n + s) + 1;
	        },
	        elastic: function (n) {
	            if (n == !!n) {
	                return n;
	            }
	            return pow(2, -10 * n) * math.sin((n - .075) * (2 * PI) / .3) + 1;
	        },
	        bounce: function (n) {
	            var s = 7.5625,
	                p = 2.75,
	                l;
	            if (n < (1 / p)) {
	                l = s * n * n;
	            } else {
	                if (n < (2 / p)) {
	                    n -= (1.5 / p);
	                    l = s * n * n + .75;
	                } else {
	                    if (n < (2.5 / p)) {
	                        n -= (2.25 / p);
	                        l = s * n * n + .9375;
	                    } else {
	                        n -= (2.625 / p);
	                        l = s * n * n + .984375;
	                    }
	                }
	            }
	            return l;
	        }
	    };
	    ef.easeIn = ef["ease-in"] = ef["<"];
	    ef.easeOut = ef["ease-out"] = ef[">"];
	    ef.easeInOut = ef["ease-in-out"] = ef["<>"];
	    ef["back-in"] = ef.backIn;
	    ef["back-out"] = ef.backOut;

	    var animationElements = [],
	        requestAnimFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
	        function (callback) {
	            setTimeout(callback, 16);
	        },
	        animation = function () {
	            var Now = +new Date,
	                l = 0;
	            for (; l < animationElements.length; l++) {
	                var e = animationElements[l];
	                if (e.el.removed || e.paused) {
	                    continue;
	                }
	                var time = Now - e.start,
	                    ms = e.ms,
	                    easing = e.easing,
	                    from = e.from,
	                    diff = e.diff,
	                    to = e.to,
	                    t = e.t,
	                    that = e.el,
	                    set = {},
	                    now, init = {},
	                    key;
	                if (e.initstatus) {
	                    time = (e.initstatus * e.anim.top - e.prev) / (e.percent - e.prev) * ms;
	                    e.status = e.initstatus;
	                    delete e.initstatus;
	                    e.stop && animationElements.splice(l--, 1);
	                } else {
	                    e.status = (e.prev + (e.percent - e.prev) * (time / ms)) / e.anim.top;
	                }
	                if (time < 0) {
	                    continue;
	                }
	                if (time < ms) {
	                    var pos = easing(time / ms);
	                    for (var attr in from)
	                        if (from[has](attr)) {
	                            switch (availableAnimAttrs[attr]) {
	                                case nu:
	                                    now = +from[attr] + pos * ms * diff[attr];
	                                    break;
	                                case "colour":
	                                    now = "rgb(" + [
	                                        upto255(round(from[attr].r + pos * ms * diff[attr].r)), upto255(round(from[attr].g + pos * ms * diff[attr].g)), upto255(round(from[attr].b + pos * ms * diff[attr].b))
	                                    ].join(",") + ")";
	                                    break;
	                                case "path":
	                                    now = [];
	                                    for (var i = 0, ii = from[attr].length; i < ii; i++) {
	                                        now[i] = [from[attr][i][0]];
	                                        for (var j = 1, jj = from[attr][i].length; j < jj; j++) {
	                                            now[i][j] = +from[attr][i][j] + pos * ms * diff[attr][i][j];
	                                        }
	                                        now[i] = now[i].join(S);
	                                    }
	                                    now = now.join(S);
	                                    break;
	                                case "transform":
	                                    if (diff[attr].real) {
	                                        now = [];
	                                        for (i = 0, ii = from[attr].length; i < ii; i++) {
	                                            now[i] = [from[attr][i][0]];
	                                            for (j = 1, jj = from[attr][i].length; j < jj; j++) {
	                                                now[i][j] = from[attr][i][j] + pos * ms * diff[attr][i][j];
	                                            }
	                                        }
	                                    } else {
	                                        var get = function (i) {
	                                            return +from[attr][i] + pos * ms * diff[attr][i];
	                                        };
	                                        // now = [["r", get(2), 0, 0], ["t", get(3), get(4)], ["s", get(0), get(1), 0, 0]];
	                                        now = [
	                                            ["m", get(0), get(1), get(2), get(3), get(4), get(5)]
	                                        ];
	                                    }
	                                    break;
	                                case "csv":
	                                    if (attr == "clip-rect") {
	                                        now = [];
	                                        i = 4;
	                                        while (i--) {
	                                            now[i] = +from[attr][i] + pos * ms * diff[attr][i];
	                                        }
	                                    }
	                                    break;
	                                default:
	                                    var from2 = [][concat](from[attr]);
	                                    now = [];
	                                    i = that.paper.customAttributes[attr].length;
	                                    while (i--) {
	                                        now[i] = +from2[i] + pos * ms * diff[attr][i];
	                                    }
	                                    break;
	                            }
	                            set[attr] = now;
	                        }
	                    that.attr(set);
	                    (function (id, that, anim) {
	                        setTimeout(function () {
	                            eve("raphael.anim.frame." + id, that, anim);
	                        });
	                    })(that.id, that, e.anim);
	                } else {
	                    (function (f, el, a) {
	                        setTimeout(function () {
	                            eve("raphael.anim.frame." + el.id, el, a);
	                            eve("raphael.anim.finish." + el.id, el, a);
	                            R.is(f, "function") && f.call(el);
	                        });
	                    })(e.callback, that, e.anim);
	                    that.attr(to);
	                    animationElements.splice(l--, 1);
	                    if (e.repeat > 1 && !e.next) {
	                        for (key in to)
	                            if (to[has](key)) {
	                                init[key] = e.totalOrigin[key];
	                            }
	                        e.el.attr(init);
	                        runAnimation(e.anim, e.el, e.anim.percents[0], null, e.totalOrigin, e.repeat - 1);
	                    }
	                    if (e.next && !e.stop) {
	                        runAnimation(e.anim, e.el, e.next, null, e.totalOrigin, e.repeat);
	                    }
	                }
	            }
	            R.svg && that && that.paper && that.paper.safari();
	            animationElements.length && requestAnimFrame(animation);
	        },
	        upto255 = function (color) {
	            return color > 255 ? 255 : color < 0 ? 0 : color;
	        };

	    elproto.animateWith = function (el, anim, params, ms, easing, callback) {
	        var element = this;
	        if (element.removed) {
	            callback && callback.call(element);
	            return element;
	        }
	        var a = params instanceof Animation ? params : R.animation(params, ms, easing, callback),
	            x, y;
	        runAnimation(a, element, a.percents[0], null, element.attr());
	        for (var i = 0, ii = animationElements.length; i < ii; i++) {
	            if (animationElements[i].anim == anim && animationElements[i].el == el) {
	                animationElements[ii - 1].start = animationElements[i].start;
	                break;
	            }
	        }
	        return element;
	        // 
	        // 
	        // var a = params ? R.animation(params, ms, easing, callback) : anim,
	        //     status = element.status(anim);
	        // return this.animate(a).status(a, status * anim.ms / a.ms);
	    };

	    function CubicBezierAtTime(t, p1x, p1y, p2x, p2y, duration) {
	        var cx = 3 * p1x,
	            bx = 3 * (p2x - p1x) - cx,
	            ax = 1 - cx - bx,
	            cy = 3 * p1y,
	            by = 3 * (p2y - p1y) - cy,
	            ay = 1 - cy - by;

	        function sampleCurveX(t) {
	            return ((ax * t + bx) * t + cx) * t;
	        }

	        function solve(x, epsilon) {
	            var t = solveCurveX(x, epsilon);
	            return ((ay * t + by) * t + cy) * t;
	        }

	        function solveCurveX(x, epsilon) {
	            var t0, t1, t2, x2, d2, i;
	            for (t2 = x, i = 0; i < 8; i++) {
	                x2 = sampleCurveX(t2) - x;
	                if (abs(x2) < epsilon) {
	                    return t2;
	                }
	                d2 = (3 * ax * t2 + 2 * bx) * t2 + cx;
	                if (abs(d2) < 1e-6) {
	                    break;
	                }
	                t2 = t2 - x2 / d2;
	            }
	            t0 = 0;
	            t1 = 1;
	            t2 = x;
	            if (t2 < t0) {
	                return t0;
	            }
	            if (t2 > t1) {
	                return t1;
	            }
	            while (t0 < t1) {
	                x2 = sampleCurveX(t2);
	                if (abs(x2 - x) < epsilon) {
	                    return t2;
	                }
	                if (x > x2) {
	                    t0 = t2;
	                } else {
	                    t1 = t2;
	                }
	                t2 = (t1 - t0) / 2 + t0;
	            }
	            return t2;
	        }
	        return solve(t, 1 / (200 * duration));
	    }
	    elproto.onAnimation = function (f) {
	        f ? eve.on("raphael.anim.frame." + this.id, f) : eve.unbind("raphael.anim.frame." + this.id);
	        return this;
	    };

	    function Animation(anim, ms) {
	        var percents = [],
	            newAnim = {};
	        this.ms = ms;
	        this.times = 1;
	        if (anim) {
	            for (var attr in anim)
	                if (anim[has](attr)) {
	                    newAnim[toFloat(attr)] = anim[attr];
	                    percents.push(toFloat(attr));
	                }
	            percents.sort(sortByNumber);
	        }
	        this.anim = newAnim;
	        this.top = percents[percents.length - 1];
	        this.percents = percents;
	    }

	    Animation.prototype.delay = function (delay) {
	        var a = new Animation(this.anim, this.ms);
	        a.times = this.times;
	        a.del = +delay || 0;
	        return a;
	    };

	    Animation.prototype.repeat = function (times) {
	        var a = new Animation(this.anim, this.ms);
	        a.del = this.del;
	        a.times = math.floor(mmax(times, 0)) || 1;
	        return a;
	    };

	    function runAnimation(anim, element, percent, status, totalOrigin, times) {
	        percent = toFloat(percent);
	        var params, isInAnim, isInAnimSet, percents = [],
	            next, prev, timestamp, ms = anim.ms,
	            from = {},
	            to = {},
	            diff = {};
	        if (status) {
	            for (i = 0, ii = animationElements.length; i < ii; i++) {
	                var e = animationElements[i];
	                if (e.el.id == element.id && e.anim == anim) {
	                    if (e.percent != percent) {
	                        animationElements.splice(i, 1);
	                        isInAnimSet = 1;
	                    } else {
	                        isInAnim = e;
	                    }
	                    element.attr(e.totalOrigin);
	                    break;
	                }
	            }
	        } else {
	            status = +to; // NaN
	        }
	        for (var i = 0, ii = anim.percents.length; i < ii; i++) {
	            if (anim.percents[i] == percent || anim.percents[i] > status * anim.top) {
	                percent = anim.percents[i];
	                prev = anim.percents[i - 1] || 0;
	                ms = ms / anim.top * (percent - prev);
	                next = anim.percents[i + 1];
	                params = anim.anim[percent];
	                break;
	            } else if (status) {
	                element.attr(anim.anim[anim.percents[i]]);
	            }
	        }
	        if (!params) {
	            return;
	        }
	        if (!isInAnim) {
	            for (var attr in params)
	                if (params[has](attr)) {
	                    if (availableAnimAttrs[has](attr) || element.paper.customAttributes[has](attr)) {
	                        from[attr] = element.attr(attr);
	                        (from[attr] == null) && (from[attr] = availableAttrs[attr]);
	                        to[attr] = params[attr];
	                        switch (availableAnimAttrs[attr]) {
	                            case nu:
	                                diff[attr] = (to[attr] - from[attr]) / ms;
	                                break;
	                            case "colour":
	                                from[attr] = R.getRGB(from[attr]);
	                                var toColour = R.getRGB(to[attr]);
	                                diff[attr] = {
	                                    r: (toColour.r - from[attr].r) / ms,
	                                    g: (toColour.g - from[attr].g) / ms,
	                                    b: (toColour.b - from[attr].b) / ms
	                                };
	                                break;
	                            case "path":
	                                var pathes = path2curve(from[attr], to[attr]),
	                                    toPath = pathes[1];
	                                from[attr] = pathes[0];
	                                diff[attr] = [];
	                                for (i = 0, ii = from[attr].length; i < ii; i++) {
	                                    diff[attr][i] = [0];
	                                    for (var j = 1, jj = from[attr][i].length; j < jj; j++) {
	                                        diff[attr][i][j] = (toPath[i][j] - from[attr][i][j]) / ms;
	                                    }
	                                }
	                                break;
	                            case "transform":
	                                var _ = element._,
	                                    eq = equaliseTransform(_[attr], to[attr]);
	                                if (eq) {
	                                    from[attr] = eq.from;
	                                    to[attr] = eq.to;
	                                    diff[attr] = [];
	                                    diff[attr].real = true;
	                                    for (i = 0, ii = from[attr].length; i < ii; i++) {
	                                        diff[attr][i] = [from[attr][i][0]];
	                                        for (j = 1, jj = from[attr][i].length; j < jj; j++) {
	                                            diff[attr][i][j] = (to[attr][i][j] - from[attr][i][j]) / ms;
	                                        }
	                                    }
	                                } else {
	                                    var m = (element.matrix || new Matrix),
	                                        to2 = {
	                                            _: {
	                                                transform: _.transform
	                                            },
	                                            getBBox: function () {
	                                                return element.getBBox(1);
	                                            }
	                                        };
	                                    from[attr] = [
	                                        m.a, m.b, m.c, m.d, m.e, m.f
	                                    ];
	                                    extractTransform(to2, to[attr]);
	                                    to[attr] = to2._.transform;
	                                    diff[attr] = [(to2.matrix.a - m.a) / ms, (to2.matrix.b - m.b) / ms, (to2.matrix.c - m.c) / ms, (to2.matrix.d - m.d) / ms, (to2.matrix.e - m.e) / ms, (to2.matrix.f - m.f) / ms];
	                                    // from[attr] = [_.sx, _.sy, _.deg, _.dx, _.dy];
	                                    // var to2 = {_:{}, getBBox: function () { return element.getBBox(); }};
	                                    // extractTransform(to2, to[attr]);
	                                    // diff[attr] = [
	                                    //     (to2._.sx - _.sx) / ms,
	                                    //     (to2._.sy - _.sy) / ms,
	                                    //     (to2._.deg - _.deg) / ms,
	                                    //     (to2._.dx - _.dx) / ms,
	                                    //     (to2._.dy - _.dy) / ms
	                                    // ];
	                                }
	                                break;
	                            case "csv":
	                                var values = Str(params[attr])[split](separator),
	                                    from2 = Str(from[attr])[split](separator);
	                                if (attr == "clip-rect") {
	                                    from[attr] = from2;
	                                    diff[attr] = [];
	                                    i = from2.length;
	                                    while (i--) {
	                                        diff[attr][i] = (values[i] - from[attr][i]) / ms;
	                                    }
	                                }
	                                to[attr] = values;
	                                break;
	                            default:
	                                values = [][concat](params[attr]);
	                                from2 = [][concat](from[attr]);
	                                diff[attr] = [];
	                                i = element.paper.customAttributes[attr].length;
	                                while (i--) {
	                                    diff[attr][i] = ((values[i] || 0) - (from2[i] || 0)) / ms;
	                                }
	                                break;
	                        }
	                    }
	                }
	            var easing = params.easing,
	                easyeasy = R.easing_formulas[easing];
	            if (!easyeasy) {
	                easyeasy = Str(easing).match(bezierrg);
	                if (easyeasy && easyeasy.length == 5) {
	                    var curve = easyeasy;
	                    easyeasy = function (t) {
	                        return CubicBezierAtTime(t, +curve[1], +curve[2], +curve[3], +curve[4], ms);
	                    };
	                } else {
	                    easyeasy = pipe;
	                }
	            }
	            timestamp = params.start || anim.start || +new Date;
	            e = {
	                anim: anim,
	                percent: percent,
	                timestamp: timestamp,
	                start: timestamp + (anim.del || 0),
	                status: 0,
	                initstatus: status || 0,
	                stop: false,
	                ms: ms,
	                easing: easyeasy,
	                from: from,
	                diff: diff,
	                to: to,
	                el: element,
	                callback: params.callback,
	                prev: prev,
	                next: next,
	                repeat: times || anim.times,
	                origin: element.attr(),
	                totalOrigin: totalOrigin
	            };
	            animationElements.push(e);
	            if (status && !isInAnim && !isInAnimSet) {
	                e.stop = true;
	                e.start = new Date - ms * status;
	                if (animationElements.length == 1) {
	                    return animation();
	                }
	            }
	            if (isInAnimSet) {
	                e.start = new Date - e.ms * status;
	            }
	            animationElements.length == 1 && requestAnimFrame(animation);
	        } else {
	            isInAnim.initstatus = status;
	            isInAnim.start = new Date - isInAnim.ms * status;
	        }
	        eve("raphael.anim.start." + element.id, element, anim);
	    }

	    R.animation = function (params, ms, easing, callback) {
	        if (params instanceof Animation) {
	            return params;
	        }
	        if (R.is(easing, "function") || !easing) {
	            callback = callback || easing || null;
	            easing = null;
	        }
	        params = Object(params);
	        ms = +ms || 0;
	        var p = {},
	            json, attr;
	        for (attr in params)
	            if (params[has](attr) && toFloat(attr) != attr && toFloat(attr) + "%" != attr) {
	                json = true;
	                p[attr] = params[attr];
	            }
	        if (!json) {
	            return new Animation(params, ms);
	        } else {
	            easing && (p.easing = easing);
	            callback && (p.callback = callback);
	            return new Animation({
	                100: p
	            }, ms);
	        }
	    };

	    elproto.animate = function (params, ms, easing, callback) {
	        var element = this;
	        if (element.removed) {
	            callback && callback.call(element);
	            return element;
	        }
	        var anim = params instanceof Animation ? params : R.animation(params, ms, easing, callback);
	        runAnimation(anim, element, anim.percents[0], null, element.attr());
	        return element;
	    };

	    elproto.setTime = function (anim, value) {
	        if (anim && value != null) {
	            this.status(anim, mmin(value, anim.ms) / anim.ms);
	        }
	        return this;
	    };

	    elproto.status = function (anim, value) {
	        var out = [],
	            i = 0,
	            len, e;
	        if (value != null) {
	            runAnimation(anim, this, -1, mmin(value, 1));
	            return this;
	        } else {
	            len = animationElements.length;
	            for (; i < len; i++) {
	                e = animationElements[i];
	                if (e.el.id == this.id && (!anim || e.anim == anim)) {
	                    if (anim) {
	                        return e.status;
	                    }
	                    out.push({
	                        anim: e.anim,
	                        status: e.status
	                    });
	                }
	            }
	            if (anim) {
	                return 0;
	            }
	            return out;
	        }
	    };

	    elproto.pause = function (anim) {
	        for (var i = 0; i < animationElements.length; i++)
	            if (animationElements[i].el.id == this.id && (!anim || animationElements[i].anim == anim)) {
	                if (eve("raphael.anim.pause." + this.id, this, animationElements[i].anim) !== false) {
	                    animationElements[i].paused = true;
	                }
	            }
	        return this;
	    };

	    elproto.resume = function (anim) {
	        for (var i = 0; i < animationElements.length; i++)
	            if (animationElements[i].el.id == this.id && (!anim || animationElements[i].anim == anim)) {
	                var e = animationElements[i];
	                if (eve("raphael.anim.resume." + this.id, this, e.anim) !== false) {
	                    delete e.paused;
	                    this.status(e.anim, e.status);
	                }
	            }
	        return this;
	    };

	    elproto.stop = function (anim) {
	        for (var i = 0; i < animationElements.length; i++)
	            if (animationElements[i].el.id == this.id && (!anim || animationElements[i].anim == anim)) {
	                if (eve("raphael.anim.stop." + this.id, this, animationElements[i].anim) !== false) {
	                    animationElements.splice(i--, 1);
	                }
	            }
	        return this;
	    };

	    function stopAnimation(paper) {
	        for (var i = 0; i < animationElements.length; i++)
	            if (animationElements[i].el.paper == paper) {
	                animationElements.splice(i--, 1);
	            }
	    }
	    eve.on("raphael.remove", stopAnimation);
	    eve.on("raphael.clear", stopAnimation);
	    elproto.toString = function () {
	        return "Rapha\xebl\u2019s object";
	    };

	    // Set
	    var Set = function (items) {
	        this.items = [];
	        this.length = 0;
	        this.type = "set";
	        if (items) {
	            for (var i = 0, ii = items.length; i < ii; i++) {
	                if (items[i] && (items[i].constructor == elproto.constructor || items[i].constructor == Set)) {
	                    this[this.items.length] = this.items[this.items.length] = items[i];
	                    this.length++;
	                }
	            }
	        }
	    },
	    setproto = Set.prototype;

	    setproto.push = function () {
	        var item, len;
	        for (var i = 0, ii = arguments.length; i < ii; i++) {
	            item = arguments[i];
	            if (item && (item.constructor == elproto.constructor || item.constructor == Set)) {
	                len = this.items.length;
	                this[len] = this.items[len] = item;
	                this.length++;
	            }
	        }
	        return this;
	    };

	    setproto.pop = function () {
	        this.length && delete this[this.length--];
	        return this.items.pop();
	    };

	    setproto.forEach = function (callback, thisArg) {
	        for (var i = 0, ii = this.items.length; i < ii; i++) {
	            if (callback.call(thisArg, this.items[i], i) === false) {
	                return this;
	            }
	        }
	        return this;
	    };
	    for (var method in elproto)
	        if (elproto[has](method)) {
	            setproto[method] = (function (methodname) {
	                return function () {
	                    var arg = arguments;
	                    return this.forEach(function (el) {
	                        el[methodname][apply](el, arg);
	                    });
	                };
	            })(method);
	        }
	    setproto.attr = function (name, value) {
	        if (name && R.is(name, array) && R.is(name[0], "object")) {
	            for (var j = 0, jj = name.length; j < jj; j++) {
	                this.items[j].attr(name[j]);
	            }
	        } else {
	            for (var i = 0, ii = this.items.length; i < ii; i++) {
	                this.items[i].attr(name, value);
	            }
	        }
	        return this;
	    };

	    setproto.clear = function () {
	        while (this.length) {
	            this.pop();
	        }
	    };

	    setproto.splice = function (index, count, insertion) {
	        index = index < 0 ? mmax(this.length + index, 0) : index;
	        count = mmax(0, mmin(this.length - index, count));
	        var tail = [],
	            todel = [],
	            args = [],
	            i;
	        for (i = 2; i < arguments.length; i++) {
	            args.push(arguments[i]);
	        }
	        for (i = 0; i < count; i++) {
	            todel.push(this[index + i]);
	        }
	        for (; i < this.length - index; i++) {
	            tail.push(this[index + i]);
	        }
	        var arglen = args.length;
	        for (i = 0; i < arglen + tail.length; i++) {
	            this.items[index + i] = this[index + i] = i < arglen ? args[i] : tail[i - arglen];
	        }
	        i = this.items.length = this.length -= count - arglen;
	        while (this[i]) {
	            delete this[i++];
	        }
	        return new Set(todel);
	    };

	    setproto.exclude = function (el) {
	        for (var i = 0, ii = this.length; i < ii; i++)
	            if (this[i] == el) {
	                this.splice(i, 1);
	                return true;
	            }
	    };
	    setproto.animate = function (params, ms, easing, callback) {
	        (R.is(easing, "function") || !easing) && (callback = easing || null);
	        var len = this.items.length,
	            i = len,
	            item, set = this,
	            collector;
	        if (!len) {
	            return this;
	        }
	        callback && (collector = function () {
	            !--len && callback.call(set);
	        });
	        easing = R.is(easing, string) ? easing : collector;
	        var anim = R.animation(params, ms, easing, collector);
	        item = this.items[--i].animate(anim);
	        while (i--) {
	            this.items[i] && !this.items[i].removed && this.items[i].animateWith(item, anim, anim);
	        }
	        return this;
	    };
	    setproto.insertAfter = function (el) {
	        var i = this.items.length;
	        while (i--) {
	            this.items[i].insertAfter(el);
	        }
	        return this;
	    };
	    setproto.getBBox = function () {
	        var x = [],
	            y = [],
	            x2 = [],
	            y2 = [];
	        for (var i = this.items.length; i--;)
	            if (!this.items[i].removed) {
	                var box = this.items[i].getBBox();
	                x.push(box.x);
	                y.push(box.y);
	                x2.push(box.x + box.width);
	                y2.push(box.y + box.height);
	            }
	        x = mmin[apply](0, x);
	        y = mmin[apply](0, y);
	        x2 = mmax[apply](0, x2);
	        y2 = mmax[apply](0, y2);
	        return {
	            x: x,
	            y: y,
	            x2: x2,
	            y2: y2,
	            width: x2 - x,
	            height: y2 - y
	        };
	    };
	    setproto.clone = function (s) {
	        s = new Set;
	        for (var i = 0, ii = this.items.length; i < ii; i++) {
	            s.push(this.items[i].clone());
	        }
	        return s;
	    };
	    setproto.toString = function () {
	        return "Rapha\xebl\u2018s set";
	    };

	    // [wumingdan] fix glow bug
	    setproto.glow = function (glowConfig) {
	        var ret = new Set;
	        this.forEach(function (shape, index) {
	            var g = shape.glow(glowConfig);
	            if (g != null) {
	                g.forEach(function (shape2, index2) {
	                    ret.push(shape2);
	                });
	            }
	        });
	        return ret;
	    };

	    R.registerFont = function (font) {
	        if (!font.face) {
	            return font;
	        }
	        this.fonts = this.fonts || {};
	        var fontcopy = {
	            w: font.w,
	            face: {},
	            glyphs: {}
	        },
	            family = font.face["font-family"];
	        for (var prop in font.face)
	            if (font.face[has](prop)) {
	                fontcopy.face[prop] = font.face[prop];
	            }
	        if (this.fonts[family]) {
	            this.fonts[family].push(fontcopy);
	        } else {
	            this.fonts[family] = [fontcopy];
	        }
	        if (!font.svg) {
	            fontcopy.face["units-per-em"] = toInt(font.face["units-per-em"], 10);
	            for (var glyph in font.glyphs)
	                if (font.glyphs[has](glyph)) {
	                    var path = font.glyphs[glyph];
	                    fontcopy.glyphs[glyph] = {
	                        w: path.w,
	                        k: {},
	                        d: path.d && "M" + path.d.replace(/[mlcxtrv]/g, function (command) {
	                            return {
	                                l: "L",
	                                c: "C",
	                                x: "z",
	                                t: "m",
	                                r: "l",
	                                v: "c"
	                            }[command] || "M";
	                        }) + "z"
	                    };
	                    if (path.k) {
	                        for (var k in path.k)
	                            if (path[has](k)) {
	                                fontcopy.glyphs[glyph].k[k] = path.k[k];
	                            }
	                    }
	                }
	        }
	        return font;
	    };

	    paperproto.getFont = function (family, weight, style, stretch) {
	        stretch = stretch || "normal";
	        style = style || "normal";
	        weight = +weight || {
	            normal: 400,
	            bold: 700,
	            lighter: 300,
	            bolder: 800
	        }[weight] || 400;
	        if (!R.fonts) {
	            return;
	        }
	        var font = R.fonts[family];
	        if (!font) {
	            var name = new RegExp("(^|\\s)" + family.replace(/[^\w\d\s+!~.:_-]/g, E) + "(\\s|$)", "i");
	            for (var fontName in R.fonts)
	                if (R.fonts[has](fontName)) {
	                    if (name.test(fontName)) {
	                        font = R.fonts[fontName];
	                        break;
	                    }
	                }
	        }
	        var thefont;
	        if (font) {
	            for (var i = 0, ii = font.length; i < ii; i++) {
	                thefont = font[i];
	                if (thefont.face["font-weight"] == weight && (thefont.face["font-style"] == style || !thefont.face["font-style"]) && thefont.face["font-stretch"] == stretch) {
	                    break;
	                }
	            }
	        }
	        return thefont;
	    };

	    paperproto.print = function (x, y, string, font, size, origin, letter_spacing) {
	        origin = origin || "middle"; // baseline|middle
	        letter_spacing = mmax(mmin(letter_spacing || 0, 1), -1);
	        var letters = Str(string)[split](E),
	            shift = 0,
	            notfirst = 0,
	            path = E,
	            scale;
	        R.is(font, string) && (font = this.getFont(font));
	        if (font) {
	            scale = (size || 16) / font.face["units-per-em"];
	            var bb = font.face.bbox[split](separator),
	                top = +bb[0],
	                lineHeight = bb[3] - bb[1],
	                shifty = 0,
	                height = +bb[1] + (origin == "baseline" ? lineHeight + (+font.face.descent) : lineHeight / 2);
	            for (var i = 0, ii = letters.length; i < ii; i++) {
	                if (letters[i] == "\n") {
	                    shift = 0;
	                    curr = 0;
	                    notfirst = 0;
	                    shifty += lineHeight;
	                } else {
	                    var prev = notfirst && font.glyphs[letters[i - 1]] || {},
	                        curr = font.glyphs[letters[i]];
	                    shift += notfirst ? (prev.w || font.w) + (prev.k && prev.k[letters[i]] || 0) + (font.w * letter_spacing) : 0;
	                    notfirst = 1;
	                }
	                if (curr && curr.d) {
	                    path += R.transformPath(curr.d, ["t", shift * scale, shifty * scale, "s", scale, scale, top, height, "t", (x - top) / scale, (y - height) / scale]);
	                }
	            }
	        }
	        return this.path(path).attr({
	            fill: "#000",
	            stroke: "none"
	        });
	    };


	    paperproto.add = function (json) {
	        if (R.is(json, "array")) {
	            var res = this.set(),
	                i = 0,
	                ii = json.length,
	                j;
	            for (; i < ii; i++) {
	                j = json[i] || {};
	                elements[has](j.type) && res.push(this[j.type]().attr(j));
	            }
	        }
	        return res;
	    };


	    R.format = function (token, params) {
	        var args = R.is(params, array) ? [0][concat](params) : arguments;
	        token && R.is(token, string) && args.length - 1 && (token = token.replace(formatrg, function (str, i) {
	            return args[++i] == null ? E : args[i];
	        }));
	        return token || E;
	    };

	    R.fullfill = (function () {
	        var tokenRegex = /\{([^\}]+)\}/g,
	            objNotationRegex = /(?:(?:^|\.)(.+?)(?=\[|\.|$|\()|\[('|")(.+?)\2\])(\(\))?/g,
	            // matches .xxxxx or ["xxxxx"] to run over object properties
	            replacer = function (all, key, obj) {
	                var res = obj;
	                key.replace(objNotationRegex, function (all, name, quote, quotedName, isFunc) {
	                    name = name || quotedName;
	                    if (res) {
	                        if (name in res) {
	                            res = res[name];
	                        }
	                        typeof res == "function" && isFunc && (res = res());
	                    }
	                });
	                res = (res == null || res == obj ? all : res) + "";
	                return res;
	            };
	        return function (str, obj) {
	            return String(str).replace(tokenRegex, function (all, key) {
	                return replacer(all, key, obj);
	            });
	        };
	    })();

	    R.ninja = function () {
	        oldRaphael.was ? (g.win.Raphael = oldRaphael.is) : delete Raphael;
	        return R;
	    };

	    R.st = setproto;
	    // Firefox <3.6 fix: http://webreflection.blogspot.com/2009/11/195-chars-to-help-lazy-loading.html
	    (function (doc, loaded, f) {
	        if (doc.readyState == null && doc.addEventListener) {
	            doc.addEventListener(loaded, f = function () {
	                doc.removeEventListener(loaded, f, false);
	                doc.readyState = "complete";
	            }, false);
	            doc.readyState = "loading";
	        }

	        function isLoaded() {
	            (/in/).test(doc.readyState) ? setTimeout(isLoaded, 9) : R.eve("raphael.DOMload");
	        }
	        isLoaded();
	    })(document, "DOMContentLoaded");

	    oldRaphael.was ? (g.win.Raphael = R) : (Raphael = R);

	    eve.on("raphael.DOMload", function () {
	        loaded = true;
	    });
	})();


	// ┌─────────────────────────────────────────────────────────────────────┐ \\
	// │ Raphaël - JavaScript Vector Library                                 │ \\
	// ├─────────────────────────────────────────────────────────────────────┤ \\
	// │ SVG Module                                                          │ \\
	// ├─────────────────────────────────────────────────────────────────────┤ \\
	// │ Copyright (c) 2008-2011 Dmitry Baranovskiy (http://raphaeljs.com)   │ \\
	// │ Copyright (c) 2008-2011 Sencha Labs (http://sencha.com)             │ \\
	// │ Licensed under the MIT (http://raphaeljs.com/license.html) license. │ \\
	// └─────────────────────────────────────────────────────────────────────┘ \\
	window.Raphael.svg &&
	    function (R) {
	        var has = "hasOwnProperty",
	            Str = String,
	            toFloat = parseFloat,
	            toInt = parseInt,
	            math = Math,
	            mmax = math.max,
	            abs = math.abs,
	            pow = math.pow,
	            separator = /[, ]+/,
	            eve = R.eve,
	            E = "",
	            S = " ";
	        var xlink = "http://www.w3.org/1999/xlink",
	            markers = {
	                block: "M5,0 0,2.5 5,5z",
	                classic: "M5,0 0,2.5 5,5 3.5,3 3.5,2z",
	                diamond: "M2.5,0 5,2.5 2.5,5 0,2.5z",
	                open: "M6,1 1,3.5 6,6",
	                oval: "M2.5,0A2.5,2.5,0,0,1,2.5,5 2.5,2.5,0,0,1,2.5,0z"
	            },
	            markerCounter = {};
	        R.toString = function () {
	            return "Your browser supports SVG.\nYou are running Rapha\xebl " + this.version;
	        };
	        var $ = function (el, attr) {
	            if (attr) {
	                if (typeof el == "string") {
	                    el = $(el);
	                }
	                for (var key in attr)
	                    if (attr[has](key)) {
	                        if (key.substring(0, 6) == "xlink:") {
	                            el.setAttributeNS(xlink, key.substring(6), Str(attr[key]));
	                        } else {
	                            el.setAttribute(key, Str(attr[key]));
	                        }
	                    }
	            } else {
	                el = R._g.doc.createElementNS("http://www.w3.org/2000/svg", el);
	                el.style && (el.style.webkitTapHighlightColor = "rgba(0,0,0,0)");
	            }
	            return el;
	        },
	            addGradientFill = function (element, gradient) {
	                var type = "linear",
	                    id = element.id + gradient,
	                    fx = .5,
	                    fy = .5,
	                    o = element.node,
	                    SVG = element.paper,
	                    s = o.style,
	                    el = R._g.doc.getElementById(id);
	                if (!el) {
	                    gradient = Str(gradient).replace(R._radial_gradient, function (all, _fx, _fy) {
	                        type = "radial";
	                        if (_fx && _fy) {
	                            fx = toFloat(_fx);
	                            fy = toFloat(_fy);
	                            var dir = ((fy > .5) * 2 - 1);
	                            pow(fx - .5, 2) + pow(fy - .5, 2) > .25 && (fy = math.sqrt(.25 - pow(fx - .5, 2)) * dir + .5) && fy != .5 && (fy = fy.toFixed(5) - 1e-5 * dir);
	                        }
	                        return E;
	                    });
	                    gradient = gradient.split(/\s*\-\s*/);
	                    if (type == "linear") {
	                        var angle = gradient.shift();
	                        angle = -toFloat(angle);
	                        if (isNaN(angle)) {
	                            return null;
	                        }
	                        var vector = [0, 0, math.cos(R.rad(angle)), math.sin(R.rad(angle))],
	                            max = 1 / (mmax(abs(vector[2]), abs(vector[3])) || 1);
	                        vector[2] *= max;
	                        vector[3] *= max;
	                        if (vector[2] < 0) {
	                            vector[0] = -vector[2];
	                            vector[2] = 0;
	                        }
	                        if (vector[3] < 0) {
	                            vector[1] = -vector[3];
	                            vector[3] = 0;
	                        }
	                    }
	                    var dots = R._parseDots(gradient);
	                    if (!dots) {
	                        return null;
	                    }
	                    id = id.replace(/[\(\)\s,\xb0#]/g, "_");

	                    if (element.gradient && id != element.gradient.id) {
	                        SVG.defs.removeChild(element.gradient);
	                        delete element.gradient;
	                    }

	                    if (!element.gradient) {
	                        el = $(type + "Gradient", {
	                            id: id
	                        });
	                        element.gradient = el;
	                        $(el, type == "radial" ? {
	                            fx: fx,
	                            fy: fy
	                        } : {
	                            x1: vector[0],
	                            y1: vector[1],
	                            x2: vector[2],
	                            y2: vector[3],
	                            gradientTransform: element.matrix.invert()
	                        });
	                        SVG.defs.appendChild(el);
	                        for (var i = 0, ii = dots.length; i < ii; i++) {
	                            el.appendChild($("stop", {
	                                offset: dots[i].offset ? dots[i].offset : i ? "100%" : "0%",
	                                "stop-color": dots[i].color || "#fff"
	                            }));
	                        }
	                    }
	                }
	                $(o, {
	                    fill: "url(#" + id + ")",
	                    opacity: 1,
	                    "fill-opacity": 1
	                });
	                s.fill = E;
	                s.opacity = 1;
	                s.fillOpacity = 1;
	                return 1;
	            },
	            updatePosition = function (o) {
	                var bbox = o.getBBox(1);
	                $(o.pattern, {
	                    patternTransform: o.matrix.invert() + " translate(" + bbox.x + "," + bbox.y + ")"
	                });
	            },
	            addArrow = function (o, value, isEnd) {
	                if (o.type == "path") {
	                    var values = Str(value).toLowerCase().split("-"),
	                        p = o.paper,
	                        se = isEnd ? "end" : "start",
	                        node = o.node,
	                        attrs = o.attrs,
	                        stroke = attrs["stroke-width"],
	                        i = values.length,
	                        type = "classic",
	                        from, to, dx, refX, attr, w = 3,
	                        h = 3,
	                        t = 5;
	                    while (i--) {
	                        switch (values[i]) {
	                            case "block":
	                            case "classic":
	                            case "oval":
	                            case "diamond":
	                            case "open":
	                            case "none":
	                                type = values[i];
	                                break;
	                            case "wide":
	                                h = 5;
	                                break;
	                            case "narrow":
	                                h = 2;
	                                break;
	                            case "long":
	                                w = 5;
	                                break;
	                            case "short":
	                                w = 2;
	                                break;
	                        }
	                    }
	                    if (type == "open") {
	                        w += 2;
	                        h += 2;
	                        t += 2;
	                        dx = 1;
	                        refX = isEnd ? 4 : 1;
	                        attr = {
	                            fill: "none",
	                            stroke: attrs.stroke
	                        };
	                    } else {
	                        refX = dx = w / 2;
	                        attr = {
	                            fill: attrs.stroke,
	                            stroke: "none"
	                        };
	                    }
	                    if (o._.arrows) {
	                        if (isEnd) {
	                            o._.arrows.endPath && markerCounter[o._.arrows.endPath]--;
	                            o._.arrows.endMarker && markerCounter[o._.arrows.endMarker]--;
	                        } else {
	                            o._.arrows.startPath && markerCounter[o._.arrows.startPath]--;
	                            o._.arrows.startMarker && markerCounter[o._.arrows.startMarker]--;
	                        }
	                    } else {
	                        o._.arrows = {};
	                    }
	                    if (type != "none") {
	                        var pathId = "raphael-marker-" + type,
	                            markerId = "raphael-marker-" + se + type + w + h;
	                        if (!R._g.doc.getElementById(pathId)) {
	                            p.defs.appendChild($($("path"), {
	                                "stroke-linecap": "round",
	                                d: markers[type],
	                                id: pathId
	                            }));
	                            markerCounter[pathId] = 1;
	                        } else {
	                            markerCounter[pathId]++;
	                        }
	                        var marker = R._g.doc.getElementById(markerId),
	                            use;
	                        if (!marker) {
	                            marker = $($("marker"), {
	                                id: markerId,
	                                markerHeight: h,
	                                markerWidth: w,
	                                orient: "auto",
	                                refX: refX,
	                                refY: h / 2
	                            });
	                            use = $($("use"), {
	                                "xlink:href": "#" + pathId,
	                                transform: (isEnd ? "rotate(180 " + w / 2 + " " + h / 2 + ") " : E) + "scale(" + w / t + "," + h / t + ")",
	                                "stroke-width": (1 / ((w / t + h / t) / 2)).toFixed(4)
	                            });
	                            marker.appendChild(use);
	                            p.defs.appendChild(marker);
	                            markerCounter[markerId] = 1;
	                        } else {
	                            markerCounter[markerId]++;
	                            use = marker.getElementsByTagName("use")[0];
	                        }
	                        $(use, attr);
	                        var delta = dx * (type != "diamond" && type != "oval");
	                        if (isEnd) {
	                            from = o._.arrows.startdx * stroke || 0;
	                            to = R.getTotalLength(attrs.path) - delta * stroke;
	                        } else {
	                            from = delta * stroke;
	                            to = R.getTotalLength(attrs.path) - (o._.arrows.enddx * stroke || 0);
	                        }
	                        attr = {};
	                        attr["marker-" + se] = "url(#" + markerId + ")";
	                        if (to || from) {
	                            attr.d = Raphael.getSubpath(attrs.path, from, to);
	                        }
	                        $(node, attr);
	                        o._.arrows[se + "Path"] = pathId;
	                        o._.arrows[se + "Marker"] = markerId;
	                        o._.arrows[se + "dx"] = delta;
	                        o._.arrows[se + "Type"] = type;
	                        o._.arrows[se + "String"] = value;
	                    } else {
	                        if (isEnd) {
	                            from = o._.arrows.startdx * stroke || 0;
	                            to = R.getTotalLength(attrs.path) - from;
	                        } else {
	                            from = 0;
	                            to = R.getTotalLength(attrs.path) - (o._.arrows.enddx * stroke || 0);
	                        }
	                        o._.arrows[se + "Path"] && $(node, {
	                            d: Raphael.getSubpath(attrs.path, from, to)
	                        });
	                        delete o._.arrows[se + "Path"];
	                        delete o._.arrows[se + "Marker"];
	                        delete o._.arrows[se + "dx"];
	                        delete o._.arrows[se + "Type"];
	                        delete o._.arrows[se + "String"];
	                    }
	                    for (attr in markerCounter)
	                        if (markerCounter[has](attr) && !markerCounter[attr]) {
	                            var item = R._g.doc.getElementById(attr);
	                            item && item.parentNode.removeChild(item);
	                        }
	                }
	            },
	            dasharray = {
	                "": [0],
	                "none": [0],
	                "-": [3, 1],
	                ".": [1, 1],
	                "-.": [3, 1, 1, 1],
	                "-..": [3, 1, 1, 1, 1, 1],
	                ". ": [1, 3],
	                "- ": [4, 3],
	                "--": [8, 3],
	                "- .": [4, 3, 1, 3],
	                "--.": [8, 3, 1, 3],
	                "--..": [8, 3, 1, 3, 1, 3]
	            },
	            addDashes = function (o, value, params) {
	                value = dasharray[Str(value).toLowerCase()];
	                if (value) {
	                    var width = o.attrs["stroke-width"] || "1",
	                        butt = {
	                            round: width,
	                            square: width,
	                            butt: 0
	                        }[o.attrs["stroke-linecap"] || params["stroke-linecap"]] || 0,
	                        dashes = [],
	                        i = value.length;
	                    while (i--) {
	                        dashes[i] = value[i] * width + ((i % 2) ? 1 : -1) * butt;
	                    }
	                    $(o.node, {
	                        "stroke-dasharray": dashes.join(",")
	                    });
	                }
	            },
	            setFillAndStroke = function (o, params) {
	                var node = o.node,
	                    attrs = o.attrs,
	                    vis = node.style.visibility;
	                node.style.visibility = "hidden";
	                for (var att in params) {
	                    if (params[has](att)) {
	                        if (!R._availableAttrs[has](att)) {
	                            continue;
	                        }
	                        var value = params[att];
	                        attrs[att] = value;
	                        switch (att) {
	                            case "blur":
	                                o.blur(value);
	                                break;
	                            case "href":
	                            case "title":
	                            case "target":
	                                var pn = node.parentNode;
	                                if (pn.tagName.toLowerCase() != "a") {
	                                    var hl = $("a");
	                                    pn.insertBefore(hl, node);
	                                    hl.appendChild(node);
	                                    pn = hl;
	                                }
	                                if (att == "target") {
	                                    pn.setAttributeNS(xlink, "show", value == "blank" ? "new" : value);
	                                } else {
	                                    pn.setAttributeNS(xlink, att, value);
	                                }
	                                break;
	                            case "cursor":
	                                node.style.cursor = value;
	                                break;
	                            case "transform":
	                                o.transform(value);
	                                break;
	                            case "arrow-start":
	                                addArrow(o, value);
	                                break;
	                            case "arrow-end":
	                                addArrow(o, value, 1);
	                                break;
	                            case "clip-rect":
	                                var rect = Str(value).split(separator);
	                                if (rect.length == 4) {
	                                    o.clip && o.clip.parentNode.parentNode.removeChild(o.clip.parentNode);
	                                    var el = $("clipPath"),
	                                        rc = $("rect");
	                                    el.id = R.createUUID();
	                                    $(rc, {
	                                        x: rect[0],
	                                        y: rect[1],
	                                        width: rect[2],
	                                        height: rect[3]
	                                    });
	                                    el.appendChild(rc);
	                                    o.paper.defs.appendChild(el);
	                                    $(node, {
	                                        "clip-path": "url(#" + el.id + ")"
	                                    });
	                                    o.clip = rc;
	                                }
	                                if (!value) {
	                                    var path = node.getAttribute("clip-path");
	                                    if (path) {
	                                        var clip = R._g.doc.getElementById(path.replace(/(^url\(#|\)$)/g, E));
	                                        clip && clip.parentNode.removeChild(clip);
	                                        $(node, {
	                                            "clip-path": E
	                                        });
	                                        delete o.clip;
	                                    }
	                                }
	                                break;
	                            case "path":
	                                if (o.type == "path") {
	                                    $(node, {
	                                        d: value ? attrs.path = R._pathToAbsolute(value) : "M0,0"
	                                    });
	                                    o._.dirty = 1;
	                                    if (o._.arrows) {
	                                        "startString" in o._.arrows && addArrow(o, o._.arrows.startString);
	                                        "endString" in o._.arrows && addArrow(o, o._.arrows.endString, 1);
	                                    }
	                                }
	                                break;
	                            case "width":
	                                node.setAttribute(att, value);
	                                o._.dirty = 1;
	                                if (attrs.fx) {
	                                    att = "x";
	                                    value = attrs.x;
	                                } else {
	                                    break;
	                                }
	                            case "x":
	                                if (attrs.fx) {
	                                    value = -attrs.x - (attrs.width || 0);
	                                }
	                            case "rx":
	                                if (att == "rx" && o.type == "rect") {
	                                    break;
	                                }
	                            case "cx":
	                                node.setAttribute(att, value);
	                                o.pattern && updatePosition(o);
	                                o._.dirty = 1;
	                                break;
	                            case "height":
	                                node.setAttribute(att, value);
	                                o._.dirty = 1;
	                                if (attrs.fy) {
	                                    att = "y";
	                                    value = attrs.y;
	                                } else {
	                                    break;
	                                }
	                            case "y":
	                                if (attrs.fy) {
	                                    value = -attrs.y - (attrs.height || 0);
	                                }
	                            case "ry":
	                                if (att == "ry" && o.type == "rect") {
	                                    break;
	                                }
	                            case "cy":
	                                node.setAttribute(att, value);
	                                o.pattern && updatePosition(o);
	                                o._.dirty = 1;
	                                break;
	                            case "r":
	                                if (o.type == "rect") {
	                                    $(node, {
	                                        rx: value,
	                                        ry: value
	                                    });
	                                } else {
	                                    node.setAttribute(att, value);
	                                }
	                                o._.dirty = 1;
	                                break;
	                            case "src":
	                                if (o.type == "image") {
	                                    node.setAttributeNS(xlink, "href", value);
	                                }
	                                break;
	                            case "stroke-width":
	                                if (o._.sx != 1 || o._.sy != 1) {
	                                    value /= mmax(abs(o._.sx), abs(o._.sy)) || 1;
	                                }
	                                if (o.paper._vbSize) {
	                                    value *= o.paper._vbSize;
	                                }
	                                node.setAttribute(att, value);
	                                if (attrs["stroke-dasharray"]) {
	                                    addDashes(o, attrs["stroke-dasharray"], params);
	                                }
	                                if (o._.arrows) {
	                                    "startString" in o._.arrows && addArrow(o, o._.arrows.startString);
	                                    "endString" in o._.arrows && addArrow(o, o._.arrows.endString, 1);
	                                }
	                                break;
	                            case "stroke-dasharray":
	                                addDashes(o, value, params);
	                                break;
	                            case "fill":
	                                var isURL = Str(value).match(R._ISURL);
	                                if (isURL) {
	                                    el = $("pattern");
	                                    var ig = $("image");
	                                    el.id = R.createUUID();
	                                    $(el, {
	                                        x: 0,
	                                        y: 0,
	                                        patternUnits: "userSpaceOnUse",
	                                        height: 1,
	                                        width: 1
	                                    });
	                                    $(ig, {
	                                        x: 0,
	                                        y: 0,
	                                        "xlink:href": isURL[1]
	                                    });
	                                    el.appendChild(ig);

	                                    (function (el) {
	                                        R._preload(isURL[1], function () {
	                                            var w = this.offsetWidth,
	                                                h = this.offsetHeight;
	                                            $(el, {
	                                                width: w,
	                                                height: h
	                                            });
	                                            $(ig, {
	                                                width: w,
	                                                height: h
	                                            });
	                                            o.paper.safari();
	                                        });
	                                    })(el);
	                                    o.paper.defs.appendChild(el);
	                                    $(node, {
	                                        fill: "url(#" + el.id + ")"
	                                    });
	                                    o.pattern = el;
	                                    o.pattern && updatePosition(o);
	                                    break;
	                                }
	                                var clr = R.getRGB(value);
	                                if (!clr.error) {
	                                    delete params.gradient;
	                                    delete attrs.gradient;
	                                    !R.is(attrs.opacity, "undefined") && R.is(params.opacity, "undefined") && $(node, {
	                                        opacity: attrs.opacity
	                                    });
	                                    !R.is(attrs["fill-opacity"], "undefined") && R.is(params["fill-opacity"], "undefined") && $(node, {
	                                        "fill-opacity": attrs["fill-opacity"]
	                                    });
	                                } else if ((o.type == "circle" || o.type == "ellipse" || Str(value).charAt() != "r") && addGradientFill(o, value)) {
	                                    if ("opacity" in attrs || "fill-opacity" in attrs) {
	                                        var gradient = R._g.doc.getElementById(node.getAttribute("fill").replace(/^url\(#|\)$/g, E));
	                                        if (gradient) {
	                                            var stops = gradient.getElementsByTagName("stop");
	                                            $(stops[stops.length - 1], {
	                                                "stop-opacity": ("opacity" in attrs ? attrs.opacity : 1) * ("fill-opacity" in attrs ? attrs["fill-opacity"] : 1)
	                                            });
	                                        }
	                                    }
	                                    attrs.gradient = value;
	                                    attrs.fill = "none";
	                                    break;
	                                }
	                                clr[has]("opacity") && $(node, {
	                                    "fill-opacity": clr.opacity > 1 ? clr.opacity / 100 : clr.opacity
	                                });
	                            case "stroke":
	                                clr = R.getRGB(value);
	                                node.setAttribute(att, clr.hex);
	                                att == "stroke" && clr[has]("opacity") && $(node, {
	                                    "stroke-opacity": clr.opacity > 1 ? clr.opacity / 100 : clr.opacity
	                                });
	                                if (att == "stroke" && o._.arrows) {
	                                    "startString" in o._.arrows && addArrow(o, o._.arrows.startString);
	                                    "endString" in o._.arrows && addArrow(o, o._.arrows.endString, 1);
	                                }
	                                break;
	                            case "gradient":
	                                (o.type == "circle" || o.type == "ellipse" || Str(value).charAt() != "r") && addGradientFill(o, value);
	                                break;
	                            case "opacity":
	                                if (attrs.gradient && !attrs[has]("stroke-opacity")) {
	                                    $(node, {
	                                        "stroke-opacity": value > 1 ? value / 100 : value
	                                    });
	                                }
	                                // fall
	                            case "fill-opacity":
	                                if (attrs.gradient) {
	                                    gradient = R._g.doc.getElementById(node.getAttribute("fill").replace(/^url\(#|\)$/g, E));
	                                    if (gradient) {
	                                        stops = gradient.getElementsByTagName("stop");
	                                        $(stops[stops.length - 1], {
	                                            "stop-opacity": value
	                                        });
	                                    }
	                                    break;
	                                }
	                            default:
	                                att == "font-size" && (value = toInt(value, 10) + "px");
	                                var cssrule = att.replace(/(\-.)/g, function (w) {
	                                    return w.substring(1).toUpperCase();
	                                });
	                                node.style[cssrule] = value;
	                                o._.dirty = 1;
	                                node.setAttribute(att, value);
	                                break;
	                        }
	                    }
	                }

	                tuneText(o, params);
	                node.style.visibility = vis;
	            },
	            leading = 1.2,
	            tuneText = function (el, params) {
	                if (el.type != "text" || !(params[has]("text") || params[has]("font") || params[has]("font-size") || params[has]("x") || params[has]("y"))) {
	                    return;
	                }
	                var a = el.attrs,
	                    node = el.node,
	                    fontSize = node.firstChild ? toInt(R._g.doc.defaultView.getComputedStyle(node.firstChild, E).getPropertyValue("font-size"), 10) : 10;

	                if (params[has]("text")) {
	                    a.text = params.text;
	                    while (node.firstChild) {
	                        node.removeChild(node.firstChild);
	                    }
	                    var texts = Str(params.text).split("\n"),
	                        tspans = [],
	                        tspan;
	                    for (var i = 0, ii = texts.length; i < ii; i++) {
	                        tspan = $("tspan");
	                        i && $(tspan, {
	                            dy: fontSize * leading,
	                            x: a.x
	                        });
	                        tspan.appendChild(R._g.doc.createTextNode(texts[i]));
	                        node.appendChild(tspan);
	                        tspans[i] = tspan;
	                    }
	                } else {
	                    tspans = node.getElementsByTagName("tspan");
	                    for (i = 0, ii = tspans.length; i < ii; i++)
	                        if (i) {
	                            $(tspans[i], {
	                                dy: fontSize * leading,
	                                x: a.x
	                            });
	                        } else {
	                            $(tspans[0], {
	                                dy: 0
	                            });
	                        }
	                }
	                $(node, {
	                    x: a.x,
	                    y: a.y
	                });
	                el._.dirty = 1;
	                var bb = el._getBBox(),
	                    dif = a.y - (bb.y + bb.height / 2);
	                dif && R.is(dif, "finite") && $(tspans[0], {
	                    dy: dif
	                });
	            },
	            Element = function (node, svg) {
	                var X = 0,
	                    Y = 0;

	                this[0] = this.node = node;

	                node.raphael = true;

	                this.id = R._oid++;
	                node.raphaelid = this.id;
	                this.matrix = R.matrix();
	                this.realPath = null;

	                this.paper = svg;
	                this.attrs = this.attrs || {};
	                this._ = {
	                    transform: [],
	                    sx: 1,
	                    sy: 1,
	                    deg: 0,
	                    dx: 0,
	                    dy: 0,
	                    dirty: 1
	                };
	                !svg.bottom && (svg.bottom = this);

	                this.prev = svg.top;
	                svg.top && (svg.top.next = this);
	                svg.top = this;

	                this.next = null;
	            },
	            elproto = R.el;

	        Element.prototype = elproto;
	        elproto.constructor = Element;

	        R._engine.path = function (pathString, SVG) {
	            var el = $("path");
	            SVG.canvas && SVG.canvas.appendChild(el);
	            var p = new Element(el, SVG);
	            p.type = "path";
	            setFillAndStroke(p, {
	                fill: "none",
	                stroke: "#000",
	                path: pathString
	            });
	            return p;
	        };

	        // [wumingdan] svg support group
	        R._engine.group = function (SVG) {
	            var el = $('g');
	            SVG.canvas && SVG.canvas.appendChild(el);
	            var g = new Element(el, SVG);
	            g.type = 'group';
	            g.children = SVG.set();
	            g.push = function (nodeEl) {
	                if (!nodeEl) {
	                    return;
	                }
	                g.children.push(nodeEl);
	                if (nodeEl.attrs && nodeEl.attrs.title) {
	                    el.appendChild(nodeEl[0].parentNode);
	                }
	                else {
	                    el.appendChild(nodeEl[0]);
	                }
	            };
	            g.remove = function () {
	                g.clear();
	                Element.prototype.remove.call(g);
	            };
	            // g.animate = function () {
	            //     setproto.animate.apply(g.children, Array.prototype.slice.call(arguments));
	            //     return g;
	            // };
	            g.clear = function () {
	                g.children.forEach(function (el) {
	                    el.remove();
	                });
	                return g;
	            };
	            return g;
	        };

	        elproto.rotate = function (deg, cx, cy) {
	            if (this.removed) {
	                return this;
	            }
	            deg = Str(deg).split(separator);
	            if (deg.length - 1) {
	                cx = toFloat(deg[1]);
	                cy = toFloat(deg[2]);
	            }
	            deg = toFloat(deg[0]);
	            (cy == null) && (cx = cy);
	            if (cx == null || cy == null) {
	                var bbox = this.getBBox(1);
	                cx = bbox.x + bbox.width / 2;
	                cy = bbox.y + bbox.height / 2;
	            }
	            this.transform(this._.transform.concat([
	                ["r", deg, cx, cy]
	            ]));
	            return this;
	        };

	        elproto.scale = function (sx, sy, cx, cy) {
	            if (this.removed) {
	                return this;
	            }
	            sx = Str(sx).split(separator);
	            if (sx.length - 1) {
	                sy = toFloat(sx[1]);
	                cx = toFloat(sx[2]);
	                cy = toFloat(sx[3]);
	            }
	            sx = toFloat(sx[0]);
	            (sy == null) && (sy = sx);
	            (cy == null) && (cx = cy);
	            if (cx == null || cy == null) {
	                var bbox = this.getBBox(1);
	            }
	            cx = cx == null ? bbox.x + bbox.width / 2 : cx;
	            cy = cy == null ? bbox.y + bbox.height / 2 : cy;
	            this.transform(this._.transform.concat([
	                ["s", sx, sy, cx, cy]
	            ]));
	            return this;
	        };

	        elproto.translate = function (dx, dy) {
	            if (this.removed) {
	                return this;
	            }
	            dx = Str(dx).split(separator);
	            if (dx.length - 1) {
	                dy = toFloat(dx[1]);
	            }
	            dx = toFloat(dx[0]) || 0;
	            dy = +dy || 0;
	            this.transform(this._.transform.concat([
	                ["t", dx, dy]
	            ]));
	            return this;
	        };

	        elproto.transform = function (tstr) {
	            var _ = this._;
	            if (tstr == null) {
	                return _.transform;
	            }
	            R._extractTransform(this, tstr);

	            this.clip && $(this.clip, {
	                transform: this.matrix.invert()
	            });
	            this.pattern && updatePosition(this);
	            this.node && $(this.node, {
	                transform: this.matrix
	            });

	            if (_.sx != 1 || _.sy != 1) {
	                var sw = this.attrs[has]("stroke-width") ? this.attrs["stroke-width"] : 1;
	                this.attr({
	                    "stroke-width": sw
	                });
	            }

	            return this;
	        };

	        elproto.hide = function () {
	            !this.removed && this.paper.safari(this.node.style.display = "none");
	            return this;
	        };

	        elproto.show = function () {
	            !this.removed && this.paper.safari(this.node.style.display = "");
	            return this;
	        };

	        elproto.remove = function () {
	            if (this.removed || !this.node.parentNode) {
	                return;
	            }
	            var paper = this.paper;
	            paper.__set__ && paper.__set__.exclude(this);
	            eve.unbind("raphael.*.*." + this.id);
	            if (this.gradient) {
	                paper.defs.removeChild(this.gradient);
	            }
	            R._tear(this, paper);
	            if (this.node.parentNode.tagName.toLowerCase() == "a") {
	                this.node.parentNode.parentNode.removeChild(this.node.parentNode);
	            } else {
	                this.node.parentNode.removeChild(this.node);
	            }
	            for (var i in this) {
	                this[i] = typeof this[i] == "function" ? R._removedFactory(i) : null;
	            }
	            this.removed = true;
	        };
	        elproto._getBBox = function () {
	            if (this.node.style.display == "none") {
	                this.show();
	                var hide = true;
	            }
	            var bbox = {};
	            try {
	                bbox = this.node.getBBox();
	            } catch (e) {
	                // Firefox 3.0.x plays badly here
	            } finally {
	                bbox = bbox || {};
	            }
	            hide && this.hide();
	            return bbox;
	        };

	        elproto.attr = function (name, value) {
	            if (this.removed) {
	                return this;
	            }
	            if (name == null) {
	                var res = {};
	                for (var a in this.attrs)
	                    if (this.attrs[has](a)) {
	                        res[a] = this.attrs[a];
	                    }
	                res.gradient && res.fill == "none" && (res.fill = res.gradient) && delete res.gradient;
	                res.transform = this._.transform;
	                return res;
	            }
	            if (value == null && R.is(name, "string")) {
	                // [2012/08/13 Mingdan] span半透明度tangram获取
	                if (this.nobr && name === "opacity") {
	                    return T.dom.getStyle(this.nobr, "opacity");
	                }

	                if (name == "fill" && this.attrs.fill == "none" && this.attrs.gradient) {
	                    return this.attrs.gradient;
	                }
	                if (name == "transform") {
	                    return this._.transform;
	                }
	                var names = name.split(separator),
	                    out = {};
	                for (var i = 0, ii = names.length; i < ii; i++) {
	                    name = names[i];
	                    if (name in this.attrs) {
	                        out[name] = this.attrs[name];
	                    } else if (R.is(this.paper.customAttributes[name], "function")) {
	                        out[name] = this.paper.customAttributes[name].def;
	                    } else {
	                        out[name] = R._availableAttrs[name];
	                    }
	                }
	                return ii - 1 ? out : out[names[0]];
	            }
	            if (value == null && R.is(name, "array")) {
	                out = {};
	                for (i = 0, ii = name.length; i < ii; i++) {
	                    out[name[i]] = this.attr(name[i]);
	                }
	                return out;
	            }
	            if (value != null) {
	                var params = {};
	                params[name] = value;
	            } else if (name != null && R.is(name, "object")) {
	                params = name;
	            }
	            for (var key in params) {
	                eve("raphael.attr." + key + "." + this.id, this, params[key]);
	            }
	            for (key in this.paper.customAttributes)
	                if (this.paper.customAttributes[has](key) && params[has](key) && R.is(this.paper.customAttributes[key], "function")) {
	                    var par = this.paper.customAttributes[key].apply(this, [].concat(params[key]));
	                    this.attrs[key] = params[key];
	                    for (var subkey in par)
	                        if (par[has](subkey)) {
	                            params[subkey] = par[subkey];
	                        }
	                }
	            setFillAndStroke(this, params);
	            return this;
	        };

	        elproto.toFront = function () {
	            if (this.removed) {
	                return this;
	            }
	            if (this.node.parentNode.tagName.toLowerCase() == "a") {
	                this.node.parentNode.parentNode.appendChild(this.node.parentNode);
	            } else {
	                this.node.parentNode.appendChild(this.node);
	            }
	            var svg = this.paper;
	            svg.top != this && R._tofront(this, svg);
	            return this;
	        };

	        elproto.toBack = function () {
	            if (this.removed) {
	                return this;
	            }
	            var parent = this.node.parentNode;
	            if (parent.tagName.toLowerCase() == "a") {
	                parent.parentNode.insertBefore(this.node.parentNode, this.node.parentNode.parentNode.firstChild);
	            } else if (parent.firstChild != this.node) {
	                parent.insertBefore(this.node, this.node.parentNode.firstChild);
	            }
	            R._toback(this, this.paper);
	            var svg = this.paper;
	            return this;
	        };

	        elproto.insertAfter = function (element) {
	            if (this.removed) {
	                return this;
	            }
	            var node = element.node || element[element.length - 1].node;
	            if (node.nextSibling) {
	                node.parentNode.insertBefore(this.node, node.nextSibling);
	            } else {
	                node.parentNode.appendChild(this.node);
	            }
	            R._insertafter(this, element, this.paper);
	            return this;
	        };

	        elproto.insertBefore = function (element) {
	            if (this.removed) {
	                return this;
	            }
	            var node = element.node || element[0].node;
	            node.parentNode.insertBefore(this.node, node);
	            R._insertbefore(this, element, this.paper);
	            return this;
	        };
	        elproto.blur = function (size) {
	            // Experimental. No Safari support. Use it on your own risk.
	            var t = this;
	            if (+size !== 0) {
	                var fltr = $("filter"),
	                    blur = $("feGaussianBlur");
	                t.attrs.blur = size;
	                fltr.id = R.createUUID();
	                $(blur, {
	                    stdDeviation: +size || 1.5
	                });
	                fltr.appendChild(blur);
	                t.paper.defs.appendChild(fltr);
	                t._blur = fltr;
	                $(t.node, {
	                    filter: "url(#" + fltr.id + ")"
	                });
	            } else {
	                if (t._blur) {
	                    t._blur.parentNode.removeChild(t._blur);
	                    delete t._blur;
	                    delete t.attrs.blur;
	                }
	                t.node.removeAttribute("filter");
	            }
	        };
	        R._engine.circle = function (svg, x, y, r) {
	            var el = $("circle");
	            svg.canvas && svg.canvas.appendChild(el);
	            var res = new Element(el, svg);
	            res.attrs = {
	                cx: x,
	                cy: y,
	                r: r,
	                fill: "none",
	                stroke: "#000"
	            };
	            res.type = "circle";
	            $(el, res.attrs);
	            return res;
	        };
	        R._engine.rect = function (svg, x, y, w, h, r) {
	            var el = $("rect");
	            svg.canvas && svg.canvas.appendChild(el);
	            var res = new Element(el, svg);
	            res.attrs = {
	                x: x,
	                y: y,
	                width: w,
	                height: h,
	                r: r || 0,
	                rx: r || 0,
	                ry: r || 0,
	                fill: "none",
	                stroke: "#000"
	            };
	            res.type = "rect";
	            $(el, res.attrs);
	            return res;
	        };
	        R._engine.ellipse = function (svg, x, y, rx, ry) {
	            var el = $("ellipse");
	            svg.canvas && svg.canvas.appendChild(el);
	            var res = new Element(el, svg);
	            res.attrs = {
	                cx: x,
	                cy: y,
	                rx: rx,
	                ry: ry,
	                fill: "none",
	                stroke: "#000"
	            };
	            res.type = "ellipse";
	            $(el, res.attrs);
	            return res;
	        };
	        R._engine.image = function (svg, src, x, y, w, h) {
	            var el = $("image");
	            $(el, {
	                x: x,
	                y: y,
	                width: w,
	                height: h,
	                preserveAspectRatio: "none"
	            });
	            el.setAttributeNS(xlink, "href", src);
	            svg.canvas && svg.canvas.appendChild(el);
	            var res = new Element(el, svg);
	            res.attrs = {
	                x: x,
	                y: y,
	                width: w,
	                height: h,
	                src: src
	            };
	            res.type = "image";
	            return res;
	        };
	        R._engine.text = function (svg, x, y, text) {
	            var el = $("text");
	            svg.canvas && svg.canvas.appendChild(el);
	            var res = new Element(el, svg);
	            res.attrs = {
	                x: x,
	                y: y,
	                "text-anchor": "middle",
	                text: text,
	                font: R._availableAttrs.font,
	                stroke: "none",
	                fill: "#000"
	            };
	            res.type = "text";
	            setFillAndStroke(res, res.attrs);
	            return res;
	        };
	        R._engine.setSize = function (width, height) {
	            this.width = width || this.width;
	            this.height = height || this.height;
	            this.canvas.setAttribute("width", this.width);
	            this.canvas.setAttribute("height", this.height);
	            if (this._viewBox) {
	                this.setViewBox.apply(this, this._viewBox);
	            }
	            return this;
	        };
	        R._engine.create = function () {
	            var con = R._getContainer.apply(0, arguments),
	                container = con && con.container,
	                x = con.x,
	                y = con.y,
	                width = con.width,
	                height = con.height;
	            if (!container) {
	                throw new Error("SVG container not found.");
	            }
	            var cnvs = $("svg"),
	                css = "overflow:hidden;",
	                isFloating;
	            x = x || 0;
	            y = y || 0;
	            width = width || 512;
	            height = height || 342;
	            $(cnvs, {
	                height: height,
	                version: 1.1,
	                width: width,
	                xmlns: "http://www.w3.org/2000/svg"
	            });
	            if (container == 1) {
	                cnvs.style.cssText = css + "position:absolute;left:" + x + "px;top:" + y + "px";
	                R._g.doc.body.appendChild(cnvs);
	                isFloating = 1;
	            } else {
	                cnvs.style.cssText = css + "position:relative";
	                if (container.firstChild) {
	                    container.insertBefore(cnvs, container.firstChild);
	                } else {
	                    container.appendChild(cnvs);
	                }
	            }
	            container = new R._Paper;
	            container.width = width;
	            container.height = height;
	            container.canvas = cnvs;
	            container.clear();
	            container._left = container._top = 0;
	            isFloating && (container.renderfix = function () { });
	            container.renderfix();
	            return container;
	        };
	        R._engine.setViewBox = function (x, y, w, h, fit) {
	            eve("raphael.setViewBox", this, this._viewBox, [x, y, w, h, fit]);
	            var size = mmax(w / this.width, h / this.height),
	                top = this.top,
	                aspectRatio = fit ? "meet" : "xMinYMin",
	                vb, sw;
	            if (x == null) {
	                if (this._vbSize) {
	                    size = 1;
	                }
	                delete this._vbSize;
	                vb = "0 0 " + this.width + S + this.height;
	            } else {
	                this._vbSize = size;
	                vb = x + S + y + S + w + S + h;
	            }
	            $(this.canvas, {
	                viewBox: vb,
	                preserveAspectRatio: aspectRatio
	            });
	            while (size && top) {
	                sw = "stroke-width" in top.attrs ? top.attrs["stroke-width"] : 1;
	                top.attr({
	                    "stroke-width": sw
	                });
	                top._.dirty = 1;
	                top._.dirtyT = 1;
	                top = top.prev;
	            }
	            this._viewBox = [x, y, w, h, !!fit];
	            return this;
	        };

	        R.prototype.renderfix = function () {
	            var cnvs = this.canvas,
	                s = cnvs.style,
	                pos;
	            try {
	                pos = cnvs.getScreenCTM() || cnvs.createSVGMatrix();
	            } catch (e) {
	                pos = cnvs.createSVGMatrix();
	            }
	            var left = -pos.e % 1,
	                top = -pos.f % 1;
	            if (left || top) {
	                if (left) {
	                    this._left = (this._left + left) % 1;
	                    s.left = this._left + "px";
	                }
	                if (top) {
	                    this._top = (this._top + top) % 1;
	                    s.top = this._top + "px";
	                }
	            }
	        };

	        R.prototype.clear = function () {
	            R.eve("raphael.clear", this);
	            var c = this.canvas;
	            while (c.firstChild) {
	                c.removeChild(c.firstChild);
	            }
	            this.bottom = this.top = null;
	            (this.desc = $("desc")).appendChild(R._g.doc.createTextNode("Created with Rapha\xebl " + R.version));
	            c.appendChild(this.desc);
	            c.appendChild(this.defs = $("defs"));
	        };

	        R.prototype.remove = function () {
	            eve("raphael.remove", this);
	            this.canvas.parentNode && this.canvas.parentNode.removeChild(this.canvas);
	            for (var i in this) {
	                this[i] = typeof this[i] == "function" ? R._removedFactory(i) : null;
	            }
	        };
	        var setproto = R.st;
	        for (var method in elproto)
	            if (elproto[has](method) && !setproto[has](method)) {
	                setproto[method] = (function (methodname) {
	                    return function () {
	                        var arg = arguments;
	                        return this.forEach(function (el) {
	                            el[methodname].apply(el, arg);
	                        });
	                    };
	                })(method);
	            }
	    }(window.Raphael);

	// ┌─────────────────────────────────────────────────────────────────────┐ \\
	// │ Raphaël - JavaScript Vector Library                                 │ \\
	// ├─────────────────────────────────────────────────────────────────────┤ \\
	// │ VML Module                                                          │ \\
	// ├─────────────────────────────────────────────────────────────────────┤ \\
	// │ Copyright (c) 2008-2011 Dmitry Baranovskiy (http://raphaeljs.com)   │ \\
	// │ Copyright (c) 2008-2011 Sencha Labs (http://sencha.com)             │ \\
	// │ Licensed under the MIT (http://raphaeljs.com/license.html) license. │ \\
	// └─────────────────────────────────────────────────────────────────────┘ \\
	window.Raphael.vml &&
	    function (R) {
	        var has = "hasOwnProperty",
	            Str = String,
	            toFloat = parseFloat,
	            math = Math,
	            round = math.round,
	            mmax = math.max,
	            mmin = math.min,
	            abs = math.abs,
	            fillString = "fill",
	            separator = /[, ]+/,
	            eve = R.eve,
	            ms = " progid:DXImageTransform.Microsoft",
	            S = " ",
	            E = "",
	            map = {
	                M: "m",
	                L: "l",
	                C: "c",
	                Z: "x",
	                m: "t",
	                l: "r",
	                c: "v",
	                z: "x"
	            },
	            bites = /([clmz]),?([^clmz]*)/gi,
	            blurregexp = / progid:\S+Blur\([^\)]+\)/g,
	            val = /-?[^,\s-]+/g,
	            cssDot = "position:absolute;left:0;top:0;width:1px;height:1px",
	            zoom = 21600,
	            pathTypes = {
	                path: 1,
	                rect: 1,
	                image: 1
	            },
	            ovalTypes = {
	                circle: 1,
	                ellipse: 1
	            },
	            path2vml = function (path) {
	                var total = /[ahqstv]/ig,
	                    command = R._pathToAbsolute;
	                Str(path).match(total) && (command = R._path2curve);
	                total = /[clmz]/g;
	                if (command == R._pathToAbsolute && !Str(path).match(total)) {
	                    var res = Str(path).replace(bites, function (all, command, args) {
	                        var vals = [],
	                            isMove = command.toLowerCase() == "m",
	                            res = map[command];
	                        args.replace(val, function (value) {
	                            if (isMove && vals.length == 2) {
	                                res += vals + map[command == "m" ? "l" : "L"];
	                                vals = [];
	                            }
	                            vals.push(round(value * zoom));
	                        });
	                        return res + vals;
	                    });
	                    return res;
	                }
	                var pa = command(path),
	                    p, r;
	                res = [];
	                for (var i = 0, ii = pa.length; i < ii; i++) {
	                    p = pa[i];
	                    r = pa[i][0].toLowerCase();
	                    r == "z" && (r = "x");
	                    for (var j = 1, jj = p.length; j < jj; j++) {
	                        r += round(p[j] * zoom) + (j != jj - 1 ? "," : E);
	                    }
	                    res.push(r);
	                }
	                return res.join(S);
	            },
	            compensation = function (deg, dx, dy) {
	                var m = R.matrix();
	                m.rotate(-deg, .5, .5);
	                return {
	                    dx: m.x(dx, dy),
	                    dy: m.y(dx, dy)
	                };
	            },
	            setCoords = function (p, sx, sy, dx, dy, deg) {
	                var _ = p._,
	                    m = p.matrix,
	                    fillpos = _.fillpos,
	                    o = p.node,
	                    s = o.style,
	                    y = 1,
	                    flip = "",
	                    dxdy, kx = zoom / sx,
	                    ky = zoom / sy;
	                s.visibility = "hidden";
	                if (!sx || !sy) {
	                    return;
	                }
	                o.coordsize = abs(kx) + S + abs(ky);
	                s.rotation = deg * (sx * sy < 0 ? -1 : 1);
	                if (deg) {
	                    var c = compensation(deg, dx, dy);
	                    dx = c.dx;
	                    dy = c.dy;
	                }
	                sx < 0 && (flip += "x");
	                sy < 0 && (flip += " y") && (y = -1);
	                s.flip = flip;
	                o.coordorigin = (dx * -kx) + S + (dy * -ky);
	                if (fillpos || _.fillsize) {
	                    var fill = o.getElementsByTagName(fillString);
	                    fill = fill && fill[0];
	                    o.removeChild(fill);
	                    if (fillpos) {
	                        c = compensation(deg, m.x(fillpos[0], fillpos[1]), m.y(fillpos[0], fillpos[1]));
	                        fill.position = c.dx * y + S + c.dy * y;
	                    }
	                    if (_.fillsize) {
	                        fill.size = _.fillsize[0] * abs(sx) + S + _.fillsize[1] * abs(sy);
	                    }
	                    o.appendChild(fill);
	                }
	                s.visibility = "visible";
	            };
	        R.toString = function () {
	            return "Your browser doesn\u2019t support SVG. Falling down to VML.\nYou are running Rapha\xebl " + this.version;
	        };
	        var addArrow = function (o, value, isEnd) {
	            var values = Str(value).toLowerCase().split("-"),
	                se = isEnd ? "end" : "start",
	                i = values.length,
	                type = "classic",
	                w = "medium",
	                h = "medium";
	            while (i--) {
	                switch (values[i]) {
	                    case "block":
	                    case "classic":
	                    case "oval":
	                    case "diamond":
	                    case "open":
	                    case "none":
	                        type = values[i];
	                        break;
	                    case "wide":
	                    case "narrow":
	                        h = values[i];
	                        break;
	                    case "long":
	                    case "short":
	                        w = values[i];
	                        break;
	                }
	            }
	            var stroke = o.node.getElementsByTagName("stroke")[0];
	            stroke[se + "arrow"] = type;
	            stroke[se + "arrowlength"] = w;
	            stroke[se + "arrowwidth"] = h;
	        },
	            setFillAndStroke = function (o, params) {
	                // o.paper.canvas.style.display = "none";
	                o.attrs = o.attrs || {};
	                var node = o.node,
	                    a = o.attrs,
	                    s = node.style,
	                    xy, newpath = pathTypes[o.type] && (params.x != a.x || params.y != a.y || params.width != a.width || params.height != a.height || params.cx != a.cx || params.cy != a.cy || params.rx != a.rx || params.ry != a.ry || params.r != a.r),
	                    isOval = ovalTypes[o.type] && (a.cx != params.cx || a.cy != params.cy || a.r != params.r || a.rx != params.rx || a.ry != params.ry),
	                    res = o;


	                for (var par in params)
	                    if (params[has](par)) {
	                        a[par] = params[par];
	                    }
	                if (newpath) {
	                    a.path = R._getPath[o.type](o);
	                    o._.dirty = 1;
	                }
	                params.href && (node.href = params.href);
	                params.title && (node.title = params.title);
	                params.target && (node.target = params.target);
	                params.cursor && (s.cursor = params.cursor);
	                "blur" in params && o.blur(params.blur);
	                if (params.path && o.type == "path" || newpath) {
	                    node.path = path2vml(~Str(a.path).toLowerCase().indexOf("r") ? R._pathToAbsolute(a.path) : a.path);
	                    if (o.type == "image") {
	                        o._.fillpos = [a.x, a.y];
	                        o._.fillsize = [a.width, a.height];
	                        setCoords(o, 1, 1, 0, 0, 0);
	                    }
	                }
	                "transform" in params && o.transform(params.transform);
	                if (isOval) {
	                    var cx = +a.cx,
	                        cy = +a.cy,
	                        rx = +a.rx || +a.r || 0,
	                        ry = +a.ry || +a.r || 0;
	                    node.path = R.format("ar{0},{1},{2},{3},{4},{1},{4},{1}x", round((cx - rx) * zoom), round((cy - ry) * zoom), round((cx + rx) * zoom), round((cy + ry) * zoom), round(cx * zoom));
	                }
	                if ("clip-rect" in params) {
	                    var rect = Str(params["clip-rect"]).split(separator);
	                    if (rect.length == 4) {
	                        rect[2] = +rect[2] + (+rect[0]);
	                        rect[3] = +rect[3] + (+rect[1]);
	                        var div = node.clipRect || R._g.doc.createElement("div"),
	                            dstyle = div.style;
	                        dstyle.clip = R.format("rect({1}px {2}px {3}px {0}px)", rect);
	                        if (!node.clipRect) {
	                            dstyle.position = "absolute";
	                            dstyle.top = 0;
	                            dstyle.left = 0;
	                            dstyle.width = o.paper.width + "px";
	                            dstyle.height = o.paper.height + "px";
	                            node.parentNode.insertBefore(div, node);
	                            div.appendChild(node);
	                            node.clipRect = div;
	                        }
	                    }
	                    if (!params["clip-rect"]) {
	                        node.clipRect && (node.clipRect.style.clip = "auto");
	                    }
	                }
	                if (o.textpath) {
	                    var textpathStyle = o.textpath.style;
	                    params.font && (textpathStyle.font = params.font);
	                    params["font-family"] && (textpathStyle.fontFamily = '"' + params["font-family"].split(",")[0].replace(/^['"]+|['"]+$/g, E) + '"');
	                    params["font-size"] && (textpathStyle.fontSize = params["font-size"]);
	                    params["font-weight"] && (textpathStyle.fontWeight = params["font-weight"]);
	                    params["font-style"] && (textpathStyle.fontStyle = params["font-style"]);
	                }
	                if ("arrow-start" in params) {
	                    addArrow(res, params["arrow-start"]);
	                }
	                if ("arrow-end" in params) {
	                    addArrow(res, params["arrow-end"], 1);
	                }
	                if (params.opacity != null || params["stroke-width"] != null || params.fill != null || params.src != null || params.stroke != null || params["stroke-width"] != null || params["stroke-opacity"] != null || params["fill-opacity"] != null || params["stroke-dasharray"] != null || params["stroke-miterlimit"] != null || params["stroke-linejoin"] != null || params["stroke-linecap"] != null) {
	                    var fill = node.getElementsByTagName(fillString),
	                        newfill = false;
	                    fill = fill && fill[0];
	                    !fill && (newfill = fill = createNode(fillString));
	                    if (o.type == "image" && params.src) {
	                        fill.src = params.src;
	                    }
	                    params.fill && (fill.on = true);
	                    if (fill.on == null || params.fill == "none" || params.fill === null) {
	                        fill.on = false;
	                    }
	                    if (fill.on && params.fill) {
	                        var isURL = Str(params.fill).match(R._ISURL);
	                        if (isURL) {
	                            fill.parentNode == node && node.removeChild(fill);
	                            fill.rotate = true;
	                            fill.src = isURL[1];
	                            fill.type = "tile";
	                            var bbox = o.getBBox(1);
	                            fill.position = bbox.x + S + bbox.y;
	                            o._.fillpos = [bbox.x, bbox.y];

	                            R._preload(isURL[1], function () {
	                                o._.fillsize = [this.offsetWidth, this.offsetHeight];
	                            });
	                        } else {
	                            fill.color = R.getRGB(params.fill).hex;
	                            fill.src = E;
	                            fill.type = "solid";
	                            if (R.getRGB(params.fill).error && (res.type in {
	                                circle: 1,
	                                ellipse: 1
	                            } || Str(params.fill).charAt() != "r") && addGradientFill(res, params.fill, fill)) {
	                                a.fill = "none";
	                                a.gradient = params.fill;
	                                fill.rotate = false;
	                            }
	                        }
	                    }
	                    if ("fill-opacity" in params || "opacity" in params) {
	                        var opacity = ((+a["fill-opacity"] + 1 || 2) - 1) * ((+a.opacity + 1 || 2) - 1) * ((+R.getRGB(params.fill).o + 1 || 2) - 1);
	                        opacity = mmin(mmax(opacity, 0), 1);
	                        fill.opacity = opacity;
	                        if (fill.src) {
	                            fill.color = "none";
	                        }
	                    }
	                    node.appendChild(fill);
	                    var stroke = (node.getElementsByTagName("stroke") && node.getElementsByTagName("stroke")[0]),
	                        newstroke = false;
	                    !stroke && (newstroke = stroke = createNode("stroke"));
	                    if ((params.stroke && params.stroke != "none") || params["stroke-width"] || params["stroke-opacity"] != null || params["stroke-dasharray"] || params["stroke-miterlimit"] || params["stroke-linejoin"] || params["stroke-linecap"]) {
	                        stroke.on = true;
	                    } (params.stroke == "none" || params.stroke === null || stroke.on == null || params.stroke == 0 || params["stroke-width"] == 0) && (stroke.on = false);
	                    var strokeColor = R.getRGB(params.stroke);
	                    stroke.on && params.stroke && (stroke.color = strokeColor.hex);
	                    opacity = ((+a["stroke-opacity"] + 1 || 2) - 1) * ((+a.opacity + 1 || 2) - 1) * ((+strokeColor.o + 1 || 2) - 1);
	                    var width = (toFloat(params["stroke-width"]) || 1) * .75;
	                    opacity = mmin(mmax(opacity, 0), 1);
	                    params["stroke-width"] == null && (width = a["stroke-width"]);
	                    params["stroke-width"] && (stroke.weight = width);
	                    width && width < 1 && (opacity *= width) && (stroke.weight = 1);
	                    stroke.opacity = opacity;

	                    params["stroke-linejoin"] && (stroke.joinstyle = params["stroke-linejoin"] || "miter");
	                    stroke.miterlimit = params["stroke-miterlimit"] || 8;
	                    params["stroke-linecap"] && (stroke.endcap = params["stroke-linecap"] == "butt" ? "flat" : params["stroke-linecap"] == "square" ? "square" : "round");
	                    if (params["stroke-dasharray"]) {
	                        var dasharray = {
	                            "-": "shortdash",
	                            ".": "shortdot",
	                            "-.": "shortdashdot",
	                            "-..": "shortdashdotdot",
	                            ". ": "dot",
	                            "- ": "dash",
	                            "--": "longdash",
	                            "- .": "dashdot",
	                            "--.": "longdashdot",
	                            "--..": "longdashdotdot"
	                        };
	                        stroke.dashstyle = dasharray[has](params["stroke-dasharray"]) ? dasharray[params["stroke-dasharray"]] : E;
	                    }
	                    newstroke && node.appendChild(stroke);
	                }
	                if (res.type == "text") {
	                    res.paper.canvas.style.display = E;
	                    var span = res.paper.span,
	                        m = 100,
	                        fontSize = a.font && a.font.match(/\d+(?:\.\d*)?(?=px)/);
	                    s = span.style;
	                    a.font && (s.font = a.font);
	                    a["font-family"] && (s.fontFamily = a["font-family"]);
	                    a["font-weight"] && (s.fontWeight = a["font-weight"]);
	                    a["font-style"] && (s.fontStyle = a["font-style"]);
	                    fontSize = toFloat(a["font-size"] || fontSize && fontSize[0]) || 10;
	                    s.fontSize = fontSize * m + "px";
	                    res.textpath.string && (span.innerHTML = Str(res.textpath.string).replace(/</g, "&#60;").replace(/&/g, "&#38;").replace(/\n/g, "<br>"));
	                    var brect = span.getBoundingClientRect();
	                    res.W = a.w = (brect.right - brect.left) / m;
	                    res.H = a.h = (brect.bottom - brect.top) / m;
	                    // res.paper.canvas.style.display = "none";
	                    res.X = a.x;
	                    res.Y = a.y + res.H / 2;

	                    ("x" in params || "y" in params) && (res.path.v = R.format("m{0},{1}l{2},{1}", round(a.x * zoom), round(a.y * zoom), round(a.x * zoom) + 1));
	                    var dirtyattrs = ["x", "y", "text", "font", "font-family", "font-weight", "font-style", "font-size"];
	                    for (var d = 0, dd = dirtyattrs.length; d < dd; d++)
	                        if (dirtyattrs[d] in params) {
	                            res._.dirty = 1;
	                            break;
	                        }

	                    // text-anchor emulation
	                    switch (a["text-anchor"]) {
	                        case "start":
	                            res.textpath.style["v-text-align"] = "left";
	                            res.bbx = res.W / 2;
	                            break;
	                        case "end":
	                            res.textpath.style["v-text-align"] = "right";
	                            res.bbx = -res.W / 2;
	                            break;
	                        default:
	                            res.textpath.style["v-text-align"] = "center";
	                            res.bbx = 0;
	                            break;
	                    }
	                    res.textpath.style["v-text-kern"] = true;

	                    // [wumingdan] nobr
	                    var nobr = res.nobr;
	                    if (nobr) {
	                        nobr.innerHTML = res.textpath.string;
	                        var setStyle = function (ele, key, value) {
	                            ele.style[key] = value;
	                        };

	                        params['font-weight'] && (setStyle(nobr, 'font-weight', params['font-weight']));
	                        params['fill'] && (setStyle(nobr, "color", params['fill']));
	                        params['font-size'] && (setStyle(nobr, "font-size", params['font-size']));
	                        params['cursor'] && (setStyle(nobr, "cursor", params['cursor']));
	                        params['class'] && (setStyle(nobr, "class", params['class']));
	                        params['opacity'] && (setStyle(nobr, "opacity", params['opacity']));
	                    }
	                }
	                // res.paper.canvas.style.display = E;
	            },
	            addGradientFill = function (o, gradient, fill) {
	                o.attrs = o.attrs || {};
	                var attrs = o.attrs,
	                    pow = Math.pow,
	                    opacity, oindex, type = "linear",
	                    fxfy = ".5 .5";
	                o.attrs.gradient = gradient;
	                gradient = Str(gradient).replace(R._radial_gradient, function (all, fx, fy) {
	                    type = "radial";
	                    if (fx && fy) {
	                        fx = toFloat(fx);
	                        fy = toFloat(fy);
	                        pow(fx - .5, 2) + pow(fy - .5, 2) > .25 && (fy = math.sqrt(.25 - pow(fx - .5, 2)) * ((fy > .5) * 2 - 1) + .5);
	                        fxfy = fx + S + fy;
	                    }
	                    return E;
	                });
	                gradient = gradient.split(/\s*\-\s*/);
	                if (type == "linear") {
	                    var angle = gradient.shift();
	                    angle = -toFloat(angle);
	                    if (isNaN(angle)) {
	                        return null;
	                    }
	                }
	                var dots = R._parseDots(gradient);
	                if (!dots) {
	                    return null;
	                }
	                o = o.shape || o.node;
	                if (dots.length) {
	                    o.removeChild(fill);
	                    fill.on = true;
	                    fill.method = "none";
	                    fill.color = dots[0].color;
	                    fill.color2 = dots[dots.length - 1].color;
	                    var clrs = [];
	                    for (var i = 0, ii = dots.length; i < ii; i++) {
	                        dots[i].offset && clrs.push(dots[i].offset + S + dots[i].color);
	                    }
	                    fill.colors = clrs.length ? clrs.join() : "0% " + fill.color;
	                    if (type == "radial") {
	                        fill.type = "gradientTitle";
	                        fill.focus = "100%";
	                        fill.focussize = "0 0";
	                        fill.focusposition = fxfy;
	                        fill.angle = 0;
	                    } else {
	                        // fill.rotate= true;
	                        fill.type = "gradient";
	                        fill.angle = (270 - angle) % 360;
	                    }
	                    o.appendChild(fill);
	                }
	                return 1;
	            },
	            Element = function (node, vml) {
	                this[0] = this.node = node;
	                node.raphael = true;
	                this.id = R._oid++;
	                node.raphaelid = this.id;
	                this.X = 0;
	                this.Y = 0;
	                this.attrs = {};
	                this.paper = vml;
	                this.matrix = R.matrix();
	                this._ = {
	                    transform: [],
	                    sx: 1,
	                    sy: 1,
	                    dx: 0,
	                    dy: 0,
	                    deg: 0,
	                    dirty: 1,
	                    dirtyT: 1
	                };
	                !vml.bottom && (vml.bottom = this);
	                this.prev = vml.top;
	                vml.top && (vml.top.next = this);
	                vml.top = this;
	                this.next = null;
	            };
	        var elproto = R.el;

	        Element.prototype = elproto;
	        elproto.constructor = Element;
	        elproto.transform = function (tstr) {
	            if (tstr == null) {
	                return this._.transform;
	            }
	            var vbs = this.paper._viewBoxShift,
	                vbt = vbs ? "s" + [vbs.scale, vbs.scale] + "-1-1t" + [vbs.dx, vbs.dy] : E,
	                oldt;
	            if (vbs) {
	                oldt = tstr = Str(tstr).replace(/\.{3}|\u2026/g, this._.transform || E);
	            }
	            R._extractTransform(this, vbt + tstr);
	            var matrix = this.matrix.clone(),
	                skew = this.skew,
	                o = this.node,
	                split, isGrad = ~Str(this.attrs.fill).indexOf("-"),
	                isPatt = !Str(this.attrs.fill).indexOf("url(");
	            // matrix.translate(-.5, -.5);
	            // [wumingdan] see https://github.com/DmitryBaranovskiy/raphael/issues/653
	            matrix.translate(1, 1);
	            if (isPatt || isGrad || this.type == "image") {
	                skew.matrix = "1 0 0 1";
	                skew.offset = "0 0";
	                split = matrix.split();
	                if ((isGrad && split.noRotation) || !split.isSimple) {
	                    o.style.filter = matrix.toFilter();
	                    var bb = this.getBBox(),
	                        bbt = this.getBBox(1),
	                        dx = bb.x - bbt.x,
	                        dy = bb.y - bbt.y;
	                    o.coordorigin = (dx * -zoom) + S + (dy * -zoom);
	                    setCoords(this, 1, 1, dx, dy, 0);
	                } else {
	                    o.style.filter = E;
	                    setCoords(this, split.scalex, split.scaley, split.dx, split.dy, split.rotate);
	                }
	            } else {
	                o.style.filter = E;
	                skew.matrix = Str(matrix);
	                skew.offset = matrix.offset();
	            }
	            oldt && (this._.transform = oldt);
	            return this;
	        };
	        elproto.rotate = function (deg, cx, cy) {
	            if (this.removed) {
	                return this;
	            }
	            if (deg == null) {
	                return;
	            }
	            deg = Str(deg).split(separator);
	            if (deg.length - 1) {
	                cx = toFloat(deg[1]);
	                cy = toFloat(deg[2]);
	            }
	            deg = toFloat(deg[0]);
	            (cy == null) && (cx = cy);
	            if (cx == null || cy == null) {
	                var bbox = this.getBBox(1);
	                cx = bbox.x + bbox.width / 2;
	                cy = bbox.y + bbox.height / 2;
	            }
	            this._.dirtyT = 1;
	            this.transform(this._.transform.concat([
	                ["r", deg, cx, cy]
	            ]));
	            return this;
	        };
	        elproto.translate = function (dx, dy) {
	            if (this.removed) {
	                return this;
	            }
	            dx = Str(dx).split(separator);
	            if (dx.length - 1) {
	                dy = toFloat(dx[1]);
	            }
	            dx = toFloat(dx[0]) || 0;
	            dy = +dy || 0;
	            if (this._.bbox) {
	                this._.bbox.x += dx;
	                this._.bbox.y += dy;
	            }
	            this.transform(this._.transform.concat([
	                ["t", dx, dy]
	            ]));
	            return this;
	        };
	        elproto.scale = function (sx, sy, cx, cy) {
	            if (this.removed) {
	                return this;
	            }
	            sx = Str(sx).split(separator);
	            if (sx.length - 1) {
	                sy = toFloat(sx[1]);
	                cx = toFloat(sx[2]);
	                cy = toFloat(sx[3]);
	                isNaN(cx) && (cx = null);
	                isNaN(cy) && (cy = null);
	            }
	            sx = toFloat(sx[0]);
	            (sy == null) && (sy = sx);
	            (cy == null) && (cx = cy);
	            if (cx == null || cy == null) {
	                var bbox = this.getBBox(1);
	            }
	            cx = cx == null ? bbox.x + bbox.width / 2 : cx;
	            cy = cy == null ? bbox.y + bbox.height / 2 : cy;

	            this.transform(this._.transform.concat([
	                ["s", sx, sy, cx, cy]
	            ]));
	            this._.dirtyT = 1;
	            return this;
	        };
	        elproto.hide = function () {
	            !this.removed && (this.node.style.display = "none");
	            return this;
	        };
	        elproto.show = function () {
	            !this.removed && (this.node.style.display = E);
	            return this;
	        };
	        elproto._getBBox = function () {
	            if (this.removed) {
	                return {};
	            }
	            return {
	                x: this.X + (this.bbx || 0) - this.W / 2,
	                y: this.Y - this.H,
	                width: this.W,
	                height: this.H
	            };
	        };
	        elproto.remove = function () {
	            if (this.removed || !this.node.parentNode) {
	                return;
	            }
	            this.paper.__set__ && this.paper.__set__.exclude(this);
	            R.eve.unbind("raphael.*.*." + this.id);
	            R._tear(this, this.paper);
	            this.node.parentNode.removeChild(this.node);
	            this.shape && this.shape.parentNode.removeChild(this.shape);
	            for (var i in this) {
	                this[i] = typeof this[i] == "function" ? R._removedFactory(i) : null;
	            }
	            this.removed = true;
	        };
	        elproto.attr = function (name, value) {
	            if (this.removed) {
	                return this;
	            }
	            if (name == null) {
	                var res = {};
	                for (var a in this.attrs)
	                    if (this.attrs[has](a)) {
	                        res[a] = this.attrs[a];
	                    }
	                res.gradient && res.fill == "none" && (res.fill = res.gradient) && delete res.gradient;
	                res.transform = this._.transform;
	                return res;
	            }
	            if (value == null && R.is(name, "string")) {
	                if (name == fillString && this.attrs.fill == "none" && this.attrs.gradient) {
	                    return this.attrs.gradient;
	                }
	                var names = name.split(separator),
	                    out = {};
	                for (var i = 0, ii = names.length; i < ii; i++) {
	                    name = names[i];
	                    if (name in this.attrs) {
	                        out[name] = this.attrs[name];
	                    } else if (R.is(this.paper.customAttributes[name], "function")) {
	                        out[name] = this.paper.customAttributes[name].def;
	                    } else {
	                        out[name] = R._availableAttrs[name];
	                    }
	                }
	                return ii - 1 ? out : out[names[0]];
	            }
	            if (this.attrs && value == null && R.is(name, "array")) {
	                out = {};
	                for (i = 0, ii = name.length; i < ii; i++) {
	                    out[name[i]] = this.attr(name[i]);
	                }
	                return out;
	            }
	            var params;
	            if (value != null) {
	                params = {};
	                params[name] = value;
	            }
	            value == null && R.is(name, "object") && (params = name);
	            for (var key in params) {
	                eve("raphael.attr." + key + "." + this.id, this, params[key]);
	            }
	            if (params) {
	                for (key in this.paper.customAttributes)
	                    if (this.paper.customAttributes[has](key) && params[has](key) && R.is(this.paper.customAttributes[key], "function")) {
	                        var par = this.paper.customAttributes[key].apply(this, [].concat(params[key]));
	                        this.attrs[key] = params[key];
	                        for (var subkey in par)
	                            if (par[has](subkey)) {
	                                params[subkey] = par[subkey];
	                            }
	                    }
	                // this.paper.canvas.style.display = "none";
	                if (params.text && this.type == "text") {
	                    this.textpath.string = params.text;
	                }
	                setFillAndStroke(this, params);
	                // this.paper.canvas.style.display = E;
	            }
	            return this;
	        };
	        elproto.toFront = function () {
	            !this.removed && this.node.parentNode.appendChild(this.node);
	            this.paper && this.paper.top != this && R._tofront(this, this.paper);
	            return this;
	        };
	        elproto.toBack = function () {
	            if (this.removed) {
	                return this;
	            }
	            if (this.node.parentNode.firstChild != this.node) {
	                this.node.parentNode.insertBefore(this.node, this.node.parentNode.firstChild);
	                R._toback(this, this.paper);
	            }
	            return this;
	        };
	        elproto.insertAfter = function (element) {
	            if (this.removed) {
	                return this;
	            }
	            if (element.constructor == R.st.constructor) {
	                element = element[element.length - 1];
	            }
	            if (element.node.nextSibling) {
	                element.node.parentNode.insertBefore(this.node, element.node.nextSibling);
	            } else {
	                element.node.parentNode.appendChild(this.node);
	            }
	            R._insertafter(this, element, this.paper);
	            return this;
	        };
	        elproto.insertBefore = function (element) {
	            if (this.removed) {
	                return this;
	            }
	            if (element.constructor == R.st.constructor) {
	                element = element[0];
	            }
	            element.node.parentNode.insertBefore(this.node, element.node);
	            R._insertbefore(this, element, this.paper);
	            return this;
	        };
	        elproto.blur = function (size) {
	            var s = this.node.runtimeStyle,
	                f = s.filter;
	            f = f.replace(blurregexp, E);
	            if (+size !== 0) {
	                this.attrs.blur = size;
	                s.filter = f + S + ms + ".Blur(pixelradius=" + (+size || 1.5) + ")";
	                s.margin = R.format("-{0}px 0 0 -{0}px", round(+size || 1.5));
	            } else {
	                s.filter = f;
	                s.margin = 0;
	                delete this.attrs.blur;
	            }
	        };

	        // [wumingdan] group for vml
	        R._engine.group = function (vml) {
	            var el = document.createElement('div');
	            el.style.cssText = cssDot;
	            el.coordsize = zoom + S + zoom;
	            el.coordorigin = vml.coordorigin;
	            var g = new Element(el, vml);
	            g.type = "group";
	            vml.canvas.appendChild(el);
	            g.children = vml.set();
	            g.push = function (nodeEl) {
	                if (!nodeEl) {
	                    return;
	                }
	                if (window.VMLElement && nodeEl instanceof VMLElement) {
	                    if (!nodeEl[0] && nodeEl.group) {
	                        nodeEl[0] = nodeEl.group[0].children[nodeEl.zIndex];
	                    }
	                    if (!nodeEl[0]) {
	                        el.innerHTML += nodeEl.getEl();
	                        nodeEl[0] = el.children[el.children.length - 1];
	                    }
	                    else {
	                        el.appendChild(nodeEl[0]);
	                    }
	                    var node = nodeEl.node = new Element(nodeEl[0], vml);
	                    node.attrs = nodeEl.attrs;
	                    node.type = nodeEl.type;
	                    var array = ['skew', 'fill', 'stroke', 'textpath', 'path'];
	                    for (var i = 0; i < array.length; i++) {
	                        var key = array[i];
	                        node[key] = nodeEl[0].getElementsByTagName(key)[0];
	                    }
	                    g.children.push(nodeEl.node);
	                }
	                else {
	                    g.children.push(nodeEl);
	                    el.appendChild(nodeEl[0]);
	                }
	            };
	            g.transform = function (tstr) {
	                var data = R.parseTransformString(tstr);
	                while (data.length > 0) {
	                    tstr = data[0];
	                    if (tstr[0] == 't') {
	                        el.style.left = Math.round(tstr[1]) + 'px';
	                        el.style.top = Math.round(tstr[2]) + 'px';
	                    } else {
	                        tstr = data.join();
	                        g.children.forEach(function (childEl) {
	                            childEl.transform(tstr);
	                        });
	                        break;
	                    }
	                    data = data.slice(1);
	                }
	                return g;
	            };
	            g.remove = function () {
	                g.clear();
	                Element.prototype.remove.call(g);
	            };
	            g.clear = function () {
	                g.children.forEach(function (el) {
	                    el.remove();
	                });
	                return g;
	            };
	            // g.animate = function () {
	            //     setproto.animate.apply(g.children, Array.prototype.slice.call(arguments));
	            //     return g;
	            // };
	            return g;
	        };

	        R._engine.path = function (pathString, vml) {
	            var el = createNode("shape");
	            el.style.cssText = cssDot;
	            el.coordsize = zoom + S + zoom;
	            el.coordorigin = vml.coordorigin;
	            var p = new Element(el, vml),
	                attr = {
	                    fill: "none",
	                    stroke: "#000"
	                };
	            pathString && (attr.path = pathString);
	            p.type = "path";
	            p.path = [];
	            p.Path = E;
	            setFillAndStroke(p, attr);
	            vml.canvas.appendChild(el);
	            var skew = createNode("skew");
	            skew.on = true;
	            el.appendChild(skew);
	            p.skew = skew;
	            p.transform(E);
	            return p;
	        };
	        R._engine.rect = function (vml, x, y, w, h, r) {
	            var path = R._rectPath(x, y, w, h, r),
	                res = vml.path(path),
	                a = res.attrs;
	            res.X = a.x = x;
	            res.Y = a.y = y;
	            res.W = a.width = w;
	            res.H = a.height = h;
	            a.r = r;
	            a.path = path;
	            res.type = "rect";
	            return res;
	        };
	        R._engine.ellipse = function (vml, x, y, rx, ry) {
	            var res = vml.path(),
	                a = res.attrs;
	            res.X = x - rx;
	            res.Y = y - ry;
	            res.W = rx * 2;
	            res.H = ry * 2;
	            res.type = "ellipse";
	            setFillAndStroke(res, {
	                cx: x,
	                cy: y,
	                rx: rx,
	                ry: ry
	            });
	            return res;
	        };
	        R._engine.circle = function (vml, x, y, r) {
	            var res = vml.path(),
	                a = res.attrs;
	            res.X = x - r;
	            res.Y = y - r;
	            res.W = res.H = r * 2;
	            res.type = "circle";
	            setFillAndStroke(res, {
	                cx: x,
	                cy: y,
	                r: r
	            });
	            return res;
	        };
	        R._engine.image = function (vml, src, x, y, w, h) {
	            var path = R._rectPath(x, y, w, h),
	                res = vml.path(path).attr({
	                    stroke: "none"
	                }),
	                a = res.attrs,
	                node = res.node,
	                fill = node.getElementsByTagName(fillString)[0];
	            a.src = src;
	            res.X = a.x = x;
	            res.Y = a.y = y;
	            res.W = a.width = w;
	            res.H = a.height = h;
	            a.path = path;
	            res.type = "image";
	            fill.parentNode == node && node.removeChild(fill);
	            fill.rotate = true;
	            fill.src = src;
	            fill.type = "tile";
	            res._.fillpos = [x, y];
	            res._.fillsize = [w, h];
	            node.appendChild(fill);
	            setCoords(res, 1, 1, 0, 0, 0);
	            return res;
	        };
	        R._engine.text = function (vml, x, y, text) {
	            var el = createNode("shape"),
	                path = createNode("path"),
	                o = createNode("textpath");
	            x = x || 0;
	            y = y || 0;
	            text = text || "";
	            path.v = R.format("m{0},{1}l{2},{1}", round(x * zoom), round(y * zoom), round(x * zoom) + 1);
	            path.textpathok = true;
	            o.string = Str(text);
	            o.on = true;
	            el.style.cssText = cssDot;
	            el.coordsize = zoom + S + zoom;
	            el.coordorigin = "0 0";
	            var p = new Element(el, vml),
	                attr = {
	                    fill: "#000",
	                    stroke: "none",
	                    font: R._availableAttrs.font,
	                    text: text
	                };
	            p.shape = el;
	            p.path = path;
	            p.textpath = o;
	            p.type = "text";
	            p.attrs.text = Str(text);
	            p.attrs.x = x;
	            p.attrs.y = y;
	            p.attrs.w = 1;
	            p.attrs.h = 1;

	            setFillAndStroke(p, attr);
	            el.appendChild(o);
	            el.appendChild(path);

	            // [wumingdan] nobr for vml
	            if (!Raphael.exportSVG) {
	                p.attr({
	                    stroke: '#fff',
	                    'opacity': 0,
	                    'fill-opacity': 0
	                });

	                var nobr = document.createElement('nobr');

	                nobr.style['font-family'] = 'Arial, 宋体';

	                nobr.innerHTML = String(text);
	                el.appendChild(nobr);
	                p.nobr = nobr;
	            }

	            vml.canvas.appendChild(el);
	            var skew = createNode("skew");
	            skew.on = true;
	            el.appendChild(skew);
	            p.skew = skew;
	            p.transform(E);

	            return p;
	        };
	        R._engine.setSize = function (width, height) {
	            var cs = this.canvas.style;
	            this.width = width;
	            this.height = height;
	            width == +width && (width += "px");
	            height == +height && (height += "px");
	            cs.width = width;
	            cs.height = height;
	            cs.clip = "rect(0 " + width + " " + height + " 0)";
	            if (this._viewBox) {
	                R._engine.setViewBox.apply(this, this._viewBox);
	            }
	            return this;
	        };
	        R._engine.setViewBox = function (x, y, w, h, fit) {
	            R.eve("raphael.setViewBox", this, this._viewBox, [x, y, w, h, fit]);
	            var width = this.width,
	                height = this.height,
	                size = 1 / mmax(w / width, h / height),
	                H, W;
	            if (fit) {
	                H = height / h;
	                W = width / w;
	                if (w * H < width) {
	                    x -= (width - w * H) / 2 / H;
	                }
	                if (h * W < height) {
	                    y -= (height - h * W) / 2 / W;
	                }
	            }
	            this._viewBox = [x, y, w, h, !!fit];
	            this._viewBoxShift = {
	                dx: -x,
	                dy: -y,
	                scale: size
	            };
	            this.forEach(function (el) {
	                el.transform("...");
	            });
	            return this;
	        };
	        var createNode;
	        R._engine.initWin = function (win) {
	            var doc = win.document;
	            doc.createStyleSheet().addRule(".rvml", "behavior:url(#default#VML)");
	            try {
	                !doc.namespaces.rvml && doc.namespaces.add("rvml", "urn:schemas-microsoft-com:vml");
	                createNode = function (tagName) {
	                    return doc.createElement('<rvml:' + tagName + ' class="rvml">');
	                };
	            } catch (e) {
	                createNode = function (tagName) {
	                    return doc.createElement('<' + tagName + ' xmlns="urn:schemas-microsoft.com:vml" class="rvml">');
	                };
	            }
	        };
	        R._engine.initWin(R._g.win);
	        R._engine.create = function () {
	            var con = R._getContainer.apply(0, arguments),
	                container = con.container,
	                height = con.height,
	                s, width = con.width,
	                x = con.x,
	                y = con.y;
	            if (!container) {
	                throw new Error("VML container not found.");
	            }
	            var res = new R._Paper,
	                c = res.canvas = R._g.doc.createElement("div"),
	                cs = c.style;
	            x = x || 0;
	            y = y || 0;
	            width = width || 512;
	            height = height || 342;
	            res.width = width;
	            res.height = height;
	            width == +width && (width += "px");
	            height == +height && (height += "px");
	            res.coordsize = zoom * 1e3 + S + zoom * 1e3;
	            res.coordorigin = "0 0";
	            res.span = R._g.doc.createElement("span");
	            res.span.style.cssText = "position:absolute;left:-9999em;top:-9999em;padding:0;margin:0;line-height:1;";
	            c.appendChild(res.span);
	            // R._g.doc.body.appendChild(res.span); //updated by zhangxin, cause we can't get use getBoundingClientRect if we set display as none on chart container
	            cs.cssText = R.format("top:0;left:0;width:{0};height:{1};display:inline-block;position:relative;clip:rect(0 {0} {1} 0);overflow:hidden", width, height);
	            if (container == 1) {
	                R._g.doc.body.appendChild(c);
	                cs.left = x + "px";
	                cs.top = y + "px";
	                cs.position = "absolute";
	            } else {
	                if (container.firstChild) {
	                    container.insertBefore(c, container.firstChild);
	                } else {
	                    container.appendChild(c);
	                }
	            }
	            res.renderfix = function () { };
	            return res;
	        };
	        R.prototype.clear = function () {
	            R.eve("raphael.clear", this);
	            this.canvas.innerHTML = E;
	            this.span = R._g.doc.createElement("span");
	            this.span.style.cssText = "position:absolute;left:-9999em;top:-9999em;padding:0;margin:0;line-height:1;display:inline;";
	            this.canvas.appendChild(this.span);
	            //R._g.doc.body.appendChild(this.span);
	            this.bottom = this.top = null;
	        };
	        R.prototype.remove = function () {
	            R.eve("raphael.remove", this);
	            this.canvas.parentNode.removeChild(this.canvas);
	            for (var i in this) {
	                this[i] = typeof this[i] == "function" ? R._removedFactory(i) : null;
	            }
	            return true;
	        };

	        var setproto = R.st;
	        for (var method in elproto)
	            if (elproto[has](method) && !setproto[has](method)) {
	                setproto[method] = (function (methodname) {
	                    return function () {
	                        var arg = arguments;
	                        return this.forEach(function (el) {
	                            el[methodname].apply(el, arg);
	                        });
	                    };
	                })(method);
	            }
	    }(window.Raphael);

	//return window.Raphael;
	//});


/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * @file 中国地图
	 * @author wumingdan(wumingdan@baidu.com)
	 */

	!(__WEBPACK_AMD_DEFINE_RESULT__ = function (require) {

	    var Util = __webpack_require__(1);
	    var Map = __webpack_require__(30);

	    var mapData = [
	    {
	        name: '澳门',
	        path: "M231.5,267.0C231.5,267.0,231.0,267.9,231.0,267.9C231.0,267.9,231.4,268.4,232.0,268.5C232.5,268.6,233.0,268.2,233.0,268.2C233.0,268.2,231.5,267.0,231.5,267.0C231.5,267.0,231.5,267.0,231.5,267.0"
	    }, {
	        name: '香港',
	        path: "M233.8,264.5C233.8,264.5,235.5,264.8,235.5,264.8C235.5,264.8,237.2,263.6,237.2,263.6C237.2,263.6,238.1,265.9,238.1,265.9C238.1,265.9,235.3,267.2,236.2,266.7C237.1,266.3,233.9,266.6,233.9,266.6C233.9,266.6,233.5,264.8,233.5,264.8C233.5,264.8,233.8,264.5,233.8,264.5C233.8,264.5,233.8,264.5,233.8,264.5"
	    }, {
	        name: '台湾',
	        path: 'M277.7,245.6C277.7,245.6,276.1,255.1,276.1,255.1C276.1,255.1,275.2,258.2,275.2,258.2C275.2,258.2,275.2,260.7,275.2,260.7C275.2,260.7,274.5,261.4,274.5,261.4C274.5,261.4,272.8,258.9,272.8,258.9C272.8,258.9,270.9,257.5,270.9,257.5C270.9,257.5,269.3,253.2,269.3,253.2C269.3,253.2,269.1,250.4,269.5,249.3C269.9,248.2,272.2,242.3,272.2,242.3C272.2,242.3,275.3,239.6,275.3,239.6C275.3,239.6,277.4,240.6,277.4,240.6C277.4,240.6,277.7,245.6,277.7,245.6C277.7,245.6,277.7,245.6,277.7,245.6'
	    }, {
	        name: '广东',
	        path: "M220.6,251.3C220.6,251.3,221.8,250.4,221.8,250.4C221.8,250.4,221.8,248.7,221.8,248.7C221.8,248.7,222.4,248.2,222.4,248.2C222.4,248.2,223.8,248.3,223.8,248.3C223.8,248.3,226.2,249.4,226.2,249.4C226.2,249.4,226.6,248.6,226.6,248.6C226.6,248.6,226.1,247.6,226.1,247.6C226.1,247.6,226.2,246.9,226.2,246.9C226.2,246.9,227.8,245.6,227.8,245.6C227.8,245.6,230.5,246.3,230.5,246.3C230.5,246.3,232.1,245.3,232.1,245.3C232.1,245.3,233.2,246.4,233.2,246.4C233.2,246.4,235.9,245.7,235.9,245.7C235.9,245.7,236.5,246.7,236.5,246.7C236.5,246.7,235.6,247.9,235.6,247.9C235.6,247.9,234.2,250.0,234.2,250.0C234.2,250.0,234.2,250.6,234.2,250.6C234.2,250.6,235.0,251.1,235.0,251.1C235.0,251.1,240.8,248.9,240.8,248.9C240.8,248.9,242.8,250.0,242.8,250.0C242.8,250.0,243.4,249.4,243.4,249.4C243.4,249.4,242.8,248.2,242.8,248.2C242.8,248.2,242.9,247.3,242.9,247.3C242.9,247.3,246.7,248.2,246.7,248.2C246.7,248.2,247.4,248.7,247.4,248.7C247.4,248.7,248.4,248.6,248.4,248.6C248.4,248.6,249.9,250.6,249.9,250.6C249.9,250.6,251.7,254.3,251.7,254.3C251.7,254.3,250.5,255.1,250.5,255.1C250.5,255.1,249.5,257.0,249.5,257.0C249.5,257.0,248.6,257.3,248.6,257.3C248.6,257.3,247.8,259.0,247.8,259.0C247.8,259.0,244.9,260.4,244.9,260.4C244.9,260.4,243.8,259.8,243.8,259.8C243.8,259.8,243.1,261.0,243.1,261.0C243.1,261.0,243.1,261.4,243.1,261.4C243.1,261.4,242.2,261.4,242.2,261.4C242.2,261.4,240.6,261.4,240.6,261.4C240.6,261.4,239.2,262.5,239.2,262.5C239.2,262.5,238.2,261.9,238.2,261.9C238.2,261.9,237.0,262.7,237.0,262.7C237.0,262.7,233.8,264.0,233.8,264.0C233.8,264.0,231.2,262.0,231.2,262.0C231.2,262.0,231.1,263.6,231.1,263.6C231.1,263.6,232,266.0,232,266.0C232,266.0,229.6,267.0,229.6,267.0C229.6,267.0,228.4,268.7,228.4,268.7C228.4,268.7,225.9,269.3,225.9,269.3C225.9,269.3,224.6,269.8,224.6,269.8C224.6,269.8,222.1,269.8,222.1,269.8C222.1,269.8,221.6,271.1,220.3,271.6C219.0,272.0,215.8,273.2,215.8,273.2C215.8,273.2,213.5,274.7,213.5,274.7C213.5,274.7,212.4,275.9,212.4,275.9C212.4,275.9,214.5,279.3,214.5,279.3C214.5,279.3,213.1,280.6,213.1,280.6C213.1,280.6,211.4,280.4,211.4,280.4C211.4,280.4,209.3,276.7,209.3,276.7C209.3,276.7,209.8,274.1,209.8,274.1C209.8,274.1,209.8,272.9,209.8,272.9C209.8,272.9,211.2,270.6,211.2,270.6C211.2,270.6,213.1,270.1,213.1,270.1C213.1,270.1,212.9,268.9,212.9,268.9C212.9,268.9,214.8,268.0,214.8,268.0C214.8,268.0,215.0,265.9,215.0,265.9C215.0,265.9,218.4,263.3,218.4,263.3C218.4,263.3,218.2,259.8,218.2,259.8C218.2,259.8,220.8,256.6,220.8,256.6C220.8,256.6,220.6,255.3,220.6,255.3C220.6,255.3,221.5,254.1,221.5,254.1C221.5,254.1,220.6,251.3,220.6,251.3C220.6,251.3,220.6,251.3,220.6,251.3"
	    }, {
	        name: '广西',
	        path: "M177.8,253.9C177.8,253.9,179.6,254.0,179.6,254.0C179.6,254.0,181.6,252.2,181.6,252.2C181.6,252.2,182.5,252.7,182.5,252.7C182.5,252.7,186.3,254.3,186.3,254.3C186.3,254.3,187.1,253.9,187.1,253.9C187.1,253.9,187.2,252.6,187.2,252.6C187.2,252.6,187.9,251.9,187.9,251.9C187.9,251.9,193.4,248.3,193.4,248.3C193.4,248.3,194.3,249.4,194.3,249.4C194.3,249.4,197.7,250.4,197.7,250.4C197.7,250.4,199.5,248.0,199.5,248.0C199.5,248.0,200.3,248.6,200.3,248.6C200.3,248.6,201.6,248.6,201.6,248.6C201.6,248.6,201.6,247.9,201.6,247.9C201.6,247.9,203.4,247.3,203.4,247.3C203.4,247.3,203.4,246.7,203.4,246.7C203.4,246.7,204.1,246.0,204.1,246.0C204.1,246.0,204.5,246.1,204.5,246.1C204.5,246.1,206.2,244.4,206.2,244.4C206.2,244.4,207.7,244.8,207.7,244.8C207.7,244.8,209.1,242.9,209.1,242.9C209.1,242.9,209.8,244.4,209.8,244.4C209.8,244.4,210.2,244.3,210.2,244.3C210.2,244.3,212.5,242.2,212.5,242.2C212.5,242.2,213.1,242.3,213.1,242.3C213.1,242.3,214.1,241.7,214.1,241.7C214.1,241.7,215.9,242.3,215.9,242.3C215.9,242.3,215.9,244.3,215.9,244.3C215.9,244.3,217.4,244.6,217.4,244.6C217.4,244.6,216.9,246.6,216.9,246.6C216.9,246.6,215.6,248.7,215.6,248.7C215.6,248.7,215.0,250.6,215.0,250.6C215.0,250.6,215.6,250.6,215.6,250.6C215.6,250.6,217.2,249.1,217.2,249.1C217.2,249.1,218.5,252.0,218.5,252.0C218.5,252.0,219.5,251.3,219.5,251.3C219.5,251.3,220.6,251.3,220.6,251.3C220.6,251.3,221.5,254.1,221.5,254.1C221.5,254.1,220.6,255.3,220.6,255.3C220.6,255.3,220.8,256.6,220.8,256.6C220.8,256.6,218.2,259.8,218.2,259.8C218.2,259.8,218.4,263.3,218.4,263.3C218.4,263.3,215.0,265.9,215.0,265.9C215.0,265.9,214.8,268.0,214.8,268.0C214.8,268.0,212.9,268.9,212.9,268.9C212.9,268.9,213.1,270.1,213.1,270.1C213.1,270.1,211.2,270.6,211.2,270.6C211.2,270.6,209.8,272.9,209.8,272.9C209.8,272.9,206.0,273.4,206.0,273.4C206.0,273.4,204.1,272.0,204.1,272.0C204.1,272.0,202.1,271.1,202.1,271.1C202.1,271.1,200.0,273.2,200.0,273.2C200.0,273.2,198.0,273.3,198.0,273.3C198.0,273.3,195.9,273.4,195.9,273.4C195.9,273.4,190.4,270.3,191.3,270.9C192.3,271.4,190.5,268.6,190.5,268.6C190.5,268.6,191.6,266.3,191.6,266.3C191.6,266.3,190.3,265.3,190.3,265.3C190.3,265.3,188.6,265.3,188.6,265.3C188.6,265.3,188.2,264.8,188.2,264.8C188.2,264.8,186.3,265.3,186.3,265.3C186.3,265.3,184.5,264.0,184.5,264.0C184.5,264.0,185.2,262.0,185.2,262.0C185.2,262.0,186.6,261.9,186.6,261.9C186.6,261.9,187.2,261.4,187.2,261.4C187.2,261.4,187.7,259.6,187.7,259.6C187.7,259.6,187.1,258.6,187.1,258.6C187.1,258.6,182.2,257.7,182.2,257.7C182.2,257.7,181.3,256.3,181.3,256.3C181.3,256.3,179.9,256.3,179.9,256.3C179.9,256.3,178.6,256.3,178.6,256.3C178.6,256.3,177.6,254.7,177.6,254.7C177.6,254.7,177.8,253.9,177.8,253.9C177.8,253.9,177.8,253.9,177.8,253.9"
	    }, {
	        name: '海南',
	        path: "M217.9,283.7C217.9,283.7,215.3,288.2,215.3,288.2C215.3,288.2,215.3,290.1,215.3,290.1C215.3,290.1,210.2,294.3,210.2,294.3C210.2,294.3,204.9,292.5,204.9,292.5C204.9,292.5,203.9,288.7,203.9,288.7C203.9,288.7,204.2,287.0,204.2,287.0C204.2,287.0,208.2,282.9,207.1,284.1C205.9,285.3,208.1,283.3,208.1,283.3C208.1,283.3,212.8,282.5,212.8,282.5C212.8,282.5,214.9,282.3,214.9,282.3C214.9,282.3,215.6,281.5,215.6,281.5C215.6,281.5,217.2,281.9,217.2,281.9C217.2,281.9,217.9,283.7,217.9,283.7C217.9,283.7,217.9,283.7,217.9,283.7"
	    }, {
	        name: '云南',
	        path: "M181.8,234.6C181.8,234.6,181.3,233.2,181.3,233.2C181.3,233.2,180.0,232.7,180.0,232.7C180.0,232.7,177.9,234.0,177.9,234.0C177.9,234.0,176.5,233.3,176.5,233.3C176.5,233.3,176.3,231.4,176.3,231.4C176.3,231.4,175.6,230.5,175.6,230.5C175.6,230.5,175.6,229.6,175.6,229.6C175.6,229.6,173.6,229.1,173.6,229.1C173.6,229.1,173.1,229.7,173.1,229.7C173.1,229.7,173.4,231.1,173.4,231.1C173.4,231.1,171.8,231.9,171.8,231.9C171.8,231.9,171.3,232.9,171.3,232.9C171.3,232.9,171.8,234.1,171.8,234.1C171.8,234.1,168.2,238.3,168.2,238.3C168.2,238.3,168.8,243.2,168.8,243.2C168.8,243.2,167.1,244.6,167.1,244.6C167.1,244.6,166.2,243.7,166.2,243.7C166.2,243.7,162.8,245.7,162.8,245.7C162.8,245.7,161.5,245.0,161.5,245.0C161.5,245.0,155.7,234.0,156.5,235.4C157.2,236.9,154.5,234.0,154.5,234.0C154.5,234.0,152.9,233.6,152.9,233.6C152.9,233.6,152.2,232.3,152.2,232.3C152.2,232.3,153.1,230.8,153.1,230.8C153.1,230.8,151.6,229.7,151.6,229.7C151.6,229.7,149.9,231.1,149.9,231.1C149.9,231.1,148.2,231.4,148.2,231.4C148.2,231.4,147.1,226.3,147.1,226.3C147.1,226.3,146.8,225.0,146.8,225.0C146.8,225.0,145.0,227.2,145.0,227.2C145.0,227.2,144.3,227.6,144.3,227.6C144.3,227.6,144.5,230.8,144.5,230.8C144.5,230.8,144.1,231.6,144.1,231.6C144.1,231.6,143.2,231.6,143.2,231.6C143.2,231.6,142.5,230.8,142.5,230.8C142.5,230.8,141.6,231.9,141.6,231.9C141.6,231.9,142.5,235.5,142.5,235.5C142.5,235.5,143.5,235.5,143.5,235.5C143.5,235.5,144.3,236.1,144.3,236.1C144.3,236.1,144.5,237.3,144.6,238.4C144.7,239.5,144.2,246.3,144.2,246.3C144.2,246.3,138.8,251.1,138.8,251.1C138.8,251.1,138.5,253.0,138.5,253.0C138.5,253.0,137.5,253.9,137.5,253.9C137.5,253.9,137.3,254.8,137.3,254.8C137.3,254.8,138.2,257.2,138.2,257.2C138.2,257.2,137.5,258.9,137.5,258.9C137.5,258.9,137.9,259.1,137.9,259.1C137.9,259.1,140.6,258.4,140.6,258.4C140.6,258.4,144.5,258.2,144.5,258.2C144.5,258.2,144.1,259.7,144.1,259.7C144.1,259.7,144.8,261.1,144.8,261.1C144.8,261.1,145.0,263.3,145.0,263.3C145.0,263.3,145.5,264.0,145.5,264.0C145.5,264.0,147.8,264.1,147.8,264.1C147.8,264.1,148.8,264.8,148.8,264.8C148.8,264.8,147.6,266.3,147.6,266.3C147.6,266.3,147.5,268.0,147.5,268.0C147.5,268.0,146.6,270.0,146.6,270.0C146.6,270.0,147.2,270.7,147.2,270.7C147.2,270.7,148.6,270.9,148.6,270.9C148.6,270.9,151.0,271.7,151.0,271.7C151.0,271.7,150.7,272.6,150.7,272.6C150.7,272.6,152.3,275.0,152.3,275.0C152.3,275.0,154.6,275.0,154.6,275.0C154.6,275.0,157.5,273.4,157.5,273.4C157.5,273.4,158.4,273.9,158.4,273.9C158.4,273.9,158.4,274.8,158.4,274.8C158.4,274.8,158.8,276.3,158.8,276.3C158.8,276.3,159.5,277.0,159.5,277.0C159.5,277.0,161.0,276.7,161.0,276.7C161.0,276.7,161.6,277.2,161.6,277.2C161.6,277.2,162.2,276.6,162.2,276.6C162.2,276.6,162.2,274.3,162.2,274.3C162.2,274.3,161.2,270.1,161.2,270.1C161.2,270.1,161.9,268.9,161.9,268.9C161.9,268.9,164.3,268.9,164.3,268.9C164.3,268.9,164.9,268.9,164.9,268.9C164.9,268.9,166.2,267.3,166.2,267.3C166.2,267.3,169.6,268.4,169.6,268.4C169.6,268.4,171.0,267.2,171.0,267.2C171.0,267.2,171.8,267.9,171.8,267.9C171.8,267.9,173.2,267.0,173.2,267.0C173.2,267.0,174.5,268.3,174.5,268.3C174.5,268.3,175.0,268.3,175.0,268.3C175.0,268.3,175.5,267.6,175.5,267.6C175.5,267.6,176.6,266.4,176.6,266.4C176.6,266.4,177.2,266.9,177.2,266.9C177.2,266.9,178.8,266.6,178.8,266.6C178.8,266.6,180.3,265.3,180.3,265.3C180.3,265.3,181.6,263.4,181.6,263.4C181.6,263.4,183.5,263.0,183.5,263.0C183.5,263.0,184.5,264.0,184.5,264.0C184.5,264.0,185.2,262.0,185.2,262.0C185.2,262.0,186.6,261.9,186.6,261.9C186.6,261.9,187.2,261.4,187.2,261.4C187.2,261.4,187.7,259.6,187.7,259.6C187.7,259.6,187.1,258.6,187.1,258.6C187.1,258.6,182.2,257.7,182.2,257.7C182.2,257.7,181.3,256.3,181.3,256.3C181.3,256.3,179.9,256.3,179.9,256.3C179.9,256.3,178.6,256.3,178.6,256.3C178.6,256.3,177.7,254.7,177.7,254.7C177.7,254.7,177.8,253.9,177.8,253.9C177.8,253.9,178.4,250.4,178.4,250.4C178.4,250.4,176.5,248.6,176.5,248.6C176.5,248.6,177.9,242.6,177.9,242.6C177.9,242.6,176.9,241.7,176.9,241.7C176.9,241.7,173.8,242.7,173.8,242.7C173.8,242.7,173.1,241.4,173.1,241.4C173.1,241.4,173.1,240.0,173.1,240.0C173.1,240.0,172.4,239.3,172.4,239.3C172.4,239.3,173.9,237.2,173.9,237.2C173.9,237.2,175.6,237.7,175.6,237.7C175.6,237.7,176.3,237.0,176.3,237.0C176.3,237.0,179.5,237.5,179.5,237.5C179.5,237.5,180.9,237.0,180.9,237.0C180.9,237.0,181.8,234.6,181.8,234.6C181.8,234.6,181.8,234.6,181.8,234.6"
	    }, {
	        name: '福建',
	        path: "M242.9,247.3C242.9,247.3,244.4,241.1,243.8,242.2C243.2,243.2,244.6,240.8,244.6,240.8C244.6,240.8,245.0,239.4,245.0,239.4C245.0,239.4,246.1,237.3,246.1,237.3C246.1,237.3,245.5,236.4,245.5,236.4C245.5,236.4,245.6,234.6,245.6,234.6C245.6,234.6,248.1,231.9,248.1,231.9C248.1,231.9,247.9,230.0,247.9,230.0C247.9,230.0,249.5,227.3,249.5,227.3C249.5,227.3,251.1,227.7,251.1,227.7C251.1,227.7,254.2,225.4,254.2,225.4C254.2,225.4,254.8,224.3,254.8,224.3C254.8,224.3,256.7,224.6,256.7,224.6C256.7,224.6,257.7,227.2,257.7,227.2C257.7,227.2,258.5,228.9,258.5,228.9C258.5,228.9,260.5,228.9,260.5,228.9C260.5,228.9,261.8,227.3,261.8,227.3C261.8,227.3,263.6,229.1,263.6,229.1C263.6,229.1,266.8,228.0,266.8,228.0C266.8,228.0,264.8,232.9,264.8,232.9C264.8,232.9,263.6,232.3,263.6,232.3C263.6,232.3,262.8,232.7,262.8,232.7C262.8,232.7,262.7,233.2,262.7,233.2C262.7,233.2,263.8,234.4,263.8,234.4C263.8,234.4,263.5,238.9,263.5,238.9C263.5,238.9,263.8,240.3,263.8,240.3C263.8,240.3,263.5,240.7,263.5,240.7C263.5,240.7,262.2,240.4,262.2,240.4C262.2,240.4,261.4,241.3,261.4,241.3C261.4,241.3,262.0,242.5,262.0,242.5C262.0,242.5,260.3,244.0,260.3,244.0C260.3,244.0,260.6,244.6,260.6,244.6C260.6,244.6,259.1,245.4,259.1,245.4C259.1,245.4,259.3,246.6,259.3,246.6C259.3,246.6,258.8,247.2,258.8,247.2C258.8,247.2,256.7,247.2,256.7,247.2C256.7,247.2,255.5,248.2,255.5,248.2C255.5,248.2,255.3,248.6,255.3,248.6C255.3,248.6,256.4,249.3,256.4,249.3C256.4,249.3,255.2,251.0,255.2,251.0C255.2,251.0,253.8,252.9,253.8,252.9C253.8,252.9,253.2,252.7,253.2,252.7C253.2,252.7,251.7,254.3,251.7,254.3C251.7,254.3,249.9,250.6,249.9,250.6C249.9,250.6,248.4,248.6,248.4,248.6C248.4,248.6,247.4,248.7,247.4,248.7C247.4,248.7,246.7,248.2,246.7,248.2C246.7,248.2,242.9,247.3,242.9,247.3C242.9,247.3,242.9,247.3,242.9,247.3"
	    }, {
	        name: '江西',
	        path: "M229.1,222.6C229.1,222.6,230.8,225.8,230.8,225.8C230.8,225.8,230.9,227.6,230.9,227.6C230.9,227.6,230.0,229.3,230.0,229.3C230.0,229.3,228.8,230.3,228.8,230.3C228.8,230.3,228.5,233.4,228.5,233.4C228.5,233.4,228.9,233.9,228.9,233.9C228.9,233.9,229.6,233.6,229.6,233.6C229.6,233.6,230.0,233.9,230.0,233.9C230.0,233.9,230.0,235.8,230.0,235.8C230.0,235.8,230.9,238.2,230.9,238.2C230.9,238.2,231.9,238.6,231.9,238.6C231.9,238.6,232.1,242.0,232.1,242.0C232.1,242.0,231.5,244.3,231.5,244.3C231.5,244.3,232.1,245.3,232.1,245.3C232.1,245.3,233.2,246.4,233.2,246.4C233.2,246.4,235.9,245.7,235.9,245.7C235.9,245.7,236.5,246.7,236.5,246.7C236.5,246.7,235.6,247.9,235.6,247.9C235.6,247.9,234.2,250.0,234.2,250.0C234.2,250.0,234.2,250.5,234.2,250.5C234.2,250.5,235.0,251.1,235.0,251.1C235.0,251.1,240.8,248.9,240.8,248.9C240.8,248.9,242.8,250.0,242.8,250.0C242.8,250.0,243.4,249.4,243.4,249.4C243.4,249.4,242.8,248.2,242.8,248.2C242.8,248.2,242.9,247.3,242.9,247.3C242.9,247.3,243.8,242.2,243.8,242.2C243.8,242.2,244.6,240.8,244.6,240.8C244.6,240.8,245.0,239.4,245.0,239.4C245.0,239.4,246.1,237.3,246.1,237.3C246.1,237.3,245.5,236.4,245.5,236.4C245.5,236.4,245.6,234.6,245.6,234.6C245.6,234.6,248.1,231.9,248.1,231.9C248.1,231.9,247.9,230.0,247.9,230.0C247.9,230.0,249.5,227.3,249.5,227.3C249.5,227.3,251.1,227.7,251.1,227.7C251.1,227.7,254.2,225.4,254.2,225.4C254.2,225.4,254.8,224.3,254.8,224.3C254.8,224.3,252.8,220.5,252.8,220.5C252.8,220.5,251.5,218.7,251.5,218.7C251.5,218.7,252.4,217.8,252.4,217.8C252.4,217.8,251.2,216.7,251.2,216.7C251.2,216.7,248.2,216.7,248.2,216.7C248.2,216.7,247,215.3,247,215.3C247,215.3,244.5,217.7,244.5,217.7C244.5,217.7,243.6,217.3,243.6,217.3C243.6,217.3,244.6,215.4,244.6,215.4C244.6,215.4,244.5,214.8,244.5,214.8C244.5,214.8,243.6,214.6,243.6,214.6C243.6,214.6,240.8,216.1,240.8,216.1C240.8,216.1,238.5,216.9,238.5,216.9C238.5,216.9,236.7,216.7,236.7,216.7C236.7,216.7,231.8,221.6,232.7,220.4C233.5,219.3,230.5,221.1,230.5,221.1C230.5,221.1,229.1,222.6,229.1,222.6C229.1,222.6,229.1,222.6,229.1,222.6"
	    }, {
	        name: '湖南',
	        path: "M229.1,222.6C229.1,222.6,227.8,222.3,227.8,222.3C227.8,222.3,227.2,221.4,227.2,221.4C227.2,221.4,227.2,219.4,227.2,219.4C227.2,219.4,226.5,218.4,226.5,218.4C226.5,218.4,225.0,219.8,225.0,219.8C225.0,219.8,224.3,220.8,224.3,220.8C224.3,220.8,223.4,220.8,223.4,220.8C223.4,220.8,223.1,219.3,223.1,219.3C223.1,219.3,221.8,219.7,221.8,219.7C221.8,219.7,220.0,220.8,220.0,220.8C220.0,220.8,218.9,220.1,218.9,220.1C218.9,220.1,217.6,218.9,216.6,218.6C215.7,218.3,210.0,218.2,210.0,218.2C210.0,218.2,209.3,218.9,209.3,218.9C209.3,218.9,210.6,220.4,210.6,220.4C210.6,220.4,209.1,221.4,209.1,221.4C209.1,221.4,206.6,220.4,206.6,220.4C206.6,220.4,204.1,222.6,204.1,222.6C204.1,222.6,203.2,224.6,203.2,224.6C203.2,224.6,203.1,227.8,203.4,229.3C203.6,230.8,204.6,234.3,204.6,234.3C204.6,234.3,201.8,237.5,201.8,237.5C201.8,237.5,202.1,237.9,202.1,237.9C202.1,237.9,204.6,237.2,204.6,237.2C204.6,237.2,205.5,238.3,205.5,238.3C205.5,238.3,204.8,241.9,204.8,241.9C204.8,241.9,206.2,244.4,206.2,244.4C206.2,244.4,207.7,244.8,207.7,244.8C207.7,244.8,209.1,242.9,209.1,242.9C209.1,242.9,209.8,244.4,209.8,244.4C209.8,244.4,210.2,244.3,210.2,244.3C210.2,244.3,212.5,242.2,212.5,242.2C212.5,242.2,213.1,242.3,213.1,242.3C213.1,242.3,214.1,241.7,214.1,241.7C214.1,241.7,215.9,242.3,215.9,242.3C215.9,242.3,215.9,244.3,215.9,244.3C215.9,244.3,217.4,244.6,217.4,244.6C217.4,244.6,216.9,246.6,216.9,246.6C216.9,246.6,215.6,248.7,215.6,248.7C215.6,248.7,215.0,250.6,215.0,250.6C215.0,250.6,215.6,250.6,215.6,250.6C215.6,250.6,217.2,249.1,217.2,249.1C217.2,249.1,218.5,252.0,218.5,252.0C218.5,252.0,219.5,251.3,219.5,251.3C219.5,251.3,220.6,251.3,220.6,251.3C220.6,251.3,221.8,250.4,221.8,250.4C221.8,250.4,221.8,248.7,221.8,248.7C221.8,248.7,222.4,248.2,222.4,248.2C222.4,248.2,223.8,248.3,223.8,248.3C223.8,248.3,226.2,249.4,226.2,249.4C226.2,249.4,226.6,248.6,226.6,248.6C226.6,248.6,226.1,247.6,226.1,247.6C226.1,247.6,226.2,246.9,226.2,246.9C226.2,246.9,227.8,245.6,227.8,245.6C227.8,245.6,230.5,246.3,230.5,246.3C230.5,246.3,232.1,245.3,232.1,245.3C232.1,245.3,231.5,244.3,231.5,244.3C231.5,244.3,232.1,242.0,232.1,242.0C232.1,242.0,231.9,238.6,231.9,238.6C231.9,238.6,230.9,238.2,230.9,238.2C230.9,238.2,230.0,235.8,230.0,235.8C230.0,235.8,230.0,233.9,230.0,233.9C230.0,233.9,229.6,233.6,229.6,233.6C229.6,233.6,228.9,233.9,228.9,233.9C228.9,233.9,228.5,233.4,228.5,233.4C228.5,233.4,228.8,230.3,228.8,230.3C228.8,230.3,230.0,229.3,230.0,229.3C230.0,229.3,230.9,227.6,230.9,227.6C230.9,227.6,230.8,225.8,230.8,225.8C230.8,225.8,229.1,222.6,229.1,222.6C229.1,222.6,229.1,222.6,229.1,222.6"
	    }, {
	        name: '贵州',
	        path: "M181.8,234.6C181.8,234.6,180.9,237.0,180.9,237.0C180.9,237.0,179.5,237.5,179.5,237.5C179.5,237.5,176.3,237.0,176.3,237.0C176.3,237.0,175.6,237.7,175.6,237.7C175.6,237.7,173.9,237.2,173.9,237.2C173.9,237.2,172.4,239.3,172.4,239.3C172.4,239.3,173.1,240.0,173.1,240.0C173.1,240.0,173.1,241.4,173.1,241.4C173.1,241.4,173.8,242.7,173.8,242.7C173.8,242.7,176.9,241.7,176.9,241.7C176.9,241.7,177.9,242.6,177.9,242.6C177.9,242.6,176.5,248.6,176.5,248.6C176.5,248.6,178.4,250.4,178.4,250.4C178.4,250.4,177.8,253.9,177.8,253.9C177.8,253.9,179.6,254.0,179.6,254.0C179.6,254.0,181.6,252.2,181.6,252.2C181.6,252.2,182.5,252.7,182.5,252.7C182.5,252.7,186.3,254.3,186.3,254.3C186.3,254.3,187.1,253.9,187.1,253.9C187.1,253.9,187.2,252.6,187.2,252.6C187.2,252.6,187.9,251.9,187.9,251.9C187.9,251.9,193.4,248.3,193.4,248.3C193.4,248.3,194.3,249.4,194.3,249.4C194.3,249.4,197.7,250.4,197.7,250.4C197.7,250.4,199.5,248.0,199.5,248.0C199.5,248.0,200.3,248.6,200.3,248.6C200.3,248.6,201.6,248.6,201.6,248.6C201.6,248.6,201.6,247.9,201.6,247.9C201.6,247.9,203.4,247.3,203.4,247.3C203.4,247.3,203.4,246.7,203.4,246.7C203.4,246.7,204.1,246.0,204.1,246.0C204.1,246.0,204.5,246.1,204.5,246.1C204.5,246.1,206.2,244.4,206.2,244.4C206.2,244.4,204.8,241.9,204.8,241.9C204.8,241.9,205.5,238.3,205.5,238.3C205.5,238.3,204.6,237.2,204.6,237.2C204.6,237.2,202.1,237.9,202.1,237.9C202.1,237.9,201.8,237.5,201.8,237.5C201.8,237.5,204.6,234.3,204.6,234.3C204.6,234.3,203.4,229.3,203.4,229.3C203.4,229.3,201.5,230.7,201.5,230.7C201.5,230.7,199.8,229.0,199.8,229.0C199.8,229.0,198.2,226.9,198.2,226.9C198.2,226.9,198.1,225.5,198.1,225.5C198.1,225.5,196.9,225.3,196.9,225.3C196.9,225.3,195.6,225.7,195.6,225.7C195.6,225.7,193.5,224.7,193.5,224.7C193.5,224.7,192.5,227.2,192.5,227.2C192.5,227.2,190.6,227.3,190.6,227.3C190.6,227.3,189.3,229.3,189.3,229.3C189.3,229.3,188.5,228.9,188.5,228.9C188.5,228.9,187.2,229.3,187.2,229.3C187.2,229.3,185.2,228.2,185.2,228.2C185.2,228.2,183.6,230.0,183.6,230.0C183.6,230.0,183.6,230.8,183.6,230.8C183.6,230.8,186.8,232.6,186.8,232.6C186.8,232.6,187.5,233.9,187.5,233.9C187.5,233.9,184.4,235.0,185.2,234.7C186.0,234.4,181.8,234.6,181.8,234.6C181.8,234.6,181.8,234.6,181.8,234.6"
	    }, {
	        name: '浙江',
	        path: "M266.8,228.0C266.8,228.0,263.6,229.1,263.6,229.1C263.6,229.1,261.8,227.3,261.8,227.3C261.8,227.3,260.5,228.9,260.5,228.9C260.5,228.9,258.5,228.9,258.5,228.9C258.5,228.9,257.7,227.2,257.7,227.2C257.7,227.2,256.7,224.6,256.7,224.6C256.7,224.6,254.8,224.3,254.8,224.3C254.8,224.3,252.8,220.5,252.8,220.5C252.8,220.5,251.5,218.7,251.5,218.7C251.5,218.7,252.4,217.8,252.4,217.8C252.4,217.8,252.8,217.5,252.8,217.5C252.8,217.5,255.9,213.0,254.9,214.4C254.0,215.8,254.8,212.0,254.8,212.0C254.8,212.0,255.5,211.0,255.5,211.0C255.5,211.0,257.2,210.7,257.2,210.7C257.2,210.7,257.7,210.0,257.7,210.0C257.7,210.0,257.1,208.9,257.1,208.9C257.1,208.9,257.9,207.7,257.9,207.7C257.9,207.7,257.9,205.4,257.9,205.4C257.9,205.4,259.1,204.8,259.1,204.8C259.1,204.8,261.1,206.0,261.1,206.0C261.1,206.0,263.5,206.4,263.5,206.4C263.5,206.4,265.1,204.5,265.1,204.5C265.1,204.5,267.1,206.2,267.1,206.2C267.1,206.2,266.2,206.9,266.2,206.9C266.2,206.9,265.2,208.4,265.2,208.4C265.2,208.4,263.6,208.9,263.6,208.9C263.6,208.9,263.1,209.3,263.1,209.3C263.1,209.3,264.6,210.1,264.6,210.1C264.6,210.1,267.5,208.9,267.5,208.9C267.5,208.9,272.2,210.8,272.2,210.8C272.2,210.8,272.7,214.8,272.7,214.8C272.7,214.8,270.8,214.8,270.8,214.8C270.8,214.8,270.6,216.0,270.6,216.0C270.6,216.0,271.7,217.7,271.7,217.7C271.7,217.7,270.8,218.7,270.8,218.7C270.8,218.7,271.8,220.3,271.8,220.3C271.8,220.3,270.2,222.2,270.2,222.2C270.2,222.2,269.5,221.3,269.5,221.3C269.5,221.3,267.2,227.2,267.2,227.2C267.2,227.2,266.8,228.0,266.8,228.0C266.8,228.0,266.8,228.0,266.8,228.0"
	    }, {
	        name: '安徽',
	        path: "M236.8,186.6C236.8,186.6,237.8,186.3,237.8,186.3C237.8,186.3,240.9,187.6,240.9,187.6C240.9,187.6,241.8,188.7,242.4,189.0C242.9,189.3,244.9,189.7,244.9,189.7C244.9,189.7,245.9,190.5,245.9,190.5C245.9,190.5,247.4,190.3,247.4,190.3C247.4,190.3,247.7,190.8,247.7,190.8C247.7,190.8,247.2,193.9,247.2,193.9C247.2,193.9,248.6,194.7,248.6,194.7C248.6,194.7,249.2,195.8,249.2,195.8C249.2,195.8,251.4,196.3,251.4,196.3C251.4,196.3,252.2,194.8,252.2,194.8C252.2,194.8,253.5,195.0,253.5,195.0C253.5,195.0,254.3,196.1,254.3,196.1C254.3,196.1,254.2,197.2,254.2,197.2C254.2,197.2,251.6,197.4,251.6,197.4C251.6,197.4,251.6,198.6,251.6,198.6C251.6,198.6,251.6,199.4,251.6,199.4C251.6,199.4,250.6,200.5,250.6,200.5C250.6,200.5,251.4,201.9,251.4,201.9C251.4,201.9,253.5,203.3,253.5,203.3C253.5,203.3,253.6,205.0,253.6,205.0C253.6,205.0,257.9,205.4,257.9,205.4C257.9,205.4,257.9,207.7,257.9,207.7C257.9,207.7,257.1,208.9,257.1,208.9C257.1,208.9,257.7,210.0,257.7,210.0C257.7,210.0,257.2,210.7,257.2,210.7C257.2,210.7,255.5,211.0,255.5,211.0C255.5,211.0,254.8,212.0,254.8,212.0C254.8,212.0,254.9,214.4,254.9,214.4C254.9,214.4,252.8,217.5,252.8,217.5C252.8,217.5,252.4,217.8,252.4,217.8C252.4,217.8,251.2,216.7,251.2,216.7C251.2,216.7,248.2,216.7,248.2,216.7C248.2,216.7,247.0,215.3,247.0,215.3C247.0,215.3,244.5,217.7,244.5,217.7C244.5,217.7,243.6,217.3,243.6,217.3C243.6,217.3,244.6,215.4,244.6,215.4C244.6,215.4,244.5,214.8,244.5,214.8C244.5,214.8,243.6,214.6,243.6,214.6C243.6,214.6,240.8,216.1,240.8,216.1C240.8,216.1,238.1,211.0,238.1,211.0C238.1,211.0,238.9,209.4,238.9,209.4C238.9,209.4,238.6,208.9,238.6,208.9C238.6,208.9,237.2,208.4,237.2,208.4C237.2,208.4,234.8,207.0,234.8,207.0C234.8,207.0,235.8,205.0,235.8,205.0C235.8,205.0,237.2,204.3,237.2,204.3C237.2,204.3,237.5,202.7,237.5,202.7C237.5,202.7,236.9,199.8,236.9,199.8C236.9,199.8,236.7,199.6,236.7,199.6C236.7,199.6,235.2,201.0,235.2,201.0C235.2,201.0,232.2,198.7,233.1,199.3C233.9,199.9,231.5,197.3,231.5,197.3C231.5,197.3,233.1,196.1,233.1,196.1C233.1,196.1,233.5,194.1,233.5,194.1C233.5,194.1,234.5,193.4,234.5,193.4C234.5,193.4,234.3,190.7,234.3,190.7C234.3,190.7,235.0,190.1,235.0,190.1C235.0,190.1,236.4,191.0,236.4,191.0C236.4,191.0,237.2,192.2,237.2,192.2C237.2,192.2,238.9,191.0,238.9,191.0C238.9,191.0,239.5,190.3,239.5,190.3C239.5,190.3,239.2,189.0,239.2,189.0C239.2,189.0,237.2,187.9,237.2,187.9C237.2,187.9,236.8,186.6,236.8,186.6C236.8,186.6,236.8,186.6,236.8,186.6"
	    }, {
	        name: '上海',
	        path: "M267.1,206.2C267.1,206.2,265.1,204.5,265.1,204.5C265.1,204.5,265.5,204.3,266.1,203.4C266.6,202.5,266.8,201.3,266.8,201.3C266.8,201.3,268.9,202.2,268.9,202.2C268.9,202.2,269.9,203.6,269.9,203.6C269.9,203.6,269.2,204.6,269.2,204.6C269.2,204.6,267.1,206.2,267.1,206.2C267.1,206.2,267.1,206.2,267.1,206.2"
	    }, {
	        name: '江苏',
	        path: "M266.8,201.3C266.8,201.3,266.1,203.4,266.1,203.4C266.1,203.4,265.1,204.5,265.1,204.5C265.1,204.5,263.5,206.4,263.5,206.4C263.5,206.4,261.1,206.0,261.1,206.0C261.1,206.0,259.1,204.8,259.1,204.8C259.1,204.8,257.9,205.4,257.9,205.4C257.9,205.4,253.6,205.0,253.6,205.0C253.6,205.0,253.5,203.3,253.5,203.3C253.5,203.3,251.4,201.9,251.4,201.9C251.4,201.9,250.6,200.5,250.6,200.5C250.6,200.5,251.7,199.4,251.7,199.4C251.7,199.4,251.7,198.6,251.7,198.6C251.7,198.6,251.7,197.4,251.7,197.4C251.7,197.4,254.2,197.1,254.2,197.1C254.2,197.1,254.3,196.1,254.3,196.1C254.3,196.1,253.5,195.0,253.5,195.0C253.5,195.0,252.2,194.8,252.2,194.8C252.2,194.8,251.4,196.3,251.4,196.3C251.4,196.3,249.2,195.8,249.2,195.8C249.2,195.8,248.6,194.7,248.6,194.7C248.6,194.7,247.2,193.9,247.2,193.9C247.2,193.9,247.7,190.8,247.7,190.8C247.7,190.8,247.4,190.3,247.4,190.3C247.4,190.3,245.9,190.5,245.9,190.5C245.9,190.5,244.9,189.7,244.9,189.7C244.9,189.7,242.4,189.0,242.4,189.0C242.4,189.0,240.9,187.6,240.9,187.6C240.9,187.6,237.8,186.3,237.8,186.3C237.8,186.3,238.1,184.8,238.1,184.8C238.1,184.8,239.3,184.3,239.3,184.3C239.3,184.3,241.7,186.3,241.7,186.3C241.7,186.3,242.4,186.3,242.4,186.3C242.4,186.3,244.5,186.0,244.5,186.0C244.5,186.0,245.8,185.0,245.8,185.0C245.8,185.0,247.5,186.4,247.5,186.4C247.5,186.4,248.2,185.1,248.2,185.1C248.2,185.1,248.4,184.4,248.4,184.4C248.4,184.4,249.8,183.6,249.8,183.6C249.8,183.6,250.2,181.9,250.2,181.9C250.2,181.9,251.7,181.6,251.7,181.6C251.7,181.6,255.2,184.0,255.2,184.0C255.2,184.0,256.9,184.4,257.8,185.0C258.7,185.6,262.7,193.2,262.7,193.2C262.7,193.2,262.5,194.0,262.5,194.0C262.5,194.0,265.8,195.5,265.8,195.5C265.8,195.5,266.7,197.0,266.7,197.0C266.7,197.0,268.2,197.7,268.2,197.7C268.2,197.7,268.9,199.1,268.9,199.1C268.9,199.1,267.9,199.6,267.9,199.6C267.9,199.6,266.2,199.0,266.2,199.0C266.2,199.0,263.9,199.0,263.9,199.0C263.9,199.0,261.8,198.3,261.8,198.3C261.8,198.3,260.9,199.0,260.9,199.0C260.9,199.0,262.9,199.6,262.9,199.6C262.9,199.6,264.8,200.4,264.8,200.4C264.8,200.4,266.8,201.3,266.8,201.3C266.8,201.3,266.8,201.3,266.8,201.3"
	    }, {
	        name: '湖北',
	        path: "M203.2,224.6C203.2,224.6,204.1,222.6,204.1,222.6C204.1,222.6,206.6,220.4,206.6,220.4C206.6,220.4,209.1,221.4,209.1,221.4C209.1,221.4,210.6,220.4,210.6,220.4C210.6,220.4,209.3,218.9,209.3,218.9C209.3,218.9,210.0,218.2,210.0,218.2C210.0,218.2,216.6,218.6,216.6,218.6C216.6,218.6,218.9,220.1,218.9,220.1C218.9,220.1,220.0,220.8,220.0,220.8C220.0,220.8,221.8,219.7,221.8,219.7C221.8,219.7,223.1,219.3,223.1,219.3C223.1,219.3,223.4,220.8,223.4,220.8C223.4,220.8,224.3,220.8,224.3,220.8C224.3,220.8,225.0,219.8,225.0,219.8C225.0,219.8,226.5,218.4,226.5,218.4C226.5,218.4,227.2,219.4,227.2,219.4C227.2,219.4,227.2,221.4,227.2,221.4C227.2,221.4,227.8,222.3,227.8,222.3C227.8,222.3,229.1,222.6,229.1,222.6C229.1,222.6,230.5,221.1,230.5,221.1C230.5,221.1,232.7,220.4,232.7,220.4C232.7,220.4,236.7,216.7,236.7,216.7C236.7,216.7,238.5,216.9,238.5,216.9C238.5,216.9,240.8,216.1,240.8,216.1C240.8,216.1,238.1,211.0,238.1,211.0C238.1,211.0,238.9,209.4,238.9,209.4C238.9,209.4,238.6,208.9,238.6,208.9C238.6,208.9,237.2,208.4,237.2,208.4C237.2,208.4,234.8,207.0,234.8,207.0C234.8,207.0,233.6,206.3,233.6,206.3C233.6,206.3,232.1,207.0,232.1,207.0C232.1,207.0,230.3,205.5,230.3,205.5C230.3,205.5,228.1,205.5,228.1,205.5C228.1,205.5,226.3,204.6,226.3,204.6C226.3,204.6,225.9,203.2,225.9,203.2C225.9,203.2,225.0,202.3,225.0,202.3C225.0,202.3,223.8,203.0,223.8,203.0C223.8,203.0,222.7,202.5,222.7,202.5C222.7,202.5,217.9,202.9,219.1,203.0C220.3,203.1,215.2,202.2,215.2,202.2C215.2,202.2,210.5,198.0,210.5,198.0C210.5,198.0,209.2,199.0,209.2,199.0C209.2,199.0,208.6,198.6,208.6,198.6C208.6,198.6,207.7,198.6,207.7,198.6C207.7,198.6,203.4,198.6,203.4,198.6C203.4,198.6,202.8,199.1,202.8,199.1C202.8,199.1,204.1,200.4,204.1,200.4C204.1,200.4,205.3,200.7,205.3,200.7C205.3,200.7,206.5,201.1,206.5,201.1C206.5,201.1,205.9,202.0,205.9,202.0C205.9,202.0,203.8,203.0,203.8,203.0C203.8,203.0,203.4,204.7,203.4,204.7C203.4,204.7,203.8,205.3,203.8,205.3C203.8,205.3,204.1,207.5,204.1,207.5C204.1,207.5,205.3,207.6,205.3,207.6C205.3,207.6,206.6,209.3,206.6,209.3C206.6,209.3,207.2,212.6,207.2,212.6C207.2,212.6,206.8,213.7,206.8,213.7C206.8,213.7,205.9,213.4,205.9,213.4C205.9,213.4,203.5,215.3,203.5,215.3C203.5,215.3,199.3,216.0,199.3,216.0C199.3,216.0,198.2,217.2,198.2,217.2C198.2,217.2,199.1,218.3,199.1,218.3C199.1,218.3,199.2,220.7,199.2,220.7C199.2,220.7,200.3,221.0,200.3,221.0C200.3,221.0,203.2,224.6,203.2,224.6C203.2,224.6,203.2,224.6,203.2,224.6"
	    }, {
	        name: '西藏',
	        path: "M101.2,229.7C101.2,229.7,104.6,230.1,104.6,230.1C104.6,230.1,105.7,231.7,105.7,231.7C105.7,231.7,106.3,232.0,106.3,232.0C106.3,232.0,111.5,231.0,111.5,231.0C111.5,231.0,111.7,230.1,111.7,230.1C111.7,230.1,112.8,229.6,112.8,229.6C112.8,229.6,115.2,227.6,115.2,227.6C115.2,227.6,117.3,227.3,117.3,227.3C117.3,227.3,119.3,226.0,119.3,226.0C119.3,226.0,123.2,223.9,123.2,223.9C123.2,223.9,123.6,224.6,123.6,224.6C123.6,224.6,126.5,225.5,126.5,225.5C126.5,225.5,130.6,223.4,130.6,223.4C130.6,223.4,131.9,224.3,131.9,224.3C131.9,224.3,130.7,226.0,130.7,226.0C130.7,226.0,131.2,226.4,131.2,226.4C131.2,226.4,132.9,226.4,132.9,226.4C132.9,226.4,133.1,227.2,133.1,227.2C133.1,227.2,131.6,229.7,131.6,229.7C131.6,229.7,132.1,230.1,132.1,230.1C132.1,230.1,132.9,230.1,132.9,230.1C132.9,230.1,137.1,231.3,137.1,231.3C137.1,231.3,138.9,229.7,138.9,229.7C138.9,229.7,141.6,231.9,141.6,231.9C141.6,231.9,142.5,230.8,142.5,230.8C142.5,230.8,143.2,231.6,143.2,231.6C143.2,231.6,144.1,231.6,144.1,231.6C144.1,231.6,144.5,230.8,144.5,230.8C144.5,230.8,144.3,227.6,144.3,227.6C144.3,227.6,145.0,227.2,145.0,227.2C145.0,227.2,146.8,225.0,146.8,225.0C146.8,225.0,146.5,216.7,146.5,216.7C146.5,216.7,144.9,212.6,144.9,212.6C144.9,212.6,146.0,211.7,146.0,211.7C146.0,211.7,142.8,205.7,142.8,205.7C142.8,205.7,138.8,202.6,138.8,202.6C138.8,202.6,137.6,203.3,137.6,203.3C137.6,203.3,137.8,205.1,137.8,205.1C137.8,205.1,134.3,209.6,134.3,209.6C134.3,209.6,128.6,208.4,128.6,208.4C128.6,208.4,128.2,206.3,128.2,206.3C128.2,206.3,124.6,203.4,124.6,203.4C124.6,203.4,116.8,202.2,116.8,202.2C116.8,202.2,113.4,201.6,113.4,201.6C113.4,201.6,112.0,201.4,112.0,201.4C112.0,201.4,109.1,199.0,109.1,199.0C109.1,199.0,102.9,197.6,102.9,197.6C102.9,197.6,98.6,189.3,98.6,189.3C98.6,189.3,98.5,187.0,98.5,187.0C98.5,187.0,100.2,186.1,100.2,186.1C100.2,186.1,100.2,183.6,100.2,183.6C100.2,183.6,101.5,180.4,101.5,180.4C101.5,180.4,100.0,179.0,100.0,179.0C100.0,179.0,101.9,177.4,101.9,177.4C101.9,177.4,100.7,176.7,100.7,176.7C100.7,176.7,97.9,176.7,97.9,176.7C97.9,176.7,92.8,174.4,92.8,174.4C92.8,174.4,89.5,174.4,89.5,174.4C89.5,174.4,86.9,175.1,86.9,175.1C86.9,175.1,84.1,175.1,84.1,175.1C84.1,175.1,79.6,177.6,79.6,177.6C79.6,177.6,76.0,177.1,76.0,177.1C76.0,177.1,72.5,178.4,72.5,178.4C72.5,178.4,69.5,177.4,69.5,177.4C69.5,177.4,67.6,175.8,67.6,175.8C67.6,175.8,62.9,175.1,62.9,175.1C62.9,175.1,59.8,177.3,59.8,177.3C59.8,177.3,58.1,176.6,58.1,176.6C58.1,176.6,56.6,175.4,56.6,175.4C56.6,175.4,53.2,174.6,53.2,174.6C53.2,174.6,52.6,174.0,52.6,174.0C52.6,174.0,51.2,173.9,51.2,173.9C51.2,173.9,46.3,176.8,46.3,176.8C46.3,176.8,41.1,176.2,41.1,176.2C41.1,176.2,42.3,178.4,42.3,178.4C42.3,178.4,43.7,179.4,43.7,179.4C43.7,179.4,43.3,181.3,43.3,181.3C43.3,181.3,43.1,183.2,43.1,183.2C43.1,183.2,43.3,184.5,43.3,184.5C43.3,184.5,43.3,184.5,43.3,184.5C43.3,184.5,43.2,186.1,43.2,186.1C43.2,186.1,44.9,187.9,44.9,187.9C44.9,187.9,45.0,190.3,45.0,190.3C45.0,190.3,44.5,191.3,44.5,191.3C44.5,191.3,41.9,191.6,41.9,191.6C41.9,191.6,40.6,190.1,40.6,190.1C40.6,190.1,39.3,190.3,39.3,190.3C39.3,190.3,39.1,191.4,39.1,191.4C39.1,191.4,39.8,193.3,39.8,193.3C39.8,193.3,40.0,194.6,40.0,194.6C40.0,194.6,40.0,196.3,40.0,196.3C40.0,196.3,39.6,197.4,39.6,197.4C39.6,197.4,39.8,198.4,39.8,198.4C39.8,198.4,41.4,198.6,41.4,198.6C41.4,198.6,42.3,200.1,42.3,200.1C42.3,200.1,46.2,203.2,46.2,203.2C46.2,203.2,46.2,204.1,46.2,204.1C46.2,204.1,49.1,207.3,49.1,207.3C49.1,207.3,50.0,208.4,50.0,208.4C50.0,208.4,50.9,208.7,50.9,208.7C50.9,208.7,52.6,207.0,52.6,207.0C52.6,207.0,54.2,208.4,54.2,208.4C54.2,208.4,61.9,215.2,60.7,214.0C59.6,212.8,61.9,216.9,61.9,216.9C61.9,216.9,63.4,216.9,63.4,216.9C63.4,216.9,64.2,216.0,64.2,216.0C64.2,216.0,64.9,216.7,64.9,216.7C64.9,216.7,64.9,219.3,64.9,219.3C64.9,219.3,68.8,221.4,68.8,221.4C68.8,221.4,69.6,221.3,69.6,221.3C69.6,221.3,70.2,223.4,70.2,223.4C70.2,223.4,73.5,225.3,73.5,225.3C73.5,225.3,73.6,226.6,73.6,226.6C73.6,226.6,74.2,227.0,74.2,227.0C74.2,227.0,77.0,226.9,77.0,226.9C77.0,226.9,78.6,226.9,78.6,226.9C78.6,226.9,80.9,228.6,80.9,228.6C80.9,228.6,86.0,228.4,86.0,228.4C86.0,228.4,88.8,228.3,88.8,228.3C88.8,228.3,89.5,229.4,89.5,229.4C89.5,229.4,88.9,231.9,88.9,231.9C88.9,231.9,89.6,232.7,89.6,232.7C89.6,232.7,92.5,230.3,92.5,230.3C92.5,230.3,96.0,227.7,96.0,227.7C96.0,227.7,98.6,228.2,98.6,228.2C98.6,228.2,101.2,229.7,101.2,229.7C101.2,229.7,101.2,229.7,101.2,229.7"
	    }, {
	        name: '青海',
	        path: "M101.9,177.4C101.9,177.4,104.2,178.3,104.2,178.3C104.2,178.3,108.1,177.0,108.1,177.0C108.1,177.0,107.5,176.3,107.5,176.3C107.5,176.3,106.5,176.3,106.5,176.3C106.5,176.3,106.0,175.1,106.0,175.1C106.0,175.1,106.3,174.1,106.3,174.1C106.3,174.1,108.2,173.3,108.2,173.3C108.2,173.3,109.5,171.1,109.5,171.1C109.5,171.1,105.5,167.9,105.5,167.9C105.5,167.9,105.3,164.4,105.3,164.4C105.3,164.4,106.4,163.1,107.2,163.0C108.0,162.8,120.3,160.4,120.3,160.4C120.3,160.4,121.2,159.7,121.2,159.7C121.2,159.7,123.2,160.0,123.2,160.0C123.2,160.0,129.8,161.6,129.8,161.6C129.8,161.6,131.8,162.7,131.8,162.7C131.8,162.7,134.6,164.4,134.6,164.4C134.6,164.4,136.5,164.3,136.5,164.3C136.5,164.3,139.3,162.6,139.3,162.6C139.3,162.6,143.1,163.2,143.1,163.2C143.1,163.2,145.5,161.9,145.5,161.9C145.5,161.9,150.5,165.0,150.5,165.0C150.5,165.0,153.2,164.0,153.2,164.0C153.2,164.0,154.6,167.4,154.6,167.4C154.6,167.4,158.1,169.6,158.1,169.6C158.1,169.6,160.6,171.9,160.6,171.9C160.6,171.9,162.5,171.1,162.5,171.1C162.5,171.1,166.0,175.8,166.0,175.8C166.0,175.8,166.8,178.9,166.8,178.9C166.8,178.9,168.1,180.7,168.1,180.7C168.1,180.7,167.7,184.3,167.7,184.3C167.7,184.3,164.8,186.6,164.8,186.6C164.8,186.6,165.3,188.0,165.3,188.0C165.3,188.0,164.2,189.1,164.2,189.1C164.2,189.1,162.8,190.4,162.8,190.4C162.8,190.4,162.8,192.9,162.8,192.9C162.8,192.9,161.5,193.9,161.5,193.9C161.5,193.9,159.9,193.4,159.9,193.4C159.9,193.4,158.6,192.1,158.6,192.1C158.6,192.1,157.9,193.6,157.9,193.6C157.9,193.6,158.8,194.8,158.8,194.8C158.8,194.8,161.0,195.1,161.0,195.1C161.0,195.1,163.2,197.3,163.2,197.3C163.2,197.3,164.5,197.3,164.5,197.3C164.5,197.3,165.5,198.4,165.5,198.4C165.5,198.4,164.6,200.4,164.6,200.4C164.6,200.4,164.6,200.5,164.6,200.5C164.6,200.5,162.8,200.3,162.8,200.3C162.8,200.3,161.5,201.3,161.5,201.3C161.5,201.3,160.6,199.8,160.6,199.8C160.6,199.8,158.4,200.7,158.4,200.7C158.4,200.7,157.8,201.9,157.8,201.9C157.8,201.9,157.8,203.6,157.8,203.6C157.8,203.6,155.5,204.0,155.5,204.0C155.5,204.0,152.6,201.1,152.6,201.1C152.6,201.1,151.8,199.7,151.8,199.7C151.8,199.7,149.5,200.4,149.5,200.4C149.5,200.4,145.6,199.3,145.6,199.3C145.6,199.3,139.8,200.1,139.8,200.1C139.8,200.1,139.3,200.7,139.3,200.7C139.3,200.7,138.8,202.6,138.8,202.6C138.8,202.6,137.6,203.3,137.6,203.3C137.6,203.3,137.8,205.1,137.8,205.1C137.8,205.1,134.3,209.6,134.3,209.6C134.3,209.6,128.6,208.4,128.6,208.4C128.6,208.4,128.2,206.3,128.2,206.3C128.2,206.3,124.6,203.4,124.6,203.4C124.6,203.4,116.7,202.2,116.7,202.2C116.7,202.2,113.4,201.6,113.4,201.6C113.4,201.6,112.0,201.4,112.0,201.4C112.0,201.4,109.1,199.0,109.1,199.0C109.1,199.0,102.9,197.6,102.9,197.6C102.9,197.6,98.6,189.3,98.6,189.3C98.6,189.3,98.5,187.0,98.5,187.0C98.5,187.0,100.2,186.1,100.2,186.1C100.2,186.1,100.2,183.6,100.2,183.6C100.2,183.6,101.4,180.4,101.4,180.4C101.4,180.4,100.0,179.0,100.0,179.0C100.0,179.0,101.9,177.4,101.9,177.4C101.9,177.4,101.9,177.4,101.9,177.4"
	    }, {
	        name: '甘肃',
	        path: "M123.2,160.0C123.2,160.0,122.5,151.7,122.5,151.7C122.5,151.7,122.9,150.0,122.9,150.0C122.9,150.0,125.3,148.9,125.3,148.9C125.3,148.9,127.9,146.4,128.8,146.0C129.6,145.7,134.1,143.9,134.1,143.9C134.1,143.9,136.2,142.9,136.2,142.9C136.2,142.9,136.2,140.8,136.2,140.8C136.2,140.8,137.2,139.7,137.2,139.7C137.2,139.7,138.1,139.8,138.1,139.8C138.1,139.8,141.6,140.4,141.6,140.4C141.6,140.4,141.5,142.0,141.5,142.0C141.5,142.0,142.2,144.4,142.2,144.4C142.2,144.4,141.8,148.4,141.8,148.4C141.8,148.4,144.8,152.9,144.8,152.9C144.8,152.9,146.3,153.9,146.3,153.9C146.3,153.9,148.8,152.0,148.8,152.0C148.8,152.0,153.9,152.0,153.9,152.0C153.9,152.0,155.2,152.4,155.2,152.4C155.2,152.4,155.9,153.6,155.9,153.6C155.9,153.6,155.3,154.8,155.3,154.8C155.3,154.8,152.5,157.1,152.5,157.1C152.5,157.1,152.8,158.3,152.8,158.3C152.8,158.3,156.0,160.7,156.0,160.7C156.0,160.7,157.4,160.7,157.4,160.7C157.4,160.7,157.8,161.3,157.8,161.3C157.8,161.3,157.5,162.3,157.5,162.3C157.5,162.3,159.5,163.9,159.5,163.9C159.5,163.9,164.2,164.6,164.2,164.6C164.2,164.6,166.5,164.0,166.5,164.0C166.5,164.0,169.3,161.1,169.3,161.1C169.3,161.1,172.8,161.4,172.8,161.4C172.8,161.4,174.2,163.6,174.2,163.6C174.2,163.6,173.4,165.5,173.4,165.5C173.4,165.5,173.6,166.7,173.6,166.7C173.6,166.7,171.8,167.9,171.8,167.9C171.8,167.9,170.9,168.9,170.9,168.9C170.9,168.9,171.2,171.3,171.2,171.3C171.2,171.3,174.5,173.6,174.5,173.6C174.5,173.6,175.9,173.3,175.9,173.3C175.9,173.3,179.8,178.0,179.8,178.0C179.8,178.0,180.6,181.6,180.6,181.6C180.6,181.6,180.2,183.3,180.2,183.3C180.2,183.3,182.9,184.7,182.9,184.7C182.9,184.7,182.9,185.8,182.9,185.8C182.9,185.8,185.3,186.4,185.3,186.4C185.3,186.4,186.0,186.4,186.0,186.4C186.0,186.4,186.0,184.4,186.0,184.4C186.0,184.4,187.9,184.1,187.9,184.1C187.9,184.1,188.4,181.7,188.4,181.7C188.4,181.7,187.1,180.7,187.1,180.7C187.1,180.7,186.0,179.7,186.0,179.7C186.0,179.7,186.5,175.1,186.5,175.1C186.5,175.1,187.5,174.6,187.5,174.6C187.5,174.6,189.2,175.3,189.2,175.3C189.2,175.3,189.9,175.0,189.9,175.0C189.9,175.0,190.3,175.8,190.3,175.8C190.3,175.8,194.9,178.2,194.9,178.2C194.9,178.2,197.4,179.7,197.4,179.7C197.4,179.7,197.8,181.1,197.8,181.1C197.8,181.1,196.5,183.0,196.5,183.0C196.5,183.0,197.2,185.1,197.2,185.1C197.2,185.1,196.8,186.1,196.8,186.1C196.8,186.1,193.4,186.4,193.4,186.4C193.4,186.4,192.7,186.9,192.7,186.9C192.7,186.9,192.9,187.4,192.9,187.4C192.9,187.4,192.9,188.4,192.9,188.4C192.9,188.4,190.2,188.7,190.2,188.7C190.2,188.7,188.8,188.0,188.8,188.0C188.8,188.0,186.9,188.0,186.9,188.0C186.9,188.0,186.6,188.4,186.6,188.4C186.6,188.4,186.9,189.4,186.9,189.4C186.9,189.4,186.1,190.4,186.1,190.4C186.1,190.4,185.8,191.6,185.8,191.6C185.8,191.6,187.5,193.0,187.5,193.0C187.5,193.0,186.2,195.5,186.2,195.5C186.2,195.5,186.8,196.9,186.8,196.9C186.8,196.9,186.6,197.4,186.6,197.4C186.6,197.4,184.6,197.4,184.6,197.4C184.6,197.4,183.2,198.2,183.2,198.2C183.2,198.2,184.3,199.7,184.3,199.7C184.3,199.7,183.6,201.7,183.6,201.7C183.6,201.7,181.5,202.3,181.5,202.3C181.5,202.3,181.6,203.3,181.6,203.3C181.6,203.3,181.1,204.0,181.1,204.0C181.1,204.0,177.4,203.7,177.4,203.7C177.4,203.7,175.9,202.7,175.9,202.7C175.9,202.7,175.6,200.4,175.6,200.4C175.6,200.4,174.8,199.6,174.8,199.6C174.8,199.6,173.5,200.4,173.5,200.4C173.5,200.4,171.2,198.2,171.2,198.2C171.2,198.2,169.5,197.0,169.5,197.0C169.5,197.0,169.3,195.3,169.3,195.3C169.3,195.3,168.8,194.0,168.8,194.0C168.8,194.0,167.9,194.0,167.9,194.0C167.9,194.0,164.3,195.5,164.3,195.5C164.3,195.5,164.5,197.3,164.5,197.3C164.5,197.3,163.2,197.3,163.2,197.3C163.2,197.3,161.0,195.1,161.0,195.1C161.0,195.1,158.8,194.8,158.8,194.8C158.8,194.8,157.9,193.6,157.9,193.6C157.9,193.6,158.6,192.1,158.6,192.1C158.6,192.1,159.9,193.4,159.9,193.4C159.9,193.4,161.5,193.9,161.5,193.9C161.5,193.9,162.8,192.9,162.8,192.9C162.8,192.9,162.8,190.4,162.8,190.4C162.8,190.4,164.2,189.1,164.2,189.1C164.2,189.1,165.3,188.0,165.3,188.0C165.3,188.0,164.8,186.6,164.8,186.6C164.8,186.6,167.7,184.3,167.7,184.3C167.7,184.3,168.1,180.7,168.1,180.7C168.1,180.7,166.8,178.9,166.8,178.9C166.8,178.9,166.0,175.8,166.0,175.8C166.0,175.8,162.5,171.1,162.5,171.1C162.5,171.1,160.6,171.9,160.6,171.9C160.6,171.9,158.1,169.6,158.1,169.6C158.1,169.6,154.6,167.4,154.6,167.4C154.6,167.4,153.2,164.0,153.2,164.0C153.2,164.0,150.5,165.0,150.5,165.0C150.5,165.0,145.5,161.9,145.5,161.9C145.5,161.9,143.1,163.2,143.1,163.2C143.1,163.2,139.3,162.6,139.3,162.6C139.3,162.6,136.5,164.3,136.5,164.3C136.5,164.3,134.6,164.4,134.6,164.4C134.6,164.4,131.8,162.7,131.8,162.7C131.8,162.7,129.8,161.6,129.8,161.6C129.8,161.6,123.2,160.0,123.2,160.0C123.2,160.0,123.2,160.0,123.2,160.0"
	    }, {
	        name: '新疆',
	        path: "M101.9,94.7C101.9,94.7,103.1,94.7,103.1,94.7C103.1,94.7,102.3,97.0,102.3,97.0C102.3,97.0,103.4,98.1,103.4,98.1C103.4,98.1,103.5,99.0,103.5,99.0C103.5,99.0,105.7,101.2,105.7,101.2C105.7,101.2,106.3,103.0,106.3,103.0C106.3,103.0,109.3,103.1,109.3,103.1C109.3,103.1,110.6,104.3,110.6,104.3C110.6,104.3,111.3,104.3,111.3,104.3C111.3,104.3,113.1,108.0,113.1,108.0C113.1,108.0,114.8,112.4,114.8,112.4C114.8,112.4,113.9,115.1,113.9,115.1C113.9,115.1,114.1,116.1,114.1,116.1C114.1,116.1,112.5,118.9,112.5,118.9C112.5,118.9,112.9,121.0,112.9,121.0C112.9,121.0,118.5,123.4,118.5,123.4C118.5,123.4,124.5,124.3,124.5,124.3C124.5,124.3,130.7,128.6,130.7,128.6C130.7,128.6,132.8,129.3,132.8,129.3C132.8,129.3,132.9,130.4,132.9,130.4C132.9,130.4,134.2,133.2,134.2,133.2C134.2,133.2,135.5,136.7,135.5,136.7C135.5,136.7,137.2,139.7,137.2,139.7C137.2,139.7,136.2,140.8,136.2,140.8C136.2,140.8,136.2,142.9,136.2,142.9C136.2,142.9,134.1,143.9,134.1,143.9C134.1,143.9,128.8,146.0,128.8,146.0C128.8,146.0,125.3,148.9,125.3,148.9C125.3,148.9,122.9,150.0,122.9,150.0C122.9,150.0,122.5,151.7,122.5,151.7C122.5,151.7,123.2,160.0,123.2,160.0C123.2,160.0,121.2,159.7,121.2,159.7C121.2,159.7,120.3,160.4,120.3,160.4C120.3,160.4,107.2,163.0,107.2,163.0C107.2,163.0,105.3,164.4,105.3,164.4C105.3,164.4,105.5,167.9,105.5,167.9C105.5,167.9,109.5,171.1,109.5,171.1C109.5,171.1,108.2,173.3,108.2,173.3C108.2,173.3,106.3,174.1,106.3,174.1C106.3,174.1,106.0,175.1,106.0,175.1C106.0,175.1,106.5,176.3,106.5,176.3C106.5,176.3,107.5,176.3,107.5,176.3C107.5,176.3,108.1,177.0,108.1,177.0C108.1,177.0,104.2,178.3,104.2,178.3C104.2,178.3,101.9,177.4,101.9,177.4C101.9,177.4,100.7,176.7,100.7,176.7C100.7,176.7,97.9,176.7,97.9,176.7C97.9,176.7,92.8,174.4,92.8,174.4C92.8,174.4,89.5,174.4,89.5,174.4C89.5,174.4,86.9,175.1,86.9,175.1C86.9,175.1,84.1,175.1,84.1,175.1C84.1,175.1,79.6,177.6,79.6,177.6C79.6,177.6,76.0,177.1,76.0,177.1C76.0,177.1,72.5,178.4,72.5,178.4C72.5,178.4,69.5,177.4,69.5,177.4C69.5,177.4,67.6,175.8,67.6,175.8C67.6,175.8,62.9,175.1,62.9,175.1C62.9,175.1,59.8,177.3,59.8,177.3C59.8,177.3,58.1,176.6,58.1,176.6C58.1,176.6,56.6,175.4,56.6,175.4C56.6,175.4,53.2,174.6,53.2,174.6C53.2,174.6,52.6,174.0,52.6,174.0C52.6,174.0,51.2,173.9,51.2,173.9C51.2,173.9,46.3,176.8,46.3,176.8C46.3,176.8,41.3,176.2,41.3,176.2C41.3,176.2,40.9,176.0,40.9,176.0C40.9,176.0,41.4,171.7,41.4,171.7C41.4,171.7,39.2,171.1,39.2,171.1C39.2,171.1,34.5,167.7,34.5,167.7C34.5,167.7,33.2,167.6,33.2,167.6C33.2,167.6,32.2,165.3,32.2,165.3C32.2,165.3,32.9,163.0,32.9,163.0C32.9,163.0,32.6,161.9,32.6,161.9C32.6,161.9,30.9,160.7,30.9,160.7C30.9,160.7,30.3,159.6,30.3,159.6C30.3,159.6,26.7,157.6,26.7,157.6C26.7,157.6,26.7,157.0,26.7,157.0C26.7,157.0,28.5,156.3,28.5,156.3C28.5,156.3,29.5,156.8,29.5,156.8C29.5,156.8,30.5,155.8,30.5,155.8C30.5,155.8,30.2,152.4,30.2,152.4C30.2,152.4,30.5,149.6,30.5,149.6C30.5,149.6,28.2,147.3,28.2,147.3C28.2,147.3,26.6,147.7,26.6,147.7C26.6,147.7,26.0,146.0,26.0,146.0C26.0,146.0,26.9,144.3,26.9,144.3C26.9,144.3,26.4,142.7,26.4,142.7C26.4,142.7,28.0,141.3,28.0,141.3C28.0,141.3,28.6,140.7,28.6,140.7C28.6,140.7,28.6,139.4,28.6,139.4C28.6,139.4,30.7,138.4,30.7,138.4C30.7,138.4,32.9,138.0,32.9,138.0C32.9,138.0,34.8,137.3,34.8,137.3C34.8,137.3,36.3,137.7,36.3,137.7C36.3,137.7,37.5,137.3,37.5,137.3C37.5,137.3,37.9,137.6,37.9,137.6C37.9,137.6,38.0,139.0,38.0,139.0C38.0,139.0,39.1,139.4,39.1,139.4C39.1,139.4,41.4,139.3,41.4,139.3C41.4,139.3,43.2,136.9,44.2,136.2C45.1,135.6,49.8,137.4,49.8,137.4C49.8,137.4,52.6,135.4,52.6,135.4C52.6,135.4,60.9,133.6,60.9,133.6C60.9,133.6,61.4,132.4,61.4,132.4C61.4,132.4,62.2,129.3,62.2,129.3C62.2,129.3,64.5,127.4,64.5,127.4C64.5,127.4,65.2,127.4,65.2,127.4C65.2,127.4,65.2,126.5,65.2,126.5C65.2,126.5,65.3,118.6,65.3,118.6C65.3,118.6,65.7,117.0,65.7,117.0C65.7,117.0,63.5,116.1,63.5,116.1C63.5,116.1,63.4,115.5,63.4,115.5C63.4,115.5,65.7,114.8,65.7,114.8C65.7,114.8,71.9,114.3,71.9,114.3C71.9,114.3,72.9,115.5,72.9,115.5C72.9,115.5,75.0,116.0,75.0,116.0C75.0,116.0,75.6,116.1,75.6,116.1C75.6,116.1,76.4,115.0,76.4,115.0C76.4,115.0,75.3,113.9,75.3,113.9C75.3,113.9,79.9,104.6,79.9,104.6C79.9,104.6,80.6,104.1,80.6,104.1C80.6,104.1,84.8,106.1,84.8,106.1C84.8,106.1,86.6,106.1,86.6,106.1C86.6,106.1,87.5,107.3,87.5,107.3C87.5,107.3,91.5,106.0,91.5,106.0C91.5,106.0,92.5,99.4,92.5,99.4C92.5,99.4,94.2,98.3,94.2,98.3C94.2,98.3,96.2,98.1,96.2,98.1C96.2,98.1,97.6,96.4,97.6,96.4C97.6,96.4,98.2,94.7,98.2,94.7C98.2,94.7,99.3,94.1,99.3,94.1C99.3,94.1,101.9,94.7,101.9,94.7C101.9,94.7,101.9,94.7,101.9,94.7"
	    }, {
	        name: '陕西',
	        path: "M206.6,189.7C206.6,189.7,205.9,188.0,205.9,188.0C205.9,188.0,207.2,183.6,207.2,183.6C207.2,183.6,205.3,175.1,205.3,175.1C205.3,175.1,207.0,172.2,206.6,173.0C206.3,173.7,207.2,171.0,207.2,171.0C207.2,171.0,205.5,167.6,205.5,167.6C205.5,167.6,207.1,165.1,207.1,165.1C207.1,165.1,207.4,162.9,207.4,162.9C207.4,162.9,208.2,161.1,208.2,161.1C208.2,161.1,208.1,159.1,208.1,159.1C208.1,159.1,207.4,158.6,207.4,158.6C207.4,158.6,206.2,159.8,206.2,159.8C206.2,159.8,203.2,160.0,203.2,160.0C203.2,160.0,201.6,162.3,201.6,162.3C201.6,162.3,201.8,163.6,201.8,163.6C201.8,163.6,201.5,164.4,201.5,164.4C201.5,164.4,200.2,164.8,200.2,164.8C200.2,164.8,195.5,171.6,195.5,171.6C195.5,171.6,194.9,171.1,194.9,171.1C194.9,171.1,193.6,170.8,193.6,170.8C193.6,170.8,190.9,171.0,190.9,171.0C190.9,171.0,190.0,172.3,190.0,172.3C190.0,172.3,189.9,175.0,189.9,175.0C189.9,175.0,190.3,175.8,190.3,175.8C190.3,175.8,194.9,178.2,194.9,178.2C194.9,178.2,197.4,179.7,197.4,179.7C197.4,179.7,197.8,181.1,197.8,181.1C197.8,181.1,196.5,183.0,196.5,183.0C196.5,183.0,197.2,185.1,197.2,185.1C197.2,185.1,196.8,186.1,196.8,186.1C196.8,186.1,193.4,186.4,193.4,186.4C193.4,186.4,192.7,186.9,192.7,186.9C192.7,186.9,192.9,187.4,192.9,187.4C192.9,187.4,192.9,188.4,192.9,188.4C192.9,188.4,190.2,188.7,190.2,188.7C190.2,188.7,188.8,188.0,188.8,188.0C188.8,188.0,186.9,188.0,186.9,188.0C186.9,188.0,186.6,188.4,186.6,188.4C186.6,188.4,186.9,189.4,186.9,189.4C186.9,189.4,186.0,190.4,186.0,190.4C186.0,190.4,185.8,191.6,185.8,191.6C185.8,191.6,187.5,193.0,187.5,193.0C187.5,193.0,186.2,195.5,186.2,195.5C186.2,195.5,186.8,196.9,186.8,196.9C186.8,196.9,186.6,197.4,186.6,197.4C186.6,197.4,184.6,197.4,184.6,197.4C184.6,197.4,183.2,198.2,183.2,198.2C183.2,198.2,184.3,199.7,184.3,199.7C184.3,199.7,183.6,201.7,183.6,201.7C183.6,201.7,184.8,202.0,184.8,202.0C184.8,202.0,184.9,203.3,184.9,203.3C184.9,203.3,185.9,203.4,185.9,203.4C185.9,203.4,189.6,202.7,189.6,202.7C189.6,202.7,190.3,203.0,190.3,203.0C190.3,203.0,190.5,204.0,190.5,204.0C190.5,204.0,192.1,204.4,192.1,204.4C192.1,204.4,195.3,206.0,195.3,206.0C195.3,206.0,197.2,205.3,197.2,205.3C197.2,205.3,201.2,206.7,201.2,206.7C201.2,206.7,202.1,207.9,202.1,207.9C202.1,207.9,204.1,207.4,204.1,207.4C204.1,207.4,203.8,205.3,203.8,205.3C203.8,205.3,203.4,204.7,203.4,204.7C203.4,204.7,203.8,203.0,203.8,203.0C203.8,203.0,205.9,202.0,205.9,202.0C205.9,202.0,206.5,201.1,206.5,201.1C206.5,201.1,205.3,200.7,205.3,200.7C205.3,200.7,204.1,200.4,204.1,200.4C204.1,200.4,202.8,199.1,202.8,199.1C202.8,199.1,203.4,198.6,203.4,198.6C203.4,198.6,207.7,198.6,207.7,198.6C207.7,198.6,208.6,198.6,208.6,198.6C208.6,198.6,209.2,199.0,209.2,199.0C209.2,199.0,210.5,198.0,210.5,198.0C210.5,198.0,210.5,196.3,210.5,196.3C210.5,196.3,206.6,190.4,206.6,190.4C206.6,190.4,206.6,189.7,206.6,189.7C206.6,189.7,206.6,189.7,206.6,189.7C206.6,189.7,206.6,189.7,206.6,189.7"
	    }, {
	        name: '河南',
	        path: "M210.5,198.0C210.5,198.0,215.2,202.2,215.2,202.2C215.2,202.2,219.1,203.0,219.1,203.0C219.1,203.0,222.7,202.4,222.7,202.4C222.7,202.4,223.8,203.0,223.8,203.0C223.8,203.0,225.0,202.3,225.0,202.3C225.0,202.3,225.9,203.2,225.9,203.2C225.9,203.2,226.4,204.6,226.4,204.6C226.4,204.6,228.1,205.5,228.1,205.5C228.1,205.5,230.3,205.5,230.3,205.5C230.3,205.5,232.1,207.0,232.1,207.0C232.1,207.0,233.6,206.3,233.6,206.3C233.6,206.3,234.8,207.0,234.8,207.0C234.8,207.0,235.8,205.0,235.8,205.0C235.8,205.0,237.2,204.3,237.2,204.3C237.2,204.3,237.5,202.7,237.5,202.7C237.5,202.7,236.9,199.8,236.9,199.8C236.9,199.8,236.7,199.6,236.7,199.6C236.7,199.6,235.2,201.0,235.2,201.0C235.2,201.0,233.1,199.3,233.1,199.3C233.1,199.3,231.5,197.3,231.5,197.3C231.5,197.3,233.1,196.1,233.1,196.1C233.1,196.1,233.5,194.1,233.5,194.1C233.5,194.1,234.5,193.4,234.5,193.4C234.5,193.4,234.3,190.7,234.3,190.7C234.3,190.7,235.0,190.1,235.0,190.1C235.0,190.1,236.4,191.0,236.4,191.0C236.4,191.0,237.2,192.1,237.2,192.1C237.2,192.1,238.9,191.0,238.9,191.0C238.9,191.0,239.5,190.3,239.5,190.3C239.5,190.3,239.2,189.0,239.2,189.0C239.2,189.0,237.2,187.9,237.2,187.9C237.2,187.9,236.8,186.5,236.8,186.5C236.8,186.5,233.2,187.0,233.2,187.0C233.2,187.0,230.9,185.0,230.9,185.0C230.9,185.0,229.9,184.7,229.9,184.7C229.9,184.7,229.9,183.4,229.9,183.4C229.9,183.4,234.9,177.9,234.9,177.9C234.9,177.9,233.1,178.3,233.1,178.3C233.1,178.3,231.9,179.1,231.9,179.1C231.9,179.1,231.5,178.4,231.5,178.4C231.5,178.4,231.5,177.6,231.5,177.6C231.5,177.6,230.6,177.3,230.6,177.3C230.6,177.3,228.4,178.2,228.4,178.2C228.4,178.2,222.7,177.4,222.7,177.4C222.7,177.4,222.4,182.1,222.4,182.1C222.4,182.1,219.1,184.7,219.6,184.3C220.2,183.8,215.9,185.0,215.9,185.0C215.9,185.0,210.8,188.6,210.8,188.6C210.8,188.6,206.6,189.7,206.6,189.7C206.6,189.7,206.6,190.4,206.6,190.4C206.6,190.4,210.5,196.3,210.5,196.3C210.5,196.3,210.5,198.0,210.5,198.0C210.5,198.0,210.5,198.0,210.5,198.0C210.5,198.0,210.5,198.0,210.5,198.0"
	    }, {
	        name: '山西',
	        path: "M206.6,189.7C206.6,189.7,210.8,188.6,210.8,188.6C210.8,188.6,215.9,185.0,215.9,185.0C215.9,185.0,219.6,184.3,219.6,184.3C219.6,184.3,222.4,182.1,222.4,182.1C222.4,182.1,222.7,177.4,222.7,177.4C222.7,177.4,221.4,175.7,221.4,175.7C221.4,175.7,221.8,174.3,221.8,174.3C221.8,174.3,222.7,173.0,222.7,173.0C222.7,173.0,222.9,171.0,222.9,171.0C222.9,171.0,223.8,169.6,223.8,169.6C223.8,169.6,222.4,166.7,222.4,166.7C222.4,166.7,220.3,164.4,220.3,164.4C220.3,164.4,221.5,160.7,221.5,160.7C221.5,160.7,223.9,159.1,223.9,159.1C223.9,159.1,224.3,156.7,224.3,156.7C224.3,156.7,223.4,154.6,223.4,154.6C223.4,154.6,223.4,152.0,223.4,152.0C223.4,152.0,221.8,150.5,221.8,150.5C221.8,150.5,218.1,152.4,218.1,152.4C218.1,152.4,217.5,151.8,217.5,151.8C217.5,151.8,215.5,153.3,215.5,153.3C215.5,153.3,213.9,153.2,213.9,153.2C213.9,153.2,210.8,157.7,210.8,157.7C210.8,157.7,209.8,157.7,209.8,157.7C209.8,157.7,208.1,159.1,208.1,159.1C208.1,159.1,208.2,161.1,208.2,161.1C208.2,161.1,207.4,162.9,207.4,162.9C207.4,162.9,207.1,165.1,207.1,165.1C207.1,165.1,205.5,167.6,205.5,167.6C205.5,167.6,207.2,171.0,207.2,171.0C207.2,171.0,206.6,173.0,206.6,173.0C206.6,173.0,205.3,175.1,205.3,175.1C205.3,175.1,207.4,184.6,207.2,183.6C207.0,182.5,205.9,188.0,205.9,188.0C205.9,188.0,206.6,189.7,206.6,189.7C206.6,189.7,206.6,189.7,206.6,189.7"
	    }, {
	        name: '山东',
	        path: "M237.8,186.3C237.8,186.3,238.1,184.8,238.1,184.8C238.1,184.8,239.3,184.3,239.3,184.3C239.3,184.3,241.7,186.3,241.7,186.3C241.7,186.3,242.4,186.3,242.4,186.3C242.4,186.3,244.5,186.0,244.5,186.0C244.5,186.0,245.8,185.0,245.8,185.0C245.8,185.0,247.5,186.4,247.5,186.4C247.5,186.4,248.2,185.1,248.2,185.1C248.2,185.1,248.4,184.4,248.4,184.4C248.4,184.4,249.8,183.6,249.8,183.6C249.8,183.6,250.2,181.9,250.2,181.9C250.2,181.9,251.7,181.6,251.7,181.6C251.7,181.6,255.6,174.8,255.6,174.8C255.6,174.8,254.9,173.7,254.9,173.7C254.9,173.7,255.6,173.0,255.6,173.0C255.6,173.0,256.5,173.3,256.5,173.3C256.5,173.3,257.8,172.6,257.8,172.6C257.8,172.6,258.5,171.0,258.5,171.0C258.5,171.0,261.8,168.0,261.8,168.0C261.8,168.0,264.3,167.1,264.3,167.1C264.3,167.1,265.5,166.0,265.5,166.0C265.5,166.0,265.2,163.6,265.2,163.6C265.2,163.6,263.5,163.4,263.5,163.4C263.5,163.4,259.6,163.9,259.6,163.9C259.6,163.9,257.0,162.6,257.0,162.6C257.0,162.6,255.3,162.9,255.3,162.9C255.3,162.9,251.4,168.0,251.4,168.0C251.4,168.0,250.2,168.7,250.2,168.7C250.2,168.7,247.7,167.6,247.7,167.6C247.7,167.6,247.5,166.3,247.5,166.3C247.5,166.3,247.0,164.0,247.0,164.0C247.0,164.0,245.5,163.2,245.5,163.2C245.5,163.2,243.2,163.7,243.2,163.7C243.2,163.7,241.8,162.7,241.8,162.7C241.8,162.7,239.6,165.4,239.6,165.4C239.6,165.4,237.4,166.0,237.4,166.0C237.4,166.0,233.1,169.9,234.2,168.9C235.3,167.8,230.8,175.1,230.8,175.1C230.8,175.1,231.6,176.8,231.6,176.8C231.6,176.8,231.5,177.6,231.5,177.6C231.5,177.6,231.5,178.4,231.5,178.4C231.5,178.4,231.9,179.1,231.9,179.1C231.9,179.1,233.1,178.3,233.1,178.3C233.1,178.3,234.9,177.9,234.9,177.9C234.9,177.9,229.9,183.4,229.9,183.4C229.9,183.4,229.9,184.7,229.9,184.7C229.9,184.7,230.9,185.0,230.9,185.0C230.9,185.0,233.2,187.0,233.2,187.0C233.2,187.0,236.8,186.6,236.8,186.6C236.8,186.6,237.8,186.3,237.8,186.3C237.8,186.3,237.8,186.3,237.8,186.3"
	    }, {
	        name: '河北',
	        path: "M231.5,177.6C231.5,177.6,231.6,176.9,231.6,176.9C231.6,176.9,230.8,175.1,230.8,175.1C230.8,175.1,234.2,168.9,234.2,168.9C234.2,168.9,238.6,164.9,237.4,166.0C236.2,167.1,239.6,165.4,239.6,165.4C239.6,165.4,241.8,162.7,241.8,162.7C241.8,162.7,240.9,162.1,240.9,162.1C240.9,162.1,240.2,160.2,240.2,160.2C240.2,160.2,238.5,160.8,238.5,160.8C238.5,160.8,235.8,160.1,235.8,160.1C235.8,160.1,235.6,159.4,235.6,159.4C235.6,159.4,235.5,154.8,235.5,154.8C235.5,154.8,237.4,154.0,237.4,154.0C237.4,154.0,237.2,153.2,237.2,153.2C237.2,153.2,237.1,153.2,237.1,153.2C237.1,153.2,237.5,151.4,237.5,151.4C237.5,151.4,234.9,152.4,234.9,152.4C234.9,152.4,235.3,153.4,235.3,153.4C235.3,153.4,235.4,154.1,235.4,154.1C235.4,154.1,235.5,154.8,235.5,154.8C235.5,154.8,234.1,155.4,234.1,155.4C234.1,155.4,233.2,156.3,233.2,156.3C233.2,156.3,231.4,155.7,231.4,155.7C231.4,155.7,228.9,156.1,228.9,156.1C228.9,156.1,228.5,155.0,228.5,155.0C228.5,155.0,228.8,152.9,228.8,152.9C228.8,152.9,230.6,150.7,230.6,150.7C230.6,150.7,231.1,148.3,231.1,148.3C231.1,148.3,232.9,146.4,232.9,146.4C232.9,146.4,236.2,148.2,236.2,148.2C236.2,148.2,237.1,148.2,237.1,148.2C237.1,148.2,237.7,150.5,237.7,150.5C237.7,150.5,238.6,151.0,238.6,151.0C238.6,151.0,239.1,152.6,239.1,152.6C239.1,152.6,238.9,153.6,238.9,153.6C238.9,153.6,240.9,155.0,240.9,155.0C240.9,155.0,241.2,156.1,241.2,156.1C241.2,156.1,242.9,156.8,242.9,156.8C242.9,156.8,247.1,154.6,247.1,154.6C247.1,154.6,247.1,153.3,247.1,153.3C247.1,153.3,249.5,149.7,249.5,149.7C249.5,149.7,247.8,147.3,247.8,147.3C247.8,147.3,246.5,147.1,246.5,147.1C246.5,147.1,244.1,145.5,244.1,145.5C244.1,145.5,244.9,143.0,244.9,143.0C244.9,143.0,241.2,142.7,241.2,142.7C241.2,142.7,239.6,140.3,239.6,140.3C239.6,140.3,239.8,139.0,239.8,139.0C239.8,139.0,236.7,135.5,236.7,135.5C236.7,135.5,234.6,136.5,234.6,136.5C234.6,136.5,232.9,138.3,232.9,138.3C232.9,138.3,233.5,139.6,233.5,139.6C233.5,139.6,233.1,140.4,233.1,140.4C233.1,140.4,230.6,140.5,230.6,140.5C230.6,140.5,229.5,141.5,229.5,141.5C229.5,141.5,228.5,141.1,228.5,141.1C228.5,141.1,227.5,142.1,227.5,142.1C227.5,142.1,225.2,143.9,225.2,143.9C225.2,143.9,224.2,143.2,224.2,143.2C224.2,143.2,224.2,140.8,224.2,140.8C224.2,140.8,223.4,140.4,223.4,140.4C223.4,140.4,222.1,141.0,222.1,141.0C222.1,141.0,220.5,144.3,220.5,144.3C220.5,144.3,219.9,147.4,219.9,147.4C219.9,147.4,221.8,150.5,221.8,150.5C221.8,150.5,223.4,152.0,223.4,152.0C223.4,152.0,223.4,154.6,223.4,154.6C223.4,154.6,224.3,156.7,224.3,156.7C224.3,156.7,223.9,159.1,223.9,159.1C223.9,159.1,221.5,160.7,221.5,160.7C221.5,160.7,220.3,164.4,220.3,164.4C220.3,164.4,222.4,166.7,222.4,166.7C222.4,166.7,223.8,169.6,223.8,169.6C223.8,169.6,222.9,171.0,222.9,171.0C222.9,171.0,222.7,173.0,222.7,173.0C222.7,173.0,221.8,174.3,221.8,174.3C221.8,174.3,221.3,175.7,221.3,175.7C221.3,175.7,222.7,177.4,222.7,177.4C222.7,177.4,228.4,178.2,228.4,178.2C228.4,178.2,230.6,177.3,230.6,177.3C230.6,177.3,231.5,177.6,231.5,177.6C231.5,177.6,231.5,177.6,231.5,177.6"
	    }, {
	        name: '天津',
	        path: "M240.2,160.2C240.2,160.2,239.2,161.0,238.5,160.8C237.8,160.6,235.8,160.1,235.8,160.1C235.8,160.1,235.6,159.4,235.6,159.4C235.6,159.4,235.5,154.8,235.5,154.8C235.5,154.8,237.4,154.0,237.4,154.0C237.4,154.0,237.1,153.2,237.1,153.2C237.1,153.2,237.5,151.4,237.5,151.4C237.5,151.4,237.7,150.5,237.7,150.5C237.7,150.5,238.6,151.0,238.6,151.0C238.6,151.0,239.1,152.6,239.1,152.6C239.1,152.6,238.9,153.6,238.9,153.6C238.9,153.6,240.9,155.0,240.9,155.0C240.9,155.0,241.2,156.1,241.2,156.1C241.2,156.1,240.0,157.0,240.0,157.0C240.0,157.0,239.6,158.9,239.6,158.9C239.6,158.9,240.2,160.2,240.2,160.2C240.2,160.2,240.2,160.2,240.2,160.2"
	    }, {
	        name: '北京',
	        path: "M235.5,154.8C235.5,154.8,235.3,153.4,235.3,153.4C235.3,153.4,234.9,152.4,234.9,152.4C234.9,152.4,237.5,151.4,237.5,151.4C237.5,151.4,237.7,150.5,237.7,150.5C237.7,150.5,237.1,148.2,237.1,148.2C237.1,148.2,236.2,148.2,236.2,148.2C236.2,148.2,232.9,146.4,232.9,146.4C232.9,146.4,231.1,148.3,231.1,148.3C231.1,148.3,230.5,151.6,230.6,150.7C230.8,149.9,228.8,152.9,228.8,152.9C228.8,152.9,228.5,155.0,228.5,155.0C228.5,155.0,228.9,156.1,228.9,156.1C228.9,156.1,231.4,155.7,231.4,155.7C231.4,155.7,233.2,156.3,233.2,156.3C233.2,156.3,234.1,155.4,234.1,155.4C234.1,155.4,235.5,154.8,235.5,154.8C235.5,154.8,235.5,154.8,235.5,154.8"
	    }, {
	        name: '宁夏',
	        path: "M189.9,175.0C189.9,175.0,190.0,172.3,190.0,172.3C190.0,172.3,190.9,171.0,190.9,171.0C190.9,171.0,190.5,169.7,190.5,169.7C190.5,169.7,185.9,168.0,185.9,168.0C185.9,168.0,186.2,166.1,186.2,166.1C186.2,166.1,187.7,164.1,187.7,164.1C187.7,164.1,186.8,161.0,186.8,161.0C186.8,161.0,186.3,160.5,186.3,160.5C186.3,160.5,183.4,162.6,183.4,162.6C183.4,162.6,181.9,167.1,181.9,167.1C181.9,167.1,181.5,170.3,181.5,170.3C181.5,170.3,179.1,172.3,179.1,172.3C179.1,172.3,177.7,172.9,177.7,172.9C177.7,172.9,175.9,173.3,175.9,173.3C175.9,173.3,180.5,178.9,179.8,178.0C179.1,177.1,180.6,181.6,180.6,181.6C180.6,181.6,180.2,183.3,180.2,183.3C180.2,183.3,182.9,184.7,182.9,184.7C182.9,184.7,182.9,185.8,182.9,185.8C182.9,185.8,185.3,186.4,185.3,186.4C185.3,186.4,186.0,186.4,186.0,186.4C186.0,186.4,186.0,184.4,186.0,184.4C186.0,184.4,187.9,184.1,187.9,184.1C187.9,184.1,188.4,181.7,188.4,181.7C188.4,181.7,187.1,180.7,187.1,180.7C187.1,180.7,186.0,179.7,186.0,179.7C186.0,179.7,186.5,175.1,186.5,175.1C186.5,175.1,187.5,174.6,187.5,174.6C187.5,174.6,189.2,175.3,189.2,175.3C189.2,175.3,189.9,175.0,189.9,175.0C189.9,175.0,189.9,175.0,189.9,175.0"
	    }, {
	        name: '内蒙古',
	        path: "M175.9,173.3C175.9,173.3,177.7,172.9,177.7,172.9C177.7,172.9,179.1,172.3,179.1,172.3C179.1,172.3,181.5,170.3,181.5,170.3C181.5,170.3,181.9,167.1,181.9,167.1C181.9,167.1,183.4,162.6,183.4,162.6C183.4,162.6,186.3,160.5,186.3,160.5C186.3,160.5,186.8,161.0,186.8,161.0C186.8,161.0,187.7,164.1,187.7,164.1C187.7,164.1,186.2,166.1,186.2,166.1C186.2,166.1,185.9,168.0,185.9,168.0C185.9,168.0,190.5,169.7,190.5,169.7C190.5,169.7,190.9,171.0,190.9,171.0C190.9,171.0,193.6,170.8,193.6,170.8C193.6,170.8,194.9,171.1,194.9,171.1C194.9,171.1,195.5,171.6,195.5,171.6C195.5,171.6,200.2,164.8,200.2,164.8C200.2,164.8,201.5,164.4,201.5,164.4C201.5,164.4,201.8,163.6,201.8,163.6C201.8,163.6,201.6,162.3,201.6,162.3C201.6,162.3,203.2,160.0,203.2,160.0C203.2,160.0,206.2,159.8,206.2,159.8C206.2,159.8,207.4,158.6,207.4,158.6C207.4,158.6,208.1,159.1,208.1,159.1C208.1,159.1,209.8,157.7,209.8,157.7C209.8,157.7,210.8,157.7,210.8,157.7C210.8,157.7,213.9,153.2,213.9,153.2C213.9,153.2,215.5,153.3,215.5,153.3C215.5,153.3,217.5,151.8,217.5,151.8C217.5,151.8,218.1,152.4,218.1,152.4C218.1,152.4,221.8,150.5,221.8,150.5C221.8,150.5,219.9,147.4,219.9,147.4C219.9,147.4,220.5,144.3,220.5,144.3C220.5,144.3,222.1,141.0,222.1,141.0C222.1,141.0,223.4,140.4,223.4,140.4C223.4,140.4,224.2,140.8,224.2,140.8C224.2,140.8,224.2,143.2,224.2,143.2C224.2,143.2,225.2,143.9,225.2,143.9C225.2,143.9,227.5,142.1,227.5,142.1C227.5,142.1,228.5,141.1,228.5,141.1C228.5,141.1,229.5,141.5,229.5,141.5C229.5,141.5,230.6,140.5,230.6,140.5C230.6,140.5,233.1,140.4,233.1,140.4C233.1,140.4,233.5,139.6,233.5,139.6C233.5,139.6,232.9,138.3,232.9,138.3C232.9,138.3,234.6,136.5,234.6,136.5C234.6,136.5,236.7,135.5,236.7,135.5C236.7,135.5,239.8,139.0,239.8,139.0C239.8,139.0,239.6,140.3,239.6,140.3C239.6,140.3,241.2,142.7,241.2,142.7C241.2,142.7,244.9,143.0,244.9,143.0C244.9,143.0,245.8,141.3,245.8,141.3C245.8,141.3,244.8,136.3,244.8,136.3C244.8,136.3,245.6,135.4,245.6,135.4C245.6,135.4,247.4,136.5,247.4,136.5C247.4,136.5,248.9,138.9,248.9,138.9C248.9,138.9,251.4,135.1,251.4,135.1C251.4,135.1,252.5,134.8,252.5,134.8C252.5,134.8,254.3,133.0,254.3,133.0C254.3,133.0,255.2,133.0,255.2,133.0C255.2,133.0,256.8,131.4,256.8,131.4C256.8,131.4,257.7,131.4,257.7,131.4C257.7,131.4,258.5,130.0,258.5,130.0C258.5,130.0,260.8,130.0,260.8,130.0C260.8,130.0,262.8,128.0,262.8,128.0C262.8,128.0,263.8,127.0,263.8,127.0C263.8,127.0,263.8,125.8,263.8,125.8C263.8,125.8,262.2,125.0,262.2,125.0C262.2,125.0,262.2,122.9,262.2,122.9C262.2,122.9,259.2,119.1,259.2,119.1C259.2,119.1,256.4,121.8,256.4,121.8C256.4,121.8,255.5,121.2,255.5,121.2C255.5,121.2,255.3,119.7,255.3,119.7C255.3,119.7,254.2,118.0,254.2,118.0C254.2,118.0,253.9,116.0,253.9,116.0C253.9,116.0,253.9,114.0,253.9,114.0C253.9,114.0,252.0,112.6,252.0,112.6C252.0,112.6,251.7,111.7,251.7,111.7C251.7,111.7,252.2,110.5,252.2,110.5C252.2,110.5,255.9,111.5,255.9,111.5C255.9,111.5,256.1,109.8,256.1,109.8C256.1,109.8,257.4,108.3,257.4,108.3C257.4,108.3,256.5,107.4,256.5,107.4C256.5,107.4,256.7,105.8,256.7,105.8C256.7,105.8,258.5,105.0,258.5,105.0C258.5,105.0,258.9,104.4,258.9,104.4C258.9,104.4,258.6,103.9,258.6,103.9C258.6,103.9,256.7,104.4,256.7,104.4C256.7,104.4,253.1,102.0,253.1,102.0C253.1,102.0,252.9,101.2,252.9,101.2C252.9,101.2,254.6,99.0,254.6,99.0C254.6,99.0,258.2,93.7,258.2,93.7C258.2,93.7,258.5,93.1,258.5,93.1C258.5,93.1,259.1,93.1,259.1,93.1C259.1,93.1,260.2,94.6,260.2,94.6C260.2,94.6,260.5,94.8,260.5,94.8C260.5,94.8,260.6,88.1,260.6,88.1C260.6,88.1,261.8,87.6,261.8,87.6C261.8,87.6,261.8,85.0,261.8,85.0C261.8,85.0,261.5,80.8,261.5,80.8C261.5,80.8,262.9,75.0,262.9,75.0C262.9,75.0,258.6,71.8,258.6,71.8C258.6,71.8,255.3,74.6,255.3,74.6C255.3,74.6,253.6,74.8,253.6,74.8C253.6,74.8,252.8,75.7,252.8,75.7C252.8,75.7,249.9,75.3,249.9,75.3C249.9,75.3,248.5,73.7,248.5,73.7C248.5,73.7,247.7,71.1,247.7,71.1C247.7,71.1,247.8,70.1,247.8,70.1C247.8,70.1,245.5,68.7,245.5,68.7C245.5,68.7,244.2,70.8,244.2,70.8C244.2,70.8,241.8,69.3,241.8,69.3C241.8,69.3,241.4,68.9,241.4,68.9C241.4,68.9,242.8,65.1,242.8,65.1C242.8,65.1,241.7,63.6,241.7,63.6C241.7,63.6,240.6,63.6,240.6,63.6C240.6,63.6,238.1,65.4,238.1,65.4C238.1,65.4,235.9,68.6,235.9,68.6C235.9,68.6,236.8,69.1,236.8,69.1C236.8,69.1,238.4,69.3,238.4,69.3C238.4,69.3,239.6,72.6,239.6,72.6C239.6,72.6,238.9,73.9,238.9,73.9C238.9,73.9,237.7,75.7,237.7,75.7C237.7,75.7,235.3,84.3,235.3,84.3C235.3,84.3,236.2,85.7,236.2,85.7C236.2,85.7,235.5,87.0,235.5,87.0C235.5,87.0,230.2,90.8,230.2,90.8C230.2,90.8,227.4,90.3,227.4,90.3C227.4,90.3,225.8,89.7,225.8,89.7C225.8,89.7,225.5,90.5,225.5,90.5C225.5,90.5,223.2,99.8,223.2,99.8C223.2,99.8,222.1,101.0,222.1,101.0C222.1,101.0,222.7,102.7,222.7,102.7C222.7,102.7,224.1,103.9,224.1,103.9C224.1,103.9,226.5,102.6,226.5,102.6C226.5,102.6,230.3,102.9,230.3,102.9C230.3,102.9,231.5,101.0,231.5,101.0C231.5,101.0,233.5,100.5,233.5,100.5C233.5,100.5,237.4,102.0,237.4,102.0C237.4,102.0,242.1,106.8,242.1,106.8C242.1,106.8,242.1,107.9,242.1,107.9C242.1,107.9,241.1,108.6,241.1,108.6C241.1,108.6,235.6,108.9,235.6,108.9C235.6,108.9,233.8,110.3,233.8,110.3C233.8,110.3,232.4,110.1,232.4,110.1C232.4,110.1,231.4,111.7,231.4,111.7C231.4,111.7,228.8,112.3,228.8,112.3C228.8,112.3,227.1,114.8,227.1,114.8C227.1,114.8,226.8,116.7,226.8,116.7C226.8,116.7,223.1,119.1,223.1,119.1C223.1,119.1,220.8,119.4,220.8,119.4C220.8,119.4,218.2,122.9,218.2,122.9C218.2,122.9,215.8,124.3,215.8,124.3C215.8,124.3,211.0,123.3,211.0,123.3C211.0,123.3,209.5,122.6,209.5,122.6C209.5,122.6,207.7,124.4,207.7,124.4C207.7,124.4,206.8,127.7,206.8,127.7C206.8,127.7,209.3,131.4,209.3,131.4C209.3,131.4,207.7,133.2,207.7,133.2C207.7,133.2,205.3,134.6,205.3,134.6C205.3,134.6,201.1,139.9,201.9,138.9C202.8,137.8,198.6,140.5,197.5,140.8C196.3,141.1,190.2,141.5,190.2,141.5C190.2,141.5,189.1,141.4,189.1,141.4C189.1,141.4,180.6,145.0,180.6,145.0C180.6,145.0,176.8,147.4,176.8,147.4C176.8,147.4,175.6,146.8,175.6,146.8C175.6,146.8,175.2,145.7,175.2,145.7C175.2,145.7,170.0,145.4,170.0,145.4C170.0,145.4,164.1,143.6,164.1,143.6C164.1,143.6,162.5,141.7,162.5,141.7C162.5,141.7,153.8,140.7,153.8,140.7C153.8,140.7,152.2,141.4,152.2,141.4C152.2,141.4,141.6,140.4,141.6,140.4C141.6,140.4,141.5,142.0,141.5,142.0C141.5,142.0,142.2,144.4,142.2,144.4C142.2,144.4,141.8,148.4,141.8,148.4C141.8,148.4,144.8,152.9,144.8,152.9C144.8,152.9,146.3,153.9,146.3,153.9C146.3,153.9,148.8,152.0,148.8,152.0C148.8,152.0,153.9,152.0,153.9,152.0C153.9,152.0,155.2,152.4,155.2,152.4C155.2,152.4,155.9,153.6,155.9,153.6C155.9,153.6,155.3,154.8,155.3,154.8C155.3,154.8,152.5,157.1,152.5,157.1C152.5,157.1,152.8,158.3,152.8,158.3C152.8,158.3,156.0,160.7,156.0,160.7C156.0,160.7,157.4,160.7,157.4,160.7C157.4,160.7,157.8,161.3,157.8,161.3C157.8,161.3,157.5,162.3,157.5,162.3C157.5,162.3,159.5,163.9,159.5,163.9C159.5,163.9,164.2,164.6,164.2,164.6C164.2,164.6,166.5,164.0,166.5,164.0C166.5,164.0,169.3,161.1,169.3,161.1C169.3,161.1,172.8,161.4,172.8,161.4C172.8,161.4,174.2,163.6,174.2,163.6C174.2,163.6,173.4,165.5,173.4,165.5C173.4,165.5,173.6,166.7,173.6,166.7C173.6,166.7,171.8,167.9,171.8,167.9C171.8,167.9,170.9,168.9,170.9,168.9C170.9,168.9,171.2,171.3,171.2,171.3C171.2,171.3,174.5,173.6,174.5,173.6C174.5,173.6,175.9,173.3,175.9,173.3C175.9,173.3,175.9,173.3,175.9,173.3"
	    }, {
	        name: '辽宁',
	        path: "M270.5,146.6C270.5,146.6,273.9,141.5,273.9,141.5C273.9,141.5,276.1,139.1,276.1,139.1C276.1,139.1,275.8,136.7,275.8,136.7C275.8,136.7,273.5,134.1,273.5,134.1C273.5,134.1,273.2,132.0,273.2,132.0C273.2,132.0,269.1,126.4,269.1,126.4C269.1,126.4,268.9,127.0,268.9,127.0C268.9,127.0,268.1,127.9,268.1,127.9C268.1,127.9,266.4,125.8,266.4,125.8C266.4,125.8,263.9,125.1,263.9,125.1C263.9,125.1,263.8,125.8,263.8,125.8C263.8,125.8,263.8,127.0,263.8,127.0C263.8,127.0,262.8,128.0,262.8,128.0C262.8,128.0,260.8,130.0,260.8,130.0C260.8,130.0,258.5,130.0,258.5,130.0C258.5,130.0,257.7,131.4,257.7,131.4C257.7,131.4,256.8,131.4,256.8,131.4C256.8,131.4,255.2,133.0,255.2,133.0C255.2,133.0,254.3,133.0,254.3,133.0C254.3,133.0,252.5,134.8,252.5,134.8C252.5,134.8,251.4,135.1,251.4,135.1C251.4,135.1,248.9,138.9,248.9,138.9C248.9,138.9,247.4,136.5,247.4,136.5C247.4,136.5,245.6,135.4,245.6,135.4C245.6,135.4,244.8,136.3,244.8,136.3C244.8,136.3,245.8,141.3,245.8,141.3C245.8,141.3,244.9,143.0,244.9,143.0C244.9,143.0,244.1,145.5,244.1,145.5C244.1,145.5,246.5,147.1,246.5,147.1C246.5,147.1,247.8,147.3,247.8,147.3C247.8,147.3,249.5,149.7,249.5,149.7C249.5,149.7,250.8,149.0,250.8,149.0C250.8,149.0,252.2,147.5,252.8,146.5C253.4,145.5,254.8,143.2,254.8,143.2C254.8,143.2,258.2,142.4,258.2,142.4C258.2,142.4,260.3,144.6,260.3,144.6C260.3,144.6,258.8,148.0,258.8,148.0C258.8,148.0,256.8,151.1,256.8,151.1C256.8,151.1,258.6,152.4,258.6,152.4C258.6,152.4,258.5,154.0,258.5,154.0C258.5,154.0,257.1,155.4,257.1,155.4C257.1,155.4,257.4,156.0,257.4,156.0C257.4,156.0,259.8,154.7,259.8,154.7C259.8,154.7,263.4,150.0,263.4,150.0C263.4,150.0,268.8,147.0,268.8,147.0C268.8,147.0,270.5,146.6,270.5,146.6C270.5,146.6,270.5,146.6,270.5,146.6"
	    }, {
	        name: '吉林',
	        path: "M297.4,116.5C297.4,116.5,296.4,116.4,296.4,116.4C296.4,116.4,294.9,116.4,294.9,116.4C294.9,116.4,292.8,115.7,292.8,115.7C292.8,115.7,292.1,114.4,292.1,114.4C292.1,114.4,291.4,115.4,291.4,115.4C291.4,115.4,290.4,114.7,290.4,114.7C290.4,114.7,288.1,117.3,288.1,117.3C288.1,117.3,287.7,118.0,287.7,118.0C287.7,118.0,286.7,118.2,286.7,118.2C286.7,118.2,285.2,116.5,285.2,116.5C285.2,116.5,283.9,116.0,283.9,116.0C283.9,116.0,282.5,113.2,282.5,113.2C282.5,113.2,281.5,113.9,281.5,113.9C281.5,113.9,281.8,116.4,281.8,116.4C281.8,116.4,281.1,116.8,281.1,116.8C281.1,116.8,279.2,114.8,279.2,114.8C279.2,114.8,278.5,113.9,278.5,113.9C278.5,113.9,277.1,113.9,277.1,113.9C277.1,113.9,276.2,111.7,276.2,111.7C276.2,111.7,274.3,110.7,274.3,110.7C274.3,110.7,271.7,111.7,271.7,111.7C271.7,111.7,270.6,111.5,270.6,111.5C270.6,111.5,269.1,110.0,269.1,110.0C269.1,110.0,267.0,111.2,267.0,111.2C267.0,111.2,265.8,111.2,265.8,111.2C265.8,111.2,264.3,111.8,264.3,111.8C264.3,111.8,262.2,110.3,262.2,110.3C262.2,110.3,260.8,107.7,260.8,107.7C260.8,107.7,257.4,108.3,257.4,108.3C257.4,108.3,256.1,109.8,256.1,109.8C256.1,109.8,255.9,111.5,255.9,111.5C255.9,111.5,252.2,110.5,252.2,110.5C252.2,110.5,251.7,111.7,251.7,111.7C251.7,111.7,252.0,112.6,252.0,112.6C252.0,112.6,253.9,114.0,253.9,114.0C253.9,114.0,253.9,116.0,253.9,116.0C253.9,116.0,254.2,118.0,254.2,118.0C254.2,118.0,255.3,119.7,255.3,119.7C255.3,119.7,255.5,121.2,255.5,121.2C255.5,121.2,256.4,121.8,256.4,121.8C256.4,121.8,259.2,119.1,259.2,119.1C259.2,119.1,262.2,122.9,262.2,122.9C262.2,122.9,262.2,125.0,262.2,125.0C262.2,125.0,263.8,125.8,263.8,125.8C263.8,125.8,263.9,125.1,263.9,125.1C263.9,125.1,266.4,125.8,266.4,125.8C266.4,125.8,268.1,127.9,268.1,127.9C268.1,127.9,268.9,127.0,268.9,127.0C268.9,127.0,269.1,126.4,269.1,126.4C269.1,126.4,273.2,132.0,273.2,132.0C273.2,132.0,273.5,134.1,273.5,134.1C273.5,134.1,275.8,136.7,275.8,136.7C275.8,136.7,276.1,139.1,276.1,139.1C276.1,139.1,278.1,137.9,278.1,137.9C278.1,137.9,279.9,132.6,279.9,132.6C279.9,132.6,280.8,132.3,280.8,132.3C280.8,132.3,282.8,133.4,282.8,133.4C282.8,133.4,286.1,133.0,286.1,133.0C286.1,133.0,287.2,132.0,287.2,132.0C287.2,132.0,285.7,129.6,285.7,129.6C285.7,129.6,286.1,129.0,286.1,129.0C286.1,129.0,290.0,127.7,289.1,128.0C288.2,128.3,290.4,125.5,290.4,125.5C290.4,125.5,292.0,124.8,292.0,124.8C292.0,124.8,292.1,122.4,292.1,122.4C292.1,122.4,292.5,120.8,292.5,120.8C292.5,120.8,293.4,120.5,293.4,120.5C293.4,120.5,294.2,121.4,294.2,121.4C294.2,121.4,295.1,122.1,295.1,122.1C295.1,122.1,297.2,119.3,297.2,119.3C297.2,119.3,297.8,117.1,297.8,117.1C297.8,117.1,297.4,116.5,297.4,116.5C297.4,116.5,297.4,116.5,297.4,116.5"
	    }, {
	        name: '黑龙江',
	        path: "M257.4,108.3C257.4,108.3,260.8,107.7,260.8,107.7C260.8,107.7,262.2,110.3,262.2,110.3C262.2,110.3,264.3,111.8,264.3,111.8C264.3,111.8,265.8,111.2,265.8,111.2C265.8,111.2,267.0,111.2,267.0,111.2C267.0,111.2,269.1,110.0,269.1,110.0C269.1,110.0,270.6,111.5,270.6,111.5C270.6,111.5,271.7,111.7,271.7,111.7C271.7,111.7,274.3,110.7,274.3,110.7C274.3,110.7,276.2,111.7,276.2,111.7C276.2,111.7,277.1,113.9,277.1,113.9C277.1,113.9,278.5,113.9,278.5,113.9C278.5,113.9,279.2,114.8,279.2,114.8C279.2,114.8,281.1,116.8,281.1,116.8C281.1,116.8,281.8,116.4,281.8,116.4C281.8,116.4,281.5,113.9,281.5,113.9C281.5,113.9,282.5,113.2,282.5,113.2C282.5,113.2,283.9,116.0,283.9,116.0C283.9,116.0,285.2,116.5,285.2,116.5C285.2,116.5,286.7,118.2,286.7,118.2C286.7,118.2,287.7,118.0,287.7,118.0C287.7,118.0,288.1,117.3,288.1,117.3C288.1,117.3,290.3,114.7,290.3,114.7C290.3,114.7,291.4,115.4,291.4,115.4C291.4,115.4,292.1,114.4,292.1,114.4C292.1,114.4,292.8,115.7,292.8,115.7C292.8,115.7,294.9,116.4,294.9,116.4C294.9,116.4,296.4,116.4,296.4,116.4C296.4,116.4,297.4,116.5,297.4,116.5C297.4,116.5,296.8,115.4,296.8,115.4C296.8,115.4,296.5,112.0,296.5,112.0C296.5,112.0,293.9,108.0,293.9,108.0C293.9,108.0,295.3,106.5,295.3,106.5C295.3,106.5,296.7,104.1,296.7,104.1C296.7,104.1,301.5,104.1,301.5,104.1C301.5,104.1,302.4,103.3,302.4,103.3C302.4,103.3,302.1,101.4,302.1,101.4C302.1,101.4,303.1,99.6,303.1,99.6C303.1,99.6,302.8,98.6,302.8,98.6C302.8,98.6,303.2,96.8,303.2,96.8C303.2,96.8,303.1,88.0,303.1,88.0C303.1,88.0,304.5,85.1,304.5,85.1C304.5,85.1,302.9,83.3,302.9,83.3C302.9,83.3,303.2,82.1,303.2,82.1C303.2,82.1,302.5,81.1,302.5,81.1C302.5,81.1,300.6,81.8,300.6,81.8C300.6,81.8,298.5,84.3,298.5,84.3C298.5,84.3,296.4,85.3,296.4,85.3C296.4,85.3,294.2,88.3,294.2,88.3C294.2,88.3,288.9,90.1,288.9,90.1C288.9,90.1,286.5,88.3,286.5,88.3C286.5,88.3,286.8,87.1,286.8,87.1C286.8,87.1,285.5,85.3,285.5,85.3C285.5,85.3,284.9,83.4,284.9,83.4C284.9,83.4,282.9,83.3,282.9,83.3C282.9,83.3,279.3,81.4,279.3,81.4C279.3,81.4,277.9,82.0,277.9,82.0C277.9,82.0,276.2,81.1,276.2,81.1C276.2,81.1,273.8,81.5,273.8,81.5C273.8,81.5,271.7,80.8,271.7,80.8C271.7,80.8,270.3,79.0,270.3,79.0C270.3,79.0,269.1,77.6,269.1,77.6C269.1,77.6,268.6,76.1,268.6,76.1C268.6,76.1,266.9,74.4,266.9,74.4C266.9,74.4,265.9,72.9,265.9,72.9C265.9,72.9,263.6,69.7,263.6,69.7C263.6,69.7,262.9,67.9,262.9,67.9C262.9,67.9,260.3,64.6,260.3,64.6C260.3,64.6,259.6,62.8,259.6,62.8C259.6,62.8,256.3,61.2,256.3,61.2C256.3,61.2,254.2,62.0,254.2,62.0C254.2,62.0,252.4,61.5,252.4,61.5C252.4,61.5,248.2,60.7,248.2,60.7C248.2,60.7,242.7,62.7,242.7,62.7C242.7,62.7,241.6,63.6,241.6,63.6C241.6,63.6,242.8,65.1,242.8,65.1C242.8,65.1,241.3,68.9,241.3,68.9C241.3,68.9,241.8,69.3,241.8,69.3C241.8,69.3,244.2,70.8,244.2,70.8C244.2,70.8,245.5,68.7,245.5,68.7C245.5,68.7,247.8,70.1,247.8,70.1C247.8,70.1,247.7,71.1,247.7,71.1C247.7,71.1,248.5,73.7,248.5,73.7C248.5,73.7,249.9,75.3,249.9,75.3C249.9,75.3,252.8,75.7,252.8,75.7C252.8,75.7,253.6,74.8,253.6,74.8C253.6,74.8,255.3,74.6,255.3,74.6C255.3,74.6,258.6,71.8,258.6,71.8C258.6,71.8,262.9,75.0,262.9,75.0C262.9,75.0,261.5,80.8,261.5,80.8C261.5,80.8,261.8,85.0,261.8,85.0C261.8,85.0,261.8,87.6,261.8,87.6C261.8,87.6,260.6,88.1,260.6,88.1C260.6,88.1,260.5,94.8,260.5,94.8C260.5,94.8,260.2,94.6,260.2,94.6C260.2,94.6,259.1,93.1,259.1,93.1C259.1,93.1,258.5,93.1,258.5,93.1C258.5,93.1,258.2,93.7,258.2,93.7C258.2,93.7,253.8,100.2,254.6,99.0C255.5,97.8,252.9,101.2,252.9,101.2C252.9,101.2,253.1,102.0,253.1,102.0C253.1,102.0,256.6,104.4,256.6,104.4C256.6,104.4,258.6,103.9,258.6,103.9C258.6,103.9,258.9,104.4,258.9,104.4C258.9,104.4,258.5,105.0,258.5,105.0C258.5,105.0,256.7,105.8,256.7,105.8C256.7,105.8,256.5,107.4,256.5,107.4C256.5,107.4,257.4,108.3,257.4,108.3C257.4,108.3,257.4,108.3,257.4,108.3"
	    }, {
	        name: '重庆',
	        path: "M184.4,218.9C184.4,218.9,187.2,217.8,187.2,217.8C187.2,217.8,189.5,218.9,189.5,218.9C189.5,218.9,190.0,216.0,190.0,216.0C190.0,216.0,192.7,214.1,192.7,214.1C192.7,214.1,193.4,210.3,193.4,210.3C193.4,210.3,195.3,209.8,195.3,209.8C195.3,209.8,195.3,206.0,195.3,206.0C195.3,206.0,197.2,205.3,197.2,205.3C197.2,205.3,201.2,206.7,201.2,206.7C201.2,206.7,202.1,207.9,202.1,207.9C202.1,207.9,204.1,207.4,204.1,207.4C204.1,207.4,205.3,207.6,205.3,207.6C205.3,207.6,206.6,209.3,206.6,209.3C206.6,209.3,207.2,212.6,207.2,212.6C207.2,212.6,206.8,213.7,206.8,213.7C206.8,213.7,205.9,213.4,205.9,213.4C205.9,213.4,204.4,215.2,203.5,215.3C202.6,215.5,199.3,216.0,199.3,216.0C199.3,216.0,198.2,217.2,198.2,217.2C198.2,217.2,199.1,218.3,199.1,218.3C199.1,218.3,199.2,220.7,199.2,220.7C199.2,220.7,200.3,221.0,200.3,221.0C200.3,221.0,203.2,224.6,203.2,224.6C203.2,224.6,203.4,229.3,203.4,229.3C203.4,229.3,201.8,230.5,201.8,230.5C201.8,230.5,201.5,230.7,201.5,230.7C201.5,230.7,199.8,229.0,199.8,229.0C199.8,229.0,198.2,226.9,198.2,226.9C198.2,226.9,198.1,225.5,198.1,225.5C198.1,225.5,196.9,225.3,196.9,225.3C196.9,225.3,195.6,225.7,195.6,225.7C195.6,225.7,193.5,224.7,193.5,224.7C193.5,224.7,192.5,227.2,192.5,227.2C192.5,227.2,190.6,227.3,190.6,227.3C190.6,227.3,189.3,229.3,189.3,229.3C189.3,229.3,188.5,228.9,188.5,228.9C188.5,228.9,187.3,225.4,187.3,225.4C187.3,225.4,184.1,223.4,184.1,223.4C184.1,223.4,184.4,218.9,184.4,218.9C184.4,218.9,184.4,218.9,184.4,218.9"
	    }, {
	        name: '四川',
	        path: "M164.6,200.4C164.6,200.4,165.5,198.4,165.5,198.4C165.5,198.4,164.5,197.3,164.5,197.3C164.5,197.3,164.3,195.5,164.3,195.5C164.3,195.5,167.9,194.0,167.9,194.0C167.9,194.0,168.8,194.0,168.8,194.0C168.8,194.0,169.3,195.3,169.3,195.3C169.3,195.3,169.5,197.0,169.5,197.0C169.5,197.0,171.2,198.2,171.2,198.2C171.2,198.2,173.5,200.4,173.5,200.4C173.5,200.4,174.8,199.6,174.8,199.6C174.8,199.6,175.6,200.4,175.6,200.4C175.6,200.4,175.9,202.7,175.9,202.7C175.9,202.7,177.4,203.7,177.4,203.7C177.4,203.7,181.0,204.0,181.0,204.0C181.0,204.0,181.6,203.3,181.6,203.3C181.6,203.3,181.5,202.3,181.5,202.3C181.5,202.3,183.6,201.7,183.6,201.7C183.6,201.7,184.8,202.0,184.8,202.0C184.8,202.0,184.9,203.3,184.9,203.3C184.9,203.3,185.9,203.4,185.9,203.4C185.9,203.4,189.6,202.7,189.6,202.7C189.6,202.7,190.3,203.0,190.3,203.0C190.3,203.0,190.5,204.0,190.5,204.0C190.5,204.0,192.1,204.4,192.1,204.4C192.1,204.4,195.3,206.0,195.3,206.0C195.3,206.0,195.3,209.8,195.3,209.8C195.3,209.8,193.4,210.3,193.4,210.3C193.4,210.3,192.7,214.1,192.7,214.1C192.7,214.1,190.0,216.0,190.0,216.0C190.0,216.0,189.5,218.9,189.5,218.9C189.5,218.9,187.2,217.8,187.2,217.8C187.2,217.8,184.4,218.9,184.4,218.9C184.4,218.9,184.3,221.1,184.3,221.1C184.3,221.1,184.1,223.4,184.1,223.4C184.1,223.4,187.3,225.4,187.3,225.4C187.3,225.4,188.5,228.9,188.5,228.9C188.5,228.9,187.2,229.3,187.2,229.3C187.2,229.3,185.2,228.2,185.2,228.2C185.2,228.2,183.6,230.0,183.6,230.0C183.6,230.0,183.6,230.8,183.6,230.8C183.6,230.8,186.8,232.6,186.8,232.6C186.8,232.6,187.5,233.9,187.5,233.9C187.5,233.9,185.2,234.7,185.2,234.7C185.2,234.7,181.8,234.6,181.8,234.6C181.8,234.6,181.3,233.2,181.3,233.2C181.3,233.2,180.0,232.7,180.0,232.7C180.0,232.7,177.9,234.0,177.9,234.0C177.9,234.0,176.5,233.3,176.5,233.3C176.5,233.3,176.3,231.4,176.3,231.4C176.3,231.4,175.6,230.5,175.6,230.5C175.6,230.5,175.6,229.6,175.6,229.6C175.6,229.6,173.6,229.1,173.6,229.1C173.6,229.1,173.1,229.7,173.1,229.7C173.1,229.7,173.4,231.1,173.4,231.1C173.4,231.1,171.8,231.9,171.8,231.9C171.8,231.9,171.3,232.9,171.3,232.9C171.3,232.9,171.8,234.1,171.8,234.1C171.8,234.1,168.2,238.3,168.2,238.3C168.2,238.3,168.8,243.2,168.8,243.2C168.8,243.2,167.1,244.6,167.1,244.6C167.1,244.6,166.2,243.7,166.2,243.7C166.2,243.7,162.8,245.7,162.8,245.7C162.8,245.7,161.5,245.0,161.5,245.0C161.5,245.0,156.5,235.4,156.5,235.4C156.5,235.4,154.5,234.0,154.5,234.0C154.5,234.0,152.9,233.6,152.9,233.6C152.9,233.6,152.2,232.3,152.2,232.3C152.2,232.3,153.1,230.8,153.1,230.8C153.1,230.8,151.6,229.7,151.6,229.7C151.6,229.7,149.9,231.1,149.9,231.1C149.9,231.1,148.2,231.4,148.2,231.4C148.2,231.4,147.1,226.3,147.1,226.3C147.1,226.3,146.8,225.0,146.8,225.0C146.8,225.0,145.7,213.7,146.5,216.7C147.2,219.7,144.9,212.6,144.9,212.6C144.9,212.6,146.0,211.7,146.0,211.7C146.0,211.7,142.8,205.7,142.8,205.7C142.8,205.7,138.8,202.6,138.8,202.6C138.8,202.6,139.3,200.7,139.3,200.7C139.3,200.7,139.8,200.1,139.8,200.1C139.8,200.1,145.6,199.3,145.6,199.3C145.6,199.3,149.5,200.4,149.5,200.4C149.5,200.4,151.8,199.7,151.8,199.7C151.8,199.7,152.6,201.1,152.6,201.1C152.6,201.1,155.5,204.0,155.5,204.0C155.5,204.0,157.8,203.6,157.8,203.6C157.8,203.6,157.8,201.9,157.8,201.9C157.8,201.9,158.4,200.7,158.4,200.7C158.4,200.7,160.6,199.8,160.6,199.8C160.6,199.8,161.5,201.3,161.5,201.3C161.5,201.3,162.8,200.3,162.8,200.3C162.8,200.3,164.6,200.5,164.6,200.5C164.6,200.5,164.6,200.4,164.6,200.4C164.6,200.4,164.6,200.4,164.6,200.4C164.6,200.4,164.6,200.4,164.6,200.4"
	    }];

	    var defaults = {
	        mapData: mapData
	    };


	    var ChinaMap = Map;

	    ChinaMap.defaults = Util.extend(Map.defaults, defaults);

	    return ChinaMap;
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * @file 地图
	 * @author wumingdan(wumingdan@baidu.com)
	 */

	!(__WEBPACK_AMD_DEFINE_RESULT__ = function (require) {

	    var Chart = __webpack_require__(2);
	    var Util = __webpack_require__(1);
	    var Format = __webpack_require__(12);
	    var Animate = __webpack_require__(19);
	    var Tooltip = __webpack_require__(15);
	    var Resources = __webpack_require__(10);

	    var Map = {
	        defaults: {
	            mapData: [],
	            legend: {
	                x: 75,
	                y: 30,
	                padding: 10,
	                colors: Resources.colorInfo.mapColors
	            },
	            style: {
	                stroke: '#fff',
	                bgColor: '#e6e6e6',
	                highlightColor: '#ffe167',
	                font: {
	                    "font-size": 12,
	                    "font-family": 'Microsoft Yahei, Helvetica, STHeitiSC-Light, Arial, sans-serif',
	                    'text-anchor': 'start'
	                }
	            },
	            tooltip: true   // TODO: change this to a customizable setting
	        },
	        render: function (data) {
	            this.clearPaper();

	            if (data !== undefined) {
	                this._data = data;
	            }

	            // 转化数据
	            this.convertData();

	            // 绘制地图
	            this.draw();
	        },
	        draw: function () {
	            this.drawMap();

	            this.drawLegend();
	        },
	        drawMap: function () {
	            var mapData = this.opts.mapData;

	            for (var i = 0; i < mapData.length; i++) {
	                var shapeData = mapData[i];
	                var fill = this.getFillColor(shapeData.percentage);

	                var attr = {
	                    'stroke-linejoin': 'round',
	                    'stroke-width': 1 + 1e-7,
	                    "fill": fill,
	                    "stroke": this.opts.style.stroke
	                };

	                // 绘制形状轮廓
	                var shape = this.paper.path(shapeData.path).attr(attr);

	                // 填充当前形状
	                shape.fill = fill;
	                shape.data('data', shapeData);

	                if (shapeData.percentage) {
	                    shape.hover(
	                        this.highLight.call(this, shape),
	                        this.unHighLight.call(this, shape)
	                    );
	                }
	            }
	        },
	        drawLegend: function () {
	            var legendSetting = this.opts.legend;
	            var dx = legendSetting.x;
	            var dy = legendSetting.y;
	            var padding = legendSetting.padding;
	            var colors = legendSetting.colors;

	            var legend = this.paper.text(dx, dy, this._data.fields[0])
	                .attr(this.opts.style.font)
	                .attr({
	                    'font-weight': 'bolder'
	                });

	            var text = this.paper.text(legend.getBBox().x2 + padding, dy, '高').attr(this.opts.style.font);

	            var x = text.getBBox().x2 + padding,
	                y = 26,
	                width = 16,
	                heigt = 9,
	                rect;

	            for (var i = 0; i < colors.length; i++) {
	                var color = colors[i];
	                rect = this.paper.rect(x, y, width, heigt).attr({
	                    fill: color,
	                    stroke: 'none'
	                });
	                x += 18;
	            }

	            this.paper.text(x + padding, dy, '低').attr(this.opts.style.font);
	        },
	        highLight: function (element) {
	            var me = this;

	            return function () {
	                var fill = me.opts.style.highlightColor;

	                Animate.animate(element, { 'fill': fill }, 250);

	                if (me.opts.tooltip) {
	                    me._showTooltip.call(me, element);
	                }
	            }
	        },
	        unHighLight: function (element) {
	            var me = this;

	            return function () {
	                var fill = element.fill;

	                Animate.animate(element, { 'fill': fill }, 250);

	                me.tooltip && me.tooltip.hide();
	            }
	        },
	        _showTooltip: function (element) {
	            var data = element.data('data');
	            var fields = this._data.fields;

	            var name = data.name;
	            var indicator = fields[0] + ': ' + Format.number(data.value);
	            var indicatorPercentage = fields[1] + ': ' + data.percentage;

	            var content = name
	                + '<br />' + indicator
	                + '<br />' + indicatorPercentage + '%';

	            var bbox = element.getBBox();
	            var left = (bbox.x + bbox.x2) / 2;
	            var top = (bbox.y + bbox.y2) / 2;

	            var tipSettings = {
	                content: content,
	                style: {
	                    left: left,
	                    top: top
	                }
	            };

	            if (!this.tooltip) {
	                this.tooltip = Chart.createComponent(Tooltip, tipSettings);
	                this.tooltip.render(this.htmlPaper);
	                this.tooltip.show();
	            }
	            else {
	                this.tooltip.update(tipSettings);
	            }

	        },
	        convertData: function () {
	            var data = this._data.items;

	            var percentageMax = 0;
	            var percentageMin = 100;

	            for (var i = 0; i < data[0].length; i++) {
	                var countryName = data[0][i];
	                var countryData = data[1][i];

	                for (var j = 0; j < this.opts.mapData.length; j++) {
	                    var item = this.opts.mapData[j];
	                    if (item.name == countryName[0]) {

	                        item.value = countryData[0];
	                        item.percentage = countryData[1];

	                        // 缓存最大和最小值
	                        // 后续将作为计算色深及默认显示哪个tip的依据
	                        if (percentageMax <= countryData[1]) {
	                            percentageMax = countryData[1];
	                            this._percentageMaxItem = item;
	                        }
	                        if (percentageMin >= countryData[1]) {
	                            percentageMin = countryData[1];
	                            this._percentageMinItem = item;
	                        }

	                        break;
	                    }
	                }
	            }
	        },
	        getFillColor: function (percentage) {
	            if (!percentage) {
	                return this.opts.style.bgColor;
	            }

	            var colors = this.opts.legend.colors;
	            var colorTypes = colors.length;

	            var percentageMax = this._percentageMaxItem.percentage;
	            var percentageMin = this._percentageMinItem.percentage;

	            // 给padding + 0.1，使下边界进入上一个区间
	            // 比如max是100，min是0
	            // 80，60，40，20，0这几个点的颜色分别取colors[0], colors[1], ..., colors[4]
	            var padding = (percentageMax - percentageMin) / colorTypes + 0.1;

	            return colors[(percentageMax - percentage) / padding | 0];
	        }
	    };

	    return Map;
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * @file 世界地图
	 * @author wumingdan(wumingdan@baidu.com)
	 */

	!(__WEBPACK_AMD_DEFINE_RESULT__ = function (require) {
	    var Util = __webpack_require__(1);
	    var Map = __webpack_require__(30);


	    var defaults = {
	        mapData: mapData
	    };

	    var WorldMap = Map;

	    WorldMap.defaults = Util.extend(Map.defaults, defaults);

	    return WorldMap;
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }
/******/ ]);