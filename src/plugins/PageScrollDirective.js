import debounce from "lodash/debounce";
const PageScrollDirective = {
  mounted(el, binding) {
    el._PageScroll_ = debounce(
      () => {
        console.log("scrolling");
        binding.value;
      },
      200,
      { leading: true }
    );
    document.addEventListener("scroll", el._PageScroll_);
  },
  unmounted(el) {
    document.removeEventListener("scroll", el._PageScroll_);
  },
};

export default (app) => {
  app.directive("page-scroll", PageScrollDirective);
};
