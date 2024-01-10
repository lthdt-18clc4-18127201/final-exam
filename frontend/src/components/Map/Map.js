import React, { useRef, useCallback } from "react";
import { GoogleMap, useLoadScript, MarkerF } from "@react-google-maps/api";
import { REACT_APP_GG_APIKEY } from "../../constants.js";
import SearchLocation from "./SearchLocation.js";

const Map = ({ selectedLocation, setSelectedLocation }) => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: REACT_APP_GG_APIKEY,
  });
  const mapRef = useRef();
  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);
  if (loadError) return "Error";
  if (!isLoaded) return "Maps";

  return (
    <div style={{ marginTop: "50px" }}>
      <SearchLocation setSelectedLocation={setSelectedLocation} />
      <GoogleMap
        mapContainerStyle={{
          height: "650px",
        }}
        center={selectedLocation}
        zoom={18}
        onLoad={onMapLoad}
      >
        <MarkerF
          position={selectedLocation}
          icon={"http://maps.google.com/mapfiles/ms/icons/red-dot.png"}
        />
      </GoogleMap>
    </div>
  );
};

export default Map;
