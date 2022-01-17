const $siteList = $('.siteList');
const $lastLi = $siteList.find('li.lastLi');
// 读取localStorage存的东西
const x = localStorage.getItem('x');
const xObject = JSON.parse(x) //把字符串变成对象
;
const hashMap = xObject || [
    {
        logo: 'A',
        url: "https://www.acfun.cn"
    },
    {
        logo: 'B',
        url: "https://www.bilibili.com"
    }, 
];
//去掉网址前面的https和http和www
const simplifyUrl = (url)=>{
    return url.replace('https://', '').replace('http://', '').replace('www.', '').replace(/\/.*/, '') //正则表达式删除/开头的所有东西
    ;
};
const render = ()=>{
    $siteList.find('li:not(.lastLi)').remove();
    hashMap.forEach((node, index)=>{
        const $li = $(`<li>
        <div class="site">
            <div class="logo">${node.logo}</div>
            <div class="link">${simplifyUrl(node.url)}</div>
            <div class="close">
                <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-close"></use>
                </svg>
            </div>
        </div>
    </li>`).insertBefore($lastLi);
        //用来代替a标签打开新的窗口
        $li.on('click', ()=>{
            window.open(node.url);
        });
        $li.on('click', '.close', (e)=>{
            e.stopPropagation();
            hashMap.splice(index, 1);
            render();
        });
    });
};
render();
$('.addbutton').on('click', ()=>{
    let url = window.prompt('请问你要输入的网址是');
    if (url.indexOf('http') !== 0) url = 'https://' + url;
    hashMap.push({
        logo: simplifyUrl(url)[0],
        url: url
    });
    render();
});
//当窗口即将关闭的时候会触发这个事件
window.onbeforeunload = ()=>{
    const string = JSON.stringify(hashMap) //把对象变成字符串 只能存储字符串
    ;
    localStorage.setItem('x', string);
};
// 键盘事件 经验之谈 监听document
const key1 = $(document).on('keypress', (e)=>{
    const key = e.key;
    hashMap.forEach((node)=>{
        console.log(node.logo);
        if (node.logo.toLowerCase() === key) {
            console.log(node.logo);
            window.open(node.url);
        }
    });
});
$('.searchForm').on('keypress', (e)=>{
    e.stopPropagation();
});

//# sourceMappingURL=index.65c7a1e5.js.map
