var planets = 
{
    sun:
    {
        diameter:           1391400,            //km
        rotation_period:    587.28,             //hours
        axial_tilt:         0.0,                //deg
    },

    mercury: 
    {
        diameter:           4879,               //km
        rotation_period:    1407.6,             //hours
        axial_tilt:         0.01,               //deg
        a0:                 0.38709927,         //AU
        adot:               0.00000037,         //AU/century
        e0:                 0.20563593,         //rad
        edot:               0.00001906,         //rad/century
        i0:                 7.00497902,         //deg
        idot:               -0.00594749,        //deg/century
        L0:                 252.25032350,       //deg
        Ldot:               149472.67411175,    //deg/century
        p0:                 77.45779628,        //deg
        pdot:               0.16047689,         //deg/century
        W0:                 48.33076593,        //deg
        Wdot:               -0.12534081,        //deg/century
    },

    venus: 
    {
        diameter:           12104,              //km
        rotation_period:    -5832.5,            //hours -> probably take abs because tilt indicates backwards rotation
        axial_tilt:         177.4,              //deg
        a0:                 0.72333566,         //AU
        adot:               0.00000390,         //AU/century
        e0:                 0.00677672,         //rad
        edot:               -0.00004107,        //rad/century
        i0:                 3.39467605,         //deg
        idot:               -0.00078890,        //deg/century
        L0:                 181.97909950,       //deg
        Ldot:               58517.81538729,     //deg/century
        p0:                 131.60246718,       //deg
        pdot:               0.00268329,         //deg/century
        W0:                 76.67984255,        //deg
        Wdot:               -0.27769418,        //deg/century
    },

    earth: 
    {
        diameter:           12756,              //km
        rotation_period:    23.9,               //hours
        axial_tilt:         23.439281,          //deg
        a0:                 1.00000261,         //AU
        adot:               0.00000562,         //AU/century
        e0:                 0.01671123,         //rad
        edot:               -0.00004392,        //rad/century
        i0:                 -0.00001531,        //deg
        idot:               -0.01294668,        //deg/century
        L0:                 100.46457166,       //deg
        Ldot:               35999.37244981,     //deg/century
        p0:                 102.93768193,       //deg
        pdot:               0.32327364,         //deg/century
        W0:                 0.0,                //deg
        Wdot:               0.0,                //deg/century
    },

    moon: //see explanation for how to get missing planets0s
    {
        diameter:           3475,
        rotation_period:    655.7,
        axial_tilt:         1.5424,
        a0:                 384400, //km
        adot:               null,
        e0:                 0.0554,
        edot:               null,
        i0:                 5.16,   //deg
        idot:               null,
        L0:                 null,
        Ldot:               null,
        p0:                 null,
        pdot:               null,
        W0:                 125.08, //deg
        Wdot:               null,

        arg_of_periapsis:   318.15, //deg 
    },

    mars: 
    {
        diameter:           6792,               //km
        rotation_period:    24.6,               //hours
        axial_tilt:         25.19,              //deg
        a0:                 1.52371034,         //AU
        adot:               0.00001847,         //AU/century
        e0:                 0.09339410,         //rad
        edot:               0.00007882,         //rad/century
        i0:                 1.84969142,         //deg
        idot:               -0.00813131,        //deg/century
        L0:                 -4.55343205,        //deg
        Ldot:               0.32327364,         //deg/century
        p0:                 -23.94362959,       //deg
        pdot:               0.44441088,         //deg/century
        W0:                 49.55953891,        //deg
        Wdot:               -0.29257343,        //deg/century
    },

    //ceres:null;

    jupiter: 
    {
        diameter:           142984,             //km
        rotation_period:    9.9,                //hours
        axial_tilt:         3.13,               //deg
        a0:                 5.20288700,         //AU
        adot:               -0.00011607,        //AU/century
        e0:                 0.04838624,         //rad
        edot:               -0.00013253,        //rad/century
        i0:                 1.30439695,         //deg
        idot:               -0.00183714,        //deg/century
        L0:                 34.39644051,        //deg
        Ldot:               3034.74612775,      //deg/century
        p0:                 14.72847983,        //deg
        pdot:               0.21252668,         //deg/century
        W0:                 100.47390909,       //deg
        Wdot:               0.20469106,         //deg/century
    },

    saturn: 
    {
        diameter:           120536,             //km
        ring_inner_diameter: 67300,             //km
        ring_outer_diameter: 140300,            //km
        rotation_period:    10.7,               //hours
        axial_tilt:         26.73,              //deg
        a0:                 9.53667594,         //AU
        adot:               -0.00125060,        //AU/century
        e0:                 0.05386179,         //rad
        edot:               -0.00050991,        //rad/century
        i0:                 2.48599187,         //deg
        idot:               0.00193609,         //deg/century
        L0:                 49.95424423,        //deg
        Ldot:               1222.49362201,      //deg/century
        p0:                 92.59887831,        //deg
        pdot:               -0.41897216,        //deg/century
        W0:                 113.66242448,       //deg
        Wdot:               -0.28867794,        //deg/century
    },

    uranus: 
    {
        diameter:           51118,              //km
        rotation_period:    -17.2,              //hours
        axial_tilt:         97.77,              //deg
        a0:                 19.18916464,        //AU
        adot:               -0.00196176,        //AU/century
        e0:                 0.04725744,         //rad
        edot:               -0.00004397,        //rad/century
        i0:                 0.77263783,         //deg
        idot:               -0.00242939,        //deg/century
        L0:                 313.23810451,       //deg
        Ldot:               428.48202785,       //deg/century
        p0:                 170.95427630,       //deg
        pdot:               0.40805281,         //deg/century
        W0:                 74.01692503,        //deg
        Wdot:               0.04240589,         //deg/century
    },

    neptune: 
    {
        diameter:           49528,              //km
        rotation_period:    16.1,               //hours
        axial_tilt:         28.32,              //deg
        a0:                 30.06992276,        //AU
        adot:               0.00026291,         //AU/century
        e0:                 0.00859048,         //rad
        edot:               0.00005105,         //rad/century
        i0:                 1.77004347,         //deg
        idot:               0.00035372,         //deg/century
        L0:                 -55.12002969,       //deg
        Ldot:               218.45945325,       //deg/century
        p0:                 44.96476227,        //deg
        pdot:               -0.32241464,        //deg/century
        W0:                 131.78422574,       //deg
        Wdot:               -0.00508664,        //deg/century
    },

    pluto: 
    {
        diameter:           2370,               //km
        rotation_period:    -153.3,             //hours
        axial_tilt:         119.61,             //deg
        a0:                 39.48211675,        //AU
        adot:               -0.00031596,        //AU/century
        e0:                 0.24882730,         //rad
        edot:               0.00005170,         //rad/century
        i0:                 17.14001206,        //deg
        idot:               0.00004818,         //deg/century
        L0:                 238.92903833,       //deg
        Ldot:               145.20780515,       //deg/century
        p0:                 224.06891629,       //deg
        pdot:               -0.04062942,        //deg/century
        W0:                 110.30393684,       //deg
        Wdot:               -0.01183482,        //deg/century
    },
};

