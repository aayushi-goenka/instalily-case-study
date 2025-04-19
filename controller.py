import os
import dotenv
from flask import request, Response
from llm import get_response
from flask import jsonify

def chatbot():

    data = request.json
    user_query = data.get("query")

    if user_query:
        chatbot_response = get_response(user_query)
        return chatbot_response
    else:
        return jsonify({"error": str(e)})


