from langchain_community.document_loaders import PyPDFLoader
from flask import jsonify
def load_data():
    try:
        file_path = "data/appliance.pdf"
        loader = PyPDFLoader(file_path)

        docs = loader.load()
        print("Loading data....")
        print(len(docs))
        return docs

    except Exception as e:
        return jsonify({"error": str(e)})