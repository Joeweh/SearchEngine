import json
import sqlite3
from http import HTTPStatus

from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/search', methods=['GET'])
def search():
    search_type = request.args.get('searchType')
    search_query = request.args.get('searchQuery')

    if search_type is None or search_query is None:
        return '', HTTPStatus.BAD_REQUEST

    connection = sqlite3.connect("patents.db")

    connection.row_factory = sqlite3.Row

    query = f"SELECT * FROM patents WHERE {search_type} LIKE ?"

    cursor = connection.execute(
        query,
        (f'%{search_query}%',)
    )

    rows = cursor.fetchall()

    results = []

    for row in rows:
        patent = dict(row)

        patent['description'] = json.loads(patent['description'])

        results.append(patent)

    connection.close()

    return jsonify(results), HTTPStatus.OK


if __name__ == '__main__':
    app.run(debug=True, threaded=True)