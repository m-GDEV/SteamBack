import {
    CheckCircleIcon,
    XCircleIcon,
    ClockIcon,
    EyeIcon,
    EyeSlashIcon,
    CalendarIcon,
} from "@heroicons/react/24/outline";

const onlineState = [
    "Offline",
    "Online",
    "Busy",
    "Away",
    "Snooze",
    "Looking to Trade",
    "Looking to Play",
];
const onlineIcons = [
    <XCircleIcon className="h-7 text-red-500" />,
    <CheckCircleIcon className="h-7 text-green-500" />,
    <ClockIcon className="h-7 text-yellow-500" />,
    <CalendarIcon className="h-7 text-yellow-500" />,
    <ClockIcon className="h-7 text-yellow-500" />,
];

export default function Profile(props) {
    return (
        <div>
            <p>musa</p>
        </div>
    );
}
