"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.EvaluationComponent = void 0;
var core_1 = require("@angular/core");
// import { Router } from '@angular/router';
var standalone_1 = require("@ionic/angular/standalone");
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { ActivatedRoute } from '@angular/router';
// import { forkJoin } from 'rxjs';
// // import { MatSnackBar } from '@angular/material/snack-bar';
// // import { MatDatepickerModule } from '@angular/material/datepicker';
// // import { MatInputModule } from '@angular/material/input';
// // import { MatNativeDateModule } from '@angular/material/core';
// // import { MatFormFieldModule } from '@angular/material/form-field';
// // import { Evaluation, FiltresEvaluation } from './evaluation.model';
// // import { EvaluationService } from '../services/evaluation.service';
var EvaluationComponent = /** @class */ (function () {
    function EvaluationComponent() {
    }
    EvaluationComponent = __decorate([
        core_1.Component({
            selector: 'app-evaluation',
            templateUrl: './evaluation.component.html',
            styleUrls: ['./evaluation.component.scss'],
            imports: [standalone_1.IonIcon],
            standalone: true
        })
    ], EvaluationComponent);
    return EvaluationComponent;
}());
exports.EvaluationComponent = EvaluationComponent;
