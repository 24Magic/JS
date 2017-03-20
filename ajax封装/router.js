app.get('/loadMore', function(req, res){
	var curIdx = req.query.index
	var len = req.query.length
	var data = []
	for(var i =0; i<len; i++){
		data.push('内容' + (parseInt(curIdx) + i) )
	}
	setTimeout(function(){
		res.send(data);
	},5000)
	// res.send(data);
});
// app.get('/hello', function(req, res) {
// 	res.send({
// 		status: 0,
// 		msg: "hello 饥人谷"
// 	});
// });