const base_url = "http://localhost:3000"

var form = document.getElementById('login_form');
form.addEventListener('submit', login_event);

function login_event(e) {

  // prevent the browser redirection
  e.preventDefault();
  
  var message = document.getElementById('message');
  message.textContent = "";
  
  /* Get all inputs from the form */
  var formData = new FormData(form);

  /* Convert data into json */
  var data = Object.fromEntries(formData);

  const url_login = `${base_url}/login`;

  fetch(url_login, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data),
    }
  )
  .then(response => response.json())
  .then(data => {
    console.log(data);
    form.reset();
    message.textContent = data.message;
  });

}

/* Buttons */
var buttons = document.querySelectorAll('.providers button');
for (let i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener('click', login_provider_event);
}

function login_provider_event(event) {
  event.preventDefault();
  const provider = this.getAttribute("data-provider");
  window.location.href = `${base_url}/${provider}/auth`;
}
