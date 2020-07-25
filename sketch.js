/*
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 *  Gettin Married Drawing Tool  * 
for Brittany Nelson & Steffi Hessler
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
*/

let c1, c2
//let scaleVal = 1
//let intialSize


function setup() {
  let canvas = createCanvas(windowWidth, windowHeight)
  //initialSize = min(width, height)
  canvas.parent("p5canvas")
  resetSketch()

}


function resetSketch() {

  let xMargin = windowWidth * .075
  let yMargin = windowHeight * .065
  let interfaceMargin = windowWidth/8
  let xPos = (windowWidth/8)/2 - (windowWidth * .09)/2
  let butXPos = (windowWidth/8)/2
  
// create drawing tool interfaces (brush, brushCol, scale, save, clear)
  // brush shape
  selBrush = createSelect()
  selBrush.position(xPos, yMargin/2)
  selBrush.style('width', '9vw')
  selBrush.style('font-family', 'Times New Roman, Times, serif')
  selBrush.style('font-')
  selBrush.option('Round')
  selBrush.option('Chisel Tip')
  selBrush.option('Square')
  selBrush.selected('Circle')
          //selBrush.changed(changePreview)
  // brush color
  colorPicker = createColorPicker(color('Orange'))
  colorPicker.position(xPos, yMargin * 1.2)
  colorPicker.style('width', '8.65vw')
  colorPicker.style('height', '1vh')
  // brush size
  scaleSlider = createSlider(0, 100, 20);
  scaleSlider.position(xPos, windowHeight/3 + yMargin/2)
  scaleSlider.style('width', '9vw')
    // brush angle
    rotateSlider = createSlider(0, 180, 30)
    rotateSlider.position(xPos, windowHeight/3 + yMargin*2)
    rotateSlider.style('rotate','30')
    rotateSlider.style('width', '9vw')
  


  clearDrawing = createButton('❌')
  clearDrawing.position(butXPos, displayHeight - yMargin * 2.5)
  clearDrawing.style('width', '2.5vw')
  clearDrawing.style('height', '2.5vw')
  clearDrawing.style('stroke-width', 'red')
  clearDrawing.style('background-color', 'white')
  clearDrawing.mousePressed(resetSketch)

  saveDrawing = createButton('💾')
  saveDrawing.position(interfaceMargin - xMargin, height - yMargin)
  saveDrawing.style('width', '2.5vw')
  saveDrawing.style('height', '2.5vw')
  saveDrawing.style('background-color', 'white')
  saveDrawing.mousePressed(saveFile)



  
    // interface/gui styling
    push()
    fill('white')
    noStroke()
    rect(0, 0, (windowWidth/8) - 1, windowHeight)
    pop()

    push()
    stroke('black')
    strokeWeight(1)
    // line(x1, y1, x2, y2)
    line(windowWidth/8, 0, windowWidth/8, windowHeight)
    line(0, yMargin * 2, windowWidth/8, yMargin * 2)
    line(0, windowHeight/3, windowWidth/8, windowHeight/3)
    line(0, windowHeight/3 * 2, windowWidth/8, windowHeight/3 * 2)
    pop()
  
    brushLayer = createGraphics(windowWidth-interfaceMargin, windowHeight);

}


function draw() {
  
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
          brushLayer.ellipse(imgX, imgY, scaleVal)
          brushLayer.pop()     
          } 
            else if (val === 'Chisel Tip') {
              brushLayer.push()
              //brushLayer.rotate(30)
              brushLayer.translate(imgX - windowWidth/8, imgY)
              brushLayer.rotate(rotateSlider.value())
              brushLayer.noStroke()
              brushLayer.fill(colorPicker.color())
              brushLayer.rect(0, 0, scaleVal, scaleVal/2.5, scaleVal/3)
              brushLayer.pop()     
              } 
                else if (val === 'Square') {
                  brushLayer.push();
                  brushLayer.translate(-windowWidth/8, 0)
                  brushLayer.fill('Black')
                  brushLayer.noStroke()
                  brushLayer.ellipse(imgX, imgY, scaleSlider.value())
                  brushLayer.pop()     
                } 

  
  
  }
  
 

  image(brushLayer, windowWidth/8 + drawingMargin, 0);
}




// function changePreview() {
//   let val = selBrush.value()
//   fill('Red')
//   ellipse(10, 10, 30)
//     if (val === 'Circle') {
//       fill('Red')
//       ellipse(10, 10, 30)
//     } else if (val === 'Triangle'){
//       fill('Blue')
//       ellipse(10, 10, 30)
//     } else if (val === 'Square'){
//       fill('Green')
//       ellipse(10, 10, 30)
//     }
//     }





// function changeBg() {
//   let val = selBg.value()
//     if (val === 'White') {
//       bgCol = color(255)
//     } else if (val === 'Black'){
//       bgCol = color(0)
//     } else if (val === 'Brown'){
//       bgCol = color('Brown')
//     }
//     }
// }


// function windowResized(){
//   resizeCanvas(windowWidth, windowHeight)
//   let size = min(width, height)
//   scaleVal = size / initialSize

// }






function saveFile() {
  saveCanvas(brushLayer, 'forBrittanyAndSteffi', 'png');
}


