import { world } from "@minecraft/server";
import "./scriptapi++/index.js";

let x = 0;

world.afterEvents.playerJump.subscribe((data) => {
    // console.warn(`custom event called with data: ${JSON.stringify(data)}`);
    data.player.sendMessage(`you jumped ${x++} times`);
});
