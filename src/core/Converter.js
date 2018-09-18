import {decorate, computed, observable, action, runInAction, reaction} from 'mobx'

export const Converter = decorate(
    class Converter {

        constructor(RatesStorage){
            this.__ratesStorage = RatesStorage;

            this.__reaction = reaction(
                () => this.__ratesStorage.availableCurrencies,
                () => {
                    
                    if(this.__ratesStorage.availableCurrencies.length > 1){
                        if(!this.fromCurrency){
                            this.fromCurrency = this.__ratesStorage.availableCurrencies[0];
                        }

                        if(!this.toCurrency){
                            this.toCurrency = this.__ratesStorage.availableCurrencies[1];
                        }

                    }
                }
            )

            runInAction(() => {
                this.fromValue = 0;
                this.fromCurrency = '';
                this.toCurrency = '';
            });
        }

        get isReady(){
            return this.fromCurrency && this.toCurrency;
        }

        get rate(){

            const from = this.fromCurrency.toLowerCase();
            const to = this.toCurrency.toLowerCase();

            if(from === to){
                return 1;
            }

            return this.__ratesStorage.rates[from][to].rate;
        }

        get availableCurrencies(){
            return this.__ratesStorage.availableCurrencies;
        }

        get toValue(){
            return this.fromValue * this.rate;
        }

        setFromValue(value){
            this.fromValue = value;
        }

        setFromCurrency(value){
            this.fromCurrency = value;
        }

        setToCurrency(value){
            this.toCurrency = value;
        }

    },{
        fromValue: observable,
        toCurrency: observable,
        fromCurrency: observable,
        rate: computed,
        toValue: computed,
        setFromValue: action.bound,
        setFromCurrency:action.bound,
        setToCurrency: action.bound
    }
)