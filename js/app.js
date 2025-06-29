

console.log("hello Form")

const form = document.querySelector('.js-form')

form.addEventListener("submit", function(e){
    e.preventDefault();

    validateForm()    
    
})


// getting the inputs
function validateForm(){

    const validInput = {
        firstName: false,
        lastName: false,
        email : false,
        query : false,
        consent: false,
        message: false,
    }
    
    const firstName = document.querySelector('.js-fname');
    const lastName = document.querySelector('.js-Lname');
    const email = document.querySelector('.js-email')
    const query = document.querySelectorAll('.js-query')
    const message = document.querySelector('#js-text');
    const consent = document.querySelector('#js-consent');
    const submitBtn = document.querySelector('#js-submit');


    //getting input value
    const firstNameValue = firstName.value ;
    const lastNameValue = lastName.value;
    const emailValue = email.value;
    const messageValue = message.value;

    // validating first name
    if(firstNameValue === ''){
        setError(firstName, 'This field is required')
        
    }else{
        setError(firstName,'')
        validInput.firstName = true;
    }

    // validating last name
    if(lastNameValue === ''){
        setError(lastName, 'This field is required')
    }else{
        setError(lastName,'')
        validInput.lastName = true;
    }

    // validating email
    if(emailValue === ''){
        setError(email,'This field is required')

    }else if(!isEmail(emailValue)){
        setError(email, 'Not a valid email')
        
    }else{
        setError(email, '')
        validInput.email = true;
    }

    // text area message
    if(messageValue === ''){
        setError(message, 'This field is required')
        
    }else{
        setError(message, '');
        validInput.message = true;
    }
    
    //validate query
    validInput.query = setQuery(query);

    // validate consent
    validInput.consent = setConsent(consent)
    

    const successMsg = document.querySelector('.js-success-msg')
    // check if all inputs are valid
    const allValid = Object.values(validInput).every(value => value === true);
    
    if(allValid){
        successMsg.innerHTML = `
        
            <span>
                <img src="assets/images/icon-success-check.svg" alt="">
                Message Sent!
            </span>
            <p>
                Thanks for completing the form. We'll be in touch soon!
            </p>
        `;
        
        successMsg.classList.add('success');

        setTimeout(()=>{
            successMsg.innerText = '';
            successMsg.classList.remove('success')

        },3000)
       
        setTimeout(()=>{
            firstName.value = '';
            lastName.value = '';
            email.value = '';
            message.value = '';

        },3000)

    }else{
        successMsg.innerHTML= 'Please complete form';
        successMsg.classList.add('error');
        successMsg.classList.remove('success');

        setTimeout(()=>{
            successMsg.innerHTML= '';

        },1000)
    }
    
}



//functions

// setError() function
function setError (element, msg){
    const getElement = element.parentElement;
    const showMsg = getElement.querySelector('.error');

    showMsg.innerHTML = msg;
    showMsg.classList.add('error');
    showMsg.classList.remove('success');
}

//setSuccess
function setSuccess(element, msg){
    const getElement = element.parentElement;
    const showMsg = getElement.querySelector('.success');

    showMsg.innerHTML = msg;
    showMsg.classList.remove('error');
    showMsg.classList.add('success')

}

    // setEmail
function isEmail(email){
    // this will validate the email character
    const validEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return validEmail.test(email);
}

// query 
function setQuery(query){
    
    let isSelected = false;

    query.forEach(radio =>{
        
        if(radio.checked){

            isSelected = true;
        }
    })

    const errorMsg = document.querySelector('.js-query-error');

    if(!isSelected){
        errorMsg.innerText = 'Please select a query type';

    }else{
        errorMsg.innerText = '';
        
    }

    return isSelected;
}


// consent
const radioButtons = document.querySelectorAll('.js-query');

radioButtons.forEach(radio => {
  radio.addEventListener('change', () => {
    // Remove 'changeColor' class from all .query-box-btn elements
    document.querySelectorAll('.query-box-btn').forEach(btn => {
      btn.classList.remove('changeColor');
    });

    // Add 'changeColor' class to the parent <span> of the selected radio
    if (radio.checked) {
      radio.closest('.query-box-btn').classList.add('changeColor');
    }
  });
});


function setConsent(consent){

    const errorMsg = document.querySelector('.js-consent-error');
    

    if(!consent.checked){
        errorMsg.innerText = 'To submit this form, please consent to being contacted';
        return false;

    }else{
        errorMsg.innerText = '';
        return true;
    }
}