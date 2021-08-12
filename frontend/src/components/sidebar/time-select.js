import React from 'react';
import 'react-dropdown/style.css';
import Dropdown from 'react-dropdown';
import { useState } from 'react';
import { setParams } from '../../utils/params';
import { useEffect } from 'react';

/**
 * In this component time range is set using dropdowns
 *
 * @component
 * @param {Object} props
 * @param {string} props.location
 * @param {string} props.history
 *
 */
export default function TimeSelect(props) {
  //Years 1990-2014 in dataset
  const options = [
    '1990',
    '1991',
    '1992',
    '1993',
    '1994',
    '1995',
    '1996',
    '1997',
    '1998',
    '1999',
    '2000',
    '2001',
    '2002',
    '2003',
    '2004',
    '2005',
    '2006',
    '2007',
    '2008',
    '2009',
    '2010',
    '2011',
    '2012',
    '2013',
    '2014',
  ];

  const [time1, setTime1] = useState(null);
  const [time2, setTime2] = useState(null);

  const updateURL = ({ query, parameter }) => {
    const url = setParams({
      query: query,
      parameter: parameter,
      location: props.location,
      set: true,
    });
    props.history.push(`?${url}`);
  };

  //If from time==to time or to time<from time, user is alerted
  useEffect(() => {
    if (time1 && time2 && (time1 === time2 || time2 < time1)) {
      alert('FROM YEAR should be lesser than TO YEAR');
      return null;
    }
  }, [time1, time2]);

  //useEffects triggered and time set if it exists(selected by user)
  useEffect(() => {
    if (time1) {
      updateURL({ query: 'from', parameter: time1 });
    }
  }, [time1]);

  useEffect(() => {
    if (time2) {
      updateURL({ query: 'to', parameter: time2 });
    }
  }, [time2]);

  return (
    <div className='time-select'>
      <h4>
        <b>Select time period:</b>
      </h4>
      <Dropdown
        options={options}
        placeholder='From'
        onChange={(e) => {
          setTime1(e.value);
        }}
        value={time1}
      />
      <br />
      <Dropdown
        options={options}
        placeholder='To'
        onChange={(e) => {
          setTime2(e.value);
        }}
        value={time2}
      />
      <br />
    </div>
  );
}
