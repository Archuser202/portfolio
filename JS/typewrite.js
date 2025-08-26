class TypeWriter {
  constructor(element, texts, options = {}) {
    this.element = element;
    this.texts = texts;
    this.typingSpeed = options.typingSpeed || 100;
    this.deletingSpeed = options.deletingSpeed || 50;
    this.pauseDuration = options.pauseDuration || 1500;
    this.loop = options.loop !== false; // default true
    this.cursorChar = options.cursor || "|";
    this.text = "";
    this.textIndex = 0;
    this.isDeleting = false;

    // Create wrapper so cursor stays in line
    this.wrapper = document.createElement("span");
    this.wrapper.className = "typewriter-text";
    this.cursor = document.createElement("span");
    this.cursor.className = "typewriter-cursor";
    this.cursor.textContent = this.cursorChar;

    this.element.innerHTML = "";
    this.element.appendChild(this.wrapper);
    this.element.appendChild(this.cursor);

    this._blinkCursor();
    this._type();
  }

  _blinkCursor() {
    setInterval(() => {
      this.cursor.style.visibility =
        this.cursor.style.visibility === "hidden" ? "visible" : "hidden";
    }, 500);
  }

  _type() {
    const currentText = this.texts[this.textIndex];

    if (this.isDeleting) {
      this.text = currentText.substring(0, this.text.length - 1);
    } else {
      this.text = currentText.substring(0, this.text.length + 1);
    }

    this.wrapper.textContent = this.text;

    let delay = this.isDeleting ? this.deletingSpeed : this.typingSpeed;

    if (!this.isDeleting && this.text === currentText) {
      delay = this.pauseDuration;
      this.isDeleting = true;
    } else if (this.isDeleting && this.text === "") {
      this.isDeleting = false;
      this.textIndex++;
      if (this.textIndex >= this.texts.length) {
        if (this.loop) {
          this.textIndex = 0;
        } else {
          return;
        }
      }
    }

    setTimeout(() => this._type(), delay);
  }
}
