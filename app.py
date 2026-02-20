from flask import Flask, render_template, request, jsonify
import requests
import os

app = Flask(__name__)
app.config['SECRET_KEY'] = os.environ.get("SECRET_KEY", "dev_secret_key")

ENDPOINT_API = "https://api.thecatapi.com/v1/images/search?limit=6"


@app.route("/")
def index():
    return render_template("index.html")


@app.route("/api/roleta", methods=["POST"])
def api_roleta():

    dados = request.get_json()
    nome = dados.get("nome")

    if not nome:
        return jsonify({"erro": "Digite um nome 😾"}), 400

    try:
        resposta = requests.get(ENDPOINT_API, timeout=5)
        resposta.raise_for_status()
    except:
        return jsonify({"erro": "Erro ao buscar gatinhos 😿"}), 500

    gatos = resposta.json()
    urls = [gato["url"] for gato in gatos]

    return jsonify({
        "nome": nome,
        "imagens": urls
    })


if __name__ == "__main__":
    app.run(debug=True)