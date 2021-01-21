function createElementFromString(html) {
  const template = document.createElement("template");
  html = html.trim(); // Never return a text node of whitespace as the result
  template.innerHTML = html;
  return template.content.firstChild;
}

async function scrollAndGetTweets() {
  const loadingElement = `<div id="loading-element" style="
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1000;
    pointer-events: none;
    background-color: whitesmoke;
    text-align: center;
    padding: 20px 40px;
"><h1 style="
    font-size: 120px;
">Please wait...</h1>
      <h3 style="
    font-size: 66px;
">Processing your twitter wall</h3></div>`;

  const errorElement = `<div id="error-element" style="
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1000;
    pointer-events: none;
    background-color: whitesmoke;
    text-align: center;
    padding: 20px 40px;
"><h1 style="
    font-size: 120px;
    color: indianred;
">Something went wrong :(</h1>
      <h3 style="
    font-size: 66px;
    color: indianred;
">Refresh the page and try again. If that happens again please contact us</h3></div>`;

  async function* tweedGenerator() {
    let tweets = [];
    let lastTweet = null;
    let i = 0;
    while (i < 10) {
      await new Promise((resolve) => {
        setTimeout(resolve, 1000);
      });
      tweets = Array.from(document.querySelectorAll('[data-testid="tweet"]'));
      lastTweet = tweets.pop();
      lastTweet.scrollIntoView();
      i++;
      yield tweets;
    }
  }

  function mapElementToInfo(el) {
    try {
      const links = el.children[1].querySelectorAll("div > div > a");
      const content = el.querySelector("[lang]") || {
        textContent: "video_only",
      };
      const author = links[0].querySelector("span").textContent;
      const date = links[1].querySelector("time").getAttribute("datetime");
      return {
        date: date,
        content: content.textContent,
        id: links[1].getAttribute("href"),
        author: author,
        source: "home",
      };
    } catch (e) {
      return null;
    }
  }
  document.body.appendChild(createElementFromString(loadingElement));
  try {
    let allTweets = [];
    // window.scrollBy(0, document.scrollingElement.scrollHeight);
    for await (let tweets of tweedGenerator()) {
      allTweets = [
        ...allTweets,
        ...tweets.map(mapElementToInfo).filter((el) => el != null),
      ];
    }

    // Cannot just return value because it's async and returned promise is never going to be used.
    chrome.runtime.sendMessage(
      allTweets.filter((el) => el.content !== "video_only"),
      function (response) {
        document.getElementById("loading-element").remove();
        console.log(response); // Logs 'true'
      }
    );
  } catch (err) {
    console.error(err);
    document.getElementById("loading-element").remove();
    document.body.appendChild(createElementFromString(errorElement));
    chrome.runtime.sendMessage([], function (response) {
      console.log(response); // Logs 'true'
    });
  }
}

// noinspection JSAnnotator, It's wrapped in a function by chrome extension API
scrollAndGetTweets();
