/*
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 *  Gettin Married Drawing Tool  * 
for Brittany Nelson & Steffi Hessler
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
*/


let bgCol
let scaleVal = 1
let intialSize
let roachImg
// let slothImg


function preload() {
  roachImg = loadImage('assets/cockroach.png')
  //slothImg = loadImage('')
}



function setup() {
  let canvas = createCanvas(windowWidth, windowHeight)
  initialSize = min(width, height)
  canvas.parent("p5canvas")
  //let yMargin = windowHeight * .065
  let interfaceMargin = windowWidth/8
  //let xPos = (windowWidth/8)/2 - (windowWidth * .09)/2
  frameRate(60)
  
  brushLayer = createGraphics(windowWidth-interfaceMargin, windowHeight);
  
  drawingTools = drawingTools()


  bgCol = color('White')

}

function draw() {
  background(bgCol)
  let drawingMargin = windowWidth/500

  if (mouseIsPressed) {
    let imgX = mouseX, 
        imgY = mouseY,
        val = selBrush.value()
        sliderVal = scaleSlider.value()

        if (val === 'Round' && mouseX >= windowWidth/8) {
          brushLayer.push();
          brushLayer.translate(-windowWidth/8, 0)
          brushLayer.fill(colorPicker.color())
          brushLayer.noStroke()
          brushLayer.circle(imgX, imgY, sliderVal)
          brushLayer.pop()     
          } 
          else if (val === 'Chisel Tip'&& mouseX >= windowWidth/8) {
            brushLayer.push()
            brushLayer.translate(imgX - windowWidth/8, imgY)
            brushLayer.strokeWeight(sliderVal/3)
            brushLayer.stroke(colorPicker.color())
            brushLayer.line(0, 0, -sliderVal, sliderVal)
            brushLayer.pop()     
            } 
          else if (val === 'Rainbow' && mouseX >= windowWidth/8) {
            brushLayer.push();
            brushLayer.colorMode(HSB)
            brushLayer.translate(-windowWidth/8, 0)
            brushLayer.fill((frameCount*1.5) % 360, 100, 100)
            brushLayer.noStroke()
            brushLayer.circle(imgX, imgY, sliderVal)
            brushLayer.pop()     
          }
          else if (val === 'Cockroach' && mouseX >= windowWidth/8) {
            brushLayer.push()
            brushLayer.translate(imgX, imgY)
            //brushLayer.rotate(rotateSlider.value())
            roachImg.resize((windowWidth/18), 0)
            brushLayer.image(roachImg, -roachImg.width * 2, -roachImg.height/2)
            brushLayer.pop()
          }
    }
 
  image(brushLayer, windowWidth/8 + drawingMargin, 0)
}


function drawingTools(){

  let xPos = ((windowWidth/8)/2 - (windowWidth * .09)/2) * scaleVal
  let yMargin = (windowHeight * .065) * scaleVal


  // CHOOSE BACKGROUND COLOR ------------------------------------
  selBg = createSelect()
  selBg.class('draw-select')
  //selBg.class('draw-tool')
  selBg.position(xPos, yMargin/2)
  selBg.style('width', '9vw')
  selBg.option('Black')
  selBg.option('White')
  selBg.option('Red')
  selBg.option('Orange')
  selBg.option('Yellow')
  selBg.option('Green')
  selBg.option('Blue')
  selBg.option('Purple')
  selBg.selected('White')
  selBg.changed(changeBg)
  // BRUSH SELECTION --------------------------------------------
  selBrush = createSelect()
  selBrush.class('draw-select')
  //selBrush.class('draw-tool')
  selBrush.position(xPos, yMargin + 10)
  selBrush.style('width', '9vw')
  selBrush.option('Round')
  selBrush.option('Chisel Tip')
  selBrush.option('Rainbow')
  selBrush.option('Cockroach')
  selBrush.option('Sloth')
  selBrush.selected('Circle')
    // BRUSH SCALE ------------------------------------------------
    scaleSlider = createSlider(10, 200, 25)
    scaleSlider.class('draw-slider')
    //scaleSlider.class('draw-tool')
    scaleSlider.position(xPos, (yMargin * 2) + 10)
  // BRUSH COLOR SELECTION --------------------------------------
  colorPicker = createColorPicker(color(240, 248, 255))
  colorPicker.class('draw-colorPicker')
  //colorPicker.class('draw-tool')
  colorPicker.position(xPos, (yMargin * 3) + 10)
  // BRUSH ANGLE ------------------------------------------------
  // rotateSlider = createSlider(0, 180, 30)
  // rotateSlider.position(xPos, windowHeight/3 + yMargin)
  // rotateSlider.style('width', '9vw')
  // CLEAR DRAWING ----------------------------------------------
  clearDrawing = createButton('Clear')
  clearDrawing.class('draw-buttonClear')
  //clearDrawing.class('draw-tool')
  clearDrawing.position(xPos, (yMargin * 4) + 20)
  clearDrawing.mousePressed(resetSketch)
  // SAVE DRAWING -----------------------------------------------
  saveDrawing = createButton('Save')
  saveDrawing.class('draw-buttonSave')
  //saveDrawing.class('draw-tool')
  saveDrawing.position(xPos, (yMargin * 5) + 10)
  saveDrawing.mousePressed(saveFile)



}


function resetSketch(){
  brushLayer.clear()
}


function windowResized() {
  resizeCanvas(windowWidth, windowHeight)
  let size = min(width, height)
  scaleVal = size / initialSize
 drawingTools = drawingTools()
}


function changeBg() {
  let val = selBg.value()
  
    if (val === 'White') {
      bgCol = color('White')
    } else if (val === 'Black') {
      bgCol = color('Black')
    } else if (val === 'Red') {
      bgCol = color('Red')
    } else if (val === 'Orange') {
      bgCol = color('Orange')
    } else if (val === 'Yellow') {
      bgCol = color('Yellow')
    } else if (val === 'Green') {
      bgCol = color('Green')
    } else if (val === 'Blue') {
      bgCol = color('Blue')
    }else if (val === 'Purple') {
      bgCol = color('Purple')
    }

  brushLayer.background(bgCol)

}


function saveFile() {
  saveCanvas(canvas, 'forBrittanyAndSteffi', 'jpg')
}

// function buttonStyle(){
//   var element = document.getElementById('p5canvas')
//   saveDrawing.classList.add("buttonStyling")

// }

