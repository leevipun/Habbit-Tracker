import React from 'react';
import {Chart} from 'react-google-charts';
import {Day, Habbit} from '../types/types';

const calculateCompletionPercentage = (habits: Habbit[]): number => {
  const totalHabits = habits.length;
  const completedHabits = habits.filter((habit) => habit.status).length;
  return (completedHabits / totalHabits) * 100 || 0;
};

const Graph = ({days}: {days: Day[]}) => {
  const data = days.map((day) => {
    return [day.date, calculateCompletionPercentage(day.habbits)];
  });

  return (
    <div>
      <Chart
        className='w-full'
        height={'300px'}
        chartType='Line'
        loader={<div>Loading Chart</div>}
        data={[['Date', 'Completion Percentage'], ...data]}
        options={{
          chart: {
            title: 'Habit Completion Percentage Over Time',
          },
          vAxis: {
            minValue: 0,
            maxValue: 110,
          },
          colors: ['#CC5500'],
          backgroundColor: '#81d4fa',
        }}
        rootProps={{'data-testid': '1'}}
      />
    </div>
  );
};

export default Graph;
