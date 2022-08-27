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

const unixToDate = (timestamp) => {
    return new Date(timestamp * 1000).toLocaleString("en-US");
};

export default function Profile(props) {
    return (
        <div className="text-white flex flex-col place-items-center justify-center text-sm sm:text-base">
            <div className="mb-4 text-center">
                <p className="text-2xl sm:text-4xl">
                    Welcome
                    <a
                        className="text-blue-700 ml-2"
                        href={props.data.profileurl}
                    >
                        {props.data.personaname}
                    </a>
                </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-8 mb-10 items-end justify-center place-items-center">
                <div className="flex flex-col justify-center place-items-center gap-2">
                    <img
                        src={props.data.avatarfull}
                        className="h-40 rounded-2xl"
                    />
                    <p className="bg-slate-800 py-2 px-3 rounded text-sm">
                        {props.data.steamid}
                    </p>
                </div>
                <div className="flex flex-col gap-2 text-center">
                    <div className="flex flex-row justify-around">
                        <div className="flex items-center gap-2">
                            {onlineIcons[props.data.personastate]}
                            {onlineState[props.data.personastate]}
                        </div>
                        <div>
                            {props.data.communityvisibilitystate == 3 && (
                                <div className="flex items-center gap-2">
                                    <EyeIcon className="h-7 text-green-500" />
                                    <p>Public</p>
                                </div>
                            )}
                            {props.data.communityvisibilitystate == 1 && (
                                <div className="flex items-center gap-2">
                                    <EyeSlashIcon className="h-7 text-red-500" />
                                    <p>Private</p>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="flex justify-between items-center">
                        <p className="bg-slate-800 py-2 px-3 rounded">
                            {props.data.accountname}
                        </p>
                        <p className="bg-slate-800 py-2 px-3 rounded">
                            {props.data.realname}
                        </p>
                    </div>
                    <div className="font-bold">
                        <p className=" flex flex-row justify-between items-center gap-4 text-indigo-500">
                            Last Online:
                            <nobr className="bg-slate-800 px-3 py-2 rounded text-yellow-500">
                                {unixToDate(props.data.lastlogoff)}
                            </nobr>
                        </p>
                        <p className="mt-2 flex flex-row justify-between items-center gap-4 text-violet-500">
                            Account Created:
                            <nobr className="bg-slate-800 px-3 py-2 rounded text-yellow-500">
                                {unixToDate(props.data.timecreated)}
                            </nobr>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
