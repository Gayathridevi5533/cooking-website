from flask import Flask, request, jsonify, render_template

import sqlite3

app = Flask(__name__)


# Define the root URL endpoint for the web app.
# This tells Flask to run this function when a user visits the homepage.
# next connects to the SQLite database 'cooking.db'.
# This connection is necessary to retrieve data stored in the db.
# The cursor acts as a control structure to manage the context of
#  database operations  to execute SQL commands.
# Run a SQL query to select all categories (id and name)
#  ordered alphabetically by name.
# Ordering alphabetically improves user experience
#  by listing cuisines in a predictable way.
@app.route('/')
def root():
    conn = sqlite3.connect('cooking.db')
    cur = conn.cursor()
    cur.execute('SELECT id, name FROM Category ORDER BY name ASC;')
    cuisines = cur.fetchall()  # fetchall returns a list of results
    print(cuisines)  # DEBUG
    conn.close()
    return render_template('cooking-website.html',
                           page_title='HOME',
                           cuisines=cuisines)


# The cursor allows us to execute the SQL SELECT query and retrieve results.
# Execute an SQL query to retrieve detailed information about recipes,
# including related category names by joining the Recipe and Category tables.
# Ordering by recipe name alphabetically makes it easier to display
# recipes in a user-friendly order.
# Transform the raw tuples returned from the database
#  into a list of dictionaries.
# Each dictionary represents a recipe with descriptive keys
#  for easier handling in the frontend.
# Prepending the image path ensures the correct static
#  path is used for displaying images.

@app.route('/my/recipes', methods=['POST'])
def recipes():
    conn = sqlite3.connect('cooking.db')
    cur = conn.cursor()
    cur.execute(
        "SELECT r.id, r.name, r.description, r.difficulty, r.servings,"
        " r.cookTime, r.category, c.name as categoryName,"
        " image FROM Recipe r INNER JOIN Category AS c ON r.category = c.id "
        "ORDER BY r.name ASC;"
    )
    rows = cur.fetchall()  # fetchall returns a list of results
    conn.close()

    recipes = [{
        "id": row[0],
        "title": row[1],
        "description": row[2],
        "difficulty": row[3],
        "servings": row[4],
        "cookTime": row[5],
        "image": "/static/images/" + row[8],
        "category": row[7]
    } for row in rows]

    return jsonify(recipes)


# Define a route to handle get requests to '/all recipes'.
# This endpoint serves the page listing all recipes in the database.
# Render the 'all recipes.html' template,
# passing the retrieved recipe list and page title.
# Rendering this template dynamically
# populates the page with the current recipes.
# Execute a complex SQL query joining multiple tables to fetch detailed
# recipe info including ingredients and instructions
# the query combines data from Recipe, Category,
# and IngredientsAndInstructions tables to get all necessary details.
# Fetch all query results into a list of rows
# Loop through each row to extract and process ingredients and
# instruction strings into lists improves usability for the frontend.
# splitting strings into lists
# Split the ingredients string by comma
@app.route('/all_recipes')
def all_recipes():
    conn = sqlite3.connect('cooking.db')
    cur = conn.cursor()
    cur.execute('SELECT id , name FROM Recipe ORDER BY name ASC;')
    recipes = cur.fetchall()   # fetchall- returns a list of results
    print(recipes)  # DEBUG
    conn.close()
    return render_template('all_recipes.html',
                           page_title='ALL Recipes',
                           recipes=recipes)


@app.route('/my/recipe', methods=['POST'])
def recipe():
    conn = sqlite3.connect('cooking.db')
    cur = conn.cursor()
    cur.execute(
        "SELECT r.id, r.name, r.description, r.difficulty, r.servings,"
        " r.cookTime, r.category, ii.ingredient, ii.instruction, r.image,"
        " c.name as categoryName FROM Category c INNER JOIN Recipe r ON "
        "c.id = r.category INNER JOIN IngredientsAndInstructions AS ii ON "
        "r.id = ii.recipe_id ORDER BY r.name ASC;"
    )
    rows = cur.fetchall()  # fetchall returns a list of results
    conn.close()

    recipes = []  # Initialize an empty list to store recipe dictionaries
    for row in rows:
        ingredients_str = row[7]
        instructions_str = row[8]
        ingredients_list = [item.strip() for item in ingredients_str.split(',')
                            ] if ingredients_str else []
        instructions_list = [item.strip() for item in
                             instructions_str.split(',')
                             ]if instructions_str else []

        recipes.append({
            "id": row[0],
            "title": row[1],
            "description": row[2],
            "difficulty": row[3],
            "servings": row[4],
            "cookTime": row[5],
            "ingredients": ingredients_list,
            "instructions": instructions_list,
            "image": "/static/images/" + row[9],
            "category": row[10]
        })
    return jsonify(recipes)


# custom error handler
@app.errorhandler(404)
def not_found(e):
    return render_template("404.html")


# maps the recipe to show its description and other details
@app.route('/recipe1', methods=['GET'])
def recipe1():
    recipe_id = request.args.get('id')
    return render_template('cooking-recipe.html',
                           page_title="Test",
                           recipe_id=recipe_id)


if (__name__) == ("__main__"):
    app.run(debug=True)
