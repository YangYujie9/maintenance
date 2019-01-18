let timeUtil = {}
/**
 * 把时间戳类型的转换为Date类型 1524640796
 * @param {*} time
 */
timeUtil.formatTime = function (time) {
  if (!time) return;
  let timeStr = time + '000';
  let timeNew = parseInt(timeStr);
  return new Date(timeNew)
}
/**
 * 格式化时间
 * @param {*} date
 * @param {*} fmt
 */
timeUtil.formatDate = function (date, fmt) {
  if (!date) return;
  if (!fmt) fmt = 'yyyy-MM-dd';
  var o = {
    "M+": date.getMonth() + 1, //月份
    "d+": date.getDate(), //日
    "h+": date.getHours(), //小时
    "m+": date.getMinutes(), //分
    "s+": date.getSeconds(), //秒
    "q+": Math.floor((date.getMonth() + 3) / 3), //季度
    "S": date.getMilliseconds() //毫秒
  };
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
}

/**
 * 获取时间戳类型的yyyy-MM-dd hh:mm:ss 字符串
 * @param {*} time
 */
timeUtil.getDateMs = function (time) {
  let time1 = timeUtil.formatTime(time);
  return timeUtil.formatDate(time1, 'yyyy/MM/dd hh:mm:ss:SS')
}
timeUtil.getDate = function (time) {
    let time1 = timeUtil.formatTime(time);
    return time1?timeUtil.formatDate(time1, 'yyyy/MM/dd hh:mm'):''
  }
timeUtil.getDateDay = function (time) {
  let time1 = timeUtil.formatTime(time);
  return timeUtil.formatDate(time1, 'yyyy/MM/dd')
}


/*转化为时间戳*/
timeUtil.getTimeStamp = function (item) {
  if (item) {
    let timeNumber = parseInt(new Date(item) / 1000)
    return timeNumber
  }
}
//转换成时间戳同时加59秒
timeUtil.getTimeStampPlus59s = function (item) {
  if (item) {
    let timeNumber = parseInt(new Date(item) / 1000) + 59
    return timeNumber
  }
}

//获取某天0.00的时间戳
timeUtil.getTimeStampByDay = function (date) {
  if (date) {
    date = new Date(date)
    let timeNumber = parseInt(new Date(date.getFullYear(), date.getMonth(), date.getDate()) / 1000)
    return timeNumber
  }else{
    return ''
  }
}

//根据时间字符串 格式获取
timeUtil.getStartDateByDateStr = function (date) {
  if (date) {
    date = new Date(date);
    date = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    return timeUtil.formatDate(date, 'yyyy-MM-dd hh:mm')
  }else{
    return ''
  }
}

timeUtil.getEndDateByDateStr = function (date) {
  if (date) {
    date = new Date(date);
    date = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23, 59, 59);
    return timeUtil.formatDate(date, 'yyyy-MM-dd hh:mm')
  }else{
    return ''
  }
}

//获取过去30天前时间戳
timeUtil.getPaeTimeDays = function (){
  var myDate = new Date();
  let lw = new Date(myDate - 1000 * 60 * 60 * 24 * 30);
  let lastY = lw.getFullYear();
  let lastM = lw.getMonth()+1;
  let lastD = lw.getDate();
  let startdate=lastY+"-"+(lastM<10 ? "0" + lastM : lastM)+"-"+(lastD<10 ? "0"+ lastD : lastD);//三十天之前日期

  return timeUtil.getTimeStamp(startdate)
}

//计算每月天数
timeUtil.computedMonth = function (month){
  let year = month.getFullYear()
  return timeUtil.getMonthList(year)[month.getMonth()]
}

//根据年份返回当前年 每个月天数 的数组
timeUtil.getMonthList = (year) =>{
  return (new Array(31, 28 + timeUtil.isLeap(year), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31)); //各月份的总天数
}

//是否为闰年
timeUtil.isLeap = (year) =>{
  return (year % 100 == 0 ?(year % 400 == 0 ? 1 : 0) : (year % 4 == 0 ? 1 : 0));
}


//获取指定时间格式
timeUtil.getAppiontTime = (appiontHour) =>{
  let myDate = new Date();
  myDate.setHours(appiontHour);
  let year = myDate.getFullYear();
  let month = myDate.getMonth();
  let day = myDate.getDate();
  let hour = myDate.getHours();
  let timeStr = new Date(year,month,day,hour)
  return timeStr;
}

//获取指定时间格式
timeUtil.getNineTime = (NowDate) =>{
  let myDate = new Date(NowDate);
  myDate.setHours(9)
  return myDate
}

//获取指定月份 起
timeUtil.getAppiontStartMonth = (data) => {
  let myStartDate = new Date(data);
  myStartDate.setDate(1)
  let timeStr = timeUtil.getTimeStamp(timeUtil.getStartDateByDateStr(myStartDate))
  return timeStr
}

//获取指定月份 末
timeUtil.getAppiontEndMonth = (data) => {
  let myEndDate = new Date(data);
  let year = myEndDate.getFullYear()
  let month = myEndDate.getMonth()+1
  let newDate = new Date(year,month,0)
  newDate.setDate(newDate.getDate())
  let timeStr = timeUtil.getTimeStampPlus59s(timeUtil.getEndDateByDateStr(newDate))
  return timeStr
}

export default timeUtil

