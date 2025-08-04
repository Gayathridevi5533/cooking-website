// Recipe data
const recipes = [
    {
        id: 1,
        title: "Creamy Tuscan Pasta",
        description: "Rich and creamy pasta with sun-dried tomatoes, spinach, and Italian herbs. A restaurant-quality dish you can make at home.",
        cookTime: "25 min",
        servings: 4,
        difficulty: "Easy",
        image: "https://ministryofcurry.com/wp-content/uploads/2023/05/sambar-11.jpg",
        category: "Italian",
        ingredients: [
            "400g penne pasta",
            "200ml heavy cream",
            "100g sun-dried tomatoes",
            "150g fresh spinach",
            "3 cloves garlic",
            "100g parmesan cheese",
            "2 tbsp olive oil",
            "Salt and pepper to taste"
        ],
        instructions: [
            "Cook pasta according to package directions until al dente.",
            "Heat olive oil in a large pan and sauté minced garlic until fragrant.",
            "Add sun-dried tomatoes and cook for 2 minutes.",
            "Pour in heavy cream and bring to a gentle simmer.",
            "Add cooked pasta and toss to combine.",
            "Stir in fresh spinach until wilted.",
            "Add grated parmesan and season with salt and pepper.",
            "Serve immediately with extra parmesan on top."
        ],
        rating: 4.8,
        reviews: 324
    },
    {
        id: 2,
        title: "Asian Veggie Stir-Fry",
        description: "Colorful and healthy stir-fry packed with fresh vegetables and aromatic Asian flavors. Perfect for weeknight dinners.",
        cookTime: "15 min",
        servings: 3,
        difficulty: "Easy",
        image: "src/assets/asian-stir-fry.jpg",
        category: "Asian",
        ingredients: [
            "2 cups mixed vegetables (bell peppers, broccoli, carrots)",
            "2 tbsp vegetable oil",
            "3 cloves garlic, minced",
            "1 inch ginger, grated",
            "3 tbsp soy sauce",
            "1 tbsp sesame oil",
            "1 tsp cornstarch",
            "2 green onions, sliced"
        ],
        instructions: [
            "Heat vegetable oil in a large wok or skillet over high heat.",
            "Add garlic and ginger, stir-fry for 30 seconds.",
            "Add harder vegetables first (carrots, broccoli) and cook for 2-3 minutes.",
            "Add softer vegetables (bell peppers) and cook for another 2 minutes.",
            "Mix soy sauce with cornstarch and add to the pan.",
            "Drizzle with sesame oil and toss everything together.",
            "Garnish with green onions and serve immediately over rice."
        ],
        rating: 4.6,
        reviews: 189
    },
    {
        id: 3,
        title: "Decadent Chocolate Mousse",
        description: "Silky smooth chocolate mousse topped with fresh berries. An elegant dessert that will impress your guests.",
        cookTime: "20 min",
        servings: 6,
        difficulty: "Medium",
        image: "src/assets/chocolate-dessert.jpg",
        category: "Dessert",
        ingredients: [
            "200g dark chocolate (70%)",
            "300ml heavy cream",
            "3 large eggs",
            "50g sugar",
            "1 tsp vanilla extract",
            "Fresh berries for garnish",
            "Mint leaves for decoration"
        ],
        instructions: [
            "Melt chocolate in a double boiler until smooth.",
            "Separate eggs and beat yolks with half the sugar until pale.",
            "Whip cream to soft peaks and set aside.",
            "Beat egg whites with remaining sugar to stiff peaks.",
            "Mix melted chocolate with egg yolk mixture and vanilla.",
            "Gently fold in whipped cream, then egg whites.",
            "Divide into serving glasses and chill for 2 hours.",
            "Garnish with fresh berries and mint before serving."
        ],
        rating: 4.9,
        reviews: 456
    },
    {
        id: 4,
        title: "Mediterranean Garden Salad",
        description: "Fresh and vibrant salad with crisp vegetables, olives, feta cheese, and a zesty lemon vinaigrette.",
        cookTime: "10 min",
        servings: 4,
        difficulty: "Easy",
        image: "src/assets/mediterranean-salad.jpg",
        category: "Healthy",
        ingredients: [
            "4 cups mixed greens",
            "1 cucumber, diced",
            "2 tomatoes, chopped",
            "1/2 red onion, thinly sliced",
            "100g feta cheese, crumbled",
            "1/2 cup kalamata olives",
            "3 tbsp olive oil",
            "2 tbsp lemon juice",
            "1 tsp dried oregano"
        ],
        instructions: [
            "Wash and dry all vegetables thoroughly.",
            "Chop cucumber, tomatoes, and slice red onion.",
            "Combine mixed greens, cucumber, tomatoes, and onion in a large bowl.",
            "Whisk together olive oil, lemon juice, and oregano for dressing.",
            "Add olives and feta cheese to the salad.",
            "Drizzle with dressing and toss gently.",
            "Serve immediately for best freshness."
        ],
        rating: 4.5,
        reviews: 267
    },
    {
        id: 5,
        title: "Herb-Crusted Grilled Chicken",
        description: "Juicy grilled chicken with a aromatic herb crust, served with seasonal roasted vegetables.",
        cookTime: "35 min",
        servings: 4,
        difficulty: "Medium",
        image: "src/assets/grilled-meat.jpg",
        category: "Protein",
        ingredients: [
            "4 chicken breasts",
            "2 tbsp olive oil",
            "2 tsp dried herbs (rosemary, thyme, oregano)",
            "3 cloves garlic, minced",
            "1 lemon, zested and juiced",
            "Salt and black pepper",
            "Mixed vegetables for roasting"
        ],
        instructions: [
            "Preheat grill to medium-high heat.",
            "Mix olive oil, herbs, garlic, lemon zest, salt, and pepper.",
            "Rub herb mixture all over chicken breasts.",
            "Let marinate for 15 minutes at room temperature.",
            "Grill chicken for 6-7 minutes per side until cooked through.",
            "Let rest for 5 minutes before slicing.",
            "Serve with roasted vegetables and lemon wedges."
        ],
        rating: 4.7,
        reviews: 398
    },
    {
        id: 6,
        title: "Artisan Sourdough Bread",
        description: "Homemade sourdough with a perfect crust and airy interior. Nothing beats the smell of fresh baked bread.",
        cookTime: "4 hours",
        servings: 8,
        difficulty: "Hard",
        image: "src/assets/baked-goods.jpg",
        category: "Baking",
        ingredients: [
            "500g bread flour",
            "350ml water",
            "100g sourdough starter",
            "10g salt",
            "Additional flour for dusting"
        ],
        instructions: [
            "Mix flour and water, let autolyse for 30 minutes.",
            "Add sourdough starter and salt, mix until combined.",
            "Perform 4 sets of stretch and folds every 30 minutes.",
            "Bulk ferment for 4-6 hours until doubled in size.",
            "Pre-shape and let rest for 30 minutes.",
            "Final shape and proof overnight in the refrigerator.",
            "Bake at 450°F in a Dutch oven for 45 minutes.",
            "Cool completely before slicing."
        ],
        rating: 4.8,
        reviews: 156
    }
];

// Get recipe ID from URL parameters or default to recipe 2
function getRecipeId() {
    const urlParams = new URLSearchParams(window.location.search);
    return parseInt(urlParams.get('id')) || 2;
}

// Load and display recipe details
function loadRecipe() {
    const recipeId = getRecipeId();
    const recipe = recipes.find(r => r.id === recipeId);
    
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
    document.getElementById('recipe-rating').textContent = recipe.rating;
    document.getElementById('recipe-reviews').textContent = `(${recipe.reviews} reviews)`;
    document.getElementById('cook-time').textContent = recipe.cookTime;
    document.getElementById('servings').textContent = recipe.servings;
    document.getElementById('difficulty').textContent = recipe.difficulty;
    
    // Update stars
    updateStars(recipe.rating);
    
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
    window.location.href = 'cooking-website.html';
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