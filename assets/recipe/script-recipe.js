const mealsEl = document.getElementById("meals");
const favContainer = document.getElementById("fav-meals");
const searchTerm = document.getElementById('search_term');
const searchbtn = document.getElementById('search');
const mealPopup = document.getElementById('meal_popup');
const mealInstruct = document.getElementById('meal_instruct');
const popupClosebtn = document.getElementById('close_popup');

getRandomMeal();
getFavMeals();


async function getRandomMeal() {
    const resp = await fetch("https://www.themealdb.com/api/json/v1/1/random.php");

    const respData = await resp.json();
    const randomMeal = respData.meals[0];
    // addmeal()
    loadRandomMeal(randomMeal, true);
}

async function getMealById(id) {
    const resp = await fetch("https://www.themealdb.com/api/json/v1/1/lookup.php?i="
        + id);
    const respData = await resp.json();

    const meal = respData.meals[0];

    return meal;
}

async function getMealsBySearch(term) {
    const resp = await fetch("https://www.themealdb.com/api/json/v1/1/search.php?s="
        + term);

    const respData = await resp.json();
    const meals = respData.meals;

    return meals;
}

// addmeal on vid
function loadRandomMeal(mealData, random = false) {
    const meal = document.createElement('div');

    meal.classList.add("meal");

    meal.innerHTML = `
        <div class="meal-header">
            ${random ? `
            <span class="random">Random Recipe</span>` : ''}
            <img src="${mealData.strMealThumb}"
                alt="${mealData.strMeal}"/>
        </div>
        <div class="meal-body">
            <h4>${mealData.strMeal}</h4>
            <button id="fav-btn" class="fav-btn" onclick=""><svg xmlns="http://www.w3.org/2000/svg"
                fill="none" height="20px"
                viewBox="0 0 24 24" class="active-fill" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round"
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg></button>
        </div>
    
    `;

    const btn = meal.querySelector(".meal-body .fav-btn .active-fill");

    btn.addEventListener("click", () => {
        if (btn.classList.contains("active")) {
            removeMealFromLS(mealData.idMeal);
            btn.classList.remove("active");
        } else {
            addRecipeFav(mealData.idMeal);
            btn.classList.add("active");
        }

        getFavMeals();
    });

    meal.addEventListener('click', () => {
        showMealInstruct(mealData);
    });

    mealsEl.appendChild(meal);
}

// addMealToLS
function addRecipeFav(mealId) {
    //first pull LS
    const mealIds = getMealsFromLS();

    localStorage.setItem("mealIds", JSON.stringify([...mealIds, mealId]));

}

function getMealsFromLS() {
    const mealIds = JSON.parse(localStorage
        .getItem("mealIds"));

    return mealIds === null ? [] : mealIds;
}

function removeMealFromLS(mealId) {
    const mealIds = getMealsFromLS();

    // mealIds.filter((id) => id !== mealId)
    localStorage.setItem("mealIds",
        JSON.stringify(mealIds.filter((id) => id !== mealId)));
}

//fetchFavMeals
async function getFavMeals() {
    //clean container
    favContainer.innerHTML = "";

    const mealIds = getMealsFromLS();

    for (let i = 0; i < mealIds.length; i++) {
        const mealId = mealIds[i];
        meal = await getMealById(mealId);

        loadFavMeal(meal);
    }
}

function loadFavMeal(mealData) {
    const favMeal = document.createElement("li");

    favMeal.innerHTML = `
        <img 
        src="${mealData.strMealThumb}"
        alt="${mealData.strMeal}"/>
        <span>${mealData.strMeal}</span>
        <button class= "btn_close"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
      </svg>
      </button>
    `;

    const btn = favMeal.querySelector('.btn_close');

    btn.addEventListener('click', () => {
        removeMealFromLS(mealData.idMeal);

        getFavMeals();
    });
    //pop up of the fav meal
    favMeal.addEventListener('click', () => {
        showMealInstruct(mealData);
    });

    favContainer.appendChild(favMeal);
}

function showMealInstruct(mealData) {
    //clean up
    mealInstruct.innerHTML = "";

    //update the meal info
    const mealEl = document.createElement('div');

    const ingredients = [];

    //get ingredients and measurements
    for (let i = 1; i < 20; i++) {
        if (mealData["strIngredient" + i]) {
            ingredients.push(`${mealData["strIngredient" + i]} -
             ${mealData["strMeasure" + i]}`)
        }
        else {
            break;
        }
    }

    mealEl.innerHTML = `
        <h1>${mealData.strMeal}</h1>
        <img src="${mealData.strMealThumb}" alt="${mealData.strMeal}">

        <p>
        ${mealData.strInstructions}
        </p>
        <h3>Ingredients:</h3>
        <ul>
            ${ingredients.map((ing) => `
            <li>${ing}</li>
            `)
            .join("")}
        </ul>
        `;


    mealInstruct.appendChild(mealEl);

    //show the popup
    mealPopup.classList.remove('hidden');

}

searchbtn.addEventListener('click', async () => {
    //clean container
    mealsEl.innerHTML = '';

    const search = searchTerm.value;

    const meals = await getMealsBySearch(search);

    if (meals) {
        meals.forEach((meal) => {
            loadRandomMeal(meal);
        });
    }

})

popupClosebtn.addEventListener('click', () => {
    mealPopup.classList.add('hidden');
})