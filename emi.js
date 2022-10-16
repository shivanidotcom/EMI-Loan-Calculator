function validateAmount(){
    //loan amount should be an number
    //loan amount is not greater than 15 lakh
    var loanAmt = document.getElementById("loanAmount").value;
    if(isNaN(loanAmt)){
        alert("Entered value is not an number");
        document.getElementById("loanAmount").focus();
        document.getElementById("loanAmount").select();
        return false;
    }else if(loanAmt>1500000){
        alert("Loan amount is greater than 15 lakh");
        document.getElementById("loanAmount").focus();
        document.getElementById("loanAmount").select();
        return false;
    }
}
function validateNumber(elementid,elementName){
        //number should be in between 0-9
        var elementValue = document.getElementById("interest").value;
        var numbers = /^[0-9]+$/;
        if(!elementValue.match(numbers)){
            alert(elementName+" should be a number");
            document.getElementById("loanAmount").focus();
            document.getElementById("loanAmount").select();
            return false;
        }
}
function validatePeriod(elementid){
    //period must be a number
    // period should be in between 7 to 15 yrs
    var period = document.getElementById("repaymentPeriod").value;
    if(isNaN(period)){
        alert("Entered value is not an number");
        document.getElementById("repaymentPeriod").focus();
        document.getElementById("repaymentPeriod").select();
        return false;
    }else if(period<7 || period>15){
        alert("Period should be in between 7 to 15yrs");
        document.getElementById("repaymentPeriod").focus();
        document.getElementById("repaymentPeriod").select();
        return false;
    }

}
function compute(){
    move() // Call the progressbar move function
    //caluculate with the formula
    // formula : [P * R * (1+R)^N]/[((1+R)^N)-1]
    var lnAmt = document.getElementById("loanAmount").value;
    var interst = document.getElementById("interest").value;
    var yrs = document.getElementById("repaymentPeriod").value;
    //convert the interst from percentage to a decimal number
    var monthlyInterest = (interst/100)/12;
    //convert the annual rate to the month rate
    var monthRate = (yrs * 12);
    //convert according to the formula
    var x = Math.pow(1+monthlyInterest,monthRate);
    var monthlyPayments = [ lnAmt * x * monthlyInterest]/(x-1);
    //to display the value if it is a finite number
    if(!isNaN(monthlyPayments) &&
      (Number.POSITIVE_INFINITY) &&
      (Number.NEGATIVE_INFINITY)){
                   
          document.getElementById("monthlypayment").value=round(monthlyPayments);
          document.getElementById("totalpayment").value=round(monthlyPayments * monthRate);
          document.getElementById("totalinterest").value=
                                round((monthlyPayments * monthRate)-lnAmt);
        //for not editable of the data
         document.getElementById("monthlypayment").readOnly=true;
          document.getElementById("totalpayment").readOnly=true;
          document.getElementById("totalinterest").readOnly=true;


      }else {
         document.getElementById("monthlypayment").value=" ";
          document.getElementById("totalpayment").value=" ";
          document.getElementById("totalinterest").value=" ";
      }
}
//round function
function round(x){
    return Math.round(x*100)/100;
}

// Progressbar logic
let progress_i = 0;
let progress = document.getElementById("progressBar");
function move() { // Progressbar move function declaration
    if (progress_i == 0) {
        progress_i = 1;

        let width = 1;
        let id = setInterval(frame, 0);
        let removeProgress = setTimeout(function () {
            progress.style.width = "0%";
            // progress.style.display = "none";
        }, 500);
        function frame() {
            if (width >= 100) {
                clearInterval(id);
                progress_i = 0;
            } else {
                width = width + 1.5;
                progress.style.width = width + "%";
            }
        }
    }
}
