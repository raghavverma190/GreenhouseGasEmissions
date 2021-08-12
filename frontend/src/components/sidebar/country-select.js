import React, { useEffect } from 'react';
import 'react-dropdown/style.css';
import Dropdown from 'react-dropdown';
import { useState } from 'react';
import { setParams } from '../../utils/params';

/**
 * In this component countries(data to be shown on graph) is set using dropdowns
 * @component
 * @param {Object} props
 * @param {string} props.location
 * @param {string} props.history
 *
 */
export default function CountrySelect(props) {
  //Countries in dataset
  const options = [
    'Australia',
    'Austria',
    'Belarus',
    'Belgium',
    'Bulgaria',
    'Canada',
    'Croatia',
    'Cyprus',
    'Czech Republic',
    'Denmark',
    'Estonia',
    'European Union',
    'Finland',
    'France',
    'Germany',
    'Greece',
    'Hungary',
    'Iceland',
    'Ireland',
    'Italy',
    'Japan',
    'Latvia',
    'Liechtenstein',
    'Lithuania',
    'Luxembourg',
    'Malta',
    'Netherlands',
    'New Zealand',
    'Norway',
    'Poland',
    'Portugal',
    'Romania',
    'Russian Federation',
    'Slovakia',
    'Slovenia',
    'Spain',
    'Sweden',
    'Switzerland',
    'Turkey',
    'Ukraine',
    'United Kingdom',
    'United States of America',
  ];

  const [country1, setCountry1] = useState(null);
  const [country2, setCountry2] = useState(null);
  const [country3, setCountry3] = useState(null);

  //function to update URL
  const updateURL = ({ query, parameter }) => {
    const url = setParams({
      query: query,
      parameter: parameter,
      location: props.location,
      set: true,
    });
    console.log(url);
    props.history.push(`?${url}`);
  };

  //useEffects triggered if any change in countries. If country selected by user is same, user is alerted
  useEffect(() => {
    if (country1) {
      if (country1 == country2 || country1 == country3) {
        alert('Please select different countries');
        return null;
      }
      updateURL({ query: 'country1', parameter: country1 });
    }
  }, [country1]);
  useEffect(() => {
    if (country2) {
      if (country2 == country3 || country2 == country1) {
        alert('Please select different countries');
        return null;
      }
      updateURL({ query: 'country2', parameter: country2 });
    }
  }, [country2]);
  useEffect(() => {
    if (country3) {
      if (country3 == country1 || country3 == country2) {
        alert('Please select different countries');
        return null;
      }
      updateURL({ query: 'country3', parameter: country3 });
    }
  }, [country3]);

  return (
    <div className='country-select'>
      <h4>
        <b>Select country:</b>
      </h4>
      <Dropdown
        options={options}
        placeholder='Select a country'
        value={country1}
        onChange={(e) => setCountry1(e.value)}
      />
      <br />
      <Dropdown
        options={options}
        placeholder='Select a country'
        value={country2}
        onChange={(e) => setCountry2(e.value)}
      />
      <br />
      <Dropdown
        options={options}
        placeholder='Select a country'
        value={country3}
        onChange={(e) => setCountry3(e.value)}
      />
      <br />
    </div>
  );
}
