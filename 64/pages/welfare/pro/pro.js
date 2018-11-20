var t = Object.assign || function(t) {
    for (var e = 1; e < arguments.length; e++) {
        var a = arguments[e];
        for (var o in a) Object.prototype.hasOwnProperty.call(a, o) && (t[o] = a[o]);
    }
    return t;
}, e = require("../../components/common"), a = require("../../../utils/util-fuli"), o = require("../../../utils/util").methods, n = o.getOpenId, r = o.getUserInfo, i = getApp(), s = require("../../../utils/util-fuli").API;

Page(t({
    data: t({}, e.data, a.data, {
        pro: {}
    }),
    exec: function(t) {
        var e = this, a = e.data, o = t.currentTarget.dataset;
        t.detail;
        switch (o.a) {
          case "去首页":
            i.tongJiFuLi("item-home"), "list" === a.router.fromList ? (a.router.fromList = "", 
            e.setData(a), wx.navigateBack({
                url: "/pages/welfare/fuli/fuli"
            })) : wx.reLaunch({
                url: "/pages/welfare/fuli/fuli"
            });
            break;

          case "参与抽奖":
            a.diamond.num <= 0 ? wx.showToast({
                title: "钻石不足",
                mask: !0,
                duration: 1e3,
                complete: function() {
                    setTimeout(function() {
                        a.diamond.isShowRule = !0, e.setData(a);
                    }, 1e3);
                }
            }) : (wx.showLoading({
                title: "请稍后",
                mask: !0
            }), i.tongJiFuLi("item-click"), wx.request({
                url: s.joinGame,
                method: "POST",
                data: {
                    formId: t.detail.formId,
                    lotteryId: a.router.proId,
                    openId: i.globalData.openId
                },
                success: function(t) {
                    t.data;
                    if (wx.hideLoading(), e.fetchProInfo(), i.globalData.productList.length > 0) {
                        var o = i.globalData.productList.findIndex(function(t) {
                            return a.router.proId === t.id;
                        });
                        i.globalData.productList[o].hasEnter = !0;
                    }
                    i.globalData.diamond.num--, a.diamond.num = i.globalData.diamond.num, 0 === a.diamond.num && (setTimeout(function() {
                        a.diamond.isShowRule = !0, e.setData(a);
                    }, 1e3), i.tongJiFuLi("coin-runout")), e.setData(a);
                }
            }));
            break;

          case "领奖":
            i.tongJiFuLi("item-award"), wx.navigateTo({
                url: "/pages/welfare/address/address?router=" + e.createRouter(a.router)
            });
        }
        e.setData(a);
    },
    fetchProInfo: function() {
        var t = this, e = t.data;
        wx.request({
            url: s.lotteryDetail,
            method: "POST",
            data: {
                openId: i.globalData.openId,
                id: e.router.proId
            },
            success: function(a) {
                var o = a.data, n = o.detail;
                n.enterCount = o.enterCount, n.enterList = o.enterList, n.winnerList = o.winnerList, 
                n.state = 1 === n.status ? {
                    0: "未中奖",
                    1: "中奖-未领取",
                    2: "中奖-已领取"
                }[n.winStatus] : n.hasEnter ? "等待开奖" : "参与抽奖", n.hasEnter || 1 !== n.status || (n.state = "未参与已开奖"), 
                e.pro = n, t.countDownItem(), t.setData(e);
            },
            fail: function(t) {
                wx.showToast({
                    title: "商品信息获取失败",
                    mask: !0
                });
            }
        });
    },
    countDownItem: function() {
        var t = this, e = t.data, a = e.pro, o = null, n = a.countdownMS;
        if (n > 0) {
            var r = n / 1e3, i = parseInt(r / 86400), s = parseInt(r % 86400 / 3600) + 24 * i, u = parseInt(r % 86400 % 3600 / 60), d = parseInt(r % 86400 % 3600 % 60);
            o = {
                hou: t.timeFormat(s),
                min: t.timeFormat(u),
                sec: t.timeFormat(d)
            };
        } else o = {
            hou: "00",
            min: "00",
            sec: "00"
        };
        a.countdownMS = a.countdownMS - 1e3, a.countdownMSObj = o, e.pro = a, t.setData(e), 
        setTimeout(t.countDownItem, 1e3);
    },
    userInfoHandler: function() {
        var t = this, e = t.data;
        t.getUserInfo(function(a) {
            if (null === a) return e.auth.showPanel = !0, void t.setData(e);
            t.startConfig(), e.auth.showPanel = !1, t.setData(e);
        });
    },
    onShow: function() {
        var t = this, e = t.data;
        e.router.fromList = "", t.setData(e);
    },
    initRouterAndData: function(t) {
        var e = this, a = e.data;
        t = t || "{}", console.log("%c 原始路由", "background: #ccc", "router=" + t), t = JSON.parse(decodeURIComponent(t)), 
        console.log("%c 路由信息", "background: #ccc", JSON.stringify(t)), t.page = "pro", a.router = t, 
        e.setData(a);
    },
    onLoad: function(t) {
        var e = t.router, a = this, o = a.data;
        a.initRouterAndData(e), wx.setNavigationBarTitle({
            title: "商品详情"
        }), a.getOpenId(function() {
            a.fetchProInfo(), a.startConfig(), i.tongJiFuLi("item-open");
        }), a.setData(o);
    },
    getOpenId: n,
    getUserInfo: r
}, e.methods, a.methods));