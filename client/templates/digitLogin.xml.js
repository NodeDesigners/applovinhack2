var $ = require('jquery');

var returnDigits = function (placeholder, callback) {
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

var digits = returnDigits(null, function(response) {
        return response;
      });

var Template = function() {
	return `<?xml version="1.0" encoding="UTF-8" ?>
	<document>
	  <productTemplate>
	    <lockup>
        <img src="https://image.freepik.com/free-icon/twitter-logo_318-40209.jpg" class="tweetButton"/>
        <title>Login to Twitter with Digits</title>
      </lockup>
	  </productTemplate>
	</document>`
}