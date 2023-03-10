const _translate = {
  translateSourceUrl:
    "https://translate.googleapis.com/translate_a/single?client=gtx&sl={SOURCE_LANG}&tl={TARGET_LANG}&dt=t&q={TEXT}",
  getTranslateSourceUrl: function () {
    return this.translateSourceUrl;
  },
  mergeSentences: function (a) {
    return a
      .map(function (b) {
        return b[0];
      })
      .join("");
  },
  generatePostUrl: function (a, b, c) {
    return this.getTranslateSourceUrl()
      .replace("{SOURCE_LANG}", c)
      .replace("{TARGET_LANG}", b)
      .replace("{TEXT}", encodeURI(a))
      .toString();
  },
  translateText: function (a, b, c) {
    if ("" === a) return "";
    let d = c ? c : "auto",
      e = b ? b : "hi",
      f = this.generatePostUrl(a, e, d),
      g = this;
    return fetch(f)
      .then(function (h) {
        return h.json();
      })
      .then(function (h) {
        return {
          sourceLang: h[2],
          targetLang: e,
          originalText: a,
          text: g.mergeSentences(h[0]),
        };
      })
      .catch(function (h) {
        return Promise.reject(Error(h));
      });
  },
};

const translateBtn = document.getElementById("translate");

//Regular expression for checking alphabet during translation
const regEx = /^[a-zA-Z]+$/;
const tempQuote = quoteText.innerText;

//translator button
translateBtn.addEventListener("click", () => {
  window.navigator.vibrate(30);
  if (quoteText.innerText[0].match(regEx)) {
    _translate
      .translateText(quoteText.innerText)
      .then(function (translatedData) {
        quoteText.innerText = translatedData.text;
      });
  } else {
    quoteText.innerText = quoteInEng;
  }
});
