import numpy as np
from flask import Flask, request, jsonify, json, Response
from werkzeug.exceptions import HTTPException
import tensorflow as tf
import cv2
import base64
from flask_cors import CORS, cross_origin

app = Flask(__name__)
IMG_SIZE = 180
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

def convertImage(base64_str, filepath):
  with open(filepath, "wb") as fh:
    fh.write(base64.decodebytes(base64_str.encode()))

@app.route('/predict', methods=['POST'])
@cross_origin()
def predict():
  sended_img = request.json['gambar']
  filepath = 'backend/output/image.jpg'
  convertImage(sended_img, filepath)
  
  image = open(filepath, "rb").read()
  npimg = np.fromstring(image, np.uint8)
  img_predict = cv2.imdecode(npimg, cv2.IMREAD_COLOR)
  
  resized_img = cv2.resize(img_predict, (IMG_SIZE, IMG_SIZE)) #resizing image
  resized_img = resized_img.reshape(1, IMG_SIZE, IMG_SIZE, 3) #reshaping
  
  model = tf.keras.models.load_model('backend/model/dataset.h5')
  predicted = model.predict(resized_img)
  number_class = np.argmax(predicted)
  
  classes = ["Healthy", "Leaf Curl", "Leaf Spot", "White Fly", "Yellowish"]
  output_class = classes[np.argmax(predicted)]
  
  percentage = predicted[0][number_class] * 100
  
  json_data = {"status": 200,"message": "Predicted Success", "predicted_class": output_class, "percentage": '{:.2f}'.format(percentage) + '%'}
  return jsonify(json_data)

@app.errorhandler(HTTPException)
def handle_exception(e):
  response = e.get_response()
  response.data = json.dumps({
    "code": e.code,
    "name": e.name,
    "description": e.description,
  })
  response.content_type = "application/json"
  return response


if __name__ == '__main__':
  app.run(debug=True, port=5000, threaded=True, host='0.0.0.0')