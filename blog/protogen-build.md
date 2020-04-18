# Protogen Build
*An ongoing project*, as of April 2020.

## Table of Contets
 * [Introduction](#introduction)
  * [The Electronics](#the-electronics)
  

## Introduction

Over the next few months, I will be building a “Protogen” Suit, and will be documenting my progress so others can too, as its fairly straight forward. 

I will begin with the electronics; what to buy, wiring, code, etc. And moving onto 3D printing, and finally covering it in fur. In which I plan to have some experts, such as “SparkyCanDo” as guests who can give us some insight into what they do as a hobby, and some as a career. 

## The Electronics

The project revolves around an Arduino Nano, and the MAX7219 chip. 
I choose an Arduino Nano for its small size and portability, only needing a USB cable for power, I can run the whole setup on a USB battery bank, which in theory can run for a few hours with the displays on full brightness, however this needs to be tested.  

The LED matrices that will be used in the visor are controlled using a MAX7219, which is a microchip that can drive 7-segment, bar-graph or an 8x8 LED matrix that interfaces using a 10MHz Serial Interface, meaning you only need 3 wires to control up to 8 8x8 LED matrices using the LEDControl Library for Arduinos. 

## LED Matrix Wiring 

The advantage of using the MAX7219 chip, is that it only needs 3 wires to send and display data, as it uses a 10MHz serial interface, it also means you can daziy chain multiple panels. The LED matrices have 5 pins on the input side, VCC (5VDC), Ground, Data In (DIN), Load Pluse (CS) and Clock (CLK). The output side allows you to daziy chain other displays, you just connect the output of the first display, to the input of the second one, and so on.

![protogen led matrix wiring](https://www.titusstudios.net/data/static/images/blog/protogen-build/ledmatix-wiring.png)

## LED Control

I will be using the [LED Control library](https://github.com/wayoda/LedControl) on my Ardunio Nano, for controlling the LED matrices.

> LedControl is an Arduino library for MAX7219 and MAX7221 Led display drivers.

The LedControl library can only control up to 8, displays. I have a total of 7, 8x8 LED matrices, and I will have 7 displays (for one side) on pins; 10, 9, 8.. and the other side on pins; 7, 6, 5.

```cpp
#include <LedControl.h>
#include <binary.h>
int lcDIN = 10;
int lcCS =  9;
int lcCLK = 8;

int lc2DIN = 7;
int lc2CS =  6;
int lc2CLK = 5;

LedControl lc = LedControl(lcDIN,lcCLK,lcCS,7); // DIN CLK CS DISPNUM
LedControl lc2 = LedControl(lc2DIN,lc2CLK,lc2CS,7); // DIN CLK CS DISPNUM
```

![protogen arudino led matrix wiring](https://www.titusstudios.net/data/static/images/blog/protogen-build/ledmatix-arduino-wiring.png)

## Display Daziy Chaining

The MAX7219 allows displays to be daizy chained. Displays in the code will begin at interger 0, on the first display, and will rise to a max of 8 displays, when using LedControl. If you have more displays you can add another set of displays to another 3 digital output pins, and adding another display veriable.

## The Code

The really cool thing about using LedControl, is that you can send straight binary to the matrix displays, which is what I prefer for adding expressions, or fixing bugs on the fly - it is human readable.

So if I send the following data `B00000000,B01111110,B11111100,B11000000,B11000000,B10000000,B00000000,B00000000` to a single display, this theoretically should be the output:

![protogen serial interface](https://www.titusstudios.net/data/static/images/blog/protogen-build/ledmatix-serialinterface.png)
