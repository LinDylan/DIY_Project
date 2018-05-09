import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import * as tf from '@tensorflow/tfjs';
import { image } from '@tensorflow/tfjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  @ViewChild('inputCanvas') inputCanvas : ElementRef;
  @ViewChild('outputText') outputText: ElementRef;
  title = 'app';
  model: tf.Sequential;
  layers = [];
  data_canvas: HTMLCanvasElement;
  classes_txt = ['airplane', 'car', 'bird', 'cat', 'deer', 'dog', 'frog', 'horse', 'ship', 'truck'];
  learn_rate = 0.15;
  optimizer = tf.train.sgd(this.learn_rate);
  batches = 1; maxBatches = 50; minBatches = 1;
  epochString = "1";
  ngOnInit() {
    this.data_canvas = document.createElement("canvas");
    this.data_canvas.width = 1024;
    this.data_canvas.height = 1000;
    this.createModel();
    this.layers = this.model.layers;
    //this.test();
  }
  createModel() {
    this.model = tf.sequential();
    this.model.add(tf.layers.conv2d({ inputShape: [32, 32, 3], kernelSize: 5, filters: 16, strides: 1, activation: 'relu', kernelInitializer: 'VarianceScaling' }));
    this.model.add(tf.layers.maxPooling2d({ poolSize: [2, 2], strides: [2, 2] }));
    this.model.add(tf.layers.conv2d({ kernelSize: 5, filters: 16, strides: 1, activation: 'relu', kernelInitializer: 'VarianceScaling', }));
    this.model.add(tf.layers.maxPooling2d({ poolSize: [2, 2], strides: [2, 2] }));
    this.model.add(tf.layers.flatten());
    this.model.add(tf.layers.dense({ units: 10, kernelInitializer: 'VarianceScaling', activation: 'softmax' }));
    //compile
    this.model.compile({ optimizer: this.optimizer, loss: 'categoricalCrossentropy', metrics: ['accuracy'], });
  }
  addConvLayer() {
    var end = this.model.layers.concat();
    var index = this.model.layers.length - 2;
    this.model.layers.splice(index);
    this.model.layers.push(tf.layers.conv2d({ kernelSize: 5, filters: 16, strides: 1, activation: 'relu', kernelInitializer: 'VarianceScaling', }));
    this.model.layers.push(tf.layers.maxPooling2d({ poolSize: [2, 2], strides: [2, 2] }));
    for (var i = index; i  < end.length; i++) {
      this.model.layers.push(end[i]);
    }
    this.model.compile({ optimizer: this.optimizer, loss: 'categoricalCrossentropy', metrics: ['accuracy'], });
  }

  async train() {
    var that = this, batches = this.batches, batchSize = 1000, testFrequency = 1;
    var images = new Array();
    var testImage = new Image(1024, 1000);
    var loaded = 0;
    // Initialize Images
    for (var i = 0; i < batches; i++) { // batches 50 is the max 51 is test data
      images.push(new Image(1024, 1000));
      images[i].onload = function() {
        that.data_canvas.getContext('2d').drawImage(this, 0, 0, 1024, 1000);
        loaded++;
        console.log("loaded image");
      }
    }
    //load Images
    for (var i = 0; i < batches; i++) {
      images[i].src = "./DIY_Project/assets/cifar10_batch_" + i + ".png";
    }
    that.data_canvas.getContext('2d').clearRect(0, 0, 1024, 1000);
    /** Listening to see if image is loaded */
    var wait = setInterval(async function() {
      if (loaded === batches) {
        console.log("done loading");
        clearInterval(wait);
        /** Create Training Data */
        /** action after all batches are done loading */
        var maxEpochs = parseInt(that.epochString);
        console.log(maxEpochs);
          for (var i = 0; i < batches; i++) {
            var batchData = new Array();
            var batchLabels = new Array(), offset = (i * 1000);
            for (var j = offset; j <  (offset + 1000); j++) {
              batchLabels.push(new Array());
              for (var k = 0; k < 10; k++) {
                batchLabels[j - offset].push((labels[j] === k) ? 1 : 0);
              }
            }
            var labelTensor = tf.tensor(batchLabels);
            that.data_canvas.getContext('2d').drawImage(images[i], 0, 0, 1024, 1000);
            /** tes for accuracy */
            if (i % testFrequency === 0) {
              
            }
            //extract images from canvas
            var canvasData = that.data_canvas.getContext('2d').getImageData(0, 0, 1024, 1000);
            var imageData;
            for (var j = 0; j < batchSize; j++) {
              imageData = that.inputCanvas.nativeElement.getContext('2d').createImageData(32, 32);
              var loc = ((j) * 4096);
              for (var k = 0; k < imageData.data.length; k+=4) {
                imageData.data[k] = canvasData.data[loc + k]; //red
                imageData.data[k + 1] = canvasData.data[loc + k + 1]; //blue
                imageData.data[k + 2] = canvasData.data[loc + k + 2]; //green
                imageData.data[k + 3] = canvasData.data[loc + k + 3]; //alpha
              }
              that.inputCanvas.nativeElement.getContext('2d').putImageData(imageData, 0, 0);
              /** after drawing image with rgba use function to capture tensor with only rgb */
              var currentImage = that.canvasToTensor().dataSync();
              for (var z = 0; z < currentImage.length; z++) {
                batchData.push(currentImage[z]);
              }
            }
            /** after creating data, fit */
            var t = tf.tensor(batchData);
            t = t.as4D(batchSize, 32, 32, 3); //Equivalent to 1000 copies of images (32 x 32) with 3 color channels 
            for (var e = 0; e < maxEpochs; e++) {
              var temp = that.inputCanvas.nativeElement.getContext('2d').createImageData(32, 32);
              var loc = ((e) * 4096);
              for (var k = 0; k < imageData.data.length; k+=4) {
                temp.data[k] = canvasData.data[loc + k]; //red
                temp.data[k + 1] = canvasData.data[loc + k + 1]; //blue
                temp.data[k + 2] = canvasData.data[loc + k + 2]; //green
                temp.data[k + 3] = canvasData.data[loc + k + 3]; //alpha
              }
              that.inputCanvas.nativeElement.getContext('2d').putImageData(temp, 0, 0);
              await that.delay(1500);
              const history = await that.model.fit(t, labelTensor, { batchSize: batchSize, epochs: 1 });
              const loss = history.history.loss[0];
              const accuracy = history.history.acc[0];
            }
          }
          alert('done training');
        }
    }, 1000 / 60);
  }
  test() {
    var img = new Image(1024, 1000);
    img.src = "./DIY_Project/assets/cifar10_batch_" + Math.floor(Math.random() * Math.floor(this.batches - 1)) + ".png";
    var that = this, ref, test_data;
    img.onload = async function() {
      that.data_canvas.getContext('2d').drawImage(img, 0, 0, 1024, 1000);
      ref = that.data_canvas.getContext('2d').getImageData(0, 0, 1024, 1000);
      var j = Math.floor(Math.random() * Math.floor(1000));
      test_data = that.inputCanvas.nativeElement.getContext('2d').createImageData(32, 32);
      var loc = ((j) * 4096);
      for (var i = 0; i < test_data.data.length; i+=4) {
        test_data.data[i] = ref.data[loc + i]; //red
        test_data.data[i + 1] = ref.data[loc + i + 1]; //blue
        test_data.data[i + 2] = ref.data[loc + i + 2]; //green
        test_data.data[i + 3] = ref.data[loc + i + 3]; //alpha
      }
      that.inputCanvas.nativeElement.getContext('2d').putImageData(test_data, 0, 0);
      var output = <tf.Tensor>that.model.predict(that.canvasToTensor());
      const axis = 1;
      var predictions = Array.from(output.argMax(axis).dataSync());
      console.log(that.classes_txt[predictions[0]] + "vs" + that.classes_txt[labels[j]]);
      that.outputText.nativeElement.textContent = "Prediction: " + that.classes_txt[predictions[0]] + "\n Actual: " + that.classes_txt[labels[j]];
    }
  }
  canvasToTensor() {
    return tf.tidy(() => {
      var img = tf.fromPixels(this.inputCanvas.nativeElement);
      const fixedImg = img.expandDims(0);
      // Divide R, G, B  values by 127 and minus 1
      return fixedImg.toFloat().div(tf.scalar(127)).sub(tf.scalar(1));
    });
  }
  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }
}
