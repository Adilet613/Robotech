document.addEventListener("DOMContentLoaded", () => {
  const app = document.getElementById("app");

  const robots = [
    { name: 'ЛинияТрекер', description: 'Робот, следующий по линии', motors: 2, colorSensors: 1, ultrasonicSensors: 0 },
    { name: 'Марсоход', description: 'Робот для исследования', motors: 3, colorSensors: 1, ultrasonicSensors: 1 },
    { name: 'Грузовик', description: 'Робот для перевозки предметов', motors: 4, colorSensors: 0, ultrasonicSensors: 1 },
    { name: 'Сканер', description: 'Робот с УЗ сенсором для измерений', motors: 2, colorSensors: 0, ultrasonicSensors: 2 }
  ];

  const state = {
    name: localStorage.getItem("name") || "",
    platform: localStorage.getItem("platform") || "",
    parts: JSON.parse(localStorage.getItem("parts")) || null,
  };

  function render() {
    app.innerHTML = "";

    if (!state.name) {
      const nameInput = document.createElement("input");
      nameInput.placeholder = "Ваше имя";

      const nameBtn = document.createElement("button");
      nameBtn.textContent = "Зарегистрироваться";
      nameBtn.onclick = () => {
        state.name = nameInput.value.trim();
        localStorage.setItem("name", state.name);
        render();
      };

      app.append(nameInput, nameBtn);
      return;
    }

    if (!state.platform) {
      const select = document.createElement("select");
      select.innerHTML = `<option value="">Выберите платформу</option><option value="EV3">EV3</option><option value="Spike Prime">Spike Prime</option>`;

      const btn = document.createElement("button");
      btn.textContent = "Продолжить";
      btn.onclick = () => {
        state.platform = select.value;
        localStorage.setItem("platform", state.platform);
        render();
      };

      app.append(select, btn);
      return;
    }

    if (!state.parts) {
      const motors = document.createElement("input");
      motors.type = "number";
      motors.placeholder = "Сколько моторов";

      const colorSensors = document.createElement("input");
      colorSensors.type = "number";
      colorSensors.placeholder = "Сколько цвет. датчиков";

      const ultrasonicSensors = document.createElement("input");
      ultrasonicSensors.type = "number";
      ultrasonicSensors.placeholder = "Сколько УЗ датчиков";

      const btn = document.createElement("button");
      btn.textContent = "Показать роботов";
      btn.onclick = () => {
        state.parts = {
          motors: +motors.value,
          colorSensors: +colorSensors.value,
          ultrasonicSensors: +ultrasonicSensors.value
        };
        localStorage.setItem("parts", JSON.stringify(state.parts));
        render();
      };

      app.append(motors, colorSensors, ultrasonicSensors, btn);
      return;
    }

    const filtered = robots
      .filter(r => r.motors <= state.parts.motors && r.colorSensors <= state.parts.colorSensors && r.ultrasonicSensors <= state.parts.ultrasonicSensors)
      .sort((a, b) => (b.motors + b.colorSensors + b.ultrasonicSensors) - (a.motors + a.colorSensors + a.ultrasonicSensors));

    filtered.forEach(robot => {
      const div = document.createElement("div");
      div.className = "robot-card";
      div.innerHTML = `<strong>${robot.name}</strong><p>${robot.description}</p>`;
      app.appendChild(div);
    });

    const resetBtn = document.createElement("button");
    resetBtn.textContent = "Сбросить всё";
    resetBtn.onclick = () => {
      localStorage.clear();
      location.reload();
    };

    app.appendChild(resetBtn);
  }

  render();
});
