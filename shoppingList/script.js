"use strict"

const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');

//create a icon
function createIcon(classes){
    const icon = document.createElement('i');
    icon.className = classes;
    return icon;
}
//create a button
function createButton(classes){
    const button = document.createElement('button');
    button.className = classes;
    const icon = createIcon('fa-solid fa-xmark');
    button.appendChild(icon);
    return button;
}

// add element to list
function addItem(item){
    item.preventDefault();
    const newItem = itemInput.value ;
    if (newItem === '') {
        alert("Please add an item");
        return ;
    }

    const li = document.createElement('li');
    li.appendChild(document.createTextNode(newItem));
    const button = createButton('remove-item btn-link text-red') ;
    li.appendChild(button);

    itemList.appendChild(li);
    itemInput.value = '';

}

itemForm.addEventListener('submit', addItem);

