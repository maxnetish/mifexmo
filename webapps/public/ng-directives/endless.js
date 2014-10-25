angular.module('mifexmo.directives.endless',
    [
        'mifexmo.app-controller'
    ])
    .directive('endlessList',
    [
        'controllerEvents',
        function (controllerEvents) {
            var nameSpace = '.mifexmo-search-results',
                eventName = 'wantNextChunk',
                $window = $(window);

            var isElementInViewport = function ($element) {
                var viewport = {
                        top: $window.scrollTop(),
                        left: $window.scrollLeft()
                    },
                    bounds;
                viewport.right = viewport.left + $window.width();
                viewport.bottom = viewport.top + $window.height();

                bounds = $element.offset();
                bounds.right = bounds.left + $element.outerWidth();
                bounds.bottom = bounds.top + $element.outerHeight();

                return viewport.top <= bounds.top
                    && viewport.right >= bounds.right
                    && viewport.left <= bounds.left
                    && viewport.bottom >= bounds.bottom;
            };

            var linkFn = function (scope, element, attrs, controller) {
                var elemToWatch = angular.element('<div>')
                    .addClass('need-next-if-in-viewport')
                    .appendTo(element);

                var checkForNeedNext = _.debounce(function () {
                    if (isElementInViewport(elemToWatch)) {
                        scope.$emit(controllerEvents.endlessWantNextChunk, {});
                    }
                }, 1000);

                $window.on('scroll' + nameSpace, checkForNeedNext);
                $window.on('resize' + nameSpace, checkForNeedNext);
                scope.$on(controllerEvents.searchResultUpdated, checkForNeedNext);
            };

            return {
                transclude: false,
                restrict: 'A',
                link: linkFn
            };
        }
    ]);
