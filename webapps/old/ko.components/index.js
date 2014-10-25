var ko = require('knockout');

var register = function(){
    require('./search-form').register();
    require('./search-results').register();
    require('./search-result-block').register();
    require('./search-result-details').register();
    require('./img-gallery').register();
};

module.exports = {
  register: register
};
