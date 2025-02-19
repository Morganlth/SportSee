import { createContext, Component } from 'react'

console.warn('"USER" has been declared on the "window" global object.')

declare global { interface Window { USER: User }}

type USER_TYPE_PROPS =
{
    children: React.ReactNode,
    mocked? : boolean
}

type USER_TYPE_PROFIL =
{
    userInfos:
    {
        firstName: string,
        lastName : string,
        age      : number
    },
    todayScore: number,
    keyData   :
    {
        calorieCount     : number,
        proteinCount     : number,
        carbohydrateCount: number,
        lipidCount       : number
    }
}

type USER_TYPE_ACTIVITY =
{
    day     : string,
    kilogram: number,
    calories: number
}[]

type USER_TYPE_AVERAGE_SESSIONS =
{
    day          : string,
    sessionLength: number
}[]

type USER_TYPE_PERFORMANCE =
{
    value: number,
    kind : string
}[]

type USER_TYPE_MIXED = USER_TYPE_PROFIL|USER_TYPE_ACTIVITY|USER_TYPE_AVERAGE_SESSIONS|USER_TYPE_PERFORMANCE

export default class User extends Component<USER_TYPE_PROPS>
{
    // #STATICS
    static #__DAYS                                = ['L', 'M', 'M', 'J', 'V', 'S', 'D']
    static #__CACHE: Map<string, USER_TYPE_MIXED> = new Map()

    static USER_CONTEXT = createContext({} as User)

    // #PRIVATES
    #id = '0'
    #controller: undefined|AbortController

    // #CONSTRUCTOR
    constructor(props: USER_TYPE_PROPS)
    {
        super(props)

        if (props.mocked) this.#setMocks()

        window.USER = this // TODO: debug only
    }

    // #RENDER
    render()
    {
        return (
            <User.USER_CONTEXT.Provider
            value={this}
            >
                {this.props.children}
            </User.USER_CONTEXT.Provider>
        )
    }

    // #SETTER
    set id(id)
    {
        User.#__CACHE.clear()
    
        this.#id = id
    }

