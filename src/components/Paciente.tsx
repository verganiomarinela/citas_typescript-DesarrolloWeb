import type { Patient } from "../types"
import PacienteDetalle from "./PacienteDetalle"
import { usePacienteStore } from '../store/store'
import DialogModal from "./DialogModal"
import { useState } from "react"


type PacienteProps = {
    paciente: Patient
}

const Paciente = ({ paciente }: PacienteProps) => {
    const [isOpened, setIsOpened] = useState(false);

  const onProceed = () => {
    handleClickEliminar();
  };
  
    const eliminarPaciente = usePacienteStore((state) => state.eliminarPaciente)
    const establecerPacienteActivo = usePacienteStore((state) => state.establecerPacienteActivo)
    

    const handleClickEliminar = () => {
        eliminarPaciente(paciente.id)
    }

    const handleClickEditar = () => {
        establecerPacienteActivo(paciente)
    }

    return (
        <div className="mx-5 my-10 px-5 py-10 bg-white shadow-md rounded-xl">
            <PacienteDetalle label="Nombre" data={paciente.name} />
            <PacienteDetalle label="Propietario" data={paciente.caretaker} />
            <PacienteDetalle label="Email" data={paciente.email} />
            <PacienteDetalle label="Fecha Alta" data={paciente.date || ''} />
            <PacienteDetalle label="Síntomas" data={paciente.symptoms} />

            <div className="flex flex-col lg:flex-row gap-3 justify-between mt-10">
                <button
                    type="button"
                    className="py-2 px-10 bg-indigo-600 hover:bg-indigo-700 text-white font-bold uppercase rounded-lg"
                    onClick={handleClickEditar}
                >Editar</button>

                <button
                    type="button"
                    className="py-2 px-10 bg-red-600 hover:bg-red-700 text-white font-bold uppercase rounded-lg"
                    onClick={() => setIsOpened(true)}
                >Eliminar</button>

                <DialogModal
                    title={`¿Seguro de que quieres eliminar el paciente "${paciente.name}"?`}
                    isOpened={isOpened}
                    onProceed={onProceed}
                    onClose={() => setIsOpened(false)}
                >
                    <p>Esta acción no se puede deshacer.</p>
                </DialogModal>
            </div>
        </div>
    )
}

export default Paciente
