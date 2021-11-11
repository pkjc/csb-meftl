var Boxlayout = (function () {
  var $el = $("#bl-main"),
    $sections = $el.children("section"),
    // works section
    $sectionWork = $("#bl-work-section"),
    // work items
    $workItems = $("#bl-work-items > li"),
    // work panels
    $workPanelsContainer = $("#bl-panel-work-items"),
    $workPanels = $workPanelsContainer.children("div"),
    totalWorkPanels = $workPanels.length,
    // navigating the work panels
    $nextWorkItem = $workPanelsContainer.find("nav > span.bl-next-work"),
    // if currently navigating the work items
    isAnimating = false,
    // close work panel trigger
    $closeWorkItem = $workPanelsContainer.find("nav > span.bl-icon-close"),
    $pageTitle = $(".page-title"),
    transEndEventNames = {
      WebkitTransition: "webkitTransitionEnd",
      MozTransition: "transitionend",
      OTransition: "oTransitionEnd",
      msTransition: "MSTransitionEnd",
      transition: "transitionend"
    },
    // transition end event name
    transEndEventName = transEndEventNames[Modernizr.prefixed("transition")],
    // // support css transitions
    supportTransitions = Modernizr.csstransitions;

  function init() {
    initEvents();
  }

  const start = () => {
    setTimeout(function () {
      confetti.start();
    }, 100); // 1000 is time that after 1 second start the confetti ( 1000 = 1 sec)
  };

  //  for stopping the confetti

  const stop = () => {
    setTimeout(function () {
      confetti.stop();
    }, 2000); // 5000 is time that after 5 second stop the confetti ( 5000 = 5 sec)
  };

  function initEvents() {
    $("#bl-work-items").css("display", "none");

    $("#makeItYes").on("click", () => {
      start();
      stop();
    });

    $sections.each(function () {
      var $section = $(this);

      // expand the clicked section and scale down the others
      $section
        .on("click", function () {
          if (!$section.data("open")) {
            $section.data("open", true).addClass("bl-expand bl-expand-top");
            $el.addClass("bl-expand-item");
          }
        })
        .on(transEndEventName, function (event) {
          if (!$(event.target).is("section")) return false;
          console.log("Transitions ended.");
          $("#bl-work-items").css("display", "block");
          $(".loading").css("display", "none");
        })
        .find("span.bl-icon-close")
        .on("click", function () {
          console.log("closing section");
          // close the expanded section and scale up the others
          $section
            .data("open", false)
            .removeClass("bl-expand")
            .on(transEndEventName, function (event) {
              if (!$(event.target).is("section")) return false;
              $(this).off(transEndEventName).removeClass("bl-expand-top");
            });

          if (!supportTransitions) {
            $section.removeClass("bl-expand-top");
          }

          $el.removeClass("bl-expand-item");

          return false;
        });
    });
  }

  return { init: init };
})();
