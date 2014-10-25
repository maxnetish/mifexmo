angular.module('mifexmo.app-controller',
    [

    ])
    .constant('controllerEvents', {
        searchResultUpdated: 'searchResultUpdated',
        endlessWantNextChunk: 'wantNextChunk'
    })
    .factory('appControllerService',
    [
        'dataService',
        'controllerEvents',
        function (dataService, controllerEvents) {
            var maxResponseItems = 29;

            var updateSearchResults = function (scope) {
                var newRequest, toSkip;
                if (!scope.search || !scope.search.term) {
                    return;
                }
                newRequest = !scope.lastResponse && (scope.lastResponse.term !== scope.search.term);
                toSkip = newRequest ? 0 : scope.search.result.length;
                dataService.promiseSearchResults(scope.search.term, maxResponseItems, toSkip).then(function (response) {
                    scope.lastResponse = response.data;
                    if (newRequest) {
                        scope.search.result.length = 0;
                    }
                    _.each(scope.lastResponse.items, function (item) {
                        scope.search.result.push(item);
                    });
                    scope.$emit(controllerEvents.searchResultUpdated, {});
                    console.log(scope.search.result);
                }, function (err) {
                    console.log(err);
                });
            };

            return {
                maxResponseItems: maxResponseItems,
                updateSearchResults: updateSearchResults
            };
        }
    ])
    .controller('AppController',
    [
        '$scope',
        'appControllerService',
        'controllerEvents',
        function ($scope, appControllerService, controllerEvents) {
            $scope.foo = 'bar';

            $scope.lastResponse = {};
            $scope.search = {
                term: null,
                result: []
            };

            $scope.onNeedNext = function () {
                console.log('onNeedNext');
            };

            $scope.$watch('search.term', function () {
                appControllerService.updateSearchResults($scope);
            });
            $scope.$on(controllerEvents.endlessWantNextChunk, function () {
                appControllerService.updateSearchResults($scope);
            });
        }
    ]);
