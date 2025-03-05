import { createContext, Component } from 'react'

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

type USER_TYPE_MIXED = USER_TYPE_PROFIL | USER_TYPE_ACTIVITY | USER_TYPE_AVERAGE_SESSIONS | USER_TYPE_PERFORMANCE

export default class User extends Component<USER_TYPE_PROPS>
{
    // #STATICS
    static #__URL                                 = 'http://localhost:3000/user/'
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
    user_getProfil() { return this.#fetcher('profil', User.#__URL + this.#id) as Promise<USER_TYPE_PROFIL> }

    user_getActivity() { return this.#fetcher('activity', User.#__URL + this.#id + '/activity', User.#__builderActivity) as Promise<USER_TYPE_ACTIVITY> }

    user_getAverageSessions() { return this.#fetcher('averageSessions', User.#__URL + this.#id + '/average-sessions', User.#__builderAverageSessions) as Promise<USER_TYPE_AVERAGE_SESSIONS> }

    user_getPerformance() { return this.#fetcher('performance', User.#__URL + this.#id + '/performance', User.#__builderPerformance) as Promise<USER_TYPE_PERFORMANCE> }

    // #BUILDER
    static #__builderActivity(data: { [key: string]: unknown })
    {
        const SESSIONS = data.sessions

        if (!SESSIONS || !(SESSIONS instanceof Array)) throw new Error('The "data" is not compliant.')

        for (let i = 0, max = SESSIONS.length; i < max; i++)
        {
            const SESSION = SESSIONS[i]
    
            SESSION.day = SESSION.day.slice(-2).replace(/^0+/, '')
        }

        return SESSIONS as USER_TYPE_ACTIVITY
    }

    static #__builderAverageSessions(data: { [key: string]: unknown })
    {
        const SESSIONS = data.sessions

        if (!SESSIONS || !(SESSIONS instanceof Array)) throw new Error('The "data" is not compliant.')

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
        DATA      = data.data

        if (!KIND || !DATA || !(DATA instanceof Array)) throw new Error('The "data" is not compliant.')
        
        for (let i = 0, max = DATA.length; i < max; i++)
        {
            const D = DATA[i]

            D.kind = KIND[D.kind] ?? ''
        }

        return DATA as USER_TYPE_PERFORMANCE
    }

    // #MOCKS
    #mockGetProfil() { return this.#fetcher('profil', '/mock/' + this.#id + '.json') as Promise<USER_TYPE_PROFIL> }

    #mockGetActivity() { return this.#fetcher('activity', '/mock/' + this.#id + '/activity.json', User.#__builderActivity) as Promise<USER_TYPE_ACTIVITY> }

    #mockGetAverageSessions() { return this.#fetcher('averageSessions', '/mock/' + this.#id + '/average-sessions.json', User.#__builderAverageSessions) as Promise<USER_TYPE_AVERAGE_SESSIONS> }

    #mockGetPerformance() { return this.#fetcher('performance', '/mock/' + this.#id + '/performance.json', User.#__builderPerformance) as Promise<USER_TYPE_PERFORMANCE> }

    // #UTILS
    async #fetcher(key = '', url: string, builder?: ((data: { [key: string]: unknown }) => USER_TYPE_MIXED))
    {
        let data: undefined | USER_TYPE_MIXED | { [key: string]: unknown } = User.#__CACHE.get(key)

        if (data) return data as USER_TYPE_MIXED

        this.#controller = new AbortController()

        data = (
            await
                (await fetch(url, { signal: this.#controller.signal }))
            .json()
        )?.data as undefined | { [key: string]: unknown }

        if (!data) throw new Error('Unable to retrieve user data.')

        delete data.id
        delete data.userId

        User.#__CACHE.set(key, (builder ? data = builder(data) : data) as USER_TYPE_MIXED)
    
        return data
    }

    user_abort() { this.#controller?.abort() }


}

export type {USER_TYPE_PROFIL, USER_TYPE_ACTIVITY, USER_TYPE_AVERAGE_SESSIONS, USER_TYPE_PERFORMANCE}