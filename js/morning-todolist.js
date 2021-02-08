/*morning */
const morningForm = document.querySelector('#morningForm');
//ul
const morningToDo = document.querySelector('.todolist_morningToDo');
const sunriseImg = document.querySelector('#sunriseImg');

let mornArray = [];
const morningText = 'MORNINGLIST';

function moveToAfter(event) {
    if (afterArray.length < 7) {
        const moveTo = event.target;
        const li = moveTo.parentNode.parentNode;
        const moveText = li.firstChild.innerText;
        paintafternoon(moveText);
        deleteToDoMorn(event);
    } else {
        alert('오후에 너무 몰아서 하지마~');
    }

}


function finishToDo(event) {
    const btn = event.target.parentElement;
    const list = btn.parentNode;
    const span = list.firstChild;
    span.classList.toggle('checkToDo');
}

function deleteToDoMorn(event) {
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
    if (mornArray.length < 7) {
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
        morningLi.appendChild(morningSpan);
        mornBtns.appendChild(delBtn);
        delBtn.addEventListener('click', deleteToDoMorn);
        mornBtns.appendChild(finishBtn);
        finishBtn.addEventListener('click', finishToDo);
        mornBtns.appendChild(moveToAfternoon);
        moveToAfternoon.addEventListener('click', moveToAfter);
        morningLi.appendChild(mornBtns);
        morningLi.id = newId;
        morningToDo.appendChild(morningLi);


        const mornObj = {
            text: text,
            id: newId
        }
        mornArray.push(mornObj);
        SaveMorning();
    } else {
        alert('일을 너무 많이 하는거 아니야? ㅋㅋㅋ 좀 쉬면서 해~');
    }
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

