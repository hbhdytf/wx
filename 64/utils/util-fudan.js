var e = getApp(), a = {
    fetchMiniAccountInfo: "https://bbs.j.cn/api/fetchMiniAccountInfo",
    drawEgg: "https://bbs.j.cn/api/drawEgg",
    inviteFriend: "https://bbs.j.cn/api/inviteFriend",
    withdrawForMiniProgram: "https://bbs.j.cn/api/withdrawForMiniProgram"
};

module.exports.API = a, module.exports.data = {
    showFudanTip: !1,
    award: {
        amount: 0,
        unDrawEggCount: 0,
        unOpenAwardEggs: [],
        openedAwardEggs: []
    },
    firstWithdraw: !1,
    showSharePop: !1,
    oneDayThreeTimes: !0
}, module.exports.methods = {
    closeShareTip: function() {
        var e = this, a = e.data;
        a.showFudanTip = !1, e.setData(a);
    },
    fetchMiniAccountInfo: function(t) {
        var n = this, i = n.data;
        wx.request({
            url: a.fetchMiniAccountInfo,
            method: "GET",
            data: {
                app: "hers",
                v: 6.8,
                wechatHeadUrl: e.globalData.userInfo.avatarUrl,
                wechatNickName: e.globalData.userInfo.nickName,
                wechatOpenId: e.globalData.openId
            },
            success: function(e) {
                0 === e.data.errCode && (i.firstWithdraw = e.data.firstWithdraw, e.data.amount > 0 && t && t(), 
                n.setData(i));
            }
        });
    },
    goToTiXian: function(a) {
        this.data.award.amount <= 0 || (a && ("fudanindex" === a.currentTarget.dataset.a ? e.tongji("moneyegg-cash") : "user" === a.currentTarget.dataset.a && e.tongji("fuli-my-cash")), 
        wx.navigateTo({
            url: "/pages/fudan/tixian/tixian"
        }));
    },
    inviteFriend: function() {
        var t = this, n = t.data;
        if (null !== e.globalData.inviterInfo) {
            var i = e.globalData.inviterInfo, o = i.inviterOpenId, r = i.inviterHeadUrl, s = i.inviterNickName;
            wx.request({
                url: a.inviteFriend,
                method: "POST",
                header: {
                    "content-type": "application/x-www-form-urlencoded"
                },
                data: {
                    app: "hers",
                    v: 6.8,
                    inviterHeadUrl: r,
                    inviterNickName: s,
                    inviterOpenId: o,
                    wechatOpenId: e.globalData.openId
                },
                success: function(e) {
                    0 === e.data.errCode ? (console.log("邀请成功"), t.setData(n)) : wx.showToast({
                        title: e.data.errMessage,
                        icon: "none"
                    });
                }
            });
        }
    },
    goToFuDan: function(a) {
        var t = this, n = t.data;
        if (a) {
            var i = a.currentTarget.dataset;
            "index" === i.a ? e.tongji("hot-moneyegg-click") : "user" === i.a ? e.tongji("fuli-my-moneyegg") : (i.a = "moneyicon") && e.tongji("make-money-seeegg");
        }
        wx.navigateTo({
            url: "/pages/fudan/index/index",
            success: function() {
                (a.currentTarget.dataset.a = "moneyicon") && (n.showSharePop = !1, t.setData(n));
            }
        });
    },
    stopPop: function() {},
    changeSharePop: function(a) {
        var t = this, n = t.data;
        "open" === a.currentTarget.dataset.a ? (n.showSharePop = !0, e.tongji("make-money")) : n.showSharePop = !1, 
        t.setData(n);
    },
    getComeToDetailTimes: function() {
        var e = this, a = e.data, t = wx.getStorageSync("comeToDetailTimes");
        "" === t ? wx.setStorageSync("comeToDetailTimes", {
            date: new Date().getDate(),
            times: 1
        }) : t.date !== new Date().getDate() ? wx.setStorageSync("comeToDetailTimes", {
            date: new Date().getDate(),
            times: 1
        }) : wx.setStorageSync("comeToDetailTimes", {
            date: new Date().getDate(),
            times: t.times + 1
        }), a.oneDayThreeTimes = wx.getStorageSync("comeToDetailTimes").times < 4, e.setData(a);
    }
};