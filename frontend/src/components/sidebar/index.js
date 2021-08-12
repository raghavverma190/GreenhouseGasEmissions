import { useState, useEffect, Fragment } from 'react';
import Graph from './graph';
import {
  CO2,
  CH4,
  GHG,
  GHG_indirect_CO2,
  HF3,
  HFC,
  HFC_PFC_mix,
  N2Os,
  PFCs,
  SF6,
} from '../../data/data-visualization';
import CountrySelect from './country-select';
import ParameterSelect from './parameter-select';
import { getParams } from '../../utils/params';
import TimeSelect from './time-select';

/**
 * In this function, parameter,country and time range values are retrieved from URL.
 * Paramter,country and time range values are set using ParamterSelect,CountrySelect, and TimeSelect components respectively
 * Line Graph is rendered based on retrieved values
 *
 * @component
 * @param {Object} props
 * @param {string} props.location
 * @param {string} props.history
 *
 */
export default function Sidebar(props) {
  const [parameter, setParameter] = useState(null);
  const [country1, setCountry1] = useState(null);
  const [country2, setCountry2] = useState(null);
  const [country3, setCountry3] = useState(null);
  const [from, setFrom] = useState(null);
  const [to, setTo] = useState(null);
  const [data, setData] = useState(null);

  //If there is a change in URL, useEffect is triggered and parameter,countries and time range is set
  useEffect(() => {
    getParams({ location: props.location, query: 'parameter' }).query &&
      setParameter(getParams({ location: props.location, query: 'parameter' }));
    getParams({ location: props.location, query: 'country1' }).query &&
      setCountry1(getParams({ location: props.location, query: 'country1' }));
    getParams({ location: props.location, query: 'country2' }).query &&
      setCountry2(getParams({ location: props.location, query: 'country2' }));
    getParams({ location: props.location, query: 'country3' }).query &&
      setCountry3(getParams({ location: props.location, query: 'country3' }));
    getParams({ location: props.location, query: 'from' }).query &&
      setFrom(getParams({ location: props.location, query: 'from' }));
    getParams({ location: props.location, query: 'to' }).query &&
      setTo(getParams({ location: props.location, query: 'to' }));
  }, [props.location]);

  //If parameter,from time and to time exist, data(to be sent to graph component) is set
  useEffect(() => {
    if (parameter && from && to) {
      let time_data = [];
      parameter.query === 'CO2' && time_data.push(CO2);
      parameter.query === 'CH4' && time_data.push(CH4);
      parameter.query === 'GHG' && time_data.push(GHG);
      parameter.query === 'GHG_indirect_CO2' &&
        time_data.push(GHG_indirect_CO2);
      parameter.query === 'HF3' && time_data.push(HF3);
      parameter.query === 'HFC' && time_data.push(HFC);
      parameter.query === 'HFC_PFC_mix' && time_data.push(HFC_PFC_mix);
      parameter.query === 'N2Os' && time_data.push(N2Os);
      parameter.query === 'PFCs' && time_data.push(PFCs);
      parameter.query === 'SF6' && time_data.push(SF6);
      time_data.length > 0 &&
        setData(
          time_data[0].filter((row) => {
            if (
              row.year >= parseInt(from.query) &&
              row.year <= parseInt(to.query)
            ) {
              return row;
            }
          })
        );
    }
  }, [parameter, from, to]);

  return (
    <div className='sidebar'>
      <Fragment>
        <div className='dropdowns'>
          <CountrySelect {...props} />
          <ParameterSelect {...props} />
          <TimeSelect {...props} />
        </div>
        <Graph
          data={data}
          countries={[
            country1 && country1.query,
            country2 && country2.query,
            country3 && country3.query,
          ]}
          title={
            parameter &&
            `${parameter.query} Emissions in kilotonne CO2 equivalent`
          }
          {...props}
        />
      </Fragment>
    </div>
  );
}
