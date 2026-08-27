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
    { side: "in", text: "Oi! Queria pedir um hambúrguer e uma coca." },
    { side: "out", text: "Claro! 🍔 Qual hambúrguer você gostaria?" },
    { side: "in", text: "Um X-Bacon com batata, e uma Coca Zero." },
    { side: "out", text: "Perfeito! Seu X-Bacon com batata + Coca Zero fica R$ 42,90. Quer adicionar algum molho?" },
    { side: "in", text: "Pode colocar barbecue. É só isso." },
    { side: "out", text: "Fechado! Seu pedido ficou em R$ 45,90. Posso finalizar o pedido para você?" }
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
