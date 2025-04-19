from langchain_community.document_loaders import PyPDFLoader
from langchain_openai import ChatOpenAI
from langchain_chroma import Chroma
from langchain_openai import OpenAIEmbeddings
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain.chains import create_retrieval_chain
from langchain.chains.combine_documents import create_stuff_documents_chain
from langchain_core.prompts import ChatPromptTemplate
from prompt import PROMPT
from flask import jsonify

from data_loader import load_data
import dotenv
import os

dotenv.load_dotenv()

open_ai_key = os.environ.get("DEEPSEEK_API_KEY")
docs = load_data()

#llm = ChatOpenAI(model="gpt-4o")
llm = ChatOpenAI(temperature=0.3, model="gpt-3.5-turbo")

text_splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=200)
splits = text_splitter.split_documents(docs)
vectorstore = Chroma.from_documents(documents=splits, embedding=OpenAIEmbeddings())

retriever = vectorstore.as_retriever()


def get_response(user_query):


    prompt = ChatPromptTemplate.from_messages(
        [
            ("system", PROMPT),
            ("human", "{input}"),
        ]
    )


    question_answer_chain = create_stuff_documents_chain(llm, prompt)
    rag_chain = create_retrieval_chain(retriever, question_answer_chain)

    results = rag_chain.invoke({"input": user_query})
    final_response = results['answer']
    # print(results['answer'])
    return jsonify({"response":final_response})