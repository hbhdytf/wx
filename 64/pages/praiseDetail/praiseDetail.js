getApp();

var a = require("../../utils/util").API;

Page({
    data: {
        msgList: [],
        pageRecord: "",
        pageSize: 20,
        postId: null,
        paramsData: {},
        hasMoreMessage: !0
    },
    onLoad: function(a) {
        this.setData({
            paramsData: JSON.parse(decodeURIComponent(a.post))
        }), this.getMsgUerList();
    },
    onReachBottom: function() {
        this.data.hasMoreMessage && this.getMsgUerList();
    },
    getMsgUerList: function() {
        var t = this, s = t.data;
        wx.request({
            url: a.msgUserList,
            data: {
                app: "hers",
                pageRecord: s.pageRecord,
                pageSize: 20,
                postId: s.paramsData.id,
                rootId: s.paramsData.rootId,
                type: s.paramsData.id == s.paramsData.rootId ? 4 : 2,
                v: "6.9"
            },
            success: function(a) {
                0 == a.data.errCode && ("" == s.pageRecord ? s.msgList = a.data.msgList : s.msgList = s.msgList.concat(a.data.msgList), 
                a.data.msgList.length < s.pageSize && (s.hasMoreMessage = !1), s.pageRecord = a.data.nextPageRecord, 
                t.setData(s));
            }
        });
    }
});