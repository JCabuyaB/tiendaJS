export default class Tabs {
    constructor(id) {
        this.tabs = document.getElementById(id);
        this.nav = this.tabs.querySelector(".tabs");

        this.nav.addEventListener("click", (e) => {
            if (e.target.classList.contains("tabs__button")) {
                const tab = e.target.dataset.tab;

                if (this.nav.querySelector(".tabs__button--active")) {
                    this.nav
                        .querySelector(".tabs__button--active")
                        .classList.remove("tabs__button--active");
                }

                if (this.tabs.querySelector(".tab--active")) {
                    this.tabs
                        .querySelector(".tab--active")
                        .classList.remove("tab--active");
                }

                e.target.classList.add("tabs__button--active");
                this.tabs.querySelector(`#${tab}`).classList.add("tab--active");
            }
        });
    }
}
