import React from 'react'

import {compose, mapProps, branch, withProps} from 'recompose'
import {inject, observer} from 'mobx-react'
import style from './style.css'

const TransferButtonWidget = (props) => (
    <button {...props} >Transfer</button>
)

export const TransferButton = compose(
    inject('Converter'),
    observer,
    mapProps(({Converter}) => ({
        onClick: () => Converter.transfer(),
        disabled: !Converter.isTransferPossible,
        className: `${style.transferButton} ${!Converter.isTransferPossible ? style.disabled: style.enabled}`
    }))
)(TransferButtonWidget)