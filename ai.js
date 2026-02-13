let diddyPos = 3; 
let joePos = -1;
let joeInVents = false;

setInterval(() => {
    // Diddy Move
    if (Math.random() < 0.4) {
        let lastPos = diddyPos;
        if (diddyPos === 3) diddyPos = [0, 1, 4, 5][Math.floor(Math.random() * 4)];
        else if (diddyPos === 2) { diddyPos = 6; onDiddyArrive(); }
        else if (diddyPos < 6) {
            if (Math.random() < 0.3) diddyPos = 2;
            else diddyPos = [0, 1, 4, 5].filter(r => r !== diddyPos)[Math.floor(Math.random() * 3)];
        }
        if (diddyPos !== lastPos) noiseEffect(400);
    }

    // Joe Move (Night 2)
    if (night >= 2 && joePos === -1 && Math.random() < 0.3) {
        joePos = 5;
    } else if (joePos === 5 && !let diddyPos = 3; 
let joePos = -1;
let joeInVents = false;

setInterval(() => {
    // Diddy Move (Every 20s)
    if (Math.random() < 0.4) {
        let lastPos = diddyPos;
        if (diddyPos === 3) diddyPos = [0, 1, 4, 5][Math.floor(Math.random() * 4)];
        else if (diddyPos === 2) { diddyPos = 6; onDiddyArrive(); }
        else if (diddyPos < 6) {
            if (Math.random() < 0.3) diddyPos = 2;
            else diddyPos = [0, 1, 4, 5].filter(r => r !== diddyPos)[Math.floor(Math.random() * 3)];
        }
        // STATIC ON MOVEMENT
        if (diddyPos !== lastPos) noiseEffect(400);
    }

    // Joe Move
    if (night >= 2 && joePos === -1 && Math.random() < 0.3) {
        joePos = 5;
    } else if (joePos === 5 && !joeInVents && Math.random() < 0.4) {
        joeInVents = true;
        setTimeout(() => {
            if (!ventsClosed) triggerJumpscare('joe');
            else { joePos = -1; joeInVents = false; updateCams(); }
        }, 10000);
    }
    updateCams();
}, 20000);

function onDiddyArrive() {
    document.getElementById('diddy-at-door').style.display = "block";
    setTimeout(() => {
        if (!isDoorDown) triggerJumpscare('diddy');
        else {
            setTimeout(() => {
                diddyPos = 3;
                document.getElementById('diddy-at-door').style.display = "none";
                updateCams();
            }, 5000);
        }
    }, 5000);
}

function updateCams() {
    document.getElementById('diddy-camera').style.display = (activeCam === diddyPos) ? "block" : "none";
    document.getElementById('joe-camera').style.display = (activeCam === joePos && !joeInVents) ? "block" : "none";
    const warn = document.getElementById('vent-warning');
    if (warn) warn.style.display = (activeCam === 5 && joeInVents) ? "inline" : "none";
}

function triggerJumpscare(who) {
    playSnd('snd-jumpscare', 1.0);
    const screen = document.getElementById('scare-screen');
    const img = document.getElementById('jumpscare-img');
    img.src = who === 'joe' ? 'https://thehill.com/wp-content/uploads/sites/2/2023/10/bidenjoe_070723gn06-1.png' : 'https://r2.theaudiodb.com/images/media/artist/cutout/rid3171695285723.png';
    screen.style.display = "flex";
    setTimeout(() => location.reload(), 2500);
}joeInVents && Math.random() < 0.4) {
        joeInVents = true;
        setTimeout(() => {
            if (!ventsClosed) triggerJumpscare('joe');
            else { joePos = -1; joeInVents = false; updateCams(); }
        }, 10000);
    }
    updateCams();
}, 20000);

function onDiddyArrive() {
    document.getElementById('diddy-at-door').style.display = "block";
    setTimeout(() => {
        if (!isDoorDown) triggerJumpscare('diddy');
        else {
            setTimeout(() => {
                diddyPos = 3;
                document.getElementById('diddy-at-door').style.display = "none";
                updateCams();
            }, 5000);
        }
    }, 5000);
}

function updateCams() {
    document.getElementById('diddy-camera').style.display = (activeCam === diddyPos) ? "block" : "none";
    document.getElementById('joe-camera').style.display = (activeCam === joePos && !joeInVents) ? "block" : "none";
    const warn = document.getElementById('vent-warning');
    if (warn) warn.style.display = (activeCam === 5 && joeInVents) ? "inline" : "none";
}

function triggerJumpscare(who) {
    playSnd('snd-jumpscare', 1.0);
    const screen = document.getElementById('scare-screen');
    const img = document.getElementById('jumpscare-img');
    img.src = who === 'joe' ? 'https://thehill.com/wp-content/uploads/sites/2/2023/10/bidenjoe_070723gn06-1.png' : 'https://r2.theaudiodb.com/images/media/artist/cutout/rid3171695285723.png';
    screen.style.display = "flex";
    setTimeout(() => location.reload(), 2000);
}

