import { decorateDivisions, $element, getMetadata, $wrap } from "../../scripts/helpers.js";
import addButton from "../button/button.js";
import placeholderContent from "./placeholder-content.js";


/**
 * @param {HTMLElement} $block
 */
export default async function makeSimilarOpportunitiesBlock($block) {
    let job_count = 0;
    let unique_location_count = 0;
    let locationsArr = [];

    let placeholderStuff = placeholderContent('simOpps');

    job_count = placeholderStuff.length;

    let elementsArray = [];

    placeholderStuff.forEach(
        obj => {
            if(locationsArr.indexOf(obj.city) < 0) locationsArr.push(obj.city);
            elementsArray.push(
                $element("div.job",[
                    $element("div.title", obj.title),
                    $element("div.sub-title", `${obj.product} | ${obj.posType}`),
                    $element("div.department", obj.department),
                    $element("div.city", obj.city),
                ])
            )
        }
    )



    unique_location_count = locationsArr.length;





    /**
     * Build Similar Opportunities Block dynamically:
     * Oct 20th design:
     */
    const  $container_elm = $element("div.opp-block", [
        $element("div.opp-container.full-bleed", [
            $element("div.header-c",[
                $element("p.title", "Similar opportunities")
            ]),
            $element("div.psns-container", elementsArray)
        ])
    ]);
    return $container_elm;
}
