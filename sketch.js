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
  let yMargin = windowHeight * .065
  let interfaceMargin = windowWidth/8
  let xPos = (windowWidth/8)/2 - (windowWidth * .09)/2
  frameRate(60)
  
  brushLayer = createGraphics(windowWidth-interfaceMargin, windowHeight);
  
  // CHOOSE BACKGROUND COLOR ------------------------------------
  selBg = createSelect()
  selBg.position(xPos, yMargin/2)
  selBg.style('width', '9vw')
  selBg.style('font-family', 'Times New Roman, Times, serif')
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
  selBrush.position(xPos, yMargin)
  selBrush.style('width', '9vw')
  selBrush.style('font-family', 'Times New Roman, Times, serif')
  selBrush.option('Round')
  selBrush.option('Chisel Tip')
  selBrush.option('Rainbow')
  selBrush.option('Cockroach')
  selBrush.option('Sloth')
  selBrush.selected('Circle')
  // BRUSH COLOR SELECTION --------------------------------------
  colorPicker = createColorPicker(color('Orange'))
  colorPicker.position(xPos, yMargin * 2.6)
  colorPicker.style('width', '8.65vw')
  colorPicker.style('height', '12vh')
  // BRUSH SCALE ------------------------------------------------
  scaleSlider = createSlider(10, 200, 25);
  scaleSlider.position(xPos, windowHeight/3 + yMargin/2)
  scaleSlider.style('width', '9vw')
  // BRUSH ANGLE ------------------------------------------------
  rotateSlider = createSlider(0, 180, 30)
  rotateSlider.position(xPos, windowHeight/3 + yMargin)
  rotateSlider.style('width', '9vw')
  // CLEAR DRAWING ----------------------------------------------
  clearDrawing = createButton('Clear')
  clearDrawing.position(xPos, height - yMargin * 1.75)
  clearDrawing.style('font-family', 'Times New Roman, Times, serif')
  clearDrawing.style('width', '9vw')
  clearDrawing.style('background-color', 'white')
  clearDrawing.mousePressed(resetSketch)
  // SAVE DRAWING -----------------------------------------------
  saveDrawing = createButton('Save')
  saveDrawing.position(xPos, height - yMargin)
  saveDrawing.style('font-family', 'Times New Roman, Times, serif')
  saveDrawing.style('width', '9vw')
  saveDrawing.style('background-color', 'white')
  saveDrawing.mousePressed(saveFile)
  bgCol = color('White')

}

function draw() {
  background(bgCol)
  let drawingMargin = windowWidth/500

  if (mouseIsPressed) {
    let imgX = mouseX, 
        imgY = mouseY,
        val = selBrush.value()
        scaleVal = scaleSlider.value()

        if (val === 'Round') {
          brushLayer.push();
          brushLayer.translate(-windowWidth/8, 0)
          brushLayer.fill(colorPicker.color())
          brushLayer.noStroke()
          brushLayer.circle(imgX, imgY, scaleVal)
          brushLayer.pop()     
          } 
          else if (val === 'Chisel Tip') {
            brushLayer.push()
            brushLayer.translate(imgX - windowWidth/8, imgY)
            brushLayer.rotate(rotateSlider.value())
            brushLayer.noStroke()
            brushLayer.fill(colorPicker.color())
            brushLayer.rect(0, 0, scaleVal, scaleVal/2.5, scaleVal/3)
            brushLayer.pop()     
            } 
            else if (val === 'Rainbow') {
              brushLayer.push();
              brushLayer.colorMode(HSB)
              brushLayer.translate(-windowWidth/8, 0)
              brushLayer.fill((frameCount*1.5) % 360, 100, 100)
              brushLayer.noStroke()
              brushLayer.circle(imgX, imgY, scaleVal)
              brushLayer.pop()     
            }
            else if (val === 'Cockroach') {
              brushLayer.push()
              brushLayer.translate(imgX, imgY)
              brushLayer.rotate(rotateSlider.value())
              roachImg.resize(windowWidth/18, 0)
              brushLayer.image(roachImg, -roachImg.width * 3, -roachImg.height/2)
              brushLayer.pop()


            }
            
              
              
              
              }
 
  image(brushLayer, windowWidth/8 + drawingMargin, 0)
  
    // interface/gui styling
    //push()
    //fill(bgCol)
    //noStroke()
    //rect(0, 0, (windowWidth/8) - 1, windowHeight)
    //pop()

    push()
    stroke('black')
    strokeWeight(1)
    // line(x1, y1, x2, y2)
    line(windowWidth/8, 0, windowWidth/8, windowHeight)
    // line(0, yMargin * 2, windowWidth/8, yMargin * 2)
    // line(0, windowHeight/3, windowWidth/8, windowHeight/3)
    // line(0, windowHeight/3 * 2, windowWidth/8, windowHeight/3 * 2)
    pop()
  

  
}



function resetSketch(){
  brushLayer.clear()
}





function windowResized() {
  resizeCanvas(windowWidth, windowHeight)
  let size = min(width, height)
  scaleVal = size / initialSize
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
  // * can remove rules by removing background below
  //let saveDrawing = brushLayer + bgColoring
  //saveCanvas(brushLayer, 'forBrittanyAndSteffi', 'jpg');
  saveCanvas(canvas, 'forBrittanyAndSteffi', 'jpg')
}

