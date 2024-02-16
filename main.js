const nOffenders = 3;
const scoundrels = {
    'Elton Evil': {
        'color': 'yellow',
        'image': 'assets/1.png'
    },
    'Massimo Mozzarella': {
        'color': 'purple',
        'image': 'assets/2.png'
    },
    'Santiago Sosa': {
        'color': 'green',
        'image': 'assets/3.png'
    },
    'Mitch McMullins': {
        'color': 'blue',
        'image': 'assets/4.png'
    },
    'Stephen Snakeoil': {
        'color': 'brown',
        'image': 'assets/5.png'
    },
    'Jamey Jokings': {
        'color': 'black',
        'image': 'assets/6.png'
    },
    'Sonny Satan': {
        'color': 'red',
        'image': 'assets/7.png'
    }
};

const nChooseK = (elements, k) => {
    const choices = [];
    const limit = Math.pow(2, elements.length);
    for (let i = 0; i < limit; i++) {
        let mask = i;
        const positions = [];
        for (let j = 0; j < elements.length; j++) {
            if (mask & 1 == 1) {
                positions.push(j);
            }
            mask >>= 1;
        }
        if (positions.length == k) {
            const names = [];
            for (let position of positions) {
                names.push(elements[position]);
            }
            choices.push(names);
        }
    }
    return choices;
};

const createPortraits = (card, nMatches) => {
    const div = document.createElement('div');
    div.setAttribute('class', 'card');
    const matches = document.createElement('p');    
    matches.setAttribute('class', 'matches');
    matches.innerHTML = `<strong>${nMatches}</strong> Treffer`;
    div.appendChild(matches);
    for (let scoundrel of card) {
        const portrait = document.createElement('div');    
        const img = document.createElement('img');
        const p = document.createElement('p');
        portrait.setAttribute('class', 'portrait');
        img.setAttribute('src', scoundrels[scoundrel].image);
        img.setAttribute('width', '180px');
        p.setAttribute('class', 'caption');
        p.innerHTML = scoundrel;
        portrait.appendChild(img);
        portrait.appendChild(p);
        div.appendChild(portrait);
    }
    return div;
};

const cards = nChooseK(Object.keys(scoundrels), nOffenders);
const offenderCardIndex = Math.floor(Math.random() * cards.length);
const offenderCard = cards[offenderCardIndex];
let stack = [];
for (let i = 0; i < cards.length; i++) {
    if (i != offenderCardIndex) {
        stack.push(cards[i]);
    }
}

const scoundrelTable = document.getElementById('scoundrels');
for (const name in scoundrels) {
    const color = scoundrels[name].color;
    const tr = document.createElement('tr');
    const tdName = document.createElement('td');
    const spanColor = document.createElement('span');
    const spanName = document.createElement('span');
    const tdGuilty = document.createElement('td');
    const tdUnclear = document.createElement('td');
    const tdNotGuilty = document.createElement('td');
    const optionGuilty = document.createElement('input');
    const optionUnclear = document.createElement('input');
    const optionNotGuilty = document.createElement('input');
    optionGuilty.setAttribute('type', 'radio');
    optionGuilty.setAttribute('class', 'guilty');
    optionUnclear.setAttribute('type', 'radio');
    optionNotGuilty.setAttribute('type', 'radio');
    optionGuilty.setAttribute('name', name);
    optionUnclear.setAttribute('name', name);
    optionUnclear.setAttribute('checked', 'checked');
    optionNotGuilty.setAttribute('name', name);
    optionGuilty.setAttribute('value', 'guilty');
    optionUnclear.setAttribute('value', 'unclear');
    optionNotGuilty.setAttribute('value', 'notGuilty');
    spanName.innerHTML = name;
    spanColor.setAttribute('class', 'color');
    spanColor.setAttribute('style', `background-color: ${color}`);
    spanColor.innerHTML = '&nbsp;';
    tdName.appendChild(spanColor);
    tdName.appendChild(spanName);
    tdGuilty.appendChild(optionGuilty);
    tdUnclear.appendChild(optionUnclear);
    tdNotGuilty.appendChild(optionNotGuilty);
    tr.appendChild(tdName);
    tr.appendChild(tdGuilty);
    tr.appendChild(tdUnclear);
    tr.appendChild(tdNotGuilty);
    scoundrelTable.appendChild(tr);
}

const message = document.getElementById('status');
const nextCard = document.getElementById('next-card');
const cardArea = document.getElementById('cards');
let moves = 0;
nextCard.addEventListener('click', e => {
    if (stack.length == 0) {
        message.innerHTML = 'Es gibt keine Karte mehr auf dem Stapel.';
        return;
    }
    const pickIndex = Math.floor(Math.random() * stack.length);
    const pick = stack[pickIndex];
    const lower = stack.slice(0, pickIndex); 
    const upper = stack.slice(pickIndex + 1);
    stack = lower.concat(upper);
    let nMatches = 0;
    for (let suspect of pick) {
        for (let offender of offenderCard) {
            if (offender == suspect) {
                nMatches++;
                continue;
            }
        }
    }
    const portraits = createPortraits(pick, nMatches);
    cardArea.appendChild(portraits);
    moves++;
});

const newGame = document.getElementById('new-game');
newGame.addEventListener('click', e => {
    location.reload();
});

const accuse = document.getElementById('accuse');
accuse.addEventListener('click', e => {
    let accusations = document.querySelectorAll('input[type="radio"].guilty');
    const accusedNames = [];
    for (let accusation of accusations) {
        if (accusation.checked) {
            accusedNames.push(accusation.getAttribute('name'));
        }
    }
    if (accusedNames.length != nOffenders) {
        message.innerHTML = `Die Verbrecherbande umfasst genau ${nOffenders} Ganoven!`;
        return;
    }
    let correct = 0;
    for (let accusation of accusedNames) {
        for (let offender of offenderCard) {
            if (accusation == offender) {
                correct++;
                continue
            }
        }
    }
    if (correct == nOffenders) {
        message.innerHTML = `Gratulation! Sie haben die Bande nach ${moves} Hinweisen überführt!`;
    } else {
        message.innerHTML = 'Falsch! Sie konnten die Bande nicht überführen.';
    }
});
