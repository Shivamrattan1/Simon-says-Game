let games = [];
let users = [];
let btns = ["yellow", "red", "green", "purple"];
let buts = document.querySelectorAll('.btn');
let level = 0;
let start = false;
let h2 = document.querySelector('h2');
let cc = -1;
let ni;

document.addEventListener("keypress", function() {
    if (!start) {
        console.log("GAME STARTED");
        start = true;
        levelUp();
    }
});

function levelUp() {
    users = [];
    cc = -1;
    console.log(cc);
    level++;
    let c = Math.floor(Math.random() * 4);
    let rcolor = btns[c];
    games.push(rcolor);
    h2.innerText = `Level ${level} Simon chose color ${rcolor}`;
    let rbutton = document.querySelector(`.${games[0]}`);
    console.log(rbutton);
    let pp = topgbuttonflash(rbutton, 200);
    for (let top = 1; top < games.length; top++) {
        if (games[top - 1] !== games[top]) {
            let rbutton = document.querySelector(`.${games[top]}`);
            pp = pp.then(() => topgbuttonflash(rbutton, 200));
        } else {
            let rbutton = document.querySelector(`.${games[top]}`);
            pp = pp.then(() => topgbuttonflash2(rbutton, 200));
            pp = pp.then(() => topgbuttonflash3(rbutton, 200));
        }
    }
    let count = 25;
    ni = setInterval(function() {
        h2.innerText = `Level ${level} Simon chose color ${rcolor} you have ${count} seconds left`;
        if (count === 0) {
            gameOver();
        }
        count--;
    }, 1000);
}

function gameOver() {
    clearInterval(ni);
    h2.innerText = `Game Over! Your level was ${level}. Press any key to start.`;
    games = [];
    users = [];
    cc = -1;
    level = 0;
    start = false;
    showAlert()
}

function showAlert() {
    setTimeout(() => {
        alert("Game Over!");
    }, 100);
}
function checkAns(idx) {
    console.log(idx, games.length);
    if (users[idx] === games[idx]) {
        console.log("if 1 clear");
        if (idx === games.length - 1) {
            console.log("if 2 clear");
            clearInterval(ni);
            setTimeout(levelUp, 500);
        }
    } else {
        gameOver();
    }
}

buts.forEach(b => {
    b.addEventListener("click", function() {
        userflash(this);
        let bts = this;
        let k = bts.getAttribute('id');
        users.push(k);
        cc++;
        console.log(cc);
        console.log(users, "users");
        checkAns(cc);
    });
});

function buttonflash(button) {
    button.classList.add('flash');
    setTimeout(() => {
        button.classList.remove('flash');
    }, 200);
}

function topgbuttonflash(button, delay) {
    return new Promise((resolve) => {
        button.classList.add('flash');
        setTimeout(() => {
            button.classList.remove('flash');
            resolve();
        }, delay);
    });
}

function topgbuttonflash2(button, delay) {
    return new Promise((resolve) => {
        setTimeout(() => {
            button.classList.add('flash');
            resolve();
        }, delay);
    });
}

function topgbuttonflash3(button, delay) {
    return new Promise((resolve) => {
        setTimeout(() => {
            button.classList.remove('flash');
            resolve();
        }, delay);
    });
}

function userflash(button) {
    button.classList.add('userflash');
    setTimeout(() => {
        button.classList.remove('userflash');
    }, 200);
}
