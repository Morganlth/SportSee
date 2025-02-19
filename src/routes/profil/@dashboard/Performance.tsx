import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts'

import { USER_TYPE_PERFORMANCE } from '../../../lib/contexts/User'

import STYLES from './@performance/performance.module.scss'

export default function Performance({propPerformance}: {propPerformance: undefined|USER_TYPE_PERFORMANCE})
{
    console.log(propPerformance)

    return (
        <section
        className={`${STYLES.performance} b_lgh1`}
        >
            <ResponsiveContainer
            width="100%"
            height="100%"
            >
                <RadarChart
                cx="50%"
                cy="50%"
                outerRadius="80%"
                data={propPerformance}
                >
                    <PolarGrid />
        
                    <PolarAngleAxis
                    dataKey="kind"
                    />
        
                    <PolarRadiusAxis />
            
                    <Radar
                    name="Mike"
                    dataKey="value"
                    stroke="#8884d8"
                    fill="#8884d8"
                    fillOpacity={0.6}
                    />
                </RadarChart>
            </ResponsiveContainer>
        </section>
    )
}