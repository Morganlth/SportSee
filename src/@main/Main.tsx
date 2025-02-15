import { useContext } from 'react'

import { SCREEN } from '../lib/contexts/Screen'

export default function Main({children}: {children: React.ReactNode})
{
    const MOBILE = useContext(SCREEN).mobile

    return (
        <main
        id="MAIN"
        className={`d_flx f_1 o_hid ${MOBILE ? 'pr_4 pl_4' : 'pr_10 pl_10'} b_brd`}
        >
            {children}
        </main>
    )
}