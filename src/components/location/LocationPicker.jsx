import { useState, useEffect } from "react";
import { GoogleMap, Marker, MarkerF } from "@react-google-maps/api";
import AutoComplete from "./AutoComplete";
import { BiCurrentLocation } from "react-icons/bi";
import { load } from "../../App";
import { Box, Button } from "@chakra-ui/react";

const mapContainerStyle = {
  width: "100%",
  height: "400px",
};

const currentLocBtnStyle = {
  padding: "7px",
  width: 40,
  height: 40,
  minWidth: "auto",
  background: "black",
  position: "absolute",
  top: 15,
  right: 10,
};

const LocationPicker = ({ location, setLocation }) => {
  const geocoder = new window.google.maps.Geocoder();

  const [map, setMap] = useState({
    panTo() {},
  });

  const handleCurrentLocationClick = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      geocoder.geocode(
        {
          location: {
            lat: Number(position.coords.latitude),
            lng: Number(position.coords.longitude),
          },
        },
        (results, status) => {
          if (status === "OK") {
            setLocation({
              lat: Number(position.coords.latitude),
              lng: Number(position.coords.longitude),
              addressText: results[0].formatted_address,
            });
          } else {
            console.log("Getting address failed due to : ", status);
          }
        }
      );
    });
  };

  const onSelect = ({ latLng }) => {
    geocoder.geocode(
      { location: { lat: Number(latLng.lat()), lng: Number(latLng.lng()) } },
      (results, status) => {
        if (status === "OK") {
          setLocation({
            lat: Number(latLng.lat()),
            lng: Number(latLng.lng()),
            addressText: results[0].formatted_address,
          });
        } else {
          console.log("Google maps couldn't load");
        }
      }
    );
  };
  const options = {
    disableDefaultUI: true,
    zoomControl: true,
    mapTypeControl: true,
    streetViewControl: false,
  };

  useEffect(() => {
    if (location?.lat && location?.lng) {
      map.panTo({ lat: location?.lat, lng: location?.lng });
    }
  }, [location?.lat, location?.lng, map]);

  useEffect(() => {
    handleCurrentLocationClick();
  }, []);
  return (
    <>
      {load?.isLoaded ? (
        <Box style={{ width: "100%" }}>
          <AutoComplete
            defaultLocation={location?.addressText}
            setMeetingLocation={setLocation}
            isDisabled={false}
          />
          <div style={{ marginTop: 30 }}></div>
          <GoogleMap
            onLoad={(map) => setMap(map)}
            mapContainerStyle={mapContainerStyle}
            center={location}
            zoom={15}
            onClick={onSelect}
            options={options}
          >
            <MarkerF
              position={{ lat: location?.lat, lng: location?.lng}}
              
            />

            <Button
              onClick={handleCurrentLocationClick}
              variant="contained"
              style={currentLocBtnStyle}
            >
              <BiCurrentLocation color="white" size={25} />
            </Button>
          </GoogleMap>
        </Box>
      ) : (
        <div>Your map is loading...</div>
      )}
    </>
  );
};

export default LocationPicker;
