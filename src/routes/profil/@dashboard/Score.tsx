import { useContext, useState, useRef, useEffect } from 'react'

import { ResponsiveContainer, RadialBarChart, RadialBar } from 'recharts'

import { SCREEN } from '../../../lib/contexts/Screen'

import COLORS from '../../../lib/ts/colors'

import STYLES from './@score/score.module.scss'

export default function Score({propScore}: {propScore?: number})
{
    const
    TABLET                   = useContext(SCREEN).tablet,
    SCORE                    = propScore ?? 0,
    DIAMETER                 = 84,
    RADIUS                   = DIAMETER * .5,
    [BAR_SIZE , setBarSize ] = useState(0),
    [BG_RADIUS, setBgRadius] = useState(RADIUS + '%'),
    SIZE                     = useRef(0)

    function responsiveContainer_updateRadius() { setBgRadius(SIZE.current * RADIUS / 100 - BAR_SIZE + 'px') }

    function responsiveContainer_eResize(width: number, height: number)
    {
        SIZE.current = Math.min(width, height)
    
        responsiveContainer_updateRadius()
    }

    useEffect(() => setBarSize(TABLET ? 7 : 10), [TABLET])

    useEffect(() => responsiveContainer_updateRadius(), [BAR_SIZE])

    return (
        <section
        className={`${STYLES.score} p_rlt pt_5 pr_7 pb_5 pl_7 b_brd b_lgh1 brd_r_1`}
        >
            <header
            className="p_abs"
            >
                <h2
                className="label super_txt_3 c_drk2 fw_500"
                >
                    Score
                </h2>
            </header>
    
            <ResponsiveContainer
            width="100%"
            height="100%"
            onResize={responsiveContainer_eResize}
            >
                <RadialBarChart
                cx="50%"
                cy="50%"
                innerRadius={DIAMETER + '%'}
                outerRadius={DIAMETER + '%'}
                barSize={BAR_SIZE}
                startAngle={80}
                endAngle={80 + (360 * SCORE)}
                data={[{ value: 1 }]}
                >
                    <circle
                    cx="50%"
                    cy="50%"
                    r={BG_RADIUS}
                    fill={COLORS.lgh0}
                    stroke={COLORS.lgh0}
                    strokeWidth={2}
                    />

                    <RadialBar
                    fill={COLORS.prm1}
                    cornerRadius="50%"
                    dataKey="value"
                    onResize={(e) => console.log(e)}
                    />

                    <text
                    className="super_txt_2 fw_500"
                    textAnchor="middle"
                    >
                        <tspan
                        className={`super_txt_${TABLET ? 7 : 8} fw_700`}
                        x="50%"
                        y="45%"
                        fill={COLORS.drk3}
                        >
                            {SCORE * 100}%
                        </tspan>

                        <tspan
                        x="50%"
                        dy={TABLET ? 20 : 26}
                        fill={COLORS.gry3}
                        >
                            de votre
                        </tspan>

                        <tspan
                        x="50%"
                        dy={TABLET ? 18 : 22}
                        fill={COLORS.gry3}
                        >
                            objectif
                        </tspan>
                    </text>
                </RadialBarChart>
            </ResponsiveContainer>
        </section>
    )
}