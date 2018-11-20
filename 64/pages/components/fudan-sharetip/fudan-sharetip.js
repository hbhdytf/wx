var e = getApp();

Component({
    properties: {
        showFudanTip: Boolean
    },
    methods: {
        closeHandler: function() {
            var e = this;
            e.data;
            e.triggerEvent("closetip");
        },
        goToFudan: function() {
            var n = this;
            n.data;
            wx.navigateTo({
                url: "/pages/fudan/index/index",
                success: function() {
                    e.tongji("share-success-moneyegg"), n.closeHandler();
                }
            });
        }
    },
    attached: function() {}
});