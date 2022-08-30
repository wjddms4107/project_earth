import React from 'react';
import {
  GoogleMap,
  useLoadScript,
  Circle,
  Marker,
} from '@react-google-maps/api';
import cctv from '../../../assets/images/cctv.svg';

export default function AreaDetailMap({ areaMapData }) {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: 'AIzaSyA-14N8FNLXVKB9NeF1eSnYYq8pItkBUaI',
  });

  const isData = areaMapData.length !== 0;
  if (!isData) return <div>로딩중입니다.</div>;

  if (!isLoaded) return <div>Loading...</div>;
  return <Map areaMapData={areaMapData} />;
}

function Map({ areaMapData }) {
  const center = {
    lat: Number(areaMapData[0].latitude),
    lng: Number(areaMapData[0].longitude),
  };

  const marker = {
    lat: Number(areaMapData[0].latitude),
    lng: Number(areaMapData[0].longitude),
  };

  // { lat: 36.27561, lng: 126.909785 }
  console.log(areaMapData[0]);
  // console.log(centerObj);

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
