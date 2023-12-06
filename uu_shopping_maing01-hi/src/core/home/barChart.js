import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import importLsi from '../../lsi/import-lsi';
import { Lsi, useBackground, useSession } from 'uu5g05';

const ListOverview = ({ props }) => {
  if (!props || typeof props.filter !== 'function') {
    return null;
  }
  const background = useBackground();
  const session = useSession().identity.uuIdentity;
  const [chartWidth, setChartWidth] = useState(window.innerWidth * 0.9);

  useEffect(() => {
    const handleResize = () => {
      setChartWidth(window.innerWidth - window.innerWidth * 0.2);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const dataList = props?.filter(item =>
    !item?.data?.archived &&
    (item?.data?.owner === session || (item?.data?.user && item?.data?.user.includes(session)))
  )?.map(item => item?.data);

  const data = dataList?.map((list, index) => ({
    index: index + 1,
    listName: list?.name,
    resolvedItems: list?.itemList?.filter(item => item?.resolved).length || 0,
    unresolvedItems: list?.itemList?.filter(item => !item?.resolved).length || 0,
  }));

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const listData = payload[0].payload;
      return (
        <div style={{
          backgroundColor: (background === "light" ? "#fff" : "#424242"),
          border: '1px solid #ccc', padding: '10px'
        }}>
          <p>
            <Lsi import={importLsi} path={['ShoppingList', 'ListName']} />
            {listData.listName}
          </p>
          <p>
            <Lsi import={importLsi} path={['ShoppingList', 'ResolvedItems']} />
            : {listData.resolvedItems}
          </p>
          <p>
            <Lsi import={importLsi} path={['ShoppingList', 'UnresolvedItems']} />
            : {listData.unresolvedItems}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div style={{ width: '100%' }}>
      <h2>
        <Lsi import={importLsi} path={['ShoppingList', 'Graph']} />
      </h2>
      <BarChart width={chartWidth} height={250} data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <XAxis dataKey="index" />
        <YAxis />
        <Tooltip content={<CustomTooltip />} />
        <Legend />
        <Bar dataKey="resolvedItems" fill="#82ca9d" stackId="a" name={<Lsi import={importLsi} path={['ShoppingList', 'ResolvedItems']} />} />
        <Bar dataKey="unresolvedItems" fill="#8884d8" stackId="a" name={<Lsi import={importLsi} path={['ShoppingList', 'UnresolvedItems']} />} />
      </BarChart>
    </div>
  );
};

export default ListOverview;
