var lib = require('lib');




var mainConf = null;
var path = '/';


var setPath = function(){
    if( mainConf.path ){
        var pathname = location.pathname;
        pathname = pathname.split('/');
        if(pathname[pathname.length-1]){
            pathname.pop();
        }
        pathname = pathname.join('/');
        path = pathname.replace(mainConf.path , '/');
    }
};



/**
 * 获取主题
 */
var getTheme = function(){
    var themeid = mainConf.theme || 1;

    lib.ajax.get(path + 'css/main.css' , function(xhr,text){
        lib.page.createStyleSheet(text);
    } , true );
    lib.page.loadCssFile(path + 'css/theme_' + themeid + '.css' , function(xhr,text){
        lib.page.createStyleSheet(text);
    } ,true);
};


/**
 * 创建页面
 */
var createPages = function(){
    var pages = mainConf.pages || 1;
    
    var ul = document.createElement('ul');
    ul.className = 'k5-wrapper';
    
    for( var i=0; i<pages; i++ ){
        var li = document.createElement('li');
        li.className = 'k5-page';
        ul.appendChild(li);
    }
    document.body.appendChild(ul);
    
    var height = ul.offsetHeight;
    ul.style.width = parseInt(4*height/3) + 'px';
    
    window.addEventListener('resize' , function(){
        var height = ul.offsetHeight;
        ul.style.width = parseInt(4*height/3) + 'px';
    });
};


var xhrCb = function(xhr , text){
    mainConf = JSON.parse(text);
    setPath();
    getTheme();
    createPages();
};



exports.render = function(){
    lib.ajax.get('data/conf.data' , xhrCb , true);
};

exports.getConfig = function(){
    return mainConf;
};