import React, { useState } from "react";
import product_data from "../data/prodData";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import Searchbar from "./Searchbar";
import ReactPaginate from "react-paginate";

const Product = () => {
  console.log(product_data);
  const [filteredData, setFilteredData] = useState(product_data);
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage] = useState(6);
  const [sortOrder, setSortOrder] = useState("desc");
  const handleSearchData = (data) => {
    setFilteredData(data);
  };

  const handleSort = () => {
    const newSortOrder = sortOrder === "desc" ? "asc" : "desc";
    setSortOrder(newSortOrder);

    // Sort the filtered data based on price
    const sortedData = filteredData.sort((a, b) => {
      if (newSortOrder === "asc") {
        return a.price - b.price;
      } else {
        return b.price - a.price;
      }
    });

    setFilteredData([...sortedData]); // Update the filtered data with the sorted array
  };

  const indexOfLastItem = (currentPage + 1) * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const listItems = currentItems
    ? currentItems.map((item) => (
        <Card className="w-96 m-2">
          <CardHeader shadow={false} floated={false} className="h-96">
            <img
              src={item.thumbnail}
              alt={item.title}
              className="w-96 h-96 object-cover"
            />
          </CardHeader>
          <CardBody className="m-2">
            <div className="flex items-center justify-between mb-2">
              <Typography color="blue-gray" className="font-medium">
                {item.title}
              </Typography>
              <Typography color="blue-gray" className="font-medium">
                <span>$</span>
                {item.price}
              </Typography>
            </div>
            <Typography
              variant="small"
              color="gray"
              className="font-normal opacity-75 m-2"
            >
              {item.description}
            </Typography>
          </CardBody>
          <CardFooter className="pt-0">
            <Button
              ripple={false}
              fullWidth={true}
              className="bg-slate-300 text-blue-gray-900 shadow-none hover:shadow-none hover:scale-105 focus:shadow-none focus:scale-105 active:scale-100"
            >
              Add to Cart
            </Button>
          </CardFooter>
        </Card>
      ))
    : null;

  const pagination = (
    <ReactPaginate
      previousLabel={"Previous"}
      nextLabel={"Next"}
      breakLabel={"..."}
      breakClassName={"break-me"}
      pageCount={totalPages}
      marginPagesDisplayed={2}
      pageRangeDisplayed={5}
      onPageChange={handlePageChange}
      containerClassName={"pagination"}
      subContainerClassName={"pages pagination"}
      activeClassName={"active"}
      className={"flex gap-4 m-5 pagination "}
    />
  );

  return (
    <div className="flex flex-col items-center">
      <section className="flex flex-col md:flex-row items-center justify-between ">
        <Searchbar onSearch={handleSearchData} />
        <div className="flex justify-end m-5">
          <Button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md "
            color="blue"
            onClick={handleSort}
          >
            Sort({sortOrder === "desc" ? "Descending" : "Ascending"})
          </Button>
        </div>
      </section>
      <section className="flex flex-wrap items-center justify-between gap-8 m-5">
        {listItems}
      </section>
      {pagination}
    </div>
  );
};

export default Product;