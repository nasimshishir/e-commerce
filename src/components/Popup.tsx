import React from 'react';
import { closePopup } from '@/redux/features/popupSlice';
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { IoIosCloseCircleOutline } from "react-icons/io";

const Popup = () => {
    const { isVisible, content } = useAppSelector((state) => state.popupReducer);
    const dispatch = useAppDispatch();

    const handleBackgroundClick = (event: React.MouseEvent<HTMLDivElement>) => {
        if (event.target === event.currentTarget) {
            dispatch(closePopup());
        }
    };


    return (
        <>
            {isVisible && content && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-300 ease-in-out"
                    onClick={handleBackgroundClick}
                >
                    <div className="bg-white w-[700px] rounded-lg shadow-md px-2 py-2 max-w-md relative">
                        <IoIosCloseCircleOutline className="absolute text-2xl right-0 top-0 m-4 cursor-pointer hover:text-accent" onClick={() => dispatch(closePopup())} />
                        {content}

                    </div>
                </div>
            )}
        </>
    );
};

export default Popup;