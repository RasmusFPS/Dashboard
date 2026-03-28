const timeElement = document.getElementById("nav");

function time() {
const realTime = new Date();

  const clock = Intl.DateTimeFormat("sv-SE",{
    hour: "2-digit",
    minute: "2-digit",
  }
  ).format(realTime);

  const currentdate = new Intl.DateTimeFormat("sv-SE", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(realTime);

    timeElement.innerHTML = (` 
    <p><strong>
      ${clock} 
    </strong></p>
    <p> ${currentdate}</p>`
  );

    console.log("Did this run?")

}

setInterval(time ,1000);

time();

document.getElementById("editDash").contentEditable = true;
