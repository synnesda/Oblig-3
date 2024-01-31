//JS kode for Boble Oppgave - Synne Skreosen Dahl 


class Boble {
    constructor(x,y,r) {
      this.x = x;
      this.y = y;
      this.r = r;
      this.farge = getRandomColor();
    }

    flytt() {
      this.x = this.x + Math.floor(Math.random() * 10 -5 +1);
      this.y = this.y + Math.floor(Math.random() * 10 -5 +1);
    }

    vis() {
        if(this.Uteiskogen()) {
            this.flytt;
            return;
        }
      ctx.beginPath();
      ctx.arc(this.x,this.y,this.r,0,2*Math.PI);
      ctx.fillStyle = this.farge;
      ctx.fill();
      ctx.strokeStyle = "white";
      ctx.stroke();
    }

    inneholder(musx,musy) {
      let a = musx - this.x;
      let b = musy - this.y;
      let d = Math.sqrt(a*a + b*b);

      if (d < this.r) {
        return true;
      } else {
        return false;
      }
    }
    
    Uteiskogen() {
        return(
            this.x - this.r < 0||
            this.y - this.r < 0||
            this.x + this.r > canvas.width||
            this.y + this.r > canvas.height
        );
      }
  }

  function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
  
  var canvas = document.getElementById("canvas");
  var ctx = canvas.getContext("2d");
  canvas.addEventListener("mousedown",musklikk,false);
  canvas.addEventListener("mousemove",musbeveg,false);

  var bobler = [];

  function addNewBubble() {
    for(let i = 0; i < 10; i++) {
        let x = Math.floor(Math.random() * canvas.width);
        let y = Math.floor(Math.random() * canvas.height);
        let r = Math.floor(Math.random() * 40 + 10);
        let newBoble = new Boble(x,y,r);
        bobler.push(newBoble);
      }
  }


  setInterval(() => {
    addNewBubble();
    tegn();
  }, 1000);

  setInterval(tegn,100);

  function tegn() {
    reset();
    for(let i = 0; i < bobler.length; i++) {
      bobler[i].flytt();
      bobler[i].vis();
    }
  }

  function reset() {
    ctx.fillStyle = "black";
    ctx.fillRect(0,0,canvas.width,canvas.height);
  }

  function musklikk(event) {
    var fikkvalgtenboble = false;

    for(let i = 0; i < bobler.length; i++) {
      if(bobler[i].inneholder(event.x,event.y)) {
        bobler.splice(i,1);
        fikkvalgtenboble = true;
      }
    }

    if(fikkvalgtenboble == false) {
      let r = Math.floor(Math.random() * 40 + 10);
      let b = new Boble(event.x,event.y,r);
      bobler.push(b);
    }
  }

  

  function musbeveg(event) {
    for(let i = 0; i < bobler.length; i++) {
      if(bobler[i].inneholder(event.x,event.y)) {
          bobler[i].farge = farge.getRandomColor();
      } else {
        bobler[i].farge = farge.getRandomColor();
      }
    }
  }