import React, { useRef, useEffect } from "react";
import { addClusterMarkers, addSingleMarkers } from './markers';

interface LocationOnMapProps {
    locations: ReadonlyArray<google.maps.LatLngLiteral>;
    useClusters?: boolean;
    mapId?: string;
    className?: string;
}

export const LocationOnMap: React.FC<LocationOnMapProps> = ({
    locations,
    useClusters = true,
    mapId,
    className
}) => {
    const ref = useRef<HTMLDivElement | null>(null);

    const DEFAULT_CENTER: google.maps.LatLngLiteral = { lat: 50.38144855078487, lng: 30.495695918798432 };
    const DEFAULT_ZOOM = 8;

    useEffect(() => {
        if (ref.current) {
            const map = new google.maps.Map(ref.current, {
                center: DEFAULT_CENTER,
                zoom: DEFAULT_ZOOM,
                mapId,
            });

            // Assumes addClusterMarkers and addSingleMarkers are defined in './markers'
            useClusters
                ? addClusterMarkers({ locations, map })
                : addSingleMarkers({ locations, map });
        }
    }, [locations, useClusters, mapId]);

    return (
        <div className="container-fluid" style={{ width: '100vw', height: '100vh' }}>
            <div
                className={className}
                ref={ref}
                style={{ width: '100%', height: '100%' }}
            />
        </div>
    );
};