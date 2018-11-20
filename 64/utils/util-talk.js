var t = getApp(), e = {
    withdrawForMiniProgram: "https://bbs.j.cn/api/withdrawForMiniProgram",
    miniProgramChatCashHomePage: "https://bbs.j.cn/api/miniProgramChatCashHomePage",
    getAdsThemeId: "https://bbs.j.cn/api/trialReports"
}, a = require("./util").API, o = a.fetchHotPostsForMiniProgram, i = a.reportViewPostIdsForMiniProgram;

module.exports.API = e, module.exports.data = {
    accoutInfo: {},
    themeId: null
}, module.exports.methods = {
    stopPop: function() {},
    getAdsThemeId: function() {
        var t = this, a = t.data;
        wx.request({
            url: e.getAdsThemeId,
            method: "GET",
            data: {
                tagId: 1312,
                pageNo: 1
            },
            success: function(e) {
                a.themeId = e.data.postList[e.data.postList.length - 1].postId, t.miniProgramChatCashHomePage();
            },
            fail: function(t) {
                wx.showToast({
                    title: "出现错误，请重试"
                });
            }
        });
    },
    miniProgramChatCashHomePage: function(a) {
        var o = this, i = o.data;
        wx.request({
            url: e.miniProgramChatCashHomePage,
            method: "GET",
            data: {
                app: "hers",
                v: 6.8,
                wechatHeadUrl: t.globalData.userInfo.avatarUrl,
                wechatNickName: t.globalData.userInfo.nickName,
                wechatOpenId: t.globalData.openId
            },
            success: function(t) {
                t.data.error && "pages/fudan/index/index" === o.route && wx.reLaunch({
                    url: "/pages/index/index"
                }), 0 === t.data.errCode && (i.accoutInfo = t.data, t.data.totalMoney > 0 && a && a(), 
                o.setData(i));
            }
        });
    },
    routeHandler: function(e) {
        var a = this.data, o = e.currentTarget.dataset.a;
        if ("去规则" === o) wx.navigateTo({
            url: "../rule/rule"
        }); else if ("去首页" === o) wx.reLaunch({
            url: "/pages/detail/detail?themeId=" + a.themeId + "&style=hot",
            success: function() {
                t.tongJiTalk("zhuanqian");
            }
        }); else if ("去我的" === o) wx.navigateTo({
            url: "/pages/fudan/tixian/tixian",
            success: function() {
                t.tongJiTalk("tixian");
            }
        }); else if ("去提现" === o) {
            if (0 === Object.keys(a.accoutInfo).length) return;
            wx.navigateTo({
                url: "/pages/fudan/tixian/tixian",
                success: function() {
                    t.tongJiTalk("tixian");
                }
            });
        } else if ("去活动" === o) wx.navigateTo({
            url: "/pages/fudan/index/index",
            success: function() {
                t.tongJiTalk("icon");
            }
        }); else if ("撩一下" === o) {
            var i = e.currentTarget.dataset.postid;
            wx.navigateTo({
                url: "/pages/detail/detail?themeId=" + i + "&style=hot",
                success: function() {
                    t.tongJiTalk("liao");
                }
            });
        }
    },
    _formatData: function(t) {
        return t.map(function(t) {
            if (1 === t.showType) t.videoList && t.videoList.length > 0 ? t.type = "postvideo" : t.type = "posttext"; else if (2 === t.showType) t.type = "huati"; else if (3 === t.showType) {
                var e = t.videoList[0].lengthInMillis / 1e3, a = parseInt(e / 60, 10), o = Math.ceil(e % 60);
                t.type = "jokevideo", t.videoDuration = (a < 10 ? "0" + a : a) + ":" + (o < 10 ? "0" + o : o);
            }
            return {
                postId: t.postId,
                showType: t.showType,
                type: t.type,
                content: t.content,
                picUrlList: t.picUrlList,
                videoList: t.videoList,
                videoDuration: t.videoDuration
            };
        });
    },
    fetchHotList: function(e, a, i) {
        wx.request({
            url: o,
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            method: "GET",
            data: {
                app: "hers",
                pageRecord: t.globalData.nextPageRecord,
                pageSize: 10,
                wechatOpenId: e.openId,
                itsId: e.itsId,
                itsType: e.itsType,
                net: "wifi"
            },
            success: function(o) {
                0 == o.data.errCode && (o.data.hotPostList = exports.methods._formatData(o.data.hotPostList), 
                t.globalData.nextPageRecord = o.data.nextPageRecord, e.itsId ? t.globalData.themeList = o.data.hotPostList : t.globalData.themeList = t.globalData.themeList.concat(o.data.hotPostList), 
                a && a(o.data.hotPostList, o.data.kuaikanRecentReadUrl));
            },
            complete: function(t) {
                i && i();
            }
        });
    },
    viewReport: function(e) {
        wx.request({
            url: i,
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            method: "POST",
            data: {
                postIds: e.length > 1 ? e.join(",") : e[0],
                wechatOpenId: t.globalData.openId
            },
            success: function() {}
        });
    }
};