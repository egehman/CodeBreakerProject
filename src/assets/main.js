let answer = document.getElementById('answer');
let attempt = document.getElementById('attempt');

function guess() {
    let input = document.getElementById('user-guess');

    if (answer.value == '' || attempt.value == '') {
      setHiddenFields();
    }

    if (!validateInput(input.value)) {
      return false;
    }

    attempt.value++;

    let result = getResults(input.value);

    if (result) {
      setMessage('You Win! :)');
      showAnswer(true);
      showReplay();
    } else if (attempt.value >= 10) {
      setMessage('You Lose! :(');
      showAnswer(false);
      showReplay();
    } else {
      setMessage('Incorrect, try again.');
    }
}

function showAnswer(success) {
  let code = document.getElementById('code');
  if (success) {
    code.className += ' success';
  } else {
    code.className += ' failure';
  }
  code.innerHTML = answer.value;
}

function showReplay() {
  document.getElementById('guessing-div').style.display = 'none';
  document.getElementById('replay-div').style.display = 'block';
}

function setHiddenFields() {
  let intAnswer = Math.floor(Math.random() * 10000);
  let stringAnswer = intAnswer.toString();
  while(stringAnswer.length < 4) {
    stringAnswer = '0' + stringAnswer;
  }
  answer.value = stringAnswer;
  attempt.value = '0';
}

function setMessage(message) {
  document.getElementById('message').innerHTML = message;
}

function validateInput(input) {
  if (input.length == 4) {
    return true;
  } else {
    setMessage('Guesses must be exactly 4 characters long.');
    return false;
  }
}

function getResults(input) {
  let correctGuesses = 0;
  let html = '<div class="row"><span class="col-md-6">' + input + '</span><div class="col-md-6">';
  for (var i = 0; i < input.length; i++) {
    if (input.charAt(i) == answer.value.charAt(i)) {
      html += '<span class="glyphicon glyphicon-ok"></span>';
      correctGuesses++;
    } else if (answer.value.indexOf(input.charAt(i)) > -1) {
      html += '<span class="glyphicon glyphicon-transfer"></span>';
    } else {
      html += '<span class="glyphicon glyphicon-remove"></span>';
    }
  }
  html += '</div></div>';
  document.getElementById('results').innerHTML += html;

  if (correctGuesses != 0 && correctGuesses == input.length) {
    return true;
  }
  return false;
}
