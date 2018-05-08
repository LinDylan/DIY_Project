webpackJsonp(["main"],{

/***/ "./src/$$_lazy_route_resource lazy recursive":
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./src/$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./src/app/app.component.css":
/***/ (function(module, exports) {

module.exports = "canvas {\r\n    width: 50%;\r\n    height: 50%;\r\n    top: 30%;\r\n    left: 25%;\r\n    position: absolute;\r\n}\r\n#networkList {\r\n    position: absolute;\r\n    z-index: 2;\r\n    max-width: 25%;\r\n    background-color: #F5F5F5;\r\n}\r\n#inputView {\r\n    position: absolute;\r\n    z-index: 2;\r\n    top: 100px;\r\n    left: 20%;\r\n    min-width: 448px;\r\n    min-height: 448px; \r\n    max-width: 448px;\r\n    max-height: 448px;\r\n    background-color: #F5F5F5;\r\n}\r\n#graphView {\r\n    position: absolute;\r\n    z-index: 2;\r\n    top: 100px;\r\n    left: 60%;\r\n    min-width: 448px;\r\n    min-height: 448px;\r\n    background-color: #F5F5F5;\r\n}\r\n#controlPad {\r\n    position: absolute;\r\n    top: 75%;\r\n    z-index: 2;\r\n    min-width: 95%;\r\n    max-width: 95%;\r\n    min-height: 20%;\r\n    max-height: 20%;\r\n    background-color: #F5F5F5;\r\n}\r\n#controlPad_content {\r\n    margin: auto;\r\n    padding: 15px;\r\n}"

/***/ }),

/***/ "./src/app/app.component.html":
/***/ (function(module, exports) {

module.exports = "<mat-toolbar color=\"primary\">\n  <mat-toolbar-row>\n    <span>Convolutional Neural Network</span>\n  </mat-toolbar-row>\n</mat-toolbar>\n<div id=\"content\" style=\"margin: auto; padding: 25px;\">\n  <div id=\"networkList\">\n    <mat-toolbar color=\"primary\">\n      <mat-toolbar-row>\n        <span>Network</span>\n        <button mat-icon-button on-click=\"addConvLayer()\">\n          <mat-icon aria-label=\"Add a Layer\">add</mat-icon>\n        </button>\n      </mat-toolbar-row>\n    </mat-toolbar>\n    <mat-selection-list>\n      <mat-list-option *ngFor=\"let layer of layers\">\n        {{layer.constructor.name}}\n      </mat-list-option>\n    </mat-selection-list>\n  </div>\n  <div id=\"inputView\">\n    <mat-toolbar color=\"primary\"><mat-toolbar-row><span>input</span></mat-toolbar-row></mat-toolbar>\n    <canvas #inputCanvas width=\"32\" height=\"32\"></canvas>\n  </div>\n  <!--<div id=\"graphView\">\n      <mat-toolbar color=\"primary\"><mat-toolbar-row><span>Graph</span></mat-toolbar-row></mat-toolbar>\n  </div>-->\n  <div id=\"controlPad\">\n    <mat-toolbar color=\"primary\"><mat-toolbar-row><span>Controls</span></mat-toolbar-row></mat-toolbar>\n    <div id=\"controlPad_content\">\n      <button mat-raised-button color=\"primary\" on-click=\"train()\">Train</button>\n      <button mat-raised-button color=\"primary\" on-click=\"test()\">Test</button>\n    </div>\n  </div>\n</div>"

/***/ }),

/***/ "./src/app/app.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__tensorflow_tfjs__ = __webpack_require__("./node_modules/@tensorflow/tfjs/dist/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__tensorflow_tfjs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__tensorflow_tfjs__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
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
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
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


var AppComponent = /** @class */ (function () {
    function AppComponent() {
        this.title = 'app';
        this.layers = [];
        this.classes_txt = ['airplane', 'car', 'bird', 'cat', 'deer', 'dog', 'frog', 'horse', 'ship', 'truck'];
        this.learn_rate = 0.15;
        this.optimizer = __WEBPACK_IMPORTED_MODULE_1__tensorflow_tfjs__["train"].sgd(this.learn_rate);
    }
    AppComponent.prototype.ngOnInit = function () {
        this.data_canvas = document.createElement("canvas");
        this.data_canvas.width = 1024;
        this.data_canvas.height = 1000;
        this.createModel();
        this.layers = this.model.layers;
        //this.test();
    };
    AppComponent.prototype.createModel = function () {
        this.model = __WEBPACK_IMPORTED_MODULE_1__tensorflow_tfjs__["sequential"]();
        this.model.add(__WEBPACK_IMPORTED_MODULE_1__tensorflow_tfjs__["layers"].conv2d({ inputShape: [32, 32, 3], kernelSize: 5, filters: 16, strides: 1, activation: 'relu', kernelInitializer: 'VarianceScaling' }));
        this.model.add(__WEBPACK_IMPORTED_MODULE_1__tensorflow_tfjs__["layers"].maxPooling2d({ poolSize: [2, 2], strides: [2, 2] }));
        this.model.add(__WEBPACK_IMPORTED_MODULE_1__tensorflow_tfjs__["layers"].conv2d({ kernelSize: 5, filters: 16, strides: 1, activation: 'relu', kernelInitializer: 'VarianceScaling', }));
        this.model.add(__WEBPACK_IMPORTED_MODULE_1__tensorflow_tfjs__["layers"].maxPooling2d({ poolSize: [2, 2], strides: [2, 2] }));
        this.model.add(__WEBPACK_IMPORTED_MODULE_1__tensorflow_tfjs__["layers"].flatten());
        this.model.add(__WEBPACK_IMPORTED_MODULE_1__tensorflow_tfjs__["layers"].dense({ units: 10, kernelInitializer: 'VarianceScaling', activation: 'softmax' }));
        //compile
        this.model.compile({ optimizer: this.optimizer, loss: 'categoricalCrossentropy', metrics: ['accuracy'], });
    };
    AppComponent.prototype.addConvLayer = function () {
        var end = this.model.layers.concat();
        var index = this.model.layers.length - 2;
        this.model.layers.splice(index);
        this.model.layers.push(__WEBPACK_IMPORTED_MODULE_1__tensorflow_tfjs__["layers"].conv2d({ kernelSize: 5, filters: 16, strides: 1, activation: 'relu', kernelInitializer: 'VarianceScaling', }));
        this.model.layers.push(__WEBPACK_IMPORTED_MODULE_1__tensorflow_tfjs__["layers"].maxPooling2d({ poolSize: [2, 2], strides: [2, 2] }));
        for (var i = index; i < end.length; i++) {
            this.model.layers.push(end[i]);
        }
        this.model.compile({ optimizer: this.optimizer, loss: 'categoricalCrossentropy', metrics: ['accuracy'], });
    };
    AppComponent.prototype.train = function () {
        return __awaiter(this, void 0, void 0, function () {
            var that, batches, trainingBatches, batchSize, testFrequency, images, testImage, loaded, i, i, wait;
            return __generator(this, function (_a) {
                that = this, batches = 50, trainingBatches = 1, batchSize = 1000, testFrequency = 1;
                images = new Array();
                testImage = new Image(1024, 1000);
                loaded = 0;
                // Initialize Images
                for (i = 0; i < batches; i++) {
                    images.push(new Image(1024, 1000));
                    images[i].onload = function () {
                        that.data_canvas.getContext('2d').drawImage(this, 0, 0, 1024, 1000);
                        loaded++;
                        console.log("loaded image");
                    };
                }
                //load Images
                for (i = 0; i < batches; i++) {
                    images[i].src = "./DIY_Project/assets/cifar10_batch_" + i + ".png";
                }
                that.data_canvas.getContext('2d').clearRect(0, 0, 1024, 1000);
                wait = setInterval(function () {
                    return __awaiter(this, void 0, void 0, function () {
                        var maxEpochs, e, i, batchData, batchLabels, offset, j, k, labelTensor, canvasData, imageData, j, loc, k, currentImage, z, t, history_1, loss, accuracy;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    if (!(loaded === batches)) return [3 /*break*/, 7];
                                    console.log("done loading");
                                    clearInterval(wait);
                                    maxEpochs = 100;
                                    e = 0;
                                    _a.label = 1;
                                case 1:
                                    if (!(e < maxEpochs)) return [3 /*break*/, 6];
                                    i = 0;
                                    _a.label = 2;
                                case 2:
                                    if (!(i < trainingBatches)) return [3 /*break*/, 5];
                                    batchData = new Array();
                                    batchLabels = new Array(), offset = (i * 1000);
                                    for (j = offset; j < (offset + 1000); j++) {
                                        batchLabels.push(new Array());
                                        for (k = 0; k < 10; k++) {
                                            batchLabels[j - offset].push((labels[j] === k) ? 1 : 0);
                                        }
                                    }
                                    labelTensor = __WEBPACK_IMPORTED_MODULE_1__tensorflow_tfjs__["tensor"](batchLabels);
                                    that.data_canvas.getContext('2d').drawImage(images[i], 0, 0, 1024, 1000);
                                    /** tes for accuracy */
                                    if (i % testFrequency === 0) {
                                    }
                                    canvasData = that.data_canvas.getContext('2d').getImageData(0, 0, 1024, 1000);
                                    for (j = 0; j < batchSize; j++) {
                                        imageData = that.inputCanvas.nativeElement.getContext('2d').createImageData(32, 32);
                                        loc = ((j) * 4096);
                                        for (k = 0; k < imageData.data.length; k += 4) {
                                            imageData.data[k] = canvasData.data[loc + k]; //red
                                            imageData.data[k + 1] = canvasData.data[loc + k + 1]; //blue
                                            imageData.data[k + 2] = canvasData.data[loc + k + 2]; //green
                                            imageData.data[k + 3] = canvasData.data[loc + k + 3]; //alpha
                                        }
                                        that.inputCanvas.nativeElement.getContext('2d').putImageData(imageData, 0, 0);
                                        currentImage = that.canvasToTensor().dataSync();
                                        for (z = 0; z < currentImage.length; z++) {
                                            batchData.push(currentImage[z]);
                                        }
                                    }
                                    t = __WEBPACK_IMPORTED_MODULE_1__tensorflow_tfjs__["tensor"](batchData);
                                    t = t.as4D(batchSize, 32, 32, 3); //Equivalent to 1000 copies of images (32 x 32) with 3 color channels 
                                    return [4 /*yield*/, that.model.fit(t, labelTensor, { batchSize: batchSize, epochs: 1 })];
                                case 3:
                                    history_1 = _a.sent();
                                    loss = history_1.history.loss[0];
                                    accuracy = history_1.history.acc[0];
                                    _a.label = 4;
                                case 4:
                                    i++;
                                    return [3 /*break*/, 2];
                                case 5:
                                    e++;
                                    return [3 /*break*/, 1];
                                case 6:
                                    alert('done training');
                                    _a.label = 7;
                                case 7: return [2 /*return*/];
                            }
                        });
                    });
                }, 1000 / 60);
                return [2 /*return*/];
            });
        });
    };
    AppComponent.prototype.test = function () {
        var img = new Image(1024, 1000);
        img.src = "./DIY_Project/assets/cifar10_batch_" + 0 + ".png";
        var that = this, ref, test_data;
        img.onload = function () {
            return __awaiter(this, void 0, void 0, function () {
                var j, loc, i, output, axis, predictions;
                return __generator(this, function (_a) {
                    that.data_canvas.getContext('2d').drawImage(img, 0, 0, 1024, 1000);
                    ref = that.data_canvas.getContext('2d').getImageData(0, 0, 1024, 1000);
                    j = Math.floor(Math.random() * Math.floor(1000));
                    test_data = that.inputCanvas.nativeElement.getContext('2d').createImageData(32, 32);
                    loc = ((j) * 4096);
                    for (i = 0; i < test_data.data.length; i += 4) {
                        test_data.data[i] = ref.data[loc + i]; //red
                        test_data.data[i + 1] = ref.data[loc + i + 1]; //blue
                        test_data.data[i + 2] = ref.data[loc + i + 2]; //green
                        test_data.data[i + 3] = ref.data[loc + i + 3]; //alpha
                    }
                    that.inputCanvas.nativeElement.getContext('2d').putImageData(test_data, 0, 0);
                    output = that.model.predict(that.canvasToTensor());
                    axis = 1;
                    predictions = Array.from(output.argMax(axis).dataSync());
                    console.log(that.classes_txt[predictions[0]] + "vs" + that.classes_txt[labels[j]]);
                    return [2 /*return*/];
                });
            });
        };
    };
    AppComponent.prototype.canvasToTensor = function () {
        var _this = this;
        return __WEBPACK_IMPORTED_MODULE_1__tensorflow_tfjs__["tidy"](function () {
            var img = __WEBPACK_IMPORTED_MODULE_1__tensorflow_tfjs__["fromPixels"](_this.inputCanvas.nativeElement);
            var fixedImg = img.expandDims(0);
            // Divide R, G, B  values by 127 and minus 1
            return fixedImg.toFloat().div(__WEBPACK_IMPORTED_MODULE_1__tensorflow_tfjs__["scalar"](127)).sub(__WEBPACK_IMPORTED_MODULE_1__tensorflow_tfjs__["scalar"](1));
        });
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_5" /* ViewChild */])('inputCanvas'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* ElementRef */])
    ], AppComponent.prototype, "inputCanvas", void 0);
    AppComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'app-root',
            template: __webpack_require__("./src/app/app.component.html"),
            styles: [__webpack_require__("./src/app/app.component.css")]
        })
    ], AppComponent);
    return AppComponent;
}());



