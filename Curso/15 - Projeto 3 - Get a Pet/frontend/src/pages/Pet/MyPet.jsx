import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import RoundedImage from '../../components/layout/RoundedImage'
import useMessage from '../../hooks/useMessage'
import makeRequest from '../../utils/api'
import style from './Dashboard.module.css'

function MyPet() {
    const [pets, setPets] = useState([])
    const {setMessage} = useMessage()

    const loadPets = async () => {           
        try {
            const res = await makeRequest('/pets/mypets', 'GET')
            const data = await res.json()

            setPets(data.pets)
        } catch (error) {
            console.log(error.message)
        }
    }

    useEffect(() => {
        (async function() {
            await loadPets()
        })()
    }, [])

    const removePet = async (id) => {
        let msg = ''
        let type = 'success'

        try {
            const res = await makeRequest('/pets/' + id.toString(), 'DELETE')
            const data = await res.json()

            if (data) {
                msg = data.message
                if (res.status != 200 && res.status != 201)
                    type = 'error'
                else {
                    const updatedPets = pets.filter(pet => pet._id !== id)
                    setPets(updatedPets)
                }
            }
        } catch (error) {
            msg = error.message
            type = 'error'
        }

        setMessage(msg, type)
    } 

    const concludeAdoption = async (id) => {
        let msg = ''
        let type = 'success'
        
        try {
            const res = await makeRequest('/pets/conclude/' + id.toString(), 'PATCH')
            const data = await res.json()
            if (data) {
                msg = data.message
                if (res.status != 200 && res.status != 201)
                    type = 'error'
                else
                    await loadPets()
            }
        } catch (error) {
            msg = error.message
            type = 'error'
        }

        setMessage(msg, type)
    }

    return (
        <section>
            <div className={style.petlist_header}>
                <h1>Meus Animais de Estimação</h1>
                <Link to='/pet/add'>Cadastrar Animal</Link>
            </div>
            <div className={style.petlist_container}>
                {pets.length > 0 && (
                    pets.map(pet => (
                        <div className={style.petlist_row} key={pet._id}>
                            <RoundedImage src={`${import.meta.env.VITE_API}/data/pet/${pet.images[0]}`} alt={pet.name} width="px75" />
                            <span className="bold">{pet.name}</span>
                            <div className={style.actions}>
                                {pet.available ? (
                                    <>
                                        {pet.adopter && <button className={style.conclude_btn} onClick={() => concludeAdoption(pet._id)}>Concluir Adoção</button>}
                                        <Link to={"/pet/edit/" + pet._id}>Editar</Link>
                                        <button onClick={() => removePet(pet._id)}>Excluir</button>
                                    </>
                                ) : (
                                    <p>Animal já adotado</p>
                                )}
                            </div>
                        </div>
                    ))
                )}
                {pets.length == 0 &&
                    <p>Não há animais cadastrados.</p>
                }
            </div>
        </section>
    )
}

export default MyPet