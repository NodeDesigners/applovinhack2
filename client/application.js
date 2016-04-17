var resourceLoader;
var digits;

App.onLaunch = function(options) {
  var javascriptFiles = [
    `${options.BASEURL}js/ResourceLoader.js`,
    `${options.BASEURL}js/Presenter.js`,
    `${options.BASEURL}js/ajax.js`
  ];

  evaluateScripts(javascriptFiles, function(success) {
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
  });

};

