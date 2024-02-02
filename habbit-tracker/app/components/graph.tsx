import React from 'react';
import {
  LineChart,
  Line,
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

const Graph = ({days}: {days: Day[]}) => {
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
        <LineChart
          width={600}
          height={300}
          data={data}
          margin={{top: 5, right: 30, left: 20, bottom: 5}}
        >
          <CartesianGrid strokeDasharray='3 3' />
          <XAxis dataKey='date' stroke='#FFFFFF' />
          <YAxis stroke='#FFFFFF' />
          <Tooltip />
          <Legend />
          <Line
            type='monotone'
            dataKey='completionPercentage'
            stroke='#000000' // Set line color to white
            name='Completion Percentage'
            strokeWidth={2} // Increase or decrease as needed
            dot={{stroke: '#FFFFFF', strokeWidth: 2, r: 4}} // Set dot color to white
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Graph;
