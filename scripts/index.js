// import { world } from "@minecraft/server";
// import "./scriptapi++/index.js";

// let x = 0;

// world.afterEvents.playerJump.subscribe((data) => {
//     // console.warn(`custom event called with data: ${JSON.stringify(data)}`);
//     data.player.sendMessage(`you jumped ${x++} times`);
// });

import { world, system } from "@minecraft/server";

const lastPlayerPositions = new Map();

function normalize(vector) {
    const length = Math.hypot(vector.x, vector.z);
    return { x: vector.x / length, y: 0, z: vector.z / length };
}

function getMovementDirection(movementVector, viewDirection) {
    const moveNorm = normalize(movementVector);
    const viewNorm = normalize(viewDirection);

    const dot = moveNorm.x * viewNorm.x + moveNorm.z * viewNorm.z;
    const angle = Math.acos(dot) * (180 / Math.PI);

    const cross = moveNorm.x * viewNorm.z - moveNorm.z * viewNorm.x;

    let direction = "";

    if (angle < 22.5) {
        direction = "Forward (W)";
    } else if (angle < 67.5) {
        direction = cross >= 0 ? "Forward-Left (W+A)" : "Forward-Right (W+D)";
    } else if (angle < 112.5) {
        direction = cross >= 0 ? "Left (A)" : "Right (D)";
    } else if (angle < 157.5) {
        direction = cross >= 0 ? "Backward-Left (S+A)" : "Backward-Right (S+D)";
    } else {
        direction = "Backward (S)";
    }

    return direction;
}

system.runInterval(() => {
    for (const player of world.getAllPlayers()) {
        const currentPosition = player.location;
        const viewDirection = player.getViewDirection();

        const lastPosition = lastPlayerPositions.get(player.id) || currentPosition;

        const movementVector = {
            x: currentPosition.x - lastPosition.x,
            y: 0,
            z: currentPosition.z - lastPosition.z,
        };

        lastPlayerPositions.set(player.id, currentPosition);
        
        if (movementVector.x === 0 && movementVector.z === 0) {
            continue;
        }

        const movementDirection = getMovementDirection(movementVector, viewDirection);

        player.sendMessage(`You are moving: ${movementDirection}`);

    }
});