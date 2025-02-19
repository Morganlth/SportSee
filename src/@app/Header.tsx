import Logo from '../lib/tsx/Logo'

import Nav from './@header/Nav'

import STYLES from './@header/header.module.scss'

export default function Header()
{
    return (
        <header
        id="HEADER"
        className={`${STYLES.header} super_shadow d_flx j_sbt a_ctr g_14 w_any pt_3 pr_12 pb_1 pl_6 b_brd b_drk1`}
        >
            <Logo />

            <Nav />
        </header>
    )
}