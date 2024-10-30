import { world } from "@minecraft/server";
import "./scriptapi++/index.js";

world.afterEvents.playerJumpEvent.subscribe((data) => {
    console.warn(`custom event called with data: ${JSON.stringify(data)}`);
});
