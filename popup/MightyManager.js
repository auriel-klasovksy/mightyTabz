class MightyManager{

    static changeCurr(newMighty){
        if(MightyManager.currMighty != 'mightyless' && MightyManager.currMighty != 'none'){
            console.log('currmighty = ' + MightyManager.currMighty)
            document.getElementById(MightyManager.currMighty + "Written").style.color = "black"
        }
       
        if(newMighty){
            document.getElementById(newMighty + "Written").style.color = "red";
            MightyManager.currMighty = newMighty;
        }
        
    }
    static changeNumberOnDisplay(name, newLength){
        let mightyDisplay = document.getElementById(name + 'Written')
        let indexOfNumber = mightyDisplay.innerHTML.indexOf('~') + 1
        let caption = mightyDisplay.innerHTML.slice(0, indexOfNumber)
        let newInner = caption.concat(newLength)
        mightyDisplay.innerHTML = newInner
    }


}
MightyManager.mightiesNumTabsArr = [];
MightyManager.currMighty = '';