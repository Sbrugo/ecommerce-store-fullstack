import { useState, useRef } from 'react'
import { toast, Toaster } from 'sonner'
import confetti from 'canvas-confetti'
import { useGlobalContext } from '@/context/global.context'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { routes } from '@/routes/routes'
import {
  MailIcon,
  LockIcon,
  UserIcon,
  PhoneIcon,
  GlobeIcon,
} from '@/components/Icons'
import Video from '@/components/Login/Videos'
import Logo from '@/components/Login/Logo'

const Register = () => {
  const buttonRef = useRef(null)
  const { handleCreateUser } = useGlobalContext()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleEmailChange = (event) => setEmail(event.target.value)
  const handlePasswordChange = (event) => setPassword(event.target.value)

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      // Intenta crear el usuario
      const user = await handleCreateUser(email, password)
      if (user) {
        // Lanza confeti en la posición del botón
        const buttonPosition = buttonRef.current.getBoundingClientRect()
        confetti({
          particleCount: 100,
          startVelocity: 30,
          spread: 70,
          origin: {
            x:
              (buttonPosition.left + buttonPosition.right) /
              2 /
              window.innerWidth,
            y: buttonPosition.top / window.innerHeight,
          },
        })
        toast.success('Usuario creado exitosamente!')
      } else {
        toast.error('No se pudo crear el usuario')
      }
    } catch (error) {
      toast.error('Error al crear el usuario')
    }
  }
  return (
    <div className='w-full lg:grid lg:min-h-[600px] lg:grid-cols-3 xl:min-h-[800px] relative'>
      <div className='hidden bg-gray-100 lg:col-span-2 lg:block dark:bg-gray-800 relative'>
        <div className='absolute top-5 left-5 z-10'>
          <Logo />
        </div>
        <Video />
      </div>
      <div className='flex items-center justify-center py-12 lg:col-span-1'>
        <div className='mx-auto w-[350px] space-y-6'>
          <div className='space-y-2 text-center'>
            <h1 className='text-3xl font-bold'>Registrarse</h1>
            <p className='text-gray-500 dark:text-gray-400'>
              Ingresa tus datos a continuación para crear una cuenta
            </p>
          </div>
          <form onSubmit={handleSubmit}>
            <div className='space-y-4'>
              <div className='space-y-2'>
                <Label htmlFor='name'>Nombre</Label>
                <div className='relative'>
                  <UserIcon className='absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400' />
                  <Input
                    className='pl-10'
                    id='name'
                    placeholder='Ingresa tu nombre'
                    required
                  />
                </div>
              </div>
              <div className='space-y-2'>
                <Label htmlFor='lastname'>Apellido</Label>
                <div className='relative'>
                  <UserIcon className='absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400' />
                  <Input
                    className='pl-10'
                    id='lastname'
                    placeholder='Ingresa tu apellido'
                    required
                  />
                </div>
              </div>
              <div className='space-y-2'>
                <Label htmlFor='email'>Correo electrónico</Label>
                <div className='relative'>
                  <MailIcon className='absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400' />
                  <Input
                    className='pl-10'
                    id='email'
                    placeholder='ejemplo@dominio.com'
                    required
                    type='email'
                  />
                </div>
              </div>
              <div className='space-y-2'>
                <Label htmlFor='phone'>Telefono</Label>
                <div className='relative'>
                  <PhoneIcon className='absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400' />
                  <Input
                    className='pl-10'
                    id='phone'
                    placeholder='Ingresa tu telefono'
                    required
                  />
                </div>
              </div>
              <div className='space-y-2'>
                <Label htmlFor='country'>Pais</Label>
                <div className='relative'>
                  <GlobeIcon className='absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400' />
                  <Input
                    className='pl-10'
                    id='country'
                    placeholder='Ingresa tu pais'
                    required
                  />
                </div>
              </div>
              <div className='space-y-2'>
                <div className='flex items-center'>
                  <Label htmlFor='password'>Contraseña</Label>
                </div>
                <div className='relative'>
                  <LockIcon className='absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400' />
                  <Input
                    className='pl-10'
                    id='password'
                    required
                    type='password'
                    placeholder='Ingresa tu contraseña'
                  />
                </div>
              </div>
              <div className='space-y-2'>
                <div className='flex items-center'>
                  <Label htmlFor='password'>Repetir contraseña</Label>
                </div>
                <div className='relative'>
                  <LockIcon className='absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400' />
                  <Input
                    className='pl-10'
                    id='password'
                    required
                    type='password'
                    placeholder='Repite tu contraseña'
                  />
                </div>
              </div>
              <Button className='w-full' type='submit'>
                Registrarse
              </Button>
            </div>
          </form>
          <div className='mt-4 text-center text-sm'>
            ¿Ya tienes una cuenta?{' '}
            <Link className='underline' to={routes.login}>
              Iniciar sesión
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register
