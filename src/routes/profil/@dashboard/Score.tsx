import { RadialBarChart, RadialBar, ResponsiveContainer } from 'recharts'

import COLORS from '../../../lib/ts/colors'

import STYLES from './@score/score.module.scss'

export default function Score({propScore}: {propScore: undefined|number})
{
    const SCORE = propScore ?? 0

    return (
        <section
        className={`${STYLES.score} b_lgh1`}
        >
             <ResponsiveContainer
             width="100%"
             height="100%"
             >
                <RadialBarChart
                cx="50%"
                cy="50%"
                innerRadius="64%"
                outerRadius="64%"
                barSize={10}
                startAngle={80}
                endAngle={80 + (360 * SCORE)}
                data={[{ value: 1 }]}
                >
                    <circle
                    cx="50%"
                    cy="50%"
                    r="32%"
                    fill="white"
                    />
    
                    <RadialBar
                    fill={COLORS.prm1}
                    cornerRadius="50%"
                    dataKey="value"
                    />
        
                    <text
                    className="super_txt_2 c_gry3 fw_500"
                    textAnchor="middle"
                    // dominantBaseline="middle"
                    >
                        <tspan
                        className="super_txt_8 c_drk3 fw_700"
                        x="50%"
                        y="45%"
                        >
                            {SCORE * 100}%
                        </tspan>

                        <tspan
                        x="50%"
                        dy="26"
                        >
                            de votre
                        </tspan>

                        <tspan
                        x="50%"
                        dy="26"
                        >
                            objectif
                        </tspan>
                    </text>
                </RadialBarChart>
            </ResponsiveContainer>
        </section>
    )
}