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
exports.AuthService = void 0;
var core_1 = require("@angular/core");
var environment_1 = require("../../environments/environment");
var angular_jwt_1 = require("@auth0/angular-jwt");
var AuthService = /** @class */ (function () {
    function AuthService(http, router) {
        this.http = http;
        this.router = router;
        this.apiUrl = environment_1.environment.apiUrl;
        this.currentUser = null;
        // Pour compatibilité avec certains guards
        this.currentUserSubject = {
            value: this.getCurrentUser()
        };
    }
    AuthService.prototype.isBrowser = function () {
        return typeof window !== 'undefined' && typeof sessionStorage !== 'undefined';
    };
    AuthService.prototype.login = function (user) {
        return this.http.post(this.apiUrl + "/login_with_jwt", user, { observe: 'response' });
    };
    AuthService.prototype.saveTokenInSessionStorage = function (token) {
        if (this.isBrowser()) {
            this.jwtToken = token.body.token;
            localStorage.setItem('access_token', this.jwtToken);
            var jwtHelper = new angular_jwt_1.JwtHelperService();
            var decodedToken = jwtHelper.decodeToken(this.jwtToken);
            // Correction ici : on prend le premier champ d'id trouvé
            this.currentUser = {
                id: decodedToken.userId || decodedToken.id || decodedToken.uid,
                username: decodedToken.sub,
                roles: decodedToken.roles.map(function (r) { return r.authority || r; })
            };
            localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
        }
    };
    AuthService.prototype.loadSessionData = function () {
        if (this.isBrowser()) {
            this.jwtToken = localStorage.getItem('access_token');
            var user = localStorage.getItem('currentUser');
            if (user) {
                this.currentUser = JSON.parse(user);
            }
        }
    };
    /** Recharge l'utilisateur courant depuis le token (pour compatibilité avec l'ancien code) */
    AuthService.prototype.loadUserFromToken = function () {
        this.loadSessionData();
    };
    AuthService.prototype.getCurrentUser = function () {
        if (this.currentUser) {
            return this.currentUser;
        }
        if (this.isBrowser()) {
            var user = localStorage.getItem('currentUser');
            if (user) {
                this.currentUser = JSON.parse(user);
                return this.currentUser;
            }
        }
        return null;
    };
    AuthService.prototype.getToken = function () {
        return this.jwtToken;
    };
    AuthService.prototype.getTokenFromSessionStorage = function () {
        if (this.isBrowser()) {
            this.jwtToken = localStorage.getItem('access_token');
        }
    };
    AuthService.prototype.getUsernameFromTokenSessionStorage = function () {
        if (this.jwtToken == null) {
            this.getTokenFromSessionStorage();
        }
        var jwtHelper = new angular_jwt_1.JwtHelperService();
        return jwtHelper.decodeToken(this.jwtToken).sub;
    };
    AuthService.prototype.getRolesFromTokenSessionStorage = function () {
        if (this.jwtToken == null) {
            this.getTokenFromSessionStorage();
        }
        var jwtHelper = new angular_jwt_1.JwtHelperService();
        return jwtHelper.decodeToken(this.jwtToken).roles;
    };
    AuthService.prototype.decodeMyToken = function () {
        if (this.jwtToken == null) {
            this.getTokenFromSessionStorage();
        }
        var jwtHelper = new angular_jwt_1.JwtHelperService();
        this.roles = jwtHelper.decodeToken(this.jwtToken).roles;
        this.username = jwtHelper.decodeToken(this.jwtToken).sub;
    };
    AuthService.prototype.isConnected = function () {
        if (this.jwtToken == null) {
            this.getTokenFromSessionStorage();
        }
        if (this.jwtToken == null) {
            return null;
        }
        else {
            var jwtHelper = new angular_jwt_1.JwtHelperService();
            this.roles = jwtHelper.decodeToken(this.jwtToken).roles;
            this.username = jwtHelper.decodeToken(this.jwtToken).sub;
            var user = { username: this.username, roles: this.roles };
            var isExpired = jwtHelper.isTokenExpired(this.jwtToken);
            if (!isExpired) {
                return user;
            }
            else {
                return null;
            }
        }
    };
    // isRole : COORDINATEUR, CANDIDAT, JURY, APPRENANT, SUPERVISOR, SUPPORT_STAFF
    AuthService.prototype.isCoordinateur = function () {
        if (this.jwtToken == null) {
            this.getTokenFromSessionStorage();
        }
        var jwtHelper = new angular_jwt_1.JwtHelperService();
        var roles = jwtHelper.decodeToken(this.jwtToken).roles;
        // Si les rôles sont des objets avec une propriété "authority"
        if (roles && roles.length > 0 && roles[0].authority) {
            return roles.some(function (role) { return role.authority === 'CORDINATEUR'; });
        }
        // Si les rôles sont des chaînes simples
        return roles && roles.includes('CORDINATEUR');
    };
    AuthService.prototype.isCandidat = function () {
        if (this.jwtToken == null) {
            this.getTokenFromSessionStorage();
        }
        var jwtHelper = new angular_jwt_1.JwtHelperService();
        var decodedToken = jwtHelper.decodeToken(this.jwtToken);
        // console.log("Token décodé:", decodedToken);
        var roles = decodedToken.roles;
        // console.log("Structure des rôles:", JSON.stringify(roles));
        // Vérifier si roles est un tableau d'objets avec authority
        if (roles && Array.isArray(roles) && roles.length > 0 && roles[0].authority) {
            var result = roles.some(function (role) { return role.authority === 'CANDIDAT'; });
            // console.log("Vérification par authority:", result);
            return result;
        }
        // Vérifier si roles est un tableau de chaînes
        if (roles && Array.isArray(roles)) {
            var result = roles.includes('CANDIDAT');
            // console.log("Vérification par chaîne:", result);
            return result;
        }
        // Vérification plus générique
        // console.log("Aucune méthode de vérification n'a fonctionné");
        return false;
    };
    AuthService.prototype.isJury = function () {
        if (this.jwtToken == null) {
            this.getTokenFromSessionStorage();
        }
        var jwtHelper = new angular_jwt_1.JwtHelperService();
        var roles = jwtHelper.decodeToken(this.jwtToken).roles;
        // Si les rôles sont des objets avec une propriété "authority"
        if (roles && roles.length > 0 && roles[0].authority) {
            return roles.some(function (role) { return role.authority === 'JURY'; });
        }
        // Si les rôles sont des chaînes simples
        return roles && roles.includes('JURY');
    };
    AuthService.prototype.isApprenant = function () {
        if (this.jwtToken == null) {
            this.getTokenFromSessionStorage();
        }
        var jwtHelper = new angular_jwt_1.JwtHelperService();
        var roles = jwtHelper.decodeToken(this.jwtToken).roles;
        return roles.includes('APPRENANT');
    };
    AuthService.prototype.isSupervisor = function () {
        if (this.jwtToken == null) {
            this.getTokenFromSessionStorage();
        }
        var jwtHelper = new angular_jwt_1.JwtHelperService();
        var roles = jwtHelper.decodeToken(this.jwtToken).roles;
        return roles.includes('SUPERVISOR');
    };
    AuthService.prototype.isSupportStaff = function () {
        if (this.jwtToken == null) {
            this.getTokenFromSessionStorage();
        }
        var jwtHelper = new angular_jwt_1.JwtHelperService();
        var roles = jwtHelper.decodeToken(this.jwtToken).roles;
        return roles.includes('SUPPORT_STAFF');
    };
    /** Retourne le rôle principal de l'utilisateur courant */
    AuthService.prototype.getUserRole = function () {
        var user = this.getCurrentUser();
        if (!user)
            return null;
        // Si roles est un tableau d'objets
        if (user.roles && user.roles.length && typeof user.roles[0] === 'object') {
            return user.roles[0].authority || null;
        }
        // Si roles est un tableau de chaînes
        if (user.roles && user.roles.length && typeof user.roles[0] === 'string') {
            return user.roles[0];
        }
        return null;
    };
    /** Vérifie si l'utilisateur est authentifié */
    AuthService.prototype.isAuthenticated = function () {
        return !!this.getCurrentUser();
    };
    /** Redirige l'utilisateur selon son rôle */
    AuthService.prototype.redirectUserByRole = function () {
        return __awaiter(this, void 0, void 0, function () {
            var role;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        role = this.getUserRole();
                        if (!(role === 'CANDIDAT')) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.router.navigate(['/dashboard/candidat'])];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 8];
                    case 2:
                        if (!(role === 'JURY')) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.router.navigate(['/dashboard/jury'])];
                    case 3:
                        _a.sent();
                        return [3 /*break*/, 8];
                    case 4:
                        if (!(role === 'CORDINATEUR')) return [3 /*break*/, 6];
                        return [4 /*yield*/, this.router.navigate(['/dashboard/coordinator'])];
                    case 5:
                        _a.sent();
                        return [3 /*break*/, 8];
                    case 6: return [4 /*yield*/, this.router.navigate(['/login'])];
                    case 7:
                        _a.sent();
                        _a.label = 8;
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    AuthService.prototype.logout = function () {
        localStorage.removeItem('access_token');
        localStorage.removeItem('currentUser');
        this.currentUser = null;
        this.jwtToken = null;
        this.router.navigateByUrl('/login');
    };
    AuthService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], AuthService);
    return AuthService;
}());
exports.AuthService = AuthService;
