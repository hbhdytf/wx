import html5lib
from bs4 import BeautifulSoup  
import re

soup = BeautifulSoup(open('detail.wxml'),'html5lib')



print("聊" in soup.find_all("view"))
print("评论" in soup.find_all("view"))

for view in soup.find_all(attrs={'data-a',"回帖提交评论"}):
    print(view.text)
print(soup.find_all(text=re.compile('评论')))
for view in soup.find_all('view',text=re.compile('发送')):
    print(view)

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
print('div result-》',fenci)
