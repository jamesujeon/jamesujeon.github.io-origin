function setupCopyEmailToClipboard() {
  var mailto = $('a[href^=mailto]');
  mailto.click(function() { return false; })
  mailto.wrap('<span class="mailto-wrapper">');
  $('.mailto-wrapper').append('<span class="mailto-message"></span>');

  mailto.addClass('mailto-link');
  $('.mailto-link').click(function() {
    var href = $(this).attr('href');
    var email = href.replace('mailto:', '');
    copyToClipboard(email);
        
    var mailtoMessage = $('.mailto-message');
    mailtoMessage.empty().append('Email copied to clipboard');
    setTimeout(function() { mailtoMessage.empty(); }, 1000); 
  });
}

function copyToClipboard(text) {
  var dummy = document.createElement("input");
  document.body.appendChild(dummy);
  dummy.setAttribute('value', text);
  dummy.select();
  document.execCommand('copy');
  document.body.removeChild(dummy);
}
