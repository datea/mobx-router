import { Router } from 'director/build/director';
import { autorun } from 'mobx';
import { viewsForDirector } from './utils';

const createDirectorRouter = (views, store) => {
    new Router({
        ...viewsForDirector(views, store)
    })
        .configure({
            html5history: true
        })
        .init();
};

export const startRouter = (views, store) => {
    //create director configuration
    createDirectorRouter(views, store);

    //autorun and watch for path changes
    autorun(() => {
        const { currentPath } = store.router;
        if (currentPath !== (window.location.pathname + window.location.search)) {
            window.history.pushState(null, null, currentPath);
        }
    });
};
