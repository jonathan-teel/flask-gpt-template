from flask import Flask, render_template, request, jsonify
import openai

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')
  
@app.route('/gpt-response', methods=['POST'])
def generate_analysis():
    openai.api_key = request.form["api_key"]
    model = request.form['model']
    query = request.form['query']
    useSystem = request.form['sm']
    try:
        response = openai.ChatCompletion.create(
            model=model,
            messages=[{'role': 'user', 'content': query}]
        )
    except Exception as e:
        return jsonify({'error': str(e)})

    return jsonify({'result': response.choices[0].message.content.strip()})

if __name__ == '__main__':
    app.run(debug=True)