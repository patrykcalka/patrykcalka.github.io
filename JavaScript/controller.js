const controller = {
  init: () => {
    document.querySelectorAll('[data-navigation]').forEach(link => {
       link.addEventListener('click', function (event){
           controller.changeView(event, link);
       });
    });
    controller.renderView("home");
  }, changeView:(event, link) => {
      event.preventDefault();
        console.log(model.currentView);
        controller.renderView(link.getAttribute("data-navigation"));
    },
    renderView:(page) => {
      document.getElementById(model.currentView).classList.add("hidden");
        document.getElementById(page).classList.remove("hidden");
        model.currentView = page;
    }
};
document.addEventListener('DOMContentLoaded', controller.init);