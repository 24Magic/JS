var ajax = (function(){
	function Ajax(options){
		options.success = options.success || function(){}
		options.error = options.error || function(){}
		options.dataType = options.dataType || 'json'
		options.data = options.data || {}

		var dataStr = ''
		for (var key in options.data){
			dataStr += key + '=' + options.data[key] + '&'
		}

		var xhr = new XMLHttpRequest()
		xhr.onreadystatechange = function(){
			if(xhr.readyState === 4){
				if(xhr.status === 200 || xhr.status === 304){
					if(options.dataType === 'json'){
						var json = JSON.parse(xhr.responseText)
						options.success(json)
					}
					if(options.dataType === 'text'){
						options.success(xhr.responseText)
					}
				}else{
					options.error()
				}
			}
		}

		dataStr = dataStr.substr(0, dataStr.length-1)

		if(options.type.toLowerCase() === 'post'){
			xhr.open(options.type, options.url, true)
			xhr.setRequestHeader('content-type', 'application/x-www-form-urlencode')
			xhr.send(dataStr)
		}
		if(options.type.toLowerCase() === 'get'){
			xhr.open(options.type, options.url + '?' + dataStr, true)
			xhr.send()
		}
	}
	return {
		init: function(options){
			new Ajax(options)
		}
	}	
})()
module.exports = ajax