const moment = require('moment');

const runTimestamp = new Date().getTime().toString(36);
const offset = moment().utcOffset();
var days = ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'];
var months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

class DataGeneratorHelper {


  async getToday() {
    return moment().utcOffset(offset).format('MMDDYYYY');
  }
  getCurrentDate() {
    return moment().utcOffset(offset).format('D');

  }
  getCurrentDateWithFormat() {
    return moment().utcOffset(offset).format('DD');

  }
  getCurrentMonth() {
    return months[new Date().getMonth()];
  }

  getCurrentDay() {
    return (new Date(moment().format('MM/DD/YYYY')).toLocaleString('en-us', { weekday: 'long' })).toUpperCase();
  }
  getCurrentTimeStamp() {
    return moment().utcOffset(offset).format('YYYYMMDDhhmmss');

  }
  getTomorrowDate() {
    return moment().utcOffset(offset).add(1, 'days').format('D');
  }

  getTomorrowMonth() {
    return moment().utcOffset(offset).add(1, 'days').format('MMM');
  }
  getTomorrowDateWithFormat() {
    return moment().utcOffset(offset).add(1, 'days').format('DD');
  }
  getFutureDate(noOfDate) {
    return moment().utcOffset(offset).add(noOfDate, 'days').format('D');

  }
  getFutureDateWithFormat(noOfDate) {
    return moment().utcOffset(offset).add(noOfDate, 'days').format('DD');
  }
  getTomorrowDay() {
    return (new Date(moment().utcOffset(offset).add(1, 'days').format('MM/DD/YYYY')).toLocaleString('en-us', { weekday: 'long' })).toUpperCase();

  }
  getFutureDay(noOfDay) {
    return (new Date(moment().utcOffset(offset).add(noOfDay, 'days').format('MM/DD/YYYY')).toLocaleString('en-us', { weekday: 'long' })).toUpperCase();

  }
  static getTomorrow() {
  }

  static getActualTime() {
    return moment().utcOffset(offset).format('hh:mma');
  }

  static getDelayedTime(minutes) {
    return moment().utcOffset(offset).add(minutes, 'minute').format('hh:mma');
  }

  static getRunTimestamp() {
    return runTimestamp;
  }

  static getUniqueTimestamp() {
    return new Date().getTime().toString(36) + Math.floor(Math.random() * 1000);
  }


  static getActualDate() {
    return new Date();
  }

  static getLaterFutureDate() {
    const futureDate = new Date();
    futureDate.setMonth(futureDate.getMonth() + 2);
    return futureDate;
  }

  formatDate(inputDate) {
    const date = new Date(inputDate);
    const options = {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    };
    const formatter = new Intl.DateTimeFormat('en-US', options);
    return formatter.format(date);
  }

  getcurrenDateFormated() {
    return moment().format('D,MMMM YYYY');

  }

  verifyIsInputValidDate(inputDate) {
    return moment(inputDate, 'D,MMMM YYYY', true).isValid();

  }

  getPreviousDayFormated(noOfDays) {
    return moment().subtract(noOfDays, 'day').format('D,MMMM YYYY');
  }

  getNextDayFormated(noOfDays) {
    return moment().add(noOfDays, 'day').format('D,MMMM YYYY');
  }

  getformatedDate(date) {
    return moment(date, 'D,MMMM YYYY');
  }

  getcurrentFullDate() {
    return moment();
  }

  async convertIdDate(dateID){
    const dateMap = new Map();
    const dateObj = moment(dateID);
    const date = dateObj.format("D")
    const formatedDate = dateObj.format("DD");
    const day = dateObj.format("dddd");
    const month = dateObj.format("MMM");


    dateMap.set("date", date);
    dateMap.set("day", day);
    dateMap.set("month", month);
    dateMap.set("formatDate", formatedDate);
    return dateMap;
  }


}
module.exports = new DataGeneratorHelper();
