const dropdowns=document.querySelectorAll(".dropdown select");
let btn=document.querySelector("form button");
const fromCurr=document.querySelector(".from select");
const toCurr=document.querySelector(".to select");
let msg=document.querySelector(".msg");
for(let select of dropdowns){
    for(currCode in countryList){
        let newOption=document.createElement("option");
        newOption.innerText=currCode;
        newOption.value=currCode;
        if(select.name==="from" && currCode==="USD"){
            newOption.selected="selected";
        } else if(select.name==="to" && currCode==="INR"){
            newOption.selected="selected";
        }
        select.append(newOption);
    }
    select.addEventListener("change",(event)=>{
        updateFlag(event.target);
    });
}

const updateExchangeRate=async ()=>{
    let amount=document.querySelector(".amount input");
    let amountVal=amount.value;
    if(amountVal==="" || amountVal<1){
        amountVal=1;
        amount.value="1";
    }
    let fromCurrency = fromCurr.value;
    let toCurrency = toCurr.value;
    let url = `https://v6.exchangerate-api.com/v6/14a7a7491309995f7463dbb2/latest/${fromCurrency}`;

    try {
        let res = await fetch(url);
        let data = await res.json();
        let rate = data.conversion_rates[toCurrency];
        let finalAmt = amountVal * rate;
        let finalAmtr=finalAmt.toFixed(2);
        msg.innerText=`${amountVal} ${fromCurr.value} = ${finalAmtr} ${toCurr.value}`;
    } catch (err) {
        console.log("Error:", err);
    }
};


const updateFlag=(element)=>{
    let currCode=element.value;
    let countryCode=countryList[currCode];
    let newSrc=`https://flagsapi.com/${countryCode}/flat/64.png`;
    let img=element.parentElement.querySelector("img");
    img.src=newSrc;
};

btn.addEventListener("click", (event)=>{
    event.preventDefault();
    updateExchangeRate();
});

window.addEventListener("load",()=>{
    updateExchangeRate();
});

