var ko = require('knockout'),
    dataService = require('./data-service'),
    _ = require('lodash');

var onDataError = function (qXHR, textStatus, errorThrown) {
    console.log('Fail to get data. ' + textStatus);
};

var onClickGo = function () {
        showPreloader(true);
        dataService.getSearchData(searchTerm())
            .done(function (responseData) {
                resultInternal = _.cloneDeep(responseData);
                resultsDisplay(resultInternal.features);
            })
            .fail(onDataError)
            .always(function () {
                showPreloader(false);
            });
    },
    needNext = function () {
        if (resultInternal && resultsDisplay().length && resultInternal.properties.ResponseMetaData.SearchResponse.found > resultsDisplay().length) {
            showPreloader(true);
            dataService.getSearchData(searchTerm(), resultInternal.properties.ResponseMetaData.SearchRequest.results, resultInternal.properties.ResponseMetaData.SearchRequest.skip + resultInternal.properties.ResponseMetaData.SearchRequest.results)
                .done(function (responseData) {
                    resultInternal = _.cloneDeep(responseData);
                    ko.utils.arrayPushAll(resultsDisplay, resultInternal.features);
                })
                .fail(onDataError)
                .always(function () {
                    showPreloader(false);
                });
        }
    },
    showDetails = function(d){
        modalData({
            close: function(){
                modal(null);
            },
            data: d
        });
        modal('search-result-details');
    },
    searchTerm = ko.observable(),
    resultsDisplay = ko.observableArray(),
    showPreloader = ko.observable(false),
    modal = ko.observable(),
    modalData = ko.observable(),
    resultInternal;

module.exports = {
    onClickGo: onClickGo,
    searchTerm: searchTerm,
    resultsDisplay: resultsDisplay,
    needNext: needNext,
    showPreloader: showPreloader,
    modal: modal,
    modalData: modalData,
    showDetails: showDetails
};