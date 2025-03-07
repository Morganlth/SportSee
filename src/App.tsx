import { StrictMode }                   from 'react'
import { createRoot }                   from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Screen from './lib/contexts/Screen'
import Events from './lib/contexts/Events'
import User   from './lib/contexts/User'

import Header from './@app/Header'
import Panel  from './@app/Panel'
import Main   from './@app/Main'

import Home   from './routes/+page'
import Profil from './routes/profil/+page'

import './@app/app.scss'

const ROUTES: [path: string, Page: React.FC][] =
[
    ['/', Home],
    ['/profil/:id', Profil]
]

createRoot(document.getElementById('APP')!).render(
    <StrictMode>
        <BrowserRouter>
            <Screen>
                <Events>
                    <User
                    mocked={false}
                    >
                        <Header />

                        <Panel />
                        
                        <Main>
                            <Routes>
                            {
                                ROUTES.map(([path, Page]) =>
                                    <Route
                                    key={path}
                                    path={path}
                                    element={<Page />}
                                    />
                                )
                            }
                            </Routes>
                        </Main>
                    </User>
                </Events>
            </Screen>
        </BrowserRouter>
    </StrictMode>
)