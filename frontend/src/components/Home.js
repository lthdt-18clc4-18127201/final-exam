import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Map from "./Map/Map";


const Home = () => {
  const user = useSelector((state) => state.user.user);
  const [selectedLocation, setSelectedLocation] = useState({
    lat: 0,
    lng: 0
  });

  
  useEffect(() => {
    const getCurrentPosition = async () => {
      navigator.geolocation.getCurrentPosition(position => {
        const { latitude, longitude } = position.coords;
        setSelectedLocation({
          lat: latitude,
          lng: longitude
        });
      });
    }
    getCurrentPosition();
    
  }, []);

  return (
    <div style={{ width: "100%" }}>
      <h1>This is homepage, Hello {user.name}</h1>
      <Map
        selectedLocation={selectedLocation}
        setSelectedLocation={setSelectedLocation}
      />
    </div>
  );
};

export default Home;
