export default function decorate($main) {
  console.log("HITTTTTT")
    var toolkit = document.querySelector("body > main");
    toolkit.classList.add("toolkit")
    console.log("working")
    toolkit.forEach(t => {
      if( t.querySelector("p") ) {
        t.classList.add("article-picture");
      }
    });
}