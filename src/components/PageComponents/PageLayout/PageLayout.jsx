/**@jsxImportSource @emotion/react */
import Header from "../Header/Header";
import * as s from "./style";

function PageLayout({ children }) {
  return (
    <div css={s.layout}>
      <Header />
        {children}
    </div>
  );
}

export default PageLayout;
