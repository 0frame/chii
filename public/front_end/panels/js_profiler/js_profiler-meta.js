import*as r from"../../core/i18n/i18n.js";import*as o from"../../ui/legacy/legacy.js";const e={profiler:"Profiler",showProfiler:"Show Profiler",startStopRecording:"Start/stop recording"},i=r.i18n.registerUIStrings("panels/js_profiler/js_profiler-meta.ts",e),t=r.i18n.getLazilyComputedLocalizedString.bind(void 0,i);let n;async function a(){return n||(n=await import("../profiler/profiler.js")),n}o.ViewManager.registerViewExtension({location:"panel",id:"js_profiler",title:t(e.profiler),commandPrompt:t(e.showProfiler),order:65,loadView:async()=>(await a()).ProfilesPanel.JSProfilerPanel.instance()}),o.ActionRegistration.registerActionExtension({actionId:"profiler.js-toggle-recording",category:o.ActionRegistration.ActionCategory.JAVASCRIPT_PROFILER,title:t(e.startStopRecording),iconClass:"largeicon-start-recording",toggleable:!0,toggledIconClass:"largeicon-stop-recording",toggleWithRedColor:!0,contextTypes(){return r=r=>[r.ProfilesPanel.JSProfilerPanel],void 0===n?[]:r(n);var r},loadActionDelegate:async()=>(await a()).ProfilesPanel.JSProfilerPanel.instance(),bindings:[{platform:"windows,linux",shortcut:"Ctrl+E"},{platform:"mac",shortcut:"Meta+E"}]});
