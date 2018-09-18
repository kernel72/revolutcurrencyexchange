import React from 'react'

import {compose, mapProps} from 'recompose'
import {inject, observer} from 'mobx-react'
import style from './style.css';

import {withCurrencyFormatter} from '../CurrencyOutput'

const RateWidget = ({from, to, value, formatter}) => (
    <div className={style.rate}>
        <span> 1 {from} = {formatter(value)} {to}</span>
    </div>
)


export const Rate = compose(
    withCurrencyFormatter,
    inject('Converter'),
    observer,
    mapProps(({Converter, formatCurrency}) => ({
        from: Converter.fromCurrency,
        to: Converter.toCurrency,
        value: Converter.rate,
        formatter: formatCurrency
    }))
)(RateWidget)