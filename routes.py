from flask import Flask, render_template
import sqlite3

app = Flask(__name__)

@app.route('/')
def root():
    return render_template('home.html', page_title='HOME')

@app.route('/south indian')
def southindian():
    return render_template('south indian.html', page_title='SOUTHINDIAN')

@app.route('/north indian')
def northindian():
    return render_template('north indian.html', page_title='NORTHINDIAN')

@app.route('/street food')
def streetfood():
    return render_template('street food.html', page_title='STREET FOOD')

@app.route('/one pot')
def onepot():
    return render_template('one pot.html', page_title='ONE POT')

@app.route('/regional')
def regional():
    return render_template('regional.html', page_title='REGIONAL')

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




if (__name__) == ("__main__"):
    app.run(debug=True)