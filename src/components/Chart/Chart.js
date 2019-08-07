import React, { PureComponent } from 'react';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';

export default class SimpleBarChart extends PureComponent {
//    static jsfiddleUrl = 'https://jsfiddle.net/alidingling/30763kr7/';
render() {
    const {newData,label,llaves,ancho,alto} = this.props;
        return (
            <BarChart
                width={ancho===undefined?800:ancho}
                height={alto === undefined ? 300 : alto}
                data={newData}
                margin={{
                    top: 5, right: 30, left: 20, bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <defs>
                    <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="rgba(169,3,41,1)" stopOpacity={1} />
                        <stop offset="44%" stopColor="rgba(143,2,34,1) " stopOpacity={1} />
                        <stop offset="100%" stopColor="rgba(109,0,25,1)" stopOpacity={1} />
                        
                    </linearGradient>
                    <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="rgba(164,179,87,1)" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="rgba(117,137,12,1)" stopOpacity={1} />
                    </linearGradient>
                    <linearGradient id="colorPy" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="rgba(64,179,87,1)" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="rgba(17,137,12,1)" stopOpacity={1} />
                    </linearGradient>
                </defs>
                <XAxis dataKey={label} />
                <YAxis yAxisId="left"/>
                {/* <YAxis yAxisId="right" orientation="left" /> */}
                <Tooltip />
                <Legend />
                <Bar yAxisId="left" dataKey={llaves[0]} fill={'url(#colorUv)'} />
                <Bar yAxisId="left" dataKey={llaves[1]} fill={'url(#colorPv)'} />
                <Bar yAxisId="left" dataKey={llaves[2]} fill={'url(#colorPy)'} />
            </BarChart>
        );
    }
}
