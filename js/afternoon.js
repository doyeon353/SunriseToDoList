/*sunset */
const afternoonForm = document.querySelector('#afternoonForm');
//ul
const afternoonToDo = document.querySelector('.todolist_afternoonToDo');


let afterArray = [];
const afternoonText = 'AFTERNOONLIST';


//morning로 list를 이동시킨다
function moveToMorning(event) {
    if (mornArray.length < 7) {
        const moveTo = event.target;
        const li = moveTo.parentNode.parentNode;
        console.log(li);
        const moveText = li.firstChild.innerText;
        paintMorning(moveText);
        deleteToDoAfter(event);
    } else {
        alert('아침에 너무 몰아서 하지마~');
    }

}

//list를 finish시킨다.
function finishToDo(event) {
    const btn = event.target.parentElement;
    const list = btn.parentNode;
    const span = list.firstChild;
    span.classList.toggle('checkToDo');
}


//after의 list를 삭제
function deleteToDoAfter(event) {
    const btn = event.target;
    const list = btn.parentNode.parentNode;
    afternoonToDo.removeChild(list);
    const cleanafternoon = afterArray.filter(function (toDo) {
        return toDo.id !== parseInt(list.id);
    });
    afterArray = cleanafternoon;
    Saveafternoon();
}


//after를 localstorage에 저장
function Saveafternoon(text) {
    localStorage.setItem(afternoonText, JSON.stringify(afterArray));
}
//새로고침시 list를 화면에 출력(afternoon)
function loadafternoon() {
    const loadedafternoon = localStorage.getItem(afternoonText);
    if (loadedafternoon !== null) {
        const parsedafternoon = JSON.parse(loadedafternoon);
        parsedafternoon.forEach(function (toDo) {
            paintafternoon(toDo.text);
        });
    }
}

//화면에 출력
function paintafternoon(text) {
    if (afterArray.length < 7) {
        const afternoonLi = document.createElement('li');
        const mornBtns = document.createElement('div');
        const afternoonSpan = document.createElement('span');
        const delBtn = document.createElement('button');
        const finishBtn = document.createElement('button');
        const moveToMorn = document.createElement('button');
        const newId = afterArray.length + 1;

        delBtn.innerHTML = '❌';
        finishBtn.innerHTML = '⭕';
        moveToMorn.innerHTML = '←';
        afternoonSpan.innerText = text;
        afternoonLi.appendChild(afternoonSpan);
        mornBtns.appendChild(delBtn);
        delBtn.addEventListener('click', deleteToDoAfter);
        mornBtns.appendChild(finishBtn);
        finishBtn.addEventListener('click', finishToDo);
        mornBtns.appendChild(moveToMorn);
        moveToMorn.addEventListener('click', moveToMorning)
        afternoonLi.appendChild(mornBtns);
        afternoonLi.id = newId;
        afternoonToDo.appendChild(afternoonLi);


        const mornObj = {
            text: text,
            id: newId
        }
        afterArray.push(mornObj);
        Saveafternoon();
    } else {
        alert('일을 너무 많이 하는거 아니야? ㅋㅋㅋ 좀 쉬면서 해~');
    }
}

//afternoon의 form handler
function afternoonHandleSubmit(event) {
    event.preventDefault();
    const toDo = document.querySelector('#afternoonToDo');
    const currentValue = toDo.value;
    paintafternoon(currentValue);
    toDo.value = "";

}



function Init() {
    afternoonForm.addEventListener('submit', afternoonHandleSubmit);
    loadafternoon();
}
Init();
