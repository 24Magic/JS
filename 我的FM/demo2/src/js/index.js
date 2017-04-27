var ajax = require('./ajax')
var music = (function() {
    function Music(target) {
        this.target = target
        this.init()
        this.bind()
    }
    Music.prototype.init = function() {

        //歌曲列表
        this.dataList = [
        {number: 1, channel: '甜蜜感受', title: 'I Have You', author: 'carpenters', picture:'http://musicdata.baidu.com/data2/pic/88708601/88708601.jpg@s_0,w_300', url: 'http://yinyueshiting.baidu.com/data2/music/42964796/8341319169200128.mp3?xcode=be14d3023374dffb85f6fb12ebde0b01', lrc: 'http://musicdata.baidu.com/data2/lrc/240075522/240075522.lrc'},
        {number: 2, channel: '华语', title: '嘻游记', author: '南拳妈妈', picture: 'http://musicdata.baidu.com/data2/pic/bc10935c9d851cf03f6a17c8d92f6e23/537790696/537790696.jpg@s_0,w_300', url: 'http://yinyueshiting.baidu.com/data2/music/123050312/268038194400128.mp3?xcode=a952e9ce7a645b7b794b86d808232fc4', lrc: 'http://musicdata.baidu.com/data2/lrc/268040/268040.lrc'},
        {number: 3, channel: '轻松假日', title: '我在人民广场吃炸鸡', author: '阿肆', picture: 'http://musicdata.baidu.com/data2/pic/88406926/88406926.jpg@s_0,w_300', url: 'http://yinyueshiting.baidu.com/data2/music/61ae41aba848f4880db721461e8a070c/539704867/64357325190800128.mp3?xcode=7ed5aab5b705a93ab169a51e193c0fa9', lrc: 'http://musicdata.baidu.com/data2/lrc/240888957/240888957.lrc'}
        ]
        //现在播放歌曲的信息
        this.curMusic = {}

        //播放按钮
        this.playDoubleButton = $(this.target, '.play-double')
        this.playButton = $(this.target, '.play')
        this.nextButton = $(this.target, '.next')

        //音量DOM
        this.timeVolumeLoopNode = $(this.target, '.time-volume-loop')
        this.volumeButton = $(this.target, '.volume')
        this.volumePanelNode = $(this.target, '.volume-panel')
        this.volumeLineNode = $(this.target, '.volume-line')
        this.volumeChangeNode = $(this.target, '.volume-change')
        this.volumeRectangleNode = $(this.target, '.volume-rectangle')
        this.volumeIconNode = $(this.target, '.volume .iconfont')

        this.loopButton = $(this.target, '.loop')

        //播放界面上的img,style,author,title
        this.imgNode = $(this.target, '.picture')
        this.styleNode = $(this.target, '.style')
        this.authorNode = $(this.target, '.author')
        this.titleNode = $(this.target, '.title')

        //音乐进度条
        this.timeNode = $(this.target, '.time')
        this.lineTimeNode = $(this.target, '.line-time')
        this.lineNode = $(this.target, '.line')
        this.lineNowNode = $(this.target, '.line-now')
        this.circleNode = $(this.target, '.circle')

        //界面上的歌词DOM
        this.lrcContent = $(this.target, '.lrc-content')
        this.lrcLi = document.querySelectorAll('.lrc-content li')

        //歌词==>[ [curTime, '歌词'], ...]
        var lrcArr = this.lrcArr

        //音乐列表DOM
        this.preferButton = $(this.target, '.prefer')
        this.musicListContainer = $(this.target, '.music-list-container')
        this.musicList = $(this.target, '.music-list')
        this.musicListButton = $(this.target, '.list')
        this.musicLiDelete = $(this.target, '.delete')

        //dataList中的歌曲信息
        var number = this.number
        var channel = this.channel
        var picture = this.picture
        var title = this.title
        var author = this.author
        // var url = this.url
        var lyc = this.lyc

        var volume = this.volume

        var li = this.li
        var isLoad = this.isLoad = false
        var isLoad_ = this.isLoad_ = false

        var k = this.k

        //创建歌曲的构造函数
        var audio = this.audio = new Audio()
        audio.autoplay = true

        function $(element, selector) {
            return element.querySelector(selector)
        }
    }
    Music.prototype.bind = function() {
        var _this = this

        getAndLoad()
        loadDataList()

            //音乐API==>播放
        this.audio.addEventListener('playing', function() {
            this.timer = setInterval(function() {
                updateProgress()
            }, 1000)
            renderLrc()
        })

            //音乐API==>暂停
        this.audio.addEventListener('pause', function() {
            clearInterval(this.timer)
            clearInterval(showLrc)
        })
            //音乐API==>一首歌结束
            
        this.audio.addEventListener('ended', function() {
            
            loop()
           
        })


        var h = 0
        function loop(){
            let iconfont = _this.loopButton.querySelector('.iconfont')

            if (iconfont.classList.contains('icon-loop_shuffle')) {
                loadAudio()
                iconLove1()
            }
            if (iconfont.classList.contains('icon-loop_single')) {
            
                _this.audio.play()
                
            }
            if (iconfont.classList.contains('icon-loop_allrepeat')) {

                iconIcon()
                let p = document.querySelectorAll('.music-list li .point')
                let g
                for(let i =0; i<_this.dataList.length; i++){
                    if(p[i].classList.contains('active')){
                        g = i

                    }

                }

                p.forEach(function(item){
                    if(!item.classList.contains('active')){
                        allRepeat(0)
                        _this.musicList.querySelectorAll('.point').forEach(function(item){
                            item.classList.remove('active')
                        })
                        _this.musicList.querySelectorAll('.point')[0].classList.add('active')
                    }
                })
                    
                
                

                g = (g+1)%_this.dataList.length
                allRepeat(g)
                _this.musicList.querySelectorAll('.point').forEach(function(item){
                    item.classList.remove('active')
                })
                _this.musicList.querySelectorAll('.point')[g].classList.add('active')

                g++                                        
            }
        }

        function allRepeat(j){

            if(!_this.dataList[j]){
                console.log(_this.dataList)
            }
            //根据数组中该歌曲的信息，播放该歌曲
            _this.audio.src = _this.dataList[j].url

            console.log(_this.dataList[j].url)

            _this.audio.play()
            _this.styleNode.innerText = _this.dataList[j].channel
            _this.imgNode.setAttribute('src', _this.dataList[j].picture)
            _this.imgNode.style.width = 112 + 'px'
            _this.imgNode.style.height = 112 + 'px'
            _this.titleNode.innerText = _this.dataList[j].title
            _this.authorNode.innerText = '-' + _this.dataList[j].author

            if(_this.dataList[j].lrc === ''){
                let lrc_ = '歌词君偷懒了，快来人K他╰（‵□′）╯'
                    _this.lrcContent.innerHTML = lrc_ 
                    _this.lrcContent.style.opacity = 1
            }else{
                getLrc(_this.dataList[j].lrc)
            }

        }
            //播放/暂停的切换
        this.playButton.addEventListener('click', function() {
            var icon = this.querySelector('.fa')
            if (icon.classList.contains('fa-play')) {
                _this.audio.play()
            } else {
                _this.audio.pause()
            }
            icon.classList.toggle('fa-play')
            icon.classList.toggle('fa-pause')
        })

            //切换音乐主题
        this.playDoubleButton.addEventListener('click', function() {

            // document.querySelectorAll('.point').forEach(function(item){
            //     item.classList.remove('active')
            // })

            getAndLoad()            
            iconLove1()

            
            //==>在音乐列表里的歌曲时
            //==>点击下一主题
            //==>去除音乐列表里的歌曲播放
            //==>随机切换主题播放
        })

            //将爱心变为空心
        function iconLove1(){
            let iconfontLove = _this.preferButton.querySelector('.iconfont') 
            iconfontLove.classList.remove('icon-icon')
            iconfontLove.classList.add('icon-love1')
        }

        function iconIcon(){
            let iconfontLove = _this.preferButton.querySelector('.iconfont') 
            iconfontLove.classList.remove('icon-love1')
            iconfontLove.classList.add('icon-icon')
        }

            //如果有单曲循环标志，切换歌曲后还是单曲循环
        function singleLoop(){
            let iconfontSingle = _this.loopButton.querySelector('.iconfont')
            if (iconfontSingle.classList.contains('icon-loop_single')) {
                _this.audio.play()
            }
        }

            //切换播放按钮
        function iconPlay(){
            let iconfontPlay = _this.playButton.querySelector('.fa')
            iconfontPlay.classList.remove('play')
            iconfontPlay.classList.add('pause')
        }

            //该音乐主题的下一首
        this.nextButton.addEventListener('click', function() {

            // document.querySelectorAll('.point').forEach(function(item){
            //     item.classList.remove('active')
            // })
            
            
            loop()

            

        //     //==>在音乐列表里的歌曲时
        //     //==>点击下一收
        //     //==>去除音乐列表里的歌曲播放
        })

            //==>随机播放该主题下某一首播放
            //播放方式==>随机播放/单曲循环/循环播放
            var i = 0,
                j
        this.loopButton.addEventListener('click', function(e) {
            
            let icons = ['icon-loop_single', 'icon-loop_allrepeat', 'icon-loop_shuffle']
            let iconfontLoop = this.querySelector('.iconfont')

            
              
            i = i % icons.length
            iconfontLoop.classList.add(icons[i])
            j = (i - 1 + icons.length) % icons.length
            iconfontLoop.classList.remove(icons[j])
            i++

            // e.stopPropagation()
        })


        /*音量控制*/

            //开始音量条默认为现在播放的音量
        this.volumeChangeNode.style.height = _this.audio.volume * 100 + '%'

            //静音按钮==>点击静音/再次点击回复到音量条的音量大小
        this.volumeIconNode.addEventListener('click', function(e) {

            this.classList.toggle('icon-volume_high')
            this.classList.toggle('icon-volume_off')
            if(this.classList.contains('icon-volume_off')){
                _this.audio.volume = 0
            }
            if(this.classList.contains('icon-volume_high')){
                let h = _this.volumeChangeNode.style.height + ''
                let _h = parseFloat( h.slice(0, -1) ) / 100
                _this.audio.volume = _h
            }
        })

            //悬浮音量键出现音量条
        this.volumeButton.addEventListener('mouseover', function() {
            var iconfont = this.querySelector('.iconfont')
            if (iconfont.classList.contains('icon-volume_high')) {
                _this.volumePanelNode.style.display = 'block'
            }
        })
        this.volumeButton.addEventListener('mouseout', function() {
            _this.volumePanelNode.style.display = 'none'
        })

 
            //点击音量条上的位置改变音量大小
        this.volumePanelNode.addEventListener('click', function(e) {
            var volumeLineHeight = parseInt(getComputedStyle(this).height)
            console.log('Volume X: '+ e.offsetX)
            console.log('Volume Y: '+ e.offsetY)
            let percent  =  1- parseFloat(e.offsetY / volumeLineHeight) 
            let vol = _this.audio.volume = percent    
            _this.volumeChangeNode.style.height = percent * 100 + '%'
            _this.volume = vol
        })

        this.timeVolumeLoopNode.addEventListener('click', function(e){
            e.stopPropagation()
        })

        this.volumeRectangleNode.addEventListener('click', function(e) {
            e.stopPropagation()
        })
        

        /*控制进度条*/

            //改变进度条的位置/时间/歌词
        this.lineTimeNode.addEventListener('click', function(e) {
            var lineWidth = parseInt(getComputedStyle(this).width)
            var percent = e.offsetX / lineWidth
            _this.audio.currentTime = parseInt(percent * _this.audio.duration)
            _this.lineNowNode.style.width = percent * 100 + '%'
            updateProgress()
        })

        this.circleNode.addEventListener('click', function(e) {
            e.stopPropagation()
        })


        /*音乐列表*/

        //=======把喜爱的歌曲添加到歌曲列表里,不喜欢的歌曲从歌曲列表里删除，点击列表里的歌曲播放该歌曲
            
            //var curMusic = {number: 'number', channel: '伤感', picture: 'picture', title: '火柴天堂', author: '齐秦', url: 'url', lrc: 'lrc'}
            
            //=======爱心按钮-添加当前歌曲

            //==》声明一个空数组dataList = []，原始状态->点击后添加，先把当前歌曲信息添加push到该数组里面
            //==》生成curMusic，number为歌曲列表的index+1
            //==》拼接HTML，createHtml()
            //==》appendChild()从curMusic中把number，title，author,lrc,picture,url添加到播放列表里中


            //=======爱心按钮-删除该歌曲
            //==》removeChild(_this.musicList.querySelectorAll('li')[number])

        this.preferButton.addEventListener('click', function() {
            

            var iconfont = this.querySelector('.iconfont')
            iconfont.classList.toggle('icon-love1')
            iconfont.classList.toggle('icon-icon')

            _this.curMusic.number = _this.musicList.querySelectorAll('li').length + 1
            _this.curMusic.channel = _this.styleNode.innerText
            _this.curMusic.title = _this.titleNode.innerText
            _this.curMusic.author = _this.authorNode.innerText.slice(1)
            _this.curMusic.url = _this.audio.src
            _this.curMusic.picture = _this.imgNode.getAttribute('src')
            _this.curMusic.lrc = _this.lyc
            
            console.log(_this.curMusic)
            if (iconfont.classList.contains('icon-icon')) {  
                createHtmls(_this.curMusic.number, _this.curMusic.title, _this.curMusic.author)
                _this.dataList.push(_this.curMusic)
                _this.cueMusic = {}
            }
            if(iconfont.classList.contains('icon-love1')){
                _this.musicList.removeChild(_this.li)
                _this.dataList.pop()
            }
            console.log(_this.dataList)
        })

        //=======点击歌曲列表里某一首歌曲播放
            //==》点击列表中的歌曲播放该歌曲，从该歌曲的number标签里获取到序号
            //==》idex = e.taget.querySelector('.number').innerText-1
            //==》匹配到dataList中的该歌曲信息，将其渲染到播放页面
            //==》dataList[idx].channel,dataList[idx].picture...
            //==》
            /*
            _this.audio.src = dataList[idx].url
            _this.audio.play()
            _this.imgNode.setAttribute('src', dataList[idx].picture)
            _this.imgNode.style.width = 112 + 'px'
            _this.imgNode.style.height = 112 + 'px'
            _this.titleNode.innerText = dataList[idx].title
            _this.authorNode.innerText = dataList[idx].artist

            getLrc(dataList[idx].lrc)
            */
            //==》播放到下一曲后，爱心按钮恢复到原始状态
            //
            //
        

        this.musicList.addEventListener('click', function(e){
            
            //
            if(e.target.tagName.toLowerCase() === 'li'){

                iconIcon()
                iconPlay()

        
                let index = parseInt(e.target.querySelector('.number').innerText)-1
                // console.log(index)

                // //根据数组中该歌曲的信息，播放该歌曲
                // _this.audio.src = _this.dataList[index].url
                // _this.audio.play()
                // _this.styleNode.innerText = _this.dataList[index].channel
                // _this.imgNode.setAttribute('src', _this.dataList[index].picture)
                // _this.imgNode.style.width = 112 + 'px'
                // _this.imgNode.style.height = 112 + 'px'
                // _this.titleNode.innerText = _this.dataList[index].title
                // _this.authorNode.innerText = '-' + _this.dataList[index].author

                // if(_this.dataList[index].lrc === ''){
                //     let lrc_ = '歌词君偷懒了，快来人K他╰（‵□′）╯'
                //         _this.lrcContent.innerHTML = lrc_ 
                //         _this.lrcContent.style.opacity = 1
                // }else{
                //     getLrc(_this.dataList[index].lrc)
                // }
                


                
                
                    
                allRepeat(index)

                
                document.querySelectorAll('.point').forEach(function(item){
                    item.classList.remove('active')
                })
                e.target.querySelector('.point').classList.add('active')

            }

            //
        })

            //超过3首歌后，音乐列表可以滚动
        // this.musicList.addEventListener('sroll', function(){

        // })

        // this.musicLiDelete.addEventListener('click', function(e){
        //     //每个垃圾桶上都有一个垃圾桶，点击垃圾桶icon删除该指定歌曲
        //     if(e.target.classList.contains('delete')){

        //     }
        // })

        this.musicListButton.addEventListener('click', function(){
            _this.musicListContainer.classList.toggle('block')
        })

            //将dataList里的歌曲放到播放列表里
        function loadDataList(){
            for(let i = 0; i < _this.dataList.length; i++){
                createHtmls(_this.dataList[i].number, _this.dataList[i].title, _this.dataList[i].author)
            }          
        }

            //拼接歌曲的HTML
        function createHtmls(number, title, author) {   
            var _htmls = ''
                _htmls += '<div class="point"></div>'
                _htmls += '<div class="number">' + number + '</div>'
                _htmls += '<div class="front">' + title + '</div>'
                _htmls += '<div class="behind">' + author + '</div>'
                _htmls += '<div class="delete"><i class="iconfont icon-delete"></i></div>'
            let li = document.createElement('li')
            li.innerHTML = _htmls    
            _this.musicList.appendChild(li)
            _this.li = li
        }

            //计算每首歌的序号
        function computeNumber(){
            for(let i = 0; i < _this.number; i++){
                _this.musicList.querySelectorAll('li')[i].setAttribute('data-number', i+1)
            }     
        }

            //获取歌曲类别和歌曲
        function getAndLoad() {
            if (_this.isLoad_) return
            _this.isLoad_ = true
            ajax.init({
                url: 'https://bird.ioliu.cn/v1/?url=https://api.jirengu.com/fm/getChannels.php',
                dataType: 'json',
                type: 'get',
                success: function(ret) {
                    let i = Math.floor(Math.random() * (ret.channels.length))
                    let channel = ret.channels[i]
                    // _this.curMusic.channel = channel.name
                    _this.styleNode.innerText = channel.name
                    _this.styleNode.setAttribute('data-channel-id', channel.channel_id)
                    loadAudio()
                    _this.isLoad_ = false
                },
                error: function() {
                    let channel = '你不小心进入了奇怪的歌曲类别中'
                    
                    
                    let title = '这不是一首歌，手动下一首'
                    let lrc = '<li>巴拉巴拉能量不足啦::>_<::</li>'

                    // _this.curMusic.channel = channel
                    // _this.curMusic.title = title
                    // _this.curMusic.lrc = ''
                    _this.styleNode.innerText = channel
                    _this.titleNode.innerText = title
                    _this.lrcContent.innerHTML = lrc
                    _this.lrcContent.querySelector('li').style.opacity = 1
                    _this.isLoad_ = false
                }
            })
            
        }


        //获取歌曲的src，title，author, lrc
        function loadAudio() {
            if (_this.isLoad) return
            _this.isLoad = true
            var channelId = _this.styleNode.getAttribute('data-channel-id')
            ajax.init({
                url: 'https://bird.ioliu.cn/v1/?url=https://api.jirengu.com/fm/getSong.php',
                dataType: 'json',
                type: 'get',
                data: {
                    channel: channelId
                },
                success: function(ret) {

                    let title = ret.song[0].title || '无题'
                    let author = '-' + ret.song[0].artist || '无名艺术家'
                    let picture = ret.song[0].picture || '../imgs/Image-Wukong-001.png'   
                    let _url = ret.song[0].url
                    let lrc = ret.song[0].lrc
                    
                    
                    

                    //把lrc,url,pictutre
                    // _this.curMusic.title = title
                    // _this.curMusic.author = author.slice(1)
                    // _this.curMusic.picture = picture
                    // _this.curMusic.url = _url
                    // _this.curMusic.lrc = lrc
                    
                    _this.audio.src = _url
                    _this.audio.play()
                    _this.imgNode.setAttribute('src', picture)
                    _this.imgNode.style.width = 112 + 'px'
                    _this.imgNode.style.height = 112 + 'px'
                    _this.titleNode.innerText = title
                    _this.authorNode.innerText = author
                    if(!_url){
                        loadAudio()
                    }
                    if(lrc){
                        getLrc(lrc)
                    }else{
                        let lrc_ = '歌词君偷懒了，快来人K他╰（‵□′）╯'

                        // _this.curMusic.lrc = ''

                        _this.lrcContent.innerHTML = lrc_ 
                        _this.lrcContent.style.opacity = 1
                    }
                    _this.lyc = lrc
                    _this.isLoad = false
                },
                error: function() {
                    let title = '这不是一首歌，手动下一首'
                    let lrc = '<li>巴拉巴拉能量不足啦::>_<::</li>'

                    // _this.curMusic.title = title
                    // _this.curMusic.lrc = ''

                    _this.titleNode.innerText = title
                    _this.lrcContent.innerHTML = lrc
                    _this.lrcContent.querySelector('li').style.opacity = 1
                    _this.isLoad = false
                }
            })
            
            _this.volumeChangeNode.style.height = _this.audio.volume * 100 + '%'
        }
            //计算出进度条长度和时间
        function updateProgress() {
            if ( ! _this.audio.duration || ! _this.audio.currentTime) {
                 updateProgress()
            }
            var percent = (_this.audio.currentTime / _this.audio.duration) * 100 + '%'
            _this.lineNowNode.style.width = percent
            var minutes = parseInt(_this.audio.currentTime / 60)
            var seconds = parseInt(_this.audio.currentTime % 60) + ''
            var minutesAll = parseInt(_this.audio.duration / 60)
            var secondsAll = parseInt(_this.audio.duration % 60) + ''
                //秒数变2位
            seconds = seconds.length == 2 ? seconds : '0' + seconds
            secondsAll = secondsAll.length == 2 ? secondsAll : '0' + secondsAll
            _this.timeNode.innerText = '- ' + minutes + ':' + seconds + ' / ' + minutesAll + ':' + secondsAll
        }
            //获取歌词
        function getLrc(lrcUrl) {
            ajax.init({
                url: lrcUrl,
                type: 'get',
                dataType: 'text',
                success: function(ret) {
                    if (ret) {
                        var line = ret.split('\n')  //每行歌词数组['[00.01.23]咚锵咚锵齐不龙咚锵', ...]
                        var timeReg = /(\[\d{2}:\d{2}.\d{2}\])/g  //时间正则
                        var result = []
                        if(line != ''){
                            for (let i in line) {
                                let time = line[i].match(timeReg)  //时间数组['[00:01.23]', ...]
                                if(!time) continue;
                                var lrc = line[i].replace(timeReg, '')  //歌词'咚锵咚锵齐不龙咚锵'
                                for (let j in time ) {
                                    let t = time[j].slice(1, -1).split(':')  //把时间变成[00, 01.23]的格式，用于计算时间长度
                                    if(!lrc){
                                        lrc = 'Miaomiaomiao (ง •_•)ง  (❤ ω ❤)  ○( ＾皿＾)っ Hiahiahia…'
                                    }
                                    if(!t[0]) {
                                        curTime
                                    }
                                    let curTime = parseInt(t[0], 10) * 60 + parseFloat(t[1])  //计算时间长度
                                    result.push([curTime, lrc])
                                }                
                            }
                        }
                    }
                    //根据时间长度对result数组进行排序
                    result.sort(function(a, b){
                        return a[0]-b[0]
                    })
                    _this.lrcArr = result
                    renderLrc()
                },
                error: function(){
                    var lrc = '<li>歌词君在呼呼大睡ing(～﹃～)~zZ</li>'
                    // _this.curMusic.lrc = ''
                    _this.lrcContent.innerHTML = lrc 
                    _this.lrcContent.querySelector('li').style.opacity = 1 
                }
            })
        }

        function renderLrc(){
            if ( ! _this.lrcArr) {
                var lrc = '<li>歌词君在呼呼大睡ing(～﹃～)~zZ</li>'
                    // _this.curMusic.lrc = ''
                    _this.lrcContent.innerHTML = lrc 
                    _this.lrcContent.querySelector('li').style.opacity = 1  
            }
            let lrcList = ''
            for(var i =0; i<_this.lrcArr.length; i++){
                lrcList += '<li data-lrc="' + _this.lrcArr[i][0] + '">' + _this.lrcArr[i][1] + '</li>'
            }
            _this.lrcContent.innerHTML = lrcList 
            setInterval(showLrc, 500)
        }    
        
        function showLrc(){
            if ( _this.lrcArr.length === 1) {
                _this.lrcContent.style.top = 0
                _this.lrcContent.querySelector('li').style.opacity = 1  
            }
            for(let j=0; j<_this.lrcArr.length; j++){   
                let k = j+1
                k++
                if(k === _this.lrcArr.length || _this.lrcArr.length === 1) {
                    return k = j
                }
                let curT = _this.lrcArr[j][0]
                let nextT = _this.lrcArr[k][0]
                if( (_this.audio.currentTime > curT) && ( curT < nextT) ){
                    _this.lrcContent.style.top = -16 * j + 'px'
                    _this.lrcContent.querySelectorAll('li').forEach(function(li){
                        li.style.opacity = .4
                    })
                    _this.lrcContent.querySelectorAll('li')[j].style.opacity = 1  
                }
                if(j === (_this.lrcArr.length - 1) ){
                    _this.lrcContent.style.top = -32 * j + 'px'
                    _this.lrcContent.querySelectorAll('li').forEach(function(li){
                        li.style.opacity = .4
                    })
                    _this.lrcContent.querySelectorAll('li')[j].style.opacity = 1 
                }
            }
        }        
            
        function $(selector) {
            this.target.querySelector(selector)
        }
    }
    return {
        init: function(target) {
            target.forEach(function(item) {
                new Music(item)
            })
        }
    }
})()
module.exports = music