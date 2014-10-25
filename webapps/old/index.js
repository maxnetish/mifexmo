var $ = require('jquery');

var imageUrls = [
    '/images/1.jpg',
    '/images/2.jpg',
    '/images/3.jpg',
    '/images/4.jpg',
    '/images/5.jpg',
    '/images/6.jpg',
    '/images/7.jpg'
];

var getSearchData = function (text, results, skip) {
    var reqParams = {
        text: text,
        results: results || 20,
        skip: skip || 0,
        lang: 'ru-RU',
        origin: 'maps-pager'
    };

    return $.ajax({
        data: reqParams,
        dataType: 'jsonp',
        url: 'http://maps.yandex.ru/services/search/1.x/search.json',
        type: 'GET'
    });
};

var getImageUrls = function () {
    return imageUrls;
};

var register = function (angular) {
    angular.module('mifexmo.data-service', [])
        .factory('dataService', require('./../public/data-service/data-service'));
};

module.exports = {
    register: register
};
