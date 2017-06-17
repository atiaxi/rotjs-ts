import * as ROT from 'rot-js';

import { Game } from './entry';

export interface Being {
    new (game: Game, x: number, y: number): Player;
};

export class Player {
    constructor(protected game: Game, protected x: number, protected y: number) {
        this.draw();
    }

    public act() {
        this.game.engine.lock();
        window.addEventListener("keydown", this);
    }

    public handleEvent(e:KeyboardEvent) {
        let keyMap = {};
        keyMap[ROT.VK_NUMPAD8] = 0;
        keyMap[ROT.VK_NUMPAD9] = 1;
        keyMap[ROT.VK_NUMPAD6] = 2;
        keyMap[ROT.VK_NUMPAD3] = 3;
        keyMap[ROT.VK_NUMPAD2] = 4;
        keyMap[ROT.VK_NUMPAD1] = 5;
        keyMap[ROT.VK_NUMPAD4] = 6;
        keyMap[ROT.VK_NUMPAD7] = 7;

        let code = e.keyCode;

        if (code == ROT.VK_RETURN || code == ROT.VK_SPACE) {
            this.checkBox();
            return;
        }

        if (!(code in keyMap)) { return }
        let [dx, dy] = ROT.DIRS["8"][keyMap[code]];
        let newX = this.x + dx;
        let newY = this.y + dy;
        let newKey = `${newX},${newY}`;
        if(!(newKey in this.game.map)) { return; }

        this.game.display.draw(this.x, this.y, this.game.map[`${this.x},${this.y}`]);
        this.x = newX;
        this.y = newY;
        this.draw();
        window.removeEventListener("keydown", this);
        this.game.engine.unlock();
    }

    public getX(): number { return this.x; }
    public getY(): number { return this.y; }

    protected draw() {
        this.game.display.draw(this.x, this.y, "@", "#ff0");
    }

    private checkBox() {
        let key = `${this.x},${this.y}`;
        if (this.game.map[key] != "*") {
            alert("There is no box here!");
        } else if (key == this.game.ananas) {
            alert("Hooray, you found the ananas and won this game!");
            this.game.engine.lock();
            window.removeEventListener("keydown", this);
        } else {
            alert("This box is empty :-(");
        }
    }
}

export class Pedro extends Player {

    public act() {
        let x = this.game.player.getX();
        let y = this.game.player.getY();
        let passableCallback = (x, y) => {
            return (`${x},${y}` in this.game.map);
        };
        let astar = new ROT.Path.AStar(x, y, passableCallback, {topology: 4});

        let path = [];
        let pathCallback = (x, y) => {
            path.push([x, y]);
        };
        astar.compute(this.x, this.y, pathCallback);

        path.shift();  /* remove pedro's position */
        if (path.length == 1) {
            this.game.engine.lock();
            alert("Game over - you were captured by Pedro!");
        } else {
            let [x, y] = path[0];
            this.game.display.draw(this.x, this.y, this.game.map[`${this.x},${this.y}`]);
            this.x = x;
            this.y = y;
            this.draw();
        }
    }
}