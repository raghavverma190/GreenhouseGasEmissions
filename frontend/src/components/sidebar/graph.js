import * as React from 'react';
import {
  Chart,
  ArgumentAxis,
  ValueAxis,
  LineSeries,
  Title,
  Legend,
} from '@devexpress/dx-react-chart-bootstrap4';

//Format of graph
const format = () => (tick) => tick;

//Root,item,label of graph used for Legend
const Root = (props) => <Legend.Root {...props} className='m-auto flex-row' />;
const Item = (props) => <Legend.Item {...props} className='flex-column' />;
const Label = (props) => <Legend.Label {...props} className='pt-2' />;

/**
 * This component renders the line graph based on parameter,countries and time range
 *
 * @component
 * @param {Object} props
 * @param {Object}  props.data[]
 * @param {string}  props.countries[]
 * @param {string}  props.title
 *
 */
const Graph = (props) => {
  if (!props.data || !props.countries.length > 0) {
    return null;
  }

  //ArgumentAxis includes the time period
  //Value axis includes emissions in kilotonne CO2 equivalent
  return (
    <div className='card'>
      <Chart data={props.data} className='pr-3'>
        <ArgumentAxis tickFormat={format} />
        <ValueAxis />
        {props.countries.map((country, index) => {
          if (country) {
            return (
              <LineSeries
                key={index}
                name={country}
                valueField={country}
                argumentField='year'
              />
            );
          }
        })}

        <Legend
          position='bottom'
          rootComponent={Root}
          itemComponent={Item}
          labelComponent={Label}
        />
        <Title text={props.title} />
      </Chart>
    </div>
  );
};

export default Graph;
