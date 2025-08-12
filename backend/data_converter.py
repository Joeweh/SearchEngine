# This file converts the local json files into a sqlite database (patents.db)
import json
import os
import sqlite3

directory = '../data/patent_data_small'
paths = []
data = []

def scan_directory():
    for entry in os.scandir(directory):
        if entry.is_file():
            paths.append(entry.path)


def load_json():
    for path in paths:
        with open(path, 'r') as json_file:
            json_data = json.load(json_file)

            for patent in json_data:
                data.append(patent)


def fill_database():
    conn = sqlite3.connect("patents.db")
    for entry in data:
        cursor = conn.cursor()

        cursor.execute(
        'INSERT INTO patents VALUES (?, ?, ?, ?, ?)',
            (entry['doc_number'], entry['title'], entry['classification'], entry['abstract'], json.dumps(entry['detailed_description']))
        )

        conn.commit()
    conn.close()


scan_directory()
load_json()
fill_database()