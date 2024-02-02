import React, {useState, useEffect} from 'react';
import {
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from 'recharts';
import {UserHabbits} from '@/app/types/types';

const HabbitGraph = ({user}: {user: UserHabbits[]}) => {
  const domain = [0, 365];
  if (user.map((habbit) => habbit.done).length > 0) {
    if (Math.max(...user.map((habbit) => habbit.done)) + 3 < 365) {
      domain[1] = Math.max(...user.map((habbit) => habbit.done)) + 3;
    } else {
      domain[1] = 365;
    }
  }

  const secondDomain = [0, 0];

  return (
    <>
      <div style={{width: '100%', height: '50%'}}>
        <ResponsiveContainer width='100%' height='100%'>
          <RadarChart cx='50%' cy='50%' outerRadius='60%' data={user}>
            <PolarGrid />
            <PolarAngleAxis dataKey='name' />
            <PolarRadiusAxis domain={domain} />
            <Radar
              name='Mike'
              dataKey='done'
              stroke='#8884d8'
              fill='#8884d8'
              fillOpacity={0.6}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>
      <div style={{width: '100%', height: '50%'}}>
        <ResponsiveContainer width='100%' height='100%'>
          <RadarChart cx='50%' cy='50%' outerRadius='60%' data={user}>
            <PolarGrid />
            <PolarAngleAxis dataKey='name' />
            <PolarRadiusAxis domain={domain} />
            <Radar
              name='Mike'
              dataKey='done'
              stroke='#8884d8'
              fill='#8884d8'
              fillOpacity={0.6}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </>
  );
};

export default HabbitGraph;
