const RecipeDisplay = (props) => {
  const recipe = props.recipe;
  const user = props.user;
  const setSelectedRecipeAndFormMode = props.setSelectedRecipeAndFormMode
  //   let avatarURL = recipe.avatar;

  // const getContactAge = () => {
  //   const today = new Date()
  //   const todayCopy = new Date()
  //   const birthDate = new Date(contact.birthDate)
  //   todayCopy.setFullYear(birthDate.getFullYear())
  //   if (todayCopy > birthDate){
  //     return today.getFullYear() - birthDate.getFullYear() - 1
  //   } else {
  //     return today.getFullYear() - birthDate.getFullYear
  //   }
  // }

  return (
    <>
      <div className="border border-info rounded p-3 my-2">
        
          <h5 className="text-start w-25">
            {recipe.Recipename}
          </h5>
        <div className="d-flex justify-content-end align-items-center">
            <span className="badge rounded-pill bg-danger">
            <i className="bi bi-fire"></i> {recipe.CookTime}
            </span>
            <span className="badge rounded-pill bg-warning">
            <i className="bi bi-alarm"></i> {recipe.PrepTime}
            </span>
        </div>
        
        <hr />
        <div>{recipe.Instructions}</div>
        <div>{recipe.Ingredients}</div>
        {/* <div className="imageContainer">
            <img
              src={avatarURL}
              alt="une image"
              id="pictures"
              className="picture"
            ></img>
          </div> */}
      </div>
      <hr />
      <div className="d-flex justify-content-between align-items-center">
      {user &&<button className="ms-auto btn btn-warning" onClick={() => setSelectedRecipeAndFormMode({recipe, mode: 'edit'})}><i className="bi bi-pencil-square"></i></button>}
          {user &&<button className="ms-2 btn btn-danger" onClick={() => setSelectedRecipeAndFormMode({recipe, mode: 'delete'})}><i className="bi bi-trash"></i></button>}
        
      </div>
    </>
  );
};

export default RecipeDisplay;
