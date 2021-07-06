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
    } else{
      console.error();
    }
  }
  dataRequest.open("GET", "/.netlify/functions/getArticlesData");
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