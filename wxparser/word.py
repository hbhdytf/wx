'''
返回敏感词列表
'''
class Words:
    
    def __init__(self, method = 'dict'):
        if method == 'dict':
            self.words = self.get_words_from_dict()
        else:
            raise Exception('Wrong method!')    
        #return self.words

    def get_words_from_dict(self):
        f = open("dict/word.dat","r") 
        words = []
        for line in f.readlines():
            words.append(line.strip('\n'))
        return words
        
word = Words('dict')
print(word.words)
