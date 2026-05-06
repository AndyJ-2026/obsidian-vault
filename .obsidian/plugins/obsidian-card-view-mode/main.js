'use strict';

var obsidian = require('obsidian');

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    if (typeof b !== "function" && b !== null)
        throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

var DEFAULT_SETTINGS = {
    disabled: true,
    cardTitle: false,
    cardCornerRadius: 10,
    cardTitleCornerRadius: 5,
    cardDropShadow: true,
    removePaneBoundaries: true,
    hideScrollBar: true,
    colorBackGroundLight: "255, 255, 255",
    colorBackGroundDark: "145, 145, 145",
    colorActiveCardLight: "255, 255, 255",
    colorActiveCardDark: "71, 71, 71",
    colorNonActiveCardDark: "71, 71, 71",
    colorNonActiveCardLight: "255, 255, 255",
    colorTitleCardEdgeDark: "227, 76, 38",
    colorTitleCardEdgeLight: "123, 230, 1",
    colorTitleCardBackGroundLight: "242, 242, 242",
    colorTitleCardBackGroundDark: "0, 0, 0",
    colorDiffBetweenActive: 0,
    colorCardBorderLight: "255, 255, 255",
    colorCardBorderDark: "0, 0, 0"
};
var CardViewModeSettingTab = /** @class */ (function (_super) {
    __extends(CardViewModeSettingTab, _super);
    function CardViewModeSettingTab(app, plugin) {
        var _this = _super.call(this, app, plugin) || this;
        _this.plugin = plugin;
        return _this;
    }
    CardViewModeSettingTab.prototype.display = function () {
        this.containerEl.empty();
        this.containerEl.createEl("h3", {
            text: "General Settings",
        });
        this.addSettingToggleCardView();
        this.addSettingToggleCardTitle();
        this.containerEl.createEl("h3", {
            text: "Card View Designer",
        });
        this.addSettingToggleRemovePaneBoundariies();
        this.addSettingHideScrollbar();
        this.addSettingToggleDropShadow();
        this.addSettingCardCornerRadius();
        this.addSettingCardTitleCornerRadius();
        this.containerEl.createEl("h4", {
            text: "Dark Mode Color",
        });
        this.addSettingBackgroundColorDark();
        this.addSettingActiveCardColorDark();
        this.addSettingCardBorderColorDark();
        this.addSettingCardTitleBackgroundColorDark();
        this.addSettingCardTitleEdgeColorDark();
        // detail summary
        // this.containerEl.createEl("details", {
        //   text: ""
        // }).createEl("summary", {
        //   text: "Dark mode",
        // });
        this.containerEl.createEl("h4", {
            text: "Light Mode Color"
        });
        this.addSettingBackgroundColorLight();
        this.addSettingActiveCardColorLight();
        this.addSettingCardBorderColorLight();
        this.addSettingCardTitleBackgroundColorLight();
        this.addSettingCardTitleEdgeColorLight();
        this.containerEl.createEl("h3", {
            text: "Attention Pane",
        });
        this.addSettingDiffBetActiveNonactive();
    };
    CardViewModeSettingTab.prototype.addSettingToggleCardView = function () {
        var _this = this;
        new obsidian.Setting(this.containerEl)
            .setName("Toggle Card View")
            .setDesc("Turns card view mode on or off globally.")
            .addToggle(function (toggle) { return toggle.setValue(!_this.plugin.settings.disabled)
            .onChange(function (value) {
            _this.plugin.settings.disabled = !value;
            _this.plugin.saveData(_this.plugin.settings);
            if (_this.plugin.settings.disabled) {
                _this.plugin.disable();
            }
            else {
                _this.plugin.enable();
            }
        }); });
    };
    CardViewModeSettingTab.prototype.addSettingToggleCardTitle = function () {
        var _this = this;
        new obsidian.Setting(this.containerEl)
            .setName("Toggle Title Card")
            .setDesc("View note titles as cards. Enable this option with Embedded Note Title Plugin.")
            .addToggle(function (toggle) { return toggle.setValue(_this.plugin.settings.cardTitle)
            .onChange(function (value) {
            _this.plugin.settings.cardTitle = value;
            _this.plugin.saveData(_this.plugin.settings);
            _this.plugin.refresh();
        }); });
    };
    CardViewModeSettingTab.prototype.addSettingToggleRemovePaneBoundariies = function () {
        var _this = this;
        new obsidian.Setting(this.containerEl)
            .setName("Remove Pane Boundaries")
            .setDesc("When toggled, pane boundaries will be removed.")
            .addToggle(function (toggle) { return toggle.setValue(_this.plugin.settings.removePaneBoundaries)
            .onChange(function (value) {
            _this.plugin.settings.removePaneBoundaries = value;
            _this.plugin.saveData(_this.plugin.settings);
            _this.plugin.refresh();
        }); });
    };
    CardViewModeSettingTab.prototype.addSettingHideScrollbar = function () {
        var _this = this;
        new obsidian.Setting(this.containerEl)
            .setName("Hide scrollbar")
            .setDesc("When toggled, scrollbar will be removed.")
            .addToggle(function (toggle) { return toggle.setValue(_this.plugin.settings.hideScrollBar)
            .onChange(function (value) {
            _this.plugin.settings.hideScrollBar = value;
            _this.plugin.saveData(_this.plugin.settings);
            _this.plugin.refresh();
        }); });
    };
    CardViewModeSettingTab.prototype.addSettingToggleDropShadow = function () {
        var _this = this;
        new obsidian.Setting(this.containerEl)
            .setName("Drop Shadow")
            .setDesc("When toggled, dropping shadow to cards will be activated.")
            .addToggle(function (toggle) { return toggle.setValue(_this.plugin.settings.cardDropShadow)
            .onChange(function (value) {
            _this.plugin.settings.cardDropShadow = value;
            _this.plugin.saveData(_this.plugin.settings);
            _this.plugin.refresh();
        }); });
    };
    CardViewModeSettingTab.prototype.addSettingCardCornerRadius = function () {
        var _this = this;
        new obsidian.Setting(this.containerEl)
            .setName('Card Corner Radius')
            .setDesc('Set number to adjust card corner radius. Default radius is 10px.')
            .addText(function (text) { return text.setPlaceholder('Default: 10px')
            .setValue((_this.plugin.settings.cardCornerRadius || '') + '')
            .onChange(function (value) {
            var nu = Number(value);
            _this.plugin.settings.cardCornerRadius = nu;
            _this.plugin.saveData(_this.plugin.settings);
            _this.plugin.refresh();
        }); });
    };
    CardViewModeSettingTab.prototype.addSettingCardTitleCornerRadius = function () {
        var _this = this;
        new obsidian.Setting(this.containerEl)
            .setName('Title Card Corner Radius')
            .setDesc('Set number to adjust title card corner radius. Default radius is 5px.')
            .addText(function (text) { return text.setPlaceholder('Default: 5px')
            .setValue((_this.plugin.settings.cardTitleCornerRadius || '') + '')
            .onChange(function (value) {
            var nu = Number(value);
            _this.plugin.settings.cardTitleCornerRadius = nu;
            _this.plugin.saveData(_this.plugin.settings);
            _this.plugin.refresh();
        }); });
    };
    CardViewModeSettingTab.prototype.addSettingCardBorderColorLight = function () {
        var _this = this;
        new obsidian.Setting(this.containerEl)
            .setName("Card Border Color")
            .controlEl.createEl("input", {
            type: "color",
            value: rgbToHex(this.plugin.settings.colorCardBorderLight)
        }, function (el) {
            el.value = rgbToHex(_this.plugin.settings.colorCardBorderLight);
            el.oninput = function (_a) {
                var target = _a.target;
                var color = hexToRgb(target.value);
                if (!color)
                    return;
                _this.plugin.settings.colorCardBorderLight = color.r + ", " + color.g + ", " + color.b;
                _this.plugin.saveData(_this.plugin.settings);
                _this.plugin.refresh();
            };
        });
    };
    CardViewModeSettingTab.prototype.addSettingCardBorderColorDark = function () {
        var _this = this;
        new obsidian.Setting(this.containerEl)
            .setName("Card Border Color")
            .controlEl.createEl("input", {
            type: "color",
            value: rgbToHex(this.plugin.settings.colorCardBorderDark)
        }, function (el) {
            el.value = rgbToHex(_this.plugin.settings.colorCardBorderDark);
            el.oninput = function (_a) {
                var target = _a.target;
                var color = hexToRgb(target.value);
                if (!color)
                    return;
                _this.plugin.settings.colorCardBorderDark = color.r + ", " + color.g + ", " + color.b;
                _this.plugin.saveData(_this.plugin.settings);
                _this.plugin.refresh();
            };
        });
    };
    CardViewModeSettingTab.prototype.addSettingBackgroundColorLight = function () {
        var _this = this;
        new obsidian.Setting(this.containerEl)
            .setName("Background Color")
            .controlEl.createEl("input", {
            type: "color",
            value: rgbToHex(this.plugin.settings.colorBackGroundLight)
        }, function (el) {
            el.value = rgbToHex(_this.plugin.settings.colorBackGroundLight);
            el.oninput = function (_a) {
                var target = _a.target;
                var color = hexToRgb(target.value);
                if (!color)
                    return;
                _this.plugin.settings.colorBackGroundLight = color.r + ", " + color.g + ", " + color.b;
                _this.plugin.saveData(_this.plugin.settings);
                _this.plugin.refresh();
            };
        });
    };
    CardViewModeSettingTab.prototype.addSettingBackgroundColorDark = function () {
        var _this = this;
        new obsidian.Setting(this.containerEl)
            .setName("Background Color")
            .controlEl.createEl("input", {
            type: "color",
            value: rgbToHex(this.plugin.settings.colorBackGroundDark)
        }, function (el) {
            el.value = rgbToHex(_this.plugin.settings.colorBackGroundDark);
            el.oninput = function (_a) {
                var target = _a.target;
                var color = hexToRgb(target.value);
                if (!color)
                    return;
                _this.plugin.settings.colorBackGroundDark = color.r + ", " + color.g + ", " + color.b;
                _this.plugin.saveData(_this.plugin.settings);
                _this.plugin.refresh();
            };
        });
    };
    CardViewModeSettingTab.prototype.addSettingActiveCardColorLight = function () {
        var _this = this;
        new obsidian.Setting(this.containerEl)
            .setName("Active Card Color")
            .controlEl.createEl("input", {
            type: "color",
            value: rgbToHex(this.plugin.settings.colorActiveCardLight)
        }, function (el) {
            el.value = rgbToHex(_this.plugin.settings.colorActiveCardLight);
            el.oninput = function (_a) {
                var target = _a.target;
                var color = hexToRgb(target.value);
                if (!color)
                    return;
                _this.plugin.settings.colorActiveCardLight = color.r + ", " + color.g + ", " + color.b;
                _this.plugin.settings.colorNonActiveCardLight = color.r - _this.plugin.settings.colorDiffBetweenActive + ", " + (color.g - _this.plugin.settings.colorDiffBetweenActive) + ", " + (color.b - _this.plugin.settings.colorDiffBetweenActive);
                _this.plugin.saveData(_this.plugin.settings);
                _this.plugin.refresh();
            };
        });
    };
    CardViewModeSettingTab.prototype.addSettingActiveCardColorDark = function () {
        var _this = this;
        new obsidian.Setting(this.containerEl)
            .setName("Active Card Color")
            .controlEl.createEl("input", {
            type: "color",
            value: rgbToHex(this.plugin.settings.colorActiveCardDark)
        }, function (el) {
            el.value = rgbToHex(_this.plugin.settings.colorActiveCardDark);
            el.oninput = function (_a) {
                var target = _a.target;
                var color = hexToRgb(target.value);
                if (!color)
                    return;
                _this.plugin.settings.colorActiveCardDark = color.r + ", " + color.g + ", " + color.b;
                _this.plugin.settings.colorNonActiveCardDark = color.r - _this.plugin.settings.colorDiffBetweenActive + ", " + (color.g - _this.plugin.settings.colorDiffBetweenActive) + ", " + (color.b - _this.plugin.settings.colorDiffBetweenActive);
                _this.plugin.saveData(_this.plugin.settings);
                _this.plugin.refresh();
            };
        });
    };
    CardViewModeSettingTab.prototype.addSettingCardTitleEdgeColorDark = function () {
        var _this = this;
        new obsidian.Setting(this.containerEl)
            .setName("Title Card Edge Color")
            .controlEl.createEl("input", {
            type: "color",
            value: rgbToHex(this.plugin.settings.colorTitleCardEdgeDark)
        }, function (el) {
            el.value = rgbToHex(_this.plugin.settings.colorTitleCardEdgeDark);
            el.oninput = function (_a) {
                var target = _a.target;
                var color = hexToRgb(target.value);
                if (!color)
                    return;
                _this.plugin.settings.colorTitleCardEdgeDark = color.r + ", " + color.g + ", " + color.b;
                _this.plugin.saveData(_this.plugin.settings);
                _this.plugin.refresh();
            };
        });
    };
    CardViewModeSettingTab.prototype.addSettingCardTitleEdgeColorLight = function () {
        var _this = this;
        new obsidian.Setting(this.containerEl)
            .setName("Title Card Edge Color")
            .controlEl.createEl("input", {
            type: "color",
            value: rgbToHex(this.plugin.settings.colorTitleCardEdgeLight)
        }, function (el) {
            el.value = rgbToHex(_this.plugin.settings.colorTitleCardEdgeLight);
            el.oninput = function (_a) {
                var target = _a.target;
                var color = hexToRgb(target.value);
                if (!color)
                    return;
                _this.plugin.settings.colorTitleCardEdgeLight = color.r + ", " + color.g + ", " + color.b;
                _this.plugin.saveData(_this.plugin.settings);
                _this.plugin.refresh();
            };
        });
    };
    CardViewModeSettingTab.prototype.addSettingCardTitleBackgroundColorLight = function () {
        var _this = this;
        new obsidian.Setting(this.containerEl)
            .setName("Title Card Background Color")
            .controlEl.createEl("input", {
            type: "color",
            value: rgbToHex(this.plugin.settings.colorTitleCardBackGroundLight)
        }, function (el) {
            el.value = rgbToHex(_this.plugin.settings.colorTitleCardBackGroundLight);
            el.oninput = function (_a) {
                var target = _a.target;
                var color = hexToRgb(target.value);
                if (!color)
                    return;
                _this.plugin.settings.colorTitleCardBackGroundLight = color.r + ", " + color.g + ", " + color.b;
                _this.plugin.saveData(_this.plugin.settings);
                _this.plugin.refresh();
            };
        });
    };
    CardViewModeSettingTab.prototype.addSettingCardTitleBackgroundColorDark = function () {
        var _this = this;
        new obsidian.Setting(this.containerEl)
            .setName("Title Card Background Color")
            .controlEl.createEl("input", {
            type: "color",
            value: rgbToHex(this.plugin.settings.colorTitleCardBackGroundDark)
        }, function (el) {
            el.value = rgbToHex(_this.plugin.settings.colorTitleCardBackGroundDark);
            el.oninput = function (_a) {
                var target = _a.target;
                var color = hexToRgb(target.value);
                if (!color)
                    return;
                _this.plugin.settings.colorTitleCardBackGroundDark = color.r + ", " + color.g + ", " + color.b;
                _this.plugin.saveData(_this.plugin.settings);
                _this.plugin.refresh();
            };
        });
    };
    // SLIDER setting
    // new Setting(containerEl)
    //   .setName('Diff Between Active & NonActive Cards')
    //   .setDesc('Spcifiy Color difference between active & non active cards. Set 0 to diable "Attention pane"')
    //   .addSlider(slider => slider
    //     .setLimits(100, 100, 5)
    //     .setValue(this.plugin.settings.colorDiffBetweenActive)
    //     .onChange((value) => {
    //       this.plugin.settings.colorDiffBetweenActive = value;
    //       let activeColorLight = hexToRgb(rgbToHex(this.plugin.settings.colorActiveCardDark));
    //       let activeColorDark = hexToRgb(rgbToHex(this.plugin.settings.colorActiveCardDark));
    //       this.plugin.settings.colorNonActiveCardLight = `${activeColorLight.r - value}, ${activeColorLight.g - value}, ${activeColorLight.b - value}`;
    //       this.plugin.settings.colorNonActiveCardDark = `${activeColorDark.r - value}, ${activeColorDark.g - value}, ${activeColorDark.b - value}`;
    //       this.plugin.saveData(this.plugin.settings);
    //       this.plugin.refresh();
    //     })
    // );
    CardViewModeSettingTab.prototype.addSettingDiffBetActiveNonactive = function () {
        var _this = this;
        new obsidian.Setting(this.containerEl)
            .setName('Diff Between Active & NonActive Cards')
            .setDesc('Set Color difference between active & non active cards. Set this value 0 to diable "Attention pane". Value range: "-255~255".')
            .addText(function (text) { return text.setPlaceholder('Default: 0')
            .setValue((_this.plugin.settings.colorDiffBetweenActive || '') + '')
            .onChange(function (value) {
            var nu = Number(value);
            _this.plugin.settings.colorDiffBetweenActive = nu;
            var activeColorLight = hexToRgb(rgbToHex(_this.plugin.settings.colorActiveCardLight));
            var activeColorDark = hexToRgb(rgbToHex(_this.plugin.settings.colorActiveCardDark));
            _this.plugin.settings.colorNonActiveCardLight = activeColorLight.r - nu + ", " + (activeColorLight.g - nu) + ", " + (activeColorLight.b - nu);
            _this.plugin.settings.colorNonActiveCardDark = activeColorDark.r - nu + ", " + (activeColorDark.g - nu) + ", " + (activeColorDark.b - nu);
            _this.plugin.saveData(_this.plugin.settings);
            _this.plugin.refresh();
        }); });
    };
    return CardViewModeSettingTab;
}(obsidian.PluginSettingTab));
var CardViewModeCommands = /** @class */ (function () {
    function CardViewModeCommands(plugin) {
        this.plugin = plugin;
    }
    CardViewModeCommands.prototype.addToggleSettingCommand = function (id, name, settingName) {
        var _this = this;
        this.plugin.addCommand({
            id: id,
            name: name,
            callback: function () {
                // switch the setting, save and refresh
                //@ts-ignore
                _this.plugin.settings[settingName] = !_this.plugin.settings[settingName];
                _this.plugin.saveData(_this.plugin.settings);
                _this.plugin.refresh();
            }
        });
    };
    CardViewModeCommands.prototype.addCommands = function () {
        var _this = this;
        this.plugin.addCommand({
            id: 'toggle-card-view-mode',
            name: 'Toggle Card View',
            callback: function () {
                // switch the disabled setting and save
                _this.plugin.settings.disabled = !_this.plugin.settings.disabled;
                _this.plugin.saveData(_this.plugin.settings);
                _this.plugin.settings.disabled ? _this.plugin.disable() : _this.plugin.enable();
            }
        });
        this.addToggleSettingCommand('toggle-card-title', 'Toggle Title Card', 'cardTitle');
    };
    return CardViewModeCommands;
}());
function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
        ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        }
        : null;
}
function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}
function rgbToHex(rgb) {
    var result = /^(\d+),\s?(\d+),\s?(\d+)/i.exec(rgb);
    if (!result || !result.length) {
        return "";
    }
    return "#" + componentToHex(Number(result[1])) + componentToHex(Number(result[2])) + componentToHex(Number(result[3]));
}

