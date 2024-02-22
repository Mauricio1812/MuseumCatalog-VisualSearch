import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import product_data from "../data/prodData";
import * as tf from '@tensorflow/tfjs';
import { Pinecone } from '@pinecone-database/pinecone';

const API_KEY = process.env.REACT_APP_PINECONE_API_KEY
const pc = new Pinecone({apiKey: API_KEY});
const index = pc.index("museum");

const loadModel = async (selectedImage, onEmbedding) => {
  const model = await tf.loadGraphModel(process.env.PUBLIC_URL + 'webmodel/model.json');
  //const model = await tf.loadGraphModel("https://www.kaggle.com/models/google/mobilenet-v2/frameworks/TfJs/variations/140-224-feature-vector/versions/3", { fromTFHub: true })

  const img = new Image();
  img.src = selectedImage;
  img.onload = async () => {
    const imgTensor = tf.browser.fromPixels(img).toFloat();
    const resizedImgTensor = tf.image.resizeBilinear(imgTensor, [224, 224]).expandDims(0);
    const prediction = await model.predict(resizedImgTensor).data();
    console.log(prediction);
    const vector = Array.from(prediction);
    const queryResponse = await index.query({
      vector: vector,
      topK: 10,
    });
    const filtered_titles = queryResponse.matches.map((match) => match.id);

    const filteredData = filtered_titles.map((title) =>
      product_data.filter((item) =>
        item.title.toLowerCase().includes(title.toLowerCase())
      )[0]
    );
    //console.log(filteredData);
    onEmbedding(filteredData);
  };
  img.src = selectedImage
}

const Searchbar = ({ onSearch, onEmbedding }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchClick = () => {
    const filteredData = product_data.filter((item) =>
      item.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
    console.log(filteredData);
    onSearch(filteredData);
  };

  // // Filter the data based on the search query
  // const filteredData = product_data.filter((item) =>
  //   item.title.toLowerCase().includes(searchQuery.toLowerCase())
  // );

  const [selectedImage, setSelectedImage] = useState(null); 
  const [result, setResult] = useState("");

  const handleImageUpload = (event) => {
    const image = event.target.files[0];
    const imageSrc = URL.createObjectURL(image);
    setSelectedImage(imageSrc);
    loadModel(imageSrc, onEmbedding); //previously setResult
  };

    return (
      <div>
        <div className="box">
          <div className="innerbox">
            <input type="file" accept="image/*" onChange={handleImageUpload} /> 
            {selectedImage && <img width={300} height={300} src={selectedImage} alt="selected" />}
          </div>
          <div>prediction result: {result}</div>
        </div>
        <div className="flex items-center p-2 space-x-6 rounded-xl">
          <div className="flex bg-gray-100 p-2 w-62 space-x-4 rounded-lg">
            <FaSearch className="h-6 w-6 opacity-30" />
            <input
              className="bg-gray-100 outline-none"
              type="text"
              placeholder="Type to search..."
              value={searchQuery}
              onChange={handleSearchInputChange}
            />
          </div>
          <div
            className="bg-gray-800 py-2 px-5 text-white font-semibold rounded-md hover:shadow-lg transition duration-3000 cursor-pointer"
            onClick={handleSearchClick}
          >
            <span>Search</span>
          </div>
        </div>
      </div>
    );
  };

export default Searchbar;