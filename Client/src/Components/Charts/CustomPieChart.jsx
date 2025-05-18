import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    ResponsiveContainer,
    Legend
} from 'recharts';

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-2 border border-gray-200 rounded-md shadow-sm">
        <p>{`${payload[0].name}: ${payload[0].value}`}</p>
      </div>
    );
  }
  return null;
};

const CustomLegend = ({ payload }) => {
  return (
    <ul className="flex justify-center mt-4">
      {payload.map((entry, index) => (
        <li key={`item-${index}`} className="flex items-center mx-2">
          <div style={{ backgroundColor: entry.color }} className="w-3 h-3 mr-1 rounded-full"></div>
          <span className="text-sm">{entry.value}</span>
        </li>
      ))}
    </ul>
  );
};

const CustomPieChart = ({data, colors}) => {
  

  return (
    <ResponsiveContainer width="100%" height={325}>
        <PieChart>
            <Pie
            data={data}
            dataKey="count"
            nameKey="status"
            cx="50%"
            cy="50%"
            outerRadius={130}
            innerRadius={100}
            labelLine={false}
            >   
                {data.map((entry, index) => {
                    return <Cell key={`cell-${index}`} fill={colors[index % colors.length]}/>
                })}
            </Pie>
            <Tooltip content={<CustomTooltip/>}/>
            <Legend content={<CustomLegend/>}/>
        </PieChart>
    </ResponsiveContainer>
  )
}

export default CustomPieChart