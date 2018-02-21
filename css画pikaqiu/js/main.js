!function(){
	function writeCode(prefix, code, fn){
		let container = document.querySelector("#code")
		let styleTag = document.querySelector("#styleTag")
		let n = 0
		let id = setInterval(()=>{
			n+=1
			container.innerHTML = code.substring(0, n)
			styleTag.innerHTML = code.substring(0, n)
			container.scrollTop = container.scrollHeight
			if(n>= code.length){
				window.clearInterval(id)
				fn && fn.call()
			}
		}, 10)
	}

	let code =`
/*
 *我们开始先得有个画板，好给加上
 */
.preview{
	height: 100%;
	border: 1px solid green;
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: #fee433;
}
.wrapper{
	position: relative;
    width: 100%;
	height: 165px;
}
.wrapper > :not(:last-child){
	z-index: 1;
}
/*
 *接下来先画最简单的鼻子
 */
.nose{
	position: absolute;
	width: 0px;
	height: 0px;
	border-radius: 50%;
	border-style: solid;
	border-width: 10px 12px;
	border-color: black transparent transparent;
	left: 50%;
	top: 20px;
	margin-left: -12px;
}
/*
 *然后呢我们开始画眼睛了
 */
.eye {
	position: absolute;
	width: 49px;
	height: 49px;
	background-color: #2e2e2e;
	border-radius: 50%;
	border: 2px solid #000;
}
/*
 *这是左眼
 */
.eye.left{
	right: 50%;
	margin-right: 90px;
}
/*
 *这是右眼
 */
.eye.right{
	left: 50%;
	margin-left: 90px;
}
/*
 *我们给眼睛点亮一下
 */
.eye::before {
	content: '';
	display: block;
	width: 24px;
	height: 24px;
	background-color: #fff;
	position: absolute;
	left: 6px;
	top: -1px;
	border-radius: 50%;
	border: 2px solid #000;
}

/*
 *然后我们把左右两边的红脸颊给画上
 */
.face{
	position: absolute;
	width: 68px;
	height: 68px;
	background-color: #fc0d1c;
	border: 2px solid black;
	border-radius: 50%;
	top: 85px;
}

/*
 左脸颊
 */
.face.left{
	right: 50%;
	margin-right: 116px;
}
/*
 右脸颊
 */
.face.right{
	left: 50%;
	margin-left: 116px;
}
/*
 *接下来我们画比较难的胡须和嘴巴
 */
.upperLip{
	position: absolute;
	width: 80px;
	height: 25px;
	border: 3px solid black;
	background-color: #fde348;
	top: 47px;
}
/*
 这是皮卡丘的左胡须
 */
.upperLip.left{
	right: 50%;
	border-bottom-left-radius: 40px 25px;
	border-top: none;
	border-right: none;
	transform: rotate(-20deg);
}
/*
 *这是皮卡丘的右胡须
 */
.upperLip.right{
	left: 50%;
	border-bottom-right-radius: 40px 25px;
	border-top: none;
	border-left: none;
	transform: rotate(20deg);
}
/*
 *好了就剩下可爱的嘴巴了
 */
.lowerLip-wrapper{
	position: absolute;
	width: 300px;
	height: 158px;
	bottom: -50px;
	left: 50%;
	margin-left: -150px;
	overflow: hidden;
}
/*
 *诱人的大嘴巴画出来了
 */
.lowerLip{
	width: 300px;
	height: 4000px;
	background-color: #990513;
	border-radius: 200px/2000px;
	position: absolute;
	bottom: 0;
	border: 2px solid black;
	overflow: hidden;
}
/*
 *最后把调皮的舌头加上
 */
.lowerLip::before{
	content: '';
	display: block;
	position: absolute;
	left: 50%;
	margin-left: -100px;
	bottom: -84px;
	width: 200px;
	height: 200px;
	background-color: #fc4a62;
	border-radius: 100px;
}`
	// //字符串 
 //    code=code.replace(/(['"]).*\1/g,function(m){return "<span style=\"color:#060;\">"+m+"</span>"}); 
 //    //CSS样式值 
 //    code=code.replace(/:(.+);/g,function(m,n){return ":<span style=\"color:#00F;\">"+n+"</span>;"}); 
	
	// //CSS样式名称 
 //    code=code.replace(/[{}]/g,function(m){ 
 //        if(m=="{"){ 
 //            return "{<span style=\"color:#006;\">"; 
 //        }else{ 
 //            return "</span>}"; 
 //        } 
 //    }); 
     
 //    //注释 
   
 //   code=code.replace(/_(\d+)_/g,function(m,n){return "<span style=\"color:#999;\">"+commentList[n]+"</span>"}); 
   writeCode('', code)
}.call()