import { useEffect, useState, useContext } from "react";
import ItemCard from "../../components/itemCard";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import { CategoryContext } from "../../context/CategoryDetailsContext";

function CustomerHomePageItemDashBoard() {

  const { selectedCategory, setSelectedCategory } = useContext(CategoryContext);
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const route_path = "/Catagories/";

  useEffect(() => {
    // Make an Axios GET request to your backend to fetch product data
    Axios.get("http://localhost:3005/product/getCategories")
      .then((response) => {
        // console.log("Got a response");
        const parsedCategories = JSON.parse(response.data); // Parse the JSON string
        setCategories(parsedCategories); // Assuming the response is an array of product objects
        // console.log("Catgoeries:",parsedCategories)
        console.log("Catgoeries:", categories);
      })
      .catch((error) => {
        console.error("Error fetching product data:", error);
      });
  }, []);

  useEffect(() => {
    console.log("Updated Categories:", categories);
  }, [categories]);

  const func = () => {
    console.log(
      "Selected Category ID inside func:",
      selectedCategory.Product_Category_Id
    );
    // Check if a category name is selected
    if (selectedCategory.Product_Category_Id) {
      // Send the selected category ID to the backend
      Axios.post("http://localhost:3005/product/postCategoryID", {
        selectedCategoryID: selectedCategory.Product_Category_Id,
      })
        .then(() => {
          console.log(
            "Data sent to the backend:",
            selectedCategory.Product_Category_Id
          );
          // navigate("/pages/CustomerHomePage");
          // You can handle the response from the backend here
        })
        .catch((error) => {
          console.error("Error sending data to the backend:", error);
        });
    }
  };

  return (
    <div
      style={{
        marginLeft: "60px",
        display: "grid",
        gridTemplateColumns: "repeat(2, 1fr)", // 3 columns
        gridGap: "16px", // Adjust the gap as needed
        padding: "26px", // Add padding to the grid
        justifyContent: "center", // Center the grid horizontally
        alignItems: "center", // Center the grid vertically
      }}
    >
      {categories.map((category, index) => {
        return (
          <ItemCard
            key={index}
            image={route_path + category.Category_Image}
            title={category.Category_Name}
            description={category.description}
            button1Label="See More"
            onClickButton1={() => {
              setSelectedCategory({
                Product_Category_Id: category.Product_Category_Id,
                Category_Name: category.Category_Name,
              });
              // history.push('../pages/ProductsPage');

              navigate(`/pages/CustomerSubCategoryPage/${category.Product_Category_Id}/${category.Category_Name}`);
            }}
            // onClickButton2={() => {console.log('Button 2 clicked')}}
          />
        );
      })}
    </div>
  );
};

export default CustomerHomePageItemDashBoard;
