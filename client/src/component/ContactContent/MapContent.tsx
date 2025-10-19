import {
  Circle,
  DirectionsRenderer,
  GoogleMap,
  LoadScript,
  Marker,
  MarkerClusterer,
} from "@react-google-maps/api";
import { useState } from "react";
import { CiLocationOn } from "react-icons/ci";
const containerStyle = {
  width: "93vw",
  height: "80vh",
};
type DirectionsResult = google.maps.DirectionsResult;
type LatLngLiteral = google.maps.LatLngLiteral;

const YOUR_API_KEY = import.meta.env.VITE_YOUR_API_KEY;

const MapCompontentMap = () => {
  const [coords, setcoords] = useState<LatLngLiteral>({
    lat: 0,
    lng: 0,
  });
  const venuLocation = {
    lat: 6.331,
    lng: 8.078,
  };

  const [directions, setdirections] = useState<DirectionsResult>();

  const handleLocation = () => {
    if (navigator.geolocation && navigator.geolocation) {
      navigator.geolocation &&
        navigator.geolocation.getCurrentPosition((position) => {
          const { latitude, longitude, accuracy } = position.coords;
          console.log(latitude, longitude, accuracy);
          setcoords({
            lat: latitude,
            lng: longitude,
          });
        });
    }
  };

  const handleDirctions = () => {
    const service = new google.maps.DirectionsService();
    console.log(service);

    service.route(
      {
        origin: coords,
        destination: venuLocation,
        travelMode: google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === "OK" && result) {
          setdirections(result);
        }
      }
    );
  };
  const options = {
    disableDefaultUI: true,
    disableDoubleClickZoom: false,
  };

  return (
    <div className="w-full relative h-full bg-primary1 dark:bg-slate-800/95">
      <div className="flex w-full flex-wrap items-center justify-between mb-3">
        <div className="flex gap-2 items-center font-bold flex-wrap">
          <h1 className="text-[min(5vw,20px)] font-serif whitespace-normal">
            Your Location is
          </h1>
          <span className="px-4 pt-2 pb-2.5 capitalize bg-secondary text-primary1 font-bold text-sm rounded-full">
            {coords.lat && coords.lng !== 0 ? "active" : "off"}
          </span>
        </div>
        <button
          className="px-5 py-3 bg-secondary text-primary1 font-bold text-sm transition-all mb-2 rounded-md hover:rounded-full"
          onClick={handleLocation}
        >
          <p>Get Location</p>
        </button>
      </div>

      <LoadScript
        loadingElement={<LoaderAnimation />}
        googleMapsApiKey={YOUR_API_KEY}
        // libraries={["places"]}
        onError={() => console.log("err")}
      >
        <GoogleMap
          options={options}
          mapContainerStyle={containerStyle}
          center={coords.lat && coords.lng !== 0 ? coords : venuLocation}
          zoom={5}
        >
          {venuLocation && (
            <>
              {directions && (
                <DirectionsRenderer
                  options={{
                    polylineOptions: {
                      zIndex: 10,
                      strokeColor: "blue",
                      strokeOpacity: 0.8,
                      strokeWeight: 2,
                    },
                  }}
                  directions={directions}
                />
              )}

              <Marker
                position={venuLocation}
                icon="https://cdn-icons-png.flaticon.com/128/3866/3866949.png"
              />
              {coords.lat && coords.lng !== 0 && (
                <MarkerClusterer>
                  {(clusterer) => (
                    <Marker
                      position={coords}
                      clusterer={clusterer}
                      onClick={() => {
                        handleDirctions();
                      }}
                    />
                  )}
                </MarkerClusterer>
              )}

              <Circle
                center={venuLocation}
                options={{
                  zIndex: 0.5,
                  fillColor: "orange",
                  fillOpacity: 0.03,
                  strokeColor: "orange",
                  strokeWeight: 2,
                  draggable: false,
                  clickable: false,
                  visible: true,
                }}
                radius={20000}
              />
            </>
          )}
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default MapCompontentMap;

export const LoaderAnimation = () => {
  return (
    <div className="w-full min-h-[55vh] flex justify-center items-center">
      <div className="bg-primary dark:bg-primary1/70 p-3 dark:p-2 dark:shadow-primary shadow hover:shadow-lg cursor-pointer transition-all drop-shadow-md rounded-full w-auto group">
        <div className="text-4xl shadow-md drop-shadow animate-bounce group-hover:animate-pulse font-bold bg-yellow-800 p-2.5 rounded-full text-white">
          <CiLocationOn />
        </div>
      </div>
    </div>
  );
};
