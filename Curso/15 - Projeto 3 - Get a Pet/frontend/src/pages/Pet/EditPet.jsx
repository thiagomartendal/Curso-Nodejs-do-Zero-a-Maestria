import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import useMessage from '../../hooks/useMessage'
import makeRequest from '../../utils/api'
import PetForm from '../../components/form/PetForm'
import style from './AddPet.module.css'

function EditPet() {
    const {id} = useParams()
    const [pet, setPet] = useState({})
    const {setMessage} = useMessage()

    useEffect(() => {
        (async function(){
            try {
                const res = await makeRequest('/pets/' + id.toString(), 'GET')
                const data = await res.json()

                setPet(data.pet)
            } catch (error) {
                console.log(error.message)
            }
        })()
    }, [id])

    const updatePet = async (pet) => {
        let msg = ''
        let type = 'success'

        const formData = new FormData()

        Object.keys(pet).forEach(key => {
            if (key === 'images') {
                for (let i = 0; i < pet[key].length; i++)
                    formData.append('images', pet[key][i])
            } else {
                formData.append(key, pet[key])
            }
        })

        try {
            const res = await makeRequest('/pets/' + pet._id.toString(), 'PATCH', formData, true)
            const data = await res.json()
            if (data) {
                msg = data.message
                if (res.status != 200 && res.status != 201)
                    type = 'error'
            }
        } catch (error) {
            msg = error.message
            type = 'error'
        }

        setMessage(msg, type)
    }

    return (
        <section>
            <div className={style.addpet_header}>
                <h1>Editando o animal de estimação {pet.name}</h1>
            </div>
            {pet.name &&
                <PetForm btnText="Atualizar" petData={pet} handleSubmit={updatePet} />
            }
        </section>
    )
}

export default EditPet