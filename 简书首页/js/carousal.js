

$(function (){
		function Carousal(target){
			this.target = target
			this.init()
			this.bind()
		}
		Carousal.prototype.init = function(){
			//声明基本对象
	 		this.$imgCt = $('.img-ct'),
	 		this.$bullet = $('.bullet'),
	 		this.$btnNext = $('.btn-next'),
	 		this.$btnPre =$('.btn-pre')
	 		this.$carousal = $('.carousal')

	 		//声明伪装的第一张和最后一张图片	
	 		this.$firstImg = this.$imgCt.children('li').first(),
	 		this.$lastImg = this.$imgCt.children('li').last()

	 		this.currentIndex = 0,	//声明一个队列变化的标记
	 		this.isAnimate = false	//声明一个动画状态的标记

	 		this.$imgLength = this.$imgCt.children().length,    //声明一个原始队列的长度
	 		this.$imgWidth = $('.img-ct img').first().width()	//图片宽度
			// $currentLeft = -$imgWidth*(currentIndex+1)	//获取即时的left			
		
			//添加伪装的元素到队列中去
	 		this.$imgCt.prepend(this.$lastImg.clone())
	 		this.$imgCt.append(this.$firstImg.clone())

	 		//扩充父容器的宽度，使其包含伪装元素，并将位置前移到第一张原始图片的位置
	 		this.$imgCt.width(this.$firstImg.width()*this.$imgCt.children().length)
	 		this.$imgCt.css('left', -this.$imgWidth)

		}
 		


	Carousal.prototype.bind = function(){
		var _this = this
		//鼠标hover事件
 		this.$carousal.on('mouseover', function(){
 			clearIv()
 			_this.$btnNext.css('opacity', .7)
 			_this.$btnPre.css('opacity', .7)
 		}).on('mouseout', function(){
 			setIv()
 			_this.$btnNext.css('opacity', 0)
 			_this.$btnPre.css('opacity', 0)
 		})

 		var nIntervId
 		//自动播放
 		function setIv(){
 				nIntervId = setInterval(playNext, 1800)
 		}
 		setIv()
 		//停止播放
 		function clearIv(){
 			clearInterval(nIntervId)
 		}

 		//给向前按钮添加向前事件
 		this.$btnPre.on('click', function(e){
 			e.preventDefault() 
 			playPre()
 		})
 		//给向后按钮添加向后事件
 		this.$btnNext.on('click', function(e){
 			e.preventDefault()
 			playNext()
 		})

 		//给小黑点添加点击事件
 		this.$bullet.on('click','li',function(){
 			var idx = $(this).index(),
 				$imgCtLeft = -$imgWidth*(currentIndex+1),	//获得$imgCt即时left的值
 				currentLeft = -(idx - currentIndex)*$imgWidth + $imgCtLeft 	//计算获得点击的位置left的值

 				_this.currentIndex = idx  // 将现在图片的序号赋给currentIndex
 			
 				// console.log(currentIndex)
 				// console.log(currentLeft)
 			play(currentLeft)
 		})


 		//随机切换到目标图片的函数
 		function play(n){
 			if(_this.isAnimate) return;
 			_this.isAnimate = true
 			console.log(n)
 			_this.$imgCt.animate({
 				left: n
 			},'slow', function(){
 				if(_this.currentIndex === _this.$imgLength){
 					_this.$imgCt.css('left', -_this.$imgWidth)
 					_this.currentIndex = 0
 				}
 				_this.isAnimate = false		//动画完成之后解锁
 				setBullet()		//动画完成之后使小黑点跟随
 			})
 		}

 		//向后函数
 		function playNext(){
 			if(_this.isAnimate) return;
 			_this.isAnimate = true

 			_this.$imgCt.animate({
 				left: '-=625'
 			},'slow', function(){
 				_this.currentIndex++;
 				if(_this.currentIndex === _this.$imgLength){
 					_this.$imgCt.css('left', -_this.$imgWidth)
 					_this.currentIndex = 0
 				}
 				_this.isAnimate = false		//动画完成之后解锁
 				setBullet()		//动画完成之后使小黑点跟随
 			})
 		}
 		//向前函数
 		function playPre(){
 			if(_this.isAnimate) return;
 			_this.isAnimate = true
 			
 			_this.$imgCt.animate({
 				left: '+=625'
 			},'slow', function(){
 				_this.currentIndex--;
 				// console.log(currentIndex)
 				if(_this.currentIndex < 0){
 					_this.$imgCt.css('left', -(_this.$imgLength*_this.$firstImg.width()) )
 					_this.currentIndex = _this.$imgLength-1
 				}
 				_this.isAnimate = false	//动画完成之后解锁
 				setBullet()		//动画完成之后使小黑点跟随
 			})
 		}
 		//图片下边缘动态框跟随图片动态变化函数
 		function setBullet(){
 			_this.$bullet.children()
 				   .removeClass('active')
 				   .eq(_this.currentIndex)
 				   .addClass('active')
 		}
 		
	}
 		return new Carousal(document.querySelector(' body .carousal'))
 	})
