import {FrameBase} from "../../tsFDFGenerator/src/fdf/FrameBase";

export function traverse(frame: FrameBase, classes: Set<String>) {
    if (classes.has(frame.Name)) {
        // @ts-ignore
        console.error(`Duplicated frame: ${frame.Name}`); //FUCK
    }
    if (frame.Name.length > 0) {
        classes.add(frame.Name);
    }
    for (let child of frame.Children) {
        traverse(child, classes);
    }
    return classes;
}