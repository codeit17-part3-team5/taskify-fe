import Image from "next/image";
import smallDone from "@/assets/icons/small-done.svg";
import smallOnprogress from "@/assets/icons/small-onprogress.svg";
import smallTodo from "@/assets/icons/small-todo.svg";
import largeDone from "@/assets/icons/large-done.svg";
import largeOnprogress from "@/assets/icons/large-onprogress.svg";
import largeTodo from "@/assets/icons/large-todo.svg";

type TodoCardStatusProps = {
  size: "small" | "large";
  status: "todo" | "onprogress" | "done";
};

export default function TodoCardStatus({ size, status }: TodoCardStatusProps) {
  const statusMap = {
    small: {
      todo: smallTodo,
      onprogress: smallOnprogress,
      done: smallDone,
    },
    large: {
      todo: largeTodo,
      onprogress: largeOnprogress,
      done: largeDone,
    },
  };

  const statusIcon = statusMap[size][status];

  return <Image src={statusIcon} alt={`${size} ${status}`} />;
}
