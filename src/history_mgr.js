var event = require('event');
var lib = require('lib');

var getValueFromSearch = function(target){
    var result = null;
    if( location.search.length ){
        var search = location.search.slice(1);
        search = search.split('&');
        lib.each(search , function(item){
            item = item.split('=');
            if(item[0] == target){
                result = item[1];
            }
        });
    }
    return result;
};

exports.init = function(){
    window.onpopstate = function(e) {
        var state = e.state;
        var page;
        if( !state ){ //new
            page = parseInt(getValueFromSearch('page')) || 1;
        }else{
            page =parseInt(state.page);
        }
        event.dispatchEvent('history:change' , {page:page});
    };
    
    event.addEventListener('page:change' , function(page){
        history.pushState({page:page.page} , document.title , '?page='+page.page);
    });
};

