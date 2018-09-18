import React from 'react'
import {branch, renderComponent} from 'recompose'
import style from './style.css'

const LoadingRatesWidget = () => (
    <div className={style.loadingRates}>
        Loading Rates ...
    </div>
)

export const withLoading = (isReadyFunc) => branch(
    props => !isReadyFunc(props),
    renderComponent(LoadingRatesWidget)
)