import { Close } from "@/modules/shared/components/ui/icons";

type Props = {
    failed?: boolean;
}

const CapacityAnimation: React.FC<Props> = props => {

    return (
        <div className="flex gap-3 items-center mb-10">

            <svg className="w-12 h-12 fill-blue-800" viewBox="0 0 1088 1024" >
                <path d="M576.32 774.016c-92.288 0-186.048-54.784-240.768-127.296-262.528 0-270.464 375.04-270.464 375.04h1022.4s20.608-376.704-274.624-376.704c-54.656 73.408-144.256 128.96-236.544 128.96zM796.224 324.416c0 107.904-98.496 314.24-220.096 314.24-121.408 0-219.968-206.4-219.968-314.24s98.496-195.392 219.968-195.392c121.6 0.064 220.096 87.616 220.096 195.392z" />
                <path d="M894.4 231.296c0-20.224-28.16-36.544-63.104-36.672V152.96c0-6.208 2.368-151.552-254.4-151.552-256.64 0-254.272 145.344-254.272 151.552v43.136c-0.64 0-1.152-0.192-1.728-0.192-34.752 0-62.72 16.064-62.72 35.968v176.256c0 19.776 28.032 35.904 62.72 35.904s62.848-16.128 62.848-35.904V231.872c0-2.752-1.728-5.248-2.752-7.808V176c0-4.416-18.432-114.112 195.904-114.112 214.4 0 192.128 109.696 192.128 114.112v50.624c-0.384 1.6-1.6 3.008-1.6 4.672v180.288c0 20.288 28.352 36.736 63.488 36.736 0.768 0 1.344-0.256 2.112-0.256V513.92h-62.976V576h124.992l-0.64-344.704z" />
            </svg>

            <div className="flex items-center gap-2 relative">
                {[0,1,2,3,4,5,6].map(item => (
                    <span
                        key={item}
                        className={`w-1 h-1 bg-neutral-400 rounded-full`}
                    />
                ))}

                {props.failed ? (
                    <Close className="fill-black w-14 h-14 absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2" />
                    ):(
                    <span className="w-3 h-3 bg-red-500 rounded-full animation-all absolute top-1/2 -mt-1.5 -ml-1.5 animate-left2right" />
                )}

            </div>

            <svg className="w-14 h-14 fill-neutral-600" viewBox="0 0 1024 1024" >
                <path d="M736.818837 153.228847l0-89.436962-447.184809 0 0 89.436962-134.155443 0 0 804.932656 268.310885 0 0-89.436962 178.873923 0 0 89.436962 268.310885 0 0-804.932656L736.818837 153.228847zM468.507952 734.569098l-89.436962 0 0-89.436962 89.436962 0L468.507952 734.569098zM468.507952 555.695175l-89.436962 0 0-89.436962 89.436962 0L468.507952 555.695175zM468.507952 376.821251l-89.436962 0 0-89.436962 89.436962 0L468.507952 376.821251zM647.381875 734.569098l-89.435938 0 0-89.436962 89.435938 0L647.381875 734.569098zM647.381875 555.695175l-89.435938 0 0-89.436962 89.435938 0L647.381875 555.695175zM647.381875 376.821251l-89.435938 0 0-89.436962 89.435938 0L647.381875 376.821251z" />
            </svg>

        </div>
    )
}

export default CapacityAnimation;