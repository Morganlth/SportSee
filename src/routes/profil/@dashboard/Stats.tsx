import { useContext, cloneElement } from 'react'

import { USER_TYPE_PROFIL } from '../../../lib/contexts/User'
import { SCREEN           } from '../../../lib/contexts/Screen'

import COLORS, { color_rgba } from '../../../lib/ts/colors'

import STYLES from './@stats/stats.module.scss'

type STATS_ITEM =
{
    key  : keyof USER_TYPE_PROFIL['keyData'],
    unit : string,
    type : string,
    color: string,
    icon : React.ReactElement
} 

const STATS_ITEMS: STATS_ITEM[] =
[
    {
        key  : 'calorieCount',
        unit : 'kCal',
        type : 'Calories', 
        color: COLORS.prm1, 
        icon : (
            <svg
            viewBox="0 0 17 20"
            xmlns="http://www.w3.org/2000/svg"
            >
                <path
                d="M10.905 7.86625C10.905 7.86625 11.8375 2.38125 8.03249 0C7.91784 1.90607 6.99682 3.6731 5.49999 4.85875C3.87499 6.2875 0.81874 9.5 0.85124 12.925C0.827424 15.9116 2.49913
                18.6534 5.16499 20C5.25931 18.6645 5.88737 17.4233 6.90749 16.5562C7.77187 15.8915 8.33304 14.9074 8.46499 13.825C10.7407 15.0348 12.2125 17.3521 12.34
                19.9263V19.9425C14.8552 18.7904 16.5109 16.3241 16.625 13.56C16.895 10.3425 15.1325 5.9675 13.5687 4.5375C12.9784 5.85556 12.0615 7.00126 10.905 7.86625Z"
                />
            </svg>
        )
    },
    {
        key  : 'proteinCount',
        unit : 'g',
        type : 'Proteines', 
        color: COLORS.scd0, 
        icon : (
            <svg
            viewBox="0 0 19 19"
            xmlns="http://www.w3.org/2000/svg"
            >
                <path
                d="M18.2353 2.47058C17.8824 2.11764 17.4118 1.88234 17.0588 1.88234C16.9412 1.41176 16.8235 1.05881 16.4706 0.705873C15.6471 -0.117656 14.2353 -0.117656 13.4118
                0.705873C12.7059 1.41176 12.5882 2.58823 13.1765 3.41176L10.5882 5.88234L9.29412 4.58823L6.70588 7.17646C6.47059 7.05881 6.11765 7.05881 5.88235 7.05881C2.58824
                7.05881 0 9.64705 0 12.9412C0 16.2353 2.58824 18.8235 5.88235 18.8235C9.17647 18.8235 11.7647 16.2353 11.7647 12.9412C11.7647 12.7059 11.7647 12.3529 11.6471
                12.1176L14.2353 9.5294L12.9412 8.23528L15.4118 5.7647C16.2353 6.35293 17.4118 6.23529 18.1176 5.5294C19.0588 4.70587 19.0588 3.29411 18.2353 2.47058Z"
                />
            </svg>
        )
    },
    {
        key  : 'carbohydrateCount',
        unit : 'g',
        type : 'Glucides', 
        color: COLORS.trt0, 
        icon : (
            <svg
            viewBox="0 0 18 20"
            xmlns="http://www.w3.org/2000/svg"
            >
                <path
                d="M16.6575 15.1C16.225 16.0575 16.0187 16.485 15.4612 17.3313C14.685 18.5125 13.5912 19.985 12.235 19.9975C11.03 20.0088 10.72 19.2138 9.08499 19.2225C7.44999
                19.2313 7.10749 20.0113 5.90249 20C4.54624 19.9875 3.50999 18.6588 2.73249 17.4763C0.562489 14.1713 0.334989 10.2938 1.67374 8.2325C2.62499 6.76625 4.12624 5.91
                5.53874 5.91C6.97624 5.91 7.87874 6.6975 9.06749 6.6975C10.22 6.6975 10.9225 5.90875 12.585 5.90875C13.8412 5.90875 15.1725 6.5925 16.12 7.77375C13.0137 9.4775
                13.5187 13.9138 16.6575 15.1Z"
                />
                <path
                d="M1.84285 15.1C2.27535 16.0575 2.4816 16.485 3.0391 17.3313C3.81535 18.5125 4.9091 19.985 6.26535 19.9975C7.47035 20.0088 7.78035 19.2138 9.41535 19.2225C11.0503
                19.2313 11.3928 20.0113 12.5978 20C13.9541 19.9875 14.9903 18.6588 15.7678 17.4763C17.9378 14.1713 18.1653 10.2938 16.8266 8.2325C15.8753 6.76625 14.3741 5.91 12.9616
                5.91C11.5241 5.91 10.6216 6.6975 9.43285 6.6975C8.28035 6.6975 7.57785 5.90875 5.91535 5.90875C4.6591 5.90875 3.32785 6.5925 2.38035 7.77375C5.4866 9.4775 4.9816
                13.9138 1.84285 15.1Z"
                />
                <path
                d="M12.005 3.37375C12.6875 2.49875 13.205 1.2625 13.0162 0C11.9025 0.07625 10.6 0.785 9.83873 1.70875C9.14873 2.5475 8.57873 3.79125 8.79998 5C10.0162 5.0375 11.2737
                4.31125 12.005 3.37375Z"
                />
            </svg>
        )
    },
    {
        key  : 'lipidCount',
        unit : 'g',
        type : 'Lipides', 
        color: COLORS.prm3, 
        icon : (
            <svg
            viewBox="0 0 20 19"
            xmlns="http://www.w3.org/2000/svg"
            >
                <path
                d="M1.25 15C1.25 17.125 2.875 18.75 5 18.75H15C17.125 18.75 18.75 17.125 18.75 15H1.25Z"
                />
                <path
                d="M18.75 12.5H1.25C0.5 12.5 0 12 0 11.25C0 10.5 0.5 10 1.25 10H18.75C19.5 10 20 10.5 20 11.25C20 12 19.5 12.5 18.75 12.5Z"
                />
                <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M11.25 0H8.75C4.625 0 1.25 3.375 1.25 7.5H18.75C18.75 3.375 15.375 0 11.25 0ZM7.5 5C6.75 5 6.25 4.5 6.25 3.75C6.25 3 6.75 2.5 7.5 2.5C8.25 2.5 8.75 3 8.75
                3.75C8.75 4.5 8.25 5 7.5 5ZM12.5 5C12.5 5.75 13 6.25 13.75 6.25C14.5 6.25 15 5.75 15 5C15 4.25 14.5 3.75 13.75 3.75C13 3.75 12.5 4.25 12.5 5Z"
                />
            </svg>
        )
    }
]

