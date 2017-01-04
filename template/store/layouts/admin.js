
const store = {
    state: {
        isLogin:false
    },
    mutations: {
        setLogin(state,type){
            if(type !== undefined){
                state.isLogin = type;
            }else{
                state.isLogin = !state.isLogin;
            }
        }
    },
    actions: {},
    getters: {}
};

export default store;
