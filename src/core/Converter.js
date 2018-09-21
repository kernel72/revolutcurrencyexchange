import {decorate, computed, observable, action, runInAction, reaction} from 'mobx'

export const Converter = decorate(
    class Converter {

        constructor(RatesStorageInstance, WalletsInstance){
            this.__ratesStorage = RatesStorageInstance;
            this.__wallets = WalletsInstance;

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
                this.inputFromValue = '';
                this.fromValue = 0;
                this.fromCurrency = '';
                this.toCurrency = '';
            });
        }

        get availableFunds(){
            return this.__wallets.wallet
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
            return Number((this.fromValue * this.rate).toFixed(2));
        }

        get isEnoughFunds(){
            return this.availableFunds[this.fromCurrency] >= this.fromValue;
        }

        get isTransferPossible(){
            return (
                this.isReady &&
                this.isEnoughFunds &&
                this.fromCurrency !== this.toCurrency &&
                this.fromValue > 0
            )
        }

        transfer(){
            if(!this.isTransferPossible){
                console.error("Transfer is not possible.");
                return;
            }

            const isSuccess = this.__wallets.doTransfer({
                fromWallet: this.fromCurrency,
                fromValue: this.fromValue,
                toWallet: this.toCurrency,
                toValue: this.toValue
            });

            if(isSuccess){
                this.setFromValue(0);
            }
        }

        setFromValue(value){
            value = String(value);
            if(value != '0') {
                value = value.startsWith('-') ? value : `-${value}`
                value = value === '-' ? '': value;
                value = value.length > 8 ? value.slice(0, 8) : value;
            }
            
            this.inputFromValue = value;

            const realVal = Number(value.slice(1, value.length));
            if(isNaN(realVal)){
                return;
            }

            this.fromValue = Number(realVal.toFixed(2));
        }

        setFromCurrency(value){
            this.fromCurrency = value;
        }

        setToCurrency(value){
            this.toCurrency = value;
        }

    },{
        fromValue: observable,
        inputFromValue: observable,
        toCurrency: observable,
        fromCurrency: observable,
        rate: computed,
        toValue: computed,
        setFromValue: action.bound,
        setFromCurrency:action.bound,
        setToCurrency: action.bound,
        availableFunds: computed,
        isEnoughFunds: computed,
        isTransferPossible: computed,
        transfer: action

    }
)