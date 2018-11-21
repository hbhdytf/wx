import feature.strings_extractor
from wxparser import file
from feature.strings_extractor import StringExt
from feature.views_extractor import ViewsExt
from static_analysis.view_analysis import ViewAnalyz

from wxparser.word import Words
import re
#feature.strings_extractor.strings_feature('./64/pages/detail/detail.wxml')

## 从字典获取功能判定词列表
words = Words('dict').words

## 获取 全wxml路径
wxmls_path = file.iter_files('64','.wxml')

## wxml 文件提取 列表
wxmls=[]
for wxml_path in wxmls_path :
    wxml = StringExt(wxml_path)
    wxmls.append(wxml)
    #print(wxml.path)
    #print(wxml.strings)
    #feature.strings_extractor.strings_feature(wxml)

print('####################################')
print('######-------文本分析------#######')

## 统计WXML功能词频度
for word in words:
    count = 0
    for wxml in wxmls :
        r = filter(lambda s:re.search(r""+word,s),wxml.strings['strings'])
        count = count + list(r).__len__()
    print('发现功能判定词:',word,'\t频度:',count)

print('######-------视图层分析------#######')
## 统计视图层可疑功能
## 分析
analyz=[]
for wxml_path in wxmls_path :
    wxml = ViewAnalyz(wxml_path)
    analyz.append(wxml)




