// var date={
//     day:31,
//     month:12,
//     year:2020
// }
function reverseStr(str){
    var splitStr=str.split("");
    var reversedStr=splitStr.reverse();
    var joinedStr=reversedStr.join("");
    return joinedStr;
}
// console.log(reverseStr("hellobaby"));
function isPalindrome(str){
    var reverse= reverseStr(str);
    // if(str === reverse){
    // return "palndrome";
    // }else{
    // return "not palindrome";
    // }
    return str === reverse;
}
// console.log(isPalindrome("rcecar"));

function convertDateToString(date){
    var dateStr={day:'',month:'',year:''};
    if(date.day<10){
        dateStr.day='0'+date.day;
    }else{
    dateStr.day=date.day.toString();
    }
    if(date.month<10){
        dateStr.month="0"+date.month;
    }else{
        dateStr.month=date.month.toString();
    }
    dateStr.year=date.year.toString();
    return dateStr;
}
// console.log(convertDateToString(date));
function getAllDateFormats(date){
    var dateStr= convertDateToString(date);
    var ddmmyyyy=dateStr.day+dateStr.month+dateStr.year;
    var mmddyyyy=dateStr.month+dateStr.day+dateStr.year;
    var yyyymmdd=dateStr.year+dateStr.month+dateStr.day;
    // console.log(ddmmyyyy);
    var ddmmyy=dateStr.day+dateStr.month+dateStr.year.slice(-2);
    // console.log(ddmmyy);
    var mmddyy=dateStr.month+dateStr.day+dateStr.year.slice(-2);
    var yymmdd=dateStr.year.slice(-2)+dateStr.month+dateStr.day;
    return [ddmmyyyy,mmddyyyy,yyyymmdd,ddmmyy,mmddyy,yymmdd]
    
}
// console.log(getAllDateFormats(date));
function checkPalindromeForAllDate(date){
    var listOfPalindrome=getAllDateFormats(date);
    var flag=false;
    for(var i=0;i<listOfPalindrome.length;i++){
        if(isPalindrome(listOfPalindrome[i])){
            flag=true;
            break;
        }
    }return flag;
    }
// console.log(checkPalindromeForAllDate(date));

function isLeapYear(year){
    if(year%400===0){
        return true;
    }
    if(year % 100===0){
        return false;
    }
    if(year %4===0){
        return true;
    }
    return false;
}
function getNextDate(date){
    var day =date.day + 1;
    var month =date.month;
    var year = date.year;
    var daysInMonth=[31,28,31,30,31,30,31,31,30,31,30,31]
    if(month ===2){
        if(isLeapYear(year)){
            if(day>29){
                day=1;
                month++;
            }
        }else{
            if(day >28){
                day=1;
                month++;
            }
        }
    }else{
        if(day>daysInMonth[month-1]){
            day=1;
            month++;
        }
    }
    if(month>12){
        day=1;
        month=1;
        year++;
    }
    return{
        day:day,
        month:month,
        year:year
    }
}
function getNextPalindromeDate(date){
    var ctr=0;
    var nextDate=getNextDate(date);
    while(1){
        ctr++;
        var isPalindrome=checkPalindromeForAllDate(nextDate);
        if(isPalindrome){
            break;
        }
        nextDate=getNextDate(nextDate);

    }
    return [ctr,nextDate]
}

// console.log(getNextPalindromeDate(date));
var dateInputRef = document.querySelector('#bday-input');
  var showBtnRef = document.querySelector('#show-btn');
  var resultRef = document.querySelector('#result');
  
  function clickHandler(e){
    var bdayStr = dateInputRef.value; // 2020-10-11
    
    if(bdayStr !== ''){
      var listOfDate = bdayStr.split('-'); // ['2020', '10', '11']
  
      var date = {
        day: Number(listOfDate[2]),
        month: Number(listOfDate[1]),
        year: Number(listOfDate[0])
      };
      
      var isPalindrome = checkPalindromeForAllDate(date);
  
      if(isPalindrome){
         resultRef.innerText = 'Yay! your birthday is a palindrome!! 🥳🥳';
      }
      else {
        var [ctr, nextDate] = getNextPalindromeDate(date);
  
        resultRef.innerText = `The next palindrome date is ${nextDate.day}-${nextDate.month}-${nextDate.year}, you missed it by ${ctr} days! 😔`;
      }
    }
  }
  
  showBtnRef.addEventListener('click', clickHandler);