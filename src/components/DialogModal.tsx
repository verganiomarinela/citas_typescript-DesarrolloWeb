import { type MouseEvent, useEffect, useRef } from "react";
import styled from "styled-components";

const Container = styled.dialog`
  width: min(92vw, 520px);
  padding: 0;
  border: none;
  border-radius: 12px;
  box-shadow: 0 16px 40px rgba(15, 23, 42, 0.18);
  background: #ffffff;
  overflow: hidden;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  margin: 0;

  ::backdrop {
    background: rgba(15, 23, 42, 0.4);
    backdrop-filter: blur(1px);
  }
`;

const Header = styled.header`
  padding: 1rem 1.25rem;
  border-bottom: 1px solid #e2e8f0;
  background: #ffffff;
`;

const Title = styled.h3`
  margin: 0;
  font-size: 1.05rem;
  font-weight: 700;
  color: #0f172a;
`;

const Content = styled.div`
  padding: 1rem 1.25rem 0.9rem;
  color: #334155;
`;

const Buttons = styled.div`
  padding: 0 1.25rem 1rem;
  display: flex;
  justify-content: flex-end;
  gap: 0.55rem;
`;

const Button = styled.button`
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 0.45rem 0.8rem;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.18s ease;
`;

const CloseButton = styled(Button)`
  background: #ffffff;
  color: #334155;

  :hover {
    background: #f8fafc;
    border-color: #cbd5e1;
  }
`;

const ProceedButton = styled(Button)`
  border-color: #4f46e5;
  background: #4f46e5;
  color: #ffffff;

  :hover {
    background: #4338ca;
    border-color: #4338ca;
  }
`;

const isClickInsideRectangle = (e: MouseEvent, element: HTMLElement) => {
  const r = element.getBoundingClientRect();

  return (
    e.clientX > r.left &&
    e.clientX < r.right &&
    e.clientY > r.top &&
    e.clientY < r.bottom
  );
};

type Props = {
  title: string;
  isOpened: boolean;
  onProceed: () => void;
  onClose: () => void;
  children: React.ReactNode;
};

const DialogModal = ({
  title,
  isOpened,
  onProceed,
  onClose,
  children,
}: Props) => {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (isOpened) {
      ref.current?.showModal();
      document.body.classList.add("modal-open"); // prevent bg scroll
    } else {
      ref.current?.close();
      document.body.classList.remove("modal-open");
    }
  }, [isOpened]);

  const proceedAndClose = () => {
    onProceed();
    onClose();
  };

  return (
    <Container
      ref={ref}
      onCancel={onClose}
      onClick={(e: MouseEvent<HTMLDialogElement>) =>
        ref.current && !isClickInsideRectangle(e, ref.current) && onClose()
      }
    >
      <Header>
        <Title>{title}</Title>
      </Header>

      <Content>{children}</Content>

      <Buttons>
        <CloseButton onClick={onClose}>Cancelar</CloseButton>
        <ProceedButton onClick={proceedAndClose}>Confirmar</ProceedButton>
      </Buttons>
    </Container>
  );
};

export default DialogModal;