export default function Tabs({
  children,
  buttons,
  ButtonContainer = 'div',
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
