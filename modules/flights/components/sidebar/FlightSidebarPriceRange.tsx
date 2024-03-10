import Select from "@/modules/shared/components/ui/Select";

const FlightSidebarPriceRange: React.FC = () => {
    return (
        <div className="pt-2 pb-3 space-y-3">
                    <h5 className="text-sm font-semibold mb-2">مبلغ</h5>
                    <div className="grid grid-cols-3 items-center justify-between text-xs">
                        <p>حداقل</p>
                        <div className="col-span-2">
                        <Select value="l" onChange={e => null}
                        items={[{ label: "10,000,000ریال", value: '' }]}
                        placeholder="حداقل"
                        className="h-fit p-2 text-xs"
                        />
                        </div>     
                    </div>    
                    <div className="grid grid-cols-3 items-center justify-between text-xs">
                        <p>حداکثر</p>
                        <div className="col-span-2">
                            <Select value="l"
                                onChange={e => null}
                                items={[{ label: "30,000,000ریال", value: '' }]}
                                placeholder="حداکثر"
                                className="h-fit p-2 text-xs" />
                        </div>    
                    </div>   
        </div>
    )
}

export default FlightSidebarPriceRange;