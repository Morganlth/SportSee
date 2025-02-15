import { StrictMode }                   from 'react'
import { createRoot }                   from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Screen from './lib/contexts/Screen'
import Events from './lib/contexts/Events'

import Header from './@main/Header'
import Main   from './@main/Main'

import Home   from './routes/+page'
import Profil from './routes/profil/+page'

import './@main/main.scss'

const
HTML                                     = document.documentElement,
ROOT                                     = document.getElementById('root')!,
ROUTES: [path: string, Page: React.FC][] =
[
    ['/', Home],
    ['/profil/:id', Profil]
]

function html_setClass() { HTML.classList.add('super_scroll_bar', 'o_h_a', 'b_lgh0') }

function root_setClass() { ROOT.classList.add('d_flx', 'f_cl_', 'w_ful', 'min_h_ful') }

{
    html_setClass()
    root_setClass()

    createRoot(ROOT).render(
        <StrictMode>
            <BrowserRouter>
                <Screen>
                    <Events>
                        <Header />
                        
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
                    </Events>
                </Screen>
            </BrowserRouter>
        </StrictMode>
    )
}