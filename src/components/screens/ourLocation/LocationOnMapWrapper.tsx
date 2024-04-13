import React from "react";
import { Wrapper } from "@googlemaps/react-wrapper";

export const LocationOnMapWrapper = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const apiKey = "AIzaSyCkZkdP7FtBZlixH39M0M6eEfDZdCb4EbY";

  if (!apiKey) {
    return <div>Cannot display the map: google maps api key missing</div>;
  }

  return <Wrapper apiKey={apiKey}>{children}</Wrapper>;
};