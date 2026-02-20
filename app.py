from flask import Flask, render_template, request, jsonify
import requests
import os

app = Flask(__name__)
app.config['SECRET_KEY'] = os.environ.get("SECRET_KEY", "dev_secret_key")

ENDPOINT_API = "https://api.thecatapi.com/v1/images/search?limit=6"


@app.route('/')
def index():
    return render_template("index.html")


@app.route('/api/roleta', methods=['POST'])
def roleta():

    data = request.get_json()
    nome = data.get("nome")

    if not nome:
        return jsonify({"erro": "Nome obrigatório"}), 400

    try:
        resposta = requests.get(ENDPOINT_API, timeout=5)
        resposta.raise_for_status()
    except:
        return jsonify({"erro": "Erro ao buscar gatos"}), 500

    dados = resposta.json()
    urls_imagens = [gato['url'] for gato in dados]

    return jsonify({
        "nome": nome,
        "imagens": urls_imagens
    })


if __name__ == '__main__':
    app.run()