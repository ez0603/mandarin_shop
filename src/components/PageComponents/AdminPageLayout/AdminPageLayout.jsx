/** @jsxImportSource @emotion/react */
import * as s from "./style";

function AdminPageLayout({ children }) {
  return (
    <div css={s.layout}>
      <div css={s.container}>{children}</div>
    </div>
  );
}

export default AdminPageLayout;
