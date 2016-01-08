/**
 * 在指定容器内的任意位置插入文字
 * Created by liqingjie on 16/1/7.
 * 依赖jQuery
 */
!function($, styleArray, fontColors, fontSizes, fontFamilies) {
    'use strict';
    /**
     * defaultOption, 默认参数
     ************************************************************************************
     * showInputType: string, 调出输入框的方式，双击('dbclick')或者右击('rightclick')，默认双击
     * backgroudColor: string, 输入框以及编辑菜单背景颜色
     * inputLength: number, 输入框允许输入的最大长度，默认15个字符
     * colors: string[], 字体颜色值，默认值见下面colors
     * fontSizes: number[], 字体大小，默认值见下面fontSizes
     */
    var defaultOption = {
            showInputType: 'dbclick',
            backgroudColor: 'rgba(75, 53, 76, 0.8)',
            inputLength: 30,
            colors: fontColors,
            fontSizes: fontSizes
        },
        //-允许的参数类型-
        optionType = ['string', 'object', 'undefined'],
        //-writeHere容器标记属性-
        containerAttr = 'data-writeHere-container';

    //-私有函数声明，获取对象的原始类型-
    var otype = function(o) {
        if(o instanceof $) {
            return 'jquery';
        }
        return Object.prototype.toString.call(o).slice(8, -1).toLowerCase();
    };

    //-格式化writeHere容器-
    var formatContainer = function(self) {
        self.css('position') === 'static' && self.css('position', 'relative');
        self.attr(containerAttr, true);
    };

    //-添加插件所需的样式-
    var addStyle = function() {
        if($('#writeHere_style').length === 0) {
            var $style = $('<style/>')
                .attr('id', 'writeHere_style')
                .html(styleArray.join('\n'));
            $('head').append($style);
        }
    };

    //-根据参数组织编辑菜单-
    var getEditTool = function(option) {
        return [
            '<ul class="write-here-tool">',
                '<li>',
                    '<a href="javascript:void(0);">字体</a>',
                '</li>',
                '<li>',
                    '<a href="javascript:void(0);">大小</a>',
                '</li>',
                '<li>',
                    '<a href="javascript:void(0);">颜色</a>',
                '</li>',
                '<li>',
                    '<a href="javascript:void(0);">粗体</a>',
                '</li>',
                '<li>',
                    '<a href="javascript:void(0);">倾斜</a>',
                '</li>',
            '</ul>'
        ].join('\n');
    };

    //-初始化插件-
    var init = function(self, option) {
        var _option = $.extend(true, {}, defaultOption, option);
        formatContainer(self);

    };

    //-撤销wrtieHere-
    var destroy = function(self) {
        if(!self.attr(containerAttr)) return false;
    };

    $.fn.writeHere = function(option) {
        if(optionType.indexOf(otype(option)) === -1)
            throw new Error('parameter is error');

        return this.each(function() {
            var _this = $(this);
            if(_this.closest('[' + containerAttr + ']').length > 0) return false;

            if(otype(option) === 'string')
                option === 'destroy' && destroy(_this);
            else
                init(_this, option);
        });
    };

}(function() {
        if(!jQuery) throw new Error('Plugin needs jQuery');
        return jQuery;
    }(),
    [
        '.write-here { position: absolute; z-index: 99; display: inline-block; background: transparent; }',
        '.write-here-input, .write-here-tool, .write-here-tool .select-menu { -webkit-box-shadow: 0 0 5px #000; -moz-box-shadow: 0 0 5px #000; box-shadow: 0 0 5px #000; }',
        '.write-here-input { padding: 8px; width: 240px; border: none; outline: none; }',
        '.write-here-tool { position: absolute; top: -32px; list-style: none; margin: 0; padding: 4px 6px; }',
        '.write-here-tool:after { content: ""; position: absolute; bottom: -10px; left: 0; width: 0; height: 0; border: 5px solid transparent; }',
        '.write-here-tool li { position: relative; float: left; }',
        '.write-here-tool li.drop-down:after { content: ""; position: absolute; bottom: -10px; left: 12px; width: 0; height: 0; border: 5px solid transparent; }',
        '.write-here-tool li > a { padding: 0 5px; font-size: 12px; color: #fff; text-decoration: none; vertical-align: middle; outline: none; }',
        '.write-here-tool .select-menu { position: absolute; top: 26px; left: -8px; overflow-y: auto; padding: 3px 0; width: 50px; height: 70px; }',
        '.write-here-tool .select-menu > a { display: block; box-sizing: border-box; padding: 0 5px; width: 100%; font-size: 10px; color: #fff; text-decoration: none; vertical-align: middle; outline: none; }',
        '.write-here-tool .select-menu > a:hover { background-color: #4B354C; }',
        '.write-here-tool li > a.active, .write-here-tool li > a:focus, .write-here-tool .select-menu > a.active, .write-here-tool .select-menu > a:focus { color: #e45164; text-decoration: none; }'
    ],
    ['#333333', '#66cffe', '#00d334', '#ff9404', '#fa636a', '#959595'],
    [12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32],
    {
        '宋体': 'SimSun',
        '黑体': 'SimHei',
        '微软雅黑': 'Microsoft YaHei',
        '微软正黑体': 'Microsoft JhengHei',
        '新宋体': 'NSimSun',
        '新细明体': 'PMingLiU',
        '细明体': 'MingLiU',
        '标楷体': 'DFKai-SB',
        '仿宋': 'FangSong',
        '楷体': 'KaiTi'
    }
);