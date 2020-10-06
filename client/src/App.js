import React, { useState, useEffect } from 'react';
import './App.css';
import ReactMapGL, { Marker, Popup } from 'react-map-gl'
import { list_log_entries } from './api';
import LogEntryForm from './components/LogEntryForm';


function App() {
  const [viewport, setViewport] = useState({
    width: '100vw',
    height: '100vh',
    latitude: 22.572645,
    longitude: 88.363892,
    zoom: 5
  });

  const [logEntries, setLogEntries] = useState([])
  const [addEntryLocation, setAddEntryLocation] = useState(null);
  const [showPopup, setShowPopup] = useState({})
  // Immediately-invoked Function Expressions (IIFE)

  useEffect(() => {
    console.log("effect");
    (async () => {
      const logEntries = await list_log_entries()
      setLogEntries(logEntries);
      console.log(logEntries);
    })();

  }, [])

  const showAddMarkerPopup = (event) => {
    const [longitude, latitude] = event.lngLat;
    setAddEntryLocation(
      {
        latitude,
        longitude
      }
    )
  }
  return (
    <div className="App">
      <ReactMapGL

        {...viewport}
        mapStyle="mapbox://styles/sumax/ckfxsi3n00cvr19nzn2pmw1ib"
        onViewportChange={nextViewport => setViewport(nextViewport)}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_API}


        onDblClick={showAddMarkerPopup}
      >
        {logEntries.map(entry => (
          <>
            <Marker
              key={entry._id}
              latitude={entry.latitude}
              longitude={entry.longitude}
              offsetLeft={-12}
              offsetTop={-24}
            >
              <svg
                onClick={() => setShowPopup({
                  ...showPopup,
                  [entry._id]: true
                })}
                className="marker"
                viewBox="0 0 24 24" width="24" height="24" strokeWidth="2" fill="none"
                strokeLinecap="round" strokeLinejoin="round" >
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
            </Marker>
            {showPopup[entry._id] ?
              <Popup
                latitude={entry.latitude}
                longitude={entry.longitude}
                closeButton={true}
                closeOnClick={false}
                onClose={() => showPopup({
                })}
                anchor="top" >
                <div
                  className="popup"
                >

                  <h4>{entry.title}</h4>
                  <p>{entry.description}</p>
                  <span>Visited on : {new Date(entry.visitDate).toLocaleDateString()}</span>

                </div>
              </Popup> : null}:
          </>
        ))
        }
        {
          addEntryLocation ? (
            <>
              <Marker

                latitude={addEntryLocation.latitude}
                longitude={addEntryLocation.longitude}
              >
                <svg
                  onClick={() => setShowPopup({
                    ...showPopup,
                    [addEntryLocation._id]: true
                  })}
                  className="marker"
                  viewBox="0 0 24 24" width="24" height="24" strokeWidth="2" fill="none"
                  strokeLinecap="round" strokeLinejoin="round" >
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
              </Marker>
              <Popup
                latitude={addEntryLocation.latitude}
                longitude={addEntryLocation.longitude}
                closeButton={true}
                closeOnClick={false}
                onClose={() => setAddEntryLocation(null)}
                anchor="top" >
                <div
                  className="popup"
                >

                  <LogEntryForm location={addEntryLocation} />
                </div>
              </Popup>
            </>
          ) : null
        }

      </ReactMapGL>
    </div>
  );
}

export default App;
