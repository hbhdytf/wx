var transformer = require('wxml-transformer');
transformer.toHtml('<view id="box">{{123}}</view>');
//<div id="box">{{123}}</div>


var options = {
    mapping: {
        view: 'section',
        text: (element, helper) => {
            return `<span data-wxa="text" ${helper.propsStringify(element.props)}>` +
                `${helper.childrenStringify(element.children, options)}</span>`;
        }
    }
};
transformer.toHtml('<view id="box">{{123}} <text id="t1">456</text></view>', options);
//<section id="box">{{123}} <span data-wxa="text" id="t1">456</span></section>

transformer.toObject('<view id="box">{{123}}</view>');
//{tag:'view', props:[{name:'id', value:'box'}], children:[ {'{{123}}'} ]}

//transformer.toObject('<view id="box" hidden>{{123}}</view>');
//{tag:'view', props:[{name:'id', value:'box'}, {name:'hidden', onlyName:true}], children:[ {'{{123}}'} ]}

str1='<view class="wrap">\
        <image src="/static/fudan/talk-05@2x.png"></image>\
        <view bindtap="exec" class="close" data-a="关闭分享提示弹窗"></view>\
        <button bindtap="exec" class="share-btn" data-a="分享到群" openType="share"></button>\
    </view>';

transformer.toObject(str1);
transformer.toObject('<view class="wrap"><image src="/static/fudan/talk-05@2x.png"></image></view>');
transformer.toHtml('<view class="wrap"><image src="/static/fudan/talk-05@2x.png"></image></view>');