    // #GETTER
    get id() { return this.#id }

    // #SET
    #setMocks()
    {
        this.user_getProfil          = this.#mockGetProfil
        this.user_getActivity        = this.#mockGetActivity
        this.user_getAverageSessions = this.#mockGetAverageSessions
        this.user_getPerformance     = this.#mockGetPerformance
    }

    // #GET
    user_getProfil() { return this.#fetcher('profil') as Promise<USER_TYPE_PROFIL> }

    user_getActivity() { return this.#fetcher('activity', '/activity', User.#__builderActivityAndAverageSessions) as Promise<USER_TYPE_ACTIVITY> }

    user_getAverageSessions() { return this.#fetcher('averageSessions', '/average-sessions', User.#__builderAverageSessions) as Promise<USER_TYPE_AVERAGE_SESSIONS> }

    user_getPerformance() { return this.#fetcher('performance', '/performance', User.#__builderPerformance) as Promise<USER_TYPE_PERFORMANCE> }

    // #BUILDER
    static #__builderActivityAndAverageSessions(data: { [key: string]: unknown })
    {
        const SESSIONS = data.sessions

        if (!SESSIONS || !(SESSIONS instanceof Array)) throw new Error('The "data" is not compliant.')

        return SESSIONS as USER_TYPE_ACTIVITY|USER_TYPE_AVERAGE_SESSIONS
    }

    static #__builderAverageSessions(data: { [key: string]: unknown })
    {
        const SESSIONS = User.#__builderActivityAndAverageSessions(data)

        for (let i = 0, max = SESSIONS.length; i < max; i++)
        {
            const
            SESSION = SESSIONS[i],
            INDEX   = SESSION.day

            SESSION.day = typeof INDEX === 'number' ? User.#__DAYS[INDEX - 1] : ''
        }

        return SESSIONS as USER_TYPE_AVERAGE_SESSIONS
    }

    static #__builderPerformance(data: { [key: string]: unknown})
    {
        const
        KIND: any = data.kind,
        DATA      = data.sessions

        if (!KIND || !DATA || !(DATA instanceof Array)) throw new Error('The "data" is not compliant.')
        
        for (let i = 0, max = DATA.length; i < max; i++)
        {
            const D = DATA[i]

            D.kind = KIND[D.kind] ?? ''
        }

        return DATA as USER_TYPE_PERFORMANCE
    }

    // #MOCKS
    async #mockGetProfil()
    {
  await this.#mocker()

        return {
            userInfos:
            {
                firstName: 'MockedKarl',
                lastName : 'Dovineau',
                age      : 31
            },
            todayScore: 0.12,
            keyData   :
            {
                calorieCount     : 1930,
                proteinCount     : 155,
                carbohydrateCount: 290,
                lipidCount       : 50
            }
        } as USER_TYPE_PROFIL
    }

    async #mockGetActivity()
    {
  await this.#mocker()

        return [
            {
                day     : '2020-07-01',
                kilogram: 80,
                calories: 240
            },
            {
                day     : '2020-07-02',
                kilogram: 80,
                calories: 220
            },
            {
                day     : '2020-07-03',
                kilogram: 81,
                calories: 280
            },
            {
                day     : '2020-07-04',
                kilogram: 81,
                calories: 290
            },
            {
                day     : '2020-07-05',
                kilogram: 80,
                calories: 160
            },
            {
                day     : '2020-07-06',
                kilogram: 78,
                calories: 162
            },
            {
                day     : '2020-07-07',
                kilogram: 76,
                calories: 390
            }
        ] as USER_TYPE_ACTIVITY
    }

    async #mockGetAverageSessions()
    {
  await this.#mocker()

        return [
            {
                day          : 'L',
                sessionLength: 30
            },
            {
                day          : 'M',
                sessionLength: 23
            },
            {
                day          : 'M',
                sessionLength: 45
            },
            {
                day          : 'J',
                sessionLength: 50
            },
            {
                day          : 'V',
                sessionLength: 0
            },
            {
                day          : 'S',
                sessionLength: 0
            },
            {
                day          : 'D',
                sessionLength: 60
            }
        ] as USER_TYPE_AVERAGE_SESSIONS
    }

    async #mockGetPerformance()
    {
  await this.#mocker()

        return [
            {
                value: 200,
                kind : 'cardio'
            },
            {
                value: 240,
                kind : 'energy'
            },
            {
                value: 80,
                kind : 'endurance'
            },
            {
                value: 80,
                kind : 'strength'
            },
            {
                value: 220,
                kind : 'speed'
            },
            {
                value: 110,
                kind : 'intensity'
            }
        ] as USER_TYPE_PERFORMANCE
    }

    // #UTILS
    async #fetcher(key = '', route = '', builder?: undefined|((data: { [key: string]: unknown }) => USER_TYPE_MIXED))
    {
        let data: undefined|USER_TYPE_MIXED|{ [key: string]: unknown } = User.#__CACHE.get(key)

        if (data) return data as USER_TYPE_MIXED

        this.#controller = new AbortController()

        data = (await (await fetch(`http://localhost:3000/user/${this.#id}${route}`, { signal: this.#controller.signal })).json())?.data as undefined|{ [key: string]: unknown }

        if (!data) throw new Error('Unable to retrieve user data.')

        delete data.id
        delete data.userId

        User.#__CACHE.set(key, (builder ? builder(data) : data) as USER_TYPE_MIXED)
    
        return data
    }

    async #mocker()
    {
        this.#controller = new AbortController()

        await new Promise((res, rej) =>
        {
            setTimeout(res, 500) // *Delay simulation

            this.#controller?.signal.addEventListener('abort', () => rej('Signal aborted.'))
        })
    }

    user_abort() { this.#controller?.abort() }


}

export type {USER_TYPE_PROFIL, USER_TYPE_ACTIVITY, USER_TYPE_AVERAGE_SESSIONS, USER_TYPE_PERFORMANCE}