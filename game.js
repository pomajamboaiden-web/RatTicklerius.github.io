let power = 100, oxy = 100, hour = 0, night = 1;
let isDoorDown = false, isMonUp = false, ventsClosed = false, activeCam = 3;
let oxyDeathTimer = null;

const camUrls = [
    'https://www.garypeer.com.au/assets/media/2025/05/relax-and-reconnect-how-to-design-a-living-room-that-feels-like-home/main.jpg',
    'https://images.ctfassets.net/x5dih9iwqm78/6Mq4FEDTN9ThI1bdgvth9k/819c6c1278c08d1fe881a46679aac48f/Fusion_34FSN32603FH24_Kitchen_Samsung_Appliances_June_2024_2.jpg',
    'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=2070',
    'https://a-ap.storyblok.com/f/3000704/1220x700/7ee4980ccd/salt-pool-vs-chlorine-pool.png',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9sQ7fK73MXM4oDB6Vu26qxnS6m38O-wHEX75v_tmOu08C-GoT',
    'https://static01.nyt.com/images/2022/09/18/realestate/13fix-hallway01/oakImage-1662821325754-articleLarge.jpg'
];

function playSnd(id, vol = 0.5) {
    const s = document.getElementById(id);
    if(s) { s.volume = vol; s.currentTime = 0; s.play(); }
}

function toggleDoor() {
    isDoorDown = !isDoorDown;
    document.getElementById('sliding-door').classList.toggle('closed', isDoorDown);
    if (isDoorDown) {
        playSnd('snd-door-close-1', 0.8);
        playSnd('snd-door-close-2', 0.5);
    } else {
        playSnd('snd-door-open', 0.7);
    }
}

function toggleVents() {
    ventsClosed = !ventsClosed;
    const btn = document.getElementById('vent-toggle');
    // Toggle Text: "Turn On" when vents are currently closed
    btn.innerText = ventsClosed ? "TURN ON" : "SHUT AIR VENTS";
    btn.classList.toggle('active', ventsClosed);
    document.getElementById('fan-icon').style.animationPlayState = ventsClosed ? "paused" : "running";
}

function toggleMonitor() {
    isMonUp = !isMonUp;
    document.getElementById('monitor').style.bottom = isMonUp ? "0" : "-100%";
    noiseEffect(150);
}

function setCam(id) {
    activeCam = id;
    playSnd('snd-cam', 0.4);
    document.getElementById('cam-label').innerHTML = `CAM ${id+1} <span id="vent-warning" style="color:red; display:none">! !</span>`;
    document.getElementById('cam-view').style.backgroundImage = `url('${camUrls[id]}')`;
    document.querySelectorAll('.cam-btn').forEach(b => b.classList.remove('active'));
    document.getElementById('btn-c' + (id + 1)).classList.add('active');
    noiseEffect(200);
}

function noiseEffect(ms) {
    const n = document.getElementById('static');
    n.style.opacity = "0.7";
    playSnd('snd-static', 0.2);
    setTimeout(() => { n.style.opacity = "0"; }, ms);
}

// MAIN LOOPS
setInterval(() => {
    let usage = 1 + (isDoorDown ? 1 : 0) + (isMonUp ? 1 : 0) + (ventsClosed ? 1 : 0);
    power -= (usage * 0.12);
    document.getElementById('pow').innerText = Math.floor(power);
    document.getElementById('usage-text').innerText = "Usage: " + "|".repeat(usage);
    
    if (ventsClosed) {
        oxy -= 3; // Drain percentage
    } else {
        oxy = Math.min(100, oxy + 5);
    }
    document.getElementById('oxy').innerText = Math.floor(oxy);

    if (oxy === 0) {
        if (!oxyDeathTimer) {
            oxyDeathTimer = setTimeout(() => { if (oxy === 0) triggerJumpscare('joe'); }, 5000);
        }
    } else {
        clearTimeout(oxyDeathTimer); oxyDeathTimer = null;
    }

    if (power <= 0) location.reload();
}, 1000);

setInterval(() => {
    hour++;
    if (hour === 6) { alert("YOU SURVIVED!"); location.reload(); }
    document.getElementById('clock').innerText = (hour === 0 ? "12" : hour) + " AM";
}, 60000);


