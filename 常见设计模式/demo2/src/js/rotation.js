define(['jquery', './subscription'], function($, EventCenter) {
    function Rotation(carousel) {
        this.carousel = carousel
        this.init()
        this.bind()
    }
    Rotation.prototype.init = function() {
        var $imgCt = this.$imgCt = this.carousel.find('.img-ct'),
            $bullet = this.$bullet = this.carousel.find('.bullet'),
            $btnNext = this.$btnNext = this.carousel.find('.btn-next'),
            $btnPre = this.$btnPre = this.carousel.find('.btn-pre')
            //伪装的第一张和最后一张图片 
        var $firstImg = this.$firstImg = $imgCt.children('li').first(),
            $lastImg = $imgCt.children('li').last()
        this.currentIndex = 0, //队列变化的标记
            this.isAnimate = false //动画状态的标记
        this.$imgLength = $imgCt.children().length, //原始队列的长度
            this.$imgWidth = $imgCt.find('img').first().width() //图片宽度
            //添加伪装的元素到队列中去
        $imgCt.prepend($lastImg.clone())
        $imgCt.append($firstImg.clone())
            //扩充父容器的宽度，使其包含伪装元素，并将位置前移到第一张原始图片的位置
        $imgCt.width($firstImg.width() * $imgCt.children().length)
        $imgCt.css('left', -this.$imgWidth)
    }
    Rotation.prototype.bind = function() {
            var _this = this,
                nInterId

            function setInter() {
                nInterId = setInterval(function() {
                    _this.playNext()
                }, 2500)
            }
            setInter()

            this.$btnPre.on('click', function(e) {
                e.preventDefault()
                _this.playPre()
            })
            this.$btnNext.on('click', function(e) {
                e.preventDefault()
                _this.playNext()
            })
            this.$bullet.on('click', 'li', function(e) {
                e.preventDefault()
                var idx = $(this).index(),
                    $imgCtLeft = -_this.$imgWidth * (_this.currentIndex + 1), //获得$imgCt即时left的值
                    currentLeft = -(idx - _this.currentIndex) * _this.$imgWidth + $imgCtLeft //计算获得点击的位置left的值
                _this.currentIndex = idx // 将现在图片的序号赋给currentIndex
                _this.play(currentLeft)
            })
        }
        //随机切换到目标图片
    Rotation.prototype.play = function(n) {
            var _this = this
            if (this.isAnimate) return;
            this.isAnimate = true
            console.log(n)
            this.$imgCt.animate({
                left: n
            }, 'slow', function() {
                if (_this.currentIndex === _this.$imgLength) {
                    _this.$imgCt.css('left', -_this.$imgWidth)
                    _this.currentIndex = 0
                }
                _this.isAnimate = false //动画完成之后解锁
                _this.setBullet() //动画完成之后使小黑点跟随
            })
            EventCenter.fire('carousel_show_play')
        }
        //向后
    Rotation.prototype.playNext = function() {
            var _this = this
            if (this.isAnimate) return;
            this.isAnimate = true
            this.$imgCt.animate({
                left: '-=600'
            }, 'slow', function() {
                _this.currentIndex++;
                if (_this.currentIndex === _this.$imgLength) {
                    _this.$imgCt.css('left', -_this.$imgWidth)
                    _this.currentIndex = 0
                }
                _this.isAnimate = false //动画完成之后解锁
                _this.setBullet() //动画完成之后使小黑点跟随
            })
            EventCenter.fire('carousel_show_next')
        }
        //向前
    Rotation.prototype.playPre = function() {
            var _this = this
            if (this.isAnimate) return;
            this.isAnimate = true
            this.$imgCt.animate({
                left: '+=600'
            }, 'slow', function() {
                _this.currentIndex--;
                if (_this.currentIndex < 0) {
                    _this.$imgCt.css('left', -(_this.$imgLength * _this.$firstImg.width()))
                    _this.currentIndex = _this.$imgLength - 1
                }
                _this.isAnimate = false //动画完成之后解锁
                _this.setBullet() //动画完成之后使小黑点跟随
            })
            EventCenter.fire('carousel_show_pre')
        }
        //图片下边缘动态框跟随图片动态变化
    Rotation.prototype.setBullet = function() {
            this.$bullet.children().removeClass('active').eq(this.currentIndex).addClass('active')
        }
    return {
        start: function($carousel) {
            $carousel.each(function(index, item) {
                new Rotation($(item))
            })
        }
    }
})
