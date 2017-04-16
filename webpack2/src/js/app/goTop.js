var $ = require('jquery')

var goTop = (function(){
  function GotTop($container, $element) {
  this.ct = $container;
  this.element = $element;
  this.bindEvent();
  this.createNode()
  }
  GotTop.prototype.bindEvent = function(){
    
    var _this = this

      $(window).scroll(function(){
        var scrollTop = _this.ct.scrollTop()
        if(scrollTop > 100){
          _this.element.show('slow')
        }else{
          _this.element.hide('slow')
        }
      })

      _this.element.on('click', function(){
        _this.ct.animate({
          scrollTop: 0
        }, 600)
      })
  }

  GotTop.prototype.createNode = function(){
    this.ct.append(this.element)
  }

  return {
    init: function($container, $element){
      new GotTop($container, $element)
    }
  }
})()

module.exports = goTop



  


