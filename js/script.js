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
const $activities = $('#activities');
const $creditCardNum = $('#cc-num');
const $zipNum = $('#zip');
const $ccv = $('#ccv');

function checkName() {
    if (name.val().length > 0) {
        name.css('borderColor', '#cldeeb');
        return true;
    }
    name.css('borderColor', 'red');
    return false;
}
    

function checkEmail() {
    if(email.val().length > 0) {
        name.css('borderColor', '#cldeeb');
        return true;
    }
    name.css('borderColor', 'red');
    return false;
}
    

function checkActivity() {
    if(total.val().length > 0) {
        activities.css('border', '#cldeeb');
        return true;
    }
    activities.css('borderColor', 'none');
    return false;
}
    

function checkCreditCardNum() {
    if(creditCardNum.val().length > 0) {
        creditCardNum.css('borderColor', '#cldeeb');
        return true;
    }
    creditCardNum.css('borderColor', 'red');
    return false;
}
    

function checkZipCode() {
    if(zipNum.val().length > 0) {
        zipNum.css('borderColor', '#cldeeb');
        return true;
    }
    creditCardNum.css('borderColor', 'red');
    return false;
}
    
function checkCCV() {
    if(ccv.val().length > 0) {
        ccv.css('borderColor', '#cldeeb');
        return true;
    }
    ccv.css('borderColor', 'red');
    return false;
}
    
function validateForm() {
    function validName($name) {
        return /^[a-z]+$/.test($name);
      }
    function validEmail($email) {
    return /^[^@]+@[^@.]+\.[a-z]+$/i.test($email);
      }
    function validCreditCardNum($creditCardNum) {
    return /\d{13,16}/.test($creditCardNum);
      }
    function validZipCode($zipNum) {
    return /\d{5}/.test($zipNum);
      }
    function validCcV($ccv) {
    return /\d{3}/.test($ccv);
      }

}

