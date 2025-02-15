import { useContext } from 'react'

import { SCREEN } from '../lib/contexts/Screen'

import Logo from '../lib/tsx/Logo'

import Nav from './@header/Nav'

export default function Header()
{
    const MOBILE = useContext(SCREEN).mobile

    return (
        <header
        id="HEADER"
        className={`d_flx j_sbt a_ctr ${MOBILE ? 'mb_5 pt_4 pr_4 pl_4' : 'mb_7 pt_6 pr_10 pl_10'} b_brd`}
        >
            <Logo />

            <Nav />
        </header>
    )
}