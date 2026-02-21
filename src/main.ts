import './style.css'
import Sortable, { Swap } from 'sortablejs'

const params = new URLSearchParams(window.location.search)
const itemsParam = params.get('items')

const appDiv = document.querySelector<HTMLDivElement>('#app')!
const names = itemsParam ? itemsParam.split(',') : []
let newNames = names
const originalIndexes = [...Array(30).keys()].map(String)
let newIndexes = [...originalIndexes]

for (let i = 0; i < 30; i++) {
  const name = names[i]
  const cell = document.createElement("div")
  cell.className = "cell"
  
  if (name && isDigit(name[1])) {
    cell.dataset.originalIndex = name.substring(0,2)
    cell.classList.add("changed")
    cell.textContent = name.substring(2)
    newNames[i] = name.substring(2)
    newIndexes[i] = name.substring(0,2)
  } else {    
    cell.textContent = name
    cell.dataset.originalIndex = String(i)
  }
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
      [newNames[evt.oldIndex],newNames[evt.newIndex]] = [newNames[evt.newIndex],newNames[evt.oldIndex]];
      [newIndexes[evt.oldIndex],newIndexes[evt.newIndex]] = [newIndexes[evt.newIndex],newIndexes[evt.oldIndex]]
    }
  }
})
const setDefaultBtn = document.querySelector<HTMLButtonElement>("#setDefault")
setDefaultBtn?.addEventListener("click", setDefault)

function setDefault() {
  const cells = document.querySelectorAll<HTMLButtonElement>(".cell")
  
  for (let i = 0; i < 30; i++) {
    const cell = cells[i]
    cell.dataset.originalIndex = String(i)
    cell.classList.remove("changed")
  }

  newIndexes = [...originalIndexes]
}

const copyBtn = document.querySelector<HTMLButtonElement>("#copy")
copyBtn?.addEventListener("click", copyURL)

function copyURL() {
  let items = ''
  for (let i = 0; i < 30; i++) {
    if (newIndexes[i] != originalIndexes[i]) {
      items += newIndexes[i].padStart(2,'0')
    }
    items += newNames[i]
    items += ','
  }
  navigator.clipboard.writeText(`${window.location.href.split('?')[0]}?items=${items}`.replace(' ','+'))
  copyBtn!.textContent = "Copied!"
  setTimeout(() => {copyBtn!.textContent = "Copy Link"}, 1000)
}

function isDigit(char: string) { return /\d/.test(char) }