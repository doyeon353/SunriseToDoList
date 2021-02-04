/*morning */

const morningForm = document.querySelector('#morningForm');
//ul
const morningToDo = document.querySelector('.todolist_morningToDo');
const sunriseImg = document.querySelector('#sunriseImg');

const mornArray = [];
const morningText = 'MORNINGLIST';
function SaveMorning(text) {
    localStorage.setItem(morningText, JSON.stringify(mornArray));
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
    morningForm.addEventListener('submit', MorningHandleSubmit)
}
Init();