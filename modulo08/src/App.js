import React, { useState, useEffect, useMemo, useCallback } from "react";

function App() {
  const [techs, setTechs] = useState([]);
  const [tech, setTech] = useState("");

  const handleAdd = useCallback(() => {
    setTechs([...techs, tech]);
    setTech("");
  }, [techs, tech]);

  useEffect(() => {
    const storage = localStorage.getItem("techs");
    if (storage) {
      setTechs(JSON.parse(storage));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("techs", JSON.stringify(techs));
  }, [techs]);

  const techLength = useMemo(() => techs.length, [techs]);

  return (
    <>
      <input
        type="text"
        name="tech"
        value={tech}
        onChange={(e) => setTech(e.target.value)}
      />
      <button type="button" onClick={handleAdd}>
        Add
      </button>
      <p>
        <strong>Você tem {techLength}</strong>
      </p>
      <ul data-testid="tech-list">
        {techs.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </>
  );
}

export default App;
