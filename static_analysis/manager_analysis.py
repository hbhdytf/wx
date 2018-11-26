from collections import Counter
from feature.apis_extractor import ApisExt
from wxparser import file
from bs4 import BeautifulSoup

def manager_analyz():
    ## 视图层分析
    img_views=[]
    wxmls_path = file.iter_files('64','.wxml')
    for wxml in wxmls_path:
        soup = BeautifulSoup(open(wxml),'html5lib')
        img_view = soup.find_all('img') 
        if img_view:
            img_views+=soup.find_all('img')
            for i in img_views:
                print('找到关于视频的视图[',i.attrs['id'],']，位置为',wxml)
    if len(img_views)==0:
        print('未找到视频标签')
   