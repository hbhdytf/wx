import re
'''
提取字符串
'''
from wxparser.wxml_parser import WxmlParser
class ApisExt:

    def __init__(self,file_path):
        self.path = file_path
        self.strings = self.apis_feature()

    def apis_feature(self):
        #results=[]
        #file_path='detail.wxml'
        js_f = open(self.path)
        #js = JsParser(js_f)
        #strings = wxml.strings_extractor()
        #print('-------',file_path,'--string---------\n')
        #print(strings)
        js_f=open(self.path,'rb').read()
        js_f=str(js_f,'utf-8')
        ##对.wx开头；(结尾，且存在参数的函数进行提取
        #word=re.findall(r"(?<=wx.)\w+(?=\([^\)]+\))",html)
        ##以.wx开头的函数名提取
        #word=re.findall(r"(?<=wx.)\w+(?=\()",html)
        word=re.findall(r"(?<=wx.)\w+(?=\()",js_f)
        word = ['wx.'+i for i in word]
        #print(word)
        return word
