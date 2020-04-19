# Protogen Build
*An ongoing project*, as of April 2020.

## Table of Contents
* Introduction
* Shopping List
* Electronics
  * Microcontroller
  * LED Matrices
    * MAX7219
    * Matrix Sizes
  * Wiring
* Code
  * Libraries
    * LedControl
    * Binary
  * Data Arrays
  * Display Initialization
  * Display Byte Function
  * Running Code
* 3D Printing
* Manual Work
* Painting
* Fur
* Final Touches


# Electronics
The project revolves around an Arduino Nano, and the MAX7219 chip. 

## Microcontroller

I choose an Arduino Nano for its small size and portability, only needing a USB cable for power, I can run the whole setup on a USB battery bank, which in theory can run for a few hours with the displays on full brightness.


## MAX7219

The LED matrices that will be used in the visor are controlled using a MAX7219, which is a microchip that can drive 7-segment, bar-graph or an 8x8 LED matrix that interfaces using a 10MHz Serial Interface, meaning you only need 3 wires to control up to 8 8x8 LED matrices using the LEDControl Library for Arduinos. 


## Matrix Sizes

The Kaiborg Studios “Protogen Suit Kits”, which is what I am using for my head base, have an inner and outer visor. The inner visor is for the LED matrices to be mounted to, and the outer visor is a vacuum formed sheet of plastic that is tinted. The inner visor is made to house one; 8x32,8x16 and 8x8 LED matrices per side, a total of 2, 8x32, 8x16, and 8x8 LED matrices is required. You can find thousands of LED matrices online, for very cheap. 

Most of these LED matrices come in either 8x8 or 8x32 sizes, and the larger ones can be cut to your own size, as they are 8x8 matrices chained together (*I am going to cut the PCB to my custom size*). Note that these LED matrices usually only come in Red, Green or Blue. Full RGB versions are available however they don’t use the MAX7219 chip, as far as I am aware.

In my case I am going to buy 4 8x32 LED matrices, in the color blue, and use 2 for the Mouth, cut one in half for the Eyes, and one into quarters for the Nose, and I will have 2 remainder for backup in case something breaks along the road. 
My LED matrices come with wires to connect them to the Arduino Nano, but check if yours do.


# Code

## LedControl

An Arduino library for MAX7219 and MAX7221 Led display drivers

**Download and install**

