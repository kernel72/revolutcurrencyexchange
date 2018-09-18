import React from 'react'
import {inject, observer} from 'mobx-react'
import { compose, withHandlers, withProps } from 'recompose'

import style from './style.css';

const withCurrencySelection = compose(
    inject('Converter'),
    observer,
    withProps(({Converter}) => ({
        currencies: Converter.availableCurrencies
    })),
    withHandlers({
        getNextCurrency:({currencies}) => (currentCurrency) => {
            let currencyIndex = currencies.indexOf(currentCurrency);
            currencyIndex += 1;

            if(currencyIndex >= currencies.length){
                currencyIndex = 0;
            }
            return currencies[currencyIndex];
        },
        getPrevCurrency: ({currencies}) => (currentCurrency) => {
            let currencyIndex = currencies.indexOf(currentCurrency);
            currencyIndex -= 1;

            if(currencyIndex < 0){
                currencyIndex = currencies.length - 1;
            }
            return currencies[currencyIndex];
        }
    })
);


const CurrencySelectorWidget = ({
    className,
    currency,
    updateCurrencyHandler,
    getNextCurrency,
    getPrevCurrency,
    children,
}) => (
    <div className={`${style.currencySelector} ${className || ''}`}>
        <button className={style.changeCurrencyButtonPrev}
                onClick={() => updateCurrencyHandler( getPrevCurrency(currency) )}
        >&lt;</button>
        <div className={style.currencyAndRate}>
            <div className={style.currency}>
                <span>{currency}</span>
            </div>
            <div className={style.rateWidget}>
            {
                children
            }
            </div>
        </div>
        <button className={style.changeCurrencyButtonNext}
            onClick={() => updateCurrencyHandler( getNextCurrency(currency) )}>&gt;</button>
    </div>
)

export const CurrencySelector = compose(
    withCurrencySelection
) (CurrencySelectorWidget)