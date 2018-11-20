var t = getApp();

Component({
    properties: {
        color: {
            type: String,
            value: "#000"
        },
        backgroundColor: {
            type: String,
            value: "#f6f6f6"
        },
        title: {
            type: String
        },
        arrowLeft: {
            type: Boolean
        },
        clickLeft: {
            type: Function
        }
    },
    data: {
        isx: t.globalData.isx,
        isAndroid: /android/i.test(wx.getSystemInfoSync().system)
    },
    methods: {
        arrowLeftHandle: function() {
            this.data.clickLeft ? this.triggerEvent("clickLeft") : wx.navigateBack();
        }
    },
    ready: function() {}
});