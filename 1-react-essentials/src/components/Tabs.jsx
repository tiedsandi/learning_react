export default function Tabs({
  children,
  buttons,
  ButtonContainer,
  // buttonContainer
}) {
  // const ButtonCont = buttonContainer
  return (
    <>
      <ButtonContainer>{buttons}</ButtonContainer>
      {children}
    </>
  );
}
