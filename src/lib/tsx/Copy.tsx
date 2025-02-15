import { useContext } from 'react'

import { SCREEN } from '../contexts/Screen'

import STYLE from './@copy/copy.module.scss'

export default function Copy()
{
    const MOBILE = useContext(SCREEN).mobile

    return (
        <small
        className={`${STYLE.copy} super_txt_${MOBILE ? '0 @s t_ctr' : 3} c_lgh0`}
        >
            &copy; 2020 Kasa. All rights reserved
        </small>
    )
}