// @require dependencies/jquery-2.1.3.min.js

/**
/* Responsible for marking a content area as potencial toxic content
**/
function ContentMarker(markAsAcceptableCallback, markAsOffensiveCallback) {

  this.mark = function(domElement, isBlocked) {
    var dom = $(domElement);
    var isInitial = !dom.hasClass('t-initial');

    if (isInitial) {
      dom.addClass('t-initial');
      dom.children().wrapAll('<div class="t-comment"></div>');
      var menu = $(document.createElement('div')).attr({
        "class": "t-menu",
      }).css({
        "text-align": "center",
      });

      // show-hide buttons
      var showButton = $(document.createElement('button')).attr({
        onclick: "$(this).parent().next().show();$(this).hide();$(this).parent().children('.hide-btn').show()",
      });
      showButton.html('Show');
      showButton.addClass('show-btn');
      var hideButton = $(document.createElement('button')).attr({
        onclick: "$(this).parent().next().hide();$(this).hide();$(this).parent().children('.show-btn').show()",
      });
      hideButton.html('Hide');
      hideButton.addClass('hide-btn');

      // block-unblock buttons
      var blockButton = $(document.createElement('button')).attr({
        onclick: "markAsOffensiveCallback($(this).parent().parent()[0]);$(this).parent().children('hide-btn').click()",
      });
      blockButton.html('Block');
      blockButton.addClass('block-btn');
      var unblockButton = $(document.createElement('button')).attr({
        onclick: "markAsAcceptableCallback($(this).parent().parent()[0]);$(this).parent().children('show-btn').click()",
      });
      unblockButton.html('Unblock');
      unblockButton.addClass('unblock-btn');

      menu.append(showButton);
      menu.append(hideButton);
      menu.append(blockButton);
      menu.append(unblockButton);
      dom.prepend(menu);
      if (isBlocked) {
        blockButton.hide();
        hideButton.hide();
        dom.addClass('t-blocked');
      } else {
        showButton.hide();
        unblockButton.hide();
        dom.addClass('t-unblocked');
      }
    } else {
      if (isBlocked) {
        if (dom.hasClass("t-blocked")) {
          return;
        } else {
          dom.removeClass("t-unblocked");
          dom.addClass("t-blocked");
          dom.children(".block-btn").click();
        }
      } else {
        if (dom.hasClass("t-blocked")) {
          dom.removeClass("t-blocked");
          dom.addClass("t-unblocked");
          dom.children(".unblock-btn").click();
        } else {
          return;
        }
      }
    }
  }
}