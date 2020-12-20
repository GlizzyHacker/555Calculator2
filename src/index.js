var other = require("./calculate");

var mainerbody = document.getElementById("app");
var mainbody = document.createElement("table");
mainerbody.append(mainbody);

const Resistor = {
  values: [10, 1, 1000, 1000000],
  names: ["Ohm", "Kilohm", "Megaohm"]
};
const Capacitor = {
  values: [20, 1.0e-9, 1.0e-6],
  names: ["Nanofarad", "Microfarad"]
};
const Frequency = {
  values: [10, 1, 1000, 1000000],
  names: ["Hertz", "Kilohertz", "Megahertz"]
};
const Time = {
  values: [30, 1.0e-9, 1.0e-6, 1.0e-3, 1],
  names: ["Nanosecond", "Microsecond", "Milisecond", "Second"]
};

function f() {
  other.Calculate(Fields);
}

class Field {
  constructor(name, id, readonly, Prefixset = null) {
    if (Prefixset != undefined && Prefixset.values != undefined) {
      this.Prefixs = Prefixset.values;
      this.Prefixnames = Prefixset.names;
      this.prefix = this.Prefixs[Prefixset.values[0] / 10];
    }
    var body = document.createElement("tr");
    body.id = id + "Field";
    this.l = document.createElement("label");
    this.i = document.createElement("input");
    this.d = document.createElement("select");
    this.id = id;

    var newtd = document.createElement("td");
    newtd.id = "name";
    newtd.append(this.l);
    body.append(newtd);

    var newtd = document.createElement("td");
    newtd.id = "value";
    newtd.append(this.i);
    body.append(newtd);

    if (this.Prefixnames != null) {
      var newtd = document.createElement("td");
      newtd.id = "prefix";
      newtd.append(this.d);
      body.append(newtd);

      for (var pref in this.Prefixnames) {
        var prefix = this.Prefixnames[pref];

        var opt = document.createElement("option");
        opt.value = prefix.toString();
        opt.innerHTML = prefix.toString();
        this.d.append(opt);
      }

      this.d.onchange = function () {
        GetField(id);
      };

      this.d.selectedIndex = this.prefix - 1;
    } else {
      var l2 = document.createElement("label");
      l2.innerHTML = "%";

      var newtd = document.createElement("td");
      newtd.id = "prefix";
      newtd.append(l2);
      body.append(newtd);
    }
    this.d.id = "prefix";
    this.i.id = id;
    this.i.oninput = function () {
      f();
    };
    this.l.setAttribute("for", this.i.id);
    this.l.innerHTML = name;
    if (readonly) {
      this.i.disabled = true;
      this.d.disabled = true;
    }
    mainbody.append(body);
  }

  Get() {
    return this.i.value * this.prefix;
  }

  Set(val) {
    if (this.Prefixs != undefined) {
      var current = val / this.prefix;
      this.Checklarge(current);
      this.Checksmall(current);

      this.d.selectedIndex = this.Prefixs.indexOf(this.prefix) - 1;

      this.i.value = Math.round((val / this.prefix) * 100) / 100;
    } else {
      this.i.value = Math.round(val * 100) / 100;
    }
  }

  setPrefix() {
    if (this.Prefixs != undefined) {
      var value = this.Prefixnames[this.d.selectedIndex];
      this.prefix = this.Prefixs[
        Math.max(
          Math.min(
            this.Prefixnames.indexOf(value) + 1,
            this.Prefixs.length - 1
          ),
          1
        )
      ];
    }
    f();
  }
  Checklarge(value) {
    if (
      value > 999 &&
      this.Prefixs.indexOf(this.prefix) != this.Prefixs.length - 1
    ) {
      this.prefix = this.Prefixs[
        Math.max(
          Math.min(
            this.Prefixs.indexOf(this.prefix) + 1,
            this.Prefixs.length - 1
          ),
          1
        )
      ];
      this.Checklarge(value / 1000);
    }
  }
  Checksmall(value) {
    if (value < 1 && this.Prefixs.indexOf(this.prefix) != 1) {
      this.prefix = this.Prefixs[
        Math.max(
          Math.min(this.Prefixs.indexOf(this.prefix) - 1, this.Prefixs.length),
          1
        )
      ];
      this.Checksmall(value * 1000);
    }
  }
}
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

function GetField(id) {
  for (var field in Fields) {
    if (id == Fields[field].id) {
      Fields[field].setPrefix();
    }
  }
}
