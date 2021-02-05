/*morning */

const morningForm = document.querySelector('#morningForm');
//ul
const morningToDo = document.querySelector('.todolist_morningToDo');
const sunriseImg = document.querySelector('#sunriseImg');

let mornArray = [];
const morningText = 'MORNINGLIST';


function deleteToDo(event) {
    const btn = event.target;
    const list = btn.parentNode.parentNode;
    morningToDo.removeChild(list);
    const cleanMorning = mornArray.filter(function (toDo) {
        return toDo.id !== parseInt(list.id);
    });
    mornArray = cleanMorning;
    SaveMorning();
}

function SaveMorning(text) {
    localStorage.setItem(morningText, JSON.stringify(mornArray));
}

function loadMorning() {
    const loadedMorning = localStorage.getItem(morningText);
    if (loadedMorning !== null) {
        const parsedMorning = JSON.parse(loadedMorning);
        parsedMorning.forEach(function (toDo) {
            paintMorning(toDo.text);
        });
    }
}


function paintMorning(text) {

    const morningLi = document.createElement('li');
    const mornBtns = document.createElement('div');
    const morningSpan = document.createElement('span');
    const delBtn = document.createElement('button');
    const finishBtn = document.createElement('button');
    const moveToAfternoon = document.createElement('button');
    const newId = mornArray.length + 1;

    delBtn.innerHTML = '❌';
    finishBtn.innerHTML = '⭕';
    moveToAfternoon.innerHTML = '→';
    morningSpan.innerText = text;
    delBtn.classList.add('show');
    morningLi.appendChild(morningSpan);
    mornBtns.appendChild(delBtn);
    delBtn.addEventListener('click', deleteToDo);
    mornBtns.appendChild(finishBtn);
    mornBtns.appendChild(moveToAfternoon);
    morningLi.appendChild(mornBtns);
    morningLi.id = newId;
    morningToDo.appendChild(morningLi);


    const mornObj = {
        text: text,
        id: newId
    }
    mornArray.push(mornObj);
    SaveMorning();
}


function MorningHandleSubmit(event) {
    event.preventDefault();
    const toDo = document.querySelector('#morningToDo');
    const currentValue = toDo.value;
    paintMorning(currentValue);
    toDo.value = "";

}



function Init() {
    morningForm.addEventListener('submit', MorningHandleSubmit);
    loadMorning();
}
Init();