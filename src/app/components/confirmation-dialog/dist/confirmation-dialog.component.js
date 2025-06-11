"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
exports.__esModule = true;
exports.ConfirmationDialogComponent = void 0;
var core_1 = require("@angular/core");
var dialog_1 = require("@angular/material/dialog");
var button_1 = require("@angular/material/button");
var angular_1 = require("@ionic/angular");
var ConfirmationDialogComponent = /** @class */ (function () {
    function ConfirmationDialogComponent(dialogRef, data, route, snackBar) {
        this.dialogRef = dialogRef;
        this.data = data;
        this.route = route;
        this.snackBar = snackBar;
    }
    ConfirmationDialogComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.queryParams.subscribe(function (params) {
            if (params['suppressionSuccess'] === '1') {
                _this.snackBar.open('Évaluation supprimée.', 'OK', { duration: 3000, panelClass: 'snackbar-success' });
            }
        });
    };
    ConfirmationDialogComponent.prototype.onCancel = function () {
        this.dialogRef.close(false);
    };
    ConfirmationDialogComponent.prototype.onConfirm = function () {
        this.dialogRef.close(true);
    };
    ConfirmationDialogComponent = __decorate([
        core_1.Component({
            selector: 'app-confirmation-dialog',
            templateUrl: './confirmation-dialog.component.html',
            styleUrls: ['./confirmation-dialog.component.scss'],
            standalone: true,
            imports: [
                dialog_1.MatDialogModule,
                button_1.MatButtonModule,
                angular_1.IonicModule
            ]
        }),
        __param(1, core_1.Inject(dialog_1.MAT_DIALOG_DATA))
    ], ConfirmationDialogComponent);
    return ConfirmationDialogComponent;
}());
exports.ConfirmationDialogComponent = ConfirmationDialogComponent;
