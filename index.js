console.log("grusse");
const API = require('./api')


const parseSymbol = str =>{
    // "symbol": "SPYP00415000"
    const strike = parseInt(str.slice(-8),10)/1000;
    const type = str.slice(-9,-8);
    const expiration = str.slice(-15,-9);

    const isoDate = new Date(('20'+expiration.substr(0,2)), parseInt(expiration.substr(2,2),10)-1, expiration.substr(4,2), 14); //

    const ticker = str.slice(0,-15);

    // console.log('Ticker:', ticker, 'expiration: ', isoDate, 'Strike:', strike, 'type: ', type)
    // console.log('Expiration ??>>',timeToExpiration(isoDate));
    const daysToExpire = timeToExpiration(isoDate);

    return {ticker, expiration, strike, type, daysToExpire};
}

const timeToExpiration = expirationDate =>{
    const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
    const now = new Date();
    const result = Math.round(Math.abs((expirationDate - now) / oneDay))
    return result;
}

const getRisk = obj =>{
    const premium = obj.short.cost_basis+obj.long.cost_basis;
    const shortStrike = parseInt(obj.short.symbol.slice(-8),10)/1000;
    const longStrike = parseInt(obj.long.symbol.slice(-8),10)/1000;


    const risk = (Math.abs(shortStrike-longStrike)*100)*obj.long.quantity-Math.abs(premium);  //TODO assumes same qty in short and long!!!

    // console.log('qty',obj.short.quantity,'Premium',premium,'Short', shortStrike, 'long', longStrike, 'RISK>', risk);
    return risk;
}



// const  Spread = {
//     constructor(shortPosition, longPosition){
//         /* recieve tradier position object 
//         {
//   "cost_basis": -558,
//   "date_acquired": "2021-06-08T18:46:18.159Z",
//   "id": 253512,
//   "quantity": -3,
//   "symbol": "SPYP00415000"
//  }
        
//         */
//         this.exposure = 0;
//         this.premium = 0;
//         this.expiration = 0;
//         this.symbol = 'aapl';
//         this.danger = false;
//         this.name = '50 / 60 Call Spread AAPL';
//     }
// }

const findPairs = arr =>{
    const output = {};
    arr.forEach((el,i) => {
        const symbol = el.symbol.slice(0,-8)
        const long = el.quantity > 0

        if(!output[symbol])output[symbol]={long:null, short: null}
        if(!!long)output[symbol].long = el;
        else output[symbol].short = el;
        // console.log(el.symbol.subStr(0,10));
    })
    return output;
}

const foo = async () => {
    const positions = await API.getPositions();

    const targetExposure = 5000;
    let totalExposure = 0;
   
    const pairs = findPairs(positions);
    Object.keys(pairs).forEach(el => {
        const myRisk = getRisk(pairs[el]);
        parseSymbol(pairs[el].short.symbol)
        console.log(el,' >> ', myRisk)
    totalExposure += myRisk;
    })
    console.log('TOTAL_EXPOSURE: ',totalExposure, 'UTILIZATION: ', totalExposure/targetExposure, 'REMAINING: ', targetExposure-totalExposure);
}

foo();