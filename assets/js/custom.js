(function($) {
  var toggle = document.getElementById("menu-toggle");
  var menu = document.getElementById("menu");
  var close = document.getElementById("menu-close");

  toggle.addEventListener("click", function(e) {
    if (menu.classList.contains("open")) {
      menu.classList.remove("open");
    } else {
      menu.classList.add("open");
    }
  });

  close.addEventListener("click", function(e) {
    menu.classList.remove("open");
  });

  // Close menu after click on smaller screens
  $(window).on("resize", function() {
    if ($(window).width() < 846) {
      $(".main-menu a").on("click", function() {
        menu.classList.remove("open");
      });
    }
  });

  $(".owl-carousel").owlCarousel({
    items: 4,
    lazyLoad: true,
    loop: true,
    dots: true,
    margin: 30,
    responsiveClass: true,
    responsive: {
      0: {
        items: 1
      },
      600: {
        items: 1
      },
      1000: {
        items: 1
      }
    }
  });

  $(".hover").mouseleave(function() {
    $(this).removeClass("hover");
  });

  $(".isotope-wrapper").each(function() {
    var $isotope = $(".isotope-box", this);
    var $filterCheckboxes = $('input[type="radio"]', this);

    var filter = function() {
      var type = $filterCheckboxes.filter(":checked").data("type") || "*";
      if (type !== "*") {
        type = '[data-type="' + type + '"]';
      }
      $isotope.isotope({ filter: type });
    };

    $isotope.isotope({
      itemSelector: ".isotope-item",
      layoutMode: "masonry"
    });

    $(this).on("change", filter);
    filter();
  });

  lightbox.option({
    resizeDuration: 200,
    wrapAround: true
  });
})(jQuery);


function setupTypewriter(t) {
  var HTML = t.innerHTML;

  t.innerHTML = "";

  var cursorPosition = 0,
      tag = "",
      writingTag = false,
      tagOpen = false,
      typeSpeed = 100,
    tempTypeSpeed = 0;

  var type = function() {
    
      if (writingTag === true) {
          tag += HTML[cursorPosition];
      }

      if (HTML[cursorPosition] === "<") {
          tempTypeSpeed = 0;
          if (tagOpen) {
              tagOpen = false;
              writingTag = true;
          } else {
              tag = "";
              tagOpen = true;
              writingTag = true;
              tag += HTML[cursorPosition];
          }
      }
      if (!writingTag && tagOpen) {
          tag.innerHTML += HTML[cursorPosition];
      }
      if (!writingTag && !tagOpen) {
          if (HTML[cursorPosition] === " ") {
              tempTypeSpeed = 0;
          }
          else {
              tempTypeSpeed = (Math.random() * typeSpeed) + 50;
          }
          t.innerHTML += HTML[cursorPosition];
      }
      if (writingTag === true && HTML[cursorPosition] === ">") {
          tempTypeSpeed = (Math.random() * typeSpeed) + 50;
          writingTag = false;
          if (tagOpen) {
              var newSpan = document.createElement("span");
              t.appendChild(newSpan);
              newSpan.innerHTML = tag;
              tag = newSpan.firstChild;
          }
      }

      cursorPosition += 1;
      if (cursorPosition < HTML.length - 1) {
          setTimeout(type, tempTypeSpeed);
      }

  };

  return {
      type: type
  };
}

var typer = document.getElementById('typewriter');

typewriter = setupTypewriter(typewriter);

typewriter.type();