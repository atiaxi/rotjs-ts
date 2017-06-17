// String extensions
interface FormatFunc {
    (...args: any[]): string;
    map: Object;
}

interface String {
    format: FormatFunc;
}

declare module ROT {
    var Map: MapStatic;
    var Display: Display;
    var Scheduler: SchedulerStatic;

    // Random Number Gen
    interface RNG {
        getUniform(): number;
        getNormal(mean, stddev): number;
        getPercentage(): number;

        getState(): Array<number>;
        setState(state: Array<number>): void;

        getSeed(): number;
        setSeed(seed: number): void;
    }

    // Map components
    interface MapStatic {
        Digger: Digger;
        Uniform: Uniform;
        Rogue: Rogue;
    }

    interface Map {
        create(callback?: DigCallback): Digger;
    }

    // Map callbacks
    interface DigCallback { (x: number, y: number, cellValue: number): void; }
    interface DoorCallback { (x: number, y: number): void; }
    interface PriorityWallCallback { (x: number, y: number): void; }
    interface IsWallCallback { (x: number, y: number): boolean; }
    interface CanBeDugCallback { (x: number, y: number): boolean; }

    // Dungeon Generators
    interface Dungeon extends Map {
        getRooms(): Array<Room>;
        getCorridors(): Array<Corridor>
    }
    /// <Summary>It's a Room</Summary>
    interface Room {
        getCenter(): Array<number>;
        getLeft(): number;
        getTop(): number;
        getBottom(): number;
        getRight(): number;

        addDoor(x: number, y: number): Room;
        addDoors(callback: IsWallCallback): Room;
        getDoors(callback: DoorCallback): Room;
        clearDoors(): Room;

    }

    interface Corridor {
        new (startX: number, startY: number, endX: number, endY: number);
        create(callback: DigCallback): boolean;
        createPriorityWalls(callback: PriorityWallCallback): void;
        isValid(isWallCallback: IsWallCallback, canBeDugCallback: CanBeDugCallback): boolean;
    }

    interface DiggerOptions {
        roomWidth?: Array<number>;
        roomHeight?: Array<number>;
        corridorLength?: Array<number>;
        dugPercentage?: number;
        timeLimit?: number;
    }

    interface Digger extends Dungeon {
        new (width?: number, height?: number, options?: DiggerOptions): Digger;
    }

    interface UniformOptions {
        roomWidth?: Array<number>;
        roomHeight?: Array<number>;
        dugPercentage?: number;
        timeLimit?: number;
    }

    interface Uniform extends Dungeon {
        new (width?: number, height?: number, options?: UniformOptions): Uniform;
    }

    interface RogueOptions {
        cellWidth?: Array<number>;
        cellHeight?: Array<number>;
        roomWidth?: Array<number>;
        roomHeight?: Array<number>;
    }

    interface Rogue extends Map {
        new (width?: number, height?: number, options?: RogueOptions): Rogue;
    }

    // Display
    interface DisplayOptions {
        width?: number;
        height?: number;
        fontSize?: number;
        fontFamily?: string;
        fontStyle?: string;
        fg?: string;
        bg?: string;
        spacing?: number;
        border?: number;
        layout?: string;
        tileWidth?: number;
        tileHeight?: number;
        tileMap?: Object;
        tileSet?: Object;
    }

    interface Display {
        DEBUG: DigCallback;

        new (options?: DisplayOptions): Display;
        getContainer(): Node;
        setOptions(options: DisplayOptions): void;
        draw(x: number, y: number, character: any, fg?: string, bg?: string): void;
        drawText(x: number, y: number, text: string, width: number): void;

    }

    // Scheduler
    interface SchedulerStatic {
        Action: Action;
        Simple: Simple;
        Speed: Speed;
    }

    interface Scheduler {
        add(item: any, repeat: boolean): Scheduler;
        remove(item: any): boolean;
        clear(): Scheduler;

        next(): any;

        getTime(): number;
    }

    interface Action extends Scheduler {
        add(item: any, repeat: boolean, time?: number): Scheduler;
    }

    interface Simple extends Scheduler { }

    interface SpeedActor { getSpeed(): number }
    interface Speed extends Scheduler {
        add(item: SpeedActor, repeat: boolean, time?: number): Scheduler;
    }

    // Helpers (Not in rot.js)
    enum FontStyle { Bold, Italic, None, Both }

    // Constants
    var DEFAULT_HEIGHT: number;
    var DEFAULT_WIDTH: number;

    var VK_CANCEL: number;
    /** Help key. */
    var VK_HELP: number;
    /** Backspace key. */
    var VK_BACK_SPACE: number;
    /** Tab key. */
    var VK_TAB: number;
    /** Left arrow. */
    var VK_LEFT: number;
    /** Up arrow. */
    var VK_UP: number;
    /** Right arrow. */
    var VK_RIGHT: number;
    /** Down arrow. */
    var VK_DOWN: number;

    // ADDED BY ATIAXI 6/17/2017

    interface Engine {
        start(): Engine;
        lock(): Engine;
        unlock(): Engine;
    }
    var Engine: {
        new (Scheduler):Engine;
    };

    interface IPath {
        compute(fromX: number, fromY: number, callback: (x: number, y: number) => void);
    }

    module ROT.Path {
        export class AStar implements IPath {
            constructor(toX: number, toY: number, passableCallback: (x: number, y: number) => void , options: any);
            compute(fromX: number, fromY: number, callback: (x: number, y: number) => void);
        }

        export class Dijkstra implements IPath {
            constructor(toX: number, toY: number, passableCallback: (x: number, y: number) => void , options: any);
            compute(fromX: number, fromY: number, callback: (x: number, y: number) => void );
        }
    }

    var DIRS: { [key: string]: Array<[number, number]> };

    var VK_RETURN: number;
    var VK_SPACE:  number;

    /** 0 on the numeric keypad. */
    var VK_NUMPAD0: number;
    var VK_NUMPAD1: number;
    var VK_NUMPAD2: number;
    var VK_NUMPAD3: number;
    var VK_NUMPAD4: number;
    var VK_NUMPAD5: number;
    var VK_NUMPAD6: number;
    var VK_NUMPAD7: number;
    var VK_NUMPAD8: number;
    var VK_NUMPAD9: number;
}