function deg2rad(x) { return THREE.Math.degToRad(x); }
function cosd(x) { return Math.cos(deg2rad(x)); }
function sind(x) { return Math.sin(deg2rad(x)); }


function get_pos(planet, time)   //t is a date
{   
    //Explanation of how to compute cartesian coordinates from orbital planetseters
    //https://space.stackexchange.com/questions/8911/determining-orbital-position-at-a-future-point-in-time

    //t is a date. compute milliseconds from J2000 to t
    var tMillisFromJ2000 = time - new Date( 2000, 0, 1, 12, 0, 0 ).getTime();
    var tCenturiesFromJ2000 = tMillisFromJ2000 / ( 1000 * 60 * 60 * 24 * 365.25 * 100 );

    // console.log(tMillisFromJ2000);
    // console.log(tCenturiesFromJ2000);

    // planetseters from JPL table: https://ssd.jpl.nasa.gov/txt/p_elem_t1.txt
    var a = planet.a0 + planet.adot * tCenturiesFromJ2000;    //semi-major axis               [AU]
    var e = planet.e0 + planet.edot * tCenturiesFromJ2000;    //eccentricity
    var i = planet.i0 + planet.idot * tCenturiesFromJ2000;    //inclination                   [deg]
    var L = planet.L0 + planet.Ldot * tCenturiesFromJ2000;    //mean longitude                [deg]
    var p = planet.p0 + planet.pdot * tCenturiesFromJ2000;    //longitude of periapsis        [deg]
    var W = planet.W0 + planet.Wdot * tCenturiesFromJ2000;    //longitude of ascending node   [deg]


    var M = L - p; //compute Mean anomoly           [deg]
    var w = p - W; //compute Argument of periapsis  [deg]

    // Solve Kepler's equation using Newton's method
    var E = 0.8;//(e < 0.8 ? M : Math.PI);     //eccentric anomaly initial guess (if highly eccentric, init guess is pi, else init guess is M)
    var dE = 0;    //slope at current estimate
    do             //iterate until estimate for E is good enough
    {
      dE = (E - e * sind(E) - M)/(1 - e * cosd(E));
      E -= dE;
    }
    while ( Math.abs(dE) > 1e-6 );

    var P = a * (cosd(E) - e);
    var Q = a * sind(E) * Math.sqrt(1 - Math.pow(e, 2));

    // rotate by argument of periapsis
    var x = cosd(w) * P - sind(w) * Q;
    var y = sind(w) * P + cosd(w) * Q;
    // rotate by inclination
    var z = sind(i) * x;
        x = cosd(i) * x;
    // rotate by longitude of ascending node
    var xtemp = x;
    x = cosd(W) * xtemp - sind(W) * y;
    y = sind(W) * xtemp + cosd(W) * y;

    var pos = [x, y, z] //position in AU, relative to the origin (sun unless calculating for a moon)
    return pos;
};

