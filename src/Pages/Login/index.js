import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import FormButton from "../../Components/FormButton";
import InputLoginECadastro from "../../Components/Inputs-login-cadastro";
import FormContext from "../../Contexts/Form";
import api from "../../Services/api";
import { setItem } from "../../Utils/storage";
import "./styles.css";

function Login() {
  const navigate = useNavigate();

  const { form, setForm } = useContext(FormContext);

  const { email, senha } = form;

  function handleFormChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleLogin(e) {
    e.preventDefault();

    try {
      if (!email || !senha) {
        return;
      }

      const response = await api.post("/login", {
        email,
        senha,
      });

      const { token, usuario } = response.data;
      setItem("token", token);
      setItem("userId", usuario.id);

      setForm({ nome: "", email: "", senha: "" });

      navigate("/main");
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <div className="container-login">
      <div className="imagem-login"></div>

      <div className="container-direita">
        <div className="box-cadastro">
          <h3>Bem-Vindo</h3>

          <h1>Faça o login com sua conta</h1>

          <form onSubmit={handleLogin}>
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
              btnText={"LOGIN"}
              color={"white"}
              backgroundColor={"#04C45C"}
              marginTop={"6vh"}
              type={"submit"}
              width={"100%"}
            />
          </form>

          <span className="box-cadastro-footer">
            Não tem Cadastro?
            <strong onClick={() => navigate("/cadastro")}>Clique Aqui!</strong>
          </span>
        </div>
      </div>
    </div>
  );
}

export default Login;
