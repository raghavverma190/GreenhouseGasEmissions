import React from 'react';
import 'react-dropdown/style.css';
import Dropdown from 'react-dropdown';
import { useState } from 'react';
import { setParams } from '../../utils/params';
import { useEffect } from 'react';

/**
 * In this component parameter is set using dropdown
 *
 * @component
 * @param {Object} props
 * @param {string} props.location
 * @param {string} props.history
 *
 */
export default function ParameterSelect(props) {
  //Parameters in dataset
  const options = [
    'CH4',
    'CO2',
    'GHG',
    'GHG_indirect_CO2',
    'HF3',
    'HFC',
    'HFC_PFC_mix',
    'N2Os',
    'PFCs',
    'SF6',
  ];

  const [parameter, setParameter] = useState(null);
  const updateURL = () => {
    const url = setParams({
      query: 'parameter',
      parameter: parameter,
      location: props.location,
      set: true,
    });
    props.history.push(`?${url}`);
  };

  //updateURL will only be called if there is change in parameter and parameter exists
  useEffect(() => {
    if (parameter) {
      updateURL();
    }
  }, [parameter]);

  return (
    <div className='parameter-select'>
      <h4>
        <b>Select parameter:</b>
      </h4>
      <Dropdown
        options={options}
        placeholder='Select a parameter'
        onChange={(e) => setParameter(e.value)}
        value={parameter}
      />
      <br />
    </div>
  );
}
