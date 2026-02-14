import './style.css'
import Sortable, { Swap } from 'sortablejs'

const params = new URLSearchParams(window.location.search)
const itemsParam = params.get('items')

const appDiv = document.querySelector<HTMLDivElement>('#app')!
const names = itemsParam ? itemsParam.split(',') : []
let newNames = names

for (let i = 0; i < 30; i++) {
  const cell = document.createElement("div")
  cell.className = "cell"
  cell.textContent = names[i]
  cell.dataset.originalIndex = String(i)

  appDiv.appendChild(cell)
}

Sortable.mount(new Swap())
Sortable.create(appDiv, {
  swap: true,
  animation: 250,
  onSort(evt){
    const dragged = evt.item
    const swapped = evt.swapItem

    if (swapped) {
      if (evt.newIndex!=dragged.dataset.originalIndex)
        dragged.classList.add("changed")
      else dragged.classList.remove("changed")

      if (evt.oldIndex!=swapped.dataset.originalIndex)
        swapped.classList.add("changed")
      else swapped.classList.remove("changed")
    }
    if (evt.oldIndex && evt.newIndex) {
      [newNames[evt.oldIndex],newNames[evt.newIndex]] = [newNames[evt.newIndex],newNames[evt.oldIndex]]
    }
  }
})

