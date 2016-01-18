/**
 * 在指定容器内的任意位置插入文字
 * Created by liqingjie on 16/1/7.
 * 依赖jQuery
 */
;!function($, cssArray, fontColors, fontSizes, fontFamilies) {
    'use strict';
    /**
     * defaultOption, 默认参数
     *****************************************************************************************************
     * showInputType: string, 调出输入框的方式，双击('dblclick')或者右击('rightclick')，默认双击
     * backgroudColor: string, 输入框以及编辑菜单背景颜色
     * needBg: boolean, 回车之后的文字是否需要背景，默认不需要
     * menuBgColor: string, 菜单栏背景颜色，默认menuBgColor
     * inputLength: number, 输入框允许输入的最大长度，默认15个字符
     * fontColors: string[], 字体颜色值，默认值见下面fontColors
     * fontSizes: number[], 字体大小，默认值见下面fontSizes
     * fontFamilies: string[], 字体，默认值见下面fontFamilies
     * editable: boolean, 已经写好的字是否可编辑，默认不能
     * inputCallback: function, 输入结束回车之后的回调函数，默认为空，回调函数返回的参数为输入框内容及文字样式（字符串）
     */
    var defaultOption = {
            showInputType: 'dblclick',
            backgroudColor: 'rgba(75, 53, 76, 0.8)',
            needBg: false,
            menuBgColor: 'menuBgColor',
            inputLength: 30,
            fontColors: fontColors,
            fontSizes: fontSizes,
            fontFamilies: fontFamilies,
            editable: false,
            inputCallback: null
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
        self.css('position') === 'static' && self.css({'position': 'relative', 'overflow-x': 'auto'});
        self.attr(containerAttr, true);
    };

    //-添加插件所需的样式-
    var addStyle = function(menuBgColor) {
        $('#writeHere_style').remove();
        var cssString = cssArray.join('\n').replace(/menuBgColor/g, menuBgColor),
            $style = $('<style/>')
            .attr('id', 'writeHere_style')
            .html(cssString);
        $('head').append($style);
    };

    //-根据参数组织编辑菜单-
    var getEditTool = function(option) {
        return [
            '<ul class="write-here-tool">',
                '<li>',
                    '<a class="writeHere-tool-drop-btn" href="javascript:void(0);">字体</a>',
                    function() {
                        var fontFamiliesHtml = '<nav class="select-menu">',
                            _fontFamilies = option.fontFamilies.length > 0 ? option.fontFamilies : fontFamilies;
                        for(var i = 0; i < _fontFamilies.length; i++) {
                            fontFamiliesHtml += '<a href="javascript:void(0);" class="fontFamily" data-fontFamily="' + _fontFamilies[i] + '">' + _fontFamilies[i] + '</a>';
                        }
                        fontFamiliesHtml += '</nav>';
                        return fontFamiliesHtml;
                    }(),
                '</li>',
                '<li>',
                    '<a class="writeHere-tool-drop-btn" href="javascript:void(0);">大小</a>',
                    function() {
                        var fontSizesHtml = '<nav class="select-menu">',
                            _fontSizes = option.fontSizes.length > 0 ? option.fontSizes : fontSizes;
                        for(var i = 0; i < _fontSizes.length; i++) {
                            fontSizesHtml += '<a href="javascript:void(0);" class="fontSize" data-fontSize="' + _fontSizes[i] + '">' + _fontSizes[i] + 'px</a>';
                        }
                        fontSizesHtml += '</nav>';
                        return fontSizesHtml;
                    }(),
                '</li>',
                '<li>',
                    '<a class="writeHere-tool-drop-btn" href="javascript:void(0);">颜色</a>',
                    function() {
                        var fontColorsHtml = '<nav class="color-select-menu">',
                            _fontColors = option.fontColors.length > 0 ? option.fontColors : fontColors;
                        for(var i = 0; i < _fontColors.length; i++) {
                            fontColorsHtml += '<a href="javascript:void(0);" class="fontColor" data-fontColor="' + _fontColors[i] + '" style="background-color: ' + _fontColors[i] + '"></a>';
                        }
                        fontColorsHtml += '</nav>';
                        return fontColorsHtml;
                    }(),
                '</li>',
                '<li>',
                    '<a class="writeHere-tool-btn bold" href="javascript:void(0);">粗体</a>',
                '</li>',
                '<li>',
                    '<a class="writeHere-tool-btn italic" href="javascript:void(0);">倾斜</a>',
                '</li>',
            '</ul>'
        ].join('\n');
    };

    //-初始化插件-
    var init = function(self, option) {
        var _option = $.extend(true, {}, defaultOption, option);

        addStyle(_option.menuBgColor);
        formatContainer(self);

        var containerLeft = self.offset().left,
            containerTop = self.offset().top,
            $writeHere = $([
                '<div class="write-here">',
                    getEditTool(_option),
                    '<input class="write-here-input" style="background: ' + _option.backgroudColor + '" type="text" maxlength="' + _option.inputLength + '"/>',
                    '<span class="write-here-cancel">&times;</span>',
                    '<span class="write-here-ok">&crarr;</span>',
                '</div>'
            ].join('\n')),
            showInput = function(e) {
                if($(e.target).parents('.write-here').length > 0) return false;
                var left = e.pageX - containerLeft - 8,
                    top = e.pageY - containerTop - 15;
                $writeHere.css({
                    top: top,
                    left: left
                });
                $writeHere.attr('data-top', top);
                $writeHere.attr('data-left', left);

                if(self.children('.write-here').length === 0) {
                    self.prepend($writeHere);
                } else {
                    $writeHere.show();
                }
                $writeHere.children('input').val('').focus();
            },
            endInput = function() {
                var _this = $(this),
                    writeHere = _this.parent(),
                    input = writeHere.children('input'),
                    value = input.val();
                if(!value) {
                    writeHere.hide();
                    return false;
                }

                var top = writeHere.attr('data-top'),
                    left = writeHere.attr('data-left'),
                    style = input.attr('style');
                var $span = $('<span class="writeHere-span"/>').text(value).attr('style', style);
                $span.css({
                    position: 'absolute',
                    top: top + 'px',
                    left: left + 'px',
                    padding: '8px'
                });
                !_option.needBg && $span.css('background', 'transparent');
                writeHere.hide();
                self.append($span);
                $.isFunction(_option.inputCallback) && _option.inputCallback(value, $span.attr('style'));
            };

        //-绑定关闭事件-
        $writeHere.children('.write-here-cancel').click(function() {
            var writeHere = $(this).parent();
            writeHere.hide();
        });
        //-绑定确定事件-
        $writeHere.children('.write-here-ok').click(endInput);
        //-绑定input聚焦事件-
        $writeHere.children('input').on('focus', function() {
            $(this).prev().children().removeClass('drop-down');
        });
        //-绑定input回车事件-
        $writeHere.children('input').on('keydown', function(e) {
            if(e.keyCode === 13 || e.keyCode === 108) {
                endInput.call(this);
            }
        });
        //-绑定下拉菜单事件-
        $writeHere.find('.writeHere-tool-drop-btn').click(function() {
            var _parent = $(this).parent();
            if(_parent.hasClass('drop-down')) {
                _parent.removeClass('drop-down');
            } else {
                _parent.siblings().removeClass('drop-down');
                _parent.addClass('drop-down');
            }
        });
        //-绑定选择字体，大小，颜色事件-
        $writeHere.find('nav > a').click(function() {
            var _this = $(this);
            if(_this.hasClass('active')) return false;

            _this.siblings().removeClass('active');
            _this.addClass('active');

            var input = _this.closest('.write-here').children('input');
            switch(true) {
                case _this.hasClass('fontFamily'):
                    var fontFamily = _this.attr('data-fontFamily');
                    _this.parent().prev().css('font-family', fontFamily);
                    input.css('font-family', fontFamily);
                    break;
                case _this.hasClass('fontSize'):
                    var fontSize = _this.attr('data-fontSize') + 'px';
                    _this.parent().prev().text(fontSize);
                    input.css('font-size', fontSize);
                    break;
                case _this.hasClass('fontColor'):
                    var fontColor = _this.attr('data-fontColor');
                    _this.parent().prev().css('color', fontColor);
                    input.css('color', fontColor);
                    break;
                default: break;
            }
            _this.closest('li').removeClass('drop-down');
        });
        //-绑定粗体，倾斜事件-
        $writeHere.find('.writeHere-tool-btn').click(function() {
            var _this = $(this),
                input = _this.closest('.write-here').children('input');
            _this.toggleClass('active');
            var active = _this.hasClass('active');

            if(_this.hasClass('bold')) {
                active ? input.css('font-weight', 'bold') :
                    input.css('font-weight', 'normal');
            } else {
                active ? input.css('font-style', 'italic') :
                    input.css('font-style', 'normal');
            }
        });

        _option.showInputType === 'dblclick' ? self.on('dblclick', showInput) : self.rightclick(showInput);
    };

    //-撤销wrtieHere-
    var destroy = function(self) {
        if(!self.attr(containerAttr)) return false;
    };

    //-添加右击事件绑定-
    $.fn.rightclick = function(callback) {
        if($.isFunction(callback)) {
            $(document).on('contextmenu', function() {
                return false;
            });
            $.isFunction(callback) && $(this).on('mousedown', function(e) {
                if(3 === e.which) {
                    callback();
                }
            });
        } else if(callback === 'off') {
            $(document).off('contextmenu');
            $(this).off('mousedown');
        }
    };

    //-插件入口-
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
        if(typeof jQuery === 'undefined') throw new Error('Plugin needs jQuery');
        return jQuery;
    }(),
    [
        '.write-here { position: absolute; z-index: 1; display: inline-block; background: transparent; }',
        '.write-here-input { padding: 8px 24px 8px 8px; width: 240px; border: none; outline: none; }',
        '.write-here-cancel, .write-here-ok { position: absolute; z-index: 1; display: inline-block; width: 16px; height: 16px; font-size: 16px; color: #fff; line-height: 18px; text-align: center; background-color: menuBgColor; cursor: pointer; }',
        '.write-here-cancel { top: 0; right: 0; }',
        '.write-here-ok { bottom: 0; right: 0; font-size: 12px; }',
        '.write-here-tool { position: absolute; top: -32px; list-style: none; margin: 0; padding: 2px 6px 4px; background-color: menuBgColor; }',
        '.write-here-tool:after { content: ""; position: absolute; bottom: -10px; left: 0; width: 0; height: 0; border: 5px solid transparent; border-top-color: menuBgColor; }',
        '.write-here-tool li { position: relative; float: left; }',
        '.write-here-tool li.drop-down:after { content: ""; position: absolute; bottom: -10px; left: 12px; width: 0; height: 0; border: 5px solid transparent; border-bottom-color: menuBgColor; }',
        '.write-here-tool li > a { padding: 0 5px; font-size: 12px; color: #fff; text-decoration: none; vertical-align: middle; outline: none; }',
        '.write-here-tool .select-menu, .write-here-tool .color-select-menu { position: absolute; top: 26px; left: -13px; display: none; overflow-y: auto; padding: 3px 0; width: 60px; height: 70px; background-color: menuBgColor; }',
        '.write-here-tool li.drop-down > .select-menu, .write-here-tool li.drop-down > .color-select-menu { display: block; }',
        '.write-here-tool .select-menu > a, .write-here-tool .color-select-menu > a { display: block; box-sizing: border-box; overflow: hidden; padding: 1px 5px; width: 100%; font-size: 10px; color: #fff; text-decoration: none; vertical-align: middle; text-overflow: ellipsis; white-space: nowrap; outline: none; cursor: pointer; }',
        '.write-here-tool .color-select-menu > a { height: 10px; }',
        '.write-here-tool li.drop-down > a, .write-here-tool .select-menu > a.active, .writeHere-tool-btn.active { color: #e45164; text-decoration: none; }'
    ],
    ['#333333', '#66cffe', '#00d334', '#ff9404', '#fa636a', '#959595'],
    [12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32],
    ['微软雅黑']
);