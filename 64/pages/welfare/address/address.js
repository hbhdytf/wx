var e = require("../../../utils/util-fuli").methods.createRouter, t = getApp(), a = require("../../../utils/util-fuli").API;

Page({
    data: {
        address: {
            userName: "",
            tel: "",
            detail: "",
            postalCode: ""
        }
    },
    exec: function(e) {
        var s = this, r = s.data, o = e.currentTarget.dataset, d = e.detail;
        switch (o.a) {
          case "updateValueOnAddress":
            r.address[o.name] = d.value;
            break;

          case "提交收货地址":
            wx.setStorageSync("address", r.address);
            var i = r.address, n = i.userName, c = i.tel, u = r.address.detail;
            if (!n.trim()) return void wx.showToast({
                title: "姓名不能为空",
                icon: "none"
            });
            if (!c.trim()) return void wx.showToast({
                title: "电话不能为空",
                icon: "none"
            });
            if (!u.trim()) return void wx.showToast({
                title: "地址不能为空",
                icon: "none"
            });
            wx.showLoading({
                title: "请稍后...",
                mask: !0
            }), wx.request({
                url: a.receiveLottery,
                method: "POST",
                data: {
                    lotteryId: r.router.proId,
                    openId: t.globalData.openId,
                    receiveAddress: JSON.stringify(r.address)
                },
                success: function(e) {
                    e.data;
                    wx.hideLoading(), wx.redirectTo({
                        url: "//pages/welfare/user/user?router=" + s.createRouter(r.router)
                    });
                },
                fail: function(e) {
                    console.log("address/address.js exec err 地址保存失败", e);
                }
            });
        }
        s.setData(r);
    },
    chooseAddress: function() {
        var e = this, t = e.data;
        wx.chooseAddress({
            success: function(a) {
                t.address = {
                    userName: a.userName,
                    tel: a.telNumber,
                    detail: a.provinceName + " " + a.cityName + " " + a.countyName + " " + a.detailInfo,
                    postalCode: a.postalCode
                }, e.setData(t);
            },
            fail: function(e) {
                console.log("address/index.js err 获取用户地址失败");
            }
        });
    },
    onLoad: function(e) {
        var t = e.router, a = this, s = a.data;
        t = t || "{}", console.log("%c 原始路由", "background: #ccc", "router=" + t), t = JSON.parse(decodeURIComponent(t)), 
        console.log("%c 路由信息", "background: #ccc", JSON.stringify(t)), t.page = "address", 
        s.router = t, wx.setNavigationBarTitle({
            title: "收货地址"
        });
        var r = wx.getStorageSync("address");
        r ? (s.address = r, a.setData(s)) : a.chooseAddress(), a.setData(s);
    },
    createRouter: e
});