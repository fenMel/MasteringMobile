"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.VoirDecisionComponent = void 0;
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var angular_1 = require("@ionic/angular");
var VoirDecisionComponent = /** @class */ (function () {
    function VoirDecisionComponent(route, decisionService, router, location) {
        this.route = route;
        this.decisionService = decisionService;
        this.router = router;
        this.location = location;
        this.decision = null;
    }
    VoirDecisionComponent.prototype.ngOnInit = function () {
        var _this = this;
        var _a;
        var navigation = this.router.getCurrentNavigation();
        var stateDecision = (_a = navigation === null || navigation === void 0 ? void 0 : navigation.extras.state) === null || _a === void 0 ? void 0 : _a['decision'];
        if (stateDecision) {
            this.decision = stateDecision;
        }
        else {
            // fallback HTTP si pas de state
            var id = this.route.snapshot.paramMap.get('id');
            if (id) {
                this.decisionService.getDecisionById(+id).subscribe({
                    next: function (data) { return _this.decision = data; }
                });
            }
        }
    };
    VoirDecisionComponent.prototype.getStatutColor = function (decision) {
        switch ((decision.verdict || '').toUpperCase()) {
            case 'ADMIS': return 'success';
            case 'NON_ADMIS': return 'danger';
            case 'RATTRAPAGE': return 'warning';
            default: return 'medium';
        }
    };
    VoirDecisionComponent.prototype.retourArriere = function () {
        this.location.back();
    };
    __decorate([
        core_1.Input()
    ], VoirDecisionComponent.prototype, "decision");
    VoirDecisionComponent = __decorate([
        core_1.Component({
            selector: 'app-voir-decision',
            standalone: true,
            imports: [
                common_1.CommonModule,
                angular_1.IonicModule
            ],
            templateUrl: './voir-decision.component.html',
            styleUrls: ['./voir-decision.component.scss']
        })
    ], VoirDecisionComponent);
    return VoirDecisionComponent;
}());
exports.VoirDecisionComponent = VoirDecisionComponent;
