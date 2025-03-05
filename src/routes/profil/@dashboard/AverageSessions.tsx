import { useRef, useState, useEffect } from 'react'

import { LineChart, Line, XAxis, Tooltip, ResponsiveContainer } from 'recharts'
import { CategoricalChartState                                } from 'recharts/types/chart/types'

import { USER_TYPE_AVERAGE_SESSIONS } from '../../../lib/contexts/User'

import COLORS from '../../../lib/ts/colors'

import STYLES from './@averageSessions/averageSessions.module.scss'

export default function AverageSessions({propAverageSessions}: {propAverageSessions?: USER_TYPE_AVERAGE_SESSIONS})
{
    const
    AVERAGE_SESSIONS        = useRef<null | HTMLElement>(null),
    WIDTH                   = useRef(0),
    ID                      = useRef<number | NodeJS.Timeout>(0),
    CURSOR_RADIUS           = 4,
    DIVIDER                 = propAverageSessions?.length ?? 1,
    DELAY                   = 1000 / 60 * 4,
    [SESSIONS, setSessions] = useState(propAverageSessions),
    [X       , setX       ] = useState(100)

    useEffect(() =>
    {
        if (!(propAverageSessions instanceof Array)) return

        const S = [...propAverageSessions]
    
        for (let i = 0; i < 2; i++) S[i ? 'push' : 'unshift'](
        {
            day          : '',
            sessionLength: S[i ? S.length - 1 : 0].sessionLength
        })

        setSessions(S)

        const CURRENT = AVERAGE_SESSIONS.current
    
        if (!CURRENT) return

        const OBSERVER = new ResizeObserver(averageSessions_oResize)

        OBSERVER.observe(CURRENT)

        return OBSERVER.disconnect.bind(OBSERVER)
    },
    [])

    function averageSessions_oResize(e: ResizeObserverEntry[]) { WIDTH.current = e[0].contentRect.width }

    function lineChart_eMouseMove(_: CategoricalChartState, e: MouseEvent)
    {
        if (ID.current) return

        ID.current = setTimeout(() =>
        {
            setX((e.clientX - (AVERAGE_SESSIONS.current?.getBoundingClientRect().left ?? 0)) * 100 / WIDTH.current)

            ID.current = 0
        },
        DELAY)
    }

    function lineChart_eMouseLeave()
    {
        clearTimeout(ID.current)
        
        ID.current = 0

        setX(100)
    }

    return (
        <section
        className={`${STYLES.averageSessions} d_flx f_cl_ o_hid pt_6 pb_6 b_brd b_prm1 brd_r_1`}
        style={{ '--x': 100 - X + '%' } as React.CSSProperties}
        ref={AVERAGE_SESSIONS}
        >
            <header
            className="pr_7 pl_7 b_brd"
            >
                <h2
                className="label super_txt_3 o_50 c_lgh0 fw_500 lh_7"
                >
                    Durée moyenne des <br />
                    sessions
                </h2>
            </header>
   
            <main
            className="wrapper f_1 d_flx j_ctr o_hid"
            >
                <ResponsiveContainer
                className="fs_0"
                width={(SESSIONS?.length ?? 0) * 100 / DIVIDER + '%'}
                height="100%"
                >
                    <LineChart
                    data={SESSIONS}
                    width={258}
                    height={263}
                    margin={{ top: CURSOR_RADIUS }}
                    onMouseMove={lineChart_eMouseMove}
                    onMouseLeave={lineChart_eMouseLeave}
                    >
                        <defs>
                            <linearGradient
                            id="LINE_GRADIENT"
                            >
                                <stop
                                offset="18.73%"
                                stopColor={COLORS.lgh0}
                                stopOpacity={.403191}
                                />

                                <stop
                                offset="98.81%"
                                stopColor={COLORS.lgh0}
                                />
                            </linearGradient>
                        </defs>
                
                        <Line
                        dataKey="sessionLength"
                        type="monotone"
                        stroke="url(#LINE_GRADIENT)"
                        strokeWidth={2}
                        dot={false}
                        activeDot={
                        {
                            r            : CURSOR_RADIUS,
                            fill         : COLORS.lgh0,
                            stroke       : COLORS.lgh0,
                            strokeWidth  : 5,
                            strokeOpacity: .2
                        }}
                        />
                
                        <XAxis
                        className="super_txt_1 fw_500"
                        dataKey="day"
                        axisLine={false}
                        padding={
                        {
                            right: 15,
                            left : 15
                        }}
                        tickLine={false}
                        tickMargin={15}
                        tick={
                        {
                            stroke : COLORS.lgh0,
                            opacity: .5
                        }}
                        />
                
                        <Tooltip
                        cursor={false}
                        content={({active, payload}) => active && payload
                            ? (
                                <span
                                className="super_txt_1 pt_1 pr_1 pb_1 pl_1 b_brd b_lgh0 c_drk0 fw_500"
                                >
                                    {payload[0].value} min
                                </span>
                            )
                            : ''
                        }
                        />
                    </LineChart>
                </ResponsiveContainer>
            </main>
        </section>
    )
}