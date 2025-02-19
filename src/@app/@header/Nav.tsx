import { Link } from 'react-router-dom'

export default function Nav()
{
    return (
        <nav
        id="NAV"
        className="super_txt_7 f_1"
        >
            <ul
            className="d_flx j_sbt g_5 fw_500"
            >
            {
                ([
                    {
                        name: 'Accueil',
                        href: '/'
                    },
                    {
                        name: 'Profil',
                        href: '/profil'
                    },
                    {
                        name: 'Réglage',
                        href: '#'
                    },
                    {
                        name: 'Communauté',
                        href: '#'
                    }
                ] as {name: string, href: string}[]).map(({name, href}, key) =>
                    <li
                    key={key}
                    className="route"
                    >
                        <Link
                        className="c_lgh0"
                        to={href}
                        >
                            {name}
                        </Link>
                    </li>
                )
            }
            </ul>
        </nav>
    )
}