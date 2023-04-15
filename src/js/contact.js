import emailjs from 'emailjs-com';

emailjs.init(import.meta.env.VITE_EMAILJS_ID);


const contactForm = document.querySelector('#contact_form')
const nameInput = document.querySelector('#name')
const emailInput = document.querySelector('#email')
const subjectInput = document.querySelector('#subject')
const messageInput = document.querySelector('#message')
const submitButton = document.querySelector('#send')
const thanksMessage = document.querySelector('.thanks')
const spinner = document.querySelector('.spinner-border')
const charCounter = document.querySelector('.valid-feedback')

const emailPattern =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

const warningClass = 'is-invalid'
const successClass = 'is-valid'

// function to add OR remove classes
function setUpClasses(e, isValid) {
  const input = e.target

  if (isValid) {
    input.classList.add(successClass)
    input.classList.remove(warningClass)
  } else {
    input.classList.add(warningClass)
    input.classList.remove(successClass)
  }
}

nameInput.addEventListener('keyup', e => {
  setUpClasses(e, e.target.value.length > 1 ? true : false)
  checkAllInputs()
})

emailInput.addEventListener('keyup', e => {
  setUpClasses(e, e.target.value.match(emailPattern) ? true : false)
  checkAllInputs()
})

subjectInput.addEventListener('keyup', e => {
  setUpClasses(e, e.target.value.length > 2 ? true : false)
  checkAllInputs()
})

messageInput.addEventListener('keyup', e => {
  setUpClasses(e, e.target.value.split(' ').length > 5 ? true : false)
  checkAllInputs()
  charCounter.textContent = `${messageInput.value.length} / 400`
})

// submitButton.disabled = fal
function checkAllInputs() {
  submitButton.disabled =
    nameInput.value.length > 1 &&
    emailInput.value.match(emailPattern) &&
    subjectInput.value.length > 2 &&
    messageInput.value.split(' ').length > 5
      ? false
      : true
}

// Emailjs
const btn = document.getElementById('send')

document.getElementById('contact_form').addEventListener('submit', function (event) {
  event.preventDefault()

  btn.value = 'Sending...'

  const serviceID = import.meta.env.VITE_CONTACT_SERVICE
  const templateID = import.meta.env.VITE_TEMPLATE_ID

  emailjs.sendForm(serviceID, templateID, this)
    .then(() => {
      btn.value = 'Send Email'
      spinner.style.display = 'none'
      thanksMessage.style.display = 'block'
      event.target.reset()
      ;[nameInput, emailInput, subjectInput, messageInput].forEach(input => {
        input.classList.remove(successClass)
      })
    }, (err) => {
      btn.value = 'Send Email'
      spinner.style.display = 'none'
      alert(JSON.stringify(err))
    })
})

// clear form on load page
contactForm.reset()