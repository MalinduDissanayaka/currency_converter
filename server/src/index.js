const express = require ("express");
const cors = require ("cors");
const axios = require ("axios");

const app = express();

app.use(express.json());
app.use(cors());

app.get("/getAllCurrencies",async(req,res) =>{
    const nameURL = 'https://openexchangerates.org/api/currencies.json?app_id=d21ff46c62f140749e6c3e7cf32bf99e'
    

    try {
        const namesResponce = await axios.get(nameURL);
        const nameData = namesResponce.data;
         return res.json(nameData);
    
    } catch (err) {
        console.error(err);
        
    }
})

app.get("/convert", async (req,res)=>{
    const {date,sourceCurrency,targetCurrency,ammountInSourceCurrency} =
     req.query;

     try {
        
const dataUrl = `https://openexchangerates.org/api/historical/${date}.json?app_id=d21ff46c62f140749e6c3e7cf32bf99e` ;

const dateResponce =await axios.get(dataUrl);
const rates= dateResponce.data.rates;

//rates
const sourceRate = rates[sourceCurrency];
const targetRate =rates[targetCurrency];

const targetAmount =(targetRate/sourceRate) * ammountInSourceCurrency;
return res.json(targetAmount.toFixed(3));

     } catch (err) {
        console.error(err);
     }

})

app.listen(5000 , ()=> {

    console.log("sever started");
});