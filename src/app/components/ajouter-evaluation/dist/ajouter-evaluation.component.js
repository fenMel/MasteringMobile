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
exports.AjouterEvaluationComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var common_1 = require("@angular/common"); // Import DatePipe
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var snack_bar_1 = require("@angular/material/snack-bar");
var dialog_1 = require("@angular/material/dialog");
var button_1 = require("@angular/material/button");
var confirmation_dialog_component_1 = require("../confirmation-dialog/confirmation-dialog.component");
var standalone_1 = require("@ionic/angular/standalone");
var angular_1 = require("@ionic/angular");
var AjouterEvaluationComponent = /** @class */ (function () {
    function AjouterEvaluationComponent(fb, router, route, evaluationService, authService, snackBar, dialog, location, modalCtrl) {
        this.fb = fb;
        this.router = router;
        this.route = route;
        this.evaluationService = evaluationService;
        this.authService = authService;
        this.snackBar = snackBar;
        this.dialog = dialog;
        this.location = location;
        this.modalCtrl = modalCtrl;
        this.candidat = {};
        this.loading = true;
        this.error = null;
        this.noteFinale = 0;
        this.evaluationId = null;
        this.candidatId = null;
        this.juryId = null;
        this.isViewMode = false;
        this.modeVoir = false;
        this.contributions = {};
        this.evaluationLoadedData = null;
        this.filtreStatut = '';
        this.destroy$ = new rxjs_1.Subject();
        this.isDeleting = false;
        this.deleteTimeout = null;
        this.evaluationForm = this.fb.group({
            note_clarte: ['', [forms_1.Validators.required, forms_1.Validators.min(0), forms_1.Validators.max(20)]],
            note_contenu: ['', [forms_1.Validators.required, forms_1.Validators.min(0), forms_1.Validators.max(20)]],
            note_pertinence: ['', [forms_1.Validators.required, forms_1.Validators.min(0), forms_1.Validators.max(20)]],
            note_presentation: ['', [forms_1.Validators.required, forms_1.Validators.min(0), forms_1.Validators.max(20)]],
            note_reponses: ['', [forms_1.Validators.required, forms_1.Validators.min(0), forms_1.Validators.max(20)]],
            commentaire: ['', [forms_1.Validators.required, forms_1.Validators.minLength(5)]]
        });
    }
    AjouterEvaluationComponent.prototype.ngOnInit = function () {
        var _this = this;
        var _a;
        var currentUser = this.authService.getCurrentUser();
        if (!(currentUser === null || currentUser === void 0 ? void 0 : currentUser.id)) {
            this.error = "Erreur: ID du jury non disponible.";
            this.loading = false;
            return;
        }
        this.juryId = currentUser.id;
        // Attempt to get evaluationId and candidatId from service first (if set by a previous route)
        this.evaluationId = this.evaluationService.getSelectedEvaluationId();
        this.candidatId = this.evaluationService.getSelectedCandidatId();
        this.modeVoir = this.isViewMode = this.evaluationService.getViewMode();
        if (this.modeVoir)
            this.evaluationForm.disable();
        if (this.candidatId) {
            // If candidatId is already set (e.g., from a list selection)
            this.chargerDonnees(this.candidatId, (_a = this.evaluationId) !== null && _a !== void 0 ? _a : null);
        }
        else {
            // If directly navigating to this component with an evaluation ID in URL
            this.route.params.pipe(operators_1.takeUntil(this.destroy$)).subscribe(function (params) {
                if (params['id']) {
                    _this.evaluationId = +params['id'];
                    // Fetch evaluation details to get candidatId and other data
                    _this.evaluationService.getEvaluation(_this.evaluationId).pipe(operators_1.takeUntil(_this.destroy$)).subscribe({
                        next: function (evaluation) {
                            _this.candidatId = evaluation.candidat.id;
                            _this.evaluationLoadedData = evaluation;
                            if (_this.candidatId !== null && _this.candidatId !== undefined) {
                                _this.chargerDonnees(_this.candidatId, _this.evaluationId);
                            }
                        },
                        error: function (err) {
                            console.error("Error loading evaluation by ID:", err);
                            _this.error = "Impossible de charger l'évaluation.";
                            _this.loading = false;
                        }
                    });
                }
                else {
                    // If no candidatId or evaluationId is found, it's an error or incomplete state
                    _this.error = "Aucun candidat ou évaluation sélectionné.";
                    _this.loading = false;
                }
            });
        }
        this.evaluationForm.valueChanges.pipe(operators_1.takeUntil(this.destroy$)).subscribe(function () {
            _this.calculerNoteFinale();
        });
        this.evaluationService.refreshList$.pipe(operators_1.takeUntil(this.destroy$)).subscribe(function () {
            _this.chargerEvaluations();
        });
    };
    // Ajoute la méthode pour recharger les évaluations (à adapter selon besoin)
    AjouterEvaluationComponent.prototype.chargerEvaluations = function () {
        var _a;
        // Cette méthode peut être adaptée pour recharger la liste ou rafraîchir les données selon votre logique.
        // Ici, on recharge les données du candidat et de l'évaluation courante si les IDs sont présents.
        if (this.candidatId) {
            this.chargerDonnees(this.candidatId, (_a = this.evaluationId) !== null && _a !== void 0 ? _a : null);
        }
    };
    AjouterEvaluationComponent.prototype.ngOnDestroy = function () {
        this.destroy$.next();
        this.destroy$.complete();
        // It's good practice to reset selections when leaving the component
        this.evaluationService.resetSelection();
        this.evaluationService.setSelectedCandidatDetails(null);
    };
    AjouterEvaluationComponent.prototype.chargerDonnees = function (candidatId, evaluationId) {
        var _this = this;
        this.loading = true;
        var requests = [this.evaluationService.getCandidat(candidatId)];
        // Only fetch evaluation details if an evaluationId is provided
        if (evaluationId)
            requests.push(this.evaluationService.getEvaluation(evaluationId));
        rxjs_1.forkJoin(requests).pipe(operators_1.takeUntil(this.destroy$)).subscribe({
            next: function (_a) {
                var _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o;
                var candidatData = _a[0], evaluationData = _a[1];
                // Adjust based on how your API returns candidat data.
                // It seems `getCandidat` might return an array or an object directly.
                var candidat = Array.isArray(candidatData) ? (_b = candidatData[0]) === null || _b === void 0 ? void 0 : _b.candidat : (_c = candidatData === null || candidatData === void 0 ? void 0 : candidatData.candidat) !== null && _c !== void 0 ? _c : candidatData;
                _this.candidat = {
                    nom: (_d = candidat === null || candidat === void 0 ? void 0 : candidat.nom) !== null && _d !== void 0 ? _d : 'Nom inconnu',
                    prenom: (_e = candidat === null || candidat === void 0 ? void 0 : candidat.prenom) !== null && _e !== void 0 ? _e : 'Prénom inconnu',
                    // If evaluationData is present, use its subject, dateHeure, salle. Otherwise, default.
                    sujet: (_f = evaluationData === null || evaluationData === void 0 ? void 0 : evaluationData.sujet) !== null && _f !== void 0 ? _f : 'Sujet non spécifié',
                    dateHeure: (_g = evaluationData === null || evaluationData === void 0 ? void 0 : evaluationData.dateHeure) !== null && _g !== void 0 ? _g : '',
                    salle: (_h = evaluationData === null || evaluationData === void 0 ? void 0 : evaluationData.salle) !== null && _h !== void 0 ? _h : ''
                };
                if (evaluationData) {
                    _this.evaluationLoadedData = evaluationData;
                    _this.evaluationForm.patchValue({
                        note_clarte: evaluationData.noteClarte,
                        note_contenu: evaluationData.noteContenu,
                        note_pertinence: evaluationData.notePertinence,
                        note_presentation: evaluationData.notePresentation,
                        note_reponses: evaluationData.noteReponses,
                        commentaire: evaluationData.commentaire
                    });
                    _this.contributions = {
                        note_clarte: (_j = evaluationData.coefClarte) !== null && _j !== void 0 ? _j : 1,
                        note_contenu: (_k = evaluationData.coefContenu) !== null && _k !== void 0 ? _k : 1,
                        note_pertinence: (_l = evaluationData.coefPertinence) !== null && _l !== void 0 ? _l : 1,
                        note_presentation: (_m = evaluationData.coefPresentation) !== null && _m !== void 0 ? _m : 1,
                        note_reponses: (_o = evaluationData.coefReponses) !== null && _o !== void 0 ? _o : 1
                    };
                    _this.initialFormValue = _this.evaluationForm.getRawValue();
                    _this.calculerNoteFinale(); // Recalculate if data loaded
                }
                _this.loading = false;
            },
            error: function (err) {
                console.error("Error loading candidate or evaluation data:", err);
                _this.error = "Erreur lors du chargement des données.";
                _this.loading = false;
            }
        });
    };
    AjouterEvaluationComponent.prototype.calculerNoteFinale = function () {
        var _a, _b, _c, _d, _e;
        var f = this.evaluationForm.value;
        var notes = [
            { val: f.note_clarte, coef: (_a = this.contributions['note_clarte']) !== null && _a !== void 0 ? _a : 1 },
            { val: f.note_contenu, coef: (_b = this.contributions['note_contenu']) !== null && _b !== void 0 ? _b : 1 },
            { val: f.note_pertinence, coef: (_c = this.contributions['note_pertinence']) !== null && _c !== void 0 ? _c : 1 },
            { val: f.note_presentation, coef: (_d = this.contributions['note_presentation']) !== null && _d !== void 0 ? _d : 1 },
            { val: f.note_reponses, coef: (_e = this.contributions['note_reponses']) !== null && _e !== void 0 ? _e : 1 },
        ];
        var total = 0, totalCoef = 0;
        for (var _i = 0, notes_1 = notes; _i < notes_1.length; _i++) {
            var _f = notes_1[_i], val = _f.val, coef = _f.coef;
            if (typeof val === 'number' && val >= 0 && val <= 20) {
                total += val * coef;
                totalCoef += coef;
            }
        }
        this.noteFinale = totalCoef > 0 ? parseFloat((total / totalCoef).toFixed(1)) : 0;
    };
    AjouterEvaluationComponent.prototype.mettreAJourNote = function () {
        this.calculerNoteFinale();
    };
    AjouterEvaluationComponent.prototype.annuler = function () {
        return __awaiter(this, void 0, Promise, function () {
            var modal, role;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.modalCtrl.create({
                            component: confirmation_dialog_component_1.ConfirmationDialogComponent,
                            componentProps: {
                                data: {
                                    title: 'Confirmation',
                                    message: 'Êtes-vous sûr de vouloir annuler cette évaluation ? Toutes les modifications non sauvegardées seront perdues.',
                                    confirmButtonText: 'Oui, annuler'
                                }
                            },
                            cssClass: 'confirmation-modal'
                        })];
                    case 1:
                        modal = _a.sent();
                        return [4 /*yield*/, modal.present()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, modal.onWillDismiss()];
                    case 3:
                        role = (_a.sent()).role;
                        if (role === 'confirm') {
                            this.modeVoir = true;
                            this.evaluationForm.disable();
                            this.snackBar.open('Édition annulée.', undefined, {
                                duration: 2000,
                                panelClass: 'snackbar-error'
                            });
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    AjouterEvaluationComponent.prototype.validerEvaluation = function () {
        var _this = this;
        var _a, _b, _c;
        if (this.evaluationForm.invalid) {
            // Marque tous les champs comme touchés pour afficher les erreurs
            Object.values(this.evaluationForm.controls).forEach(function (c) { return c.markAsTouched(); });
            this.snackBar.dismiss();
            this.snackBar.open('Veuillez remplir tous les champs obligatoires et corriger les erreurs.', undefined, {
                duration: 3000,
                panelClass: 'snackbar-error'
            });
            return;
        }
        var values = this.evaluationForm.getRawValue();
        // Vérification : toutes les notes sont-elles à 0 ?
        var notes = [
            values.note_clarte,
            values.note_contenu,
            values.note_pertinence,
            values.note_presentation,
            values.note_reponses
        ];
        if (notes.every(function (n) { return Number(n) === 0; })) {
            var dialogRef = this.dialog.open(confirmation_dialog_component_1.ConfirmationDialogComponent, {
                disableClose: true,
                data: {
                    title: 'Confirmation',
                    message: 'Toutes les notes sont à 0, ce qui veut dire que le candidat est absent. Voulez-vous valider cette évaluation comme "Absent" ?',
                    confirmButtonText: 'Confirmer'
                }
            });
            dialogRef.afterClosed().subscribe(function (confirmed) {
                var _a, _b, _c;
                if (confirmed) {
                    _this.evaluationForm.patchValue({ commentaire: 'Absent' });
                    // puis continue la validation ici (appelle la suite de validerEvaluation)
                    // Submit the evaluation as in the normal flow
                    // Ensure jury and candidat IDs are available
                    if (!_this.juryId || !_this.candidatId) {
                        _this.snackBar.open('Erreur: Impossible d\'enregistrer l\'évaluation sans ID du jury ou du candidat.', undefined, { duration: 3000, panelClass: 'snackbar-error' });
                        return;
                    }
                    var absentValues = _this.evaluationForm.getRawValue();
                    var absentPayload = {
                        jury: { id: _this.juryId },
                        candidat: { id: _this.candidatId },
                        noteClarte: absentValues.note_clarte,
                        noteContenu: absentValues.note_contenu,
                        notePertinence: absentValues.note_pertinence,
                        notePresentation: absentValues.note_presentation,
                        noteReponses: absentValues.note_reponses,
                        commentaire: absentValues.commentaire,
                        moyenne: _this.noteFinale,
                        sujet: _this.candidat.sujet || ((_a = _this.evaluationLoadedData) === null || _a === void 0 ? void 0 : _a.sujet),
                        dateHeure: _this.candidat.dateHeure || ((_b = _this.evaluationLoadedData) === null || _b === void 0 ? void 0 : _b.dateHeure),
                        salle: _this.candidat.salle || ((_c = _this.evaluationLoadedData) === null || _c === void 0 ? void 0 : _c.salle)
                    };
                    var absentReq = _this.evaluationId
                        ? _this.evaluationService.updateEvaluation(_this.evaluationId, absentPayload)
                        : _this.evaluationService.createEvaluation(absentPayload);
                    absentReq.pipe(operators_1.takeUntil(_this.destroy$)).subscribe({
                        next: function () {
                            _this.snackBar.dismiss();
                            _this.snackBar.open('Évaluation sauvegardée avec succès !', undefined, {
                                duration: 2000,
                                panelClass: 'snackbar-success'
                            });
                            _this.evaluationService.emitRefreshList();
                            _this.retourListe();
                        },
                        error: function (err) {
                            console.error("Error saving evaluation:", err);
                            _this.snackBar.dismiss();
                            _this.snackBar.open('Erreur lors de l\'enregistrement de l\'évaluation.', undefined, {
                                duration: 2000,
                                panelClass: 'snackbar-error'
                            });
                        }
                    });
                }
                // sinon, ne rien faire
            });
            return;
        }
        // Ensure jury and candidat IDs are available
        if (!this.juryId || !this.candidatId) {
            this.snackBar.open('Erreur: Impossible d\'enregistrer l\'évaluation sans ID du jury ou du candidat.', undefined, { duration: 3000, panelClass: 'snackbar-error' });
            return;
        }
        var payload = {
            jury: { id: this.juryId },
            candidat: { id: this.candidatId },
            noteClarte: values.note_clarte,
            noteContenu: values.note_contenu,
            notePertinence: values.note_pertinence,
            notePresentation: values.note_presentation,
            noteReponses: values.note_reponses,
            commentaire: values.commentaire,
            moyenne: this.noteFinale,
            // Ensure these are passed from loaded data, or set defaults if not available
            sujet: this.candidat.sujet || ((_a = this.evaluationLoadedData) === null || _a === void 0 ? void 0 : _a.sujet),
            dateHeure: this.candidat.dateHeure || ((_b = this.evaluationLoadedData) === null || _b === void 0 ? void 0 : _b.dateHeure),
            salle: this.candidat.salle || ((_c = this.evaluationLoadedData) === null || _c === void 0 ? void 0 : _c.salle)
        };
        var req = this.evaluationId
            ? this.evaluationService.updateEvaluation(this.evaluationId, payload)
            : this.evaluationService.createEvaluation(payload);
        req.pipe(operators_1.takeUntil(this.destroy$)).subscribe({
            next: function () {
                _this.snackBar.dismiss();
                _this.snackBar.open('Évaluation sauvegardée avec succès !', undefined, {
                    duration: 2000,
                    panelClass: 'snackbar-success'
                });
                // Notifie la liste de se rafraîchir
                _this.evaluationService.emitRefreshList();
                // Appel à addOrUpdateDecision pour mettre à jour la décision du candidat
                if (_this.candidatId && _this.juryId) {
                    _this.evaluationService.addOrUpdateDecision(_this.candidatId, _this.juryId, 'Ajout ou modification d\'évaluation').subscribe({
                        next: function () { return _this.retourListe(); },
                        error: function (err) {
                            console.error('Erreur lors de la mise à jour de la décision:', err);
                            _this.retourListe();
                        }
                    });
                }
                else {
                    _this.retourListe();
                }
            },
            error: function (err) {
                console.error("Error saving evaluation:", err);
                _this.snackBar.dismiss(); // Dismiss previous snackbar if any
                _this.snackBar.open('Erreur lors de l\'enregistrement de l\'évaluation.', undefined, {
                    duration: 2000,
                    panelClass: 'snackbar-error'
                });
            }
        });
    };
    AjouterEvaluationComponent.prototype.modifierEvaluation = function () {
        this.modeVoir = false;
        this.evaluationForm.enable();
    };
    AjouterEvaluationComponent.prototype.voirEvaluation = function () {
        this.modeVoir = true;
        this.evaluationForm.disable();
        console.log('Mode set to Voir. Form disabled.');
    };
    AjouterEvaluationComponent.prototype.supprimerEvaluation = function () {
        return __awaiter(this, void 0, void 0, function () {
            var modal, role;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.modalCtrl.create({
                            component: confirmation_dialog_component_1.ConfirmationDialogComponent,
                            componentProps: {
                                data: {
                                    title: 'Confirmation',
                                    message: 'Voulez-vous vraiment supprimer cette évaluation ?',
                                    confirmButtonText: 'Oui, supprimer'
                                }
                            },
                            cssClass: 'confirmation-modal'
                        })];
                    case 1:
                        modal = _a.sent();
                        return [4 /*yield*/, modal.present()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, modal.onWillDismiss()];
                    case 3:
                        role = (_a.sent()).role;
                        if (role === 'confirm') {
                            if (!this.evaluationId) {
                                this.snackBar.open('Erreur : aucune évaluation à supprimer.', undefined, { duration: 3000, panelClass: 'snackbar-error' });
                                return [2 /*return*/];
                            }
                            this.isDeleting = true;
                            this.evaluationService.resetEvaluation(this.evaluationId).pipe(operators_1.takeUntil(this.destroy$)).subscribe({
                                next: function () { return _this.handleDeleteSuccess(); },
                                error: function (err) { return _this.handleDeleteError(err); }
                            });
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    AjouterEvaluationComponent.prototype.handleDeleteSuccess = function () {
        this.resetDeleteState();
        this.snackBar.open('Évaluation supprimée.', undefined, {
            duration: 3000,
            panelClass: 'snackbar-success'
        });
        // Notifie la liste de se rafraîchir
        this.evaluationService.emitRefreshList();
        // Appel à addOrUpdateDecision pour mettre à jour la décision du candidat
        if (this.candidatId && this.juryId) {
            this.evaluationService.addOrUpdateDecision(this.candidatId, this.juryId, 'Suppression ou modification d\'évaluation').subscribe({
                next: function () { return console.log('Décision mise à jour après suppression'); },
                error: function (err) { return console.error('Erreur lors de la mise à jour de la décision:', err); }
            });
        }
        this.retourListe();
    };
    AjouterEvaluationComponent.prototype.handleDeleteError = function (err) {
        console.error('Erreur suppression:', err);
        this.resetDeleteState();
        this.snackBar.open('Échec de la suppression', undefined, {
            duration: 3000,
            panelClass: 'snackbar-error'
        });
    };
    AjouterEvaluationComponent.prototype.resetDeleteState = function () {
        clearTimeout(this.deleteTimeout);
        this.isDeleting = false;
        console.log('État suppression réinitialisé');
    };
    AjouterEvaluationComponent.prototype.retourListe = function () {
        var _a;
        var role = (_a = this.authService.getCurrentUser()) === null || _a === void 0 ? void 0 : _a.role;
        if (role === 'coordinateur' || role === 'coordonateur') {
            this.router.navigate(['/gestion-evaluation']);
        }
        else if (role === 'jury') {
            this.router.navigate(['/evaluation']);
        }
        else {
            this.location.back(); // fallback
        }
    };
    __decorate([
        core_1.Input()
    ], AjouterEvaluationComponent.prototype, "setSousMenu");
    AjouterEvaluationComponent = __decorate([
        core_1.Component({
            selector: 'app-ajouter-evaluation',
            templateUrl: './ajouter-evaluation.component.html',
            styleUrls: ['./ajouter-evaluation.component.scss'],
            standalone: true,
            imports: [
                common_1.CommonModule,
                forms_1.ReactiveFormsModule,
                snack_bar_1.MatSnackBarModule,
                dialog_1.MatDialogModule,
                button_1.MatButtonModule,
                common_1.DatePipe,
                // IonContent,
                // IonCard,
                // IonCardHeader,
                // IonCardTitle,
                // IonCardSubtitle,
                // IonCardContent,
                // IonItem,
                // IonLabel,
                // IonButton,
                // IonBadge,
                // IonList,
                // IonSpinner,
                standalone_1.IonText,
                // IonNote,
                // IonItemDivider,
                // IonGrid,
                // IonRow,
                // IonCol,
                // IonTextarea,
                // IonInput,
                angular_1.IonicModule
            ]
        })
    ], AjouterEvaluationComponent);
    return AjouterEvaluationComponent;
}());
exports.AjouterEvaluationComponent = AjouterEvaluationComponent;
