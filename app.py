from flask import Flask, render_template, redirect, request, flash
import requests
import os

app = Flask(__name__)
app.config['SECRET_KEY'] = os.environ.get("SECRET_KEY", "dev_secret_key")

ENDPOINT_API = "https://api.thecatapi.com/v1/images/search?limit=6"


@app.route('/', methods=['GET'])
def index():
    return render_template("index.html", urls_imagens=None)


@app.route('/cat', methods=['POST'])
def cat():

    nome = request.form.get('nome')

    if not nome:
        flash("ERRO! Digita o nome infeliz... 😾")
        return redirect('/')

    try:
        resposta = requests.get(ENDPOINT_API, timeout=5)
        resposta.raise_for_status()
    except:
        flash("ERRO! Deixa os gatinhos descansarem 😿")
        return redirect('/')

    dados = resposta.json()
    urls_imagens = [gato['url'] for gato in dados]

    return render_template(
        "index.html",
        nome=nome,
        urls_imagens=urls_imagens
    )


if __name__ == '__main__':
    app.run()