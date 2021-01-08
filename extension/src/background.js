chrome.browserAction.onClicked.addListener(function(tab){
  var myName = tab.url.split(".")[0].slice(7);
  var MyArray = ['test', 'test2', myName];
  var _myArray = JSON.stringify(MyArray , null, 4); //indentation in json format, human readable
  console.log(_myArray)

  var vLink = document.createElement('a'),
    vBlob = new Blob([_myArray], {type: "octet/stream"}),
    vName = 'watever_you_like_to_call_it.json',
    vUrl = window.URL.createObjectURL(vBlob);
  vLink.setAttribute('href', vUrl);
  vLink.setAttribute('download', vName );
  vLink.click();
});

console.log('loaded')