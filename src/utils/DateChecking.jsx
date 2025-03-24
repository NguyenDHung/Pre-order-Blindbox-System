const IsExpired = (toDate)=>{

    var d = new Date(toDate);
    var now = new Date();
    return now>d;
}
export {IsExpired}