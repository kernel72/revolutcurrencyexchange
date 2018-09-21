import React from 'react'

import { compose, mapProps } from 'recompose'
import { inject, observer } from 'mobx-react'

const WalletValueWidget = ({className, value, formatter}) => (
    <span className={className}>You have { formatter(value) } </span>
)


export const WalletValue = compose(
    inject('Converter'),
    observer,
    mapProps(({Converter, currency}) => ({
        value: Converter.availableFunds[currency],
        formatter: (value) => new Intl.NumberFormat('en-US', { 
                                            style: 'currency', 
                                            currency 
                                        }).format(value)
    }))
) (WalletValueWidget)
