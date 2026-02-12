/* --- AI DATA --- */
let diddyPos = 3; // Starts in POOL (Index 3)
let attackTimeout = null;
let blockCounter = null;

// RANDOMIZED MOVEMENT LOOP
setInterval(() => {
    // 30% chance to move every 5 seconds
    if (Math.random() < 0.3) {
        let lastPos = diddyPos;
        
        if (diddyPos === 3) {
            // STEP 1: Move from Pool to any roaming room
            const startRoam = [0, 1, 4, 5];
            diddyPos = startRoam[Math.floor(Math.random() * startRoam.length)];
        } 
        else if (diddyPos === 2) {
            // STEP 3: From Bathroom, guaranteed move to Office
            diddyPos = 6;
            onDiddyArrive();
        } 
        else if (diddyPos < 6) {
            // STEP 2: Roaming. 40% chance to enter Bathroom (The kill-zone)
            if (Math.random() < 0.4) {
                diddyPos = 2; 
            } else {
                // Else move to another random room
                const otherRooms = [0, 1, 4, 5].filter(r => r !== diddyPos);
                diddyPos = otherRooms[Math.floor(Math.random() * otherRooms.length)];
            }
        }

        // Trigger static if the player is watching the active change
        if (isMonUp && activeCam === lastPos) noiseEffect(600);
        updateCams();
    }
}, 5000);

/* --- ATTACK LOGIC --- */

function onDiddyArrive() {
    // Make the cutout appear in the hallway
    document.getElementById('diddy-at-door').style.display = "block";
    
    // 3-SECOND REACTION WINDOW
    attackTimeout = setTimeout(() => {
        if (!isDoorDown) {
            triggerJumpscare();
        }
    }, 3000);
}

// 5-SECOND "DOOR HOLD" RETREAT CHECK
setInterval(() => {
    if (diddyPos === 6) {
        if (isDoorDown) {
            if (!blockCounter) {
                blockCounter = setTimeout(() => {
                    clearTimeout(attackTimeout);
                    diddyPos = 3; // Reset Diddy back to the pool
                    document.getElementById('diddy-at-door').style.display = "none";
                    blockCounter = null;
                    updateCams();
                }, 5000);
            }
        } else {
            // If door is opened, reset the retreat timer
            clearTimeout(blockCounter);
            blockCounter = null;
        }
    }
}, 100);

/* --- RENDERING --- */

function updateCams() {
    const cutoutOnCam = document.getElementById('diddy-camera');
    if (isMonUp && activeCam === diddyPos && diddyPos < 6) {
        cutoutOnCam.style.display = "block";
    } else {
        cutoutOnCam.style.display = "none";
    }
}

function triggerJumpscare() {
    const scare = document.getElementById('scare-screen');
    scare.style.display = "flex";
    setTimeout(() => {
        location.reload();
    }, 2000);
}
