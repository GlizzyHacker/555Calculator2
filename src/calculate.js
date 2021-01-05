var mainerbody = document.getElementById("app");
var mainbody = document.createElement("div");
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

const Percent = {
  values: [10, 1],
  names: ["%"]
};

function f() {
  Calculate(Fields);
}

function Convert(a) {
  var n = a.Get();
  if (isNaN(Number(n)) || n == null) {
    n = 0;
  }
  return n;
}

class Field {
  constructor(name, id, readonly, Prefixset = null) {
    if (Prefixset != undefined && Prefixset.values != undefined) {
      this.Prefixs = Prefixset.values;
      this.Prefixnames = Prefixset.names;
      this.prefix = this.Prefixs[Prefixset.values[0] / 10];
    }
    var body = document.createElement("div");
    body.className = "row";
    body.id = id + "Field";
    this.l = document.createElement("label");
    this.i = document.createElement("input");
    this.d = document.createElement("select");
    this.id = id;

    this.l.className = "col-4 noborder";
    body.append(this.l);

    this.i.className = "col-4 noborder";
    body.append(this.i);

    this.d.className = "col-4 noborder";
    body.append(this.d);

    if (this.Prefixnames != null) {
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
      var opt = document.createElement("option");
      opt.innerHTML = "%";
      this.d.append(opt);
    }
    this.d.id = "prefix";
    this.i.id = id;
    this.i.onchange = function () {
      f();
    };
    this.l.setAttribute("for", this.i.id);
    this.l.innerHTML = name;
    if (readonly) {
      this.ReadOnly();
    }
    mainbody.append(body);
  }

  ReadOnly() {
    this.i.disabled = true;
    this.l.className += " disabled";
    this.d.disabled = true;
  }
  ReadWrite() {
    this.i.disabled = false;
    this.l.className = "col-4 noborder";
    this.d.disabled = false;
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

      this.i.value = Math.round((val / this.prefix) * 1000) / 1000;
    } else {
      this.i.value = Math.round(val * 1000) / 1000;
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

var Fields = [];

function GetField(id) {
  for (var field in Fields) {
    if (id == Fields[field].id) {
      Fields[field].setPrefix();
    }
  }
}
