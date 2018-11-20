function t(t) {
    if (Array.isArray(t)) {
        for (var e = 0, a = Array(t.length); e < t.length; e++) a[e] = t[e];
        return a;
    }
    return Array.from(t);
}

var e = Object.assign || function(t) {
    for (var e = 1; e < arguments.length; e++) {
        var a = arguments[e];
        for (var o in a) Object.prototype.hasOwnProperty.call(a, o) && (t[o] = a[o]);
    }
    return t;
}, a = getApp(), o = require("../components/common"), i = require("../../utils/util"), n = require("../../utils/util-fuli").data, s = n.adList, r = n.strongPop, d = n.diamond, l = require("../../utils/util-fuli").API, u = require("../../utils/util-fuli").methods, c = u.createRouter, h = u.loadADList, g = u.cancelJoin, p = u.joinLottery, f = u.stopPop, L = u.changeStrPop, m = u.startConfig, w = u.doubleDiamond, I = u.tongJiCommon, y = u.imgLoaded, D = require("../../utils/util-fudan").data, v = D.showFudanTip, T = D.award, P = D.showSharePop, A = require("../../utils/util-fudan").methods, b = A.closeShareTip, x = A.fetchMiniAccountInfo, z = A.goToFuDan, R = A.inviteFriend, S = A.changeSharePop, j = require("../../utils/util-talk").methods, k = j.routeHandler, M = j.fetchHotList, J = j._formatData, O = j.viewReport, N = i.API;

