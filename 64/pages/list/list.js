var t = Object.assign || function(t) {
    for (var a = 1; a < arguments.length; a++) {
        var e = arguments[a];
        for (var o in e) Object.prototype.hasOwnProperty.call(e, o) && (t[o] = e[o]);
    }
    return t;
}, a = getApp(), e = require("../components/common"), o = require("../../utils/util"), i = o.API;

Page(t({
    data: t({
        openId: "",
        userInfo: "",
        lazyLoad: {
            isEnd: !1,
            num: 5
        },
        themeList: [],
        isShowMsgDot: !1
    }, e.data),
    onShow: function() {
        this.setData({
            isShowMsgDot: a.globalData.isShowMsgDot
        });
    },
    onLoad: function() {
        var t = this, e = t.data;
        a.tongji("theme-open"), t.getOpenId(function(o) {
            e.openId = o, t.setData(e), wx.showLoading({
                title: "正在加载..."
            }), wx.request({
                url: i.postListForMiniProgram,
                header: {
                    "content-type": "application/x-www-form-urlencoded"
                },
                method: "GET",
                success: function(o) {
                    if (0 == o.data.errCode) {
                        e.themeList = o.data.postListItemForMiniProgram;
                        for (var i = 0; i < e.lazyLoad.num; i++) a.tongji("list-show-" + e.themeList[i].postId);
                        e.showList = e.themeList.slice(0, e.lazyLoad.num);
                    }
                    t.setData(e);
                },
                complete: function() {
                    wx.hideLoading();
                }
            });
        }), t.setData(e);
    },
    onReachBottom: function() {
        var t = this, e = t.data, o = e.lazyLoad.num;
        if (!e.lazyLoad.isEnd) {
            e.lazyLoad.num += 5, e.lazyLoad.num >= e.themeList.length && (e.lazyLoad.num = e.themeList.length, 
            e.lazyLoad.isEnd = !0);
            for (var i = o; i < e.lazyLoad.num; i++) a.tongji("list-show-" + e.themeList[i].postId);
        }
        t.setData(e);
    },
    hideMsgDot: function() {
        a.tongJiNews("news"), this.setData({
            isShowMsgDot: !1
        }), a.globalData.isShowMsgDot = !1;
    },
    goHot: function(t) {
        var a = this, e = a.data;
        wx.redirectTo({
            url: "/pages/index/index"
        }), a.setData(e);
    },
    goDetail: function(t) {
        var a = this, e = a.data, o = t.currentTarget.dataset;
        console.log(o.id), wx.navigateTo({
            url: "/pages/detail/detail?themeId=" + o.id
        }), a.setData(e);
    },
    onShareAppMessage: function(t) {
        this.data;
        var e = void 0;
        if (a.globalData.userInfo) {
            var o = {
                inviterOpenId: a.globalData.openId,
                inviterHeadUrl: a.globalData.userInfo.avatarUrl,
                inviterNickName: a.globalData.userInfo.nickName
            };
            e = "/pages/index/index?inviterInfo=" + encodeURIComponent(JSON.stringify(o));
        } else e = "/pages/index/index";
        return console.log(e), {
            title: "她社区，8500万女性的精神家园",
            path: e,
            success: function(t) {
                wx.showToast({
                    title: "分享成功"
                });
            },
            fail: function(t) {}
        };
    }
}, e.methods, o.methods));