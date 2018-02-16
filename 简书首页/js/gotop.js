$(function(){

	function GoTop(target){
		this.target = target
		this.bind()
		this.init()
	}

	GoTop.prototype.init = function(){
		this.$scrollTop = $(window).scrollTop()
		
	}

	GoTop.prototype.bind = function(){
		let self = this
		$(window).scroll(function(){

	        if(self.$scrollTop > 100){
	          self.target.show('slow')
	         
	        }else if(self.$scrollTop === 0|| self.$scrollTop === 100 ){
	     
	          self.target.hide('slow')
	        }
	    })
		self.target.on('click', function(){
			$(window).scrollTop(0)

		})
	}
	
	return new GoTop($('.go-top'))
})