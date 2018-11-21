from bs4 import BeautifulSoup  
import re
from wxparser.word import Words

'''
单个JS文件解析
BY YTF 2018/11/20
'''
class JsParser:

    def __init__(self, js):
        self.js = js

    ## 根据函数名提取代码
    def parse(self,func_name):
        results=[]
        return results

    
