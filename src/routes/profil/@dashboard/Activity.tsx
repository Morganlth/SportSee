import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

import { USER_TYPE_ACTIVITY } from '../../../lib/contexts/User'

import COLORS from '../../../lib/ts/colors'

import STYLES from './@activity/activity.module.scss'

const ACTIVITY_DATA =
[
    {
        yID   : 0,
        key   : 'kilogram',
        legend: 'Poids',
        unit  : 'kg',
        color : 'drk3'
    },
    {
        yID   : 1,
        key   : 'calories',
        legend: 'Calories brûlées',
        unit  : 'kCal',
        color : 'prm0'
    }
]

export default function Activity({propActivity}: {propActivity?: USER_TYPE_ACTIVITY})
{
    return (
        <section
        className={`${STYLES.activity} d_flx f_cl_ pt_5 pr_7 pb_5 pl_7 b_brd b_lgh1 brd_r_1`}
        >
            <header
            className="d_flx j_sbt a_ctr mb_8"
            >
                <h2
                className="label super_txt_3 c_drk2 fw_500"
                >
                    Activité quotidienne
                </h2>

                <ul
                className={`${STYLES.legend} super_txt_2 d_flx g_7 c_gry3`}
                >
                {
                    ACTIVITY_DATA.map(({key, legend, unit, color}) => 
                        <li
                        key={key}
                        className={`@${color}`}
                        >
                            {legend} ({unit})
                        </li>
                    )
                }
                </ul>
            </header>
    
            <main
            className="wrapper f_1"
            >
                <ResponsiveContainer
                width="100%"
                height="100%"
                >
                    <BarChart
                    data={propActivity}
                    width={835}
                    height={320}
                    margin={{ right: 8 }}
                    barGap={8}
                    >
                        <CartesianGrid
                        vertical={false}
                        strokeDasharray="1 1"
                        />

                        <XAxis
                        className="super_txt_2 c_gry2"
                        dataKey="day"
                        axisLine={false}
                        tickLine={false}
                        tickMargin={13}
                        />
                
                        <YAxis
                        yAxisId={0}
                        className="super_txt_2 c_gry2"
                        dataKey="kilogram"
                        axisLine={false}
                        tickLine={false}
                        tickCount={3}
                        domain={['dataMin - 2', 'dataMax + 1']}
                        tickMargin={38}
                        orientation="right"
                        />

                        <YAxis
                        yAxisId={1}
                        dataKey="calories"
                        hide={true}
                        domain={[0, 'dataMax + 30']}
                        />

                        <Tooltip
                        cursor={{ fill: COLORS.gry1 }}
                        content={({active, payload}) => active && payload
                            ? (
                                <ul
                                className="super_txt_1 d_flx f_cl_ g_4 pt_2 pr_0 pb_2 pl_0 b_brd b_prm0 c_lgh0 fw_500"
                                >
                                {
                                    payload.map(({dataKey, value = '', unit = ''}) =>
                                        <li
                                        key={dataKey}
                                        >
                                            {value}{unit}
                                        </li>
                                    )
                                }
                                </ul>
                            )
                            : ''
                        }
                        />
                    
                    {
                        ACTIVITY_DATA.map(({yID, key, unit, color}) =>
                            <Bar
                            key={key}
                            dataKey={key}
                            yAxisId={yID}
                            fill={COLORS[color]}
                            barSize={7}
                            radius={[3, 3, 0, 0]}
                            unit={unit}
                            />
                        )
                    }
                    </BarChart>
                </ResponsiveContainer>
            </main>
        </section>
    )
}