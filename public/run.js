function displayOutput(result) {
  if (result === null) {
    return;
  }
  let output = document.getElementById("output");
  let lines = result.split("\n");
  for (line in lines) {
    if (lines[line] === "")
      continue;
    let newelem = document.createElement("p");
    output.appendChild(newelem);
    newelem.textContent = lines[line].substring(5, lines[line].length - 1);

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