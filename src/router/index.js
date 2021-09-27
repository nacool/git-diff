import Vue from "vue";
import VueRouter from "vue-router";
import CommitDifference from "../components/CommitDifference.vue";

Vue.use(VueRouter);
const routes = [
    {
        path: "/repositories/:owner/:repository/commit/:commitSHA",
        name: "Difference",
        component: CommitDifference,
        props: true
    }
]

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes,
});

export default router;

