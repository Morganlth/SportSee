import { useContext, useState, useEffect } from 'react'

import { useParams } from 'react-router-dom'

import User, { USER_TYPE_PROFIL, USER_TYPE_ACTIVITY, USER_TYPE_AVERAGE_SESSIONS, USER_TYPE_PERFORMANCE } from '../../lib/contexts/User'

import Loader from '../../lib/tsx/Loader'

import Dashboard from './Dashboard'
import E404      from './E404'

export default function Profil()
{
    const
    ID                                     = useParams().id,
    USER                                   = useContext(User.USER_CONTEXT),
    [LOADED          , setLoaded         ] = useState(false),
    [ERROR           , setError          ] = useState(''),
    [PROFIL          , setUserProfil     ] = useState<undefined | USER_TYPE_PROFIL>(),
    [ACTIVITY        , setActivity       ] = useState<undefined | USER_TYPE_ACTIVITY>(),
    [AVERAGE_SESSIONS, setAverageSessions] = useState<undefined | USER_TYPE_AVERAGE_SESSIONS>(),
    [PERFORMANCE     , setPerformance    ] = useState<undefined | USER_TYPE_PERFORMANCE>()

    useEffect(() =>
    {
        USER.id = ID ?? '0'

        ;(async () =>
        {
            try
            {
                setUserProfil     (await USER.user_getProfil())
                setActivity       (await USER.user_getActivity())
                setAverageSessions(await USER.user_getAverageSessions())
                setPerformance    (await USER.user_getPerformance())
                setLoaded(true)
                setError('')
            }
            catch (e: unknown) { if (e instanceof Error) setError(e.message) }
        })()

        return USER.user_abort.bind(USER)
    },
    [])

    return (
        <section
        id="PROFIL"
        className="w_any h_any"
        >
        {
            ERROR
                ? <E404 />
                : LOADED
                    ? (
                        <Dashboard
                        propProfil={PROFIL}
                        propActivity={ACTIVITY}
                        propAverageSessions={AVERAGE_SESSIONS}
                        propPerformance={PERFORMANCE}
                        />
                    )
                    : (
                        <div
                        className="wrapper d_flx j_ctr a_ctr w_any h_any"
                        >
                            <Loader />
                        </div>
                    )
        }
        </section>
    )
}