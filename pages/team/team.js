import {$wrap, $element, $remainder} from "../../scripts/helpers.js";

export default function decorate($main) {
    var team = document.querySelector("body > main");
    team.classList.add("teams")
    /* team.forEach(t => {
      if( t.querySelector("p") ) {
        t.classList.add("article-picture");
      }
    }); */

    /*
    =====================WARNING======================
    This page oranization is dependant on a few things

    -P tags are not contained in the title section
    -H3s are not included in the page until the teams cards
    -H2s are not included in any of the teams cards
    -The first element on the page after teams cards is an H2
    -All team-cards start with an H3

    If any of these change, this function will need to be updated
    */

    var content = team.querySelector("div > div")

    const titleDiv = $element(".title-content")

    const headDiv = $element(".head-content")
    const teamCardsDiv = $element(".team-cards")
    const endDiv = $element(".foot-content")

    let pageSection = 0;

    content.querySelectorAll("div>*").forEach(element =>{
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
    firstElement.insertAdjacentElement('afterend', shiftedContent)

    //Oranizing individual teams cards
    let card = 0;
    let teamCard = $element(".team-card");
    teamCard.classList.add("card-"+card)
    let leftBlock = document.createElement("div");
    let rightBlock = document.createElement("div");

    teamCardsDiv.querySelectorAll("*").forEach(element =>{
      if(card !== 0 && element.nodeName === "H3"){
        teamCard = $wrap(teamCard, [leftBlock,rightBlock])
        teamCardsDiv.append(teamCard)
        teamCard = $element(".team-card");
        teamCard.classList.add("card-"+card)
        leftBlock = document.createElement("div");
        rightBlock = document.createElement("div");
      }

      if(element.nodeName === "H3"){
        teamCard.append(element)
        card++
      }else if(element.nodeName ==="P")
        rightBlock.append(element)
      else
        leftBlock.append(element)

    })
    teamCard = $wrap(teamCard, [leftBlock,rightBlock])
    teamCardsDiv.append(teamCard)

    //Organize Foot content
    const resourcesDiv = $element(".resources-section");
    const resources = $element(".resources");
    const thinkAboutDiv = $element(".think-differently");
    const thinkAboutBody = $element(".think-differently-body");
    let section = 0;
    endDiv.querySelectorAll("div>*").forEach(element =>{
      if(element.nodeName === "H2")
        section++

      if(section === 1){
        if(element.nodeName === "H2"){
          resourcesDiv.append(element)
          resourcesDiv.append(resources)
        }else if(element.nodeName === "P"){
          let resource = $element(".resource");
          resource.append(element)
          resources.append(resource)
        }
      }else if(section === 2){
        element.innerHTML = element.innerHTML.replace(/[0-9+]+/g, '<span class="think-differently-number">$&</span>')
        thinkAboutBody.append(element)
      }
    })

    thinkAboutBody.append($element(".think-differently-slash-1"))
    thinkAboutBody.append($element(".think-differently-slash-2"))
    thinkAboutDiv.append(thinkAboutBody)
    endDiv.append(resourcesDiv)
    endDiv.append(thinkAboutDiv)

    teamCardsDiv.querySelectorAll("h3").forEach(function(element){
      element.addEventListener("click", function(){
        let alreadyActive;
        if(element.parentElement.classList.contains("active"))
          alreadyActive = true;
        removeActive()
        if(!alreadyActive)
          element.parentElement.classList.add("active")
      })
    })

    function removeActive(){
      teamCardsDiv.querySelectorAll(".active").forEach(function(card){
        card.classList.remove("active")
      })
    }
}