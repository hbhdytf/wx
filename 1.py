import html5lib
from bs4 import BeautifulSoup  
import re

soup = BeautifulSoup(open('detail.wxml'),'html5lib')



print("聊" in soup.find_all("view"))
print("评论" in soup.find_all("view"))

for view in soup.find_all(attrs={'data-a',"回帖提交评论"}):
    print(view.text)
print(soup.find_all(text=re.compile('评论')))


# for view in soup.find_all('textarea'):
#     print(view)
for view in soup.find_all('textarea',attrs={'data-a':re.compile('评论')}):
    print(view)

for view in soup.find_all('textarea',attrs={'placeholder':re.compile('聊')}):
    print(view,"###")  

reslut=[]
for line in soup.get_text().split('\n'):
    if line.strip()!='':
        reslut.append(line.strip())

print(reslut)



###功能词云###

import urllib.request
import re
import time
import jieba


url="http://www.baidu.com"
html=urllib.request.urlopen(url).read()
html=open('detail.wxml','rb').read()
html=str(html,'utf-8')
word=re.findall(u"[\u4e00-\u9fa5]+",html)


s=""
for w in word:
    s+=w
    
seg_list=jieba.cut(s,cut_all=False)

fenci="/ ".join(seg_list)
print('get web-->',s)
print('div result->s',fenci)


for view in soup.find_all('view',text=re.compile('分享到')):
    print(view)
for view in soup.find_all('view',text=re.compile(r'分享')):
    print(view)
for view in soup.find_all('view',text=re.compile('\w群\w')):
    print(view.text)
r = soup.find_all('view',attrs={'class':'btn-pink btn-share'})
t= r[1].find_all('view')

print(t)
print(r[1].text)


html=open('64/pages/detail/detail.js','rb').read()
html=str(html,'utf-8')
##对.wx开头；(结尾，且存在参数的函数进行提取
#word=re.findall(r"(?<=wx.)\w+(?=\([^\)]+\))",html)
##以.wx开头的函数名提取
word=re.findall(r"(?<=wx.)\w+(?=\()",html)
word=re.findall(r"(?<=wx.)\w+(?=\()",html)
word = ['wx.'+i for i in word]

print(word)

for view in soup.find_all('button',attrs={'opentype':'share'}):
    print(view)