import React, { useState, useEffect, useCallback } from "react";
import api from "./services/api";

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  const getRepositories = useCallback(async () => {
    try {
      const { data: repositoriesList } = await api.get("/repositories");
      setRepositories(repositoriesList);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    getRepositories();
  }, [getRepositories]);

  async function handleAddRepository() {
    try {
      const { data: newRepo } = await api.post("/repositories", {
        url: "https://github.com/joaaoeu/gostack11-desafio1-conceitos-nodejs",
        title: "Desafio Node.js",
        techs: ["JavaScript", "Node.js"],
      });
      setRepositories([...repositories, newRepo]);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleRemoveRepository(id) {
    try {
      await api.delete(`/repositories/${id}`);
      setRepositories(repositories.filter((repo) => repo.id !== id));
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <ul data-testid="repository-list">
        {repositories.map(({ id, title }) => (
          <li key={id}>
            {title}
            <button onClick={() => handleRemoveRepository(id)}>Remover</button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </>
  );
}

export default App;
