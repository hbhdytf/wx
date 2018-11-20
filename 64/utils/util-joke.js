var t = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
    return typeof t;
} : function(t) {
    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
}, o = (getApp(), {
    getLoginCode: "https://bbs.j.cn/api/fetchOpenIdByJSCode",
    getAdsForWxMiniApp: "https://party-gate.j.cn/api/getAdsForWxMiniApp",
    collectFormId: "https://pisces.j.cn/api/collectFormId",
    fetchChangedPostsForMiniProgram: "https://bbs.j.cn/api/fetchChangedPostsForMiniProgram",
    reportViewJoke: "https://bbs.j.cn/api/reportViewJoke",
    fetchLongChangedPostsForMiniProgram: "https://bbs.j.cn/api/fetchLongChangedPostsForMiniProgram"
}), e = function(t) {
    return (t = t.toString())[1] ? t : "0" + t;
};

module.exports.API = o, module.exports.methods = {
    getOpenId: function(t) {
        var e = wx.getStorageSync("openId");
        e ? t && t(e) : wx.login({
            success: function(e) {
                var n = e.code;
                wx.request({
                    url: o.getLoginCode,
                    method: "POST",
                    data: {
                        jsCode: n
                    },
                    header: {
                        "content-type": "application/x-www-form-urlencoded"
                    },
                    success: function(o) {
                        var e = o.data;
                        t && t(e.openId), wx.setStorageSync("openId", e.openId);
                    }
                });
            }
        });
    },
    formatTime: function(t) {
        var o = t.getFullYear(), n = t.getMonth() + 1, r = t.getDate(), i = t.getHours(), a = t.getMinutes(), c = t.getSeconds();
        return [ o, n, r ].map(e).join("/") + " " + [ i, a, c ].map(e).join(":");
    },
    router: function(t) {
        return encodeURIComponent(JSON.stringify(t));
    },
    rand: function(t, o) {
        return Math.floor(Math.random() * (o - t + 1) + t);
    },
    creatUuid: function() {
        return Math.uuidCompact = function() {
            return "xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx".replace(/[xy]/g, function(t) {
                var o = 16 * Math.random() | 0;
                return ("x" == t ? o : 3 & o | 8).toString(16);
            });
        }, Math.uuidCompact();
    },
    json2Url: function(o) {
        var e = [];
        for (var n in o) {
            var r = o[n];
            e.push(n + "=" + encodeURIComponent("object" === (void 0 === r ? "undefined" : t(r)) ? JSON.stringify(o[n]) : r));
        }
        return e.join("&");
    }
};