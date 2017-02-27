chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.method == "getLocalStorage")
      sendResponse({data1: localStorage[request.key1],data2:localStorage[request.key2],data3:localStorage[request.key3]});
    else
      sendResponse({}); // snub them.
});

chrome.runtime.onInstalled.addListener(function(details){
    if(details.reason == "install"){
        console.log("This is a first install!");
    }else if(details.reason == "update"){
        var thisVersion = chrome.runtime.getManifest().version;
        console.log("Updated from " + details.previousVersion + " to " + thisVersion + "!");
    }
    chrome.tabs.create({url:"options.html"});
});