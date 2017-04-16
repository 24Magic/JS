var $ = require('jquery')

var navFollow = (function(){

  function NavFollow($targets){
    this.$targets = $targets
    this.bind()
  }

  NavFollow.prototype.bind = function(){
    var _this = this
    
    this.$targets.children('#portfolio').find('.h-container-card .card .hover').each(function(index, item){
      $(item).on('mouseover', function(){
        $(this).css('opacity', .7)
      })
      $(item).on('mouseout', function(){
        $(this).css('opacity', 0)
      })
    })

    
    this.$targets.children('#bootstrap').animate({
      paddingTop: 10 + 'px',
      paddingBottom: 10 + 'px',
      fontSize: 1.1 + 'em'
    }, 0)
      
    $(window).on('scroll', function(){

      var scrollTop = $(window).scrollTop(),
      headerHeight = _this.$targets.children('#header').outerHeight(),
      servicesHeight = _this.$targets.children('#services').outerHeight(),
      portfolioHeight = _this.$targets.children('#portfolio').outerHeight(),
      newsHeight = _this.$targets.children('#manynews').outerHeight(),
      aboutHeight = _this.$targets.children('#about').outerHeight(),
      teamHeight = _this.$targets.children('#team').outerHeight() + _this.$targets.children('#brand').height()

       _this.$targets.children('#bootstrap').find('.navbar-container .navbar li').each(function(index, item){
        $(item).children('a').removeClass('bgc')

        if(scrollTop<headerHeight){
          _this.$targets.children('#bootstrap').animate({
            paddingTop: 10 + 'px',
            paddingBottom: 10 + 'px',
            fontSize: 1.1 + 'em'
          }, 0)
        }

        if(scrollTop>headerHeight || scrollTop === headerHeight){
          _this.$targets.children('#bootstrap').animate({
            paddingTop: 5 + 'px',
            paddingBottom: 5 + 'px'
          }, 0)
          $(item).children('a').removeClass('bgc')
          $(item).children('.a').addClass('bgc')
        }
        if(scrollTop>headerHeight+servicesHeight || scrollTop === headerHeight+servicesHeight){
          $(item).children('a').removeClass('bgc')
          $(item).children('.b').addClass('bgc')
        }
        if(scrollTop>headerHeight+servicesHeight+portfolioHeight || scrollTop === headerHeight+servicesHeight+portfolioHeight){
          $(item).children('a').removeClass('bgc')
          $(item).children('.c').addClass('bgc')
        }
        if(scrollTop>headerHeight+servicesHeight+portfolioHeight+newsHeight || scrollTop === headerHeight+servicesHeight+portfolioHeight+newsHeight){
          $(item).children('a').removeClass('bgc')
          $(item).children('.d').addClass('bgc')
        }
        if(scrollTop>headerHeight+servicesHeight+portfolioHeight+newsHeight+aboutHeight || scrollTop === headerHeight+servicesHeight+portfolioHeight+newsHeight+aboutHeight){
          $(item).children('a').removeClass('bgc')
          $(item).children('.e').addClass('bgc')
        }
        if(scrollTop>headerHeight+servicesHeight+portfolioHeight+newsHeight+aboutHeight+teamHeight || scrollTop === headerHeight+servicesHeight+portfolioHeight+newsHeight+aboutHeight+teamHeight){
          $(item).children('a').removeClass('bgc')
          $(item).children('.f').addClass('bgc')
        }
       })
    })

    
  }

  return {
    init: function($targets){
      new NavFollow($targets)
    }
  }
})()

module.exports = navFollow

