angular.module('mifexmo.directives.search-result', [])
    .directive('searchResult',
    [
        function () {
            return {
                templateUrl: 'search-result-tpl',
                transclude: false,
                restrict: 'E',
                templateNamespace: 'html',
                scope: {
                    items: '='
                }
            };
        }
    ]);