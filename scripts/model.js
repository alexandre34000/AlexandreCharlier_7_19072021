/**
 * model2.js 1.0 juillet 2021 by Alexandre CHARLIER
 * Author : Alexandre CHARLIER.
 * GitHub : https://github.com/alexandre34000/AlexandreCharlier__19072021.
 * GitHub Pages : https://alexandre34000.github.io/AlexandreCharlier_7_19072021
 * Theme Name : Les petits plats .
 * Date: juillet 2021.
 * Description : fichier javascript pour le model(vrai) de l'algo 2.
 */

import { createDomRecipes, createTagsKeyWord, createDomItems, } from "./dom-object.js";

class ItemsObject {
    constructor(type, name) {
        this.type = type;
        this.name = name;
    }
}

/**
 * To create DOM 
 * @param {*} currentRecip 
 * @param {*} destination 
 * @returns Map with k: recipe and v :DOM
 */
export const createDom = (currentRecip, destination) => {
    return new Map(
        currentRecip.map((recipe) => {
            if (destination == 'menu') {
                return [recipe, createDomRecipes(recipe)];
            }
            else if (destination == 'listItems') {
                return [recipe, createDomItems(recipe)];
            }
            else if (destination == 'listTags') {
                return [recipe, createTagsKeyWord(recipe)];
            }
        })
    );
};


/**
 * Main search for filtering recipesMap by name, description and ingredients
 * @param {Map<recipes, Dom} currentRec 
 * @param {String} word 
 * @returns Map filtered
 */
export const toFilterMainInput = (currentRec, word) => {
    var value = word.toLocaleLowerCase();
    return new Map([...currentRec]
        .filter(([k, v]) => k.name.toLocaleLowerCase().includes(value) ||
            k.description.toLocaleLowerCase().includes(value) ||
            k.ingredients.some((ing) =>
                ing.ingredient.toLocaleLowerCase().includes(value)
            )))
};

/** build Object Set of ingredients, 
    appareils and ustensils and return list of Set */
export const toCreateAllListOfItems = (obj) => {
    let items = Array.from(obj.keys());
    return [toFilterIngredientsItems(items), tofilterApplianceItems(items), toFilterUstensilsItems(items)]
};

/**
 * to filter Appliance item's name and build object items
 * @param {Array<Object recipe>} listObjRecipe
 * @returns list of object items
 */
function tofilterApplianceItems(listObjRecipes) {
    let objSetAppareils = new Set(listObjRecipes.map((t) => t.appliance));
    return [...objSetAppareils].map((v) => new ItemsObject('appliance', v));
}

function toFilterIngredientsItems(items) {
    let objSetIngredients = new Set();
    items.map((ti) => ti.ingredients.map((tu) => objSetIngredients.add(tu.ingredient))
    );
    return ([...objSetIngredients].map((v) => new ItemsObject('ingredient', v)));
}

function toFilterUstensilsItems(items) {
    let objSetUstensils = new Set();
    items.map((ti) => ti.ustensils.map((tu) => objSetUstensils.add(tu))
    );
    return ([...objSetUstensils.values()].map((v) => new ItemsObject('ustensil', v)));
}

/**
 *  To create list of Map with key:items Object and value:DOM object
 * @param {Array} elmtsItems is three arrays of itemsObject ( appliances, ingredients, unstensils )
 * @return {Array} list of three Map<itemsobject , DOM li>
*/
export const toCreateDomItems = (elmtsItems) => {
    return elmtsItems.map((el) => createDom(el, 'listItems'));
}

/**
 * filter the Items displayed from input of second search
 * @param {Map<Items Object, li>} list 
 * @param {String} word 
 * @returns {Map<items Object, li>}
 */
export const filterList = (itemsMap, word) => {
    return new Map([...itemsMap].filter(([k, v]) => k.name.toLocaleLowerCase().includes(word.toLocaleLowerCase())));
}

/**  
 * used for filtered recipes with tags selected
 * @param { array of Object tags  } listObjectTags - is list of object with name type and color
 * @param {Map } objectRecipe - is the current recipes after primary search
 * @returns {array} return list of recipes
 */
export const toFilterMenuCardFromTags = (listObjectTags, objectRecipe) => {
    let objSet = new Set();
    listObjectTags.forEach((t) => {
        if (t.type == "ingredient") {
            [...objectRecipe.keys()].forEach((recipe) => recipe.ingredients
                .filter((ing) => ing.ingredient == t.name)
                .map(() => objSet.add(recipe))
            )
        }
        if (t.type == "appliance") {
            [...objectRecipe.keys()].filter((recipe) => recipe.appliance == t.name)
                .map((appl) => objSet.add(appl))
        }

        if (t.type == "ustensil") {
            [...objectRecipe.keys()].forEach((recipe) => recipe.ustensils
                .filter((t1) => t1 == t.name)
                .map(() => objSet.add(recipe))
            )
        }
    })
    return [...objSet];
}
