import feature.strings_extractor
from wxparser import file
from bs4 import BeautifulSoup  
from feature.strings_extractor import StringExt
from feature.views_extractor import ViewsExt
import os

from wxparser.word import Words
import re

class ShareAnalyz:
    def __init__(self, path):
        self.path = path
        self.results = self.share_analysis()
    def share_analysis(self):
        results=[]
        soup = BeautifulSoup(open(self.path),'html5lib')
        for view in soup.find_all('button',attrs={'opentype':'share'}):
            #print(view)
            if view.get_text()!='':
                print("发现关于[",view.get_text().strip(),"]分享功能")
            elif view.get_text()=='':
                print("发现分享功能,位置",self.path)
            if 'bindtap' in view.attrs:
                print("绑定了事件,[",view.attrs['bindtap'],"]")
            results.append(view)
        return results
    ### 通过onShareAppMessage搜索代码
def get_share_from_Listener(path):
    cmd = "grep -rn onShareAppMessage "+ path
    f = os.popen(cmd)
    for data in f.readlines():
        print("监听位置:",data.strip().split(':')[0],
            '第'+data.strip().split(':')[1]+'行', 
            '\t'.join(data.strip().split(':')[2:]),
        )
    f.close()
    
    