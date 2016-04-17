var Template = function(prev, data) { 
  var prev = 'https://goo.gl/7o04NE';
  var data = ['https://goo.gl/7o04NE','https://goo.gl/7o04NE','https://goo.gl/7o04NE','https://goo.gl/7o04NE','https://goo.gl/7o04NE','https://goo.gl/7o04NE','https://goo.gl/7o04NE','https://goo.gl/7o04NE','https://goo.gl/7o04NE','https://goo.gl/7o04NE']
  var generateMediumImageLockups = function(url){
    return `<lockup>
              <img src="${url}" class="medium" />
              <title class="scrollTextOnHighlight">Title 1</title>
    </lockup>`;
  };

  var generateSections = function(lockups){
    var rows = [[]];
    var count = 0;
    var rowIndex = 0;
    lockups.forEach(function(item, index){
      count++;
      if(count > 5){
        count = 0;
        rowIndex++;
        rows.push([]);
        rows[rowIndex].push(item);
      } else {
        rows[rowIndex].push(item);
      }
    });
    var TVML = rows.map(function(array){
      return '<shelf><section>' + array.join('') + '</section></shelf>';
    });
    return TVML.join('');
  };

  var sections = generateSections(data.map(generateMediumImageLockups));

  return `<?xml version="1.0" encoding="UTF-8" ?>
  <document>
    <head>
      <style>
      .imageWithGradient {
        tv-tint-color: linear-gradient(top, 0.33, transparent, 0.66, rgba(0,64,0,0.7), rgba(0,64,0,1.0));
      }
      .showTextOnHighlight {
        tv-text-highlight-style: show-on-highlight;
      }
      .scrollTextOnHighlight {
        tv-text-highlight-style: marquee-on-highlight;
      }
      .showAndScrollTextOnHighlight {
        tv-text-highlight-style: marquee-and-show-on-highlight;
      }
      .medium {
        width: 400;
        height: 400;
      }
      .selectedGif {
        width: 650;
        height: 400;
      }
      .tweetButton {
        width: 400;
        height: 200;
      }
      </style>
    </head>
    <stackTemplate>
      <collectionList>
        <grid>
          <section>
            <lockup>
              <img src="${prev}" class="selectedGif" />
              <title>Title 1</title>
            </lockup>
            <lockup>
              <img src="https://image.freepik.com/free-icon/twitter-logo_318-40209.jpg" class="tweetButton"/>
              <title>Tweet It!</title>
            </lockup>
          </section>
        </grid>
        ${sections}
      </collectionList>
    </stackTemplate>
  </document>`
}