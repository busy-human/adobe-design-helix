import {
  convertToBackground,
  decorateLink,
  decorateTagLink,
  decorateDivisions,
  wrapWithElement,
  $element,
} from "../../scripts/helpers.js";

/**
 * @param {HTMLElement} $block
 */
export default function decorate($block) {

  /** Get the properties and identify the blocks  */
  // const result = decorateDivisions($block, {
  //   image:      $div => $div.querySelector("picture"),
  // });
  // const props = result.properties;


  document.querySelector("body").classList.add("job-post");
  // let postText = document.querySelector(".job-info-container")
  // document.querySelector(".header-block")

  let postText= document.querySelector(".job-info-container").lastChild;
  postText.classList.add("post-text");
  console.log( " POST TEXT ", postText, "\n postText: ", postText)
  postText.querySelectorAll('h6').forEach((tag) => {
    tag.removeAttribute('id')
    tag.classList.add('header-6')
    console.log( " TAG ", tag)
  })




  // //----------//
//   /// has similar opportunities block here //
// //----------//
//   About adobe design: full width, background: red,
//   header:
//   40/100, adobe clean serif -- reg
//   text:
//   61/100, adobe clean serif --reg
//   //----------//
//   Sub-text-block
//   small type -- background: white,full width,
//   text:
//   20/35, adobe clean -- reg



  // .nextSibling();
  // postText.classList.add("post-text");

  /**
   * Element Constants:
   *
   * $job-title      : h1         / Job Title
   * $detail-label   : label  --ex: "Position Type"
   * $detail-value   : value  --ex: "Full-time"
   * $dek            : Like the summary/hook for position

   * $section-header : sub header / What you'll be working on
   * $paragraph      : p          / basically just <p>
   * $paragraph.list
   */
}