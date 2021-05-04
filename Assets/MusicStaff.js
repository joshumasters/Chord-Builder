
let lines = document.getElementsByTagName('svg');
let chordName = document.getElementById('chordName');
let sharpButton = document.getElementById('sharp');
let flatButton = document.getElementById('flat');
let trebleButton = document.getElementById('treble');
let bassButton = document.getElementById('bass');
let trebleClef = document.getElementById('trebleClef');
let bassClef = document.getElementById('bassClef');
let buttons = document.getElementsByClassName('button');

let selectedNotes = [];

let trebleArray = {
    active: true,
    notes: [[1, 'A'], [3, 'B'], [4, 'C'], [6, 'D'], [8, 'E'], [9, 'F'], [11, 'G'],
    [13, 'A'], [15, 'B'], [16, 'C'], [18, 'D'], [20, 'E'], [21, 'F'], [23, 'G'],
    [25, 'A'], [27, 'B'], [28, 'C']]
}

let bassArray = {
    active: false,
    notes: [[4, 'C'], [6, 'D'], [8, 'E'], [9, 'F'], [11, 'G'],
    [13, 'A'], [15, 'B'], [16, 'C'], [18, 'D'], [20, 'E'], [21, 'F'], [23, 'G'],
    [25, 'A'], [27, 'B'], [28, 'C'], [30, 'D'], [32, 'E']]
}

//Adds Listeners to Buttons
for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("mouseover", function () { buttons[i].classList.add('green-glow') })
    buttons[i].addEventListener("mouseleave", function () { buttons[i].classList.remove('green-glow') });
    buttons[i].addEventListener("click", function () { buttonClick(buttons[i]) })
}

//Assigns Listeners and Note values to HTML line elements
let arrayIndex = 16;
for (let i = 0; i < lines.length; i++, arrayIndex--) {
    lines[i].trebleValue = trebleArray.notes[arrayIndex];
    lines[i].bassValue = bassArray.notes[arrayIndex];
    lines[i].selected = '0';
    lines[i].accidental = '0';
    lines[i].addEventListener("mouseover", function () { lines[i].style.backgroundColor = 'yellow' });
    lines[i].addEventListener("mouseleave", function () { lines[i].style.backgroundColor = '' });
    lines[i].addEventListener("click", function () { clickLine(lines[i]) });

}

//Add check at some point to account for both clefs being turned 'off'
//Adds basic button functionality and styling onclick
function buttonClick(button) {
    if (button.active === 1) {
        button.classList.remove('green-glow-perma');
        button.active = 0;
        console.log(button.active)
        return;
    }
    let buttonClass = document.getElementsByClassName(button.classList[1]);
    for (let i = 0; i < buttonClass.length; i++) {
        buttonClass.item(i).classList.remove('green-glow-perma');
        buttonClass.item(i).active = 0;
    }
    button.classList.add('green-glow-perma');
    button.active = 1;
    if (button === bassButton) {
        trebleClef.style.display = 'none';
        bassClef.style.display = 'block';
    }
    if (button === trebleButton) {
        trebleClef.style.display = 'block';
        bassClef.style.display = 'none';
    }
    bassOrTreble()
}

//This is the start of where the magic happens
function clickLine(pickedLine) {
    //Handles adding and removing from selectedNotes array
    if (pickedLine.selected == "0") {
        if (selectedNotes.length === 4) {
            selectedNotes[3].selected = '0'
            selectedNotes[3].classList.remove('yellow-perma')
            selectedNotes.pop()
        }
        //Assigns accidentals to lines where appropriate
        if (sharpButton.active == 1) {
            pickedLine.accidental = '1'
        } else if (flatButton.active == 1) {
            pickedLine.accidental = '-1'
        }
        pickedLine.selected = '1'
        pickedLine.classList.add('yellow-perma')
        selectedNotes.push(pickedLine);
    } else {
        selectedNotes.forEach((node, index) => {
            if(pickedLine === node){
                selectedNotes.splice(index, 1);
            }
        })
        pickedLine.classList.remove('yellow-perma')
        pickedLine.accidental = '0'
        pickedLine.selected = '0'
    }
    //Sorts array by numeral note value ascending
    selectedNotes.sort((a, b) => a.trebleValue[0] - b.trebleValue[0])
    selectedNotes.forEach((node) => console.log(node.accidental))
    bassOrTreble()
}

function bassOrTreble(){
    //Add accidentals to mappings
    selectedNotes.forEach((node) => console.log(node.trebleValue))
    if (bassButton.active == "1") {
        //Mapping only the clef-appropriate values to variable to doTheory with
        let bassNotes = selectedNotes.map((node) => addAccidental(node.bassValue, node.accidental))
        doTheory(bassNotes)
    } else {
        let trebleNotes = selectedNotes.map((node) => addAccidental(node.trebleValue, node.accidental))
        doTheory(trebleNotes)
    }
}

//Utility function 
function addAccidental(nodeValues, accidental){
    let char = '';
    if(accidental == '1'){
        char = '#'
    } else if(accidental == '-1'){
        char = 'b'
    }
    let moddedNotes = [nodeValues[0] + parseInt(accidental), nodeValues[1] + char]
    return moddedNotes
}

function doTheory(notesToParse) {
    // Two Notes - Interval Case
    console.log(`notesToParse are ${notesToParse}`)
    if(notesToParse.length == 1){
        chordName.innerHTML = notesToParse[0][1]
    }
    if (notesToParse.length == 2) {
        let intervalValue = notesToParse[1][0] - notesToParse[0][0]
        let realValue = intervalValue % 12
        let numOfOctaves = Math.floor(intervalValue / 12)
        chordName.innerHTML = checkInterval(realValue)
        if(numOfOctaves > 0 && checkInterval(realValue) != "Octave"){
            chordName.append(" + " + numOfOctaves + " Octaves")
        } else if(numOfOctaves > 1 && checkInterval(realValue) == "Octave"){
            chordName.innerHTML = numOfOctaves + " Octaves"
        }
    }
    //Three or More Notes - Chordal Case
    else if (notesToParse.length > 2) {

    }
}

function checkInterval(realValue) {
    switch (realValue) {
        case 0:
            return "Octave";
            break;
        case 1:
            return "Minor 2nd";
            break;
        case 2:
            return "Major 2nd";
            break;
        case 3:
            return "Minor 3rd";
            break;
        case 4:
            return "Major 3rd";
            break;
        case 5:
            return "Perfect 4th";
            break;
        case 6:
            return "Tritone/b5";
            break;
        case 7:
            return "Perfect 5th";
            break;
        case 8:
            return "Minor 6th";
            break;
        case 9:
            return "Major 6th";
            break;
        case 10:
            return "Minor 7th";
            break;
        case 11:
            return "Major 7th";
            break;
    }
}

// function showChordName(pickedLine) {
//     if (bassButton.active === 1) {
//         if (sharpButton.active == 1) {
//             chordName.innerHTML = pickedLine.bassValue[1] + '#';
//         } else if (flatButton.active == 1) {
//             chordName.innerHTML = pickedLine.bassValue[1] + 'b';
//         } else {
//             chordName.innerHTML = pickedLine.bassValue[1];
//         }
//     } else {
//         if (sharpButton.active == 1) {
//             chordName.innerHTML = pickedLine.trebleValue[1] + '#';
//         } else if (flatButton.active == 1) {
//             chordName.innerHTML = pickedLine.trebleValue[1] + 'b';
//         } else {
//             chordName.innerHTML = pickedLine.trebleValue[1];
//         }
//     }

// }



