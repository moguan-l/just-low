/**
 * Created by liqingjie on 16/1/26.
 */
JustLow
    .filter('decodeURI', function() {
        return function(input) {
            return decodeURI(input);
        };
    });