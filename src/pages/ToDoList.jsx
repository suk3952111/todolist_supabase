import { useEffect, useState } from "react";
import { supabase } from "@/main";
import styles from "./ToDoList.module.css";
import removeIcon from "@/assets/remove.svg";
import Modal from "@/common/Modal/Modal";

const ToDoList = () => {
  const [items, setItems] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [editValue, setEditValue] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      let { data: todos, error } = await supabase.from("test").select("*");
      if (error) {
        console.error("Error fetching data:", error);
      } else {
        setItems(todos);
      }
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleKeyDown = async (e) => {
    if (e.key === "Enter") {
      const newItem = {
        id: Date.now(),
        text: e.target.value,
        isCompleted: false,
      };
      const { data, error } = await supabase
        .from("test")
        .insert([newItem])
        .select();
      if (error) {
        console.error("Error inserting data:", error);
      } else {
        setItems((prevItems) => [newItem, ...prevItems]);
        setInputValue("");
      }
    }
  };

  const handleResetInput = () => {
    setInputValue("");
  };

  const handleToggleComplete = async (selectedId) => {
    const updatedItem = items.find((item) => item.id === selectedId);
    if (updatedItem) {
      const { data, error } = await supabase
        .from("test")
        .update({ isCompleted: !updatedItem.isCompleted })
        .eq("id", selectedId)
        .select();
      if (error) {
        console.error("Error updating data:", error);
      } else {
        setItems((prevItems) =>
          prevItems.map((item) =>
            item.id === selectedId
              ? { ...item, isCompleted: !item.isCompleted }
              : item
          )
        );
      }
    }
  };

  const handleDelete = async (selectedId) => {
    const { data, error } = await supabase
      .from("test")
      .delete()
      .eq("id", selectedId);
    if (error) {
      console.error("Error deleting data:", error);
    } else {
      setItems((prevItems) =>
        prevItems.filter((item) => item.id !== selectedId)
      );
    }
  };

  const handleEdit = (item) => {
    setCurrentItem(item);
    setEditValue(item.text);
    setIsModalOpen(true);
  };

  const handleEditChange = (e) => {
    setEditValue(e.target.value);
  };

  const handleEditSubmit = async () => {
    const { data, error } = await supabase
      .from("test")
      .update({ text: editValue })
      .eq("id", currentItem.id)
      .select();
    if (error) {
      console.error("Error updating data:", error);
    } else {
      setItems((prevItems) =>
        prevItems.map((item) =>
          item.id === currentItem.id ? { ...item, text: editValue } : item
        )
      );
      setIsModalOpen(false);
    }
  };

  return (
    <div>
      <div className={styles.inputField}>
        <input
          className={styles.input}
          type="text"
          placeholder="추가하려는 일정을 입력하세요"
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          value={inputValue}
        />
        {inputValue && (
          <img
            onClick={handleResetInput}
            className={styles.resetInput}
            src={removeIcon}
            alt="removeIcon"
          />
        )}
      </div>
      <p>할 일</p>
      <ul className={styles.list}>
        {items
          .filter((item) => !item.isCompleted)
          .map((todo) => (
            <li key={`key-${todo.id}`} className={styles.listItem}>
              {todo.text}
              <div>
                <button onClick={() => handleToggleComplete(todo.id)}>
                  완료
                </button>
                <button onClick={() => handleDelete(todo.id)}>삭제</button>
                <button onClick={() => handleEdit(todo)}>수정</button>
              </div>
            </li>
          ))}
      </ul>
      {items.filter((item) => item.isCompleted).length > 0 && (
        <div>
          <p>완료</p>
          <ul className={styles.list}>
            {items
              .filter((item) => item.isCompleted)
              .map((todo) => (
                <li
                  key={`key-${todo.id}`}
                  className={`${styles.listItem} ${styles.completed}`}
                >
                  {todo.text}
                  <div>
                    <button onClick={() => handleToggleComplete(todo.id)}>
                      취소
                    </button>
                    <button onClick={() => handleEdit(todo)}>수정</button>
                  </div>
                </li>
              ))}
          </ul>
        </div>
      )}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <input type="text" value={editValue} onChange={handleEditChange} />
        <button onClick={handleEditSubmit}>수정 완료</button>
      </Modal>
    </div>
  );
};

export default ToDoList;
