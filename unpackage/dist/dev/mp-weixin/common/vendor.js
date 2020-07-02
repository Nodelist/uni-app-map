(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["common/vendor"],{

/***/ 1:
/*!************************************************************!*\
  !*** ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.createApp = createApp;exports.createComponent = createComponent;exports.createPage = createPage;exports.default = void 0;var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _slicedToArray(arr, i) {return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();}function _nonIterableRest() {throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _iterableToArrayLimit(arr, i) {if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;var _arr = [];var _n = true;var _d = false;var _e = undefined;try {for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {_arr.push(_s.value);if (i && _arr.length === i) break;}} catch (err) {_d = true;_e = err;} finally {try {if (!_n && _i["return"] != null) _i["return"]();} finally {if (_d) throw _e;}}return _arr;}function _arrayWithHoles(arr) {if (Array.isArray(arr)) return arr;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}function _toConsumableArray(arr) {return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();}function _nonIterableSpread() {throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return _arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(n);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);}function _iterableToArray(iter) {if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);}function _arrayWithoutHoles(arr) {if (Array.isArray(arr)) return _arrayLikeToArray(arr);}function _arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;}

var _toString = Object.prototype.toString;
var hasOwnProperty = Object.prototype.hasOwnProperty;

function isFn(fn) {
  return typeof fn === 'function';
}

function isStr(str) {
  return typeof str === 'string';
}

function isPlainObject(obj) {
  return _toString.call(obj) === '[object Object]';
}

function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key);
}

function noop() {}

/**
                    * Create a cached version of a pure function.
                    */
function cached(fn) {
  var cache = Object.create(null);
  return function cachedFn(str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
}

/**
   * Camelize a hyphen-delimited string.
   */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) {return c ? c.toUpperCase() : '';});
});

var HOOKS = [
'invoke',
'success',
'fail',
'complete',
'returnValue'];


var globalInterceptors = {};
var scopedInterceptors = {};

function mergeHook(parentVal, childVal) {
  var res = childVal ?
  parentVal ?
  parentVal.concat(childVal) :
  Array.isArray(childVal) ?
  childVal : [childVal] :
  parentVal;
  return res ?
  dedupeHooks(res) :
  res;
}

function dedupeHooks(hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res;
}

function removeHook(hooks, hook) {
  var index = hooks.indexOf(hook);
  if (index !== -1) {
    hooks.splice(index, 1);
  }
}

function mergeInterceptorHook(interceptor, option) {
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      interceptor[hook] = mergeHook(interceptor[hook], option[hook]);
    }
  });
}

function removeInterceptorHook(interceptor, option) {
  if (!interceptor || !option) {
    return;
  }
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      removeHook(interceptor[hook], option[hook]);
    }
  });
}

function addInterceptor(method, option) {
  if (typeof method === 'string' && isPlainObject(option)) {
    mergeInterceptorHook(scopedInterceptors[method] || (scopedInterceptors[method] = {}), option);
  } else if (isPlainObject(method)) {
    mergeInterceptorHook(globalInterceptors, method);
  }
}

function removeInterceptor(method, option) {
  if (typeof method === 'string') {
    if (isPlainObject(option)) {
      removeInterceptorHook(scopedInterceptors[method], option);
    } else {
      delete scopedInterceptors[method];
    }
  } else if (isPlainObject(method)) {
    removeInterceptorHook(globalInterceptors, method);
  }
}

function wrapperHook(hook) {
  return function (data) {
    return hook(data) || data;
  };
}

function isPromise(obj) {
  return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
}

function queue(hooks, data) {
  var promise = false;
  for (var i = 0; i < hooks.length; i++) {
    var hook = hooks[i];
    if (promise) {
      promise = Promise.then(wrapperHook(hook));
    } else {
      var res = hook(data);
      if (isPromise(res)) {
        promise = Promise.resolve(res);
      }
      if (res === false) {
        return {
          then: function then() {} };

      }
    }
  }
  return promise || {
    then: function then(callback) {
      return callback(data);
    } };

}

function wrapperOptions(interceptor) {var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  ['success', 'fail', 'complete'].forEach(function (name) {
    if (Array.isArray(interceptor[name])) {
      var oldCallback = options[name];
      options[name] = function callbackInterceptor(res) {
        queue(interceptor[name], res).then(function (res) {
          /* eslint-disable no-mixed-operators */
          return isFn(oldCallback) && oldCallback(res) || res;
        });
      };
    }
  });
  return options;
}

function wrapperReturnValue(method, returnValue) {
  var returnValueHooks = [];
  if (Array.isArray(globalInterceptors.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(globalInterceptors.returnValue));
  }
  var interceptor = scopedInterceptors[method];
  if (interceptor && Array.isArray(interceptor.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(interceptor.returnValue));
  }
  returnValueHooks.forEach(function (hook) {
    returnValue = hook(returnValue) || returnValue;
  });
  return returnValue;
}

function getApiInterceptorHooks(method) {
  var interceptor = Object.create(null);
  Object.keys(globalInterceptors).forEach(function (hook) {
    if (hook !== 'returnValue') {
      interceptor[hook] = globalInterceptors[hook].slice();
    }
  });
  var scopedInterceptor = scopedInterceptors[method];
  if (scopedInterceptor) {
    Object.keys(scopedInterceptor).forEach(function (hook) {
      if (hook !== 'returnValue') {
        interceptor[hook] = (interceptor[hook] || []).concat(scopedInterceptor[hook]);
      }
    });
  }
  return interceptor;
}

function invokeApi(method, api, options) {for (var _len = arguments.length, params = new Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {params[_key - 3] = arguments[_key];}
  var interceptor = getApiInterceptorHooks(method);
  if (interceptor && Object.keys(interceptor).length) {
    if (Array.isArray(interceptor.invoke)) {
      var res = queue(interceptor.invoke, options);
      return res.then(function (options) {
        return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
      });
    } else {
      return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
    }
  }
  return api.apply(void 0, [options].concat(params));
}

var promiseInterceptor = {
  returnValue: function returnValue(res) {
    if (!isPromise(res)) {
      return res;
    }
    return res.then(function (res) {
      return res[1];
    }).catch(function (res) {
      return res[0];
    });
  } };


var SYNC_API_RE =
/^\$|sendNativeEvent|restoreGlobal|getCurrentSubNVue|getMenuButtonBoundingClientRect|^report|interceptors|Interceptor$|getSubNVueById|requireNativePlugin|upx2px|hideKeyboard|canIUse|^create|Sync$|Manager$|base64ToArrayBuffer|arrayBufferToBase64/;

var CONTEXT_API_RE = /^create|Manager$/;

// Context例外情况
var CONTEXT_API_RE_EXC = ['createBLEConnection'];

// 同步例外情况
var ASYNC_API = ['createBLEConnection'];

var CALLBACK_API_RE = /^on|^off/;

function isContextApi(name) {
  return CONTEXT_API_RE.test(name) && CONTEXT_API_RE_EXC.indexOf(name) === -1;
}
function isSyncApi(name) {
  return SYNC_API_RE.test(name) && ASYNC_API.indexOf(name) === -1;
}

function isCallbackApi(name) {
  return CALLBACK_API_RE.test(name) && name !== 'onPush';
}

function handlePromise(promise) {
  return promise.then(function (data) {
    return [null, data];
  }).
  catch(function (err) {return [err];});
}

function shouldPromise(name) {
  if (
  isContextApi(name) ||
  isSyncApi(name) ||
  isCallbackApi(name))
  {
    return false;
  }
  return true;
}

/* eslint-disable no-extend-native */
if (!Promise.prototype.finally) {
  Promise.prototype.finally = function (callback) {
    var promise = this.constructor;
    return this.then(
    function (value) {return promise.resolve(callback()).then(function () {return value;});},
    function (reason) {return promise.resolve(callback()).then(function () {
        throw reason;
      });});

  };
}

function promisify(name, api) {
  if (!shouldPromise(name)) {
    return api;
  }
  return function promiseApi() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};for (var _len2 = arguments.length, params = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {params[_key2 - 1] = arguments[_key2];}
    if (isFn(options.success) || isFn(options.fail) || isFn(options.complete)) {
      return wrapperReturnValue(name, invokeApi.apply(void 0, [name, api, options].concat(params)));
    }
    return wrapperReturnValue(name, handlePromise(new Promise(function (resolve, reject) {
      invokeApi.apply(void 0, [name, api, Object.assign({}, options, {
        success: resolve,
        fail: reject })].concat(
      params));
    })));
  };
}

var EPS = 1e-4;
var BASE_DEVICE_WIDTH = 750;
var isIOS = false;
var deviceWidth = 0;
var deviceDPR = 0;

function checkDeviceWidth() {var _wx$getSystemInfoSync =




  wx.getSystemInfoSync(),platform = _wx$getSystemInfoSync.platform,pixelRatio = _wx$getSystemInfoSync.pixelRatio,windowWidth = _wx$getSystemInfoSync.windowWidth; // uni=>wx runtime 编译目标是 uni 对象，内部不允许直接使用 uni

  deviceWidth = windowWidth;
  deviceDPR = pixelRatio;
  isIOS = platform === 'ios';
}

function upx2px(number, newDeviceWidth) {
  if (deviceWidth === 0) {
    checkDeviceWidth();
  }

  number = Number(number);
  if (number === 0) {
    return 0;
  }
  var result = number / BASE_DEVICE_WIDTH * (newDeviceWidth || deviceWidth);
  if (result < 0) {
    result = -result;
  }
  result = Math.floor(result + EPS);
  if (result === 0) {
    if (deviceDPR === 1 || !isIOS) {
      return 1;
    } else {
      return 0.5;
    }
  }
  return number < 0 ? -result : result;
}

var interceptors = {
  promiseInterceptor: promiseInterceptor };


var baseApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  upx2px: upx2px,
  addInterceptor: addInterceptor,
  removeInterceptor: removeInterceptor,
  interceptors: interceptors });


var previewImage = {
  args: function args(fromArgs) {
    var currentIndex = parseInt(fromArgs.current);
    if (isNaN(currentIndex)) {
      return;
    }
    var urls = fromArgs.urls;
    if (!Array.isArray(urls)) {
      return;
    }
    var len = urls.length;
    if (!len) {
      return;
    }
    if (currentIndex < 0) {
      currentIndex = 0;
    } else if (currentIndex >= len) {
      currentIndex = len - 1;
    }
    if (currentIndex > 0) {
      fromArgs.current = urls[currentIndex];
      fromArgs.urls = urls.filter(
      function (item, index) {return index < currentIndex ? item !== urls[currentIndex] : true;});

    } else {
      fromArgs.current = urls[0];
    }
    return {
      indicator: false,
      loop: false };

  } };


function addSafeAreaInsets(result) {
  if (result.safeArea) {
    var safeArea = result.safeArea;
    result.safeAreaInsets = {
      top: safeArea.top,
      left: safeArea.left,
      right: result.windowWidth - safeArea.right,
      bottom: result.windowHeight - safeArea.bottom };

  }
}
var protocols = {
  previewImage: previewImage,
  getSystemInfo: {
    returnValue: addSafeAreaInsets },

  getSystemInfoSync: {
    returnValue: addSafeAreaInsets } };


var todos = [
'vibrate'];

var canIUses = [];

var CALLBACKS = ['success', 'fail', 'cancel', 'complete'];

function processCallback(methodName, method, returnValue) {
  return function (res) {
    return method(processReturnValue(methodName, res, returnValue));
  };
}

function processArgs(methodName, fromArgs) {var argsOption = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};var returnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};var keepFromArgs = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
  if (isPlainObject(fromArgs)) {// 一般 api 的参数解析
    var toArgs = keepFromArgs === true ? fromArgs : {}; // returnValue 为 false 时，说明是格式化返回值，直接在返回值对象上修改赋值
    if (isFn(argsOption)) {
      argsOption = argsOption(fromArgs, toArgs) || {};
    }
    for (var key in fromArgs) {
      if (hasOwn(argsOption, key)) {
        var keyOption = argsOption[key];
        if (isFn(keyOption)) {
          keyOption = keyOption(fromArgs[key], fromArgs, toArgs);
        }
        if (!keyOption) {// 不支持的参数
          console.warn("\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F ".concat(methodName, "\u6682\u4E0D\u652F\u6301").concat(key));
        } else if (isStr(keyOption)) {// 重写参数 key
          toArgs[keyOption] = fromArgs[key];
        } else if (isPlainObject(keyOption)) {// {name:newName,value:value}可重新指定参数 key:value
          toArgs[keyOption.name ? keyOption.name : key] = keyOption.value;
        }
      } else if (CALLBACKS.indexOf(key) !== -1) {
        toArgs[key] = processCallback(methodName, fromArgs[key], returnValue);
      } else {
        if (!keepFromArgs) {
          toArgs[key] = fromArgs[key];
        }
      }
    }
    return toArgs;
  } else if (isFn(fromArgs)) {
    fromArgs = processCallback(methodName, fromArgs, returnValue);
  }
  return fromArgs;
}

function processReturnValue(methodName, res, returnValue) {var keepReturnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  if (isFn(protocols.returnValue)) {// 处理通用 returnValue
    res = protocols.returnValue(methodName, res);
  }
  return processArgs(methodName, res, returnValue, {}, keepReturnValue);
}

function wrapper(methodName, method) {
  if (hasOwn(protocols, methodName)) {
    var protocol = protocols[methodName];
    if (!protocol) {// 暂不支持的 api
      return function () {
        console.error("\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F \u6682\u4E0D\u652F\u6301".concat(methodName));
      };
    }
    return function (arg1, arg2) {// 目前 api 最多两个参数
      var options = protocol;
      if (isFn(protocol)) {
        options = protocol(arg1);
      }

      arg1 = processArgs(methodName, arg1, options.args, options.returnValue);

      var args = [arg1];
      if (typeof arg2 !== 'undefined') {
        args.push(arg2);
      }
      var returnValue = wx[options.name || methodName].apply(wx, args);
      if (isSyncApi(methodName)) {// 同步 api
        return processReturnValue(methodName, returnValue, options.returnValue, isContextApi(methodName));
      }
      return returnValue;
    };
  }
  return method;
}

var todoApis = Object.create(null);

var TODOS = [
'onTabBarMidButtonTap',
'subscribePush',
'unsubscribePush',
'onPush',
'offPush',
'share'];


function createTodoApi(name) {
  return function todoApi(_ref)


  {var fail = _ref.fail,complete = _ref.complete;
    var res = {
      errMsg: "".concat(name, ":fail:\u6682\u4E0D\u652F\u6301 ").concat(name, " \u65B9\u6CD5") };

    isFn(fail) && fail(res);
    isFn(complete) && complete(res);
  };
}

TODOS.forEach(function (name) {
  todoApis[name] = createTodoApi(name);
});

var providers = {
  oauth: ['weixin'],
  share: ['weixin'],
  payment: ['wxpay'],
  push: ['weixin'] };


function getProvider(_ref2)




{var service = _ref2.service,success = _ref2.success,fail = _ref2.fail,complete = _ref2.complete;
  var res = false;
  if (providers[service]) {
    res = {
      errMsg: 'getProvider:ok',
      service: service,
      provider: providers[service] };

    isFn(success) && success(res);
  } else {
    res = {
      errMsg: 'getProvider:fail:服务[' + service + ']不存在' };

    isFn(fail) && fail(res);
  }
  isFn(complete) && complete(res);
}

var extraApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  getProvider: getProvider });


var getEmitter = function () {
  if (typeof getUniEmitter === 'function') {
    /* eslint-disable no-undef */
    return getUniEmitter;
  }
  var Emitter;
  return function getUniEmitter() {
    if (!Emitter) {
      Emitter = new _vue.default();
    }
    return Emitter;
  };
}();

function apply(ctx, method, args) {
  return ctx[method].apply(ctx, args);
}

function $on() {
  return apply(getEmitter(), '$on', Array.prototype.slice.call(arguments));
}
function $off() {
  return apply(getEmitter(), '$off', Array.prototype.slice.call(arguments));
}
function $once() {
  return apply(getEmitter(), '$once', Array.prototype.slice.call(arguments));
}
function $emit() {
  return apply(getEmitter(), '$emit', Array.prototype.slice.call(arguments));
}

var eventApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  $on: $on,
  $off: $off,
  $once: $once,
  $emit: $emit });


var api = /*#__PURE__*/Object.freeze({
  __proto__: null });


var MPPage = Page;
var MPComponent = Component;

var customizeRE = /:/g;

var customize = cached(function (str) {
  return camelize(str.replace(customizeRE, '-'));
});

function initTriggerEvent(mpInstance) {
  {
    if (!wx.canIUse('nextTick')) {
      return;
    }
  }
  var oldTriggerEvent = mpInstance.triggerEvent;
  mpInstance.triggerEvent = function (event) {for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {args[_key3 - 1] = arguments[_key3];}
    return oldTriggerEvent.apply(mpInstance, [customize(event)].concat(args));
  };
}

function initHook(name, options) {
  var oldHook = options[name];
  if (!oldHook) {
    options[name] = function () {
      initTriggerEvent(this);
    };
  } else {
    options[name] = function () {
      initTriggerEvent(this);for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {args[_key4] = arguments[_key4];}
      return oldHook.apply(this, args);
    };
  }
}

Page = function Page() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  initHook('onLoad', options);
  return MPPage(options);
};

Component = function Component() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  initHook('created', options);
  return MPComponent(options);
};

var PAGE_EVENT_HOOKS = [
'onPullDownRefresh',
'onReachBottom',
'onShareAppMessage',
'onPageScroll',
'onResize',
'onTabItemTap'];


function initMocks(vm, mocks) {
  var mpInstance = vm.$mp[vm.mpType];
  mocks.forEach(function (mock) {
    if (hasOwn(mpInstance, mock)) {
      vm[mock] = mpInstance[mock];
    }
  });
}

function hasHook(hook, vueOptions) {
  if (!vueOptions) {
    return true;
  }

  if (_vue.default.options && Array.isArray(_vue.default.options[hook])) {
    return true;
  }

  vueOptions = vueOptions.default || vueOptions;

  if (isFn(vueOptions)) {
    if (isFn(vueOptions.extendOptions[hook])) {
      return true;
    }
    if (vueOptions.super &&
    vueOptions.super.options &&
    Array.isArray(vueOptions.super.options[hook])) {
      return true;
    }
    return false;
  }

  if (isFn(vueOptions[hook])) {
    return true;
  }
  var mixins = vueOptions.mixins;
  if (Array.isArray(mixins)) {
    return !!mixins.find(function (mixin) {return hasHook(hook, mixin);});
  }
}

function initHooks(mpOptions, hooks, vueOptions) {
  hooks.forEach(function (hook) {
    if (hasHook(hook, vueOptions)) {
      mpOptions[hook] = function (args) {
        return this.$vm && this.$vm.__call_hook(hook, args);
      };
    }
  });
}

function initVueComponent(Vue, vueOptions) {
  vueOptions = vueOptions.default || vueOptions;
  var VueComponent;
  if (isFn(vueOptions)) {
    VueComponent = vueOptions;
  } else {
    VueComponent = Vue.extend(vueOptions);
  }
  vueOptions = VueComponent.options;
  return [VueComponent, vueOptions];
}

function initSlots(vm, vueSlots) {
  if (Array.isArray(vueSlots) && vueSlots.length) {
    var $slots = Object.create(null);
    vueSlots.forEach(function (slotName) {
      $slots[slotName] = true;
    });
    vm.$scopedSlots = vm.$slots = $slots;
  }
}

function initVueIds(vueIds, mpInstance) {
  vueIds = (vueIds || '').split(',');
  var len = vueIds.length;

  if (len === 1) {
    mpInstance._$vueId = vueIds[0];
  } else if (len === 2) {
    mpInstance._$vueId = vueIds[0];
    mpInstance._$vuePid = vueIds[1];
  }
}

function initData(vueOptions, context) {
  var data = vueOptions.data || {};
  var methods = vueOptions.methods || {};

  if (typeof data === 'function') {
    try {
      data = data.call(context); // 支持 Vue.prototype 上挂的数据
    } catch (e) {
      if (Object({"NODE_ENV":"development","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.warn('根据 Vue 的 data 函数初始化小程序 data 失败，请尽量确保 data 函数中不访问 vm 对象，否则可能影响首次数据渲染速度。', data);
      }
    }
  } else {
    try {
      // 对 data 格式化
      data = JSON.parse(JSON.stringify(data));
    } catch (e) {}
  }

  if (!isPlainObject(data)) {
    data = {};
  }

  Object.keys(methods).forEach(function (methodName) {
    if (context.__lifecycle_hooks__.indexOf(methodName) === -1 && !hasOwn(data, methodName)) {
      data[methodName] = methods[methodName];
    }
  });

  return data;
}

var PROP_TYPES = [String, Number, Boolean, Object, Array, null];

function createObserver(name) {
  return function observer(newVal, oldVal) {
    if (this.$vm) {
      this.$vm[name] = newVal; // 为了触发其他非 render watcher
    }
  };
}

function initBehaviors(vueOptions, initBehavior) {
  var vueBehaviors = vueOptions.behaviors;
  var vueExtends = vueOptions.extends;
  var vueMixins = vueOptions.mixins;

  var vueProps = vueOptions.props;

  if (!vueProps) {
    vueOptions.props = vueProps = [];
  }

  var behaviors = [];
  if (Array.isArray(vueBehaviors)) {
    vueBehaviors.forEach(function (behavior) {
      behaviors.push(behavior.replace('uni://', "wx".concat("://")));
      if (behavior === 'uni://form-field') {
        if (Array.isArray(vueProps)) {
          vueProps.push('name');
          vueProps.push('value');
        } else {
          vueProps.name = {
            type: String,
            default: '' };

          vueProps.value = {
            type: [String, Number, Boolean, Array, Object, Date],
            default: '' };

        }
      }
    });
  }
  if (isPlainObject(vueExtends) && vueExtends.props) {
    behaviors.push(
    initBehavior({
      properties: initProperties(vueExtends.props, true) }));


  }
  if (Array.isArray(vueMixins)) {
    vueMixins.forEach(function (vueMixin) {
      if (isPlainObject(vueMixin) && vueMixin.props) {
        behaviors.push(
        initBehavior({
          properties: initProperties(vueMixin.props, true) }));


      }
    });
  }
  return behaviors;
}

function parsePropType(key, type, defaultValue, file) {
  // [String]=>String
  if (Array.isArray(type) && type.length === 1) {
    return type[0];
  }
  return type;
}

function initProperties(props) {var isBehavior = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;var file = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  var properties = {};
  if (!isBehavior) {
    properties.vueId = {
      type: String,
      value: '' };

    properties.vueSlots = { // 小程序不能直接定义 $slots 的 props，所以通过 vueSlots 转换到 $slots
      type: null,
      value: [],
      observer: function observer(newVal, oldVal) {
        var $slots = Object.create(null);
        newVal.forEach(function (slotName) {
          $slots[slotName] = true;
        });
        this.setData({
          $slots: $slots });

      } };

  }
  if (Array.isArray(props)) {// ['title']
    props.forEach(function (key) {
      properties[key] = {
        type: null,
        observer: createObserver(key) };

    });
  } else if (isPlainObject(props)) {// {title:{type:String,default:''},content:String}
    Object.keys(props).forEach(function (key) {
      var opts = props[key];
      if (isPlainObject(opts)) {// title:{type:String,default:''}
        var value = opts.default;
        if (isFn(value)) {
          value = value();
        }

        opts.type = parsePropType(key, opts.type);

        properties[key] = {
          type: PROP_TYPES.indexOf(opts.type) !== -1 ? opts.type : null,
          value: value,
          observer: createObserver(key) };

      } else {// content:String
        var type = parsePropType(key, opts);
        properties[key] = {
          type: PROP_TYPES.indexOf(type) !== -1 ? type : null,
          observer: createObserver(key) };

      }
    });
  }
  return properties;
}

function wrapper$1(event) {
  // TODO 又得兼容 mpvue 的 mp 对象
  try {
    event.mp = JSON.parse(JSON.stringify(event));
  } catch (e) {}

  event.stopPropagation = noop;
  event.preventDefault = noop;

  event.target = event.target || {};

  if (!hasOwn(event, 'detail')) {
    event.detail = {};
  }

  if (hasOwn(event, 'markerId')) {
    event.detail = typeof event.detail === 'object' ? event.detail : {};
    event.detail.markerId = event.markerId;
  }

  if (isPlainObject(event.detail)) {
    event.target = Object.assign({}, event.target, event.detail);
  }

  return event;
}

function getExtraValue(vm, dataPathsArray) {
  var context = vm;
  dataPathsArray.forEach(function (dataPathArray) {
    var dataPath = dataPathArray[0];
    var value = dataPathArray[2];
    if (dataPath || typeof value !== 'undefined') {// ['','',index,'disable']
      var propPath = dataPathArray[1];
      var valuePath = dataPathArray[3];

      var vFor = dataPath ? vm.__get_value(dataPath, context) : context;

      if (Number.isInteger(vFor)) {
        context = value;
      } else if (!propPath) {
        context = vFor[value];
      } else {
        if (Array.isArray(vFor)) {
          context = vFor.find(function (vForItem) {
            return vm.__get_value(propPath, vForItem) === value;
          });
        } else if (isPlainObject(vFor)) {
          context = Object.keys(vFor).find(function (vForKey) {
            return vm.__get_value(propPath, vFor[vForKey]) === value;
          });
        } else {
          console.error('v-for 暂不支持循环数据：', vFor);
        }
      }

      if (valuePath) {
        context = vm.__get_value(valuePath, context);
      }
    }
  });
  return context;
}

function processEventExtra(vm, extra, event) {
  var extraObj = {};

  if (Array.isArray(extra) && extra.length) {
    /**
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *'test'
                                              */
    extra.forEach(function (dataPath, index) {
      if (typeof dataPath === 'string') {
        if (!dataPath) {// model,prop.sync
          extraObj['$' + index] = vm;
        } else {
          if (dataPath === '$event') {// $event
            extraObj['$' + index] = event;
          } else if (dataPath.indexOf('$event.') === 0) {// $event.target.value
            extraObj['$' + index] = vm.__get_value(dataPath.replace('$event.', ''), event);
          } else {
            extraObj['$' + index] = vm.__get_value(dataPath);
          }
        }
      } else {
        extraObj['$' + index] = getExtraValue(vm, dataPath);
      }
    });
  }

  return extraObj;
}

function getObjByArray(arr) {
  var obj = {};
  for (var i = 1; i < arr.length; i++) {
    var element = arr[i];
    obj[element[0]] = element[1];
  }
  return obj;
}

function processEventArgs(vm, event) {var args = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];var extra = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];var isCustom = arguments.length > 4 ? arguments[4] : undefined;var methodName = arguments.length > 5 ? arguments[5] : undefined;
  var isCustomMPEvent = false; // wxcomponent 组件，传递原始 event 对象
  if (isCustom) {// 自定义事件
    isCustomMPEvent = event.currentTarget &&
    event.currentTarget.dataset &&
    event.currentTarget.dataset.comType === 'wx';
    if (!args.length) {// 无参数，直接传入 event 或 detail 数组
      if (isCustomMPEvent) {
        return [event];
      }
      return event.detail.__args__ || event.detail;
    }
  }

  var extraObj = processEventExtra(vm, extra, event);

  var ret = [];
  args.forEach(function (arg) {
    if (arg === '$event') {
      if (methodName === '__set_model' && !isCustom) {// input v-model value
        ret.push(event.target.value);
      } else {
        if (isCustom && !isCustomMPEvent) {
          ret.push(event.detail.__args__[0]);
        } else {// wxcomponent 组件或内置组件
          ret.push(event);
        }
      }
    } else {
      if (Array.isArray(arg) && arg[0] === 'o') {
        ret.push(getObjByArray(arg));
      } else if (typeof arg === 'string' && hasOwn(extraObj, arg)) {
        ret.push(extraObj[arg]);
      } else {
        ret.push(arg);
      }
    }
  });

  return ret;
}

var ONCE = '~';
var CUSTOM = '^';

function isMatchEventType(eventType, optType) {
  return eventType === optType ||

  optType === 'regionchange' && (

  eventType === 'begin' ||
  eventType === 'end');


}

function handleEvent(event) {var _this = this;
  event = wrapper$1(event);

  // [['tap',[['handle',[1,2,a]],['handle1',[1,2,a]]]]]
  var dataset = (event.currentTarget || event.target).dataset;
  if (!dataset) {
    return console.warn('事件信息不存在');
  }
  var eventOpts = dataset.eventOpts || dataset['event-opts']; // 支付宝 web-view 组件 dataset 非驼峰
  if (!eventOpts) {
    return console.warn('事件信息不存在');
  }

  // [['handle',[1,2,a]],['handle1',[1,2,a]]]
  var eventType = event.type;

  var ret = [];

  eventOpts.forEach(function (eventOpt) {
    var type = eventOpt[0];
    var eventsArray = eventOpt[1];

    var isCustom = type.charAt(0) === CUSTOM;
    type = isCustom ? type.slice(1) : type;
    var isOnce = type.charAt(0) === ONCE;
    type = isOnce ? type.slice(1) : type;

    if (eventsArray && isMatchEventType(eventType, type)) {
      eventsArray.forEach(function (eventArray) {
        var methodName = eventArray[0];
        if (methodName) {
          var handlerCtx = _this.$vm;
          if (
          handlerCtx.$options.generic &&
          handlerCtx.$parent &&
          handlerCtx.$parent.$parent)
          {// mp-weixin,mp-toutiao 抽象节点模拟 scoped slots
            handlerCtx = handlerCtx.$parent.$parent;
          }
          if (methodName === '$emit') {
            handlerCtx.$emit.apply(handlerCtx,
            processEventArgs(
            _this.$vm,
            event,
            eventArray[1],
            eventArray[2],
            isCustom,
            methodName));

            return;
          }
          var handler = handlerCtx[methodName];
          if (!isFn(handler)) {
            throw new Error(" _vm.".concat(methodName, " is not a function"));
          }
          if (isOnce) {
            if (handler.once) {
              return;
            }
            handler.once = true;
          }
          ret.push(handler.apply(handlerCtx, processEventArgs(
          _this.$vm,
          event,
          eventArray[1],
          eventArray[2],
          isCustom,
          methodName)));

        }
      });
    }
  });

  if (
  eventType === 'input' &&
  ret.length === 1 &&
  typeof ret[0] !== 'undefined')
  {
    return ret[0];
  }
}

var hooks = [
'onShow',
'onHide',
'onError',
'onPageNotFound'];


function parseBaseApp(vm, _ref3)


{var mocks = _ref3.mocks,initRefs = _ref3.initRefs;
  if (vm.$options.store) {
    _vue.default.prototype.$store = vm.$options.store;
  }

  _vue.default.prototype.mpHost = "mp-weixin";

  _vue.default.mixin({
    beforeCreate: function beforeCreate() {
      if (!this.$options.mpType) {
        return;
      }

      this.mpType = this.$options.mpType;

      this.$mp = _defineProperty({
        data: {} },
      this.mpType, this.$options.mpInstance);


      this.$scope = this.$options.mpInstance;

      delete this.$options.mpType;
      delete this.$options.mpInstance;

      if (this.mpType !== 'app') {
        initRefs(this);
        initMocks(this, mocks);
      }
    } });


  var appOptions = {
    onLaunch: function onLaunch(args) {
      if (this.$vm) {// 已经初始化过了，主要是为了百度，百度 onShow 在 onLaunch 之前
        return;
      }
      {
        if (!wx.canIUse('nextTick')) {// 事实 上2.2.3 即可，简单使用 2.3.0 的 nextTick 判断
          console.error('当前微信基础库版本过低，请将 微信开发者工具-详情-项目设置-调试基础库版本 更换为`2.3.0`以上');
        }
      }

      this.$vm = vm;

      this.$vm.$mp = {
        app: this };


      this.$vm.$scope = this;
      // vm 上也挂载 globalData
      this.$vm.globalData = this.globalData;

      this.$vm._isMounted = true;
      this.$vm.__call_hook('mounted', args);

      this.$vm.__call_hook('onLaunch', args);
    } };


  // 兼容旧版本 globalData
  appOptions.globalData = vm.$options.globalData || {};
  // 将 methods 中的方法挂在 getApp() 中
  var methods = vm.$options.methods;
  if (methods) {
    Object.keys(methods).forEach(function (name) {
      appOptions[name] = methods[name];
    });
  }

  initHooks(appOptions, hooks);

  return appOptions;
}

var mocks = ['__route__', '__wxExparserNodeId__', '__wxWebviewId__'];

function findVmByVueId(vm, vuePid) {
  var $children = vm.$children;
  // 优先查找直属(反向查找:https://github.com/dcloudio/uni-app/issues/1200)
  for (var i = $children.length - 1; i >= 0; i--) {
    var childVm = $children[i];
    if (childVm.$scope._$vueId === vuePid) {
      return childVm;
    }
  }
  // 反向递归查找
  var parentVm;
  for (var _i = $children.length - 1; _i >= 0; _i--) {
    parentVm = findVmByVueId($children[_i], vuePid);
    if (parentVm) {
      return parentVm;
    }
  }
}

function initBehavior(options) {
  return Behavior(options);
}

function isPage() {
  return !!this.route;
}

function initRelation(detail) {
  this.triggerEvent('__l', detail);
}

function initRefs(vm) {
  var mpInstance = vm.$scope;
  Object.defineProperty(vm, '$refs', {
    get: function get() {
      var $refs = {};
      var components = mpInstance.selectAllComponents('.vue-ref');
      components.forEach(function (component) {
        var ref = component.dataset.ref;
        $refs[ref] = component.$vm || component;
      });
      var forComponents = mpInstance.selectAllComponents('.vue-ref-in-for');
      forComponents.forEach(function (component) {
        var ref = component.dataset.ref;
        if (!$refs[ref]) {
          $refs[ref] = [];
        }
        $refs[ref].push(component.$vm || component);
      });
      return $refs;
    } });

}

function handleLink(event) {var _ref4 =



  event.detail || event.value,vuePid = _ref4.vuePid,vueOptions = _ref4.vueOptions; // detail 是微信,value 是百度(dipatch)

  var parentVm;

  if (vuePid) {
    parentVm = findVmByVueId(this.$vm, vuePid);
  }

  if (!parentVm) {
    parentVm = this.$vm;
  }

  vueOptions.parent = parentVm;
}

function parseApp(vm) {
  return parseBaseApp(vm, {
    mocks: mocks,
    initRefs: initRefs });

}

function createApp(vm) {
  App(parseApp(vm));
  return vm;
}

function parseBaseComponent(vueComponentOptions)


{var _ref5 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},isPage = _ref5.isPage,initRelation = _ref5.initRelation;var _initVueComponent =
  initVueComponent(_vue.default, vueComponentOptions),_initVueComponent2 = _slicedToArray(_initVueComponent, 2),VueComponent = _initVueComponent2[0],vueOptions = _initVueComponent2[1];

  var options = _objectSpread({
    multipleSlots: true,
    addGlobalClass: true },
  vueOptions.options || {});


  {
    // 微信 multipleSlots 部分情况有 bug，导致内容顺序错乱 如 u-list，提供覆盖选项
    if (vueOptions['mp-weixin'] && vueOptions['mp-weixin'].options) {
      Object.assign(options, vueOptions['mp-weixin'].options);
    }
  }

  var componentOptions = {
    options: options,
    data: initData(vueOptions, _vue.default.prototype),
    behaviors: initBehaviors(vueOptions, initBehavior),
    properties: initProperties(vueOptions.props, false, vueOptions.__file),
    lifetimes: {
      attached: function attached() {
        var properties = this.properties;

        var options = {
          mpType: isPage.call(this) ? 'page' : 'component',
          mpInstance: this,
          propsData: properties };


        initVueIds(properties.vueId, this);

        // 处理父子关系
        initRelation.call(this, {
          vuePid: this._$vuePid,
          vueOptions: options });


        // 初始化 vue 实例
        this.$vm = new VueComponent(options);

        // 处理$slots,$scopedSlots（暂不支持动态变化$slots）
        initSlots(this.$vm, properties.vueSlots);

        // 触发首次 setData
        this.$vm.$mount();
      },
      ready: function ready() {
        // 当组件 props 默认值为 true，初始化时传入 false 会导致 created,ready 触发, 但 attached 不触发
        // https://developers.weixin.qq.com/community/develop/doc/00066ae2844cc0f8eb883e2a557800
        if (this.$vm) {
          this.$vm._isMounted = true;
          this.$vm.__call_hook('mounted');
          this.$vm.__call_hook('onReady');
        }
      },
      detached: function detached() {
        this.$vm && this.$vm.$destroy();
      } },

    pageLifetimes: {
      show: function show(args) {
        this.$vm && this.$vm.__call_hook('onPageShow', args);
      },
      hide: function hide() {
        this.$vm && this.$vm.__call_hook('onPageHide');
      },
      resize: function resize(size) {
        this.$vm && this.$vm.__call_hook('onPageResize', size);
      } },

    methods: {
      __l: handleLink,
      __e: handleEvent } };


  // externalClasses
  if (vueOptions.externalClasses) {
    componentOptions.externalClasses = vueOptions.externalClasses;
  }

  if (Array.isArray(vueOptions.wxsCallMethods)) {
    vueOptions.wxsCallMethods.forEach(function (callMethod) {
      componentOptions.methods[callMethod] = function (args) {
        return this.$vm[callMethod](args);
      };
    });
  }

  if (isPage) {
    return componentOptions;
  }
  return [componentOptions, VueComponent];
}

