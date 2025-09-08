// Recipe data
var recipes = [];

const recipes1 = [
    {
        id: 1,
        title: "Idly Sambar",
        description: "Idly Sambar is a beloved staple of South Indian cuisine—a comforting, nutritious combo of soft, steamed idlis served with a flavorful, tangy lentil stew called sambar.",
        cookTime: "30 - 35 min",
        servings: 4,
        difficulty: "Easy",
        image: "https://ministryofcurry.com/wp-content/uploads/2023/05/sambar-11.jpg",
        category: "South Indian"
    },
    {
        id: 2,
        title: "Pani puri",
        description: "Pani puri is a popular Indian street food consisting of crispy, hollow puri filled with a flavorful mixture of potatoes, chickpeas, and chutneys, then immersed in spicy and tangy pani (flavored water). ",
        cookTime: "60 - 90 min",
        servings: 4,
        difficulty: "Hard",
        image: "https://www.jcookingodyssey.com/wp-content/uploads/2025/06/Pani-Puri-Recipe.jpg",
        category: "Street food"
    },
    {
        id: 3,
        title: "Biriyani",
        description: " Biryani is a rich tapestry of regional flavors, each with its own unique twist on the classic dish. While the core elements—fragrant rice, marinated meat, and aromatic spices—remain consistent, the variations reflect the diverse culinary traditions of the region.",
        cookTime: "45 - 60 min",
        servings: 4,
        difficulty: "Medium",
        image: "https://www.shutterstock.com/image-photo/traditional-chicken-biryani-served-brass-600nw-2622739739.jpg",
        category: "One pot"
    },
    {
        id: 4,
        title: "Chicken Tandoori",
        description: "Tandoori chicken is a renowned Indian dish celebrated for its vibrant flavor and tender texture.It is traditionally cooked in a tandoor, a cylindrical clay oven that imparts a unique smoky aroma and charred finish to the meat.",
        cookTime: "25 - 45min",
        servings: 4,
        difficulty: "Easy",
        image: "https://www.allrecipes.com/thmb/ygY1JXP8_IkDSjPPW5VH2dTiMMU=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/50347-indian-tandoori-chicken-DDMFS-4x3-3035-205e98c80b2f4275b5bd010c396d9149.jpg",
        category: "North Indian"
    },
    {
        id: 5,
        title: "Butter Chicken",
        description: "A creamy, tomato-based gravy with tender chicken pieces, often considered a gateway to Indian cuisine. ",
        cookTime: "35 - 45 min",
        servings: 4,
        difficulty: "Medium",
        image: "https://feelgoodfoodie.net/wp-content/uploads/2023/04/Easy-Butter-Chicken-11.jpg",
        category: "Regional"
    },
    {
        id: 6,
        title: "Rasgulla",
        description: "Rasgulla is an iconic syrupy dessert from eastern India—made of soft, spongy ball‑shaped dumplings crafted from fresh cottage cheese (chhena) and soaked in fragrant light sugar syrup.",
        cookTime: "45 - 60 mins",
        servings: 4,
        difficulty: "Medium",
        image: "https://images.immediate.co.uk/production/volatile/sites/30/2024/09/RasGulla-2432193.jpg?quality=90&resize=708,643",
        category: "Dessert"
    }
];

// State
let selectedCategory = "All";

// DOM Elements
const categoryButtons = document.querySelectorAll('.category-btn');
const recipeGrid = document.getElementById('recipeGrid');
const toast = document.getElementById('toast');
const toastTitle = document.getElementById('toastTitle');
const toastMessage = document.getElementById('toastMessage');

// Initialize the app
document.addEventListener('DOMContentLoaded', function() {
    fetch("/api/recipes", {
        method: "POST",
        headers: { "Content-Type": "application/json" }
    })
    .then(response => response.json())
    .then(data => {
        recipes = data;
        console.log("Received JSON:", data);
        renderRecipes();
        // Update the page dynamically here…
    })
    .catch(err => console.error("Error:", err));

    setupEventListeners();
});

// Setup event listeners
function setupEventListeners() {
    // Category filter buttons
    categoryButtons.forEach(button => {
        button.addEventListener('click', function() {
            const category = this.dataset.category;

            selectCategory(category);
        });
    });

    // Hero buttons
    document.querySelectorAll('.btn-hero, .btn-premium').forEach(button => {
        button.addEventListener('click', function() {
            showToast("Coming Soon!", "This feature will be available soon. Stay tuned!");
        });
    });

    document.querySelectorAll('.btn-outline, .btn-secondary').forEach(button => {
        button.addEventListener('click', function() {
            showToast("Browse Recipes", "Scroll down to explore our free recipe collection!");
        });
    });
}

// Select category and update UI
function selectCategory(category) {
    selectedCategory = category;
    
    // Update active button
    categoryButtons.forEach(button => {
        button.classList.remove('active');
        if (button.dataset.category === category) {
            button.classList.add('active');
        }
    });
    
    // Re-render recipes
    renderRecipes();
}

// Filter recipes based on selected category
function getFilteredRecipes() {
    if (selectedCategory === "All") {
        return recipes;
    }
    return recipes.filter(recipe => recipe.category === selectedCategory);
}

// Render recipes to the grid
function renderRecipes() {
    const filteredRecipes = getFilteredRecipes();
    
    recipeGrid.innerHTML = filteredRecipes.map((recipe, index) => `
        <div class="recipe-card" style="animation-delay: ${(index + 1) * 0.1}s" onclick="selectRecipe('${recipe.title}')">
            <div class="recipe-image-container">
                <img src="${recipe.image}" alt="${recipe.title}" class="recipe-image">
                <div class="recipe-category">${recipe.category}</div>
                <div class="recipe-overlay"></div>
            </div>
            <div class="recipe-content">
                <h3 class="recipe-title">${recipe.title}</h3>
                <p class="recipe-description">${recipe.description}</p>
                <div class="recipe-meta">
                    <div class="recipe-meta-item">
                        <i class="fas fa-clock"></i>
                        <span>${recipe.cookTime}</span>
                    </div>
                    <div class="recipe-meta-item">
                        <i class="fas fa-users"></i>
                        <span>${recipe.servings} servings</span>
                    </div>
                    <div class="recipe-meta-item">
                        <i class="fas fa-chef-hat"></i>
                        <span>${recipe.difficulty}</span>
                    </div>
                </div>
                <button class="recipe-btn" onclick="window.location.href='/recipe1?id=${recipe.id}'; event.stopPropagation();">
                    View Recipe
                </button>
            </div>
        </div>
    `).join('');
}

// Handle recipe selection
function selectRecipe(recipeTitle) {
    showToast("Recipe Selected!", `You selected "${recipeTitle}". Recipe details would be shown here.`);
}

// Show toast notification
function showToast(title, message) {
    toastTitle.textContent = title;
    toastMessage.textContent = message;
    
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 4000);
}

// Smooth scrolling for anchor links
document.addEventListener('click', function(e) {
    if (e.target.matches('a[href^="#"]')) {
        e.preventDefault();
        const target = document.querySelector(e.target.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    }
});

// Add scroll effects
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelector('.hero');
    if (parallax) {
        const speed = scrolled * 0.5;
        parallax.style.transform = `translateY(${speed}px)`;
    }
});