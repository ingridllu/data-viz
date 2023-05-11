class Family {

    constructor(x, y, name, birthrate) {
      this.x = x;
      this.y = y;
      this.name = name;
      this.birthrate = birthrate;
      this.babyWidth = 35
      this.babyHeight = 35
    }
  
    display() {
      image(momImg, this.x + 5, this.y+10, 40, 80);
      let x = 0;
      for(let i = 0; i<ceil(this.birthrate); i++){
        x = 40+i*35;
       image(babyImg, this.x + x, this.y+35, this.babyWidth, this.babyHeight); 
      }
  
      fill('white');
      noStroke();
      let remainingFraction = ceil(this.birthrate) - this.birthrate;
      let widthBox = remainingFraction * this.babyWidth;
      rect(this.x + x+(this.babyWidth - widthBox), this.y+35, widthBox, this.babyHeight)
      fill('black')
      text(this.name, this.x, this.y+10)
    }
  }