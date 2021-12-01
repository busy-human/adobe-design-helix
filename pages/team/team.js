import {$wrap, $element, $scrollAnimation} from "../../scripts/helpers.js";

export default function decorate($main) {
    var team = document.querySelector("body > main");
    var tagline = document.querySelector("body > main > div > div > h2:nth-child(6)")
    team.classList.add("teams")

    var content = team.querySelector(":scope > div:first-child > div:first-child")

    const titleDiv = $element(".title-content")

    const headDiv = $element(".head-content")
    const teamCardsDiv = $element(".team-cards")
    const endDiv = $element(".foot-content")

    let pageSection = 0;
    content.querySelectorAll(":scope > *").forEach(element =>{
      switch(pageSection){
        case 0:
          if(element.nodeName === "DIV")
            break;
          pageSection++;
        case 1:
          if(element.nodeName !== "P"){
            titleDiv.appendChild(element)
            break;
          }
          pageSection++
        case 2:
          if(element.nodeName !== "H3"){
            headDiv.appendChild(element)
            break;
          }
          pageSection++
        case 3:
          if(element.nodeName !== "H2"){
            teamCardsDiv.appendChild(element)
            break;
          }
          pageSection++
        case 4:{
          endDiv.appendChild(element)
          break;
        }
      }
    })

    let bodyDiv = $wrap($element(".content"), [headDiv, teamCardsDiv, endDiv])

    content.append(titleDiv)
    content.append(bodyDiv)

    //Organizing Head Div content
    const shiftedContent = $element(".head-text")
    let firstElement;
    headDiv.querySelectorAll("p").forEach(element =>{
      if(firstElement){
        shiftedContent.append(element)
      }else{
        firstElement = element
        element.classList.add("title")
      }
    })
    let animateWhatWeDo = headDiv.querySelector("h2")
    animateWhatWeDo.classList.add("js-scroll", "fade-in")
    firstElement.insertAdjacentElement('afterend', shiftedContent)

    /** Build Accordian Cards */
    //Oranizing individual teams cards
    let card = 0;
    let teamCard = $element(".team-card");
    teamCard.classList.add("card-"+card)
    let leftBlock = document.createElement("div");
    let rightBlock = document.createElement("div");

    teamCardsDiv.querySelectorAll(":scope > *").forEach(
      element =>{
        if(card !== 0 && element.nodeName === "H3"){
          rightBlock.append(
            $element("a.view-jobs",
              {attr: { href: '/jobs/' }},
              "VIEW OUR JOB OPENINGS"
            )
          )
          teamCard = $wrap(teamCard, [leftBlock,rightBlock])
          teamCardsDiv.append(teamCard)
          teamCard = $element(".team-card");
          teamCard.classList.add("card-"+card)
          leftBlock = document.createElement("div");
          rightBlock = document.createElement("div");
        }

        if(element.nodeName === "H3"){
          teamCard.append($wrap($element('.card-header'), [$element('.chevron-down'), element]))
          card++
        } else if(element.nodeName ==="P"){
          if(element.innerHTML.includes('picture')){
            leftBlock.append(element)
          } else { rightBlock.append(element)}
        } else {
          leftBlock.append(element)
        }
      }
    )
    rightBlock.append($element("a.view-jobs", { attr: { href: '/jobs/' } }, "VIEW OUR JOB OPENINGS"))
    teamCard = $wrap(teamCard, [leftBlock,rightBlock])
    teamCardsDiv.append(teamCard)

    //Organize Foot content
    const resourcesDiv = $element(".resources-section");
    const resources = $element(".resources");
    resources.classList.add("js-scroll", "fade-in")

    let section = 0;
    let imgCount = 1;

    endDiv.querySelectorAll(":scope > *").forEach(element =>{
      if(element.nodeName === "H2" || element.nodeName ==="DIV")
        section++

      if(section === 1){
        if(element.nodeName === "H2"){
          element.classList.add("js-scroll", "fade-in")
          resourcesDiv.append(element)

          resourcesDiv.append(resources)
        }else if(element.nodeName === "P"){
          let resource = $element(".resource");

          let learnMore = $element(".learn-more-button");
          learnMore.innerHTML = "LEARN MORE";
          let spacer = $element(".spacer")
          let resourceBottom = $element(".resource-bottom-container");
          resourceBottom.append(element);
          resourceBottom.append(learnMore);

          let resourceLogo = $element(".resource-logo");
          resourceLogo.style.backgroundImage = `url(../../resources/product-logo-${imgCount}.png)`;
          resource.append(spacer)
          resource.append(resourceLogo)
          resource.append(resourceBottom)
          resource.style.backgroundImage = `url(../../resources/products-${imgCount}.png)`
          resource.classList.add("js-scroll", "fade-in")
          imgCount++
          resources.append(resource)
        }
      }else if(section === 2){
        //This currently targets the think-differently module
      }
    })
    endDiv.prepend(resourcesDiv)

    /** Accordian Cards open / close events:  */
    // Rig up teamsCards to open and close
    teamCardsDiv.querySelectorAll("div.team-card").forEach(function(element){
      element.addEventListener("click", function(){
        let alreadyActive;
        if(element.classList.contains("active"))
          alreadyActive = true;
        removeActive()
        if(!alreadyActive)
          element.classList.add("active")
      })
    })

    function removeActive(){
      teamCardsDiv.querySelectorAll(".active").forEach(function(card){
        card.classList.remove("active")
      })
    }

    $scrollAnimation();
}