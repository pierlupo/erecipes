import './App.css';
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import ModalComponent from "./shared/ModalComponent";
import { createPortal } from "react-dom";
import NavBar from "./components/navBar";
import MyButton from "./shared/MyButton";
import { authSignIn, setAuthsAction, signForm,setAuthMode, authLogOut } from "./components/Auth/authSlice";
import { removeRecipeAction, addRecipeAction,setRecipesAction } from "./components/recipes/recipesSlice";
import { BASE_DB_URL, SIGN_IN, SIGN_UP } from "./firebaseConfig";
import RecipeForm from "./components/recipes/RecipeForm";
import SignForm from "./components/Auth/SignForm";
import RecipeDisplay from './components/recipes/RecipeDisplay';


const App = () => {
  // const dispatch = useDispatch()
  // const recipes = useSelector(state => state.recipe.recipes)
  // const auth = useSelector(state => state.auth.user)
 
  const [recipes, setRecipes] = useState([])
  const [selectedRecipe, setSelectedRecipe] = useState(null)
  const signFormMode = useSelector(state => state.auth.authMode) 
  const user = useSelector(state => state.auth.user)
  //const recipes = useSelector(state => state.recipe.recipes)
  const [RecipeFormMode, setRecipeFormMode] = useState("")
  const dispatch = useDispatch()


  const signFormSubmitHandler = async (credentials) => {
    try {
      const URL = signFormMode === "Sign In" ? SIGN_IN : SIGN_UP

      const response = await fetch(URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(credentials)
      })

      if (!response.ok) {
        throw new Error("Il y a eu un problème lors de " + signFormMode === 'Sign In' ? "la connexion" : "l'enregistrement")
      }

      const data = await response.json() 
      dispatch(authSignIn(data))
       
    } catch (error) {
      console.error(error.message);
    }
  }

  const logOutHandler = () => {
    localStorage.removeItem('token')    
    dispatch(authLogOut())
  }

  const refreshRecipes = async () => {
    try {
      const response = await fetch(`${BASE_DB_URL}recipes.json`)

      if (!response.ok) {
        throw new Error("Il y a eu un problème lors de la récupération des contacts.")
      }

      const data = await response.json()

      const tmpArray = []

      for (const key in data) {
        tmpArray.push({id: key, ...data[key]})
      }

      setRecipes(tmpArray)

    } catch (error) {
      console.error(error.message);
    }
  }

  const setSelectedRecipeAndFormMode = ({recipe, mode}) => {
    setSelectedRecipe(recipe)
    setRecipeFormMode(mode)
  }

  const addRecipeHandler = async (recipe) => {
    if (user) {
      const token = user.idToken
      if (token) {
        try {
          const response = await fetch(`${BASE_DB_URL}recipes.json?auth=${token}`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(recipe)
          })

          if (!response.ok) {
            throw new Error("Il y a eu un souci lors de l'ajout d'une recette.")
          }

          const data = await response.json()

          setRecipes([...recipes, {id: data.name, ...recipe}])
          setRecipeFormMode("")

        } catch (error) {
          console.error(error.message);
        }
      }
    }
  }

  const editRecipeHandler = async ({id, ...recipe}) => {
    if (user) {
      const token = user.idToken
      if (token) {
        if (recipes.find(r => r.id === id)) {
          try {
            const response = await fetch(`${BASE_DB_URL}recipes/${id}.json?auth=${token}`, {
              method: "PATCH",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify(recipe)
            })

            if (!response.ok) {
              throw new Error("Il y a eu un souci lors de l'édition de la recette.")
            }

            const data = await response.json()

            setRecipes([...recipes.filter(r => r.id !== id), {id, ...data}])
            setRecipeFormMode("")
          } catch (error) {
            console.error(error.message);
          }
        }
      }
    }
  }

  const deleteRecipeHandler = async (recipeId) => {
    if (user) {
      const token = user.idToken
      if (token) {
        if (recipes.find(r => r.id === recipeId)) {
          try {
            const response = await fetch(`${BASE_DB_URL}recipes/${recipeId}.json?auth=${token}`, {
              method: "DELETE"
            })

            if (!response.ok) {
              throw new Error("Il y a eu un souci lors de la suppression de la recette.")
            }

            setRecipes([...recipes.filter(r => r.id !== recipeId)])
            setRecipeFormMode("")
          } catch (error) {
            console.error(error.message);
          }
        }
      }
    }
  }

  useEffect(() => {
    refreshRecipes()
  }, [])





  return (
    
    <div className="App">
      {signFormMode === "Sign In" && createPortal(<ModalComponent closeModal={() => dispatch(setAuthMode(""))} modalTitle={"Sign In"}>
        <SignForm mode="Sign In" onSubmit={signFormSubmitHandler} />
        </ModalComponent>, document.getElementById("modal-root"))}
      {signFormMode === "Sign Up" && createPortal(<ModalComponent closeModal={() => dispatch(setAuthMode(""))} modalTitle={"Sign Up"}>
        <SignForm mode="Sign Up" onSubmit={signFormSubmitHandler} />
      </ModalComponent>, document.getElementById("modal-root"))}
      {RecipeFormMode === "add" && createPortal(<ModalComponent closeModal={() => setRecipeFormMode("")} modalTitle="Add Recipe">
        <RecipeForm mode="add" onAdd={addRecipeHandler} />
      </ModalComponent>, document.getElementById("modal-root"))}
      {RecipeFormMode === "edit" && createPortal(<ModalComponent closeModal={() => setRecipeFormMode("")} modalTitle="Edit Recipe">
        <RecipeForm mode="edit" onEdit={editRecipeHandler} recipe={selectedRecipe} />
      </ModalComponent>, document.getElementById("modal-root"))}
      {RecipeFormMode === "delete" && createPortal(<ModalComponent closeModal={() => setRecipeFormMode("")} modalTitle="Delete Recipe">
        <RecipeForm mode="delete" onDelete={deleteRecipeHandler} recipe={selectedRecipe} />
      </ModalComponent>, document.getElementById("modal-root"))}
    <header><NavBar>
    {user ? (
              <button onClick={logOutHandler} className="ms-auto btn btn-secondary">Sign Out</button>
              ) : (
                <>
                  <button onClick={() => dispatch(setAuthMode("Sign Up"))} className="ms-auto btn btn-outline-info">Register</button>
                  <button onClick={() => dispatch(setAuthMode("Sign In"))} className="ms-2 btn btn-primary">Sign In</button>
                </>
            )}</NavBar>
    </header>
    <main className="container">
        <div className="row my-3">
          <div className="col-10 offset-1 rounded bg-dark text-light p-3">
            <div className="d-flex justify-content-between align-items-center">
              <h3>Recipes List</h3>
              {user && <button className="btn btn-success" onClick={() => setSelectedRecipeAndFormMode({mode: "add"})}><i className="bi bi-plus-circle"></i> Add</button>}
            </div>
            <hr />
            {recipes.length === 0 ? 
            <p>Il n'y a pas de recette dans la base de données !</p> : 
            recipes.map(recipe => <RecipeDisplay user={user} key={recipe.id} recipe={recipe} setSelectedRecipeAndFormMode={setSelectedRecipeAndFormMode} />)}
          </div>
        </div>
     </main>
    </div>
  );
}


export default App;
