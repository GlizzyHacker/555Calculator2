var Calculate = function (Fields) {
  var f = Convert(Fields[0]);
  var dc = Convert(Fields[1]);
  var c = Convert(Fields[2]);
  var r2 = Convert(Fields[4]);

  if ((c != 0 || r2 != 0) && f == 0 && dc == 0) {
    //alert("pls fill all out");
  } else {
    if (c != 0) {
      r2 = (1 / f - dc / (100 * f)) / c / 0.693;
      var r1 = (c / f) * 1.44 - 2 * r2;
      Field[4].Set(r2);
      Field[3].Set(r1);
    }
    if (r2 != 0) {
      c = (1 / f - dc / (100 * f)) / r2 / 0.693;
      var r1 = (c / f) * 1.44 - 2 * r2;

      Field[2].Set(c);
      Field[3].Set(r1);
    }
  }
};

var body = document.getElementById("app");

var p1 = document.createElement("p");
p1.innerHTML = "Please select a component you know the value of";
p1.className = "center";

var body2 = document.createElement("form");

var buttonC = document.createElement("input");
buttonC.type = "radio";
buttonC.innerHTML = "Capacitor";
buttonC.id = "comp";
buttonC.onclick = function () {
  Fields[2].ReadWrite();
  Fields[3].ReadOnly();
  Fields[4].ReadOnly();
};
var l1 = document.createElement("label");
l1.innerHTML = "Capacitor";
l1.for = "cap";
var buttonR2 = document.createElement("input");
buttonR2.type = "radio";
buttonR2.innerHTML = "Resistor 2";
buttonR2.id = "comp";
buttonR2.onclick = function () {
  Fields[4].ReadWrite();
  Fields[2].ReadOnly();
  Fields[3].ReadOnly();
};
var l3 = document.createElement("label");
l3.innerHTML = "Resistor 2";
l3.for = "res2";

body.append(p1);
body.append(body2);
body2.append(buttonC);
body2.append(l1);
body2.append(buttonR2);
body2.append(l3);

var Fields = [
  new Field("Frequency", "f", false, Frequency),
  new Field("Duty Cycle", "dc", false, Percent),
  new Field("Capacitor", "c", true, Capacitor),
  new Field("Resistor 1", "r1", true, Resistor),
  new Field("Resistor 2", "r2", true, Resistor)
];
