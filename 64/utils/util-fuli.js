var a = Object.assign || function(a) {
    for (var e = 1; e < arguments.length; e++) {
        var o = arguments[e];
        for (var t in o) Object.prototype.hasOwnProperty.call(o, t) && (a[t] = o[t]);
    }
    return a;
}, e = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(a) {
    return typeof a;
} : function(a) {
    return a && "function" == typeof Symbol && a.constructor === Symbol && a !== Symbol.prototype ? "symbol" : typeof a;
}, o = getApp(), t = {
    startConfig: "https://pisces.j.cn/api/startConfig",
    personalNews: "https://pisces.j.cn/api/personalNews",
    getStream: "https://pisces.j.cn/api/getStream",
    joinGame: "https://pisces.j.cn/api/joinGame",
    preJoin: "https://pisces.j.cn/api/preJoin",
    shareBonusCoin: "https://pisces.j.cn/api/shareBonusCoin",
    lotteryDetail: "https://pisces.j.cn/api/lotteryDetail",
    receiveLottery: "https://pisces.j.cn/api/receiveLottery",
    getAdsForWxMiniApp: "https://party-gate.j.cn/api/getAdsForWxMiniApp"
};

module.exports.API = t, module.exports.data = {
    diamond: {
        isShowQiandao: !1,
        isShowRule: 0,
        num: 0,
        signCoin: 0,
        newUserFlag: !1
    },
    footer: {
        list: [ {
            name: "fuli",
            targetUrl: "/pages/welfare/fuli/fuli"
        }, {
            name: "user",
            targetUrl: "/pages/welfare/user/user"
        } ]
    },
    adList: [],
    strongPop: {
        preShare: !0,
        preJoinLottery: !0,
        proInfo: null,
        isLoaded: !1
    }
}, module.exports.methods = {
    startConfig: function(a, n) {
        var i = this, r = i.data, s = {};
        try {
            s = wx.getStorageSync("userInfo");
        } catch (a) {
            console.log("本地没存", a);
        }
        s && "object" === (void 0 === s ? "undefined" : e(s)) && Object.keys(s).length > 1 ? (o.globalData.userInfo = s, 
        wx.request({
            url: t.startConfig,
            method: "POST",
            data: {
                shareOpenId: r.router.openId,
                userInfo: {
                    appId: o.globalData.appId,
                    headUrl: s.avatarUrl,
                    nickName: s.nickName,
                    openId: o.globalData.openId
                },
                v: "1.3.3"
            },
            success: function(a) {
                var e = a.data;
                "pages/index/index" !== i.route && "pages/jokedetail/jokedetail" !== i.route && "pages/novel/novel" !== i.route && (console.log(e), 
                e.shareInfo && (e.shareInfo.name = e.shareInfo.title, r.diamond.defaultShare = o.globalData.defaultShare = e.shareInfo), 
                r.diamond.signCoin = e.signCoin, o.globalData.diamond.num = e.totalCoinNum - e.signCoin, 
                r.diamond.newUserFlag = e.newUserFlag, r.diamond.num = o.globalData.diamond.num, 
                r.diamond.isShowQiandao = !!e.signCoin, i.setData(r));
            },
            fail: function(a) {
                console.log("util.js doStartConfig err", a);
            }
        })) : (r.auth.showPanel = !0, i.setData(r));
    },
    timeFormat: function(a) {
        return a < 10 ? "0" + a : a;
    },
    countDown: function() {
        var a = this, e = a.data, o = e.pro.list;
        o.forEach(function(e) {
            var o = null, t = e.countdownMS;
            if (t > 0) {
                var n = t / 1e3, i = parseInt(n / 86400), r = parseInt(n % 86400 / 3600) + 24 * i, s = parseInt(n % 86400 % 3600 / 60), d = parseInt(n % 86400 % 3600 % 60);
                o = {
                    hou: a.timeFormat(r),
                    min: a.timeFormat(s),
                    sec: a.timeFormat(d)
                };
            } else o = {
                hou: "00",
                min: "00",
                sec: "00"
            };
            e.countdownMS = e.countdownMS - 1e3, e.countdownMSObj = o;
        }), e.pro.list = o, a.setData(e), setTimeout(a.countDown, 1e3);
    },
    onShareAppMessage: function() {
        var e = this, t = e.data, n = JSON.parse(JSON.stringify(t.router)), i = {};
        if (o.globalData.maxPricePro = o.globalData.defaultShare || o.globalData.maxPricePro, 
        n.openId = o.globalData.openId, t.diamond.isShowRule) n.from = "share-diamond", 
        n.proId = o.globalData.maxPricePro.id, i = {
            title: o.globalData.userInfo.nickName + " 邀你参与【" + o.globalData.maxPricePro.name + "】免费抽奖",
            path: "/pages/index/index?router=" + e.createRouter(n),
            imageUrl: o.globalData.maxPricePro.picShare || o.globalData.maxPricePro.pic
        }, o.tongJiFuLi("coin-share"); else switch (console.log(n.page), n.page) {
          case "fuli":
            n.from = "share-index", n.proId = o.globalData.maxPricePro.id, i = {
                title: o.globalData.userInfo.nickName + " 邀你参与【" + o.globalData.maxPricePro.name + "】免费抽奖",
                path: "/pages/index/index?router=" + e.createRouter(n),
                imageUrl: o.globalData.maxPricePro.picShare || o.globalData.maxPricePro.pic
            }, o.tongJiFuLi("index-share");
            break;

          case "pro":
            n.from = "share-pro", n.fromList && (n.fromList = ""), i = {
                title: o.globalData.userInfo.nickName + " 邀你参与【" + t.pro.name + "】免费抽奖",
                path: "/pages/index/index?router=" + e.createRouter(n),
                imageUrl: t.pro.picShare || t.pro.pic
            }, o.tongJiFuLi("item-share");
        }
        return console.log("%c 分享数据", "background: orange", i), a({}, i, {
            success: function() {
                if (t.diamond.isShowRule) o.tongJiFuLi("coin-share-success"); else switch (n.page) {
                  case "index":
                    o.tongJiFuLi("index-share-success");
                    break;

                  case "pro":
                    o.tongJiFuLi("item-share-success");
                }
                t.diamond.isShowQiandao = !1, t.diamond.isShowRule = !1, e.setData(t);
            },
            fail: function() {
                console.log("分享失败");
            }
        });
    },
    stopPropagation: function() {},
    execDiamond: function(a) {
        var e = this, t = e.data;
        switch (a.currentTarget.dataset.a) {
          case "toggle-签到面板":
            t.diamond.isShowQiandao = !t.diamond.isShowQiandao, 0 !== t.diamond.signCoin && (o.globalData.diamond.num = o.globalData.diamond.num + t.diamond.signCoin, 
            t.diamond.num = o.globalData.diamond.num, t.diamond.signCoin = 0);
            break;

          case "toggle-签到规则面板":
            t.diamond.isShowRule = !t.diamond.isShowRule, t.diamond.isShowRule && o.tongJiFuLi("coin-click");
        }
        e.setData(t);
    },
    execFooter: function(a) {
        var e = this, o = e.data, t = a.currentTarget.dataset, n = void 0;
        switch (t.a) {
          case "footer 跳转":
            n = o.footer.list[t.index], e.setData(o), wx.reLaunch({
                url: n.targetUrl
            });
        }
        e.setData(o);
    },
    createRouter: function(a) {
        return encodeURIComponent(JSON.stringify(a));
    },
    stopPop: function() {},
    loadADList: function(a, e) {
        var n = this, i = n.data;
        wx.request({
            url: t.getAdsForWxMiniApp,
            method: "POST",
            data: {
                gender: 0,
                openId: o.globalData.openId,
                target: 11
            },
            success: function(e) {
                if (0 == e.data.bizStatus) {
                    if (0 !== e.data.ads.length) {
                        if (e.data.ads.forEach(function(a) {
                            return a.type = "ad";
                        }), "pages/index/index" === n.route) {
                            i.adList = e.data.ads.filter(function(a) {
                                return 1 === a.adType;
                            });
                            var o = e.data.ads.filter(function(a) {
                                return 6 === a.adType;
                            })[0];
                            o && (i.mixinPost.itsId = o.urlpath.match(/itsId\=\d+(?=\&)/)[0].slice(6), i.mixinPost.itsType = o.urlpath.match(/\d+$/)[0]);
                        }
                        var t = e.data.ads.filter(function(a) {
                            return 2 === a.adType;
                        })[0];
                        if (t) {
                            t.proId = decodeURIComponent(t.urlpath).match(/\d+/)[0];
                            var r = t.proId, s = t.imgUrl;
                            i.strongPop.proInfo = {
                                proId: r,
                                imgUrl: s
                            };
                        }
                    }
                    a && a(i.adList), n.setData(i);
                }
            },
            complete: function() {
                e && e();
            }
        });
    },
    cancelJoin: function() {
        var a = this, e = a.data;
        e.diamond.isShowQiandao = !1, a.setData(e), "pages/index/index" === a.route ? e.diamond.newUserFlag ? o.tongJiStrong("new-award-refuse-click") : e.strongPop.preShare ? o.tongJiStrong("award-refuse-click") : o.tongJiStrong("double-refuse-click") : "pages/jokedetail/jokedetail" === a.route && (e.diamond.newUserFlag ? o.tongJiJokeQiang("new-award-refuse-click") : e.strongPop.preShare ? o.tongJiJokeQiang("award-refuse-click") : o.tongJiJokeQiang("double-refuse-click"));
    },
    joinLottery: function(a) {
        var e = this, n = e.data, i = a.currentTarget.dataset;
        n.diamond.num <= 0 ? wx.showToast({
            title: "钻石不足",
            mask: !0,
            duration: 1e3
        }) : (wx.showLoading({
            title: "请稍后",
            mask: !0
        }), i.id || wx.showToast({
            title: "无可抽奖宝贝~",
            icon: "none"
        }), o.tongJiFuLi("strong-lottery-click"), "pages/index/index" === e.route ? n.diamond.newUserFlag ? o.tongJiStrong("new-award-item-click") : n.strongPop.preShare ? o.tongJiStrong("award-item-click") : o.tongJiStrong("double-item-click") : "pages/jokedetail/jokedetail" === e.route && (n.diamond.newUserFlag ? o.tongJiJokeQiang("new-award-item-click") : n.strongPop.preShare ? o.tongJiJokeQiang("award-item-click") : o.tongJiJokeQiang("double-item-click")), 
        wx.request({
            url: t.joinGame,
            method: "POST",
            data: {
                formId: a.detail.formId,
                lotteryId: i.id,
                openId: o.globalData.openId
            },
            success: function(a) {
                var t = a.data;
                0 === t.bizStatus || 1 === t.bizStatus ? (0 === t.bizStatus ? (o.globalData.diamond.num--, 
                n.diamond.num = o.globalData.diamond.num) : console.log(t.bizMessage), n.strongPop.preJoinLottery = !1, 
                "pages/index/index" === e.route ? o.tongJiStrong("success-show") : "pages/jokedetail/jokedetail" === e.route && o.tongJiJokeQiang("success-show"), 
                0 === n.diamond.num && o.tongJiFuLi("coin-runout"), e.setData(n)) : wx.showToast({
                    title: t.bizMessage,
                    icon: "none"
                });
            },
            complete: function() {
                wx.hideLoading();
            }
        }));
    },
    changeStrPop: function(a) {
        var e = this, o = e.data;
        "close" === a.currentTarget.dataset.a && (o.diamond.isShowQiandao = !1), e.setData(o);
    },
    doubleDiamond: function() {
        var a = this, e = a.data;
        wx.showLoading(), wx.request({
            url: t.shareBonusCoin,
            method: "POST",
            data: {
                userInfo: {
                    headUrl: o.globalData.userInfo.avatarUrl,
                    nickName: o.globalData.userInfo.nickName,
                    openId: o.globalData.openId
                },
                v: "1.3.3"
            },
            success: function(t) {
                var n = t.data;
                n.bizStatus = 0, 0 === n.bizStatus ? (e.diamond.num = o.globalData.diamond.num = n.totalCoinNum, 
                e.strongPop.preShare = !1, "pages/index/index" === a.route ? o.tongJiStrong("double-show") : "pages/jokedetail/jokedetail" === a.route && o.tongJiJokeQiang("double-show")) : wx.showToast({
                    title: n.bizMessage,
                    icon: "none"
                }), a.setData(e);
            },
            complete: function() {
                wx.hideLoading();
            }
        });
    },
    tongJiCommon: function(a) {
        var e = this, t = (e.data, a.currentTarget.dataset);
        "pages/index/index" === e.route ? o.tongJiStrong(t.s) : "pages/jokedetail/jokedetail" === e.route && o.tongJiJokeQiang(t.s);
    },
    imgLoaded: function() {
        var a = this, e = a.data;
        e.strongPop.isLoaded = !0, a.setData(e);
    }
};