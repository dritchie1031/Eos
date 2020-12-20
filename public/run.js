function displayOutput(result) {
  if (result === null) {
    return;
  }
  clearOutput();
  let output = document.getElementById("output");
  let lines = result.split("\n");
  for (line in lines) {
    if (lines[line] === "")
      continue;
    let newelem = document.createElement("p");
    output.appendChild(newelem);
    let newstr = lines[line].substring(4);
    if (newstr.charAt(0) === '"') {
      newstr = newstr.substring(1);
    }
    if (newstr.charAt(newstr.length - 1) === '"') {
      newstr = newstr.substring(0, newstr.length - 1);
    }
    newelem.textContent = newstr;
  }
}

function submitCode() {
  let http = new XMLHttpRequest();
  console.log(document.getElementById("programInput").value);
  let url = "/run?code=" + encodeURIComponent(document.getElementById("programInput").value);

  http.open("GET", url, true);
  http.send();

  http.onreadystatechange = function () {
    if (http.readyState === XMLHttpRequest.DONE && http.status >= 200 && http.status < 400) {
      let data = JSON.parse(http.response);
      console.log(data);
      displayOutput(data.Result);
    }
  }
}

function clearOutput() {
  let elem = document.getElementById("output");
  while (elem.firstChild) {
    elem.removeChild(elem.firstChild);
  }
}

function clearInput() {
  document.getElementById("programInput").value = "";
}