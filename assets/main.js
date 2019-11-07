importJavaScript('scrollToTop');
importJavaScript('copyEmailToClipboard');

$(document).ready(function() {
  setupScrollToTopButton();
	setupCopyEmailToClipboard();
});


function importJavaScript(scriptName) {
    document.write('<script type="text/javascript" src="/assets/js/' + scriptName + '.js"></script>');
}
