export default {
    install(Vue) {
        if (this.installed) {
            return;
        }

        this.installed = true;
        this.caller = null;

        Vue.prototype.$context = {
            EventBus: new Vue(),

            show({ event, item }) {
                const caller = event.target;
                if (caller !== this.caller) {
                    this.caller = caller;
                    this.EventBus.$emit("showMenuWindow", { item, caller });
                } else {
                    this.close()
                }
            },

            close() {
                this.caller = null
                this.EventBus.$emit("close");
            },
        };
    },
};
