export const numberWithCommas = (x:number) =>  {
    if (x){
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }else{
        return "0";
    }
}