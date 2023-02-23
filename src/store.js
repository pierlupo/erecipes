import { configureStore} from "@reduxjs/toolkit"
import recipesSlice from "./components/recipes/recipesSlice"
import authSlice from "./components/Auth/authSlice"

const store = configureStore({
    reducer: {
        auth: authSlice,
        recipes: recipesSlice
        
    }
})

export default store