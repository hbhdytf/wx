var n = require("./utils/util").methods.getOpenId, e = require("./utils/util").API, o = {
    main: "miniapp-hers",
    fuli: "miniapp-hers-fuli",
    strong: "miniapp-hers-qiangtongzhi",
    jokeVideo: "miniapp-hers-video",
    jokeVideoStrong: "miniapp-hers-video-qiang",
    readTime: "miniapp-hers-hot-detail-readtime",
    changeFeed: "miniapp-changefeed",
    novel: "miniapp-hers-novel",
    hersTalk: "hers-liaotian",
    jokeVideoLong: "miniapp-hers-longvideo",
    news: "hers-news"
};

App({
    globalData: {
      appId: "wxcae3c74262f528b3",
        isShowAll: "",
        userInfo: null,
        openId: "",
        maxPricePro: {},
        defaultShare: null,
        productList: [],
        diamond: {
            num: 0
        },
        isFirstInMini: !1,
        inviterInfo: null,
        showJokeShareTip: !1,
        firstLoad: !0,
        replyTimes: 0,
        redBagTimes: 0,
        themeList: [],
        isx: !1,
        isShowMsgDot: !1
    },
    onLaunch: function(e) {
        var o = this;
        wx.getSystemInfo({
            success: function(n) {
                var e = n.model.toLowerCase();
                -1 == e.search("<iphone10,3>") && -1 == e.search("<iphone10,6>") && -1 == e.search("<iphone11,2>") && -1 == e.search("<iphone11,4>") && -1 == e.search("<iphone11,6>") && -1 == e.search("<iphone11,8>") && -1 == e.search("iphone x") || (o.globalData.isx = !0);
            }
        }), n(function(n) {
            o.globalData.openId = n, o.globalData.isFirstInMini = !0, o.globalData.showJokeShareTip = !0;
        }), o.getShowState();
    },
    tongji: function(e) {
        n(function(n) {
            var t = {
                url: "https://share.j.cn/js/1x1.gif?ucs=" + encodeURIComponent("UTF-8") + "&un=" + encodeURIComponent("statistic_channel." + o.main + "_logname." + e + "_login.0") + "&timestamp=" + encodeURIComponent(Date.now()) + "&jcnappid=" + encodeURIComponent(n) + "&jcnuserid=" + encodeURIComponent(n),
                method: "GET",
                data: {},
                success: function(n) {},
                fail: function(n) {
                    console.log("统计失败", e, n);
                }
            };
            wx.request(t);
        });
    },
    tongJiFuLi: function(e) {
        n(function(n) {
            var t = {
                url: "https://share.j.cn/js/1x1.gif?ucs=" + encodeURIComponent("UTF-8") + "&un=" + encodeURIComponent("statistic_channel." + o.fuli + "_logname." + e + "_login.0") + "&timestamp=" + encodeURIComponent(Date.now()) + "&jcnappid=" + encodeURIComponent(n) + "&jcnuserid=" + encodeURIComponent(n),
                method: "GET",
                data: {},
                success: function(n) {
                    console.log(e);
                },
                fail: function(n) {
                    console.log("统计失败", e, n);
                }
            };
            wx.request(t);
        });
    },
    tongJiStrong: function(e) {
        n(function(n) {
            var t = {
                url: "https://share.j.cn/js/1x1.gif?ucs=" + encodeURIComponent("UTF-8") + "&un=" + encodeURIComponent("statistic_channel." + o.strong + "_logname." + e + "_login.0") + "&timestamp=" + encodeURIComponent(Date.now()) + "&jcnappid=" + encodeURIComponent(n) + "&jcnuserid=" + encodeURIComponent(n),
                method: "GET",
                data: {},
                success: function(n) {
                    console.log(e);
                },
                fail: function(n) {
                    console.log("统计失败", e, n);
                }
            };
            wx.request(t);
        });
    },
    tongJiJoke: function(e) {
        n(function(n) {
            var t = {
                url: "https://share.j.cn/js/1x1.gif?ucs=" + encodeURIComponent("UTF-8") + "&un=" + encodeURIComponent("statistic_channel." + o.jokeVideo + "_logname." + e + "_login.0") + "&timestamp=" + encodeURIComponent(Date.now()) + "&jcnappid=" + encodeURIComponent(n) + "&jcnuserid=" + encodeURIComponent(n),
                method: "GET",
                data: {},
                success: function(n) {
                    console.log(e);
                },
                fail: function(n) {
                    console.log("统计失败", e, n);
                }
            };
            wx.request(t);
        });
    },
    tongJiJokeQiang: function(e) {
        n(function(n) {
            var t = {
                url: "https://share.j.cn/js/1x1.gif?ucs=" + encodeURIComponent("UTF-8") + "&un=" + encodeURIComponent("statistic_channel." + o.jokeVideoStrong + "_logname." + e + "_login.0") + "&timestamp=" + encodeURIComponent(Date.now()) + "&jcnappid=" + encodeURIComponent(n) + "&jcnuserid=" + encodeURIComponent(n),
                method: "GET",
                data: {},
                success: function(n) {
                    console.log(e);
                },
                fail: function(n) {
                    console.log("统计失败", e, n);
                }
            };
            wx.request(t);
        });
    },
    tongReadTime: function(e) {
        n(function(n) {
            var t = {
                url: "https://share.j.cn/js/1x1.gif?ucs=" + encodeURIComponent("UTF-8") + "&un=" + encodeURIComponent("statistic_channel." + o.readTime + "_logname." + e + "_login.0") + "&timestamp=" + encodeURIComponent(Date.now()) + "&jcnappid=" + encodeURIComponent(n) + "&jcnuserid=" + encodeURIComponent(n),
                method: "GET",
                data: {},
                success: function(n) {
                    console.log(e);
                },
                fail: function(n) {
                    console.log("统计失败", e, n);
                }
            };
            wx.request(t);
        });
    },
    tongJiChangeFeed: function(e) {
        n(function(n) {
            var t = {
                url: "https://share.j.cn/js/1x1.gif?ucs=" + encodeURIComponent("UTF-8") + "&un=" + encodeURIComponent("statistic_channel." + o.changeFeed + "_logname." + e + "_login.0") + "&timestamp=" + encodeURIComponent(Date.now()) + "&jcnappid=" + encodeURIComponent(n) + "&jcnuserid=" + encodeURIComponent(n),
                method: "GET",
                data: {},
                success: function(n) {
                    console.log(e);
                },
                fail: function(n) {
                    console.log("统计失败", e, n);
                }
            };
            wx.request(t);
        });
    },
    tongJiNovel: function(e) {
        n(function(n) {
            var t = {
                url: "https://share.j.cn/js/1x1.gif?ucs=" + encodeURIComponent("UTF-8") + "&un=" + encodeURIComponent("statistic_channel." + o.novel + "_logname." + e + "_login.0") + "&timestamp=" + encodeURIComponent(Date.now()) + "&jcnappid=" + encodeURIComponent(n) + "&jcnuserid=" + encodeURIComponent(n),
                method: "GET",
                data: {},
                success: function(n) {
                    console.log(e);
                },
                fail: function(n) {
                    console.log("统计失败", e, n);
                }
            };
            wx.request(t);
        });
    },
    tongJiTalk: function(e) {
        n(function(n) {
            var t = {
                url: "https://share.j.cn/js/1x1.gif?ucs=" + encodeURIComponent("UTF-8") + "&un=" + encodeURIComponent("statistic_channel." + o.hersTalk + "_logname." + e + "_login.0") + "&timestamp=" + encodeURIComponent(Date.now()) + "&jcnappid=" + encodeURIComponent(n) + "&jcnuserid=" + encodeURIComponent(n),
                method: "GET",
                data: {},
                success: function(n) {
                    console.log(e);
                },
                fail: function(n) {
                    console.log("统计失败", e, n);
                }
            };
            wx.request(t);
        });
    },
    tongJiLongVideo: function(e) {
        n(function(n) {
            var t = {
                url: "https://share.j.cn/js/1x1.gif?ucs=" + encodeURIComponent("UTF-8") + "&un=" + encodeURIComponent("statistic_channel." + o.jokeVideoLong + "_logname." + e + "_login.0") + "&timestamp=" + encodeURIComponent(Date.now()) + "&jcnappid=" + encodeURIComponent(n) + "&jcnuserid=" + encodeURIComponent(n),
                method: "GET",
                data: {},
                success: function(n) {
                    console.log(e);
                },
                fail: function(n) {
                    console.log("统计失败", e, n);
                }
            };
            wx.request(t);
        });
    },
    tongJiNews: function(e) {
        n(function(n) {
            var t = {
                url: "https://share.j.cn/js/1x1.gif?ucs=" + encodeURIComponent("UTF-8") + "&un=" + encodeURIComponent("statistic_channel." + o.news + "_logname." + e + "_login.0") + "&timestamp=" + encodeURIComponent(Date.now()) + "&jcnappid=" + encodeURIComponent(n) + "&jcnuserid=" + encodeURIComponent(n),
                method: "GET",
                data: {},
                success: function(n) {
                    console.log(e);
                },
                fail: function(n) {
                    console.log("统计失败", e, n);
                }
            };
            wx.request(t);
        });
    },
    getShowState: function() {
        var n = this;
        wx.request({
            url: e.fetchminiProgramExamineOn,
            method: "GET",
            success: function(e) {
                n.globalData.isShowAll = e.data.showAll;
            }
        });
    }
});