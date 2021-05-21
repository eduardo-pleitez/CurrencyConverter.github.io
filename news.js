/*Execute function on load */
window.onload = function(){
  getnewsData();
}

/* Fucntion to get the news data */
function getnewsData() {
  let dataRequest = new XMLHttpRequest();
  dataRequest.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      let dataResult = JSON.parse (this.responseText);
      displayNews(dataResult);
    }
  }
  dataRequest.open("GET", "https://free-news.p.rapidapi.com/v1/search?q=Forex&lang=en");
  dataRequest.setRequestHeader("x-rapidapi-key", "02a0399372msh670c58894de2d19p1de289jsn50dde2225b05");
  dataRequest.setRequestHeader("x-rapidapi-host", "free-news.p.rapidapi.com");
  dataRequest.send();
}

/* Function to display the data */
function displayNews(dataResult) {
  let i;
  for(i = 0; i < 3; i++){
    if(String(dataResult.articles[i].title) !== null || String(dataResult.articles[i].summary) !== null){
      let div;
      div = document.createElement("div");
      div.className = "newsTab";
      div.id = "news" + i;
      let titleContainer, titleText;
      titleContainer = document.createElement("H2");
      titleContainer.className = "newsTabTitle"
      titleText = document.createTextNode(dataResult.articles[i].title);
      titleContainer.append(titleText);
      let paragraphContainer, paragraphText;
      paragraphContainer = document.createElement("p");
      paragraphContainer.className = "newsTabParagraph"
      paragraphText = document.createTextNode(dataResult.articles[i].summary);
      paragraphContainer.append(paragraphText);
      let newsLink, newsLinkText;
      newsLink = document.createElement("a");
      newsLink.href = dataResult.articles[i].link;
      newsLink.target = "_blank";
      newsLinkText = document.createTextNode("Read the full news");
      newsLink.append(newsLinkText);
      div.append(titleContainer);
      div.append(paragraphContainer);
      div.append(newsLink);
      let newsSection = document.getElementById("newsContainer");
      newsSection.append(div);
    }else {
      i--;
    }
  }

}