/*
for tables see: https://ssd.jpl.nasa.gov/?planet_pos
https://ssd.jpl.nasa.gov/txt/p_elem_t1.txt
https://ssd.jpl.nasa.gov/txt/p_elem_t2.txt


Needed planetseters for calculating position in space


orbital planetseters
semi-major axis     [a]
eccentricity        [e]
inclination         [i]
right ascension of the ascending node [Ω]
mean longitude      [L = bar{ω} + M]
longitude of periapsis [bar{ω} = Ω + ω]



a0, adot


Process:
//t = time in centuries from J2000
var tMillisFromJ2000 = Date.now() - Date.UTC(2000, 0, 1, 12, 0, 0);
var tCenturiesFromJ2000 = tMillisFromJ2000 / (1000*60*60*24*365.25*100);

// a0 = 1.00000261; adot = 0.00000562 -> from jpl table a
var a = a0 + adot * tCenturiesFromJ2000;

//other planetseters from table
var e = e0 + edot * tCenturiesFromJ2000;
var i = i0 + idot * tCenturiesFromJ2000;
var L = L0 + Ldot * tCenturiesFromJ2000;
var p = p0 + pdot * tCenturiesFromJ2000;
var W = W0 + Wdot * tcenturiesFromJ2000;


var M = L - p \\ p is the longitude of periapsis
var w = p - W \\ W is the longitude of the ascending node

// Solve Kepler's equation using Newton's method
E = M;
var dE = 0;
while(true) {
  dE = (E - e * Math.sin(E) - M)/(1 - e * Math.cos(E));
  E -= dE;
  if( Math.abs(dE) < 1e-6 ) break;
}

var P = a * (Math.cos(E) - e);
var Q = a * Math.sin(E) * Math.sqrt(1 - Math.pow(e, 2));

// rotate by argument of periapsis
var x = Math.cos(w) * P - Math.sin(w) * Q;
var y = Math.sin(w) * P + Math.cos(w) * Q;
// rotate by inclination
var z = Math.sin(i) * x;
    x = Math.cos(i) * x;
// rotate by longitude of ascending node
var xtemp = x;
x = Math.cos(W) * xtemp - Math.sin(W) * y;
y = Math.sin(W) * xtemp + Math.cos(W) * y;


*/


function get_rot(planet, time, print=false)
{


    var tHoursFromJ2000 = (time - new Date( 2000, 0, 1, 12, 0, 0 ).getTime()) / 1000 / 60 / 60;



    if (print)
    { 
        // console.log(time);
        // console.log(tHoursFromJ2000/24/365.25); return; 
        return;
    }

    var rot = (2 * Math.PI / Math.abs(planet.rotation_period)) * tHoursFromJ2000;
    // console.log(rot);
    // rot %= 2 * Math.PI;
    return rot;
}