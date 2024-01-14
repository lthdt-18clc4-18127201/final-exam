import React, { useEffect, useState } from "react";
import GoogleMap from "./google/GoogleMap";
import axios from "../state/axios-instance.js";

const Home = () => {
  const [places, setPlaces] = useState([]);
  useEffect(() => {
    axios
      .get("api/places")
      .then((res) => {
        setPlaces(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return <GoogleMap places={places} />;
};

export default Home;
