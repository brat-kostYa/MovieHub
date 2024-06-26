import {
    MarkerClusterer,
    SuperClusterAlgorithm,
  } from "@googlemaps/markerclusterer";
  
  import { addSingleMarkers } from "./addSingleMarker";
  
  export const addClusterMarkers = ({
    locations,
    map,
  }: {
    locations: ReadonlyArray<google.maps.LatLngLiteral>;
    map: google.maps.Map | null | undefined;
  }) => {
    const markers = addSingleMarkers({ locations, map });
  
    // Merge markers into clusters
    new MarkerClusterer({
      markers,
      map,
      algorithm: new SuperClusterAlgorithm({
        radius: 350, // cluster size
      }),
    });
  };