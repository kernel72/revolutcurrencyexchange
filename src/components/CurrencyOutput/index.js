import React from 'react'
import { inject, observer } from 'mobx-react'
import { compose, withHandlers, mapProps } from 'recompose'

const CurrencyOutputWidget = ({value, formatter}) => (
    <div>
        <span>{ formatter(value) }</span>
    </div>
)

export const withCurrencyFormatter = withHandlers({
    formatCurrency: () => value => new Intl.NumberFormat('en-US', {maximumFractionDigits: 2}).format(value),
});

export const CurrencyOuput = compose(
    withCurrencyFormatter,
    inject('Converter'),
    observer,
    mapProps(({formatCurrency, Converter}) =>({
        formatter: formatCurrency,
        value: Converter.toValue,
    }))
)(CurrencyOutputWidget);