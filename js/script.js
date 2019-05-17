let total = 0;
const $checkboxes = $(".activities input")
const $paymentOptions = $("#payment option");
const $creditCard = $('#credit-card');
const $payPal = $('fieldset div:nth-child(5)').attr("id", "paypal");
const $bitCoin = $('fieldset div:nth-child(6)').attr("id", "bitcoin");
const $invalidName = $("<span></span>").text("Can only contain letters a-z in lowercase")
$invalidName.insertAfter("#name")
$invalidName.hide();

$('#name').focus();
$('#other-title').hide();

$('#title').change(function() {
    if($(this).val() === "other") {
        $('#other-title').show();
    }
    else {
        $('#other-title').hide();
    }
    });


$('#colors-js-puns').hide();
const $selectTheme = $('#design option').eq(0);
$('#design').change(function () {
    $('#colors-js-puns').show();
    $selectTheme.toggle();
    if ( $(this).val() === "js puns") {
        $('#color option[value="tomato"],[value="steelblue"],[value="dimgrey"]').hide();
        $('#color option[value="cornflowerblue"],[value="darkslategrey"],[value="gold"]').show();
        $('#color option[value="cornflower blue').attr('selected', true);
        $('#color option[value="tomato"]').attr('selected', false);
        $('#color option[value="no color"]').attr('selected', false);
    } else {
        $('#color').children().hide()
        $selectTheme.hide();
    }
    if ($(this).val() === "heart js") {
        $('#color option[value="cornflowerblue"],[value="darkslategrey"],[value="gold"]').hide();
        $('#color option[value="tomato"],[value="steelblue"],[value="dimgrey"]').show();
        $('#color option[value="tomato"]').attr('selected',true);
        $('#color option[value="cornflower blue"]').attr('selected',false);
        $('#color option[value="no color"]').attr('selected', false);
    } else {
        $selectTheme.hide();
    }
    
})
$('.activities').append('<div id="total"></div>');
$('#total').hide();

// $('.activities').css("text-decoration","line-through")
$(".activities").change((e)=>{
    const clicked = e.target;
    const textOfClicked = clicked.parentElement.textContent;
    const dollarAmount = textOfClicked.match(/\d{3}/);
    const cost = parseInt(dollarAmount)
    const timeDate = textOfClicked.match(/\w+\s\d\w{2}-\d\d?\w{2}/);
    
    //If the property was checked add the cost, else cost times -1(its the same as subtracting from the cost)
    total += $(clicked).prop("checked") ? cost : cost * -1;
    $('#total').html(`total:$${total}`).show();

    for (let i = 0; i < $checkboxes.length; i++) {
    const textOfinput = $checkboxes[i].parentElement.textContent
    
    //If the activity is a conflicting activity and wasn't the one clicked
    if(textOfinput.includes(timeDate) && clicked !== $checkboxes[i]){
        //toggle the disabled property.If it was false then it will be true and vice versa.
        $checkboxes[i].disabled = !($checkboxes[i].disabled);
        if ( $checkboxes[i].disabled == true) {
       $($checkboxes[i].parentElement).css("textDecoration","line-through");
        } else {
            $($checkboxes[i].parentElement).css("textDecoration","none")
        }
    }
    }
});


$("#payment").find("option").eq(0).remove();

$payPal.hide();
$bitCoin.hide();
$("#payment").change( function() {
    $creditCard.show();
    const $paymentMethod = $(this).val();
    if ( $paymentMethod === "paypal" ) {
        $payPal.show();
        $bitCoin.hide();
        $creditCard.hide();
    } 
    if ( $paymentMethod === "bitcoin") {
        $bitCoin.show();
        $payPal.hide();
        $creditCard.hide();
    }
    if ( $paymentMethod === "credit card") {
        $bitCoin.hide();
        $payPal.hide();
        $creditCard.show();
    }

})

const $name = $('#name');
const $email = $('#mail');
const $creditCardNum = $('#cc-num');
const $zipNum = $('#zip');
const $cvv = $('#cvv');

function validName(name) {
    if (name.val() === "" || /\d+/.test(name.val())) {
      name.css('borderColor', 'red');
        return false;
    }
    name.css('borderColor', '#cldeeb');
    return true;
}

function validEmail(email) {
    if (email.val() === "" || !(/(\w+@\w+)(\.com|\.net|\.co)/ .test(email.val())) ) {
        email.css('borderColor', 'red');
          return false;
      }
      email.css('borderColor', '#cldeeb');
      return true;
}


function validActivity(activities) {
    if(activities === 0) {
        $('.activities').css('color', 'red');
        return false;
    }
    $('.activities').css('border', 'none');
    return true;
}
       
console.log($(".activities legend").text())

function validCreditCardNum(creditCardNum) {
    if(creditCardNum.val() === "" || !(/^(?:\d[ -]*?){13,16}$/.test(creditCardNum.val())) ) {
        creditCardNum.css('borderColor', 'red');
        return false;
    }
    creditCardNum.css('borderColor', '#cldeeb');
    return true;
}


    

function validZipCode(zipNum) {
    if(zipNum.val() === "" || !(/^(\d{5})$/g.test(zipNum.val())) ) {
        zipNum.css('borderColor', 'red' );
        return false;
    }
    zipNum.css('borderColor', '#cldeeb');
    return true;
}


function validCVV(cvv) {
    if(cvv.val() === "" || !(/^\d{3}$/g.test(cvv.val())) ) {
        cvv.css('borderColor', 'red' );
        return false;
    }
    cvv.css('borderColor', '#cldeeb');
    return true;
}


function validateForm() {

    let isValid = true;
    if(validName($name) == false) {
       isValid = false;
   }

   if(validEmail($email) == false) {
     isValid = false;
  }
  
   if (validActivity(total) == false) {
     isValid = false; 
   }
   
   if ($creditCardNum) {
        if(validCreditCardNum($creditCardNum) == false) {
            isValid = false;
        }
        if(validZipCode($zipNum) == false ) {
            isValid = false;
        }
        if ( validCVV($cvv) == false) {
            isValid = false;
        }
    }

   return isValid;
}

document.querySelector("form").addEventListener("submit", function(e) {
    if (validateForm() == false) {
      e.preventDefault();
    }

 });
