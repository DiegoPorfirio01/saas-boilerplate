import { Header } from '@/components/header'

import { CreateProjectForm } from './create-project-form'

export default function CreateProject() {
  return (
    <div className="space-y-4 py-4">
      <Header />
      <h1 className="text-2xl font-bold">Create Project</h1>
      <CreateProjectForm />
    </div>
  )
}
