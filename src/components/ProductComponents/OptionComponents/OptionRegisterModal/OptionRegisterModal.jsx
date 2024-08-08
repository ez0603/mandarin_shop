/** @jsxImportSource @emotion/react */
import React, { useState, useEffect } from 'react';
import { registerOption } from "../../../../apis/api/option";
import useInsertOptionTitle from "../../../../hooks/useInsertOptionTitle";
import useGetOptionTitle from "../../../../hooks/useGetOptionTitle";
import * as s from "./style";
import { IoIosArrowDown } from "react-icons/io";

function OptionRegisterModal({
    optionModal,
    closeModal,
    options,
    productId,
    productName,
    onOptionAdded
}) {
    const [optionName, setOptionName] = useState("");
    const [optionTitle, setOptionTitle] = useState("");
    const [optionSelectTitleId, setOptionSelectTitleId] = useState(0); 
    const { insertOptionTitle, Optionerror, refresh } = useInsertOptionTitle();
    const { titleOptions, error, refetch } = useGetOptionTitle(productId);

    useEffect(() => {
        refetch();
    }, [refetch, refresh]);

    const handleOptionTitleName = (e) => {
        setOptionTitle(e.target.value);
    };

    const handleOptionName = (e) => {
        setOptionName(e.target.value)
    }; 
    
    const insertOption = async () => {
        try {
            const params = {
                productId: productId,
                optionTitleId: optionSelectTitleId,
                optionName: optionName,
            };
            console.log(params);
            await registerOption(params);
            alert("옵션 이름 추가가 완료되었습니다.");
            const newOptionTitle = titleOptions.find(title => title.optionTitleId === optionSelectTitleId);
            const newOptionName = {
                optionNameId: Date.now(), // 임시 ID
                optionName: optionName,
                optionTitleId: optionSelectTitleId,
            };
            onOptionAdded(newOptionTitle, newOptionName);
            closeModal();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div css={s.backdrop}>
            <div css={s.optionModal}>
                <div css={s.modalHeader}>
                    <h2>옵션 등록</h2>
                    <button className="closeButton" onClick={closeModal}>x</button>
                </div>
                <div css={s.modalContent}>
                    <div>
                        <label>옵션 타이틀 추가</label>
                        <input onChange={handleOptionTitleName} type="text" />
                        <button onClick={() => insertOptionTitle(productId, optionTitle)}>추가</button>
                    </div>
                    <div css={s.selectWrapper}>
                        <label>옵션 내용 추가</label>
                        <select value={optionSelectTitleId} onChange={(e) => setOptionSelectTitleId(Number(e.target.value))}> 
                            <option value="0">타이틀 선택</option>
                            {titleOptions.map(optionItem => (
                                <option key={optionItem.optionTitleId} value={optionItem.optionTitleId} data-name={optionItem.titleName}>{optionItem.titleName}</option>
                            ))}
                        </select>
                        <IoIosArrowDown className="select-arrow" />
                    </div>
                    <div>
                        <label>옵션 이름</label>
                        <input onChange={handleOptionName} type="text"/> 
                    </div>
                </div>
                <div css={s.modalFooter}>
                    <button onClick={insertOption}>추가</button>
                    <button onClick={closeModal}>취소</button>
                </div>
            </div>
        </div>
    );
}

export default OptionRegisterModal;
