import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Mypage from '../pages/Mypage/Mypage';

function UserRouter(props) {
	return (
		<Routes>
            {/* <Route path="/mypage" element={<Mypage />} /> */}
            <Route path="/home" element={<Mypage />} />
          </Routes>
	);
}

export default UserRouter;