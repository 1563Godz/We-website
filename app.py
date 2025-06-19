from flask import Flask, render_template, request, jsonify
import os
import joblib

app = Flask(__name__)

# Load model and vectorizer
base_dir = os.path.dirname(__file__)
model_path = os.path.join(base_dir, "model", "model.pkl")
vectorizer_path = os.path.join(base_dir, "model", "vectorizer.pkl")

model = joblib.load(model_path)
vectorizer = joblib.load(vectorizer_path)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/sentences-check')
def sentences_check():
    return render_template('sentences-check.html')

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()
    review = data.get('review', '').strip()

    if not review:
        return jsonify({'prediction': 'ไม่มีข้อความให้วิเคราะห์'})

    X = vectorizer.transform([review])
    prediction = model.predict(X)[0]

    result = "เชิงบวก" if prediction == 1 else "เชิงลบ"
    return jsonify({'prediction': result})

if __name__ == '__main__':
    app.run(debug=True)