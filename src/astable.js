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
var Fields = [
  new Field("Capacitor", "c", false, Capacitor),
  new Field("Resistor 1", "r1", false, Resistor),
  new Field("Resistor 2", "r2", false, Resistor),
  new Field("Frequency", "f", true, Frequency),
  new Field("Duty Cycle", "dc", true),
  new Field("Time", "t", true, Time),
  new Field("Time High", "th", true, Time),
  new Field("Time Low", "tl", true, Time)
];
