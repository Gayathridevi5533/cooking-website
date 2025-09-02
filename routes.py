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


#norht indian route - called by NORTH INDIAN in the the nav bar and returns information about the site 
@app.route('/north indian')
def northindian():
    return render_template('north indian.html', page_title='NORTH INDIAN')

#street food route - called by STREET FOOD in the the nav bar and returns information about the site 
@app.route('/street food')
def streetfood():
    return render_template('street food.html', page_title='STREET FOOD')

#one pot route - called by ONE POT in the the nav bar and returns information about the site 
@app.route('/one pot')
def onepot():
    return render_template('one pot.html', page_title='ONE POT')

#regional route - called by REGIONAL in the the nav bar and returns information about the site 
@app.route('/regional')
def regional():
    return render_template('regional.html', page_title='REGIONAL')

#desserts route - called by DESSERTS in the the nav bar and returns information about the site 
@app.route('/desserts')
def desserts():
    return render_template('desserts.html', page_title='DESSERTS')

#list all the cusines and recipes in alphabetic order 
#eventually link each one to a details page 
@app.route('/all_recipes')
def all_recipes():
    conn = sqlite3.connect('cooking.db')
    cur = conn.cursor()
    cur.execute('SELECT id , name FROM Recipe ORDER BY name ASC;')
    # fetchall returns a list of results 
    recipes= cur.fetchall()
    print(recipes) #DEBUG
    conn.close()
    return render_template('all_recipes.html',page_title='ALL Recipes',recipes=recipes)

#maps the recipe to show its description and other details
@app.route('/recipe/<int:id>')
def recipe (id):
    conn = sqlite3.connect('cooking.db')
    cur = conn.cursor()
    cur.execute('SELECT * FROM Recipe WHERE id=?;', (id,))
    #fetchone returns a tuple containing the result , OR NONE!
    recipe = cur.fetchone()
    title = recipe[1].upper() + 'RECIPE'
    return render_template('recipe.html', page_title=title,
                           recipe=recipe)

if (__name__) == ("__main__"):
    app.run(debug=True)