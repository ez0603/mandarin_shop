import { css } from "@emotion/react";

export const layout = css`
  flex: 1;
  width: 100vw;
  height: 100%;
  background-color: #ac6b6b;
  overflow: auto; /* 내용이 넘칠 때만 스크롤 표시 */
  -ms-overflow-style: none; /* IE 및 Edge에서 스크롤바 숨김 */
  scrollbar-width: none; /* Firefox에서 스크롤바 숨김 */
  &::-webkit-scrollbar {
    display: none; /* Webkit 기반 브라우저에서 스크롤바 숨김 */
  }
`;
