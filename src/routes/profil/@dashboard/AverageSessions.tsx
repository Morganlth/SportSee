import { LineChart, Line, XAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

import { USER_TYPE_AVERAGE_SESSIONS } from '../../../lib/contexts/User'

import STYLES from './@averageSessions/averageSessions.module.scss'

export default function AverageSessions({propAverageSessions}: {propAverageSessions: undefined|USER_TYPE_AVERAGE_SESSIONS})
{
    return (
        <section
        className={`${STYLES.averageSessions} b_lgh1`}
        >
            <ResponsiveContainer
            width="100%"
            height="100%"
            >
                <LineChart
                width={500}
                height={300}
                data={propAverageSessions}
                margin={
                {
                    top   : 5,
                    right : 30,
                    bottom: 5,
                    left  : 20
                }}
                >
                    <CartesianGrid
                    strokeDasharray="3 3"
                    />
            
                    <XAxis
                    dataKey="day"
                    />
            
                    <Tooltip />
        
                    <Legend />
            
                    <Line
                    type="monotone"
                    dataKey="sessionLength"
                    stroke="#8884d8"
                    activeDot={{ r: 8 }}
                    />
                </LineChart>
            </ResponsiveContainer>
        </section>
    )
}