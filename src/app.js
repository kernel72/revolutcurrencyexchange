import React from 'react'
import ReactDom from 'react-dom'
import {configure} from 'mobx'
import { Provider } from 'mobx-react'

import style from './app.css'

import { Converter } from './core/Converter'
import { RatesStorage } from './core/RatesStorage'

import {CurrenciesForm} from './components/CurrenciesForm'

configure({enforceActions: 'always'});

const coverter = new Converter(
    new RatesStorage({
        usdFeedUrl: 'http://www.floatrates.com/daily/usd.json',
        eurFeedUrl: 'http://www.floatrates.com/daily/eur.json',
        gbpFeedUrl: 'http://www.floatrates.com/daily/gbp.json'
    })
);

const App = () => (
    <Provider Converter={coverter}>
        <div className={style.app}>
            <CurrenciesForm/>
        </div>
    </Provider>
)

ReactDom.render(<App/>, document.getElementById('app'));