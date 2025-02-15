import { useContext } from 'react'

import { SCREEN } from '../lib/contexts/Screen'

import HousingList from './HousingList'

import Banner from '../lib/tsx/Banner'

export default function Home()
{
    const MOBILE = useContext(SCREEN).mobile

    return (
        <section
        id="HOME"
        className={`d_flx f_1 f_cl_ g_${MOBILE ? 4 : 6}`}
        >
            <Banner
            propSrc="/images/0.png"
            >
                <h1
                className={`super_txt_${MOBILE ? '3 pr_3 pl_3 b_brd' : '5 f_1 t_ctr'} c_lgh0 fw_700`}
                >
                    Chez vous, partout et ailleurs
                </h1>
            </Banner>

            <HousingList />
        </section>
    )
}