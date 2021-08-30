/** 
 * menuCard2.js 1.0 juillet 2021 by Alexandre CHARLIER  
 * Author : Alexandre CHARLIER.
 * GitHub : https://github.com/alexandre34000/AlexandreCharlier__19072021.
 * GitHub Pages : https://alexandre34000.github.io/AlexandreCharlier_7_19072021
 * Theme Name : Les petits plats .
 * Date: juillet 2021. 
 * Description : fichier javascript pour les composants menuCard de l'algo2.
 */

const append = (parentElm, childElm) => {
    return parentElm.appendChild(childElm);
}

const createElmtAndAttributs = (element, attributes) => {
    let el = document.createElement(element);
    Object.entries(attributes).forEach(([key, value]) =>
        el.setAttribute(key, value));
    return el;
}

/**
 * To display recipes
 * @param {*Array of Object} recipes 
 */
export const displayRecipes = (recipes) => {
    let fragment = new DocumentFragment();
    let parentElement = document.getElementById("content-main");
    parentElement.replaceChildren();
    recipes.forEach((recipe) => {
        let card = createElmtAndAttributs('section', {
            'class': 'card',
            'aria-label': 'une recette de',
            'tabindex': '0'
        });
        let cardHeader = createElmtAndAttributs('div', {
            'class': 'card-header'
        });
        let cardMain = createElmtAndAttributs('div', {
            'class': 'card-main'
        });
        let cardTitle = createElmtAndAttributs('div', {
            'class': 'card-title'
        });
        let title = createElmtAndAttributs('h2', {
            'class': 'card-title__h2'
        });
        title.textContent = recipe.name;
        let titleIcon = createElmtAndAttributs('span', {
            'class': 'card-title__icon'
        });
        let titleTime = createElmtAndAttributs('span', {
            'class': 'card-title__time'
        });
        titleTime.textContent = `${recipe.time} min`;
        let cardDescrib = createElmtAndAttributs('div', {
            'class': 'card-describe'
        });
        let listIngredients = createElmtAndAttributs('ul', {
            'class': 'card-describe__ingredients',
            'aria-label': 'Ingredients'
        });
        for (let ing of recipe.ingredients) {
            var ingredients = createElmtAndAttributs('li', {
                'class': 'card-describe__ingredients-list'
            });
            var ingredientsName = document.createElement('span');
            ingredientsName.textContent = `${ing.ingredient}: `;
            var ingredientsQty = document.createElement('span');
            var unit = ing.unit ? ing.unit : "";
            var qty = ing.quantity ? ing.quantity : "";
            ingredientsQty.textContent = `${qty} ${unit}`;
            append(ingredients, ingredientsName);
            append(ingredients, ingredientsQty);
            append(listIngredients, ingredients);
        }
        let recetteContent = createElmtAndAttributs('div', {
            'class': 'card-describe__recette overflow',
            'aria-label': 'Recette'
        });
        let recetteText = createElmtAndAttributs('p', {
            'class': 'card-describe__recette-text'
        });
        recetteContent.textContent = recipe.description
        append(recetteContent, recetteText);
        append(cardDescrib, listIngredients);
        append(cardDescrib, recetteContent);
        append(cardTitle, title);
        append(cardTitle, titleIcon);
        append(cardTitle, titleTime)
        append(cardMain, cardTitle);
        append(cardMain, cardDescrib);
        append(card, cardHeader);
        append(card, cardMain);
        append(fragment, card);
    });
    append(parentElement, fragment);
}


/**
 * To display Tags selected
 * @param {*Map} arrayOfObject 
 */
export const displayTags = (arrayOfObject) => {
    let fragmentTags = new DocumentFragment();
    let parentElementTags = document.getElementById("selected-tags");
    parentElementTags.replaceChildren();
    arrayOfObject.forEach((obj)=>{
    let content = createElmtAndAttributs('li', {
        'class': `tags ${obj.color}`
    });
    let inp = createElmtAndAttributs('input', {
        'class': 'tags-input',
        'type': 'checkbox',
        'name': `${obj.name}`,
        'id': `${obj.name}`
    });
    let lbl = createElmtAndAttributs('label', {
        'class': 'tags-label',
        'for': `${obj.name}`,
        'tabindex': '0'
    });
    lbl.textContent = obj.name;

    append(content, inp);
    append(content, lbl);
    append(fragmentTags, content);
})
    append(parentElementTags, fragmentTags);
}

/**
 * Create Dom object for list of ingredients ustensils materiels 
 * @param {Array String*} listItems 
 * @param {HTML element} elmParent 
 */
export const displayItems = (listItems, elmParent) => {
    let fragmentList = new DocumentFragment();
    elmParent.replaceChildren();
    listItems.forEach((liItems) => {
        let li = createElmtAndAttributs('li', {
            'class': 'label-content__li',
            'tabindex': '0',
        });
        li.textContent = liItems;
        append(fragmentList, li);
    })
    append(elmParent, fragmentList);
}

export const displayMsgError = (words) => {
    let parentElement = document.getElementById("content-main");
    parentElement.replaceChildren();
    let elmt = document.createElement('div')
    elmt.setAttribute('class', "msg-error");
    elmt.textContent = words;
    append(parentElement, elmt);
}
