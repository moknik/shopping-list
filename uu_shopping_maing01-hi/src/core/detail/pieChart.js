import React, { useState, useEffect, useRef } from 'react';
import { PieChart, Pie, Tooltip, Legend } from 'recharts';
import importLsi from '../../lsi/import-lsi';
import { Lsi } from 'uu5g05';
import { useBackground } from 'uu5g05';

const MyPieChart = (props) => {
  const containerRef = useRef(null);
  const [chartWidth, setChartWidth] = useState(0);

  useEffect(() => {
    const updateChartSize = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.clientWidth;
        setChartWidth(containerWidth);
      }
    };
    updateChartSize();
    window.addEventListener('resize', updateChartSize);
    return () => {
      window.removeEventListener('resize', updateChartSize);
    };
  }, []);

  const notResolvedCount = props.itemList.filter(item => !item.resolved).length;
  const resolvedCount = props.itemList.filter(item => item.resolved).length;
  const data = [
    { name: <Lsi import={importLsi} path={["ListDetail", "Unresolved"]} />, value: notResolvedCount },
    { name: <Lsi import={importLsi} path={["ListDetail", "Resolved"]} />, value: resolvedCount },
  ];

  const background = useBackground();
  const colors = background === "light" ? ["#33FF6B", "#2CA02C"] : ["#4c46c7", "#5d7a5f"];

  data.forEach((entry, index) => {
    entry.fill = colors[index];
  });

  return (
    <div ref={containerRef} style={{ width: '100%', height: '100%' }}>
      <PieChart width={chartWidth} height={190} margin={{ top: 20, right: 10, bottom: 10, left: 10 }}>
        <Pie
          dataKey="value"
          startAngle={180}
          endAngle={0}
          data={data}
          cx="50%"
          cy="120"
          outerRadius="140%"
          label
        />
        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  );
};

export default MyPieChart;
