import React from 'react';
import { LuPencil } from 'react-icons/lu';
import {
    MdInbox,
    MdOutlineStar,
    MdOutlineScheduleSend,
    MdSend,
    MdDrafts,
    MdExpandMore
} from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { setOpen } from './redux/appSlice';

const Sidebar = () => {
    const dispatch = useDispatch();

    return (
        <div className="w-[250px] p-4 bg-white h-screen shadow-md">
            {/* Compose Button */}
            <button
                onClick={() => dispatch(setOpen(true))}
                className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-full shadow-md hover:bg-blue-600 transition-all"
            >
                <LuPencil size={'24px'} />
                <span>Compose</span>
            </button>

            {/* Sidebar Options */}
            <ul className="mt-4 space-y-2">
                <li className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-200 cursor-pointer">
                    <MdInbox size={'20px'} />
                    <span>Inbox</span>
                </li>
                <li className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-200 cursor-pointer">
                    <MdOutlineStar size={'20px'} />
                    <span>Starred</span>
                </li>
                <li className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-200 cursor-pointer">
                    <MdOutlineScheduleSend size={'20px'} />
                    <span>Snoozed</span>
                </li>
                <li className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-200 cursor-pointer">
                    <MdSend size={'20px'} />
                    <span>Sent</span>
                </li>
                <li className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-200 cursor-pointer">
                    <MdDrafts size={'20px'} />
                    <span>Drafts</span>
                </li>
                <li className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-200 cursor-pointer">
                    <MdExpandMore size={'20px'} />
                    <span>More</span>
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;
