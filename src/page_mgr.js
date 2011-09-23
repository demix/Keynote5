var lib = require('lib');
var event = require('event');

var currentPage = null;
var pageConfig = {};

var buildPage = function(xhr , conf){
    if(conf && conf.length) {
        pageConfig[currentPage] = JSON.parse(conf);
    }
    console.log('build page');
};

var getPageConf = function(){
    if( !pageConfig[currentPage] ){
        lib.ajax.get('data/p'+ currentPage + '.conf' , buildPage);
    }else{
        buildPage();
    }
};

exports.init = function(){
    event.addEventListener('history:change' , function(obj){
        currentPage = obj.page;
        getPageConf();
    });
    
    event.addEventListener('page:increase' , function(){
        currentPage++;//TODO justify max value
        getPageConf();
        event.dispatchEvent('page:change' , {page:currentPage});
    });
    
    event.addEventListener('page:decrease' , function(){
        currentPage--;
        getPageConf();
        event.dispatchEvent('page:change' , {page:currentPage});
    });
};
