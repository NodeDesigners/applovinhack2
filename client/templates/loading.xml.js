var Template = function (loadingMessage) {return `<?xml version="1.0" encoding="UTF-8" ?>
<document>
   <loadingTemplate>
      <activityIndicator>
         <title>${loadingMessage}</title>
      </activityIndicator>
   </loadingTemplate>
</document>` }