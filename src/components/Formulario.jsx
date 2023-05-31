import { useState, useEffect } from 'react';
import Error from './Error';

const Formulario = ({ setPacientes, pacientes, paciente, setPaciente }) => {

    const [nombre, setNombre] = useState('');
    const [propietario, setPropietario] = useState('');
    const [email, setEmail] = useState('');
    const [alta, setAlta] = useState('');
    const [sintomas, setSintomas] = useState('');
    const [error, setError] = useState(false);

    useEffect(() => {
        if (Object.keys(paciente).length > 0) {
            setNombre(paciente.nombre)
            setPropietario(paciente.propietario)
            setEmail(paciente.email)
            setAlta(paciente.alta)
            setSintomas(paciente.sintomas)
        }

        //console.log(Object.keys(paciente))
    }, [paciente])


    const generarId = () => {
        const random = Math.random().toString(36).substr(2);
        const fecha = Date.now().toString(36).substr(2);
        return fecha + random;
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        if ([nombre, propietario, email, alta, sintomas].includes('')) {

            setError(true);
            return;
        }
        setError(false);

        const objetoPaciente = {
            nombre,
            propietario,
            email,
            alta,
            sintomas,
        }

        if (paciente.id) {
            objetoPaciente.id = paciente.id;

            const pacientesActualizados = pacientes.map(pacienteState => pacienteState.id === paciente.id ? objetoPaciente : pacienteState)
            setPacientes(pacientesActualizados);
            setPaciente({});
        }
        else {
            objetoPaciente.id = generarId();
            setPacientes([...pacientes, objetoPaciente]);

        }

        setNombre('');
        setPropietario('');
        setEmail('');
        setAlta('');
        setSintomas('');

    }
    return (
        <div className="mx-10 md:w-1/2 lg:w-2/5">

            <h2 className='font-black text-3xl text-center' >Seguimiento Pacientes</h2>
            <p className='text-xl text-center mt-5 mb-10'>Añade pacientes <span className='font-black text-indigo-600  '>Administralos</span></p>

            <form className='bg-white shadow-md rounded-lg py-10 px-5' onSubmit={handleSubmit}>

                {
                    error && <Error><p>todos los campos son obligatorios</p></Error>

                }

                <div className='mb-5'>

                    <label className='block text-gray-700 uppercase font-bold' htmlFor='mascota'>Nombre Mascota</label>
                    <input
                        id='mascota'
                        className={`border-2 w-full p-2 mt-2 rounded-md ${error && nombre === '' ? 'placeholder-red-600 border-red-600' : 'placeholder-gray-400'}`}
                        type="text"
                        placeholder='nombre de la mascota'
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                    />

                </div>
                <div className='mb-5'>

                    <label className='block text-gray-700 uppercase font-bold' htmlFor='propietario'>Nombre Propiertario</label>
                    <input
                        id='propietario'
                        className={`border-2 w-full p-2 mt-2 rounded-md ${error && propietario === '' ? 'placeholder-red-600 border-red-600' : 'placeholder-gray-400'}`}
                        type="text"
                        placeholder='nombre del propietario'
                        value={propietario}
                        onChange={(e) => setPropietario(e.target.value)}
                    />

                </div>
                <div className='mb-5'>
                    <label className='block text-gray-700 uppercase font-bold' htmlFor='email'>Email</label>
                    <input
                        id='email'
                        className={`border-2 w-full p-2 mt-2 rounded-md ${error && email === '' ? 'placeholder-red-600 border-red-600' : 'placeholder-gray-400'}`}
                        type="email"
                        placeholder='correo electrónico'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className='mb-5'>
                    <label className='block text-gray-700 uppercase font-bold' htmlFor='alta'>Alta</label>
                    <input
                        id='alta'
                        type="date"
                        className={`border-2 w-full p-2 mt-2 rounded-md ${error && alta === '' ? 'placeholder-red-600 border-red-600' : 'placeholder-gray-400'}`}
                        value={alta}
                        onChange={(e) => setAlta(e.target.value)}
                    />
                </div>
                <div className='mb-5'>
                    <label className='block text-gray-700 uppercase font-bold' htmlFor='sintomas'>síntomas</label>
                    <textarea
                        id='sintomas'
                        className={`border-2 w-full p-2 mt-2 rounded-md ${error && sintomas === '' ? 'placeholder-red-600 border-red-800' : 'placeholder-gray-400'}`}
                        placeholder='descripción de sintomas'
                        value={sintomas}
                        onChange={(e) => setSintomas(e.target.value)}
                    />
                </div>
                <input type="submit" className='bg-indigo-600 w-full p-3 text-white uppercase font-bold cursor-pointer hover:bg-indigo-700 transition-all mb-10' value={paciente.id ? "Editar paciente" : "Añadir paciente"} />
            </form>
        </div>
    )
}

export default Formulario