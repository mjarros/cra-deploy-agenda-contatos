import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

export default function InputLoginECadastro({
  label,
  name,
  value,
  onChange,
  type,
}) {
  return (
    <Box
      sx={{
        "& > :not(style)": { m: 1, ml: 0, width: "100%" },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField
        label={label}
        variant="outlined"
        name={name}
        value={value}
        onChange={onChange}
        type={type}
      />
    </Box>
  );
}
