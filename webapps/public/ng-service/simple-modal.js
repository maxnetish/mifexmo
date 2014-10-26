angular.module('mifexmo.services.simple-modal', [])
    .factory('simpleModal',
    [
        '$compile',
        '$rootScope',
        '$controller',
        '$q',
        '$http',
        '$templateCache',
        function ($compile, $rootScope, $controller, $q, $http, $templateCache) {

            return function modalFactory(config) {

                if ((+!!config.template) + (+!!config.templateUrl) !== 1) {
                    throw new Error('Expected modal to have exacly one of either `template` or `templateUrl`');
                }

                var template = config.template,
                    controller = config.controller || angular.noop,
                    controllerAs = config.controllerAs,
                    container = angular.element(config.container || document.body),
                    element = null,
                    html;

                var attach = function (html, locals) {
                    var scope = $rootScope.$new();
                    element = angular.element(html);
                    container.prepend(element);

                    _.extend(scope, locals);

                    var ctrl = $controller(controller, { $scope: scope });
                    if (controllerAs) {
                        scope[controllerAs] = ctrl;
                    }
                    $compile(element)(scope);
                };

                var activate = function (locals) {
                    html.then(function (html) {
                        if (!element) {
                            attach(html, locals);
                        }
                    });
                };

                var deactivate = function () {
                    if (element) {
                        element.remove();
                        element = null;
                    }
                };

                // prepare template
                if (config.template) {
                    var deferred = $q.defer();
                    deferred.resolve(config.template);
                    html = deferred.promise;
                } else {
                    html = $http.get(config.templateUrl, {
                        cache: $templateCache
                    }).then(function (response) {
                        return response.data;
                    });
                }

                return {
                    activate: activate,
                    deactivate: deactivate
                };
            };
        }
    ])
    .controller('resultSearchItemModalController',
    [
        '$scope',
        function ($scope) {
            $scope.close = function () {
                $scope.modal.deactivate();
            };
        }
    ])
    .factory('resultSearchItemModal', [
        'simpleModal',
        function (simpleModal) {
            var modal = simpleModal({
                templateUrl: 'search-result-item-modal-tpl',
                controller: 'resultSearchItemModalController'
            });

            var show = function (item) {
                modal.activate({
                    data: item,
                    modal: modal
                });
            };

            return {
                show: show
            };
        }
    ]);