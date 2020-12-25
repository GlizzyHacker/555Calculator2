var Calculate = function (Fields) {
  var c = Convert(Fields[0]);
  var r1 = Convert(Fields[1]);
  var r2 = Convert(Fields[2]);

  if (c == 0 || r1 == 0 || r2 == 0) {
    //alert("pls fill all out");
  } else {
    Fields[3].Set(1.44 / ((r1 + 2 * r2) * c));
    Fields[4].Set(((r1 + r2) / (r1 + 2 * r2)) * 100);
    Fields[5].Set(0.693 * (r1 + 2 * r2) * c);
    Fields[6].Set(0.693 * (r1 + r2) * c);
    Fields[7].Set(0.693 * r2 * c);
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
buttonC.name = "comp";
buttonC.onclick = function () {
  Fields[2].ReadWrite();
  Fields[3].ReadOnly();
  Fields[4].ReadOnly();
};
var l1 = document.createElement("label");
l1.innerHTML = "Capacitor";
l1.for = "cap";
var buttonR1 = document.createElement("input");
buttonR1.type = "radio";
buttonR1.innerHTML = "Resistor 1";
buttonR1.name = "comp";
buttonR1.onclick = function () {
  Fields[3].ReadWrite();
  Fields[2].ReadOnly();
  Fields[4].ReadOnly();
};
var l2 = document.createElement("label");
l2.innerHTML = "Resistor 1";
l2.for = "res1";
var buttonR2 = document.createElement("input");
buttonR2.type = "radio";
buttonR2.innerHTML = "Resistor 2";
buttonR2.name = "comp";
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
body2.append(buttonR1);
body2.append(l2);
body2.append(buttonR2);
body2.append(l3);
var Fields = [
  new Field("Frequency", "f", false, Frequency),
  new Field("Duty Cycle", "dc", false, Percent),
  new Field("Capacitor", "c", true, Capacitor),
  new Field("Resistor 1", "r1", true, Resistor),
  new Field("Resistor 2", "r2", true, Resistor)
];
