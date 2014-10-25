var componentName = 'search-results',
    nameSpace = '.mifexmo-search-results',
    ko = require('knockout'),
    $ = require('jquery'),
    _ = require('lodash');

var $endlessElement,
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

var createViewModel = function (params, componentInfo) {
    var data = params.data;
    var onNext = params.needNext;
    var showPreloader = params.showPreloader;
    var showDetails = params.showDetails || function(){};

    var checkForNeedNext = _.debounce(function () {
        if (isElementInViewport($endlessElement)) {
            if (_.isFunction(onNext)) {
                onNext();
            }
        }
    }, 1000);

    $endlessElement = $('.need-next-if-in-viewport', componentInfo.element);
    $window.on('scroll' + nameSpace, checkForNeedNext);
    $window.on('resize' + nameSpace, checkForNeedNext);
    data.subscribe(checkForNeedNext);

    return {
        data: data,
        showPreloader: showPreloader,
        showDetails: showDetails
    }
};

var register = function () {
    ko.components.register(componentName, {
        viewModel: {
            createViewModel: createViewModel
        },
        template: {
            element: 'search-results-tpl'
        }
    });
};

module.exports = {
    register: register
};
