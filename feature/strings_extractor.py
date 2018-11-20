'''
提取字符串
'''
from wxparser.wxml_parser import WxmlParser

def strings_feature(file_path):
    #file_path='detail.wxml'
    wxml_f = open(file_path)
    wxml = WxmlParser(wxml_f)
    strings = wxml.strings_extractor()
    print('-------',file_path,'--string---------\n')
    print(strings)
