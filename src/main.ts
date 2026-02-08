import './style.css'
import Sortable, { Swap } from 'sortablejs';

const params = new URLSearchParams(window.location.search);
const itemsParam = params.get('items')

const appDiv = document.querySelector<HTMLDivElement>('#app')!;
const names = itemsParam ? itemsParam.split(',') : [];

for (let i = 0; i < 30; i++) {
  const cell = document.createElement("div");
  cell.className = "cell";
  cell.textContent = names[i];

  appDiv.appendChild(cell);
}

Sortable.mount(new Swap());
Sortable.create(appDiv, {
  swap: true,
  animation: 250,
})
