var Presenter = {
  load: function(event) {
    resourceLoader.getGifs('hello', function (response) {
      console.log('response', response);
    });
    var self = this;
          resourceLoader.loadResource(`${resourceLoader.BASEURL}templates/helloworld.xml.js`,
        {
          title: 'Yay next page!!',
          items: ['item1', 'item2', 'item3']
        },
        function (resource) {
          var doc = Presenter.makeDocument(resource);
          doc.addEventListener("select", self.load.bind(self));
          self.pushDocument(doc);
        }
      );

  },



  makeDocument: function(resource) {
    if (!Presenter.parser) {
      Presenter.parser = new DOMParser();
    }
    var doc = Presenter.parser.parseFromString(resource, "application/xml");
    return doc;
  },

  modalDialogPresenter: function(xml) {
    navigationDocument.presentModal(xml);
  },

  pushDocument: function(xml) {
    navigationDocument.pushDocument(xml);
  },

  createAlert : function(title, description) {
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