import { createSlice } from "@reduxjs/toolkit";
let count = 0;

const recipesSlice = createSlice({
    name: "recipe",
    initialState: {
        formMode: "",
        recipes: [],
        selectedRecipe: null,
        ingredients: [

            {id: 1, name: "Tomates"},
            {id: 2, name: "Pommes de terre"},
            {id: 3, name: "Courgettes"},
            {id: 4, name: "Aubergines"},
            {id: 5, name: "Navets"},
            {id: 6, name: "Carottes"},
            {id: 7, name: "Concombres"},
            {id: 8, name: "Haricots verts"},
            {id: 9, name: "Lentilles"},
            {id: 10, name: "Petits Pois"},
            {id: 11, name: "Oignon"},
            {id: 12, name: "Ail"},
            {id: 13, name: "Beurre"},
            {id: 14, name: "Crème fraîche"},
            {id: 15, name: "Huile d'olive"},
            {id: 16, name: "Sel"},
            {id: 17, name: "Poivre"},
            {id: 18, name: "Noix de muscade"},
            {id: 19, name: "Herbes de Provence"},
            {id: 20, name: "Origan"},
            {id: 21, name: "Spaghetti"},
            {id: 22, name: "Lardons"},
            {id: 23, name: "Viande de boeuf hâchée"},
            {id: 24, name: "Citron"},
            {id: 25, name: "Pomme"},
            {id: 26, name: "Orange"},
            {id: 27, name: "Kiwi"},
            {id: 28, name: "Banane"},
            {id: 29, name: "Abricot"},
            {id: 30, name: "Fraise"},

        ],
        isLoading: false,
        error: null
    },
    reducers: {
        addRecipeAction (state, action) {
            state.recipes.push({id: ++count, title: action.payload})
        },
        removeRecipeAction (state, action) {
            state.recipes = state.recipes.filter(r => r.id !== action.payload)
        },
        setRecipesAction(state, action) {
            state.recipes = []
            const texts = action.payload
            for(const t of texts){
                    state.recipes.push({id: ++count, title: t})
                }
            }
        }
    })

export const { addRecipeAction, removeRecipeAction, setRecipesAction } = recipesSlice.actions

export default recipesSlice.reducer