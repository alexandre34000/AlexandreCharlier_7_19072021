/** 
 * filter-object.js 1.0 juillet 2021 by Alexandre CHARLIER  
 * Author : Alexandre CHARLIER.
 * GitHub : https://github.com/alexandre34000/AlexandreCharlier__19072021.
 * GitHub Pages : https://alexandre34000.github.io/AlexandreCharlier_7_19072021
 * Theme Name : Les petits plats .
 * Date: juillet 2021. 
 * Description : fichier javascript pour le filtrage des elements des recettes.
 */

/**
 * filter current Object recipes from word entrie inside the main input
 * @param {*String} word 
 * @returns array of Objects recipes
 */
 export const filterRecipesFromFirstInput = (word, recipes) => {
    let wordLowerCase = word.toLocaleLowerCase();
    let myCurrentArray = [];
    recipes.forEach((recipe) => {
        if (recipe.name.toLocaleLowerCase().indexOf(wordLowerCase) !== -1 ||
            recipe.description.toLocaleLowerCase().indexOf(wordLowerCase) !== -1 ||
            recipe.ingredients.some((ing) => ing.ingredient.toLocaleLowerCase().indexOf(wordLowerCase) !== -1)) {
            myCurrentArray.push(recipe);
        }
    })
    return myCurrentArray;
}

/**
 * to filter list of items from second entries input
 * @param {String*} inputWord 
 * @param {String} itemName 
 * @returns list of string
 */
 export function toFilterList(inputWord, itemName, recipes) {
    let itemsFiltered = new Set();
    switch (itemName) {
        case 'details-first':
            recipes.forEach((recipe) => {
                recipe.ingredients
                    .filter((ing) => ing.ingredient.toLocaleLowerCase().indexOf(inputWord) !== -1)
                    .map((t) => itemsFiltered.add(t.ingredient))
            });
            break;
        case 'details-second':
            recipes.filter((appl) => appl.appliance.toLocaleLowerCase().indexOf(inputWord) !== -1)
                .map((t) => itemsFiltered.add(t.appliance));
            break;
        case 'details-third':
            recipes.map((usts) => usts.ustensils.filter((usten) => usten.toLocaleLowerCase().indexOf(inputWord) !== -1)
                .map((ust) => itemsFiltered.add(ust)));
            break;
        default:
            itemsFiltered.add(" il n'y a pas d'elements disponibles");
    }
    if (itemsFiltered.size == 0) {
        itemsFiltered.add(" il n'y a pas d'elements disponibles");
    }
    return [...itemsFiltered].sort();
}


/**
 * Filter recipes from list of tags
 * @param {list of object tags} tags 
 * @param {list of object recipes} recipes 
 * @returns list of object recipes filtered
 */
export const toFilterRecipesFromTags = (tags, recipes) =>{
    let currentRecipesFromTags = new Set();
    tags.forEach(t => {
        switch (t.type) {
            case "Ingredients":
                console.log(t.type)
                recipes.map((recipe) => recipe.ingredients
                    .filter((ings) => ings.ingredient.includes(t.name))
                    .map(() => currentRecipesFromTags.add(recipe))
                );
                break;
            case "Appliance":
                recipes.filter((recipe) => recipe.appliance.includes(t.name))
                    .map((appl) => currentRecipesFromTags.add(appl));
                break;
            case "Ustensils":
                recipes.map((recipe) => recipe.ustensils.filter((ust) => ust.includes(t.name)).map((to) => currentRecipesFromTags.add(recipe)))
                break;
            default:
                console.log("c'est pas bon");
        }
    })
   return [...currentRecipesFromTags] 
}
