(async()=>{
    try{
        await App.counter.initList();
    }catch(e){
        console.error(e)
    }
})();