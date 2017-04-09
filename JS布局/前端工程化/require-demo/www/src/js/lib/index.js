

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
define(['jquery', '../com/goTop', '../com/rotation', '../com/newsFormate', '../com/navFollow'], function($, goTop, rotation, newsFormate, navFollow){

	new goTop($('body'), $('<div class="go-top">TOP</div>'))
	new rotation($('.carousel'))
	new newsFormate($('.news-container'), $('.news-container .news'), $('.news-container .btn'))
	new navFollow($('body'))
})