var CardViewModePlugin = /** @class */ (function (_super) {
    __extends(CardViewModePlugin, _super);
    function CardViewModePlugin() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.style = document.head.createEl('style');
        _this.enable = function () {
            _this.app.workspace.onLayoutReady(_this.reallyEnable);
        };
        _this.reallyEnable = function () {
            _this.addStyle();
        };
        _this.disable = function () {
            _this.removeStyle();
        };
        _this.refresh = function () {
            _this.updateStyle();
        };
        _this.removeStyle = function () {
            var el = _this.style;
            if (el)
                el.remove();
            document.body.classList.remove('plugin-card-view-mode');
            document.body.classList.remove('plugin-card-view-mode-cardtitle');
            document.body.classList.remove('plugin-card-view-mode-dropshadow');
            document.body.classList.remove('plugin-card-view-mode-remove-pane-boudaries');
            document.body.classList.remove('plugin-card-view-mode-hide-scrollbar');
        };
        _this.addStyle = function () {
            _this.style.setAttribute('type', 'text/css');
            // add style in head tag
            document.getElementsByTagName("head")[0].appendChild(_this.style);
            document.body.classList.add('plugin-card-view-mode');
            _this.updateStyle();
        };
        _this.updateStyle = function () {
            // a. update boolean settings
            document.body.classList.toggle('plugin-card-view-mode-cardtitle', _this.settings.cardTitle);
            document.body.classList.toggle('plugin-card-view-mode-dropshadow', _this.settings.cardDropShadow);
            document.body.classList.toggle('plugin-card-view-mode-remove-pane-boudaries', _this.settings.removePaneBoundaries);
            document.body.classList.toggle('plugin-card-view-mode-hide-scrollbar', _this.settings.hideScrollBar);
            // b. update custom css properties
            var el = _this.style;
            if (!el)
                throw "plugin-card-view-mode element not found!";
            else {
                el.textContent = "\n        body.plugin-card-view-mode {\n          --cardview-card-boarder-radius: " + _this.settings.cardCornerRadius + "px;\n          --cardview-embedded-title-boarder-radius: " + _this.settings.cardTitleCornerRadius + "px;\n        }\n        body.plugin-card-view-mode.theme-light{\n          --cardview-card-color-active: rgb(" + _this.settings.colorActiveCardLight + ");\n          --cardview-card-color-non-active: rgb(" + _this.settings.colorNonActiveCardLight + ");\n          --cardview-background-color-default: rgb(" + _this.settings.colorBackGroundLight + ");\n          --header-color-background: rgb(" + _this.settings.colorTitleCardBackGroundLight + ");\n          --cardview-border-color: rgb(" + _this.settings.colorCardBorderLight + ");\n          --cardview-embedded-title-border-right-color-edit: rgb(" + _this.settings.colorTitleCardEdgeLight + ");\n          --cardview-embedded-title-border-right-color-preview: rgb(" + _this.settings.colorTitleCardEdgeLight + ");\n        }\n        body.plugin-card-view-mode.theme-dark{\n          --cardview-card-color-active: rgb(" + _this.settings.colorActiveCardDark + ");\n          --cardview-card-color-non-active: rgb(" + _this.settings.colorNonActiveCardDark + ");\n          --cardview-background-color-default: rgb(" + _this.settings.colorBackGroundDark + ");\n          --header-color-background: rgb(" + _this.settings.colorTitleCardBackGroundDark + ");\n          --cardview-border-color: rgb(" + _this.settings.colorCardBorderDark + ");\n          --cardview-embedded-title-border-right-color-edit: rgb(" + _this.settings.colorTitleCardEdgeDark + ");\n          --cardview-embedded-title-border-right-color-preview: rgb(" + _this.settings.colorTitleCardEdgeDark + ");\n        }\n        ";
            }
        };
        return _this;
    }
    CardViewModePlugin.prototype.onload = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.loadSettings()];
                    case 1:
                        _a.sent();
                        if (!this.settings.disabled)
                            this.enable();
                        this.addSettingTab(new CardViewModeSettingTab(this.app, this));
                        new CardViewModeCommands(this).addCommands();
                        return [2 /*return*/];
                }
            });
        });
    };
    CardViewModePlugin.prototype.onunload = function () {
        this.disable();
    };
    CardViewModePlugin.prototype.loadSettings = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b, _c, _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        _a = this;
                        _c = (_b = Object).assign;
                        _d = [DEFAULT_SETTINGS];
                        return [4 /*yield*/, this.loadData()];
                    case 1:
                        _a.settings = _c.apply(_b, _d.concat([_e.sent()]));
                        return [2 /*return*/];
                }
            });
        });
    };
    return CardViewModePlugin;
}(obsidian.Plugin));

module.exports = CardViewModePlugin;


/* nosourcemap */