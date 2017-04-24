import config from '../../config.js';
import router from '../../router';

export default {
    created: function () {
        let expired = localStorage.getItem("expiredDate"),
            token = localStorage.getItem("token");
        if (token && expired && new Date() < new Date(expired)) {
            this.isAuthenticated = true;
            config.isAuthenticated = true;
        }
    },

    data: function () {
        return {
            user: {
                name: "",
                password: ""
            },
            message: null,
            isAuthenticated: false
        }
    },
    computed: {
        formValidation: function () {
            return this.user.name && this.user.password;
        }
    },
    methods: {
        navigate(state) {
            router.push(state);
        },
        openLoginDialog() {
            this.$refs['loginDialog'].open();
        },
          openAboutDialog() {
            this.$refs['about'].open();
        },
        closeLoginDialog() {
            this.$refs['loginDialog'].close();
        },
        login() {
            this.$http.post('authenticate', {
                name: this.user.name,
                password: this.user.password
            }).then(response => {
                let data = response.body;
                if (data.success) {
                    localStorage.setItem('token', data.token);
                    localStorage.setItem('expiredDate', data.expiredDate);
                    config.isAuthenticated = true;
                    this.isAuthenticated = true;
                    this.closeLoginDialog();

                    this.user.name = "";
                    this.user.password = "";
                } else {
                    this.message = data.message;
                }
            });
        },
        logoff() {
            console.log(config.isAuthenticated);
            localStorage.clear();
            config.isAuthenticated = false;
            this.isAuthenticated = false;
        }
    }
}