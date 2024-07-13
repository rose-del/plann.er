import { ArrowRight, Calendar, MapPin, Settings2, X } from "lucide-react";
import { Button } from "../../../components/button";
import { useState } from "react";
import { DateRange, DayPicker } from "react-day-picker";
import { format } from 'date-fns';
import 'react-day-picker/dist/style.css'


interface DestinationAndDateStepProps {
    isGuestsInputOpen: boolean
    eventStartAndEndDates: DateRange | undefined
    closeGuestsInput: () => void
    openGuestsInput: () => void
    setDestination: (destination: string) => void
    setEventStartAndEndDates: (dates: DateRange | undefined) => void;
    /**Em TypeScript, o void é utilizado para indicar que uma função não retorna nenhum valor. Ou seja, a função é executada apenas para realizar alguma ação ou operação, mas não retorna nada que possa ser utilizado em outras partes do código **/
}

export function DestinationAndDateStep({
    isGuestsInputOpen,
    closeGuestsInput,
    openGuestsInput,
    setDestination,
    setEventStartAndEndDates,
    eventStartAndEndDates
}: DestinationAndDateStepProps) {
    const [isDatePickerOpen, setIsDatePickerOpen] = useState(false)

    function openDatePickerOpen() {
        return setIsDatePickerOpen(true)
    }

    function closeDatePicker() {
        return setIsDatePickerOpen(false)
    }

    const displayedDate = eventStartAndEndDates && eventStartAndEndDates.from && eventStartAndEndDates.to
        ? format(eventStartAndEndDates.from, "d' de 'LLL").concat(' até ').concat(format(eventStartAndEndDates.to, "d' de 'LLL"))
        : null


    return (
        <div className="h-16 bg-zinc-900 px-4 rounded-xl flex items-center shadow-shape gap-3"> {/*A altura `h-16` é derivada da medida de 64 pixels do protótipo, dividida por 4 para se adequar ao sistema de medidas relativas utilizado no projeto (baseado em unidades como rem).*/}
            <div className="flex items-center gap-2 flex-1">
                <MapPin className="size-5 text-zinc-400" />
                <input 
                disabled={isGuestsInputOpen} 
                type="text" 
                placeholder="Para onde você vai?" 
                className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
                onChange={event => setDestination(event.target.value)} 
                />
            </div>
            <button disabled={isGuestsInputOpen} onClick={openDatePickerOpen} className="flex items-center gap-2 text-left w-[240px]">
                <Calendar className="size-5 text-zinc-400" />
                <span className="text-lg text-zinc-400 w-40 text-left flex-1">
                    {displayedDate || 'Quando?'}
                </span>
            </button>

            {isDatePickerOpen && (
                <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
                    <div className="rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <h2 className="text-lg font-semibold">Selecione a data</h2>
                                <button type="button" onClick={closeDatePicker}>
                                    <X className="size-5 text-zinc-400" />
                                </button>
                            </div>
                        </div>
                        <DayPicker mode="range" selected={eventStartAndEndDates} onSelect={setEventStartAndEndDates} />
                    </div>
                </div>
            )}

            <div className="w-px h-6 bg-zinc-888" />

            {isGuestsInputOpen ? (
                <Button onClick={closeGuestsInput} variant="secondary">
                    Alterar local/data
                    <Settings2 className="size-5" />
                </Button>
            ) : (
                <Button onClick={openGuestsInput} variant="primary" >
                    Continuar
                    <ArrowRight className="size-5" />
                </Button>
            )}
        </div>
    );
}