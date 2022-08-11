import { useContext } from "react";
import { toast } from "react-toastify";
import lapis from "../../Assets/Images/lapis.svg";
import lixeira from "../../Assets/Images/lixeira.svg";
import FormContext from "../../Contexts/Form";
import api from "../../Services/api";
import { getItem } from "../../Utils/storage";

function ListarContatos({ contato }) {
  const {
    setForm,
    modalEdit,
    setModalEdit,
    setContatoId,
    setContactName,
    modalDelete,
    setModalDelete,
  } = useContext(FormContext);

  function handleOpenEdit() {
    setContatoId(contato.id);
    setModalEdit(!modalEdit);
    handleGetContact();
  }

  function handleOpenDelete() {
    setContactName(contato.nome);
    setContatoId(contato.id);
    setModalDelete(!modalDelete);
    handleGetContact();
  }

  async function handleGetContact() {
    const token = getItem("token");

    try {
      const resposta = await api.get(`/contatos/${contato.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setForm({
        nome: resposta.data.nome,
        email: resposta.data.email,
        telefone: resposta.data.telefone,
      });
    } catch (error) {
      toast.error(error.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  }

  return (
    <div className="lista-contatos">
      <span className="width_padrao">{contato.nome}</span>
      <span className="width_padrao">{contato.email}</span>
      <span className="width_padrao">{contato.telefone}</span>
      <div className="lista-contatos_div-icones">
        <img onClick={() => handleOpenEdit()} src={lapis} alt="lapis" />
        <img onClick={() => handleOpenDelete()} src={lixeira} alt="lixeira" />
      </div>
    </div>
  );
}

export default ListarContatos;
