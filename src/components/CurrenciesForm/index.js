import React from 'react'

import { compose } from 'recompose'
import { observer, inject } from 'mobx-react'
import { CurrencySelector } from '../CurrencySelector'
import { CurrencyInput } from '../CurrencyInput'
import { CurrencyOuput } from '../CurrencyOutput'

import {withLoading} from '../LoadingRates'

import { Rate } from '../Rate'

import style from './style.css'


export const CurrenciesForm = compose(
    inject('Converter'),
    observer,
    withLoading(({Converter}) => Converter.isReady)
) (
    ({
        Converter
    }) => (
        <div>
            <Rate/>
            <CurrencySelector currency={Converter.fromCurrency} 
                            updateCurrencyHandler={Converter.setFromCurrency}>
                <CurrencyInput/>
            </CurrencySelector>
            <CurrencySelector className={style.darker} 
                            currency={Converter.toCurrency} 
                            updateCurrencyHandler={Converter.setToCurrency}>
                <CurrencyOuput/>
            </CurrencySelector>
        </div>
    )
)