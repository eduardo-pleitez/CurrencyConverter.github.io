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
  dataRequest.open("GET", "https://free-news.p.rapidapi.com/v1/search?q=Finance&lang=en");
  dataRequest.setRequestHeader("x-rapidapi-key", "d42c5452bdmsh26ded46ee25d5cep17ea0ejsne2a6313219e1");
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
      div.className = "articleTab";
      div.id = "article" + i;
      let titleContainer, titleText;
      titleContainer = document.createElement("H2");
      titleContainer.className = "articleTabTitle"
      titleText = document.createTextNode(dataResult.articles[i].title);
      titleContainer.append(titleText);
      let paragraphContainer, paragraphText;
      paragraphContainer = document.createElement("p");
      paragraphContainer.className = "articleTabParagraph"
      paragraphText = document.createTextNode(dataResult.articles[i].summary);
      paragraphContainer.append(paragraphText);
      let newsLink, newsLinkText;
      newsLink = document.createElement("a");
      newsLink.href = dataResult.articles[i].link;
      newsLink.target = "_blank";
      newsLinkText = document.createTextNode("Read the full article");
      newsLink.append(newsLinkText);
      div.append(titleContainer);
      div.append(paragraphContainer);
      div.append(newsLink);
      let newsSection = document.getElementById("articleContainer");
      newsSection.append(div);
    }else {
      i--;
    }
  }

}