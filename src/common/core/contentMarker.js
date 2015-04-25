// @require dependencies/jquery-2.1.3.min.js

/**
/* Responsible for marking a content area as potencial toxic content
**/
function ContentMarker(markAsAcceptableCallback, markAsOffensiveCallback) {

  this.mark = function(domElement, isBlocked) {
    var dom = $(domElement);
    var children = dom.children();
    children.wrapAll('<div class="t-blocked"></div>');
    var hiddenDom = children().first();
    hiddenDom.hide();
    dom.prepend('<div style="text-align: center;>
                  <img style="float: left; width: 20px; height: 20px;" src="http://vignette3.wikia.nocookie.net/yogbox/images/c/c6/Ban.png/revision/latest?cb=20120816112127">
                  Blocked Content
                  <button style="float: right;">Unblock</button>
                  <button style="float: right;">Show</button>
                </div>');
  }
}