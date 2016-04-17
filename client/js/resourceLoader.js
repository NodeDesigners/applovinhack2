function ResourceLoader(baseurl) {
  this.BASEURL = baseurl;
}

ResourceLoader.prototype.loadResource = function(resource, options, callback) {
  var self = this;
  evaluateScripts([resource], function(success) {
    if(success) {
      var resource = Template.call(self, options);
      callback.call(self, resource);
    } else {
      var title = "Resource Loader Error",
          description = `Error loading resource '${resource}'. \n\n Try again later.`,
          alert = createAlert(title, description);
      navigationDocument.presentModal(alert);
    }
  });
}

ResourceLoader.prototype.getGifs = function (searchTerm, callback) {
  var url = 'http://api.riffsy.com/v1/';
  if (searchTerm === null) {
    url += 'trending?';
  } else {
    url += 'search?tag=' + searchTerm;
  }
  var getGifsXHR = new XMLHttpRequest();
  getGifsXHR.responseType = 'json';
  getGifsXHR.onreadystatechange = function () {
    if (getGifsXHR.readyState === 4) {
      callback(getGifsXHR.response);
    }
  }
  getGifsXHR.open('GET', url, true);
  getGifsXHR.send();
  return getGifsXHR;
}

ResourceLoader.prototype.returnDigits = function (placeholder, callback) {
  placeholder = null;
  var url = 'https://cdn.digits.com/1/sdk.js';

  var getDigits = new XMLHttpRequest();
  getDigits.responseType = '';
  getDigits.onreadystatechange = function () {
    callback(getDigits.response);
  }
  getDigits.open('GET', url, true);
  getDigits.send();
  return getDigits;
}