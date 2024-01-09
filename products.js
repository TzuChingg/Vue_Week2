import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'

const app = {
    data() {
        return {
            apiUrl: 'https://ec-course-api.hexschool.io/v2',
            apiPath: 'chinging',
            products: [],
            template: [],
            loading: 1
            
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
                this.loading = 0    //資料載入好，loading 消失
            }).catch((err) => {
                console.log(err.response.data);
            });
        },
        logout(){
            axios.post(`${this.apiUrl}/logout`)
            .then((res) => {
                console.log(res.data);
                document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"; //刪除cookie
                window.location = 'index.html'   //跳轉登入頁面
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
