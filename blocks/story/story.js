import {$wrap, $element, decorateDivisions} from "../../scripts/helpers.js";




export default async function decorate($block) {


    var mainContent = $block.querySelector(".section-wrapper > div");
    decorateDivisions($block, [
        ".image",
        ".story-text"
    ]);
}