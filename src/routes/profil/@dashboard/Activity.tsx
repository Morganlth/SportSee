import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

import { USER_TYPE_ACTIVITY } from '../../../lib/contexts/User'

import COLORS from '../../../lib/ts/colors'

import STYLES from './@activity/activity.module.scss'

const ACTIVITY_DATA =
[
    {
        key   : 'kilogram',
        legend: 'Poids',
        unit  : 'kg',
        color : 'drk3'
    },
    {
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
                        tickMargin={15}
                        />
                
                        <YAxis
                        className="super_txt_2 c_gry2"
                        axisLine={false}
                        tickLine={false}
                        tickMargin={38}
                        orientation="right"
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
                        ACTIVITY_DATA.map(({key, unit, color}) =>
                            <Bar
                            key={key}
                            dataKey={key}
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