function parseComponent(vueComponentOptions) {
  return parseBaseComponent(vueComponentOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

var hooks$1 = [
'onShow',
'onHide',
'onUnload'];


hooks$1.push.apply(hooks$1, PAGE_EVENT_HOOKS);

function parseBasePage(vuePageOptions, _ref6)


{var isPage = _ref6.isPage,initRelation = _ref6.initRelation;
  var pageOptions = parseComponent(vuePageOptions);

  initHooks(pageOptions.methods, hooks$1, vuePageOptions);

  pageOptions.methods.onLoad = function (args) {
    this.$vm.$mp.query = args; // 兼容 mpvue
    this.$vm.__call_hook('onLoad', args);
  };

  return pageOptions;
}

function parsePage(vuePageOptions) {
  return parseBasePage(vuePageOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

function createPage(vuePageOptions) {
  {
    return Component(parsePage(vuePageOptions));
  }
}

function createComponent(vueOptions) {
  {
    return Component(parseComponent(vueOptions));
  }
}

todos.forEach(function (todoApi) {
  protocols[todoApi] = false;
});

canIUses.forEach(function (canIUseApi) {
  var apiName = protocols[canIUseApi] && protocols[canIUseApi].name ? protocols[canIUseApi].name :
  canIUseApi;
  if (!wx.canIUse(apiName)) {
    protocols[canIUseApi] = false;
  }
});

var uni = {};

if (typeof Proxy !== 'undefined' && "mp-weixin" !== 'app-plus') {
  uni = new Proxy({}, {
    get: function get(target, name) {
      if (target[name]) {
        return target[name];
      }
      if (baseApi[name]) {
        return baseApi[name];
      }
      if (api[name]) {
        return promisify(name, api[name]);
      }
      {
        if (extraApi[name]) {
          return promisify(name, extraApi[name]);
        }
        if (todoApis[name]) {
          return promisify(name, todoApis[name]);
        }
      }
      if (eventApi[name]) {
        return eventApi[name];
      }
      if (!hasOwn(wx, name) && !hasOwn(protocols, name)) {
        return;
      }
      return promisify(name, wrapper(name, wx[name]));
    },
    set: function set(target, name, value) {
      target[name] = value;
      return true;
    } });

} else {
  Object.keys(baseApi).forEach(function (name) {
    uni[name] = baseApi[name];
  });

  {
    Object.keys(todoApis).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
    Object.keys(extraApi).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
  }

  Object.keys(eventApi).forEach(function (name) {
    uni[name] = eventApi[name];
  });

  Object.keys(api).forEach(function (name) {
    uni[name] = promisify(name, api[name]);
  });

  Object.keys(wx).forEach(function (name) {
    if (hasOwn(wx, name) || hasOwn(protocols, name)) {
      uni[name] = promisify(name, wrapper(name, wx[name]));
    }
  });
}

wx.createApp = createApp;
wx.createPage = createPage;
wx.createComponent = createComponent;

var uni$1 = uni;var _default =

uni$1;exports.default = _default;

/***/ }),

/***/ 10:
/*!**********************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js ***!
  \**********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return normalizeComponent; });
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode, /* vue-cli only */
  components, // fixed by xxxxxx auto components
  renderjs // fixed by xxxxxx renderjs
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // fixed by xxxxxx auto components
  if (components) {
    if (!options.components) {
      options.components = {}
    }
    var hasOwn = Object.prototype.hasOwnProperty
    for (var name in components) {
      if (hasOwn.call(components, name) && !hasOwn.call(options.components, name)) {
        options.components[name] = components[name]
      }
    }
  }
  // fixed by xxxxxx renderjs
  if (renderjs) {
    (renderjs.beforeCreate || (renderjs.beforeCreate = [])).unshift(function() {
      this[renderjs.__module] = this
    });
    (options.mixins || (options.mixins = [])).push(renderjs)
  }

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () { injectStyles.call(this, this.$root.$options.shadowRoot) }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}


/***/ }),

/***/ 2:
/*!******************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js ***!
  \******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * Vue.js v2.6.11
 * (c) 2014-2020 Evan You
 * Released under the MIT License.
 */
/*  */

var emptyObject = Object.freeze({});

// These helpers produce better VM code in JS engines due to their
// explicitness and function inlining.
function isUndef (v) {
  return v === undefined || v === null
}

function isDef (v) {
  return v !== undefined && v !== null
}

function isTrue (v) {
  return v === true
}

function isFalse (v) {
  return v === false
}

/**
 * Check if value is primitive.
 */
function isPrimitive (value) {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    // $flow-disable-line
    typeof value === 'symbol' ||
    typeof value === 'boolean'
  )
}

/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */
function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

/**
 * Get the raw type string of a value, e.g., [object Object].
 */
var _toString = Object.prototype.toString;

function toRawType (value) {
  return _toString.call(value).slice(8, -1)
}

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */
function isPlainObject (obj) {
  return _toString.call(obj) === '[object Object]'
}

function isRegExp (v) {
  return _toString.call(v) === '[object RegExp]'
}

/**
 * Check if val is a valid array index.
 */
function isValidArrayIndex (val) {
  var n = parseFloat(String(val));
  return n >= 0 && Math.floor(n) === n && isFinite(val)
}

function isPromise (val) {
  return (
    isDef(val) &&
    typeof val.then === 'function' &&
    typeof val.catch === 'function'
  )
}

/**
 * Convert a value to a string that is actually rendered.
 */
function toString (val) {
  return val == null
    ? ''
    : Array.isArray(val) || (isPlainObject(val) && val.toString === _toString)
      ? JSON.stringify(val, null, 2)
      : String(val)
}

/**
 * Convert an input value to a number for persistence.
 * If the conversion fails, return original string.
 */
function toNumber (val) {
  var n = parseFloat(val);
  return isNaN(n) ? val : n
}

/**
 * Make a map and return a function for checking if a key
 * is in that map.
 */
function makeMap (
  str,
  expectsLowerCase
) {
  var map = Object.create(null);
  var list = str.split(',');
  for (var i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase
    ? function (val) { return map[val.toLowerCase()]; }
    : function (val) { return map[val]; }
}

/**
 * Check if a tag is a built-in tag.
 */
var isBuiltInTag = makeMap('slot,component', true);

/**
 * Check if an attribute is a reserved attribute.
 */
var isReservedAttribute = makeMap('key,ref,slot,slot-scope,is');

/**
 * Remove an item from an array.
 */
function remove (arr, item) {
  if (arr.length) {
    var index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

/**
 * Check whether an object has the property.
 */
var hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn (obj, key) {
  return hasOwnProperty.call(obj, key)
}

/**
 * Create a cached version of a pure function.
 */
function cached (fn) {
  var cache = Object.create(null);
  return (function cachedFn (str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str))
  })
}

/**
 * Camelize a hyphen-delimited string.
 */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) { return c ? c.toUpperCase() : ''; })
});

/**
 * Capitalize a string.
 */
var capitalize = cached(function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
});

/**
 * Hyphenate a camelCase string.
 */
var hyphenateRE = /\B([A-Z])/g;
var hyphenate = cached(function (str) {
  return str.replace(hyphenateRE, '-$1').toLowerCase()
});

/**
 * Simple bind polyfill for environments that do not support it,
 * e.g., PhantomJS 1.x. Technically, we don't need this anymore
 * since native bind is now performant enough in most browsers.
 * But removing it would mean breaking code that was able to run in
 * PhantomJS 1.x, so this must be kept for backward compatibility.
 */

/* istanbul ignore next */
function polyfillBind (fn, ctx) {
  function boundFn (a) {
    var l = arguments.length;
    return l
      ? l > 1
        ? fn.apply(ctx, arguments)
        : fn.call(ctx, a)
      : fn.call(ctx)
  }

  boundFn._length = fn.length;
  return boundFn
}

function nativeBind (fn, ctx) {
  return fn.bind(ctx)
}

var bind = Function.prototype.bind
  ? nativeBind
  : polyfillBind;

/**
 * Convert an Array-like object to a real Array.
 */
function toArray (list, start) {
  start = start || 0;
  var i = list.length - start;
  var ret = new Array(i);
  while (i--) {
    ret[i] = list[i + start];
  }
  return ret
}

/**
 * Mix properties into target object.
 */
function extend (to, _from) {
  for (var key in _from) {
    to[key] = _from[key];
  }
  return to
}

/**
 * Merge an Array of Objects into a single Object.
 */
function toObject (arr) {
  var res = {};
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }
  return res
}

/* eslint-disable no-unused-vars */

/**
 * Perform no operation.
 * Stubbing args to make Flow happy without leaving useless transpiled code
 * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/).
 */
function noop (a, b, c) {}

/**
 * Always return false.
 */
var no = function (a, b, c) { return false; };

/* eslint-enable no-unused-vars */

/**
 * Return the same value.
 */
var identity = function (_) { return _; };

/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */
function looseEqual (a, b) {
  if (a === b) { return true }
  var isObjectA = isObject(a);
  var isObjectB = isObject(b);
  if (isObjectA && isObjectB) {
    try {
      var isArrayA = Array.isArray(a);
      var isArrayB = Array.isArray(b);
      if (isArrayA && isArrayB) {
        return a.length === b.length && a.every(function (e, i) {
          return looseEqual(e, b[i])
        })
      } else if (a instanceof Date && b instanceof Date) {
        return a.getTime() === b.getTime()
      } else if (!isArrayA && !isArrayB) {
        var keysA = Object.keys(a);
        var keysB = Object.keys(b);
        return keysA.length === keysB.length && keysA.every(function (key) {
          return looseEqual(a[key], b[key])
        })
      } else {
        /* istanbul ignore next */
        return false
      }
    } catch (e) {
      /* istanbul ignore next */
      return false
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b)
  } else {
    return false
  }
}

/**
 * Return the first index at which a loosely equal value can be
 * found in the array (if value is a plain object, the array must
 * contain an object of the same shape), or -1 if it is not present.
 */
function looseIndexOf (arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (looseEqual(arr[i], val)) { return i }
  }
  return -1
}

/**
 * Ensure a function is called only once.
 */
function once (fn) {
  var called = false;
  return function () {
    if (!called) {
      called = true;
      fn.apply(this, arguments);
    }
  }
}

var ASSET_TYPES = [
  'component',
  'directive',
  'filter'
];

var LIFECYCLE_HOOKS = [
  'beforeCreate',
  'created',
  'beforeMount',
  'mounted',
  'beforeUpdate',
  'updated',
  'beforeDestroy',
  'destroyed',
  'activated',
  'deactivated',
  'errorCaptured',
  'serverPrefetch'
];

/*  */



var config = ({
  /**
   * Option merge strategies (used in core/util/options)
   */
  // $flow-disable-line
  optionMergeStrategies: Object.create(null),

  /**
   * Whether to suppress warnings.
   */
  silent: false,

  /**
   * Show production mode tip message on boot?
   */
  productionTip: "development" !== 'production',

  /**
   * Whether to enable devtools
   */
  devtools: "development" !== 'production',

  /**
   * Whether to record perf
   */
  performance: false,

  /**
   * Error handler for watcher errors
   */
  errorHandler: null,

  /**
   * Warn handler for watcher warns
   */
  warnHandler: null,

  /**
   * Ignore certain custom elements
   */
  ignoredElements: [],

  /**
   * Custom user key aliases for v-on
   */
  // $flow-disable-line
  keyCodes: Object.create(null),

  /**
   * Check if a tag is reserved so that it cannot be registered as a
   * component. This is platform-dependent and may be overwritten.
   */
  isReservedTag: no,

  /**
   * Check if an attribute is reserved so that it cannot be used as a component
   * prop. This is platform-dependent and may be overwritten.
   */
  isReservedAttr: no,

  /**
   * Check if a tag is an unknown element.
   * Platform-dependent.
   */
  isUnknownElement: no,

  /**
   * Get the namespace of an element
   */
  getTagNamespace: noop,

  /**
   * Parse the real tag name for the specific platform.
   */
  parsePlatformTagName: identity,

  /**
   * Check if an attribute must be bound using property, e.g. value
   * Platform-dependent.
   */
  mustUseProp: no,

  /**
   * Perform updates asynchronously. Intended to be used by Vue Test Utils
   * This will significantly reduce performance if set to false.
   */
  async: true,

  /**
   * Exposed for legacy reasons
   */
  _lifecycleHooks: LIFECYCLE_HOOKS
});

/*  */

/**
 * unicode letters used for parsing html tags, component names and property paths.
 * using https://www.w3.org/TR/html53/semantics-scripting.html#potentialcustomelementname
 * skipping \u10000-\uEFFFF due to it freezing up PhantomJS
 */
var unicodeRegExp = /a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/;

/**
 * Check if a string starts with $ or _
 */
function isReserved (str) {
  var c = (str + '').charCodeAt(0);
  return c === 0x24 || c === 0x5F
}

/**
 * Define a property.
 */
function def (obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}

/**
 * Parse simple path.
 */
var bailRE = new RegExp(("[^" + (unicodeRegExp.source) + ".$_\\d]"));
function parsePath (path) {
  if (bailRE.test(path)) {
    return
  }
  var segments = path.split('.');
  return function (obj) {
    for (var i = 0; i < segments.length; i++) {
      if (!obj) { return }
      obj = obj[segments[i]];
    }
    return obj
  }
}

/*  */

// can we use __proto__?
var hasProto = '__proto__' in {};

// Browser environment sniffing
var inBrowser = typeof window !== 'undefined';
var inWeex = typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform;
var weexPlatform = inWeex && WXEnvironment.platform.toLowerCase();
var UA = inBrowser && window.navigator.userAgent.toLowerCase();
var isIE = UA && /msie|trident/.test(UA);
var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
var isEdge = UA && UA.indexOf('edge/') > 0;
var isAndroid = (UA && UA.indexOf('android') > 0) || (weexPlatform === 'android');
var isIOS = (UA && /iphone|ipad|ipod|ios/.test(UA)) || (weexPlatform === 'ios');
var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;
var isPhantomJS = UA && /phantomjs/.test(UA);
var isFF = UA && UA.match(/firefox\/(\d+)/);

// Firefox has a "watch" function on Object.prototype...
var nativeWatch = ({}).watch;
if (inBrowser) {
  try {
    var opts = {};
    Object.defineProperty(opts, 'passive', ({
      get: function get () {
      }
    })); // https://github.com/facebook/flow/issues/285
    window.addEventListener('test-passive', null, opts);
  } catch (e) {}
}

// this needs to be lazy-evaled because vue may be required before
// vue-server-renderer can set VUE_ENV
var _isServer;
var isServerRendering = function () {
  if (_isServer === undefined) {
    /* istanbul ignore if */
    if (!inBrowser && !inWeex && typeof global !== 'undefined') {
      // detect presence of vue-server-renderer and avoid
      // Webpack shimming the process
      _isServer = global['process'] && global['process'].env.VUE_ENV === 'server';
    } else {
      _isServer = false;
    }
  }
  return _isServer
};

// detect devtools
var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

/* istanbul ignore next */
function isNative (Ctor) {
  return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
}

var hasSymbol =
  typeof Symbol !== 'undefined' && isNative(Symbol) &&
  typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);

var _Set;
/* istanbul ignore if */ // $flow-disable-line
if (typeof Set !== 'undefined' && isNative(Set)) {
  // use native Set when available.
  _Set = Set;
} else {
  // a non-standard Set polyfill that only works with primitive keys.
  _Set = /*@__PURE__*/(function () {
    function Set () {
      this.set = Object.create(null);
    }
    Set.prototype.has = function has (key) {
      return this.set[key] === true
    };
    Set.prototype.add = function add (key) {
      this.set[key] = true;
    };
    Set.prototype.clear = function clear () {
      this.set = Object.create(null);
    };

    return Set;
  }());
}

/*  */

var warn = noop;
var tip = noop;
var generateComponentTrace = (noop); // work around flow check
var formatComponentName = (noop);

if (true) {
  var hasConsole = typeof console !== 'undefined';
  var classifyRE = /(?:^|[-_])(\w)/g;
  var classify = function (str) { return str
    .replace(classifyRE, function (c) { return c.toUpperCase(); })
    .replace(/[-_]/g, ''); };

  warn = function (msg, vm) {
    var trace = vm ? generateComponentTrace(vm) : '';

    if (config.warnHandler) {
      config.warnHandler.call(null, msg, vm, trace);
    } else if (hasConsole && (!config.silent)) {
      console.error(("[Vue warn]: " + msg + trace));
    }
  };

  tip = function (msg, vm) {
    if (hasConsole && (!config.silent)) {
      console.warn("[Vue tip]: " + msg + (
        vm ? generateComponentTrace(vm) : ''
      ));
    }
  };

  formatComponentName = function (vm, includeFile) {
    {
      if(vm.$scope && vm.$scope.is){
        return vm.$scope.is
      }
    }
    if (vm.$root === vm) {
      return '<Root>'
    }
    var options = typeof vm === 'function' && vm.cid != null
      ? vm.options
      : vm._isVue
        ? vm.$options || vm.constructor.options
        : vm;
    var name = options.name || options._componentTag;
    var file = options.__file;
    if (!name && file) {
      var match = file.match(/([^/\\]+)\.vue$/);
      name = match && match[1];
    }

    return (
      (name ? ("<" + (classify(name)) + ">") : "<Anonymous>") +
      (file && includeFile !== false ? (" at " + file) : '')
    )
  };

  var repeat = function (str, n) {
    var res = '';
    while (n) {
      if (n % 2 === 1) { res += str; }
      if (n > 1) { str += str; }
      n >>= 1;
    }
    return res
  };

  generateComponentTrace = function (vm) {
    if (vm._isVue && vm.$parent) {
      var tree = [];
      var currentRecursiveSequence = 0;
      while (vm) {
        if (tree.length > 0) {
          var last = tree[tree.length - 1];
          if (last.constructor === vm.constructor) {
            currentRecursiveSequence++;
            vm = vm.$parent;
            continue
          } else if (currentRecursiveSequence > 0) {
            tree[tree.length - 1] = [last, currentRecursiveSequence];
            currentRecursiveSequence = 0;
          }
        }
        tree.push(vm);
        vm = vm.$parent;
      }
      return '\n\nfound in\n\n' + tree
        .map(function (vm, i) { return ("" + (i === 0 ? '---> ' : repeat(' ', 5 + i * 2)) + (Array.isArray(vm)
            ? ((formatComponentName(vm[0])) + "... (" + (vm[1]) + " recursive calls)")
            : formatComponentName(vm))); })
        .join('\n')
    } else {
      return ("\n\n(found in " + (formatComponentName(vm)) + ")")
    }
  };
}

/*  */

var uid = 0;

/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */
var Dep = function Dep () {
  // fixed by xxxxxx (nvue vuex)
  /* eslint-disable no-undef */
  if(typeof SharedObject !== 'undefined'){
    this.id = SharedObject.uid++;
  } else {
    this.id = uid++;
  }
  this.subs = [];
};

Dep.prototype.addSub = function addSub (sub) {
  this.subs.push(sub);
};

Dep.prototype.removeSub = function removeSub (sub) {
  remove(this.subs, sub);
};

Dep.prototype.depend = function depend () {
  if (Dep.SharedObject.target) {
    Dep.SharedObject.target.addDep(this);
  }
};

Dep.prototype.notify = function notify () {
  // stabilize the subscriber list first
  var subs = this.subs.slice();
  if ( true && !config.async) {
    // subs aren't sorted in scheduler if not running async
    // we need to sort them now to make sure they fire in correct
    // order
    subs.sort(function (a, b) { return a.id - b.id; });
  }
  for (var i = 0, l = subs.length; i < l; i++) {
    subs[i].update();
  }
};

// The current target watcher being evaluated.
// This is globally unique because only one watcher
// can be evaluated at a time.
// fixed by xxxxxx (nvue shared vuex)
/* eslint-disable no-undef */
Dep.SharedObject = typeof SharedObject !== 'undefined' ? SharedObject : {};
Dep.SharedObject.target = null;
Dep.SharedObject.targetStack = [];

function pushTarget (target) {
  Dep.SharedObject.targetStack.push(target);
  Dep.SharedObject.target = target;
}

function popTarget () {
  Dep.SharedObject.targetStack.pop();
  Dep.SharedObject.target = Dep.SharedObject.targetStack[Dep.SharedObject.targetStack.length - 1];
}

/*  */

var VNode = function VNode (
  tag,
  data,
  children,
  text,
  elm,
  context,
  componentOptions,
  asyncFactory
) {
  this.tag = tag;
  this.data = data;
  this.children = children;
  this.text = text;
  this.elm = elm;
  this.ns = undefined;
  this.context = context;
  this.fnContext = undefined;
  this.fnOptions = undefined;
  this.fnScopeId = undefined;
  this.key = data && data.key;
  this.componentOptions = componentOptions;
  this.componentInstance = undefined;
  this.parent = undefined;
  this.raw = false;
  this.isStatic = false;
  this.isRootInsert = true;
  this.isComment = false;
  this.isCloned = false;
  this.isOnce = false;
  this.asyncFactory = asyncFactory;
  this.asyncMeta = undefined;
  this.isAsyncPlaceholder = false;
};

var prototypeAccessors = { child: { configurable: true } };

// DEPRECATED: alias for componentInstance for backwards compat.
/* istanbul ignore next */
prototypeAccessors.child.get = function () {
  return this.componentInstance
};

Object.defineProperties( VNode.prototype, prototypeAccessors );

var createEmptyVNode = function (text) {
  if ( text === void 0 ) text = '';

  var node = new VNode();
  node.text = text;
  node.isComment = true;
  return node
};

function createTextVNode (val) {
  return new VNode(undefined, undefined, undefined, String(val))
}

// optimized shallow clone
// used for static nodes and slot nodes because they may be reused across
// multiple renders, cloning them avoids errors when DOM manipulations rely
// on their elm reference.
function cloneVNode (vnode) {
  var cloned = new VNode(
    vnode.tag,
    vnode.data,
    // #7975
    // clone children array to avoid mutating original in case of cloning
    // a child.
    vnode.children && vnode.children.slice(),
    vnode.text,
    vnode.elm,
    vnode.context,
    vnode.componentOptions,
    vnode.asyncFactory
  );
  cloned.ns = vnode.ns;
  cloned.isStatic = vnode.isStatic;
  cloned.key = vnode.key;
  cloned.isComment = vnode.isComment;
  cloned.fnContext = vnode.fnContext;
  cloned.fnOptions = vnode.fnOptions;
  cloned.fnScopeId = vnode.fnScopeId;
  cloned.asyncMeta = vnode.asyncMeta;
  cloned.isCloned = true;
  return cloned
}

/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

var arrayProto = Array.prototype;
var arrayMethods = Object.create(arrayProto);

var methodsToPatch = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
];

/**
 * Intercept mutating methods and emit events
 */
methodsToPatch.forEach(function (method) {
  // cache original method
  var original = arrayProto[method];
  def(arrayMethods, method, function mutator () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var result = original.apply(this, args);
    var ob = this.__ob__;
    var inserted;
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args;
        break
      case 'splice':
        inserted = args.slice(2);
        break
    }
    if (inserted) { ob.observeArray(inserted); }
    // notify change
    ob.dep.notify();
    return result
  });
});

/*  */

var arrayKeys = Object.getOwnPropertyNames(arrayMethods);

/**
 * In some cases we may want to disable observation inside a component's
 * update computation.
 */
var shouldObserve = true;

function toggleObserving (value) {
  shouldObserve = value;
}

/**
 * Observer class that is attached to each observed
 * object. Once attached, the observer converts the target
 * object's property keys into getter/setters that
 * collect dependencies and dispatch updates.
 */
var Observer = function Observer (value) {
  this.value = value;
  this.dep = new Dep();
  this.vmCount = 0;
  def(value, '__ob__', this);
  if (Array.isArray(value)) {
    if (hasProto) {
      {// fixed by xxxxxx 微信小程序使用 plugins 之后，数组方法被直接挂载到了数组对象上，需要执行 copyAugment 逻辑
        if(value.push !== value.__proto__.push){
          copyAugment(value, arrayMethods, arrayKeys);
        } else {
          protoAugment(value, arrayMethods);
        }
      }
    } else {
      copyAugment(value, arrayMethods, arrayKeys);
    }
    this.observeArray(value);
  } else {
    this.walk(value);
  }
};

/**
 * Walk through all properties and convert them into
 * getter/setters. This method should only be called when
 * value type is Object.
 */
Observer.prototype.walk = function walk (obj) {
  var keys = Object.keys(obj);
  for (var i = 0; i < keys.length; i++) {
    defineReactive$$1(obj, keys[i]);
  }
};

/**
 * Observe a list of Array items.
 */
Observer.prototype.observeArray = function observeArray (items) {
  for (var i = 0, l = items.length; i < l; i++) {
    observe(items[i]);
  }
};

// helpers

/**
 * Augment a target Object or Array by intercepting
 * the prototype chain using __proto__
 */
function protoAugment (target, src) {
  /* eslint-disable no-proto */
  target.__proto__ = src;
  /* eslint-enable no-proto */
}

/**
 * Augment a target Object or Array by defining
 * hidden properties.
 */
/* istanbul ignore next */
function copyAugment (target, src, keys) {
  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i];
    def(target, key, src[key]);
  }
}

/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 */
function observe (value, asRootData) {
  if (!isObject(value) || value instanceof VNode) {
    return
  }
  var ob;
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else if (
    shouldObserve &&
    !isServerRendering() &&
    (Array.isArray(value) || isPlainObject(value)) &&
    Object.isExtensible(value) &&
    !value._isVue
  ) {
    ob = new Observer(value);
  }
  if (asRootData && ob) {
    ob.vmCount++;
  }
  return ob
}

/**
 * Define a reactive property on an Object.
 */
function defineReactive$$1 (
  obj,
  key,
  val,
  customSetter,
  shallow
) {
  var dep = new Dep();

  var property = Object.getOwnPropertyDescriptor(obj, key);
  if (property && property.configurable === false) {
    return
  }

  // cater for pre-defined getter/setters
  var getter = property && property.get;
  var setter = property && property.set;
  if ((!getter || setter) && arguments.length === 2) {
    val = obj[key];
  }

  var childOb = !shallow && observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      var value = getter ? getter.call(obj) : val;
      if (Dep.SharedObject.target) { // fixed by xxxxxx
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
          if (Array.isArray(value)) {
            dependArray(value);
          }
        }
      }
      return value
    },
    set: function reactiveSetter (newVal) {
      var value = getter ? getter.call(obj) : val;
      /* eslint-disable no-self-compare */
      if (newVal === value || (newVal !== newVal && value !== value)) {
        return
      }
      /* eslint-enable no-self-compare */
      if ( true && customSetter) {
        customSetter();
      }
      // #7981: for accessor properties without setter
      if (getter && !setter) { return }
      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }
      childOb = !shallow && observe(newVal);
      dep.notify();
    }
  });
}

/**
 * Set a property on an object. Adds the new property and
 * triggers change notification if the property doesn't
 * already exist.
 */
function set (target, key, val) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot set reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    return val
  }
  if (key in target && !(key in Object.prototype)) {
    target[key] = val;
    return val
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid adding reactive properties to a Vue instance or its root $data ' +
      'at runtime - declare it upfront in the data option.'
    );
    return val
  }
  if (!ob) {
    target[key] = val;
    return val
  }
  defineReactive$$1(ob.value, key, val);
  ob.dep.notify();
  return val
}

/**
 * Delete a property and trigger change if necessary.
 */
function del (target, key) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot delete reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.splice(key, 1);
    return
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid deleting properties on a Vue instance or its root $data ' +
      '- just set it to null.'
    );
    return
  }
  if (!hasOwn(target, key)) {
    return
  }
  delete target[key];
  if (!ob) {
    return
  }
  ob.dep.notify();
}

/**
 * Collect dependencies on array elements when the array is touched, since
 * we cannot intercept array element access like property getters.
 */
function dependArray (value) {
  for (var e = (void 0), i = 0, l = value.length; i < l; i++) {
    e = value[i];
    e && e.__ob__ && e.__ob__.dep.depend();
    if (Array.isArray(e)) {
      dependArray(e);
    }
  }
}

/*  */

/**
 * Option overwriting strategies are functions that handle
 * how to merge a parent option value and a child option
 * value into the final value.
 */
var strats = config.optionMergeStrategies;

/**
 * Options with restrictions
 */
if (true) {
  strats.el = strats.propsData = function (parent, child, vm, key) {
    if (!vm) {
      warn(
        "option \"" + key + "\" can only be used during instance " +
        'creation with the `new` keyword.'
      );
    }
    return defaultStrat(parent, child)
  };
}

/**
 * Helper that recursively merges two data objects together.
 */
function mergeData (to, from) {
  if (!from) { return to }
  var key, toVal, fromVal;

  var keys = hasSymbol
    ? Reflect.ownKeys(from)
    : Object.keys(from);

  for (var i = 0; i < keys.length; i++) {
    key = keys[i];
    // in case the object is already observed...
    if (key === '__ob__') { continue }
    toVal = to[key];
    fromVal = from[key];
    if (!hasOwn(to, key)) {
      set(to, key, fromVal);
    } else if (
      toVal !== fromVal &&
      isPlainObject(toVal) &&
      isPlainObject(fromVal)
    ) {
      mergeData(toVal, fromVal);
    }
  }
  return to
}

/**
 * Data
 */
function mergeDataOrFn (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    // in a Vue.extend merge, both should be functions
    if (!childVal) {
      return parentVal
    }
    if (!parentVal) {
      return childVal
    }
    // when parentVal & childVal are both present,
    // we need to return a function that returns the
    // merged result of both functions... no need to
    // check if parentVal is a function here because
    // it has to be a function to pass previous merges.
    return function mergedDataFn () {
      return mergeData(
        typeof childVal === 'function' ? childVal.call(this, this) : childVal,
        typeof parentVal === 'function' ? parentVal.call(this, this) : parentVal
      )
    }
  } else {
    return function mergedInstanceDataFn () {
      // instance merge
      var instanceData = typeof childVal === 'function'
        ? childVal.call(vm, vm)
        : childVal;
      var defaultData = typeof parentVal === 'function'
        ? parentVal.call(vm, vm)
        : parentVal;
      if (instanceData) {
        return mergeData(instanceData, defaultData)
      } else {
        return defaultData
      }
    }
  }
}

strats.data = function (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    if (childVal && typeof childVal !== 'function') {
       true && warn(
        'The "data" option should be a function ' +
        'that returns a per-instance value in component ' +
        'definitions.',
        vm
      );

      return parentVal
    }
    return mergeDataOrFn(parentVal, childVal)
  }

  return mergeDataOrFn(parentVal, childVal, vm)
};

/**
 * Hooks and props are merged as arrays.
 */
function mergeHook (
  parentVal,
  childVal
) {
  var res = childVal
    ? parentVal
      ? parentVal.concat(childVal)
      : Array.isArray(childVal)
        ? childVal
        : [childVal]
    : parentVal;
  return res
    ? dedupeHooks(res)
    : res
}

function dedupeHooks (hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res
}

LIFECYCLE_HOOKS.forEach(function (hook) {
  strats[hook] = mergeHook;
});

/**
 * Assets
 *
 * When a vm is present (instance creation), we need to do
 * a three-way merge between constructor options, instance
 * options and parent options.
 */
function mergeAssets (
  parentVal,
  childVal,
  vm,
  key
) {
  var res = Object.create(parentVal || null);
  if (childVal) {
     true && assertObjectType(key, childVal, vm);
    return extend(res, childVal)
  } else {
    return res
  }
}

ASSET_TYPES.forEach(function (type) {
  strats[type + 's'] = mergeAssets;
});

/**
 * Watchers.
 *
 * Watchers hashes should not overwrite one
 * another, so we merge them as arrays.
 */
