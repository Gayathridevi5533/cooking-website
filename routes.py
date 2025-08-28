from flask import Flask, render_template, request , abort,g 
from math import floor
import sqlite3


app = Flask(__name__)

#Connet database
def get_db():
    def = getattr(g, '_database', None)
    if db is None:
        db = g._database = sqlite3.connet(cooking.db)
        db.row_factory = sqlite3.Row
        #create tables if they dont exist
        c = db.cursor()

        c.execute('''CREATE TABLE IF NOT EXISTS Recipe (
                  id INT AUTO_INCREMENT PRIMARY KEY, 
                name TEXT NOT NULL, 
                description TEXT NOT NULL,
                difficulty TEXT NOT NULL,
                servings INT AUTO_INCREMENT,
                cookTime INT AUTO_INCREMENT,
                FOREIGN KEY (category_id)
                  ''')
        

        return db
    

    #close database connection
    @app.teardown_appcontext
    def close_db(exeption):
        db = getattr(g, '_database', None)
        if db is not None:
            db.close()        

#Home page 
@app.route('/')
def home():
    return render_template('Home.html')