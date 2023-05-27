import React from "react";
import MapIcon from "../../../assets/images/map/map-icon.svg";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Icon } from "leaflet";
import s from "./stocksMap.module.css";
import "leaflet/dist/leaflet.css";

interface StocksMapProps {
  isActive: boolean;
  setIsActive: () => void;
}

const StocksMap: React.FC<StocksMapProps> = ({ isActive, setIsActive }) => {
  const position = [42.870689734218246, 74.611762541423];

  const customIcon = new Icon({
    iconUrl: MapIcon,
    iconSize: [49, 58],
  });

  return (
    <div onClick={setIsActive} className={`${s.root} ${isActive ? s.active : ""}`}>
      <div onClick={(e) => e.stopPropagation()} className={s.content}>
        <MapContainer
          /*@ts-ignore */
          center={position}
          zoom={20}
          className={s.map}
        >
          <TileLayer
            /*@ts-ignore*/
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker
            /*@ts-ignore*/
            position={position}
            icon={customIcon}
          >
            <Popup>Полет на воздушном шаре с трансфером из Москвы</Popup>
          </Marker>
        </MapContainer>
      </div>
    </div>
  );
};

export default StocksMap;
