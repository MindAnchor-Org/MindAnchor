import { T as head } from "../../chunks/index.js";
function _layout($$payload, $$props) {
  let { children } = $$props;
  head($$payload, ($$payload2) => {
    $$payload2.out += `<link rel="icon" type="image/x-icon" href="/icon.png">`;
  });
  children($$payload);
  $$payload.out += `<!---->`;
}
export {
  _layout as default
};
