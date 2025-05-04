const treasureMapSize = document.querySelector('[alt="map"]');

const hint = document.getElementById('hint');
const hints = [
    'veryCold',
    'cold',
    'warm',
    'hot',
]



// --------------   получить рандомное число по размеру карты
function randomNumber(size){
    return Math.floor(Math.random() * size)
};
// ------------  создать координаты клада
function generateTreasureCoords (e) {
    let x = randomNumber(e.width)
    let y = randomNumber(e.height);
    return {x, y}
};

let treasureCoords = generateTreasureCoords(treasureMapSize);

// --------- получить дистанцию до клада по теореме Пифагора, принимает 2 объекта это клик и клад
function getDistanceToTreasure(clickCoord, treasureCoord){
    return Math.sqrt((clickCoord.x - treasureCoord.x) ** 2 + (clickCoord.y - treasureCoord.y) ** 2)
}

const mapClick = ({clientX, clientY}) => {
    const userClickCoords = {
        x: clientX,
        y: clientY
    };
    const distance = getDistanceToTreasure(userClickCoords, treasureCoords);
    generateHint(distance, hint)
}

treasureMapSize.addEventListener('click', mapClick);

function makeHint(hintName, elem, distance) {
    elem.classList.add(hintName);
    if(distance < 50) {
        elem.textContent = 'ГОРЯЧО';
    } else if (distance < 150) {
        elem.textContent = 'ТЕПЛО';
    } else if (distance < 250) {
        elem.textContent = 'ПРОХЛАДНО';
    } else {
        elem.textContent = 'ЛЮТЫЙ МОРОЗ!';
    }
};

function removePrevClass(elem) {
    hints.forEach((cls) => {
        if(elem.classList.contains(cls)) {
            elem.classList.remove(cls);
        }
    })
}

function generateHint(distance, elem) {
    removePrevClass(elem)
    if(distance < 50) {
        makeHint('hot', elem, distance);
        endGame()
    } else if (distance < 150) {
        makeHint('warm', elem, distance);
    } else if (distance < 250) {
        makeHint('cold', elem, distance);
    } else {
        makeHint('veryCold', elem, distance);
    }
};

function endGame(){
    const newImg = ({clientX, clientY}) => {
        clientCorrds = {x: clientX, y: clientY}
        const treasureBox = document.createElement('img');
        treasureBox.src = 'img/treasureBox.png'
        treasureBox.style.left = `${clientCorrds.x - 20}px`
        treasureBox.style.top = `${clientCorrds.y - 20}px`
        const imgWrapper = document.getElementById('imgWrapper').append(treasureBox);
        treasureBox.classList.add('treasureBox');
    }
    imgWrapper.addEventListener('click',newImg);
    
    treasureMapSize.removeEventListener('click', mapClick);
}



















