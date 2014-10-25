angular.module('mifexmo.directives.search-form', [])
    .directive('searchForm',
    [
        function () {
            return{
                templateUrl: 'search-form-tpl',
                transclude: false,
                restrict: 'E',
                templateNamespace: 'html',
                scope: {
                    term: '='
                }
            };
        }
    ]);
