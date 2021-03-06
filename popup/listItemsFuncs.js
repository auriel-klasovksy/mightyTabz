
 ///<reference path="C:\Users\User\Documents\לימודים\comps\chrome_extensions\mightyTab\mightyTab\chrome-api-vsdoc.js"/>


function sendMessageToUnpinAll(){
    chrome.runtime.sendMessage({request: "unpin all"}, function(response){
        MightyManager.changeCurr('mightyless');
       
    })
}

function sendMessageToCollectMightyless(){
    chrome.runtime.sendMessage({request: "collect mightyless"}, function(response){
        MightyManager.changeCurr('mightyless');
    })
}

function sendMessageToRestoreMighties(){
    chrome.runtime.sendMessage({request: "revive button pressed"}, function(response){
        MightyManager.changeCurr('mightyless')
        console.log('revived mighties now getting response' + response)
        if(response.restored){
            let mightiesNameLength = response.mightiesNameLength
            // console.log('the mighties name length to be printed' + JSON.stringify(response.mightiesNameLength))
            for(let mighty in mightiesNameLength){
                console.log('what we put in changenumber on display. name and length' + mighty + mightiesNameLength[mighty])
                MightyManager.changeNumberOnDisplay(mighty, mightiesNameLength[mighty])
            }
        }
    })
}
    
//makes all tabs of the specific mighty appear at the same place
function sendMessageToGatherMighty(){
    let theHtmlInsideTheListItem = this.innerHTML
    console.log('in send message to gather mighty inner html:\n' + theHtmlInsideTheListItem)
    let indexOfTilda = theHtmlInsideTheListItem.indexOf("~")
    let mightyName = theHtmlInsideTheListItem.slice(0, indexOfTilda)
    chrome.runtime.sendMessage({request: "gatherMighty", mighty: mightyName}, function(response){
        if(response.request == "mighties gathered"){
            let mightyName = theHtmlInsideTheListItem.slice(0, theHtmlInsideTheListItem.indexOf("~"))
            MightyManager.changeCurr(mightyName)
            
        }
    })
}
// TODO: make this into highlighted thing
//the function of the remove mighty button 
function sendMessageToRemoveMighty(){
    var nameToRemove = this.parentElement.id;
    chrome.runtime.sendMessage({request: "remove mighty", toRemove: nameToRemove},function(response){
        console.log("response to removal",response)
        var listItemToRemove = document.getElementById(nameToRemove);
        // changeCurr is before the list item removal so that there are no problems 
        // with nulls in changeCurr
        MightyManager.changeCurr('mightyless')
        document.getElementById("listOfMighties").removeChild(listItemToRemove)
        if(MightyManager.currMighty == nameToRemove){
            console.log('removed current, changing curr mighty')
        }
    })
}

            // The functions concearning the current tab's state

//!!!!!!!!!!!!!!!!!DEPRECATED!!!!!!!!!!!!!!!!
function sendMessageToAddToMighty(){
    let nameToAddCurrentTo = this.parentElement.id
    console.log((nameToAddCurrentTo))
    chrome.runtime.sendMessage({current: true, request: "add current", toBeAdeedTo: nameToAddCurrentTo},function(response){
        // chrome.runtime.sendMessage({current: true, request: "add highlighted", toBeAdeedTo: nameToAddCurrentTo},function(response){
        // ---TODO---: raise the number next to the tab
        console.log("response\n", response)
        // unloadPopup()
        if(response.added == true){
            let mightyDisplay = document.getElementById(nameToAddCurrentTo + 'Written')
            oldNumber = mightyDisplay.innerHTML[mightyDisplay.innerHTML.length-1]
            mightyDisplay.innerHTML[mightyDisplay.innerHTML.length-1]
            console.log("old number: ", oldNumber)
            
        }
    })
}

// add all highlighted tabs to the current mighty (this includes adding the current because its the only one highlighted)

// sends a message to add current to mighty
function sendMessageToAddHIghlightedToMighty(){
    let nameToAddCurrentTo = this.parentElement.id
    console.log((nameToAddCurrentTo))
    chrome.runtime.sendMessage({current: true, request: "add highlighted", toBeAdeedTo: nameToAddCurrentTo},function(response){
        if(response.added == true){
            let newLength = response.newLength
            MightyManager.changeNumberOnDisplay(nameToAddCurrentTo, newLength)

        }
    })
}




// sends a message to open a new tab in this mighty
function sendMessageToOpenNewTab(){
    let nameToOpenNewTabIn = this.parentElement.id
    chrome.runtime.sendMessage({request: "open new in mighty", nameToOpenNewTabIn: nameToOpenNewTabIn}, function(response){
        // no need to raise the number because the pupup closes. unload popup doesnt work
    })
}


// this will soon be DEPRECATED in favor of removing the highlighted
function sendMessageToRemoveCurrFromMighty(){
    let nameToRemoveTabFrom = this.parentElement.id
    chrome.runtime.sendMessage({current: true, request: "remove current from mighty", nameToRemoveTabFrom: nameToRemoveTabFrom},
        function(response){
            // unloadPopup()
            if(response.currInMighty){
                console.log("the current page is in mighty. find how to lower the")
            }
        // Todo: lower the number of tabs if the response is positive
        })
} 


function sendMessageToRemoveHighlightedFromMighty(){
    let nameToRemoveTabsFrom = this.parentElement.id
    chrome.runtime.sendMessage({current: true, request: "remove highlighted from mighty", nameToRemoveTabsFrom: nameToRemoveTabsFrom},
        function(response){
            MightyManager.changeNumberOnDisplay(nameToRemoveTabsFrom, response.newLength)
        })
} 


//sends a message with the user's input to become the name of a new mighty tab
function sendInputToBackground(){
    var newName = document.getElementById("nameInput").value;
    chrome.runtime.sendMessage({identifier: "new mighty", newMightysName: newName}, function(response){
    })

}
