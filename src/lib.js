exports.each =  function (source, iterator, thisObject) {
    var returnValue, item, i, len = source.length;
    
    if ('function' == typeof iterator) {
        for (i = 0; i < len; i++) {
            item = source[i];
            //TODO
            //此处实现和标准不符合，标准中是这样说的：
            //If a thisObject parameter is provided to forEach, it will be used as the this for each invocation of the callback. If it is not provided, or is null, the global object associated with callback is used instead.
            returnValue = iterator.call(thisObject || source, item, i);
    
            if (returnValue === false) {
                break;
            }
        }
    }
    return source;
};

exports.ajax = {
    get: function(url , callback , isSync){
        var xhr = new XMLHttpRequest();
        xhr.open('GET' , url , !isSync);
        if(!isSync){
            xhr.onreadystatechange = function(){
                if( xhr.readyState == 4 && xhr.status >= 200 & xhr.status < 400 ){
                    callback && callback(xhr , xhr.responseText);
                }else{
                    callback && callback(xhr,null);
                }
            };
        }
        xhr.send();
        isSync && callback && callback(xhr , xhr.responseText);
    }

};




exports.page = {
    loadCssFile : function (path) {
        var element = document.createElement("link");
        
        element.setAttribute("rel", "stylesheet");
        element.setAttribute("type", "text/css");
        element.setAttribute("href", path);

        document.getElementsByTagName("head")[0].appendChild(element);        
    },
    createStyleSheet: function(styles){
        var style = document.createElement('style');
        style.type = 'text/css';
        style.textContent = styles;
        document.getElementsByTagName('HEAD')[0].appendChild(style);
    }
};