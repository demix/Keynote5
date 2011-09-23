/*
 * @template
 */
/**
 * @name BD.Event
 * @namespace 事件相关
 */



var lib = require('lib');

var subscribers = {};

/**
 * 监听某事件
 * @name BD.addEventListener
 * @function
 * @param {string} name 事件名称
 * @param {function} cb 事件发生时的回调函数
 */
exports.addEventListener= function(name,cb){
    if( !subscribers[name] ){
        subscribers[name] = [cb];
    }else{
        subscribers[name].push(cb);
    }
};

/**
 * 取消监听某事件
 * @name BD.removeEventListener
 * @function
 * @param {string} name 事件名称
 * @param {function} cb 事件发生时的回调函数
 */
exports.removeEventListener= function(name , cb){
    var subs = subscribers[name];
    if(!subs) return;

    lib.each( subs , function(sub , i){
        if(sub == cb){
            subs[i] = null;
        }
    } );
};

/**
 * 清除某事件
 * @name BD.clear
 * @function
 * @param {string} name 事件名称
 */
exports.disposeEvent =  function(name){
    delete subscribers[name];
};



/**
 * 执行某事件
 * @name BD.dispatchEvent
 * @function
 * @param {string} name 事件名称
 * @param {...} arguments 传递给回调函数的参数
 */
exports.dispatchEvent= function(){
    var args = Array.prototype.slice.call(arguments);
    var name = args.shift();

    if( !subscribers[name] ) return;

    lib.each(subscribers[name], function(sub) {
        if (sub) {
            sub.apply(this, args);
        }
    });
    
};

