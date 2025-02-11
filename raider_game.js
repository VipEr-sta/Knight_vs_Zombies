// Elijah Goglin, Spring 2024, CIS231, Cairn University
// Main Javascript file that has classes, objects, and conditions that allow for combat and movement of the Kinght fighting Zombies 

// Global Variables
let knight;
let zombie;
let knImage;
let zImage;
let backImage;
let doom_scroll = 3;
let scroll_X = 0;
let scroll_X2;
let deadZombies = 0;
let respawn = false;
let zombies = [];
let knightspawn = true;
let killcount = 0;






// knight attributes 
class Knight {
    constructor(x,y, health) {
        this.x = x;
        this.y = y;
        this.health = health;

        
    }  

    
}
// zombie attributes
class Zombie {
    constructor(x,y,health) {
        this.x = x;
        this.y = y;
        this.health = health;
        this.speed = 3;
    }

   // increases zombie speed to the left to balance with the right scrolling of the screen

    move() {
        if (keyIsDown(68)) {
            this.x -= this.speed;
        };
    }

   

    
}



        // respawns zombies 

function create() {
    if (respawn) {
        
    zombies = [];
    zombie = new Zombie(windowWidth-400, windowHeight-200, 20);
    zombie2 = new Zombie(windowWidth -200, windowHeight-200, 20);
    zombie3 = new Zombie(windowWidth, windowHeight-200, 20);
    zombies.push(zombie);
    zombies.push(zombie2);
    zombies.push(zombie3);
    respawn = false;
    deadZombies = 0;
    console.log(knight);
    console.log(zombies[0],zombies[1],zombies[2]);
    }
    }

    

// images loaded 

function preload() {
    knImage = loadImage('Protect.png');
    backImage = loadImage('backgrounds/PNG/game_background_1/day.png');
    zImage = loadImage('zombie/ZombieMan/zombie11.png');
    
}

function setup() {
    
   
    createCanvas(windowWidth, windowHeight);
    scroll_X2 = width;
    
    
    // Image size
    knImage.resize(200,200);
    zImage.resize(200,200);
    
    

    // Creating Objects
    
    create();
    // initial zombie creation
    knight = new Knight(windowWidth/2, windowHeight-200, 50);
    zombie = new Zombie(windowWidth-400, windowHeight-200, 20);
    zombie2 = new Zombie(windowWidth -200, windowHeight-200, 20);
    zombie3 = new Zombie(windowWidth, windowHeight-200, 20);
    

    zombies = [zombie,zombie2,zombie3];
    // uses weather api and changes the enemy health depending on the weather in Langhorne, PA
    fetch('https://api.openweathermap.org/data/3.0/onecall?lat=40.174553&lon=-74.922668&units=imperial&appid=a075b65a78519183c48060fda15a33db')
    .then(response => response.json())
    .then(data => {
        const Temp = data.current.temp;
        if (Temp < 50) {
            zombie.health = zombie.health;
            zombie2.health = zombie2.health;
            zombie3.health = zombie3.health;

        }
        else if (Temp > 50) {
            zombie.health += 30;
            zombie2.health += 30;
            zombie3.health += 30;
            console.log(zombie.health);

        }

    })
    .catch(error => console.error(error)); 

    
    
    
   

} 


function draw() {
    
    
   // displays kill amount
    
    Count.innerHTML = killcount;
    // function that removes all elements to allow the screen to continue scrolling forever
    clear();
// zombies move left to account for the screen scrolling right with the appearence of being stationary
    for (let i = 0; i < zombies.length; i++) {
        zombies[0].move();
        zombies[1].move();
        zombies[2].move();
        image(zImage, zombies[i].x, zombies[i].y);
        
    }
    
    
    
    // displays background image
    
    image(backImage, scroll_X, 0, width, height);
    image(backImage, scroll_X2, 0, width, height);
    

 
    

   

   
// use the D key to move the knight right
    
    if (keyIsDown(68)) {
        //right
        
        console.log(this.x);
        scroll_X -= doom_scroll;
        scroll_X2 -= doom_scroll;

        if (scroll_X < -width) {
            scroll_X =  width;
        }
    
         if (scroll_X2 < -width) {
            scroll_X2 =  width;
        } 
    }
    // sets image mode to corner
    imageMode(CORNER);
    
// displays images of knight and zombies
    
    image(knImage, knight.x, knight.y);
    image(zImage, zombie.x, zombie.y);
    image(zImage, zombie2.x, zombie2.y);
    image(zImage, zombie3.x, zombie3.y);

    
    if (knight.health < 0) {
        knight.health = 0;
    }
   
    

    if (respawn) {
        create(); // Create zombies when respawn is true
        respawn = false;
    }
  // loop for zombies array
    for (let index = 0; index < zombies.length; index++) {
        // collision detection
    let position = abs(knight.x - zombies[index].x);
// zombie damage
    if (position < 35) {
        knight.health -= 0.1;
        console.log(knight.health);
       
    }
    // reload page if knight dies
    if (knight.health <= 0 && knightspawn) {
        
        location.reload();
        
        
        console.log(knight.health);
       
    
    }



   

}



    
    
   
}

function keyPressed() {
    // tab key heals knight but only when colliding with zombie
    if (keyCode == 9) {
        knight.health += 1;
        if (knight.health <= 0) {
            knightspawn = true;
        }
    }
   
    for (let index = 0; index < zombies.length; index++) {
        // gets the absolute value of the position of the zombies in the array
       let position = abs(knight.x - zombies[index].x);
    // press spacebar to attack the enemy

    
    
    if (keyCode == 32) {
    // 
   
        
        
        
    
   
        
        // code for collision between knight and zombie to start attack
        
        if (position < 35) {
            zombies[index].health -= 10;
            if (zombies[index].health <= 0) {
                zombies[index].y = 1000000;
                deadZombies++;
                killcount++;
                console.log("Counter : " +  killcount)
                console.log(deadZombies);
                console.log(zombies[index].health);

                
               

                
            }
        
            if (deadZombies == zombies.length) {
                respawn = true;
                create();
                
            }

            

        }


    
    
        
        
            
        

         

    }

    

    if (knight.health <= 0) {
        knightspawn = true;
    }

    
}





    

}
        

            
            
        



    
       
    
    
    
