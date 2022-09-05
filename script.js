const dateInputRef = document.querySelector('#birthday-input');
const showBtnRef = document.querySelector('#show-btn');
const resultRef = document.querySelector('.result');

function reverseStr(str) {
    const listOfChars = str.split('');
    const reverseListOfChars = listOfChars.reverse();
    const reversedStr = reverseListOfChars.join('');
    return reversedStr;
}

function isPalindrome(str) {
    const reverse = reverseStr(str);
    return str === reverse;
}

function convertDateToStr(date) {

    const dateStr = { day: '', month: '', year: '' };

    if (date.day < 10) {
        dateStr.day = '0' + date.day;
    }
    else {
        dateStr.day = date.day.toString();
    }

    if (date.month < 10) {
        dateStr.month = '0' + date.month;
    }
    else {
        dateStr.month = date.month.toString();
    }

    dateStr.year = date.year.toString();
    return dateStr;
}

function getAllDateFormats(date) {
    const dateStr = convertDateToStr(date);

    const ddmmyyyy = dateStr.day + dateStr.month + dateStr.year;
    const mmddyyyy = dateStr.month + dateStr.day + dateStr.year;
    const yyyymmdd = dateStr.year + dateStr.month + dateStr.day;
    const ddmmyy = dateStr.day + dateStr.month + dateStr.year.slice(-2);
    const mmddyy = dateStr.month + dateStr.day + dateStr.year.slice(-2);
    const yymmdd = dateStr.year.slice(-2) + dateStr.month + dateStr.day;

    return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd];
}

function checkPalindromeForAllDateFormats(date) {
    const listOfPalindromes = getAllDateFormats(date);

    let flag = false;

    for (let i = 0; i < listOfPalindromes.length; i++) {
        if (isPalindrome(listOfPalindromes[i])) {
            flag = true;
            break;
        }
    }

    return flag;
}

// check for leap year
function isLeapYear(year) {
    if (year % 400 === 0) {
        return true;
    }
    if (year % 100 === 0) {
        return false;
    }
    if (year % 4 === 0) {
        return true;
    }
    return false;
}

// gets next date
function getNextDate(date) {
    let day = date.day + 1;  // increment the day  => 32
    let month = date.month;
    let year = date.year;

    let daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]; // 0 - 11

    // check for february
    if (month === 2) {
        // check for leap year
        if (isLeapYear(year)) { // 2020 => true
            if (day > 29) { // false
                day = 1;
                month++;  // increment the month
            }
        }
        else {
            if (day > 28) {
                day = 1;
                month++;  // increment the month
            }
        }
    }
    // check for other months
    else {
        //  check if the day exceeds the max days in month
        if (day > daysInMonth[month - 1]) {
            day = 1;
            month++;  // increment the month
        }
    }

    // increment the year if month is greater than 12
    if (month > 12) {
        month = 1;
        year++;
    }

    return {
        day: day,
        month: month,
        year: year
    };
}

// get next palindrome date
function getNextPalindromeDate(date) {
    let ctr = 0;
    let nextDate = getNextDate(date);

    while (1) {
        ctr++;
        let isPalindrome = checkPalindromeForAllDateFormats(nextDate);
        if (isPalindrome) {
            break;
        }
        nextDate = getNextDate(nextDate);
    }
    return [ctr, nextDate];
}



function clickHandler(e) {
    let bdayStr = dateInputRef.value; // 2020-10-11

    if (bdayStr !== '') {
        let listOfDate = bdayStr.split('-'); // ['2020', '10', '11']

        let date = {
            day: Number(listOfDate[2]),
            month: Number(listOfDate[1]),
            year: Number(listOfDate[0])
        };

        let isPalindrome = checkPalindromeForAllDateFormats(date);

        if (isPalindrome) {
            resultRef.innerText = 'Yay! your birthday is a palindrome!! 🥳🥳';
            //  console.log(resultRef.innerText)
        }
        else {
            let [ctr, nextDate] = getNextPalindromeDate(date);

            resultRef.innerText = `The next palindrome date is ${nextDate.day}-${nextDate.month}-${nextDate.year}, you missed it by ${ctr} days! 😔`;
        }
    } else {
        // resultRef.innerText = "Please Enter The Date!"
        alert("Please Enter The Date!")
    }
}
showBtnRef.addEventListener('click', clickHandler);