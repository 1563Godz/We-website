from flask import Flask, render_template, request, jsonify
import os
import joblib
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing.image import img_to_array
import numpy as np
from PIL import Image

app = Flask(__name__)

# Load model and vectorizer
base_dir = os.path.dirname(__file__)
model_path = os.path.join(base_dir, "model", "model.pkl")
vectorizer_path = os.path.join(base_dir, "model", "vectorizer.pkl")

# Load the text model and vectorizer
model_text = joblib.load(model_path)
vectorizer = joblib.load(vectorizer_path)

# Load the MNIST model (for image predictions)
model_mnist = load_model("model/model_mnist.h5")

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/sentences-check')
def sentences_check():
    return render_template('sentences-check.html')

@app.route('/hdr')
def hdr():
    return render_template('HDR.html')

@app.route('/predict', methods=['POST'])
def predict():
    # Handling both text and image prediction in one function

    data = request.get_json()
    
    if 'review' in data:  # Text prediction case
        review = data.get('review', '').strip()
        if not review:
            return jsonify({'prediction': 'ไม่มีข้อความให้วิเคราะห์'})
        
        X = vectorizer.transform([review])
        prediction = model_text.predict(X)[0]
        result = "เชิงบวก" if prediction == 1 else "เชิงลบ"
        return jsonify({'prediction': result})
    
    elif 'image' in request.files:  # Image prediction case
        file = request.files['image']
        if file.filename == '':
            return jsonify({"error": "ไม่มีชื่อไฟล์"}), 400
        
        try:
            # Convert image to grayscale and resize to match MNIST model input
            img = Image.open(file).convert("L").resize((28, 28))
            img_array = img_to_array(img) / 255.0
            img_array = img_array.reshape(1, 28, 28, 1)

            prediction = model_mnist.predict(img_array)
            predicted_class = int(np.argmax(prediction, axis=1)[0])

            return jsonify({"prediction": predicted_class})
        
        except Exception as e:
            return jsonify({"error": f"เกิดข้อผิดพลาด: {str(e)}"}), 500

    else:
        return jsonify({"error": "ไม่พบข้อมูลที่ถูกต้องสำหรับการทำนาย"}), 400

if __name__ == '__main__':
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port, debug=True)
