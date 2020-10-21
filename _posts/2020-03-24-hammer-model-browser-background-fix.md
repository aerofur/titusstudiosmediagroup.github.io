---
layout: blog
title: "First Time Skiing!"
category: "blog"
description: "My first time Skiing at Whakapapa on Mt Ruapehu"
tags: [ hammer, sourceengine, bugfix, csharp, blog, 2020 ]
---

# Hammer Model Browser Background Fix

## Scope
To change the background of the Hammer Editor Model Browser, which in some cases is transparent by default.

**Before:**
![Hammer Model Browser Before Fix](https://i.imgur.com/SSbVD3J.jpg)

**After:**
![Hammer Model Browser After Fix](https://i.imgur.com/RMvZl1I.jpg)


First navigate to the Editors Game Directory (ex, `C:\SteamLibrary\steamapps\common\Source SDK Base 2013 Singleplayer\`)
Once you are in the Games Directory, head to, `\platform\resource`, and search for `sourceschemebase.res` and open it with a text editor.

You should see something like this in the file;

```csharp
Scheme
{
	//////////////////////// COLORS ///////////////////////////
	// color details
	// this is a list of all the colors used by the scheme
	Colors
	{
		// base colors
		"White"				"255 255 255 255"
		"OffWhite"			"221 221 221 255"
		"DullWhite"			"55 55 55 255"
		"Orange"			"255 155 0 255"
		"TransparentBlack"	"0 0 0 128"
		"Black"				"0 0 0 255"

		"Blank"				"0 0 0 0"
		
		"SteamLightGreen"	"157 194 80 255"
		"AchievementsLightGrey"		"79 79 79 255"
		"AchievementsDarkGrey"		"55 55 55 255"
		"AchievementsInactiveFG"	"130 130 130 255"
	}
```

Under the `BaseSettings` confg, find `Panel.BgColor` (around line 124)

Change `"Blank"` to one of the color indexs in the `Colors` confg.

Ex, `Panel.BgColor					"Blank"` to, `Panel.BgColor					"DullWhite"`.

Save and Exit the file, and restart Hammer.

>**NOTE:** This config __might__ not save if you verify game files.
