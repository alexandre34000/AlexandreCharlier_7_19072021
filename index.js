/** 
 * index.js 1.0 juillet 2021 by Alexandre CHARLIER  
 * Author : Alexandre CHARLIER.
 * GitHub : https://github.com/alexandre34000/AlexandreCharlier__19072021.
 * GitHub Pages : https://alexandre34000.github.io/AlexandreCharlier_7_19072021
 * Theme Name : Les petits plats .
 * Date: juillet 2021. 
 * Description : fichier javascript de la page index.
 */

import { recipes } from './recipes.js';
import { createDom, toCreateDomItems, toCreateAllListOfItems, toFilterMainInput, filterList, toFilterMenuCardFromTags } from './scripts/model.js';
import { createMsgError } from './scripts/dom-object.js'

const primarySearch = document.querySelector('#primary-search__input');
const secondarySearch = document.querySelectorAll('.label-input');
const labelBtn = document.querySelectorAll(".label-btn");
const containerCards = document.getElementById("content-main");
const containerTagsWordsKey = document.getElementById("selected-tags")
const containerListItem = document.querySelectorAll('.label-content');
const containerSecondarySearch = document.querySelectorAll('.label-header');

var initMapRecipes;
var currentMapRecipes;
var keyWordsList = [];
var domItems = [];


/*To add event listener */
primarySearch.addEventListener('input', (e) => {
    if (e.target.value.length > 1) {
        toFilterMain(e.target.value);
    }
});

secondarySearch.forEach((inp) => inp.addEventListener('input', toFilterSecondSearch));
secondarySearch.forEach((inp) => inp.addEventListener('focus', openDrop));
containerTagsWordsKey.addEventListener('mouseup', removeKeyWord);
containerTagsWordsKey.addEventListener('keydown', removeKeyWord);
labelBtn.forEach((btn) => btn.addEventListener('click', openDrop));
containerListItem.forEach((cont) => cont.addEventListener('mouseup', addKeyWord));
containerListItem.forEach((cont) => cont.addEventListener('keydown', addKeyWord));


/* Click on arrow for open screen of items list*/
function openDrop(e) {
    let currentParent = e.currentTarget.parentElement;
    if (currentParent.getAttribute('data-open') == "true") {
        currentParent.dataset.open = "false";
        currentParent.firstElementChild.placeholder = currentParent.getAttribute('data-name');
    } else {
        containerSecondarySearch.forEach((t) => t.dataset.open = "false");
        currentParent.dataset.open = "true";
        currentParent.firstElementChild.placeholder = `Recherche un ${currentParent.firstElementChild.id}`;
    }
}

/* Display menu cards and filter items */
function start(arrayOfRecipes) {
    initMapRecipes = createDom(arrayOfRecipes, 'menu');
    toFilterMain("");
}

/**
 * Check number of char> 2 in input main
 * init the current Map
 * display recipes
 * display list of items
 * @param {String} word 
 */
function toFilterMain(word) {
    currentMapRecipes = word.length > 2 ? toFilterMainInput(initMapRecipes, word) : initMapRecipes;
    if (currentMapRecipes.size != 0) {
        displayDom(currentMapRecipes, containerCards);
        toManageListOfItems(currentMapRecipes);
    } else {
        displayErrorMsg("Oups !!! il n'y a aucune recette qui correspond à votre selection");
    }
}

/**
 * to display messsage error
 * @param {String} words 
 */
function displayErrorMsg(words) {
    containerCards.replaceChildren();
    containerCards.appendChild(createMsgError(words));
}

/**
 * to create and display DOM List
 * @param {Map<recipe, DOM>} curMap 
 */
function toManageListOfItems(curMap) {
    domItems = toCreateDomItems(toCreateAllListOfItems(curMap));
    for (let i = 0; i < domItems.length; i++) {
        displayDom(domItems[i], containerListItem[i])
    }
}

/**
 * toFilter second input
 * @param {event} e 
 */
function toFilterSecondSearch(e) {
    let id = e.target.id;
    let word = e.target.value;
    if (id == 'ingrédient') {
        displayDom(filterList(domItems[0], word), containerListItem[0]);
    }
    if (id == "appareil") {
        displayDom(filterList(domItems[1], word), containerListItem[1]);
    }
    if (id == "ustensil") {
        displayDom(filterList(domItems[2], word), containerListItem[2]);
    }
}

/*remove keyWord of list and delete tags <li> */
function removeKeyWord(e) {
    if ((e.code === "Space" || e.code === "Enter" || e.button == 0) && e.target.className == "tags-label") {
        let index = keyWordsList.findIndex((id) => id.name === e.target.textContent);
        containerTagsWordsKey.removeChild(e.target.parentElement);
        keyWordsList.splice(index, 1);
        if (keyWordsList.length >= 1) {
            let domMenuTags = createDom(toFilterMenuCardFromTags(keyWordsList, currentMapRecipes), 'menu');
            displayDom(domMenuTags, containerCards);
        } else {
            displayDom(currentMapRecipes, containerCards);
        }
    }
}

/*Add keyWord selected in listTags and display tags<li> */
function addKeyWord(e) {
    if (e.code === "Space" || e.code === "Enter" || e.button == 0) {
        let nameClass = (e.target.parentElement.className).split(' ');
        if (!keyWordsList.find((t) => t.name === e.target.textContent)) {
            keyWordsList.push({
                name: e.target.textContent,
                type: e.target.dataset.type,
                color: nameClass[1]
            })
        }
        displayDom(createDom(keyWordsList, 'listTags'), containerTagsWordsKey);
        let domMenu = createDom(toFilterMenuCardFromTags(keyWordsList, currentMapRecipes), 'menu');
        displayDom(domMenu, containerCards);
    }
}

/**
 * 
 * @param {Map<recipe, DOM>} objMap 
 * @param {Element parent} nodeContainer 
 * @returns 
 */
const displayDom = (objMap, nodeContainer) => {
    nodeContainer.replaceChildren();
    [...objMap.values()].forEach((v) => nodeContainer.appendChild(v));
    return true;
};

/** Test if javascript is available in browser */
function testJs() {
    if (!primarySearch) {
        displayErrorMsg(" Pour vous offrir toutes les options, ce site a besoin de javascript pour fonctionner. Merci de l'activer");
    } else {
        start(recipes);
    }
}
testJs();