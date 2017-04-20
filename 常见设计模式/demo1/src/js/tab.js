define(['jquery'], function($){
    function Tab(target) {
        this.target = target;
        this.init();
        this.bind();
    }
        //获取标题和内容的节点
    Tab.prototype.init = function() {
            this.tabList = this.target.find('.tab-head>li')
            this.tabText = this.target.find('.tab-text>li')
        }
        //捆绑事件
    Tab.prototype.bind = function() {
        var _this = this
        this.tabList.each(function(index, tabLi) {
            tabLi.onclick = function(e) {
                //标题切换
                var _target = e.target;
                var index = Array.prototype.indexOf.call(_this.tabList, _target);
                _this.tabList.each(function(index, li) {
                    $(li).removeClass('active');
                });
                $(this).addClass('active');
                //对应内容切换
                _this.tabText.each(function(index, li) {
                    $(li).removeClass('active')
                });
                _this.tabText.eq(index).addClass('active')
            };
        });
    };
    return {
        start: function(target){
            target.each(function(index, item){
                new Tab($(item))
            })
        }
    }
})
    

