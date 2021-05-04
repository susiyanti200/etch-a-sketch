const defaultSize = 16;
const etchArea = document.querySelector(".etch-area");
const clear = document.querySelector(".clear");
const modeBtn = document.querySelectorAll(".mode");
const sizeSlider = document.querySelector("#size");

const mode = {
  black: () => {
    return {
      red: 0,
      green: 0,
      blue: 0,
      alpha: 1,
    };
  },
  rainbow: () => {
    return {
      red: Math.floor(Math.random() * 256),
      green: Math.floor(Math.random() * 256),
      blue: Math.floor(Math.random() * 256),
      alpha: 1,
    };
  },
  gray: (e) => {
    currentColor = e.target.style.backgroundColor;
    colorCode = currentColor
      .slice(currentColor.indexOf("(") + 1, currentColor.indexOf(")"))
      .split(",");
    if (colorCode.length < 4) {
      return {
        red: 0,
        green: 0,
        blue: 0,
        alpha: 0.1,
      };
    } else {
      return {
        red: 0,
        green: 0,
        blue: 0,
        alpha: parseFloat(colorCode[3]) + 0.1,
      };
    }
  },
};

const colored = (e) => {
  if (e.target === e.currentTarget) return;
  let color = ink(e);
  e.target.style.backgroundColor = `rgba(${color.red}, ${color.green}, ${color.blue}, ${color.alpha})`;
};

const reset = () => {
  etchArea.querySelectorAll("div").forEach((cell) => {
    cell.style.backgroundColor = "#FFF";
  });
};

const newGrid = (size) => {
  if (size > 100) return;
  etchArea.textContent = "";
  etchArea.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
  for (let index = 0; index < size * size; index++) {
    const cell = document.createElement("div");
    cell.style.backgroundColor = "#FFF";
    etchArea.appendChild(cell);
  }
};

etchArea.addEventListener("mouseover", colored);

sizeSlider.addEventListener("change", (e) => {
  newGrid(e.target.valueAsNumber);
});

modeBtn.forEach((btn) => {
  btn.addEventListener("click", () => (ink = mode[btn.id]));
});

clear.addEventListener("click", reset);

let ink = mode["black"];
newGrid(defaultSize);