export default function Stats({propStats}: {propStats?: USER_TYPE_PROFIL['keyData']})
{
    const TABLET = useContext(SCREEN).tablet

    return (
        <ul
        className={`${STYLES.stats} d_flx f_cl_ j_sbt g_${TABLET ? 6 : 8}`}
        >
        {
            STATS_ITEMS.map(({key, unit, type, color, icon}) =>
                <li
                key={key}
                className="d_flx a_ctr g_5 pt_7 pr_7 pb_7 pl_7 b_brd b_lgh1"
                >
                    <div
                    className="wrapper pt_4 pr_4 pb_4 pl_4 b_brd brd_r_1"
                    style={{ backgroundColor: color_rgba(color, 0.0661) }}
                    >
                    {
                        cloneElement(icon,
                        {
                            className: STYLES.icon + ' brd_r_2',
                            style    : { fill: color }
                        })
                    }
                    </div>

                    <p>
                        <span
                        className={`${STYLES.value} super_txt_6 d_ilb c_drk3 fw_700`}
                        >
                            {propStats ? propStats[key]?.toLocaleString('en-US') ?? '0' : '0'}{unit}
                        </span>
                
                        <br />
            
                        <span
                        className="super_txt_2 c_gry3 fw_500"
                        >
                            {type}
                        </span>
                    </p>
                </li>
            )
        }
        </ul>
    )
}