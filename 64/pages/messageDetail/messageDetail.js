var t = getApp(), e = require("../../utils/util").API;

Page({
    data: {
        userInfo: {},
        messageDetail: {},
        isx: t.globalData.isx,
        textareaHeight: 36,
        replyContent: "",
        autoHeight: !0
    },
    onLoad: function(t) {
        this.setData({
            messageDetail: JSON.parse(decodeURIComponent(t.message)),
            userInfo: wx.getStorageSync("userInfo")
        });
    },
    viewPost: function() {
        wx.navigateTo({
            url: "/pages/detail/detail?themeId=" + this.data.messageDetail.post.rootId + "&style=hot"
        });
    },
    countHeight: function(t) {
        t.detail.lineCount <= 4 && 1 != t.detail.lineCount ? this.setData({
            autoHeight: !0
        }) : this.setData({
            autoHeight: !1
        });
    },
    blurHandle: function() {
        this.setData({
            autoHeight: !0,
            replyContent: ""
        });
    },
    focusHandle: function() {
        t.tongJiNews("news-detail");
    },
    replyPost: function() {
        var a = this, o = a.data;
        return t.tongJiNews("news-detail-replay"), 2 == o.userInfo.gender || t.globalData.isShowAll ? "" == o.replyContent ? wx.showToast({
            title: "请填写回复内容～",
            icon: "none"
        }) : (wx.showLoading(), void wx.request({
            url: e.reply_post,
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            method: "POST",
            data: {
                content: o.replyContent,
                groupId: o.messageDetail.post.groupId,
                rootId: o.messageDetail.post.rootId,
                parentId: o.messageDetail.post.id,
                v: "6.9",
                wechatHeadUrl: o.userInfo.avatarUrl,
                wechatNickName: o.userInfo.nickName,
                wechatOpenId: t.globalData.openId
            },
            success: function(t) {
                0 == t.data.errcode && (wx.hideLoading(), wx.showToast({
                    title: "回复成功",
                    icon: "none"
                }), a.setData({
                    replyContent: "",
                    autoHeight: !0
                }));
            }
        })) : wx.showToast({
            title: "男生无法评论",
            icon: "none"
        });
    },
    setReplyContent: function(t) {
        this.setData({
            replyContent: t.detail.value
        });
    }
});