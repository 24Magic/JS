	 


define(['jquery'], function($){

	function NewsFormate($newsContainer, $targets, $element){
	 		this.$newsContainer = $newsContainer
	 		this.$targets = $targets
	 		this.$element = $element
	 		this.init()
	 		this.bind()

	 	}

	 	NewsFormate.prototype.init = function(){
	 		this.curPage = 1,
        	this.perPageCount = 8

        	
	 		this.sumHeightArr = [],
			nodeWidth = this.$targets.find('.item').outerWidth(true),
			colLength = parseInt( this.$targets.width() / nodeWidth );

			for(var i=0; i<colLength; i++){
				 	this.sumHeightArr.push(0)
				 }

		 	this.loadAndPlace()	
	 	} 	
	 	

	 	NewsFormate.prototype.bind = function(){
	 		var _this = this
	 		this.$element.on('click', function(){
	 		_this.loadAndPlace()
	 		})
	 	}


        NewsFormate.prototype.loadAndPlace = function(){
        	var _this = this
        	$.get({
        		url: 'https://platform.sina.com.cn/slide/album_tech',
        		dataType: 'jsonp',
        		jsonp: "jsoncallback",
        		data: {
        			app_key: '1271687855',
        			num: this.perPageCount,
        			page: this.curPage
        		}
        	}).done(function(ret){
        		if(ret && ret.status && ret.status.code ==='0'){
        			
        			_this.place(ret.data)	
        			console.log(ret.data)	//数据没问题，放置数据
        			_this.curPage++
        		}else{
        			console.log('get error data')
        		}
        	})
        }
       
        NewsFormate.prototype.place = function(nodeList){
        	
        	var _this = this
        	
        	$(nodeList).each(function(index, item){
        		var $node = _this.getNode(item)	//获取data中每一项
        		$node.find('.thumb img').on('load', function(){
        			_this.$targets.append($node)
        			_this.waterFall($node)
        		})
        			
        		
        	})
        }

  		//把数据转换成html中的节点
  		NewsFormate.prototype.getNode = function(item){
  			var htmls = ''
				htmls += '<div class="item">';
				htmls += '<a href="' + item.url + '">';
				htmls += '<div class="thumb">';
				htmls += '<img src="' + item.img_url + '">';
				htmls += '</div><h4>' + item.short_name + '</h4>'
				htmls += '<p>' + item.short_intro + '</p>'
				htmls += '</a></div>'
			return $(htmls)
  		}

  		//对每次获得数据单独进行瀑布流
  		NewsFormate.prototype.waterFall = function($node){
  			var _this = this
			$node.each(function(){
			 	$cur = $(this)
			 	var idx =0,
					minSumHeight = _this.sumHeightArr[0];

				for(var i=0; i<_this.sumHeightArr.length; i++){
				 	if(_this.sumHeightArr[i] < minSumHeight){
				 		minSumHeight = _this.sumHeightArr[i]
				 		idx = i
				 	}
				} 
				$cur.css({
				 	left: nodeWidth*idx,
				 	top: minSumHeight,
				 	opacity: 1
				})
				_this.sumHeightArr[idx] += $cur.outerHeight(true)

				_this.$targets.height(Math.max.apply(null, _this.sumHeightArr))
			})
		
  		}


	return NewsFormate

})


	 

