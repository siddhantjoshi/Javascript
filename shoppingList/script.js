"use strict"

//items declare
const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');
const clearBtn = document.getElementById('clear');
const itemfilter = document.getElementById('filter');
const formBtn = itemForm.querySelector('button');
let editMode = false;

//display items in list
function displayItems() {
    const itemsFromstorage = getItemsfromStorage();
    itemsFromstorage.forEach((item) => {
        addItemToDOM(item);
    })
    checkUI();
}
//create a icon
function createIcon(classes) {
    const icon = document.createElement('i');
    icon.className = classes;
    return icon;
}
//create a button
function createButton(classes) {
    const button = document.createElement('button');
    button.className = classes;
    const icon = createIcon('fa-solid fa-xmark');
    button.appendChild(icon);
    return button;
}

// add element to list
function OnAddItemSubmit(item) {
    item.preventDefault();
    const newItem = itemInput.value;
    if (newItem === '') {
        alert("Please add an item");
        return;
    }

    if(editMode){
        const itemToEdit = itemList.querySelector('.edit-mode');
        removeItemFromStorage(itemToEdit);
        itemToEdit.classList.remove('edit-mode');
        itemToEdit.remove();
        editMode = false ;
    }else{
        if(chcekDuplicateItems(newItem)){
            alert("Item already exist");
            return;
        }
    }
    addItemToDOM(newItem);
    addItemTostorage(newItem);
    checkUI();
    itemInput.value = '';

}

//Add item to DOM
function addItemToDOM(item) {
    const li = document.createElement('li');
    li.appendChild(document.createTextNode(item));
    const button = createButton('remove-item btn-link text-red');
    li.appendChild(button);
    itemList.appendChild(li);

}

//add item to local Storage
function addItemTostorage(item) {
    const itemsFromstorage = getItemsfromStorage();
    itemsFromstorage.push(item);
    localStorage.setItem('items', JSON.stringify(itemsFromstorage));
}

//remove Item
function removeItem(item) {
    if (confirm('Are you sure?')) {
        item.remove();
        removeItemFromStorage(item.textContent);
        checkUI()
    }
}

//remove items from storage
function removeItemFromStorage(item) {
    let itemsFromstorage = getItemsfromStorage();
    itemsFromstorage = itemsFromstorage.filter((i) => i !== item);
    localStorage.setItem('items', JSON.stringify(itemsFromstorage));
}

function setItemtoEdit(item) {
    editMode = true;
    itemList.querySelectorAll('li').forEach((li)=> li.classList.remove('edit-mode'));
    // itemList.querySelectorAll('button').forEach((btn)=> btn.classList.add('hide'));
    item.classList.add('edit-mode');
    formBtn.innerHTML = '<i class = "fa-solid fa-pen"></i> Update Item'
    formBtn.style.backgroundColor = '#228B22'
    itemInput.value = item.textContent;
}

function OnClickItem(item) {
    if (item.target.parentElement.classList.contains('remove-item')) {
        removeItem(item.target.parentElement.parentElement);
    } else {
        setItemtoEdit(item.target);
    }
}

//check duplicate items
function chcekDuplicateItems(item){
    const itemsFromstorage = getItemsfromStorage();
    return itemsFromstorage.includes(item);
}

//clear list
function clearList() {
    while (itemList.firstChild) {
        itemList.removeChild(itemList.firstChild)
    }
    localStorage.removeItem('items');
    checkUI();
}

//check List items are present
function checkUI() {
    itemInput.value = '';
    const items = itemList.querySelectorAll('li');
    if (items.length === 0) {
        clearBtn.style.display = 'none';
        itemfilter.style.display = 'none';
    } else {
        clearBtn.style.display = 'block';
        itemfilter.style.display = 'block';
    }
    formBtn.innerHTML = '<i class = "fa-solid fa-plus"></i>  Add Item';
    formBtn.style.backgroundColor = '#333';
    editMode = false;
}

//get items form storage
function getItemsfromStorage() {
    let itemsFromstorage;
    if (localStorage.getItem('items') === null) {
        itemsFromstorage = [];
    } else {
        itemsFromstorage = JSON.parse(localStorage.getItem('items'));
    }
    return itemsFromstorage
}

//Filter list
function filterList(value) {
    const items = itemList.querySelectorAll('li');
    const text = value.target.value.toLowerCase();

    items.forEach((item) => {
        const itemText = item.firstChild.textContent.toLowerCase();
        if (itemText.indexOf(text) != -1) {
            item.style.display = 'flex';
        } else {
            item.style.display = 'none';
        }
    })

}

function init() {
    //Event Listener
    itemForm.addEventListener('submit', OnAddItemSubmit);
    itemList.addEventListener('click', OnClickItem);
    clearBtn.addEventListener('click', clearList);
    itemfilter.addEventListener('input', filterList);
    document.addEventListener('DOMContentLoaded', displayItems);
    checkUI();
}

init();