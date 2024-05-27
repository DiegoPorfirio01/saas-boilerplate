import { defineAbilityFor } from '@saas/auth'

const ability = defineAbilityFor({ role: 'MEMBER', id: '1' })

const userCanInviteSomeoneElse = ability.can('invite', 'User')
const userCanDeleteOtherUsers = ability.can('delete', 'User')
const userCanDeleteProjects = ability.can('delete', 'Project')

console.log(userCanInviteSomeoneElse)
console.log(userCanDeleteOtherUsers)
console.log(userCanDeleteProjects)
