//goTop.js

let goTop = (function(){
	function GoTop($ct, $el){
		this.$ct = $ct
		this.$el = $el
		this.bindEvents()
	}

	GoTop.prototype.bindEvents = function(){
		let _this = this

		$(window).scroll(function(){
			let scrollTop = $(window).scrollTop()
			console.log(scrollTop)
			if(scrollTop > 100){
				_this.$el.show('slow')
			}else{
				_this.$el.hide('slow')
			}
		})

		_this.$el.on('click', function(e){
			e.preventDefault()
			$(window).scrollTop(0)
		})
	}

	return {
		init: function($ct, $el){
			$ct.each(function(index, item){
				new GoTop($(item), $el)
			})
		}
	}
})()

goTop.init($('body'), $('.goTop'))