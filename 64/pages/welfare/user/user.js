var e = getApp(), t = require("../../../utils/util").methods.getOpenId, a = require("../../../utils/util-fuli").data.footer, o = require("../../../utils/util-fuli").methods, r = o.execFooter, i = o.createRouter, s = require("../../../utils/util-talk").data.accoutInfo, n = require("../../../utils/util-talk").methods, c = n.miniProgramChatCashHomePage, d = n.routeHandler, l = require("../../../utils/util-fuli").API;

Page({
    data: {
        nextPageRecord: "",
        pagesLength: 1,
        isLoadAll: !1,
        record: {
            list: []
        },
        userInfo: {},
        accoutInfo: s,
        footer: a
    },
    exec: function(t) {
        var a = this, o = a.data, r = t.currentTarget.dataset, i = (t.detail, r.index), s = void 0;
        switch (r.a) {
          case "去详情页":
            s = o.record.list[i], wx.navigateTo({
                url: "/pages/welfare/pro/pro?router=" + a.createRouter({
                    proId: s.id,
                    openId: e.globalData.openId
                })
            });
            break;

          case "领奖":
            e.tongJiFuLi("profile-award"), s = o.record.list[i], wx.navigateTo({
                url: "/pages/welfare/address/address?router=" + a.createRouter({
                    proId: s.id,
                    openId: e.globalData.openId
                })
            });
        }
        a.setData(o);
    },
    onReachBottom: function() {
        var e = this;
        e.data;
        e.fetchRecordList();
    },
    fetchRecordList: function() {
        var t = this, a = t.data;
        a.isLoadAll ? console.log("加载完了~") : wx.request({
            url: l.personalNews,
            method: "POST",
            data: {
                openId: e.globalData.openId,
                pageRecord: a.nextPageRecord || "",
                pageSize: 20
            },
            success: function(e) {
                var o = e.data;
                a.record.list = a.record.list.concat(o.list), a.nextPageRecord = o.nextPageRecord, 
                a.isLoadAll = !(o.nextPageRecord || "").trim(), t.setData(a);
            },
            fail: function(e) {
                console.log("user/index.js err fetchRecordList 错误");
            }
        });
    },
    onLoad: function(t) {
        var a = t.router, o = this, r = o.data;
        a = a || "{}", console.log("%c 原始路由", "background: #ccc", "router=" + a), a = JSON.parse(decodeURIComponent(a)), 
        console.log("%c 路由信息", "background: #ccc", JSON.stringify(a)), r.router = a, a.page = "user", 
        r.pagesLength = getCurrentPages().length, wx.setNavigationBarTitle({
            title: "我的"
        }), o.getOpenId(function() {
            r.isLoadAll = !1, r.userInfo = e.globalData.userInfo = wx.getStorageSync("userInfo"), 
            o.fetchRecordList(), e.tongJiFuLi("profile-open"), o.miniProgramChatCashHomePage(), 
            o.setData(r);
        }), o.setData(r);
    },
    getOpenId: t,
    execFooter: r,
    createRouter: i,
    miniProgramChatCashHomePage: c,
    routeHandler: d
});