
function getData(data){
    let url="https://www.easy-mock.com/mock/5cb002ce19f8520bf6e4b9ec/example/"+data;
    return new Promise((resolve,reject)=>{
        $.ajax({
            url,
            type:"GET",
            success:res=>{resolve(res)},
            fail:err=>{reject(err)}
        })
    })
}

export {getData};