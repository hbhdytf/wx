function e(e) {
    return function() {
        var t = e.apply(this, arguments);
        return new Promise(function(e, n) {
            function i(a, o) {
                try {
                    var r = t[a](o), u = r.value;
                } catch (e) {
                    return void n(e);
                }
                if (!r.done) return Promise.resolve(u).then(function(e) {
                    i("next", e);
                }, function(e) {
                    i("throw", e);
                });
                e(u);
            }
            return i("next");
        });
    };
}

require("../../utils/util.js");

var t = 0, n = null;

Page({
    data: {
        iptValue: "",
        isLoading: !1,
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
        }
    },
    onLoad: function() {
        var e = wx.createCanvasContext("firstCanvas");
        this.add(2, 3), wx.downloadFile({
            url: "https://static1.j.cn/img/community/180504/1743/6d903ee8fbcb4ccb.jpg?imageView2/2/w/500",
            success: function(t) {
                console.log(t.tempFilePath), e.drawImage(t.tempFilePath, 0, 0, 375, 100), e.draw();
            }
        }), t = wx.getSystemInfoSync().screenHeight, n = wx.createSelectorQuery().select(".theme-list");
    },
    getLine: function(e) {
        return e.detail.lineCount;
    },
    getValue: function(e) {
        var t = this, n = t.data;
        n.iptValue = e.detail.value, console.log(e.detail.value), t.setData(n);
    },
    onPageScroll: function() {
        var e = this;
        !0 !== e.data.isLoading && n.boundingClientRect().exec(function(n) {
            n[n.length - 1].bottom - t < 400 && e.getData();
        });
    },
    getData: function() {
        var e = this.data;
        e.isLoading = !0, setTimeout(function() {
            e.isLoading = !1, console.log("get data");
        }, 300);
    },
    getNum: function(e) {
        return new Promise(function(t) {
            setTimeout(t, 5 * e);
        }, 200);
    },
    add: function(t, n) {
        var i = this;
        return e(regeneratorRuntime.mark(function e() {
            var a, o;
            return regeneratorRuntime.wrap(function(e) {
                for (;;) switch (e.prev = e.next) {
                  case 0:
                    return e.next = 2, getNum(t);

                  case 2:
                    return a = e.sent, e.next = 5, getNum(n);

                  case 5:
                    o = e.sent, console.log(o + a);

                  case 7:
                  case "end":
                    return e.stop();
                }
            }, e, i);
        }))();
    }
});