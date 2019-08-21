/**
 * @date: 2015/10/05
 * @update: 2015/11/13
 * @version: v1.2
 * @author: Kent Chien
 *
 * (c) 2015 https://www.momoshop.com.tw 
 * 			https://www.momomall.com.tw 
 * 			https://tv.momo.com.tw
*     此js如有更動，moecapp專案底下的login.jsp需更新時戳
*     需同時更新ecm/js/momo-app-bridge-min.js
*     與ecm/js/mobile/momo-app-bridge-min.js
 */
function momoAppBridge(t, n, e, r) {
    if (-1 == [1, 2, 3, 4].indexOf(arguments.length))
        return void console.error("momoAppBridge with wrong arguments' size \"" + arguments.length + '"');
    this.sliceSupportFix();
    var o = this;
    switch (this.info = {
        version: 1.2,
        instance: null,
        enabled: !1,
        ioscookie: "iosmomoappbridge",
        initTime: 0,
        iosDefDelay: 500
    },
    arguments.length) {
    case 1:
    case 2:
        var i = this.utils().defAttrs(arguments[0]);
        try {
            if (null == i || 3 != i.length)
                return
        } catch (s) {
            return
        }
        this.agentKey = i[0],
        this.androidInstanceKey = i[1],
        this.iosInstanceKey = i[2],
        this.iosDelayTime = 2 == arguments.length ? o.utils().funcs.getIntValue(arguments[1], o.info.iosDefDelay) : o.info.iosDefDelay;
        break;
    case 3:
    case 4:
        this.agentKey = t,
        this.androidInstanceKey = n,
        this.iosInstanceKey = e,
        this.iosDelayTime = o.utils().funcs.getIntValue(r, o.info.iosDefDelay)
    }
    this.isInApp = this.utils().isInApp,
    this.getDevice = function() {
        return o.utils().get("device")
    }
    ,
    this.getDeviceID = function() {
        return o.utils().get("deviceID")
    }
    ,
    this.getToken = function() {
        return o.utils().get("userToken")
    }
    ,
    this.getAppVersion = function() {
        return o.utils().get("version")
    }
    ,
    this.getPlatform = function() {
        return o.utils().get("platform")
    }
    ,
    this.toast = function(t, n) {
        o.utils().tools("showMsg", t, n)
    }
    ,
    this.toastLong = function(t, n) {
        o.utils().tools("showMsgLong", t, n)
    }
    ,
    this.shareUrl = function(t, n, e) {
        o.utils().tools("shareUrl", t, n, e)
    }
    ,
    this.shareWithApp = function(t, n) {
        o.utils().tools("shareWithApp", t, n)
    }
    ,
    this.goWeb = function(t, n) {
        o.utils().tools("goWeb", t, n)
    }
    ,
    this.goInnerBrowser = function(t, n) {
        o.utils().tools("goInnerBrowser", t, n)
    }
    ,
    this.notifyApp = function(t, n, e) {
        o.utils().tools("notifyApp", t, n, e)
    }
    ,
    this.action = function(t, n, e) {
        o.utils().tools("action", t, n, e)
    }
    ,
    this.init()
}
momoAppBridge.prototype.init = function() {
    this.info.initTime = (new Date).getTime(),
    this.info.instance = this.utils().instance(),
    this.info.enabled = null != this.info.instance
}
,
momoAppBridge.prototype.sliceSupportFix = function() {
    !function() {
        "use strict";
        var t = Array.prototype.slice;
        try {
            t.call(document.documentElement)
        } catch (n) {
            Array.prototype.slice = function(n, e) {
                if (e = "undefined" != typeof e ? e : this.length,
                "[object Array]" === Object.prototype.toString.call(this))
                    return t.call(this, n, e);
                var r, o, i = [], s = this.length, a = n || 0;
                a = a >= 0 ? a : Math.max(0, s + a);
                var c = "number" == typeof e ? Math.min(e, s) : s;
                if (0 > e && (c = s + e),
                o = c - a,
                o > 0)
                    if (i = new Array(o),
                    this.charAt)
                        for (r = 0; o > r; r++)
                            i[r] = this.charAt(a + r);
                    else
                        for (r = 0; o > r; r++)
                            i[r] = this[a + r];
                return i
            }
        }
    }()
}
,
momoAppBridge.prototype.utils = function() {
    var t = this;
    return {
        isInApp: function() {
            try {
                return window.navigator.userAgent.indexOf(t.agentKey) > -1
            } catch (n) {
                return !1
            }
        },
        defAttrs: function(t) {
            if (null == t)
                return null;
            var n = ["shop", "mall", "tv"];
            switch (n.indexOf(t)) {
            case 0:
                return ["MOMOSHOP", "momoShopAppBridge", "momoiosJS_"];
            case 1:
                return ["MOMOMALL", "momoMallAppBridge", "momoiosJS_"];
            case 2:
                return ["MOMOApp", "jsObject", "momoiosJS_"];
            default:
                return null
            }
        },
        funcs: {
            getIntValue: function(t, n) {
                if (null == t)
                    return n;
                try {
                    return parseInt(t)
                } catch (e) {
                    return n
                }
            },
            getIdentifyStr: function() {
                var n = function(t) {
                    var n = "; " + document.cookie
                      , e = n.split("; " + t + "=");
                    return 2 == e.length ? e.pop().split(";").shift() : null
                }
                  , e = {
                    _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
                    encode: function(t) {
                        var n, r, o, i, s, a, c, u = "", h = 0;
                        for (t = e._utf8_encode(t); h < t.length; )
                            n = t.charCodeAt(h++),
                            r = t.charCodeAt(h++),
                            o = t.charCodeAt(h++),
                            i = n >> 2,
                            s = (3 & n) << 4 | r >> 4,
                            a = (15 & r) << 2 | o >> 6,
                            c = 63 & o,
                            isNaN(r) ? a = c = 64 : isNaN(o) && (c = 64),
                            u = u + this._keyStr.charAt(i) + this._keyStr.charAt(s) + this._keyStr.charAt(a) + this._keyStr.charAt(c);
                        return u
                    },
                    decode: function(t) {
                        var n, r, o, i, s, a, c, u = "", h = 0;
                        for (t = t.replace(/[^A-Za-z0-9\+\/\=]/g, ""); h < t.length; )
                            i = this._keyStr.indexOf(t.charAt(h++)),
                            s = this._keyStr.indexOf(t.charAt(h++)),
                            a = this._keyStr.indexOf(t.charAt(h++)),
                            c = this._keyStr.indexOf(t.charAt(h++)),
                            n = i << 2 | s >> 4,
                            r = (15 & s) << 4 | a >> 2,
                            o = (3 & a) << 6 | c,
                            u += String.fromCharCode(n),
                            64 != a && (u += String.fromCharCode(r)),
                            64 != c && (u += String.fromCharCode(o));
                        return u = e._utf8_decode(u)
                    },
                    _utf8_encode: function(t) {
                        t = t.replace(/\r\n/g, "\n");
                        for (var n = "", e = 0; e < t.length; e++) {
                            var r = t.charCodeAt(e);
                            128 > r ? n += String.fromCharCode(r) : r > 127 && 2048 > r ? (n += String.fromCharCode(r >> 6 | 192),
                            n += String.fromCharCode(63 & r | 128)) : (n += String.fromCharCode(r >> 12 | 224),
                            n += String.fromCharCode(r >> 6 & 63 | 128),
                            n += String.fromCharCode(63 & r | 128))
                        }
                        return n
                    },
                    _utf8_decode: function(t) {
                        for (var n = "", e = 0, r = c1 = c2 = 0; e < t.length; )
                            r = t.charCodeAt(e),
                            128 > r ? (n += String.fromCharCode(r),
                            e++) : r > 191 && 224 > r ? (c2 = t.charCodeAt(e + 1),
                            n += String.fromCharCode((31 & r) << 6 | 63 & c2),
                            e += 2) : (c2 = t.charCodeAt(e + 1),
                            c3 = t.charCodeAt(e + 2),
                            n += String.fromCharCode((15 & r) << 12 | (63 & c2) << 6 | 63 & c3),
                            e += 3);
                        return n
                    }
                }
                  , r = n(t.info.ioscookie);
                if (null == r)
                    return window.navigator.userAgent;
                try {
                    return e.decode(r)
                } catch (o) {
                    return console.error(o),
                    window.navigator.userAgent
                }
            }
        },
        get: function(n) {
            function e() {
                switch (n) {
                case "device":
                    return "browser";
                case "deviceID":
                    return "";
                case "userToken":
                    return "";
                case "version":
                    return "";
                case "platform":
                    return "";
                default:
                    return ""
                }
            }
            var r = ["device", "deviceID", "userToken", "version", "platform"];
            if ("string" != typeof n || -1 == r.indexOf(n))
                return null;
            if (!t.isInApp())
                return e();
            try {
                var o, i, s, a;
                return o = new RegExp("(\\[" + t.agentKey + ")(?:[^])*?(" + t.agentKey + "\\])","g"),
                i = new RegExp("(" + n + ":)(?:[^])*?(;)","g"),
                s = t.utils().funcs.getIdentifyStr().match(o),
                null == s || 1 != s.length ? e() : (a = s[0].match(i),
                null == a || 1 != a.length ? e() : a[0].replace(n + ":", "").replace(";", ""))
            } catch (c) {
                return e()
            }
        },
        instance: function() {
            function n(n) {
                var funcArr = ['showMsg','showMsgLong','shareUrl','shareWithApp','goWeb','goInnerBrowser','action','notifyApp'];
                var rtn = {};
                switch (n) {
                case "android":
                    /*
                    for(var i=0;i<funcArr.length;i++){
                      var fname = funcArr[i];
                      rtn[fname] = function(){
                        prompt(Array.prototype.slice.call(arguments).join('{split}'), t.androidInstanceKey + fname);
                      };
                    }
                    return rtn;
                    */
                    return {
                        showMsg: function(n) {
                            prompt(n, t.androidInstanceKey + "showMsg")
                        },
                        showMsgLong: function(n) {
                            prompt(n, t.androidInstanceKey + "showMsgLong")
                        },
                        shareUrl: function(n, e) {
                            prompt(n + "{split}" + e, t.androidInstanceKey + "shareUrl")
                        },
                        shareWithApp: function(n) {
                            prompt(n, t.androidInstanceKey + "shareWithApp")
                        },
                        goWeb: function(n) {
                            prompt(n, t.androidInstanceKey + "goWeb")
                        },
                        goInnerBrowser: function(n) {
                            prompt(n, t.androidInstanceKey + "goInnerBrowser")
                        },
                        notifyApp: function(n, e) {
                            prompt(n + "{split}" + e, t.androidInstanceKey + "notifyApp")
                        },
                        action: function(n, e) {
                            prompt(n + "{split}" + e, t.androidInstanceKey + "action")
                        }
                    };
                case "ios":
                    for(var i=0;i<funcArr.length;i++){
                      var fname = funcArr[i];
                        rtn[fname] = function(){
                        try{
                          window.webkit.messageHandlers[t.iosInstanceKey+fname].postMessage(Array.prototype.slice.call(arguments));
                        }catch(e){
                          window[t.iosInstanceKey+fname].apply(this,arguments);
                        }
                      };
                    }
                    return rtn;
                }
            }
            var e = t.getDevice().toLowerCase();
            switch (e) {
            case "android":
            case "2":
                try {
                    return parseFloat(window.navigator.userAgent.match(/Android\s+([\d\.]+)/)[1]) >= 4 ? void 0 == window[t.androidInstanceKey] ? null : window[t.androidInstanceKey] : n("android")
                } catch (r) {
                    return null
                }
            case "ios":
            case "1":
                return n("ios");
            default:
                return null
            }
        },
        tools: function(n) {
            var e = 0
              , r = 1 < arguments.length ? arguments[arguments.length - 1] : null
              , o = 1 < arguments.length ? Array.prototype.slice.call(arguments, 1, arguments.length - 1) : null
              , i = function() {
                try {
                    null != r && "function" == typeof r && r.apply(this, o)
                } catch (t) {
                    console.error(t.toString())
                }
            };
            return t.info.enabled ? (-1 != ["ios", "1"].indexOf(t.getDevice().toLowerCase()) && (new Date).getTime() - t.info.initTime <= t.iosDelayTime && (e = t.iosDelayTime),
            void setTimeout(function() {
                try {
                    t.info.instance[n].apply(t.info.instance, o)
                } catch (e) {
                    console.error(e.toString),
                    i()
                }
            }, e)) : void i()
        }
    }
}
;
