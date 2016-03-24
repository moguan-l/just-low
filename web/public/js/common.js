/**
 * Created by liqingjie on 16/1/14.
 * JustLow项目中用到的定制工具
 */
var JL = {};
/**
 * 添加属性
 */
JL.pageConHInit = function(data) {
    var extraH = 150,
        bottomSpanTop = 0;
    var $pageContainer = $('.page-container');
    for(var i = 0, len = data.length; i < len; i++) {
        var _data = data[i],
            _top = Number(styleToObj(_data.style).top.slice(0, -2));
        bottomSpanTop = bottomSpanTop < _top ? _top : bottomSpanTop;
    }

    renderH();
    $(window).on('resize', renderH);

    function renderH() {
        var winH = $(window).height();
        if(bottomSpanTop + extraH < winH) {
            $pageContainer.css('height', winH + 'px');
            return false;
        }
        $pageContainer.css('height', bottomSpanTop + extraH + 'px');
    }
    //-样式对象化-
    function styleToObj(style) {
        var styleArray = style.split(';'),
            styleObj = {};
        for(var i = 0; i < styleArray.length; i++) {
            var styleOne = $.trim(styleArray[i]);
            if(styleOne) {
                var styleOneArr = styleOne.split(':');
                styleObj[styleOneArr[0]] = $.trim(styleOneArr[1]);
            }
        }
        return styleObj;
    }
};
