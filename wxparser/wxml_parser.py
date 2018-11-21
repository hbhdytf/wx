from bs4 import BeautifulSoup  
import re
from wxparser.word import Words

'''
单个XWML文件解析
BY YTF 2018/11/20
'''
class WxmlParser:

    def __init__(self, wxml):
        self.soup = BeautifulSoup(wxml, 'html5lib')
        self.wxml = wxml
        
    def parse(self):
        results=[]
        return results

    def strings_extractor(self):
        resluts=[]
        for line in self.soup.get_text().split('\n'):
            if line.strip()!='':
                resluts.append(line.strip())
        #print({'strings':resluts})
        return({'strings':resluts})
    def views_extractor(self,words=[]):
        resluts=[]
        
        ## 待优化，先这么来
        # for view in self.soup.find_all('view',text=re.compile('发送')):
        #     #print(view)
        #     resluts.append(view)
        # for view in self.soup.find_all('textarea',attrs={'data-a':re.compile('评论')}):
        #     #print(view)
        #     resluts.append(view)

        # for view in self.soup.find_all('textarea',attrs={'placeholder':re.compile('聊')}):
        #     #print(view,"###")  
        #     resluts.append(view)
        for word in Words().words:
            for view in self.soup.find_all('view',text=re.compile(word)):
                resluts.append(view)
            for view in self.soup.find_all('textarea',attrs={'data-a':re.compile(word)}):
                resluts.append(view)
            for view in self.soup.find_all('textarea',attrs={'placeholder':re.compile(word)}):
                resluts.append(view)
            for view in self.soup.find_all('button',text=re.compile(word)):
                resluts.append(view)
        return resluts
    
    
