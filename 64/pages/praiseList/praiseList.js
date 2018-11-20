var e = getApp(), s = require("../../utils/util").methods.getMessageList;

Page({
    data: {
        pageRecord: "",
        pageSize: 10,
        messages: [],
        hasMoreMessage: !0
    },
    onLoad: function() {
        this.getMessageList();
    },
    onReachBottom: function() {
        this.data.hasMoreMessage && this.getMessageList();
    },
    getMessageList: function() {
        var e = this, a = e.data;
        s({
            pageRecord: a.pageRecord,
            pageSize: a.pageSize,
            type: 3
        }).then(function(s) {
            "" == a.pageRecord ? a.messages = s.messages : a.messages = a.messages.concat(s.messages), 
            s.messages.length < a.pageSize && (a.hasMoreMessage = !1), a.pageRecord = s.nextPageRecord, 
            e.setData(a);
        }).catch(function(e) {
            console.log(e);
        });
    },
    viewPost: function(e) {
        wx.navigateTo({
            url: "/pages/detail/detail?themeId=" + e.currentTarget.dataset.postId + "&style=hot"
        });
    },
    viewPraiseDetail: function(s) {
        e.tongJiNews("zan-detail"), wx.navigateTo({
            url: "/pages/praiseDetail/praiseDetail?post=" + encodeURIComponent(JSON.stringify(s.currentTarget.dataset.post))
        });
    }
});