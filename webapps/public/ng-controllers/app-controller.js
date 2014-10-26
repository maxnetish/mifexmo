angular.module('mifexmo.app-controller',
    [

    ])
    .constant('controllerEvents', {
        searchResultUpdated: 'searchResultUpdated',
        endlessWantNextChunk: 'wantNextChunk',
        wantShowPreloader: 'wantShowPreloader',
        wantHidePreloader: 'wantHidePreloader'
    })
    .factory('appControllerService',
    [
        'dataService',
        'controllerEvents',
        function (dataService, controllerEvents) {
            var maxResponseItems = 29;

            var updateSearchResults = function (scope) {
                var newRequest, toSkip,
                    resultsLoaded, resultsFound, term,
                    previousTerm;

                term = scope.search.term;
                previousTerm = scope.lastResponse.term;
                newRequest = term !== previousTerm;

                resultsLoaded = scope.search.result.length || 0;
                resultsFound = scope.lastResponse.found || 0;
                toSkip = newRequest ? 0 : scope.search.result.length;

                if (!term) {
                    // пустая строка поиска
                    return;
                }

                if (!newRequest && resultsLoaded >= resultsFound) {
                    // все результаты уже у клиента
                    return;
                }

                if (newRequest) {
                    // если  новый поиск - очищаем
                    scope.search.result.length = 0;
                }

                scope.$emit(controllerEvents.wantShowPreloader, {});
                dataService.promiseSearchResults(scope.search.term, maxResponseItems, toSkip).then(function (response) {
                    scope.lastResponse = response.data;
                    _.each(scope.lastResponse.items, function (item) {
                        scope.search.result.push(item);
                    });
                    scope.$emit(controllerEvents.searchResultUpdated, {});
                }).catch(function(err){
                    console.log(err);
                })['finally'](function(){
                    scope.$emit(controllerEvents.wantHidePreloader, {});
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

            $scope.$watch('search.term', function () {
                appControllerService.updateSearchResults($scope);
            });
            $scope.$on(controllerEvents.endlessWantNextChunk, function () {
                appControllerService.updateSearchResults($scope);
            });
        }
    ]);