The latest version of the library is on the github project pages. [LedControl release page](https://github.com/wayoda/LedControl/releases)

Download the LedControl-<version>.zip-file tagged Latest release. This file contains the libary and a few example sketches. You don't need any of the Source code files which are also on the release page.

Install the library following the guidelines on the Arduino homepage: [Arduino Library install guide](http://arduino.cc/en/pmwiki.php?n=Guide/Libraries)


## Binary

Just the Binary library for Arduinos, used in the Arrays. This library is included with the Arduino IDE, no download needed.


## Data Arrays

I am using arrays for each displays data, keeps thing clean and allows for some flexibility when debugging or making large changes.
The arrays have 8 sets of 8 bits, In a set; 1 corresponds to a lit LED in the matrix, and a 0 is a unlit one. Each set is one row on a display.

I am using the following "Display States" for my Protogen:

```cpp
// Display States (Left Side)
byte dispMouth1[8] = {B00100000,B01111000,B11011110,B11000111,B11111111,B00000000,B00000000,B00000000};
byte dispMouth2[8] = {B00000000,B00000000,B00000000,B10000000,B11100000,B01111000,B00011110,B00000111};
byte dispMouth3[8] = {B00000000,B00000000,B00000000,B00000000,B00000111,B00011110,B01111000,B11100000};
byte dispMouth4[8] = {B00000000,B00000000,B00000000,B11100000,B11111000,B00011110,B00000111,B00000001};

byte dispEyeAngry1[8] = {B00000000,B00011111,B00111111,B00111111,B00011111,B00001111,B00000011,B00000000};
byte dispEyeAngry2[8] = {B00000000,B11111100,B11111110,B11111100,B11111000,B11100000,B10000000,B00000000};

byte dispEyeNormal1[8] = {B00001111,B00111111,B01111111,B11111111,B11110000,B01100000,B00000000,B00000000};
byte dispEyeNormal2[8] = {B00000000,B11100000,B11111000,B11111110,B00000111,B00000001,B00000000,B00000000};

byte dispEyeBleep1[8] = {B00000001,B00000111,B00000111,B00001111,B00001111,B00000111,B00000111,B00000001};
byte dispEyeBleep2[8] = {B10000000,B11100000,B11100000,B11110000,B11110000,B11100000,B11100000,B10000000};

byte dispNose[8] = {B00000000,B01111110,B00111111,B00000011,B00000011,B00000001,B00000000,B00000000};


// Display States (Right Side)
byte dispMouth1Mirror[8] = {B00000000,B00000000,B00000000,B00000111,B00011111,B01111000,B11100000,B10000000};
byte dispMouth2Mirror[8] = {B00000000,B00000000,B00000000,B00000000,B11100000,B01111000,B00011110,B00000111};
byte dispMouth3Mirror[8] = {B00000000,B00000000,B00000000,B00000001,B00000111,B00011110,B01111000,B11100000};
byte dispMouth4Mirror[8] = {B00000100,B00011110,B01111011,B11100011,B11111111,B00000000,B00000000,B00000000};

byte dispEyeAngry1Mirror[8] = {B00000000,B00111111,B01111111,B00111111,B00011111,B00000111,B00000001,B00000000};
byte dispEyeAngry2Mirror[8] = {B00000000,B11111000,B11111100,B11111100,B11111000,B11110000,B11000000,B00000000};

byte dispEyeNormal1Mirror[8] = {B00000000,B00000111,B00011111,B01111111,B11100000,B10000000,B00000000,B00000000};
byte dispEyeNormal2Mirror[8] = {B11110000,B11111100,B11111110,B11111111,B00001111,B00000110,B00000000,B00000000};

byte dispEyeBleep1Mirror[8] = {B00000001,B00000111,B00000111,B00001111,B00001111,B00000111,B00000111,B00000001};
byte dispEyeBleep2Mirror[8] = {B10000000,B11100000,B11100000,B11110000,B11110000,B11100000,B11100000,B10000000};

byte dispNoseMirror[8] = {B00000000,B01111110,B11111100,B11000000,B11000000,B10000000,B00000000,B00000000};
```


## Display Initialization

Before you can draw anything on the LED Matrices, you need to initialize them in LedControl.

```cpp
void setup(){

  // -- Display Initialization --
  
  // Display 1
  lc.shutdown(0,false);       
  lc.setIntensity(0,dispBrightness);
  lc.clearDisplay(0);   
}
```

* First you need to tell the display to wake up, and not shutdown - `lc.shutdown(0,false);`
* Secondly you need to set the intensity (brightness) of the matrices, I use a global variable called `dispBrightness`. Just put `int dispBrightness = 15; // Adjust the brightness, maximum is 15` up at the top of your code where all of your variable initialization is. The maximum brightness is 15, and the lowest is 0, which is off.
* Last but not least, you need to clear whatever is still in the MAX7219's memory. - `lc.clearDisplay(0);`

> **NOTE:** The variable "lc" is the LedControl variable, if you are using multiple LedControl variables, make sure you have them set to the correct variable.

> **NOTE:** The "0" Used, is the display number, make sure you repeat this for EVERY display.


## Display Byte Function

Now that all of our displays are properly initialized, we are ready to write data! LedControl makes writing data extremely easy, working on a “Column, Row” system on every display.

> **NOTE:** That every 8x8 display is its own MAX7219 chip, making every 8x8 section a single display. So a 8x32 display wont take 32 bits, only 4 sets of 8 bits for each 8x8 display.

I am using plain binary to write to my displays, because it is human readable which is good for development and debugging.
Since it is tedious to write every row to a single display - *especially with multiple displays* - I am using a small function to write an array (*same data arrays discussed earlier*) to the display.

```cpp
void dispByte(int dispNum, byte character [])
{
  int i = 0;
  for(i=0;i<8;i++)
  {
    lc.setRow(dispNum,i,character[i]);
  }
}
```

 * The function first gets the Display Number, which is "what display am I writing to?".
 * The function then requires the data array. It will write the first 8 bits, and then the next on the next row of the display, and so on.
 
> **NOTE:** Make sure to include the `binary.h` library! - `#include <binary.h>`

## Running Code

Now that we have all of our data arrays, functions and displays init.. we can finally actually print data to the MAX7219's. In the `loop()` add your function, followed by the display number and then the array, and that should do it. 

Example:

```cpp
void loop(){     

  // -- DEFAULT --
  //Right
  dispByte(1,dispMouth1);   
  dispByte(2,dispMouth2); 
  dispByte(3,dispMouth3); 
  dispByte(4,dispMouth4); 
  dispByte(5,dispEyeNormal1);
  dispByte(6,dispEyeNormal2);
  dispByte(7,dispNose);

  //Left
  dispByte2(1,dispMouth1Mirror);    
  dispByte2(2,dispMouth2Mirror); 
  dispByte2(3,dispMouth3Mirror); 
  dispByte2(4,dispMouth4Mirror); 
  dispByte2(5,dispEyeNormal1Mirror);
  dispByte2(6,dispEyeNormal2Mirror);

  delay(1000);
}
```
