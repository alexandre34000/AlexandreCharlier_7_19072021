/** 
 * index.js 1.0 juillet 2021 by Alexandre CHARLIER  
 * Author : Alexandre CHARLIER.
 * GitHub : https://github.com/alexandre34000/AlexandreCharlier__19072021.
 * GitHub Pages : https://alexandre34000.github.io/AlexandreCharlier_7_19072021
 * Theme Name : Les petits plats .
 * Date: juillet 2021. 
 * Description : fichier javascript principal.
 */

import { recipes } from './recipes.js';
import { displayMsgError, displayRecipes, displayItems, displayTags } from './scripts/dom-object.js';
import { toFilterRecipesFromTags, toFilterList, filterRecipesFromFirstInput } from './scripts/filter-object.js';

const primarySearch = document.querySelector('#primary-search__input');
const secondarySearch = document.querySelectorAll('.label-input');
const labelHeader = document.querySelectorAll('.label-header');
const containerListItem = document.querySelectorAll('.label-content');
const containerTagsWordsKey = document.getElementById("selected-tags");

var myCurrentRecipes;
var tagsList = [];

primarySearch.addEventListener('input', toCheckInputPrimarySearch);
labelHeader.forEach((btn) => btn.addEventListener('click', toDisplayList));
secondarySearch.forEach(inp => inp.addEventListener('input', toCheckInputSecondarySearch));
secondarySearch.forEach(inp => inp.addEventListener('focus', toDisplayList))
containerListItem.forEach((cont) => cont.addEventListener('mouseup', addTags));
containerListItem.forEach((cont) => cont.addEventListener('keydown', addTags));
containerTagsWordsKey.addEventListener('mouseup', removeTags);
containerTagsWordsKey.addEventListener('keydown', removeTags);

/**
 * display recipes or message if empty and display List of items
 * @param {Array of Objects} listOfRecipes 
 */
function toCheckIfRecipesIsEmpty(listOfRecipes) {
    if (listOfRecipes.length > 0) {
        myCurrentRecipes = listOfRecipes;
        displayRecipes(myCurrentRecipes);
        containerListItem.forEach((c) => {
            displayItems(toCreateList(c.id, myCurrentRecipes), c)
        })
    } else {
        displayMsgError("Oups!! pas de recettes trouvées.")
    }
}

/**
 * test the length of entries main input and dispatch
 * @param {event*} e 
 */
function toCheckInputPrimarySearch(e) {
    if (e.target.value.length == 2) {
        toCheckIfRecipesIsEmpty(recipes);
    } else if (e.target.value.length > 2) {
        toCheckIfRecipesIsEmpty(filterRecipesFromFirstInput(e.target.value, recipes));
    }
}

/**
 * for filter the list by the chars enter by user and display it
 * @param {event input*} e 
 */
function toCheckInputSecondarySearch(e) {
    let parent = document.getElementById(e.target.parentElement.nextElementSibling.id);
    let parentId = parent.id;
    if (e.target.value.length >= 1) {
        let listItems = toFilterList(e.target.value.toLocaleLowerCase(), parentId, myCurrentRecipes)
        displayItems(listItems, parent);
    }
}

/**
 * find all items for each items list
 * @param {*String} itemName 
 * @returns list of String 
 */
function toCreateList(itemName, obj) {
    let listOfItems = new Set();
    switch (itemName) {
        case 'details-first':
            obj.forEach((ings) => ings.ingredients.map((ing) => listOfItems.add(ing.ingredient)));
            break;
        case 'details-second':
            obj.forEach((appl) => listOfItems.add(appl.appliance));
            break;
        case 'details-third':
            obj.forEach((usts) => usts.ustensils.map((ust) => listOfItems.add(ust)));
            break;
        default:
            listOfItems.add(" il n'y a pas d'elements disponibles");
    }
    return [...listOfItems].sort()
}

/**
 * Change visibility of item's list when clicked on label or second input have focus
 * @param {event} e 
 */
function toDisplayList(e) {
    let pElmt = e.target.parentElement;
    let state = pElmt.dataset.open;
    if (state == "false") {
        labelHeader.forEach(el => {
            el.dataset.open = "false";
            el.firstElementChild.placeholder = el.getAttribute('data-name')
        });
        toOpenDropDown(pElmt, "true");
        pElmt.firstElementChild.focus();
    } else if (state == "true" && (e.target.tagName == "DIV" || e.target.tagName == "BUTTON")) {
        toOpenDropDown(pElmt, "false");
    }
}

/**
 *  Change the attributs and placeholder text
 * @param {*element Parent} el 
 * @param {String} state 
 */
function toOpenDropDown(el, state) {
    el.setAttribute("data-open", `${state}`);
    el.setAttribute("aria-expanded", `${state}`);
    if (state == 'true') {
        el.firstElementChild.placeholder = `rechercher un ${el.dataset.name}`;
    }
    else {
        el.firstElementChild.placeholder = `${el.dataset.name}`;
    }
}

/**
 * Add keyWord selected from item's list to tags list and display all<li> 
 * @param {event} e 
 */
function addTags(e) {
    let parentClass = e.target.parentElement.className.split(" ");
    if (e.code === "Space" || e.code === "Enter" || e.button == 0) {
        if (!tagsList.find((tag) => tag.name === e.target.textContent)) {
            let objTags = Object.create(null);
            objTags.name = e.target.textContent;
            objTags.color = parentClass[1];
            objTags.type = e.target.parentElement.getAttribute('name');
            tagsList.push(objTags);
        }
        displayTags(tagsList)
        let curRecipes = toFilterRecipesFromTags(tagsList, myCurrentRecipes)
        displayRecipes(curRecipes);
        containerListItem.forEach((c) => {
            displayItems(toCreateList(c.id, curRecipes), c)
        })
    }
}

function removeTags(e) {
    if ((e.code === "Space" || e.code === "Enter" || e.button == 0) && e.target.className == "tags-label") {
        let index = tagsList.findIndex((id) => id.name === e.target.textContent);
        containerTagsWordsKey.removeChild(e.target.parentElement);
        tagsList.splice(index, 1);
        displayTags(tagsList);
        if (tagsList.length >= 1) {
            let arrayRecipes = toFilterRecipesFromTags(tagsList, myCurrentRecipes);
            displayRecipes(arrayRecipes);
            containerListItem.forEach((c) => {
                displayItems(toCreateList(c.id, arrayRecipes), c)
            })
        } else {
            displayRecipes(myCurrentRecipes);
            containerListItem.forEach((c) => {
                displayItems(toCreateList(c.id, myCurrentRecipes), c)
            })
        }
    }
}

/** Test if javascript is available in browser */
function testJs() {
    if (!primarySearch) {
        displayErrorMsg(" Pour vous offrir toutes les options, ce site a besoin de javascript pour fonctionner. Merci de l'activer");
    } else {
        toCheckIfRecipesIsEmpty(recipes);
    }
}

/** Start */
testJs();
