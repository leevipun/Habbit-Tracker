import React from 'react';
import { Chart } from 'react-google-charts';

interface Habit {
  id: number;
  name: string;
  status: boolean;
}

interface Day {
  id: number;
  date: string;
  habits: Habit[];
}

const calculateCompletionPercentage = (habits: Habit[]): number => {
  const totalHabits = habits.length;
  const completedHabits = habits.filter((habit) => habit.status).length;
  return (completedHabits / totalHabits) * 100 || 0;
};

const Graph: React.FC = () => {

  const days = [
    {
      id: 1,
      date: "29.09.2021",
      habits: [
        {
          id: 1,
          name: "Running",
          status: true,
        },
        {
          id: 2,
          name: "Reading",
          status: true,
        },
        {
          id: 3,
          name: "Coding",
          status: false,
        },
      ],
    },
    {
      id: 2,
      date: "30.09.2021",
      habits: [
        {
          id: 1,
          name: "Running",
          status: true,
        },
        {
          id: 2,
          name: "Reading",
          status: false,
        },
        {
          id: 3,
          name: "Coding",
          status: false,
        },
      ],
    },
    {
      id: 3,
      date: "6/1/2024",
      habits: [
        {
          id: 1,
          name: "Running",
          status: true,
        },
        {
          id: 2,
          name: "Reading",
          status: true,
        },
        {
          id: 3,
          name: "Coding",
          status: true,
        },
      ],
    },
  ]


  const data = days.map((day) => {
    return [day.date, calculateCompletionPercentage(day.habits)];
  });

  return (
    <div>
      <Chart
        className="w-full"
        height={"300px"}
        chartType="Line"
        loader={<div>Loading Chart</div>}
        data={[["Date", "Completion Percentage"], ...data]}
        options={{
          chart: {
            title: "Habit Completion Percentage Over Time",
          },
          hAxis: {
            title: "Date",
          },
          vAxis: {
            title: "Completion Percentage",
            minValue: 0,
            maxValue: 110,
          },
        }}
        rootProps={{ "data-testid": "1" }}
      />
    </div>
  );
};

export default Graph;
