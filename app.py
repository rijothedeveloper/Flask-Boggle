from flask import Flask, request, render_template, session, jsonify, redirect
from flask_debugtoolbar import DebugToolbarExtension
from boggle import Boggle

app = Flask(__name__)
app.config['SECRET_KEY'] = "oh-so-secret"
debug = DebugToolbarExtension(app)

boggle_game = Boggle()


@app.route("/")
def show_home():
    """
        home screen shows game board
    """
    board = boggle_game.make_board()
    session["board"] = board
    return render_template("home.html", board=board)

@app.route("/valid_word")
def check_word():
    """
    check the word is a valid word as per game rules
    """
    word = request.args["word"]
    board = session["board"]
    result = boggle_game.check_valid_word(board, word)
    json = jsonify( {"result": result } )
    return json

@app.route("/game_end")
def game_end():
    """
    calls when game end or timeout to reset the game and store game scores and other data
    """
    currScore = int(request.args["score"])
    highScore = session.get("highScore", 0)
    if currScore > highScore:
        session["highScore"] = currScore
    played = session.get("played", 0)
    session["played"] = played + 1
    return redirect("/")