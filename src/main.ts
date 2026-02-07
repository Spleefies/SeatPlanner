import './style.css'
import Sortable, { Swap } from 'sortablejs';

const params = new URLSearchParams(window.location.search);
const itemsParam = params.get('items')

const names = itemsParam ? JSON.parse(itemsParam) : [];

for (let i = 0; i < 30; i++) {
  const cell = document.createElement("div");
  cell.className = "cell";
  cell.textContent = names[i];

  document.querySelector<HTMLDivElement>('#app')!.appendChild(cell);
}

Sortable.mount(new Swap());
Sortable.create(document.querySelector<HTMLDivElement>('#app')!, {
  swap: true,
  animation: 250,
})
