$(function(){

	//預加載一次
	check()

	

	//滾動時開始懶加載
	$(window).on('scroll', check)

	function check(){

		let $imgs = $('body img')
		//將未加載的進行遍歷，減少重複遍歷
		$imgs.not('.load').each(function(){
			if(isShow($(this)) && $(this).attr('data-src')){
				showImg($(this))
			}
		})
	}

	function isShow($el){
		let windowHeight = $(window).height(),
			scrollTop = $(window).scrollTop(),
			offsetTop = $el.offset().top,
			imgHeight = $el.outerHeight()

		if( windowHeight + scrollTop > offsetTop && offsetTop + imgHeight > scrollTop) return true
			else return false	

	}
	
	function showImg($img){
		$img.each(function(){
			let dataSrc = $(this).attr('data-src')
			$(this).attr('src', dataSrc)
			//已加載的添加標記load
			$(this).addClass('load') 
		})
	}

})