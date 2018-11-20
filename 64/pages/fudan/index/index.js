var a = Object.assign || function(a) {
    for (var e = 1; e < arguments.length; e++) {
        var t = arguments[e];
        for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (a[n] = t[n]);
    }
    return a;
}, e = getApp(), t = require("../../components/common"), n = (require("../../../utils/util-talk").API, 
require("../../../utils/util-talk").data), r = n.accoutInfo, s = (n.themeId, require("../../../utils/util-talk").methods), o = s.miniProgramChatCashHomePage, i = s.getAdsThemeId, u = s.routeHandler, c = s.stopPop, d = require("../../../utils/util").methods, g = d.getOpenId, h = d.getUserInfo;

Page(a({
    data: a({
        currentTab: "success",
        accoutInfo: r
    }, t.data),
    onShareAppMessage: function() {
        this.data;
        return e.tongJiTalk("share"), e.tongJiTalk("share1"), {
            title: "帮我回一下，一起赚现金。",
            path: "/pages/fudan/index/index?from=talkshare",
            imageUrl: "/static/tixian/tixian-share.jpg",
            success: function() {
                e.tongJiTalk("share-success"), e.tongJiTalk("share-1-success");
            }
        };
    },
    toggleTab: function(a) {
        var t = this, n = t.data, r = a.currentTarget.dataset.a;
        if ("success" === r) {
            if (e.tongJiTalk("success"), "success" === n.currentTab) return;
            n.currentTab = "success";
        } else if ("pedding" === r) {
            if (e.tongJiTalk("wait"), "pedding" === n.currentTab) return;
            n.currentTab = "pedding";
        }
        t.setData(n);
    },
    fetchMoneySuccess: function(a) {
        var e = this, t = e.data, n = t.award.openedAwardEggs.findIndex(function(e) {
            return e.id === a;
        });
        t.award.openedAwardEggs[n].status = 1e4, t.award.amount = Math.round(100 * t.award.amount + 100 * t.award.openedAwardEggs[n].exchangeAmount) / 100, 
        setTimeout(function() {
            t.award.openedAwardEggs[n].status = 2, e.setData(t);
        }, 2e3), e.setData(t);
    },
    onShow: function() {
        this.data;
    },
    onLoad: function(a) {
        var t = this;
        t.data;
        a.from && ("talkshare" === a.from ? (e.tongJiTalk("shareback"), e.tongJiTalk("shareback1")) : "cashshare" === a.from ? (e.tongJiTalk("shareback"), 
        e.tongJiTalk("shareback2")) : "commentShare" === a.from ? e.tongji("comment-shareback") : "template" === a.from && e.tongJiTalk("inform-open")), 
        t.getOpenId(function(a) {
            e.globalData.openId = a, t.userInfoHandler(), e.tongJiTalk("index");
        });
    },
    userInfoHandler: function() {
        var a = this, t = a.data;
        a.getUserInfo(function(n) {
            if (null === n) return t.auth.showPanel = !0, void a.setData(t);
            t.auth.showPanel = !1, e.globalData.userInfo = n, a.getAdsThemeId(), a.setData(t);
        }, function() {
            t.auth.showPanel = !0, a.setData(t);
        });
    },
    getAdsThemeId: i,
    miniProgramChatCashHomePage: o
}, t.methods, {
    getOpenId: g,
    getUserInfo: h,
    stopPop: c,
    routeHandler: u
}));