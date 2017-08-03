(async()=>{
    try{
        await App.counter.initPage();
    }catch(e){
        console.error(e)
    }
})();