const kits = {
    ev3: {
        robots: [
            { name: "Следящий за линией (ультразвуковой)", sensors: 2, motors: 2 },
            { name: "Гироробот", sensors: 1, motors: 2 },
            { name: "Умный тележка", sensors: 3, motors: 2 },
            { name: "Манипулятор", sensors: 2, motors: 3 },
            { name: "Базовый сенсорный робот", sensors: 1, motors: 2 }
        ]
    },
    spike: {
        robots: [
            { name: "Автомобиль с ИИ-камерой", sensors: 3, motors: 2 },
            { name: "Робот-балансировщик", sensors: 2, motors: 2 },
            { name: "Автономный экскаватор", sensors: 2, motors: 3 },
            { name: "Танковый робот", sensors: 1, motors: 2 },
            { name: "Робот на инфракрасном датчике", sensors: 1, motors: 2 }
        ]
    }
};

document.getElementById("registrationForm").addEventListener("submit", function(e) {
    e.preventDefault();
    document.getElementById("register").classList.add("hidden");
    document.getElementById("chooseKit").classList.remove("hidden");
});

function showParts() {
    document.getElementById("chooseKit").classList.add("hidden");
    document.getElementById("enterParts").classList.remove("hidden");
}

function suggestRobots() {
    const kit = document.getElementById("kitSelector").value;
    const sensors = parseInt(document.getElementById("sensors").value);
    const motors = parseInt(document.getElementById("motors").value);

    const availableRobots = kits[kit].robots.filter(robot => 
        robot.sensors <= sensors && robot.motors <= motors
    );

    // Сортировка по "лучшим" роботам (по общему числу деталей, больше = лучше)
    availableRobots.sort((a, b) => 
        (b.sensors + b.motors) - (a.sensors + a.motors)
    );

    const list = document.getElementById("robotList");
    list.innerHTML = "";

    if (availableRobots.length === 0) {
        list.innerHTML = "<li>Нет подходящих роботов для сборки.</li>";
    } else {
        availableRobots.forEach(robot => {
            const li = document.createElement("li");
            li.textContent = `${robot.name} (датчики: ${robot.sensors}, моторы: ${robot.motors})`;
            list.appendChild(li);
        });
    }

    document.getElementById("enterParts").classList.add("hidden");
    document.getElementById("result").classList.remove("hidden");
}
