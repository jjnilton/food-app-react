import Card from "../UI/Card";
import FoodListItem from "./FoodListItem";
import styles from "./FoodList.module.css";
import { useEffect, useState } from "react";

const FB_URL = process.env.REACT_APP_FB_URL;

// const data = [
//   {
//     id: 0,
//     name: "Coxinha",
//     description: "The stuff!",
//     price: 21.99,
//   },
//   {
//     id: 1,
//     name: "Schnitzel",
//     description: "A german specialty!",
//     price: 16.99,
//   },
//   {
//     id: 2,
//     name: "Barbecue Burger",
//     description: "America raw meaty.",
//     price: 12.99,
//   },
//   {
//     id: 3,
//     name: "Green Bowl",
//     description: "Healthy... and green...",
//     price: 22.99,
//   },
// ];

const FoodList = () => {
  const [data, setData] = useState([]);
  const [dataIsLoaded, setDataIsLoaded] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setStatusMessage("Loading...");
      try {
        const response = await fetch(
          FB_URL
        );
        if (!response.ok) {
          throw new Error(response.status, response.statusText);
        }
        const foods = await response.json();
        if (foods) {
          setDataIsLoaded(true);
          setData(foods);
        } else {
          setStatusMessage("Something went wrong.");
        }
      } catch (err) {
        setStatusMessage("Something went wrong.");
      }
    };
    fetchData();
  }, []);

  const foodItems = data.map((item) => {
    return (
      <FoodListItem
        key={item.id}
        id={item.id}
        name={item.name}
        description={item.description}
        price={item.price}
      ></FoodListItem>
    );
  });

  return (
    <Card>
      <ul className={styles.list}>
        {dataIsLoaded ? (
          foodItems
        ) : (
          <div className={styles["status-message"]}>{statusMessage}</div>
        )}
      </ul>
    </Card>
  );
};

export default FoodList;
