import {decorate, action, observable, runInAction} from 'mobx'

export const Wallets = decorate(
    class Wallets {
        constructor({USD, EUR, GBP}){
            runInAction(() => {
                this.wallet = {
                    USD,
                    EUR,
                    GBP
                };
            })
            
        }

        doTransfer({fromWallet, fromValue, toWallet, toValue}){
            console.log(`Tranfering ${fromValue} ${fromWallet} -> ${toValue} ${toWallet}`);
            
            if(this.wallet[fromWallet] < fromValue){
                console.error("Not enough funds");
                return false;
            }
            this.wallet[fromWallet] -= fromValue;
            this.wallet[toWallet] += toValue;
            this.wallet[toWallet] = this.wallet[toWallet];
            return true
        }
    }, {
        wallet: observable,
        doTransfer: action.bound
    } 
)