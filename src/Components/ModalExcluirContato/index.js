import { useContext } from "react";
import closeIcon from "../../Assets/Images/close_icon.svg";
import FormContext from "../../Contexts/Form";
import api from "../../Services/api";
import { getItem } from "../../Utils/storage";
import FormButton from "../FormButton";
import "./styles.css";

function ModalExcluirContato({ handleGetContacts }) {
  const { setForm, modalDelete, setModalDelete, contatoId, contactName } =
    useContext(FormContext);

  function handleCancel() {
    setForm({ nome: "", email: "", senha: "", telefone: "" });
  }

  function handleCloseModal() {
    setModalDelete(!modalDelete);
    handleCancel();
  }

  async function handleEditContact(e) {
    e.preventDefault();
    const token = getItem("token");

    try {
      await api.delete(`/contatos/${contatoId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
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

          <h3>Confirma a exclusão?</h3>

          <h4>Deseja excluir {contactName}</h4>

          <div>
            <FormButton
              btnText={"Excluir"}
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

export default ModalExcluirContato;
