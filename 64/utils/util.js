var e = {
    fetchOpenIdByJSCode: "https://bbs.j.cn/api/fetchOpenIdByJSCode",
    postListForMiniProgram: "https://bbs.j.cn/api/postListForMiniProgram",
    postDetailForMiniProgram: "https://bbs.j.cn/api/postDetailForMiniProgram",
    reply_topic: "https://bbs.j.cn/api/reply_topic",
    fetchminiProgramExamineOn: "https://bbs.j.cn/api/fetchminiProgramExamineOn?v=1.3.3",
    giveThumbsUp: "https://bbs.j.cn/api/giveThumbsUp",
    fetchHotPostsForMiniProgram: "https://bbs.j.cn/api/fetchHotPostsForMiniProgram",
    reportViewPostIdsForMiniProgram: "https://bbs.j.cn/api/reportViewPostIdsForMiniProgram",
    collectFormId: "https://pisces.j.cn/api/collectFormId",
    clickAdInWxMiniApp: "https://party-gate.j.cn/api/clickAdInWxMiniApp",
    viewAdInWxMiniApp: "https://party-gate.j.cn/api/viewAdInWxMiniApp",
    etchChangedPostsForMiniProgram: "https://bbs.j.cn/api/fetchChangedPostsForMiniProgram",
    reportViewJoke: "https://bbs.j.cn/api/reportViewJoke",
    fetchLandingPageType: "https://bbs.j.cn/api/fetchLandingPageType",
    thumbsUpForRootPost: "https://bbs.j.cn/api/thumbsUpForRootPost",
    reply_post: "https://bbs.j.cn/api/reply_post",
    noReadMessageCount: "https://bbs.j.cn/api/noReadMessageCount",
    messageList: "https://bbs.j.cn/api/messageList",
    msgUserList: "https://bbs.j.cn/api/msgUserList"
};

