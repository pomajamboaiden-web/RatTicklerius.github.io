
/* --- GLOBAL DATA --- */
const camUrls = [
    'https://www.garypeer.com.au/assets/media/2025/05/relax-and-reconnect-how-to-design-a-living-room-that-feels-like-home/main.jpg',
    'https://images.ctfassets.net/x5dih9iwqm78/6Mq4FEDTN9ThI1bdgvth9k/819c6c1278c08d1fe881a46679aac48f/Fusion_34FSN32603FH24_Kitchen_Samsung_Appliances_June_2024_2.jpg',
    'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=2070', // BATHROOM (CAM 3) - LAST SPOT
    'https://a-ap.storyblok.com/f/3000704/1220x700/7ee4980ccd/salt-pool-vs-chlorine-pool.png', // POOL (CAM 4) - START
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9sQ7fK73MXM4oDB6Vu26qxnS6m38O-wHEX75v_tmOu08C-GoT', // SECRET (CAM 5)
    'https://static01.nyt.com/images/2022/09/18/realestate/13fix-hallway01/oakImage-1662821325754-articleLarge.jpg' // HALLWAY (CAM 6)
];

let power = 100;
let hour = 0;
let isDoorDown = false;
let isMonUp = false;
let activeCam = 3; // Game starts looking at the Pool

/* --- UI CONTROLS --- */

function toggleDoor() {
    isDoorDown = !isDoorDown;
    document.getElementById('sliding-door').classList.toggle('closed', isDoorDown);
    document.getElementById('door-toggle').classList.toggle('active', isDoorDown);
}

function toggleMonitor() {
    isMonUp = !isMonUp;
    document.getElementById('monitor').style.bottom = isMonUp ? "0" : "-100%";
    noiseEffect(150);
    updateCams();
}

function setCam(id) {
    activeCam = id;
    document.getElementById('cam-label').innerText = "CAM " + (id + 1);
    document.getElementById('cam-view').style.backgroundImage = `url('${camUrls[id]}')`;
    
    // Manage Map Button Highlights
    document.querySelectorAll('.cam-btn').forEach(b => b.classList.remove('active'));
    document.getElementById('btn-c' + (id + 1)).classList.add('active');

    noiseEffect(200);
    updateCams();
}

function noiseEffect(ms) {
    const n = document.getElementById('static');
    n.style.opacity = "0.7";
    setTimeout(() => { n.style.opacity = "0"; }, ms);
}

/* --- GAME LOOPS --- */

// Power Loop (Every 1 second)
setInterval(() => {
    let usage = 1 + (isDoorDown ? 1 : 0) + (isMonUp ? 1 : 0);
    power -= (usage * 0.1);
    document.getElementById('pow').innerText = Math.floor(power);
    document.getElementById('usage-text').innerText = "Usage: " + "|".repeat(usage);
    
    if (power <= 0) {
        alert("POWER OUTAGE");
        location.reload();
    }
}, 1000);

// Clock Loop (Every 60 seconds = 1 Hour)
setInterval(() => {
    hour++;
    if (hour === 6) { 
        alert("6 AM: YOU SURVIVED!"); 
        location.reload(); 
    }
    document.getElementById('clock').innerText = (hour === 0 ? "12" : hour) + " AM";
}, 60000);

// Initialize
setCam(3);
