!function() {
    function n(n) {
        n.region ? u.qiniuRegion = n.region : console.error("qiniu uploader need your bucket region"), 
        n.uptoken ? u.qiniuUploadToken = n.uptoken : n.uptokenURL ? u.qiniuUploadTokenURL = n.uptokenURL : n.uptokenFunc && (u.qiniuUploadTokenFunction = n.uptokenFunc), 
        n.domain && (u.qiniuImageURLPrefix = n.domain), u.qiniuShouldUseQiniuFileName = n.shouldUseQiniuFileName;
    }
    function i(n, i, e, l) {
        if (null == u.qiniuUploadToken && u.qiniuUploadToken.length > 0) console.error("qiniu UploadToken is null, please check the init config or networking"); else {
            var a = o(u.qiniuRegion), r = n.split("//")[1];
            l && l.key && (r = l.key);
            var t = {
                token: u.qiniuUploadToken
            };
            u.qiniuShouldUseQiniuFileName || (t.key = r), wx.uploadFile({
                url: a,
                filePath: n,
                name: "file",
                formData: t,
                success: function(n) {
                    var o = {}, l = n.data;
                    try {
                        o = JSON.parse(l);
                    } catch (n) {
                        return console.log("parse JSON failed, origin String is: " + l), void (e && e(n));
                    }
                    o.imageURL = u.qiniuImageURLPrefix + "/" + o.key, i && i(o);
                },
                fail: function(n) {
                    console.error(n), e && e(n);
                }
            });
        }
    }
    function e(n) {
        wx.request({
            url: u.qiniuUploadTokenURL,
            success: function(i) {
                var e = i.data.uptoken;
                e && e.length > 0 ? (u.qiniuUploadToken = e, n && n()) : console.error("qiniuUploader cannot get your token, please check the uptokenURL or server");
            },
            fail: function(n) {
                console.error("qiniu UploadToken is null, please check the init config or networking: " + n);
            }
        });
    }
    function o(n) {
        var i = null;
        switch (n) {
          case "ECN":
            i = "https://upload.qiniup.com";
            break;

          case "NCN":
            i = "https://upload-z1.qiniup.com";
            break;

          case "SCN":
            i = "https://upload-z2.qiniup.com";
            break;

          case "NA":
            i = "https://upload-na0.qiniup.com";
            break;

          default:
            console.error("please make the region is with one of [ECN, SCN, NCN, NA]");
        }
        return i;
    }
    var u = {
        qiniuRegion: "",
        qiniuImageURLPrefix: "",
        qiniuUploadToken: "",
        qiniuUploadTokenURL: "",
        qiniuUploadTokenFunction: null,
        qiniuShouldUseQiniuFileName: !1
    };
    module.exports = {
        init: function(i) {
            u = {
                qiniuRegion: "",
                qiniuImageURLPrefix: "",
                qiniuUploadToken: "",
                qiniuUploadTokenURL: "",
                qiniuUploadTokenFunction: null,
                qiniuShouldUseQiniuFileName: !1
            }, n(i);
        },
        upload: function(o, l, a, r) {
            if (null != o) if (r && n(r), u.qiniuUploadToken) i(o, l, a, r); else if (u.qiniuUploadTokenURL) e(function() {
                i(o, l, a, r);
            }); else {
                if (!u.qiniuUploadTokenFunction) return void console.error("qiniu uploader need one of [uptoken, uptokenURL, uptokenFunc]");
                if (u.qiniuUploadToken = u.qiniuUploadTokenFunction(), null == u.qiniuUploadToken && u.qiniuUploadToken.length > 0) return void console.error("qiniu UploadTokenFunction result is null, please check the return value");
            } else console.error("qiniu uploader need filePath to upload");
        }
    };
}();