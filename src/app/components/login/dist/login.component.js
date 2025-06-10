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
exports.LoginComponent = void 0;
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var forms_1 = require("@angular/forms");
var standalone_1 = require("@ionic/angular/standalone");
var LoginComponent = /** @class */ (function () {
    function LoginComponent(authService, router, alertController, toastController) {
        this.authService = authService;
        this.router = router;
        this.alertController = alertController;
        this.toastController = toastController;
        this.email = '';
        this.password = '';
        this.isLoading = false;
        this.role = '';
    }
    LoginComponent.prototype.ngOnInit = function () {
    };
    LoginComponent.prototype.onLogin = function () {
        return __awaiter(this, void 0, void 0, function () {
            var credentials;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(!this.email || !this.password)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.showAlert('Erreur', 'Veuillez remplir tous les champs')];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                    case 2:
                        this.isLoading = true;
                        credentials = {
                            email: this.email,
                            password: this.password
                        };
                        this.authService.login(credentials).subscribe({
                            next: function (response) { return __awaiter(_this, void 0, void 0, function () {
                                var token, message;
                                var _a, _b;
                                return __generator(this, function (_c) {
                                    switch (_c.label) {
                                        case 0:
                                            this.isLoading = false;
                                            token = (_a = response.body) === null || _a === void 0 ? void 0 : _a.token;
                                            if (!token) return [3 /*break*/, 3];
                                            this.authService.saveTokenInSessionStorage(response); // ou adapte selon ta logique
                                            this.authService.loadUserFromToken();
                                            this.role = this.authService.getUserRole();
                                            console.log(this.role);
                                            return [4 /*yield*/, this.showToast('Connexion réussie!', 'success')];
                                        case 1:
                                            _c.sent();
                                            return [4 /*yield*/, this.router.navigate(['/welcome'])];
                                        case 2:
                                            _c.sent();
                                            return [3 /*break*/, 5];
                                        case 3:
                                            message = ((_b = response.body) === null || _b === void 0 ? void 0 : _b.message) || 'Erreur de connexion';
                                            return [4 /*yield*/, this.showAlert('Erreur', message)];
                                        case 4:
                                            _c.sent();
                                            _c.label = 5;
                                        case 5: return [2 /*return*/];
                                    }
                                });
                            }); },
                            error: function (error) { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            this.isLoading = false;
                                            return [4 /*yield*/, this.showAlert('Erreur de connexion', error)];
                                        case 1:
                                            _a.sent();
                                            return [2 /*return*/];
                                    }
                                });
                            }); }
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    LoginComponent.prototype.showAlert = function (header, message) {
        return __awaiter(this, void 0, void 0, function () {
            var alert;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertController.create({
                            header: header,
                            message: message,
                            buttons: ['OK']
                        })];
                    case 1:
                        alert = _a.sent();
                        return [4 /*yield*/, alert.present()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    LoginComponent.prototype.showToast = function (message, color) {
        if (color === void 0) { color = 'success'; }
        return __awaiter(this, void 0, void 0, function () {
            var toast;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.toastController.create({
                            message: message,
                            duration: 2000,
                            color: color,
                            position: 'top'
                        })];
                    case 1:
                        toast = _a.sent();
                        return [4 /*yield*/, toast.present()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    LoginComponent = __decorate([
        core_1.Component({
            selector: 'app-login',
            templateUrl: './login.component.html',
            styleUrls: ['./login.component.scss'],
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
                standalone_1.IonSpinner
            ]
        })
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;
