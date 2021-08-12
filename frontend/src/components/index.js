import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { getParams } from '../utils/params';
import MapChart from './map';
import Sidebar from './sidebar';

/**
 * In this function, parameter selected by user is retrieved from the URL and passed on to maps component in props
 * Domain for map visualization is also set based on the parameter(domain data retrieved from python script) and passed on to maps component
 * in props
 * If domain and parameter are not null, only then will the map component be rendered
 *
 * @component
 * @param {Object} props
 * @param {string} props.location
 * @param {string} props.history
 *
 */
const Components = (props) => {
  const [parameter, setParameter] = useState(null);
  const [domain, setDomain] = useState([]);

  //If there is a change in URL, useEffect hook is triggered and new parameter is retrieved
  useEffect(() => {
    getParams({ location: props.location, query: 'parameter' }).query &&
      setParameter(getParams({ location: props.location, query: 'parameter' }));
  }, [props.location]);

  //If there is a change in paramter, useEffect is triggered and new domain is set
  useEffect(() => {
    if (parameter) {
      if (parameter.query == 'CH4') {
        setDomain([20.604916295051, 859101.067596339]);
      } else if (parameter.query == 'CO2') {
        setDomain([161.541816662752, 5556006.57780565]);
      } else if (parameter.query == 'GHG') {
        setDomain([204.416249168196, 6870446.09153786]);
      } else if (parameter.query == 'GHG_indirect_CO2') {
        setDomain([2982.64478757554, 6870446.09153786]);
      } else if (parameter.query == 'HF3') {
        setDomain([0.151044896, 830.718458569632]);
      } else if (parameter.query == 'HFC') {
        setDomain([12.1466596062458, 157237.344889253]);
      } else if (parameter.query == 'HFC_PFC_mix') {
        setDomain([151.94899803, 9449.8916832]);
      } else if (parameter.query == 'N2Os') {
        setDomain([9.96502634386566, 403501.457115005]);
      } else if (parameter.query == 'PFCs') {
        setDomain([1.103756, 5582.94172965271]);
      } else if (parameter.query == 'SF6') {
        setDomain([0.116052, 7348.78277504131]);
      }
    }
  }, [parameter]);

  return (
    <div className='components'>
      <Sidebar {...props} />
      {domain && parameter && (
        <MapChart {...props} domain={domain} parameter={parameter.query} />
      )}
    </div>
  );
};

export default Components;
