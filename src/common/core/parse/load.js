$(document).ready(function() {
  var comments = CommentExtractor.extractComments();

  for (var comment in comments) {
    var comment_text = TextExtractor.extract(comment);
    if (!Classifier.isContentAcceptable(comment_text)) {
      Blocker.block(comment);
    }
  }
})