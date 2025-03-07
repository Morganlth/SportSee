import { useContext } from 'react'

import { USER_TYPE_PROFIL, USER_TYPE_ACTIVITY, USER_TYPE_AVERAGE_SESSIONS, USER_TYPE_PERFORMANCE } from '../../lib/contexts/User'
import { SCREEN                                                                                  } from '../../lib/contexts/Screen'

import Activity        from './@dashboard/Activity'
import Stats           from './@dashboard/Stats'
import AverageSessions from './@dashboard/AverageSessions'
import Performance     from './@dashboard/Performance'
import Score           from './@dashboard/Score'

import STYLES from './@dashboard/dashboard.module.scss'

type DASHBOARD_PROPS =
{
    propProfil         ?: USER_TYPE_PROFIL,
    propActivity       ?: USER_TYPE_ACTIVITY,
    propAverageSessions?: USER_TYPE_AVERAGE_SESSIONS,
    propPerformance    ?: USER_TYPE_PERFORMANCE
}


export default function Dashboard({propProfil, propActivity, propAverageSessions, propPerformance}: DASHBOARD_PROPS)
{
    const TABLET = useContext(SCREEN).tablet

    return (
        <article
        className={`${STYLES.dashboard} d_flx f_cl_ ${TABLET ? 'g_9 pt_9 pr_9 pb_9 pl_10' : 'g_11 pt_10 pr_12 pb_12 pl_13'} b_brd`}
        >
            <header>
                <h1
                className={`super_txt_9 mb_${TABLET ? 6 : 8} fw_500 lh_1`}
                >
                    Bonjour&nbsp;
                    
                    <span
                    className="c_prm2"
                    >
                        {propProfil?.userInfos.firstName}
                    </span>
                </h1>

                <p
                className="super_txt_5 c_drk0 fw_400"
                >
                    Félicitation ! Vous avez explosé vos objectifs hier 👏
                </p>
            </header>

            <main
            className={`${STYLES.grid} f_1 d_grd g_${TABLET ? 5 : 7}`}
            >
                <Activity
                propActivity={propActivity}
                />

                <Stats
                propStats={propProfil?.keyData}
                />

                <AverageSessions
                propAverageSessions={propAverageSessions}
                />

                <Performance
                propPerformance={propPerformance}
                />

                <Score
                propScore={propProfil?.score}
                />
            </main>
        </article>
    )
}