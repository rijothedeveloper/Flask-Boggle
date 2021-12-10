from boggle import Boggle
from flask import Flask, request, render_template
from flask_debugtoolbar import DebugToolbarExtension

app = Flask(__name__)
app.config['SECRET_KEY'] = "oh-so-secret"
debug = DebugToolbarExtension(app)

boggle_game = Boggle()

@app.route("/")
def show_home():
    return render_template("home.html")