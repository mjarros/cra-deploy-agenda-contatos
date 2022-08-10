import { useContext } from "react";
import closeIcon from "../../Assets/Images/close_icon.svg";
import FormContext from "../../Contexts/Form";
import api from "../../Services/api";
import { getItem } from "../../Utils/storage";
import FormButton from "../FormButton";
import InputLoginECadastro from "../Inputs-login-cadastro";

function ModalEditarContato({ handleGetContacts }) {
  const { form, setForm, modalEdit, setModalEdit, contatoId } =
    useContext(FormContext);

  const { nome, email, telefone } = form;

  function handleFormChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleCloseModal() {
    handleCancel();
    setModalEdit(!modalEdit);
  }

  function handleCancel() {
    setForm({ nome: "", email: "", senha: "", telefone: "" });
  }

  async function handleEditContact(e) {
    e.preventDefault();
    const token = getItem("token");

    try {
      if (!nome || !email || !telefone) {
        return;
      }

      await api.put(
        `/contatos/${contatoId}`,
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
      handleGetContacts();
      handleCloseModal();
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <div className="modal">
      <div className="modal-box">
        <form onSubmit={handleEditContact}>
          <img
            onClick={() => handleCloseModal()}
            src={closeIcon}
            alt="close Icon"
            style={{ cursor: "pointer" }}
          />

          <h3>Editar Contato</h3>

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
              btnText={"Salvar"}
              color={"white"}
              backgroundColor={"#04C45C"}
              marginTop={"5vh"}
              type={"submit"}
              width={"100%"}
            />

            <FormButton
              btnText={"Cancelar"}
              color={"white"}
              backgroundColor={"#FB0615A6"}
              marginTop={"0"}
              type={"button"}
              width={"100%"}
              onClick={() => handleCloseModal()}
            />
          </div>
        </form>
      </div>
    </div>
  );
}

export default ModalEditarContato;
