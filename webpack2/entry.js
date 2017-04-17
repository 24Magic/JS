

require('./src/css/reset.css')
require('./src/css/common.css')
require('./src/css/index.css')  //载入css
require('./src/css/goTop.css')
require('./src/css/rotation.css')
require('./src/css/newsFormate.css')

var $ = require('jquery')
var goTop = require('./src/js/app/goTop.js')
goTop.init($('body'), $('<div class="go-top">TOP</div>'))

var navFollow = require('./src/js/app/navFollow.js')
navFollow.init($('body'))

var newsFormate = require('./src/js/app/newsFormate.js')
newsFormate.init($('.news-container'), $('.news-container .news'), $('.news-container .btn'))

var rotation = require('./src/js/app/rotation.js')
rotation.init($('.carousel'))