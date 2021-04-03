
let lines = document.getElementsByTagName('svg');
let chordName = document.getElementById('chordName')
console.log(lines)
let sharpButton = false;

let flatButton = false;

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

let arrayIndex = 16;
for(let i = 0; i < lines.length; i++, arrayIndex--){
    lines[i].trebleValue = trebleArray.notes[arrayIndex];
    lines[i].bassValue = bassArray.notes[arrayIndex];
    lines[i].addEventListener("mouseover", function(){lines[i].style.backgroundColor = 'yellow'});
    lines[i].addEventListener("mouseleave", function(){lines[i].style.backgroundColor = ''});
    lines[i].addEventListener("click", function(){showChordName(lines[i])});

}

function showChordName(pickedLine){
    if(trebleArray.active == true){
        chordName.innerHTML = pickedLine.trebleValue[1]
    } else {
        chordName.append(pickedLine.bassValue[1])
    }
}



