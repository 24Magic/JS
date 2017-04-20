//CMD
// define(function(require, exports, module){
// 	var jQuery = require('jquery')
// 	var GoTop = require('../com/goTop')
// 	var Rotation = require('../com/rotation')
// 	var NewsFormate = require('../com/newsFormate')
// 	var NavFollow = require('../com/navFollow')


// 	new GoTop($('body'), $('<div class="go-top">TOP</div>'))
// 	new NewsFormate($('.news-container'), $('.news-container .news'), $('.news-container .btn'))

// 	new Rotation($('.carousel'))
// 	new NavFollow($('body'))
	
// })

//AMD
define(['jquery', './js/Tab', './js/rotation'], function($, tab, rotation){

	tab.start($('.container'))
	rotation.start($('.container .tab-text .carousel'))

})