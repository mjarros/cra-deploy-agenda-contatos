import { useContext } from "react";
import closeIcon from "../../Assets/Images/close_icon.svg";
import FormContext from "../../Contexts/Form";
import api from "../../Services/api";
import { getItem } from "../../Utils/storage";
import FormButton from "../FormButton";
import InputLoginECadastro from "../Inputs-login-cadastro";
import "./styles.css";

function ModalNovoContato({ handleGetContacts }) {
  const { form, setForm, modalAdd, setModalAdd } = useContext(FormContext);

  const { nome, email, telefone } = form;

  function handleFormChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleCancel() {
    setForm({ nome: "", email: "", senha: "", telefone: "" });
  }

  async function handleAddContact(e) {
    e.preventDefault();
    const token = getItem("token");

    try {
      if (!nome || !email || !telefone) {
        return;
      }

      await api.post(
        "/contatos",
        {
          nome,
          email,
          telefone,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setForm({ nome: "", email: "", telefone: "" });
      handleGetContacts();
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <div className="modal">
      <div className="modal-box">
        <form onSubmit={handleAddContact}>
          <img
            onClick={() => setModalAdd(!modalAdd)}
            src={closeIcon}
            alt="close Icon"
            style={{ cursor: "pointer" }}
          />

          <h3>Novo Contato</h3>

          <div>
            <InputLoginECadastro
              onChange={handleFormChange}
              label="Nome"
              name={"nome"}
              value={nome}
              type={"text"}
            />
            <InputLoginECadastro
              onChange={handleFormChange}
              label="Email"
              name={"email"}
              value={email}
              type={"text"}
            />
            <InputLoginECadastro
              onChange={handleFormChange}
              label="Telefone"
              name={"telefone"}
              value={telefone}
              type={"text"}
            />

            <FormButton
              btnText={"Adicionar"}
              color={"white"}
              backgroundColor={"#04C45C"}
              marginTop={"5vh"}
              type={"submit"}
              width={"49.5ch"}
            />

            <FormButton
              btnText={"Limpar"}
              color={"white"}
              backgroundColor={"#FB0615A6"}
              marginTop={"0"}
              type={"button"}
              width={"49.5ch"}
              onClick={() => handleCancel()}
            />
          </div>
        </form>
      </div>
    </div>
  );
}

export default ModalNovoContato;
