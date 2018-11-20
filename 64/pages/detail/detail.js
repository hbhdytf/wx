var t = Object.assign || function(t) {
    for (var e = 1; e < arguments.length; e++) {
        var o = arguments[e];
        for (var n in o) Object.prototype.hasOwnProperty.call(o, n) && (t[n] = o[n]);
    }
    return t;
}, e = getApp(), o = require("../components/common"), n = require("../../utils/util"), a = require("../../utils/util-fudan").data, i = a.showFudanTip, s = a.oneDayThreeTimes, r = require("../../utils/util-fudan").methods, c = r.closeShareTip, m = r.getComeToDetailTimes, l = require("../../utils/util-talk").methods, h = l.fetchHotList, u = l.viewReport, d = n.API, p = {};

Page(t({
    data: t({
        autoHeight: !0,
        themeId: null,
        openId: "",
        userInfo: "",
        router: {},
        content: {
            isVote: !1,
            id: "",
            title: "",
            groupId: "",
            richNodes: [],
            isShowShareTip: !1,
            user: {},
            shareInfo: {
                title: "我转发篇文章给你，点开看看！",
                shareImg: ""
            }
        },
        vote: {
            total: 0,
            isShowShare: !1,
            isShowResult: !1,
            bgArr: [ "#ce97ff", "#98cbff", "#ffcd96", "#a7dd6c", "#ec84e1", "#8e96f7", "#61cf92" ],
            voteData: []
        },
        comment: {
            isFocus: !1,
            isShowCtrol: !1,
            isShowPanel: !1,
            isShowShare: !1,
            pageSize: 10,
            pageNum: 1,
            myCommentText: "",
            isEnd: !1,
            list: [],
            hotReplies: []
        },
        thumbsUpInfo: {
            givenThumbsUp: !1,
            thumbsUpCountForRoot: 0
        },
        showFudanTip: i,
        oneDayThreeTimes: s,
        timer: {
            timerOne: null,
            timerTwo: null
        },
        kuaikanReadUrl: "",
        replySorts: 0,
        input: {
            focus: !1,
            showSend: !1,
            mainReply: !0,
            parentId: -1
        },
        huaTiA: "提交评论",
        actTalk: {
            showReplySuccessPanel: !1,
            replyTimes: 0
        },
        showHome: !1,
        isShowNextBtn: !0,
        themeList: [],
        currentIndex: null,
        canFechHotList: !0
    }, o.data),
    countHeight: function(t) {
        t.detail.lineCount <= 4 && 1 != t.detail.lineCount ? this.setData({
            autoHeight: !0
        }) : this.setData({
            autoHeight: !1
        });
    },
    onReady: function() {},
    onLoad: function(t) {
        var o = this, n = o.data;
        n.router = t, n.themeId = t.themeId, n.themeList = this.filterThemeList(e.globalData.themeList), 
        n.actTalk.replyTimes = e.globalData.replyTimes, o.getOpenId(function(t) {
            n.openId = t, 1 === getCurrentPages().length && (n.showHome = !0, n.isShowNextBtn = !1), 
            "muban" === n.router.from && e.tongji("comment-tongzhi"), o.loadConent(n.router), 
            o.getComeToDetailTimes(), o.setData(n);
        }), n.userInfo = wx.getStorageSync("userInfo"), this.getCurrentIndex();
    },
    filterThemeList: function(t) {
        return t.filter(function(t) {
            return "posttext" == t.type;
        });
    },
    nextPost: function() {
        var t = this, o = t.data;
        o.canFechHotList && (o.currentIndex++, o.themeList.length - o.currentIndex <= 2 && (o.canFechHotList = !1, 
        o.comment.pageNum = 1, t.setData(o), h({
            openId: o.openId
        }, function(e) {
            o.themeList.push.apply(o.themeList, t.filterThemeList(e)), o.canFechHotList = !0, 
            t.setData(o);
        })), o.themeList[o.currentIndex] && "posttext" == o.themeList[o.currentIndex].type ? (wx.pageScrollTo({
            scrollTop: 0
        }), o.comment.pageNum = 1, t.setData(o), console.log(o.comment.pageNum), t.loadConent({
            themeId: o.themeList[o.currentIndex].postId
        }, function() {
            t.getReadTime(o.themeList[o.currentIndex].postId), o.currentIndex++, p.startTime = p.endTime;
        }), e.tongJiTalk("change")) : (console.log("none"), o.currentIndex--), t.setData(o));
    },
    getCurrentIndex: function() {
        var t = this.data, e = t.themeList.findIndex(function(e) {
            return e.postId == t.themeId;
        });
        this.setData({
            currentIndex: e
        });
    },
    userInfoHandler: function() {
        var t = this, e = t.data;
        t.getUserInfo(function(o) {
            if (null === o) return e.auth.showPanel = !0, void t.setData(e);
            e.auth.showPanel = !1, e.userInfo = o, t.setData(e);
        });
    },
    loadConent: function(t, o) {
        console.log("loadContent12345");
        var n = this, a = n.data;
        wx.showLoading({
            title: "正在加载..."
        }), wx.request({
            url: d.postDetailForMiniProgram,
            method: "GET",
            data: {
                id: t.themeId,
                wechatOpenId: a.openId,
                pageNo: a.comment.pageNum,
                pageSize: a.comment.pageSize,
                filterVoteReply: 1,
                sorts: a.replySorts,
                app: "hers",
                net: "wifi",
                v: "6.8"
            },
            success: function(i) {
                if (u([ t.themeId ]), 0 !== i.data.errCode) return wx.showToast({
                    title: "文章获取失败",
                    image: "/static/icon-gth.png"
                }), void setTimeout(function() {
                    wx.reLaunch({
                        url: "/pages/index/index"
                    });
                }, 1500);
                "hot" == a.router.style ? (e.tongji("hot-detail"), e.tongji("hot-detail-" + i.data.root.id)) : (e.tongji("theme-detail"), 
                e.tongji("theme-detail-" + i.data.root.id)), t.share && e.tongji("from-share-" + i.data.root.id), 
                a.content.isVote = 1 === i.data.classType;
                var s = i.data.root.showContent, r = i.data.root.vote;
                a.content.richNodes = n.resolution(s), a.content.title = i.data.root.title, a.content.id = i.data.root.id, 
                a.content.user = i.data.root.user, a.content.groupId = i.data.root.groupList, a.content.dealTimeInfo = i.data.root.dealTimeInfo, 
                a.content.reply = i.data.root.reply, i.data.interaction.thumbsUpInfo.thumbsUpCountForRoot > 9999 && (i.data.interaction.thumbsUpInfo.thumbsUpCountForRoot = "9999+"), 
                a.thumbsUpInfo = i.data.interaction.thumbsUpInfo;
                var c = s.match(/<a[^>\/>]*href=[\'\"]([^\'\"]+)[\'\"][^>\/>]*(?:>|\/>)/i);
                Array.isArray(c) && (a.kuaikanReadUrl = c[1], e.tongJiNovel("list-show"), console.log(a.kuaikanReadUrl)), 
                a.content.shareInfo.title = i.data.root.showContent.replace(/\[img\].+?\[\/img\]/gim, ""), 
                a.content.shareInfo.title = a.content.shareInfo.title.replace(/(\s|\r|\n)/gm, ""), 
                a.content.shareInfo.shareImg = "", a.content.isVote && (a.vote.voteData = r, a.vote.total = r.totalVote, 
                a.vote.isShowResult = 1 === r.alreadyVoted);
                var m = 0;
                i.data.replyPage.pageInfos.forEach(function(t) {
                    m += t.count;
                }), m < a.comment.pageSize && (a.comment.isEnd = !0), a.comment.list = i.data.replyPage.replies, 
                a.comment.list.forEach(function(t, e) {
                    t.showContent = t.showContent.replace(/\[[a-z]{1,5}\](.*?)\[\/[a-z]{1,5}\]/g, function(t) {
                        return "\n";
                    }), t.showContent = t.showContent.replace(/\<.*?\>.*?\<\/.*?\>/g, function(t) {
                        return "\n";
                    }), /.+/.test(t.showContent) || (t.showContent = "");
                }), i.data.recommend.hotReplies ? (a.comment.hotReplies = i.data.recommend.hotReplies, 
                a.comment.hotReplies.forEach(function(t, e) {
                    t.showContent = t.showContent.replace(/\[[a-z]{1,5}\](.*?)\[\/[a-z]{1,5}\]/g, function(t) {
                        return "\n";
                    }), t.showContent = t.showContent.replace(/\<.*?\>.*?\<\/.*?\>/g, function(t) {
                        return "\n";
                    }), /.+/.test(t.showContent) || (t.showContent = "");
                })) : a.comment.hotReplies = i.data.recommend.hotReplies, 1 === a.replySorts ? a.comment.pageNum = i.data.replyPage.pageInfos[i.data.replyPage.pageInfos.length - 1].pageNo - 1 : 0 === a.replySorts && (a.comment.pageNum = 2), 
                a.comment.isShowCtrol = !0, a.timer.timerOne = setTimeout(function() {
                    a.content.isShowShareTip = !0, a.content.isShowShareTip && a.oneDayThreeTimes && e.tongji("hot-lead-share"), 
                    n.setData(a), a.timer.timerTwo = setTimeout(function() {
                        a.content.isShowShareTip = !1, n.setData(a);
                    }, 5e3);
                }, 1e4), n.setData(a), o && o();
            },
            complete: function() {
                wx.hideLoading();
            }
        }), n.setData(a);
    },
    detailHandler: function(t) {
        console.log("detailhandler");
        var o = this, n = o.data, a = t.currentTarget.dataset, i = t.detail;
        switch (console.log(a.a), a.a) {
          case "投票":
            n.userInfo ? 2 == n.userInfo.gender || e.globalData.isShowAll ? (o.vote(a), e.tongji("hot-vote")) : wx.showToast({
                title: "男生无法投票",
                image: "/static/icon-gth.png"
            }) : n.auth.showPanel = !0;
            break;

          case "返回首页":
            "hot" == n.router.style ? e.tongji("hot-index-click") : e.tongji("theme-index-click"), 
            wx.reLaunch({
                url: "/pages/index/index"
            });
            break;

          case "显示评论面板":
            n.huaTiA = "提交评论", "hot" == n.router.style ? e.tongji("hot-comment-click") : e.tongji("theme-comment-click"), 
            n.userInfo ? 2 == n.userInfo.gender || e.globalData.isShowAll ? (n.comment.isShowPanel = !0, 
            setTimeout(function() {
                n.comment.isFocus = !0, o.setData(n);
            }, 300)) : wx.showToast({
                title: "男生无法评论",
                image: "/static/icon-gth.png"
            }) : n.auth.showPanel = !0;
            break;

          case "隐藏评论面板":
            n.comment.isShowPanel = !1, setTimeout(function() {
                n.comment.isFocus = !1, o.setData(n);
            }, 300);
            break;

          case "提交评论":
            n.userInfo ? 2 == n.userInfo.gender || e.globalData.isShowAll ? "" !== n.comment.myCommentText ? (n.autoHeight = !1, 
            o.comment(), e.tongji("hot-comment")) : wx.showToast({
                title: "请输入评论内容",
                image: "/static/icon-gth.png"
            }) : wx.showToast({
                title: "男生无法评论",
                image: "/static/icon-gth.png"
            }) : n.auth.showPanel = !0;
            break;

          case "回帖提交评论":
            e.tongji("hui-comment-click"), n.userInfo ? 2 == n.userInfo.gender || e.globalData.isShowAll ? "" !== n.comment.myCommentText ? (o.reply_post(), 
            e.tongji("hot-reply-post")) : wx.showToast({
                title: "请输入评论内容",
                image: "/static/icon-gth.png"
            }) : wx.showToast({
                title: "男生无法评论",
                image: "/static/icon-gth.png"
            }) : n.auth.showPanel = !0;
            break;

          case "修改评论内容":
            n.comment.myCommentText = i.value, "" == i.value && (n.autoHeight = !1);
            break;

          case "关闭评论分享":
            n.comment.isShowShare = !1;
            break;

          case "关闭投票分享":
            n.vote.isShowShare = !1;
            break;

          case "回贴点赞":
            n.userInfo ? 2 == n.userInfo.gender || e.globalData.isShowAll ? o.likeComment(a.index, a.hot) : wx.showToast({
                title: "男生无法点赞",
                image: "/static/icon-gth.png"
            }) : n.auth.showPanel = !0;
            break;

          case "主贴点赞":
            n.userInfo ? 2 == n.userInfo.gender || e.globalData.isShowAll ? o.thumbsUpForRootPost() : wx.showToast({
                title: "男生无法点赞",
                image: "/static/icon-gth.png"
            }) : n.auth.showPanel = !0;
            break;

          default:
            console.log("未定义指令");
        }
        o.setData(n);
    },
    likeComment: function(t, o) {
        var n = this, a = n.data;
        console.log(o), wx.request({
            url: d.giveThumbsUp,
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            method: "GET",
            data: {
                app: "hers",
                mainPostId: a.content.id,
                ownerId: "true" == o ? a.comment.hotReplies[t].user.id : a.comment.list[t].user.id,
                postId: "true" == o ? a.comment.hotReplies[t].id : a.comment.list[t].id,
                v: "6.8",
                vkey: "",
                wechatHeadUrl: a.userInfo.avatarUrl,
                wechatNickName: a.userInfo.nickName,
                wechatOpenId: a.openId
            },
            success: function(i) {
                0 == i.data.errcode && ("true" == o ? (a.comment.hotReplies[t].givenThumbsUp = !0, 
                a.comment.hotReplies[t].thumbsUpCount++) : (a.comment.list[t].givenThumbsUp = !0, 
                a.comment.list[t].thumbsUpCount++), "hot" == a.router.style ? e.tongji("hot-like") : (e.tongji("like"), 
                e.tongji("like" + a.content.id))), n.setData(a);
            }
        }), n.setData(a);
    },
    thumbsUpForRootPost: function() {
        var t = this, o = t.data;
        wx.request({
            url: d.thumbsUpForRootPost,
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            method: "GET",
            data: {
                app: "hers",
                postId: o.content.id,
                v: "6.8",
                wechatHeadUrl: o.userInfo.avatarUrl,
                wechatNickName: o.userInfo.nickName,
                wechatOpenId: o.openId
            },
            success: function(n) {
                0 == n.data.errCode ? (o.thumbsUpInfo.givenThumbsUp = !0, "number" == typeof o.thumbsUpInfo.thumbsUpCountForRoot && (o.thumbsUpInfo.thumbsUpCountForRoot++, 
                o.thumbsUpInfo.thumbsUpCountForRoot > 9999 && (o.thumbsUpInfo.thumbsUpCountForRoot = "9999+")), 
                e.tongji("zhu-like"), t.setData(o)) : console.log(n.data.errMessage);
            }
        });
    },
    vote: function(t) {
        var o = this, n = o.data;
        console.log(t), wx.showLoading({
            title: "添加投票"
        }), e.tongji("vote-" + n.content.id), wx.request({
            url: d.reply_topic,
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            method: "POST",
            data: {
                app: "hers",
                isVote: 1,
                selectedOption: n.vote.voteData.voteOptionList[t.index].id,
                groupId: n.content.groupId,
                rootId: n.content.id,
                v: "6.8",
                vkey: "",
                wechatHeadUrl: n.userInfo.avatarUrl,
                wechatNickName: n.userInfo.nickName,
                wechatOpenId: n.openId
            },
            success: function(e) {
                console.log(e), 0 == e.data.errcode ? (n.vote.voteData.voteOptionList[t.index].optionVoteTimes++, 
                n.vote.total++, n.vote.voteData.voteOptionList.forEach(function(t, e) {
                    t.optionVotePercent = parseInt(100 * (t.optionVoteTimes / n.vote.total).toFixed(2));
                }), "hot" == n.router.style && wx.showToast({
                    title: "投票成功"
                }), n.vote.isShowResult = !0) : wx.showToast({
                    title: "投票失败",
                    image: "/static/icon-gth.png"
                }), o.setData(n);
            },
            complete: function() {
                wx.hideLoading();
            }
        });
    },
    comment: function() {
        var t = this, o = t.data, n = wx.getStorageSync("userInfo"), a = wx.getStorageSync("openId");
        wx.showLoading({
            title: "添加评论"
        }), wx.request({
            url: d.reply_topic,
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            method: "POST",
            data: {
                app: "hers",
                content: o.comment.myCommentText,
                groupId: o.content.groupId,
                rootId: o.content.id,
                v: "6.8",
                vkey: "",
                wechatHeadUrl: n.avatarUrl,
                wechatNickName: n.nickName,
                wechatOpenId: a
            },
            success: function(a) {
                0 == a.data.errcode ? (e.tongji("comment-" + o.content.id), o.comment.list.unshift({
                    level: a.data.data.newFloor,
                    dealTimeInfo: "刚刚",
                    showContent: o.comment.myCommentText,
                    isMy: !0,
                    user: {
                        headUrl: n.avatarUrl,
                        nickName: n.nickName
                    }
                }), o.comment.myCommentText = "", o.autoHeight = !0, o.comment.isShowPanel = !1, 
                o.input.showSend = !1, o.actTalk.showReplySuccessPanel = !0, o.actTalk.replyTimes++, 
                e.globalData.replyTimes = o.actTalk.replyTimes, "hot" == o.router.style && (e.tongJiTalk("reply-success"), 
                wx.showToast({
                    title: "评论成功"
                }))) : wx.showToast({
                    title: "评论失败",
                    image: "/static/icon-gth.png"
                }), t.setData(o);
            },
            complete: function() {
                wx.hideLoading();
            }
        });
    },
    onReachBottom: function(t) {
        var e = this, o = e.data;
        o.comment.isEnd || o.comment.pageNum < 1 || e.getMoreComment();
    },
    getMoreComment: function() {
        var t = this, e = t.data, o = wx.getStorageSync("openId");
        wx.request({
            url: d.postDetailForMiniProgram,
            method: "GET",
            data: {
                id: e.content.id,
                wechatOpenId: o,
                pageNo: e.comment.pageNum,
                pageSize: e.comment.pageSize,
                sorts: e.replySorts,
                app: "hers",
                filterVoteReply: 1,
                v: "6.8",
                net: "wifi"
            },
            success: function(o) {
                if (0 === o.data.errCode) {
                    1 === e.replySorts ? e.comment.pageNum = o.data.replyPage.pageInfos[o.data.replyPage.pageInfos.length - 1].pageNo - 1 : 0 === e.replySorts && e.comment.pageNum++;
                    var n = o.data.replyPage.replies;
                    if (n.forEach(function(t, e) {
                        t.showContent = t.showContent.replace(/\[[a-z]{1,5}\](.*?)\[\/[a-z]{1,5}\]/g, function(t) {
                            return "\n";
                        }), t.showContent = t.showContent.replace(/\<.*?\>.*?\<\/.*?\>/g, function(t) {
                            return "\n";
                        }), /.+/.test(t.showContent) || (t.showContent = "");
                    }), e.comment.list = e.comment.list.concat(n), 1 === e.replySorts) {
                        var a = 0;
                        o.data.replyPage.pageInfos.forEach(function(t) {
                            console.log(t.count), a += t.count;
                        }), a < e.comment.pageSize && (e.comment.isEnd = !0);
                    } else 0 === e.replySorts && o.data.replyPage.pageInfos[0].count < e.comment.pageSize && (e.comment.isEnd = !0);
                    t.setData(e);
                } else wx.showToast({
                    title: "评论获取失败",
                    image: "/static/icon-gth.png"
                });
            }
        });
    },
    onShareAppMessage: function(t) {
        var o = this, n = o.data, a = "", i = n.content.shareInfo.title, s = n.content.shareInfo.shareImg, r = null;
        return n.comment.isShowShare && ("hot" == n.router.style ? e.tongji("hot-comment-share") : (e.tongji("comment-share"), 
        e.tongji("comment-share-" + n.content.id)), n.comment.isShowShare = !1), n.vote.isShowShare && ("hot" == n.router.style ? e.tongji("hot-vote-share") : (e.tongji("vote-share"), 
        e.tongji("vote-share-" + n.content.id)), n.vote.isShowShare = !1), "hot" == n.router.style ? (e.tongji("hot-share"), 
        e.tongji("hot-share-" + n.content.id)) : (e.tongji("theme-share"), e.tongji("theme-share-" + n.content.id)), 
        a = "hot" == n.router.style ? "/pages/index/index?itsId=" + n.content.id + "&itsType=1&style=hot&share=true" : "/pages/index/index?itsId=" + n.content.id + "&itsType=2&share=true", 
        1 === n.actTalk.replyTimes && n.actTalk.showReplySuccessPanel && (o.setData({
            "actTalk.showReplySuccessPanel": !1
        }), a = "/pages/fudan/index/index?from=commentShare", i = "帮我回一下，一起赚现金。", s = "/static/tixian/tixian-share.jpg", 
        r = function() {
            e.tongji("comment-share");
        }), o.setData(n), {
            title: i,
            imageUrl: s,
            path: a,
            success: function(t) {
                r && r(), wx.showToast({
                    title: "分享成功"
                });
            },
            fail: function(t) {
                console.log("err");
            },
            complete: function() {}
        };
    },
    getReadTime: function(t) {
        p.endTime = new Date().getTime();
        var o = Math.round((p.endTime - p.startTime) / 1e3);
        e.tongReadTime("hot-detail-readtime-" + t + "-" + o);
    },
    onShow: function() {
        p.startTime = new Date().getTime();
    },
    onHide: function() {
        var t = this, e = t.data;
        t.getReadTime(e.router.themeId), null !== e.timer && (clearTimeout(e.timer.timerOne), 
        clearTimeout(e.timer.timerTwo));
    },
    onUnload: function() {
        var t = this, e = t.data;
        t.getReadTime(e.router.themeId), null !== e.timer && (clearTimeout(e.timer.timerOne), 
        clearTimeout(e.timer.timerTwo));
    },
    sortReply: function() {
        var t = this, e = t.data, o = e.replySorts;
        e.replySorts = o ? 0 : 1, e.comment.pageNum = o ? 1 : -1, e.comment.isEnd = !1, 
        e.comment.list = [], t.getMoreComment();
    },
    focusHandler: function() {
        var t = this, e = t.data;
        e.input.focus = !0, e.input.showSend = !0, t.setData(e);
    },
    hideMainReply: function(t) {
        var o = this, n = o.data, a = t.currentTarget.dataset.replyid;
        n.input.parentId = a, "hot" === n.router.style ? (n.input.mainReply ? n.input.mainReply = !1 : (n.input.mainReply = !0, 
        setTimeout(function() {
            n.input.mainReply = !1, o.setData(n);
        }, 100)), o.setData(n)) : (n.huaTiA = "回帖提交评论", "hot" == n.router.style ? e.tongji("hot-comment-click") : e.tongji("theme-comment-click"), 
        n.userInfo ? 2 == n.userInfo.gender || e.globalData.isShowAll ? (n.comment.isShowPanel = !0, 
        setTimeout(function() {
            n.comment.isFocus = !0, o.setData(n);
        }, 300)) : wx.showToast({
            title: "男生无法评论",
            image: "/static/icon-gth.png"
        }) : n.auth.showPanel = !0), o.setData(n);
    },
    reply_post: function() {
        var t = this, o = t.data;
        console.log(o.comment.myCommentText);
        var n = wx.getStorageSync("userInfo"), a = wx.getStorageSync("openId");
        wx.showLoading({
            title: "添加评论"
        }), wx.request({
            url: d.reply_post,
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            method: "POST",
            data: {
                content: o.comment.myCommentText,
                groupId: 0,
                rootId: o.content.id,
                parentId: o.input.parentId,
                v: "6.8",
                wechatHeadUrl: n.avatarUrl,
                wechatNickName: n.nickName,
                wechatOpenId: a
            },
            success: function(a) {
                if (0 == a.data.errcode) {
                    e.tongji("comment-" + o.content.id), e.tongji("hui-comment");
                    var i = o.comment.list.find(function(t) {
                        return t.id === Number(o.input.parentId);
                    });
                    o.comment.list.unshift({
                        level: a.data.data.newFloor,
                        dealTimeInfo: "刚刚",
                        showContent: o.comment.myCommentText,
                        isMy: !0,
                        user: {
                            headUrl: n.avatarUrl,
                            nickName: n.nickName
                        },
                        parent: {
                            user: {
                                nickName: i.user.nickName
                            },
                            showContent: i.showContent,
                            dealTimeInfo: i.dealTimeInfo
                        }
                    }), o.comment.myCommentText = "", o.comment.isShowPanel = !1, o.input.showSend = !1, 
                    o.input.mainReply = !0, o.actTalk.showReplySuccessPanel = !0, o.actTalk.replyTimes++, 
                    e.globalData.replyTimes = o.actTalk.replyTimes, "hot" == o.router.style && (e.tongJiTalk("reply-success"), 
                    wx.showToast({
                        title: "评论成功"
                    }));
                } else wx.showToast({
                    title: "评论失败",
                    image: "/static/icon-gth.png"
                });
                t.setData(o);
            },
            complete: function() {
                wx.hideLoading();
            }
        }), t.setData(o);
    },
    goHome: function() {
        this.data;
        wx.redirectTo({
            url: "/pages/index/index",
            success: function() {
                e.tongJiTalk("detail-back");
            }
        });
    },
    blurHandler: function() {
        var t = this, e = t.data;
        e.comment.myCommentText || (e.input.showSend = !1, e.autoHeight = !0, t.setData(e));
    },
    xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx: function() {
        var t = this, e = t.data;
        t.setData(e);
    },
    stopPop: function() {}
}, o.methods, n.methods, {
    closeShareTip: c,
    closeGuideShareTip: function() {
        var t = this, e = t.data;
        e.content.isShowShareTip = !1, t.setData(e);
    },
    goToNovel: function() {
        var t = this.data;
        if (t.kuaikanReadUrl.includes("jjread")) {
            var o = {
                kuaikanReadUrl: t.kuaikanReadUrl
            };
            wx.navigateTo({
                url: "/pages/novel/novel?router=" + encodeURIComponent(JSON.stringify(o)),
                success: function() {
                    console.log("/pages/novel/novel?router=" + encodeURIComponent(JSON.stringify(o))), 
                    e.tongJiNovel("read-more");
                }
            });
        }
    },
    exec: function(t) {
        var e = this;
        e.data;
        "关闭分享提示弹窗" === t.currentTarget.dataset.a && e.setData({
            "actTalk.showReplySuccessPanel": !1
        });
    },
    getComeToDetailTimes: m
}));