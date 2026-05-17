"use client";

import { useEffect } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import styled, { keyframes } from "styled-components";
import type { Photo } from "@/content/photos";

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const scaleIn = keyframes`
  from { transform: scale(0.96); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
`;

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 50;
  background: rgba(14, 14, 16, 0.94);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.space[5]};
  animation: ${fadeIn} 180ms ${({ theme }) => theme.motion.ease};
`;

const Stage = styled.figure`
  position: relative;
  margin: 0;
  max-width: 100%;
  max-height: 100%;
  animation: ${scaleIn} 220ms ${({ theme }) => theme.motion.ease};
`;

const StyledImage = styled(Image)`
  display: block;
  max-width: 90vw;
  max-height: 84vh;
  width: auto;
  height: auto;
  object-fit: contain;
  border-radius: ${({ theme }) => theme.radius.md};
`;

const Close = styled.button`
  position: absolute;
  top: -${({ theme }) => theme.space[6]};
  right: 0;
  font-family: ${({ theme }) => theme.font.pixel};
  font-size: 0.62rem;
  color: ${({ theme }) => theme.color.canvas};
  letter-spacing: 0.06em;
  text-transform: uppercase;
  cursor: pointer;
  padding: ${({ theme }) => theme.space[2]} 0;
  transition: color ${({ theme }) => theme.motion.fast}
    ${({ theme }) => theme.motion.ease};

  &:hover {
    color: ${({ theme }) => theme.color.accent};
  }
`;

const NavBtn = styled.button<{ $side: "left" | "right" }>`
  position: fixed;
  top: 50%;
  transform: translateY(-50%);
  ${({ $side }) => $side}: ${({ theme }) => theme.space[5]};
  font-family: ${({ theme }) => theme.font.pixel};
  font-size: 0.9rem;
  color: ${({ theme }) => theme.color.canvas};
  cursor: pointer;
  padding: ${({ theme }) => theme.space[4]};
  transition: color ${({ theme }) => theme.motion.fast}
    ${({ theme }) => theme.motion.ease};

  &:hover {
    color: ${({ theme }) => theme.color.accent};
  }
`;

const Caption = styled.figcaption`
  margin-top: ${({ theme }) => theme.space[3]};
  text-align: center;
  font-family: ${({ theme }) => theme.font.pixel};
  font-size: 0.58rem;
  color: ${({ theme }) => theme.color.muted};
  letter-spacing: 0.06em;
  text-transform: uppercase;
`;

type Props = {
  photo: Photo;
  onClose: () => void;
  onPrev?: () => void;
  onNext?: () => void;
};

export function Lightbox({ photo, onClose, onPrev, onNext }: Props) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft" && onPrev) onPrev();
      if (e.key === "ArrowRight" && onNext) onNext();
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [onClose, onPrev, onNext]);

  return createPortal(
    <Overlay onClick={onClose} role="dialog" aria-modal="true" aria-label={photo.alt}>
      {onPrev && (
        <NavBtn
          $side="left"
          onClick={(e) => {
            e.stopPropagation();
            onPrev();
          }}
          aria-label="Previous photo"
        >
          ←
        </NavBtn>
      )}
      <Stage onClick={(e) => e.stopPropagation()}>
        <Close onClick={onClose} aria-label="Close">
          close ✕
        </Close>
        <StyledImage
          src={photo.src}
          alt={photo.alt}
          width={photo.width}
          height={photo.height}
          placeholder="blur"
          blurDataURL={photo.blurDataURL}
          sizes="90vw"
          priority
        />
        <Caption>{photo.alt}</Caption>
      </Stage>
      {onNext && (
        <NavBtn
          $side="right"
          onClick={(e) => {
            e.stopPropagation();
            onNext();
          }}
          aria-label="Next photo"
        >
          →
        </NavBtn>
      )}
    </Overlay>,
    document.body,
  );
}
