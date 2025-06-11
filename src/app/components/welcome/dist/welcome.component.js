"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
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
};
exports.__esModule = true;
exports.WelcomeComponent = void 0;
var core_1 = require("@angular/core");
var standalone_1 = require("@ionic/angular/standalone");
var common_1 = require("@angular/common");
var forms_1 = require("@angular/forms");
var WelcomeComponent = /** @class */ (function () {
    function WelcomeComponent(router, animationCtrl, authService) {
        this.router = router;
        this.animationCtrl = animationCtrl;
        this.authService = authService;
        this.showWelcomeText = false;
        this.showSubText = false;
        this.showButton = false;
        this.showConfetti = false;
        this.hasNavigated = false;
    }
    WelcomeComponent.prototype.ngOnInit = function () {
        this.startGraduationSequence();
    };
    WelcomeComponent.prototype.ionViewDidEnter = function () {
        this.playGraduationAnimation();
    };
    WelcomeComponent.prototype.startGraduationSequence = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: 
                    // Wait for mortarboard animation to complete
                    return [4 /*yield*/, this.delay(1200)];
                    case 1:
                        // Wait for mortarboard animation to complete
                        _a.sent();
                        // Start confetti
                        this.showConfetti = true;
                        // Show congratulations text
                        return [4 /*yield*/, this.delay(500)];
                    case 2:
                        // Show congratulations text
                        _a.sent();
                        this.showWelcomeText = true;
                        // Show subtitle
                        return [4 /*yield*/, this.delay(800)];
                    case 3:
                        // Show subtitle
                        _a.sent();
                        this.showSubText = true;
                        // Show continue button
                        return [4 /*yield*/, this.delay(1000)];
                    case 4:
                        // Show continue button
                        _a.sent();
                        this.showButton = true;
                        // Auto-navigate after 5 seconds if user doesn't click
                        setTimeout(function () {
                            if (!_this.hasNavigated) {
                                _this.navigateToDashboard();
                            }
                        }, 8000);
                        return [2 /*return*/];
                }
            });
        });
    };
    WelcomeComponent.prototype.playGraduationAnimation = function () {
        var logoElement = document.querySelector('.cap-svg');
        var backgroundElement = document.querySelector('.animated-background');
        if (logoElement) {
            // MASTERING logo entrance animation
            var logoAnimation = this.animationCtrl
                .create()
                .addElement(logoElement)
                .duration(1500)
                .easing('cubic-bezier(0.4, 0.0, 0.2, 1)')
                .keyframes([
                { offset: 0, transform: 'scale(0.3) rotate(-180deg)', opacity: '0' },
                { offset: 0.4, transform: 'scale(1.1) rotate(0deg)', opacity: '1' },
                { offset: 0.7, transform: 'scale(0.95) rotate(5deg)', opacity: '1' },
                { offset: 1, transform: 'scale(1) rotate(0deg)', opacity: '1' }
            ]);
            logoAnimation.play();
        }
        if (backgroundElement) {
            // Background entrance animation
            var bgAnimation = this.animationCtrl
                .create()
                .addElement(backgroundElement)
                .duration(2000)
                .easing('ease-out')
                .fromTo('opacity', '0.6', '1')
                .fromTo('transform', 'scale(1.1)', 'scale(1)');
            bgAnimation.play();
        }
    };
    WelcomeComponent.prototype.navigateToDashboard = function () {
        return __awaiter(this, void 0, void 0, function () {
            var logoElement, pageElement, exitLogoAnimation;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.hasNavigated)
                            return [2 /*return*/];
                        this.hasNavigated = true;
                        logoElement = document.querySelector('.cap-svg');
                        pageElement = document.querySelector('.graduation-container');
                        if (!logoElement) return [3 /*break*/, 2];
                        exitLogoAnimation = this.animationCtrl
                            .create()
                            .addElement(logoElement)
                            .duration(600)
                            .easing('ease-in')
                            .fromTo('transform', 'scale(1) rotate(0deg)', 'scale(1.3) rotate(15deg)')
                            .fromTo('opacity', '1', '0');
                        return [4 /*yield*/, exitLogoAnimation.play()];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        // Page fade out with modern scaling
                        if (pageElement) {
                            setTimeout(function () { return __awaiter(_this, void 0, void 0, function () {
                                var exitAnimation;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            exitAnimation = this.animationCtrl
                                                .create()
                                                .addElement(pageElement)
                                                .duration(500)
                                                .easing('ease-in')
                                                .fromTo('opacity', '1', '0')
                                                .fromTo('transform', 'scale(1)', 'scale(0.95)');
                                            return [4 /*yield*/, exitAnimation.play()];
                                        case 1:
                                            _a.sent();
                                            // Navigate to dashboard
                                            // Navigate to dashboard
                                            this.authService.loadUserFromToken();
                                            this.role = this.authService.getUserRole();
                                            if (!(this.role === "CORDINATEUR")) return [3 /*break*/, 3];
                                            return [4 /*yield*/, this.router.navigate(['/coordinator-dashboard'], {
                                                    replaceUrl: true
                                                })];
                                        case 2:
                                            _a.sent();
                                            return [3 /*break*/, 9];
                                        case 3:
                                            if (!(this.role === 'CANDIDAT')) return [3 /*break*/, 5];
                                            return [4 /*yield*/, this.router.navigate(['/candidat-dashboard'], {
                                                    replaceUrl: true
                                                })];
                                        case 4:
                                            _a.sent();
                                            return [3 /*break*/, 9];
                                        case 5:
                                            if (!(this.role === 'JURY')) return [3 /*break*/, 7];
                                            return [4 /*yield*/, this.router.navigate(['/jury-dashboard'], {
                                                    replaceUrl: true
                                                })];
                                        case 6:
                                            _a.sent();
                                            return [3 /*break*/, 9];
                                        case 7: return [4 /*yield*/, this.router.navigate(['/unauthorized'], {
                                                replaceUrl: true
                                            })];
                                        case 8:
                                            _a.sent();
                                            _a.label = 9;
                                        case 9: return [2 /*return*/];
                                    }
                                });
                            }); }, 2000);
                        }
                        else {
                            // Fallback navigation
                            setTimeout(function () {
                                _this.router.navigate(['/dashboard'], { replaceUrl: true });
                            }, 400);
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    WelcomeComponent.prototype.delay = function (ms) {
        return new Promise(function (resolve) { return setTimeout(resolve, ms); });
    };
    WelcomeComponent = __decorate([
        core_1.Component({
            selector: 'app-welcome',
            templateUrl: './welcome.component.html',
            styleUrls: ['./welcome.component.scss'],
            standalone: true,
            imports: [
                common_1.CommonModule,
                forms_1.FormsModule,
                standalone_1.IonContent,
                standalone_1.IonItem,
                standalone_1.IonLabel,
                standalone_1.IonInput,
                standalone_1.IonButton,
                standalone_1.IonText,
                standalone_1.IonSpinner,
                standalone_1.IonIcon,
                standalone_1.IonSpinner
            ]
        })
    ], WelcomeComponent);
    return WelcomeComponent;
}());
exports.WelcomeComponent = WelcomeComponent;
