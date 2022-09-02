import React from 'react';
import {
  GoogleMap,
  useLoadScript,
  Circle,
  Marker,
} from '@react-google-maps/api';
import cctv from 'assets/images/cctv.svg';

export const AreaDetailMap = ({ areaMapData }) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP,
  });

  if (!areaMapData) return <div>로딩중입니다.</div>;

  if (!isLoaded) return <div>Loading...</div>;
  return <Map areaMapData={areaMapData} />;
};

function Map({ areaMapData }) {
  const center = {
    lat: Number(areaMapData.latitude),
    lng: Number(areaMapData.longitude),
  };

  const marker = {
    lat: Number(areaMapData.cam_latitude),
    lng: Number(areaMapData.cam_longitude),
  };

  const containerStyle = {
    width: 'auto',
    height: '300px',
  };

  const options = {
    strokeColor: '#FFE600',
    strokeOpacity: 0.3,
    strokeWeight: 1,
    fillColor: '#FFE600',
    fillOpacity: 0.3,
    clickable: false,
    draggable: false,
    editable: false,
    visible: true,
    radius: 80,
    zIndex: 1,
  };

  return (
    <GoogleMap
      zoom={17}
      center={center}
      mapContainerStyle={containerStyle}
      mapTypeId="satellite"
    >
      <Marker position={marker} icon={cctv} />
      <Circle center={center} options={options} />
    </GoogleMap>
  );
}
