// calculate the results of the loan :
function calculateResult(e){

    e.preventDefault()

    // recovery of input elements
    var amount =  document.getElementById("amount");
    var rate = document.getElementById("rate");
    var year =  document.getElementById("year");

    //recovery of items to be displayed
    var monthlyAmount = document.getElementById("monthlyAmount");
    var totalAmount = document.getElementById("totalAmount");
    var totalInterest = document.getElementById("totalInterest");

    var principal = parseFloat(amount.value);
    var interest = parseFloat(rate.value) / 100;
    var totalMonth = parseFloat(year.value) * 12;


    /*
    * Calcul des mensualités de Prêt :
    * m = [(principal*inretrest)/12]/[1-(1+(interest/12))^-totalMonth]
    */
    var perMonth = ((principal*interest)/12)/(1-Math.pow((1+(interest/12)), (-totalMonth)))

    if(isFinite(perMonth)){
        monthlyAmount.value = perMonth.toFixed(2);
        totalAmount.value = (perMonth * totalMonth).toFixed(2);
        totalInterest.value = ((perMonth * totalMonth)-principal).toFixed(2); 
    }else {
        alertError("Le Montant est Incorrect");
        function alertError(error){
            //creation of a DIV for the Alert message
            var divError = document.createElement("div");

            //target the elements that allow the alert to be inserted in the card and before the title
            var headingText =  document.querySelector(".heading");

            //Add a class to the alert (Bootstrap class)
            divError.className = "alert alert-danger";

            //creation of the text and addition in the DIV
            divError.appendChild(document.createTextNode(error));

            // insert the element in the DOM
            headingText.prepend(divError);

            //delete the alert message after 2 seconds
            setTimeout(clearMessError, 2000);   
        }

        function clearMessError(){
            document.querySelector(".alert").remove()
        }
    }
}

document.getElementById("loan-form").addEventListener('submit', calculateResult);

