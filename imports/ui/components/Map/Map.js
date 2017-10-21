import React from "react"
import { compose, withProps, withStateHandlers } from "recompose";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow,
} from "react-google-maps";

const coords = [
  { lat: 34.098217, lng: -118.3417069999999 },
  { lat: 39.7675712, lng: -104.8993491 },
  { lat: 38.6183631, lng: -90.1924788 },
  { lat: 39.918925, lng: 116.41488400000003 },
  { lat: 34.987774, lng: 135.75955 },
  { lat: -35.2755991, lng: 149.13076120000005 },
  { lat: 51.1036128, lng: -115.36336499999999 },
  { lat: 21.274599, lng: -157.82414900000003 }
]

function coord() {
    return coords[Math.floor(Math.random() * (8 - 1)) + 1]
}


const MapWithAMakredInfoWindow = compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyDr94w2Y9dlNUkmnNBm_BmaeGTUaZUDJ7Y&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withStateHandlers(() => ({
    isOpen: true,
  }), {
    onToggleOpen: ({ isOpen }) => () => ({
      isOpen: !isOpen,
    })
  }),
  withScriptjs,
  withGoogleMap
)(props =>
  <GoogleMap
    defaultZoom={10}
    defaultCenter={coord()}
  >
    <Marker
      position={coord()}
      onClick={props.onToggleOpen}
    >
      {props.isOpen && <InfoWindow onCloseClick={props.onToggleOpen}>
        <h1>Location of picture</h1>
      </InfoWindow>}
    </Marker>
  </GoogleMap>
);

export default MapWithAMakredInfoWindow;