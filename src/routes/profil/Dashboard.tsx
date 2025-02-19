import { USER_TYPE_PROFIL, USER_TYPE_ACTIVITY, USER_TYPE_AVERAGE_SESSIONS, USER_TYPE_PERFORMANCE } from '../../lib/contexts/User'

import Activity        from './@dashboard/Activity'
import Stats           from './@dashboard/Stats'
import AverageSessions from './@dashboard/AverageSessions'
import Performance     from './@dashboard/Performance'
import Score           from './@dashboard/Score'

import STYLES from './@dashboard/dashboard.module.scss'

type DASHBOARD_PROPS =
{
    propProfil         : undefined|USER_TYPE_PROFIL,
    propActivity       : undefined|USER_TYPE_ACTIVITY,
    propAverageSessions: undefined|USER_TYPE_AVERAGE_SESSIONS,
    propPerformance    : undefined|USER_TYPE_PERFORMANCE
}


export default function Dashboard({propProfil, propActivity, propAverageSessions, propPerformance}: DASHBOARD_PROPS)
{
    return (
        <article
        className={`${STYLES.dashboard} d_flx f_cl_ g_11 pt_10 pr_12 pb_12 pl_13 b_brd`}
        >
            <header>
                <h1
                className="super_txt_9 mb_8 fw_500"
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
            className={`${STYLES.grid} f_1 d_grd g_7`}
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
                propScore={propProfil?.todayScore}
                />
            </main>
        </article>
    )
}