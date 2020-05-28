// export function percentToColor(perc: number) {
//   perc = perc * 100
//   var r, g, b = 0;
//   if (perc < 50) {
//     r = 255;
//     g = Math.round(5.1 * perc);
//   }
//   else {
//     g = 255;
//     r = Math.round(510 - 5.10 * perc);
//   }
//   var h = r * 0x10000 + g * 0x100 + b * 0x1;
//   return '#' + ('000000' + h.toString(16)).slice(-6);
// }

export function dataAttributes(data: any) {
  const min_value = Math.min(...data)
  const max_value = Math.max(...data)
  const range = max_value-min_value
  return [min_value,max_value,range]
}

export function newPickColor(clrs: any, weight: number) {
  const [clr1, clr2, clr3] = clrs
  var color1, color2;
  if (weight < 0.5) {
    weight = weight*2
    color1 = clr2
    color2 = clr1
  } else {
    weight = (weight-0.5)*2
    color1 = clr3
    color2 = clr2
  }
  var w1 = weight;
  var w2 = 1 - w1;
  var rgb = [
    Math.round(color1[0] * w1 + color2[0] * w2),
    Math.round(color1[1] * w1 + color2[1] * w2),
    Math.round(color1[2] * w1 + color2[2] * w2)
  ];
  return rgb;
}

export function pickColor(clr1, clr2, clr3, weight) {
  var color1, color2;
  if (weight < 0.5) {
    weight = weight*2
    color1 = clr2
    color2 = clr1
  } else {
    weight = (weight-0.5)*2
    color1 = clr3
    color2 = clr2
  }
  var w1 = weight;
  var w2 = 1 - w1;
  var rgb = [
    Math.round(color1[0] * w1 + color2[0] * w2),
    Math.round(color1[1] * w1 + color2[1] * w2),
    Math.round(color1[2] * w1 + color2[2] * w2)
  ];
  return rgb;
}

export function HSVtoRGB(hsv) {
  var {h,s,v} = hsv
  let f= (n,k=(n+h/60)%6) => v - v*s*Math.max( Math.min(k,4-k,1), 0);     
  // return [f(5),f(3),f(1)];  
  return [
    Math.round(f(5) * 255),
    Math.round(f(3) * 255),
    Math.round(f(1) * 255)
  ];
}

export function rgbToHsv (rgb) {
  var [r,g,b] = rgb;
  var computedH = 0;
  var computedS = 0;
  var computedV = 0;
 
  r=r/255; g=g/255; b=b/255;
  var minRGB = Math.min(r,Math.min(g,b));
  var maxRGB = Math.max(r,Math.max(g,b));
 
  // Black-gray-white
  if (minRGB==maxRGB) {
   computedV = minRGB;
   return {h: 0,s: 0,v: computedV};
  }
 
  // Colors other than black-gray-white:
  var d = (r==minRGB) ? g-b : ((b==minRGB) ? r-g : b-r);
  var h = (r==minRGB) ? 3 : ((b==minRGB) ? 1 : 5);
  computedH = 60*(h - d/(maxRGB - minRGB));
  computedS = (maxRGB - minRGB)/maxRGB;
  computedV = maxRGB;
  return {h: computedH,s: computedS, v: computedV};
 }


 export function localeFormatter(number: number, locale: string, type: string, digits: number) {
    return number.toLocaleString(
      locale, 
      {
       style: type, 
       minimumFractionDigits: digits 
      }
    )
 }