import './App.css'
import 'leaflet/dist/leaflet.css';
import marker from './assets/marker-icon.png'

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Icon, divIcon } from 'leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';

function App() {
  // markers
  const markers = [
    {
      geocode: [40.8780201293451, -73.87799157367265],
      popUp: "Williamsbridge Oval Tennis Courts"
    },
    {
      geocode: [40.891026512286004, -73.89231669434554],
      popUp: "Van Cortlandt Park Tennis Courts"
    }
  ]

  const customIcon = new Icon({
    iconUrl: marker,
    iconSize: [38, 38]
  })

  // create clusters when zooming out
  const createCustomClusterIcon = (cluster) => {
    return new divIcon({
      html: `<div class="cluster-icon">${cluster.getChildCount()}</div>`,
      className: "custom-marker-cluster",
      iconSize: point(33, 33, true)
    })
  }

  return (
    <div className="App">
      <MapContainer center={[40.877737736019625, -73.87799088320477]} zoom={17}>
        <TileLayer
          attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url='https://tile.openstreetmap.org/{z}/{x}/{y}.png'
        />

        <MarkerClusterGroup
          chunkedLoading
          iconCreateFunction={createCustomClusterIcon}
        >
          {markers.map(marker => (
            <Marker position={marker.geocode} icon={customIcon}>
              <Popup>
                <h2>{marker.popUp}</h2>
              </Popup>
            </Marker>
          ))}
        </MarkerClusterGroup>

      </MapContainer>
    </div>
  )
}

export default App
