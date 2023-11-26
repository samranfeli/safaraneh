import { useCallback, useEffect, useState, useRef, ReactNode, PropsWithChildren, memo, ReactElement } from 'react';
import { AxiosResponse } from 'axios';

import useHttp from '../../../hooks/use-http';
import { Header } from '../../../enum/url';
import { Loading, Close } from '../ui/icons';

type Props<T> = {
    placeholder?: string;
    url: string;
    inputId?: string;
    acceptLanguage? : 'fa-IR' | 'en-US';
    min: number;
    defaultList?:T[] ;
    renderOption: (option: T, direction: "rtl" | "ltr" | undefined) => ReactNode;
    onChangeHandle: (value: T | undefined) => void;
    inputClassName?: string;
    wrapperClassName?: string;
    icon?: ReactElement;
    value?: T;
    textPropertyName: string;
    noResultMessage?: string;
    checkTypingLanguage?: boolean;
}

function AutoComplete<T>(props: PropsWithChildren<Props<T>>) {

    const inputRef = useRef<HTMLInputElement>(null);
    const wrapperRef = useRef<HTMLDivElement>(null);

    const { loading, errorMessage: fetchErrorMessage, sendRequest } = useHttp();

    const [typingValue, setTypingValue] = useState<string>("");
    const [selectedItem, setSelectedItem] = useState<string>("");
    const [errorText, setErrorText] = useState<string>("");
    const [items, setItems] = useState<T[]>([]);
    const [showList,setShowList] = useState<boolean>(false);

    let direction: "rtl" | "ltr" | undefined;
    if (props.checkTypingLanguage) {
        const persianInput = /^[\u0600-\u06FF\s]+$/;
        if (selectedItem) {
            if (persianInput.test(selectedItem)) {
                direction = 'rtl';
            } else {
                direction = 'ltr';
            }
        } else if (typingValue) {
            if (persianInput.test(typingValue)) {
                direction = 'rtl';
            } else {
                direction = 'ltr';
            }
        } else {
            direction = undefined;
        }
    }

    const fetchData = useCallback((value: string, acceptLanguage?: "fa-IR" | "en-US") => {
        sendRequest({
            url: `${props.url}?input=${value}`,
            header: {
                ...Header,
                "Accept-Language": acceptLanguage || "en-US",
            },
            method: 'post'
        }, (response: AxiosResponse) => {
            if (response.data.result) {
                setItems(response.data.result);
            } else if (response.data.success) {
                setErrorText(props.noResultMessage || 'No result found!');
            }
        })
    }, []);

    useEffect(() => {
        if (fetchErrorMessage) {
            setErrorText(fetchErrorMessage)
        }
    }, [fetchErrorMessage]);

    useEffect(() => {

        let fetchTimeout: ReturnType<typeof setTimeout>;

        if (selectedItem) {
            props.onChangeHandle(undefined);
            setSelectedItem("");
        }
        if (items.length) {
            setItems([]);
        }
        if (errorText) {
            setErrorText("");
        }

        if (typingValue.length >= props.min) {
            fetchTimeout = setTimeout(() => { fetchData(typingValue, props.acceptLanguage || direction === "rtl" ? "fa-IR" : "en-US") }, 300);
        }

        return () => {
            clearTimeout(fetchTimeout);
        }

    }, [typingValue, fetchData, props.min]);

    const selectItemHandle = (item: T) => {
        props.onChangeHandle(item);
        setShowList(false);
    }

    const resetInput = () => {
        props.onChangeHandle(undefined);
        inputRef.current!.value = "";
        setSelectedItem("");
        setItems([]);
        setErrorText("");
        setTypingValue("");
    }

    const handleClickOutside = (e: any) => {
        if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
            if (errorText) {
                setErrorText("");
            }
            if (items.length) {
                setItems([]);
            }
            setShowList(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    let listElement: ReactNode | null = null;
    let errorElement: ReactNode | null = null;
    let loadingElement: ReactNode | null = null;

    if (items?.length || props.defaultList?.length) {
        let data = props.defaultList;
        if (items?.length){
            data = items;
        }
        listElement = (
            <div className='shadow-normal absolute z-20 bg-white min-w-full sm:w-72 rtl:right-0 ltr:left-0 top-full text-sm rounded-lg max-h-64 overflow-auto'>
                {data!.map((item, index) => <div
                    onClick={selectItemHandle.bind(null, item)}
                    key={index}
                    className="border-b border-gray-200 first:rounded-t last:rounded-b last:border-none cursor-pointer transition-all"
                >
                    {props.renderOption && props.renderOption(item, direction)}
                </div>)}
            </div>
        )
    }

    if (errorText) {
        errorElement = (
            <div className='autocomplete-content-box mt-2 py-2 px-4 text-red-500'>
                {errorText}
            </div>
        )
    }

    const val: string = props.value && (props.value as any)[props.textPropertyName] || '';
    useEffect(() => {
        if (val) {
            inputRef.current!.value = val;
            setSelectedItem(val);
            if (items.length) {
                setItems([]);
            }
        }
    }, [val]);

    if (loading) {
        loadingElement = (
            <div className={`autocomplete-content-box ${!direction ? "" : direction === 'rtl' ? "rtl" : "ltr"}`}>
                {[1, 2, 3].map(item => <div key={item} className="py-2 px-4 border-b border-gray-200 first:rounded-t last:rounded-b last:border-none cursor-pointer text-cyan-500 hover:bg-gray-100 transition-all">
                    loading ...
                </div>)}
            </div>)
    }

    const changeTypingValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTypingValue(e.target.value);
    }

    const inputClassNames: string[] = [];
    if (props.inputClassName) {
        inputClassNames.push(props.inputClassName)
    } else {
        inputClassNames.push('bg-white py-1 w-full border outline-none border-gray-300 focus:border-sky-400')
    }

    if (!direction) {
        inputClassNames.push("rtl:pl-8 ltr:pr-8 rtl:text-right ltr:text-left rtl:font-fa");
        if (props.icon) {
            inputClassNames.push("rtl:pr-10 ltr:pl-10");
        } else {
            inputClassNames.push("rtl:pr-3 ltr:pl-3");
        }
    } else if (direction === 'rtl') {
        inputClassNames.push("pl-8 text-right font-fa rtl");
        if (props.icon) {
            inputClassNames.push("pr-10");
        } else {
            inputClassNames.push("pr-3");
        }
    } else if (direction === 'ltr') {
        inputClassNames.push("pr-8 text-left font-en ltr");
        if (props.icon) {
            inputClassNames.push("pl-10");
        } else {
            inputClassNames.push("pl-3");
        }
    }

    let icon = null;
    if (props.icon) {
        icon = <span className={`absolute z-20 top-1/2 -translate-y-1/2 ${!direction ? "rtl:right-3 ltr:left-3" : direction === 'rtl' ? "right-3" : "left-3"}`}>
            {props.icon}
        </span>
    }

    return (
        <div className={`relative ${props.wrapperClassName || ""}`} ref={wrapperRef}>
            <div className='relative'>
                <input
                    autoComplete="off"
                    id={props.inputId || undefined}
                    type="text"
                    onChange={changeTypingValue}
                    onFocus={()=>{setShowList(true)}}
                    className={inputClassNames.join(" ")}
                    ref={inputRef}
                    placeholder={props.placeholder || ""}
                />
                {icon}
                {loading && <Loading className={`rotate w-7 absolute top-2/4 -mt-3.5 ${!direction ? "ltr:right-3 rtl:left-3" : direction === 'rtl' ? "left-3" : "right-3"}`} />}
                {!!selectedItem && <span onClick={resetInput} className={`absolute bg-white top-2/4 -mt-3.5 cursor-pointer ${!direction ? "ltr:right-3 rtl:left-3" : direction === 'rtl' ? "left-3" : "right-3"}`}>
                    <Close className="w-7" />
                </span>}
            </div>

            {errorElement || loadingElement || showList ? listElement : null }
        </div>
    )
}

export default memo(AutoComplete) as typeof AutoComplete;