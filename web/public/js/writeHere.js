/**
 * 在指定容器内的任意位置插入文字
 * Created by liqingjie on 16/1/7.
 * 依赖jQuery
 */
!function($) {

    /**
     * defaultOption, 默认参数
     ************************************************************************************
     * showInputType: string, 调出输入框的方式，双击('dbclick')或者右击('rightclick')，默认双击
     * colors: string[], 字体颜色值，默认值见下面colors
     * fontSizes: number[], 字体大小，默认值见下面fontSizes
     */
    var defaultOption = {
        showInputType: 'dbclick',
        colors: ['#333333', '#66cffe', '#00d334', '#ff9404', '#fa636a', '#959595'],
        fontSizes: [12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32]
    };

    // 格式化wrtieHere容器
    var formatContainer = function(self) {
        self.css('position') == 'static' && self.css('position', 'relative');
        self.attr('data-writeHere-container');
    };

    // 撤销wrtieHere
    var destroy = function(self) {

    };

    $.fn.writeHere = function(option) {
        var _this = $(this);
        if(_this.closest('[data-writeHere-container]').length > 0) return false;

        formatContainer(_this);

        var _option = $.extend(true, {}, defaultOption, option);

    };

}(jQuery);