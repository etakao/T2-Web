let modal = document.querySelector("#modal-task");
let modalBtn = document.querySelector("#modal-btn");
let alert = document.querySelector("#modal-alert");
let close = document.querySelector(".close");

modalBtn.addEventListener("click", (event) => {
  modal.style.display = "block";
});

close.addEventListener("click", (event) =>{
  alert.style.display = "none";
  modal.style.display = "block";
});

document.addEventListener("keyup", (event) => {
  let keyPressed = event.keyCode;
  if (keyPressed == 27){
    document.getElementById("task-ta").value = "";
    document.getElementById("description-ta").value = "";
    modal.style.display = "none";
  }
});

document.addEventListener("keyup", (event) => {
  let keyPressed = event.keyCode;
  if (keyPressed == 13 && event.altKey) {
    createNewTask();
    progressBar();
    modal.style.display = "none";
  }
});

function progressBar() {
  let toDo = document.querySelector("#to-do");
  let inProgress = document.querySelector("#in-progress");
  let review = document.querySelector("#review");
  let complete = document.querySelector("#complete");

  let first = toDo.getElementsByClassName("task").length;
  let second = inProgress.getElementsByClassName("task").length;
  let third = review.getElementsByClassName("task").length;
  let fourth = complete.getElementsByClassName("task").length;

  let total = first + second + third + fourth;
  let firstWidth = (first / total) * 100 + "%";
  let secondWidth = (second / total) * 100 + "%";
  let thirdWidth = (third / total) * 100 + "%";
  let fourthWidth = (fourth / total) * 100 + "%";

  let firstBar = document.querySelector("#toDo-bar");
  let secondBar = document.querySelector("#inProgress-bar");
  let thirdBar = document.querySelector("#review-bar");
  let fourthBar = document.querySelector("#complete-bar");

  firstBar.style.width = firstWidth;
  secondBar.style.width = secondWidth;
  thirdBar.style.width = thirdWidth;
  fourthBar.style.width = fourthWidth;
}

progressBar();

function createNewTask() {
  let taskDiv = document.createElement("div");
  let b = document.createElement("b");
  taskDiv.appendChild(b);
  let p = document.createElement("p");
  taskDiv.appendChild(p);
  let t = document.getElementById("task-ta").value;
  let d = document.getElementById("description-ta").value;
  let task = document.createTextNode(t);
  b.appendChild(task);
  let description = document.createTextNode(d);
  p.appendChild(description);

  let taskTitles = document.querySelectorAll("b");

  for (let i = 0; i < taskTitles.length; i++) {
    let tt = taskTitles[i].value;
    if (t === tt) alert("Task with the same title has already been created!");
  }

  if (t === '' || d === '') {
    alert.style.display = "block";
  } else {
    document.getElementById("to-do").appendChild(taskDiv);
  }
  document.getElementById("task-ta").value = "";
  document.getElementById("description-ta").value = "";

  taskDiv.className = "task";
  b.onclick = function () { moveTaskForward(event) };
}

function moveTaskForward(event) {
  switch (event.target.parentNode.parentNode.getAttribute("id")) {
    case "to-do":
      document.querySelector("#in-progress").appendChild(
        event.target.parentNode
      );
      break;

    case "in-progress":
      document.querySelector("#review").appendChild(
        event.target.parentNode
      );
      break;

    case "review":
      document.querySelector("#complete").appendChild(
        event.target.parentNode
      );
      break;
  }

  progressBar();
}