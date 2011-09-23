var event = require('event');

var initMouseEvent = function(){
    document.body.addEventListener('click' , function(){
        event.dispatchEvent('page:increase');
    });
    
    document.body.addEventListener('contextmenu' , function(e){
        e.preventDefault();
    });
    
    document.body.addEventListener('mouseup' , function(e){
        if(e.button == 2){//right key
            event.dispatchEvent('page:decrease');
        }
    });
};

var initKeyboardEvent = function(){
    document.body.addEventListener('keyup' , function(e){
        if(e.keyCode == 32){//空格
            event.dispatchEvent('page:increase');
        }
    });
};


exports.init = function(){
    initMouseEvent();
    
    initKeyboardEvent();
};