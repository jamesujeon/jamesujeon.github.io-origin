importJavaScript('utils/extension-String');
importJavaScript('utils/scroll-to-top');
importJavaScript('utils/copy-email-to-clipboard');
importJavaScript('simple-jekyll-search.min');

$(document).ready(function() {
  setupScrollToTopButton();
	setupCopyEmailToClipboard();
});


function importJavaScript(scriptName) {
    document.write('<script type="text/javascript" src="/assets/js/' + scriptName + '.js"></script>');
}
