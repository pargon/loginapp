
const url_login = "http://localhost:3000/login";

function login_event() {
  
  var form = document.getElementById('login_form');
  var message = document.getElementById('message');
  
  /* Get all inputs from the form */
  var formData = new FormData(form);

  /* Convert data into json */
  var data = Object.fromEntries(formData);

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
    message.innerHTML = data.message;
  });

}