strats.watch = function (
  parentVal,
  childVal,
  vm,
  key
) {
  // work around Firefox's Object.prototype.watch...
  if (parentVal === nativeWatch) { parentVal = undefined; }
  if (childVal === nativeWatch) { childVal = undefined; }
  /* istanbul ignore if */
  if (!childVal) { return Object.create(parentVal || null) }
  if (true) {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = {};
  extend(ret, parentVal);
  for (var key$1 in childVal) {
    var parent = ret[key$1];
    var child = childVal[key$1];
    if (parent && !Array.isArray(parent)) {
      parent = [parent];
    }
    ret[key$1] = parent
      ? parent.concat(child)
      : Array.isArray(child) ? child : [child];
  }
  return ret
};

/**
 * Other object hashes.
 */
strats.props =
strats.methods =
strats.inject =
strats.computed = function (
  parentVal,
  childVal,
  vm,
  key
) {
  if (childVal && "development" !== 'production') {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = Object.create(null);
  extend(ret, parentVal);
  if (childVal) { extend(ret, childVal); }
  return ret
};
strats.provide = mergeDataOrFn;

/**
 * Default strategy.
 */
var defaultStrat = function (parentVal, childVal) {
  return childVal === undefined
    ? parentVal
    : childVal
};

/**
 * Validate component names
 */
function checkComponents (options) {
  for (var key in options.components) {
    validateComponentName(key);
  }
}

function validateComponentName (name) {
  if (!new RegExp(("^[a-zA-Z][\\-\\.0-9_" + (unicodeRegExp.source) + "]*$")).test(name)) {
    warn(
      'Invalid component name: "' + name + '". Component names ' +
      'should conform to valid custom element name in html5 specification.'
    );
  }
  if (isBuiltInTag(name) || config.isReservedTag(name)) {
    warn(
      'Do not use built-in or reserved HTML elements as component ' +
      'id: ' + name
    );
  }
}

/**
 * Ensure all props option syntax are normalized into the
 * Object-based format.
 */
function normalizeProps (options, vm) {
  var props = options.props;
  if (!props) { return }
  var res = {};
  var i, val, name;
  if (Array.isArray(props)) {
    i = props.length;
    while (i--) {
      val = props[i];
      if (typeof val === 'string') {
        name = camelize(val);
        res[name] = { type: null };
      } else if (true) {
        warn('props must be strings when using array syntax.');
      }
    }
  } else if (isPlainObject(props)) {
    for (var key in props) {
      val = props[key];
      name = camelize(key);
      res[name] = isPlainObject(val)
        ? val
        : { type: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"props\": expected an Array or an Object, " +
      "but got " + (toRawType(props)) + ".",
      vm
    );
  }
  options.props = res;
}

/**
 * Normalize all injections into Object-based format
 */
function normalizeInject (options, vm) {
  var inject = options.inject;
  if (!inject) { return }
  var normalized = options.inject = {};
  if (Array.isArray(inject)) {
    for (var i = 0; i < inject.length; i++) {
      normalized[inject[i]] = { from: inject[i] };
    }
  } else if (isPlainObject(inject)) {
    for (var key in inject) {
      var val = inject[key];
      normalized[key] = isPlainObject(val)
        ? extend({ from: key }, val)
        : { from: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"inject\": expected an Array or an Object, " +
      "but got " + (toRawType(inject)) + ".",
      vm
    );
  }
}

/**
 * Normalize raw function directives into object format.
 */
function normalizeDirectives (options) {
  var dirs = options.directives;
  if (dirs) {
    for (var key in dirs) {
      var def$$1 = dirs[key];
      if (typeof def$$1 === 'function') {
        dirs[key] = { bind: def$$1, update: def$$1 };
      }
    }
  }
}

function assertObjectType (name, value, vm) {
  if (!isPlainObject(value)) {
    warn(
      "Invalid value for option \"" + name + "\": expected an Object, " +
      "but got " + (toRawType(value)) + ".",
      vm
    );
  }
}

/**
 * Merge two option objects into a new one.
 * Core utility used in both instantiation and inheritance.
 */
function mergeOptions (
  parent,
  child,
  vm
) {
  if (true) {
    checkComponents(child);
  }

  if (typeof child === 'function') {
    child = child.options;
  }

  normalizeProps(child, vm);
  normalizeInject(child, vm);
  normalizeDirectives(child);

  // Apply extends and mixins on the child options,
  // but only if it is a raw options object that isn't
  // the result of another mergeOptions call.
  // Only merged options has the _base property.
  if (!child._base) {
    if (child.extends) {
      parent = mergeOptions(parent, child.extends, vm);
    }
    if (child.mixins) {
      for (var i = 0, l = child.mixins.length; i < l; i++) {
        parent = mergeOptions(parent, child.mixins[i], vm);
      }
    }
  }

  var options = {};
  var key;
  for (key in parent) {
    mergeField(key);
  }
  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key);
    }
  }
  function mergeField (key) {
    var strat = strats[key] || defaultStrat;
    options[key] = strat(parent[key], child[key], vm, key);
  }
  return options
}

/**
 * Resolve an asset.
 * This function is used because child instances need access
 * to assets defined in its ancestor chain.
 */
function resolveAsset (
  options,
  type,
  id,
  warnMissing
) {
  /* istanbul ignore if */
  if (typeof id !== 'string') {
    return
  }
  var assets = options[type];
  // check local registration variations first
  if (hasOwn(assets, id)) { return assets[id] }
  var camelizedId = camelize(id);
  if (hasOwn(assets, camelizedId)) { return assets[camelizedId] }
  var PascalCaseId = capitalize(camelizedId);
  if (hasOwn(assets, PascalCaseId)) { return assets[PascalCaseId] }
  // fallback to prototype chain
  var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
  if ( true && warnMissing && !res) {
    warn(
      'Failed to resolve ' + type.slice(0, -1) + ': ' + id,
      options
    );
  }
  return res
}

/*  */



function validateProp (
  key,
  propOptions,
  propsData,
  vm
) {
  var prop = propOptions[key];
  var absent = !hasOwn(propsData, key);
  var value = propsData[key];
  // boolean casting
  var booleanIndex = getTypeIndex(Boolean, prop.type);
  if (booleanIndex > -1) {
    if (absent && !hasOwn(prop, 'default')) {
      value = false;
    } else if (value === '' || value === hyphenate(key)) {
      // only cast empty string / same name to boolean if
      // boolean has higher priority
      var stringIndex = getTypeIndex(String, prop.type);
      if (stringIndex < 0 || booleanIndex < stringIndex) {
        value = true;
      }
    }
  }
  // check default value
  if (value === undefined) {
    value = getPropDefaultValue(vm, prop, key);
    // since the default value is a fresh copy,
    // make sure to observe it.
    var prevShouldObserve = shouldObserve;
    toggleObserving(true);
    observe(value);
    toggleObserving(prevShouldObserve);
  }
  if (
    true
  ) {
    assertProp(prop, key, value, vm, absent);
  }
  return value
}

/**
 * Get the default value of a prop.
 */
function getPropDefaultValue (vm, prop, key) {
  // no default, return undefined
  if (!hasOwn(prop, 'default')) {
    return undefined
  }
  var def = prop.default;
  // warn against non-factory defaults for Object & Array
  if ( true && isObject(def)) {
    warn(
      'Invalid default value for prop "' + key + '": ' +
      'Props with type Object/Array must use a factory function ' +
      'to return the default value.',
      vm
    );
  }
  // the raw prop value was also undefined from previous render,
  // return previous default value to avoid unnecessary watcher trigger
  if (vm && vm.$options.propsData &&
    vm.$options.propsData[key] === undefined &&
    vm._props[key] !== undefined
  ) {
    return vm._props[key]
  }
  // call factory function for non-Function types
  // a value is Function if its prototype is function even across different execution context
  return typeof def === 'function' && getType(prop.type) !== 'Function'
    ? def.call(vm)
    : def
}

/**
 * Assert whether a prop is valid.
 */
function assertProp (
  prop,
  name,
  value,
  vm,
  absent
) {
  if (prop.required && absent) {
    warn(
      'Missing required prop: "' + name + '"',
      vm
    );
    return
  }
  if (value == null && !prop.required) {
    return
  }
  var type = prop.type;
  var valid = !type || type === true;
  var expectedTypes = [];
  if (type) {
    if (!Array.isArray(type)) {
      type = [type];
    }
    for (var i = 0; i < type.length && !valid; i++) {
      var assertedType = assertType(value, type[i]);
      expectedTypes.push(assertedType.expectedType || '');
      valid = assertedType.valid;
    }
  }

  if (!valid) {
    warn(
      getInvalidTypeMessage(name, value, expectedTypes),
      vm
    );
    return
  }
  var validator = prop.validator;
  if (validator) {
    if (!validator(value)) {
      warn(
        'Invalid prop: custom validator check failed for prop "' + name + '".',
        vm
      );
    }
  }
}

var simpleCheckRE = /^(String|Number|Boolean|Function|Symbol)$/;

function assertType (value, type) {
  var valid;
  var expectedType = getType(type);
  if (simpleCheckRE.test(expectedType)) {
    var t = typeof value;
    valid = t === expectedType.toLowerCase();
    // for primitive wrapper objects
    if (!valid && t === 'object') {
      valid = value instanceof type;
    }
  } else if (expectedType === 'Object') {
    valid = isPlainObject(value);
  } else if (expectedType === 'Array') {
    valid = Array.isArray(value);
  } else {
    valid = value instanceof type;
  }
  return {
    valid: valid,
    expectedType: expectedType
  }
}

/**
 * Use function string name to check built-in types,
 * because a simple equality check will fail when running
 * across different vms / iframes.
 */
function getType (fn) {
  var match = fn && fn.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : ''
}

function isSameType (a, b) {
  return getType(a) === getType(b)
}

function getTypeIndex (type, expectedTypes) {
  if (!Array.isArray(expectedTypes)) {
    return isSameType(expectedTypes, type) ? 0 : -1
  }
  for (var i = 0, len = expectedTypes.length; i < len; i++) {
    if (isSameType(expectedTypes[i], type)) {
      return i
    }
  }
  return -1
}

function getInvalidTypeMessage (name, value, expectedTypes) {
  var message = "Invalid prop: type check failed for prop \"" + name + "\"." +
    " Expected " + (expectedTypes.map(capitalize).join(', '));
  var expectedType = expectedTypes[0];
  var receivedType = toRawType(value);
  var expectedValue = styleValue(value, expectedType);
  var receivedValue = styleValue(value, receivedType);
  // check if we need to specify expected value
  if (expectedTypes.length === 1 &&
      isExplicable(expectedType) &&
      !isBoolean(expectedType, receivedType)) {
    message += " with value " + expectedValue;
  }
  message += ", got " + receivedType + " ";
  // check if we need to specify received value
  if (isExplicable(receivedType)) {
    message += "with value " + receivedValue + ".";
  }
  return message
}

function styleValue (value, type) {
  if (type === 'String') {
    return ("\"" + value + "\"")
  } else if (type === 'Number') {
    return ("" + (Number(value)))
  } else {
    return ("" + value)
  }
}

function isExplicable (value) {
  var explicitTypes = ['string', 'number', 'boolean'];
  return explicitTypes.some(function (elem) { return value.toLowerCase() === elem; })
}

function isBoolean () {
  var args = [], len = arguments.length;
  while ( len-- ) args[ len ] = arguments[ len ];

  return args.some(function (elem) { return elem.toLowerCase() === 'boolean'; })
}

/*  */

function handleError (err, vm, info) {
  // Deactivate deps tracking while processing error handler to avoid possible infinite rendering.
  // See: https://github.com/vuejs/vuex/issues/1505
  pushTarget();
  try {
    if (vm) {
      var cur = vm;
      while ((cur = cur.$parent)) {
        var hooks = cur.$options.errorCaptured;
        if (hooks) {
          for (var i = 0; i < hooks.length; i++) {
            try {
              var capture = hooks[i].call(cur, err, vm, info) === false;
              if (capture) { return }
            } catch (e) {
              globalHandleError(e, cur, 'errorCaptured hook');
            }
          }
        }
      }
    }
    globalHandleError(err, vm, info);
  } finally {
    popTarget();
  }
}

function invokeWithErrorHandling (
  handler,
  context,
  args,
  vm,
  info
) {
  var res;
  try {
    res = args ? handler.apply(context, args) : handler.call(context);
    if (res && !res._isVue && isPromise(res) && !res._handled) {
      res.catch(function (e) { return handleError(e, vm, info + " (Promise/async)"); });
      // issue #9511
      // avoid catch triggering multiple times when nested calls
      res._handled = true;
    }
  } catch (e) {
    handleError(e, vm, info);
  }
  return res
}

function globalHandleError (err, vm, info) {
  if (config.errorHandler) {
    try {
      return config.errorHandler.call(null, err, vm, info)
    } catch (e) {
      // if the user intentionally throws the original error in the handler,
      // do not log it twice
      if (e !== err) {
        logError(e, null, 'config.errorHandler');
      }
    }
  }
  logError(err, vm, info);
}

function logError (err, vm, info) {
  if (true) {
    warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
  }
  /* istanbul ignore else */
  if ((inBrowser || inWeex) && typeof console !== 'undefined') {
    console.error(err);
  } else {
    throw err
  }
}

/*  */

var callbacks = [];
var pending = false;

function flushCallbacks () {
  pending = false;
  var copies = callbacks.slice(0);
  callbacks.length = 0;
  for (var i = 0; i < copies.length; i++) {
    copies[i]();
  }
}

// Here we have async deferring wrappers using microtasks.
// In 2.5 we used (macro) tasks (in combination with microtasks).
// However, it has subtle problems when state is changed right before repaint
// (e.g. #6813, out-in transitions).
// Also, using (macro) tasks in event handler would cause some weird behaviors
// that cannot be circumvented (e.g. #7109, #7153, #7546, #7834, #8109).
// So we now use microtasks everywhere, again.
// A major drawback of this tradeoff is that there are some scenarios
// where microtasks have too high a priority and fire in between supposedly
// sequential events (e.g. #4521, #6690, which have workarounds)
// or even between bubbling of the same event (#6566).
var timerFunc;

// The nextTick behavior leverages the microtask queue, which can be accessed
// via either native Promise.then or MutationObserver.
// MutationObserver has wider support, however it is seriously bugged in
// UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
// completely stops working after triggering a few times... so, if native
// Promise is available, we will use it:
/* istanbul ignore next, $flow-disable-line */
if (typeof Promise !== 'undefined' && isNative(Promise)) {
  var p = Promise.resolve();
  timerFunc = function () {
    p.then(flushCallbacks);
    // In problematic UIWebViews, Promise.then doesn't completely break, but
    // it can get stuck in a weird state where callbacks are pushed into the
    // microtask queue but the queue isn't being flushed, until the browser
    // needs to do some other work, e.g. handle a timer. Therefore we can
    // "force" the microtask queue to be flushed by adding an empty timer.
    if (isIOS) { setTimeout(noop); }
  };
} else if (!isIE && typeof MutationObserver !== 'undefined' && (
  isNative(MutationObserver) ||
  // PhantomJS and iOS 7.x
  MutationObserver.toString() === '[object MutationObserverConstructor]'
)) {
  // Use MutationObserver where native Promise is not available,
  // e.g. PhantomJS, iOS7, Android 4.4
  // (#6466 MutationObserver is unreliable in IE11)
  var counter = 1;
  var observer = new MutationObserver(flushCallbacks);
  var textNode = document.createTextNode(String(counter));
  observer.observe(textNode, {
    characterData: true
  });
  timerFunc = function () {
    counter = (counter + 1) % 2;
    textNode.data = String(counter);
  };
} else if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  // Fallback to setImmediate.
  // Technically it leverages the (macro) task queue,
  // but it is still a better choice than setTimeout.
  timerFunc = function () {
    setImmediate(flushCallbacks);
  };
} else {
  // Fallback to setTimeout.
  timerFunc = function () {
    setTimeout(flushCallbacks, 0);
  };
}

function nextTick (cb, ctx) {
  var _resolve;
  callbacks.push(function () {
    if (cb) {
      try {
        cb.call(ctx);
      } catch (e) {
        handleError(e, ctx, 'nextTick');
      }
    } else if (_resolve) {
      _resolve(ctx);
    }
  });
  if (!pending) {
    pending = true;
    timerFunc();
  }
  // $flow-disable-line
  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(function (resolve) {
      _resolve = resolve;
    })
  }
}

/*  */

/* not type checking this file because flow doesn't play well with Proxy */

var initProxy;

if (true) {
  var allowedGlobals = makeMap(
    'Infinity,undefined,NaN,isFinite,isNaN,' +
    'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' +
    'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' +
    'require' // for Webpack/Browserify
  );

  var warnNonPresent = function (target, key) {
    warn(
      "Property or method \"" + key + "\" is not defined on the instance but " +
      'referenced during render. Make sure that this property is reactive, ' +
      'either in the data option, or for class-based components, by ' +
      'initializing the property. ' +
      'See: https://vuejs.org/v2/guide/reactivity.html#Declaring-Reactive-Properties.',
      target
    );
  };

  var warnReservedPrefix = function (target, key) {
    warn(
      "Property \"" + key + "\" must be accessed with \"$data." + key + "\" because " +
      'properties starting with "$" or "_" are not proxied in the Vue instance to ' +
      'prevent conflicts with Vue internals. ' +
      'See: https://vuejs.org/v2/api/#data',
      target
    );
  };

  var hasProxy =
    typeof Proxy !== 'undefined' && isNative(Proxy);

  if (hasProxy) {
    var isBuiltInModifier = makeMap('stop,prevent,self,ctrl,shift,alt,meta,exact');
    config.keyCodes = new Proxy(config.keyCodes, {
      set: function set (target, key, value) {
        if (isBuiltInModifier(key)) {
          warn(("Avoid overwriting built-in modifier in config.keyCodes: ." + key));
          return false
        } else {
          target[key] = value;
          return true
        }
      }
    });
  }

  var hasHandler = {
    has: function has (target, key) {
      var has = key in target;
      var isAllowed = allowedGlobals(key) ||
        (typeof key === 'string' && key.charAt(0) === '_' && !(key in target.$data));
      if (!has && !isAllowed) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return has || !isAllowed
    }
  };

  var getHandler = {
    get: function get (target, key) {
      if (typeof key === 'string' && !(key in target)) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return target[key]
    }
  };

  initProxy = function initProxy (vm) {
    if (hasProxy) {
      // determine which proxy handler to use
      var options = vm.$options;
      var handlers = options.render && options.render._withStripped
        ? getHandler
        : hasHandler;
      vm._renderProxy = new Proxy(vm, handlers);
    } else {
      vm._renderProxy = vm;
    }
  };
}

/*  */

var seenObjects = new _Set();

/**
 * Recursively traverse an object to evoke all converted
 * getters, so that every nested property inside the object
 * is collected as a "deep" dependency.
 */
function traverse (val) {
  _traverse(val, seenObjects);
  seenObjects.clear();
}

function _traverse (val, seen) {
  var i, keys;
  var isA = Array.isArray(val);
  if ((!isA && !isObject(val)) || Object.isFrozen(val) || val instanceof VNode) {
    return
  }
  if (val.__ob__) {
    var depId = val.__ob__.dep.id;
    if (seen.has(depId)) {
      return
    }
    seen.add(depId);
  }
  if (isA) {
    i = val.length;
    while (i--) { _traverse(val[i], seen); }
  } else {
    keys = Object.keys(val);
    i = keys.length;
    while (i--) { _traverse(val[keys[i]], seen); }
  }
}

var mark;
var measure;

if (true) {
  var perf = inBrowser && window.performance;
  /* istanbul ignore if */
  if (
    perf &&
    perf.mark &&
    perf.measure &&
    perf.clearMarks &&
    perf.clearMeasures
  ) {
    mark = function (tag) { return perf.mark(tag); };
    measure = function (name, startTag, endTag) {
      perf.measure(name, startTag, endTag);
      perf.clearMarks(startTag);
      perf.clearMarks(endTag);
      // perf.clearMeasures(name)
    };
  }
}

/*  */

var normalizeEvent = cached(function (name) {
  var passive = name.charAt(0) === '&';
  name = passive ? name.slice(1) : name;
  var once$$1 = name.charAt(0) === '~'; // Prefixed last, checked first
  name = once$$1 ? name.slice(1) : name;
  var capture = name.charAt(0) === '!';
  name = capture ? name.slice(1) : name;
  return {
    name: name,
    once: once$$1,
    capture: capture,
    passive: passive
  }
});

function createFnInvoker (fns, vm) {
  function invoker () {
    var arguments$1 = arguments;

    var fns = invoker.fns;
    if (Array.isArray(fns)) {
      var cloned = fns.slice();
      for (var i = 0; i < cloned.length; i++) {
        invokeWithErrorHandling(cloned[i], null, arguments$1, vm, "v-on handler");
      }
    } else {
      // return handler return value for single handlers
      return invokeWithErrorHandling(fns, null, arguments, vm, "v-on handler")
    }
  }
  invoker.fns = fns;
  return invoker
}

function updateListeners (
  on,
  oldOn,
  add,
  remove$$1,
  createOnceHandler,
  vm
) {
  var name, def$$1, cur, old, event;
  for (name in on) {
    def$$1 = cur = on[name];
    old = oldOn[name];
    event = normalizeEvent(name);
    if (isUndef(cur)) {
       true && warn(
        "Invalid handler for event \"" + (event.name) + "\": got " + String(cur),
        vm
      );
    } else if (isUndef(old)) {
      if (isUndef(cur.fns)) {
        cur = on[name] = createFnInvoker(cur, vm);
      }
      if (isTrue(event.once)) {
        cur = on[name] = createOnceHandler(event.name, cur, event.capture);
      }
      add(event.name, cur, event.capture, event.passive, event.params);
    } else if (cur !== old) {
      old.fns = cur;
      on[name] = old;
    }
  }
  for (name in oldOn) {
    if (isUndef(on[name])) {
      event = normalizeEvent(name);
      remove$$1(event.name, oldOn[name], event.capture);
    }
  }
}

/*  */

/*  */

// fixed by xxxxxx (mp properties)
function extractPropertiesFromVNodeData(data, Ctor, res, context) {
  var propOptions = Ctor.options.mpOptions && Ctor.options.mpOptions.properties;
  if (isUndef(propOptions)) {
    return res
  }
  var externalClasses = Ctor.options.mpOptions.externalClasses || [];
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      var result = checkProp(res, props, key, altKey, true) ||
          checkProp(res, attrs, key, altKey, false);
      // externalClass
      if (
        result &&
        res[key] &&
        externalClasses.indexOf(altKey) !== -1 &&
        context[camelize(res[key])]
      ) {
        // 赋值 externalClass 真正的值(模板里 externalClass 的值可能是字符串)
        res[key] = context[camelize(res[key])];
      }
    }
  }
  return res
}

function extractPropsFromVNodeData (
  data,
  Ctor,
  tag,
  context// fixed by xxxxxx
) {
  // we are only extracting raw values here.
  // validation and default values are handled in the child
  // component itself.
  var propOptions = Ctor.options.props;
  if (isUndef(propOptions)) {
    // fixed by xxxxxx
    return extractPropertiesFromVNodeData(data, Ctor, {}, context)
  }
  var res = {};
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      if (true) {
        var keyInLowerCase = key.toLowerCase();
        if (
          key !== keyInLowerCase &&
          attrs && hasOwn(attrs, keyInLowerCase)
        ) {
          tip(
            "Prop \"" + keyInLowerCase + "\" is passed to component " +
            (formatComponentName(tag || Ctor)) + ", but the declared prop name is" +
            " \"" + key + "\". " +
            "Note that HTML attributes are case-insensitive and camelCased " +
            "props need to use their kebab-case equivalents when using in-DOM " +
            "templates. You should probably use \"" + altKey + "\" instead of \"" + key + "\"."
          );
        }
      }
      checkProp(res, props, key, altKey, true) ||
      checkProp(res, attrs, key, altKey, false);
    }
  }
  // fixed by xxxxxx
  return extractPropertiesFromVNodeData(data, Ctor, res, context)
}

function checkProp (
  res,
  hash,
  key,
  altKey,
  preserve
) {
  if (isDef(hash)) {
    if (hasOwn(hash, key)) {
      res[key] = hash[key];
      if (!preserve) {
        delete hash[key];
      }
      return true
    } else if (hasOwn(hash, altKey)) {
      res[key] = hash[altKey];
      if (!preserve) {
        delete hash[altKey];
      }
      return true
    }
  }
  return false
}

/*  */

// The template compiler attempts to minimize the need for normalization by
// statically analyzing the template at compile time.
//
// For plain HTML markup, normalization can be completely skipped because the
// generated render function is guaranteed to return Array<VNode>. There are
// two cases where extra normalization is needed:

// 1. When the children contains components - because a functional component
// may return an Array instead of a single root. In this case, just a simple
// normalization is needed - if any child is an Array, we flatten the whole
// thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
// because functional components already normalize their own children.
function simpleNormalizeChildren (children) {
  for (var i = 0; i < children.length; i++) {
    if (Array.isArray(children[i])) {
      return Array.prototype.concat.apply([], children)
    }
  }
  return children
}

// 2. When the children contains constructs that always generated nested Arrays,
// e.g. <template>, <slot>, v-for, or when the children is provided by user
// with hand-written render functions / JSX. In such cases a full normalization
// is needed to cater to all possible types of children values.
function normalizeChildren (children) {
  return isPrimitive(children)
    ? [createTextVNode(children)]
    : Array.isArray(children)
      ? normalizeArrayChildren(children)
      : undefined
}

function isTextNode (node) {
  return isDef(node) && isDef(node.text) && isFalse(node.isComment)
}

function normalizeArrayChildren (children, nestedIndex) {
  var res = [];
  var i, c, lastIndex, last;
  for (i = 0; i < children.length; i++) {
    c = children[i];
    if (isUndef(c) || typeof c === 'boolean') { continue }
    lastIndex = res.length - 1;
    last = res[lastIndex];
    //  nested
    if (Array.isArray(c)) {
      if (c.length > 0) {
        c = normalizeArrayChildren(c, ((nestedIndex || '') + "_" + i));
        // merge adjacent text nodes
        if (isTextNode(c[0]) && isTextNode(last)) {
          res[lastIndex] = createTextVNode(last.text + (c[0]).text);
          c.shift();
        }
        res.push.apply(res, c);
      }
    } else if (isPrimitive(c)) {
      if (isTextNode(last)) {
        // merge adjacent text nodes
        // this is necessary for SSR hydration because text nodes are
        // essentially merged when rendered to HTML strings
        res[lastIndex] = createTextVNode(last.text + c);
      } else if (c !== '') {
        // convert primitive to vnode
        res.push(createTextVNode(c));
      }
    } else {
      if (isTextNode(c) && isTextNode(last)) {
        // merge adjacent text nodes
        res[lastIndex] = createTextVNode(last.text + c.text);
      } else {
        // default key for nested array children (likely generated by v-for)
        if (isTrue(children._isVList) &&
          isDef(c.tag) &&
          isUndef(c.key) &&
          isDef(nestedIndex)) {
          c.key = "__vlist" + nestedIndex + "_" + i + "__";
        }
        res.push(c);
      }
    }
  }
  return res
}

/*  */

function initProvide (vm) {
  var provide = vm.$options.provide;
  if (provide) {
    vm._provided = typeof provide === 'function'
      ? provide.call(vm)
      : provide;
  }
}

function initInjections (vm) {
  var result = resolveInject(vm.$options.inject, vm);
  if (result) {
    toggleObserving(false);
    Object.keys(result).forEach(function (key) {
      /* istanbul ignore else */
      if (true) {
        defineReactive$$1(vm, key, result[key], function () {
          warn(
            "Avoid mutating an injected value directly since the changes will be " +
            "overwritten whenever the provided component re-renders. " +
            "injection being mutated: \"" + key + "\"",
            vm
          );
        });
      } else {}
    });
    toggleObserving(true);
  }
}

function resolveInject (inject, vm) {
  if (inject) {
    // inject is :any because flow is not smart enough to figure out cached
    var result = Object.create(null);
    var keys = hasSymbol
      ? Reflect.ownKeys(inject)
      : Object.keys(inject);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      // #6574 in case the inject object is observed...
      if (key === '__ob__') { continue }
      var provideKey = inject[key].from;
      var source = vm;
      while (source) {
        if (source._provided && hasOwn(source._provided, provideKey)) {
          result[key] = source._provided[provideKey];
          break
        }
        source = source.$parent;
      }
      if (!source) {
        if ('default' in inject[key]) {
          var provideDefault = inject[key].default;
          result[key] = typeof provideDefault === 'function'
            ? provideDefault.call(vm)
            : provideDefault;
        } else if (true) {
          warn(("Injection \"" + key + "\" not found"), vm);
        }
      }
    }
    return result
  }
}

/*  */



/**
 * Runtime helper for resolving raw children VNodes into a slot object.
 */
function resolveSlots (
  children,
  context
) {
  if (!children || !children.length) {
    return {}
  }
  var slots = {};
  for (var i = 0, l = children.length; i < l; i++) {
    var child = children[i];
    var data = child.data;
    // remove slot attribute if the node is resolved as a Vue slot node
    if (data && data.attrs && data.attrs.slot) {
      delete data.attrs.slot;
    }
    // named slots should only be respected if the vnode was rendered in the
    // same context.
    if ((child.context === context || child.fnContext === context) &&
      data && data.slot != null
    ) {
      var name = data.slot;
      var slot = (slots[name] || (slots[name] = []));
      if (child.tag === 'template') {
        slot.push.apply(slot, child.children || []);
      } else {
        slot.push(child);
      }
    } else {
      // fixed by xxxxxx 临时 hack 掉 uni-app 中的异步 name slot page
      if(child.asyncMeta && child.asyncMeta.data && child.asyncMeta.data.slot === 'page'){
        (slots['page'] || (slots['page'] = [])).push(child);
      }else{
        (slots.default || (slots.default = [])).push(child);
      }
    }
  }
  // ignore slots that contains only whitespace
  for (var name$1 in slots) {
    if (slots[name$1].every(isWhitespace)) {
      delete slots[name$1];
    }
  }
  return slots
}

function isWhitespace (node) {
  return (node.isComment && !node.asyncFactory) || node.text === ' '
}

/*  */

function normalizeScopedSlots (
  slots,
  normalSlots,
  prevSlots
) {
  var res;
  var hasNormalSlots = Object.keys(normalSlots).length > 0;
  var isStable = slots ? !!slots.$stable : !hasNormalSlots;
  var key = slots && slots.$key;
  if (!slots) {
    res = {};
  } else if (slots._normalized) {
    // fast path 1: child component re-render only, parent did not change
    return slots._normalized
  } else if (
    isStable &&
    prevSlots &&
    prevSlots !== emptyObject &&
    key === prevSlots.$key &&
    !hasNormalSlots &&
    !prevSlots.$hasNormal
  ) {
    // fast path 2: stable scoped slots w/ no normal slots to proxy,
    // only need to normalize once
    return prevSlots
  } else {
    res = {};
    for (var key$1 in slots) {
      if (slots[key$1] && key$1[0] !== '$') {
        res[key$1] = normalizeScopedSlot(normalSlots, key$1, slots[key$1]);
      }
    }
  }
  // expose normal slots on scopedSlots
  for (var key$2 in normalSlots) {
    if (!(key$2 in res)) {
      res[key$2] = proxyNormalSlot(normalSlots, key$2);
    }
  }
  // avoriaz seems to mock a non-extensible $scopedSlots object
  // and when that is passed down this would cause an error
  if (slots && Object.isExtensible(slots)) {
    (slots)._normalized = res;
  }
  def(res, '$stable', isStable);
  def(res, '$key', key);
  def(res, '$hasNormal', hasNormalSlots);
  return res
}

function normalizeScopedSlot(normalSlots, key, fn) {
  var normalized = function () {
    var res = arguments.length ? fn.apply(null, arguments) : fn({});
    res = res && typeof res === 'object' && !Array.isArray(res)
      ? [res] // single vnode
      : normalizeChildren(res);
    return res && (
      res.length === 0 ||
      (res.length === 1 && res[0].isComment) // #9658
    ) ? undefined
      : res
  };
  // this is a slot using the new v-slot syntax without scope. although it is
  // compiled as a scoped slot, render fn users would expect it to be present
  // on this.$slots because the usage is semantically a normal slot.
  if (fn.proxy) {
    Object.defineProperty(normalSlots, key, {
      get: normalized,
      enumerable: true,
      configurable: true
    });
  }
  return normalized
}

function proxyNormalSlot(slots, key) {
  return function () { return slots[key]; }
}

/*  */

/**
 * Runtime helper for rendering v-for lists.
 */
function renderList (
  val,
  render
) {
  var ret, i, l, keys, key;
  if (Array.isArray(val) || typeof val === 'string') {
    ret = new Array(val.length);
    for (i = 0, l = val.length; i < l; i++) {
      ret[i] = render(val[i], i, i, i); // fixed by xxxxxx
    }
  } else if (typeof val === 'number') {
    ret = new Array(val);
    for (i = 0; i < val; i++) {
      ret[i] = render(i + 1, i, i, i); // fixed by xxxxxx
    }
  } else if (isObject(val)) {
    if (hasSymbol && val[Symbol.iterator]) {
      ret = [];
      var iterator = val[Symbol.iterator]();
      var result = iterator.next();
      while (!result.done) {
        ret.push(render(result.value, ret.length, i++, i)); // fixed by xxxxxx
        result = iterator.next();
      }
    } else {
      keys = Object.keys(val);
      ret = new Array(keys.length);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[i] = render(val[key], key, i, i); // fixed by xxxxxx
      }
    }
  }
  if (!isDef(ret)) {
    ret = [];
  }
  (ret)._isVList = true;
  return ret
}

/*  */

/**
 * Runtime helper for rendering <slot>
 */
function renderSlot (
  name,
  fallback,
  props,
  bindObject
) {
  var scopedSlotFn = this.$scopedSlots[name];
  var nodes;
  if (scopedSlotFn) { // scoped slot
    props = props || {};
    if (bindObject) {
      if ( true && !isObject(bindObject)) {
        warn(
          'slot v-bind without argument expects an Object',
          this
        );
      }
      props = extend(extend({}, bindObject), props);
    }
    // fixed by xxxxxx app-plus scopedSlot
    nodes = scopedSlotFn(props, this, props._i) || fallback;
  } else {
    nodes = this.$slots[name] || fallback;
  }

  var target = props && props.slot;
  if (target) {
    return this.$createElement('template', { slot: target }, nodes)
  } else {
    return nodes
  }
}

/*  */

/**
 * Runtime helper for resolving filters
 */
function resolveFilter (id) {
  return resolveAsset(this.$options, 'filters', id, true) || identity
}

/*  */

function isKeyNotMatch (expect, actual) {
  if (Array.isArray(expect)) {
    return expect.indexOf(actual) === -1
  } else {
    return expect !== actual
  }
}

/**
 * Runtime helper for checking keyCodes from config.
 * exposed as Vue.prototype._k
 * passing in eventKeyName as last argument separately for backwards compat
 */
function checkKeyCodes (
  eventKeyCode,
  key,
  builtInKeyCode,
  eventKeyName,
  builtInKeyName
) {
  var mappedKeyCode = config.keyCodes[key] || builtInKeyCode;
  if (builtInKeyName && eventKeyName && !config.keyCodes[key]) {
    return isKeyNotMatch(builtInKeyName, eventKeyName)
  } else if (mappedKeyCode) {
    return isKeyNotMatch(mappedKeyCode, eventKeyCode)
  } else if (eventKeyName) {
    return hyphenate(eventKeyName) !== key
  }
}

/*  */

/**
 * Runtime helper for merging v-bind="object" into a VNode's data.
 */
function bindObjectProps (
  data,
  tag,
  value,
  asProp,
  isSync
) {
  if (value) {
    if (!isObject(value)) {
       true && warn(
        'v-bind without argument expects an Object or Array value',
        this
      );
    } else {
      if (Array.isArray(value)) {
        value = toObject(value);
      }
      var hash;
      var loop = function ( key ) {
        if (
          key === 'class' ||
          key === 'style' ||
          isReservedAttribute(key)
        ) {
          hash = data;
        } else {
          var type = data.attrs && data.attrs.type;
          hash = asProp || config.mustUseProp(tag, type, key)
            ? data.domProps || (data.domProps = {})
            : data.attrs || (data.attrs = {});
        }
        var camelizedKey = camelize(key);
        var hyphenatedKey = hyphenate(key);
        if (!(camelizedKey in hash) && !(hyphenatedKey in hash)) {
          hash[key] = value[key];

          if (isSync) {
            var on = data.on || (data.on = {});
            on[("update:" + key)] = function ($event) {
              value[key] = $event;
            };
          }
        }
      };

      for (var key in value) loop( key );
    }
  }
  return data
}

/*  */

/**
 * Runtime helper for rendering static trees.
 */
function renderStatic (
  index,
  isInFor
) {
  var cached = this._staticTrees || (this._staticTrees = []);
  var tree = cached[index];
  // if has already-rendered static tree and not inside v-for,
  // we can reuse the same tree.
  if (tree && !isInFor) {
    return tree
  }
  // otherwise, render a fresh tree.
  tree = cached[index] = this.$options.staticRenderFns[index].call(
    this._renderProxy,
    null,
    this // for render fns generated for functional component templates
  );
  markStatic(tree, ("__static__" + index), false);
  return tree
}

/**
 * Runtime helper for v-once.
 * Effectively it means marking the node as static with a unique key.
 */
function markOnce (
  tree,
  index,
  key
) {
  markStatic(tree, ("__once__" + index + (key ? ("_" + key) : "")), true);
  return tree
}

function markStatic (
  tree,
  key,
  isOnce
) {
  if (Array.isArray(tree)) {
    for (var i = 0; i < tree.length; i++) {
      if (tree[i] && typeof tree[i] !== 'string') {
        markStaticNode(tree[i], (key + "_" + i), isOnce);
      }
    }
  } else {
    markStaticNode(tree, key, isOnce);
  }
}

function markStaticNode (node, key, isOnce) {
  node.isStatic = true;
  node.key = key;
  node.isOnce = isOnce;
}

/*  */

function bindObjectListeners (data, value) {
  if (value) {
    if (!isPlainObject(value)) {
       true && warn(
        'v-on without argument expects an Object value',
        this
      );
    } else {
      var on = data.on = data.on ? extend({}, data.on) : {};
      for (var key in value) {
        var existing = on[key];
        var ours = value[key];
        on[key] = existing ? [].concat(existing, ours) : ours;
      }
    }
  }
  return data
}

/*  */

function resolveScopedSlots (
  fns, // see flow/vnode
  res,
  // the following are added in 2.6
  hasDynamicKeys,
  contentHashKey
) {
  res = res || { $stable: !hasDynamicKeys };
  for (var i = 0; i < fns.length; i++) {
    var slot = fns[i];
    if (Array.isArray(slot)) {
      resolveScopedSlots(slot, res, hasDynamicKeys);
    } else if (slot) {
      // marker for reverse proxying v-slot without scope on this.$slots
      if (slot.proxy) {
        slot.fn.proxy = true;
      }
      res[slot.key] = slot.fn;
    }
  }
  if (contentHashKey) {
    (res).$key = contentHashKey;
  }
  return res
}

/*  */

function bindDynamicKeys (baseObj, values) {
  for (var i = 0; i < values.length; i += 2) {
    var key = values[i];
    if (typeof key === 'string' && key) {
      baseObj[values[i]] = values[i + 1];
    } else if ( true && key !== '' && key !== null) {
      // null is a special value for explicitly removing a binding
      warn(
        ("Invalid value for dynamic directive argument (expected string or null): " + key),
        this
      );
    }
  }
  return baseObj
}

// helper to dynamically append modifier runtime markers to event names.
// ensure only append when value is already string, otherwise it will be cast
// to string and cause the type check to miss.
function prependModifier (value, symbol) {
  return typeof value === 'string' ? symbol + value : value
}

/*  */

function installRenderHelpers (target) {
  target._o = markOnce;
  target._n = toNumber;
  target._s = toString;
  target._l = renderList;
  target._t = renderSlot;
  target._q = looseEqual;
  target._i = looseIndexOf;
  target._m = renderStatic;
  target._f = resolveFilter;
  target._k = checkKeyCodes;
  target._b = bindObjectProps;
  target._v = createTextVNode;
  target._e = createEmptyVNode;
  target._u = resolveScopedSlots;
  target._g = bindObjectListeners;
  target._d = bindDynamicKeys;
  target._p = prependModifier;
}

/*  */

function FunctionalRenderContext (
  data,
  props,
  children,
  parent,
  Ctor
) {
  var this$1 = this;

  var options = Ctor.options;
  // ensure the createElement function in functional components
  // gets a unique context - this is necessary for correct named slot check
  var contextVm;
  if (hasOwn(parent, '_uid')) {
    contextVm = Object.create(parent);
    // $flow-disable-line
    contextVm._original = parent;
  } else {
    // the context vm passed in is a functional context as well.
    // in this case we want to make sure we are able to get a hold to the
    // real context instance.
    contextVm = parent;
    // $flow-disable-line
    parent = parent._original;
  }
  var isCompiled = isTrue(options._compiled);
  var needNormalization = !isCompiled;

  this.data = data;
  this.props = props;
  this.children = children;
  this.parent = parent;
  this.listeners = data.on || emptyObject;
  this.injections = resolveInject(options.inject, parent);
  this.slots = function () {
    if (!this$1.$slots) {
      normalizeScopedSlots(
        data.scopedSlots,
        this$1.$slots = resolveSlots(children, parent)
      );
    }
    return this$1.$slots
  };

  Object.defineProperty(this, 'scopedSlots', ({
    enumerable: true,
    get: function get () {
      return normalizeScopedSlots(data.scopedSlots, this.slots())
    }
  }));

  // support for compiled functional template
  if (isCompiled) {
    // exposing $options for renderStatic()
    this.$options = options;
    // pre-resolve slots for renderSlot()
    this.$slots = this.slots();
    this.$scopedSlots = normalizeScopedSlots(data.scopedSlots, this.$slots);
  }

  if (options._scopeId) {
    this._c = function (a, b, c, d) {
      var vnode = createElement(contextVm, a, b, c, d, needNormalization);
      if (vnode && !Array.isArray(vnode)) {
        vnode.fnScopeId = options._scopeId;
        vnode.fnContext = parent;
      }
      return vnode
    };
  } else {
    this._c = function (a, b, c, d) { return createElement(contextVm, a, b, c, d, needNormalization); };
  }
}

