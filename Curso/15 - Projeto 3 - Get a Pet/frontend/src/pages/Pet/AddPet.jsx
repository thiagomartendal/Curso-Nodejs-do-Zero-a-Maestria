import { useNavigate } from 'react-router-dom'
import useMessage from '../../hooks/useMessage'
import makeRequest from '../../utils/api'
import PetForm from '../../components/form/PetForm'
import style from './AddPet.module.css'

function AddPet() {
    const {setMessage} = useMessage()
    const navigate = useNavigate()

    const registerPet = async function(pet) {
        let msg = ''
        let type = 'success'

        const formData = new FormData()

        Object.keys(pet).forEach(key => {
            if (key === 'images')
                for (let i = 0; i < pet[key].length; i++)
                    formData.append('images', pet[key][i])
            else
                formData.append(key, pet[key])
        })

        try {
            const res = await makeRequest('/pets/create', 'POST', formData, true)
            const data = await res.json()
    
            if (data) {
                msg = data.message
                if (res.status != 200 && res.status != 201)
                    type = 'error'
                else
                    navigate('/pet/mypets')
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
                <h1>Cadestre um Animal de Estimação</h1>
                <p>O animal ficará disponível para adoção.</p>
            </div>
            <PetForm btnText="Cadastrar" handleSubmit={registerPet} />
        </section>
    )
}

export default AddPet