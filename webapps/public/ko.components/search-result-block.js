var componentName = 'search-result-block',
    ko = require('knockout');

var maxFeatureNumber = 4;

var createViewModel = function (params, componentInfo) {
    var data = params.data || {},
        number = params.number || null,
        onShowDetails = params.showDetails,
        i, iLen, oneFeature, j, jLen,
        name, address, url, tStr,
        categories = [],
        features = [],
        hours, nameUrl;

    data.properties = data.properties || {};
    data.properties.CompanyMetaData = data.properties.CompanyMetaData || {};
    data.properties.CompanyMetaData.Features = data.properties.CompanyMetaData.Features || [];
    name = data.properties.name;
    address = data.properties.description;
    url = data.properties.CompanyMetaData.url;
    categories = data.properties.CompanyMetaData.Categories || [];
    hours = data.properties.CompanyMetaData.Hours ? data.properties.CompanyMetaData.Hours.text : null;

    for (i = 0, iLen = Math.min(data.properties.CompanyMetaData.Features.length, maxFeatureNumber); i < iLen; i++) {
        oneFeature = data.properties.CompanyMetaData.Features[i];
        if(oneFeature.type) {
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
        number: number,
        url: url,
        categories: categories,
        features: features,
        hours: hours,
        showDetails: onShowDetails
    }
};

var register = function () {
    ko.components.register(componentName, {
        viewModel: {
            createViewModel: createViewModel
        },
        template: {
            element: 'search-result-block-tpl'
        }
    });
};

module.exports = {
    register: register
};
