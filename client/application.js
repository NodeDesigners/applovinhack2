var Presenter = {
  load: function (event) {
    if (event.target.getAttribute('class') && event.target.getAttribute('class') === 'donePosting') {
      navigationDocument.popDocument();
    } else {
      var loadingDoc;
      var self = this
      var gifObj = {};
      gifObj.url = event.target.getAttribute('url');
      gifObj.preview = event.target.getAttribute('preview');
      gifObj.tags = event.target.getAttribute('tags');
      gifObj.id = event.target.getAttribute('id');

      resourceLoader.loadResource(
        `${resourceLoader.BASEURL}templates/loading.xml.js`,
        'Loading...',
        function (resource) {
          loadingDoc = self.makeDocument(resource);
          loadingDoc.addEventListener("select", self.load.bind(self));
          self.pushDocument(loadingDoc);
        }
      );

      if (event.target.getAttribute('class') && event.target.getAttribute('class') === 'tweet-button') {
        console.log('i am doing stuff!')
        resourceLoader.postTweet(JSON.stringify({ message: event.target.getAttribute('gifToTweet')}), function (response) {
          var tweetAlert = self.createAlert('Tweet Posted!', 'Now go browse more gifs');
          tweetAlert.addEventListener('select', self.load.bind(self))
          self.pushDocument(tweetAlert);
        })
      }

      resourceLoader.getGifs(gifObj.tags.split(',').join('+'), function (response) {
        gifObj.related = response.results.map(function (gif) {
          var gifObject = {
            media: gif.media[0].gif,
            tags: gif.tags,
            id: gif.id
          }
          return gifObject
        });
        resourceLoader.loadResource(
          `${resourceLoader.BASEURL}templates/relatedGifDisplay.xml.js`,
          gifObj,
          function (resource) {
            var doc = self.makeDocument(resource);
            doc.addEventListener("select", self.load.bind(self));
            self.replaceDocument(doc, loadingDoc);
          }
        );
      })
    }
  },

  makeDocument: function (resource) {
    if (!Presenter.parser) {
      Presenter.parser = new DOMParser();
    }
    var doc = Presenter.parser.parseFromString(resource, "application/xml");
    return doc;
  },

  modalDialogPresenter: function (xml) {
    navigationDocument.presentModal(xml);
  },

  replaceDocument: function (newDoc, oldDoc) {
    navigationDocument.replaceDocument(newDoc, oldDoc);
  },

  pushDocument: function (xml) {
    navigationDocument.pushDocument(xml);
  },

  createAlert: function (title, description) {
    var alertString = `<?xml version="1.0" encoding="UTF-8" ?>
    <document>
      <alertTemplate>
        <title>${title}</title>
        <description>${description}</description>
        <button class="donePosting"><text>Ok</text></button>
      </alertTemplate>
    </document>`
    var parser = new DOMParser();
    var alertDoc = parser.parseFromString(alertString, "application/xml");
    return alertDoc
  }
}

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
ResourceLoader.prototype.postTweet = function (tweet, callback) {
 url = this.BASEURL + 'tweet'
 var postDatTweet = new XMLHttpRequest();
 postDatTweet.onreadystatechange = function () {
   if (postDatTweet.readyState === 4) {
     callback(postDatTweet.response);
   }
 }
 postDatTweet.open('POST', url, true);
 postDatTweet.send(tweet);
 return postDatTweet
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

App.onLaunch = function(options) {
  options.BASEURL = options.BASEURL || 'https://twiffsyapp.herokuapp.com/'


  var javascriptFiles = [
    `${options.BASEURL}js/ResourceLoader.js`,
    `${options.BASEURL}js/Presenter.js`,
    `${options.BASEURL}js/ajax.js`
  ];
  var success = true
  // evaluateScripts(javascriptFiles, function(success) {
    if(success) {
      resourceLoader = new ResourceLoader(options.BASEURL);
      digits = resourceLoader.returnDigits(null, function(response) {
        return response;
      });
      resourceLoader.getGifs(null, function (response) {
        resourceLoader.loadResource(`${options.BASEURL}templates/initialGifDisplay.xml.js`,
          response.results.map(function (gif) {
            var gifObject = {
              media: gif.media[0].gif,
              tags: gif.tags,
              id: gif.id
            }
            return gifObject
          }),
          function (resource) {
            var doc = Presenter.makeDocument(resource);
            doc.addEventListener("select", Presenter.load.bind(Presenter));
            Presenter.pushDocument(doc);
          }
        );
      })
    } else {
      var errorDoc = Presenter.createAlert("Evaluate Scripts Error", "Error attempting to evaluate external JavaScript files.");
      navigationDocument.presentModal(errorDoc);
    }
  

};

