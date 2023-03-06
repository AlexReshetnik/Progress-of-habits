export default  function createCalendar(start) {

    let res =  new Date(Date.now()).setHours(0,0,0,0) - new Date(start).setHours(0,0,0,0)
    let daysCount = res / (1000 * 60 * 60 * 24)

    let ret = []
    for (let i = 0; i < daysCount+1; i++) {

        let dateCopy = new Date(new Date(start).setHours(0,0,0,0))
        dateCopy.setDate(new Date(start).getDate() + i)

        ret.push(dateCopy)
    }
  
    return ret
}