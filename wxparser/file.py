import os
file_format = '.wxml'
#遍历文件夹   
def iter_files(rootDir,file_format):
    #遍历根目录
    results=[]
    for root,dirs,files in os.walk(rootDir):
        for file in files:
            if os.path.splitext(file)[1]==file_format:
                file_name = os.path.join(root,file)
                results.append(file_name)
        for dirname in dirs:
            #递归调用自身,只改变目录名称
            iter_files(dirname,file_format)

    return results

wxmls=iter_files('64','.wxml')