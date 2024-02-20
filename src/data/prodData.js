
import importedEmbeddingsData from "./embeddingsData.js";
const allKeys = Object.keys(importedEmbeddingsData);
const product_data = [];

allKeys.forEach((key, index) => {
  product_data.push({
    id: index + 1,
    title: key,
    description: "Cultura y epoca",
    price: 1,
    embedding: importedEmbeddingsData[key],
    category: "vase",
    thumbnail: "/images/" + key + "a.jpg",
  });
});
  
  export default product_data;