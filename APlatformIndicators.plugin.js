/**
* @name BetterPlatformIndicatorsV6
* @displayName BetterPlatformIndicatorsV6
* @authorId 415849376598982656
* @invite gvA2ree
*/
/*@cc_on
@if (@_jscript)
    
    // Offer to self-install for clueless users that try to run this directly.
    var shell = WScript.CreateObject("WScript.Shell");
    var fs = new ActiveXObject("Scripting.FileSystemObject");
    var pathPlugins = shell.ExpandEnvironmentStrings("%APPDATA%\BetterDiscord\plugins");
    var pathSelf = WScript.ScriptFullName;
    // Put the user at ease by addressing them in the first person
    shell.Popup("It looks like you've mistakenly tried to run me directly. \n(Don't do that!)", 0, "I'm a plugin for BetterDiscord", 0x30);
    if (fs.GetParentFolderName(pathSelf) === fs.GetAbsolutePathName(pathPlugins)) {
        shell.Popup("I'm in the correct folder already.", 0, "I'm already installed", 0x40);
    } else if (!fs.FolderExists(pathPlugins)) {
        shell.Popup("I can't find the BetterDiscord plugins folder.\nAre you sure it's even installed?", 0, "Can't install myself", 0x10);
    } else if (shell.Popup("Should I copy myself to BetterDiscord's plugins folder for you?", 0, "Do you need some help?", 0x34) === 6) {
        fs.CopyFile(pathSelf, fs.BuildPath(pathPlugins, fs.GetFileName(pathSelf)), true);
        // Show the user where to put plugins in the future
        shell.Exec("explorer " + pathPlugins);
        shell.Popup("I'm installed!", 0, "Successfully installed", 0x40);  ////////////////NOT GR0NCHCODE
    }
    WScript.Quit();

@else@*/
module.exports = (() => {
    const config = {
        info: {
            name: "BetterPlatformIndicatorsV6",
            authors: [
                {
                    name: "Strencher, Gr0nch",
                    discord_id: "415849376598982656",
                    github_username: "Strencher",
                    twitter_username: "Strencher3"
                }
            ],
            version: "666",
            description: "Adds indicators like the original, but in a more appealing location (base discord). Source code availble on the repo in the 'src' folder.",
            github: "https://github.com/Strencher/BetterDiscordStuff/blob/master/PlatformIndicators/APlatformIndicators.plugin.js",
            github_raw: "https://raw.githubusercontent.com/Strencher/BetterDiscordStuff/master/PlatformIndicators/APlatformIndicators.plugin.js"
        },
        changelog: [
            {
                title: "v0.0.666",
                type: "fixed",
                items: [
                    "Fixed an issue where the code was shit because i edited a beta version and I fucking suck at programming",
                    "bogos binted"
                ]
            },
            {
                title: "Go support Strencher",
                type: "added",
                items: [
                    "This code has been modified but was created By Strencher, go support him",
                    "https://github.com/Strencher",
                    "https://github.com/Strencher/BetterDiscordStuff/blob/master/PlatformIndicators/APlatformIndicators.plugin.js"
                ]
            }
        ],
        defaultConfig: [
            {
                type: "switch",
                name: "Show in MemberList",
                note: "Shows the platform indicators in the memberlist",
                id: "showInMemberList",
                value: true
            },
            {
                type: "switch",
                name: "Show next to username",
                note: "Shows the platform indicators next the username in messages.",
                id: "showOnMessages",
                value: false
            },
            {
                type: "switch",
                name: "Show in Dmd List",
                note: "Shows the platform indicators in the dm list.",
                id: "showInDmsList",
                value: true
            },
            {
                type: "switch",
                name: "Show next to discord tags",
                note: "Shows the platform indicators right next to the discord tag.",
                id: "showOnTags",
                value: true
            },
            {
                type: "switch",
                name: "Ignore Bots",
                note: "Ignores the status of bots which is always web anyways.",
                id: "ignoreBots",
                value: true
            },
            {
                type: "category",
                name: "icons",
                id: "icons",
                settings: [
                    {
                        type: "switch",
                        name: "Web Icon",
                        note: "Show the Web icon.",
                        id: "web",
                        value: true
                    },
                    {
                        type: "switch",
                        name: "Desktop Icon",
                        note: "Show the Desktop icon.",
                        id: "desktop",
                        value: true
                    },
                    {
                        type: "switch",
                        name: "Mobile Icon",
                        note: "Show the Mobile icon.",
                        id: "mobile",
                        value: true
                    }
                ]
            }
        ]
    };
    //@ts-ignore
    const BdApi = window.BdApi;
    // @ts-ignore
    return !global.ZeresPluginLibrary ? class {
        constructor() {
            this._config = config;
        }
        getName() { return config.info.name; }
        getAuthor() { return config.info.authors.map(a => a.name).join(", "); }
        getDescription() { return config.info.description; }
        getVersion() { return config.info.version; }
        load() {
            BdApi.showConfirmationModal("Library plugin is needed", [`The library plugin needed for ${config.info.name} is missing. Please click Download Now to install it.`], {
                confirmText: "Download",
                cancelText: "Cancel",
                onConfirm: () => {
                    require("request").get("https://rauenzi.github.io/BDPluginLibrary/release/0PluginLibrary.plugin.js", async (error, response, body) => {
                        if (error)
                            return require("electron").shell.openExternal("https://betterdiscord.net/ghdl?url=https://raw.githubusercontent.com/rauenzi/BDPluginLibrary/master/release/0PluginLibrary.plugin.js");
                        await new Promise(r => require("fs").writeFile(require("path").join(BdApi.Plugins.folder, "0PluginLibrary.plugin.js"), body, r));
                    });
                }
            });
        }
        start() { }
        stop() { }
    } : (([Plugin, Api]) => {
        const plugin = (Plugin, Api) => {
            const { Utilities: _utils, WebpackModules: _webpack, PluginUtilities, ReactTools, Patcher, Logger, DOMTools, ReactComponents, DiscordModules: { React, UserStatusStore, UserTypingStore, UserSettingsStore, Dispatcher, WindowInfo, SelectedChannelStore, DiscordConstants: { ActionTypes } } } = Api;
            const fs = require("fs");
            const path = require("path");
            class Utilities extends _utils {
                static joinClassNames(...classNames) {
                    return classNames.filter(Boolean).join(" ");
                }
                static capFirst(text) {
                    return text[0].toUpperCase() + text.slice(1);
                }
            }
            class WebpackModules extends _webpack {
                static getByDefault(displayName) {
                    return this.getModule(m => m.default && m.default.displayName === displayName);
                }
                static searchInDefault(filter) {
                    return this.getModule(m => m.default && filter(m.default));
                }
            }
            const Tooltip = WebpackModules.getByDisplayName("Tooltip");
            const StatusModule = WebpackModules.getByProps("Status", "getStatusMask");
            const Flux = WebpackModules.getByProps("connectStores");
            const { Messages } = WebpackModules.getByProps("Messages", "setLocale");
            const AuthStore = WebpackModules.getByProps("getId", "getEmail");
            class FluxWrapper extends React.Component {
                constructor() {
                    super(...arguments);
                    this.update = () => { this.forceUpdate(); };
                }
                componentDidMount() {
                    if (!Array.isArray(this.props.stores))
                        return;
                    for (const store of this.props.stores) {
                        if (store.addChangeListener)
                            store.addChangeListener(this.update);
                    }
                }
                componentWillUnmount() {
                    if (!Array.isArray(this.props.stores))
                        return;
                    for (const store of this.props.stores) {
                        if (store.addChangeListener)
                            store.removeChangeListener(this.update);
                    }
                }
                render() { return null; }
            }
            const DesktopIcon = React.memo(props => (React.createElement("svg", Object.assign({ className: "PI-indicator PI-icon_desktop", width: "24", height: "24", viewBox: "0 0 24 24" }, props),
                React.createElement("path", { fill: "currentColor", d: "M4 2.5C2.897 2.5 2 3.397 2 4.5V15.5C2 16.604 2.897 17.5 4 17.5H11V19.5H7V21.5H17V19.5H13V17.5H20C21.103 17.5 22 16.604 22 15.5V4.5C22 3.397 21.103 2.5 20 2.5H4ZM20 4.5V13.5H4V4.5H20Z" }))));
            const WebIcon = React.memo(props => (React.createElement("svg", Object.assign({ className: "PI-indicator PI-icon_web", width: "24", height: "24", viewBox: "0 0 24 24" }, props),
                React.createElement("path", { fill: "currentColor", d: "M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM11 19.93C7.05 19.44 4 16.08 4 12C4 11.38 4.08 10.79 4.21 10.21L9 15V16C9 17.1 9.9 18 11 18V19.93ZM17.9 17.39C17.64 16.58 16.9 16 16 16H15V13C15 12.45 14.55 12 14 12H8V10H10C10.55 10 11 9.55 11 9V7H13C14.1 7 15 6.1 15 5V4.59C17.93 5.78 20 8.65 20 12C20 14.08 19.2 15.97 17.9 17.39Z" }))));
            const MobileIcon = React.memo(props => (React.createElement("svg", Object.assign({ className: "PI-indicator PI-icon_mobile", width: "24", height: "24", viewBox: "0 0 24 24" }, props),
                React.createElement("g", { fill: "none" },
                    React.createElement("path", { fill: "currentColor", d: "M15.5 1h-8C6.12 1 5 2.12 5 3.5v17C5 21.88 6.12 23 7.5 23h8c1.38 0 2.5-1.12 2.5-2.5v-17C18 2.12 16.88 1 15.5 1zm-4 21c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm4.5-4H7V4h9v14z" })))));
            const TypingIcon = React.memo(props => {
                return [
                    React.createElement("rect", Object.assign({}, props, { fill: "currentColor", rx: "5", ry: "5", x: "14.5", y: "22", width: "25", height: "10", className: "typing-spinner" })),
                    React.createElement("svg", { x: "18.75", y: "24.5", width: "17.5", height: "5", className: "spinner-dots" },
                        React.createElement("g", { style: { opacity: 1 } },
                            React.createElement("circle", { className: "spinner-dot", cx: "2.5", cy: "2.5", r: "2", fill: "currentColor" }),
                            React.createElement("circle", { className: "spinner-dot dot-2", cx: "8.75", cy: "2.5", r: "2.5", fill: "currentColor" }),
                            React.createElement("circle", { className: "spinner-dot dot-3", cx: "15", cy: "2.5", r: "2.5", fill: "currentColor" })))
                ];
            });
            const Icons = {
                mobile: MobileIcon,
                web: WebIcon,
                desktop: DesktopIcon
            };
            const getClass = (props = [], items = props, exclude = [], selector = false) => {
                const module = WebpackModules.getModule(m => m && props.every(prop => m[prop] !== undefined) && exclude.every(e => m[e] == undefined));
                if (!module)
                    return '';
                return (selector ? '.' : '') + items.map(item => module[item]).join(selector ? '.' : ' ');
            };
            let plugin, currentClientStatus = { desktop: UserSettingsStore.status };
            const StatusIndicators = function StatusIndicators(props) {
                if (!props)
                    return null;
                return (React.createElement("div", { className: Utilities.joinClassNames("PI-indicatorContainer", "PI-type_" + props.type) }, Object.keys(props).filter(e => plugin.settings.icons[e]).map(e => {
                    const color = StatusModule.getStatusColor(props[e]);
                    const Icon = Icons[e];
                    return React.createElement(Tooltip, { text: Utilities.capFirst(e) + ": " + Messages[`STATUS_${(props[e] == "mobile" ? "mobile_online" : props[e]).toUpperCase()}`], position: "top" },
                        React.createElement(Icon, { style: { color }, width: "18", height: "18" }));
                })));
            };
            const classes = {
                avatar: getClass(["container", "muted", "avatar"], ["avatar"]),
                wrapper: getClass(["wrapper", "pointer", "mask"], ["wrapper"]),
                maskSvg: getClass(["wrapper", "pointer", "mask"], ["mask", "svg"]),
                avatar2: getClass(["wrapper", "pointer", "mask"], ["avatar"]),
                chatAvatar: getClass(["sizeEmoji", "wrapper", "compact"], ["avatar"])
            };
            let IndicatorUtils = /** @class */ (() => {
                class IndicatorUtils {
                    static getIndicatorType(indicator) {
                        switch (indicator) {
                            case 0: return "web";
                            case 1: return "desktop";
                            case 2: return "mobile";
                            default: return "offline";
                        }
                    }
                    static getIndicatorValues(platformType) {
                        switch (platformType) {
                            case "web": return { x: 18, y: 18 };
                            case "desktop": return { x: 18, y: 17 };
                            case "mobile": return { x: 10, y: 17 };
                            default: return { x: 0, y: 0 };
                        }
                    }
                    static getIndicatorId(platforms) {
                        const platformKeys = Object.keys(platforms);
                        if (platformKeys.indexOf("mobile") > -1)
                            return 2;
                        if (platformKeys.indexOf("web") > -1)
                            return 0;
                        if (platformKeys.indexOf("desktop") > -1)
                            return 1;
                        return 3;
                    }
                    static getStatusColor(status) {
                        if (status === "dnd")
                            return "#f04747";
                        if (status === "idle")
                            return "#faa61a";
                        if (status === "online")
                            return "#43b581";
                        return "#000000";
                    }
                    static getIndicator(id, isTyping) {
                        if (isTyping)
                            return TypingIcon;
                        switch (id) {
                            case 0: return WebIcon;
                            case 1: return DesktopIcon;
                            case 2: return MobileIcon;
                            default: return () => null;
                        }
                    }
                    static getIndicatorByName(indicatorType) {
                        switch (indicatorType) {
                            case "web": return WebIcon;
                            case "desktop": return DesktopIcon;
                            case "mobile": return MobileIcon;
                            default: return () => null;
                        }
                    }
                    static getIndicatorSizes(indicatorName, place) {
                        var _a;
                        return (_a = this.indicatorTypes[place]) === null || _a === void 0 ? void 0 : _a[indicatorName];
                    }
                    static getMaskUrl(indicatorType, size = 32, isTyping) {
                        if (isTyping)
                            return `url(#svg-mask-avatar-typing-round-${size})`;
                        return `url(#svg-mask-avatar-status-round-${size}-${indicatorType})`;
                    }
                }
                IndicatorUtils.indicatorTypes = {
                    memberlist: {
                        web: { height: 15, width: 15, viewBox: "0 0 24 24", x: 18, y: 18 },
                        desktop: { height: 15, width: 15, viewBox: "0 0 24 24", x: 18, y: 17 },
                        mobile: { height: 15, width: 15, viewBox: "0 0 16 23", x: 17, y: 17 },
                        size: 32
                    },
                    userpopout: {
                        web: { width: 10, height: 10 },
                        desktop: { width: 10, height: 10, x: 18, y: 20 },
                        mobile: { width: 12, height: 12, x: 20, y: 18 },
                        size: 80
                    },
                    userprofile: {
                        web: { width: 10, height: 10 },
                        desktop: { width: 10, height: 10, x: 18, y: 20 },
                        mobile: { width: 12, height: 12, x: 20, y: 18 },
                        size: 80
                    },
                    dmlist: {
                        web: { height: 15, width: 15, viewBox: "0 0 24 24", x: 18, y: 18 },
                        desktop: { height: 15, width: 15, viewBox: "0 0 24 24", x: 18, y: 17 },
                        mobile: { height: 15, width: 15, viewBox: "0 0 16 23", x: 17, y: 17 },
                        size: 32
                    },
                    chat: {
                        web: { height: 15, width: 15, viewBox: "0 0 24 24", x: 18, y: 18 },
                        desktop: { height: 15, width: 15, viewBox: "0 0 24 24", x: 18, y: 17 },
                        mobile: { height: 15, width: 15, viewBox: "0 0 24 24", x: 17, y: 17 },
                        size: 40,
                        className: classes.chatAvatar
                    },
                    friendslist: {
                        web: { height: 15, width: 15, viewBox: "0 0 24 24", x: 18, y: 18 },
                        desktop: { height: 15, width: 15, viewBox: "0 0 24 24", x: 18, y: 17 },
                        mobile: { height: 15, width: 15, viewBox: "0 0 16 23", x: 17, y: 17 },
                        size: 32,
                        className: "friendsAvatar"
                    },
                    playingheader: {
                        web: { height: 15, width: 15, viewBox: "0 0 24 24", x: 18, y: 18 },
                        desktop: { height: 15, width: 15, viewBox: "0 0 24 24", x: 18, y: 17 },
                        mobile: { height: 15, width: 15, viewBox: "0 0 16 23", x: 17, y: 17 },
                        size: 32,
                    }
                };
                return IndicatorUtils;
            })();
            class ExtendedAvatar extends FluxWrapper {
                constructor() {
                    super(...arguments);
                    this.state = {
                        mouseOver: false
                    };
                }
                get platforms() { return plugin.getClients(this.props.userId); }
                renderOtherPlatforms() {
                    return Object.keys(this.platforms).map((key, i) => {
                        const IndicatorType = IndicatorUtils.getIndicatorByName(key);
                        return React.createElement(IndicatorType, { color: IndicatorUtils.getStatusColor(this.platforms[key]) });
                    });
                }
                onMouseOver() {
                    this.setState({ mouseOver: true });
                }
                onMouseOut() {
                    this.setState({ mouseOver: false });
                }
                render() {
                    var _a;
                    const indicator = IndicatorUtils.getIndicatorId(this.platforms);
                    const isTyping = UserTypingStore.isTyping(SelectedChannelStore.getChannelId(), this.props.userId);
                    const IndicatorComponent = IndicatorUtils.getIndicator(indicator, isTyping);
                    const shownIndicator = IndicatorUtils.getIndicatorType(indicator);
                    const status = this.platforms[shownIndicator];
                    const size = IndicatorUtils.indicatorTypes[this.props.type].size;
                    const className = IndicatorUtils.indicatorTypes[this.props.type].className;
                    return React.createElement("div", Object.assign({}, ((_a = this.props.controls) !== null && _a !== void 0 ? _a : {}), { className: Utilities.joinClassNames(classes.wrapper, className), role: "img", style: { height: size, width: size }, onMouseOver: this.onMouseOver.bind(this), onMouseOut: this.onMouseOut.bind(this) }),
                        React.createElement("svg", { width: "40", height: "32", viewBox: "0 0 40 32", className: classes.maskSvg },
                            React.createElement("foreignObject", { x: "0", y: "0", width: "30", height: "30", mask: IndicatorUtils.getMaskUrl(shownIndicator, size, isTyping) },
                                React.createElement("img", { src: this.props.getSrc(this.state.mouseOver ? "gif" : "png"), className: classes.avatar2 })),
                            React.createElement(Tooltip, { text: this.renderOtherPlatforms(), position: "top" }, props => React.createElement(IndicatorComponent, Object.assign({}, props, IndicatorUtils.getIndicatorValues(IndicatorUtils.getIndicatorType(indicator)), IndicatorUtils.getIndicatorSizes(shownIndicator, this.props.type), { color: IndicatorUtils.getStatusColor(status) })))));
                }
            }
            return class BetterPlatformIndicatorsV6 extends Plugin {
                constructor() {
                    super(...arguments);
                    this.css = `
                    /*.PI-indicatorContainer {
                        display: inline-flex;
                    }

                    .PI-indicatorContainer svg {
                        margin-left: 2px;
                    }

                    .header-23xsNx {
                        display: flex !important;
                        flex-direction: row !important;
                    }

                    .PI-container {
                        display: flex;
                    }*/

                    .${classes.chatAvatar} {
                        overflow: visible;
                    }

                    .PI-indicator, .typing-spinner, .${classes.wrapper} {
                        pointer-events: all;
                    }

                    .friendsAvatar {
                        margin-right: 8px;
                    }
                    
                    .spinner-dots {
                        z-index: 9;
                        height: 100%;
                        width: 100%;
                    }
                    
                    .spinner-dot {
                        animation: dot 1.4s ease-in-out infinite;
                        opacity: .3;
                        color: #ddd;
                    }
                    
                    .spinner-dot:nth-of-type(2) {
                        animation-delay: .2s;
                    }
                    
                    .spinner-dot:nth-of-type(3) {
                        animation-delay: .4s;
                    }
                    
                    @keyframes dot {
                        0% {
                            opacity: 1;
                        }
                    
                        50% {
                            opacity: .2;
                        }
                    
                        to {
                            opacity: 1;
                        }
                    }
                `;
                    this.getSettingsPanel = () => {
                        return this.buildSettingsPanel().getElement();
                    };
                    this.ON_PRESENCE_UPDATE = ({ user, clientStatus }) => {
                        if (user.id != AuthStore.getId())
                            return;
                        currentClientStatus = clientStatus;
                        UserStatusStore.emitChange();
                    };
                }
                getClients(userId) {
                    const isSelf = userId == AuthStore.getId();
                    const status = isSelf ? currentClientStatus : UserStatusStore.getState().clientStatuses[userId];
                    return status !== null && status !== void 0 ? status : {};
                }
                onStart() {
                    // for people can't figure out
                    const oldPath = path.join(BdApi.Plugins.folder, "PlatformIndicators.plugin.js");
                    if (fs.existsSync(oldPath)) {
                        try {
                            fs.unlinkSync(oldPath);
                        }
                        catch (error) {
                            Logger.error("Failed to remove old plugin file!\n", error);
                        }
                    }
                    plugin = this;
                    PluginUtilities.addStyle(config.info.name, this.css);
                    this.injectMasks();
                    this.patchUserPopout();
                    this.patchUserProfile();
                    this.patchMemberListItem();
                    this.patchDmList();
                    this.patchMessageHeader();
                    this.patchDefaultAvatar();
                    this.patchPlayingHeader();
                    // Utilities.suppressErrors(this.patchMessageHeader.bind(this))();
                    // Utilities.suppressErrors(this.patchMemberListItem.bind(this))();
                    // Utilities.suppressErrors(this.patchDmList.bind(this))();
                    // Utilities.suppressErrors(this.patchDiscordTag.bind(this))();
                    Dispatcher.subscribe(ActionTypes.PRESENCE_UPDATE, this.ON_PRESENCE_UPDATE);
                }
                injectMasks() {
                    if (document.querySelector("[pi-mask]"))
                        return;
                    document.querySelector("#app-mount svg").insertAdjacentHTML("beforeend", `
                        <!-- Size: 32 -->
                        <mask pi-mask id="svg-mask-avatar-status-round-32-desktop" maskContentUnits="objectBoundingBox" viewBox="0 0 1 1"><circle fill="white" cx="0.5" cy="0.5" r="0.5"></circle><rect fill="black" x="0.50750" y="0.4775" width="0.6" height="0.65625" rx="0.13125" ry="0.13125"></rect></mask>
                        <mask pi-mask id="svg-mask-avatar-status-round-32-mobile" maskContentUnits="objectBoundingBox" viewBox="0 0 1 1"><circle fill="white" cx="0.5" cy="0.5" r="0.5"></circle><rect fill="black" x="0.59375" y="0.4375" width="0.5" height="0.65625" rx="0.13125" ry="0.13125"></rect></mask>
                        <mask pi-mask id="svg-mask-avatar-status-round-32-web" maskContentUnits="objectBoundingBox" viewBox="0 0 1 1"><circle fill="white" cx="0.5" cy="0.5" r="0.5"></circle><circle fill="black" cx="0.84375" cy="0.84375" r="0.35"></circle></mask>
                        <mask pi-mask id="svg-mask-avatar-typing-round-32" maskContentUnits="objectBoundingBox" viewBox="0 0 1 1"><circle fill="white" cx="0.5" cy="0.5" r="0.5"></circle><rect fill="black" x="0.375" y="0.6" width="0.95" height="0.5" rx="0.25" ry="0.25"></rect></mask>
                        <mask pi-mask id="svg-mask-avatar-status-round-32-offline" maskContentUnits="objectBoundingBox" viewBox="0 0 1 1"><circle fill="white" cx="0.5" cy="0.5" r="0.5"></circle></mask>
                        
                        <!-- Size: 40 -->
                        <mask pi-mask id="svg-mask-avatar-status-round-40-desktop" maskContentUnits="objectBoundingBox" viewBox="0 0 1 1"><circle fill="white" cx="0.5" cy="0.5" r="0.5"></circle><rect fill="black" x="0.50750" y="0.4775" width="0.6" height="0.65625" rx="0.13125" ry="0.13125"></rect></mask>
                        <mask pi-mask id="svg-mask-avatar-status-round-40-mobile" maskContentUnits="objectBoundingBox" viewBox="0 0 1 1"><circle fill="white" cx="0.5" cy="0.5" r="0.5"></circle><rect fill="black" x="0.59375" y="0.4375" width="0.5" height="0.65625" rx="0.13125" ry="0.13125"></rect></mask>
                        <mask pi-mask id="svg-mask-avatar-status-round-40-web" maskContentUnits="objectBoundingBox" viewBox="0 0 1 1"><circle fill="white" cx="0.5" cy="0.5" r="0.5"></circle><circle fill="black" cx="0.84375" cy="0.84375" r="0.35"></circle></mask>
                        <mask pi-mask id="svg-mask-avatar-typing-round-40" maskContentUnits="objectBoundingBox" viewBox="0 0 1 1"><circle fill="white" cx="0.5" cy="0.5" r="0.5"></circle><rect fill="black" x="0.375" y="0.6" width="0.95" height="0.5" rx="0.25" ry="0.25"></rect></mask>
                        <mask pi-mask id="svg-mask-avatar-status-round-40-offline" maskContentUnits="objectBoundingBox" viewBox="0 0 1 1"><circle fill="white" cx="0.5" cy="0.5" r="0.5"></circle></mask>
                        
                        <!-- Size: 80 -->
                        <mask pi-mask id="svg-mask-avatar-status-round-80-desktop" maskContentUnits="objectBoundingBox" viewBox="0 0 1 1"><circle fill="white" cx="0.5" cy="0.5" r="0.5"></circle><rect fill="black" x="0.54750" y="0.6275" width="0.6" height="0.65625" rx="0.13125" ry="0.13125"></rect></mask>
                        <mask pi-mask id="svg-mask-avatar-status-round-80-mobile" maskContentUnits="objectBoundingBox" viewBox="0 0 1 1"><circle fill="white" cx="0.5" cy="0.5" r="0.5"></circle><rect fill="black" x="0.68375" y="0.5575" width="0.5" height="0.65625" rx="0.13125" ry="0.13125"></rect></mask>
                        <mask pi-mask id="svg-mask-avatar-status-round-80-web" maskContentUnits="objectBoundingBox" viewBox="0 0 1 1"><circle fill="white" cx="0.5" cy="0.5" r="0.5"></circle><circle fill="black" cx="0.76375" cy="0.76375" r="0.20"></circle></mask>
                        <mask pi-mask id="svg-mask-avatar-typing-round-80" maskContentUnits="objectBoundingBox" viewBox="0 0 1 1"><circle fill="white" cx="0.5" cy="0.5" r="0.5"></circle><rect fill="black" x="0.375" y="0.6" width="0.95" height="0.5" rx="0.25" ry="0.25"></rect></mask>
                        <mask pi-mask id="svg-mask-avatar-status-round-80-offline" maskContentUnits="objectBoundingBox" viewBox="0 0 1 1"><circle fill="white" cx="0.5" cy="0.5" r="0.5"></circle></mask>
                    `);
                    // for crash recovers
                    DOMTools.onRemoved(document.querySelector("[pi-mask]"), () => {
                        this.injectMasks();
                    });
                }
                patchMemberListItem() {
                    const MemberListItem = WebpackModules.getByDisplayName("MemberListItem");
                    Patcher.after(MemberListItem.prototype, "renderAvatar", (thisObject, [user]) => {
                        return React.createElement(ExtendedAvatar, { userId: user.id, getSrc: () => user.getAvatarURL(thisObject.state.hovered ? "gif" : "png"), type: "memberlist" });
                    });
                    this.forceUpdate(getClass(["member"], ["member"], [], true));
                }
                async patchUserPopout() {
                    const ConnectedUserPopout = WebpackModules.getModule(m => { var _a; return ((_a = m === null || m === void 0 ? void 0 : m.default) === null || _a === void 0 ? void 0 : _a.displayName) === "ConnectedUserPopout"; });
                    const selector = getClass(["userPopout"], ["userPopout"], [], true);
                    const unpatch = Patcher.after(ConnectedUserPopout, "default", (_, __, ret) => {
                        unpatch();
                        ReactComponents.push(ret.type, selector);
                    });
                    const UserPopout = await ReactComponents.getComponentByName("UserPopout", selector);
                    Patcher.after(UserPopout.component.prototype, "renderHeader", (_this, _, ret) => {
                        const tree = Utilities.getNestedProp(ret, "props.children.0.props.children.0.props");
                        tree.children = [
                            React.createElement(ExtendedAvatar, { stores: [UserTypingStore, UserStatusStore], type: "userpopout", userId: _this.props.user.id, getSrc: type => _this.props.user.getAvatarURL(type) })
                        ];
                    });
                }
                async patchUserProfile() {
                    const UserProfile = await ReactComponents.getComponentByName("UserProfileBody", getClass(["root", "topSectionNormal", "topSectionStreaming"], ["root"], [], true));
                    Patcher.after(UserProfile.component.prototype, "renderHeader", (_this, _, ret) => {
                        var _a;
                        if (!Array.isArray((_a = ret === null || ret === void 0 ? void 0 : ret.props) === null || _a === void 0 ? void 0 : _a.children))
                            return;
                        ret.props.children[0] = React.createElement(ExtendedAvatar, { type: "userprofile", userId: _this.props.user.id, getSrc: type => _this.props.user.getAvatarURL(type), stores: [UserTypingStore, UserStatusStore] });
                    });
                }
                patchDefaultAvatar() {
                    const defaultAvatar = WebpackModules.findAll(m => { var _a; return (m === null || m === void 0 ? void 0 : m.Sizes) && ((_a = m.default) === null || _a === void 0 ? void 0 : _a.type); })[1];
                    Patcher.after(defaultAvatar.default, "type", (_, [{ user, animate }]) => {
                        return React.createElement(ExtendedAvatar, { type: "friendslist", userId: user.id, getSrc: () => user.getAvatarURL(animate ? "gif" : "png"), stores: [UserStatusStore] });
                    });
                }
                 patchMessageHeader() {
                    const Message = WebpackModules.searchInDefault(m => m.toString().search("childrenRepliedMessage") > -1);
                    const Popout = WebpackModules.getByDisplayName("Popout");
                    const ConnectedUserPopout = WebpackModules.getModule(m => { var _a; return ((_a = m === null || m === void 0 ? void 0 : m.default) === null || _a === void 0 ? void 0 : _a.displayName) === "ConnectedUserPopout"; });
                    const unpatch = Patcher.after(Message, "default", (_, __, ret) => {
                        const originalMessage = Utilities.findInReactTree(ret, c => { var _a; return (_a = c === null || c === void 0 ? void 0 : c.props) === null || _a === void 0 ? void 0 : _a.subscribeToGroupId; });
                        if (!originalMessage)
                            return;

                             if (!this.settings.showOnMessages)
                            return;

                        unpatch(); // Unpatch after we found the original message
                        Patcher.after(originalMessage.type, "type", (_, __, ret) => {
                            const old = ret.type;
                            ret.type = function ({ message }) {
                                const ret = old.apply(this, arguments);
                                ret.props.children[0] = React.createElement(Popout, { spacing: 8, nudgeAlignIntoViewport: true, autoInvert: true, animation: "3", shouldShow: null, position: "right", renderPopout: e => {
                                        var _a;
                                        return React.createElement(ConnectedUserPopout.default, Object.assign({ channelId: message.channel_id, guildId: (_a = Api.DiscordModules.ChannelStore.getChannel(message.channel_id)) === null || _a === void 0 ? void 0 : _a.guild_id, userId: message.author.id }, e));
                                    } }, props => {
                                    return React.createElement(ExtendedAvatar, { type: "chat", controls: props, userId: message.author.id, getSrc: type => message.author.getAvatarURL(type), stores: [UserTypingStore, UserStatusStore] });
                                });
                                return ret;
                            };
                        });
                    });
                }


                patchDmList() {
                    var _a;
                    const { default: PrivateChannel } = (_a = WebpackModules.getModule(m => { var _a; return ((_a = m === null || m === void 0 ? void 0 : m.default) === null || _a === void 0 ? void 0 : _a.displayName) === "PrivateChannel"; })) !== null && _a !== void 0 ? _a : {};
                    Patcher.after(PrivateChannel.prototype, "renderAvatar", (_this, _, ret) => {
                        if (!_this.props.user)
                            return;
                        return React.createElement(ExtendedAvatar, { type: "dmlist", userId: _this.props.user.id, getSrc: type => _this.props.user.getAvatarURL(type), stores: [UserStatusStore, UserTypingStore] });
                    });
                    this.forceUpdate(getClass(["privateChannels"], ["privateChannels"], [], true));
                }
                patchPlayingHeader() {
                    const NowPlayingHeader = WebpackModules.getModule(m => { var _a; return ((_a = m.default) === null || _a === void 0 ? void 0 : _a.displayName) === "NowPlayingHeader"; });
                    Patcher.after(NowPlayingHeader, "default", (_, args, ret) => {
                        const old = ret.type;
                        ret.type = function (props) {
                            const ret = old.apply(this, arguments);
                            const user = props.priorityUser.user;
                            if (!user)
                                return ret;
                            ret.props.children[0] = React.createElement(ExtendedAvatar, { type: "playingheader", userId: user.id, controls: { onContentMenu: props.onContextMenu }, getSrc: type => user.getAvatarURL(type), stores: [UserStatusStore] });
                            return ret;
                        };
                    });
                }
                forceUpdate(selector) {
                    const nodes = document.querySelectorAll(selector);
                    if (!nodes.length)
                        return;
                    for (const node of nodes) {
                        const instance = ReactTools.getOwnerInstance(node);
                        if (!instance)
                            return;
                        instance.forceUpdate();
                    }
                }
                onStop() {
                    Patcher.unpatchAll();
                    PluginUtilities.removeStyle(config.info.name);
                    Dispatcher.unsubscribe(ActionTypes.PRESENCE_UPDATE, this.ON_PRESENCE_UPDATE);
                    document.querySelectorAll("[pi-mask]").forEach(e => e.remove());
                }
            };
        };
        return plugin(Plugin, Api);
        //@ts-ignore
    })(global.ZeresPluginLibrary.buildPlugin(config));
})();
/*@end@*/ 

