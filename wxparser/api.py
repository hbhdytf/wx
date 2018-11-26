apis_dict={
    'wx.chooseVideo' : '拍摄视频或从手机相册中选视频。' ,
    'wx.createVideoContext' : '创建 video 上下文 VideoContext 对象。' ,
    'wx.saveVideoToPhotosAlbum' : '保存视频到系统相册' ,
    'VideoContext' : '视频组件' ,
    'wx.getShareInfo' : '获取转发详细信息' ,
    'wx.showShareMenu' : '显示当前页面的转发按钮' ,
    'wx.updateShareMenu' : '更新转发属性' ,
    'wx.createCameraContext' : '拍摄/照相' ,
    'wx.getRecorderManager' : '获取全局唯一的录音管理器' ,
    'wx.startRecord' : '开始录音' ,
    'wx.stopRecord' : '停止录音' ,
    'RecorderManager' : '全局唯一的录音管理器' ,
    'wx.addPhoneContact' : '添加手机通讯录联系人' ,
    'wx.makePhoneCall' : '拨打电话' ,
    'wx.scanCode' : '调起客户端扫码界面进行扫码' ,
    'wx.onUserCaptureScreen' : '监听用户主动截屏事件。用户使用系统截屏按键截屏时触发' ,
    'wx.getAccountInfoSync' : '获取当前账号信息' ,
    'wx.getUserInfo' : '获取用户信息' ,
    'wx.downloadFile' : '下载文件资源到本地。' ,
    'wx.request' : '发起网络请求' ,
    'wx.uploadFile' : '将本地资源上传到服务器' ,
    'wx.createAudioContext' : '创建音频实例' ,
    'wx.chooseImage' : '从本地相册选择图片或使用相机拍照' ,
    'wx.saveImageToPhotosAlbum' : '保存图片到系统相册' ,
}


def apis():
    f = open("dict/api.dat","r") 
    words = []
    for line in f.readlines():
        r = line.strip('\n').split(':')
        print('\''+r[0]+'\'',':','\''+r[1]+'\'',',')
        words.append(dict({r[0]:r[1]}))
    return words
apis()