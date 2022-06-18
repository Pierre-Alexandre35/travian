import { createSSRApp, createApp } from 'vue';
import App from './App.vue';
// import createRouter from './router';

import router from './router';

const isSSR = typeof window === 'undefined';

export default function () {
    // const rootComponent = {
    //   render: () => h(App),
    //   components: { App },
    // };

    const app = (isSSR ? createSSRApp(App) : createApp(App));

    app.use(router);

    return {
        app,
        router,
    };
}