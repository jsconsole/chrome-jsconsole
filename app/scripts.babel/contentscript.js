function injectJs(link) {
  var scr = document.createElement("script");
  scr.type = "text/javascript";
  scr.src = link;
  (document.head || document.body || document.documentElement).appendChild(scr);
}
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  var options = {};
  //Call from backgroun.js
  if (request.action == "LOAD") {
    injectJs(chrome.extension.getURL("scripts/main.js"));
  }
});
chrome.storage.local.get("status", function(Obj) {
  if (Obj.status !== "disabled") {
    injectJs(chrome.extension.getURL("scripts/main.js"));
  }
});
