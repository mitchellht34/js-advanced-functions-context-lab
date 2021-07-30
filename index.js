/* Your Code Here */
function createEmployeeRecord(employee) {
    return {
        firstName: employee[0],
        familyName: employee[1],
        title: employee[2],
        payPerHour: employee[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

function createEmployeeRecords(employees) {
    return employees.map(employee => createEmployeeRecord(employee))
}

function createTimeInEvent(dateStamp) {
    let [date, time] = dateStamp.split(' ');
    let hour = parseInt(time);

    this.timeInEvents.push({
        type: "TimeIn",
        hour,
        date
    })
    return this;
}

function createTimeOutEvent(dateStamp) {
    let [date, time] = dateStamp.split(' ');
    let hour = parseInt(time);

    this.timeOutEvents.push({
        type: "TimeOut",
        hour,
        date
    })
    return this;
}

function hoursWorkedOnDate(thisDate) {
    let timeOut = this.timeOutEvents.find(el => el.date === thisDate).hour;
    let timeIn = this.timeInEvents.find(el => el.date === thisDate).hour;
    return (timeOut - timeIn) / 100;
}

function wagesEarnedOnDate(thisDate) {
    return hoursWorkedOnDate.call(this, thisDate) * this.payPerHour;
}

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

let allWagesFor = function () {
    let eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    let payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

function findEmployeeByFirstName(srcArray, firstName){
    return srcArray.find((el) => el.firstName === firstName);
}

function calculatePayroll(records){
    return records.reduce((accumulator, employee) => accumulator + allWagesFor.call(employee), 0);
}