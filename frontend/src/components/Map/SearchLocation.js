import React, { useEffect, useRef, useState } from "react";
import { REACT_APP_GG_APIKEY } from "../../constants.js";

let autoComplete;

const loadScript = (url, callback) => {
  let script = document.createElement("script");
  script.type = "text/javascript";

  if (script.readyState) {
    script.onreadystatechange = function () {
      if (script.readyState === "loaded" || script.readyState === "complete") {
        script.onreadystatechange = null;
        callback();
      }
    };
  } else {
    script.onload = () => callback();
  }

  script.src = url;
  document.getElementsByTagName("head")[0].appendChild(script);
};

const SearchLocation = ({ setSelectedLocation }) => {
  const [location, setLocation] = useState("");
  const autoCompleteRef = useRef(null);

  const handleScriptLoad = (updateLocation, autoCompleteRef) => {
    autoComplete = new window.google.maps.places.Autocomplete(
      autoCompleteRef.current,
      {
        componentRestrictions: { country: "VN" },
      }
    );

    autoComplete.addListener("place_changed", () => {
      handlePlaceSelect(updateLocation);
    });
  };

  const handlePlaceSelect = (updateLocation) => {
    const addressObject = autoComplete.getPlace();

    const location = addressObject.formatted_address;
    updateLocation(location);

    const latLng = {
      lat: addressObject?.geometry?.location?.lat(),
      lng: addressObject?.geometry?.location?.lng(),
    };
    setSelectedLocation(latLng);
  };

  useEffect(() => {
    loadScript(
      `https://maps.googleapis.com/maps/api/js?key=${REACT_APP_GG_APIKEY}&libraries=places`,
      () => handleScriptLoad(setLocation, autoCompleteRef)
    );
  }, []);

  return (
    <div className="search-location-input">
      <label>Nhập địa chỉ của bạn</label>
      <input
        ref={autoCompleteRef}
        className="form-control"
        onChange={(e) => setLocation(e.target.value)}
        placeholder="Search Places ..."
        value={location}
      />
    </div>
  );
};

export default SearchLocation;
