function e(e, t, a) {
    return t in e ? Object.defineProperty(e, t, {
        value: a,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[t] = a, e;
}

var t = getApp(), a = require("../../utils/util").methods, s = a.getMessageList, o = a.selectFormId, n = a.toggleTab, i = a.getOpenId, r = require("../../utils/util").API;

Page({
    data: {
        userInfo: {},
        messages: null,
        isShowReplyArea: !1,
        autoFocus: !1,
        pageRecord: "",
        pageSize: 10,
        textareaHeight: 36,
        hasMoreMessage: !0,
        replyPostParams: {},
        replyContent: "",
        autoHeight: !0,
        replyIndex: null
    },
    onLoad: function() {
        this.getMessageList();
    },
    onShow: function() {
        this.setData({
            userInfo: wx.getStorageSync("userInfo")
        });
    },
    onReachBottom: function() {
        this.data.hasMoreMessage && this.getMessageList();
    },
    toMsgDetailPage: function(e) {
        t.tongJiNews("tiezi"), wx.navigateTo({
            url: "/pages/messageDetail/messageDetail?message=" + encodeURIComponent(JSON.stringify(e.currentTarget.dataset.message))
        });
    },
    toPraiseListPage: function(a) {
        t.tongJiNews("zan");
        var s = "messages[" + a.currentTarget.dataset.index + "].newMsgCount";
        this.setData(e({}, s, 0)), wx.navigateTo({
            url: "/pages/praiseList/praiseList"
        });
    },
    viewPost: function(e) {
        wx.navigateTo({
            url: "/pages/detail/detail?themeId=" + e.currentTarget.dataset.postId + "&style=hot"
        });
    },
    replyPost: function() {
        var a = this, s = a.data;
        return 2 == s.userInfo.gender || t.globalData.isShowAll ? "" == s.replyContent ? wx.showToast({
            title: "请填写回复内容～",
            icon: "none"
        }) : (wx.showLoading(), void wx.request({
            url: r.reply_post,
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            method: "POST",
            data: {
                content: s.replyContent,
                groupId: s.replyPostParams.groupId,
                rootId: s.replyPostParams.rootId,
                parentId: s.replyPostParams.id,
                v: "6.9",
                wechatHeadUrl: s.userInfo.avatarUrl,
                wechatNickName: s.userInfo.nickName,
                wechatOpenId: t.globalData.openId
            },
            success: function(t) {
                if (0 == t.data.errcode) {
                    wx.hideLoading(), wx.showToast({
                        title: "回复成功",
                        icon: "none"
                    }), a.hideReplyArea();
                    var o = "messages[" + s.replyIndex + "].replyButton";
                    a.setData(e({
                        relyContent: "",
                        autoHeight: !0
                    }, o, 2));
                }
            }
        })) : wx.showToast({
            title: "男生无法评论",
            icon: "none"
        });
    },
    getMessageList: function() {
        var e = this, t = e.data;
        wx.showLoading(), s({
            pageRecord: t.pageRecord,
            pageSize: t.pageSize,
            type: 0
        }).then(function(a) {
            wx.hideLoading(), "" == t.pageRecord ? t.messages = a.messages : t.messages = t.messages.concat(a.messages), 
            a.messages.length < t.pageSize && (t.hasMoreMessage = !1), t.pageRecord = a.nextPageRecord, 
            e.setData(t);
        });
    },
    replyHandle: function(e) {
        console.log(), t.tongJiNews("reply"), this.setData({
            replyPostParams: e.currentTarget.dataset.post,
            replyIndex: e.currentTarget.dataset.index
        }), this.showReplyArea();
    },
    showReplyArea: function() {
        this.setData({
            isShowReplyArea: !0,
            autoFocus: !0
        });
    },
    setReplyContent: function(e) {
        this.setData({
            replyContent: e.detail.value
        });
    },
    hideReplyArea: function() {
        this.setData({
            isShowReplyArea: !1,
            autoFocus: !1,
            autoHeight: !0
        });
    },
    countHeight: function(e) {
        e.detail.lineCount <= 4 && 1 != e.detail.lineCount ? this.setData({
            autoHeight: !0
        }) : this.setData({
            autoHeight: !1
        });
    },
    selectFormId: o,
    toggleTab: n,
    getOpenId: i
});