/***/ }),

/***/ "./src/app/app.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__("./node_modules/@angular/platform-browser/esm5/platform-browser.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_platform_browser_animations__ = __webpack_require__("./node_modules/@angular/platform-browser/esm5/animations.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_component__ = __webpack_require__("./src/app/app.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_material_toolbar__ = __webpack_require__("./node_modules/@angular/material/esm5/toolbar.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_material_card__ = __webpack_require__("./node_modules/@angular/material/esm5/card.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_material_button__ = __webpack_require__("./node_modules/@angular/material/esm5/button.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__angular_material_progress_bar__ = __webpack_require__("./node_modules/@angular/material/esm5/progress-bar.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__angular_material_slide_toggle__ = __webpack_require__("./node_modules/@angular/material/esm5/slide-toggle.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__angular_material_dialog__ = __webpack_require__("./node_modules/@angular/material/esm5/dialog.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__angular_material_snack_bar__ = __webpack_require__("./node_modules/@angular/material/esm5/snack-bar.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__angular_material_progress_spinner__ = __webpack_require__("./node_modules/@angular/material/esm5/progress-spinner.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__angular_material_list__ = __webpack_require__("./node_modules/@angular/material/esm5/list.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__angular_material_icon__ = __webpack_require__("./node_modules/@angular/material/esm5/icon.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




//Material Components










var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["G" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* AppComponent */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_2__angular_platform_browser_animations__["a" /* BrowserAnimationsModule */],
                __WEBPACK_IMPORTED_MODULE_4__angular_material_toolbar__["a" /* MatToolbarModule */],
                __WEBPACK_IMPORTED_MODULE_12__angular_material_list__["a" /* MatListModule */],
                __WEBPACK_IMPORTED_MODULE_5__angular_material_card__["a" /* MatCardModule */],
                __WEBPACK_IMPORTED_MODULE_6__angular_material_button__["a" /* MatButtonModule */],
                __WEBPACK_IMPORTED_MODULE_7__angular_material_progress_bar__["a" /* MatProgressBarModule */],
                __WEBPACK_IMPORTED_MODULE_8__angular_material_slide_toggle__["a" /* MatSlideToggleModule */],
                __WEBPACK_IMPORTED_MODULE_9__angular_material_dialog__["a" /* MatDialogModule */],
                __WEBPACK_IMPORTED_MODULE_10__angular_material_snack_bar__["a" /* MatSnackBarModule */],
                __WEBPACK_IMPORTED_MODULE_11__angular_material_progress_spinner__["a" /* MatProgressSpinnerModule */],
                __WEBPACK_IMPORTED_MODULE_13__angular_material_icon__["a" /* MatIconModule */],
            ],
            entryComponents: [],
            providers: [],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* AppComponent */]]
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "./src/environments/environment.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
var environment = {
    production: false
};


/***/ }),

/***/ "./src/main.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__("./node_modules/@angular/platform-browser-dynamic/esm5/platform-browser-dynamic.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_module__ = __webpack_require__("./src/app/app.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__("./src/environments/environment.ts");




if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].production) {
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_10" /* enableProdMode */])();
}
Object(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_2__app_app_module__["a" /* AppModule */])
    .catch(function (err) { return console.log(err); });


/***/ }),

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("./src/main.ts");


/***/ }),

/***/ 1:
/***/ (function(module, exports) {

/* (ignored) */

/***/ })

},[0]);
//# sourceMappingURL=main.bundle.js.map