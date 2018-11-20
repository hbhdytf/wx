var e = Object.assign || function(e) {
    for (var o = 1; o < arguments.length; o++) {
        var t = arguments[o];
        for (var i in t) Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]);
    }
    return e;
}, o = require("../../utils/util-joke").methods.getOpenId, t = require("../../pages/components/common"), i = require("../../utils/util").methods.getUserInfo, a = require("../../utils/util-joke").API, n = require("../../utils/util-fuli").data, s = n.strongPop, r = n.diamond, d = require("../../utils/util-fuli").methods, g = d.createRouter, h = d.cancelJoin, l = d.joinLottery, p = d.stopPop, c = d.changeStrPop, u = d.startConfig, k = d.doubleDiamond, j = d.tongJiCommon, f = d.imgLoaded, m = require("../../utils/util-fuli").API, w = getApp(), L = {
    loadJokeADList: null
};

Page(e({
    data: e({
        system: "",
        router: {},
        userInfo: {},
        windowWidth: 0,
        windowHeight: 0,
        isLoadingMore: !1,
        isAuthAllow: !0,
        jokeADList: [],
        temp: 0,
        minPostion: 0,
        joke: {
            index: 0,
            imgHeight: 0,
            bgColor: "#48b88c",
            isLiked: !1,
            preNum: 3,
            preImg: "",
            showPreOne: !0,
            showPreTwo: !1,
            preImgOne: "",
            preImgOneWidth: 0,
            preImgOneHeight: 0,
            preImgTwo: "",
            preImgTwoWidth: 0,
            preImgTwoHeight: 0,
            preIndex: 0,
            isShowPre: !1,
            isShowLoadingImg: !1
        },
        jokeListImgIndex: 0,
        jokeList: [],
        bgColor: [ "#48b88c", "#b8aa48", "#93b848", "#48b851", "#48b4b8", "#487eb8", "#5248b8", "#8c48b8", "#b848a8", "#b85248", "#9a7d64", "#a78857", "#bf9f40", "#8a7f75" ]
    }, t.data, {
        strongPop: s,
        diamond: r,
        showJokeShareTip: !1,
        awardPro: {},
        showTopAward: !1,
        fuliTop: 0,
        isShowOver: !1
    }),
    showOverWrap: function() {
        var e = this, o = e.data;
        o.isShowOver = !0, e.setData(o);
    },
    replayVideo: function() {
        var e = this, o = e.data;
        o.isShowOver = !1, e.setData(o), e.videoContext.seek(0), console.log(e.videoContext), 
        e.videoContext.play();
    },
    onLoad: function(e) {
        var t = this, i = t.data, a = wx.getSystemInfoSync();
        i.system = /iOS/.test(a.system) ? "ios" : "android", i.windowWidth = a.windowWidth, 
        w.globalData.firstLoad = !1, e.router ? i.router = JSON.parse(decodeURIComponent(e.router)) : i.router = e, 
        i.showJokeShareTip = w.globalData.showJokeShareTip, t.setData(i), console.log("jokelong"), 
        "1" === e.exclude && wx.setStorageSync("exclude", "1"), o(function(o) {
            i.openId = w.globalData.openId = o, i.router.proId && t.fetchProInfo(), t.loadMore({
                itsId: e.itemId,
                inviterOpenId: e.shareOpenId
            }), t.loadJokeADList(), t.setData(i), "share" === e.from && (w.tongJiLongVideo("item-share-success-in"), 
            w.tongJiChangeFeed("changefeed-shareback-" + e.itemId + "-" + e.shareOpenId));
        }), "push" === e.isPush && w.tongJiChangeFeed("changefeed-push-" + e.itemId), w.tongJiLongVideo("item-open"), 
        t.videoContext = wx.createVideoContext("jokeVideo");
    },
    preItem: function() {
        var e = this, o = e.data;
        o.joke.index >= 1 ? (o.joke.index--, w.tongJiLongVideo("prev-click"), e.jokeRender()) : wx.showToast({
            title: "前面没有啦~",
            image: "/static/jokedetail/gantanhao.png"
        }), e.viewJoke(), e.setData(o);
    },
    change: function(e) {
        var o = this, t = o.data, i = parseInt(Date.now() / 1e3);
        w.tongJiLongVideo("next-click"), wx.request({
            url: a.collectFormId,
            method: "POST",
            header: {},
            data: {
                appType: 2,
                items: decodeURIComponent(t.openId + "@@" + e.detail.formId + "@@" + i)
            },
            success: function(e) {}
        }), 0 === t.joke.index && (t.showTopAward = !1, t.showJokeShareTip = w.globalData.showJokeShareTip = !1), 
        t.joke.index < t.jokeList.length - 2 ? (t.joke.index++, "ad" === t.jokeList[t.joke.index].type && w.tongJiLongVideo("ad-show-" + t.jokeList[t.joke.index].id), 
        o.jokeRender(), o.setData(t), "ad" !== t.jokeList[t.joke.index].type && w.tongJiChangeFeed("changefeed-show-" + t.jokeList[t.joke.index].postId)) : o.loadMore({});
    },
    tongJiJokeAd: function() {
        var e = this.data;
        "ad" === e.jokeList[e.joke.index].type && w.tongJiLongVideo("ad-click-" + e.jokeList[e.joke.index].id);
    },
    jokeRender: function() {
        var e = this, o = e.data;
        switch (o.jokeList[o.joke.index].type) {
          case "text":
            o.joke.isShowLoadingImg = !1, o.joke.bgColor = o.bgColor[o.joke.index % o.bgColor.length];
            break;

          case "image":
            o.jokeList[o.joke.index].picWithWHUrls && (o.joke.imgHeight = parseInt(o.windowWidth / o.jokeList[o.joke.index].picWithWHUrls[0].width * o.jokeList[o.joke.index].picWithWHUrls[0].height)), 
            o.joke.isShowLoadingImg = !0;
            break;

          case "video":
            o.jokeList[o.joke.index].content = o.jokeList[o.joke.index].content.replace(/\n/g, " ");
            break;

          case "ad":
            break;

          default:
            console.log("unknown type");
        }
        e.viewJoke(), e.preLoadImg(), o.jokeList.length - o.joke.index <= 5 && e.loadMore({}), 
        e.setData(o);
    },
    preLoadImg: function() {
        var e = this, o = e.data;
        if (!(o.joke.preIndex > o.joke.index)) {
            for (var t = o.joke.index + 1; t < Math.min(o.joke.index + 5, o.jokeList.length); t++) if ("image" === o.jokeList[t].type) {
                o.joke.preImg = o.jokeList[t].url, o.jokeList[t].imgIndex % 2 == 0 ? (o.joke.preImgOne = o.jokeList[t].url, 
                o.joke.preImgOneHeight = o.windowWidth / o.jokeList[t].width * o.jokeList[t].height) : (o.joke.preImgTwo = o.jokeList[t].url, 
                o.joke.preImgTwoHeight = o.windowWidth / o.jokeList[t].width * o.jokeList[t].height), 
                o.joke.preIndex = t, e.setData(o);
                break;
            }
            e.setData(o);
        }
    },
    viewJoke: function() {
        var e = this.data;
        wx.request({
            url: a.reportViewJoke,
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            method: "POST",
            data: {
                postIds: String(e.jokeList[e.joke.index].postId),
                wechatOpenId: e.openId
            },
            success: function(e) {},
            fail: function() {}
        });
    },
    imgLoad: function() {
        var e = this, o = e.data;
        o.joke.isShowLoadingImg = !1, e.setData(o);
    },
    _formatData: function(e) {
        this.data;
        return e && e.length > 0 && e.forEach(function(e) {
            e.videoList && e.videoList.length > 0 ? e.type = "video" : e.picUrlList && e.picUrlList.length > 0 ? e.type = "image" : e.type = "text";
        }), e;
    },
    loadMore: function(e) {
        var o = this, t = o.data;
        t.isLoadingMore ? console.log("正在加载...请稍后") : (t.isLoadingMore = !0, wx.request({
            url: a.fetchLongChangedPostsForMiniProgram,
            method: "GET",
            data: {
                app: "hers",
                inviterOpenId: e.inviterOpenId,
                itsId: e.itsId,
                itsType: 1,
                pageSize: 10,
                wechatOpenId: t.openId
            },
            success: function(e) {
                var i = o._formatData(e.data.changedPosts);
                0 === t.jokeList.length ? (t.jokeList = i, o.jokeRender()) : (t.jokeList = t.jokeList.concat(i), 
                o.jokeRender());
                for (var a = 0; a < t.jokeList.length; a++) "image" === t.jokeList[a].type && (t.jokeList[a].imgIndex = t.jokeListImgIndex, 
                t.jokeListImgIndex++);
                t.isLoadingMore = !1, o.setData(t);
            },
            fail: function() {
                console.log("error"), t.isLoadingMore = !1, o.setData(t);
            },
            complete: function() {
                e.itsId ? w.tongJiChangeFeed("changed-itsshow-" + e.itsId) : 0 === t.joke.index && w.tongJiChangeFeed("changefeed-show-" + t.jokeList[0].postId);
            }
        }));
    },
    onShareAppMessage: function(e) {
        var o = this, t = o.data;
        if ("button" === e.from && /(发给群友|分享翻倍)/.test(e.target.dataset.a)) {
            var i = w.globalData.defaultShare, a = {
                page: "fuli",
                openId: w.globalData.openId,
                from: "share-index-strong",
                proId: i.id
            };
            return {
                title: w.globalData.userInfo.nickName + " 邀你参与【" + i.name + "】免费抽奖",
                path: "/pages/index/index?router=" + o.createRouter(a),
                imageUrl: i.picShare || i.pic,
                success: function() {
                    "发给群友" === e.target.dataset.a ? (t.diamond.isShowQiandao = !1, wx.showToast({
                        title: "转发成功",
                        icon: "none"
                    })) : "分享翻倍" === e.target.dataset.a && o.doubleDiamond(), o.setData(t);
                }
            };
        }
        var n = "", s = "";
        return /(video|image)/.test(t.jokeList[t.joke.index].type) ? (s = "这个太逗了！快看看！", 
        n = t.jokeList[t.joke.index].shareImg || t.jokeList[t.joke.index].videoList[0].thumbPic) : s = "这个太逗了！快看看！", 
        t.jokeList[t.joke.index].share++, o.setData(t), w.tongJiLongVideo("item-share"), 
        w.tongJiChangeFeed("changefeed-share-" + t.jokeList[t.joke.index].postId), {
            title: s,
            path: "/pages/jokelong/jokelong?from=share&itemId=" + t.jokeList[t.joke.index].postId + "&shareOpenId=" + t.openId,
            imageUrl: n,
            success: function() {},
            fail: function() {}
        };
    },
    loadJokeADList: function(e) {
        var o = this, t = o.data, i = void 0;
        try {
            switch (w.globalData.userInfo.gender) {
              case 1:
                i = 1;
                break;

              case 2:
                i = 0;
                break;

              default:
                i = 2;
            }
        } catch (e) {
            i = 2;
        }
        L.loadJokeADList = wx.request({
            url: a.getAdsForWxMiniApp,
            method: "POST",
            data: {
                gender: i,
                openId: t.openId,
                target: 11,
                exclude: wx.getStorageSync("exclude")
            },
            success: function(i) {
                if (200 === i.statusCode) {
                    if (0 == i.data.bizStatus && i.data.ads.length) {
                        i.data.ads.forEach(function(e) {
                            return e.type = "ad";
                        }), t.jokeADList = i.data.ads.filter(function(e) {
                            return 3 === e.adType;
                        }), t.jokeADList.length && o.addAds();
                        var a = i.data.ads.filter(function(e) {
                            return 2 === e.adType;
                        })[0];
                        if (a) {
                            a.proId = decodeURIComponent(a.urlpath).match(/\d+/)[0];
                            var n = a.proId, s = a.imgUrl;
                            t.strongPop.proInfo = {
                                proId: n,
                                imgUrl: s
                            };
                        }
                        o.setData(t);
                    }
                    e && e();
                } else wx.showToast({
                    title: i.errMsg,
                    icon: "none"
                });
            },
            fail: function() {
                console.log("getAdsForWxMiniApp请求错误~");
            }
        });
    },
    addAds: function() {
        var e = this, o = e.data;
        if (console.log(o.jokeADList), 0 !== o.jokeADList.length) {
            for (var t = 0; t < o.jokeADList.length; t++) {
                var i = o.jokeADList[t];
                i.postion <= o.jokeList.length && (0 == o.temp && (o.minPostion = i.postion), i.position < o.minPostion ? (o.jokeList.splice(i.postion, 0, o.jokeADList.splice(t--, 1)[0]), 
                o.minPostion = i.postion) : o.jokeList.splice(i.postion + o.temp, 0, o.jokeADList.splice(t--, 1)[0]), 
                o.temp++);
            }
            e.setData(o);
        }
    },
    goToIndex: function() {
        wx.reLaunch({
            url: "/pages/index/index",
            success: function() {}
        });
    },
    userInfoHandler: function(e) {
        var o = this, t = o.data;
        o.getUserInfo(function(e) {
            if (null === e) return t.auth.showPanel = !0, void o.setData(t);
            t.auth.showPanel = !1, w.globalData.userInfo = e, o.setData(t), o.loadJokeADList(function() {
                t.strongPop.proInfo;
            }), o.startConfig();
        }, function() {
            t.auth.showPanel = !0, o.setData(t);
        });
    },
    onUnload: function() {
        var e = this, o = e.data;
        o.showJokeShareTip = w.globalData.showJokeShareTip = !1, e.setData(o);
    },
    onHide: function() {
        var e = this, o = e.data;
        o.showJokeShareTip = w.globalData.showJokeShareTip = !1, e.setData(o);
    },
    fetchProInfo: function() {
        var e = this, o = e.data;
        wx.request({
            url: m.lotteryDetail,
            method: "POST",
            data: {
                openId: w.globalData.openId,
                id: o.router.proId
            },
            success: function(t) {
                var i = t.data, a = i.detail;
                a.enterCount = i.enterCount, a.enterList = i.enterList, a.winnerList = i.winnerList, 
                a.state = 1 === a.status ? {
                    0: "未中奖",
                    1: "中奖-未领取",
                    2: "中奖-已领取"
                }[a.winStatus] : a.hasEnter ? "等待开奖" : "参与抽奖", a.hasEnter || 1 !== a.status || (a.state = "未参与已开奖"), 
                "中奖-已领取" !== a.state && (o.showTopAward = !0), o.awardPro = a, e.setData(o);
            },
            fail: function(e) {
                wx.showToast({
                    title: "商品信息获取失败",
                    mask: !0
                });
            }
        });
    },
    goToPro: function() {
        var e = this, o = e.data;
        o.showTopAward = !1, e.setData(o), wx.navigateTo({
            url: "/pages/welfare/pro/pro?router=" + e.createRouter(o.router)
        });
    }
}, t.methods, {
    getUserInfo: i,
    startConfig: u,
    cancelJoin: h,
    joinLottery: l,
    stopPop: p,
    changeStrPop: c,
    doubleDiamond: k,
    createRouter: g,
    tongJiCommon: j,
    imgLoaded: f
}));