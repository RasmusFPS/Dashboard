const dateElement = document.getElementById("nav");
const realTime = new Date();

function time() {

  let hour = realTime.getHours();
  let minute = realTime.getMinutes();

  minute = fixtime(minute);
  hour = fixtime(hour);

  dateElement.innerHTML = (` 
    <p>
      ${hour} : ${minute}
    </p>`

  );

  
    setTimeout(time(), 10000);
}

function fixtime(s){
    if(s < 10){
        s ="0"+s;
    }
    return s;
}

document.getElementById("editDash").contentEditable;
