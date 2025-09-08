from flask import Flask, request, jsonify, render_template

import sqlite3

app = Flask(__name__)

#root route
@app.route('/')
def root():
    conn = sqlite3.connect('cooking.db')
    cur = conn.cursor()
    cur.execute('SELECT id, name FROM Category ORDER BY name ASC;')
    # fetchall returns a list of results 
    cuisines = cur.fetchall()
    print(cuisines) #DEBUG
    conn.close()
    return render_template('cooking-website.html', page_title='HOME', cuisines=cuisines)

#south indian route - called by SOUTH INDIAN in the the nav bar and returns information about the site 
@app.route('/api/recipes', methods=['POST'])
def recipes():
    conn = sqlite3.connect('cooking.db')
    cur = conn.cursor()
    cur.execute(
        "SELECT r.id, r.name, r.description, r.difficulty, r.servings, r.cookTime, r.category, c.name as categoryName, image FROM Recipe r INNER JOIN Category AS c ON r.category = c.id ORDER BY r.name ASC;"
    )    
    # fetchall returns a list of results 
    rows = cur.fetchall()
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

    #recipes = [{"id": row[0], "title":row[1] ,"description":row[2], "difficulty":row[3], "serving":[4], "cookTime":[5],"image":"https://ministryofcurry.com/wp-content/uploads/2023/05/sambar-11.jpg","category":"South Indian"} for row in rows]  # Example data
    return jsonify(recipes)

#list all the cusines and recipes (in alphabetic order)
#eventually link each one to a details page 
@app.route('/all_recipes')
def all_recipes():
    conn = sqlite3.connect('cooking.db')
    cur = conn.cursor()
    cur.execute('SELECT id , name FROM Recipe ORDER BY name ASC;')
    # fetchall- returns a list of results 
    recipes= cur.fetchall()
    print(recipes) #DEBUG
    conn.close()
    return render_template('all_recipes.html',page_title='ALL Recipes',recipes=recipes)

@app.route('/api/recipe', methods=['POST'])
def recipe():
    conn = sqlite3.connect('cooking.db')
    cur = conn.cursor()
    cur.execute(
        "SELECT r.id, r.name, r.description, r.difficulty, r.servings, r.cookTime, r.category, ii.ingredient, ii.instruction, r.image, c.name as categoryName FROM Category c INNER JOIN Recipe r ON c.id = r.category INNER JOIN IngredientsAndInstructions AS ii ON r.id = ii.recipe_id ORDER BY r.name ASC;"
    )    
    # fetchall returns a list of results 
    rows = cur.fetchall()
    conn.close()

    recipes = []
    for row in rows:
        ingredients_str = row[7]
        instructions_str = row[8]
        
        ingredients_list = [item.strip() for item in ingredients_str.split(',')] if ingredients_str else []
        instructions_list = [item.strip() for item in instructions_str.split(',')] if instructions_str else []

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

    #recipes = [{"id": row[0], "title":row[1] ,"description":row[2], "difficulty":row[3], "serving":[4], "cookTime":[5],"image":"https://ministryofcurry.com/wp-content/uploads/2023/05/sambar-11.jpg","category":"South Indian"} for row in rows]  # Example data
    return jsonify(recipes)

#maps the recipe to show its description and other details
@app.route('/recipe1', methods=['GET'])
def recipe1():
    recipe_id = request.args.get('id')
    return render_template('cooking-recipe.html', page_title="Test", recipe_id=recipe_id)

if (__name__) == ("__main__"):
    app.run(debug=True)