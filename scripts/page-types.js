import { addPageTypeDecorator } from "./page-type-decorator.js";

export default function registerPageTypes() {
    addPageTypeDecorator("home", { type: "home" });
    addPageTypeDecorator("toolkit", { path: "/toolkit" });
    addPageTypeDecorator("inclusive", { path: "/inclusive" });
    addPageTypeDecorator("jobs", { path: "/jobs" });
    addPageTypeDecorator("article", { path: "/stories/*" });
    addPageTypeDecorator("team", { path: "/team" });
    addPageTypeDecorator("job-post", { path: "/jobs/*" });
    /* addPageTypeDecorator({ path: "job-post" }, decorateJobPost); */
}