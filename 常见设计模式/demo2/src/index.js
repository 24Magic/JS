//CMD
// define(function(require, exports, module){
// 	var $ = require('jquery')
// 	
// 	var rotation = require('./js/rotation')
//  var EventCenter = require('./js/subscription')

//...

// })

//AMD
define(['jquery', './js/subscription', './js/rotation'], function($, EventCenter, rotation){
	
	rotation.start($('.carousel'))

	var i = 0,
		$li = $('.text ul li'),
		len = $li.length

	EventCenter.on('carousel_show_next', function(){
		i++
		i = i % len
		$li.each(function(index, item){
			$(item).hide()
		})
		$li.eq(i).fadeIn()	
	})

	EventCenter.on('carousel_show_pre', function(){
		i--
		i = (i+len) % len
		$li.each(function(index, item){
			$(item).hide()
		})
		$li.eq(i).fadeIn()
	})
})