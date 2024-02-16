import React, {useState} from 'react'
import PageTitle from '../componentes/PageTitle'

const Pesquisa = () => {
  const [ form, setForm ] = useState({
    Nome: '',
    Email: '',
    Whatsapp: '',
    Critica: '',
    Nota: 0
  })
  const notas = [0, 1, 2, 3, 4, 5]
  const [sucess, setSucess] = useState(false)
  const [retorno, setRetorno] = useState({})
  const [errors, setErrors] = useState({})

  const save = async () => {
  // Adicionando validação antes de enviar
  const validationErrors = validateForm()
  if (Object.keys(validationErrors).length > 0) {
    setErrors(validationErrors)
    return;
  }
  
  try {
      const response = await fetch('/api/save', {
        method: 'POST',
        body: JSON.stringify(form)
    })
      const data = await response.json()
      setSucess(true)
      setRetorno(data)
  } catch (err){}
}

const validateForm = () => {
  const errors = {}

  // Validar campos obrigatórios
  if (!form.Nome) {
    errors.Nome = 'O campo Nome é obrigatório'
  }

  if (!form.Email) {
    errors.Email = 'O campo Email é obrigatório'
  } else if (!isValidEmail(form.Email)) {
    errors.Email = 'Digite um endereço de e-mail válido'
  }

  if (!form.Whatsapp) {
    errors.Whatsapp = 'O campo Whatsapp é obrigatório'
  } else if (!isValidWhatsapp(form.Whatsapp)) {
    errors.Whatsapp = 'Digite um número de WhatsApp válido'
  }

  if (!form.Nota) {
    errors.Nota = '*Campo obrigatório'
  }

  // Adicione mais validações conforme necessário

  return errors;
};

const isValidEmail = (email) => {
  // Expressão regular simples para validação de e-mail
  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return regexEmail.test(email)
}

const isValidWhatsapp = (whatsapp) => {
  // Expressão regular para validar número de WhatsApp com ou sem código de país
  const regexWhatsapp = /^(\+\d{1,2}\s?)?(\(\d{2,3}\)|\d{2,3})([\s.-]?)9(\d{4}[\s.-]?\d{4}|\d{3}[\s.-]?\d{3})$/
  return regexWhatsapp.test(whatsapp)
}

const onChange = evento => {
  const value = evento.target.value
  const key = evento.target.name
  setForm(old => ({
    ...old,
    [key]: value
    }))
  // Limpar erro quando o usuário começa a digitar
  setErrors((old) => ({
    ...old,
    [key]: '',
  }))
}
  return (
    <div className='pt-6'>
      <PageTitle title={'Pesquisa'}/>
      <h1 className='text-center font-bold my-4 text-xl'>Críticas e sugestões</h1>
      <p className='text-center mb-6'>O restaurante x sempre busca por atender melhor seus clientes.<br />
        Por isso, estamos sempre abertos a ouvir sua opinião.
      </p>
      {!sucess && <div className='w-1/5 mx-auto'>
        <label className='font-bold'>Seu nome:</label>
        <input type='text' className='p-4 bg-blue-100 block rounded shadow my-2' placeholder='Nome' onChange={onChange} name='Nome' value={form.Nome}/>
        {errors.Nome && <p className='text-red-500'>{errors.Nome}</p>}
        <label className='font-bold'>E-mail:</label>
        <input type='text' className='p-4 bg-blue-100 block rounded shadow my-2' placeholder='Email' onChange={onChange} name='Email' value={form.Email}/>
        {errors.Email && <p className='text-red-500'>{errors.Email}</p>}
        <label className='font-bold'>Whatsapp:</label>
        <input type='text' className='p-4 bg-blue-100 block rounded shadow my-2' placeholder='Whatsapp' onChange={onChange} name='Whatsapp' value={form.Whatsapp}/>
        {errors.Whatsapp && <p className='text-red-500'>{errors.Whatsapp}</p>}
        <label className='font-bold'>Sua crítica ou sugestão:</label>
        <input type='text' className='p-4 bg-blue-100 block rounded shadow my-2' placeholder='Crítica ou sugestão' onChange={onChange} name='Critica' value={form.Critica}/>
        <label className='font-bold'>Nota:</label>
        {errors.Nota && <p className='text-red-500'>{errors.Nota}</p>}
        <div className='flex text-center py-6 space-x-2'>
        {notas.map(nota => {
          return  (
          <label className='block w-1/6'>
            {nota} <br />
            <input type='radio' name='Nota' value={nota} onChange={onChange}/>
          </label>)
        })
        }
        </div>
        <button className='px-12 py-4 bg-blue-400 rounded-lg font-bold shadow-lg hover:bg-blue-300 hover:text-white focus:outline-none mb-2'  onClick={save}>Salvar</button>
      </div>}
      {sucess && <div className='container mx-auto px-12'>
        <p className='text-center bg-blue-100 border-t border-b border-blue-500 text-blue-700 px-4 py-3 mb-4'>Obrigado por contribuir com sua sugestão ou crítica</p>
        {
          retorno.showCoupon && <div className='text-center border p-4 mb-4'>
            Seu cupom: <br/>
            <span className='font-bold text-2xl'>{retorno.Cupom}</span>
            </div>
        }
        {
          retorno.showCoupon && <div className='text-center border p-4 mb-4'>
            <span className='font-bold block mb-2'>{retorno.Promo}</span>
            <br/>
            <span className='italic'>Tire um print ou foto desta tela e apresente ao garçom.</span>
            </div>
        }
        
        </div>}
    </div>
  )
}

export default Pesquisa