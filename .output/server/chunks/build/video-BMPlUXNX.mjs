import { v as vue_exports, s as server_renderer_exports } from '../virtual/entry.mjs';
import { _ as _plugin_vue_export_helper_default } from './_plugin-vue_export-helper-BOaGB7Aw.mjs';
import 'unhead/plugins';
import 'unhead/utils';
import 'vue';
import '../routes/renderer.mjs';
import '../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:crypto';
import 'stream';
import 'events';
import 'http';
import 'crypto';
import 'buffer';
import 'zlib';
import 'https';
import 'net';
import 'tls';
import 'url';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:url';
import '@iconify/utils';
import 'consola';
import 'unhead/server';
import 'unhead/legacy';
import 'nostics';
import 'vue-bundle-renderer/runtime';
import 'vue/server-renderer';
import 'devalue';
import 'tailwindcss/colors';

//#region app/pages/account/video.vue?vue&type=script&setup=true&lang.ts
var video_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ (0, vue_exports.defineComponent)({
	__name: "video",
	__ssrInlineRender: true,
	setup(__props) {
		(0, vue_exports.ref)();
		(0, vue_exports.ref)();
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<div${(0, server_renderer_exports.ssrRenderAttrs)((0, vue_exports.mergeProps)({ class: "video-chat" }, _attrs))} data-v-ea54efd6><video autoplay playsinline muted data-v-ea54efd6></video><video autoplay playsinline data-v-ea54efd6></video></div>`);
		};
	}
});
//#endregion
//#region app/pages/account/video.vue
var _sfc_setup = video_vue_vue_type_script_setup_true_lang_default.setup;
video_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = (0, vue_exports.useSSRContext)();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/account/video.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var video_default = /*#__PURE__*/ _plugin_vue_export_helper_default(video_vue_vue_type_script_setup_true_lang_default, [["__scopeId", "data-v-ea54efd6"]]);

export { video_default as default };
//# sourceMappingURL=video-BMPlUXNX.mjs.map
