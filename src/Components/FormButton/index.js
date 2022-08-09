import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

export default function FormButton({
  color,
  backgroundColor,
  btnText,
  marginTop,
  type,
  onClick,
  width,
}) {
  return (
    <Stack direction="row" spacing={2}>
      <Button
        onClick={onClick}
        type={type}
        variant="contained"
        sx={{
          color: color,
          backgroundColor: backgroundColor,
          "&:hover": {
            color: color,
            backgroundColor: backgroundColor,
          },
          m: 1,
          ml: 0,
          mt: { marginTop },
          width: { width },
          height: "8vh",
        }}
      >
        {btnText}
      </Button>
    </Stack>
  );
}
