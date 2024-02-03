import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import {Day, Habbit} from '../types/types';

const calculateCompletionPercentage = (habits: Habbit[]) => {
  const totalHabits = habits.length;
  const completedHabits = habits.filter((habit) => habit.status).length;
  return (completedHabits / totalHabits) * 100 || 0;
};

const Graph = ({days}: {days: Day[] | undefined}) => {
  const data = days?.map((day) => ({
    date: day.date,
    completionPercentage: calculateCompletionPercentage(day.habbits),
  }));

  if (!data) {
    return null;
  }

  return (
    <div>
      <ResponsiveContainer width='100%' height={300}>
        <AreaChart
          width={600}
          height={300}
          data={data}
          margin={{top: 5, right: 30, left: 20, bottom: 5}}
        >
          <CartesianGrid strokeDasharray='3 3' />
          <XAxis dataKey='date' stroke='#E0F4F5' />
          <YAxis stroke='#E0F4F5' />
          <Tooltip />
          <Legend />
          <Area
            type='monotone'
            dataKey='completionPercentage'
            stroke='#A7D1D2'
            fill='#A7D1D2'
            name='Completion Percentage'
            strokeWidth={2}
            dot={{stroke: '#E0F4F5', strokeWidth: 2, r: 4}}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Graph;
