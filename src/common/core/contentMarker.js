// @require dependencies/jquery-2.1.3.min.js

/**
/* Responsible for marking a content area as potencial toxic content
**/
function ContentMarker(markAsAcceptableCallback, markAsOffensiveCallback) {

  this.mark = function(domElement, isBlocked) {
    if(isBlocked) {
        kango.console.log("Element is blocked: ");
        kango.console.log(domElement);
    }
    var dom = $(domElement);
    var isInitial = !dom.hasClass('t-initial');

    if (isInitial) {
      dom.css({
        'min-height': '35px',
      });
      dom.addClass('t-initial');
      dom.children().wrapAll('<div class="t-comment"></div>');
      var menu = $(document.createElement('div')).attr({
        "class": "t-menu",
      });
      menu.css({
        'display': 'inline-block',
        'z-index': '9999',
      });
      menu.hide();

      var menu_wrapper = $(document.createElement('div')).css({
        'width': '100px',
        'height': '30px',
        'position': 'absolute',
        'left': '60%',
        'z-index': '9999',
        'display': 'inline-table',
      });

      var info_box = $(document.createElement('div'));
      info_box.html("Content blocked by Anti-Troll.");
      info_box.attr('class', 't-info');
      info_box.css({
        'height': '35px',
        'margin-left': '20%',
        'width': '200px',
        'display': 'inline-block',
      });

      var anti_troll_icon = $(document.createElement('img')).attr({
        title: 'Anti-Troll',
        src: 'https://raw.githubusercontent.com/vntzy/Anti-Troll/master/src/common/icons/icon32.png',
      }).css({
        width: '30px',
        height: '30px',
      });
      anti_troll_icon.hover(function() { menu.show(); }, function() { menu.hide(); });
      menu.hover(function() { menu.show(); }, function() { menu.hide(); });

      // show-hide buttons
      var showButton = $(document.createElement('img')).attr({
        title: 'Show',
        src: 'https://raw.githubusercontent.com/vntzy/Anti-Troll/master/src/common/icons/show.png',
      }).css({
        cursor: 'pointer',
      });
      showButton.on('click', function() {
        dom.children('.t-comment').show();$(this).hide();
        $(this).parent().children('.hide-btn').show();
      });
      showButton.addClass('show-btn');
      var hideButton = $(document.createElement('img')).attr({
        title: 'Hide',
        src: 'https://raw.githubusercontent.com/vntzy/Anti-Troll/master/src/common/icons/hide.png',
      }).css({
        cursor: 'pointer',
      });
      hideButton.on('click', function() {
        dom.children('.t-comment').hide();$(this).hide();
        $(this).parent().children('.show-btn').show();
      });
      hideButton.addClass('hide-btn');

      // block-unblock buttons
      var blockButton = $(document.createElement('img')).attr({
        title: 'Block',
        src: 'https://raw.githubusercontent.com/vntzy/Anti-Troll/master/src/common/icons/notokay.png',
      }).css({
        cursor: 'pointer',
      });
      blockButton.on('click', function () {
        //markAsOffensiveCallback(blockButton.parent().parent()[0]);
        markAsOffensiveCallback(domElement);
        blockButton.parent().children('.hide-btn').click();
        blockButton.hide();
        unblockButton.show();
        dom.removeClass('t-unblocked');
        dom.addClass('t-blocked');
        info_box.insertAfter(menu_wrapper);
      });
      blockButton.addClass('block-btn');
      var unblockButton = $(document.createElement('img')).attr({
        title: 'Unblock',
        src: 'https://raw.githubusercontent.com/vntzy/Anti-Troll/master/src/common/icons/okay.png',
      }).css({
        cursor: 'pointer',
      });
      unblockButton.click(function () {
        //markAsAcceptableCallback(unblockButton.parent().parent()[0]);
        markAsAcceptableCallback(domElement);
        unblockButton.parent().children('.show-btn').click();
        unblockButton.hide();
        blockButton.show();
        dom.removeClass('t-blocked');
        dom.addClass('t-unblocked');
        dom.children('.t-info').remove();
      });
      unblockButton.addClass('unblock-btn');

      menu_wrapper.prepend(anti_troll_icon);
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