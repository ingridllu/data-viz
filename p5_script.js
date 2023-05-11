let cnv;

let momImg;
let babyImg;
let families = [];

let table;

function preload() {
  babyImg = loadImage('baby.png');
  momImg = loadImage('woman.png')

  table = loadTable('data/birth_rate_clean.csv', 'csv', 'header');
}

function setup() {
  cnv = createCanvas(windowWidth, 6150);
  cnv.parent("myP5");
  windowResized();


  for (let r = 0; r < table.getRowCount()-3; r += 3) {
    // Name,Code,1990,2000,2012,2013,2014,2015,2016,2017,2018,2019,2020
    let country1 = table.getString(r, 0);
    let country2 = table.getString(r + 1, 0);
    let country3 = table.getString(r + 2, 0);
    let country4 = table.getString(r + 3, 0);
    let birthRate19901 = +table.getString(r, 12);
    let birthRate19902 = +table.getString(r + 1, 12);
    let birthRate19903 = +table.getString(r + 2, 12);
    let birthRate19904 = +table.getString(r + 3, 12);
    let x = 0;
    families.push(new Family(x, 30 * r, country1, birthRate19901));
    families.push(new Family(x + windowWidth / 4, 30 * r, country2, birthRate19902));
    families.push(new Family(x + windowWidth / 2, 30 * r, country3, birthRate19903));
    families.push(new Family(x + 3 * windowWidth / 4, 30 * r, country4, birthRate19904));

  }
  //if r%2=0 this x if r%2=1 other x

  // families.push(new Family(0, 0, "USA", table.getString(r, 0)));
  //   families.push(new Family(0, 60, "China", 2.5));
}

function draw() {
  // background('red');
  background("white");
  displayCountries();
}

function displayCountries() {
  for (const family of families) {
    family.display();
  }
}



// Chat GPT
function windowResized() {
  // When the window is resized, get the new dimensions of the parent divre
  let canvasContainer = select("#myP5");
  let cW = canvasContainer.width;
  let cH = canvasContainer.height;
  resizeCanvas(cW, cH);
}