'''
提取字符串
'''
from wxparser.wxml_parser import WxmlParser

class ViewsExt:

    def __init__(self,file_path):
        self.path = file_path
        self.views = self.views_feature(file_path)

    def views_feature(self,file_path=''):
        if file_path == '':
            file_path = self.path
        wxml_f = open(file_path)
        wxml = WxmlParser(wxml_f)
        views = wxml.views_extractor()
        return views


