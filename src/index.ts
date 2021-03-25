
import createServer from "./backend/server";
import {Engine} from "./backend/engine";
import { Phase } from "./backend/engine/structures/Phase";

const game = new Engine();

game.on("Day 0", () => {
    console.log("It's day 0");
});

game.on("Day", (phase: Phase) => {
    console.log(`It's day ${phase.iterations}`);
});

game.on("Night", (phase: Phase) => {
    console.log(`It's night ${phase.iterations}`);
});

game.on("Voting", (phase: Phase) => {
    console.log("It's time to vote!");
    if (phase.iterations === 2) {
        setTimeout(() => {
            if (game.phases.current !== phase) return;
            game.phases.jump("Judgement", false, game.phases.timeLeft().seconds * 1000);
        }, 7000);
    }
});

game.on("Judgement", (phase: Phase) => {
    console.log("Judgement time! Nobody will be found guilty, we're gonna go back to voting");
});

game.on("Judgement-End", () => {
    console.log("JUDGEMENT ENDQ!!!!!!!!!!!!!!!!");
    game.phases.jump("Voting", false);
});

setInterval(() => {
    console.log(game.phases.timeLeft());
}, 2000);

game.start("Day 0");

(() => {
    createServer();
})();