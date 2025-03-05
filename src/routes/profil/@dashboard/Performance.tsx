import { useContext } from 'react'

import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from 'recharts'

import { USER_TYPE_PERFORMANCE } from '../../../lib/contexts/User'
import { SCREEN                } from '../../../lib/contexts/Screen'

import COLORS from '../../../lib/ts/colors'

import STYLES from './@performance/performance.module.scss'

export default function Performance({propPerformance}: {propPerformance?: USER_TYPE_PERFORMANCE})
{
    const TABLET = useContext(SCREEN).tablet

    return (
        <section
        className={`${STYLES.performance} b_drk3 brd_r_1`}
        >
            <ResponsiveContainer
            width="100%"
            height="100%"
            >
                <RadarChart
                data={propPerformance}
                cx="50%"
                cy="50%"
                margin={
                {
                    top   : 16,
                    right : 36,
                    bottom: 16,
                    left  : 36
                }}
                >
                    <PolarGrid
                    radialLines={false}
                    stroke={COLORS.lgh0}
                    strokeWidth={1}
                    />

                    <PolarAngleAxis
                    className="super_txt_1 fw_500"
                    dataKey="kind"
                    tickLine={false}
                    tick={
                    {
                        fill: COLORS.lgh0,
                        dy  : 3
                    }}
                    tickSize={TABLET ? 10 : 16}
                    tickFormatter={(e: string) =>
                    {
                        switch (e)
                        {
                            case     'cardio'   : return 'Cardio'
                            case     'energy'   : return 'Energie'
                            case     'endurance': return 'Endurance'
                            case     'strength' : return 'Force'
                            case     'speed'    : return 'Vitesse'
                            case     'intensity': return 'Intensité'
                            default             : return e
                        }
                    }}
                    />
            
                    <Radar
                    dataKey="value"
                    fill={COLORS.prm2}
                    fillOpacity={.7}
                    />
                </RadarChart>
            </ResponsiveContainer>
        </section>
    )
}