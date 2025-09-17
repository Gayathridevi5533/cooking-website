// Recipe data
var recipes = [];

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
    fetch("/my/recipes", {
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
                <button class="recipe-btn" onclick="window.location.href='/recipe${recipe.id}'; event.stopPropagation();">
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