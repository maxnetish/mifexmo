var componentName = 'img-gallery',
    ko = require('knockout'),
    dataService = require('../data-service');

var createViewModel = function (params, componentInfo) {
    var imgUrls = dataService.getImageUrls();
    var currentIndObservable = ko.observable(0);

    var previousAvailable = ko.computed({
        read: function () {
            return  currentIndObservable() > 0;
        }
    });
    var nextAvailable = ko.computed({
        read: function () {
            return currentIndObservable() < (imgUrls.length - 1);
        }
    });
    var previous = function () {
        if (previousAvailable()) {
            currentIndObservable(currentIndObservable() - 1);
        }
    };
    var next = function () {
        if (nextAvailable()) {
            currentIndObservable(currentIndObservable() + 1);
        }
    };
    var currentImgUrl = ko.computed({
        read: function () {
            var currentInd = currentIndObservable();
            if (currentInd >= 0 && currentInd < imgUrls.length) {
                return imgUrls[currentInd];
            }
            return null;
        }
    });

    return {
        previousAvailable: previousAvailable,
        nextAvailable: nextAvailable,
        previous: previous,
        next: next,
        currentImgUrl: currentImgUrl
    };
};

var register = function () {
    ko.components.register(componentName, {
        viewModel: {
            createViewModel: createViewModel
        },
        template: {
            element: 'img-gallery-tpl'
        }
    });
};

module.exports = {
    register: register
};