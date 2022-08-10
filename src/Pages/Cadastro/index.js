import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import FormButton from "../../Components/FormButton";
import InputLoginECadastro from "../../Components/Inputs-login-cadastro";
import FormContext from "../../Contexts/Form";
import api from "../../Services/api";
import "./styles.css";

function Cadastro() {
  const navigate = useNavigate();

  const { form, setForm } = useContext(FormContext);

  const { nome, email, senha } = form;

  function handleFormChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleCadastro(e) {
    e.preventDefault();

    try {
      if (!nome || !email || !senha) {
        return;
      }

      await api.post("/usuarios", {
        nome,
        email,
        senha,
      });

      setForm({ nome: "", email: "", senha: "" });

      navigate("/");
    } catch (error) {
      console.log(error);
    }
  }

  function handleCancel() {
    setForm({ nome: "", email: "", senha: "" });
  }
  return (
    <div className="container-cadastro">
      <div className="container-direita">
        <div className="box-cadastro">
          <h1>Cadastre-se</h1>

          <form onSubmit={handleCadastro}>
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
              label="Senha"
              name={"senha"}
              value={senha}
              type={"password"}
            />

            <FormButton
              btnText={"CADASTRAR"}
              color={"white"}
              backgroundColor={"#04C45C"}
              marginTop={"6vh"}
              width={"100%"}
              type={"submit"}
            />

            <FormButton
              btnText={"CANCELAR"}
              color={"white"}
              backgroundColor={"#FB0615A6"}
              marginTop={"1vh"}
              width={"100%"}
              type={"button"}
              onClick={() => handleCancel()}
            />
          </form>

          <span className="box-cadastro-footer">
            Já tem Cadastro?
            <strong onClick={() => navigate("/")}>Clique Aqui!</strong>
          </span>
        </div>
      </div>

      <div className="imagem-cadastro"></div>
    </div>
  );
}

export default Cadastro;
