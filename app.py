from flask import Flask, request, render_template, session
from flask_debugtoolbar import DebugToolbarExtension
from boggle import Boggle

app = Flask(__name__)
app.config['SECRET_KEY'] = "oh-so-secret"
debug = DebugToolbarExtension(app)

boggle_game = Boggle()

@app.route("/")
def show_home():
    board = boggle_game.make_board()
    session["board"] = board
    return render_template("home.html", board=board)