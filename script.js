// Back to top button
window.addEventListener("scroll", () => {
  const backToTop = document.getElementById("backToTop");
  backToTop.style.display = window.scrollY > 300 ? "flex" : "none";
});
document.getElementById("backToTop").addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

(function () {
  "use strict";

  var prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------------------------------------------
     1. Chat mockup — sequenced messages + typing
     --------------------------------------------- */
  var chatBody = document.getElementById("chatBody");

  var script = [
    { side: "in", text: "Oi, quero pedir" },
    { side: "out", text: "Oi! Eu sou a MarIA 💁 Pra começar, qual é o seu nome?" },
    { side: "in", text: "Ana" },
    { side: "out", text: "Prazer, Ana! Vai ser aqui na mesa, delivery ou retirada?" },
    { side: "in", text: "Delivery, Rua das Flores 123" },
    { side: "out", text: "Show! O que você vai querer? 😋" },
    { side: "in", text: "1 X-Bacon e uma Coca lata" },
    { side: "out", text: "Perfeito! Fechou R$ 34,90. Como prefere pagar: Pix, dinheiro ou cartão?" },
    { side: "in", text: "Pix" },
    { side: "out", text: "Aqui está o código Pix copia e cola 📱 Assim que cair, seu pedido já é enviado pra cozinha!" }
  ];

  function el(tag, className, text) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (text) node.textContent = text;
    return node;
  }

  function typingIndicator() {
    var wrap = el("div", "typing");
    wrap.setAttribute("aria-hidden", "true");
    wrap.appendChild(el("span"));
    wrap.appendChild(el("span"));
    wrap.appendChild(el("span"));
    return wrap;
  }

  function runChat() {
    if (!chatBody) return;
    chatBody.innerHTML = "";

    if (prefersReducedMotion) {
      script.forEach(function (m) {
        chatBody.appendChild(el("div", "msg msg-" + m.side, m.text));
      });
      return;
    }

    var i = 0;

    function step() {
      if (i >= script.length) {
        setTimeout(function () {
          runChat();
        }, 3200);
        return;
      }

      var m = script[i];

      if (m.side === "out") {
        var indicator = typingIndicator();
        chatBody.appendChild(indicator);
        chatBody.scrollTop = chatBody.scrollHeight;

        setTimeout(function () {
          indicator.remove();

          var bubble = el("div", "msg msg-" + m.side, m.text);
          chatBody.appendChild(bubble);
          chatBody.scrollTop = chatBody.scrollHeight;

          i++;
          setTimeout(step, 900);
        }, 950);
      } else {
        var bubble2 = el("div", "msg msg-" + m.side, m.text);
        chatBody.appendChild(bubble2);
        chatBody.scrollTop = chatBody.scrollHeight;

        i++;
        setTimeout(step, 1100);
      }
    }

    step();
  }

  runChat();

  /* ---------------------------------------------
     2. Scroll reveal
     --------------------------------------------- */
  var revealTargets = document.querySelectorAll(
    ".step, .bubble-card, .quote-wrap, .sponsor-grid, .footer-cta"
  );

  revealTargets.forEach(function (node) {
    node.classList.add("reveal");
  });

  if ("IntersectionObserver" in window && !prefersReducedMotion) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
    );

    revealTargets.forEach(function (node) {
      observer.observe(node);
    });
  } else {
    revealTargets.forEach(function (node) {
      node.classList.add("is-visible");
    });
  }
})();
