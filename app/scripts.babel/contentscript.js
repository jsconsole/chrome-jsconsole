function injectJs(link) {
  var scr = document.createElement("script");
  scr.type = "text/javascript";
  scr.src = link;
  (document.head || document.body || document.documentElement).appendChild(scr);
}
function isNotAllowed() {
  if (window.location && window.location.href.match(/google\.com/)) {
    console.log(
      "%cOops, JSconsole doesn't work on this website",
      "color:#e5853d"
    );
    return false;
  }
  return true;
}
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  var options = {};
  //Call from backgroun.js
  if (request.action == "LOAD" && isNotAllowed()) {
    injectJs(chrome.extension.getURL("scripts/main.js"));
  }
});
chrome.storage.local.get("status", function(Obj) {
  if (Obj.status !== "disabled" && isNotAllowed()) {
    injectJs(chrome.extension.getURL("scripts/main.js"));
  }
});
