const timeElement = document.getElementById("nav");
const realTime = new Date();

function time() {
let minute = realTime.getMinutes();
let hour = realTime.getHours();

  minute = fixtime(minute);
  hour = fixtime(hour);



  const date = document.getElementById("date")
  const currentdate = new Intl.DateTimeFormat("sv-SE", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(realTime);

    timeElement.innerHTML = (` 
    <p><strong>
      ${hour}:${minute} 
    </strong></p>
    <p> ${currentdate}</p>`
  );
}


  setTimeout(time(), 1000);

function fixtime(t){
    if(t < 10){
        t ="0"+t;
    }
    return t;
}

document.getElementById("editDash").contentEditable;
