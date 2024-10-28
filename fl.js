let POSITION = 100;
document.querySelector(".position-pixels-number").innerHTML = POSITION;

let move = 1;
let move_double = 10;
let move_triple = 100;

let next_layer_id = 0;
let next_sound_id = 0;

let files = [
    "boom1",
    "toe2 1 0",
    "toe2 1 1",
    "toe2 1 2",
    "toe2 1 3",
    "toe2 1 4",
    "07763",
    "07763 (2)",
    "07763 (3)",
    "07763 (4)",
    "07763 (5)",
    "07763 (6)",
    "07763 (7)",
    "07763 (8)",
    "07763 (9)",
    "07763 (10)",
]

let layers = [

]

/*
sounds = [[filename, left, html], ...sounds]
left - либо длина музыки либо отступ слева
*/

let sounds = [

]


function loadLayers() {
    document.querySelector(".inner-sheet").innerHTML = "";
    for (let i = 0; i < layers.length; i++) {
        document.querySelector(".inner-sheet").innerHTML += layers[i][0];
    }

    loadSounds()
}

function loadSounds() {
    // let layer_id = 0;
    // console.log(sounds)
    // while (layer_id < next_layer_id) {

    //     for (sound of sounds) {
    //         document.getElementById(`layer-${layer_id}`).innerHTML += sound[2] // sound[3] = html
    //         console.log(sound)
    //     }

    //     console.log(layer_id)
    //     layer_id++;
    // }

    for (let layer of layers) {
        for (let i = 1; i != layer.length; i++) {
            console.log("\n\n\n")
            console.log("line 57", i, layer[i])
            // console.log("line 59", document.querySelectorAll(".layer"), document.querySelectorAll(".layer")[i])
            console.log("line 59", document.getElementById(`layer-${i}`))
            document.getElementById(`layer-${i}`).innerHTML += layer[i][2]
        }
    }

}

function addLayer() {
    layers.push([`<div class="layer" id='layer-${next_layer_id}' 
    onclick="selected(${next_layer_id})">layer-${next_layer_id}</div>`]);
    loadLayers();
    next_layer_id += 1;
}

function moveLeftOrRight(direction) {
    if (direction == "l") {
        POSITION -= move;
    } if (direction == "ll") {
        POSITION -= move_double;
    } if (direction == "lll") {
        POSITION -= move_triple;
    } if (direction == "r") {
        POSITION += move;
    } if (direction == "rr") {
        POSITION += move_double;
    } if (direction == "rrr") {
        POSITION += move_triple;
    }
    document.querySelector(".position-pixels-number").innerHTML = POSITION;;
    document.getElementById("pos-cur").style.left = `${POSITION}px`;
}

let pos_cursor = "<div id='pos-cur' style='position: absolute;'>|</div>";
let last_elem_id = "";
function selected(id) {
    try {
        document.getElementById(last_elem_id).style.backgroundColor = "burlywood";
        document.getElementById("pos-cur").remove();
    } catch {}

    let cur_layer = document.getElementById(`layer-${id}`);
    cur_layer.style.backgroundColor = "#ecb265";
    cur_layer.innerHTML += pos_cursor;
    document.getElementById("pos-cur").style.left = `${POSITION}px`;
    last_elem_id = `layer-${id}`;
}

function checkWidth() {
    let maxwidth = 0;
    for (let sound of sounds) {
        if (+sound[1] > maxwidth) {
            maxwidth = +sound[1];
        }
    }
    for (let layer of document.querySelectorAll(".layer")) {
        layer.style.width = `${+maxwidth + 1000}px`;
    }
}

// bottom-sounds
function addSound(filename) {
    let parent = document.getElementById("pos-cur").parentElement;

    let html = `<span class="sound" id="sound-${next_sound_id}" 
    style="position: absolute; left: ${POSITION}px;" 
    onclick="document.getElementById('selected-item').innerHTML = 
    'sound-${next_sound_id}'">${filename}</span>`
    parent.innerHTML += html;

    document.getElementById(`sound-${next_sound_id}`).style.width = getDuration(filename);

    let cur_sound = [filename, document.getElementById(`sound-${next_sound_id}`).style.left.slice(0, -2), html]
    layers[parent.id.slice()[6]].push(cur_sound);
    sounds.push(cur_sound);
    checkWidth()

    next_sound_id += 1;
}

function deleteSelectedItem() {
    let to_delete = document.getElementById("selected-item").innerHTML;
    sounds[to_delete[6]] = undefined

    document.getElementById(to_delete).remove();
    document.getElementById("selected-item").innerHTML = "";
}

// music
function getDuration(audioName) {
    let audio = new Audio();
    audio.src = `./sounds/${audioName}.mp3`;
    return `${audio.duration}px`;
}

// 100px == 1000 (1s)
function audioPlay(audioName, timeout) {
    let audio = new Audio();
    audio.src = `./sounds/${audioName}.mp3`;
    function audioHelp() {
        audio.play();
    }
    setTimeout(audioHelp, timeout * 10);
}

function Play() {
    for (let i = 0; i != sounds.length; i++) {
        try {
            audioPlay(sounds[i][0], sounds[i][1]);
        } catch {
            console.log("nothing had happened, all is ok...")
        }
    }
}


for (let i = 0; i < files.length; i++) {
    document.querySelector(".inner-bottom-toolbar").innerHTML += 
    `<span class="sound-file">
    <span class="sound-but" onclick="addSound('${files[i]}')">+</span>
    <span class="sound-but" onclick="setTimeout(audioPlay, 0, '${files[i]}', 1)">></span>${files[i]}.mp3</span>`;
}

loadLayers()