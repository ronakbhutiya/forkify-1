const container__recipes = document.querySelector(".container__recipes");
const container__details = document.querySelector(".container__details");
const input = document.querySelector(".input");
const btn = document.querySelector(".btn");
const recipe_card = document.querySelectorAll(".recipe_card");
const spinner = function (parentEL) {
  const markup = `
            <div class="spinner">
                <img src="img/spinner-svgrepo-com.svg" alt="" class="svg">
            </div>
  `;
  parentEL.innerHTML = "";
  parentEL.insertAdjacentHTML("beforeend", markup);
};
async function apidata(search) {
  spinner(container__recipes);
  try {
    const response = await fetch(
      `https://forkify-api.herokuapp.com/api/v2/recipes?search=${search}`
    );
    const data = await response.json();

    recipes(data.data);
  } catch (err) {
    err(container__recipes);
  }
}

btn.addEventListener("click", function (e) {
  e.preventDefault();
  const inputvalue = input.value;
  apidata(inputvalue);
});
function recipes(recipe) {
  // console.log(recipe.recipes);
  container__recipes.innerHTML = "";
  recipe.recipes.forEach((rec) => {
    const div = document.createElement("div");
    div.classList.add("recipe_card");
    div.addEventListener("click", () => detailsApi(rec.id));
    div.innerHTML = `
                <img src="${rec.image_url}" alt="" class="recipe_card-img">
                <div class="recipe_text">
                    <p class="recipe_name">${rec.title}</p>
                    <p class="recipe_subname">${rec.publisher}</p>
                </div>
               
            
  `;
    container__recipes.append(div);
    input.value = "";
  });
}
// -------------------------------details API------------------------

async function detailsApi(val) {
  spinner(container__details);
  try {
    const response = await fetch(
      `https://forkify-api.herokuapp.com/api/v2/recipes/${val}`
    );
    const data = await response.json();

    details(data.data.recipe);
  } catch (err) {
    console.log(err);
  }
}
// --------------------------------details--------------------------------------------
function details(details) {
  // console.log(details);

  container__details.innerHTML = "";
  const newDiv = document.createElement("div");
  newDiv.classList.add("details-container");
  newDiv.innerHTML = `
               <figure class="img-box">  
                <img src="${details.image_url}" alt="" class="details-img" />
                <h1 class="recipe_title">
                    <span>${details.title}</span>
                </h1>
                 </figure>

                  <div class="recipe__details">
                    <div class="recipe__info">
                        <svg class="recipe__info-icon">
                            <use href="icons.svg#icon-clock"></use>
                        </svg>
                        <span class="recipe__info-data recipe__info-data--minutes">${
                          details.cooking_time
                        }</span>
                        <span class="recipe__info-text">minutes</span>
                    </div>
                    <div class="recipe__info">
                        <svg class="recipe__info-icon">
                            <use href="icons.svg#icon-users"></use>
                        </svg>
                        <span class="recipe__info-data recipe__info-data--people">${
                          details.servings
                        }</span>
                        <span class="recipe__info-text">servings</span>
                    </div>
                    <div class="recipe__info-buttons">

                        <button class="btn--tiny btn--increase-servings">
                            <svg>
                                <use href="icons.svg#icon-plus-circle"></use>
                            </svg>
                        </button>
                    </div>
                    <div class="generat">
                        <div class="recipe__user-generated">
                            <svg>
                                <use href="icons.svg#icon-user"></use>
                            </svg>
                        </div>
                        <button class="btn--round">
                            <svg class="">
                                <use href="icons.svg#icon-bookmark-fill"></use>
                            </svg>
                        </button>
                    </div>
                </div>
                <div class="recipe__ingredients">
<h2 class="heading--2">Recipe ingredients</h2>
<ul class="recipe__ingredient-list">
${details.ingredients
  .map((ing) => {
    return `
  <li class="recipe__ingredient">
                            <svg class="recipe__icon">
                                <use href="icons.svg#icon-check"></use>
                            </svg>
                            <div class="recipe__quantity">${
                              ing.quantity ? ing.quantity : ""
                            } </div>
                            <div class="recipe__description">
                                <span class="recipe__unit">${ing.unit}</span>
                                ${ing.description}
                            </div>
                        </li> 
                        
  `;
  })
  .join(" ")}                              
</div>
<div class="recipe__directions">
                    <h2 class="heading--2">How to cook it</h2>
                    <p class="recipe__directions-text">
                        This recipe was carefully designed and tested by
                        <span class="recipe__publisher">${
                          details.publisher
                        }</span>. Please check out
                        directions at their website.
                    </p>
                    <a class="btn--small recipe__btn"
                        href="${details.source_url}" target="_blank">
                        <span>Directions</span>
                        <svg class="search__icon">
                            <use href="icons.svg#icon-arrow-right"></use>
                        </svg>
                    </a>
                </div>
            `;
  container__details.append(newDiv);
}
function errr(parentEL) {
  const markup = `
  <div class="error">
                <div>
                    <svg>
                        <use href="icons.svg#icon-alert-triangle"></use>
                    </svg>
                </div>
                <p>No recipes found for your query. Please try again!</p>
            </div> -->
  `;
  parentEL.innerHTML = "";
  parentEL.insertAdjacentHTML("beforeend", markup);
}
