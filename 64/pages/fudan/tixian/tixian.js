var t = getApp(), a = require("../../../utils/util-talk").API, e = require("../../../utils/util-talk").data.accoutInfo, o = require("../../../utils/util-fudan").data.firstWithdraw, i = require("../../../utils/util-talk").methods.miniProgramChatCashHomePage, n = require("../../../utils/util-fudan").methods.fetchMiniAccountInfo;

Page({
    data: {
        outList: [ {
            amount: 2,
            isVip: !0
        }, {
            amount: 5,
            isVip: !1
        }, {
            amount: 10,
            isVip: !1
        }, {
            amount: 30,
            isVip: !1
        } ],
        currentMoney: -1,
        accoutInfo: e,
        firstWithdraw: o,
        isShowSuccessTip: !1
    },
    formSubmitHandler: function(t) {},
    chooseMoney: function(t) {
        var a = this, e = a.data, o = t.currentTarget.dataset.a;
        if (e.currentMoney !== o) return 2 != o || e.firstWithdraw ? void (e.accoutInfo.totalMoney < o ? wx.showToast({
            title: "余额不足",
            icon: "none"
        }) : (e.currentMoney = t.currentTarget.dataset.a, a.setData(e))) : wx.showToast({
            title: "您不是新用户~",
            icon: "none"
        });
    },
    onLoad: function() {
        var a = this;
        a.data;
        t.tongJiTalk("cash"), this.fetchMiniAccountInfo(), a.miniProgramChatCashHomePage();
    },
    withdrawForMiniProgram: function() {
        var e = this, o = e.data;
        o.currentMoney < 0 ? wx.showToast({
            title: "请选择提取金额",
            icon: "none"
        }) : wx.request({
            url: a.withdrawForMiniProgram,
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            method: "POST",
            data: {
                app: "hers",
                v: 6.8,
                amount: o.currentMoney,
                wechatHeadUrl: wx.getStorageSync("userInfo").avatarUrl,
                wechatNickName: wx.getStorageSync("userInfo").nickName,
                wechatOpenId: t.globalData.openId
            },
            success: function(a) {
                0 === a.data.errCode ? (o.accoutInfo.totalMoney = Math.round(100 * o.accoutInfo.totalMoney - 100 * o.currentMoney) / 100, 
                o.isShowSuccessTip = !0, t.tongJiTalk("withdraw-success"), e.setData(o)) : wx.showToast({
                    title: a.data.errMessage,
                    icon: "none"
                });
            }
        });
    },
    closeSuccessTip: function() {
        var t = this, a = t.data;
        a.isShowSuccessTip = !1, t.setData(a);
    },
    onShareAppMessage: function() {
        this.data;
        return t.tongJiTalk("share"), t.tongJiTalk("share1"), {
            title: "真的有钱，我领到了，你试试！",
            path: "/pages/fudan/index/index?from=cashshare",
            imageUrl: "/static/tixian/tixian-share.jpg",
            success: function() {
                t.tongJiTalk("share-success"), t.tongJiTalk("cash-2-success");
            }
        };
    },
    miniProgramChatCashHomePage: i,
    fetchMiniAccountInfo: n
});