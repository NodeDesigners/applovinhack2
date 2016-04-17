var Template = function(data) {


  var generateMediumImageLockups = function(data){
    var tags = data.tags.reduce(function (allTags, tag) {
      return allTags === '' ?  tag : allTags + ',' + tag
    }, '')
    return `<lockup url="${data.media.url}" preview="${data.media.preview}" tags="${tags}" id="${data.id}">
              <img src="${data.media.preview}" class="medium" />
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

  var sections = generateSections(data.map(generateMediumImageLockups))

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
      </style>
    </head>
    <stackTemplate>
      <collectionList>
        ${sections}
      </collectionList>
    </stackTemplate>
  </document>`
}