import React from 'react';
import {
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
} from 'recharts';

const HabbitGraph = () => {
  const data = [
    {subject: 'Math', A: 120, fullMark: 150},
    {subject: 'Chinese', A: 98, fullMark: 150},
    {subject: 'English', A: 86, fullMark: 150},
    {subject: 'Geography', A: 99, fullMark: 150},
  ];

  return (
    <div style={{width: '100%', height: '50%'}}>
      <ResponsiveContainer width='100%' height='100%'>
        <RadarChart cx='50%' cy='50%' outerRadius='80%' data={data}>
          <PolarGrid />
          <PolarAngleAxis dataKey='subject' />
          <PolarRadiusAxis />
          <Radar
            name='Mike'
            dataKey='A'
            stroke='#8884d8'
            fill='#8884d8'
            fillOpacity={0.6}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default HabbitGraph;
