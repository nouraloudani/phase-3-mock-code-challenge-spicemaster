// write your code here

// ******************* Dom Elements *****************
let spiceDiv = document.querySelector('#spice-blend-detail')
let updateForm = document.querySelector('#update-form')
let newIngForm = document.querySelector('#ingredient-form')

// ******************* Network  Requests *****************
let pageLoadFirstId = () => {
    fetch('http://localhost:3000/spiceblends/1')
    .then(res => res.json())
    .then(firstObj => showFirst(firstObj))
}

let updateTitle = newSpiceBlendObj => {
    fetch('http://localhost:3000/spiceblends/1', {
      method: "PATCH",
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(newSpiceBlendObj)
    })
    .then(res => res.json())
    .then(showUpdatedTitle)
}

let AddIngredient = (newIngredientdObj) => {
    fetch('http://localhost:3000/ingredients', {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(newIngredientdObj) 
    })
    .then(res => res.json())
    .then(showAddedIngredient)
}

// ******************* Events Listeners *****************
updateForm.addEventListener("submit", gatherFormData)
newIngForm.addEventListener("submit", gatherIngFormInfo)
// ******************* Dom Manipulation / functions *****************

let showFirst = (firstObj) =>{
    spiceDiv.innerHTML = `
        <img class="detail-image" src="${firstObj.image}" alt="Insert Name Here" />
        <h2 class="title">${firstObj.title}</h2>

        <div class="ingredients-container">
        <h4>Ingredients:</h4>
        <ul class="ingredients-list" data-id=${firstObj.id}>
        </ul>
    `
    firstObj.ingredients.forEach(ingredient => {
        let ingredientsList = document.querySelector('.ingredients-list')
        const li = document.createElement('li')
        li.innerText = ingredient.name
        ingredientsList.append(li)
    })

}
pageLoadFirstId()

function gatherFormData(e){
    e.preventDefault()
    const newTitle = e.target.title.value;
    const newSpiceBlendObj = {title: newTitle};
    updateTitle(newSpiceBlendObj)
}


function showUpdatedTitle(updatedTitle){
    const title = spiceDiv.querySelector('h2')
    title.innerText = updatedTitle.title
    spiceDiv.append(title)
}

function gatherIngFormInfo(e){
    e.preventDefault()
    const newIngredient = e.target.name.value;
    let ingredientsList = document.querySelector('.ingredients-list')
    let blendId = parseInt(ingredientsList.dataset.id);
    const newIngredientdObj = {name: newIngredient, spiceblendId: blendId}
    AddIngredient(newIngredientdObj)
}

function showAddedIngredient(ingredient){
    let ingredientsList = document.querySelector('.ingredients-list')
    let newLi = document.createElement('li')
    newLi.innerText = ingredient.name
    ingredientsList.append(newLi);
}