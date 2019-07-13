const moment =require('moment')
const momentz=require('moment-timezone')
const timezone='Asia/Kolkata'

let now=()=>{
    return moment.utc().format()
}


let getLocalTime=()=>{
    return moment().tz(timezone).format()
}

let convertToLocalTime=(time)=>{
    return momentz.tz(time,timezone).format('LLLL')
}

module.exports={
    now:now,
    getLocalTime:getLocalTime,
    convertToLocalTime:convertToLocalTime
}