installRenderHelpers(FunctionalRenderContext.prototype);

function createFunctionalComponent (
  Ctor,
  propsData,
  data,
  contextVm,
  children
) {
  var options = Ctor.options;
  var props = {};
  var propOptions = options.props;
  if (isDef(propOptions)) {
    for (var key in propOptions) {
      props[key] = validateProp(key, propOptions, propsData || emptyObject);
    }
  } else {
    if (isDef(data.attrs)) { mergeProps(props, data.attrs); }
    if (isDef(data.props)) { mergeProps(props, data.props); }
  }

  var renderContext = new FunctionalRenderContext(
    data,
    props,
    children,
    contextVm,
    Ctor
  );

  var vnode = options.render.call(null, renderContext._c, renderContext);

  if (vnode instanceof VNode) {
    return cloneAndMarkFunctionalResult(vnode, data, renderContext.parent, options, renderContext)
  } else if (Array.isArray(vnode)) {
    var vnodes = normalizeChildren(vnode) || [];
    var res = new Array(vnodes.length);
    for (var i = 0; i < vnodes.length; i++) {
      res[i] = cloneAndMarkFunctionalResult(vnodes[i], data, renderContext.parent, options, renderContext);
    }
    return res
  }
}

function cloneAndMarkFunctionalResult (vnode, data, contextVm, options, renderContext) {
  // #7817 clone node before setting fnContext, otherwise if the node is reused
  // (e.g. it was from a cached normal slot) the fnContext causes named slots
  // that should not be matched to match.
  var clone = cloneVNode(vnode);
  clone.fnContext = contextVm;
  clone.fnOptions = options;
  if (true) {
    (clone.devtoolsMeta = clone.devtoolsMeta || {}).renderContext = renderContext;
  }
  if (data.slot) {
    (clone.data || (clone.data = {})).slot = data.slot;
  }
  return clone
}

function mergeProps (to, from) {
  for (var key in from) {
    to[camelize(key)] = from[key];
  }
}

/*  */

/*  */

/*  */

/*  */

// inline hooks to be invoked on component VNodes during patch
var componentVNodeHooks = {
  init: function init (vnode, hydrating) {
    if (
      vnode.componentInstance &&
      !vnode.componentInstance._isDestroyed &&
      vnode.data.keepAlive
    ) {
      // kept-alive components, treat as a patch
      var mountedNode = vnode; // work around flow
      componentVNodeHooks.prepatch(mountedNode, mountedNode);
    } else {
      var child = vnode.componentInstance = createComponentInstanceForVnode(
        vnode,
        activeInstance
      );
      child.$mount(hydrating ? vnode.elm : undefined, hydrating);
    }
  },

  prepatch: function prepatch (oldVnode, vnode) {
    var options = vnode.componentOptions;
    var child = vnode.componentInstance = oldVnode.componentInstance;
    updateChildComponent(
      child,
      options.propsData, // updated props
      options.listeners, // updated listeners
      vnode, // new parent vnode
      options.children // new children
    );
  },

  insert: function insert (vnode) {
    var context = vnode.context;
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isMounted) {
      callHook(componentInstance, 'onServiceCreated');
      callHook(componentInstance, 'onServiceAttached');
      componentInstance._isMounted = true;
      callHook(componentInstance, 'mounted');
    }
    if (vnode.data.keepAlive) {
      if (context._isMounted) {
        // vue-router#1212
        // During updates, a kept-alive component's child components may
        // change, so directly walking the tree here may call activated hooks
        // on incorrect children. Instead we push them into a queue which will
        // be processed after the whole patch process ended.
        queueActivatedComponent(componentInstance);
      } else {
        activateChildComponent(componentInstance, true /* direct */);
      }
    }
  },

  destroy: function destroy (vnode) {
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isDestroyed) {
      if (!vnode.data.keepAlive) {
        componentInstance.$destroy();
      } else {
        deactivateChildComponent(componentInstance, true /* direct */);
      }
    }
  }
};

var hooksToMerge = Object.keys(componentVNodeHooks);

function createComponent (
  Ctor,
  data,
  context,
  children,
  tag
) {
  if (isUndef(Ctor)) {
    return
  }

  var baseCtor = context.$options._base;

  // plain options object: turn it into a constructor
  if (isObject(Ctor)) {
    Ctor = baseCtor.extend(Ctor);
  }

  // if at this stage it's not a constructor or an async component factory,
  // reject.
  if (typeof Ctor !== 'function') {
    if (true) {
      warn(("Invalid Component definition: " + (String(Ctor))), context);
    }
    return
  }

  // async component
  var asyncFactory;
  if (isUndef(Ctor.cid)) {
    asyncFactory = Ctor;
    Ctor = resolveAsyncComponent(asyncFactory, baseCtor);
    if (Ctor === undefined) {
      // return a placeholder node for async component, which is rendered
      // as a comment node but preserves all the raw information for the node.
      // the information will be used for async server-rendering and hydration.
      return createAsyncPlaceholder(
        asyncFactory,
        data,
        context,
        children,
        tag
      )
    }
  }

  data = data || {};

  // resolve constructor options in case global mixins are applied after
  // component constructor creation
  resolveConstructorOptions(Ctor);

  // transform component v-model data into props & events
  if (isDef(data.model)) {
    transformModel(Ctor.options, data);
  }

  // extract props
  var propsData = extractPropsFromVNodeData(data, Ctor, tag, context); // fixed by xxxxxx

  // functional component
  if (isTrue(Ctor.options.functional)) {
    return createFunctionalComponent(Ctor, propsData, data, context, children)
  }

  // extract listeners, since these needs to be treated as
  // child component listeners instead of DOM listeners
  var listeners = data.on;
  // replace with listeners with .native modifier
  // so it gets processed during parent component patch.
  data.on = data.nativeOn;

  if (isTrue(Ctor.options.abstract)) {
    // abstract components do not keep anything
    // other than props & listeners & slot

    // work around flow
    var slot = data.slot;
    data = {};
    if (slot) {
      data.slot = slot;
    }
  }

  // install component management hooks onto the placeholder node
  installComponentHooks(data);

  // return a placeholder vnode
  var name = Ctor.options.name || tag;
  var vnode = new VNode(
    ("vue-component-" + (Ctor.cid) + (name ? ("-" + name) : '')),
    data, undefined, undefined, undefined, context,
    { Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children },
    asyncFactory
  );

  return vnode
}

function createComponentInstanceForVnode (
  vnode, // we know it's MountedComponentVNode but flow doesn't
  parent // activeInstance in lifecycle state
) {
  var options = {
    _isComponent: true,
    _parentVnode: vnode,
    parent: parent
  };
  // check inline-template render functions
  var inlineTemplate = vnode.data.inlineTemplate;
  if (isDef(inlineTemplate)) {
    options.render = inlineTemplate.render;
    options.staticRenderFns = inlineTemplate.staticRenderFns;
  }
  return new vnode.componentOptions.Ctor(options)
}

function installComponentHooks (data) {
  var hooks = data.hook || (data.hook = {});
  for (var i = 0; i < hooksToMerge.length; i++) {
    var key = hooksToMerge[i];
    var existing = hooks[key];
    var toMerge = componentVNodeHooks[key];
    if (existing !== toMerge && !(existing && existing._merged)) {
      hooks[key] = existing ? mergeHook$1(toMerge, existing) : toMerge;
    }
  }
}

function mergeHook$1 (f1, f2) {
  var merged = function (a, b) {
    // flow complains about extra args which is why we use any
    f1(a, b);
    f2(a, b);
  };
  merged._merged = true;
  return merged
}

// transform component v-model info (value and callback) into
// prop and event handler respectively.
function transformModel (options, data) {
  var prop = (options.model && options.model.prop) || 'value';
  var event = (options.model && options.model.event) || 'input'
  ;(data.attrs || (data.attrs = {}))[prop] = data.model.value;
  var on = data.on || (data.on = {});
  var existing = on[event];
  var callback = data.model.callback;
  if (isDef(existing)) {
    if (
      Array.isArray(existing)
        ? existing.indexOf(callback) === -1
        : existing !== callback
    ) {
      on[event] = [callback].concat(existing);
    }
  } else {
    on[event] = callback;
  }
}

/*  */

var SIMPLE_NORMALIZE = 1;
var ALWAYS_NORMALIZE = 2;

// wrapper function for providing a more flexible interface
// without getting yelled at by flow
function createElement (
  context,
  tag,
  data,
  children,
  normalizationType,
  alwaysNormalize
) {
  if (Array.isArray(data) || isPrimitive(data)) {
    normalizationType = children;
    children = data;
    data = undefined;
  }
  if (isTrue(alwaysNormalize)) {
    normalizationType = ALWAYS_NORMALIZE;
  }
  return _createElement(context, tag, data, children, normalizationType)
}

function _createElement (
  context,
  tag,
  data,
  children,
  normalizationType
) {
  if (isDef(data) && isDef((data).__ob__)) {
     true && warn(
      "Avoid using observed data object as vnode data: " + (JSON.stringify(data)) + "\n" +
      'Always create fresh vnode data objects in each render!',
      context
    );
    return createEmptyVNode()
  }
  // object syntax in v-bind
  if (isDef(data) && isDef(data.is)) {
    tag = data.is;
  }
  if (!tag) {
    // in case of component :is set to falsy value
    return createEmptyVNode()
  }
  // warn against non-primitive key
  if ( true &&
    isDef(data) && isDef(data.key) && !isPrimitive(data.key)
  ) {
    {
      warn(
        'Avoid using non-primitive value as key, ' +
        'use string/number value instead.',
        context
      );
    }
  }
  // support single function children as default scoped slot
  if (Array.isArray(children) &&
    typeof children[0] === 'function'
  ) {
    data = data || {};
    data.scopedSlots = { default: children[0] };
    children.length = 0;
  }
  if (normalizationType === ALWAYS_NORMALIZE) {
    children = normalizeChildren(children);
  } else if (normalizationType === SIMPLE_NORMALIZE) {
    children = simpleNormalizeChildren(children);
  }
  var vnode, ns;
  if (typeof tag === 'string') {
    var Ctor;
    ns = (context.$vnode && context.$vnode.ns) || config.getTagNamespace(tag);
    if (config.isReservedTag(tag)) {
      // platform built-in elements
      if ( true && isDef(data) && isDef(data.nativeOn)) {
        warn(
          ("The .native modifier for v-on is only valid on components but it was used on <" + tag + ">."),
          context
        );
      }
      vnode = new VNode(
        config.parsePlatformTagName(tag), data, children,
        undefined, undefined, context
      );
    } else if ((!data || !data.pre) && isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
      // component
      vnode = createComponent(Ctor, data, context, children, tag);
    } else {
      // unknown or unlisted namespaced elements
      // check at runtime because it may get assigned a namespace when its
      // parent normalizes children
      vnode = new VNode(
        tag, data, children,
        undefined, undefined, context
      );
    }
  } else {
    // direct component options / constructor
    vnode = createComponent(tag, data, context, children);
  }
  if (Array.isArray(vnode)) {
    return vnode
  } else if (isDef(vnode)) {
    if (isDef(ns)) { applyNS(vnode, ns); }
    if (isDef(data)) { registerDeepBindings(data); }
    return vnode
  } else {
    return createEmptyVNode()
  }
}

function applyNS (vnode, ns, force) {
  vnode.ns = ns;
  if (vnode.tag === 'foreignObject') {
    // use default namespace inside foreignObject
    ns = undefined;
    force = true;
  }
  if (isDef(vnode.children)) {
    for (var i = 0, l = vnode.children.length; i < l; i++) {
      var child = vnode.children[i];
      if (isDef(child.tag) && (
        isUndef(child.ns) || (isTrue(force) && child.tag !== 'svg'))) {
        applyNS(child, ns, force);
      }
    }
  }
}

// ref #5318
// necessary to ensure parent re-render when deep bindings like :style and
// :class are used on slot nodes
function registerDeepBindings (data) {
  if (isObject(data.style)) {
    traverse(data.style);
  }
  if (isObject(data.class)) {
    traverse(data.class);
  }
}

/*  */

function initRender (vm) {
  vm._vnode = null; // the root of the child tree
  vm._staticTrees = null; // v-once cached trees
  var options = vm.$options;
  var parentVnode = vm.$vnode = options._parentVnode; // the placeholder node in parent tree
  var renderContext = parentVnode && parentVnode.context;
  vm.$slots = resolveSlots(options._renderChildren, renderContext);
  vm.$scopedSlots = emptyObject;
  // bind the createElement fn to this instance
  // so that we get proper render context inside it.
  // args order: tag, data, children, normalizationType, alwaysNormalize
  // internal version is used by render functions compiled from templates
  vm._c = function (a, b, c, d) { return createElement(vm, a, b, c, d, false); };
  // normalization is always applied for the public version, used in
  // user-written render functions.
  vm.$createElement = function (a, b, c, d) { return createElement(vm, a, b, c, d, true); };

  // $attrs & $listeners are exposed for easier HOC creation.
  // they need to be reactive so that HOCs using them are always updated
  var parentData = parentVnode && parentVnode.data;

  /* istanbul ignore else */
  if (true) {
    defineReactive$$1(vm, '$attrs', parentData && parentData.attrs || emptyObject, function () {
      !isUpdatingChildComponent && warn("$attrs is readonly.", vm);
    }, true);
    defineReactive$$1(vm, '$listeners', options._parentListeners || emptyObject, function () {
      !isUpdatingChildComponent && warn("$listeners is readonly.", vm);
    }, true);
  } else {}
}

var currentRenderingInstance = null;

function renderMixin (Vue) {
  // install runtime convenience helpers
  installRenderHelpers(Vue.prototype);

  Vue.prototype.$nextTick = function (fn) {
    return nextTick(fn, this)
  };

  Vue.prototype._render = function () {
    var vm = this;
    var ref = vm.$options;
    var render = ref.render;
    var _parentVnode = ref._parentVnode;

    if (_parentVnode) {
      vm.$scopedSlots = normalizeScopedSlots(
        _parentVnode.data.scopedSlots,
        vm.$slots,
        vm.$scopedSlots
      );
    }

    // set parent vnode. this allows render functions to have access
    // to the data on the placeholder node.
    vm.$vnode = _parentVnode;
    // render self
    var vnode;
    try {
      // There's no need to maintain a stack because all render fns are called
      // separately from one another. Nested component's render fns are called
      // when parent component is patched.
      currentRenderingInstance = vm;
      vnode = render.call(vm._renderProxy, vm.$createElement);
    } catch (e) {
      handleError(e, vm, "render");
      // return error render result,
      // or previous vnode to prevent render error causing blank component
      /* istanbul ignore else */
      if ( true && vm.$options.renderError) {
        try {
          vnode = vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e);
        } catch (e) {
          handleError(e, vm, "renderError");
          vnode = vm._vnode;
        }
      } else {
        vnode = vm._vnode;
      }
    } finally {
      currentRenderingInstance = null;
    }
    // if the returned array contains only a single node, allow it
    if (Array.isArray(vnode) && vnode.length === 1) {
      vnode = vnode[0];
    }
    // return empty vnode in case the render function errored out
    if (!(vnode instanceof VNode)) {
      if ( true && Array.isArray(vnode)) {
        warn(
          'Multiple root nodes returned from render function. Render function ' +
          'should return a single root node.',
          vm
        );
      }
      vnode = createEmptyVNode();
    }
    // set parent
    vnode.parent = _parentVnode;
    return vnode
  };
}

/*  */

function ensureCtor (comp, base) {
  if (
    comp.__esModule ||
    (hasSymbol && comp[Symbol.toStringTag] === 'Module')
  ) {
    comp = comp.default;
  }
  return isObject(comp)
    ? base.extend(comp)
    : comp
}

function createAsyncPlaceholder (
  factory,
  data,
  context,
  children,
  tag
) {
  var node = createEmptyVNode();
  node.asyncFactory = factory;
  node.asyncMeta = { data: data, context: context, children: children, tag: tag };
  return node
}

function resolveAsyncComponent (
  factory,
  baseCtor
) {
  if (isTrue(factory.error) && isDef(factory.errorComp)) {
    return factory.errorComp
  }

  if (isDef(factory.resolved)) {
    return factory.resolved
  }

  var owner = currentRenderingInstance;
  if (owner && isDef(factory.owners) && factory.owners.indexOf(owner) === -1) {
    // already pending
    factory.owners.push(owner);
  }

  if (isTrue(factory.loading) && isDef(factory.loadingComp)) {
    return factory.loadingComp
  }

  if (owner && !isDef(factory.owners)) {
    var owners = factory.owners = [owner];
    var sync = true;
    var timerLoading = null;
    var timerTimeout = null

    ;(owner).$on('hook:destroyed', function () { return remove(owners, owner); });

    var forceRender = function (renderCompleted) {
      for (var i = 0, l = owners.length; i < l; i++) {
        (owners[i]).$forceUpdate();
      }

      if (renderCompleted) {
        owners.length = 0;
        if (timerLoading !== null) {
          clearTimeout(timerLoading);
          timerLoading = null;
        }
        if (timerTimeout !== null) {
          clearTimeout(timerTimeout);
          timerTimeout = null;
        }
      }
    };

    var resolve = once(function (res) {
      // cache resolved
      factory.resolved = ensureCtor(res, baseCtor);
      // invoke callbacks only if this is not a synchronous resolve
      // (async resolves are shimmed as synchronous during SSR)
      if (!sync) {
        forceRender(true);
      } else {
        owners.length = 0;
      }
    });

    var reject = once(function (reason) {
       true && warn(
        "Failed to resolve async component: " + (String(factory)) +
        (reason ? ("\nReason: " + reason) : '')
      );
      if (isDef(factory.errorComp)) {
        factory.error = true;
        forceRender(true);
      }
    });

    var res = factory(resolve, reject);

    if (isObject(res)) {
      if (isPromise(res)) {
        // () => Promise
        if (isUndef(factory.resolved)) {
          res.then(resolve, reject);
        }
      } else if (isPromise(res.component)) {
        res.component.then(resolve, reject);

        if (isDef(res.error)) {
          factory.errorComp = ensureCtor(res.error, baseCtor);
        }

        if (isDef(res.loading)) {
          factory.loadingComp = ensureCtor(res.loading, baseCtor);
          if (res.delay === 0) {
            factory.loading = true;
          } else {
            timerLoading = setTimeout(function () {
              timerLoading = null;
              if (isUndef(factory.resolved) && isUndef(factory.error)) {
                factory.loading = true;
                forceRender(false);
              }
            }, res.delay || 200);
          }
        }

        if (isDef(res.timeout)) {
          timerTimeout = setTimeout(function () {
            timerTimeout = null;
            if (isUndef(factory.resolved)) {
              reject(
                 true
                  ? ("timeout (" + (res.timeout) + "ms)")
                  : undefined
              );
            }
          }, res.timeout);
        }
      }
    }

    sync = false;
    // return in case resolved synchronously
    return factory.loading
      ? factory.loadingComp
      : factory.resolved
  }
}

/*  */

function isAsyncPlaceholder (node) {
  return node.isComment && node.asyncFactory
}

/*  */

function getFirstComponentChild (children) {
  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      var c = children[i];
      if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
        return c
      }
    }
  }
}

/*  */

/*  */

function initEvents (vm) {
  vm._events = Object.create(null);
  vm._hasHookEvent = false;
  // init parent attached events
  var listeners = vm.$options._parentListeners;
  if (listeners) {
    updateComponentListeners(vm, listeners);
  }
}

var target;

function add (event, fn) {
  target.$on(event, fn);
}

function remove$1 (event, fn) {
  target.$off(event, fn);
}

function createOnceHandler (event, fn) {
  var _target = target;
  return function onceHandler () {
    var res = fn.apply(null, arguments);
    if (res !== null) {
      _target.$off(event, onceHandler);
    }
  }
}

function updateComponentListeners (
  vm,
  listeners,
  oldListeners
) {
  target = vm;
  updateListeners(listeners, oldListeners || {}, add, remove$1, createOnceHandler, vm);
  target = undefined;
}

function eventsMixin (Vue) {
  var hookRE = /^hook:/;
  Vue.prototype.$on = function (event, fn) {
    var vm = this;
    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        vm.$on(event[i], fn);
      }
    } else {
      (vm._events[event] || (vm._events[event] = [])).push(fn);
      // optimize hook:event cost by using a boolean flag marked at registration
      // instead of a hash lookup
      if (hookRE.test(event)) {
        vm._hasHookEvent = true;
      }
    }
    return vm
  };

  Vue.prototype.$once = function (event, fn) {
    var vm = this;
    function on () {
      vm.$off(event, on);
      fn.apply(vm, arguments);
    }
    on.fn = fn;
    vm.$on(event, on);
    return vm
  };

  Vue.prototype.$off = function (event, fn) {
    var vm = this;
    // all
    if (!arguments.length) {
      vm._events = Object.create(null);
      return vm
    }
    // array of events
    if (Array.isArray(event)) {
      for (var i$1 = 0, l = event.length; i$1 < l; i$1++) {
        vm.$off(event[i$1], fn);
      }
      return vm
    }
    // specific event
    var cbs = vm._events[event];
    if (!cbs) {
      return vm
    }
    if (!fn) {
      vm._events[event] = null;
      return vm
    }
    // specific handler
    var cb;
    var i = cbs.length;
    while (i--) {
      cb = cbs[i];
      if (cb === fn || cb.fn === fn) {
        cbs.splice(i, 1);
        break
      }
    }
    return vm
  };

  Vue.prototype.$emit = function (event) {
    var vm = this;
    if (true) {
      var lowerCaseEvent = event.toLowerCase();
      if (lowerCaseEvent !== event && vm._events[lowerCaseEvent]) {
        tip(
          "Event \"" + lowerCaseEvent + "\" is emitted in component " +
          (formatComponentName(vm)) + " but the handler is registered for \"" + event + "\". " +
          "Note that HTML attributes are case-insensitive and you cannot use " +
          "v-on to listen to camelCase events when using in-DOM templates. " +
          "You should probably use \"" + (hyphenate(event)) + "\" instead of \"" + event + "\"."
        );
      }
    }
    var cbs = vm._events[event];
    if (cbs) {
      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
      var args = toArray(arguments, 1);
      var info = "event handler for \"" + event + "\"";
      for (var i = 0, l = cbs.length; i < l; i++) {
        invokeWithErrorHandling(cbs[i], vm, args, vm, info);
      }
    }
    return vm
  };
}

/*  */

var activeInstance = null;
var isUpdatingChildComponent = false;

function setActiveInstance(vm) {
  var prevActiveInstance = activeInstance;
  activeInstance = vm;
  return function () {
    activeInstance = prevActiveInstance;
  }
}

function initLifecycle (vm) {
  var options = vm.$options;

  // locate first non-abstract parent
  var parent = options.parent;
  if (parent && !options.abstract) {
    while (parent.$options.abstract && parent.$parent) {
      parent = parent.$parent;
    }
    parent.$children.push(vm);
  }

  vm.$parent = parent;
  vm.$root = parent ? parent.$root : vm;

  vm.$children = [];
  vm.$refs = {};

  vm._watcher = null;
  vm._inactive = null;
  vm._directInactive = false;
  vm._isMounted = false;
  vm._isDestroyed = false;
  vm._isBeingDestroyed = false;
}

function lifecycleMixin (Vue) {
  Vue.prototype._update = function (vnode, hydrating) {
    var vm = this;
    var prevEl = vm.$el;
    var prevVnode = vm._vnode;
    var restoreActiveInstance = setActiveInstance(vm);
    vm._vnode = vnode;
    // Vue.prototype.__patch__ is injected in entry points
    // based on the rendering backend used.
    if (!prevVnode) {
      // initial render
      vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false /* removeOnly */);
    } else {
      // updates
      vm.$el = vm.__patch__(prevVnode, vnode);
    }
    restoreActiveInstance();
    // update __vue__ reference
    if (prevEl) {
      prevEl.__vue__ = null;
    }
    if (vm.$el) {
      vm.$el.__vue__ = vm;
    }
    // if parent is an HOC, update its $el as well
    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
      vm.$parent.$el = vm.$el;
    }
    // updated hook is called by the scheduler to ensure that children are
    // updated in a parent's updated hook.
  };

  Vue.prototype.$forceUpdate = function () {
    var vm = this;
    if (vm._watcher) {
      vm._watcher.update();
    }
  };

  Vue.prototype.$destroy = function () {
    var vm = this;
    if (vm._isBeingDestroyed) {
      return
    }
    callHook(vm, 'beforeDestroy');
    vm._isBeingDestroyed = true;
    // remove self from parent
    var parent = vm.$parent;
    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
      remove(parent.$children, vm);
    }
    // teardown watchers
    if (vm._watcher) {
      vm._watcher.teardown();
    }
    var i = vm._watchers.length;
    while (i--) {
      vm._watchers[i].teardown();
    }
    // remove reference from data ob
    // frozen object may not have observer.
    if (vm._data.__ob__) {
      vm._data.__ob__.vmCount--;
    }
    // call the last hook...
    vm._isDestroyed = true;
    // invoke destroy hooks on current rendered tree
    vm.__patch__(vm._vnode, null);
    // fire destroyed hook
    callHook(vm, 'destroyed');
    // turn off all instance listeners.
    vm.$off();
    // remove __vue__ reference
    if (vm.$el) {
      vm.$el.__vue__ = null;
    }
    // release circular reference (#6759)
    if (vm.$vnode) {
      vm.$vnode.parent = null;
    }
  };
}

function updateChildComponent (
  vm,
  propsData,
  listeners,
  parentVnode,
  renderChildren
) {
  if (true) {
    isUpdatingChildComponent = true;
  }

  // determine whether component has slot children
  // we need to do this before overwriting $options._renderChildren.

  // check if there are dynamic scopedSlots (hand-written or compiled but with
  // dynamic slot names). Static scoped slots compiled from template has the
  // "$stable" marker.
  var newScopedSlots = parentVnode.data.scopedSlots;
  var oldScopedSlots = vm.$scopedSlots;
  var hasDynamicScopedSlot = !!(
    (newScopedSlots && !newScopedSlots.$stable) ||
    (oldScopedSlots !== emptyObject && !oldScopedSlots.$stable) ||
    (newScopedSlots && vm.$scopedSlots.$key !== newScopedSlots.$key)
  );

  // Any static slot children from the parent may have changed during parent's
  // update. Dynamic scoped slots may also have changed. In such cases, a forced
  // update is necessary to ensure correctness.
  var needsForceUpdate = !!(
    renderChildren ||               // has new static slots
    vm.$options._renderChildren ||  // has old static slots
    hasDynamicScopedSlot
  );

  vm.$options._parentVnode = parentVnode;
  vm.$vnode = parentVnode; // update vm's placeholder node without re-render

  if (vm._vnode) { // update child tree's parent
    vm._vnode.parent = parentVnode;
  }
  vm.$options._renderChildren = renderChildren;

  // update $attrs and $listeners hash
  // these are also reactive so they may trigger child update if the child
  // used them during render
  vm.$attrs = parentVnode.data.attrs || emptyObject;
  vm.$listeners = listeners || emptyObject;

  // update props
  if (propsData && vm.$options.props) {
    toggleObserving(false);
    var props = vm._props;
    var propKeys = vm.$options._propKeys || [];
    for (var i = 0; i < propKeys.length; i++) {
      var key = propKeys[i];
      var propOptions = vm.$options.props; // wtf flow?
      props[key] = validateProp(key, propOptions, propsData, vm);
    }
    toggleObserving(true);
    // keep a copy of raw propsData
    vm.$options.propsData = propsData;
  }
  
  // fixed by xxxxxx update properties(mp runtime)
  vm._$updateProperties && vm._$updateProperties(vm);
  
  // update listeners
  listeners = listeners || emptyObject;
  var oldListeners = vm.$options._parentListeners;
  vm.$options._parentListeners = listeners;
  updateComponentListeners(vm, listeners, oldListeners);

  // resolve slots + force update if has children
  if (needsForceUpdate) {
    vm.$slots = resolveSlots(renderChildren, parentVnode.context);
    vm.$forceUpdate();
  }

  if (true) {
    isUpdatingChildComponent = false;
  }
}

function isInInactiveTree (vm) {
  while (vm && (vm = vm.$parent)) {
    if (vm._inactive) { return true }
  }
  return false
}

function activateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = false;
    if (isInInactiveTree(vm)) {
      return
    }
  } else if (vm._directInactive) {
    return
  }
  if (vm._inactive || vm._inactive === null) {
    vm._inactive = false;
    for (var i = 0; i < vm.$children.length; i++) {
      activateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'activated');
  }
}

function deactivateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = true;
    if (isInInactiveTree(vm)) {
      return
    }
  }
  if (!vm._inactive) {
    vm._inactive = true;
    for (var i = 0; i < vm.$children.length; i++) {
      deactivateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'deactivated');
  }
}

function callHook (vm, hook) {
  // #7573 disable dep collection when invoking lifecycle hooks
  pushTarget();
  var handlers = vm.$options[hook];
  var info = hook + " hook";
  if (handlers) {
    for (var i = 0, j = handlers.length; i < j; i++) {
      invokeWithErrorHandling(handlers[i], vm, null, vm, info);
    }
  }
  if (vm._hasHookEvent) {
    vm.$emit('hook:' + hook);
  }
  popTarget();
}

/*  */

var MAX_UPDATE_COUNT = 100;

var queue = [];
var activatedChildren = [];
var has = {};
var circular = {};
var waiting = false;
var flushing = false;
var index = 0;

/**
 * Reset the scheduler's state.
 */
function resetSchedulerState () {
  index = queue.length = activatedChildren.length = 0;
  has = {};
  if (true) {
    circular = {};
  }
  waiting = flushing = false;
}

// Async edge case #6566 requires saving the timestamp when event listeners are
// attached. However, calling performance.now() has a perf overhead especially
// if the page has thousands of event listeners. Instead, we take a timestamp
// every time the scheduler flushes and use that for all event listeners
// attached during that flush.
var currentFlushTimestamp = 0;

// Async edge case fix requires storing an event listener's attach timestamp.
var getNow = Date.now;

// Determine what event timestamp the browser is using. Annoyingly, the
// timestamp can either be hi-res (relative to page load) or low-res
// (relative to UNIX epoch), so in order to compare time we have to use the
// same timestamp type when saving the flush timestamp.
// All IE versions use low-res event timestamps, and have problematic clock
// implementations (#9632)
if (inBrowser && !isIE) {
  var performance = window.performance;
  if (
    performance &&
    typeof performance.now === 'function' &&
    getNow() > document.createEvent('Event').timeStamp
  ) {
    // if the event timestamp, although evaluated AFTER the Date.now(), is
    // smaller than it, it means the event is using a hi-res timestamp,
    // and we need to use the hi-res version for event listener timestamps as
    // well.
    getNow = function () { return performance.now(); };
  }
}

/**
 * Flush both queues and run the watchers.
 */
function flushSchedulerQueue () {
  currentFlushTimestamp = getNow();
  flushing = true;
  var watcher, id;

  // Sort queue before flush.
  // This ensures that:
  // 1. Components are updated from parent to child. (because parent is always
  //    created before the child)
  // 2. A component's user watchers are run before its render watcher (because
  //    user watchers are created before the render watcher)
  // 3. If a component is destroyed during a parent component's watcher run,
  //    its watchers can be skipped.
  queue.sort(function (a, b) { return a.id - b.id; });

  // do not cache length because more watchers might be pushed
  // as we run existing watchers
  for (index = 0; index < queue.length; index++) {
    watcher = queue[index];
    if (watcher.before) {
      watcher.before();
    }
    id = watcher.id;
    has[id] = null;
    watcher.run();
    // in dev build, check and stop circular updates.
    if ( true && has[id] != null) {
      circular[id] = (circular[id] || 0) + 1;
      if (circular[id] > MAX_UPDATE_COUNT) {
        warn(
          'You may have an infinite update loop ' + (
            watcher.user
              ? ("in watcher with expression \"" + (watcher.expression) + "\"")
              : "in a component render function."
          ),
          watcher.vm
        );
        break
      }
    }
  }

  // keep copies of post queues before resetting state
  var activatedQueue = activatedChildren.slice();
  var updatedQueue = queue.slice();

  resetSchedulerState();

  // call component updated and activated hooks
  callActivatedHooks(activatedQueue);
  callUpdatedHooks(updatedQueue);

  // devtool hook
  /* istanbul ignore if */
  if (devtools && config.devtools) {
    devtools.emit('flush');
  }
}

function callUpdatedHooks (queue) {
  var i = queue.length;
  while (i--) {
    var watcher = queue[i];
    var vm = watcher.vm;
    if (vm._watcher === watcher && vm._isMounted && !vm._isDestroyed) {
      callHook(vm, 'updated');
    }
  }
}

/**
 * Queue a kept-alive component that was activated during patch.
 * The queue will be processed after the entire tree has been patched.
 */
function queueActivatedComponent (vm) {
  // setting _inactive to false here so that a render function can
  // rely on checking whether it's in an inactive tree (e.g. router-view)
  vm._inactive = false;
  activatedChildren.push(vm);
}

function callActivatedHooks (queue) {
  for (var i = 0; i < queue.length; i++) {
    queue[i]._inactive = true;
    activateChildComponent(queue[i], true /* true */);
  }
}

/**
 * Push a watcher into the watcher queue.
 * Jobs with duplicate IDs will be skipped unless it's
 * pushed when the queue is being flushed.
 */
function queueWatcher (watcher) {
  var id = watcher.id;
  if (has[id] == null) {
    has[id] = true;
    if (!flushing) {
      queue.push(watcher);
    } else {
      // if already flushing, splice the watcher based on its id
      // if already past its id, it will be run next immediately.
      var i = queue.length - 1;
      while (i > index && queue[i].id > watcher.id) {
        i--;
      }
      queue.splice(i + 1, 0, watcher);
    }
    // queue the flush
    if (!waiting) {
      waiting = true;

      if ( true && !config.async) {
        flushSchedulerQueue();
        return
      }
      nextTick(flushSchedulerQueue);
    }
  }
}

/*  */



var uid$2 = 0;

/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 */
var Watcher = function Watcher (
  vm,
  expOrFn,
  cb,
  options,
  isRenderWatcher
) {
  this.vm = vm;
  if (isRenderWatcher) {
    vm._watcher = this;
  }
  vm._watchers.push(this);
  // options
  if (options) {
    this.deep = !!options.deep;
    this.user = !!options.user;
    this.lazy = !!options.lazy;
    this.sync = !!options.sync;
    this.before = options.before;
  } else {
    this.deep = this.user = this.lazy = this.sync = false;
  }
  this.cb = cb;
  this.id = ++uid$2; // uid for batching
  this.active = true;
  this.dirty = this.lazy; // for lazy watchers
  this.deps = [];
  this.newDeps = [];
  this.depIds = new _Set();
  this.newDepIds = new _Set();
  this.expression =  true
    ? expOrFn.toString()
    : undefined;
  // parse expression for getter
  if (typeof expOrFn === 'function') {
    this.getter = expOrFn;
  } else {
    this.getter = parsePath(expOrFn);
    if (!this.getter) {
      this.getter = noop;
       true && warn(
        "Failed watching path: \"" + expOrFn + "\" " +
        'Watcher only accepts simple dot-delimited paths. ' +
        'For full control, use a function instead.',
        vm
      );
    }
  }
  this.value = this.lazy
    ? undefined
    : this.get();
};

/**
 * Evaluate the getter, and re-collect dependencies.
 */
Watcher.prototype.get = function get () {
  pushTarget(this);
  var value;
  var vm = this.vm;
  try {
    value = this.getter.call(vm, vm);
  } catch (e) {
    if (this.user) {
      handleError(e, vm, ("getter for watcher \"" + (this.expression) + "\""));
    } else {
      throw e
    }
  } finally {
    // "touch" every property so they are all tracked as
    // dependencies for deep watching
    if (this.deep) {
      traverse(value);
    }
    popTarget();
    this.cleanupDeps();
  }
  return value
};

/**
 * Add a dependency to this directive.
 */
Watcher.prototype.addDep = function addDep (dep) {
  var id = dep.id;
  if (!this.newDepIds.has(id)) {
    this.newDepIds.add(id);
    this.newDeps.push(dep);
    if (!this.depIds.has(id)) {
      dep.addSub(this);
    }
  }
};

/**
 * Clean up for dependency collection.
 */
Watcher.prototype.cleanupDeps = function cleanupDeps () {
  var i = this.deps.length;
  while (i--) {
    var dep = this.deps[i];
    if (!this.newDepIds.has(dep.id)) {
      dep.removeSub(this);
    }
  }
  var tmp = this.depIds;
  this.depIds = this.newDepIds;
  this.newDepIds = tmp;
  this.newDepIds.clear();
  tmp = this.deps;
  this.deps = this.newDeps;
  this.newDeps = tmp;
  this.newDeps.length = 0;
};

/**
 * Subscriber interface.
 * Will be called when a dependency changes.
 */
Watcher.prototype.update = function update () {
  /* istanbul ignore else */
  if (this.lazy) {
    this.dirty = true;
  } else if (this.sync) {
    this.run();
  } else {
    queueWatcher(this);
  }
};

/**
 * Scheduler job interface.
 * Will be called by the scheduler.
 */
