const CustomTooltip = ({ active, payload }) => {
    if (payload && payload.length && active) {
        return (
            <div className="bg-whtie shadow-md rounded-lg p-2 border border-gray-300 backdrop-blur-2xl">
                <p className="text-xs font-semibold text-purple-800 mb-1">{payload[0].name}</p>
                <p className="text-xs text-gray-600">
                    Count: <span className="text-sm font-medium text-gray-900">{payload[0].value}</span>
                </p>
            </div>
        )
    }
}

export default CustomTooltip