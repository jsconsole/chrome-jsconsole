var openURL = function openURL(url) {
  chrome.tabs.create({ url: url });
};
var tweet = function tweet() {
  var text = escape(
    "JSconsole - Load external JS libraries within developer console build by @squiroid https://jsconsole.github.io/ #js #console #chrome #extension"
  );
  var tweet_url = "https://twitter.com/intent/tweet?text=" + text;
  openURL(tweet_url);
};
var header = function() {
  openURL("https://jsconsole.github.io");
};
var feedback = function() {
  openURL("https://goo.gl/forms/gSeeeDP2nZwIvFhi1");
};
var rating = function() {
  openURL(
    "https://chrome.google.com/webstore/detail/jsconsole/aplckfckjlmdalfikgbfhmpkcieajkma/reviews"
  );
};
var hasClass = function hasClass(element, className) {
  return element.className.split(" ").indexOf(className) > -1;
};
document.getElementById("header").addEventListener("click", header);
document.getElementById("tweet").addEventListener("click", tweet);
document.getElementById("feedback").addEventListener("click", feedback);
document.getElementById("rating").addEventListener("click", rating);
document.addEventListener(
  "click",
  function(e) {
    if (hasClass(e.target, "js-status")) {
      // document.getElementById('js-status').checked returning previous state instead of new one.
      if (document.getElementById("js-status").checked === true) {
        chrome.storage.local.set({ status: "disabled" });
        chrome.tabs.query({ active: true, currentWindow: true }, function(
          tabs
        ) {
          chrome.tabs.reload(tabs[0].id);
        });
      } else if (document.getElementById("js-status").checked === false) {
        chrome.storage.local.set({ status: "enabled" });
        chrome.tabs.query({ active: true, currentWindow: true }, function(
          tabs
        ) {
          chrome.tabs.sendMessage(tabs[0].id, { action: "LOAD" });
        });
      }
    } else if (hasClass(e.target, "js-header")) {
    }
  },
  false
);

chrome.storage.local.get("status", function(Obj) {
  console.log("A", Obj.status);
  if (Obj.status === "disabled") {
    document.getElementById("js-status").checked = false;
  } else if (Obj.status === "enabled") {
    document.getElementById("js-status").checked = true;
  }
});
