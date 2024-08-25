import { CreateProjectForm } from '@/app/(app)/orgs/[slug]/create-project/create-project-form'
import { InterceptedSheetContent } from '@/components/intercepted-sheet-content'
import { Sheet, SheetHeader, SheetTitle } from '@/components/ui/sheet'

export default function CreateProject() {
  return (
    <Sheet defaultOpen>
      <InterceptedSheetContent>
        <SheetHeader>
          <SheetTitle>Create Project</SheetTitle>
        </SheetHeader>
        <div className="py-4">
          <CreateProjectForm />
        </div>
      </InterceptedSheetContent>
    </Sheet>
  )
}
