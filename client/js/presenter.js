var Presenter = {
  load: function (event) {
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
        <button><text>I'm sorry!</text></button>
      </alertTemplate>
    </document>`
    var parser = new DOMParser();
    var alertDoc = parser.parseFromString(alertString, "application/xml");
    return alertDoc
  }
}