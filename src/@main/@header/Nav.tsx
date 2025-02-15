import { useContext } from 'react'
import { NavLink }    from 'react-router-dom'

import { SCREEN } from '../../lib/contexts/Screen'

export default function Nav()
{
    const MOBILE = useContext(SCREEN).mobile

    return (
        <nav
        id="NAV"
        className={`super_txt_${MOBILE ? 0 : 3} d_flx g_${MOBILE ? 4 : 8}`}
        >
        {
            ([
                {
                    name: 'Accueil',
                    href: '/'
                },
                {
                    name: 'À Propos',
                    href: '/about'
                }
            ] as {name: string, href: string}[]).map(({name, href}, key) =>
                <NavLink
                key={key}
                className={({isActive}) => `route ${isActive ? '@default @active ' : ''}c_drk0`}
                to={href}
                >
                    {name}
                </NavLink>
            )
        }
        </nav>
    )
}