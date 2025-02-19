import Copy from '../lib/tsx/Copy'

import Nav from './@panel/Nav'

import STYLES from './@panel/panel.module.scss'

export default function Panel()
{
    return (
        <aside
        className={`${STYLES.panel} d_grd pr_6 pb_9 pl_6 b_brd b_drk1`}
        >
            <Nav />

            <footer>
                <Copy />
            </footer>
        </aside>
    )
}