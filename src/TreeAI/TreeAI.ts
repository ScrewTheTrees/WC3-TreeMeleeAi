import { Entity } from "wc3-treelib/src/TreeLib/Entity";

export class TreeAI extends Entity {
    private static instance: TreeAI;

    public static getInstance() {
        if (this.instance == null) {
            this.instance = new TreeAI();
        }
        return this.instance;
    }


    constructor() {
        super(1);
    }

    step() {

    }
}