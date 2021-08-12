import React, { useEffect, useState } from 'react';
import { csv } from 'd3-fetch';
import { scaleLinear } from 'd3-scale';
import {
  ComposableMap,
  Geographies,
  Geography,
  Sphere,
  Graticule,
} from 'react-simple-maps';

/**
 * This component renders map of the whole world. Based on parameter passed, colour shade of countries is marked
 * Darker the shade, more the emissions of that particular parameter of that country.
 * Map visualization is for the year 2014
 *
 * @component
 * @param {const} domain[]
 * @param {string} parameter
 *
 */
const MapChart = (props) => {
  //geoUrl to render world map
  const geoUrl =
    'https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json';

  //Domain and range set. Domain retrieved from props
  const colorScale = scaleLinear()
    .domain(props.domain)
    .range(['#ffedea', '#ff5233']);

  const [data, setData] = useState([]);

  //Based on parameter set, respective CSV file of that parameter is loaded
  useEffect(() => {
    csv(`/${props.parameter}_MV.csv`).then((data) => {
      setData(data);
    });
  }, []);

  return (
    <div className='map'>
      {
        <h4 style={{ textAlign: 'center' }}>
          {props.parameter} emissions around the world in the year 2014
        </h4>
      }
      <ComposableMap
        projectionConfig={{
          rotate: [-10, 0, 0],
          scale: 147,
        }}
      >
        <Sphere stroke='#E4E5E6' strokeWidth={0.5} />
        <Graticule stroke='#E4E5E6' strokeWidth={0.5} />
        {data.length > 0 && (
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => {
                const d = data.find((s) => s.ISO3 === geo.properties.ISO_A3);
                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill={d ? colorScale(d[2014]) : '#F5F4F6'}
                  />
                );
              })
            }
          </Geographies>
        )}
      </ComposableMap>
    </div>
  );
};

export default MapChart;
