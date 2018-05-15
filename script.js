$(document).ready(() => {
  var startTimer = false;
  var pauseTimer = false;
  var countdown, sessionSeconds, breakSeconds, totalSession, totalBreak;
  
  $("#reset").on('click', () => {
    $("#break-time").html("05");
    $("#session-time").html("25");
    $("#timer-title").html("Session");
    $("#timer").html("25:00");
    $("#timer-progress").attr({"style": "width: 0%", "aria-valuenow": "0"})
    clearInterval(countdown);
    startTimer = false;
  });
  $("#break-minus").on('click', () => {
    if(startTimer) { return null; }
    if($("#break-time").html() === "01") {
      return null;
    } else {
      let num = parseInt($("#break-time").html());
      num--;
      if(num < 10) {
        num = "0" + num.toString();
      }
      $("#break-time").html(num);
    }
  });
  $("#break-plus").on('click', () => {
    if(startTimer) { return null; }
    let num = parseInt($("#break-time").html());
    num++;
    if(num < 10) {
      num = "0" + num.toString();
    }
    $("#break-time").html(num);
  });
  $("#session-minus").on('click', () => {
    if(startTimer) { return null; }
    if($("#session-time").html() === "01") {
      return null;
    } else {
      let num = parseInt($("#session-time").html());
      num--;
      if(num < 10) {
        num = "0" + num.toString();
      }
      $("#session-time").html(num);
      $("#timer").html(num + ":00");
    }
  });
  $("#session-plus").on('click', () => {
    if(startTimer) { return null; }
    let num = parseInt($("#session-time").html());
    num++;
    if(num < 10) {
      num = "0" + num.toString();
    }
    $("#session-time").html(num);
    $("#timer").html(num + ":00");
  });
  
  $(".timer-area").on('click', () => {
    if(!startTimer) {
      startTimer = true;
      sessionSeconds = parseInt($("#session-time").html()) * 60;
      totalSession = sessionSeconds;
      breakSeconds = parseInt($("#break-time").html()) * 60;
      totalBreak = breakSeconds;
      countdown = setInterval(countdownTimer, 1000);
    } else if(!pauseTimer) {
      pauseTimer = true;
      clearInterval(countdown);
    } else {
      pauseTimer = false;
      countdown = setInterval(countdownTimer, 1000);
    }
  });
  
  function countdownTimer() {
    if($("#timer-title").html() === "Session") {
      sessionSeconds--;
      let perc = (1 - sessionSeconds/totalSession) * 100;
      let min = Math.floor(sessionSeconds / 60);
      let seconds = sessionSeconds % 60;
      if(min < 10) {
        min = "0" + min.toString()
      }
      if(seconds < 10) {
        seconds = "0" + seconds.toString()
      }
      $("#timer").html(min + ":" + seconds);
      $("#timer-progress").attr({"style": "width: " + perc.toString() + "%", "aria-valuenow": perc.toString()})
      if(sessionSeconds === 0) {
        console.log('Session done');
        $("#timer-title").html("Break!");
        $("#timer").html(breakSeconds / 60 + ":00");
        $("#timer-progress").removeClass("bg-success");
        $("#timer-progress").addClass("bg-danger");
        $("#timer-progress").attr({"style": "width: 0%", "aria-valuenow": "0"})
        sessionSeconds = parseInt($("#session-time").html()) * 60;
      }
    } else {
      breakSeconds--;
      let perc = (1 - breakSeconds/totalBreak) * 100;
      let min = Math.floor(breakSeconds / 60);
      let seconds = breakSeconds % 60;
      if(min < 10) {
        min = "0" + min.toString()
      }
      if(seconds < 10) {
        seconds = "0" + seconds.toString()
      }
      $("#timer").html(min + ":" + seconds);
      $("#timer-progress").attr({"style": "width: " + perc.toString() + "%", "aria-valuenow": perc.toString()})
      if(breakSeconds === 0) {
        console.log('Break done');
        $("#timer-title").html("Session");
        $("#timer").html(sessionSeconds / 60 + ":00");
        breakSeconds = parseInt($("#break-time").html()) * 60;
        $("#timer-progress").addClass("bg-success");
        $("#timer-progress").removeClass("bg-danger");
        $("#timer-progress").attr({"style": "width: 0%", "aria-valuenow": "0"})
        sessionSeconds = parseInt($("#session-time").html()) * 60;
      }
    }
  }
});