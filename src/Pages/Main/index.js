import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import FormButton from "../../Components/FormButton";
import Header from "../../Components/Header";
import ListarContatos from "../../Components/ListaContatos";
import ModalEditarContato from "../../Components/ModalEditarContato";
import ModalExcluirContato from "../../Components/ModalExcluirContato";
import ModalNovoContato from "../../Components/ModalNovoContato";
import FormContext from "../../Contexts/Form";
import api from "../../Services/api";
import { getItem } from "../../Utils/storage";
import "./styles.css";
import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import TableBody from "@mui/material/TableBody";

function Main() {
  const {
    modalAdd,
    setModalAdd,
    modalEdit,
    modalDelete,
    arrayContatos,
    setArrayContatos,
  } = useContext(FormContext);

  const navigate = useNavigate();

  async function handleGetContacts() {
    const token = getItem("token");

    try {
      const response = await api.get("/contatos", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setArrayContatos(response.data);
    } catch (error) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    const checkToken = () => {
      const token = getItem("token");
      if (!token) {
        navigate("/");
      }
    };
    checkToken();
    handleGetContacts();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="main">
      <Header />

      <div className="container-contatos">
        <FormButton
          btnText={"Adicionar"}
          color={"white"}
          backgroundColor={"#04C45C"}
          marginTop={"0"}
          type={"button"}
          width={"30ch"}
          onClick={() => setModalAdd(!modalAdd)}
        />

        <TableContainer>
          <Table sx={{ minWidth: "550px" }}>
            <TableBody>
              <div className="box-header">
                <span className="width_padrao margin-adicional">Nome</span>
                <span className="width_padrao margin-adicional">Email</span>
                <span className="width_padrao">Telefone</span>
                <span className="width_padrao"></span>
              </div>

              <div className="box-contatos">
                {arrayContatos.map((contato) => (
                  <ListarContatos key={contato.id} contato={contato} />
                ))}
              </div>
            </TableBody>
          </Table>
        </TableContainer>
      </div>

      {modalAdd && <ModalNovoContato handleGetContacts={handleGetContacts} />}
      {modalEdit && (
        <ModalEditarContato handleGetContacts={handleGetContacts} />
      )}
      {modalDelete && (
        <ModalExcluirContato handleGetContacts={handleGetContacts} />
      )}
    </div>
  );
}

export default Main;
