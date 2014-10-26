angular.module('mifexmo.directives.image-gallery',
    [

    ])
    .controller('imgGalleryController',
    [
        '$scope',
        'dataService',
        function ($scope, dataService) {
            var imageIndex = 0;

            $scope.images = [];

            dataService.promiseImageUrls().then(function (response) {
                _.each(response.data, function (item) {
                    $scope.images.push(_.clone(item));
                });
            });

            $scope.enableNavigation = function () {
                return $scope.images.length > 1;
            };

            $scope.toNext = function () {
                var next = imageIndex + 1;
                if (next >= $scope.images.length) {
                    next = 0;
                }
                imageIndex = next;
            };

            $scope.toPrevious = function () {
                var prev = imageIndex - 1;
                if (prev < 0) {
                    prev = $scope.images.length - 1;
                }
                imageIndex = prev;
            };

            $scope.currentImageUrl = function () {
                if ($scope.images.length > 0 && imageIndex < $scope.images.length) {
                    return $scope.images[imageIndex].url;
                } else {
                    return null;
                }
            };
        }
    ])
    .directive('imgGallery',
    [
        function () {


            return {
                templateUrl: 'img-gallery-tpl',
                transclude: false,
                restrict: 'E',
                templateNamespace: 'html',
                scope: true,
                controller: 'imgGalleryController'
            };
        }
    ]);
