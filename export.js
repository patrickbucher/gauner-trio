import { nOffenders, scoundrels, nChooseK, createPortraits } from "./lib.js";

document.addEventListener("DOMContentLoaded", (event) => {
  const cards = nChooseK(Object.keys(scoundrels), nOffenders);
  const container = document.getElementById("cards");
  for (const card of cards) {
    const div = createPortraits(card, 0);
    container.appendChild(div);
  }

  const matchDiv = document.getElementById("buttons");
  const pick = new Set(cards[0]);
  const matches = new Map([
    [0, 0],
    [1, 0],
    [2, 0],
  ]);
  for (let i = 1; i < cards.length; i++) {
    const common = pick.intersection(new Set(cards[i])).size;
    matches.set(common, matches.get(common) + 1);
  }
  for (const [match, n] of matches) {
    for (let i = 0; i < n; i++) {
      const button = document.createElement("p");
      button.innerHTML = `<strong>${match}</strong>`;
      button.setAttribute("class", `matches matches-${match}`);
      matchDiv.appendChild(button);
    }
  }

  // <br> between first name and last name
  const captions = document.querySelectorAll("p.caption");
  for (const caption of captions) {
    const wrapped = caption.innerHTML.split(" ").join("<br>");
    console.log(wrapped);
    caption.innerHTML = wrapped;
  }
});
