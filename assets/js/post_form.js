import TextConversion from './text_conversion';
import autosize from 'autosize';

export default class PostForm {
  constructor(properties) {
    this.$postBodyInput = properties.postBodyInput;
    this.$postBodyPreview = properties.postBodyPreview;
    this.$wordCountContainer = properties.wordCountContainer;
    this.$bodyWordLimitContainer = properties.bodyWordLimitContainer;
    this.bodyWordLimit = properties.bodyWordLimit;
    this.$titleInput = properties.titleInput;
    this.$titleCharacterLimitContainer =
      properties.titleCharacterLimitContainer;
    this.titleCharacterLimit = properties.titleCharacterLimit;
    this.$previewTitleContainer = properties.previewTitleContainer;
    this.handlePostBodyPreview = this.handlePostBodyPreview.bind(this);
    this.textConversion = this.textConversion();
  }

  init() {
    if (!this.$postBodyInput.length) {
      return;
    }

    this.textConversion.init();
    this.setInitialPreview();
    this.observePostBodyInputChange();
    this.observeTitleInputChange();
    autosize(this.$postBodyInput);

    var that = this;
    this.$ace_editor = $('#editor');

    if (this.$ace_editor.length > 0 && !!TIL.editor.match(/Ace/)) {
      var editor = ace.edit('editor');
      var session = editor.getSession();
      ace.config.set('workerPath', '/assets/javascripts/ace');
      editor.setTheme('ace/theme/kuroir');
      editor.setFontSize(16);

      session.setMode('ace/mode/markdown');
      session.setUseWrapMode(true);
      session.setUseSoftTabs(true);
      session.setTabSize(2);
      session.on('change', function() {
        var value = editor.session.getValue();
        that.$postBodyInput.val(value).trigger('change');
      });

      editor.setValue(this.$postBodyInput.val());

      if (TIL.editor === 'Ace (w/ Vim)') {
        editor.setKeyboardHandler('ace/keyboard/vim');
      }

      this.$ace_editor.show();
      this.$postBodyInput.hide();
    }
  }

  setInitialPreview() {
    this.textConversion.convert(this.$postBodyInput.text(), 'markdown');
    this.updateWordCount();
    this.updateWordLimit();
    this.updateTitleLimit();
    this.updatePreviewTitle();
  }

  wordCount() {
    return this.$postBodyInput.val().split(/\s+|\n/).filter(Boolean).length;
  }

  updateWordCount() {
    this.$wordCountContainer.html(this.wordCount());
  }

  updateWordLimit() {
    this.renderCountMessage(
      this.$bodyWordLimitContainer,
      this.bodyWordLimit - this.wordCount(),
      'word'
    );
  }

  updateTitleLimit() {
    this.renderCountMessage(
      this.$titleCharacterLimitContainer,
      this.titleCharacterLimit - this.$titleInput.val().length,
      'character'
    );
  }

  updatePreviewTitle() {
    this.$previewTitleContainer.html(this.$titleInput.val());
  }

  renderCountMessage($el, amount, noun) {
    var plural = amount === 1 ? '' : 's';
    $el
      .toggleClass('negative', amount < 0)
      .text(amount + ' ' + noun + plural + ' available');
  }

  handlePostBodyPreview(html) {
    this.$postBodyPreview.html(html);
    this.$postBodyPreview.find('pre code').each((_index, codeEl) => {
      window.hljs.highlightBlock(codeEl);
    });
  }

  observePostBodyInputChange() {
    this.$postBodyInput.on('keyup', e => {
      this.updateWordCount();
      this.updateWordLimit();
      this.textConversion.convert(e.target.value, 'markdown');
    });

    this.$postBodyInput.on('change', e => {
      this.updateWordCount();
      this.updateWordLimit();
      this.textConversion.convert(e.target.value, 'markdown');
    });
  }

  observeTitleInputChange() {
    this.$titleInput.on('input', e => {
      this.updateTitleLimit();
      this.updatePreviewTitle();
    });
  }

  textConversion() {
    return new TextConversion({
      convertedTextCallback: this.handlePostBodyPreview,
    });
  }
}
