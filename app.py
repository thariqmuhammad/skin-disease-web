import os
from flask import Flask, render_template, request
import cv2
from werkzeug.utils import secure_filename
import random
import tensorflow as tf
import matplotlib.pyplot as plt
import numpy as np
from PIL import Image
from tensorflow import keras
from keras.models import load_model
import base64

from yaml import dump
from zmq import NULL

app = Flask(__name__)


@app.route('/')
def home():
    return render_template("home.html")


@app.route('/predic', methods=['GET', 'POST'])
def predic():
    return render_template("predic.html")


@app.route('/tescam')
def tes():
    return render_template("tescam.html")


@app.route('/tangkap', methods=['GET', 'POST'])
def tangkap():
    print(request.form.get('coba'))
    return render_template('tangkap.html')


@app.route('/proses', methods=['GET', 'POST'])
def proses():
    class_names = ['Eksim', 'Herpes', 'Jerawat', 'Kudis', 'Normal', 'Rosacea']
    dataGambar = request.form.get('uriGambar')  # url gambar hasil capture

    # upload gambar via webcam ke folder
    datas = dataGambar[22:]
    Capture_image = b'' + datas.encode()
    filename = str(random.randrange(1, 10000)) + ".jpg"
    # simpan gambar ke folder
    with open(f"gambar/{filename}.jpg", "wb") as fh:
        fh.write(base64.decodebytes(Capture_image))
    files = f"gambar/{filename}.jpg"

    # ==================> KODE PROSES DISINI <=====================
    if request.method == "POST":
        my_reloaded_model = load_model('Model_Resnet50_85%.h5')

        img = Image.open(files)
        resize_image = img.resize((150, 150))

        y = tf.keras.preprocessing.image.img_to_array(resize_image)
        x = y[..., :3]
        x = np.expand_dims(x, axis=0)
        images = np.vstack([x])

        prediction = my_reloaded_model.predict(images)
        output = class_names[np.argmax(prediction[0])]
        confidence = round(100 * (np.max(prediction[0])), 2)
    # mengecek hasil dan redirect ke halaman sesuai hasil
    re = ""
    if(output == "Kudis"):
        re = "ket_hasil/kudis.html"
    elif(output == "Jerawat"):
        re = "ket_hasil/jerawat.html"
    elif(output == "Eksim"):
        re = "ket_hasil/eksim.html"
    elif(output == "Herpes"):
        re = "ket_hasil/herpes.html"
    elif(output == "Rosacea"):
        re = "ket_hasil/rosacea.html"
    else:
        re = "ket_hasil/normal.html"
    # ==================> END KODE PROSES <========================
    return render_template(f"{re}", data=dataGambar, hasil=output, percentage=confidence)


if __name__ == "__main__":
    app.run(debug=True)
