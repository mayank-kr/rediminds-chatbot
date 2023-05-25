class ChatBox {
  constructor() {
    this.args = {
      openButton: document.querySelector(".chatbox__button"),
      chatBox: document.querySelector(".chatbox__support"),
      sendButton: document.querySelector(".send__button"),
    };
    this.state = false;
    this.messages = [];
  }

  display() {
    const { openButton, chatBox, sendButton } = this.args;
    openButton.addEventListener("click", () => this.toggleState(chatBox));
    sendButton.addEventListener("click", () => this.onSendButton(chatBox));

    const node = chatBox.querySelector("input");
    node.addEventListener("keyup", ({ key }) => {
      if (key === "Enter") {
        this.onSendButton(chatBox);
      }
    });
  }

  toggleState(chatbox) {
    this.state = !this.state;
    if (this.state) {
      chatbox.classList.add("chatbox--active");
    } else {
      chatbox.classList.remove("chatbox--active");
    }
  }

  onSendButton(chatbox) {
    var textfield = chatbox.querySelector("input");
    let text = textfield.value;
    if (text === "") {
      return;
    }
    let msg = { name: "User", message: text };
    this.messages.push(msg);

    fetch($SCRIPT_ROOT + "/reply", {
      method: "POST",
      body: JSON.stringify({ message: text }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((r) => r.json())
      .then((r) => {
        let msg2 = { name: "Madhu", message: r.reply };
        this.messages.push(msg2);
        this.updateChatText(chatbox);
        textfield.value = "";
      })
      .catch((err) => {
        console.error(err);
        this.updateChatText(chatbox);
        textfield.value = "";
      });
  }

  updateChatText(chatbox) {
    var html = "";
    this.messages
      .slice()
      .reverse()
      .forEach(function (item) {
        if (item.name === "Madhu") {
          html +=
            '<div class = "messages__item messages__item--visitor">' +
            item.message +
            "</div>";
        } else {
          html +=
            '<div class = "messages__item messages__item--operator">' +
            item.message +
            "</div>";
        }
      });
    const chatmessage = chatbox.querySelector(".chatbox__messages");
    chatmessage.innerHTML = html;
  }
}

const chatbox = new ChatBox();
chatbox.display();
