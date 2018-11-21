import feature.strings_extractor
from wxparser import file
from feature.strings_extractor import StringExt
from feature.views_extractor import ViewsExt

from wxparser.word import Words
import re

class ViewAnalyz:
    def __init__(self,file_path):
            self.path = file_path
            self.result = self.views_analysis()

    def views_analysis(self):
        results=[]
        views_ext=ViewsExt(self.path)
        views = views_ext.views_feature()
        for view in views:
            #print(view.attrs)
            #print(view.name)
            if view.name == 'view':
                if 'bindtap' in view.attrs:
                    results.append(view)
                    print('找到关于\"',view.text,'\"的事件',view.attrs['bindtap'])
                    print('猜测位置为\n',views_ext.path)
            if view.name == 'textarea':
                if 'bindinput' in view.attrs:
                    results.append(view)
                    if 'data-a' in view.attrs:
                        print('找到输入框',view.attrs['data-a'],'，其绑定的处理逻辑',view.attrs['bindinput'])
                    else:
                        print('找到输入框',view.attrs['data-a'],'，其绑定的处理逻辑',view.attrs['bindinput'])
 
                    print('猜测位置为',views_ext.path)
        return results
#ViewAnalyz('64/pages/detail/detail.wxml')