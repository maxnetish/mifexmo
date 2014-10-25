var componentName = 'search-form',
    ko = require('knockout');

var createViewModel = function (params, componentInfo) {
    var searchTerm = params.searchTerm,
        onSubmit = params.onSubmit;


    return {
        searchTerm: searchTerm,
        onSubmit: onSubmit
    }
};

var register = function () {
    ko.components.register(componentName, {
        viewModel: {
            createViewModel: createViewModel
        },
        template: {
            element: 'search-form-tpl'
        }
    });
};

module.exports = {
    register: register
};