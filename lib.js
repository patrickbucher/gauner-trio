export const nOffenders = 3;

export const scoundrels = {
  "Elton Evil": {
    color: "yellow",
    image: "assets/1.png",
  },
  "Massimo Mozzarella": {
    color: "purple",
    image: "assets/2.png",
  },
  "Santiago Sosa": {
    color: "green",
    image: "assets/3.png",
  },
  "Mitch McMullins": {
    color: "blue",
    image: "assets/4.png",
  },
  "Stephen Snakeoil": {
    color: "brown",
    image: "assets/5.png",
  },
  "Jamey Jokings": {
    color: "black",
    image: "assets/6.png",
  },
  "Sonny Satan": {
    color: "red",
    image: "assets/7.png",
  },
};

export const nChooseK = (elements, k) => {
  const choices = [];
  const limit = Math.pow(2, elements.length);
  for (let i = 0; i < limit; i++) {
    let mask = i;
    const positions = [];
    for (let j = 0; j < elements.length; j++) {
      if (mask & (1 == 1)) {
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

export const createPortraits = (card, nMatches) => {
  const wrap = document.createElement("div");
  const div = document.createElement("div");
  wrap.setAttribute("class", "turn");
  div.setAttribute("class", "card");
  const matches = document.createElement("p");
  matches.innerHTML = `<strong>${nMatches}</strong>`;
  matches.setAttribute("class", `matches matches-${nMatches}`);
  for (let scoundrel of card) {
    const portrait = document.createElement("div");
    const img = document.createElement("img");
    const p = document.createElement("p");
    portrait.setAttribute("class", "portrait");
    img.setAttribute("src", scoundrels[scoundrel].image);
    img.setAttribute("width", "180px");
    p.setAttribute("class", "caption");
    p.innerHTML = scoundrel;
    portrait.appendChild(img);
    portrait.appendChild(p);
    div.appendChild(portrait);
  }
  wrap.appendChild(div);
  wrap.appendChild(matches);
  return wrap;
};
