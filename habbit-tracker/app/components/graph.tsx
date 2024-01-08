import React from 'react';
import {Chart} from 'react-google-charts';

interface Habit {
  id: number;
  name: string;
  status: boolean;
}

interface Day {
  id: number;
  date: string;
  habbits: Habit[];
}

const calculateCompletionPercentage = (habits: Habit[]): number => {
  const totalHabits = habits.length;
  const completedHabits = habits.filter((habit) => habit.status).length;
  return (completedHabits / totalHabits) * 100 || 0;
};

const Graph = ({days}: {days: Day[]}) => {
  console.log;
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
          hAxis: {
            title: 'Date',
          },
          vAxis: {
            title: 'Completion Percentage',
            minValue: 0,
            maxValue: 110,
          },
        }}
        rootProps={{'data-testid': '1'}}
      />
    </div>
  );
};

export default Graph;
