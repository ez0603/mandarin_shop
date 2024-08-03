import { css } from "@emotion/react";

export const layout = css`
  width: 100vw;
  height: 100vh;
  overflow: auto; /* 전체 레이아웃에서 스크롤 */
  -ms-overflow-style: none; /* IE 및 Edge에서 스크롤바 숨김 */
  scrollbar-width: none; /* Firefox에서 스크롤바 숨김 */
  &::-webkit-scrollbar {
    display: none; /* Webkit 기반 브라우저에서 스크롤바 숨김 */
  }
  display: flex;
  flex-direction: column;
`;

