import*as n from"../../core/common/common.js";import*as e from"../../core/host/host.js";import*as t from"../../core/i18n/i18n.js";import*as i from"../../core/sdk/sdk.js";import*as o from"../../ui/legacy/components/utils/utils.js";const r={main:"Main"},a=t.i18n.registerUIStrings("entrypoints/js_app/JsMain.ts",r),s=t.i18n.getLocalizedString.bind(void 0,a);let c;class g{static instance(n={forceNew:null}){const{forceNew:e}=n;return c&&!e||(c=new g),c}async run(){e.userMetrics.actionTaken(e.UserMetrics.Action.ConnectToNodeJSDirectly),i.Connections.initMainConnection((async()=>{i.TargetManager.TargetManager.instance().createTarget("main",s(r.main),i.Target.Type.Node,null).runtimeAgent().invoke_runIfWaitingForDebugger()}),o.TargetDetachedDialog.TargetDetachedDialog.webSocketConnectionLost)}}n.Runnable.registerEarlyInitializationRunnable(g.instance);export{g as JsMainImpl};
