var a = getApp();

Page({
    data: {
        iptValue: "",
        isLoading: !1,
        kuaikanReadUrl: ""
    },
    onLoad: function(e) {
        var o = this, n = o.data, r = JSON.parse(decodeURIComponent(e.router));
        console.log(r), n.kuaikanReadUrl = r.kuaikanReadUrl, "muban" === r.from && (a.tongJiNovel("unlocked-temp"), 
        n.kuaikanReadUrl = r.kuaikanReadUrl + "%26from%3Dmuban"), console.log(n.kuaikanReadUrl), 
        o.setData(n);
    }
});