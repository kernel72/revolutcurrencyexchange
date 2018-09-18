import {decorate, computed, observable, action, runInAction} from 'mobx'


export const RatesStorage = decorate(
    class RatesStorage{
        constructor({usdFeedUrl, eurFeedUrl, gbpFeedUrl}){

            runInAction(() => {
                this.__storage = {};
            });

            this.updateRate('usd', usdFeedUrl);
            this.updateRate('eur', eurFeedUrl);
            this.updateRate('gbp', gbpFeedUrl);
        }       

        get rates(){
            return this.__storage;
        }

        get availableCurrencies(){
            return Object.keys(this.__storage).map(k => k.toUpperCase());
        }

        async updateRate(currency, feedUrl){
            try{
                const rates = await fetch(feedUrl).then(resp => resp.json());

                runInAction(() => {
                    this.__storage[currency] = rates;

                    console.log(`Rates for ${currency} updated at ${new Date}`);
                    setTimeout(this.updateRate.bind(this, currency, feedUrl), 10 * 1000);
                });

            } catch (e){
                console.error(`Failed to get rates for ${currency}`);
                console.error(e);
                setTimeout(this.updateRate.bind(this, currency, feedUrl), 1000);
            }
        }
    },
    {
        __storage: observable,
        rates: computed,
        updateRates: action.bound,
    }
)
