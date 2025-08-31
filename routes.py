from flask import Flask, render_template

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


if (__name__) == ("__main__"):
    app.run(debug=True)