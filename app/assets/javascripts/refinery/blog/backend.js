
//= require jquery-ui/autocomplete


$(document).ready(function(){
  $('#more_options').hide()

  $('nav#actions.multilist > ul:not(.search_list) li a[href$="' + window.location.pathname + '"]')
    .parent().addClass('selected');
  if($('nav#actions.multilist > ul:not(.search_list) li.selected').length == 0) {
    $('nav#actions.multilist > ul:not(.search_list) li a:nth(1)').parent().addClass('selected');
  }

  $('nav#actions.multilist > ul:not(.search_list) li > a').each(function(i,a){
    if ($(this).data('dialog-title') == null) {
      $(this).bind('click', function(){
        $(this).css('background-image', "url('/images/refinery/icons/ajax-loader.gif') !important");
      });
    }
  });

  $('ul.collapsible_menu').each(function(i, ul) {
    (first_li = $(this).children('li:first')).after(div=$("<div></div>"));

    $("<span class='arrow'>&nbsp;</span>").appendTo(first_li)

    if (($(this).children('li.selected')).length == 0) {
      div.hide();
      first_li.addClass("closed");
    }
    $(this).children('li:not(:first)').appendTo(div);

    first_li.find('> a, > span.arrow').click(function(e){
      $(this).parent().toggleClass("closed");
      $(this).parent().toggleClass("open");

      $(this).parent().next('div').animate({
          opacity: 'toggle'
          , height: 'toggle'
        }, 250, $.proxy(function(){
          $(this).css('background-image', null);
        }, $(this))
      );
      e.preventDefault();
    });
  });

  $('.success_icon, .failure_icon').bind('click', function(e) {
    $.get($(this).attr('href'), $.proxy(function(data){
      $(this).css('background-image', null)
             .removeClass('failure_icon').removeClass('success_icon')
             .addClass(data.enabled ? 'success_icon' : 'failure_icon');
    }, $(this)));
    e.preventDefault();
  });

  $('#page-tabs').tabs();
  $('#copy_body_link').click(function(event) {
    // Find the WYMEditor that maps to the custom_teaser field
    var teaserTextArea = $('#post_custom_teaser')[0];
    var teaserEditor = null;
    $.each(WYMeditor.INSTANCES, function(index, editor) {
      if (editor._element[0] == teaserTextArea) {
        teaserEditor = editor;
      }
    });

    if (teaserEditor) {
      teaserEditor.html($('#post_body').val());
    }

    event.preventDefault();
  });

  page_options.init(false, '', '');
});
