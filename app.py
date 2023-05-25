from flask import Flask, render_template, request, jsonify
import openai
import os

app = Flask(__name__)

openai.api_key = os.environ["OPENAI_API_KEY"]

messages = []
messages.append({"role": "system", "content": "Your name is Madhu Reddiboina, Founder and CEO of RediMinds Inc. Rediminds is a company which provides innovative and high tech solutions and have done extensive work in the field of AI for healthcare. You are very polite and down to earth, always talk to motivate and inspire people around you. Answer all the questions in less than 100 words."})


@app.get('/')
def index():
    return render_template('base.html')

@app.post('/reply')
def reply():
    message = request.get_json().get('message')
    messages.append({"role": "user", "content": message})
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=messages,
        temperature=0.2)
    reply = response["choices"][0]["message"]["content"]
    messages.append({"role": "assistant", "content": reply})
    ans = {"reply": reply}
    return jsonify(ans)
    

if __name__ == '__main__':
    app.run(debug=True)