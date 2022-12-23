import numpy as np
from flask import Flask, request, jsonify
import tensorflow as tf
import cv2

app = Flask(__name__)
IMG_SIZE = 180


@app.route('/predict', methods=['POST'])
def predict():
  image = request.files['image'].read()
  npimg = np.fromstring(image, np.uint8)
  img_predict = cv2.imdecode(npimg, cv2.IMREAD_COLOR)
  
  resized_img = cv2.resize(img_predict, (IMG_SIZE, IMG_SIZE)) #resizing image
  resized_img = resized_img.reshape(1, IMG_SIZE, IMG_SIZE, 3) #reshaping
  
  model = tf.keras.models.load_model('backend\model\dataset.h5')
  predicted = model.predict(resized_img)
  number_class = np.argmax(predicted)
  print(predicted[0][number_class])
  
  classes = ["Healthy", "Leaf Curl", "Leaf Spot", "White Fly", "Yellowish"]
  output_class = classes[np.argmax(predicted)]
  
  percentage = predicted[0][number_class] * 100
  
  json_data = {"status": 200,"message": "Predicted Success", "predicted_class": output_class, "percentage": '{:.2f}'.format(percentage) + '%'}
  return jsonify(json_data)


if __name__ == '__main__':
  app.run(debug=False, port=5000, threaded=True)