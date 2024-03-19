//console.log("Hola pokeapi");
// Notesé que también en este caso `min` será incluido y `max` excluido
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}
//   getRandomInt(1, 151);
//   console.log(getRandomInt(1,151));
document.addEventListener("DOMContentLoaded", () => {
  const random = getRandomInt(1, 700);
  fetchData(random);
});

//Pasamos id como parametro
const fetchData = async (id) => {
  try {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const data = await res.json();
    // console.log(data);
    const pokemon = {
        img: data.sprites.other.dream_world.front_default,
        nombre: data.species.name,
        id: data.id,
        exp: data.base_experience,
        ps: data.stats[0].base_stat,
        attack: data.stats[1].base_stat,
        def: data.stats[2].base_stat,
        esp: data.stats[3].base_stat
    }
    pintarCard(pokemon);
  } catch (error) {
    console.log(error);
  }
};
//pintando la template
const pintarCard = (pokemon) => {
  console.log(pokemon);
  const flex = document.querySelector(".flex");

  const template = document.querySelector("#template-card").content;

  const clone = template.cloneNode(true);
  const fragment = document.createDocumentFragment();

  clone
    .querySelector(".card-body-img")
    .setAttribute("src", pokemon.img);

  clone.querySelector(
    ".card-body-title"
  ).innerHTML = `${pokemon.nombre} <hr>`;

  //clone.querySelector('.card-body-text').textContent = '#' + pokemon.id;

 clone.querySelector('#exp').textContent = 'N°'+pokemon.id +' - '+ pokemon.exp + 'exp';

  clone.querySelectorAll('.card-footer-social h3')[0].textContent = pokemon.ps;
  clone.querySelectorAll('.card-footer-social h3')[1].textContent = pokemon.attack;
  clone.querySelectorAll('.card-footer-social h3')[2].textContent = pokemon.def;
  clone.querySelectorAll('.card-footer-social h3')[3].textContent = pokemon.esp;
  

  fragment.appendChild(clone);
  flex.appendChild(fragment);
};
