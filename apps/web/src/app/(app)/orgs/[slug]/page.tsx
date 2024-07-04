import { ability } from '@/auth/auth'
import { Header } from '@/components/header'

export default async function Org() {
  const permissions = await ability()

  return (
    <div className="space-y-4 py-4">
      <Header />
      <h1 className="text-white">
        {' '}
        {permissions?.can('get', 'Project') && <p>Projetos</p>}
      </h1>
    </div>
  )
}
