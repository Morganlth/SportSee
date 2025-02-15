export type HousingData =
{
    id         : string,
    title      : string,
    cover      : string,
    pictures   : string[],
    description: string,
    host       :
    {
        name   : string,
        picture: string
    },
    rating    : number,
    location  : string,
    equipments: string[],
    tags      : string[]
}

const HOUSING_CACHE = new Map<string, HousingData>()

let
housing_IS_SETUP   = false,
housing_QUEUE_SIZE = 0,
housing_CONTROLLER = new AbortController(),
housing_PROTOCOL: undefined|Promise<undefined>

async function housing_fetcher(signal: AbortSignal)
{
    if (signal.aborted) throw new Error('Aborted.')

    housing_QUEUE_SIZE++

    signal.addEventListener('abort', () =>
    {
        if (--housing_QUEUE_SIZE < 1)
        {
            housing_CONTROLLER.abort()

            housing_CONTROLLER = new AbortController()
            housing_PROTOCOL   = undefined
        }
    })

    return housing_PROTOCOL ??= (async () =>
    {
        await new Promise(r => setTimeout(r, 1_700)) // TODO: Loading time simulation

        try
        {
            const HOUSINGS = await (await fetch('/json/housing.json', { signal: housing_CONTROLLER.signal })).json()

            for (let i = 0, max = HOUSINGS.length; i < max; i++)
            {
                const HOUSING: HousingData = HOUSINGS[i]
    
                HOUSING_CACHE.set(HOUSING.id, HOUSING)
            }
    
            housing_IS_SETUP = true
        }
        catch {}
    })()
}

export async function housing_get(id = '', {signal}: {signal: AbortSignal})
{
    if (!housing_IS_SETUP) await housing_fetcher(signal)

    return HOUSING_CACHE.get(id)
}

export async function housing_getList({signal}: {signal: AbortSignal})
{
    if (!housing_IS_SETUP) await housing_fetcher(signal)

    return [...HOUSING_CACHE.values()]
}