var config_mgr = require('config_mgr');
var page_mgr = require('page_mgr');
var history_mgr = require('history_mgr');
var event_mgr = require('event_mgr');

exports.init = function(){
    config_mgr.render();
    page_mgr.init();
    event_mgr.init();
    history_mgr.init();
};
    