Watcher.prototype.run = function run () {
  if (this.active) {
    var value = this.get();
    if (
      value !== this.value ||
      // Deep watchers and watchers on Object/Arrays should fire even
      // when the value is the same, because the value may
      // have mutated.
      isObject(value) ||
      this.deep
    ) {
      // set new value
      var oldValue = this.value;
      this.value = value;
      if (this.user) {
        try {
          this.cb.call(this.vm, value, oldValue);
        } catch (e) {
          handleError(e, this.vm, ("callback for watcher \"" + (this.expression) + "\""));
        }
      } else {
        this.cb.call(this.vm, value, oldValue);
      }
    }
  }
};

/**
 * Evaluate the value of the watcher.
 * This only gets called for lazy watchers.
 */
Watcher.prototype.evaluate = function evaluate () {
  this.value = this.get();
  this.dirty = false;
};

/**
 * Depend on all deps collected by this watcher.
 */
Watcher.prototype.depend = function depend () {
  var i = this.deps.length;
  while (i--) {
    this.deps[i].depend();
  }
};

/**
 * Remove self from all dependencies' subscriber list.
 */
Watcher.prototype.teardown = function teardown () {
  if (this.active) {
    // remove self from vm's watcher list
    // this is a somewhat expensive operation so we skip it
    // if the vm is being destroyed.
    if (!this.vm._isBeingDestroyed) {
      remove(this.vm._watchers, this);
    }
    var i = this.deps.length;
    while (i--) {
      this.deps[i].removeSub(this);
    }
    this.active = false;
  }
};

/*  */

var sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
};

function proxy (target, sourceKey, key) {
  sharedPropertyDefinition.get = function proxyGetter () {
    return this[sourceKey][key]
  };
  sharedPropertyDefinition.set = function proxySetter (val) {
    this[sourceKey][key] = val;
  };
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function initState (vm) {
  vm._watchers = [];
  var opts = vm.$options;
  if (opts.props) { initProps(vm, opts.props); }
  if (opts.methods) { initMethods(vm, opts.methods); }
  if (opts.data) {
    initData(vm);
  } else {
    observe(vm._data = {}, true /* asRootData */);
  }
  if (opts.computed) { initComputed(vm, opts.computed); }
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch);
  }
}

function initProps (vm, propsOptions) {
  var propsData = vm.$options.propsData || {};
  var props = vm._props = {};
  // cache prop keys so that future props updates can iterate using Array
  // instead of dynamic object key enumeration.
  var keys = vm.$options._propKeys = [];
  var isRoot = !vm.$parent;
  // root instance props should be converted
  if (!isRoot) {
    toggleObserving(false);
  }
  var loop = function ( key ) {
    keys.push(key);
    var value = validateProp(key, propsOptions, propsData, vm);
    /* istanbul ignore else */
    if (true) {
      var hyphenatedKey = hyphenate(key);
      if (isReservedAttribute(hyphenatedKey) ||
          config.isReservedAttr(hyphenatedKey)) {
        warn(
          ("\"" + hyphenatedKey + "\" is a reserved attribute and cannot be used as component prop."),
          vm
        );
      }
      defineReactive$$1(props, key, value, function () {
        if (!isRoot && !isUpdatingChildComponent) {
          {
            if(vm.mpHost === 'mp-baidu'){//百度 observer 在 setData callback 之后触发，直接忽略该 warn
                return
            }
            //fixed by xxxxxx __next_tick_pending,uni://form-field 时不告警
            if(
                key === 'value' && 
                Array.isArray(vm.$options.behaviors) &&
                vm.$options.behaviors.indexOf('uni://form-field') !== -1
              ){
              return
            }
            if(vm._getFormData){
              return
            }
            var $parent = vm.$parent;
            while($parent){
              if($parent.__next_tick_pending){
                return  
              }
              $parent = $parent.$parent;
            }
          }
          warn(
            "Avoid mutating a prop directly since the value will be " +
            "overwritten whenever the parent component re-renders. " +
            "Instead, use a data or computed property based on the prop's " +
            "value. Prop being mutated: \"" + key + "\"",
            vm
          );
        }
      });
    } else {}
    // static props are already proxied on the component's prototype
    // during Vue.extend(). We only need to proxy props defined at
    // instantiation here.
    if (!(key in vm)) {
      proxy(vm, "_props", key);
    }
  };

  for (var key in propsOptions) loop( key );
  toggleObserving(true);
}

function initData (vm) {
  var data = vm.$options.data;
  data = vm._data = typeof data === 'function'
    ? getData(data, vm)
    : data || {};
  if (!isPlainObject(data)) {
    data = {};
     true && warn(
      'data functions should return an object:\n' +
      'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
      vm
    );
  }
  // proxy data on instance
  var keys = Object.keys(data);
  var props = vm.$options.props;
  var methods = vm.$options.methods;
  var i = keys.length;
  while (i--) {
    var key = keys[i];
    if (true) {
      if (methods && hasOwn(methods, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a data property."),
          vm
        );
      }
    }
    if (props && hasOwn(props, key)) {
       true && warn(
        "The data property \"" + key + "\" is already declared as a prop. " +
        "Use prop default value instead.",
        vm
      );
    } else if (!isReserved(key)) {
      proxy(vm, "_data", key);
    }
  }
  // observe data
  observe(data, true /* asRootData */);
}

function getData (data, vm) {
  // #7573 disable dep collection when invoking data getters
  pushTarget();
  try {
    return data.call(vm, vm)
  } catch (e) {
    handleError(e, vm, "data()");
    return {}
  } finally {
    popTarget();
  }
}

var computedWatcherOptions = { lazy: true };

function initComputed (vm, computed) {
  // $flow-disable-line
  var watchers = vm._computedWatchers = Object.create(null);
  // computed properties are just getters during SSR
  var isSSR = isServerRendering();

  for (var key in computed) {
    var userDef = computed[key];
    var getter = typeof userDef === 'function' ? userDef : userDef.get;
    if ( true && getter == null) {
      warn(
        ("Getter is missing for computed property \"" + key + "\"."),
        vm
      );
    }

    if (!isSSR) {
      // create internal watcher for the computed property.
      watchers[key] = new Watcher(
        vm,
        getter || noop,
        noop,
        computedWatcherOptions
      );
    }

    // component-defined computed properties are already defined on the
    // component prototype. We only need to define computed properties defined
    // at instantiation here.
    if (!(key in vm)) {
      defineComputed(vm, key, userDef);
    } else if (true) {
      if (key in vm.$data) {
        warn(("The computed property \"" + key + "\" is already defined in data."), vm);
      } else if (vm.$options.props && key in vm.$options.props) {
        warn(("The computed property \"" + key + "\" is already defined as a prop."), vm);
      }
    }
  }
}

function defineComputed (
  target,
  key,
  userDef
) {
  var shouldCache = !isServerRendering();
  if (typeof userDef === 'function') {
    sharedPropertyDefinition.get = shouldCache
      ? createComputedGetter(key)
      : createGetterInvoker(userDef);
    sharedPropertyDefinition.set = noop;
  } else {
    sharedPropertyDefinition.get = userDef.get
      ? shouldCache && userDef.cache !== false
        ? createComputedGetter(key)
        : createGetterInvoker(userDef.get)
      : noop;
    sharedPropertyDefinition.set = userDef.set || noop;
  }
  if ( true &&
      sharedPropertyDefinition.set === noop) {
    sharedPropertyDefinition.set = function () {
      warn(
        ("Computed property \"" + key + "\" was assigned to but it has no setter."),
        this
      );
    };
  }
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function createComputedGetter (key) {
  return function computedGetter () {
    var watcher = this._computedWatchers && this._computedWatchers[key];
    if (watcher) {
      if (watcher.dirty) {
        watcher.evaluate();
      }
      if (Dep.SharedObject.target) {// fixed by xxxxxx
        watcher.depend();
      }
      return watcher.value
    }
  }
}

function createGetterInvoker(fn) {
  return function computedGetter () {
    return fn.call(this, this)
  }
}

function initMethods (vm, methods) {
  var props = vm.$options.props;
  for (var key in methods) {
    if (true) {
      if (typeof methods[key] !== 'function') {
        warn(
          "Method \"" + key + "\" has type \"" + (typeof methods[key]) + "\" in the component definition. " +
          "Did you reference the function correctly?",
          vm
        );
      }
      if (props && hasOwn(props, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a prop."),
          vm
        );
      }
      if ((key in vm) && isReserved(key)) {
        warn(
          "Method \"" + key + "\" conflicts with an existing Vue instance method. " +
          "Avoid defining component methods that start with _ or $."
        );
      }
    }
    vm[key] = typeof methods[key] !== 'function' ? noop : bind(methods[key], vm);
  }
}

function initWatch (vm, watch) {
  for (var key in watch) {
    var handler = watch[key];
    if (Array.isArray(handler)) {
      for (var i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i]);
      }
    } else {
      createWatcher(vm, key, handler);
    }
  }
}

function createWatcher (
  vm,
  expOrFn,
  handler,
  options
) {
  if (isPlainObject(handler)) {
    options = handler;
    handler = handler.handler;
  }
  if (typeof handler === 'string') {
    handler = vm[handler];
  }
  return vm.$watch(expOrFn, handler, options)
}

function stateMixin (Vue) {
  // flow somehow has problems with directly declared definition object
  // when using Object.defineProperty, so we have to procedurally build up
  // the object here.
  var dataDef = {};
  dataDef.get = function () { return this._data };
  var propsDef = {};
  propsDef.get = function () { return this._props };
  if (true) {
    dataDef.set = function () {
      warn(
        'Avoid replacing instance root $data. ' +
        'Use nested data properties instead.',
        this
      );
    };
    propsDef.set = function () {
      warn("$props is readonly.", this);
    };
  }
  Object.defineProperty(Vue.prototype, '$data', dataDef);
  Object.defineProperty(Vue.prototype, '$props', propsDef);

  Vue.prototype.$set = set;
  Vue.prototype.$delete = del;

  Vue.prototype.$watch = function (
    expOrFn,
    cb,
    options
  ) {
    var vm = this;
    if (isPlainObject(cb)) {
      return createWatcher(vm, expOrFn, cb, options)
    }
    options = options || {};
    options.user = true;
    var watcher = new Watcher(vm, expOrFn, cb, options);
    if (options.immediate) {
      try {
        cb.call(vm, watcher.value);
      } catch (error) {
        handleError(error, vm, ("callback for immediate watcher \"" + (watcher.expression) + "\""));
      }
    }
    return function unwatchFn () {
      watcher.teardown();
    }
  };
}

/*  */

var uid$3 = 0;

function initMixin (Vue) {
  Vue.prototype._init = function (options) {
    var vm = this;
    // a uid
    vm._uid = uid$3++;

    var startTag, endTag;
    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      startTag = "vue-perf-start:" + (vm._uid);
      endTag = "vue-perf-end:" + (vm._uid);
      mark(startTag);
    }

    // a flag to avoid this being observed
    vm._isVue = true;
    // merge options
    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options);
    } else {
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      );
    }
    /* istanbul ignore else */
    if (true) {
      initProxy(vm);
    } else {}
    // expose real self
    vm._self = vm;
    initLifecycle(vm);
    initEvents(vm);
    initRender(vm);
    callHook(vm, 'beforeCreate');
    !vm._$fallback && initInjections(vm); // resolve injections before data/props  
    initState(vm);
    !vm._$fallback && initProvide(vm); // resolve provide after data/props
    !vm._$fallback && callHook(vm, 'created');      

    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      vm._name = formatComponentName(vm, false);
      mark(endTag);
      measure(("vue " + (vm._name) + " init"), startTag, endTag);
    }

    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };
}

function initInternalComponent (vm, options) {
  var opts = vm.$options = Object.create(vm.constructor.options);
  // doing this because it's faster than dynamic enumeration.
  var parentVnode = options._parentVnode;
  opts.parent = options.parent;
  opts._parentVnode = parentVnode;

  var vnodeComponentOptions = parentVnode.componentOptions;
  opts.propsData = vnodeComponentOptions.propsData;
  opts._parentListeners = vnodeComponentOptions.listeners;
  opts._renderChildren = vnodeComponentOptions.children;
  opts._componentTag = vnodeComponentOptions.tag;

  if (options.render) {
    opts.render = options.render;
    opts.staticRenderFns = options.staticRenderFns;
  }
}

function resolveConstructorOptions (Ctor) {
  var options = Ctor.options;
  if (Ctor.super) {
    var superOptions = resolveConstructorOptions(Ctor.super);
    var cachedSuperOptions = Ctor.superOptions;
    if (superOptions !== cachedSuperOptions) {
      // super option changed,
      // need to resolve new options.
      Ctor.superOptions = superOptions;
      // check if there are any late-modified/attached options (#4976)
      var modifiedOptions = resolveModifiedOptions(Ctor);
      // update base extend options
      if (modifiedOptions) {
        extend(Ctor.extendOptions, modifiedOptions);
      }
      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);
      if (options.name) {
        options.components[options.name] = Ctor;
      }
    }
  }
  return options
}

function resolveModifiedOptions (Ctor) {
  var modified;
  var latest = Ctor.options;
  var sealed = Ctor.sealedOptions;
  for (var key in latest) {
    if (latest[key] !== sealed[key]) {
      if (!modified) { modified = {}; }
      modified[key] = latest[key];
    }
  }
  return modified
}

function Vue (options) {
  if ( true &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword');
  }
  this._init(options);
}

initMixin(Vue);
stateMixin(Vue);
eventsMixin(Vue);
lifecycleMixin(Vue);
renderMixin(Vue);

/*  */

function initUse (Vue) {
  Vue.use = function (plugin) {
    var installedPlugins = (this._installedPlugins || (this._installedPlugins = []));
    if (installedPlugins.indexOf(plugin) > -1) {
      return this
    }

    // additional parameters
    var args = toArray(arguments, 1);
    args.unshift(this);
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args);
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args);
    }
    installedPlugins.push(plugin);
    return this
  };
}

/*  */

function initMixin$1 (Vue) {
  Vue.mixin = function (mixin) {
    this.options = mergeOptions(this.options, mixin);
    return this
  };
}

/*  */

function initExtend (Vue) {
  /**
   * Each instance constructor, including Vue, has a unique
   * cid. This enables us to create wrapped "child
   * constructors" for prototypal inheritance and cache them.
   */
  Vue.cid = 0;
  var cid = 1;

  /**
   * Class inheritance
   */
  Vue.extend = function (extendOptions) {
    extendOptions = extendOptions || {};
    var Super = this;
    var SuperId = Super.cid;
    var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
    if (cachedCtors[SuperId]) {
      return cachedCtors[SuperId]
    }

    var name = extendOptions.name || Super.options.name;
    if ( true && name) {
      validateComponentName(name);
    }

    var Sub = function VueComponent (options) {
      this._init(options);
    };
    Sub.prototype = Object.create(Super.prototype);
    Sub.prototype.constructor = Sub;
    Sub.cid = cid++;
    Sub.options = mergeOptions(
      Super.options,
      extendOptions
    );
    Sub['super'] = Super;

    // For props and computed properties, we define the proxy getters on
    // the Vue instances at extension time, on the extended prototype. This
    // avoids Object.defineProperty calls for each instance created.
    if (Sub.options.props) {
      initProps$1(Sub);
    }
    if (Sub.options.computed) {
      initComputed$1(Sub);
    }

    // allow further extension/mixin/plugin usage
    Sub.extend = Super.extend;
    Sub.mixin = Super.mixin;
    Sub.use = Super.use;

    // create asset registers, so extended classes
    // can have their private assets too.
    ASSET_TYPES.forEach(function (type) {
      Sub[type] = Super[type];
    });
    // enable recursive self-lookup
    if (name) {
      Sub.options.components[name] = Sub;
    }

    // keep a reference to the super options at extension time.
    // later at instantiation we can check if Super's options have
    // been updated.
    Sub.superOptions = Super.options;
    Sub.extendOptions = extendOptions;
    Sub.sealedOptions = extend({}, Sub.options);

    // cache constructor
    cachedCtors[SuperId] = Sub;
    return Sub
  };
}

function initProps$1 (Comp) {
  var props = Comp.options.props;
  for (var key in props) {
    proxy(Comp.prototype, "_props", key);
  }
}

function initComputed$1 (Comp) {
  var computed = Comp.options.computed;
  for (var key in computed) {
    defineComputed(Comp.prototype, key, computed[key]);
  }
}

/*  */

function initAssetRegisters (Vue) {
  /**
   * Create asset registration methods.
   */
  ASSET_TYPES.forEach(function (type) {
    Vue[type] = function (
      id,
      definition
    ) {
      if (!definition) {
        return this.options[type + 's'][id]
      } else {
        /* istanbul ignore if */
        if ( true && type === 'component') {
          validateComponentName(id);
        }
        if (type === 'component' && isPlainObject(definition)) {
          definition.name = definition.name || id;
          definition = this.options._base.extend(definition);
        }
        if (type === 'directive' && typeof definition === 'function') {
          definition = { bind: definition, update: definition };
        }
        this.options[type + 's'][id] = definition;
        return definition
      }
    };
  });
}

/*  */



function getComponentName (opts) {
  return opts && (opts.Ctor.options.name || opts.tag)
}

function matches (pattern, name) {
  if (Array.isArray(pattern)) {
    return pattern.indexOf(name) > -1
  } else if (typeof pattern === 'string') {
    return pattern.split(',').indexOf(name) > -1
  } else if (isRegExp(pattern)) {
    return pattern.test(name)
  }
  /* istanbul ignore next */
  return false
}

function pruneCache (keepAliveInstance, filter) {
  var cache = keepAliveInstance.cache;
  var keys = keepAliveInstance.keys;
  var _vnode = keepAliveInstance._vnode;
  for (var key in cache) {
    var cachedNode = cache[key];
    if (cachedNode) {
      var name = getComponentName(cachedNode.componentOptions);
      if (name && !filter(name)) {
        pruneCacheEntry(cache, key, keys, _vnode);
      }
    }
  }
}

function pruneCacheEntry (
  cache,
  key,
  keys,
  current
) {
  var cached$$1 = cache[key];
  if (cached$$1 && (!current || cached$$1.tag !== current.tag)) {
    cached$$1.componentInstance.$destroy();
  }
  cache[key] = null;
  remove(keys, key);
}

var patternTypes = [String, RegExp, Array];

var KeepAlive = {
  name: 'keep-alive',
  abstract: true,

  props: {
    include: patternTypes,
    exclude: patternTypes,
    max: [String, Number]
  },

  created: function created () {
    this.cache = Object.create(null);
    this.keys = [];
  },

  destroyed: function destroyed () {
    for (var key in this.cache) {
      pruneCacheEntry(this.cache, key, this.keys);
    }
  },

  mounted: function mounted () {
    var this$1 = this;

    this.$watch('include', function (val) {
      pruneCache(this$1, function (name) { return matches(val, name); });
    });
    this.$watch('exclude', function (val) {
      pruneCache(this$1, function (name) { return !matches(val, name); });
    });
  },

  render: function render () {
    var slot = this.$slots.default;
    var vnode = getFirstComponentChild(slot);
    var componentOptions = vnode && vnode.componentOptions;
    if (componentOptions) {
      // check pattern
      var name = getComponentName(componentOptions);
      var ref = this;
      var include = ref.include;
      var exclude = ref.exclude;
      if (
        // not included
        (include && (!name || !matches(include, name))) ||
        // excluded
        (exclude && name && matches(exclude, name))
      ) {
        return vnode
      }

      var ref$1 = this;
      var cache = ref$1.cache;
      var keys = ref$1.keys;
      var key = vnode.key == null
        // same constructor may get registered as different local components
        // so cid alone is not enough (#3269)
        ? componentOptions.Ctor.cid + (componentOptions.tag ? ("::" + (componentOptions.tag)) : '')
        : vnode.key;
      if (cache[key]) {
        vnode.componentInstance = cache[key].componentInstance;
        // make current key freshest
        remove(keys, key);
        keys.push(key);
      } else {
        cache[key] = vnode;
        keys.push(key);
        // prune oldest entry
        if (this.max && keys.length > parseInt(this.max)) {
          pruneCacheEntry(cache, keys[0], keys, this._vnode);
        }
      }

      vnode.data.keepAlive = true;
    }
    return vnode || (slot && slot[0])
  }
};

var builtInComponents = {
  KeepAlive: KeepAlive
};

/*  */

function initGlobalAPI (Vue) {
  // config
  var configDef = {};
  configDef.get = function () { return config; };
  if (true) {
    configDef.set = function () {
      warn(
        'Do not replace the Vue.config object, set individual fields instead.'
      );
    };
  }
  Object.defineProperty(Vue, 'config', configDef);

  // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.
  Vue.util = {
    warn: warn,
    extend: extend,
    mergeOptions: mergeOptions,
    defineReactive: defineReactive$$1
  };

  Vue.set = set;
  Vue.delete = del;
  Vue.nextTick = nextTick;

  // 2.6 explicit observable API
  Vue.observable = function (obj) {
    observe(obj);
    return obj
  };

  Vue.options = Object.create(null);
  ASSET_TYPES.forEach(function (type) {
    Vue.options[type + 's'] = Object.create(null);
  });

  // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.
  Vue.options._base = Vue;

  extend(Vue.options.components, builtInComponents);

  initUse(Vue);
  initMixin$1(Vue);
  initExtend(Vue);
  initAssetRegisters(Vue);
}

initGlobalAPI(Vue);

Object.defineProperty(Vue.prototype, '$isServer', {
  get: isServerRendering
});

Object.defineProperty(Vue.prototype, '$ssrContext', {
  get: function get () {
    /* istanbul ignore next */
    return this.$vnode && this.$vnode.ssrContext
  }
});

// expose FunctionalRenderContext for ssr runtime helper installation
Object.defineProperty(Vue, 'FunctionalRenderContext', {
  value: FunctionalRenderContext
});

Vue.version = '2.6.11';

/**
 * https://raw.githubusercontent.com/Tencent/westore/master/packages/westore/utils/diff.js
 */
var ARRAYTYPE = '[object Array]';
var OBJECTTYPE = '[object Object]';
// const FUNCTIONTYPE = '[object Function]'

function diff(current, pre) {
    var result = {};
    syncKeys(current, pre);
    _diff(current, pre, '', result);
    return result
}

function syncKeys(current, pre) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE && rootPreType == OBJECTTYPE) {
        if(Object.keys(current).length >= Object.keys(pre).length){
            for (var key in pre) {
                var currentValue = current[key];
                if (currentValue === undefined) {
                    current[key] = null;
                } else {
                    syncKeys(currentValue, pre[key]);
                }
            }
        }
    } else if (rootCurrentType == ARRAYTYPE && rootPreType == ARRAYTYPE) {
        if (current.length >= pre.length) {
            pre.forEach(function (item, index) {
                syncKeys(current[index], item);
            });
        }
    }
}

function _diff(current, pre, path, result) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE) {
        if (rootPreType != OBJECTTYPE || Object.keys(current).length < Object.keys(pre).length) {
            setResult(result, path, current);
        } else {
            var loop = function ( key ) {
                var currentValue = current[key];
                var preValue = pre[key];
                var currentType = type(currentValue);
                var preType = type(preValue);
                if (currentType != ARRAYTYPE && currentType != OBJECTTYPE) {
                    if (currentValue != pre[key]) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    }
                } else if (currentType == ARRAYTYPE) {
                    if (preType != ARRAYTYPE) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        if (currentValue.length < preValue.length) {
                            setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                        } else {
                            currentValue.forEach(function (item, index) {
                                _diff(item, preValue[index], (path == '' ? '' : path + ".") + key + '[' + index + ']', result);
                            });
                        }
                    }
                } else if (currentType == OBJECTTYPE) {
                    if (preType != OBJECTTYPE || Object.keys(currentValue).length < Object.keys(preValue).length) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        for (var subKey in currentValue) {
                            _diff(currentValue[subKey], preValue[subKey], (path == '' ? '' : path + ".") + key + '.' + subKey, result);
                        }
                    }
                }
            };

            for (var key in current) loop( key );
        }
    } else if (rootCurrentType == ARRAYTYPE) {
        if (rootPreType != ARRAYTYPE) {
            setResult(result, path, current);
        } else {
            if (current.length < pre.length) {
                setResult(result, path, current);
            } else {
                current.forEach(function (item, index) {
                    _diff(item, pre[index], path + '[' + index + ']', result);
                });
            }
        }
    } else {
        setResult(result, path, current);
    }
}

function setResult(result, k, v) {
    // if (type(v) != FUNCTIONTYPE) {
        result[k] = v;
    // }
}

function type(obj) {
    return Object.prototype.toString.call(obj)
}

/*  */

