var t = Object.assign || function(t) {
    for (var o = 1; o < arguments.length; o++) {
        var a = arguments[o];
        for (var e in a) Object.prototype.hasOwnProperty.call(a, e) && (t[e] = a[e]);
    }
    return t;
}, o = require("../../components/common"), a = require("../../../utils/util"), e = require("../../../utils/util-fuli").data, i = e.diamond, r = e.footer, n = require("../../../utils/util-fuli").API, s = require("../../../utils/util-fuli").methods, d = s.startConfig, l = s.timeFormat, u = s.countDown, c = s.onShareAppMessage, p = s.execDiamond, g = s.execFooter, f = s.createRouter, m = s.stopPop, h = getApp();

Page(t({
    data: t({
        nextPageRecord: "",
        pro: {
            isLoading: !1,
            isLoadAll: !1,
            list: [],
            preList: []
        },
        awardPro: {}
    }, o.data, {
        diamond: i,
        footer: r,
        isShowMsgDot: !1
    }),
    exec: function(t) {
        var o = this, a = o.data, e = t.currentTarget.dataset, i = (t.detail.value, e.index), r = void 0;
        "跳转到产品页" === e.a && (r = a.pro.list[i] || {}, h.tongJiFuLi("list-click"), wx.navigateTo({
            url: "/pages/welfare/pro/pro?router=" + o.createRouter({
                proId: r.id || 0,
                openId: h.globalData.openId,
                fromList: "list"
            })
        }));
    },
    hideMsgDot: function() {
        h.tongJiNews("news"), this.setData({
            isShowMsgDot: !1
        }), h.globalData.isShowMsgDot = !1;
    },
    goToPro: function() {
        var t = this, o = t.data;
        o.isFromTemp = !1, wx.navigateTo({
            url: "/pages/welfare/pro/pro?router=" + t.createRouter({
                proId: o.awardPro.id || 0,
                openId: h.globalData.openId,
                fromList: "list"
            })
        });
    },
    fetchProList: function() {
        var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, o = this, a = o.data;
        a.pro.isLoading ? console.log("加载中") : a.pro.isLoadAll ? console.log("数据加载完毕") : (a.pro.isLoading = !0, 
        wx.request({
            url: n.getStream,
            method: "POST",
            data: {
                its: t.its || "",
                openId: h.globalData.openId,
                pageRecord: a.nextPageRecord || "",
                pageSize: 20,
                topId: t.topId || ""
            },
            success: function(e) {
                var i = e.data;
                if (t.topId) {
                    switch (i.top.winStatus) {
                      case 0:
                        i.top.state = "未中奖";
                        break;

                      case 1:
                        i.top.state = "中奖-未领取";
                        break;

                      case 2:
                        i.top.state = "中奖-已领取";
                        break;

                      default:
                        i.top.state = "未参加";
                    }
                    a.awardPro = i.top;
                }
                a.nextPageRecord = i.nextPageRecord, a.pro.preList = i.preList, a.pro.list = a.pro.list.concat(i.list), 
                o.countDown(), h.globalData.maxPricePro = a.pro.list[0], h.globalData.productList = a.pro.list, 
                a.pro.isLoading = !1, a.pro.isLoadAll = !(i.nextPageRecord || "").trim(), o.setData(a);
            },
            fail: function() {
                wx.showToast({
                    title: "商品信息获取失败",
                    mask: !0
                });
            }
        }), o.setData(a));
    },
    onReachBottom: function() {
        this.fetchProList();
    },
    joinLottery: function(t) {
        console.log(t);
        var o = this, a = o.data, e = t.currentTarget.dataset;
        a.diamond.num <= 0 ? wx.showToast({
            title: "钻石不足",
            mask: !0,
            duration: 1e3,
            complete: function() {
                setTimeout(function() {
                    a.diamond.isShowRule = !0, o.setData(a);
                }, 1e3);
            }
        }) : (wx.showLoading({
            title: "请稍后",
            mask: !0
        }), h.tongJiFuLi("list-lottery-click"), wx.request({
            url: n.joinGame,
            method: "POST",
            data: {
                formId: t.detail.formId,
                lotteryId: e.id,
                openId: h.globalData.openId
            },
            success: function(t) {
                t.data;
                wx.hideLoading();
                var i = h.globalData.productList.findIndex(function(t) {
                    return e.id === t.id;
                });
                h.globalData.productList[i].hasEnter = !0, a.pro.list[i].hasEnter = h.globalData.productList[i].hasEnter, 
                h.globalData.diamond.num--, a.diamond.num = h.globalData.diamond.num, 0 === a.diamond.num && (setTimeout(function() {
                    a.diamond.isShowRule = !0, o.setData(a);
                }, 1e3), h.tongJiFuLi("coin-runout")), o.setData(a);
            }
        }));
    },
    userInfoHandler: function() {
        var t = this, o = t.data;
        t.getUserInfo(function(a) {
            if (null === a) return o.auth.showPanel = !0, void t.setData(o);
            o.auth.showPanel = !1, h.globalData.userInfo = a, t.startConfig(), t.setData(o);
        });
    },
    preJoin: function(t) {
        var o = this, a = o.data, e = t.currentTarget.dataset;
        wx.request({
            url: n.preJoin,
            method: "POST",
            data: {
                formId: t.detail.formId,
                lotteryId: e.id,
                openId: h.globalData.openId
            },
            success: function(t) {
                0 === t.data.bizStatus && (console.log("已设置提醒"), a.pro.preList[e.index].hasPre = !0, 
                o.setData(a));
            },
            fail: function(t) {
                console.log("设置提醒失败： " + t);
            }
        });
    },
    onShow: function() {
        var t = this, o = t.data;
        o.pro.list = h.globalData.productList, o.diamond.num = h.globalData.diamond.num, 
        o.isShowMsgDot = h.globalData.isShowMsgDot, t.setData(o);
    },
    initRouterAndData: function(t) {
        var o = this, a = o.data;
        t = t || "{}", console.log("%c 原始路由", "background: #ccc", "router=" + t), t = JSON.parse(decodeURIComponent(t)), 
        console.log("%c 路由信息", "background: #ccc", JSON.stringify(t)), t.page = "fuli", 
        a.router = t, h.globalData.productList = [], o.setData(a);
    },
    onLoad: function(t) {
        var o = t.router, a = this, e = a.data;
        a.initRouterAndData(o), a.getOpenId(function(t) {
            e.pro.isLoading = !1, e.pro.isLoadAll = !1, a.fetchProList({
                its: e.router.proId || "",
                topId: ""
            }), a.startConfig(), h.tongJiFuLi("list-open");
        }), a.setData(e);
    }
}, o.methods, a.methods, {
    startConfig: d,
    timeFormat: l,
    countDown: u,
    onShareAppMessage: c,
    execDiamond: p,
    execFooter: g,
    createRouter: f,
    stopPop: m
}));