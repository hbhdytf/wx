import feature.strings_extractor
from wxparser import file
feature.strings_extractor.strings_feature('./64/pages/detail/detail.wxml')

wxmls = file.iter_files('64','.wxml')
for wxml in wxmls :
    feature.strings_extractor.strings_feature(wxml)


