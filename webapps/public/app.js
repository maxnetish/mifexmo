var ko = require('knockout'),
    appVm = require('./app-vm');



// get up
require('./ko.components').register();
ko.applyBindings(appVm);
