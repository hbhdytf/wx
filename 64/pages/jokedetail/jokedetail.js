var e = Object.assign || function(e) {
    for (var t = 1; t < arguments.length; t++) {
        var o = arguments[t];
        for (var i in o) Object.prototype.hasOwnProperty.call(o, i) && (e[i] = o[i]);
    }
    return e;
}, t = require("../../utils/util-joke").methods.getOpenId, o = require("../../pages/components/common"), i = require("../../utils/util").methods.getUserInfo, a = require("../../utils/util-joke").API, n = require("../../utils/util-fuli").data, s = n.strongPop, r = n.diamond, d = require("../../utils/util-fuli").methods, h = d.createRouter, g = d.cancelJoin, l = d.joinLottery, c = d.stopPop, p = d.changeStrPop, k = d.startConfig, u = d.doubleDiamond, j = d.tongJiCommon, f = d.imgLoaded, m = require("../../utils/util-fuli").API, w = getApp(), I = {
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
    }, o.data, {
        strongPop: s,
        diamond: r,
        showJokeShareTip: !1,
        awardPro: {},
        showTopAward: !1,
        fuliTop: 0,
        showRedBag: !1,
        redBagTimes: 0,
        isShowOver: !1
    }),
    videoPlay: function() {
        wx.showToast("hello");
    },
    playError: function(e) {
        wx.showModal({
            title: "出错了"
        });
    },
    showOverWrap: function() {
        var e = this, t = e.data;
        t.isShowOver = !0, e.setData(t);
    },
    replayVideo: function() {
        var e = this, t = e.data;
        t.isShowOver = !1, e.setData(t), e.videoContext.seek(0), e.videoContext.play();
    },
    onLoad: function(e) {
        var o = this, i = o.data, a = wx.getSystemInfoSync();
        i.system = /iOS/.test(a.system) ? "ios" : "android", i.windowWidth = a.windowWidth, 
        w.globalData.firstLoad = !1, i.redBagTimes = w.globalData.replyTimes, e.router ? i.router = JSON.parse(decodeURIComponent(e.router)) : i.router = e, 
        i.showJokeShareTip = w.globalData.showJokeShareTip, o.setData(i), "1" === e.exclude && wx.setStorageSync("exclude", "1"), 
        t(function(t) {
            i.openId = w.globalData.openId = t, i.router.proId && o.fetchProInfo(), o.loadMore({
                itsId: e.itemId,
                inviterOpenId: e.shareOpenId
            }), o.loadJokeADList(), o.setData(i), "share" === e.from && (w.tongJiJoke("item-share-success-in"), 
            w.tongJiChangeFeed("changefeed-shareback-" + e.itemId + "-" + e.shareOpenId));
        }), "push" === e.isPush && w.tongJiChangeFeed("changefeed-push-" + e.itemId), w.tongJiJoke("item-open"), 
        o.videoContext = wx.createVideoContext("jokeVideo"), o.videoContext.play();
    },
    preItem: function() {
        var e = this, t = e.data;
        t.joke.index >= 1 ? (t.joke.index--, w.tongJiJoke("prev-click"), e.jokeRender()) : wx.showToast({
            title: "前面没有啦~",
            image: "/static/jokedetail/gantanhao.png"
        }), e.viewJoke(), e.setData(t);
    },
    change: function(e) {
        var t = this, o = t.data, i = parseInt(Date.now() / 1e3);
        w.tongJiJoke("next-click"), wx.request({
            url: a.collectFormId,
            method: "POST",
            header: {},
            data: {
                appType: 2,
                items: decodeURIComponent(o.openId + "@@" + e.detail.formId + "@@" + i)
            },
            success: function(e) {}
        }), 0 === o.joke.index && (o.showTopAward = !1, o.showJokeShareTip = w.globalData.showJokeShareTip = !1), 
        o.joke.index < o.jokeList.length - 2 ? (o.joke.index++, "ad" === o.jokeList[o.joke.index].type && w.tongJiJoke("ad-show-" + o.jokeList[o.joke.index].id), 
        t.jokeRender(), t.setData(o), "ad" !== o.jokeList[o.joke.index].type && w.tongJiChangeFeed("changefeed-show-" + o.jokeList[o.joke.index].postId)) : t.loadMore({});
    },
    tongJiJokeAd: function() {
        var e = this.data;
        "ad" === e.jokeList[e.joke.index].type && w.tongJiJoke("ad-click-" + e.jokeList[e.joke.index].id);
    },
    jokeRender: function() {
        var e = this, t = e.data;
        switch (t.jokeList[t.joke.index].type) {
          case "text":
            t.joke.isShowLoadingImg = !1, t.joke.bgColor = t.bgColor[t.joke.index % t.bgColor.length];
            break;

          case "image":
            t.jokeList[t.joke.index].picWithWHUrls && (t.joke.imgHeight = parseInt(t.windowWidth / t.jokeList[t.joke.index].picWithWHUrls[0].width * t.jokeList[t.joke.index].picWithWHUrls[0].height)), 
            t.joke.isShowLoadingImg = !0;
            break;

          case "video":
            t.jokeList[t.joke.index].content = t.jokeList[t.joke.index].content.replace(/\n/g, " "), 
            t.isShowOver = !1;
            break;

          case "ad":
            break;

          default:
            console.log("unknown type");
        }
        9 === t.joke.index && "ad" !== t.jokeList[t.joke.index].type ? (t.redBagTimes++, 
        w.globalData.replyTimes = t.redBagTimes, 1 === t.redBagTimes && (t.showRedBag = !0, 
        w.tongJiTalk("shipin-tanchuang-show"))) : t.showRedBag = !1, e.viewJoke(), e.preLoadImg(), 
        t.jokeList.length - t.joke.index <= 5 && e.loadMore({}), e.setData(t);
    },
    preLoadImg: function() {
        var e = this, t = e.data;
        if (!(t.joke.preIndex > t.joke.index)) {
            for (var o = t.joke.index + 1; o < Math.min(t.joke.index + 5, t.jokeList.length); o++) if ("image" === t.jokeList[o].type) {
                t.joke.preImg = t.jokeList[o].url, t.jokeList[o].imgIndex % 2 == 0 ? (t.joke.preImgOne = t.jokeList[o].url, 
                t.joke.preImgOneHeight = t.windowWidth / t.jokeList[o].width * t.jokeList[o].height) : (t.joke.preImgTwo = t.jokeList[o].url, 
                t.joke.preImgTwoHeight = t.windowWidth / t.jokeList[o].width * t.jokeList[o].height), 
                t.joke.preIndex = o, e.setData(t);
                break;
            }
            e.setData(t);
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
        var e = this, t = e.data;
        t.joke.isShowLoadingImg = !1, e.setData(t);
    },
    _formatData: function(e) {
        this.data;
        return e && e.length > 0 && e.forEach(function(e) {
            e.videoList && e.videoList.length > 0 ? e.type = "video" : e.picUrlList && e.picUrlList.length > 0 ? e.type = "image" : e.type = "text";
        }), e;
    },
    loadMore: function(e) {
        var t = this, o = t.data;
        o.isLoadingMore ? console.log("正在加载...请稍后") : (o.isLoadingMore = !0, wx.request({
            url: a.fetchChangedPostsForMiniProgram,
            method: "GET",
            data: {
                app: "hers",
                inviterOpenId: e.inviterOpenId,
                itsId: e.itsId,
                itsType: 1,
                pageSize: 10,
                wechatOpenId: o.openId
            },
            success: function(e) {
                var i = t._formatData(e.data.changedPosts);
                0 === o.jokeList.length ? o.jokeList = i : o.jokeList = o.jokeList.concat(i), Math.floor(o.jokeList.length / 10) <= 10 && o.jokeList.splice(o.jokeList.length, 0, {
                    type: "cpmAd"
                }), t.jokeRender();
                for (var a = 0; a < o.jokeList.length; a++) "image" === o.jokeList[a].type && (o.jokeList[a].imgIndex = o.jokeListImgIndex, 
                o.jokeListImgIndex++);
                o.isLoadingMore = !1, t.setData(o);
            },
            fail: function() {
                console.log("error"), o.isLoadingMore = !1, t.setData(o);
            },
            complete: function() {
                e.itsId ? w.tongJiChangeFeed("changed-itsshow-" + e.itsId) : 0 === o.joke.index && w.tongJiChangeFeed("changefeed-show-" + o.jokeList[0].postId);
            }
        }));
    },
    onShow: function() {
        wx.createVideoContext("jokeVideo").play();
    },
    onShareAppMessage: function(e) {
        var t = this, o = t.data;
        if ("button" === e.from && /(发给群友|分享翻倍)/.test(e.target.dataset.a)) {
            var i = w.globalData.defaultShare, a = {
                page: "fuli",
                openId: w.globalData.openId,
                from: "share-index-strong",
                proId: i.id
            };
            return {
                title: w.globalData.userInfo.nickName + " 邀你参与【" + i.name + "】免费抽奖",
                path: "/pages/index/index?router=" + t.createRouter(a),
                imageUrl: i.picShare || i.pic,
                success: function() {
                    "发给群友" === e.target.dataset.a ? (o.diamond.isShowQiandao = !1, wx.showToast({
                        title: "转发成功",
                        icon: "none"
                    })) : "分享翻倍" === e.target.dataset.a && t.doubleDiamond(), t.setData(o);
                }
            };
        }
        var n = "", s = "";
        return /(video|image)/.test(o.jokeList[o.joke.index].type) ? (s = "这个太逗了！快看看！", 
        n = o.jokeList[o.joke.index].shareImg || o.jokeList[o.joke.index].videoList[0].thumbPic) : s = "这个太逗了！快看看！", 
        o.jokeList[o.joke.index].share++, t.setData(o), w.tongJiJoke("item-share"), w.tongJiChangeFeed("changefeed-share-" + o.jokeList[o.joke.index].postId), 
        {
            title: s,
            path: "/pages/jokedetail/jokedetail?from=share&itemId=" + o.jokeList[o.joke.index].postId + "&shareOpenId=" + o.openId,
            imageUrl: n,
            success: function() {},
            fail: function() {}
        };
    },
    loadJokeADList: function(e) {
        var t = this, o = t.data, i = void 0;
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
        I.loadJokeADList = wx.request({
            url: a.getAdsForWxMiniApp,
            method: "POST",
            data: {
                gender: i,
                openId: o.openId,
                target: 11,
                exclude: wx.getStorageSync("exclude")
            },
            success: function(i) {
                if (200 === i.statusCode) {
                    if (0 == i.data.bizStatus && i.data.ads.length) {
                        i.data.ads.forEach(function(e) {
                            return e.type = "ad";
                        }), o.jokeADList = i.data.ads.filter(function(e) {
                            return 3 === e.adType;
                        }), o.jokeADList.length && t.addAds();
                        var a = i.data.ads.filter(function(e) {
                            return 2 === e.adType;
                        })[0];
                        if (a) {
                            a.proId = decodeURIComponent(a.urlpath).match(/\d+/)[0];
                            var n = a.proId, s = a.imgUrl;
                            o.strongPop.proInfo = {
                                proId: n,
                                imgUrl: s
                            };
                        }
                        t.setData(o);
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
        var e = this, t = e.data;
        if (console.log(t.jokeADList), 0 !== t.jokeADList.length) {
            for (var o = 0; o < t.jokeADList.length; o++) {
                var i = t.jokeADList[o];
                i.postion <= t.jokeList.length && (0 == t.temp && (t.minPostion = i.postion), i.position < t.minPostion ? (t.jokeList.splice(i.postion, 0, t.jokeADList.splice(o--, 1)[0]), 
                t.minPostion = i.postion) : t.jokeList.splice(i.postion + t.temp, 0, t.jokeADList.splice(o--, 1)[0]), 
                t.temp++);
            }
            e.setData(t);
        }
    },
    userInfoHandler: function(e) {
        var t = this, o = t.data;
        t.getUserInfo(function(e) {
            if (null === e) return o.auth.showPanel = !0, void t.setData(o);
            o.auth.showPanel = !1, w.globalData.userInfo = e, t.setData(o), t.loadJokeADList(function() {
                o.strongPop.proInfo;
            }), t.startConfig();
        }, function() {
            o.auth.showPanel = !0, t.setData(o);
        });
    },
    onUnload: function() {
        var e = this, t = e.data;
        t.showJokeShareTip = w.globalData.showJokeShareTip = !1, e.setData(t);
    },
    onHide: function() {
        var e = this, t = e.data;
        t.showJokeShareTip = w.globalData.showJokeShareTip = !1, e.setData(t);
    },
    fetchProInfo: function() {
        var e = this, t = e.data;
        wx.request({
            url: m.lotteryDetail,
            method: "POST",
            data: {
                openId: w.globalData.openId,
                id: t.router.proId
            },
            success: function(o) {
                var i = o.data, a = i.detail;
                a.enterCount = i.enterCount, a.enterList = i.enterList, a.winnerList = i.winnerList, 
                a.state = 1 === a.status ? {
                    0: "未中奖",
                    1: "中奖-未领取",
                    2: "中奖-已领取"
                }[a.winStatus] : a.hasEnter ? "等待开奖" : "参与抽奖", a.hasEnter || 1 !== a.status || (a.state = "未参与已开奖"), 
                "中奖-已领取" !== a.state && (t.showTopAward = !0), t.awardPro = a, e.setData(t);
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
        var e = this, t = e.data;
        t.showTopAward = !1, e.setData(t), wx.navigateTo({
            url: "/pages/welfare/pro/pro?router=" + e.createRouter(t.router)
        });
    },
    exec: function(e) {
        var t = this, o = t.data, i = e.currentTarget.dataset.a;
        if ("关闭红包弹窗" === i) o.showRedBag = !1, t.setData(o); else if (/去首页/.test(i)) {
            var a = "";
            "弹窗去首页" === i ? a = "/pages/detail/detail?themeId=1362247586&style=hot" : "icon去首页" === i && (a = "/pages/index/index"), 
            wx.reLaunch({
                url: a,
                success: function() {
                    "弹窗去首页" === i ? w.tongJiTalk("shipin-tanchuang-click") : "icon去首页" === i && w.tongJiTalk("shipin-icon"), 
                    w.tongJiJoke("back-click");
                }
            });
        }
    }
}, o.methods, {
    getUserInfo: i,
    startConfig: k,
    cancelJoin: g,
    joinLottery: l,
    stopPop: c,
    changeStrPop: p,
    doubleDiamond: u,
    createRouter: h,
    tongJiCommon: j,
    imgLoaded: f
}));