from bs4 import BeautifulSoup  
import re
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
    
    
