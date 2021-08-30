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

export const createDomRecipes = (obj) => {
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
    title.textContent = obj.name;
    let titleIcon = createElmtAndAttributs('span', {
        'class': 'card-title__icon'
    });
    let titleTime = createElmtAndAttributs('span', {
        'class': 'card-title__time'
    });
    titleTime.textContent = `${obj.time} min`;
    let cardDescrib = createElmtAndAttributs('div', {
        'class': 'card-describe'
    });
    let listIngredients = createElmtAndAttributs('ul', {
        'class': 'card-describe__ingredients',
        'aria-label': 'Ingredients'
    });
    for (let ing of obj.ingredients) {
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
    recetteContent.textContent = obj.description

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
    return card;
}

export const createTagsKeyWord = (obj) => {
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
    return content;
}

/** create Dom object for list of ingredients ustensils materiels */
export const createDomItems = (obj) => {
    let li = createElmtAndAttributs('li', {
        'class': 'label-content__li',
        'tabindex': '0',
        'data-type': `${obj.type}`
    });
    li.textContent = obj.name;
    return li;
}

export const createMsgError = (words) => {
    let elmt = document.createElement('div')
    elmt.setAttribute('class', "msg-error");
    elmt.textContent = words;
    return elmt
}
