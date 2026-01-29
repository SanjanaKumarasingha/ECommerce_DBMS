import ItemCard from "../../components/itemCard";
import Axios from "axios";
import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CategoryContext } from "../../context/CategoryDetailsContext";

const HomePageItemDashBoard = () => {
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
            image={route_path +category.Category_Image}
            title={category.Category_Name}
            description={category.description}
            button1Label="See More"
            onClickButton1={() => 
              {      
                setSelectedCategory({Product_Category_Id:category.Product_Category_Id,Category_Name:category.Category_Name});
                navigate(`/pages/SubCategoryPage/${category.Product_Category_Id}/${category.Category_Name}`);

              }
            }
          />
        );
      })}
</div>
  )
}

export default HomePageItemDashBoard
