//the listener to the request to unpin all
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
	if(request.request == "unpin all"){
		MightyHandlerBackground.currentMighty = "none"
		chrome.tabs.query({pinned: true},function(tabs){
			for(let elt in tabs){
				chrome.tabs.update(tabs[elt].id, {pinned: false});
			}
		})
	}
})


//sends the popup a list of tabs to put on the  popup html, this is for when the popup window opens
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
	if(request.message == "what mighties are there"){
		var mightyNameList = [];
		var i = 0;
		if(MightyHandlerBackground.mighties){
			for(let mighty in MightyHandlerBackground.mighties){
			
				mightyNameList[i] = mighty;
				i++; 
			}
		}
		sendResponse({mighties: mightyNameList, current: MightyHandlerBackground.currentMighty});
		
	}
})


//listener to bring all mighties together
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
	console.log(JSON.stringify(request))
	if(request.request == "gatherMighty"){
		MightyHandlerBackground.mighties[request.mighty].bringTogether();
		MightyHandlerBackground.currentMighty = request.mighty;
		sendResponse({request: "mighties gathered"});
	}
})


//make a new mighty
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	if (request.identifier == "new mighty"){
		//console.log("97: " + request.newMightysName);
		newName = request.newMightysName;
		if(newName == ""){
			newName = "Mighty #" + (len(MightyHandlerBackground.mighties) + 1);
		//	console.log("21: empty str, the name is " +newName);
		}
		MightyHandlerBackground.createMighty(newName);
		//console.log("99: " + JSON.stringify(MightyHandlerBackground.mighties));
	}
}
);


//removes mighty from mighty list
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	if (request.request == "remove"){
		MightyHandlerBackground.destroyMighty(request.toRemove)
		sendResponse({backGroundToPopup: "finished"})
		}
	
		
	
})










//window close save all mighties IMPORTANT TO KEEP THIS ORDER OF CLOSERS CAUSE THIS IS THE FIRST LISTENER


removeWithWindow = {isWindowClosing: "true"};
var toBeSaved = {};
var firstTabClosed = true;

chrome.tabs.onRemoved.addListener(function(tabId, removeWithoutWindow){//this is really annoying, i would like to get the index from id but i cant make query work
	if(firstTabClosed)	
		for(mighty in MightyHandlerBackground.mighties){
			//console.log(MightyHandlerBackground.mighties[mighty])
			//console.log("the closed id in mighty" + MightyHandlerBackground.mighties[mighty].tabIdsList.indexOf(tabId))
			if(MightyHandlerBackground.mighties[mighty].tabIdsList.indexOf(tabId) > -1){ //if tabid in the mighty we are iteratingg, save it to chrome 
				console.log("in the if after close" + MightyHandlerBackground.mighties[mighty].tabIdsList)
			}
		}
		//firstTabClosed = false;

	})

chrome.windows.onRemoved.addListener(function(something){
	console.log(MightyHandlerBackground.mighties)
	for(var mighty in MightyHandlerBackground.mighties){
		console.log(MightyHandlerBackground.mighties[mighty])
	}
})
//tab removal, removes tab from mighty
removeWithoutWindow = {isWindowClosing: "false"}
chrome.tabs.onRemoved.addListener(function(tabId, removeWithoutWindow){
	for(var mighty in MightyHandlerBackground.mighties){
		if(MightyHandlerBackground.mighties[mighty].tabIdsList.indexOf(tabId) > -1){
			console.log("tablist before removal: " + JSON.stringify(MightyHandlerBackground.mighties[mighty].tabIdsList))
			MightyHandlerBackground.mighties[mighty].removeTab(tabId);
			//console.log("tablist after removal: " + JSON.stringify(MightyHandlerBackground.mighties[mighty].tabIdsList))
		}
			//all that remains is to remove it from the list, or MAKE THE LIST A METHOD
	}
})
