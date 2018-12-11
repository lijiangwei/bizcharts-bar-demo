import React from 'react';
import { Chart, Geom, Axis, Tooltip, Legend, Coord } from 'bizcharts';
import DataSet from '@antv/data-set';


export default function BasicBar(props) {

    const { data, x, y, type } = props;

    const position = x + '*' + y;

    const ds = new DataSet();
    let dv = null;
    if(type === 'csv'){
        dv = ds.createView().source(data, {
            type: type
        })
        // .transform({
        //     type: 'map',
        //     callback(row){
        //         for(let key in row){
        //             console.log(key);
        //             row[key] = Number(row[key]) || row[key];
        //         }
        //         return row;
        //     }
        // })
    }else{
        dv = ds.createView().source(data);
    }

    console.log(dv.rows);

    const scale={
        "sold": {
            alias: '销售量'
        },
        income: {alias: '销售量'},
        genre: {alias: '游戏种类'}
    };
  
    return (
      <div>
        <Chart height={400} width={600} data={dv}>
          <Axis name={x} />
          <Axis name={y} />
          <Coord transpose />
          <Legend position="bottom" />
          <Tooltip />
          <Geom type="interval" position={position} color={x} />
        </Chart>
      </div>
    );
}

