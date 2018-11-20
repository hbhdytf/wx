var t = {
    auth: {
        showPanel: !1,
        isAuthAllow: !0
    }
};

module.exports.data = t, module.exports.methods = {
    closeAuthPanel: function() {
        var t = this, a = t.data;
        a.auth.showPanel = !1, t.setData(a);
    }
};