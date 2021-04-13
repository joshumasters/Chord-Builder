
let lines = document.getElementsByTagName('svg');
let chordName = document.getElementById('chordName');
let sharpButton = document.getElementById('sharp');
let flatButton = document.getElementById('flat');
let trebleButton = document.getElementById('treble');
let bassButton = document.getElementById('bass');
let trebleClef = document.getElementById('trebleClef');
let bassClef = document.getElementById('bassClef');

let buttons = document.getElementsByClassName('button');

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

for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("mouseover", function () { buttons[i].classList.add('green-glow') })
    buttons[i].addEventListener("mouseleave", function () { buttons[i].classList.remove('green-glow') });
    buttons[i].addEventListener("click", function () { buttonClick(buttons[i]) })
}

// Add check at some point to account for both clefs being turned 'off'
function buttonClick(button) {
    if (button.active === 1) {
        button.classList.remove('green-glow-perma');
        button.active = 0;
        console.log(button.active)
        return;
    }
    let buttonClass = document.getElementsByClassName(button.classList[1]);
    for(let i = 0; i < buttonClass.length; i++){
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
    console.log('Clicked button has active value of: ' + button.active);
}



let arrayIndex = 16;
for (let i = 0; i < lines.length; i++, arrayIndex--) {
    lines[i].trebleValue = trebleArray.notes[arrayIndex];
    lines[i].bassValue = bassArray.notes[arrayIndex];
    lines[i].addEventListener("mouseover", function () { lines[i].style.backgroundColor = 'yellow' });
    lines[i].addEventListener("mouseleave", function () { lines[i].style.backgroundColor = '' });
    lines[i].addEventListener("click", function () { showChordName(lines[i]) });

}

function showChordName(pickedLine) {
    if (sharpButton.active == 1) {
        chordName.innerHTML = pickedLine.trebleValue[1] + '#';
    } else if (flatButton.active == 1) {
        chordName.innerHTML = pickedLine.trebleValue[1] + 'b';
    } else {
        chordName.innerHTML = pickedLine.trebleValue[1];
    }
}



