var resourceLoader;

App.onLaunch = function(options) {
  options.BASEURL = options.BASEURL || 'http://localhost:9001/';
  var javascriptFiles = [
    `${options.BASEURL}js/ResourceLoader.js`,
    `${options.BASEURL}js/Presenter.js`,
    `${options.BASEURL}js/ajax.js`
  ];

  evaluateScripts(javascriptFiles, function(success) {
    if(success) {
      resourceLoader = new ResourceLoader(options.BASEURL);
      resourceLoader.getGifs(null, function (response) {
        resourceLoader.loadResource(`${options.BASEURL}templates/initialGifDisplay.xml.js`,
          response.results.map(function (gif) {
            return gif.media[0].gif.preview
          }),
          function (resource) {
            var doc = Presenter.makeDocument(resource);
            doc.addEventListener("select", Presenter.load.bind(Presenter));
            Presenter.pushDocument(doc);
          }
        );
      })
    } else {
      var title = "failed to eval js";
      var description = options.BASEURL;
      var alertString = `<?xml version="1.0" encoding="UTF-8" ?>
    <document>
      <alertTemplate>
        <title>${title}</title>
        <description>${description}</description>
        <button><text>I'm sorry!</text></button>
      </alertTemplate>
    </document>`
    var parser = new DOMParser();
    var alertDoc = parser.parseFromString(alertString, "application/xml")
      navigationDocument.presentModal(alertDoc);
    }
  });

};

