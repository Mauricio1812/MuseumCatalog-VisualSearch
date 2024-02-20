import "./App.css";
import React, { useState } from 'react';
import Footer from "./components/Footer";
import Header from "./components/Header";
import Product from "./components/Product";
import * as tf from '@tensorflow/tfjs';

const loadModel = async (selectedImage, setResult) => {
  const model2 = await tf.loadGraphModel(process.env.PUBLIC_URL + 'webmodel/model.json');

  const img = new Image();
  img.src = selectedImage;
  img.onload = async () => {
    const imgTensor = tf.browser.fromPixels(img).toFloat();
    const resizedImgTensor = tf.image.resizeBilinear(imgTensor, [224, 224]).expandDims(0);

    const prediction = await model2.predict(resizedImgTensor).data();
    console.log(prediction);
    setResult(prediction);
  };
  img.src = selectedImage
}

function App() {
  const [selectedImage, setSelectedImage] = useState(null); 
  const [result, setResult] = useState("");

  const handleImageUpload = (event) => {
    const image = event.target.files[0];
    const imageSrc = URL.createObjectURL(image);
    setSelectedImage(imageSrc);
    loadModel(imageSrc, setResult);
  }
  return (
    <div className="App">
      <Header />
      <div className="box">
        <div className="innerbox">
          <input type="file" accept="image/*" onChange={handleImageUpload} /> 
          {selectedImage && <img width={300} height={300} src={selectedImage} alt="selected" />}
        </div>
        <div>prediction result: {result}</div>
      </div>
      <Product />
      <Footer />
    </div>
  );
}

export default App;