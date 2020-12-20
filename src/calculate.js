import * as other from "./index.js";

function Convert(a) {
  var n = a.Get();
  if (isNaN(Number(n)) || n == null) {
    n = 0;
  }
  return n;
}

export function Calculate() {
  var c = Convert(other.Fields[0]);
  var r1 = Convert(other.Fields[1]);
  var r2 = Convert(other.Fields[2]);

  if (c == 0 || r1 == 0 || r2 == 0) {
    //alert("pls fill all out");
  } else {
    other.Fields[3].Set(1.44 / ((r1 + 2 * r2) * c));
    other.Fields[4].Set(((r1 + r2) / (r1 + 2 * r2)) * 100);
    other.Fields[5].Set(0.693 * (r1 + 2 * r2) * c);
    other.Fields[6].Set(0.693 * (r1 + r2) * c);
    other.Fields[7].Set(0.693 * r2 * c);
  }
}
