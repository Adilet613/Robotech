import { useParams } from "react-router-dom";

const robotInstructions = {
  1: "Инструкция по сборке Марсохода...",
  2: "Инструкция по сборке Сортировщика...",
  3: "Инструкция по сборке Лабиринта...",
};

export default function RobotDetail() {
  const { id } = useParams();
  return (
    <div className="p-6">
      <h1 className="text-2xl mb-4">Инструкция</h1>
      <p>{robotInstructions[id]}</p>
    </div>
  );
}
