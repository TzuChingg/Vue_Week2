import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'

const app = {
    data() {
        return {
            apiUrl: 'https://ec-course-api.hexschool.io/v2',
            apiPath: 'chinging',
            products: [],
            template: []
            
        }
    },
    methods: {
        userCheck(){
            axios.post(`${this.apiUrl}/api/user/check`)
            .then((res) => {
                console.log('使用者驗證成功');
                this.getData()
            }).catch((err) => {
                console.log(err.response.data);
                window.location = 'index.html'
            });
        },
        getData(){
            axios.get(`${this.apiUrl}/api/${this.apiPath}/admin/products/all`)
            .then((res) => {
                this.products = res.data.products
                console.log('this.products商品', this.products);
            }).catch((err) => {
                console.log(err.response.data);
            });
        },
        logout(){
            axios.post(`${this.apiUrl}/logout`)
            .then((res) => {
                console.log(res.data);
                document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                window.location = 'index.html'
            }).catch((err) => {
                console.log(err.response.data);
            });
        }
    },
    mounted() {
        axios.defaults.headers.common.Authorization = `${document.cookie.split('=')[1]}`;
        this.userCheck()
    },

}

createApp(app).mount('#app')
