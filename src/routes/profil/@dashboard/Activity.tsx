import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

import { USER_TYPE_ACTIVITY } from '../../../lib/contexts/User'

import STYLES from './@activity/activity.module.scss'

export default function Activity({propActivity}: {propActivity: undefined|USER_TYPE_ACTIVITY})
{
    return (
        <section
        className={`${STYLES.activity} b_lgh1`}
        >
            <ResponsiveContainer
            width="100%"
            height="100%"
            >
                <BarChart
                width={835}
                height={320}
                data={propActivity}
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
            
                    <YAxis />

                    <Tooltip />
            
                    <Legend />
            
                    <Bar
                    dataKey="kilogram"
                    fill="#8884d8"
                    activeBar={
                        <Rectangle
                        fill="pink"
                        stroke="blue"
                        />
                    }
                    />
            
                    <Bar
                    dataKey="calories"
                    fill="#82ca9d"
                    activeBar={
                        <Rectangle
                        fill="gold"
                        stroke="purple"
                        />
                    }
                    />
                </BarChart>
            </ResponsiveContainer>
        </section>
    )
}