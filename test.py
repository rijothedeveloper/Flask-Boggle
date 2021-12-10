from unittest import TestCase
from app import app
from flask import session
from boggle import Boggle


class FlaskTests(TestCase):

    def test_homeScreen(self):
        with app.test_client() as client:
            resp = client.get("/")
            html = resp.get_data(as_text=True)
            self.assertEqual(resp.status_code, 200)
            self.assertIn('<p class="message">word already submitted</p>', html)

    def test_valid_word(self):
        with app.test_client() as client:
            with client.session_transaction() as change_session:
                change_session["board"] = Boggle().make_board()
            resp = client.get("/valid_word",query_string=dict(word='hello'))
            json = resp.get_data(as_text=True)
            self.assertEqual(resp.status_code, 200)
            self.assertIn("result", json)

    def gameEnd(self):
        with app.test_client() as client:
            resp = client.get("/game_end",query_string=dict(score='200'))
            self.assertEqual(resp.status_code, 302)
            self.assertEqual(session["highScore"], 200)
