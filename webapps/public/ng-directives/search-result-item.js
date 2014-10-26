angular.module('mifexmo.directives.search-result-item',
    [

    ])
    .directive('searchResultItem',
    [
        function () {
            return {
                templateUrl: 'search-result-item-tpl',
                transclude: false,
                restrict: 'E',
                templateNamespace: 'html',
                scope: {
                    item: '=',
                    number: '@'
                },
                controller: 'searchResultItemController'
            };
        }
    ])
    .factory('searchResultItemService', [

        function () {
            var maxFeatureNumber = 7,
                maxCategNumber = 9;

            var mapSeachResult = function (row) {
                var i, iLen, oneFeature, oneCateg, j, jLen,
                    name, address, url, tStr,
                    categories = [],
                    features = [],
                    hours;

                row.properties = row.properties || {};
                row.properties.CompanyMetaData = row.properties.CompanyMetaData || {};
                row.properties.CompanyMetaData.Features = row.properties.CompanyMetaData.Features || [];
                row.properties.CompanyMetaData.Categories = row.properties.CompanyMetaData.Categories || [];

                name = row.properties.name;
                address = row.properties.description;
                url = row.properties.CompanyMetaData.url;
                hours = row.properties.CompanyMetaData.Hours ? row.properties.CompanyMetaData.Hours.text : null;

                for (i = 0, iLen = Math.min(row.properties.CompanyMetaData.Categories.length, maxCategNumber); i < iLen; i++) {
                    oneCateg = row.properties.CompanyMetaData.Categories[i];
                    categories.push(oneCateg.name);
                }

                for (i = 0, iLen = Math.min(row.properties.CompanyMetaData.Features.length, maxFeatureNumber); i < iLen; i++) {
                    oneFeature = row.properties.CompanyMetaData.Features[i];
                    if (oneFeature.type) {
                        switch (oneFeature.type) {
                            case 'bool':
                                if (oneFeature.value) {
                                    features.push(oneFeature.name);
                                }
                                break;
                            case 'enum':
                                if (oneFeature.values.length) {
                                    tStr = '';
                                    if (oneFeature.name) {
                                        tStr = oneFeature.name + ': ';
                                    }
                                    for (j = 0, jLen = oneFeature.values.length; j < jLen; j++) {
                                        tStr = tStr + oneFeature.values[j];
                                        if (j < jLen - 1) {
                                            tStr = tStr + ', '
                                        }
                                    }
                                    features.push(tStr);
                                }
                                break;
                        }
                    }
                }

                return {
                    name: name,
                    address: address,
                    url: url,
                    categories: categories,
                    features: features,
                    hours: hours                }
            };


            return {
                mapSearchResult: mapSeachResult
            };
        }
    ])
    .controller('searchResultItemController',
    [
        '$scope',
        'searchResultItemService',
        'resultSearchItemModal',
        function ($scope, searchResultItemService, resultSearchItemModal) {
            $scope.data = searchResultItemService.mapSearchResult($scope.item);
            $scope.showDetails = function (item) {
                resultSearchItemModal.show(item);
            };
        }
    ]);