module.exports.methods = {
    getOpenId: function(t) {
        var o = wx.getStorageSync("openId");
        if (o) return t && t(o), o;
        wx.login({
            success: function(o) {
                var n = o.code;
                wx.request({
                    url: e.fetchOpenIdByJSCode,
                    header: {
                        "content-type": "application/x-www-form-urlencoded"
                    },
                    method: "POST",
                    data: {
                        jsCode: n
                    },
                    success: function(e) {
                        if (e.data.openId) return wx.setStorageSync("openId", e.data.openId), t && t(e.data.openId), 
                        e.data.openId;
                        console.log("openId err");
                    }
                });
            }
        });
    },
    getUserInfo: function(e, t) {
        var o = {};
        try {
            o = wx.getStorageSync("userInfo");
        } catch (e) {
            console.log("本地没存", e);
        }
        o ? e && e(o) : wx.getUserInfo({
            success: function(t) {
                o = t.userInfo, wx.setStorageSync("userInfo", o), e && e(o);
            },
            fail: function() {
                console.log("get userinfo fail"), t && t();
            }
        });
    },
    resolution: function(e) {
        return (e = (e = e.replace(/\[img\].*?\[\/img\]/g, function(e) {
            return "\n" + e + "\n";
        })).replace(/\<(.*?)\>.*?\<\/(.*?)\>/g, function(e) {
            return "\n";
        })).split("\n").map(function(e, t) {
            var o = /(?:\[\w+\])(.*?)(?:\[\/\w+\])/;
            return o.test(e) ? {
                name: e.match(/\w+/)[0],
                attrs: {
                    src: e.match(o)[1].split(",")[0].replace(/static\d+[.]/, "static1.").split("!")[0] + "?imageView2/2/w/500",
                    width: "90%",
                    style: "display: block; margin: 0 auto;"
                }
            } : {
                name: "div",
                attrs: {
                    style: "margin: 5%;"
                },
                children: [ {
                    type: "text",
                    text: e
                } ]
            };
        });
    },
    fileUpload: function(t, o, n, i) {
        wx.showLoading({
            title: "上传中",
            mask: !0
        });
        var a = !1, s = setTimeout(function() {
            a = !0, wx.hideLoading(), wx.showToast({
                title: "上传超时",
                mask: !0
            });
        }, 3e4);
        wx.request({
            url: e.getUploadInfo,
            method: "POST",
            data: o,
            success: function(e) {
                qiniu.upload(t, function(t) {
                    clearTimeout(s), a ? console.log("虽然上传成功了，但是超时了，不做后续操作") : (wx.hideLoading(), n({
                        resUrl: e.data.uploadInfoList[0].finalUrl,
                        status: t
                    }), wx.showToast({
                        title: "成功",
                        icon: "success",
                        duration: 2e3
                    }));
                }, function(e) {
                    i(e);
                }, {
                    region: "ECN",
                    key: e.data.uploadInfoList[0].key,
                    uptoken: e.data.uploadInfoList[0].token
                });
            },
            fail: function() {
                i(), console.log("获取token信息失败");
            }
        });
    },
    uid: function() {
        function e() {
            return Math.uuidCompact = function() {
                return "xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx".replace(/[xy]/g, function(e) {
                    var t = 16 * Math.random() | 0;
                    return ("x" == e ? t : 3 & t | 8).toString(16);
                });
            }, Math.uuidCompact();
        }
        var t = void 0;
        try {
            t = wx.getStorageSync("uid");
        } catch (o) {
            t = e();
        }
        return t = t || e(), wx.setStorageSync("uid", t), t;
    },
    toggleTab: function(e) {
        var t = e.currentTarget.dataset.tab;
        "fuli" === t ? wx.redirectTo({
            url: "/pages/welfare/fuli/fuli"
        }) : wx.redirectTo({
            url: "/pages/" + t + "/" + t
        });
    },
    selectFormId: function(t) {
        var o = this, n = (o.data, t.detail.formId), i = t.currentTarget.dataset.handler;
        if (e.collectFormId.indexOf("piscestest") > -1) {
            if (!i) return;
            o[i](t);
        } else o.getOpenId(function(a) {
            wx.request({
                method: "POST",
                url: e.collectFormId,
                data: {
                    appType: 1,
                    items: decodeURIComponent(a + "@@" + n + "@@" + ~~(Date.now() / 1e3))
                },
                complete: function() {
                    i && o[i](t);
                }
            });
        });
    },
    fetchLandingPageType: function(t, o, n) {
        var i = this;
        i.data;
        wx.request({
            url: e.fetchLandingPageType,
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            method: "POST",
            data: {
                wechatOpenId: t,
                itsId: o.itsId,
                itsType: o.itsType
            },
            success: function(e) {
                if (200 === e.statusCode) {
                    var t = e.data;
                    if (0 === t.errCode) {
                        var a = [];
                        for (var s in o) {
                            var r = s + "=" + o[s];
                            a.push(r);
                        }
                        if (a = a.join("&"), 0 === t.landingType) "pages/index/index" === i.route ? n && n() : wx.redirectTo({
                            url: a ? "/pages/index/index?" + a : "/pages/index/index"
                        }); else if (2 === t.landingType) if ("pages/jokedetail/jokedetail" === i.route) n && n(); else if (o.router) {
                            var c = JSON.parse(decodeURIComponent(o.router));
                            1 === Object.keys(c).length ? wx.redirectTo({
                                url: a ? "/pages/jokedetail/jokedetail?" + a : "/pages/jokedetail/jokedetail",
                                success: function() {}
                            }) : n && n();
                        } else wx.redirectTo({
                            url: "/pages/jokedetail/jokedetail",
                            success: function() {}
                        }); else if (3 === t.landingType) if ("pages/jokelong/jokelong" === i.route) n && n(); else if (o.router) {
                            var p = JSON.parse(decodeURIComponent(o.router));
                            1 === Object.keys(p).length ? wx.redirectTo({
                                url: a ? "/pages/jokelong/jokelong?" + a : "/pages/jokelong/jokelong",
                                success: function() {}
                            }) : n && n();
                        } else wx.redirectTo({
                            url: "/pages/jokelong/jokelong",
                            success: function() {}
                        });
                    } else wx.redirectTo({
                        url: "/pages/index/index"
                    });
                } else wx.showToast({
                    title: e.errMsg,
                    icon: "none",
                    success: function() {
                        n && n();
                    }
                });
            },
            fail: function() {
                wx.redirectTo({
                    url: "/pages/index/index"
                });
            }
        });
    },
    getMessageList: function(t) {
        var o = wx.getStorageSync("userInfo"), n = wx.getStorageSync("openId");
        return new Promise(function(i, a) {
            wx.request({
                url: e.messageList,
                method: "GET",
                data: {
                    app: "hers",
                    pageRecord: t.pageRecord,
                    pageSize: t.pageSize || 10,
                    type: t.type,
                    v: "6.9",
                    wechatOpenId: n,
                    wechatHeadUrl: o.avatarUrl,
                    wechatNickName: o.nickName
                },
                success: function(e) {
                    0 == e.data.errCode ? i(e.data) : (wx.showToast({
                        title: e.data.errMessage,
                        icon: "none"
                    }), a());
                },
                fail: function() {
                    wx.showToast({
                        title: "请求出错了～",
                        icon: "none"
                    }), a();
                }
            });
        });
    }
}, module.exports.API = e;