function flushCallbacks$1(vm) {
    if (vm.__next_tick_callbacks && vm.__next_tick_callbacks.length) {
        if (Object({"NODE_ENV":"development","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG) {
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:flushCallbacks[' + vm.__next_tick_callbacks.length + ']');
        }
        var copies = vm.__next_tick_callbacks.slice(0);
        vm.__next_tick_callbacks.length = 0;
        for (var i = 0; i < copies.length; i++) {
            copies[i]();
        }
    }
}

function hasRenderWatcher(vm) {
    return queue.find(function (watcher) { return vm._watcher === watcher; })
}

function nextTick$1(vm, cb) {
    //1.nextTick 之前 已 setData 且 setData 还未回调完成
    //2.nextTick 之前存在 render watcher
    if (!vm.__next_tick_pending && !hasRenderWatcher(vm)) {
        if(Object({"NODE_ENV":"development","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:nextVueTick');
        }
        return nextTick(cb, vm)
    }else{
        if(Object({"NODE_ENV":"development","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance$1 = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance$1.is || mpInstance$1.route) + '][' + vm._uid +
                ']:nextMPTick');
        }
    }
    var _resolve;
    if (!vm.__next_tick_callbacks) {
        vm.__next_tick_callbacks = [];
    }
    vm.__next_tick_callbacks.push(function () {
        if (cb) {
            try {
                cb.call(vm);
            } catch (e) {
                handleError(e, vm, 'nextTick');
            }
        } else if (_resolve) {
            _resolve(vm);
        }
    });
    // $flow-disable-line
    if (!cb && typeof Promise !== 'undefined') {
        return new Promise(function (resolve) {
            _resolve = resolve;
        })
    }
}

/*  */

function cloneWithData(vm) {
  // 确保当前 vm 所有数据被同步
  var ret = Object.create(null);
  var dataKeys = [].concat(
    Object.keys(vm._data || {}),
    Object.keys(vm._computedWatchers || {}));

  dataKeys.reduce(function(ret, key) {
    ret[key] = vm[key];
    return ret
  }, ret);
  //TODO 需要把无用数据处理掉，比如 list=>l0 则 list 需要移除，否则多传输一份数据
  Object.assign(ret, vm.$mp.data || {});
  if (
    Array.isArray(vm.$options.behaviors) &&
    vm.$options.behaviors.indexOf('uni://form-field') !== -1
  ) { //form-field
    ret['name'] = vm.name;
    ret['value'] = vm.value;
  }

  return JSON.parse(JSON.stringify(ret))
}

var patch = function(oldVnode, vnode) {
  var this$1 = this;

  if (vnode === null) { //destroy
    return
  }
  if (this.mpType === 'page' || this.mpType === 'component') {
    var mpInstance = this.$scope;
    var data = Object.create(null);
    try {
      data = cloneWithData(this);
    } catch (err) {
      console.error(err);
    }
    data.__webviewId__ = mpInstance.data.__webviewId__;
    var mpData = Object.create(null);
    Object.keys(data).forEach(function (key) { //仅同步 data 中有的数据
      mpData[key] = mpInstance.data[key];
    });
    var diffData = this.$shouldDiffData === false ? data : diff(data, mpData);
    if (Object.keys(diffData).length) {
      if (Object({"NODE_ENV":"development","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + this._uid +
          ']差量更新',
          JSON.stringify(diffData));
      }
      this.__next_tick_pending = true;
      mpInstance.setData(diffData, function () {
        this$1.__next_tick_pending = false;
        flushCallbacks$1(this$1);
      });
    } else {
      flushCallbacks$1(this);
    }
  }
};

/*  */

function createEmptyRender() {

}

function mountComponent$1(
  vm,
  el,
  hydrating
) {
  if (!vm.mpType) {//main.js 中的 new Vue
    return vm
  }
  if (vm.mpType === 'app') {
    vm.$options.render = createEmptyRender;
  }
  if (!vm.$options.render) {
    vm.$options.render = createEmptyRender;
    if (true) {
      /* istanbul ignore if */
      if ((vm.$options.template && vm.$options.template.charAt(0) !== '#') ||
        vm.$options.el || el) {
        warn(
          'You are using the runtime-only build of Vue where the template ' +
          'compiler is not available. Either pre-compile the templates into ' +
          'render functions, or use the compiler-included build.',
          vm
        );
      } else {
        warn(
          'Failed to mount component: template or render function not defined.',
          vm
        );
      }
    }
  }
  
  !vm._$fallback && callHook(vm, 'beforeMount');

  var updateComponent = function () {
    vm._update(vm._render(), hydrating);
  };

  // we set this to vm._watcher inside the watcher's constructor
  // since the watcher's initial patch may call $forceUpdate (e.g. inside child
  // component's mounted hook), which relies on vm._watcher being already defined
  new Watcher(vm, updateComponent, noop, {
    before: function before() {
      if (vm._isMounted && !vm._isDestroyed) {
        callHook(vm, 'beforeUpdate');
      }
    }
  }, true /* isRenderWatcher */);
  hydrating = false;
  return vm
}

/*  */

function renderClass (
  staticClass,
  dynamicClass
) {
  if (isDef(staticClass) || isDef(dynamicClass)) {
    return concat(staticClass, stringifyClass(dynamicClass))
  }
  /* istanbul ignore next */
  return ''
}

function concat (a, b) {
  return a ? b ? (a + ' ' + b) : a : (b || '')
}

function stringifyClass (value) {
  if (Array.isArray(value)) {
    return stringifyArray(value)
  }
  if (isObject(value)) {
    return stringifyObject(value)
  }
  if (typeof value === 'string') {
    return value
  }
  /* istanbul ignore next */
  return ''
}

function stringifyArray (value) {
  var res = '';
  var stringified;
  for (var i = 0, l = value.length; i < l; i++) {
    if (isDef(stringified = stringifyClass(value[i])) && stringified !== '') {
      if (res) { res += ' '; }
      res += stringified;
    }
  }
  return res
}

function stringifyObject (value) {
  var res = '';
  for (var key in value) {
    if (value[key]) {
      if (res) { res += ' '; }
      res += key;
    }
  }
  return res
}

/*  */

var parseStyleText = cached(function (cssText) {
  var res = {};
  var listDelimiter = /;(?![^(]*\))/g;
  var propertyDelimiter = /:(.+)/;
  cssText.split(listDelimiter).forEach(function (item) {
    if (item) {
      var tmp = item.split(propertyDelimiter);
      tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return res
});

// normalize possible array / string values into Object
function normalizeStyleBinding (bindingStyle) {
  if (Array.isArray(bindingStyle)) {
    return toObject(bindingStyle)
  }
  if (typeof bindingStyle === 'string') {
    return parseStyleText(bindingStyle)
  }
  return bindingStyle
}

/*  */

var MP_METHODS = ['createSelectorQuery', 'createIntersectionObserver', 'selectAllComponents', 'selectComponent'];

function getTarget(obj, path) {
  var parts = path.split('.');
  var key = parts[0];
  if (key.indexOf('__$n') === 0) { //number index
    key = parseInt(key.replace('__$n', ''));
  }
  if (parts.length === 1) {
    return obj[key]
  }
  return getTarget(obj[key], parts.slice(1).join('.'))
}

function internalMixin(Vue) {

  Vue.config.errorHandler = function(err) {
    console.error(err);
    /* eslint-disable no-undef */
    var app = getApp();
    if (app && app.onError) {
      app.onError(err);
    }
  };

  var oldEmit = Vue.prototype.$emit;

  Vue.prototype.$emit = function(event) {
    if (this.$scope && event) {
      this.$scope['triggerEvent'](event, {
        __args__: toArray(arguments, 1)
      });
    }
    return oldEmit.apply(this, arguments)
  };

  Vue.prototype.$nextTick = function(fn) {
    return nextTick$1(this, fn)
  };

  MP_METHODS.forEach(function (method) {
    Vue.prototype[method] = function(args) {
      if (this.$scope && this.$scope[method]) {
        return this.$scope[method](args)
      }
      // mp-alipay
      if (typeof my === 'undefined') {
        return
      }
      if (method === 'createSelectorQuery') {
        /* eslint-disable no-undef */
        return my.createSelectorQuery(args)
      } else if (method === 'createIntersectionObserver') {
        /* eslint-disable no-undef */
        return my.createIntersectionObserver(args)
      }
      // TODO mp-alipay 暂不支持 selectAllComponents,selectComponent
    };
  });

  Vue.prototype.__init_provide = initProvide;

  Vue.prototype.__init_injections = initInjections;

  Vue.prototype.__call_hook = function(hook, args) {
    var vm = this;
    // #7573 disable dep collection when invoking lifecycle hooks
    pushTarget();
    var handlers = vm.$options[hook];
    var info = hook + " hook";
    var ret;
    if (handlers) {
      for (var i = 0, j = handlers.length; i < j; i++) {
        ret = invokeWithErrorHandling(handlers[i], vm, args ? [args] : null, vm, info);
      }
    }
    if (vm._hasHookEvent) {
      vm.$emit('hook:' + hook, args);
    }
    popTarget();
    return ret
  };

  Vue.prototype.__set_model = function(target, key, value, modifiers) {
    if (Array.isArray(modifiers)) {
      if (modifiers.indexOf('trim') !== -1) {
        value = value.trim();
      }
      if (modifiers.indexOf('number') !== -1) {
        value = this._n(value);
      }
    }
    if (!target) {
      target = this;
    }
    target[key] = value;
  };

  Vue.prototype.__set_sync = function(target, key, value) {
    if (!target) {
      target = this;
    }
    target[key] = value;
  };

  Vue.prototype.__get_orig = function(item) {
    if (isPlainObject(item)) {
      return item['$orig'] || item
    }
    return item
  };

  Vue.prototype.__get_value = function(dataPath, target) {
    return getTarget(target || this, dataPath)
  };


  Vue.prototype.__get_class = function(dynamicClass, staticClass) {
    return renderClass(staticClass, dynamicClass)
  };

  Vue.prototype.__get_style = function(dynamicStyle, staticStyle) {
    if (!dynamicStyle && !staticStyle) {
      return ''
    }
    var dynamicStyleObj = normalizeStyleBinding(dynamicStyle);
    var styleObj = staticStyle ? extend(staticStyle, dynamicStyleObj) : dynamicStyleObj;
    return Object.keys(styleObj).map(function (name) { return ((hyphenate(name)) + ":" + (styleObj[name])); }).join(';')
  };

  Vue.prototype.__map = function(val, iteratee) {
    //TODO 暂不考虑 string,number
    var ret, i, l, keys, key;
    if (Array.isArray(val)) {
      ret = new Array(val.length);
      for (i = 0, l = val.length; i < l; i++) {
        ret[i] = iteratee(val[i], i);
      }
      return ret
    } else if (isObject(val)) {
      keys = Object.keys(val);
      ret = Object.create(null);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[key] = iteratee(val[key], key, i);
      }
      return ret
    }
    return []
  };

}

/*  */

var LIFECYCLE_HOOKS$1 = [
    //App
    'onLaunch',
    'onShow',
    'onHide',
    'onUniNViewMessage',
    'onError',
    //Page
    'onLoad',
    // 'onShow',
    'onReady',
    // 'onHide',
    'onUnload',
    'onPullDownRefresh',
    'onReachBottom',
    'onTabItemTap',
    'onShareAppMessage',
    'onResize',
    'onPageScroll',
    'onNavigationBarButtonTap',
    'onBackPress',
    'onNavigationBarSearchInputChanged',
    'onNavigationBarSearchInputConfirmed',
    'onNavigationBarSearchInputClicked',
    //Component
    // 'onReady', // 兼容旧版本，应该移除该事件
    'onPageShow',
    'onPageHide',
    'onPageResize'
];
function lifecycleMixin$1(Vue) {

    //fixed vue-class-component
    var oldExtend = Vue.extend;
    Vue.extend = function(extendOptions) {
        extendOptions = extendOptions || {};

        var methods = extendOptions.methods;
        if (methods) {
            Object.keys(methods).forEach(function (methodName) {
                if (LIFECYCLE_HOOKS$1.indexOf(methodName)!==-1) {
                    extendOptions[methodName] = methods[methodName];
                    delete methods[methodName];
                }
            });
        }

        return oldExtend.call(this, extendOptions)
    };

    var strategies = Vue.config.optionMergeStrategies;
    var mergeHook = strategies.created;
    LIFECYCLE_HOOKS$1.forEach(function (hook) {
        strategies[hook] = mergeHook;
    });

    Vue.prototype.__lifecycle_hooks__ = LIFECYCLE_HOOKS$1;
}

/*  */

// install platform patch function
Vue.prototype.__patch__ = patch;

// public mount method
Vue.prototype.$mount = function(
    el ,
    hydrating 
) {
    return mountComponent$1(this, el, hydrating)
};

lifecycleMixin$1(Vue);
internalMixin(Vue);

/*  */

/* harmony default export */ __webpack_exports__["default"] = (Vue);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../webpack/buildin/global.js */ 3)))

/***/ }),

/***/ 3:
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ 4:
/*!****************************************************!*\
  !*** D:/WQ_workplace/宝鸡/baoji-platform/pages.json ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ 58:
/*!***********************************************************************!*\
  !*** D:/WQ_workplace/宝鸡/baoji-platform/components/uni-icons/icons.js ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _default = {
  "pulldown": "\uE588",
  "refreshempty": "\uE461",
  "back": "\uE471",
  "forward": "\uE470",
  "more": "\uE507",
  "more-filled": "\uE537",
  "scan": "\uE612",
  "qq": "\uE264",
  "weibo": "\uE260",
  "weixin": "\uE261",
  "pengyouquan": "\uE262",
  "loop": "\uE565",
  "refresh": "\uE407",
  "refresh-filled": "\uE437",
  "arrowthindown": "\uE585",
  "arrowthinleft": "\uE586",
  "arrowthinright": "\uE587",
  "arrowthinup": "\uE584",
  "undo-filled": "\uE7D6",
  "undo": "\uE406",
  "redo": "\uE405",
  "redo-filled": "\uE7D9",
  "bars": "\uE563",
  "chatboxes": "\uE203",
  "camera": "\uE301",
  "chatboxes-filled": "\uE233",
  "camera-filled": "\uE7EF",
  "cart-filled": "\uE7F4",
  "cart": "\uE7F5",
  "checkbox-filled": "\uE442",
  "checkbox": "\uE7FA",
  "arrowleft": "\uE582",
  "arrowdown": "\uE581",
  "arrowright": "\uE583",
  "smallcircle-filled": "\uE801",
  "arrowup": "\uE580",
  "circle": "\uE411",
  "eye-filled": "\uE568",
  "eye-slash-filled": "\uE822",
  "eye-slash": "\uE823",
  "eye": "\uE824",
  "flag-filled": "\uE825",
  "flag": "\uE508",
  "gear-filled": "\uE532",
  "reload": "\uE462",
  "gear": "\uE502",
  "hand-thumbsdown-filled": "\uE83B",
  "hand-thumbsdown": "\uE83C",
  "hand-thumbsup-filled": "\uE83D",
  "heart-filled": "\uE83E",
  "hand-thumbsup": "\uE83F",
  "heart": "\uE840",
  "home": "\uE500",
  "info": "\uE504",
  "home-filled": "\uE530",
  "info-filled": "\uE534",
  "circle-filled": "\uE441",
  "chat-filled": "\uE847",
  "chat": "\uE263",
  "mail-open-filled": "\uE84D",
  "email-filled": "\uE231",
  "mail-open": "\uE84E",
  "email": "\uE201",
  "checkmarkempty": "\uE472",
  "list": "\uE562",
  "locked-filled": "\uE856",
  "locked": "\uE506",
  "map-filled": "\uE85C",
  "map-pin": "\uE85E",
  "map-pin-ellipse": "\uE864",
  "map": "\uE364",
  "minus-filled": "\uE440",
  "mic-filled": "\uE332",
  "minus": "\uE410",
  "micoff": "\uE360",
  "mic": "\uE302",
  "clear": "\uE434",
  "smallcircle": "\uE868",
  "close": "\uE404",
  "closeempty": "\uE460",
  "paperclip": "\uE567",
  "paperplane": "\uE503",
  "paperplane-filled": "\uE86E",
  "person-filled": "\uE131",
  "contact-filled": "\uE130",
  "person": "\uE101",
  "contact": "\uE100",
  "images-filled": "\uE87A",
  "phone": "\uE200",
  "images": "\uE87B",
  "image": "\uE363",
  "image-filled": "\uE877",
  "location-filled": "\uE333",
  "location": "\uE303",
  "plus-filled": "\uE439",
  "plus": "\uE409",
  "plusempty": "\uE468",
  "help-filled": "\uE535",
  "help": "\uE505",
  "navigate-filled": "\uE884",
  "navigate": "\uE501",
  "mic-slash-filled": "\uE892",
  "search": "\uE466",
  "settings": "\uE560",
  "sound": "\uE590",
  "sound-filled": "\uE8A1",
  "spinner-cycle": "\uE465",
  "download-filled": "\uE8A4",
  "personadd-filled": "\uE132",
  "videocam-filled": "\uE8AF",
  "personadd": "\uE102",
  "upload": "\uE402",
  "upload-filled": "\uE8B1",
  "starhalf": "\uE463",
  "star-filled": "\uE438",
  "star": "\uE408",
  "trash": "\uE401",
  "phone-filled": "\uE230",
  "compose": "\uE400",
  "videocam": "\uE300",
  "trash-filled": "\uE8DC",
  "download": "\uE403",
  "chatbubble-filled": "\uE232",
  "chatbubble": "\uE202",
  "cloud-download": "\uE8E4",
  "cloud-upload-filled": "\uE8E5",
  "cloud-upload": "\uE8E6",
  "cloud-download-filled": "\uE8E9",
  "headphones": "\uE8BF",
  "shop": "\uE609" };exports.default = _default;

/***/ }),

/***/ 74:
/*!*************************************************************!*\
  !*** D:/WQ_workplace/宝鸡/baoji-platform/pages/index/data.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var s = "107.794618,33.984886;107.792634,33.984268;107.790433,33.984101;107.788925,33.983834;107.787746,33.983095;107.786446,33.982009;107.784444,33.980596;107.783412,33.979627;107.78245,33.978436;107.781757,33.977404;107.781132,33.975633;107.780361,33.973808;107.779251,33.971754;107.778289,33.970267;107.777526,33.96879;107.776832,33.967586;107.775236,33.965087;107.774274,33.963772;107.771238,33.961039;107.769721,33.959501;107.767509,33.955908;107.767376,33.954496;107.767541,33.95438;107.768605,33.954121;107.770379,33.954304;107.770628,33.954275;107.770901,33.954126;107.771031,33.953781;107.770964,33.953383;107.770705,33.9531;107.769923,33.952631;107.766741,33.951691;107.766103,33.951331;107.765279,33.950769;107.764039,33.950029;107.761019,33.948674;107.757991,33.947654;107.755509,33.94686;107.752836,33.945783;107.750839,33.94483;107.748296,33.943749;107.746021,33.942726;107.743954,33.941418;107.741609,33.940058;107.739621,33.939204;107.737753,33.938406;107.735833,33.937439;107.734452,33.936639;107.733349,33.936016;107.732723,33.935505;107.731829,33.93448;107.729891,33.932023;107.72817,33.931062;107.726102,33.930198;107.723008,33.929301;107.719914,33.929304;107.719888,33.929308;107.713742,33.927359;107.714915,33.921014;107.717609,33.910391;107.71421,33.900738;107.713409,33.886563;107.709991,33.871425;107.705538,33.859629;107.704373,33.857312;107.705686,33.856046;107.706164,33.855353;107.706573,33.854613;107.707459,33.853179;107.708007,33.851691;107.708337,33.850142;107.708398,33.848536;107.708598,33.847685;107.708598,33.846819;107.707424,33.845391;107.70605,33.844024;107.705215,33.842824;107.704798,33.84191;107.704589,33.841053;107.704859,33.839794;107.704989,33.838989;107.705189,33.83773;107.705389,33.836528;107.705389,33.835788;107.704902,33.833727;107.704275,33.83281;107.703588,33.83224;107.702345,33.831618;107.700423,33.830761;107.699092,33.830255;107.697404,33.817941;107.689514,33.810201;107.67944,33.808283;107.681076,33.802135;107.685938,33.797026;107.685424,33.790328;107.678273,33.785157;107.678447,33.784904;107.678717,33.784275;107.678786,33.783932;107.678856,33.783363;107.67829,33.781645;107.677116,33.779358;107.675663,33.777015;107.673801,33.775016;107.671591,33.773078;107.669808,33.772159;107.668155,33.771253;107.66685,33.770395;107.665336,33.769648;107.66444,33.769307;107.664231,33.769025;107.663892,33.768622;107.663822,33.768219;107.663753,33.767587;107.664014,33.766674;107.664422,33.765873;107.664701,33.765075;107.665179,33.764561;107.66531,33.76416;107.665414,33.76398;107.665797,33.760043;107.673347,33.754674;107.681064,33.750491;107.687918,33.744756;107.688144,33.739581;107.688875,33.735115;107.689292,33.734419;107.689083,33.732873;107.68984,33.730749;107.691162,33.729781;107.692945,33.729129;107.693919,33.728436;107.693928,33.726689;107.695302,33.724347;107.695641,33.724;107.695876,33.723659;107.692588,33.723184;107.689769,33.721879;107.688743,33.721307;107.687847,33.72045;107.687151,33.719482;107.684532,33.715077;107.683061,33.708948;107.682365,33.706837;107.681532,33.705546;107.681043,33.705109;107.678494,33.702165;107.675988,33.701053;107.673743,33.699486;107.670516,33.70147;107.667732,33.700134;107.664931,33.69811;107.659424,33.697961;107.65504,33.699171;107.650674,33.70061;107.647683,33.702261;107.643891,33.704611;107.640352,33.706498;107.638205,33.708822;107.636345,33.711831;107.63172,33.713733;107.628713,33.71447;107.62402,33.713851;107.620727,33.714131;107.613273,33.712871;107.609087,33.709954;107.601282,33.70503;107.597384,33.702801;107.592403,33.700819;107.586834,33.697702;107.582159,33.69732;107.579445,33.698738;107.573715,33.699526;107.570439,33.700726;107.567449,33.701694;107.562536,33.702699;107.558127,33.701856;107.55397,33.699869;107.552272,33.697149;107.549198,33.694678;107.546964,33.692654;107.544731,33.690399;107.537797,33.686628;107.535564,33.68506;107.530025,33.681951;107.525647,33.682031;107.521216,33.679591;107.517081,33.678289;107.513534,33.678812;107.510523,33.678871;107.501267,33.680872;107.497158,33.680946;107.492477,33.679887;107.488887,33.677887;107.484439,33.674985;107.479178,33.672327;107.476122,33.670089;107.473032,33.666476;107.470496,33.663079;107.467708,33.660604;107.462175,33.657949;107.45555,33.655767;107.451418,33.654692;107.438471,33.651689;107.432705,33.651095;107.427744,33.650251;107.423618,33.649404;107.418125,33.649487;107.410148,33.648454;107.406032,33.648745;107.400326,33.651349;107.39792,33.654594;107.395254,33.658759;107.392569,33.661775;107.389901,33.665479;107.386121,33.668971;107.384539,33.672432;107.382113,33.674987;107.380271,33.678677;107.376497,33.682856;107.374036,33.683574;107.370496,33.685226;107.367765,33.685947;107.363372,33.686921;107.359526,33.687198;107.356219,33.687007;107.351538,33.686602;107.347978,33.687566;107.343861,33.688303;107.336167,33.689081;107.331519,33.690969;107.328804,33.69261;107.325801,33.694247;107.32198,33.695669;107.320352,33.697293;107.318203,33.699843;107.313878,33.703792;107.311989,33.705877;107.308917,33.705118;107.305863,33.708463;107.305625,33.710187;107.309613,33.723997;107.314168,33.728818;107.304309,33.733512;107.302073,33.742264;107.302531,33.758525;107.305514,33.766905;107.312947,33.771533;107.318746,33.77105;107.322137,33.774437;107.322524,33.783088;107.32613,33.787029;107.325792,33.793599;107.328281,33.797613;107.334332,33.799523;107.338185,33.802511;107.340354,33.808403;107.342043,33.814138;107.339884,33.81442;107.336811,33.814124;107.333868,33.814339;107.328952,33.819553;107.324595,33.820025;107.322577,33.818901;107.320463,33.812507;107.320473,33.810418;107.314641,33.808352;107.308723,33.80099;107.306157,33.796914;107.302261,33.794337;107.299492,33.792795;107.297411,33.794297;107.294327,33.796212;107.292001,33.797321;107.289438,33.797123;107.286104,33.797674;107.284067,33.7976;107.281233,33.799087;107.276742,33.801163;107.27464,33.798677;107.273228,33.793993;107.272813,33.790709;107.271708,33.790255;107.269996,33.789787;107.264917,33.7875;107.260045,33.784403;107.258059,33.782232;107.256143,33.780915;107.254768,33.780176;107.249631,33.778401;107.248326,33.777486;107.247639,33.776403;107.246479,33.775079;107.244426,33.773595;107.24113,33.772081;107.236697,33.77121;107.233699,33.768976;107.231168,33.766799;107.230198,33.76225;107.22997,33.757773;107.227419,33.755998;107.224922,33.755363;107.220271,33.75504;107.217175,33.753219;107.212579,33.749236;107.208758,33.749939;107.203437,33.750493;107.194518,33.752435;107.187359,33.751767;107.185293,33.753208;107.186527,33.754924;107.183778,33.760122;107.181606,33.769478;107.179163,33.772296;107.173329,33.774617;107.17054,33.779282;107.170062,33.779515;107.168752,33.780659;107.165392,33.785015;107.164638,33.785755;107.163679,33.787363;107.163163,33.78801;107.160399,33.788999;107.155619,33.786753;107.154002,33.784836;107.151816,33.785499;107.14845,33.790118;107.145241,33.794255;107.137354,33.786758;107.130143,33.779214;107.12838,33.777648;107.127956,33.780581;107.129101,33.789927;107.133873,33.793831;107.131862,33.800788;107.136964,33.814141;107.135176,33.816569;107.130874,33.816428;107.124951,33.814223;107.124282,33.810765;107.121567,33.809522;107.120346,33.809881;107.117463,33.810394;107.115127,33.811822;107.113205,33.812281;107.112106,33.812792;107.110251,33.814289;107.10874,33.815828;107.107564,33.818345;107.10674,33.821034;107.106191,33.822014;107.105771,33.822471;107.104534,33.82315;107.103374,33.823321;107.099388,33.823316;107.096784,33.822972;107.093079,33.822276;107.090879,33.821528;107.086554,33.82032;107.086461,33.82032;107.08485,33.8209;107.080467,33.822089;107.075317,33.827419;107.072063,33.830432;107.070184,33.833203;107.068296,33.836428;107.066407,33.838741;107.065093,33.842424;107.065146,33.845863;107.06438,33.849078;107.064441,33.852749;107.063971,33.858024;107.064085,33.864671;107.063571,33.866967;107.063075,33.870415;107.062004,33.872256;107.059297,33.875266;107.056841,33.876895;107.050205,33.876494;107.047975,33.875372;107.044908,33.873793;107.042661,33.871291;107.04036,33.865581;107.03975,33.862146;107.039419,33.859169;107.038521,33.854589;107.03873,33.850694;107.040516,33.841964;107.040751,33.83944;107.041247,33.835999;107.041169,33.830954;107.041935,33.827279;107.042423,33.823147;107.042631,33.819019;107.043398,33.8158;107.043328,33.811676;107.043833,33.808691;107.043223,33.805029;107.036784,33.799352;107.033428,33.797088;107.028146,33.794612;107.022881,33.793279;107.018993,33.792395;107.014032,33.792667;107.009891,33.7927;107.006578,33.792952;106.99942,33.794385;106.996412,33.796017;106.992279,33.796736;106.984041,33.799323;106.978271,33.800974;106.974715,33.803295;106.969242,33.806089;106.966776,33.807257;106.961845,33.81005;106.958004,33.811687;106.952264,33.814944;106.947598,33.816591;106.94214,33.820539;106.936944,33.823105;106.932585,33.826125;106.930718,33.827259;106.930236,33.828866;106.929136,33.831785;106.92844,33.833264;106.928096,33.833438;106.927132,33.833664;106.924871,33.833828;106.921981,33.835777;106.920949,33.836981;106.917985,33.839892;106.912829,33.84555;106.911454,33.846752;106.910217,33.847501;106.909667,33.847726;106.907674,33.847497;106.905681,33.846804;106.904863,33.84669;106.90342,33.846178;106.901634,33.845318;106.899924,33.844802;106.898894,33.844799;106.895416,33.845329;106.892831,33.847052;106.890049,33.848333;106.890103,33.849149;106.890919,33.851164;106.891238,33.851345;106.892432,33.85245;106.893719,33.853934;106.893209,33.856108;106.891186,33.856685;106.889531,33.858311;106.88873,33.859261;106.888742,33.860696;106.888673,33.861005;106.887396,33.860739;106.884527,33.860426;106.883291,33.860536;106.882124,33.860826;106.878067,33.862884;106.876283,33.864083;106.872852,33.865919;106.871137,33.867642;106.870442,33.868555;106.869345,33.870841;106.868796,33.871411;106.867698,33.87216;106.866251,33.873419;106.865633,33.874682;106.864673,33.875771;106.863026,33.876918;106.86186,33.877431;106.858774,33.877374;106.857265,33.876347;106.856587,33.875718;106.856038,33.875085;106.855558,33.874347;106.855421,33.873599;106.855223,33.87222;106.855497,33.871084;106.856046,33.869939;106.856258,33.868329;106.856259,33.867247;106.855714,33.864227;106.856673,33.862557;106.858128,33.861664;106.857802,33.860768;106.85556,33.858995;106.855326,33.856502;106.854083,33.853693;106.854239,33.852134;106.854349,33.848687;106.851645,33.845923;106.847516,33.843323;106.841075,33.835117;106.840715,33.833983;106.839523,33.828797;106.839404,33.826998;106.835247,33.828729;106.831891,33.829816;106.829259,33.829654;106.823546,33.830399;106.82128,33.831238;106.817807,33.834445;106.816706,33.834633;106.816564,33.833434;106.817423,33.832146;106.817254,33.830481;106.816946,33.829457;106.813223,33.823525;106.812565,33.821883;106.80931,33.8199;106.807906,33.817626;106.807593,33.81465;106.805876,33.809854;106.805763,33.801371;106.805156,33.797022;106.805364,33.791975;106.805312,33.788995;106.805797,33.783717;106.806005,33.779358;106.805397,33.774781;106.805337,33.770423;106.804729,33.765618;106.804669,33.761492;106.804859,33.755987;106.804234,33.750031;106.804433,33.744301;106.803524,33.73925;106.803202,33.735356;106.803661,33.72939;106.80386,33.723655;106.803504,33.717699;106.802281,33.708772;106.801396,33.703965;106.799644,33.69642;106.798785,33.693445;106.799574,33.690915;106.799261,33.688629;106.798671,33.685654;106.797266,33.682458;106.794759,33.679961;106.789234,33.6775;106.781331,33.681481;106.777235,33.682896;106.771768,33.684328;106.766299,33.686673;106.758101,33.68927;106.753176,33.691376;106.747703,33.693031;106.742488,33.693991;106.738656,33.695402;106.734543,33.696582;106.731239,33.69661;106.727404,33.697327;106.721925,33.699431;106.714252,33.701321;106.708178,33.700681;106.704889,33.701387;106.699658,33.701654;106.696898,33.701676;106.692773,33.701475;106.686992,33.70197;106.684423,33.701986;106.683321,33.702026;106.681113,33.702477;106.679243,33.703032;106.677933,33.703293;106.675074,33.702326;106.674848,33.702101;106.674968,33.701408;106.676362,33.699491;106.6768,33.698604;106.677379,33.697871;106.678347,33.697417;106.680599,33.697681;106.68393,33.696405;106.685582,33.695558;106.686203,33.694812;106.686585,33.694582;106.686669,33.693847;106.687848,33.692833;106.688649,33.692726;106.690027,33.693179;106.692155,33.694385;106.694686,33.693397;106.695429,33.691785;106.695497,33.689529;106.692349,33.687971;106.693967,33.684281;106.695954,33.683031;106.696777,33.683003;106.698509,33.683911;106.700721,33.68252;106.702258,33.680903;106.703344,33.679339;106.705678,33.676956;106.706027,33.675912;106.705782,33.675537;106.704261,33.675146;106.701194,33.672163;106.699471,33.671184;106.69697,33.672084;106.694931,33.67128;106.691698,33.669521;106.689719,33.668633;106.688233,33.667462;106.687038,33.665554;106.686135,33.665344;106.684995,33.665441;106.682232,33.665418;106.679406,33.664103;106.677382,33.663963;106.672293,33.662304;106.671707,33.661895;106.670046,33.661152;106.668215,33.661251;106.667162,33.662165;106.665858,33.662943;106.661583,33.662327;106.658833,33.662219;106.65609,33.662911;106.655359,33.662943;106.654454,33.662554;106.653191,33.662637;106.652293,33.663026;106.651605,33.663164;106.650776,33.663039;106.649405,33.661481;106.648491,33.660991;106.646872,33.660765;106.645443,33.661109;106.644744,33.661119;106.643808,33.660337;106.642451,33.65964;106.642277,33.658998;106.642471,33.658492;106.643173,33.65788;106.643904,33.656876;106.644012,33.65544;106.64458,33.654343;106.645103,33.65367;106.645739,33.653455;106.645369,33.652254;106.645612,33.65019;106.646961,33.647886;106.649406,33.644892;106.650198,33.642595;106.650162,33.639386;106.64877,33.63756;106.647351,33.634818;106.644018,33.631631;106.641242,33.629356;106.638745,33.627077;106.63623,33.624571;106.633464,33.622759;106.629845,33.619572;106.628445,33.616372;106.627314,33.614089;106.624244,33.609979;106.623113,33.607469;106.6228,33.604029;106.622209,33.600594;106.621347,33.597392;106.620226,33.595105;106.618548,33.593054;106.617922,33.591924;106.617289,33.592078;106.615859,33.593667;106.615086,33.593777;106.612812,33.593273;106.611823,33.592343;106.611072,33.591332;106.609185,33.590757;106.605504,33.588558;106.603733,33.587636;106.602366,33.586596;106.601236,33.583039;106.600687,33.581772;106.600298,33.581246;106.599748,33.580743;106.598999,33.580232;106.597977,33.579765;106.596748,33.579411;106.595794,33.57935;106.59497,33.579401;106.593322,33.579904;106.589347,33.580445;106.587282,33.581403;106.583868,33.584389;106.582586,33.587301;106.581468,33.590654;106.581499,33.592593;106.580229,33.595173;106.579905,33.59823;106.580597,33.600908;106.581021,33.605329;106.579812,33.607411;106.579697,33.608724;106.581678,33.609824;106.581348,33.610779;106.579224,33.617676;106.577914,33.622736;106.576587,33.627103;106.575547,33.631693;106.573119,33.635615;106.569607,33.640693;106.568264,33.642766;106.565845,33.647146;106.562326,33.651305;106.560454,33.655448;106.55776,33.659604;106.554805,33.665362;106.552371,33.668595;106.549963,33.673431;106.546169,33.677828;106.542126,33.684058;106.542161,33.686808;106.539736,33.691188;106.534844,33.695134;106.53075,33.696782;106.525028,33.699357;106.521748,33.700081;106.51627,33.70014;106.51299,33.700629;106.508057,33.700449;106.503956,33.700949;106.498469,33.700775;106.493286,33.702432;106.487289,33.705475;106.48265,33.707356;106.480789,33.712417;106.480262,33.715403;106.481941,33.718824;106.483889,33.721788;106.484755,33.725215;106.485889,33.729104;106.487014,33.732303;106.486513,33.737119;106.485993,33.739875;106.486321,33.743776;106.486624,33.747213;106.487775,33.751784;106.488078,33.754763;106.488104,33.758202;106.487862,33.761411;106.487361,33.765317;106.486573,33.768532;106.486046,33.77083;106.483882,33.774522;106.482549,33.777513;106.47984,33.780748;106.476014,33.782388;106.47327,33.782643;106.468084,33.784988;106.465088,33.786849;106.461824,33.789631;106.460482,33.793081;106.461079,33.797203;106.463314,33.801765;106.465843,33.807243;106.467255,33.812047;106.468398,33.816389;106.46871,33.820055;106.472312,33.823232;106.474805,33.825729;106.481704,33.829788;106.486119,33.832039;106.491364,33.834508;106.494142,33.838376;106.493891,33.841131;106.493398,33.846177;106.492057,33.84963;106.489643,33.854467;106.487211,33.857699;106.48477,33.860934;106.479863,33.864191;106.4783,33.865082;106.477856,33.865669;106.477113,33.866708;106.476432,33.868021;106.475818,33.868891;106.47578,33.870442;106.475585,33.871707;106.475398,33.872963;106.47542,33.874342;106.475303,33.875715;106.474343,33.876635;106.473092,33.876711;106.47218,33.876492;106.470944,33.876325;106.46982,33.876159;106.468478,33.876268;106.467368,33.876793;106.466629,33.877516;106.466154,33.878325;106.465689,33.879702;106.465154,33.880855;106.46454,33.88172;106.464206,33.882807;106.463799,33.883498;106.463113,33.883904;106.46211,33.884077;106.461028,33.883998;106.459419,33.883449;106.457851,33.882816;106.457342,33.882477;106.45713,33.882137;106.457172,33.881543;106.457639,33.881075;106.458105,33.880946;106.461197,33.880854;106.461748,33.880683;106.462045,33.880215;106.462129,33.879536;106.461833,33.878814;106.461367,33.878348;106.460435,33.877841;106.459037,33.877249;106.458104,33.876741;106.455562,33.875133;106.454799,33.874922;106.454206,33.874966;106.453485,33.875265;106.452722,33.875818;106.452214,33.875904;106.451747,33.875693;106.451536,33.875226;106.451536,33.874504;106.45179,33.873951;106.452341,33.873398;106.452892,33.872887;106.453485,33.872674;106.454545,33.872587;106.455943,33.872286;106.456579,33.871903;106.456875,33.871392;106.456875,33.871149;106.456312,33.87106;106.452171,33.869263;106.444181,33.867037;106.438954,33.866622;106.434559,33.866888;106.428228,33.866474;106.425764,33.867412;106.423587,33.869489;106.421947,33.871567;106.419778,33.874562;106.418979,33.877547;106.418746,33.882591;106.419067,33.887631;106.419634,33.893738;106.418311,33.894798;106.417163,33.897156;106.416096,33.899973;106.415566,33.901805;106.414259,33.903015;106.413364,33.904049;106.412117,33.904978;106.411023,33.906424;106.41049,33.908022;106.410937,33.909229;106.414074,33.912012;106.414931,33.91298;106.417393,33.913308;106.419577,33.913926;106.42063,33.914252;106.422184,33.915045;106.423116,33.916021;106.423841,33.917617;106.424624,33.918695;106.427316,33.920515;106.431063,33.923408;106.433049,33.92516;106.433758,33.926187;106.435133,33.929326;106.437104,33.930739;106.438716,33.931755;106.441032,33.932942;106.443554,33.934591;106.444654,33.935936;106.445425,33.937629;106.447393,33.942659;106.449897,33.945619;106.453224,33.948799;106.455191,33.952216;106.459886,33.95447;106.463775,33.957871;106.465455,33.961064;106.467949,33.963565;106.470451,33.966752;106.47407,33.970841;106.476027,33.973805;106.477724,33.978374;106.479698,33.983855;106.47975,33.987979;106.479768,33.990732;106.479534,33.994398;106.478747,33.997846;106.477414,34.001756;106.476073,34.005667;106.474463,34.00935;106.472593,34.014639;106.471806,34.019004;106.471589,34.024046;106.473269,34.027474;106.476334,34.031338;106.479389,34.034518;106.483536,34.036771;106.486859,34.038569;106.49213,34.042643;106.496024,34.04673;106.499347,34.049453;106.502965,34.053768;106.505474,34.056493;106.506054,34.059695;106.506929,34.063815;106.507518,34.067937;106.506739,34.072301;106.5068,34.077799;106.505182,34.081482;106.503304,34.085856;106.50308,34.090673;106.50231,34.096643;106.501531,34.100778;106.501852,34.104901;106.50379,34.106024;106.508472,34.106896;106.512349,34.10869;106.515663,34.109572;106.52115,34.108601;106.526395,34.109236;106.531078,34.109188;106.534653,34.108924;106.540706,34.109091;106.546777,34.109263;106.551472,34.11105;106.552569,34.111324;106.554527,34.109991;106.556169,34.11002;106.557302,34.110537;106.558374,34.110465;106.559695,34.109498;106.560581,34.109691;106.56119,34.110936;106.560816,34.113206;106.562272,34.114679;106.565824,34.120343;106.567889,34.124627;106.567499,34.125086;106.567618,34.125529;106.568433,34.125637;106.569668,34.125291;106.569661,34.125396;106.57028,34.125104;106.57043,34.125359;106.570041,34.126729;106.570005,34.127286;106.575831,34.134429;106.578437,34.140157;106.57978,34.141063;106.580776,34.140989;106.582114,34.141873;106.582155,34.142999;106.582309,34.143936;106.583245,34.145101;106.583912,34.147508;106.584848,34.149437;106.582854,34.153242;106.580923,34.155023;106.579024,34.158021;106.577124,34.161018;106.574956,34.16379;106.573612,34.167241;106.572268,34.170002;106.570941,34.175056;106.569624,34.180801;106.56939,34.184926;106.566434,34.191834;106.565654,34.195738;106.565161,34.201474;106.563843,34.20653;106.562795,34.211812;106.561478,34.217096;106.559051,34.222393;106.558558,34.227443;106.557752,34.229742;106.555855,34.233199;106.552874,34.237812;106.551263,34.242641;106.547989,34.245195;106.543616,34.249365;106.539234,34.252156;106.535944,34.253797;106.532092,34.254064;106.527928,34.252276;106.525703,34.250691;106.522925,34.248427;106.520692,34.246154;106.518459,34.244116;106.51652,34.24253;106.514019,34.240951;106.512902,34.239358;106.506542,34.237359;106.502129,34.236716;106.49608,34.238378;106.494185,34.241842;106.493657,34.244824;106.493407,34.247352;106.494281,34.251007;106.496531,34.25511;106.499318,34.258751;106.50239,34.262619;106.506025,34.267398;106.510222,34.27217;106.514134,34.277859;106.516384,34.281506;106.520011,34.285139;106.522252,34.289014;106.526424,34.291953;106.532215,34.291203;106.535514,34.290484;106.537998,34.290231;106.541566,34.288821;106.544857,34.287413;106.548988,34.285995;106.553952,34.285259;106.559749,34.284748;106.562496,34.283576;106.568295,34.283062;106.572977,34.282103;106.577114,34.280921;106.57956,34.277691;106.581998,34.273539;106.583316,34.26757;106.586796,34.257451;106.589243,34.253763;106.593104,34.25213;106.599738,34.251851;106.602491,34.250911;106.608051,34.252703;106.611397,34.254508;106.614465,34.256781;106.617525,34.258591;106.62115,34.260169;106.626428,34.260819;106.631124,34.260329;106.633621,34.25985;106.635535,34.258005;106.637727,34.256158;106.641024,34.253384;106.642391,34.251769;106.644296,34.249234;106.646219,34.247385;106.650353,34.245069;106.653103,34.243901;106.657264,34.243874;106.659762,34.243861;106.663906,34.243144;106.666709,34.244731;106.670044,34.245856;106.673117,34.247438;106.676766,34.250627;106.67956,34.252899;106.682103,34.256091;106.684097,34.259977;106.685237,34.263181;106.686666,34.266151;106.687527,34.268897;106.689243,34.272552;106.690104,34.274839;106.691811,34.278494;106.694928,34.283061;106.697749,34.286481;106.701117,34.290124;106.702841,34.294241;106.703424,34.296299;106.70513,34.299496;106.704913,34.304774;106.704687,34.308675;106.703059,34.311664;106.70091,34.316723;106.698734,34.320178;106.696549,34.323403;106.694364,34.325941;106.691919,34.329851;106.6903,34.333993;106.690901,34.337427;106.692868,34.33925;106.696489,34.339684;106.702617,34.342393;106.707361,34.343732;106.710972,34.344395;106.714053,34.346432;106.715758,34.349404;106.716907,34.352604;106.716959,34.355303;106.716724,34.359484;106.716734,34.361217;106.716734,34.362974;106.71696,34.364509;106.717544,34.367253;106.717368,34.369256;106.716612,34.369076;106.715599,34.369138;106.714695,34.369631;106.713619,34.370942;106.71222,34.374041;106.711383,34.375301;106.710206,34.375844;106.709096,34.375961;106.707867,34.375449;106.706637,34.374595;106.705305,34.373281;106.703888,34.370893;106.703519,34.370447;106.701794,34.37005;106.697277,34.370633;106.696106,34.371547;106.695196,34.373349;106.694667,34.374745;106.694377,34.376108;106.693881,34.377077;106.692874,34.377672;106.691764,34.378045;106.690466,34.378111;106.689134,34.377836;106.688553,34.377426;106.688487,34.377373;106.688184,34.376982;106.686932,34.376102;106.685733,34.375409;106.684681,34.375181;106.683682,34.375153;106.682749,34.375271;106.682016,34.375509;106.681497,34.375879;106.681289,34.376298;106.682097,34.378248;106.682234,34.37893;106.682695,34.379528;106.682883,34.380107;106.682643,34.380959;106.681704,34.382269;106.680082,34.383731;106.679228,34.38407;106.678203,34.384034;106.676905,34.383776;106.674941,34.382903;106.673745,34.382509;106.672464,34.382507;106.671285,34.382743;106.669902,34.382859;106.668706,34.382568;106.667067,34.38161;106.665854,34.380961;106.664778,34.380839;106.663446,34.381007;106.662148,34.381703;106.660628,34.382962;106.658613,34.384679;106.657264,34.386142;106.656256,34.387486;106.654788,34.389051;106.653234,34.390514;106.652158,34.391312;106.650946,34.391549;106.649648,34.391343;106.648282,34.390982;106.647343,34.390368;106.646387,34.390144;106.645175,34.390194;106.643348,34.390992;106.642444,34.391314;106.641163,34.391363;106.640156,34.391277;106.639234,34.391241;106.637971,34.391614;106.637271,34.392005;106.636811,34.392754;106.636589,34.393759;106.636606,34.394952;106.636845,34.3956;106.637408,34.396538;106.638859,34.398022;106.639662,34.398893;106.640105,34.399438;106.640191,34.400018;106.640105,34.400546;106.639372,34.40155;106.638126,34.402826;106.637426,34.403473;106.636538,34.403881;106.635532,34.403947;106.634507,34.403759;106.633108,34.403246;106.632186,34.402631;106.63135,34.402119;106.630736,34.40205;106.630258,34.402407;106.629661,34.403446;106.629494,34.404581;106.629291,34.405415;106.628716,34.406349;106.627561,34.407413;106.62682,34.408004;106.625709,34.40929;106.624791,34.410266;106.624554,34.410946;106.624465,34.413876;106.624228,34.415769;106.623798,34.416671;106.62291,34.418032;106.621992,34.419629;106.621844,34.420428;106.621873,34.421138;106.622332,34.422484;106.622925,34.424793;106.623221,34.425681;106.623725,34.426539;106.623903,34.427191;106.623725,34.427782;106.623266,34.428566;106.622525,34.429068;106.621607,34.429363;106.619711,34.429392;106.618971,34.42948;106.618497,34.429716;106.618171,34.430338;106.617816,34.431402;106.616736,34.434938;106.615551,34.438784;106.615062,34.439716;106.614677,34.440248;106.614648,34.440721;106.614796,34.441432;106.614851,34.441556;106.615156,34.442561;106.615342,34.442861;106.615588,34.443069;106.617658,34.443851;106.618557,34.444394;106.619594,34.445519;106.61992,34.446377;106.619831,34.447206;106.619327,34.447945;106.618617,34.448448;106.618113,34.448566;106.616929,34.448239;106.616248,34.447913;106.615892,34.447558;106.615685,34.4467;106.615389,34.446285;106.614885,34.44596;106.614471,34.445841;106.614056,34.445989;106.613686,34.44627;106.613124,34.447719;106.612917,34.449495;106.612354,34.450648;106.611792,34.452779;106.610755,34.453962;106.610193,34.454258;106.609423,34.454346;106.608002,34.454168;106.606582,34.453783;106.605782,34.45331;106.605666,34.453012;106.605143,34.452515;106.604782,34.451812;106.604493,34.45096;106.604212,34.45031;106.603912,34.449711;106.603266,34.44887;106.602645,34.448279;106.602231,34.448042;106.60152,34.448101;106.600899,34.448426;106.600189,34.449344;106.599286,34.451134;106.598902,34.452348;106.598251,34.453028;106.5976,34.453531;106.596476,34.454005;106.595027,34.454183;106.593459,34.454006;106.592661,34.454036;106.592158,34.454243;106.591684,34.454924;106.591537,34.455723;106.591625,34.456551;106.592202,34.457306;106.593829,34.459081;106.594953,34.460294;106.595076,34.460369;106.595467,34.460708;106.595741,34.460842;106.596051,34.460954;106.596774,34.461149;106.598112,34.461642;106.598326,34.461679;106.598482,34.461684;106.598642,34.461567;106.599558,34.461036;106.600088,34.460812;106.600373,34.460741;106.600959,34.460766;106.601758,34.460914;106.602202,34.461121;106.602616,34.461536;106.602971,34.462483;106.602971,34.463311;106.602483,34.464125;106.600974,34.465279;106.599406,34.46596;106.598666,34.466108;106.597808,34.466108;106.596595,34.465546;106.595353,34.465132;106.591064,34.46466;106.589461,34.464626;106.58816,34.464538;106.587214,34.464125;106.5868,34.463681;106.586386,34.463622;106.585943,34.463859;106.584908,34.464629;106.584228,34.464955;106.5834,34.465104;106.583075,34.46537;106.582779,34.465874;106.582721,34.466466;106.582957,34.467028;106.584051,34.467915;106.585145,34.468565;106.585411,34.469186;106.585411,34.469955;106.584982,34.470474;106.584066,34.471096;106.582697,34.47175;106.581869,34.472137;106.580615,34.472774;106.579425,34.473497;106.578716,34.473764;106.577889,34.473824;106.576293,34.473412;106.574638,34.472792;106.573013,34.472587;106.571743,34.472618;106.570738,34.472886;106.568818,34.474013;106.567962,34.474843;106.567784,34.475554;106.567844,34.476826;106.568804,34.478408;106.56904,34.47897;106.569188,34.479265;106.569513,34.479383;106.570901,34.479677;106.57226,34.480031;106.572762,34.480178;106.573058,34.480533;106.573619,34.481509;106.573796,34.481893;106.573708,34.482396;106.573265,34.482989;106.572379,34.483493;106.571374,34.483612;106.568981,34.483083;106.567416,34.482139;106.566087,34.481342;106.565614,34.481135;106.564965,34.481255;106.564344,34.481315;106.563783,34.481286;106.562809,34.480726;106.561775,34.48055;106.561185,34.480551;106.560653,34.480788;106.560181,34.481411;106.559856,34.482329;106.559798,34.484963;106.559576,34.486606;106.55934,34.487494;106.559015,34.487968;106.558484,34.488294;106.557421,34.488829;106.554986,34.489352;106.553805,34.489413;106.552418,34.489179;106.550529,34.488296;106.548404,34.487028;106.547047,34.485581;106.546191,34.484517;106.545778,34.483956;106.54563,34.483217;106.545807,34.482417;106.545571,34.481796;106.544951,34.480998;106.544745,34.48023;106.544302,34.479313;106.543682,34.478516;106.542621,34.478015;106.541086,34.478079;106.5397,34.478585;106.539021,34.479149;106.538549,34.480038;106.538343,34.481222;106.538491,34.482168;106.538815,34.482819;106.539833,34.483808;106.541485,34.48549;106.541869,34.486259;106.541928,34.487117;106.54181,34.487886;106.54122,34.488806;106.539612,34.49057;106.538167,34.491994;106.537105,34.492678;106.536073,34.493006;106.533359,34.49325;106.529112,34.493439;106.527844,34.493294;106.526664,34.492854;106.526104,34.492737;106.525544,34.492739;106.524954,34.492977;106.524247,34.49363;106.522419,34.495825;106.521623,34.496567;106.521062,34.496836;106.520325,34.496986;106.519411,34.497077;106.518291,34.496962;106.517377,34.496876;106.516168,34.497027;106.515254,34.497237;106.514399,34.497624;106.513898,34.49804;106.513426,34.498959;106.51257,34.500452;106.511843,34.502516;106.511674,34.504592;106.511941,34.505129;106.512266,34.505866;106.512336,34.506313;106.512313,34.506621;106.512186,34.506878;106.512083,34.507243;106.512134,34.508225;106.512407,34.508626;106.513698,34.509042;106.513989,34.509314;106.514007,34.510081;106.513898,34.51123;106.514007,34.512069;106.513807,34.512873;106.512771,34.51335;106.511117,34.513337;106.510245,34.512993;106.509445,34.512156;106.5087,34.511647;106.507227,34.511378;106.505246,34.511165;106.502993,34.511063;106.501866,34.511267;106.500939,34.511762;106.499885,34.512677;106.499104,34.513136;106.498232,34.513394;106.496396,34.513308;106.495778,34.513383;106.49536,34.513713;106.494433,34.515193;106.493833,34.51556;106.492725,34.515691;106.490798,34.515824;106.489581,34.516302;106.488872,34.517162;106.488599,34.51833;106.488599,34.519461;106.488599,34.52041;106.488127,34.522181;106.487782,34.523404;106.487491,34.523862;106.486818,34.524356;106.486073,34.524705;106.485001,34.524836;106.484146,34.524783;106.48351,34.524147;106.482928,34.523126;106.482038,34.522545;106.480183,34.522149;106.478638,34.521807;106.476766,34.521957;106.473748,34.522568;106.471475,34.523139;106.470366,34.523471;106.469529,34.524184;106.46922,34.525572;106.469529,34.527395;106.469838,34.528745;106.469766,34.529238;106.469348,34.529622;106.468002,34.530191;106.466856,34.530376;106.465456,34.530142;106.463564,34.528942;106.462892,34.528068;106.462328,34.527413;106.462164,34.526446;106.462436,34.524931;106.462436,34.524001;106.462218,34.523491;106.461491,34.523018;106.460654,34.522782;106.459672,34.52273;106.458981,34.522877;106.458125,34.523463;106.45747,34.524358;106.457361,34.525672;106.457743,34.526748;106.459017,34.528223;106.460491,34.529424;106.4606,34.529843;106.4602,34.530337;106.458654,34.531125;106.456925,34.531621;106.455379,34.531624;106.453887,34.531318;106.452886,34.53037;106.452049,34.528821;106.451102,34.525576;106.450138,34.524172;106.449355,34.523536;106.447936,34.523228;106.446571,34.523358;106.444805,34.524237;106.44293,34.525408;106.440709,34.526049;106.438761,34.526655;106.437523,34.527714;106.436303,34.52799;106.434555,34.527846;106.43135,34.526609;106.42807,34.524806;106.426741,34.523841;106.425775,34.52355;106.424208,34.523459;106.422294,34.523808;106.421146,34.523954;106.418831,34.523828;106.417246,34.524394;106.41628,34.524614;106.414475,34.524505;106.413016,34.52436;106.411211,34.52374;106.409424,34.523357;106.407801,34.523119;106.407035,34.522791;106.406342,34.522098;106.405904,34.520675;106.405375,34.519872;106.40408,34.518467;106.403058,34.517299;106.402657,34.516186;106.402529,34.514891;106.402511,34.513048;106.402274,34.512172;106.401361,34.511133;106.399847,34.510129;106.397366,34.509635;106.39492,34.509433;106.39253,34.50945;106.390777,34.509704;106.389557,34.510093;106.388606,34.510636;106.387278,34.510923;106.386634,34.511223;106.386279,34.511702;106.386251,34.512564;106.385841,34.51411;106.385553,34.515697;106.385895,34.517175;106.385964,34.517983;106.385813,34.518694;106.385115,34.519583;106.383376,34.520525;106.381665,34.52118;106.3805,34.521261;106.379601,34.520981;106.379053,34.520682;106.37848,34.520184;106.377484,34.519188;106.376953,34.518565;106.375431,34.51726;106.373733,34.515547;106.371713,34.514057;106.369638,34.51276;106.368522,34.512345;106.368341,34.512318;106.36753,34.512245;106.36611,34.512317;106.365188,34.512589;106.363793,34.513184;106.361413,34.514463;106.358846,34.515528;106.357001,34.516023;106.354833,34.516741;106.353113,34.51731;106.351942,34.517706;106.350795,34.518301;106.349623,34.518996;106.348377,34.519417;106.347405,34.51939;106.346682,34.519041;106.345734,34.518242;106.344089,34.517468;106.342593,34.517017;106.341294,34.516917;106.339849,34.516826;106.338755,34.516894;106.337983,34.517007;106.337326,34.517212;106.336371,34.517717;106.335909,34.517969;106.335391,34.518025;106.334827,34.517967;106.334449,34.51788;106.334233,34.518714;106.334133,34.519159;106.334103,34.519406;106.334154,34.51969;106.33437,34.520056;106.335106,34.521424;106.335803,34.521917;106.336448,34.522314;106.33797,34.523918;106.338298,34.525525;106.33887,34.527686;106.339648,34.529012;106.340996,34.530675;106.342597,34.53265;106.343464,34.534337;106.34382,34.53661;106.343334,34.542974;106.342784,34.544256;106.342127,34.54522;106.34046,34.546082;106.339852,34.546976;106.339602,34.548117;106.340208,34.550236;106.340987,34.551728;106.341154,34.553317;106.341274,34.553829;106.341362,34.553904;106.34337,34.555613;106.344143,34.556639;106.344495,34.557556;106.344358,34.558707;106.343959,34.560313;106.342259,34.562989;106.341562,34.566551;106.340981,34.568015;106.340018,34.568787;106.337681,34.569877;106.334616,34.570641;106.333739,34.571495;106.333103,34.572751;106.332445,34.573673;106.330163,34.575082;106.328795,34.575719;106.325409,34.576415;106.322115,34.576528;106.320545,34.577401;106.319117,34.578524;106.317175,34.579069;106.314852,34.578924;106.314034,34.578745;106.313336,34.57983;106.313347,34.582512;106.317835,34.585548;106.320916,34.588288;106.323161,34.589889;106.328183,34.591933;106.331821,34.593754;106.336843,34.594882;106.343266,34.598065;106.347191,34.600344;106.352221,34.602388;106.355571,34.603979;106.360322,34.606254;106.364794,34.608066;106.368152,34.610348;106.370971,34.614004;106.37238,34.616519;106.374076,34.618346;106.376598,34.621086;106.378294,34.623831;106.381928,34.625877;106.384719,34.626548;106.387205,34.625388;106.390236,34.624204;106.39053,34.624945;106.391164,34.625674;106.392114,34.626247;106.393142,34.626431;106.394149,34.626368;106.394549,34.626447;106.395158,34.626926;106.397225,34.631454;106.397719,34.631879;106.398972,34.632463;106.399798,34.633661;106.400536,34.635569;106.401119,34.636298;106.401663,34.636654;106.403482,34.63748;106.404241,34.637687;106.404636,34.637703;106.405036,34.637532;106.405569,34.63699;106.409402,34.636272;106.410722,34.636216;106.412248,34.636825;106.413226,34.637396;106.414477,34.638188;106.416361,34.639672;106.418108,34.641492;106.419517,34.643409;106.419232,34.644564;106.418763,34.645583;106.418785,34.646854;106.41936,34.649124;106.421767,34.654913;106.422168,34.655297;106.423324,34.655248;106.425305,34.654299;106.426849,34.65285;106.427903,34.651656;106.429925,34.650242;106.431013,34.649159;106.432509,34.648362;106.433902,34.647428;106.436048,34.645442;106.4372,34.644233;106.438242,34.643865;106.43903,34.643382;106.439503,34.642654;106.43956,34.642028;106.440291,34.640727;106.440397,34.639789;106.440702,34.6395;106.441323,34.63928;106.441887,34.639199;106.442715,34.639281;106.444028,34.639657;106.44517,34.639794;106.445784,34.639453;106.446034,34.638422;106.446015,34.637311;106.446289,34.636572;106.448685,34.636434;106.451752,34.637326;106.454802,34.637758;106.458448,34.638927;106.458899,34.638806;106.459888,34.638354;106.460946,34.638047;106.464776,34.637312;106.468892,34.635253;106.470379,34.634107;106.470996,34.633945;106.471352,34.634204;106.471379,34.634447;106.471281,34.634894;106.47126,34.635335;106.471309,34.635665;106.471539,34.636352;106.471567,34.636497;106.471554,34.636829;106.471423,34.637227;106.471271,34.637488;106.471078,34.637712;106.470794,34.637932;106.470532,34.638061;106.470233,34.638143;106.47,34.638163;106.469674,34.638128;106.469211,34.638029;106.468998,34.638017;106.468803,34.638048;106.468619,34.63815;106.46851,34.638268;106.468408,34.638483;106.468338,34.63878;106.468176,34.639257;106.467914,34.639796;106.467364,34.640666;106.467215,34.640959;106.467144,34.64121;106.467154,34.641411;106.467446,34.642268;106.467669,34.643172;106.467778,34.643434;106.467922,34.643634;106.468079,34.643753;106.468212,34.643811;106.468434,34.643861;106.468659,34.643864;106.468942,34.643814;106.469411,34.643685;106.469735,34.643641;106.470137,34.643658;106.470344,34.643695;106.470597,34.643785;106.470728,34.643873;106.471051,34.644191;106.471231,34.644336;106.471382,34.644429;106.471703,34.644606;106.471895,34.644749;106.471973,34.644833;106.472062,34.644999;106.472087,34.645193;106.472081,34.645278;106.472016,34.645495;106.471938,34.645623;106.471685,34.645873;106.471255,34.646227;106.47105,34.646443;106.470929,34.646628;106.470891,34.64682;106.470974,34.646999;106.471183,34.647189;106.471333,34.647286;106.471751,34.64752;106.472495,34.647957;106.472909,34.648145;106.473532,34.648351;106.473679,34.648394;106.473711,34.6484;106.473775,34.648515;106.473793,34.648567;106.473799,34.648623;106.473794,34.648688;106.473727,34.648948;106.473638,34.649201;106.473563,34.649363;106.473473,34.649521;106.47337,34.649674;106.473099,34.650039;106.473036,34.650139;106.472983,34.650238;106.472896,34.650442;106.472719,34.65097;106.472641,34.651153;106.472581,34.651271;106.472512,34.651386;106.472408,34.651529;106.471862,34.652157;106.471552,34.65255;106.47143,34.652724;106.471317,34.652902;106.471012,34.653429;106.470798,34.653718;106.470628,34.653906;106.470435,34.654091;106.470223,34.654258;106.469905,34.65444;106.469645,34.65455;106.469037,34.654753;106.468788,34.65485;106.468563,34.654966;106.468291,34.655154;106.46816,34.655269;106.467969,34.655471;106.467799,34.655673;106.46746,34.656079;106.467056,34.656581;106.466688,34.656972;106.466268,34.657342;106.465754,34.657732;106.465172,34.658104;106.464481,34.658513;106.464005,34.658832;106.463011,34.659568;106.462542,34.659865;106.462219,34.660016;106.461243,34.660419;106.460712,34.660597;106.459208,34.660984;106.458785,34.661146;106.457842,34.661556;106.456955,34.661983;106.456082,34.66252;106.454841,34.663347;106.454537,34.663533;106.454044,34.663811;106.4539,34.663908;106.453533,34.664192;106.453317,34.664344;106.453184,34.664424;106.453045,34.664495;106.452901,34.664559;106.452724,34.664622;106.452621,34.664653;106.452408,34.664701;106.452301,34.66472;106.452082,34.664746;106.4519,34.664756;106.451373,34.665051;106.450681,34.665727;106.450447,34.666671;106.450459,34.666734;106.4501,34.666923;106.448167,34.668091;106.445689,34.669486;106.443774,34.672714;106.442136,34.675247;106.441894,34.678921;106.441365,34.681676;106.441946,34.684195;106.443931,34.688994;106.445353,34.691967;106.44732,34.694929;106.450691,34.698112;106.453481,34.700383;106.456851,34.703793;106.45964,34.705605;106.462706,34.706723;106.466317,34.707605;106.469936,34.709178;106.473278,34.710524;106.477433,34.710253;106.480506,34.712288;106.483293,34.713638;106.486911,34.715209;106.489438,34.717936;106.492234,34.720891;106.494215,34.724539;106.495358,34.727509;106.496224,34.730943;106.49708,34.733228;106.498223,34.736883;106.498526,34.738947;106.499383,34.741232;106.500785,34.743511;106.503303,34.745089;106.505812,34.746898;106.509144,34.746636;106.51219,34.746151;106.517174,34.745869;106.522168,34.745819;106.527724,34.745991;106.531048,34.745729;106.535758,34.745682;106.539645,34.745642;106.544088,34.746059;106.546599,34.74718;106.54912,34.749449;106.551078,34.750577;106.552758,34.751935;106.552802,34.756295;106.551165,34.758147;106.549251,34.760916;106.548554,34.761632;106.548675,34.761739;106.552738,34.764095;106.553059,34.764482;106.556554,34.76581;106.558711,34.766362;106.56066,34.765445;106.562058,34.764474;106.563981,34.764568;106.56602,34.765288;106.569014,34.767028;106.569868,34.767228;106.571533,34.768081;106.573514,34.769316;106.575034,34.770059;106.575278,34.770631;106.575367,34.77268;106.576296,34.773975;106.577301,34.776813;106.578796,34.778126;106.579268,34.778677;106.579493,34.779709;106.579418,34.780683;106.578869,34.781898;106.578543,34.785399;106.57846,34.785601;106.578698,34.787389;106.578359,34.789005;106.576982,34.790486;106.575008,34.79124;106.57303,34.793649;106.571784,34.794191;106.57008,34.794311;106.565863,34.796676;106.565202,34.798041;106.565443,34.801567;106.565542,34.802143;106.566065,34.803109;106.566088,34.803407;106.56581,34.80381;106.565419,34.805824;106.565132,34.806126;106.564847,34.808952;106.561173,34.811572;106.560551,34.811762;106.559151,34.811631;106.557926,34.811923;106.555729,34.812826;106.554295,34.813739;106.553671,34.814689;106.553901,34.815212;106.555018,34.816246;106.555344,34.817174;106.555252,34.818418;106.554724,34.819836;106.554001,34.821196;106.552869,34.822999;106.552093,34.825037;106.552208,34.826606;106.552002,34.82716;106.551198,34.828431;106.55084,34.829511;106.551225,34.83027;106.552154,34.830862;106.553604,34.830974;106.55552,34.830766;106.555871,34.830786;106.555571,34.83147;106.555043,34.836863;106.556456,34.841933;106.559385,34.846987;106.559983,34.851416;106.558103,34.857628;106.55592,34.861317;106.554265,34.862706;106.551233,34.864803;106.54653,34.866914;106.542945,34.86901;106.539343,34.870192;106.535464,34.87184;106.531612,34.874855;106.52802,34.876501;106.525285,34.879967;106.523641,34.882509;106.520612,34.88529;106.519253,34.888516;106.517912,34.892428;106.51741,34.897253;106.516346,34.90139;106.515845,34.906445;106.515049,34.910349;106.513985,34.914719;106.512912,34.917939;106.511554,34.921163;106.510204,34.925078;106.50304,34.930885;106.499726,34.93298;106.496429,34.936229;106.493141,34.941077;106.493479,34.946579;106.493246,34.950938;106.493834,34.954374;106.493765,34.956303;106.493583,34.957058;106.492428,34.962051;106.492382,34.962202;106.49227,34.962354;106.491913,34.962836;106.491686,34.963219;106.491526,34.963584;106.491284,34.963873;106.491162,34.964058;106.490818,34.964815;106.490752,34.964911;106.490466,34.965238;106.490377,34.965406;106.49032,34.96557;106.490251,34.96593;106.490158,34.966212;106.490063,34.966727;106.49,34.967369;106.48985,34.968089;106.489846,34.968236;106.48987,34.968652;106.490017,34.969004;106.490048,34.969182;106.490015,34.969428;106.490068,34.969716;106.490036,34.970063;106.490014,34.970523;106.489979,34.970679;106.489916,34.970833;106.489826,34.970994;106.48967,34.971196;106.489288,34.971599;106.488859,34.971962;106.488253,34.972565;106.487833,34.972956;106.487521,34.973224;106.487195,34.97359;106.486999,34.97388;106.486667,34.974593;106.486452,34.974947;106.48632,34.975236;106.486198,34.975605;106.486113,34.975772;106.485981,34.975909;106.485614,34.976204;106.485476,34.976335;106.485148,34.976797;106.484995,34.976999;106.484361,34.977696;106.484275,34.977852;106.483987,34.978534;106.483687,34.979097;106.483362,34.979635;106.483194,34.979969;106.483159,34.980096;106.483192,34.980448;106.48328,34.980767;106.483434,34.981033;106.483664,34.981337;106.483775,34.981526;106.483854,34.981747;106.483947,34.98219;106.484044,34.982409;106.484386,34.982961;106.484743,34.983447;106.484887,34.983737;106.484963,34.983848;106.485137,34.984034;106.485299,34.984175;106.486108,34.984716;106.48672,34.985223;106.48712,34.985613;106.487458,34.98588;106.487733,34.98613;106.487805,34.986223;106.487882,34.986409;106.487975,34.986535;106.4881,34.986621;106.48853,34.986876;106.488813,34.986989;106.489087,34.987036;106.489624,34.987037;106.489874,34.9871;106.490366,34.987273;106.490583,34.98729;106.492294,34.987226;106.492537,34.98723;106.492713,34.987271;106.492976,34.987406;106.493213,34.987493;106.493586,34.987573;106.494477,34.987717;106.495089,34.987754;106.4954,34.987824;106.496198,34.988099;106.496485,34.988221;106.496847,34.988457;106.497081,34.988686;106.497301,34.989021;106.49746,34.989175;106.497841,34.989468;106.498117,34.989634;106.498506,34.989884;106.499038,34.990167;106.499249,34.990336;106.499604,34.990673;106.500093,34.991029;106.500254,34.991206;106.50036,34.991363;106.500419,34.991517;106.500454,34.991793;106.500489,34.991929;106.500559,34.992064;106.500895,34.992607;106.501053,34.992905;106.501251,34.993401;106.501599,34.994154;106.502012,34.99518;106.502064,34.995405;106.502101,34.995477;106.502175,34.995567;106.501514,34.995648;106.500933,34.995694;106.500521,34.995793;106.499731,34.996097;106.499543,34.996157;106.499352,34.996198;106.498912,34.996257;106.49874,34.996306;106.498504,34.996433;106.498295,34.996598;106.498186,34.996723;106.498017,34.996972;106.4979,34.997086;106.497758,34.997152;106.497407,34.997229;106.497163,34.99736;106.496599,34.997797;106.495886,34.998417;106.495633,34.998684;106.495423,34.998966;106.49539,34.999046;106.49533,34.999238;106.495194,34.999367;106.495153,34.99943;106.495051,34.999641;106.494786,35.00049;106.494594,35.001075;106.494557,35.001244;106.49455,35.001387;106.49457,35.001537;106.494635,35.001718;106.494697,35.001822;106.494772,35.001919;106.494854,35.002006;106.49526,35.002382;106.495358,35.002508;106.49547,35.002688;106.495566,35.00287;106.495602,35.002976;106.495615,35.003094;106.495599,35.003217;106.495557,35.003338;106.495512,35.003424;106.495429,35.003547;106.495244,35.003779;106.495203,35.003849;106.495169,35.003973;106.495168,35.004103;106.495201,35.00446;106.495188,35.004582;106.495164,35.004658;106.495092,35.004764;106.494876,35.004961;106.494783,35.005068;106.494712,35.005184;106.494662,35.005364;106.494673,35.005471;106.494707,35.005565;106.494825,35.005805;106.494859,35.005921;106.494865,35.005997;106.494862,35.006034;106.494838,35.006105;106.494816,35.006133;106.494889,35.006531;106.495643,35.009398;106.496593,35.012361;106.497643,35.014528;106.497955,35.015444;106.498343,35.01653;106.497666,35.01717;106.49689,35.017003;106.495841,35.016785;106.495092,35.01663;106.493786,35.016696;106.492243,35.017488;106.491145,35.018769;106.489468,35.019929;106.488737,35.02063;106.488659,35.020929;106.488576,35.021247;106.489143,35.021819;106.492364,35.023183;106.496407,35.023735;106.496919,35.024187;106.496098,35.025712;106.499686,35.030456;106.502509,35.033304;106.50353,35.033777;106.504665,35.033245;106.50544,35.032984;106.507042,35.032713;106.507442,35.032434;106.508512,35.03129;106.50994,35.03035;106.513725,35.030079;106.513815,35.03015;106.514287,35.030268;106.51557,35.030362;106.516589,35.030384;106.517121,35.030326;106.51767,35.030123;106.518384,35.029482;106.518745,35.029203;106.518995,35.029054;106.519344,35.028927;106.51986,35.028609;106.520033,35.028438;106.520321,35.027954;106.520509,35.027772;106.520747,35.027664;106.520996,35.02764;106.521349,35.027736;106.521788,35.028053;106.522878,35.029068;106.523502,35.029889;106.523704,35.030029;106.524116,35.030104;106.524518,35.030075;106.525592,35.02975;106.526289,35.029478;106.526383,35.029843;106.527001,35.030754;106.527124,35.031106;106.527129,35.031621;106.526972,35.0323;106.526917,35.032823;106.527043,35.034228;106.526817,35.035066;106.526749,35.03577;106.526926,35.036444;106.527126,35.037492;106.527325,35.038203;106.527739,35.039363;106.528229,35.040235;106.528601,35.040879;106.528967,35.041398;106.529147,35.041817;106.529588,35.042533;106.530321,35.043322;106.530459,35.043573;106.530758,35.044766;106.530774,35.044961;106.530756,35.045517;106.53086,35.045938;106.531205,35.046507;106.531869,35.047316;106.532469,35.047958;106.532769,35.048476;106.533246,35.049153;106.533619,35.049795;106.533878,35.05034;106.534167,35.051129;106.534198,35.051339;106.534177,35.051783;106.534196,35.051961;106.534458,35.052589;106.534617,35.052818;106.534878,35.053119;106.53513,35.053339;106.535837,35.05387;106.535952,35.053991;106.536061,35.054161;106.536133,35.054386;106.536117,35.054752;106.536134,35.054909;106.536182,35.055023;106.536361,35.055326;106.536413,35.055475;106.536432,35.055776;106.536378,35.056055;106.536402,35.05633;106.536471,35.056775;106.536586,35.057037;106.536653,35.057144;106.536696,35.057191;106.537798,35.059209;106.538314,35.060446;106.539143,35.061704;106.541038,35.063742;106.542706,35.066665;106.544502,35.066759;106.545674,35.069112;106.545949,35.070543;106.545804,35.071979;106.545446,35.074215;106.544663,35.077879;106.543057,35.080231;106.542699,35.081554;106.542075,35.082411;106.541999,35.08327;106.542204,35.0839;106.543521,35.085049;106.545607,35.085453;106.547685,35.085972;106.55019,35.086719;106.556365,35.089596;106.558939,35.090171;106.560333,35.089891;106.561239,35.089091;106.563617,35.086456;106.565437,35.084051;106.567044,35.082395;106.567326,35.081758;106.568233,35.080788;106.569559,35.079641;106.570954,35.078951;106.572417,35.079188;106.573248,35.080506;106.573034,35.08108;106.571914,35.082853;106.571701,35.083427;106.571563,35.084061;106.571487,35.085379;106.571624,35.08618;106.571967,35.086924;106.573843,35.088762;106.574742,35.089113;106.575855,35.08934;106.576976,35.089118;106.579972,35.087695;106.583037,35.087066;106.583893,35.087357;106.588004,35.085814;106.591895,35.08326;106.596323,35.080247;106.600491,35.078379;106.604956,35.077195;106.610812,35.075775;106.612316,35.075764;106.613211,35.074204;106.613356,35.073179;106.613845,35.072369;106.614471,35.071574;106.615381,35.071114;106.616358,35.071575;106.617963,35.072439;106.618933,35.072733;106.61943,35.072222;106.62116,35.07144;106.622433,35.070506;106.624244,35.071036;106.624244,35.072128;106.624167,35.07304;106.625215,35.073562;106.627867,35.073112;106.630803,35.072489;106.633532,35.07205;106.635902,35.071651;106.640092,35.071501;106.640865,35.071736;106.642815,35.072486;106.643863,35.073008;106.643863,35.073928;106.643787,35.074549;106.643504,35.075295;106.643228,35.076153;106.643083,35.077131;106.643428,35.077876;106.646219,35.078465;106.64755,35.078413;106.647897,35.078368;106.648021,35.078352;106.648548,35.078238;106.648711,35.078204;106.648866,35.078155;106.64893,35.078162;106.648994,35.078087;106.649157,35.07797;106.649335,35.077861;106.649539,35.077767;106.649748,35.077692;106.650001,35.077624;106.650209,35.077591;106.650398,35.077564;106.650561,35.077531;106.650655,35.077497;106.650765,35.077448;106.650852,35.077384;106.650954,35.077301;106.651121,35.07712;106.651334,35.076888;106.651504,35.076684;106.651573,35.076624;106.651671,35.076564;106.651792,35.076526;106.651879,35.076511;106.651989,35.076511;106.652129,35.076538;106.652242,35.07658;106.652363,35.076644;106.652454,35.076682;106.652537,35.076698;106.652628,35.076682;106.652711,35.076644;106.652783,35.076588;106.652844,35.076498;106.652882,35.076407;106.652919,35.076256;106.652961,35.076158;106.653014,35.076098;106.653093,35.076041;106.653203,35.076003;106.653294,35.075984;106.653413,35.075987;106.653508,35.076006;106.653716,35.076082;106.653791,35.076108;106.653905,35.076135;106.654033,35.076154;106.654136,35.076166;106.654321,35.076173;106.654373,35.076187;106.654419,35.0762;106.654574,35.076268;106.654703,35.07634;106.654832,35.076389;106.654968,35.07642;106.6551,35.07642;106.655216,35.076392;106.655329,35.076339;106.655428,35.076272;106.65553,35.076189;106.655602,35.076117;106.65567,35.076011;106.6557,35.075947;106.65573,35.075823;106.65573,35.075724;106.655708,35.075607;106.655678,35.075458;106.655677,35.075452;106.655666,35.075358;106.655674,35.075249;106.655708,35.07515;106.655757,35.075086;106.655799,35.075045;106.655886,35.074984;106.655986,35.074919;106.65605,35.074839;106.656114,35.074696;106.656173,35.074587;106.656226,35.074515;106.656284,35.074467;106.656364,35.074429;106.656458,35.074416;106.656533,35.074424;106.656623,35.074451;106.656715,35.074497;106.656834,35.074582;106.656901,35.074628;106.656979,35.074666;106.65704,35.074686;106.657107,35.074691;106.657183,35.074676;106.657249,35.074651;106.6573,35.074622;106.657372,35.074576;106.657438,35.074519;106.657511,35.074441;106.657607,35.074296;106.657721,35.074106;106.657779,35.073999;106.657801,35.07392;106.657811,35.073847;106.657799,35.073746;106.657776,35.073624;106.657773,35.073609;106.657756,35.073517;106.657744,35.073389;106.657744,35.073287;106.657764,35.073174;106.657807,35.073005;106.657872,35.07284;106.657924,35.072735;106.657999,35.072622;106.658062,35.072542;106.658169,35.072431;106.658252,35.072357;106.658382,35.072257;106.658523,35.072168;106.658673,35.072089;106.658811,35.072024;106.658955,35.071971;106.658995,35.071956;106.659158,35.0719;106.659357,35.071847;106.659604,35.071794;106.659788,35.071746;106.659909,35.071708;106.660027,35.071658;106.660127,35.071592;106.660188,35.071537;106.660245,35.071467;106.660316,35.071356;106.660364,35.071249;106.66041,35.071112;106.660486,35.070825;106.660525,35.070649;106.660564,35.070528;106.660612,35.070434;106.660678,35.070347;106.660738,35.070284;106.660784,35.070241;106.660902,35.070155;106.661049,35.070078;106.661228,35.069996;106.661345,35.069929;106.66142,35.069878;106.661478,35.069816;106.661534,35.069741;106.661582,35.069668;106.661602,35.069671;106.662177,35.069759;106.663088,35.070165;106.664343,35.07161;106.664197,35.073101;106.664267,35.073842;106.664887,35.075393;106.666218,35.076606;106.667886,35.077072;106.669845,35.07685;106.670824,35.076331;106.672363,35.075713;106.673204,35.076007;106.674949,35.076585;106.676839,35.07711;106.677742,35.077514;106.679143,35.076715;106.680818,35.07672;106.682211,35.07793;106.684033,35.078628;106.687805,35.07882;106.690254,35.078827;106.692626,35.078726;106.695984,35.078911;106.698984,35.079722;106.700728,35.080423;106.702335,35.080827;106.70492,35.08084;106.706458,35.081876;106.70645,35.082903;106.70645,35.084856;106.706512,35.086525;106.707491,35.087782;106.708677,35.088994;106.710979,35.090319;106.712861,35.091071;106.714191,35.091701;106.714742,35.092966;106.714253,35.094861;106.713832,35.096869;106.713481,35.097547;106.713052,35.098124;106.712494,35.098873;106.710819,35.100471;106.711163,35.102587;106.712341,35.104599;106.714506,35.105585;106.716326,35.104328;106.717801,35.102504;106.718222,35.10198;106.719476,35.100669;106.720034,35.0985;106.720286,35.098651;106.723104,35.09978;106.729262,35.10042;106.733479,35.101304;106.737948,35.100805;106.742972,35.100304;106.747726,35.09981;106.753582,35.099066;106.759714,35.097638;106.764734,35.097131;106.769474,35.096166;106.773363,35.094982;106.777824,35.094248;106.782544,35.092365;106.786708,35.090948;106.790889,35.090218;106.795321,35.088333;106.798937,35.086917;106.801989,35.086196;106.808665,35.084745;106.812835,35.083784;106.815895,35.08329;106.819224,35.082332;106.822292,35.081608;106.825351,35.081348;106.828966,35.080389;106.834253,35.080097;106.838439,35.079817;106.842088,35.08161;106.847142,35.084075;106.848844,35.084682;106.849945,35.086043;106.852032,35.087704;106.855164,35.089536;106.856978,35.091255;106.859623,35.092057;106.863311,35.092337;106.867419,35.092106;106.87104,35.091704;106.874517,35.091766;106.878215,35.092108;106.880647,35.092855;106.883134,35.093333;106.883393,35.093096;106.884201,35.092911;106.885041,35.091127;106.886223,35.089809;106.888039,35.088662;106.890403,35.089409;106.893471,35.090733;106.898279,35.093424;106.900584,35.094514;106.901699,35.094515;106.901862,35.093889;106.901773,35.093361;106.902119,35.092911;106.903371,35.091367;106.904905,35.090278;106.908814,35.089251;106.90993,35.088098;106.910762,35.085694;106.911044,35.083569;106.910693,35.082023;106.911113,35.080656;106.91258,35.079556;106.915299,35.079044;106.920069,35.077881;106.924222,35.076024;106.930745,35.074962;106.931275,35.076059;106.930997,35.078544;106.931724,35.080879;106.932611,35.082856;106.934362,35.083254;106.937084,35.08194;106.940924,35.081607;106.942247,35.080981;106.944421,35.080122;106.945273,35.078337;106.945922,35.077362;106.946686,35.074181;106.947627,35.070902;106.947434,35.070309;106.950136,35.066897;106.952792,35.066383;106.954469,35.065302;106.958891,35.064356;106.961746,35.064177;106.964771,35.064136;106.96815,35.064779;106.981555,35.069565;106.984589,35.069799;106.987621,35.069896;106.988963,35.069741;106.990784,35.068476;106.988522,35.06547;106.985101,35.063173;106.983036,35.061269;106.983333,35.05961;106.986488,35.057913;106.990206,35.058115;106.992161,35.058351;106.994261,35.058819;106.996153,35.059046;106.997617,35.057851;106.999088,35.056415;107.002093,35.052929;107.003839,35.050416;107.005587,35.048242;107.006262,35.047717;107.006904,35.046468;107.008526,35.043965;107.009495,35.040738;107.009771,35.04006;107.010891,35.038051;107.011166,35.036161;107.010324,35.034441;107.008783,35.032197;107.008499,35.030884;107.009833,35.029332;107.012416,35.029399;107.015289,35.030097;107.018017,35.031134;107.020393,35.032572;107.022139,35.032578;107.024377,35.031607;107.026269,35.030408;107.027318,35.030014;107.028498,35.029098;107.031018,35.029104;107.032766,35.030083;107.036011,35.033105;107.03704,35.035087;107.038021,35.03554;107.038849,35.038997;107.040245,35.041045;107.041435,35.041581;107.042951,35.041697;107.04506,35.038633;107.047244,35.038602;107.049806,35.040218;107.050996,35.040753;107.052141,35.039496;107.050749,35.037586;107.050032,35.0358;107.048896,35.030715;107.048265,35.028305;107.051082,35.028036;107.05555,35.027309;107.063665,35.026772;107.06786,35.026501;107.07008,35.02602;107.073151,35.025299;107.076231,35.025498;107.080406,35.024536;107.082633,35.024054;107.085954,35.022182;107.088728,35.020774;107.090084,35.018009;107.091979,35.015233;107.094168,35.012225;107.09608,35.01014;107.097158,35.007836;107.097679,35.005307;107.097887,35.001175;107.097548,34.998196;107.096114,34.995919;107.094662,34.992494;107.093202,34.9893;107.091741,34.985645;107.090854,34.982673;107.090237,34.979467;107.089637,34.976724;107.091271,34.974867;107.092349,34.972564;107.09426,34.970019;107.09758,34.968373;107.0995,34.966288;107.101429,34.964891;107.102514,34.963273;107.103018,34.960053;107.10578,34.958184;107.109653,34.956535;107.112414,34.954892;107.115158,34.952336;107.119576,34.950217;107.124306,34.94924;107.128193,34.9485;107.132243,34.947555;107.133171,34.948393;107.133879,34.949313;107.134477,34.949317;107.135149,34.947982;107.135596,34.945838;107.136576,34.944735;107.137399,34.94476;107.137931,34.944776;107.138768,34.946216;107.139014,34.946384;107.140969,34.946036;107.144863,34.945754;107.15016,34.94637;107.15433,34.945622;107.162374,34.944133;107.164826,34.941117;107.168683,34.938996;107.172271,34.93734;107.175009,34.935006;107.177167,34.931535;107.179896,34.928284;107.180936,34.924599;107.181993,34.921141;107.183292,34.916533;107.184332,34.912392;107.185086,34.908022;107.185831,34.902967;107.187953,34.89766;107.189548,34.893277;107.191723,34.890951;107.195016,34.888154;107.197997,34.88444;107.201006,34.881643;107.206294,34.881795;107.209153,34.882739;107.209256,34.882536;107.210091,34.882268;107.210534,34.881874;107.210509,34.880423;107.210945,34.87976;107.212818,34.878284;107.213453,34.877434;107.213573,34.877459;107.214121,34.877206;107.214477,34.87728;107.215126,34.877783;107.217154,34.878206;107.221548,34.877996;107.222994,34.878138;107.224589,34.880787;107.226991,34.882091;107.22752,34.883321;107.228113,34.885784;107.229089,34.887466;107.230934,34.891837;107.231061,34.89239;107.231256,34.892538;107.231961,34.892384;107.232286,34.891317;107.232198,34.890648;107.233309,34.889545;107.234858,34.889159;107.23669,34.889013;107.239238,34.889339;107.240376,34.889224;107.241976,34.888866;107.242501,34.888627;107.2431,34.887406;107.243091,34.886306;107.242975,34.885431;107.24275,34.884704;107.243428,34.884106;107.245509,34.883417;107.245841,34.88286;107.24812,34.881577;107.249758,34.881601;107.250994,34.881426;107.251993,34.881097;107.252505,34.881163;107.252553,34.882139;107.254458,34.886546;107.254869,34.890034;107.256847,34.893092;107.257746,34.894316;107.260205,34.899067;107.260591,34.899464;107.260673,34.900374;107.261358,34.902807;107.262204,34.904155;107.262722,34.905169;107.262178,34.906571;107.262388,34.907479;107.264449,34.908109;107.266158,34.908522;107.268186,34.908439;107.26926,34.908232;107.270054,34.909704;107.270439,34.909767;107.272513,34.908735;107.275884,34.90685;107.276174,34.906528;107.277496,34.907066;107.280861,34.908858;107.281329,34.909024;107.281811,34.909692;107.282976,34.911744;107.282768,34.915644;107.28229,34.919778;107.282907,34.922524;107.283534,34.925958;107.285282,34.929607;107.286726,34.931881;107.290702,34.935277;107.295477,34.936366;107.300228,34.93654;107.304709,34.936944;107.310018,34.936884;107.315623,34.937734;107.319539,34.937917;107.322342,34.938112;107.325693,34.938072;107.32961,34.938028;107.333223,34.937068;107.337697,34.937244;107.342162,34.936505;107.346053,34.935539;107.350213,34.934112;107.352676,34.931329;107.353719,34.928105;107.355356,34.925564;107.357252,34.922788;107.359149,34.920243;107.361081,34.919071;107.363865,34.91835;107.368876,34.917825;107.371964,34.918016;107.374225,34.919594;107.376513,34.922547;107.377965,34.924593;107.381061,34.926387;107.385322,34.929545;107.389259,34.930867;107.392918,34.932423;107.397115,34.932827;107.400747,34.933005;107.404342,34.931808;107.409639,34.931504;107.41326,34.930991;107.416306,34.930486;107.418519,34.929768;107.422415,34.929249;107.426022,34.928734;107.430706,34.926135;107.43485,34.924695;107.437321,34.922825;107.439791,34.921405;107.443934,34.919733;107.448344,34.918282;107.455551,34.916789;107.459449,34.916724;107.464453,34.916865;107.467518,34.917501;107.469769,34.918151;107.474798,34.919442;107.478684,34.919373;107.482283,34.918852;107.485614,34.91856;107.488366,34.917592;107.491126,34.916398;107.49443,34.915191;107.497466,34.913991;107.500235,34.913707;107.504958,34.914084;107.510217,34.913297;107.515996,34.910671;107.520148,34.910135;107.524033,34.909834;107.528489,34.910443;107.5324,34.911293;107.534373,34.912172;107.536666,34.91534;107.537004,34.917859;107.536528,34.921769;107.536892,34.925205;107.536962,34.928187;107.537282,34.930016;107.537888,34.932526;107.541576,34.935671;107.547471,34.93809;107.551134,34.94032;107.553446,34.943949;107.554606,34.945991;107.555221,34.948736;107.555836,34.951018;107.557067,34.956046;107.557968,34.959239;107.560012,34.963333;107.562039,34.966508;107.564587,34.968531;107.569092,34.970746;107.572169,34.971385;107.575775,34.970631;107.579364,34.969195;107.583769,34.96706;107.585963,34.965416;107.58873,34.964681;107.59233,34.963476;107.594785,34.96137;107.598664,34.960163;107.603117,34.959633;107.6056,34.958677;107.610107,34.960438;107.612104,34.962474;107.616891,34.964239;107.619697,34.964653;107.623311,34.963907;107.625788,34.962725;107.629073,34.959921;107.631515,34.956904;107.633401,34.953893;107.633878,34.950443;107.633493,34.949356;107.633206,34.947233;107.632298,34.944468;107.632142,34.943454;107.631928,34.942851;107.631846,34.942303;107.632034,34.940883;107.631976,34.938381;107.63136,34.936845;107.631319,34.936332;107.630647,34.934612;107.629925,34.931289;107.629128,34.929491;107.628705,34.926732;107.627341,34.924035;107.626355,34.921212;107.625387,34.920238;107.623885,34.919438;107.624512,34.919074;107.625829,34.918954;107.628389,34.919712;107.630993,34.920076;107.633043,34.920654;107.635923,34.920332;107.637293,34.920088;107.638834,34.918939;107.639877,34.91879;107.639476,34.920844;107.638918,34.921569;107.638821,34.922098;107.638847,34.922887;107.63925,34.924393;107.639133,34.926484;107.638244,34.928239;107.638403,34.928991;107.638343,34.929536;107.637785,34.930752;107.63819,34.931194;107.638231,34.932491;107.63794,34.932731;107.637731,34.933291;107.639108,34.935246;107.640544,34.935434;107.642853,34.935455;107.643992,34.935325;107.645392,34.933968;107.647203,34.932361;107.647588,34.932123;107.648355,34.932614;107.648644,34.932977;107.650601,34.933397;107.651817,34.933331;107.652769,34.933069;107.654363,34.933546;107.655217,34.934459;107.655621,34.935299;107.656667,34.936226;107.657591,34.936219;107.65795,34.936323;107.658136,34.93791;107.658367,34.938648;107.660104,34.94114;107.661149,34.942043;107.661796,34.942481;107.663059,34.942379;107.66374,34.942553;107.664086,34.943377;107.664203,34.944393;107.664482,34.944913;107.66654,34.944323;107.66726,34.944208;107.667623,34.944696;107.667798,34.946323;107.66825,34.947805;107.66885,34.948621;107.669323,34.948735;107.670028,34.948522;107.671475,34.949066;107.672712,34.949954;107.673322,34.95076;107.674366,34.951172;107.675067,34.950973;107.675333,34.950839;107.675777,34.950167;107.675797,34.948665;107.676088,34.948195;107.676401,34.947715;107.676862,34.947443;107.677987,34.947929;107.679452,34.949011;107.681201,34.950513;107.681535,34.950909;107.683404,34.951183;107.684757,34.950782;107.686151,34.950116;107.686881,34.950055;107.687539,34.951264;107.688365,34.951727;107.69057,34.951746;107.692247,34.951279;107.693856,34.950469;107.694829,34.950233;107.696594,34.950694;107.697766,34.951294;107.698637,34.951448;107.700902,34.950916;107.703899,34.950392;107.70492,34.950541;107.705604,34.951439;107.706816,34.953918;107.707176,34.95515;107.707862,34.955463;107.708041,34.955995;107.709074,34.956877;107.709201,34.95726;107.709617,34.957392;107.709654,34.957871;107.709982,34.958776;107.710098,34.95992;107.710374,34.960932;107.710809,34.961403;107.711148,34.961496;107.711314,34.961849;107.711018,34.962142;107.71193,34.962953;107.712577,34.963171;107.713453,34.963006;107.714192,34.962277;107.714806,34.961498;107.715124,34.96057;107.715579,34.960145;107.715573,34.959958;107.715353,34.959548;107.715756,34.958177;107.716662,34.95766;107.716438,34.957109;107.716296,34.955315;107.716571,34.951595;107.716412,34.950942;107.718653,34.951052;107.723947,34.951499;107.727485,34.952342;107.730212,34.954064;107.73066,34.954249;107.734662,34.95457;107.735769,34.954526;107.740206,34.953656;107.741459,34.953577;107.7416,34.953547;107.745161,34.954734;107.749971,34.957175;107.758078,34.958184;107.763154,34.96039;107.766528,34.961477;107.772158,34.963675;107.778591,34.9647;107.784131,34.963454;107.790223,34.962194;107.79686,34.960234;107.801816,34.958306;107.804489,34.956942;107.804512,34.956927;107.804535,34.956919;107.80479,34.956788;107.802513,34.963154;107.801175,34.965234;107.799975,34.966826;107.800053,34.967022;107.801485,34.967701;107.802121,34.96827;107.802817,34.969594;107.804201,34.970942;107.805227,34.971509;107.80686,34.973599;107.807916,34.973934;107.809738,34.973959;107.81152,34.974161;107.812454,34.974529;107.813685,34.974341;107.816171,34.974436;107.818235,34.974704;107.819091,34.974615;107.819435,34.974482;107.820032,34.973776;107.819961,34.973263;107.819991,34.972416;107.819452,34.971795;107.819262,34.970051;107.818475,34.969313;107.818331,34.968922;107.818703,34.968302;107.81913,34.967858;107.819145,34.967262;107.819813,34.966464;107.820826,34.962547;107.821821,34.95794;107.822816,34.953328;107.824911,34.94847;107.827283,34.94338;107.828287,34.939231;107.829854,34.935297;107.831698,34.931364;107.832979,34.927208;107.834831,34.923728;107.837507,34.919549;107.839385,34.916987;107.842606,34.912566;107.845264,34.907925;107.846008,34.904697;107.847878,34.901676;107.84864,34.898681;107.848888,34.897778;107.849471,34.897247;107.850102,34.896251;107.850107,34.894578;107.849948,34.892754;107.849721,34.891428;107.849218,34.890986;107.848452,34.890909;107.847289,34.890124;107.846111,34.889835;107.845343,34.889429;107.844494,34.890099;107.844118,34.890721;107.844013,34.891471;107.843649,34.891629;107.843226,34.891667;107.842464,34.891289;107.841393,34.89117;107.841152,34.890943;107.84126,34.890681;107.843219,34.888944;107.843047,34.887496;107.843116,34.887266;107.843423,34.887073;107.844696,34.88685;107.84506,34.886674;107.846253,34.884008;107.846246,34.883055;107.845802,34.882496;107.844465,34.88173;107.843759,34.881552;107.843648,34.8813;107.843971,34.880957;107.844316,34.880796;107.845383,34.880564;107.845685,34.880378;107.845706,34.880279;107.844902,34.879654;107.841226,34.879067;107.840351,34.878749;107.840452,34.878419;107.841581,34.877863;107.843766,34.877731;107.8463,34.877866;107.84763,34.878219;107.848315,34.878819;107.848648,34.879428;107.850565,34.875997;107.850388,34.874603;107.851231,34.873055;107.853026,34.871222;107.853619,34.870314;107.854613,34.868264;107.85581,34.866605;107.855219,34.865676;107.854666,34.865474;107.853919,34.864977;107.853771,34.864377;107.854272,34.863714;107.854901,34.863452;107.856548,34.863364;107.857491,34.863181;107.857799,34.862834;107.857882,34.861982;107.857671,34.861114;107.85758,34.860376;107.857498,34.857189;107.857083,34.856319;107.856924,34.855014;107.855811,34.85215;107.855353,34.85048;107.855353,34.848417;107.855555,34.84739;107.855874,34.846592;107.856618,34.845699;107.857957,34.84446;107.859011,34.844294;107.865596,34.844902;107.866413,34.844559;107.866952,34.843954;107.867285,34.843342;107.867592,34.843006;107.868883,34.842851;107.870456,34.842841;107.871013,34.843012;107.872591,34.849625;107.870767,34.849565;107.870203,34.849655;107.869907,34.850114;107.870014,34.851752;107.869612,34.85243;107.868643,34.853304;107.868479,34.8539;107.868758,34.854373;107.87085,34.854859;107.871979,34.855429;107.872654,34.856356;107.873031,34.856405;107.873299,34.856164;107.872893,34.85526;107.872839,34.853111;107.873157,34.852465;107.87368,34.852018;107.874644,34.851887;107.875202,34.851564;107.875953,34.851557;107.876901,34.85192;107.877528,34.851591;107.87813,34.851534;107.879096,34.851215;107.879453,34.850679;107.879364,34.848748;107.879077,34.84804;107.879031,34.847731;107.879114,34.847447;107.880121,34.846866;107.880699,34.846154;107.880894,34.845489;107.881049,34.845302;107.880993,34.844829;107.881062,34.844147;107.882646,34.843198;107.883807,34.841754;107.884825,34.841869;107.88781,34.84245;107.89031,34.841325;107.894948,34.842038;107.898851,34.842198;107.90443,34.842781;107.908048,34.842716;107.913664,34.844451;107.919551,34.84595;107.923503,34.847719;107.927169,34.849488;107.931966,34.851698;107.933678,34.853277;107.936259,34.855525;107.940241,34.85867;107.943371,34.860912;107.945631,34.86202;107.949015,34.863345;107.951806,34.863296;107.954233,34.860272;107.954999,34.857506;107.954885,34.85361;107.95505,34.849248;107.954684,34.846041;107.953996,34.84169;107.9525,34.837814;107.951551,34.833699;107.95116,34.829577;107.950786,34.826375;107.949828,34.821572;107.951124,34.818107;107.952985,34.814865;107.953646,34.808427;107.956603,34.804482;107.959613,34.802594;107.963128,34.798409;107.967549,34.796732;107.971109,34.794377;107.97413,34.792495;107.977168,34.791528;107.980198,34.789877;107.98294,34.788455;107.98456,34.786985;107.985041,34.785317;107.985699,34.785124;107.987688,34.78498;107.990072,34.783981;107.991996,34.782801;107.994147,34.780015;107.99601,34.776771;107.996777,34.774238;107.997246,34.771016;107.998248,34.766872;107.99816,34.763661;107.997524,34.760917;107.998273,34.757696;107.998194,34.754943;107.998961,34.752639;107.999178,34.750336;108.002391,34.747048;108.008775,34.740707;108.011562,34.736008;108.015314,34.725997;108.015636,34.718047;108.015642,34.695443;108.021824,34.678306;108.018566,34.668415;108.02554,34.654312;108.024476,34.635447;108.032146,34.626637;108.008811,34.616339;108.008147,34.616288;108.006277,34.615796;108.005277,34.614877;108.003533,34.615714;108.001421,34.61619;107.999977,34.616237;107.997652,34.615563;107.996848,34.614006;107.995806,34.612595;107.995699,34.607009;107.995477,34.604885;107.994634,34.603226;107.991007,34.60043;107.989261,34.599286;107.987722,34.597513;107.986812,34.596137;107.985625,34.59408;107.985127,34.592531;107.984699,34.590644;107.984484,34.588928;107.983566,34.586811;107.982793,34.584174;107.981446,34.580114;107.980956,34.578283;107.980459,34.575884;107.980383,34.574107;107.981064,34.571651;107.982165,34.570389;107.983129,34.568153;107.984714,34.566946;107.987629,34.567172;107.988472,34.567306;107.98964,34.567468;107.990055,34.567827;107.990432,34.568369;107.990569,34.568391;107.990995,34.568239;107.991401,34.567787;107.992289,34.565567;107.993058,34.564217;107.993242,34.563729;107.993865,34.56289;107.994743,34.562119;107.994985,34.561801;107.995344,34.561569;107.995585,34.561105;107.996459,34.560291;107.996764,34.559587;107.996708,34.559141;107.996922,34.558623;107.996911,34.558339;107.997033,34.558046;107.996854,34.557095;107.99691,34.556864;107.998364,34.555405;107.998636,34.554798;107.999716,34.5536;108.000099,34.553343;108.001368,34.552908;108.002025,34.552569;108.002231,34.552425;108.002447,34.552129;108.003438,34.54958;108.005123,34.544525;108.006916,34.542649;108.007409,34.541662;108.007452,34.541115;108.007149,34.539681;108.007883,34.538332;108.008162,34.537566;108.008367,34.536674;108.00854,34.536301;108.009588,34.534829;108.009916,34.533969;108.009916,34.533336;108.009361,34.532546;108.008111,34.53137;108.005963,34.529585;108.005119,34.528719;108.004032,34.527973;108.004026,34.527802;108.004373,34.526981;108.004451,34.526584;108.004418,34.525646;108.004442,34.525135;108.005121,34.523942;108.005506,34.523603;108.005646,34.523228;108.005627,34.522802;108.005117,34.522276;108.00499,34.522221;108.004249,34.522283;108.003973,34.522181;108.003864,34.52202;108.00473,34.518137;108.004661,34.5178;108.004277,34.51756;108.004676,34.516816;108.004671,34.516052;108.003211,34.515636;108.003285,34.515285;108.002898,34.514495;108.002927,34.513998;108.003451,34.512629;108.003433,34.512141;108.003012,34.511414;108.002991,34.51084;108.002625,34.50953;108.002002,34.508907;108.001441,34.508469;108.000099,34.507738;108.000801,34.505854;108.005066,34.507167;108.005116,34.506369;108.005425,34.506223;108.005544,34.505702;108.005491,34.505162;108.005117,34.503574;108.004923,34.50316;108.004339,34.502583;108.004087,34.502627;108.003668,34.503249;108.003027,34.502937;108.003206,34.501661;108.00268,34.501386;108.000002,34.500884;107.996422,34.500667;107.996529,34.499812;107.996916,34.49889;107.996964,34.498134;107.996416,34.49809;107.996133,34.497115;107.994269,34.496549;107.994247,34.496307;107.994859,34.494429;107.995111,34.493822;107.995515,34.492849;107.996204,34.490486;107.997608,34.487208;107.998681,34.487108;107.998842,34.486998;107.998899,34.486311;107.999057,34.486153;108.001689,34.486097;108.001924,34.485125;108.005116,34.484702;108.00765,34.48473;108.007954,34.484699;108.008129,34.484579;108.008357,34.484546;108.008959,34.484641;108.009236,34.48457;108.009767,34.483734;108.010045,34.483616;108.010366,34.483648;108.012057,34.484118;108.012527,34.484036;108.012812,34.483716;108.012994,34.483291;108.015301,34.480839;108.017627,34.479105;108.016172,34.470557;108.013698,34.465175;108.011903,34.457986;108.011781,34.450414;108.014867,34.445064;108.014655,34.444157;108.013132,34.442312;108.01203,34.441164;108.011203,34.439951;108.010927,34.438864;108.011073,34.437378;108.011432,34.435896;108.011853,34.434634;108.012619,34.433264;108.013522,34.432708;108.015527,34.432553;108.017617,34.432383;108.018855,34.431467;108.019844,34.430805;108.020326,34.430178;108.020816,34.429317;108.021382,34.42789;108.022989,34.424577;108.024673,34.422178;108.025349,34.421145;108.025912,34.418216;108.027644,34.412324;108.031031,34.406505;108.034818,34.39887;108.035601,34.390186;108.033449,34.379317;108.0327,34.373095;108.03391,34.366491;108.035311,34.361503;108.039053,34.354554;108.044401,34.346333;108.048179,34.346173;108.048944,34.345673;108.049709,34.344527;108.050542,34.343046;108.050894,34.341505;108.050979,34.335677;108.051979,34.329316;108.053089,34.3258;108.052663,34.324147;108.052634,34.323588;108.052199,34.323343;108.052071,34.322926;108.051712,34.322571;108.051576,34.321777;108.051244,34.321715;108.050856,34.321794;108.049784,34.322604;108.049053,34.322981;108.048307,34.323762;108.047866,34.323768;108.047531,34.323543;108.047504,34.323297;108.047661,34.32316;108.048085,34.323022;108.048629,34.322435;108.048688,34.321761;108.048996,34.321496;108.049052,34.321313;108.048912,34.321091;108.048111,34.320671;108.047469,34.319963;108.047038,34.320021;108.046484,34.320857;108.045956,34.321284;108.04552,34.321439;108.045169,34.321379;108.04501,34.321169;108.044996,34.320873;108.04515,34.320202;108.045078,34.319727;108.045145,34.319259;108.045075,34.319108;108.044852,34.319006;108.044343,34.319018;108.043967,34.319196;108.043782,34.319403;108.043483,34.320119;108.043184,34.320359;108.041701,34.320487;108.04082,34.31978;108.040346,34.318866;108.039905,34.318533;108.039387,34.318434;108.038952,34.318498;108.037937,34.319077;108.037534,34.31906;108.03721,34.318897;108.037056,34.318677;108.037021,34.318443;108.037268,34.317768;108.037249,34.317501;108.036928,34.317056;108.036745,34.316402;108.036235,34.316029;108.035868,34.315989;108.035515,34.31613;108.034978,34.316873;108.034476,34.317113;108.034209,34.317522;108.033907,34.317729;108.033484,34.317752;108.032517,34.317498;108.032242,34.317201;108.032077,34.316192;108.031779,34.315357;108.031412,34.314947;108.030898,34.314752;108.030372,34.314818;108.029688,34.315298;108.029316,34.315387;108.029021,34.315322;108.027831,34.314511;108.027269,34.314479;108.026748,34.314579;108.026561,34.314849;108.02655,34.315617;108.02629,34.316305;108.026443,34.316981;108.026357,34.317305;108.025918,34.317528;108.024578,34.317557;108.024164,34.317703;108.023845,34.317949;108.023627,34.318302;108.02368,34.318652;108.023962,34.318689;108.024814,34.31854;108.025054,34.318634;108.02518,34.318868;108.024558,34.319563;108.023663,34.319451;108.023201,34.319637;108.023061,34.319894;108.023328,34.320331;108.023343,34.32061;108.022879,34.321209;108.022638,34.321351;108.022464,34.321313;108.021783,34.320808;108.021263,34.320693;108.018734,34.320741;108.01765,34.320952;108.016617,34.321285;108.016225,34.321295;108.0161,34.321218;108.016069,34.321076;108.016289,34.319882;108.016179,34.319688;108.016017,34.319613;108.014749,34.319894;108.013252,34.3198;108.012305,34.320523;108.012032,34.320602;108.011666,34.320573;108.011295,34.320278;108.011327,34.319886;108.011911,34.319146;108.012303,34.318444;108.013125,34.317887;108.013192,34.317639;108.013116,34.317436;108.012887,34.317233;108.012619,34.317171;108.011541,34.317296;108.010709,34.316783;108.010027,34.316941;108.009357,34.316897;108.009099,34.317025;108.00846,34.317901;108.008008,34.318334;108.007867,34.31918;108.007625,34.319527;108.007085,34.319896;108.006493,34.320162;108.006271,34.320232;108.00585,34.320155;108.005451,34.320322;108.005353,34.320633;108.005526,34.321478;108.005421,34.321867;108.005232,34.322122;108.005055,34.322166;108.004373,34.321978;108.0038,34.322105;108.003456,34.322346;108.003371,34.322545;108.003466,34.322716;108.004199,34.32309;108.004388,34.323331;108.004439,34.323771;108.004288,34.324253;108.003669,34.325009;108.002824,34.325346;108.002141,34.326514;108.00196,34.327165;108.001694,34.327614;108.001438,34.32779;108.000673,34.328068;107.999343,34.329196;107.998883,34.329762;107.998747,34.330098;107.998758,34.330424;107.999209,34.331322;107.999241,34.331915;107.99943,34.332329;107.999483,34.332719;107.999044,34.333585;107.998432,34.333771;107.998095,34.333674;107.997605,34.333353;107.997174,34.333312;107.997147,34.333071;107.997426,34.33269;107.997249,34.332458;107.996796,34.332469;107.996041,34.332881;107.995769,34.332876;107.995459,34.332739;107.995118,34.332425;107.99457,34.331664;107.99399,34.330644;107.994043,34.329932;107.993877,34.329534;107.993871,34.329269;107.994466,34.327404;107.994607,34.326776;107.994748,34.326526;107.994506,34.32581;107.995406,34.325285;107.995621,34.324954;107.995719,34.324475;107.995736,34.323733;107.995801,34.323622;107.996411,34.323307;107.99677,34.322976;107.996865,34.322669;107.996794,34.322488;107.997274,34.322118;107.997448,34.321667;107.997438,34.321137;107.99714,34.320511;107.996001,34.319196;107.995184,34.318121;107.994709,34.317872;107.994225,34.317737;107.993056,34.317699;107.99238,34.317391;107.990468,34.316245;107.990045,34.315705;107.989954,34.315271;107.989714,34.314808;107.988725,34.314217;107.987998,34.313533;107.987868,34.313485;107.98771,34.313594;107.987589,34.314072;107.987358,34.314222;107.986889,34.314149;107.986513,34.314232;107.986481,34.314688;107.985938,34.315014;107.984235,34.315019;107.983857,34.314852;107.983355,34.314836;107.983253,34.31494;107.983127,34.315451;107.983274,34.316457;107.983195,34.31724;107.98298,34.318082;107.982664,34.318336;107.982249,34.31839;107.98057,34.317756;107.979573,34.317613;107.97833,34.317639;107.976364,34.318427;107.974993,34.319112;107.974009,34.319766;107.970068,34.322678;107.969391,34.322984;107.968928,34.323044;107.968347,34.322974;107.968232,34.322928;107.966146,34.322075;107.965296,34.321929;107.964164,34.321485;107.961454,34.321171;107.9599,34.321263;107.956881,34.322142;107.955489,34.322236;107.954762,34.322169;107.95394,34.321995;107.953757,34.321828;107.953179,34.320073;107.9523,34.316794;107.951482,34.316742;107.950701,34.310565;107.950592,34.310037;107.950113,34.30852;107.947763,34.308312;107.947654,34.306029;107.947744,34.304923;107.945976,34.304672;107.946219,34.300499;107.949341,34.298965;107.950199,34.298396;107.950494,34.296799;107.950801,34.294083;107.951593,34.293794;107.951485,34.292072;107.951065,34.289826;107.950804,34.287813;107.950912,34.287627;107.952164,34.287493;107.953519,34.287495;107.954128,34.289155;107.954375,34.289452;107.954896,34.289566;107.956781,34.289608;107.957427,34.289511;107.957667,34.289184;107.957679,34.288861;107.957548,34.288624;107.957181,34.288578;107.957052,34.288427;107.957124,34.288061;107.957494,34.287522;107.957658,34.287467;107.957847,34.287566;107.957983,34.287782;107.958259,34.2889;107.958555,34.289514;107.958809,34.289571;107.958945,34.289517;107.959275,34.288053;107.959172,34.284921;107.959355,34.28474;107.959929,34.284602;107.961331,34.284529;107.963772,34.284758;107.964022,34.284981;107.964247,34.285318;107.964465,34.285855;107.964502,34.286479;107.964234,34.287514;107.964232,34.287855;107.966796,34.287914;107.966957,34.286705;107.968277,34.286488;107.968624,34.284194;107.968923,34.282716;107.969259,34.282292;107.969994,34.282151;107.970587,34.281898;107.972519,34.280706;107.972607,34.28037;107.972632,34.278924;107.972822,34.278672;107.973107,34.278561;107.973426,34.278699;107.973599,34.279017;107.97366,34.279982;107.97379,34.280149;107.974185,34.280317;107.975471,34.280474;107.975513,34.282728;107.97609,34.282652;107.976174,34.280761;107.976545,34.280648;107.976671,34.280731;107.97673,34.281582;107.977183,34.281655;107.977243,34.28053;107.977695,34.280552;107.977593,34.281822;107.978168,34.281842;107.978336,34.280581;107.978144,34.278847;107.978067,34.278733;107.977467,34.278297;107.977532,34.277346;107.977371,34.276895;107.976667,34.275886;107.97809,34.275844;107.977879,34.275108;107.974089,34.275478;107.974164,34.273131;107.97362,34.273032;107.973636,34.271599;107.97362,34.270195;107.973621,34.268867;107.974643,34.268743;107.975665,34.268182;107.979643,34.2677;107.981533,34.267622;107.981893,34.268394;107.982559,34.268326;107.982582,34.26764;107.988865,34.267131;107.988885,34.26621;107.995122,34.265623;107.995703,34.263628;107.995068,34.263628;107.995126,34.262646;107.995646,34.262646;107.995761,34.261607;107.998187,34.261433;107.998245,34.259931;107.995992,34.259931;107.99605,34.258834;107.993855,34.258834;107.993682,34.257447;107.99114,34.25739;107.991024,34.256292;107.989927,34.256119;107.989465,34.253577;107.989118,34.249938;107.989869,34.249938;107.989869,34.247628;107.991602,34.248205;107.992064,34.240869;107.991198,34.240811;107.990191,34.222127;107.992526,34.221447;107.995391,34.221709;107.998074,34.223397;108.002855,34.224115;108.004352,34.223276;108.007473,34.223055;108.009781,34.223442;108.011922,34.223582;108.013873,34.223443;108.014884,34.223446;108.01705,34.224173;108.019506,34.225261;108.02171,34.225766;108.022437,34.225966;108.023142,34.226385;108.024067,34.227134;108.024882,34.227884;108.025829,34.228172;108.027944,34.228156;108.029424,34.223459;108.030129,34.220956;108.030556,34.218497;108.030651,34.216883;108.031087,34.216339;108.032689,34.215393;108.034194,34.214292;108.03503,34.213174;108.035091,34.211387;108.03288,34.209855;108.030947,34.209363;108.030024,34.208601;108.029641,34.207361;108.029362,34.205044;108.029162,34.203441;108.028474,34.201036;108.027594,34.198454;108.026767,34.196958;108.025121,34.194607;108.024224,34.193053;108.023545,34.191501;108.023066,34.190019;108.022926,34.18841;108.022944,34.188256;108.025051,34.183277;108.024702,34.180472;108.023134,34.177148;108.020095,34.177072;108.018397,34.176678;108.017091,34.175257;108.01669,34.172566;108.016089,34.171208;108.014931,34.167876;108.014312,34.165986;108.013763,34.164554;108.012901,34.16288;108.011412,34.161024;108.008703,34.159103;108.005245,34.157017;108.004505,34.157308;108.003051,34.155734;108.001909,34.152273;108.002275,34.147626;108.001848,34.14769;108.000141,34.147374;107.999444,34.146982;107.997955,34.147001;107.998756,34.144129;107.999575,34.142293;108.000942,34.140769;108.001569,34.139649;108.001595,34.134126;108.000889,34.130315;107.999992,34.129092;107.999861,34.128829;108.000035,34.121647;108.001306,34.118242;108.000357,34.116948;107.998946,34.115164;107.997465,34.112939;107.997509,34.111695;107.998362,34.110091;107.99932,34.108379;107.999581,34.107125;108.000339,34.106613;108.001035,34.105612;108.001384,34.104923;108.001349,34.104799;108.0006,34.105203;107.999642,34.105786;107.999746,34.103993;108.00107,34.103956;108.000573,34.100462;107.997551,34.09929;107.995783,34.097633;107.994912,34.096594;107.993867,34.094937;107.991855,34.092878;107.990601,34.09145;107.989356,34.089842;107.987893,34.087555;107.98636,34.08579;107.985184,34.084586;107.983033,34.082579;107.979638,34.079721;107.978053,34.078638;107.977557,34.078196;107.976947,34.075952;107.976503,34.075046;107.97316,34.075035;107.971942,34.075433;107.971585,34.075054;107.971193,34.074005;107.971323,34.072466;107.971663,34.070281;107.971872,34.068916;107.971828,34.066635;107.972585,34.062163;107.972585,34.062107;107.971671,34.06039;107.970287,34.058669;107.967867,34.057244;107.966622,34.056728;107.960435,34.0527;107.956998,34.050403;107.956589,34.04878;107.956241,34.047303;107.95471,34.045588;107.952718,34.045074;107.950369,34.044503;107.947125,34.044049;107.945056,34.04405;107.943056,34.042337;107.943316,34.040503;107.943447,34.038156;107.943707,34.035817;107.942942,34.033984;107.941699,34.031987;107.941133,34.029297;107.94016,34.027064;107.940281,34.024769;107.941924,34.022139;107.94295,34.020252;107.943219,34.018703;107.94321,34.016018;107.942715,34.013957;107.942367,34.012467;107.941801,34.010353;107.941654,34.007726;107.941923,34.006116;107.943157,34.004169;107.944044,34.002627;107.944731,34.001252;107.946731,33.998514;107.947817,33.997235;107.948226,33.996092;107.948296,33.995349;107.948418,33.994149;107.948617,33.993169;107.948687,33.992196;107.948052,33.991119;107.947704,33.990028;107.949417,33.988247;107.949939,33.985961;107.949869,33.985383;107.949382,33.984991;107.948695,33.984652;107.948078,33.984305;107.947104,33.984019;107.94559,33.983687;107.944217,33.983528;107.94173,33.983014;107.939948,33.983024;107.937949,33.98298;107.936784,33.983148;107.936028,33.983212;107.935202,33.983384;107.934385,33.983566;107.933281,33.983968;107.932386,33.98426;107.9313,33.984554;107.930336,33.984729;107.928824,33.984906;107.926765,33.984973;107.925384,33.984976;107.924498,33.984979;107.923803,33.984816;107.922908,33.984473;107.922083,33.984366;107.920641,33.984261;107.919816,33.98449;107.916943,33.985478;107.915631,33.986116;107.914755,33.987783;107.913869,33.988811;107.913262,33.989503;107.912646,33.990311;107.912446,33.990766;107.912177,33.992078;107.911569,33.993399;107.911031,33.995007;107.910458,33.996132;107.909886,33.997026;107.909174,33.998033;107.908809,33.998602;107.908211,33.999277;107.907837,33.999567;107.905321,33.999867;107.901772,33.999969;107.897747,33.999398;107.896299,33.999077;107.891754,33.998656;107.890644,33.99801;107.889361,33.996871;107.887878,33.995904;107.887193,33.995553;107.885833,33.994977;107.883986,33.994649;107.882616,33.994598;107.881585,33.994551;107.880285,33.994622;107.877598,33.993891;107.87622,33.992922;107.873473,33.991515;107.871818,33.990608;107.870579,33.989928;107.868716,33.988687;107.867209,33.987432;107.864653,33.98528;107.863276,33.984366;107.862652,33.983397;107.86189,33.981805;107.86085,33.980094;107.860166,33.979872;107.858988,33.97828;107.858295,33.977596;107.857472,33.977204;107.85658,33.976865;107.85548,33.976704;107.853973,33.976476;107.852397,33.975921;107.850336,33.975306;107.848007,33.9752;107.846569,33.975157;107.845331,33.975344;107.844378,33.975402;107.843625,33.975583;107.842811,33.975928;107.842058,33.976504;107.840967,33.977316;107.840075,33.978414;107.839331,33.979268;107.838725,33.980301;107.837971,33.981339;107.83682,33.982375;107.836136,33.982663;107.835244,33.983021;107.833876,33.98337;107.832448,33.983718;107.831209,33.984248;107.830456,33.984588;107.829919,33.985229;107.829642,33.985972;107.828906,33.987578;107.828292,33.988896;107.827201,33.990105;107.825019,33.991097;107.823581,33.991564;107.82146,33.992321;107.819786,33.992887;107.818355,33.993153;107.817914,33.993348;107.817152,33.993976;107.815966,33.994365;107.813022,33.99466;107.811339,33.994754;107.810686,33.995053;107.810293,33.995043;107.809622,33.994656;107.809288,33.994337;107.80871,33.993524;107.807652,33.992722;107.8059,33.991708;107.80548,33.99131;107.804885,33.991064;107.804394,33.99061;107.802249,33.989324;107.801935,33.988899;107.801797,33.988582;107.801083,33.986251;107.800752,33.98568;107.800164,33.985108;107.79993,33.984966;107.79773,33.9848;107.794618,33.984886";
var arr = s.split(";");
var jsonArr = [];
arr.forEach(function (item) {
  var a = {};
  a.longitude = parseFloat(item.split(",")[0]);
  a.latitude = parseFloat(item.split(",")[1]);
  jsonArr.push(a);
});var _default =
jsonArr;

// let polylines = [{
// 	points: [{
// 			latitude: 33.984886,
// 			longitude: 107.794618
// 		},
// 		{
// 			latitude: 33.984268,
// 			longitude: 107.792634
// 		},
// 		{
// 			latitude: 33.808283,
// 			longitude: 107.67944
// 		},
// 		{
// 			latitude: 34.35454,
// 			longitude: 107.38745
// 		}
// 	],
// 	// arrowLine: true,
// 	// dottedLine: true,
// 	// arrowIconPath: "/static/images/2btn_loc/btn_loc3.png",
// 	width: 2,
// 	color: "#FF0000"
// }];
// export default polylines
exports.default = _default;

/***/ })

}]);
//# sourceMappingURL=../../.sourcemap/mp-weixin/common/vendor.js.map