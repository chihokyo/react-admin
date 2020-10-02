/**
 * 处理日期函数
 * @param {string} time 
 */
export function formateDate(time) {
    if (!time) return ''
    let date = new Date(time)
    return date.getFullYear() + '年' + (date.getMonth() + 1) + '月' + date.getDate()
        + '日 ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds()
}