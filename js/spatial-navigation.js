/**
 * 
 * spatial-navigation
 * 
 * @name spatial-navigation
 * @version 0.4.7
 * ---
 * @author falsandtru https://github.com/falsandtru/spatial-navigation
 * @copyright 2015, falsandtru
 * @license MIT
 * 
 */

!new function(NAME, VERSION) {
"use strict";
(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/**
 * 
 * lazychain
 * 
 * @name lazychain
 * @version 0.3.0-alpha.23
 * ---
 * @author falsandtru https://github.com/falsandtru/lazychain
 * @copyright 2015, falsandtru
 * @license MIT
 * 
 */

!new function(NAME, VERSION) {
"use strict";
var LIBRALY;
(function (LIBRALY) {
    var FUNCTION;
    (function (FUNCTION) {
        FUNCTION.args2array = function (args) {
            var len = args.length;
            var array = Array(len);
            for (var i = 0; i < len; i++) {
                array[i] = args[i];
            }
            return array;
        };
    })(FUNCTION = LIBRALY.FUNCTION || (LIBRALY.FUNCTION = {}));
})(LIBRALY || (LIBRALY = {}));
var LIBRALY;
(function (LIBRALY) {
    var FUNCTION;
    (function (FUNCTION) {
        function apply(f, c, ps) {
            var functional = c === void 0;
            switch (ps.length) {
                case 0:
                    return functional
                        ? f()
                        : f.call(c);
                case 1:
                    return functional
                        ? f(ps[0])
                        : f.call(c, ps[0]);
                case 2:
                    return functional
                        ? f(ps[0], ps[1])
                        : f.call(c, ps[0], ps[1]);
                case 3:
                    return functional
                        ? f(ps[0], ps[1], ps[2])
                        : f.call(c, ps[0], ps[1], ps[2]);
                case 4:
                    return functional
                        ? f(ps[0], ps[1], ps[2], ps[3])
                        : f.call(c, ps[0], ps[1], ps[2], ps[3]);
                case 5:
                    return functional
                        ? f(ps[0], ps[1], ps[2], ps[3], ps[4])
                        : f.call(c, ps[0], ps[1], ps[2], ps[3], ps[4]);
                case 6:
                    return functional
                        ? f(ps[0], ps[1], ps[2], ps[3], ps[4], ps[5])
                        : f.call(c, ps[0], ps[1], ps[2], ps[3], ps[4], ps[5]);
                case 7:
                    return functional
                        ? f(ps[0], ps[1], ps[2], ps[3], ps[4], ps[5], ps[6])
                        : f.call(c, ps[0], ps[1], ps[2], ps[3], ps[4], ps[5], ps[6]);
                case 8:
                    return functional
                        ? f(ps[0], ps[1], ps[2], ps[3], ps[4], ps[5], ps[6], ps[7])
                        : f.call(c, ps[0], ps[1], ps[2], ps[3], ps[4], ps[5], ps[6], ps[7]);
                case 9:
                    return functional
                        ? f(ps[0], ps[1], ps[2], ps[3], ps[4], ps[5], ps[6], ps[7], ps[8])
                        : f.call(c, ps[0], ps[1], ps[2], ps[3], ps[4], ps[5], ps[6], ps[7], ps[8]);
                default:
                    return f.apply(c, ps);
            }
        }
        FUNCTION.apply = apply;
        ;
    })(FUNCTION = LIBRALY.FUNCTION || (LIBRALY.FUNCTION = {}));
})(LIBRALY || (LIBRALY = {}));
var LIBRALY;
(function (LIBRALY) {
    var UTILITY;
    (function (UTILITY) {
        function duff(loop, proc) {
            /* tslint:disable:no-duplicate-variable */
            if (loop < 0) {
                var i = -loop, r = i % 8;
                while (r--) {
                    proc(--i);
                }
                while (i) {
                    proc(--i);
                    proc(--i);
                    proc(--i);
                    proc(--i);
                    proc(--i);
                    proc(--i);
                    proc(--i);
                    proc(--i);
                }
            }
            else {
                var l = loop, i = 0, r = l % 8, q = l / 8 ^ 0;
                while (r--) {
                    proc(i++);
                }
                while (q--) {
                    proc(i++);
                    proc(i++);
                    proc(i++);
                    proc(i++);
                    proc(i++);
                    proc(i++);
                    proc(i++);
                    proc(i++);
                }
            }
        }
        UTILITY.duff = duff;
        function duffbk(loop, proc) {
            /* tslint:disable:no-duplicate-variable */
            if (loop < 0) {
                var i = -loop, r = i % 8;
                while (r--) {
                    if (false === proc(--i)) {
                        return;
                    }
                }
                while (i) {
                    if (false === proc(--i)) {
                        return;
                    }
                    if (false === proc(--i)) {
                        return;
                    }
                    if (false === proc(--i)) {
                        return;
                    }
                    if (false === proc(--i)) {
                        return;
                    }
                    if (false === proc(--i)) {
                        return;
                    }
                    if (false === proc(--i)) {
                        return;
                    }
                    if (false === proc(--i)) {
                        return;
                    }
                    if (false === proc(--i)) {
                        return;
                    }
                }
            }
            else {
                var l = loop, i = 0, r = l % 8, q = l / 8 ^ 0;
                while (r--) {
                    if (false === proc(i++)) {
                        return;
                    }
                }
                while (q--) {
                    if (false === proc(i++)) {
                        return;
                    }
                    if (false === proc(i++)) {
                        return;
                    }
                    if (false === proc(i++)) {
                        return;
                    }
                    if (false === proc(i++)) {
                        return;
                    }
                    if (false === proc(i++)) {
                        return;
                    }
                    if (false === proc(i++)) {
                        return;
                    }
                    if (false === proc(i++)) {
                        return;
                    }
                    if (false === proc(i++)) {
                        return;
                    }
                }
            }
        }
        UTILITY.duffbk = duffbk;
    })(UTILITY = LIBRALY.UTILITY || (LIBRALY.UTILITY = {}));
})(LIBRALY || (LIBRALY = {}));
/// <reference path="duff.ts"/>
var LIBRALY;
(function (LIBRALY) {
    var UTILITY;
    (function (UTILITY) {
        var duff = UTILITY.duff;
        function repeat(arg, size) {
            /* tslint:disable:no-duplicate-variable */
            switch (true) {
                case typeof arg === 'string':
                    var text = arg;
                    return Array(size + 1).join(text);
                case arg instanceof Array:
                    var len = arg.length;
                    if (size < 300) {
                        var arr = Array(size);
                        duff(-size, function (i) { return arr[i] = arg[i % len]; });
                    }
                    else {
                        var arr = arg.slice();
                        while (arr.length * 2 <= size) {
                            arr = arr.concat(arr);
                        }
                        arr = arr.concat(arr.slice(0, size - arr.length));
                    }
                    return arr;
            }
        }
        UTILITY.repeat = repeat;
    })(UTILITY = LIBRALY.UTILITY || (LIBRALY.UTILITY = {}));
})(LIBRALY || (LIBRALY = {}));
/// <reference path="repeat.ts"/>
var LIBRALY;
(function (LIBRALY) {
    var TYPE;
    (function (TYPE) {
        var REPEAT = LIBRALY.UTILITY.repeat;
        TYPE.id = (function () {
            var id = {};
            return {
                rest: function () { return id; }
            };
        })();
        TYPE.type = (function () {
            var TYPES = {}, toString = TYPES.toString;
            'Boolean Number String Function Array Date RegExp Object Error'.split(/\s+/)
                .forEach(function (v, i) { return TYPES['[object ' + v + ']'] = v.toLowerCase(); });
            return type;
            function type(target, pattern, cut, depth) {
                switch (typeof pattern) {
                    case 'undefined':
                        if (target === null) {
                            return null + '';
                        }
                        var tgttypeof = typeof target;
                        switch (tgttypeof) {
                            case 'object':
                                return target instanceof Array
                                    ? 'array'
                                    : TYPES[toString.call(target)] || 'object';
                            case 'function':
                                switch (target) {
                                    case Boolean:
                                    case Number:
                                    case String:
                                    case Function:
                                    case Array:
                                    case Date:
                                    case RegExp:
                                    case Object:
                                    case Error:
                                        return 'function';
                                }
                                return TYPES[toString.call(target)] || 'object';
                        }
                        return tgttypeof;
                    case 'string':
                        var tgttype = type(target);
                        return pattern === tgttype || pattern.length > tgttype.length + 5 && pattern.indexOf(tgttype) > -1;
                    default:
                        return compare(target, pattern, cut, depth);
                }
            }
        })();
        var compare = (function () {
            var MAX_DEPTH = 9;
            var rfname = /function\s*([^(]*)/;
            return pattern;
            function pattern(args, patterns, cut, depth, rest, acc) {
                if (cut === void 0) { cut = 0; }
                if (depth === void 0) { depth = MAX_DEPTH; }
                if (rest === void 0) { rest = false; }
                if (acc === void 0) { acc = []; }
                if (0 > depth) {
                    return false;
                }
                if (patterns.length > 1 && patterns[patterns.length - 1] === TYPE.id.rest()) {
                    return compare(args, clone(patterns, 0, -1), cut, depth, true, acc);
                }
                if (acc.length === 0) {
                    // 末尾のundefinedを削除
                    args = compact(args, patterns);
                }
                if (rest && patterns.length < args.length) {
                    patterns = expand(args, patterns);
                }
                if (args.length !== patterns.length) {
                    return false;
                }
                for (var i = args.length; i--;) {
                    var arg = args[i], pat = patterns[i];
                    switch (TYPE.type(pat)) {
                        case 'undefined':
                            // すべてに一致
                            continue;
                        case 'null':
                            // nullまたはundefined
                            if (null === arg || void 0 === arg) {
                                continue;
                            }
                            return false;
                        case 'boolean':
                        case 'string':
                            // 値を比較
                            if (pat === arg) {
                                continue;
                            }
                            return false;
                        case 'number':
                            // 値を比較
                            if (pat === arg || TYPE.type(arg, 'number') && isNaN(arg) && isNaN(pat)) {
                                continue;
                            }
                            return false;
                        case 'date':
                            // 値を比較
                            if (TYPE.type(arg, 'date') && arg.getUTCMilliseconds() === pat.getUTCMilliseconds()) {
                                continue;
                            }
                            return false;
                        case 'array':
                            // パターン値が1要素のときは1要素以上の配列としてパターンマッチ
                            // それ以外の場合はタプルとしてパターンマッチ
                            if (acc.length && ~acc.indexOf(arg)) {
                                if (arg === pat) {
                                    continue;
                                }
                                else {
                                    return false;
                                }
                            }
                            else if (arg === pat
                                || TYPE.type(arg, 'array') && compareArray(arg, pat, cut, depth - 1, acc.length === 0 ? [arg] : acc.concat([arg]))) {
                                continue;
                            }
                            return false;
                        case 'object':
                            // 列挙可能な値を比較
                            if (acc.length && ~acc.indexOf(arg)) {
                                if (arg === pat) {
                                    continue;
                                }
                                else {
                                    return false;
                                }
                            }
                            else if (arg === pat
                                || TYPE.type(arg, 'object') && compareObject(arg, pat, cut, depth - 1, acc.length === 0 ? [arg] : acc.concat([arg]))) {
                                continue;
                            }
                            return false;
                        case 'function':
                            // 型または値を比較
                            if (arg === void 0 || arg === null || TYPE.type(arg, 'number') && isNaN(arg)) {
                                return false;
                            }
                            switch (pat) {
                                case Boolean:
                                    if (TYPE.type(arg, 'boolean')) {
                                        continue;
                                    }
                                    return false;
                                case Number:
                                    if (TYPE.type(arg, 'number')) {
                                        continue;
                                    }
                                    return false;
                                case String:
                                    if (TYPE.type(arg, 'string')) {
                                        continue;
                                    }
                                    return false;
                                case Date:
                                    if (TYPE.type(arg, 'date')) {
                                        continue;
                                    }
                                    return false;
                                case Array:
                                    if (TYPE.type(arg, 'array')) {
                                        continue;
                                    }
                                    return false;
                                case Object:
                                    if (TYPE.type(arg, 'object')) {
                                        continue;
                                    }
                                    return false;
                                case RegExp:
                                    if (TYPE.type(arg, 'regexp')) {
                                        continue;
                                    }
                                    return false;
                                case Function:
                                    if (TYPE.type(arg, 'function')) {
                                        continue;
                                    }
                                    return false;
                                default:
                                    if (arg instanceof pat) {
                                        continue;
                                    }
                                    return false;
                            }
                        case 'error':
                            // 型とメッセージを比較
                            if (void 0 !== arg && null !== arg && pat.constructor === arg.constructor && pat.name === arg.name && pat.message === arg.message) {
                                continue;
                            }
                            return false;
                        case 'regexp':
                            // 値を比較
                            if (void 0 !== arg && null !== arg && pat.constructor === arg.constructor && pat.source === arg.source &&
                                pat.global === arg.global && pat.ignoreCase === arg.ignoreCase && pat.multiline === arg.multiline) {
                                continue;
                            }
                            return false;
                        default:
                            throw new Error('Undefined pattern.');
                    }
                }
                return true;
            }
            function clone(arr, begin, end) {
                if (begin === void 0) { begin = 0; }
                if (end === void 0) { end = Infinity; }
                if (end < 0) {
                    return clone(arr, begin, arr.length + end);
                }
                if (begin < 0) {
                    return clone(arr, arr.length + begin, end);
                }
                var args_ = [];
                for (var _i = end > arr.length ? arr.length - 1 : end - 1; _i >= begin; _i--) {
                    args_[_i - begin] = arr[_i];
                }
                return args_;
            }
            function compact(args, patterns) {
                if (args.length <= patterns.length) {
                    return args;
                }
                for (var i = args.length; i-- && i + 1 > patterns.length && void 0 === args[i];) {
                    continue;
                }
                return i + 1 === args.length ? args : clone(args, 0, i + 1);
            }
            function expand(args, patterns) {
                if (args.length <= patterns.length) {
                    return patterns;
                }
                return patterns.concat(REPEAT(clone(patterns, -1), args.length - patterns.length));
            }
            function isConstructor(F) {
                /* tslint:disable:no-string-literal */
                var fname = typeof F['name'] === 'string' ? F['name'] : F.toString().match(rfname).pop() + '  ';
                var fst = fname.charAt(0), snd = fname.charAt(1);
                return 'A' <= fst && fst <= 'Z' && !('A' <= snd && snd <= 'Z');
            }
            function compareArray(arg, pattern, cut, depth, acc) {
                if (arg.length < pattern.length - 1) {
                    return false;
                }
                if (pattern.length === 1 && cut > 0 && arg.length > cut * 2) {
                    arg = clone(arg, 0, cut).concat(clone(arg, -cut));
                }
                return compare(arg, pattern, cut, depth, pattern.length === 1, acc);
            }
            function compareObject(arg, pattern, cut, depth, acc) {
                /* tslint:disable:forin */
                var empty = true;
                for (var i in pattern) {
                    empty = false;
                    if (!(i in arg) || !compare([arg[i]], [pattern[i]], cut, depth, false, acc)) {
                        return false;
                    }
                }
                if (!empty) {
                    return true;
                }
                else {
                    for (var i in arg) {
                        return false;
                    }
                    return true;
                }
            }
        })();
    })(TYPE = LIBRALY.TYPE || (LIBRALY.TYPE = {}));
})(LIBRALY || (LIBRALY = {}));
/// <reference path="apply.ts"/>
/// <reference path="type.ts"/>
var LIBRALY;
(function (LIBRALY) {
    var PROMISE;
    (function (PROMISE) {
        var APPLY = LIBRALY.FUNCTION.apply;
        var TYPE = LIBRALY.TYPE.type;
        function isThenable(target) {
            return TYPE(target, 'object') && 'then' in target;
        }
        PROMISE.isThenable = isThenable;
        PROMISE.resolve = typeof Promise === 'function' ? Promise.resolve.bind(Promise)
            : function (value) { return PROMISE.deferred().resolve(value); };
        // ネイティブメソッドと異なり同期処理されなくともエラーとならず非同期に伝達される
        PROMISE.reject = function (value) { return PROMISE.deferred().reject(value); };
        // notifyサポートのためネイティブメソッドは使用しない
        PROMISE.when = function (promises) {
            if (promises.length === 0) {
                return PROMISE.deferred().resolve([]);
            }
            var dfd = PROMISE.deferred(), count = promises.length, waits = Array(count);
            for (var i = 0, len = promises.length; i < len; i++) {
                register(i, promises[i]);
            }
            return dfd.promise();
            function register(index, arg) {
                if (isThenable(arg)) {
                    arg
                        .then(function () {
                        var args = [];
                        for (var _i = 0; _i < arguments.length; _i++) {
                            args[_i - 0] = arguments[_i];
                        }
                        return done(index, args);
                    }, dfd.reject, dfd.notify);
                }
                else {
                    done(index, [arg]);
                }
            }
            function done(index, args) {
                if (count === 0 || dfd.state() !== 'pending') {
                    return;
                }
                count -= 1;
                waits[index] = args;
                if (count === 0) {
                    APPLY(dfd.resolve, void 0, waits);
                }
            }
        };
        PROMISE.deferred = (function () {
            return function (callback) {
                var statePending = 'pending', stateResolved = 'resolved', stateRejected = 'rejected', state = statePending, memoryNotify, memoryResolve, memoryReject, memoryAlways, listenerProgressCallbacks = [], listenerDoneCallbacks = [], listenerFailCallbacks = [], listenerAlwaysCallbacks = [], dfd = {
                    state: function () {
                        return state;
                    },
                    progress: function () {
                        var args = [];
                        for (var _i = 0; _i < arguments.length; _i++) {
                            args[_i - 0] = arguments[_i];
                        }
                        if (state === statePending) {
                            registerWithCall(memoryNotify, flatten(args), listenerProgressCallbacks);
                        }
                        return this;
                    },
                    done: function () {
                        var args = [];
                        for (var _i = 0; _i < arguments.length; _i++) {
                            args[_i - 0] = arguments[_i];
                        }
                        if (state === statePending || state === stateResolved) {
                            registerWithCall(memoryResolve, flatten(args), listenerDoneCallbacks);
                        }
                        return this;
                    },
                    fail: function () {
                        var args = [];
                        for (var _i = 0; _i < arguments.length; _i++) {
                            args[_i - 0] = arguments[_i];
                        }
                        if (state === statePending || state === stateRejected) {
                            registerWithCall(memoryReject, flatten(args), listenerFailCallbacks);
                        }
                        return this;
                    },
                    always: function () {
                        var args = [];
                        for (var _i = 0; _i < arguments.length; _i++) {
                            args[_i - 0] = arguments[_i];
                        }
                        registerWithCall(memoryAlways, flatten(args), listenerAlwaysCallbacks);
                        return this;
                    },
                    then: function (doneCallbacks, failCallbacks, progressCallbacks) {
                        var nextDfd = PROMISE.deferred();
                        // progress
                        if (state === statePending) {
                            cascade(memoryNotify, progressCallbacks, listenerProgressCallbacks, nextDfd.notify);
                        }
                        // done
                        if (state === statePending || state === stateResolved) {
                            cascade(memoryResolve, doneCallbacks, listenerDoneCallbacks, nextDfd.resolve);
                        }
                        // fail
                        if (state === statePending || state === stateRejected) {
                            cascade(memoryReject, failCallbacks, listenerFailCallbacks, nextDfd.reject);
                        }
                        return nextDfd.promise();
                        function cascade(memory, callbacks, listenerCallbacks, callback) {
                            callbacks &&
                                registerWithCall(memory, [function () {
                                        var args = [];
                                        for (var _i = 0; _i < arguments.length; _i++) {
                                            args[_i - 0] = arguments[_i];
                                        }
                                        var result;
                                        if (typeof callbacks === 'function') {
                                            result = APPLY(callbacks, void 0, args);
                                            if (TYPE(result, 'object') && TYPE(result.then, 'function')) {
                                                result
                                                    .then(nextDfd.notify, nextDfd.notify, nextDfd.notify);
                                            }
                                            else {
                                                callback(result);
                                            }
                                        }
                                        else {
                                            callbacks
                                                .forEach(function (f) { return APPLY(f, void 0, args); });
                                            callback();
                                        }
                                    }], listenerCallbacks);
                        }
                    },
                    promise: function () {
                        return {
                            state: dfd.state,
                            progress: dfd.progress,
                            done: dfd.done,
                            fail: dfd.fail,
                            always: dfd.always,
                            then: dfd.then
                        };
                    },
                    notify: function () {
                        var args = [];
                        for (var _i = 0; _i < arguments.length; _i++) {
                            args[_i - 0] = arguments[_i];
                        }
                        if (state === statePending) {
                            memoryNotify = args;
                            call(memoryNotify, listenerProgressCallbacks);
                        }
                        return this;
                    },
                    resolve: function () {
                        var args = [];
                        for (var _i = 0; _i < arguments.length; _i++) {
                            args[_i - 0] = arguments[_i];
                        }
                        if (state === statePending) {
                            memoryResolve = args;
                            memoryAlways = args;
                            call(args, listenerDoneCallbacks.concat(listenerAlwaysCallbacks));
                            listenerProgressCallbacks = [];
                            listenerDoneCallbacks = [];
                            listenerAlwaysCallbacks = [];
                            state = stateResolved;
                        }
                        return this;
                    },
                    reject: function () {
                        var args = [];
                        for (var _i = 0; _i < arguments.length; _i++) {
                            args[_i - 0] = arguments[_i];
                        }
                        if (state === statePending) {
                            memoryReject = args;
                            memoryAlways = args;
                            call(args, listenerFailCallbacks.concat(listenerAlwaysCallbacks));
                            listenerProgressCallbacks = [];
                            listenerFailCallbacks = [];
                            listenerAlwaysCallbacks = [];
                            state = stateRejected;
                        }
                        return this;
                    }
                };
                if (callback) {
                    callback(dfd.resolve, dfd.reject, dfd.notify);
                }
                return dfd;
                function registerWithCall(memory, callbacks, listenerCallbacks) {
                    var result;
                    for (var i = 0, len = callbacks.length; i < len; i++) {
                        var callback = callbacks[i];
                        listenerCallbacks.push(callback);
                        result = call(memory, [callback]);
                    }
                    if (state !== statePending) {
                        listenerCallbacks.splice(0, listenerCallbacks.length);
                    }
                    return result;
                }
                function call(memory, callbacks) {
                    var result;
                    for (var i = 0, len = memory ? callbacks.length : 0; i < len; i++) {
                        result = APPLY(callbacks[i], void 0, memory);
                    }
                    return result;
                }
                function flatten(arr) {
                    var acc = [];
                    if (arr instanceof Array) {
                        for (var i = arr.length; i--;) {
                            var elem = arr[i];
                            if (elem instanceof Array) {
                                acc = acc.concat(flatten(elem));
                            }
                            else {
                                acc.push(elem);
                            }
                        }
                    }
                    return acc;
                }
            };
        })();
    })(PROMISE = LIBRALY.PROMISE || (LIBRALY.PROMISE = {}));
})(LIBRALY || (LIBRALY = {}));
/// <reference path="apply.ts"/>
var LIBRALY;
(function (LIBRALY) {
    var FUNCTION;
    (function (FUNCTION) {
        FUNCTION.memoize = function (func) {
            var noarg;
            return function () {
                if (noarg === void 0) {
                    noarg = func();
                }
                return noarg;
            };
        };
    })(FUNCTION = LIBRALY.FUNCTION || (LIBRALY.FUNCTION = {}));
})(LIBRALY || (LIBRALY = {}));
var LIBRALY;
(function (LIBRALY) {
    var UUID;
    (function (UUID) {
        UUID.v4 = function () {
            // version 4
            return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
                return v.toString(16).toUpperCase();
            });
        };
    })(UUID = LIBRALY.UUID || (LIBRALY.UUID = {}));
})(LIBRALY || (LIBRALY = {}));
/// <reference path=".d/lazychain.d.ts"/>
/// <reference path="library/args2array.ts"/>
/// <reference path="library/apply.ts"/>
/// <reference path="library/type.ts"/>
/// <reference path="library/promise.ts"/>
/// <reference path="library/memoize.ts"/>
/// <reference path="library/uuid.ts"/>
var undefined;
var MODULE;
(function (MODULE) {
    MODULE.APPLY = LIBRALY.FUNCTION.apply;
    MODULE.TYPE = LIBRALY.TYPE.type;
    MODULE.PROMISE = LIBRALY.PROMISE;
    MODULE.MEMOIZE = LIBRALY.FUNCTION.memoize;
    MODULE.UUID = LIBRALY.UUID.v4;
    var ID;
    (function (ID) {
        ID.rest = LIBRALY.TYPE.id.rest;
    })(ID = MODULE.ID || (MODULE.ID = {}));
    ;
})(MODULE || (MODULE = {}));
/// <reference path="../define.ts"/>
/// <reference path="main.ts"/>
/// <reference path="../model/main.ts"/>
/* CONTROLLER */
var MODULE;
(function (MODULE) {
    var CONTROLLER;
    (function (CONTROLLER) {
        var Stream = (function () {
            function Stream(message, extensions, parent) {
                var _this = this;
                if (extensions === void 0) { extensions = []; }
                if (parent === void 0) { parent = null; }
                this.NAME = NAME;
                this.VERSION = VERSION;
                this.__LazyChain__ = {
                    extensions: null,
                    parent: null,
                    child: null,
                    deferred: null,
                    command: null,
                    monad: null,
                    transfer: function (method, args) {
                        _this.__LazyChain__.command = [method, args];
                        return _this.__LazyChain__.child = MODULE.APPLY(CONTROLLER[method], void 0, [_this].concat(args));
                    }
                };
                this.lazy = (function () {
                    var self = _this;
                    return function () {
                        var args = [];
                        for (var _i = 0; _i < arguments.length; _i++) {
                            args[_i - 0] = arguments[_i];
                        }
                        return self.__LazyChain__.transfer('lazy', args);
                    };
                })();
                this.stream = (function () {
                    var self = _this;
                    return function () {
                        var args = [];
                        for (var _i = 0; _i < arguments.length; _i++) {
                            args[_i - 0] = arguments[_i];
                        }
                        return self.__LazyChain__.transfer('stream', args);
                    };
                })();
                this.pattern = (function () {
                    var self = _this;
                    return function () {
                        var args = [];
                        for (var _i = 0; _i < arguments.length; _i++) {
                            args[_i - 0] = arguments[_i];
                        }
                        return self.__LazyChain__.transfer('pattern', args);
                    };
                })();
                this.monad = (function () {
                    var self = _this;
                    return function () {
                        var args = [];
                        for (var _i = 0; _i < arguments.length; _i++) {
                            args[_i - 0] = arguments[_i];
                        }
                        return self.__LazyChain__.transfer('monad', args);
                    };
                })();
                this.monadic = (function () {
                    var self = _this;
                    return function () {
                        var args = [];
                        for (var _i = 0; _i < arguments.length; _i++) {
                            args[_i - 0] = arguments[_i];
                        }
                        return self.__LazyChain__.transfer('monadic', args);
                    };
                })();
                this.array = (function () {
                    var self = _this;
                    return function () {
                        var result;
                        self.some(function (v, i, a) { return result = a; });
                        return result || [];
                    };
                })();
                this.prevChain = (function () {
                    var self = _this;
                    return function () {
                        return self.__LazyChain__.parent;
                    };
                })();
                this.nextChain = (function () {
                    var self = _this;
                    return function () {
                        return self.__LazyChain__.child;
                    };
                })();
                this.firstChain = (function () {
                    var self = _this;
                    return function () {
                        return self.prevChain() && self.prevChain().firstChain() || self;
                    };
                })();
                this.lastChain = (function () {
                    var self = _this;
                    return function () {
                        return self.nextChain() && self.nextChain().lastChain() || self;
                    };
                })();
                if (parent) {
                    parent.__LazyChain__.child = this;
                    this.__LazyChain__.monad = parent.__LazyChain__.monad;
                    this.__LazyChain__.extensions = parent.__LazyChain__.extensions;
                }
                this.__LazyChain__.parent = parent;
                Stream.map ||
                    CONTROLLER.extendStream_(true, Array.prototype, 0, [
                        'reverse',
                        'slice',
                        'sort',
                        'every',
                        'some',
                        'forEach',
                        'filter',
                        'map',
                        'reduce',
                        'reduceRight'
                    ]);
                CONTROLLER.mixin(this, this.__LazyChain__.deferred = MODULE.PROMISE.deferred());
                this.__LazyChain__.extensions = this.__LazyChain__.extensions || extensions;
                this.__LazyChain__.extensions
                    .forEach(function (v) { return CONTROLLER.emulate(_this, v); });
                var deferred = this.__LazyChain__.deferred;
                if (message instanceof Array) {
                    message.length && MODULE.APPLY(deferred.notify, void 0, message);
                }
                else if (message instanceof Stream) {
                    message
                        .progress(deferred.notify)
                        .done(deferred.resolve)
                        .fail(deferred.reject);
                }
                else if (MODULE.PROMISE.isThenable(message)) {
                    message
                        .then(deferred.notify, deferred.notify, deferred.notify);
                }
            }
            return Stream;
        })();
        CONTROLLER.Stream = Stream;
    })(CONTROLLER = MODULE.CONTROLLER || (MODULE.CONTROLLER = {}));
})(MODULE || (MODULE = {}));
/// <reference path="../define.ts"/>
/// <reference path="../controller/stream.ts"/>
/* MODEL */
var MODULE;
(function (MODULE) {
    var MODEL;
    (function (MODEL) {
        var Stream = MODULE.CONTROLLER.Stream;
        function connect(inbound, outbound) {
            if ('progress' in inbound && 'always' in inbound && 'notify' in outbound) {
                inbound
                    .progress(outbound.notify)
                    .always(outbound.resolve);
            }
            else {
                inbound.then(outbound.resolve, outbound.reject);
            }
            return outbound;
        }
        function cascade(stream, message) {
            if (message === void 0) { message = stream; }
            return new Stream(message, stream.__LazyChain__.extensions, stream);
        }
        MODEL.cascade = cascade;
        function clone(source, target) {
            if (!source.nextChain()) {
                return target;
            }
            target = target || new Stream(null, source.__LazyChain__.extensions);
            return clone(source.nextChain(), MODULE.APPLY(target[source.__LazyChain__.command[0]], target, source.__LazyChain__.command[1]));
        }
        function environment(env) {
            if (!MODULE.TYPE(env, 'object')) {
                return env;
            }
            return Object.create(env);
        }
        function immediate(inbound) {
            var reserve = typeof setImmediate === 'function' ? setImmediate : function (f) { return setTimeout(f, 1); };
            return inbound
                .lazy(function (_, i, a) {
                if (i > 0) {
                    return;
                }
                var dfd = LazyChain.deferred();
                reserve(function (_) { return MODULE.APPLY(dfd.resolve, void 0, a); });
                return dfd;
            });
        }
        MODEL.immediate = immediate;
        function lazy(inbound, callback, env, sequential) {
            if (typeof env === 'boolean' && sequential === void 0) {
                sequential = env;
                env = {};
            }
            env = environment(env);
            var outbound = cascade(inbound, null);
            var gendefer = callback.length === 5;
            callback && inbound.progress(proxy).always(proxy);
            return outbound;
            function proxy() {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i - 0] = arguments[_i];
                }
                return args.reduce(conv, []);
            }
            function conv(r, v, i, a) {
                var deferred;
                var result = gendefer ? callback(v, i, a, env, deferred = MODULE.PROMISE.deferred()) : callback(v, i, a, env);
                deferred = MODULE.PROMISE.isThenable(result) ? result : deferred;
                if (!deferred) {
                    return r;
                }
                else if (sequential) {
                    r.push(deferred);
                    if (i + 1 === a.length) {
                        MODULE.PROMISE.when(r)
                            .then(function () {
                            var args = [];
                            for (var _i = 0; _i < arguments.length; _i++) {
                                args[_i - 0] = arguments[_i];
                            }
                            return MODULE.APPLY(outbound.notify, void 0, args.reduce(function (r, v) { return r.concat(v); }, []));
                        }, outbound.notify, outbound.notify);
                    }
                }
                else {
                    if ('progress' in deferred && 'always' in deferred) {
                        deferred.progress(outbound.notify).always(outbound.notify);
                    }
                    else {
                        deferred.then(outbound.notify, outbound.notify, outbound.notify);
                    }
                }
                return r;
            }
        }
        MODEL.lazy = lazy;
        function buffer(inbound, clearance) {
            var scope = cascade(inbound), env = {
                prototype: true,
                buffer: [],
                sentinel: {},
                timer: 0,
                last: 0
            }, delay = clearance < 0;
            clearance = Math.abs(clearance);
            return scope.lazy(function (v, i, a, e) {
                if (!isSentinel(v)) {
                    e.buffer.push(v);
                }
                if (e.timer === 0) {
                    e.timer = setTimeout(fire, clearance);
                    e.last = Date.now();
                }
                else if (delay && !isSentinel(v)) {
                    clearTimeout(e.timer);
                    e.timer = setTimeout(fire, clearance);
                }
                else if (isElapsed(e.last) || isSentinel(v)) {
                    clearTimeout(e.timer);
                    e.timer = 0;
                    e.last = Date.now();
                    var dfd = LazyChain.deferred();
                    return MODULE.APPLY(dfd.resolve, dfd, e.buffer.splice(0, e.buffer.length));
                }
            }, env);
            function fire() {
                return scope.notify(env.sentinel);
            }
            function isElapsed(time) {
                return Date.now() - time > clearance;
            }
            function isSentinel(value) {
                return value === env.sentinel;
            }
        }
        MODEL.buffer = buffer;
        function stream(inbound, callback, env) {
            if (env === void 0) { env = {}; }
            env = environment(env);
            callback && inbound.progress(proxy).always(proxy);
            return cascade(inbound);
            function proxy() {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i - 0] = arguments[_i];
                }
                return args.forEach(function (v, i, a) { return callback(v, i, a, env); });
            }
        }
        MODEL.stream = stream;
        function branch(inbound, branches, cascade) {
            if (cascade === void 0) { cascade = true; }
            branches
                .filter(function (branch) { return MODULE.PROMISE.isThenable(branch); })
                .forEach(function (branch) { return connect(inbound, branch); });
            return cascade ? MODEL.cascade(inbound) : inbound;
        }
        MODEL.branch = branch;
        function merge(outbound, branches, cascade) {
            if (cascade === void 0) { cascade = true; }
            branches
                .filter(function (branch) { return MODULE.PROMISE.isThenable(branch); })
                .forEach(function (branch) { return connect(branch, outbound); });
            return cascade ? MODEL.cascade(outbound) : outbound;
        }
        MODEL.merge = merge;
        function compose(inbound, streams) {
            return streams.reduceRight(function (r, v) { return merge(clone(v.firstChain()).firstChain(), [r], false).lastChain(); }, inbound);
        }
        MODEL.compose = compose;
        function split(inbound, splitter, branches, env) {
            if (env === void 0) { env = {}; }
            env = environment(env);
            var outbound = cascade(inbound, null);
            var scope = cascade(inbound);
            branches = format(branches, outbound);
            scope
                .reduce(function (r, v, i, a) {
                r = i ? r : Object.create(null);
                var index = splitter.call(void 0, v, i, a, env);
                index = 'boolean' === typeof index ? +!index : index;
                if (!(index in r)) {
                    r[index] = [];
                }
                r[index].push(v);
                return r;
            }, null)
                .forEach(function (params) {
                Object.keys(params)
                    .filter(function (index) { return !!params[index].length; })
                    .forEach(function (index) {
                    var action = index in branches ? branches[index] || (function (_) { return void 0; }) : null;
                    if (typeof action === 'function') {
                        MODULE.APPLY(action, void 0, params[index]);
                    }
                    else {
                        MODULE.APPLY(action.notify, void 0, params[index]);
                    }
                });
            });
            return outbound;
            function format(branches, outbound) {
                switch (true) {
                    case !branches:
                        return [outbound, null];
                    case MODULE.PROMISE.isThenable(branches):
                        return [outbound, branches];
                    case branches instanceof Array && 1 === branches.length && !MODULE.PROMISE.isThenable(branches[0]):
                        branches[0][''] = outbound;
                        return branches[0];
                    case branches instanceof Array:
                        branches.unshift(outbound);
                        branches[1] = branches[1] || null;
                        return branches;
                }
            }
        }
        MODEL.split = split;
        function pattern(inbound, patterns) {
            var outbound = cascade(inbound, null);
            inbound
                .progress(function () {
                var params = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    params[_i - 0] = arguments[_i];
                }
                return MODULE.APPLY(outbound.notify, void 0, conv(params));
            })
                .done(function () {
                var params = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    params[_i - 0] = arguments[_i];
                }
                return MODULE.APPLY(outbound.resolve, void 0, conv(params));
            })
                .fail(function () {
                var params = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    params[_i - 0] = arguments[_i];
                }
                return MODULE.APPLY(outbound.reject, void 0, conv(params));
            });
            return outbound;
            function conv(params) {
                return params
                    .reduce(function (r, param, index) {
                    var match;
                    for (var i = 0, len = patterns.length; i < len; i++) {
                        var exp = patterns[i], etype = exp.length;
                        match = i > 0 && patterns[i][0] === patterns[i - 1][0] ? match : MODULE.TYPE([param], [exp[0]], 1);
                        if (!match) {
                            continue;
                        }
                        else if (etype === 1) {
                            r[r.length] = param;
                            return r;
                        }
                        else if (etype === 2) {
                            r[r.length] = exp[1](param);
                            return r;
                        }
                        else if (etype === 3 && exp[1](param)) {
                            r[r.length] = exp[2](param);
                            return r;
                        }
                    }
                    return r;
                }, []);
            }
        }
        MODEL.pattern = pattern;
        function castStream2Monad(s) {
            return s;
        }
        function castMonad2Stream(m) {
            return m;
        }
        function monad(inbound, monad, convert) {
            if (convert === void 0) { convert = true; }
            inbound.__LazyChain__.monad = monad;
            switch (convert) {
                case true:
                    return castStream2Monad(cascade(inbound.map(function (v) { return monad.return.call(void 0, v); })));
                case false:
                    return castStream2Monad(cascade(inbound));
                default:
                    return castStream2Monad(cascade(inbound.map(function (v) { return MODULE.TYPE([v], [convert], 1) ? monad.return.call(void 0, v) : v; })));
            }
        }
        MODEL.monad = monad;
        function monadic(inbound, patterns) {
            var outbound = castStream2Monad(cascade(castMonad2Stream(inbound), null));
            castMonad2Stream(inbound)
                .progress(function () {
                var params = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    params[_i - 0] = arguments[_i];
                }
                return MODULE.APPLY(outbound.notify, void 0, conv(params));
            })
                .done(function () {
                var params = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    params[_i - 0] = arguments[_i];
                }
                return MODULE.APPLY(outbound.resolve, void 0, conv(params));
            })
                .fail(function () {
                var params = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    params[_i - 0] = arguments[_i];
                }
                return MODULE.APPLY(outbound.reject, void 0, conv(params));
            });
            return outbound;
            function conv(params) {
                return params
                    .reduce(function (r, param, index) {
                    var match;
                    for (var i = 0, len = patterns.length; i < len; i++) {
                        var exp = patterns[i], etype = exp.length;
                        match = i > 0 && patterns[i - 1][0] === patterns[i][0] ? match : MODULE.TYPE([param], [exp[0]], 1);
                        var monad = inbound.__LazyChain__.monad;
                        if (!match) {
                            continue;
                        }
                        else if (etype === 1) {
                            r[r.length] = param;
                            return r;
                        }
                        else if (etype === 2) {
                            r[r.length] = monad.bind(param, exp[1]);
                            return r;
                        }
                        else if (etype === 3 && monad.bind(param, exp[1])) {
                            r[r.length] = monad.bind(param, exp[2]);
                            return r;
                        }
                    }
                    r[r.length] = monad.fail(param);
                    return r;
                }, []);
            }
        }
        MODEL.monadic = monadic;
        function emulator(inbound, options, method, provider, offset) {
            var outbound = inbound.__LazyChain__.child = cascade(inbound, null);
            inbound
                .progress(function () {
                var params = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    params[_i - 0] = arguments[_i];
                }
                return MODULE.APPLY(outbound.notify, void 0, conv(params));
            })
                .done(function () {
                var params = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    params[_i - 0] = arguments[_i];
                }
                return MODULE.APPLY(outbound.resolve, void 0, conv(params));
            })
                .fail(function () {
                var params = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    params[_i - 0] = arguments[_i];
                }
                return MODULE.APPLY(outbound.reject, void 0, conv(params));
            });
            return outbound;
            function conv(params) {
                var result = offset ? MODULE.APPLY(provider[method], provider, [params].concat(options))
                    : MODULE.APPLY(provider[method], params, options);
                var messages;
                switch (method) {
                    case 'every':
                    case 'some':
                        messages = result ? params : [];
                        break;
                    case 'reduce':
                    case 'reduceRight':
                        messages = [result];
                        break;
                    case 'forEach':
                        messages = [];
                        break;
                    default:
                        messages = result instanceof Array ? result : [];
                }
                return messages;
            }
        }
        MODEL.emulator = emulator;
    })(MODEL = MODULE.MODEL || (MODULE.MODEL = {}));
})(MODULE || (MODULE = {}));
/// <reference path="apply.ts"/>
var LIBRALY;
(function (LIBRALY) {
    var FUNCTION;
    (function (FUNCTION) {
        var APPLY = LIBRALY.FUNCTION.apply;
        FUNCTION.cache = function (func, size) {
            if (size === void 0) { size = 5; }
            var cache, margin, noarg;
            var map = typeof Map === 'function' ? new Map() : null, res = [];
            return function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i - 0] = arguments[_i];
                }
                var len = arguments.length;
                if (len === 0) {
                    if (noarg === void 0) {
                        noarg = func();
                    }
                    return noarg;
                }
                else if (map) {
                    var m = map;
                    for (var i = 0; i < len; i++) {
                        var id = args[i];
                        var n = m.get(id);
                        if (n === void 0) {
                            n = new Map();
                            m.set(id, n);
                        }
                        m = n;
                    }
                    var result = m.get(res);
                    if (result === void 0) {
                        result = APPLY(func, void 0, args);
                        if (result !== void 0) {
                            m.set(res, result);
                        }
                    }
                    return result;
                }
                else {
                    margin = margin === void 0 ? size > 20 && 10 || Math.floor(size / 2) : margin;
                    var node = cache = cache || Object.create(null), result;
                    for (var i = 0; i < len; i++) {
                        node = i ? result[2] : node;
                        var id = args[i];
                        // try-catch文が存在するとIEで大幅な速度低下が発生するので隔離
                        var index = id && typeof id === 'object' ? stringify(id) : id + '';
                        // argumentsオブジェクトをパラメータにする関数が存在するだけで
                        // 実行されなくともFirefoxとIEで大幅な速度低下が発生するので要注意
                        result = update(sort(node, index, id), id, func, args, size, margin);
                    }
                    return result[1];
                }
            };
        };
        function stringify(id) {
            try {
                return id && typeof id === 'object' ? JSON.stringify(id) : id + '';
            }
            catch (e) {
                return id + '';
            }
        }
        function sort(node, index, id) {
            var results;
            if (!(index in node)) {
                results = node[index] = [[id, void 0, Object.create(null)]];
            }
            else {
                results = node[index];
                if (results[0][0] !== id) {
                    for (var i = 1, len = results.length; i < len; i++) {
                        if (results[i][0] === id) {
                            results.unshift(results.splice(i, 1).pop());
                            break;
                        }
                    }
                }
            }
            return results;
        }
        function update(results, id, func, args, size, margin) {
            var result = results[0];
            if (results.length === 0 || result[0] !== id) {
                result = [id, APPLY(func, void 0, args), Object.create(null)];
                results.unshift(result);
            }
            else if (result[1] === void 0) {
                result[1] = APPLY(func, void 0, args);
            }
            if (results.length > size + margin) {
                results.splice(size, size + margin);
            }
            return result;
        }
    })(FUNCTION = LIBRALY.FUNCTION || (LIBRALY.FUNCTION = {}));
})(LIBRALY || (LIBRALY = {}));
/// <reference path="cache.ts"/>
var LIBRALY;
(function (LIBRALY) {
    var UTILITY;
    (function (UTILITY) {
        var cache = LIBRALY.FUNCTION.cache;
        UTILITY.store = function (size) {
            if (size === void 0) { size = 10; }
            var k2v = cache(function (key) { return value; }, size), value, store = function (key, val) {
                value = val;
                return k2v(key);
            };
            return function (key, value) {
                if (value === void 0) {
                    return store(key);
                }
                else {
                    if (value === store(key, value)) {
                        return value;
                    }
                    else {
                        throw Error(key);
                    }
                }
            };
        };
    })(UTILITY = LIBRALY.UTILITY || (LIBRALY.UTILITY = {}));
})(LIBRALY || (LIBRALY = {}));
/// <reference path="type.ts"/>
/// <reference path="apply.ts"/>
var LIBRALY;
(function (LIBRALY) {
    var FUNCTION;
    (function (FUNCTION) {
        var TYPE = LIBRALY.TYPE;
        var APPLY = LIBRALY.FUNCTION.apply;
        function dispatcher() {
            var patterns = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                patterns[_i - 0] = arguments[_i];
            }
            return function () {
                var params = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    params[_i - 0] = arguments[_i];
                }
                return dispatch(patterns, params);
            };
        }
        FUNCTION.dispatcher = dispatcher;
        function dispatch(patterns, params) {
            for (var i = 0; i < patterns.length; i++) {
                var pattern = patterns[i], types = pattern[0], guard = pattern.length >= 2 ? pattern[2] : null, fn = pattern.length === 1 ? null
                    : !guard ? pattern[1]
                        : pattern[2];
                if (!TYPE.type(params, types)) {
                    continue;
                }
                if (!fn) {
                    continue;
                }
                if (guard && !APPLY(guard, void 0, params)) {
                    continue;
                }
                switch (params.length) {
                    case 0:
                        return fn();
                    case 1:
                        return fn(params[0]);
                    case 2:
                        return fn(params[0], params[1]);
                    case 3:
                        return fn(params[0], params[1], params[2]);
                    case 4:
                        return fn(params[0], params[1], params[2], params[3]);
                }
                return APPLY(fn, void 0, params);
            }
            throw new Error('non-exhaustive dispatch');
        }
    })(FUNCTION = LIBRALY.FUNCTION || (LIBRALY.FUNCTION = {}));
})(LIBRALY || (LIBRALY = {}));
/// <reference path="../define.ts"/>
/// <reference path="../model/main.ts"/>
/// <reference path="stream.ts"/>
/// <reference path="../library/cache.ts"/>
/// <reference path="../library/store.ts"/>
/// <reference path="../library/dispatcher.ts"/>
/* CONTROLLER */
var MODULE;
(function (MODULE) {
    var CONTROLLER;
    (function (CONTROLLER) {
        function handle() {
            var lazychain;
            lazychain = (function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i - 0] = arguments[_i];
                }
                return MODULE.APPLY(CONTROLLER.core, void 0, args);
            });
            lazychain.id = MODULE.ID;
            lazychain.uuid = MODULE.UUID;
            lazychain.args2array = LIBRALY.FUNCTION.args2array;
            lazychain.type = MODULE.TYPE;
            lazychain.memoize = LIBRALY.FUNCTION.memoize;
            lazychain.cache = LIBRALY.FUNCTION.cache;
            lazychain.store = LIBRALY.UTILITY.store;
            lazychain.resolve = MODULE.PROMISE.resolve;
            lazychain.reject = MODULE.PROMISE.reject;
            lazychain.deferred = MODULE.PROMISE.deferred;
            lazychain.when = MODULE.PROMISE.when;
            lazychain.dispatcher = LIBRALY.FUNCTION.dispatcher;
            lazychain.repeat = LIBRALY.UTILITY.repeat;
            lazychain.duff = LIBRALY.UTILITY.duff;
            lazychain.duffbk = LIBRALY.UTILITY.duffbk;
            return lazychain;
        }
        CONTROLLER.handle = handle;
        function core() {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            switch (true) {
                case MODULE.TYPE(args, [true]):
                    return void extendArray_(true, false);
                case MODULE.TYPE(args, [false]):
                    return void extendArray_(false, false);
                case MODULE.TYPE(args, [true, Array.prototype]):
                    return void extendArray_(true, true);
                case MODULE.TYPE(args, [false, Array.prototype]):
                    return void extendArray_(false, true);
                case MODULE.TYPE(args, [true, Function]):
                    return void extendStream_(true, args[1], 1);
                case MODULE.TYPE(args, [false, Function]):
                    return void extendStream_(false, args[1], 1);
                case MODULE.TYPE(args, []):
                    return new CONTROLLER.Stream();
                case MODULE.TYPE(args, [Function]):
                    return new CONTROLLER.Stream(void 0, [args[0]]);
                case MODULE.TYPE(args, [Array]):
                    return new CONTROLLER.Stream(args[0]);
                case MODULE.TYPE(args, [Array, Function]):
                    return new CONTROLLER.Stream(args[0], [args[1]]);
                case MODULE.TYPE(args, [Object, Function]):
                    return new CONTROLLER.Stream(args[0], [args[1]]);
                case MODULE.TYPE(args, [Object, MODULE.ID.rest()]):
                    return new CONTROLLER.Stream().stream(args);
            }
        }
        CONTROLLER.core = core;
        function extendArray_(state, enumerable) {
            [
                'lazy',
                'stream'
            ]
                .forEach(function (v) {
                if (state) {
                    Object.defineProperty(Array.prototype, v, {
                        configurable: true,
                        writable: true,
                        enumerable: enumerable,
                        value: function () {
                            var args = [];
                            for (var _i = 0; _i < arguments.length; _i++) {
                                args[_i - 0] = arguments[_i];
                            }
                            return MODULE.APPLY(CONTROLLER[v], void 0, [LazyChain(this)].concat(args));
                        }
                    });
                }
                else {
                    delete Array.prototype[v];
                }
            });
        }
        CONTROLLER.extendArray_ = extendArray_;
        function extendStream_(state, extension, offset, method) {
            if (method === void 0) { method = []; }
            if (state) {
                Object.keys(extension)
                    .concat(method)
                    .filter(function (v) { return !CONTROLLER.Stream.prototype[v] && 'function' === typeof extension[v]; })
                    .forEach(function (v) {
                    CONTROLLER.Stream.prototype[v] = function () {
                        var args = [];
                        for (var _i = 0; _i < arguments.length; _i++) {
                            args[_i - 0] = arguments[_i];
                        }
                        this.__LazyChain__.command = [v, args];
                        return MODULE.MODEL.emulator(this, args, v, extension, offset);
                    };
                    Object.defineProperty(CONTROLLER.Stream.prototype[v], 'provider', {
                        configurable: false,
                        writable: false,
                        enumerable: false,
                        value: extension
                    });
                });
            }
            else {
                Object.keys(extension)
                    .concat(method)
                    .filter(function (v) { return !!CONTROLLER.Stream.prototype[v] && CONTROLLER.Stream.prototype[v].provider === extension; })
                    .forEach(function (v) { return delete CONTROLLER.Stream.prototype[v]; });
            }
        }
        CONTROLLER.extendStream_ = extendStream_;
        function lazy() {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            var context = args[0];
            switch (true) {
                // basic
                case MODULE.TYPE(args, [CONTROLLER.Stream, Function]):
                    return MODULE.MODEL.lazy(context, args[1]);
                case MODULE.TYPE(args, [CONTROLLER.Stream, Function, Boolean]):
                    return MODULE.MODEL.lazy(context, args[1], args[2]);
                case MODULE.TYPE(args, [CONTROLLER.Stream, Function, void 0]):
                    return MODULE.MODEL.lazy(context, args[1], args[2]);
                case MODULE.TYPE(args, [CONTROLLER.Stream, Function, void 0, Boolean]):
                    return MODULE.MODEL.lazy(context, args[1], args[2], args[3]);
                // immediate
                case MODULE.TYPE(args, [CONTROLLER.Stream]):
                    return MODULE.MODEL.immediate(context);
                // buffer
                case MODULE.TYPE(args, [CONTROLLER.Stream, Number]):
                    return MODULE.MODEL.buffer(context, args[1]);
                default:
                    return MODULE.MODEL.stream(context, void 0);
            }
        }
        CONTROLLER.lazy = lazy;
        function stream() {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            var context = args[0];
            switch (true) {
                // basic
                case MODULE.TYPE(args, [CONTROLLER.Stream, Function]):
                    return MODULE.MODEL.stream(context, args[1]);
                case MODULE.TYPE(args, [CONTROLLER.Stream, Function, void 0]):
                    return MODULE.MODEL.stream(context, args[1], args[2]);
                // compose
                case MODULE.TYPE(args, [CONTROLLER.Stream, Object, MODULE.ID.rest()]):
                    return MODULE.MODEL.compose(context, args.slice(1));
                // branch
                case MODULE.TYPE(args, [CONTROLLER.Stream]):
                    return context;
                case MODULE.TYPE(args, [CONTROLLER.Stream, true, [Object]]):
                    return MODULE.MODEL.branch(context, args[2]);
                case MODULE.TYPE(args, [CONTROLLER.Stream, false, [Object]]):
                    return MODULE.MODEL.branch(context, args[2]), MODULE.MODEL.cascade(context, null);
                // split
                case MODULE.TYPE(args, [CONTROLLER.Stream, Array, Object]):
                case MODULE.TYPE(args, [CONTROLLER.Stream, Array, null]):
                case MODULE.TYPE(args, [CONTROLLER.Stream, Array, Object]):
                case MODULE.TYPE(args, [CONTROLLER.Stream, Array, null]):
                    return MODULE.MODEL.split(context, function (v) { return MODULE.TYPE([v], args[1]); }, args[2]);
                case MODULE.TYPE(args, [CONTROLLER.Stream, Function, Object, void 0]):
                case MODULE.TYPE(args, [CONTROLLER.Stream, Function, [Object], void 0]):
                    return MODULE.MODEL.split(context, args[1], args[2], args[3]);
                case MODULE.TYPE(args, [CONTROLLER.Stream, String, Object]):
                case MODULE.TYPE(args, [CONTROLLER.Stream, String, null]):
                    return MODULE.MODEL.split(context, function (v) { return MODULE.TYPE(v) === args[1]; }, args[2]);
                // merge
                case MODULE.TYPE(args, [CONTROLLER.Stream, [Object]]):
                    return MODULE.MODEL.merge(context, args[1]);
                default:
                    return MODULE.MODEL.stream(context, void 0);
            }
        }
        CONTROLLER.stream = stream;
        function pattern(context) {
            var patterns = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                patterns[_i - 1] = arguments[_i];
            }
            return MODULE.MODEL.pattern(context, patterns);
        }
        CONTROLLER.pattern = pattern;
        function monad(context, monad, convert) {
            return MODULE.MODEL.monad(context, monad, convert);
        }
        CONTROLLER.monad = monad;
        function monadic(context) {
            var patterns = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                patterns[_i - 1] = arguments[_i];
            }
            return MODULE.MODEL.monadic(context, patterns);
        }
        CONTROLLER.monadic = monadic;
        function mixin(context, source, method, offset) {
            if (method === void 0) { method = []; }
            if (offset === void 0) { offset = 1; }
            // deferred
            Object.keys(source)
                .concat(method)
                .filter(function (method) { return !context[method] && 'function' === typeof source[method]; })
                .forEach(function (method) { return context[method] = source[method]; });
            return context;
        }
        CONTROLLER.mixin = mixin;
        function emulate(context, source, method, offset, overwrite) {
            if (method === void 0) { method = []; }
            if (offset === void 0) { offset = 1; }
            if (overwrite === void 0) { overwrite = false; }
            // array, extension
            Object.keys(source)
                .concat(method)
                .filter(function (method) { return overwrite || !context[method] && 'function' === typeof source[method]; })
                .forEach(function (method) { return context[method] = function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i - 0] = arguments[_i];
                }
                context.__LazyChain__.command = [method, args];
                return MODULE.MODEL.emulator(context, args, method, source, offset);
            }; });
            return context;
        }
        CONTROLLER.emulate = emulate;
    })(CONTROLLER = MODULE.CONTROLLER || (MODULE.CONTROLLER = {}));
})(MODULE || (MODULE = {}));
/// <reference path="model/main.ts"/>
var LazyChain;
var MODULE;
(function (MODULE) {
    LazyChain = LazyChain || MODULE.CONTROLLER.handle();
    switch (true) {
        case typeof module === 'object' && !!module && module.exports instanceof Object:
            module.exports = LazyChain;
            break;
        case typeof window === 'object' && !!window && window.window === window:
            window.LazyChain = LazyChain;
            break;
    }
})(MODULE || (MODULE = {}));
}("lazychain", "0.3.0-alpha.23");

},{}],13:[function(require,module,exports){
"use strict";
var KEYS_DOWN = new Set();
var HOTKEY_CODES = {};

function getSettings(callback) {
  chrome.storage.local.get(["extension-settings"], function (result) {
    let settingsFull = result["extension-settings"];
    HOTKEY_CODES = settingsFull.hotkeys.codes;

    if (callback instanceof Function) {
      callback();
    }
  });
}
exports.getSettings = getSettings;

function isHotkeyPressed(hotkeyID) {
  return setArrayMatch(KEYS_DOWN, HOTKEY_CODES[hotkeyID]);
}
exports.isHotkeyPressed = isHotkeyPressed;

// Functions for handling keys down
// ------------------------------------------
function startListeners() {
  window.addEventListener("keyup", removeFromKeysDown);
  
  //* BUG-FIX: Changing tabs or windows using keyboard failed to clear the keys from the KEYS_DOWN set
  window.addEventListener("blur", () => {
    KEYS_DOWN.clear();
  })
}
exports.startListeners = startListeners;

function removeFromKeysDown(e) {
  KEYS_DOWN.delete(e.key.toLowerCase());
}

function addToKeysDown(e) {
  KEYS_DOWN.add(e.key.toLowerCase());
}
exports.addToKeysDown = addToKeysDown;


// checking equality of set values to array values, not case sensitive
function setArrayMatch(set1, array1) {
  // Check if the map and array have the same number of entries
  if (set1.size !== array1.length) return false;
  // Check if all items exist and are in the same order
  let i = 0;
  for (let element of set1) {
    if (element.toLowerCase() !== array1[i].toLowerCase()) return false;
    i++;
  }
  // Otherwise, return true
  return true;
}

},{}],2:[function(require,module,exports){
"use strict";
var HELPER_FUNCTIONS = require('helperFunctions');

exports.CURSOR_ID = 'spatialnavigation-cursor';
exports.URLDISPLAY_ID = 'spatialnavigation-urldisplay';
exports.MARKER_TAG = 'spatialnavigation-marker';
function attribute(event, cursor) {
    return {
        command: key2command(event),
        cursor: cursor
    };
}
exports.attribute = attribute;

function key2command(event) {
  HELPER_FUNCTIONS.addToKeysDown(event);
  // ===============================================================================================================================
  // Adding a hotkey for extension disable (Nomadic 07.03.2021 )
  // ===============================================================================================================================
  // UnComment the line below to have enable/disable be global to the window. Leave it commented to have the setting be tab specific
  // let localStorage = window.localStorage;

  // check if the keys should be enabled or disabled
  let isSpatialNavEnabled = localStorage.getItem("isEnabled");
  // make value boolean, localStorage only stores strings
  isSpatialNavEnabled = isSpatialNavEnabled === "true" ? true : isSpatialNavEnabled === "false" ? false : isSpatialNavEnabled;

  // initialize stored state if not set
  if (isSpatialNavEnabled === null) {
    isSpatialNavEnabled = true;
    localStorage.setItem("isEnabled", true);
  }

  // check to see if the key combo is the enable/disable command
  if (HELPER_FUNCTIONS.isHotkeyPressed("disableKeys")) {
    // flip the value in storage
    isSpatialNavEnabled = !isSpatialNavEnabled;
    localStorage.setItem("isEnabled", isSpatialNavEnabled);
  }

  // prevent other keys when disabled
  if (!isSpatialNavEnabled) return 11; // INVALID

  // check to see if key combo matches an action
  if(HELPER_FUNCTIONS.isHotkeyPressed("navUp")) {
      return 0;
  } else if(HELPER_FUNCTIONS.isHotkeyPressed("navLeft")) {
      return 4;
  } else if(HELPER_FUNCTIONS.isHotkeyPressed("navDown")) {
      return 2;
  } else if(HELPER_FUNCTIONS.isHotkeyPressed("navRight")) {
      return 5;
  } else if(HELPER_FUNCTIONS.isHotkeyPressed("expand")) {
      return 6;
  } else if(HELPER_FUNCTIONS.isHotkeyPressed("contract")) {
      return 7;
  } else if(HELPER_FUNCTIONS.isHotkeyPressed("quit")) {
      return 10;
  } else if(HELPER_FUNCTIONS.isHotkeyPressed("click")) {
      return 8;
  } else if(HELPER_FUNCTIONS.isHotkeyPressed("shiftClick")) {
      return 9;
  } else if(HELPER_FUNCTIONS.isHotkeyPressed("controlClick")) {
      return 12;
  } else {
      return 11; // INVALID
  }
}
exports.key2command = key2command;

},{"helperFunctions":13}],3:[function(require,module,exports){
"use strict";
var MODEL = require('../model/model');
var VIEW = require('../view/view');
function Controller(targets) {
    return targets.map(function (target) { return new VIEW.View(target); });
}
exports.Controller = Controller;
function command(entity, attribute) {
    MODEL.input(entity, attribute);
}
exports.command = command;

},{"../model/model":8,"../view/view":12}],4:[function(require,module,exports){

},{}],5:[function(require,module,exports){
"use strict";
var Entity = (function () {
    function Entity(viewId) {
        this.viewId_ = viewId;
    }
    Object.defineProperty(Entity.prototype, "viewId", {
        get: function () {
            return this.viewId_;
        },
        set: function (_) {
            return;
        },
        enumerable: true,
        configurable: true
    });
    return Entity;
})();
exports.Entity = Entity;

},{}],6:[function(require,module,exports){
"use strict";
var model = require('./model/model');
model.main();

},{"./model/model":8}],7:[function(require,module,exports){
"use strict";
var ATTRIBUTE = require('../attribute/attribute');
var SELECTOR = [
    'a',
    'input',
    'select',
    'option',
    'datalist',
    'textarea',
    'button',
    'audio',
    'video',
    'embed',
    '[onclick]',
    '[tabindex]:not([role="tablist"]):not(ul):not(#hdtb):not(#hdtbMenus)',
    //'[role="link"]',
    '[role="button"]',
    '[role="checkbox"]',
    '[role="option"]',
    '[role="tab"]',
    '[role="menuitem"]'
]
    .join(',');
var queried, linkcount = 0;
function analyze(data) {
    if (!queried || !data.attribute.cursor || linkcount !== document.links.length) {
        queried = Array.apply(null, document.querySelectorAll(SELECTOR));
        linkcount = document.links.length;
    }
    var winWidth = window.innerWidth, winHeight = window.innerHeight, winTop = window.scrollY, winLeft = window.scrollX;
    var targets = findTargets(queried.filter(function (target) { return isVisible(shiftVisibleImg(target)); }), data.attribute.command, data.attribute.cursor);
    queried = isInWindow(targets[0]) ? queried : null;
    return {
        entity: data.entity,
        attribute: data.attribute,
        result: {
            targets: targets
        }
    };
    function findTargets(targets, command, cursor) {
        cursor = isCursorActive(cursor) ? cursor : null;
        switch (command) {
            case 0 /* UP */:
                return !cursor
                    ? findLeftTops(targets)
                    : findCursorTops(targets, cursor);
            case 1 /* UP_S */:
                return !cursor
                    ? findLeftTops(targets)
                    : findCursorColumn(findCursorTops(targets, cursor), cursor);
            case 2 /* DOWN */:
                return !cursor
                    ? findMainColumn(targets)
                    : findCursorBottoms(targets, cursor);
            case 3 /* DOWN_S */:
                return !cursor
                    ? findMainColumn(targets)
                    : findCursorColumn(findCursorBottoms(targets, cursor), cursor);
            case 4 /* LEFT */:
                return !cursor
                    ? findLeftColumn(targets)
                    : findCursorLefts(targets, cursor);
            case 5 /* RIGHT */:
                return !cursor
                    ? findRightColumn(targets)
                    : findCursorRights(targets, cursor);
            case 6 /* EXPAND */:
                return findCursorNeerTargets(targets, cursor || findMainColumn(targets)[0] || document.body)
                    .filter(isInWindow);
            case 7 /* CONTRACT */:
                return findCursorNeerTargets(targets, cursor || findMainColumn(targets)[0] || document.body)
                    .filter(isInWindow)
                    .reverse();
            default:
                return [];
        }
        function findLeftTops(targets) {
            return targets
                .filter(isInWindow)
                .map(shiftVisibleImg)
                .sort(compareLeftTopDistance);
        }
        function findMainColumn(targets) {
            return columns(targets.filter(function (target) { return target.getBoundingClientRect().left < (winWidth / 2); }).filter(hasVisibleTextNode))
                .sort(compareGroupsByTextWeightAverage)
                .map(function (group) { return group.filter(isInWindow); })
                .filter(function (group) { return group.length > 0; })
                .reduce(function (_, group) { return group; }, findLeftTops(targets))
                .map(shiftVisibleImg)
                .sort(compareLeftTopDistance);
        }
        function findLeftColumn(targets) {
            var mainColumn = findMainColumn(targets);
            var left = mainColumn.length > 0 ? mainColumn[0].parentElement.getBoundingClientRect().left : Infinity;
            return columns(targets.filter(function (target) { return target.getBoundingClientRect().right < left; }))
                .map(function (group) { return group.filter(isInWindow); })
                .filter(function (group) { return group.length > 0; })
                .sort(compareGroupsByTextWeightAverage)
                .reduce(function (_, group) { return group; }, mainColumn)
                .map(shiftVisibleImg)
                .sort(compareLeftTopDistance);
        }
        function findRightColumn(targets) {
            var mainColumn = findMainColumn(targets);
            var right = mainColumn.length > 0 ? mainColumn[0].parentElement.getBoundingClientRect().right : -Infinity;
            return columns(targets.filter(function (target) { return target.getBoundingClientRect().left > right; }))
                .map(function (group) { return group.filter(isInWindow); })
                .filter(function (group) { return group.length > 0; })
                .sort(compareGroupsByTextWeightAverage)
                .reduce(function (_, group) { return group; }, mainColumn)
                .map(shiftVisibleImg)
                .sort(compareLeftTopDistance);
        }
        function findCursorTops(targets, cursor) {
            var margin = 3;
            return targets
                .map(shiftVisibleImg)
                .filter(isInRange(Math.max(winTop - (winHeight * 3), 0), winLeft, winLeft + winWidth, Offset(cursor).top + margin))
                .sort(compareCursorVerticalDistance(cursor));
        }
        function findCursorBottoms(targets, cursor) {
            var margin = 3;
            return targets
                .map(shiftVisibleImg)
                .filter(isInRange(Offset(cursor).bottom - margin, winLeft, winLeft + winWidth, winTop + (winHeight * 4)))
                .sort(compareCursorVerticalDistance(cursor));
        }
        function findCursorLefts(targets, cursor) {
            var margin = 3;
            return targets
                .map(shiftVisibleImg)
                .filter(isInRange(winTop, 0, Offset(cursor).left + margin, winTop + winHeight))
                .sort(compareCursorLeftDistance(cursor));
        }
        function findCursorRights(targets, cursor) {
            var margin = 3;
            return targets
                .map(shiftVisibleImg)
                .filter(isInRange(winTop, Offset(cursor).right - margin, Infinity, winTop + winHeight))
                .sort(compareCursorRightDistance(cursor));
        }
        function findCursorNeerTargets(targets, cursor) {
            return targets
                .map(shiftVisibleImg)
                .filter(isInWindow)
                .sort(compareCursorDistance(cursor));
        }
        function findCursorColumn(targets, cursor) {
            var left = cursor.getBoundingClientRect().left;
            return columns(targets.filter(isCursorColumn).filter(hasVisibleTextNode))
                .reduce(function (_, group) { return group; }, targets)
                .map(shiftVisibleImg)
                .sort(function (a, b) { return compareGroupsByTextWeightAverage([b], [a]) || compareLeftTopDistance(a, b); });
            function isCursorColumn(elem) {
                return elem.getBoundingClientRect().left === left;
            }
        }
        function isCursorActive(cursor) {
            var rect = cursor && cursor.getBoundingClientRect();
            return !(!rect ||
                rect.bottom < 0 ||
                rect.top > winHeight ||
                rect.right < 0 ||
                rect.left > winWidth);
        }
        function columns(targets) {
            return targets
                .sort(compareLeftDistance)
                .reduce(groupsByLeftDistance, [])
                .map(filterFewNodesGroup)
                .filter(function (group) { return group.length > 1; });
        }
        function groupsByLeftDistance(groups, elem) {
            if (groups.length === 0) {
                return [[elem]];
            }
            var group = groups.slice(-1)[0];
            return isSameGroup(group, elem) ? groups.slice(0, -1).concat([group.concat(elem)]) : groups.concat([[elem]]);
            function isSameGroup(group, elem) {
                return Math.floor(group[0].getBoundingClientRect().left) === Math.floor(elem.getBoundingClientRect().left);
            }
        }
        function compareGroupsByTextWeightAverage(a, b) {
            return calWeightAverage(a.filter(hasText).slice(0, 10)) - calWeightAverage(b.filter(hasText).slice(0, 10))
                || -compareLeftDistance(a[0], b[0]);
            function calWeightAverage(elems) {
                return calTextWeightAverage(elems);
            }
            function calTextWeightAverage(elems) {
                return elems.length === 0
                    ? 0
                    : elems.reduce(function (r, elem) { return r + calTextWeight(elem); }, 0) / elems.length * (Math.min(elems.length, 10) / 10 + 0.5);
            }
            function calTextWeight(elem) {
                var fontSize = parseInt(window.getComputedStyle(elem).fontSize, 10)
                    || parseInt(window.getComputedStyle(document.documentElement).fontSize, 10)
                    || 16, fullTextNodeParents = findVisibleTextNodes(elem)
                    .map(function (text) { return text.parentElement; }), fontWeightAverage = calFontWeightRateAverage(fullTextNodeParents), length = fullTextNodeParents
                    .reduce(function (r, elem) { return r + elem.textContent.trim().length; }, 0);
                return fontSize * fontWeightAverage * +(length > 3);
            }
            function calFontWeightRateAverage(textNodeParents) {
                //const sum = textNodeParents.reduce((r, elem) => r + elem.textContent.trim().length * calFontWeightRate(elem), 0),
                //      len = textNodeParents.reduce((r, elem) => r + elem.textContent.trim().length, 0);
                //return len === 0 ? 0 : sum / len;
                return textNodeParents
                    .sort(function (a, b) { return a.textContent.trim().length - b.textContent.trim().length; })
                    .slice(-1)
                    .map(function (elem) { return calFontWeightRate(elem); })
                    .pop();
            }
            function calFontWeightRate(elem) {
                var fontWeight = window.getComputedStyle(elem).fontWeight;
                var weight;
                switch (fontWeight) {
                    case 'normal':
                        weight = 400;
                        break;
                    case 'bold':
                        weight = 700;
                        break;
                    default:
                        weight = parseInt(fontWeight, 10);
                }
                return 1 + ((weight / 400 - 1) / 3);
            }
        }
        function filterFewNodesGroup(group) {
            return groupsByNodeDistanceFromRoot(group)
                .filter(function (group) { return group.length > 1; })
                .reduce(function (r, group) { return r.concat(group); }, []);
        }
        function groupsByNodeDistanceFromRoot(group) {
            return group
                .sort(compareByNodeDistanceFromRoot)
                .reduce(function (r, elem) { return r.length === 0 ? [[elem]]
                : compareByNodeDistanceFromRoot(r[0][0], elem) === 0 ? [[elem].concat(r[0])].concat(r.slice(1))
                    : [[elem]].concat(r); }, []);
        }
        function compareByNodeDistanceFromRoot(a, b) {
            return countNodeDistanceFromRoot(a) - countNodeDistanceFromRoot(b);
            function countNodeDistanceFromRoot(elem) {
                var count = 0, parent = elem;
                while (parent = parent.parentElement) {
                    ++count;
                }
                return count;
            }
        }
        function compareLeftDistance(a, b) {
            return Math.floor(a.getBoundingClientRect().left) - Math.floor(b.getBoundingClientRect().left);
        }
        function compareLeftTopDistance(a, b) {
            return distance(a) - distance(b);
            function distance(elem) {
                var rect = elem.getBoundingClientRect();
                return Math.floor(rect.left
                    + rect.top * 5);
            }
        }
        function compareCursorDistance(cursor) {
            var weight = 10;
            var cursorOffset = Offset(cursor);
            return function (a, b) {
                return distance(a) - distance(b);
            };
            function distance(elem) {
                var targetOffset = Offset(elem);
                return Math.floor(Math.abs(targetOffset.left - cursorOffset.left)
                    + Math.abs(targetOffset.top - cursorOffset.top) * weight);
            }
        }
        function compareCursorVerticalDistance(cursor) {
            var weight = 3;
            var cursorOffset = Offset(cursor);
            return function (a, b) {
                return distance(a) - distance(b);
            };
            function distance(elem) {
                var targetOffset = Offset(elem), hdistance = targetOffset.left <= cursorOffset.left && cursorOffset.left <= targetOffset.right
                    ? 0
                    : targetOffset.left - cursorOffset.left;
                return Math.floor(Math.abs(hdistance) * weight
                    + Math.abs(targetOffset.top - cursorOffset.top));
            }
        }
        function compareCursorLeftDistance(cursor) {
            var weight = 5;
            var cursorOffset = Offset(cursor);
            return function (a, b) {
                return distance(a) - distance(b);
            };
            function distance(elem) {
                var targetOffset = Offset(elem);
                return Math.floor(Math.abs(targetOffset.right - cursorOffset.left)
                    + Math.abs(targetOffset.top - cursorOffset.top) * weight);
            }
        }
        function compareCursorRightDistance(cursor) {
            var weight = 5;
            var cursorOffset = Offset(cursor);
            return function (a, b) {
                return distance(a) - distance(b);
            };
            function distance(elem) {
                var targetOffset = Offset(elem);
                return Math.floor(Math.abs(targetOffset.left - cursorOffset.right)
                    + Math.abs(targetOffset.top - cursorOffset.top) * weight);
            }
        }
    }
    function isInWindow(elem) {
        return !!elem && isInRange(winTop, winLeft, winLeft + winWidth, winTop + winHeight)(elem);
    }
    function isInRange(top, left, right, bottom) {
        return function (elem) {
            var offset = Offset(elem);
            return top <= offset.top && offset.top <= bottom - 10
                && left <= offset.left && offset.left <= right - 10;
        };
    }
    function hasVisibleTextNode(elem) {
        return findVisibleTextNodes(elem).length > 0;
    }
    function findVisibleTextNodes(elem) {
        return findTextNodes(elem)
            .filter(hasText)
            .filter(function (text) { return isVisible(text.parentElement); });
    }
    function findTextNodes(elem) {
        return Array.apply(null, elem.childNodes)
            .map(function (elem) { return isTextNode(elem) ? [elem] : findTextNodes(elem); })
            .reduce(function (r, elems) { return r.concat(elems); }, []);
    }
    function isTextNode(elem) {
        return elem.nodeName === '#text';
    }
    function hasText(elem) {
        return elem.textContent.trim().length > 0;
    }
    function shiftVisibleImg(elem) {
        return Array.apply(null, elem.querySelectorAll('img'))
            .filter(isVisible)
            .shift() || elem;
    }
    function isVisible(elem) {
        var rect = elem.getBoundingClientRect(), point = document.elementFromPoint(Math.ceil(rect.left + (rect.width / 2)), Math.ceil(rect.top + Math.min(rect.height / 2, 10)));
        return point
            ? isVisibleSize(elem) && (point === elem || isChild(elem, point))
            : isVisibleSize(elem) && isVisibleStyle(elem);
        function isChild(parent, child) {
            return child ? child.parentElement === parent || isChild(parent, child.parentElement) : false;
        }
        function isVisibleSize(elem) {
            return elem.offsetWidth > 9 && elem.offsetHeight > 9;
        }
        function isVisibleStyle(elem) {
            var style = window.getComputedStyle(elem);
            return (style.display.split(' ')[0] !== 'none' ||
                style.visibility.split(' ')[0] !== 'hidden' ||
                !(parseInt(style.zIndex.split(' ')[0], 10) < 0));
        }
    }
    function Offset(elem) {
        var offset = elem.getBoundingClientRect();
        return {
            top: winTop + offset.top,
            left: winLeft + offset.left,
            right: winLeft + offset.right,
            bottom: winTop + offset.bottom,
            width: offset.right - offset.left,
            height: offset.bottom - offset.top
        };
    }
}
exports.analyze = analyze;

},{"../attribute/attribute":2}],8:[function(require,module,exports){
"use strict";
/// <reference path="../.d/lazychain.d.ts" />
var VIEW = require('../view/view');
var CONTROLLER = require('../controller/controller');
var STORE = require('../store/store');
exports.store = STORE.create();
var ANALYSIS = require('./analysis');
//import MAP = require('./map');
var LazyChain = require('lazychain');
var HELPER_FUNCTIONS = require('helperFunctions');
var views = [];
function main() {
    if (document.readyState === "loading") {
        return window.addEventListener("DOMContentLoaded", register);
    }
    else {
        return register();
    }
    function register() {
        window.removeEventListener("DOMContentLoaded", register);
        HELPER_FUNCTIONS.getSettings();
        HELPER_FUNCTIONS.startListeners();
        CONTROLLER.Controller([window])
            .forEach(function (view) { return views.unshift(view); });
    }
}
exports.main = main;
var stream = LazyChain();
stream
    .lazy(10)
    .reduceRight(function (v) { return v; })
    .map(ANALYSIS.analyze)
    .stream(output);
function input(entity, attribute) {
    stream.notify({ entity: entity, attribute: attribute, result: null });
}
exports.input = input;
function output(data) {
    exports.store.update(data.entity.viewId, data.result);
    VIEW.emit(data.entity, data.attribute);
}

},{"../controller/controller":3,"../store/store":10,"../view/view":12,"./analysis":7,"lazychain":1,"helperFunctions":13}],9:[function(require,module,exports){
"use strict";
var state_ = 0 /* ENABLE */;
function state(enable) {
    switch (enable) {
        case true:
            state_ = 0 /* ENABLE */;
            break;
        case false:
            state_ = 1 /* DISABLE */;
            break;
    }
    return state_ === 0 /* ENABLE */;
}
exports.state = state;

},{}],10:[function(require,module,exports){
"use strict";
function create() {
    return new Store();
}
exports.create = create;
var Store = (function () {
    function Store() {
        this.state_ = {};
        this.diff_ = {};
    }
    Store.prototype.update = function (id, diff) {
        var curState = this.state_[id] = this.state_[id] || {}, curDiff = this.diff_[id] = this.diff_[id] || [];
        Object.keys(diff)
            .forEach(function (v) {
            var key = v, val = diff[key];
            if (val === curState[key]) {
                return;
            }
            curState[key] = val;
            curDiff.push(key);
        });
    };
    Store.prototype.state = function (id) {
        return this.state_[id] = this.state_[id] || {};
    };
    Store.prototype.diff = function (id) {
        var diff = this.diff_[id] = this.diff_[id] || [], uniq = diff.sort().reduce(function (r, v, i) { return i === 0 ? [v] : r[0] === v ? r : [v].concat(r); }, []).reverse();
        [].splice.apply(diff, [0, diff.length].concat(uniq));
        return diff;
    };
    return Store;
})();

},{}],11:[function(require,module,exports){
"use strict";
var ATTRIBUTE = require('../attribute/attribute');
function map(targets, callback, reverse, stack) {
    if (stack === void 0) { stack = []; }
    if (targets.length === 0) {
        return [];
    }
    var scrollTop = window.scrollY, scrollLeft = window.scrollX;
    var keys = 'dsawgvcxlohnmzbptuy'.split(''), container = document.createElement('div'), observer = document.createElement('input'), table = {};
    observer.style.cssText = [
        'position: fixed;',
        'width: 0px;',
        'height: 0px;',
        'bottom: 0px;',
        'right: 0px;',
        'margin: 0px;',
        'border-width: 0px;',
        'padding: 0px;',
        'z-index: -1;'
    ]
        .map(function (str) { return str.split(';')[0] + ' !important;'; })
        .join('');
    observer.addEventListener('input', handler);
    observer.addEventListener('blur', handler);
    document.body.appendChild(observer);
    observer.focus();
    setTimeout(function () { return observer.focus(); }, 1000);
    var markers = targets.slice(0, keys.length)
        .map(function (target, i) {
        var marker = document.createElement('span'), key = keys[i], offset = calOffset(target);
        marker.classList.add(ATTRIBUTE.MARKER_TAG);
        marker.classList.add(ATTRIBUTE.MARKER_TAG + '-' + key);
        marker.style.cssText = [
            'position: absolute;',
            'overflow: visible;',
            'z-index: 9999;',
            'top: ' + (offset.top - 3) + 'px;',
            'left: ' + (offset.left - 12) + 'px;',
            'min-width: 5px;',
            'margin: 0px;',
            'border: 0px;',
            'padding: 1px 3px;',
            'border-radius: 3px;',
            'box-shadow: 1px 1px 1px 0px;',
            'background-color: gold;',
            'font-family: Helvetica, Arial, sans-serif;',
            'font-size: 13px;',
            'font-weight: bold;',
            'line-height: normal;',
            'color: black;'
        ]
            .map(function (str) { return str.split(';')[0] + ' !important;'; })
            .join('');
        marker.textContent = key;
        table[key] = target;
        container.appendChild(marker);
        return target;
    });
    document.body.appendChild(container);
    return markers;
    function handler(event) {
        event.preventDefault();
        event.stopImmediatePropagation();
        // TODO: find way to detect Ctrl key
        var key = ja2en(event.target.value), shiftKey = key === key.toUpperCase(), target = table[key.toLowerCase()], controlKey = false;
        observer.removeEventListener('keydown', handler);
        observer.removeEventListener('blur', handler);
        container.remove();
        if (key && target) {
            callback(target, shiftKey, controlKey);
        }
        observer.blur();
        observer.remove();
        // TODO: Decouple from E key
        switch (key) {
            case !reverse ? 'e' : 'E':
                if (targets.length > keys.length) {
                    map(targets.slice(keys.length), callback, reverse, stack.concat(targets.slice(0, keys.length)));
                }
                else {
                    map(stack.concat(targets), callback, reverse);
                }
                break;
            case !reverse ? 'E' : 'e':
                if (stack.length === 0) {
                    stack = targets;
                    targets = [];
                }
                if (stack.length > keys.length) {
                    map(stack.slice(-keys.length).concat(targets), callback, reverse, stack.slice(0, Math.max(stack.length - keys.length, 0)));
                }
                else {
                    map(stack.concat(targets), callback, reverse);
                }
                break;
        }
    }
    function calOffset(elem) {
        var offset = elem.getBoundingClientRect();
        return {
            top: scrollTop + offset.top,
            left: scrollLeft + offset.left,
            right: scrollLeft + offset.right,
            bottom: scrollTop + offset.bottom
        };
    }
}
exports.map = map;
function ja2en(char) {
    switch (char) {
        case 'ｑ':
            return 'q';
        case 'Ｑ':
            return 'Q';
        case 'ｗ':
            return 'w';
        case 'Ｗ':
            return 'W';
        case 'え':
            return 'e';
        case 'Ｅ':
            return 'E';
        case 'ｒ':
            return 'r';
        case 'Ｒ':
            return 'R';
        case 'ｔ':
            return 't';
        case 'Ｔ':
            return 'T';
        case 'ｙ':
            return 'y';
        case 'Ｙ':
            return 'Y';
        case 'う':
            return 'u';
        case 'Ｕ':
            return 'U';
        case 'い':
            return 'i';
        case 'Ｉ':
            return 'I';
        case 'お':
            return 'o';
        case 'Ｏ':
            return 'O';
        case 'ｐ':
            return 'p';
        case 'Ｐ':
            return 'P';
        case 'あ':
            return 'a';
        case 'Ａ':
            return 'A';
        case 'ｓ':
            return 's';
        case 'Ｓ':
            return 'S';
        case 'ｄ':
            return 'd';
        case 'Ｄ':
            return 'D';
        case 'ｆ':
            return 'f';
        case 'Ｆ':
            return 'F';
        case 'ｇ':
            return 'g';
        case 'Ｇ':
            return 'G';
        case 'ｈ':
            return 'h';
        case 'Ｈ':
            return 'H';
        case 'ｊ':
            return 'j';
        case 'Ｊ':
            return 'J';
        case 'ｋ':
            return 'k';
        case 'Ｋ':
            return 'K';
        case 'ｌ':
            return 'l';
        case 'Ｌ':
            return 'L';
        case 'ｚ':
            return 'z';
        case 'Ｚ':
            return 'Z';
        case 'ｘ':
            return 'x';
        case 'Ｘ':
            return 'X';
        case 'ｃ':
            return 'c';
        case 'Ｃ':
            return 'C';
        case 'ｖ':
            return 'v';
        case 'Ｖ':
            return 'V';
        case 'ｂ':
            return 'b';
        case 'Ｂ':
            return 'B';
        case 'ｎ':
            return 'n';
        case 'Ｎ':
            return 'N';
        case 'ｍ':
            return 'm';
        case 'Ｍ':
            return 'M';
        default:
            return char;
    }
}

},{"../attribute/attribute":2}],12:[function(require,module,exports){
"use strict";
var ENTITY = require('../entity/entity');
var ATTRIBUTE = require('../attribute/attribute');
var MODEL = require('../model/model');
var CONTROLLER = require('../controller/controller');
var STATE = require('../state/module');
var MAP = require('./map');
var id = 0;
var views = {};
exports.state = STATE.state;
var View = (function () {
    function View(target) {
        this.id_ = ++id;
        this.style = document.createElement('style');
        views[this.id_] = this;
        this.target_ = target;
        this.handler_ = this.handler_.bind(this);
        this.observe_();
        this.style.innerHTML = [
            '.' + ATTRIBUTE.CURSOR_ID + ' {',
            '  outline: 3px solid gold !important;',
            '  outline-offset: -3px !important;',
            '  background-color: rgba(255, 255, 0, 0.4) !important;',
            '}',
            'img.' + ATTRIBUTE.CURSOR_ID + ' {',
            '  outline-offset: -3px !important;',
            '}'
        ].join('\n');
    }
    View.prototype.handler_ = function (event) {
        undisplayUrl();
        if (!exports.state()) {
            return;
        }
        if (event.defaultPrevented) {
            return;
        }
        if (isInserting(event.srcElement)) {
            return;
        }
        var cursor = document.querySelector('.' + ATTRIBUTE.CURSOR_ID), entity = new ENTITY.Entity(this.id_), attribute = ATTRIBUTE.attribute(event, cursor);
        if (attribute.command === 11 /* INVALID */) {
            return;
        }
        if (!cursor && attribute.command === 8 /* ENTER */) {
            return;
        }
        if (!cursor && attribute.command === 9 /* ENTER_S */) {
            return;
        }
        event.preventDefault();
        event.stopImmediatePropagation();
        CONTROLLER.command(entity, attribute);
        return;
        function isInserting(elem) {
            switch (elem.tagName.toLowerCase()) {
                case 'input':
                    switch (elem.getAttribute('type')) {
                        case 'checkbox':
                        case 'radio':
                        case 'file':
                        case 'submit':
                        case 'reset':
                        case 'button':
                        case 'image':
                        case 'range':
                        case 'color':
                            return false;
                    }
                    return true;
                case 'select':
                    return false;
                case 'datalist':
                case 'option':
                case 'textarea':
                    return true;
            }
            switch (elem.getAttribute('role')) {
                case 'textbox':
                    return true;
            }
            do {
                if (elem.contentEditable === 'true') {
                    return true;
                }
            } while (elem = elem.parentElement);
            return false;
        }
    };
    View.prototype.observe_ = function () {
        this.target_.addEventListener('keydown', this.handler_, true);
    };
    View.prototype.release_ = function () {
        this.target_.removeEventListener('keydown', this.handler_, true);
    };
    View.prototype.destructor = function () {
        this.release_();
        delete views[this.id_];
    };
    View.prototype.update = function (command) {
        if (!this.style.parentElement) {
            document.head.appendChild(this.style);
        }
        var state = MODEL.store.state(this.id_), diff = MODEL.store.diff(this.id_);
        var key;
        while (key = diff.shift()) {
            switch (key) {
                case 'targets':
                    markTarget(state.targets);
            }
        }
        function markTarget(targets) {
            switch (command) {
                case 0 /* UP */:
                case 1 /* UP_S */:
                case 2 /* DOWN */:
                case 3 /* DOWN_S */:
                case 4 /* LEFT */:
                case 5 /* RIGHT */:
                    var target = targets[0];
                    if (!target) {
                        break;
                    }
                    select(target);
                    target.scrollIntoViewIfNeeded();
                    break;
                case 6 /* EXPAND */:
                    MAP.map(targets, trigger, false);
                    break;
                case 7 /* CONTRACT */:
                    MAP.map(targets, trigger, true);
                    break;
                case 8 /* ENTER */:
                    trigger(document.querySelector('.' + ATTRIBUTE.CURSOR_ID), false, false);
                    break;
                case 9 /* ENTER_S */:
                    trigger(document.querySelector('.' + ATTRIBUTE.CURSOR_ID), true, false);
                    break;
                case 12 /* ENTER_C */:
                  trigger(document.querySelector('.' + ATTRIBUTE.CURSOR_ID), false, true);
                  break;
                default:
                    unselect();
            }
            return;
            function select(elem) {
                unselect();
                displayUrl(elem);
                elem.classList.add(ATTRIBUTE.CURSOR_ID);
            }
            function unselect() {
                var selector = document.querySelector('.' + ATTRIBUTE.CURSOR_ID);
                if (!selector) {
                    return;
                }
                selector.classList.remove(ATTRIBUTE.CURSOR_ID);
                undisplayUrl();
            }
            function trigger(cursor, shiftKey, ctrlKey) {
                if (!cursor) {
                    return;
                }
                if (!document.elementFromPoint(cursor.getBoundingClientRect().left, cursor.getBoundingClientRect().top)) {
                    return;
                }
                if (cursor.tagName.toLowerCase() === 'a'
                    || cursor.parentElement.tagName.toLowerCase() === 'a'
                    || cursor.onclick
                    || cursor.tagName.toLowerCase() === 'option'
                    || -1 < ['button'].indexOf(cursor.getAttribute('role'))) {
                    select(cursor);
                }
                else {
                    unselect();
                }
                cursor.focus();
                click(cursor, shiftKey, ctrlKey);
            }
        }
    };
    View.prototype.destroy = function () {
        this.destructor();
    };
    return View;
})();
exports.View = View;
function emit(entity, attribute) {
    var viewId = entity.viewId;
    if (viewId in views) {
        views[viewId].update(attribute.command);
        return true;
    }
    else {
        return false;
    }
}
exports.emit = emit;
function displayUrl(cursor) {
    if (!cursor) {
        return;
    }
    if (cursor.tagName.toLowerCase() !== 'a') {
        return displayUrl(cursor.parentElement);
    }
    var display = document.createElement('span');
    display.id = ATTRIBUTE.URLDISPLAY_ID;
    display.style.cssText = [
        'position: fixed;',
        'z-index: 9999;',
        'left: 0px;',
        'bottom: 0px;',
        'min-width: 35%;',
        'padding: 3px 3px 0 3px;',
        'color: #ececec;',
        'background-color: #26272A;',
        'border-radius: 0;',
        'font-family: Meiryo, Helvetica, sans-serif;',
        'font-size: 11.5px;',
        'text-align: left;'
    ]
        .map(function (str) { return str.split(';')[0] + ' !important;'; })
        .join('');
    display.textContent = cursor.href;
    document.body.appendChild(display);
}
function undisplayUrl() {
    var display = document.querySelector('#' + ATTRIBUTE.URLDISPLAY_ID);
    if (!display) {
        return;
    }
    display.remove();
}
function click(elem, shiftKey, ctrlKey) {
    var target = elem.hasAttribute('target') && elem.getAttribute('target');
    if (elem.tagName.toLowerCase() === 'a') {
        elem.removeAttribute('target');
    }
    ["mouseover", "mousedown", "mouseup", "click"]
        .forEach(function (sequence) {
        var mouseEvent = document.createEvent("MouseEvents");
        mouseEvent.initMouseEvent(sequence, true, true, window, 1, 0, 0, 0, 0, ctrlKey, false, shiftKey, false, 0, null);
        elem.dispatchEvent(mouseEvent);
    });
    if (elem.tagName.toLowerCase() === 'a') {
        typeof target === 'boolean' ? elem.removeAttribute('target') : elem.setAttribute('target', target);
    }
}

},{"../attribute/attribute":2,"../controller/controller":3,"../entity/entity":5,"../model/model":8,"../state/module":9,"./map":11}]},{},[2,3,4,5,6,7,8,9,10,11,12,13]);
}("spatial-navigation", "0.4.7");
