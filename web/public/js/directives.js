/**
 * Created by liqingjie on 16/3/24.
 */
JustLow
    .directive('repeatFinished', function() {
        return {
            link: function(scope, element, attr) {
                if(scope.$last === true) {
                    element.ready(function() {
                        scope.$eval(attr.repeatFinished);
                    });
                }
            }
        }
    });