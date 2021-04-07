document.addEventListener('DOMContentLoaded', function () {

  document.getElementsByTagName('form')[0].onsubmit = function (evt) {
    evt.preventDefault(); // Preventing the form from submitting
    checkWord(); // Do your magic and check the entered word/sentence
    window.scrollTo(0, 150);
  }

  // Get the focus to the text input to enter a word right away.
  document.getElementById('terminalTextInput').focus();

  // Getting the text from the input
  var textInputValue = document.getElementById('terminalTextInput').value.trim();

  //Getting the text from the results div
  var textResultsValue = document.getElementById('terminalReslutsCont').innerHTML;

  // Clear text input
  var clearInput = function () {
    document.getElementById('terminalTextInput').value = "";
  }

  // Scrtoll to the bottom of the results div
  var scrollToBottomOfResults = function () {
    var terminalResultsDiv = document.getElementById('terminalReslutsCont');
    terminalResultsDiv.scrollTop = terminalResultsDiv.scrollHeight;
  }
  var ip={}

  // Scroll to the bottom of the results
  scrollToBottomOfResults();

  // Add text to the results div
  var addTextToResults = function (textToAdd) {
    if(isObject(textToAdd))
    textToAdd=JSON.stringify(textToAdd)
    document.getElementById('terminalReslutsCont').innerHTML += "<p>" + textToAdd + "</p>";
    scrollToBottomOfResults();
  }
  function isObject(obj) {
    return obj !== null && typeof obj === 'object' && Array.isArray(obj) === false;
  }
  // Getting the list of keywords for help & posting it to the screen
  var postHelpList = function () {
    // Array of all the help keywords
    var helpKeyWords = [
      "init -name=[Your name] -complexity=[number] To initialize the game",
      "start",
      "- YouTube + keyword to search directly in YouTube (ex. youtube thanks Obama)",
      "- Wiki + keyword to search directly in Wikipedia (ex. wiki numbers)",
      "- 'Time' will display the current time.",
      "- 'Date' will display the current date.",
      "- 'ironman' will make you happy",
      "- 'cat videos' will make you even happier",
      "* There are more keywords that you have to discover by yourself."
    ].join('<br>');
    addTextToResults(helpKeyWords);
  }

  // Getting the time and date and post it depending on what you request for
  var getTimeAndDate = function (postTimeDay) {
    var timeAndDate = new Date();
    var timeHours = timeAndDate.getHours();
    var timeMinutes = timeAndDate.getMinutes();
    var dateDay = timeAndDate.getDate();
    console.log(dateDay);
    var dateMonth = timeAndDate.getMonth() + 1; // Because JS starts counting months from 0
    var dateYear = timeAndDate.getFullYear(); // Otherwise we'll get the count like 98,99,100,101...etc.

    if (timeHours < 10) { // if 1 number display 0 before it.
      timeHours = "0" + timeHours;
    }

    if (timeMinutes < 10) { // if 1 number display 0 before it.
      timeMinutes = "0" + timeMinutes;
    }

    var currentTime = timeHours + ":" + timeMinutes;
    var currentDate = dateDay + "/" + dateMonth + "/" + dateYear;

    if (postTimeDay == "time") {
      addTextToResults(currentTime);
    }
    if (postTimeDay == "date") {
      addTextToResults(currentDate);
    }
  }

  // Opening links in a new window
  var openLinkInNewWindow = function (linkToOpen) {
    window.open(linkToOpen, '_blank');
    clearInput();
  }

  // Having a specific text reply to specific strings
  var textReplies = function () {
    var url = 'https://The-Butterfly.dantraztrev.repl.co/api/game/'
      // funny replies [START]
  var res = command.split("-");
  var comm=res[0].trim()
 
  if(res.length>0){
  res.slice(1,).forEach(i => {
   var toots=i.split("=")
   ip[toots[0]]=toots[1]
  });
 
  console.log(ip)}

  

    switch (comm) {
      case "Start":
        fetch(url, {

          method: "GET",
        })
          .then(response => response.json())  // convert to json   //print data to console
          .then(json => addTextToResults(json))
          .catch(err => console.log('Request Failed', err));

        // Catch errors
        break;

      case "init":
        fetch(url, {

          // Adding method type
          method: "POST",

          // Adding body or contents to send
          body: JSON.stringify({
            name: ip["name"],
            id: parseInt(ip["id"]),
            complexity: parseInt(ip["cp"])
          }),
          headers: {
            "Content-type": "application/json; charset=UTF-8"
          }
        }).then(response => response.json())  // convert to json
          .then(json => addTextToResults(json))   //print data to console
          .catch(err => console.log('Request Failed', err)); // Catch errors
        break;

      case "start":
        fetch(url + ip["name"], {

          // Adding method type
          method: "POST",

          // Adding body or contents to send
          body: JSON.stringify({
            charecters: parseArray(ip["charecters"]),
            choices: ip["choices"],
            levels: ip["levels"]
          }),
          headers: {
            "Content-type": "application/json; charset=UTF-8"
          }
        }).then(response => response.json())  // convert to json
          .then(json => addTextToResults(json))    //print data to console
          .catch(err => console.log('Request Failed', err)); // Catch errors
        break;

      case "whome":
        fetch(url + ip['name'] + '/playconfig', {

          // Adding method type
          method: "POST",

          // Adding body or contents to send
          body: JSON.stringify({
            choices: ip["choice"],
            confidence: ip["confidence"]
          }),
          headers: {
            "Content-type": "application/json; charset=UTF-8"
          }
        }).then(response => response.json())  // convert to json
          .then(json => addTextToResults(json))    //print data to console
          .catch(err => console.log('Request Failed', err)); // Catch errors
        break;

      case "discuss":
        fetch(url + ip['name'] + '/disc', {

          // Adding method type
          method: "POST",

          // Adding body or contents to send
          body: JSON.stringify({
            name: ip["char"]
          }),
          headers: {
            "Content-type": "application/json; charset=UTF-8"
          }
        }).then(response => response.json())  // convert to json
          .then(json => addTextToResults(json))    //print data to console
          .catch(err => console.log('Request Failed', err)); // Catch errors
        break;


      case "upday":
        fetch(url + ip['name'] + '/upday/', {

          // Adding method type
          method: "GET",


        }).then(response => response.json())  // convert to json
          .then(json => addTextToResults(json))    //print data to console
          .catch(err => console.log('Request Failed', err)); // Catch errors
        break;

      //Most probably not be used

      case "utd":
        fetch(url + ip['name'] + '/unt/', {

          // Adding method type
          method: "GET",


        }).then(response => response.json())  // convert to json
          .then(json => addTextToResults(json))    //print data to console
          .catch(err => console.log('Request Failed', err)); // Catch errors
        break;

      case "daystat":
        fetch(url + ip['name'] + '/day/', {

          // Adding method type
          method: "GET",


        }).then(response => response.json())  // convert to json
          .then(json => addTextToResults(json))    //print data to console
          .catch(err => console.log('Request Failed', err)); // Catch errors
        break;


      case "mestat":
        fetch(url + ip['name'] + '/me/', {

          // Adding method type
          method: "GET",


        }).then(response => response.json())  // convert to json
          .then(json => addTextToResults(json))    //print data to console
          .catch(err => console.log('Request Failed', err)); // Catch errors
        break;

      case "karstat":
        fetch(url + ip['name'] + '/' + ip['kar'], {

          // Adding method type
          method: "GET",


        }).then(response => response.json())  // convert to json
          .then(json => addTextToResults(json))    //print data to console
          .catch(err => console.log('Request Failed', err)); // Catch errors
        break;

      case "undistance":
        fetch(url + ip['name'] + '/undi/' + ip['kar'], {

          // Adding method type
          method: "GET",


        }).then(response => response.json())  // convert to json
          .then(json => addTextToResults(json))    //print data to console
          .catch(err => console.log('Request Failed', err)); // Catch errors
        break;
      case "distance":
        fetch(url + ip['name'] + '/di/' + ip['kar'], {

          // Adding method type
          method: "GET",


        }).then(response => response.json())  // convert to json
          .then(json => addTextToResults(json))    //print data to console
          .catch(err => console.log('Request Failed', err)); // Catch errors
        break;
      case "trust":
        fetch(url + ip['name'] + '/trusty/' + ip['kar'], {

          // Adding method type
          method: "POST",

          body: JSON.stringify({
            trust: ip["trust"]
          }),
          headers: {
            "Content-type": "application/json; charset=UTF-8"
          }


        }).then(response => response.json())  // convert to json
          .then(json => addTextToResults(json))    //print data to console
          .catch(err => console.log('Request Failed', err)); // Catch errors
        break;
      case "trustall":
        fetch(url + ip['name'] + '/wholetrusty/' + ip['kar'], {

          // Adding method type
          method: "POST",

          body: JSON.stringify({
            trust: ip["tmatrix"]
          }),
          headers: {
            "Content-type": "application/json; charset=UTF-8"
          }


        }).then(response => response.json())  // convert to json
          .then(json => addTextToResults(json))    //print data to console
          .catch(err => console.log('Request Failed', err)); // Catch errors
        break;

      case "mahdi":
        clearInput();
        addTextToResults("He's my maker <a target='_blank' href='https://twitter.com/mahdif'>@mahdif</a>");
        break;

      case "nour":
        clearInput();
        addTextToResults("My wife. My life. A talented Front/Back-end developer <a target='_blank' href='https://twitter.com/Nour_ASoud'>@Nour_ASoud</a>");
        break;

      case "joe":
        clearInput();
        addTextToResults("An awesome designer/developer friend of mine. <br> He helped me a bit with the CSS animation <a target='_blank' href='https://twitter.com/joericho'>@joericho</a>");
        break;

      case "gabri":
        clearInput();
        addTextToResults("An awesome developer friend of mine. <br> Helped me a lot while learning Git and gave a lot of awesome suggestions for this cool project <a target='_blank' href='https://twitter.com/ahmedelgabri'>@ahmedelgabri</a>");
        break;

      case "gustavo":
        clearInput();
        addTextToResults("🍌 + <a target='_blank' href='https://twitter.com/Dr_Gustavo'>@Dr_Gustavo</a>");
        break;

      case "i love you":
      case "love you":
      case "love":
        clearInput();
        addTextToResults("Aww! That's so sweet 😍. Here's some love for you too ❤ ❤ ❤ !");
        break;

      case "ironman":
      case "iron man":
      case "shoot to thrill":
        clearInput();
        addTextToResults('Shoot to Thrill!');
        openLinkInNewWindow('https://www.youtube.com/watch?v=xRQnJyP77tY');
        break;

      case "git":
        clearInput();
        addTextToResults("git push origin master <br>you can check this project's repo on GitHub: <a target='_blank' href='https://github.com/MahdiF/mahdif.com/tree/master/lab/web-terminal'>https://github.com/MahdiF/mahdif.com/tree/master/lab/web-terminal</a>");
        break;

      case "git status":
        clearInput();
        addTextToResults("nothing to commit, working directory clean.");
        break;

      case "git push origin master":
        clearInput();
        addTextToResults("Push me baby!");
        break;

      case "hello":
      case "hi":
      case "hola":
        clearInput();
        addTextToResults("Hello, it's me... I was wondering if after all these years you'd like to meet... 😍");
        break;

      case "cat":
        clearInput();
        addTextToResults("Meow!! 🐱<br> psst: try typing (cat videos)");
        break;

      case "what the":
      case "wtf":
        clearInput();
        addTextToResults("F***.");
        break;

      case "shit":
      case "poop":
      case "💩":
        clearInput();
        addTextToResults("💩");
        break;

      case "cat videos":
      case "cat v":
        addTextToResults("Okay I'll show you some in YouTube.");
        openLinkInNewWindow('https://www.youtube.com/results?search_query=cat videos');
        break;

      case "lol":
      case "trololo":
        addTextToResults("Mr. Trololo!");
        openLinkInNewWindow('https://www.youtube.com/watch?v=1uTAJG3Khes');
        break;
      // funny replies [END]

      case "youtube":
        clearInput();
        addTextToResults("Type youtube + something to search for.");
        break;

      case "google":
        clearInput();
        addTextToResults("Type google + something to search for.");
        break;

      case "time":
        clearInput();
        getTimeAndDate("time");
        break;

      case "date":
        clearInput();
        getTimeAndDate("date");
        break;

      case "help":
      case "?":
        clearInput();
        postHelpList();
        break;

      default:
        clearInput();
        addTextToResults("<p><i>The command " + "<b>" + textInputValue + "</b>" + " was not found. Type <b>Help</b> to see all commands.</i></p>");
        break;
    }
  }

  // Main function to check the entered text and assign it to the correct function
  var checkWord = function () {
    textInputValue = document.getElementById('terminalTextInput').value.trim(); //get the text from the text input to a variable
    command = textInputValue; //get the lower case of the string

    if (textInputValue != "") { //checking if text was entered
      addTextToResults("<p class='userEnteredText'>> " + textInputValue + "</p>");
      if (command.substr(0, 5) == "open ") { //if the first 5 characters = open + space
        openLinkInNewWindow('http://' + command.substr(5));
        addTextToResults("<i>The URL " + "<b>" + textInputValue.substr(5) + "</b>" + " should be opened now.</i>");
      } else if (command.substr(0, 8) == "youtube ") {
        openLinkInNewWindow('https://www.youtube.com/results?search_query=' + command.substr(8));
        addTextToResults("<i>I've searched on YouTube for " + "<b>" + textInputValue.substr(8) + "</b>" + " it should be opened now.</i>");
      } else if (command.substr(0, 7) == "google ") {
        openLinkInNewWindow('https://www.google.com/search?q=' + command.substr(7));
        addTextToResults("<i>I've searched on Google for " + "<b>" + textInputValue.substr(7) + "</b>" + " it should be opened now.</i>");
      } else if (command.substr(0, 5) == "wiki ") {
        openLinkInNewWindow('https://wikipedia.org/w/index.php?search=' + command.substr(5));
        addTextToResults("<i>I've searched on Wikipedia for " + "<b>" + textInputValue.substr(5) + "</b>" + " it should be opened now.</i>");
      } else {
        textReplies();
      }
    }
  };

});