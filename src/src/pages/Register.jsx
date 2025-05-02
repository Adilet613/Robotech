import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [email, setEmail] = useState("");
  const [parts, setParts] = useState("");
  const [sensors, setSensors] = useState("");
  const navigate = useNavigate();

  const handleRegister = () => {
    // здесь можно подключить Firebase auth
    localStorage.setItem("user", JSON.stringify({ email, parts, sensors }));
    navigate("/dashboard");
  };

  return (
    <div className="flex flex-col items-center mt-20">
      <h1 className="text-3xl mb-4">Добро пожаловать в RoboMaster</h1>
      <input className="border p-2 mb-2" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <input className="border p-2 mb-2" placeholder="Сколько у вас деталей?" onChange={(e) => setParts(e.target.value)} />
      <input className="border p-2 mb-4" placeholder="Сколько у вас датчиков?" onChange={(e) => setSensors(e.target.value)} />
      <button className="bg-blue-500 text-white px-4 py-2" onClick={handleRegister}>Продолжить</button>
    </div>
  );
}
