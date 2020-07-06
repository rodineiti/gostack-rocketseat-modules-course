import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
// import { Container } from './styles';
import { addTech } from "../../store/modules/techs/actions";

export default function TechList() {
  const [tech, setTech] = useState("");
  const techs = useSelector((state) => state.techs);
  const dispatch = useDispatch();

  function onAdd() {
    dispatch(addTech(tech));
    setTech("");
  }

  return (
    <div>
      <form data-testid="tech-form" onSubmit={onAdd}>
        <label htmlFor="tech">Tech</label>
        <input
          id="tech"
          value={tech}
          onChange={(e) => setTech(e.target.value)}
        />
      </form>
      <button onClick={onAdd}>Adicionar</button>
      <ul data-testid="tech-list">
        {techs.map((tech) => (
          <li key={tech}>{tech}</li>
        ))}
      </ul>
    </div>
  );
}
