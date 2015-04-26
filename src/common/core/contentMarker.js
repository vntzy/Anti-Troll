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
      menu.css({
        'display': 'inline-block',
        'position': 'absolute',
        'margin-left': '60%',
        'z-index': '9999',
      });

      var menu_wrapper = $(document.createElement('div')).css({
        'width': '30px',
        'height': '30px',
        'position': 'absolute',
        'margin-left': '60%',
        'z-index': '9999',
      });
      menu_wrapper.hover(function() { menu.show(); }, function() { menu.hide(); });

      var info_box = $(document.createElement('div'));
      info_box.html("Content blocked by Anti-Troll.");
      info_box.attr('class', 't-info');
      info_box.css({
        'position': 'absolute',
        'margin-left': '20%',
      });

      // show-hide buttons
      var showButton = $(document.createElement('img')).attr({
        title: 'Show',
        src: '../icons/show.png',
        onclick: "$(this).parent().next().show();$(this).hide();$(this).parent().children('.hide-btn').show()",
      });
      showButton.addClass('show-btn');
      var hideButton = $(document.createElement('button')).attr({
        onclick: "$(this).parent().next().hide();$(this).hide();$(this).parent().children('.show-btn').show()",
      });
      hideButton.html('Hide');
      hideButton.addClass('hide-btn');

      // block-unblock buttons
      var blockButton = $(document.createElement('button'));
      blockButton.on('click', function () {
        markAsOffensiveCallback(blockButton.parent().parent()[0]);
        blockButton.parent().children('.hide-btn').click();
        blockButton.hide();
        unblockButton.show();
        dom.removeClass('t-unblocked');
        dom.addClass('t-blocked');
        dom.prepend(info_box);
      });
      blockButton.html('Block');
      blockButton.addClass('block-btn');
      var unblockButton = $(document.createElement('button'));
      unblockButton.click(function () {
        markAsAcceptableCallback(unblockButton.parent().parent()[0]);
        unblockButton.parent().children('.show-btn').click();
        unblockButton.hide();
        blockButton.show();
        dom.removeClass('t-blocked');
        dom.addClass('t-unblocked');
        dom.children('.t-info').remove();
      });
      unblockButton.html('Unblock');
      unblockButton.addClass('unblock-btn');

      menu.append(showButton);
      menu.append(hideButton);
      menu.append(blockButton);
      menu.append(unblockButton);
      menu_wrapper.append(menu);
      dom.prepend(menu_wrapper);
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