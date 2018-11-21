'''
提取字符串
'''
from wxparser.wxml_parser import WxmlParser
class StringExt:

    def __init__(self,file_path):
        self.path = file_path
        self.strings = self.strings_feature(file_path)

    def strings_feature(self,file_path):
        #results=[]
        #file_path='detail.wxml'
        wxml_f = open(file_path)
        wxml = WxmlParser(wxml_f)
        strings = wxml.strings_extractor()
        #print('-------',file_path,'--string---------\n')
        #print(strings)
        return strings
