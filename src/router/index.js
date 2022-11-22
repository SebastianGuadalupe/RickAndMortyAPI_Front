import { createRouter, createWebHistory } from "vue-router";
import CharactersView from "../views/characters/index.vue";

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: "/characters",
			name: "characters",
			component: CharactersView,
		},
		{
			path: "/characters/:id",
			name: "character",
			component: () => import("../views/characters/view.vue"),
		},
	],
});

export default router;
