var $ = require('jquery')

var rotation = (function(){

	function Rotation(carousel){
 		this.carousel = carousel
 		this.init()
 		this.bind()
 	}

 	Rotation.prototype.init = function(){
 		var $imgCt = this.$imgCt = this.carousel.find('.img-ct'),
 			$bullet = this.$bullet = this.carousel.find('.bullet'),
 			$btnNext = this.$btnNext = this.carousel.find('.btn-next'),
 			$btnPre =this.$btnPre = this.carousel.find('.btn-pre')

 			//伪装的第一张和最后一张图片	
 		var $firstImg = this.$firstImg = $imgCt.children('li').first(),
 			$lastImg = $imgCt.children('li').last()

 		this.currentIndex = 0,	//队列变化的标记
 		this.isAnimate = false	//动画状态的标记
 		this.$imgLength = $imgCt.children().length,   //原始队列的长度

 		$imgCt.find('img').each(function(index, item){
 			$(item).width($(window).width())
 			$(item).height($(window).height())
 		})
 		
 		this.$imgWidth = $imgCt.find('img').first().width()
 		this.$imgHeight = $imgCt.find('img').first().height()//图片宽度
		this.carousel.children('.carousel-container').width(this.$imgWidth)
		this.carousel.children('.carousel-container').height(this.$imgHeight)
		this.$imgCt.width(this.$imgLength * this.$imgWidth)
		


		

			//添加伪装的元素到队列中去
 		$imgCt.prepend($lastImg.clone())
 		$imgCt.append($firstImg.clone())

 			//扩充父容器的宽度，使其包含伪装元素，并将位置前移到第一张原始图片的位置
 		$imgCt.width($firstImg.width()*$imgCt.children().length)
 		$imgCt.css('left', -this.$imgWidth)
 	}
 		
 	Rotation.prototype.bind = function(){
 		var _this = this,
 			nInterId
 			
 		function setInter(){
 			nInterId = setInterval(function(){
 				_this.playNext()
 			}, 2500)
 		}
 		 
 		setInter()
 		/*
 		$(window).on('resize', function(){
 			_this.$imgCt.find('img').each(function(index, item){
	 			$(item).width($(window).width())
	 			$(item).height($(window).height())
 			})

 			_this.$imgWidth = $imgCt.find('img').first().width()
	 		_this.$imgHeight = $imgCt.find('img').first().height()//图片宽度
			_this.carousel.children('.carousel-container').width(_this.$imgWidth)
			_this.carousel.children('.carousel-container').height(_this.$imgHeight)
			_this.$imgCt.width(_this.$imgLength * _this.$imgWidth)

 		})
 		*/
 		/*
 		this.carousel.on('mouseover', function(){
 			clearInterval(nInterId)
 		})
 		this.carousel.on('mouseout', setInter)
		*/
 		this.$btnPre.on('click', function(e){
 			e.preventDefault() 
 			_this.playPre()
 		})
 			
 		this.$btnNext.on('click', function(e){
 			e.preventDefault()
 			_this.playNext()
 		})

 		this.$bullet.on('click','li',function(e){
 			e.preventDefault()
 			var idx = $(this).index(),
 				$imgCtLeft = -_this.$imgWidth*(_this.currentIndex+1),	//获得$imgCt即时left的值
 				currentLeft = -(idx - _this.currentIndex)*_this.$imgWidth + $imgCtLeft 	//计算获得点击的位置left的值

 				_this.currentIndex = idx  // 将现在图片的序号赋给currentIndex
 			
 			_this.play(currentLeft)
 		})

 	}

 		//随机切换到目标图片
 	Rotation.prototype.play = function(n){
 		var _this = this

 		if(this.isAnimate) return;
 		this.isAnimate = true
 		console.log(n)

 		this.$imgCt.animate({
 			left: n
 		},'slow', function(){
 			if(_this.currentIndex === _this.$imgLength){
 				_this.$imgCt.css('left', -_this.$imgWidth)
 				_this.currentIndex = 0
 			}
 			_this.isAnimate = false		//动画完成之后解锁
 			_this.setBullet()		//动画完成之后使小黑点跟随
 		})
 	}	

 		//向后
 	Rotation.prototype.playNext = function(){

 		var _this = this

 		if(this.isAnimate) return;
 		this.isAnimate = true

 		this.$imgCt.animate({
 			left: '-='+this.$imgWidth
 		},'slow', function(){
 			_this.currentIndex++;

 			if(_this.currentIndex === _this.$imgLength){
 				_this.$imgCt.css('left', -_this.$imgWidth)
 				_this.currentIndex = 0
 			}

 			_this.isAnimate = false		//动画完成之后解锁
 			_this.setBullet()		//动画完成之后使小黑点跟随
 		})
 	}
 	
 		//向前
 	Rotation.prototype.playPre = function(){

 		var _this = this

 		if(this.isAnimate) return;
 		this.isAnimate = true
 			
 		this.$imgCt.animate({
 			left: '+='+this.$imgWidth
 		},'slow', function(){
 			_this.currentIndex--;
 			
 			if(_this.currentIndex < 0){
 				_this.$imgCt.css('left', -(_this.$imgLength*_this.$firstImg.width()) )
 				_this.currentIndex = _this.$imgLength-1
 			}

 			_this.isAnimate = false	//动画完成之后解锁
 			_this.setBullet()		//动画完成之后使小黑点跟随
 		})
 	}

 		//图片下边缘动态框跟随图片动态变化
 	Rotation.prototype.setBullet = function(){
 		this.$bullet.children()
 			   .removeClass('active')
 			   .eq(this.currentIndex)
 			   .addClass('active')
 	}

 	return {
 		init: function(carousel){
 			new Rotation(carousel)
 		}
 	}
})()

module.exports = rotation




 	
