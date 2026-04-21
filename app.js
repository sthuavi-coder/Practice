// 9612e95f89384378a3c98679b2f61ccf api key
// const response = await fetch(`https://api.spoonacular.com/recipes/complexSearch?query=pasta&number=1&addRecipeNutrition=true&apiKey=9612e95f89384378a3c98679b2f61ccf`);
// const data = await response.json();

const recipes = document.querySelector(".results__card");
const searchBtn = document.getElementById("searchBtn");
const searchInput = document.getElementById("searchInput");

// const API_KEY = "9612e95f89384378a3c98679b2f61ccf";
const API_BASE_URL = "https://api.spoonacular.com/recipes/complexSearch";

searchBtn.addEventListener("click", getRecipes);
searchInput.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    getRecipes();
  }
});

async function getRecipes() {
  const query = searchInput.value.trim();
  if (!query) {
    alert("Please enter a search term.");
    return;
  }

  recipes.innerHTML = "<p>Searching for the best recipes...</p>";

  const apiUrl = `${API_BASE_URL}?query=${encodeURIComponent(query)}&number=5&addRecipeNutrition=true&apiKey=${API_KEY}`;

  try {
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    // recipes.innerHTML = "";

    if (!data.results || data.results.length === 0) {
      recipes.innerHTML =
        '<div class="no-results">Nothing found. Please try a different search term.</div>';
      return;
    }

    recipes.innerHTML = data.results.map(recipe => {
      const { title, image, nutrition } = recipe;
      const getNutrient = (name) => {
        const nutrient = nutrition?.nutrients?.find(n => n.name === name);
        return nutrient ? `${Math.round(nutrient.amount)} ${nutrient.unit}` : 'N/A';
      };

      return `
        <div class="recipe-card">
          <h3>${title}</h3>
          <img src="${image}" alt="${title}" style="max-width: 100%; border-radius: 8px;">
          <div class="nutrition-info">
            <p><strong>Calories:</strong> ${getNutrient('Calories')}</p>
            <p><strong>Carbs:</strong> ${getNutrient('Carbohydrates')}</p>
            <p><strong>Protein:</strong> ${getNutrient('Protein')}</p>
            <p><strong>Fat:</strong> ${getNutrient('Fat')}</p>
          </div>
        </div>
      `;
    }).join('');

    
    
  }

  catch(error) {
    console.error("Fetch error:", error);
    recipes.innerHTML = "<p>Something went wrong. Try again later.</p>";
  }

}


