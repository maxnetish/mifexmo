angular.module('mifexmo.services.data-service', [])
    .factory('dataService',
    [
        '$http',
        function ($http) {

            var transformResponseI = function(data){
                var transformed = [];

                _.each(data.data, function(item){
                    transformed.push({
                       url: item.images.thumbnail.url
                    });
                });

                return transformed;
            };

            var getPromiseImageUrl = function(){
                  return $http.jsonp('https://api.instagram.com/v1/media/popular', {
                       params: {
                           client_id: '4a85aa1d4e644ae5afd1673939dffd77',
                           count: 10,
                           callback: 'JSON_CALLBACK'
                       },
                      transformResponse: transformResponseI
                  });
            };

            var transformResponseY = function (data, headersGetter) {
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
                    transformResponse: transformResponseY
                });
            };

            return {
                promiseSearchResults: getPromiseSearchResults,
                promiseImageUrls: getPromiseImageUrl
            };
        }
    ]);
