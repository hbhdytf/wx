import feature.strings_extractor
from wxparser import file
from feature.strings_extractor import StringExt
from feature.views_extractor import ViewsExt
from static_analysis.view_analysis import ViewAnalyz
from static_analysis.share_analysis import ShareAnalyz
from feature.apis_extractor import ApisExt
import static_analysis.share_analysis
from wxparser.word import Words
from collections import Counter
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

print('##############部分关键API提取###############')
js_paths = file.iter_files('64','.js')
ret=[]
for js_path in js_paths :
    js = ApisExt(js_path)
    ret  +=js.apis_feature()
r = Counter(ret)
#print(r)
print('+%-30s+%-10s+'%('-'*30,'-'*10))
print('+%-28s+%-8s+'%('API统计','频度'))
print('+%-30s+%-10s+'%('-'*30,'-'*10))
for i in Counter(ret):
    print('|%-30s|%-10d|'%(i,r[i]))
    print('+%-30s+%-10s+'%('-'*30,'-'*10))
    #print(i,r[i])
########分析部分功能
#1.根据视频videocontext 判定可输入视频
#1.根据img 判定有图片
#1.根据view 判定有文字
#2.根据关键词+textarea 判定可输入文字
#2.图片?视频?音频RecorderManager?视频?
#3.推送？根据动态分析？根据wx.request分析是否有广播发布功能/
#4.根据share判断有分享到微信好友/好友群
#5.使用者发布 无
#6.使用者转发？
#7.使用者社交 见contact 可1对1 
#7.wx.addPhoneContact 添加好友



print('######-------视图层分析------#######')
## 统计视图层可疑功能
## 分析
analyz=[]
for wxml_path in wxmls_path :
    wxml = ViewAnalyz(wxml_path)
    analyz.append(wxml)

print('#############视图层功能分析############')
for wxml_path in wxmls_path :
    wxml = ShareAnalyz(wxml_path)
    analyz.append(wxml)
print('############函数层发现分享事件##########')
static_analysis.share_analysis.get_share_from_Listener('64')


    



