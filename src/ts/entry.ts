import * as ROT from 'rot-js';

import {Being, Pedro, Player} from './player';

function keyToCoords(key: string): [number, number] {
    let parts = key.split(",");
    let x = parseInt(parts[0]);
    let y = parseInt(parts[1]);
    return [x, y];
}

export class Game {
    public display: ROT.Display;
    public map: Object;
    public engine: ROT.Engine;
    public ananas: string;

    public player:Player;
    public pedro:Pedro;


    constructor() {
        this.display = new ROT.Display();
        this.map = {};

        let container = document.getElementById("content");
        container.appendChild(this.display.getContainer());

        this.generateMap();

        let scheduler = new ROT.Scheduler.Simple();
        scheduler.add(this.player, true);
        scheduler.add(this.pedro, true);
        this.engine = new ROT.Engine(scheduler);
        this.engine.start();
    }

    private generateMap() {
        let digger = new ROT.Map.Digger();
        let freeCells = [];

        let digCallback = (x, y, value) => {
            if (value) { return; } // Don't store walls
            let key = `${x},${y}`;
            freeCells.push(key);
            this.map[key] = '.';
        };
        digger.create(digCallback);

        this.generateBoxes(freeCells);

        this.drawWholeMap();

        this.player = this.createBeing(Player, freeCells);
        this.pedro = this.createBeing(Pedro, freeCells)
    }

    private drawWholeMap() {
        for (let key in this.map) {
            let [x, y] = keyToCoords(key);
            this.display.draw(x, y, this.map[key]);
        }
    }

    private generateBoxes(freeCells: Array<string>) {
        for(let i=0; i < 10; i++) {
            let index = Math.floor(ROT.RNG.getUniform() * freeCells.length);
            let key = freeCells.splice(index, 1)[0];
            if (!i) { this.ananas = key; }
            this.map[key] = "*";
        }
    }

    private createBeing(what: Being, freeCells: Array<string>): Player {
        let index = Math.floor(ROT.RNG.getUniform() * freeCells.length);
        let key = freeCells.splice(index, 1)[0];
        let [x, y] = keyToCoords(key);
        return new what(this, x, y);
    }
}

window.onload = () => {
    let game = new Game();
};