import { N as NuxtLink } from './nuxt-link-Alrs6VPA.mjs';
import { u as useUser, A as Admin } from './useUser-C9hX4r0U.mjs';
import { defineComponent, withCtx, createTextVNode, unref, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrInterpolate } from 'vue/server-renderer';
import '../virtual/entry.mjs';
import 'nostics';
import 'nostics/formatters/ansi';
import '../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import '../routes/renderer.mjs';
import 'unhead/server';
import 'unhead/legacy';
import 'unhead/plugins';
import 'vue-bundle-renderer/runtime';
import 'devalue';
import 'vue-router';
import 'unhead/utils';

//#region app/pages/account.vue?vue&type=script&setup=true&lang.ts
var account_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "account",
	__ssrInlineRender: true,
	setup(__props) {
		const user = useUser();
		user.setName("aLISA");
		if (user instanceof Admin) user.setGender("female");
		return (_ctx, _push, _parent, _attrs) => {
			const _component_NuxtLink = NuxtLink;
			_push(`<!--[-->`);
			_push(ssrRenderComponent(_component_NuxtLink, { to: "/" }, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`Home`);
					else return [createTextVNode("Home")];
				}),
				_: 1
			}, _parent));
			_push(`<h1>Account</h1><div>${ssrInterpolate(unref(user))}</div><!--]-->`);
		};
	}
});
//#endregion
//#region app/pages/account.vue
var _sfc_setup = account_vue_vue_type_script_setup_true_lang_default.setup;
account_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/account.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var account_default = account_vue_vue_type_script_setup_true_lang_default;

export { account_default as default };
//# sourceMappingURL=account-CjNX4Zit.mjs.map
