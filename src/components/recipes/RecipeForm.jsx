import { useRef } from "react";
import { useSelector } from "react-redux";

const RecipeForm = (props) => {
  const mode = props.mode
  const recipe = props.recipe;
  const selectedIngredients = []
  const ingredientsList = useSelector(state => state.recipes.ingredients)
  //console.log(contact);

  const RecipenameRef = useRef();
  const CookTimeRef = useRef();
  const PrepTimeRef = useRef();
  const InstructionsRef = useRef();
  const IngredientsRef = useRef();
  
  //const avatarRef = useRef();

  const submitFormHandler = (event) => {
    event.preventDefault();

    const Recipename = RecipenameRef.current.value;
    const CookTime = CookTimeRef.current.value;
    const PrepTime = PrepTimeRef.current.value;
    const Instructions = InstructionsRef.current.value;
    const Ingredients = IngredientsRef.current.value;
    //const avatar = avatarRef.current.value;

    const newRecipeValues = {
      Recipename,
      CookTime,
      PrepTime,
      Instructions,
      Ingredients
    };

    RecipenameRef.current.value = "";
    CookTimeRef.current.value = "";
    PrepTimeRef.current.value = "";
    InstructionsRef.current.value = "";
    IngredientsRef.current.value = "";
    //avatarRef.current.value = "";

    if (mode === 'add') {
        props.onAdd(newRecipeValues)
      } else if (mode === 'edit') {
        props.onEdit({...newRecipeValues, id: recipe.id})
      }
    }
  

  return (
    <>
      <hr />
      <form onSubmit={submitFormHandler}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Recipe:{" "}
          </label>
          <input
            type="text"
            required
            id="name"
            ref={RecipenameRef}
            className="form-control"
            defaultValue={recipe?.name}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="CookTime" className="form-label">
            Cooking Time:{" "}
          </label>
          <input
            type="text"
            required
            id="CookTime"
            ref={CookTimeRef}
            className="form-control"
            defaultValue={recipe?.CookTime}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="PrepTime" className="form-label">
            Prep Time:{" "}
          </label>
          <input
            type="text"
            required
            id="PrepTime"
            ref={PrepTimeRef}
            className="form-control"
            defaultValue={recipe?.PrepTime}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="instructions" className="form-label">
            Instructions:{" "}
          </label>
          <textarea
            name="instructions"
            id="instructions"
            cols="30"
            rows="10"
            resize="none"
            required
            ref={InstructionsRef}
            className="form-control"
            defaultValue={recipe?.instructions}
          ></textarea>
        </div>
        <div className="mb-3">
          <select
            class="form-select"
            aria-label="Default select example"
            name="ingredients"
            id="ingredients"
            defaultValue={recipe?.Ingredients}
            ref={IngredientsRef}
          >
            {ingredientsList.map(i => <option value={i.id} key={i.id}>{i.name}</option>)}            
          </select>
        </div>

        {/* <div className="mb-3">
          <label htmlFor="image" className="form-label">
            URL de l'image:{" "}
          </label>
          <input
            type="text"
            disabled={props.mode === "delete"}
            required={props.mode !== "delete"}
            id="avatar"
            ref={imageRef}
            className="form-control"
            defaultValue={recipe?.image}
          />
        </div> */}

        
        <div className="text-end">
        <button className={`btn btn-${mode === 'delete' ? 'danger' : mode === 'edit' ? 'warning' : 'success'}`}>{mode === 'delete' ? 'Confirmer' : mode === 'edit' ? 'Editer' : 'Ajouter'}</button>
      </div>
      </form>
    </>
  );
};

export default RecipeForm;
