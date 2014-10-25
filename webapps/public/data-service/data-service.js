angular.module('mifexmo.data-service', [])
    .factory('dataService',
    [
        '$http',
        function ($http) {
            var transformResponse = function (data, headersGetter) {
                var transformed;

                if (data && data.properties && data.properties.ResponseMetaData && data.properties.ResponseMetaData.SearchRequest) {
                    transformed = {
                        term: data.properties.ResponseMetaData.SearchRequest.request,
                        found: data.properties.ResponseMetaData.SearchResponse.found,
                        skip: data.properties.ResponseMetaData.SearchRequest.skip,
                        max: data.properties.ResponseMetaData.SearchRequest.results,
                        items: data.features
                    };
                }
                return transformed;
            };

            var getPromiseSearchResults = function (text, max, skip) {
                var reqParams = {
                    text: text,
                    results: max || 20,
                    skip: skip || 0,
                    lang: 'ru-RU',
                    origin: 'maps-pager',
                    callback: 'JSON_CALLBACK'
                };

                return $http.jsonp('http://maps.yandex.ru/services/search/1.x/search.json', {
                    params: reqParams,
                    transformResponse: transformResponse
                });
            };

            return {
                promiseSearchResults: getPromiseSearchResults
            };
        }
    ]);
