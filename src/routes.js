import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import FormContext from "./Contexts/Form";
import Cadastro from "./Pages/Cadastro";
import Login from "./Pages/Login";
import Main from "./Pages/Main";

function MainRoutes() {
  const [modalAdd, setModalAdd] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  const [contatoId, setContatoId] = useState(null);
  const [contactName, setContactName] = useState("");
  const [arrayContatos, setArrayContatos] = useState([]);

  const [form, setForm] = useState({
    nome: "",
    email: "",
    senha: "",
    telefone: "",
  });

  return (
    <FormContext.Provider
      value={{
        form,
        setForm,
        modalAdd,
        setModalAdd,
        modalEdit,
        setModalEdit,
        modalDelete,
        setModalDelete,
        contatoId,
        setContatoId,
        contactName,
        setContactName,
        arrayContatos,
        setArrayContatos,
      }}
    >
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/main" element={<Main />} />
      </Routes>
    </FormContext.Provider>
  );
}

export default MainRoutes;
