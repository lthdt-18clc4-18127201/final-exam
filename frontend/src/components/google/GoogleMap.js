import React, { useEffect, useState } from "react";
import { REACT_APP_GG_APIKEY } from "../../constants/constants.js";
import {
  APIProvider,
  Map,
  AdvancedMarker,
  InfoWindow,
} from "@vis.gl/react-google-maps";
import axios from "../../state/axios-instance.js";

const GoogleMap = ({ places }) => {
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [billboards, setBillboards] = useState([]); // [
  const [selectedLocation, setSelectedLocation] = useState({
    lat: 0,
    lng: 0,
  });

  useEffect(() => {
    const getCurrentPosition = async () => {
      navigator.geolocation.getCurrentPosition((position) => {
        console.log(position);
        const { latitude, longitude } = position.coords;
        setSelectedLocation({
          lat: latitude,
          lng: longitude,
        });
      });
    };
    getCurrentPosition();
  }, []);

  const handleMarkerClick = async (place) => {
    setSelectedPlace(place);

    try {
      // Call the API to get all billboard data for the selected place
      axios
        .get(`/api/places/boardbills?placeId=${place._id}`)
        .then((res) => {
          setBillboards(res.data);
          console.log(res.data);
        })
        .catch((err) => console.log(err));
    } catch (error) {
      console.error("Error fetching billboard data:", error);
    }
  };

  return (
    <APIProvider apiKey={REACT_APP_GG_APIKEY}>
      <div style={{ height: "80vh", width: "100%" }}>
        <Map zoom={14} center={selectedLocation} mapId={"MapIDTeam13"}>
          {places.map((place, index) => (
            <AdvancedMarker
              key={index}
              position={place}
              onClick={() => handleMarkerClick(place)}
            >
              {place.isPlanned ? (
                <div
                  style={{
                    position: "absolute",
                    top: "-15px",
                    left: "-15px",
                    width: "30px",
                    height: "30px",
                    borderRadius: "50%",
                    backgroundColor: "blue",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    fontSize: "14px",
                    fontWeight: "bold",
                    color: "white",
                  }}
                >
                  QC
                </div>
              ) : (
                <div
                  style={{
                    position: "absolute",
                    top: "-15px",
                    left: "-15px",
                    width: "30px",
                    height: "30px",
                    borderRadius: "50%",
                    backgroundColor: "red",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    fontSize: "14px",
                    fontWeight: "bold",
                    color: "white",
                  }}
                >
                  QC
                </div>
              )}
            </AdvancedMarker>
          ))}

          {selectedPlace && (
            <InfoWindow position={selectedPlace}>
              <div>
                <h4>{selectedPlace.advertisingForm}</h4>
                <p>{selectedPlace.locationType}</p>
                <p>{`${selectedPlace.address}, Phuong ${selectedPlace.ward}, Quan ${selectedPlace.district}`}</p>
                <p style={{ fontWeight: "bold", fontStyle: "italic" }}>
                  {selectedPlace.isPlanned ? "ĐÃ QUY HOẠCH" : "CHƯA QUY HOẠCH"}
                </p>
              </div>
            </InfoWindow>
          )}
        </Map>
      </div>
      {billboards.length > 0 && (
        <div
          className="bg-white"
          style={{
            width: "30vw",
            background: "white",
            position: "absolute",
            right: "0",
            height: "100%",
            marginTop: "100px",
          }}
        >
          {billboards.map((billboard, index) => (
            <div
              key={index}
              style={{
                // position: "absolute",
                right: 0,
                // width: "30%",
                margin: "10px",
                padding: "10px",
                border: "1px solid black",
                backgroundColor: "white",
                // top: `${index * 40}%`, // Add this line
              }}
            >
              <h3 style={{ fontWeight: "bold" }}>{billboard.title}</h3>
              <p>
                {selectedPlace.address}, Phường: {selectedPlace.ward}, Quận:{" "}
                {selectedPlace.district}
              </p>
              <p>
                Kích thước: {billboard.width}m x {billboard.height}m
              </p>
              <p>Số lượng: {billboard.quantity} trụ/bảng</p>
              <p>Hình thức: {selectedPlace.advertisingForm}</p>
              <p>Phân loại: {selectedPlace.locationType}</p>
            </div>
          ))}
        </div>
      )}
    </APIProvider>
  );
};

export default GoogleMap;
