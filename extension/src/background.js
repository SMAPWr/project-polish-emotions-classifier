const processResponse = async (emptyPromise) => {
  // Create a promise that resolves when chrome.runtime.onMessage fires
  const message = new Promise((resolve) => {
    const listener = (request) => {
      chrome.runtime.onMessage.removeListener(listener);
      resolve(request);
    };
    chrome.runtime.onMessage.addListener(listener);
  });

  const result = await message;
  const _myArray = JSON.stringify(result, null, 4); //indentation in json format, human readable

  let vLink = document.createElement("a"),
    vBlob = new Blob([_myArray], { type: "octet/stream" }),
    vName = "my_model_input.json",
    vUrl = window.URL.createObjectURL(vBlob);
  vLink.setAttribute("href", vUrl);
  vLink.setAttribute("download", vName);
  vLink.click();
};

chrome.tabs.onActivated.addListener(function (activeInfo) {
  chrome.tabs.get(activeInfo.tabId, function (tab) {
    console.log(tab);
    if (tab.url.includes("twitter.com")) {
      chrome.pageAction.show(tab.id, () => {
        chrome.pageAction.onClicked.addListener(function (tab) {
          console.log('aaa')
          chrome.tabs.executeScript(
            tab.id,
            {
              file: "./inject_script.js",
            },
            processResponse
          );
        });
      })
    } else {
      chrome.pageAction.hide(tab.id, () => {})
    }
  });
});
