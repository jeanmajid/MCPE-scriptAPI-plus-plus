import { Event } from "../../models/event";
import { system, world } from "@minecraft/server";

const playerJumpEvent = new Event("playerJumpEvent");
world.afterEvents.playerJumpEvent = playerJumpEvent;

// still gotta optimize so the interval only runs when needed
system.runInterval(() => {
    for (const player of world.getAllPlayers()) {
        if (player.wasOnGround && player.isJumping) {
            player.wasOnGround = false;
            playerJumpEvent.call({ player });
            return;
        }
        if (player.isOnGround) {
            player.wasOnGround = true;
        }
    }
});
