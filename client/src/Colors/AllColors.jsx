export const colors = [
    "White",
    "Black",
    "Red",
    "Green",
    "Blue",
    "Yellow",
    "Purple",
    "Brown",
    "Silver",
    "Pink",
    "Aqua",
    "Grey",
    "Sand",
    "LimeGreen",
    "Gold"
]

export const colorsHex = [
    [255, 255, 255, 255], //White
    [0  , 0  , 0  , 255], //Black
    [194, 54 , 22 , 255], //Red
    [5  , 196, 107, 255], //Green
    [30 , 55 , 153, 255], //Blue
    [255, 242, 0  , 255], //Yellow
    [142, 68 , 173, 255], //Purple
    [234, 181, 67 , 255], //Brown
    [165, 177, 194, 255], //Silver
    [253, 167, 223, 255], //Pink
    [116, 185, 255, 255], //Aqua
    [99 , 110, 114, 255], //Grey
    [255, 218, 121, 255], //Sand
    [46 , 213, 115, 255], //LimeGreen
    [241, 196, 15 , 255], // Gold
]

export function colorToHEX(color){
    if(color === "White")       {return(colorsHex[0 ])}
    if(color === "Black")       {return(colorsHex[1 ])}
    if(color === "Red")         {return(colorsHex[2 ])}
    if(color === "Green")       {return(colorsHex[3 ])}
    if(color === "Blue")        {return(colorsHex[4 ])}
    if(color === "Yellow")      {return(colorsHex[5 ])}
    if(color === "Purple")      {return(colorsHex[6 ])}
    if(color === "Brown")       {return(colorsHex[7 ])}
    if(color === "Silver")      {return(colorsHex[8 ])}
    if(color === "Pink")        {return(colorsHex[9 ])}
    if(color === "Aqua")        {return(colorsHex[10])}
    if(color === "Grey")        {return(colorsHex[11])}
    if(color === "Sand")        {return(colorsHex[12])}
    if(color === "LimeGreen")   {return(colorsHex[13])}
    if(color === "Gold")        {return(colorsHex[14])}
} 