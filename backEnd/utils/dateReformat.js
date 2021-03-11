function reformatDateString(date){
    function padding(dateString) {
        return dateString < 10 ? '0' + dateString : dateString
}
    return date.getUTCFullYear()+'-'
         + padding(date.getUTCMonth()+1)+'-'
         + padding(date.getUTCDate())+'T'
         + padding(date.getUTCHours())+':'
         + padding(date.getUTCMinutes())+':'
         + padding(date.getUTCSeconds())+'+00:00'}

        //  2021-03-02T11:00:00-07:00
module.exports.reformatDateString = reformatDateString