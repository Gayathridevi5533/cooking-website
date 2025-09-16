// Recipe data
var recipes = [];

document.addEventListener('DOMContentLoaded', function() {
    fetch("/my/recipe", {
        method: "POST",
        headers: { "Content-Type": "application/json" }
    })
    .then(response => response.json())
    .then(data => {
        recipes = data;
        console.log("Received JSON:", data);
        loadRecipe();
        // Update the page dynamically here…
    })
    .catch(err => console.error("Error:", err));
});

// Load and display recipe details
function loadRecipe() {
    //const recipeId = recipeId;
    const recipe = recipes.find(r => r.id === parseInt(recipeId));
    
    if (!recipe) {
        // If recipe not found, show default recipe
        return;
    }
    
    // Update recipe details
    document.getElementById('recipe-title').textContent = recipe.title;
    document.getElementById('recipe-description').textContent = recipe.description;
    document.getElementById('recipe-image').src = recipe.image;
    document.getElementById('recipe-image').alt = recipe.title;
    document.getElementById('recipe-category').textContent = recipe.category;
    //document.getElementById('recipe-rating').textContent = recipe.rating;
    //document.getElementById('recipe-reviews').textContent = `(${recipe.reviews} reviews)`;
    document.getElementById('cook-time').textContent = recipe.cookTime;
    document.getElementById('servings').textContent = recipe.servings;
    document.getElementById('difficulty').textContent = recipe.difficulty;
    
    // Update stars
    // updateStars(recipe.rating);
    
    // Update ingredients
    const ingredientsList = document.getElementById('ingredients-list');
    ingredientsList.innerHTML = recipe.ingredients.map(ingredient => 
        `<li><span class="bullet"></span>${ingredient}</li>`
    ).join('');
    
    // Update instructions
    const instructionsList = document.getElementById('instructions-list');
    instructionsList.innerHTML = recipe.instructions.map((instruction, index) => 
        `<li><span class="step-number">${index + 1}</span>${instruction}</li>`
    ).join('');
}

// Update star rating display
function updateStars(rating) {
    const starsContainer = document.getElementById('recipe-stars');
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    let starsHTML = '';
    
    // Add full stars
    for (let i = 0; i < fullStars; i++) {
        starsHTML += '<i class="fas fa-star"></i>';
    }
    
    // Add half star if needed
    if (hasHalfStar) {
        starsHTML += '<i class="fas fa-star-half-alt"></i>';
    }
    
    // Add empty stars to make 5 total
    const remainingStars = 5 - Math.ceil(rating);
    for (let i = 0; i < remainingStars; i++) {
        starsHTML += '<i class="far fa-star"></i>';
    }
    
    starsContainer.innerHTML = starsHTML;
}

// Back button functionality
function goBack() {
    // You can replace this with your main page URL
    window.location.href = '/';
}

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    loadRecipe();
});

// You can call this function to change recipes dynamically
function changeRecipe(recipeId) {
    const newUrl = `${window.location.pathname}?id=${recipeId}`;
    window.history.pushState({}, '', newUrl);
    loadRecipe();
}