Page(e({
    data: e({
        openId: "",
        userInfo: "",
        router: "",
        lazyLoad: {
            isEnd: !1,
            isLoading: !1,
            single: 0,
            num: 5,
            nextPageRecord: 0,
            direction: "lower",
            showUpTip: "none",
            list: [],
            videoCount: 0,
            jokeVideoCount: 0,
            adNum: 0
        },
        themeList: [],
        awardPro: {},
        showTopAward: !1,
        isPreAwardIn: !1,
        adList: s,
        showPositionOneAd: !0,
        pullDownTimes: 0,
        showFudanTip: v,
        showFuDanPanel: !1
    }, o.data, {
        award: T,
        showSharePop: P,
        strongPop: r,
        diamond: d,
        jokeList: [],
        fuliTop: 74,
        kuaikanRecentReadUrl: "",
        mixinPost: {
            itsId: "",
            itsType: ""
        },
        newMessageCount: 10,
        isShowMsgDot: !1
    }),
    onLoad: function(t) {
        var e = this;
        e.data;
        a.globalData.firstLoad ? (a.globalData.firstLoad = !1, e.getOpenId(function(a) {
            e.fetchLandingPageType(a, t, function() {
                e.onLoadHandler(t);
            });
        })) : e.onLoadHandler(t);
    },
    onShow: function() {
        var t = this.data;
        a.globalData.themeList.length > 0 && (t.themeList = a.globalData.themeList, this.setData(t)), 
        a.globalData.userInfo && this.getMessageNum();
    },
    hideMsgDot: function() {
        a.tongJiNews("news"), this.setData({
            isShowMsgDot: !1
        }), a.globalData.isShowMsgDot = !1;
    },
    onLoadHandler: function(t) {
        var e = this, o = e.data;
        t.router ? (o.router = JSON.parse(decodeURIComponent(t.router)), 2 === Object.keys(o.router).length && o.router.proId && o.router.its && (o.isPreAwardIn = !0)) : (o.router = t, 
        o.router.itsId && (o.showPositionOneAd = !1), t.inviterInfo && (a.globalData.inviterInfo = JSON.parse(decodeURIComponent(t.inviterInfo)))), 
        e.getOpenId(function(i) {
            o.openId = i;
            try {
                wx.reportAnalytics("to_remen", {
                    itstype: o.router.itsType,
                    itsid: o.router.itsId,
                    router: o.router,
                    openid: o.openId
                });
            } catch (t) {
                console.log("err");
            }
            a.globalData.isFirstInMini ? (e.loadADList(function(t) {
                e.tongjiAdView(t);
            }, function() {
                a.globalData.themeList.length > 0 ? o.themeList = a.globalData.themeList : !o.router.itsId && o.mixinPost.itsId ? e.getHotList({
                    itsId: o.mixinPost.itsId,
                    itsType: o.mixinPost.itsType
                }) : e.getHotList(t);
            }), a.globalData.isFirstInMini = !1) : e.getHotList(t), e.userInfoHandler(), o.router.proId && e.fetchProInfo();
        }), e.onLoadHadnlerTongJi(t);
    },
    onLoadHadnlerTongJi: function(t) {
        if (a.tongji("hot-open"), t.router) {
            var e = JSON.parse(decodeURIComponent(t.router));
            1 === Object.keys(e).length ? a.tongJiFuLi("lottery-awarditem-temp") : 2 === Object.keys(e).length && e.proId && e.its && a.tongJiFuLi("notice-awarditem-temp"), 
            "share-index" === e.from ? a.tongJiFuLi("index-share-success-in") : "share-pro" === e.from ? a.tongJiFuLi("item-share-success-in") : "share-diamond" === e.from && a.tongJiFuLi("coin-share-success-in");
        } else t.itsId && ("push" !== t.isPush && null !== a.globalData.inviterInfo ? a.tongji("share-back-" + t.itsId + "-" + a.globalData.inviterInfo.inviterOpenId) : a.tongji("share-push-" + t.itsId));
    },
    onPullDownRefresh: function() {
        var t = this, e = t.data;
        wx.showNavigationBarLoading();
        var o = e.lazyLoad.num;
        e.lazyLoad.num += 5, e.pullDownTimes++, e.lazyLoad.list = e.themeList.slice(o, e.lazyLoad.num).concat(e.lazyLoad.list), 
        1 === e.pullDownTimes && (e.showPositionOneAd = !0), t.addAdsToPostList();
        for (var i = [], n = o; n < Math.min(e.lazyLoad.num, e.themeList.length); n++) i.push(e.themeList[n].postId);
        a.tongji("hot-list-" + i.join("-")), t.viewReport(i), e.lazyLoad.showUpTip = "block", 
        wx.hideNavigationBarLoading(), wx.stopPullDownRefresh(), setTimeout(function() {
            e.lazyLoad.showUpTip = "none", e.showTopAward = !1, t.setData(e);
        }, 2e3), "-1" != e.lazyLoad.nextPageRecord && e.themeList.length - o <= 6 && t.getHotList(), 
        t.setData(e);
    },
    onReachBottom: function() {
        var t = this, e = t.data, o = e.lazyLoad.num;
        if ("-1" != e.lazyLoad.nextPageRecord && e.themeList.length - o <= 6) t.getHotList(null, function() {
            e.lazyLoad.num += 5, e.lazyLoad.list = e.lazyLoad.list.concat(e.themeList.slice(o, e.lazyLoad.num)), 
            t.pushAdsToList();
            for (var i = [], n = o; n < Math.min(e.lazyLoad.num, e.themeList.length); n++) i.push(e.themeList[n].postId);
            a.tongji("hot-list-" + i.join("-")), t.viewReport(i), t.setData(e);
        }); else {
            e.lazyLoad.num += 5, e.lazyLoad.list = e.lazyLoad.list.concat(e.themeList.slice(o, e.lazyLoad.num)), 
            t.pushAdsToList();
            for (var i = [], n = o; n < Math.min(e.lazyLoad.num, e.themeList.length); n++) i.push(e.themeList[n].postId);
            a.tongji("hot-list-" + i.join("-")), t.viewReport(i), t.setData(e);
        }
    },
    getMessageNum: function() {
        var t = this, e = (t.data, wx.getStorageSync("openId"));
        wx.request({
            url: N.noReadMessageCount,
            data: {
                v: "6.9",
                app: "hers",
                wechatHeadUrl: a.globalData.userInfo.avatarUrl,
                wechatNickName: a.globalData.userInfo.nickName,
                wechatOpenId: e
            },
            success: function(e) {
                0 == e.data.errCode ? e.data.messageCount && (t.setData({
                    isShowMsgDot: !0
                }), a.globalData.isShowMsgDot = !0) : wx.showToast({
                    title: e.data.errMessage,
                    icon: "none"
                });
            },
            fail: function(t) {
                console.log(t);
            }
        });
    },
    getHotList: function(t, e) {
        var o = this, i = o.data, n = "", s = "", r = !1;
        i.lazyLoad.isLoading || (i.lazyLoad.isLoading = !0, t && (n = t.itsId, s = t.itsType, 
        r = !0), M({
            openId: i.openId,
            itsId: n,
            itsType: s
        }, function(t, n) {
            if (i.lazyLoad.nextPageRecord = a.globalData.nextPageRecord, r) {
                i.themeList = t, i.lazyLoad.list = i.themeList.slice(0, 5), o.pushAdsToList(), i.kuaikanRecentReadUrl = n;
                for (var s = [], d = 0; d < 5; d++) s.push(i.themeList[d].postId);
                o.viewReport(s), a.tongji("hot-list-" + s.join("-"));
            } else i.themeList = i.themeList.concat(t);
            e && e();
        }, function() {
            i.lazyLoad.isLoading = !1, o.setData(i);
        }));
    },
    viewReport: O,
    goDetail: function(t) {
        var e = this, o = e.data, i = t.currentTarget.dataset, n = "";
        console.log(i.type), "postad" !== i.type && ("huati" === i.type ? n = "/pages/detail/detail?themeId=" + i.id : "jokevideo" === i.type || "postvideo" === i.type ? ("jokevideo" === i.type ? a.tongJiJoke("list-click") : a.tongji("video-detail"), 
        n = "/pages/jokedetail/jokedetail?itemId=" + i.id) : n = "/pages/detail/detail?themeId=" + i.id + "&style=hot", 
        wx.navigateTo({
            url: n
        }), e.setData(o));
    },
    onShareAppMessage: function(t) {
        var e = this, o = e.data, i = void 0;
        if (a.globalData.userInfo) if ("button" === t.from && /(发给群友|分享翻倍)/.test(t.target.dataset.a)) {
            var n = a.globalData.defaultShare, s = {
                page: "fuli",
                openId: a.globalData.openId,
                from: "share-index-strong",
                proId: n.id
            };
            i = "/pages/index/index?router=" + e.createRouter(s);
        } else i = "/pages/index/index"; else i = "/pages/index/index";
        if (console.log(i), "button" === t.from && /(发给群友|分享翻倍)/.test(t.target.dataset.a)) {
            var r = a.globalData.defaultShare;
            return {
                title: a.globalData.userInfo.nickName + " 邀你参与【" + r.name + "】免费抽奖",
                path: i,
                imageUrl: r.picShare || r.pic,
                success: function() {
                    "发给群友" === t.target.dataset.a ? (o.diamond.isShowQiandao = !1, wx.showToast({
                        title: "转发成功",
                        icon: "none"
                    })) : "分享翻倍" === t.target.dataset.a && e.doubleDiamond(), e.setData(o);
                }
            };
        }
        return {
            title: "我转发篇文章给你，点开看看！",
            path: i,
            success: function(t) {
                wx.showToast({
                    title: "分享成功"
                }), a.tongji("share-success"), e.setData(o);
            },
            fail: function(t) {},
            complete: function() {}
        };
    },
    fetchProInfo: function() {
        var t = this, e = t.data;
        wx.request({
            url: l.lotteryDetail,
            method: "POST",
            data: {
                openId: a.globalData.openId,
                id: e.router.proId
            },
            success: function(a) {
                var o = a.data, i = o.detail;
                i.enterCount = o.enterCount, i.enterList = o.enterList, i.winnerList = o.winnerList, 
                i.state = 1 === i.status ? {
                    0: "未中奖",
                    1: "中奖-未领取",
                    2: "中奖-已领取"
                }[i.winStatus] : i.hasEnter ? "等待开奖" : "参与抽奖", i.hasEnter || 1 !== i.status || (i.state = "未参与已开奖"), 
                "中奖-已领取" !== i.state && (e.showTopAward = !0), e.awardPro = i, t.setData(e);
            },
            fail: function(t) {
                wx.showToast({
                    title: "商品信息获取失败",
                    mask: !0
                });
            }
        });
    },
    goToAddress: function() {
        var t = this, e = t.data;
        e.showTopAward = !1, t.setData(e), wx.navigateTo({
            url: "/pages/welfare/address/address?router=" + t.createRouter(e.router)
        });
    },
    goToPro: function() {
        var t = this, e = t.data;
        e.showTopAward = !1, t.setData(e), wx.navigateTo({
            url: "/pages/welfare/pro/pro?router=" + t.createRouter(e.router)
        });
    },
    pushAdsToList: function() {
        var e = this, a = e.data;
        if (0 !== a.adList.length) {
            var o = [].concat(t(a.adList));
            a.adList.forEach(function(t) {
                a.lazyLoad.list.length > t.postion && (a.lazyLoad.list.splice(t.postion, 0, t), 
                a.lazyLoad.adNum++, o.shift());
            }), a.adList = o, e.setData(a);
        }
    },
    addAdsToPostList: function() {
        var t = this, e = t.data, a = e.lazyLoad.list.filter(function(t) {
            return "ad" === t.type && 1 === t.fixed;
        });
        e.adList = a.concat(e.adList), e.lazyLoad.list = e.lazyLoad.list.filter(function(t) {
            return "ad" !== t.type;
        }), e.lazyLoad.adNum = 0, t.pushAdsToList();
    },
    userInfoHandler: function() {
        var t = this, e = t.data;
        t.getUserInfo(function(o) {
            if (null === o) return e.auth.showPanel = !0, void t.setData(e);
            e.auth.showPanel = !1, a.globalData.userInfo = o, t.getMessageNum(), t.setData(e);
        }, function() {
            e.auth.showPanel = !0, t.setData(e);
        });
    },
    tongJiAdId: function(t) {
        var e = t.currentTarget.dataset.id;
        wx.request({
            url: N.clickAdInWxMiniApp,
            method: "POST",
            data: {
                adId: e,
                openId: a.globalData.openId
            },
            success: function(t) {
                0 === t.data.bizStatus && console.log("success");
            }
        }), a.tongJiFuLi("minin-clici-" + e);
    },
    tongjiAdView: function(t) {
        this.data;
        !t && Array.isArray(t) && t.length > 0 || t.forEach(function(t) {
            wx.request({
                url: N.viewAdInWxMiniApp + "/api/viewAdInWxMiniApp",
                method: "POST",
                data: {
                    openId: a.globalData.openId,
                    adId: t.id
                },
                success: function(t) {
                    t = t.data;
                }
            });
        });
    },
    _formatData: J,
    goToNovel: function() {
        var t = {
            kuaikanReadUrl: this.data.kuaikanRecentReadUrl
        };
        wx.navigateTo({
            url: "/pages/novel/novel?router=" + encodeURIComponent(JSON.stringify(t)),
            success: function() {
                a.tongJiNovel("re-read-click");
            }
        });
    },
    createRouter: c,
    loadADList: h
}, o.methods, i.methods, {
    closeShareTip: b,
    fetchMiniAccountInfo: x,
    goToFuDan: z,
    inviteFriend: R,
    changeSharePop: S,
    cancelJoin: g,
    joinLottery: p,
    stopPop: f,
    changeStrPop: L,
    startConfig: m,
    doubleDiamond: w,
    tongJiCommon: I,
    imgLoaded: y,
    routeHandler: k
}));