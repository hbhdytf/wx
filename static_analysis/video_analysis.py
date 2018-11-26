from collections import Counter
from feature.apis_extractor import ApisExt
from wxparser import file
from bs4 import BeautifulSoup

video_api={
    'wx.chooseVideo' : '拍摄视频或从手机相册中选视频。' ,
    #'wx.createVideoContext' : '创建 video 上下文 VideoContext 对象。' ,
    'wx.createVideoContext' : '加载视频' ,
    'wx.saveVideoToPhotosAlbum' : '保存视频到系统相册' ,
    'VideoContext' : '视频组件' ,
}
def video_analyz():
    ## 视图层分析
    video_views=[]
    wxmls_path = file.iter_files('64','.wxml')
    for wxml in wxmls_path:
        soup = BeautifulSoup(open(wxml),'html5lib')
        video_view = soup.find_all('video') 
        if video_view:
            video_views+=soup.find_all('video')
            for i in video_views:
                print('找到关于视频的视图[',i.attrs['id'],']，位置为',wxml)
    if len(video_views)==0:
        print('未找到视频标签')
    
    #print(video_view)
    ## 控制层分析
    js_paths = file.iter_files('64','.js')
    ret=[]
    for js_path in js_paths :
        js = ApisExt(js_path)
        ret  +=js.apis_feature()
    r = Counter(ret)
    api = video_api.keys() & r.keys()
    for x in list(api):
        print('根据敏感API[',x,']，发现视频功能[',video_api[x],']') 
    
