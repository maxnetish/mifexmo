var componentName = 'search-result-details',
    ko = require('knockout'),
    $ = require('jquery');

var createViewModel = function (params, componentInfo) {
    var data = params.data,
        close = params.close;


    return {
        data: data,
        close: close
    };
};

var register = function () {
    ko.components.register(componentName, {
        viewModel: {
            createViewModel: createViewModel
        },
        template: {
            element: 'search-result-details-tpl'
        }
    });
};

module.exports = {
    register: register
};

