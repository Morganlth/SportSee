import { Link } from 'react-router-dom'

export default function Home()
{
    return (
        <section
        id="HOME"
        >
            <p
            className="super_txt_5 pt_10 pl_13 b_brd"
            >
                Fonctionnalité temporaire.
                <br /><br />
    
            {
                [12, 18].map(id =>
                    <Link
                    key={id}
                    to={`/profil/${id}`}
                    className="mr_3"
                    >
                        User with id {id}
                    </Link>
                )
            }
            </p>
        </section>
    )
}